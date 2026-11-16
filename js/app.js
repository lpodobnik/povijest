/* The Ancient World — app logic: time, map, story panel, "meanwhile" timeline, chain of causes. */
(function () {
  'use strict';
  const A = window.ATLAS, CH = A.chapters, NCH = CH.length;
  const $ = s => document.querySelector(s);
  const h = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const T0 = CH[0].t0, T1 = CH[NCH - 1].t1;
  const FONT = '"Segoe UI", system-ui, -apple-system, Roboto, "Helvetica Neue", sans-serif';

  /* ================= time helpers ================= */
  function interp(kf, t) {
    if (t <= kf[0][0]) return kf[0][1];
    for (let i = 1; i < kf.length; i++) {
      if (t <= kf[i][0]) { const a = kf[i - 1], b = kf[i]; return a[1] + (b[1] - a[1]) * (t - a[0]) / ((b[0] - a[0]) || 1); }
    }
    return kf[kf.length - 1][1];
  }
  const T = A.t, HR = A.lang === 'hr';
  // English: 430,000 · Croatian: 430.000 (and no separator in four-digit numbers)
  const nf = n => { n = Math.round(n); return !HR ? n.toLocaleString('en-US') : n < 10000 ? String(n) : String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); };
  function agoText(n) {
    if (n >= 950000) {
      const m = n / 1e6, v = m >= 10 ? m.toFixed(0) : m.toFixed(1).replace(/\.0$/, '');
      return !HR ? v + ' million' : v === '1' ? 'milijun' : v.replace('.', ',') + ' milijuna';
    }
    const step = n >= 100000 ? 10000 : n >= 20000 ? 1000 : 100;
    return nf(Math.round(n / step) * step);
  }
  // k: 'ago' (years ago) · 'bce' · 'ce'
  function parts(t, exact) {
    if (t < -10000) return { num: agoText(2000 - t), k: 'ago' };
    if (t < 0) { let y = -t; if (!exact && y > 3000) y = Math.round(y / 10) * 10; return { num: String(Math.round(y)), k: 'bce' }; }
    return { num: String(Math.max(1, Math.round(t))), k: 'ce' };
  }
  const UNIT = HR ? { bce: 'pr. Kr.', ce: 'po. Kr.' } : { ago: 'years ago', bce: 'BCE', ce: 'CE' };
  const one = (p, about) => HR
    ? (p.k === 'ago' ? `prije ${about ? 'oko ' : ''}${p.num} godina` : `${p.num}. ${UNIT[p.k]}`)
    : (about && p.k === 'ago' ? 'about ' : '') + `${p.num} ${UNIT[p.k]}`;
  const fmt = (t, exact) => one(parts(t, exact));
  function fmtRange(a, b) {
    const p = parts(a, true), q = parts(b, true);
    if (p.k !== q.k) return `${one(p)} – ${one(q)}`;
    if (!HR) return `${p.num} – ${q.num} ${UNIT[q.k]}`;
    return p.k === 'ago' ? `prije ${p.num} – ${q.num} godina` : `${p.num}. – ${q.num}. ${UNIT[q.k]}`;
  }
  const whenText = t => { const v = one(parts(t), true); return v[0].toUpperCase() + v.slice(1); };
  function subText(t) {
    if (t < -13000) return '';
    if (t < -10000) { const y = nf(Math.round(-t / 100) * 100); return HR ? `${y}. pr. Kr.` : `${y} BCE`; }
    const n = 2000 - t, st = n > 5000 ? 100 : 10, v = nf(Math.round(n / st) * st);
    return HR ? `prije oko ${v} godina` : `about ${v} years ago`;
  }
  function chIndex(t) { for (let i = 0; i < NCH; i++) if (t < CH[i].t1) return i; return NCH - 1; }
  function posOf(t) { const i = chIndex(t), c = CH[i]; return i + clamp((t - c.t0) / (c.t1 - c.t0)); }
  function tOfPos(p) { p = clamp(p, 0, NCH); const i = Math.min(NCH - 1, Math.floor(p)), c = CH[i]; return c.t0 + (p - i) * (c.t1 - c.t0); }

  /* ================= state ================= */
  let t = T0, cur = -1, raf = 0, playing = false, playEnd = 0, lastTs = 0;
  let SECS = 24; // seconds of play per chapter; the speed selector changes it
  const story = { on: false, ch: 0, step: 0, steps: [], anim: 0, driving: false, focus: [], toc: false };   // story mode, see below

  function setTime(nt, opt = {}) {
    t = clamp(nt, T0, T1);
    const ci = chIndex(t);
    if (ci !== cur) {
      cur = ci;
      markChapter();
      if (story.on) { if (!story.driving) storyShow(cur, 0, { keepTime: true }); }   // dragged into another chapter: show its title card
      else { renderStory(); if (!opt.keepView && mapOK) setView(CH[cur].view, true); }
    }
    requestFrame();
  }
  function requestFrame() { if (!raf) raf = requestAnimationFrame(frame); }
  function frame() {
    raf = 0;
    if (mapOK) {
      if (geomDirty) { regeom(); geomDirty = false; }
      mapTime();
      layoutLabels();
    }
    readout();
    stripUpdate();
    tlUpdate();
  }
  function goChapter(i, autoplay = true) {
    i = clamp(i, 0, NCH - 1);
    if (story.on) return storyShow(i, 0);
    stop();
    setTime(CH[i].t0 + (CH[i].t1 - CH[i].t0) * 1e-6);
    $('#story').scrollTop = 0;
    if (autoplay) play();
  }
  function play() {
    let p = posOf(t), i = Math.floor(p + 1e-9);
    if (p - i > 0.995) { i = (i + 1) % NCH; p = i; setTime(tOfPos(p + 1e-6)); }
    playEnd = i + 0.9995; playing = true; lastTs = 0; playBtn();
    requestAnimationFrame(tick);
  }
  function stop() { playing = false; story.anim++; playBtn(); }
  function tick(ts) {
    if (!playing) return;
    const dt = lastTs ? Math.min(0.1, (ts - lastTs) / 1000) : 0; lastTs = ts;
    let p = posOf(t) + dt / SECS;
    if (p >= playEnd) { p = playEnd; playing = false; playBtn(); }
    setTime(tOfPos(p));
    if (playing) requestAnimationFrame(tick);
  }
  function playBtn() { const b = $('#play'); b.innerHTML = playing ? '&#10074;&#10074;' : '&#9654;'; b.setAttribute('aria-label', T(playing ? 'pause' : 'play')); }

  /* ================= tooltip ================= */
  const tip = $('#tip');
  function showTip(html, ev) {
    tip.innerHTML = html; tip.hidden = false;
    const r = tip.getBoundingClientRect();
    let x = ev.clientX + 14, y = ev.clientY + 16;
    if (x + r.width > innerWidth - 8) x = ev.clientX - r.width - 14;
    if (y + r.height > innerHeight - 8) y = ev.clientY - r.height - 14;
    tip.style.left = Math.max(4, x) + 'px'; tip.style.top = Math.max(4, y) + 'px';
  }
  const hideTip = () => { tip.hidden = true; };

  /* ================= text measuring ================= */
  const mctx = document.createElement('canvas').getContext('2d'), mcache = new Map();
  function tw(text, font) {
    const k = font + '|' + text; let w = mcache.get(k);
    if (w == null) { mctx.font = font; w = mctx.measureText(text).width; mcache.set(k, w); }
    return w;
  }
  const F_SITE = `600 11px ${FONT}`, F_REG = `700 12px ${FONT}`, F_SUB = `500 10px ${FONT}`, F_RT = `italic 600 10.5px ${FONT}`, F_TL = `500 10.5px ${FONT}`;

  /* ================= MAP ================= */
  let mapOK = false, geomDirty = true, geomV = 0, W = 800, H = 500, landGeo = null, curView = 'world';
  let svg, proj, geoPath, zoom, ZT, base = { s: 1, tx: 0, ty: 0 };
  let sphereEl, gratEl, landEl, gShelf, gClip, gLake, gRiver, gIce, gRoute, gSite, gLabel;
  const SVGNS = 'http://www.w3.org/2000/svg';
  const sv = (tag, attrs, parent) => { const e = document.createElementNS(SVGNS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };

  function chaikin(r, n) {
    for (let k = 0; k < n; k++) {
      const o = [];
      for (let i = 0; i < r.length; i++) {
        const a = r[i], b = r[(i + 1) % r.length];
        o.push([a[0] * .75 + b[0] * .25, a[1] * .75 + b[1] * .25], [a[0] * .25 + b[0] * .75, a[1] * .25 + b[1] * .75]);
      }
      r = o;
    }
    return r;
  }
  function ringToGeo(ring) {
    let r = chaikin(ring, 2); r.push(r[0]);
    let g = { type: 'Polygon', coordinates: [r] };
    if (d3.geoArea(g) > 2 * Math.PI) g = { type: 'Polygon', coordinates: [r.slice().reverse()] };
    return g;
  }
  function smooth(P, n) {
    if (P.length < 3) return P.slice();
    const out = [];
    for (let i = 0; i < P.length - 1; i++) {
      const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(P.length - 1, i + 2)];
      for (let j = 0; j < n; j++) {
        const s = j / n, s2 = s * s, s3 = s2 * s;
        out.push([
          0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * s + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * s2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * s3),
          0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * s + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * s2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * s3)
        ]);
      }
    }
    out.push(P[P.length - 1]);
    return out;
  }
  const ramp = (t, a, b, fin, fout) => t < a - fin || t > b + fout ? 0 : t < a ? (t - (a - fin)) / fin : t > b ? 1 - (t - b) / fout : 1;

  function regionO(r, t) {
    const w = r.when;
    if (w === 'always') return 1;
    if (w === 'ice') {
      let o = Math.min(1, interp(A.glacial, t) * 1.05);
      if (r.end) o *= 1 - clamp((t - r.end[0]) / (r.end[1] - r.end[0]));
      return o;
    }
    if (w === 'green') return interp(A.green, t);
    if (!Array.isArray(w)) return clamp((interp(A.glacial, t) - w.shelf) / 0.15);
    const d = w[1] - w[0], def = clamp(d * 0.06, 10, 20000);
    return ramp(t, w[0], w[1], r.fin != null ? r.fin : def, r.fout != null ? r.fout : def);
  }

  const SYMS = {};
  function initMap() {
    if (!window.d3 || !window.topojson) return mapError();
    const node = $('#map');
    svg = d3.select(node);
    proj = d3.geoNaturalEarth1().rotate([-152, 0]).precision(0.4);
    geoPath = d3.geoPath(proj);
    ZT = d3.zoomIdentity;

    const defs = sv('defs', {}, node);
    const hatch = (id, color, ang) => {
      const p = sv('pattern', { id, width: 7, height: 7, patternUnits: 'userSpaceOnUse', patternTransform: `rotate(${ang})` }, defs);
      sv('rect', { width: 7, height: 7, fill: color, 'fill-opacity': .1 }, p);
      sv('line', { x1: 0, y1: 0, x2: 0, y2: 7, stroke: color, 'stroke-width': 2.4, 'stroke-opacity': .55 }, p);
    };
    hatch('hatch-early', '#8a6a45', 45); hatch('hatch-neander', '#7b4fa3', -45); hatch('hatch-deniso', '#1f8a86', 45);
    const RTC = { migr: '#c2452d', farm: '#3f8a2a', move: '#8a5a2b', trade: '#2f66a8', war: '#7a1f3d' };
    for (const k in RTC) {
      const m = sv('marker', { id: 'arr-' + k, viewBox: '0 0 10 10', refX: 6.5, refY: 5, markerWidth: 5.2, markerHeight: 5.2, orient: 'auto-start-reverse' }, defs);
      sv('path', { d: 'M0,0.8 L10,5 L0,9.2 z', fill: RTC[k] }, m);
    }
    const cp = sv('clipPath', { id: 'landclip' }, defs);
    sv('use', { href: '#landpath' }, cp);

    sphereEl = svg.append('path').attr('class', 'sphere');
    gratEl = svg.append('path').attr('class', 'grat');
    gShelf = svg.append('g');
    landEl = svg.append('path').attr('class', 'land').attr('id', 'landpath');
    gClip = svg.append('g').attr('clip-path', 'url(#landclip)');
    gLake = svg.append('g'); gRiver = svg.append('g'); gIce = svg.append('g');
    gRoute = svg.append('g'); gSite = svg.append('g'); gLabel = svg.append('g');

    const mkLabel = (cls, text) => { const e = sv('text', { class: 'lb ' + cls }, gLabel.node()); e.textContent = text; e.style.display = 'none'; return e; };

    A.regions.forEach(r => {
      r.geo = ringToGeo(r.ring);
      const g = r.kind === 'ice' ? gIce : r.kind === 'shelf' ? gShelf : r.kind === 'lake' ? gLake : gClip;
      r.el = sv('path', { class: `rg rg-${r.kind}${r.c ? ' c-' + r.c : ''}` }, g.node());
      r.el.style.display = 'none'; r.shown = false; r.v = -1; r.o = 0;
      r.anchor = r.at || d3.geoCentroid(r.geo);
      if (r.label) {
        r.lab = mkLabel('lb-reg lb-' + r.kind, r.label); r.lw = tw(r.label, F_REG);
        if (r.sub) { r.lab2 = mkLabel('lb-sub', r.sub); r.lw = Math.max(r.lw, tw(r.sub, F_SUB)); }
      }
      if (r.x) r.el.__tip = () => `<b>${r.label || ''}</b>${r.sub ? `<i>${r.sub}</i>` : ''}<p>${r.x}</p>`;
    });
    A.rivers.forEach(r => {
      r.el = sv('path', { class: 'river' }, gRiver.node());
      r.geo = { type: 'LineString', coordinates: r.pts };
      if (r.n) { r.lab = mkLabel('lb-river', r.n); r.lw = tw(r.n, F_RT); }
    });
    A.routes.forEach(r => {
      r.el = sv('path', { class: 'rt rt-' + r.kind, 'marker-end': `url(#arr-${r.kind})` }, gRoute.node());
      r.el.style.display = 'none'; r.shown = false;
      r.fade = clamp((r.until - r.t1) * 0.15, 8, 5000);
      if (r.label) { r.lab = mkLabel('lb-route', r.label); r.lw = tw(r.label, F_RT); }
      r.el.__tip = () => `<b>${r.label ? r.label[0].toUpperCase() + r.label.slice(1) : T('route')}</b><p>${r.x}</p>`;
    });
    const symT = { f: d3.symbolCircle, v: d3.symbolCircle, a: d3.symbolStar, c: d3.symbolSquare, m: d3.symbolTriangle, e: d3.symbolWye, i: d3.symbolDiamond, b: d3.symbolCross };
    for (const k in symT) SYMS[k] = d3.symbol().type(symT[k]).size(k === 'a' || k === 'e' || k === 'b' ? 58 : 46)();
    A.sites.forEach(s => {
      s.el = sv('path', { class: 'st st-' + s.k, d: SYMS[s.k] }, gSite.node());
      s.el.style.display = 'none'; s.shown = false;
      const d = s.t1 - s.t0; s.f = clamp(d * 0.04, 2, 4000);
      s.lab = mkLabel('lb-site', s.n); s.lw = tw(s.n, F_SITE);
      s.el.__tip = s.lab.__tip = () => `<b>${s.n}</b><i>${s.d}</i><p>${s.x}</p><em>${T('tipClick')}</em>`;
      s.el.__site = s.lab.__site = s; s.lab.classList.add('click');
    });

    zoom = d3.zoom().scaleExtent([0.4, 90]).on('zoom', e => { ZT = e.transform; geomDirty = true; requestFrame(); })
      .on('start', hideTip);
    svg.call(zoom).on('dblclick.zoom', null);
    node.addEventListener('pointermove', e => { const f = e.target.__tip; if (f) showTip(f(), e); else hideTip(); });
    node.addEventListener('pointerleave', hideTip);
    node.addEventListener('click', e => { const s = e.target.__site; if (s) { hideTip(); openPlace(s); } else closePlace(); });

    const vb = $('#viewbar');
    for (const k in A.views) {
      const b = h('button', '', A.views[k].name); b.dataset.v = k;
      b.onclick = () => setView(k, true); vb.appendChild(b);
    }

    new ResizeObserver(resize).observe($('#mapwrap'));
    resize();
    mapOK = true;

    const world = window.ATLAS_LAND;
    if (!world) return mapError(T('mapErrLand'));
    landGeo = topojson.feature(world, world.objects.land);
    geomDirty = true; requestFrame();
  }
  function mapError(msg) {
    const e = $('#maperr'); e.hidden = false;
    e.innerHTML = `<div><b>${T('mapErrT')}</b><br>${msg || T('mapErrLib')}<br>${T('mapErrRest')}</div>`;
  }
  function resize() {
    const r = $('#mapwrap').getBoundingClientRect();
    if (r.width < 50 || r.height < 50) return;
    W = r.width; H = r.height;
    svg.attr('viewBox', `0 0 ${W} ${H}`);
    proj.fitExtent([[0, 0], [W, H]], { type: 'Sphere' });
    base = { s: proj.scale(), tx: proj.translate()[0], ty: proj.translate()[1] };
    setView(curView, false);
  }
  function applyProjection() { proj.scale(base.s * ZT.k).translate([base.tx * ZT.k + ZT.x, base.ty * ZT.k + ZT.y]); }
  function viewTransform(box) {
    const [w, s, e, n] = box;
    proj.scale(base.s).translate([base.tx, base.ty]);
    let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    for (let i = 0; i <= 24; i++) {
      const f = i / 24;
      [[w + (e - w) * f, s], [w + (e - w) * f, n], [w, s + (n - s) * f], [e, s + (n - s) * f]].forEach(p => {
        const q = proj(p); x0 = Math.min(x0, q[0]); x1 = Math.max(x1, q[0]); y0 = Math.min(y0, q[1]); y1 = Math.max(y1, q[1]);
      });
    }
    applyProjection();
    const k = Math.min((W - 12) / (x1 - x0), (H - 12) / (y1 - y0));
    return d3.zoomIdentity.translate(W / 2 - k * (x0 + x1) / 2, H / 2 - k * (y0 + y1) / 2).scale(k);
  }
  function setView(name, animate) {
    curView = name;
    const tr = viewTransform(A.views[name].box);
    (animate ? svg.transition().duration(900) : svg).call(zoom.transform, tr);
    document.querySelectorAll('#viewbar button').forEach(b => b.classList.toggle('on', b.dataset.v === name));
  }

  function regeom() {
    applyProjection(); geomV++;
    sphereEl.attr('d', geoPath({ type: 'Sphere' }));
    gratEl.attr('d', geoPath(d3.geoGraticule10()));
    if (landGeo) landEl.attr('d', geoPath(landGeo));
    A.rivers.forEach(r => r.el.setAttribute('d', geoPath(r.geo) || ''));
    A.sites.forEach(s => { const p = proj(s.c); s.x0 = p[0]; s.y0 = p[1]; });
    A.routes.forEach(r => {
      const sm = smooth(r.pts.map(p => proj(p)), 8), cum = [0];
      for (let i = 1; i < sm.length; i++) cum.push(cum[i - 1] + Math.hypot(sm[i][0] - sm[i - 1][0], sm[i][1] - sm[i - 1][1]));
      r.sm = sm; r.cum = cum;
    });
  }

  let legendKey = '';
  function mapTime() {
    const act = new Set();
    for (const r of A.regions) {
      const o = regionO(r, t); r.o = o;
      if (o > 0.02) {
        if (r.v !== geomV) { r.el.setAttribute('d', geoPath(r.geo) || ''); r.v = geomV; }
        if (!r.shown) { r.el.style.display = ''; r.shown = true; }
        r.el.style.opacity = o.toFixed(3);
        act.add(r.kind);
      } else if (r.shown) { r.el.style.display = 'none'; r.shown = false; }
    }
    for (const r of A.routes) {
      let o = t < r.t0 ? 0 : t <= r.until ? 1 : 1 - clamp((t - r.until) / r.fade);
      const p = clamp((t - r.t0) / ((r.t1 - r.t0) || 1)), L = r.cum[r.cum.length - 1] * p;
      if (L < 5) o = 0;
      r.o = o;
      if (o > 0.02) {
        let d = `M${r.sm[0][0].toFixed(1)},${r.sm[0][1].toFixed(1)}`, i = 1;
        for (; i < r.sm.length && r.cum[i] <= L; i++) d += `L${r.sm[i][0].toFixed(1)},${r.sm[i][1].toFixed(1)}`;
        let tipPt = r.sm[i - 1];
        if (i < r.sm.length) {
          const f = (L - r.cum[i - 1]) / ((r.cum[i] - r.cum[i - 1]) || 1);
          tipPt = [r.sm[i - 1][0] + (r.sm[i][0] - r.sm[i - 1][0]) * f, r.sm[i - 1][1] + (r.sm[i][1] - r.sm[i - 1][1]) * f];
          d += `L${tipPt[0].toFixed(1)},${tipPt[1].toFixed(1)}`;
        }
        r.tip = tipPt; r.p = p;
        r.el.setAttribute('d', d);
        if (!r.shown) { r.el.style.display = ''; r.shown = true; }
        r.el.style.opacity = o.toFixed(3);
        act.add('rt-' + r.kind);
      } else if (r.shown) { r.el.style.display = 'none'; r.shown = false; }
    }
    for (const s of A.sites) {
      const o = ramp(t, s.t0, s.t1, s.f, s.f); s.o = o;
      if (o > 0.05) {
        if (!s.shown) { s.el.style.display = ''; s.shown = true; }
        s.el.style.opacity = o.toFixed(3);
      } else if (s.shown) { s.el.style.display = 'none'; s.shown = false; }
    }
    const key = [...act].sort().join();
    if (key !== legendKey) { legendKey = key; renderLegend(act); }
  }

  const LEG = [
    ['ice', T('lgIce'), 'background:#fff;border:1px solid #a9cbdb'],
    ['shelf', T('lgShelf'), 'background:#e6dcc0;border:1px dashed #b3a47e'],
    ['green', T('lgGreen'), 'background:#a9cf8f'],
    ['early', T('lgEarly'), 'background:repeating-linear-gradient(45deg,#8a6a45 0 2px,#efe7d2 2px 5px)'],
    ['neander', T('lgNeander'), 'background:repeating-linear-gradient(-45deg,#7b4fa3 0 2px,#efe7d2 2px 5px)'],
    ['deniso', T('lgDeniso'), 'background:repeating-linear-gradient(45deg,#1f8a86 0 2px,#efe7d2 2px 5px)'],
    ['sapiens', T('lgSapiens'), 'background:#e3b3a2'],
    ['farm', T('lgFarm'), 'background:#a9cb93;border:1px solid #3f7a25'],
    ['culture', T('lgCulture'), 'background:#e5dac0;border:1px dashed #86683a'],
    ['civ', T('lgCiv'), 'background:#ecc96f;border:1px solid #d99a1c'],
    ['rt-migr', T('lgMigr'), 'ln:#c2452d'], ['rt-farm', T('lgFarmSp'), 'ln:#3f8a2a'], ['rt-move', T('lgMove'), 'ln:#8a5a2b'],
    ['rt-trade', T('lgTrade'), 'ln dash:#2f66a8'], ['rt-war', T('lgWar'), 'ln:#7a1f3d']
  ];
  const DOTS = [['f', T('dPeople')], ['v', T('dVillage')], ['c', T('dCity')], ['m', T('dMonument')], ['a', T('dArt')], ['i', T('dInvention')], ['e', T('dNature')], ['b', T('dBattle')]];
  const DOTC = { f: '#8a4b2a', a: '#8e44ad', v: '#3f8a2a', c: '#b3261e', m: '#d18b00', e: '#e4572e', i: '#1f78b4', b: '#333' };
  function renderLegend(act) {
    let html = '';
    for (const [k, name, st] of LEG) {
      if (!act.has(k)) continue;
      html += st.startsWith('ln') ? `<div><i class="${st.split(':')[0]}" style="border-color:${st.split(':')[1]}"></i>${name}</div>` : `<div><i style="${st}"></i>${name}</div>`;
    }
    html += '<div class="dots">' + DOTS.map(([k, n]) => `<span><svg viewBox="-6 -6 12 12"><path d="${SYMS[k]}" fill="${DOTC[k]}"/></svg>${n}</span>`).join('') + '</div>';
    $('#legend').innerHTML = html;
  }

  /* ---------- label layout: greedy, by priority, no overlaps ---------- */
  const REGPRI = { civ: 0, farm: 1, sapiens: 2, neander: 2, deniso: 2, early: 2, culture: 3, shelf: 4, green: 4, ice: 5, lake: 6 };
  let overlayBoxes = [];
  function measureOverlays() {
    const m = $('#mapwrap').getBoundingClientRect();
    overlayBoxes = ['#viewbar'].map(s => { const r = $(s).getBoundingClientRect(); return [r.left - m.left - 4, r.top - m.top - 4, r.right - m.left + 4, r.bottom - m.top + 4]; });
  }
  function layoutLabels() {
    measureOverlays();
    const boxes = overlayBoxes.slice();
    const hit = b => { for (const o of boxes) if (b[0] < o[2] && b[2] > o[0] && b[1] < o[3] && b[3] > o[1]) return true; return false; };
    const ppd = proj.scale() * Math.PI / 180 * 0.87;
    const maxRank = ppd < 4.2 ? 1 : ppd < 11 ? 2 : 3;
    const off = (x, y) => x < -10 || x > W + 10 || y < -10 || y > H + 10;
    const put = (el, x, y, anchor) => { el.setAttribute('x', x.toFixed(1)); el.setAttribute('y', y.toFixed(1)); el.setAttribute('text-anchor', anchor); el.style.display = ''; };
    const hide = el => { if (el && el.style.display !== 'none') el.style.display = 'none'; };

    // site dots first, so labels avoid them
    const vis = [];
    for (const s of A.sites) {
      if (!s.shown || off(s.x0, s.y0)) { hide(s.lab); s.onmap = false; continue; }
      s.onmap = true; vis.push(s);
      boxes.push([s.x0 - 4, s.y0 - 4, s.x0 + 4, s.y0 + 4]);
    }
    // region labels
    const regs = A.regions.filter(r => r.lab).sort((a, b) => REGPRI[a.kind] - REGPRI[b.kind]);
    for (const r of regs) {
      let ok = false;
      if (r.o > 0.45) {
        const p = proj(r.anchor), hh = r.lab2 ? 25 : 14;
        if (!off(p[0], p[1])) {
          for (const dy of [0, -15, 15, -30, 30]) {
            const b = [p[0] - r.lw / 2 - 3, p[1] + dy - 11, p[0] + r.lw / 2 + 3, p[1] + dy - 11 + hh];
            if (b[0] < 0 || b[2] > W || b[1] < 0 || b[3] > H || hit(b)) continue;
            boxes.push(b); put(r.lab, p[0], p[1] + dy, 'middle');
            if (r.lab2) put(r.lab2, p[0], p[1] + dy + 11.5, 'middle');
            ok = true; break;
          }
        }
      }
      if (!ok) { hide(r.lab); hide(r.lab2); }
    }
    // route labels at the travelling tip
    for (const r of A.routes) {
      if (!r.lab) continue;
      let ok = false;
      if (r.shown && r.p > 0.3 && r.o > 0.5 && !off(r.tip[0], r.tip[1])) {
        for (const [dx, dy, an] of [[8, -6, 'start'], [-8, -6, 'end'], [8, 13, 'start'], [-8, 13, 'end']]) {
          const x = r.tip[0] + dx, y = r.tip[1] + dy, x0 = an === 'start' ? x : x - r.lw;
          const b = [x0 - 2, y - 10, x0 + r.lw + 2, y + 3];
          if (b[0] < 0 || b[2] > W || b[1] < 0 || b[3] > H || hit(b)) continue;
          boxes.push(b); put(r.lab, x, y, an); ok = true; break;
        }
      }
      if (!ok) hide(r.lab);
    }
    // site labels by rank
    vis.sort((a, b) => (b.focus ? 1 : 0) - (a.focus ? 1 : 0) || a.r - b.r || b.t0 - a.t0);
    for (const s of vis) {
      let ok = false;
      if (s.r <= maxRank || s.focus) {
        const x = s.x0, y = s.y0, w = s.lw;
        for (const [lx, ly, an] of [[x + 7, y + 3.8, 'start'], [x - 7, y + 3.8, 'end'], [x, y - 7.5, 'middle'], [x, y + 15, 'middle']]) {
          const x0 = an === 'start' ? lx : an === 'end' ? lx - w : lx - w / 2;
          const b = [x0 - 2, ly - 10, x0 + w + 2, ly + 3];
          if (b[0] < 0 || b[2] > W || b[1] < 0 || b[3] > H || hit(b)) continue;
          boxes.push(b); put(s.lab, lx, ly, an); ok = true; break;
        }
      }
      if (!ok) hide(s.lab);
      s.el.setAttribute('transform', `translate(${s.x0.toFixed(1)},${s.y0.toFixed(1)}) scale(${s.focus ? 1.6 : ok ? 1 : 0.72})`);
    }
    // river names when zoomed in
    for (const r of A.rivers) {
      if (!r.lab) continue;
      let ok = false;
      if (ppd > 9) {
        const p = proj(r.at), b = [p[0] - r.lw / 2 - 2, p[1] - 10, p[0] + r.lw / 2 + 2, p[1] + 3];
        if (!off(p[0], p[1]) && !hit(b)) { boxes.push(b); put(r.lab, p[0], p[1], 'middle'); ok = true; }
      }
      if (!ok) hide(r.lab);
    }
  }

  /* ================= place cards (click a place) ================= */
  // The picture and the link come from Wikipedia when there is internet; the text is always there.
  const wikiCache = new Map(); let placeSel = null;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function wikiInfo(title) {
    if (!wikiCache.has(title)) {
      const u = 'https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&origin=*&redirects=1&prop=pageimages|langlinks|info&inprop=url&piprop=thumbnail&pithumbsize=640&lllang=hr&llprop=url&titles=' + encodeURIComponent(title);
      wikiCache.set(title, fetch(u).then(r => r.json()).then(j => {
        const p = j.query.pages[0];
        return { img: p.thumbnail ? p.thumbnail.source : null, url: p.fullurl, hr: p.langlinks && p.langlinks[0] ? p.langlinks[0].url : null };
      }).catch(() => { wikiCache.delete(title); return null; }));
    }
    return wikiCache.get(title);
  }
  function openPlace(s) {
    stop();
    if (placeSel) placeSel.el.classList.remove('sel');
    placeSel = s; s.el.classList.add('sel');
    const el = $('#place'), w = s.w, pic = w && A.pics ? A.pics[w] : null;   // pic: stored in img/places/ (works offline)
    const link = pic ? (HR && pic.hr) || pic.url : w ? 'https://en.wikipedia.org/wiki/' + encodeURIComponent(w.replace(/ /g, '_')) : '';
    el.innerHTML = `<button class="place-x" aria-label="${T('plClose')}" title="${T('plClose')}">×</button>` +
      (w ? '<div class="place-img load"></div>' : '') +
      `<div class="place-b"><b>${s.n}</b><i>${s.d}</i><p>${s.x}</p>` +
      (w ? `<div class="place-f"><a href="${esc(link)}" target="_blank" rel="noopener">${T('plMore')}</a><span></span></div>` : '') + '</div>';
    el.hidden = false; el.scrollTop = 0;
    if (!w) return;
    const box = el.querySelector('.place-img'), note = el.querySelector('.place-f span');
    const none = msg => { box.remove(); note.textContent = msg; };
    const show = (src, credit, onFail) => {
      const img = new Image(); img.alt = s.n;
      img.onload = () => { if (placeSel !== s) return; box.classList.remove('load'); box.appendChild(img); note.innerHTML = credit; };
      img.onerror = () => { if (placeSel === s) onFail(); };
      img.src = src;
    };
    // no stored picture: ask Wikipedia (needs internet)
    const online = () => wikiInfo(w).then(info => {
      if (placeSel !== s) return;
      if (!info) return none(T('plNoNet'));
      el.querySelector('.place-f a').href = (HR && info.hr) || info.url || link;
      if (!info.img) return none(T('plNoImg'));
      show(info.img, T('plCredit'), () => none(T('plNoNet')));
    });
    if (pic && pic.f) {
      const who = esc(pic.by || 'Wikimedia Commons') + (pic.lic ? ' · ' + esc(pic.lic) : '');
      show(pic.f, `${T('plPic')}: ` + (pic.src ? `<a href="${esc(pic.src)}" target="_blank" rel="noopener">${who}</a>` : who), online);
    } else if (pic) none(T('plNoImg'));
    else online();
  }
  function closePlace() {
    if (placeSel) placeSel.el.classList.remove('sel');
    placeSel = null; $('#place').hidden = true;
  }
  $('#place').addEventListener('click', e => { if (e.target.closest('.place-x')) closePlace(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePlace(); });

  /* ================= readout ================= */
  function readout() {
    $('#when').textContent = whenText(t);
    $('#whenSub').textContent = subText(t);
    let cl = A.climate[0][1];
    for (const c of A.climate) if (t >= c[0]) cl = c[1];
    const g = interp(A.glacial, t), sea = Math.round(125 * g / 5) * 5;
    let pop;
    if (t < A.population[0][0]) pop = T('popUnknown');
    else {
      const v = Math.exp(interp(A.population.map(p => [p[0], Math.log(p[1])]), t));
      const m = v < 10 ? Math.round(v) : v < 100 ? Math.round(v / 5) * 5 : Math.round(v / 10) * 10;
      pop = v < 1 ? T('popUnder') : HR && m === 1 ? T('popOne') : T('popAbout', { n: m });
    }
    $('#stats').innerHTML = `<div><dt>${T('stClimate')}</dt><dd>${cl}</dd></div><div><dt>${T('stSea')}</dt><dd>${sea < 8 ? T('seaSame') : T('seaLower', { n: sea })}</dd></div><div><dt>${T('stPop')}</dt><dd>${pop}</dd></div>`;
  }

  /* ================= chapter strip (scrubber) ================= */
  let fillEl, handleEl;
  function buildStrip() {
    const st = $('#strip');
    CH.forEach((c, i) => { const s = h('div', 'seg', `<b>${i + 1}</b><span>${c.short}</span>`); s.title = `${c.title} · ${fmtRange(c.t0, c.t1)}`; st.appendChild(s); });
    fillEl = h('div', 'fill'); handleEl = h('div', 'handle'); st.append(fillEl, handleEl);
    new ResizeObserver(() => st.classList.toggle('narrow', st.clientWidth / NCH < 52)).observe(st);
    let drag = false;
    const at = e => { const r = st.getBoundingClientRect(); stop(); setTime(tOfPos(clamp((e.clientX - r.left) / r.width) * NCH)); };
    st.addEventListener('pointerdown', e => { drag = true; st.setPointerCapture(e.pointerId); at(e); });
    st.addEventListener('pointermove', e => { if (drag) at(e); });
    st.addEventListener('pointerup', () => { drag = false; });
    st.addEventListener('pointercancel', () => { drag = false; });
    $('#prev').onclick = () => goChapter(posOf(t) - cur > 0.08 ? cur : cur - 1);
    $('#next').onclick = () => goChapter(cur + 1);
    $('#play').onclick = () => playing ? stop() : play();
    document.addEventListener('keydown', e => {
      if (e.target.closest('input,textarea,select') || !$('#atlas').classList.contains('on') || !welcome.hidden) return;
      if (story.on) {
        if (e.target.closest('button,a') || story.toc) return;
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') { e.preventDefault(); storyNext(); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); storyBack(); }
        return;
      }
      if (e.key === ' ' && !e.target.closest('button')) { e.preventDefault(); playing ? stop() : play(); }
      else if (e.key === 'ArrowRight') { stop(); e.shiftKey ? goChapter(cur + 1, false) : setTime(tOfPos(posOf(t) + 0.02)); }
      else if (e.key === 'ArrowLeft') { stop(); e.shiftKey ? goChapter(cur - 1, false) : setTime(tOfPos(posOf(t) - 0.02)); }
    });
  }
  function stripUpdate() { const p = posOf(t) / NCH * 100; fillEl.style.width = p + '%'; handleEl.style.left = p + '%'; }
  function markChapter() {
    document.querySelectorAll('#strip .seg').forEach((s, i) => s.classList.toggle('on', i === cur));
    document.querySelectorAll('.tl-ch').forEach((s, i) => s.classList.toggle('on', i === cur));
  }

  /* ================= story panel ================= */
  const nodeById = {}, inL = {}, outL = {};
  A.nodes.forEach(n => { nodeById[n.id] = n; inL[n.id] = []; outL[n.id] = []; });
  A.links.forEach((l, i) => { l.i = i; outL[l.from].push(l); inL[l.to].push(l); });

  function renderStory() {
    if (story.on) return;
    const c = CH[cur], el = $('#story');
    const nodes = A.nodes.filter(n => n.ch === cur);
    const chip = (l, dir) => { const o = nodeById[dir === 'in' ? l.from : l.to]; return `<button class="chip ${dir}" data-l="${l.i}">${o.title}${o.ch !== cur ? `<small>${T('chShort', { n: o.ch + 1 })}</small>` : ''}</button>`; };
    const cards = nodes.map(n => `<div class="nd" data-id="${n.id}"><div class="nd-t">${n.title}</div><div class="nd-x">${n.text}</div>` +
      (inL[n.id].length ? `<div class="nd-row"><span class="lbl">${T('because')}</span>${inL[n.id].map(l => chip(l, 'in')).join('')}</div>` : '') +
      (outL[n.id].length ? `<div class="nd-row"><span class="lbl">${T('ledTo')}</span>${outL[n.id].map(l => chip(l, 'out')).join('')}</div>` : '') +
      `<div class="nd-why" hidden></div></div>`).join('');
    el.innerHTML =
      `<div class="s-meta">${T('chOf', { n: cur + 1, m: NCH })} · ${fmtRange(c.t0, c.t1)}</div><h2>${c.title}</h2><p class="idea">${c.idea}</p>` +
      c.story.map(p => `<p>${p}</p>`).join('') +
      `<h3>${T('whyH')} <small>${T('whyHint')}</small></h3>${cards}<button class="linkish" data-chain="${nodes[0] ? nodes[0].id : ''}">${T('seeChain')}</button>` +
      `<h3>${T('meanwhile')}</h3><ul class="mean">${c.meanwhile.map(m => `<li><b>${m[0]}</b>${m[1]}</li>`).join('')}</ul>` +
      `<h3>${T('didYou')}</h3><div class="fact">${c.fact}</div>` +
      `<h3>${T('talk')}</h3><ul class="ask">${c.ask.map(q => `<li>${q}</li>`).join('')}</ul>` +
      `<div class="s-nav">${cur > 0 ? `<button data-go="${cur - 1}"><small>${T('prevS')}</small>${CH[cur - 1].title}</button>` : ''}${cur < NCH - 1 ? `<button class="nx" data-go="${cur + 1}"><small>${T('nextS')}</small>${CH[cur + 1].title}</button>` : ''}</div>`;
    el.scrollTop = 0;
  }
  $('#story').addEventListener('click', e => {
    const go = e.target.closest('[data-go]'), chipEl = e.target.closest('.chip'), chain = e.target.closest('[data-chain]');
    if (go) return goChapter(+go.dataset.go);
    if (chain) { showTab('causes'); if (chain.dataset.chain) selectNode(chain.dataset.chain, true); return; }
    if (chipEl) {
      const l = A.links[+chipEl.dataset.l], a = nodeById[l.from], b = nodeById[l.to], card = chipEl.closest('.nd'), why = card.querySelector('.nd-why');
      const other = chipEl.classList.contains('in') ? a : b, was = chipEl.classList.contains('on');
      card.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
      if (was) { why.hidden = true; return; }
      chipEl.classList.add('on'); why.hidden = false;
      why.innerHTML = `<b>${a.title} → ${b.title}.</b> ${l.why}` + (other.ch !== cur ? ` <a data-go="${other.ch}">${T('goCh', { n: other.ch + 1, title: CH[other.ch].title })}</a>` : '');
    }
  });

  /* ================= "meanwhile" timeline ================= */
  const LW = innerWidth < 600 ? 92 : 150;   // width of the row-name column (narrower on phones)
  document.documentElement.style.setProperty('--lw', LW + 'px');
  const LANEC = { climate: '#5b8fa8', africa: '#b8742a', nile: '#c79a1c', mideast: '#3b6fb0', europe: '#7a52a8', sasia: '#1f8f83', easia: '#d0632a', oceania: '#1f9bb0', americas: '#5d8a2b' };
  const tlOff = []; let tlTotal = 0, tlCursor, tlItems = [];
  CH.forEach(c => { tlOff.push(tlTotal); tlTotal += c.w; });
  const xOf = tt => { const i = chIndex(tt), c = CH[i]; return tlOff[i] + clamp((tt - c.t0) / (c.t1 - c.t0)) * c.w; };
  function tOfX(x) {
    x = clamp(x, 0, tlTotal - 0.01);
    let i = 0; while (i < NCH - 1 && x >= tlOff[i + 1]) i++;
    const c = CH[i]; return c.t0 + (x - tlOff[i]) / c.w * (c.t1 - c.t0);
  }
  function buildTimeline() {
    const inner = $('#tlInner'); inner.style.width = (LW + tlTotal + 40) + 'px';
    const hrow = h('div', 'tl-hrow'); hrow.appendChild(h('div', 'tl-corner'));
    CH.forEach((c, i) => {
      const d = h('div', 'tl-ch', `${i + 1} · ${c.short}<small>${fmt(c.t0, true)}</small>`);
      d.style.left = (LW + tlOff[i]) + 'px'; d.style.width = c.w + 'px'; d.onclick = e => { e.stopPropagation(); goChapter(i); };
      hrow.appendChild(d);
    });
    inner.appendChild(hrow);
    A.lanes.forEach(([key, name]) => {
      const its = A.timeline.filter(it => it.lane === key).map(it => {
        const x0 = xOf(it.t0), lw = tw(it.label, F_TL), bar = it.t1 != null;
        const bw = bar ? Math.max(5, xOf(it.t1) - x0) : 0, inside = bar && bw >= lw + 10;
        return { it, x0, bw, bar, inside, start: bar ? x0 : x0 - 5, end: bar ? (inside ? x0 + bw : x0 + bw + lw + 8) : x0 + lw + 12 };
      }).sort((a, b) => a.start - b.start);
      const rows = [];
      its.forEach(o => { let r = 0; while (r < rows.length && rows[r] + 10 > o.start) r++; rows[r] = o.end; o.row = r; });
      const lane = h('div', 'lane'); lane.style.setProperty('--lc', LANEC[key]); lane.style.height = (rows.length * 17 + 7) + 'px';
      lane.appendChild(h('div', 'lane-name', name));
      its.forEach(o => {
        const d = h('div', 'tl-it ' + (o.bar ? 'tl-bar' + (o.inside ? '' : ' out') : 'tl-dot'), `<span>${o.it.label}</span>`);
        d.style.left = (LW + o.x0) + 'px'; d.style.top = (4 + o.row * 17) + 'px'; if (o.bar) d.style.width = o.bw + 'px';
        d.__tip = `<b>${o.it.label}</b><i>${o.bar ? fmtRange(o.it.t0, o.it.t1) : fmt(o.it.t0, true)}</i>`;
        lane.appendChild(d);
        tlItems.push({ el: d, t0: o.it.t0, t1: o.it.t1, p0: posOf(o.it.t0), now: false });
      });
      inner.appendChild(lane);
    });
    for (let i = 1; i < NCH; i++) { const g = h('div', 'tl-grid'); g.style.left = (LW + tlOff[i]) + 'px'; inner.appendChild(g); }
    tlCursor = h('div', 'tl-cursor'); inner.appendChild(tlCursor);

    let drag = false;
    const at = e => { const r = inner.getBoundingClientRect(); stop(); setTime(tOfX(e.clientX - r.left - LW)); };
    inner.addEventListener('pointerdown', e => { if (e.target.closest('.tl-ch,.lane-name,.tl-corner')) return; drag = true; inner.setPointerCapture(e.pointerId); at(e); });
    inner.addEventListener('pointermove', e => { if (drag) at(e); else { const it = e.target.closest('.tl-it'); if (it) showTip(it.__tip, e); else hideTip(); } });
    inner.addEventListener('pointerup', () => { drag = false; });
    inner.addEventListener('pointerleave', hideTip);
    tlDragging = () => drag;
    $('#tlToggle').onclick = () => { const on = $('#tl').classList.toggle('tall'); $('#tlToggle').textContent = T(on ? 'shorter' : 'taller'); };
  }
  let tlDragging = () => false;
  function tlUpdate() {
    if (!tlCursor) return;
    const x = LW + xOf(t), p = posOf(t), sc = $('#tlScroll');
    tlCursor.style.left = x + 'px';
    for (const o of tlItems) {
      const now = o.t1 != null ? t >= o.t0 && t <= o.t1 : Math.abs(p - o.p0) < 0.035;
      if (now !== o.now) { o.now = now; o.el.classList.toggle('now', now); }
    }
    if (tlDragging()) return;
    const vw = sc.clientWidth;
    if (playing) sc.scrollLeft = x - LW - (vw - LW) * 0.5;
    else if (x < sc.scrollLeft + LW + 40 || x > sc.scrollLeft + vw - 80) sc.scrollLeft = x - LW - (vw - LW) * 0.4;
  }

  /* ================= chain of causes ================= */
  const CW = 178, czNodes = {}, czRows = {}, czPhone = matchMedia('(max-width: 600px)'); let czDrawn = false, czSel = null, czLast = null, czPaths = [];
  function buildCauses() {
    const grid = $('#czGrid');
    grid.style.gridTemplateColumns = `118px repeat(${NCH}, ${CW}px)`;
    grid.appendChild(h('div', 'cz-corner'));
    CH.forEach((c, i) => { const d = h('div', 'cz-ch', `${i + 1} · ${c.short}<small>${fmtRange(c.t0, c.t1)}</small>`); d.title = T('openCh'); d.onclick = () => { showTab('atlas'); goChapter(i); }; grid.appendChild(d); });
    A.themes.forEach(([th, name]) => {
      grid.appendChild(h('div', 'cz-th', name));
      for (let i = 0; i < NCH; i++) {
        const cell = h('div', 'cz-cell');
        A.nodes.filter(n => n.ch === i && n.th === th).forEach(n => {
          const b = h('button', 'cz-node', n.title); b.dataset.id = n.id; b.dataset.th = th;
          b.onclick = e => { e.stopPropagation(); selectNode(czSel === n.id ? null : n.id); };
          czNodes[n.id] = b; cell.appendChild(b);
        });
        grid.appendChild(cell);
      }
    });
    grid.addEventListener('click', () => selectNode(null));
    // Phones get a list instead of the grid (see style.css): chapters top to bottom; tap a change to see
    // its causes and effects, then tap those to follow the chain.
    const list = $('#czList');
    list.innerHTML = `<div class="czl-key">${A.themes.map(([th, name]) => `<span data-th="${th}">${name}</span>`).join('')}</div>` +
      CH.map((c, i) => `<section><h3><b>${i + 1}</b>${c.title}<small>${fmtRange(c.t0, c.t1)}</small></h3>` +
        A.nodes.filter(n => n.ch === i).map(n => `<button class="czl-node" data-n="${n.id}" data-th="${n.th}"><span>${n.title}</span></button>`).join('') + '</section>').join('');
    list.querySelectorAll('.czl-node').forEach(b => { czRows[b.dataset.n] = b; });
    list.addEventListener('click', e => { const b = e.target.closest('[data-n]'); if (b) selectNode(b.dataset.n, true); });
    selectNode(null);
  }
  function drawLinks() {
    const grid = $('#czGrid');
    if (!grid.offsetParent) return;   // the grid is hidden on phones
    let s = grid.querySelector('svg'); if (s) s.remove();
    s = sv('svg', { width: grid.scrollWidth, height: grid.scrollHeight });
    const defs = sv('defs', {}, s), mk = (id, col) => { const m = sv('marker', { id, viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto' }, defs); sv('path', { d: 'M0,1 L10,5 L0,9 z', fill: col }, m); };
    mk('cz-a', '#8a7e6a'); mk('cz-a1', '#b8472a'); mk('cz-a2', '#b98a55');
    czPaths = A.links.map(l => {
      const a = czNodes[l.from], b = czNodes[l.to];
      const A1 = { l: a.offsetLeft, t: a.offsetTop, w: a.offsetWidth, h: a.offsetHeight }, B1 = { l: b.offsetLeft, t: b.offsetTop, w: b.offsetWidth, h: b.offsetHeight };
      let d;
      if (nodeById[l.to].ch > nodeById[l.from].ch) {
        const x1 = A1.l + A1.w, y1 = A1.t + A1.h / 2, x2 = B1.l - 2, y2 = B1.t + B1.h / 2, dx = clamp((x2 - x1) * 0.5, 18, 110);
        d = `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
      } else {
        const down = B1.t > A1.t, x = A1.l + A1.w + 2, y1 = A1.t + A1.h / 2, y2 = B1.t + B1.h / 2;
        d = `M${x},${y1} C${x + 16 + Math.abs(y2 - y1) * 0.08},${y1 + (down ? 6 : -6)} ${x + 16 + Math.abs(y2 - y1) * 0.08},${y2 - (down ? 6 : -6)} ${B1.l + B1.w + 3},${y2}`;
      }
      const p = sv('path', { d, class: 'cz-link' + (l.main ? ' main' : ''), 'marker-end': 'url(#cz-a)' }, s);
      return { l, p };
    });
    grid.prepend(s);
    czDrawn = true;
    paintSel();
  }
  function closure(id, map, key) { const seen = new Set(), q = [id]; while (q.length) { const x = q.pop(); for (const l of map[x]) if (!seen.has(l[key])) { seen.add(l[key]); q.push(l[key]); } } return seen; }
  function paintSel() {
    const grid = $('#czGrid'); grid.classList.toggle('has-sel', !!czSel);
    const anc = czSel ? closure(czSel, inL, 'from') : new Set(), des = czSel ? closure(czSel, outL, 'to') : new Set();
    const up = new Set(anc), dn = new Set(des); if (czSel) { up.add(czSel); dn.add(czSel); }
    for (const id in czNodes) {
      const b = czNodes[id], direct = czSel && (inL[czSel].some(l => l.from === id) || outL[czSel].some(l => l.to === id));
      b.classList.toggle('sel', id === czSel); b.classList.toggle('rel1', !!direct); b.classList.toggle('rel2', anc.has(id) || des.has(id));
    }
    czPaths.forEach(({ l, p }) => {
      const l1 = czSel && (l.from === czSel || l.to === czSel), l2 = czSel && ((up.has(l.from) && up.has(l.to)) || (dn.has(l.from) && dn.has(l.to)));
      p.setAttribute('class', 'cz-link' + (l.main ? ' main' : '') + (l1 ? ' l1' : l2 ? ' l2' : ''));
      p.setAttribute('marker-end', `url(#${l1 ? 'cz-a1' : l2 ? 'cz-a2' : 'cz-a'})`);
    });
  }
  function selectNode(id, scroll) {
    czSel = id; paintSel();
    const info = $('#czInfo'), view = $('#causes'), phone = czPhone.matches && view.classList.contains('on');
    view.classList.toggle('cz-open', !!id);
    for (const k in czRows) czRows[k].classList.toggle('last', !id && k === czLast);
    if (phone) { if (id) scrollTo(0, 0); else if (czLast) czRows[czLast].scrollIntoView({ block: 'center' }); }
    if (id) czLast = id;
    if (!id) {
      info.innerHTML = `<h3>${T('howRead')}</h3><p>${T('howReadP')}</p>
        <h4>${T('tryFrom')}</h4><div class="starts">${['pyramids', 'cities', 'farming', 'bacollapse', 'democracy', 'silkroad', 'fallwest', 'legacy'].map(k => `<button class="chip" data-n="${k}">${nodeById[k].title}</button>`).join('')}</div>`;
      return;
    }
    const n = nodeById[id];
    const rel = (l, o, dir) => `<div class="rel" data-n="${o.id}"><b>${dir === 'in' ? '← ' : ''}${o.title}${dir === 'out' ? ' →' : ''}</b>${l.why} <small>${T('chParen', { n: o.ch + 1 })}</small></div>`;
    info.innerHTML = `<button class="czl-back" data-n="">← ${T('czAll')}</button><div class="czl-tag" data-th="${n.th}">${A.themes.find(x => x[0] === n.th)[1]}</div><h3>${n.title}</h3><p>${n.text}<br><button class="linkish" data-ch="${n.ch}">${T('chLink', { n: n.ch + 1, title: CH[n.ch].title })}</button></p>` +
      (inL[id].length ? `<h4>${T('becauseOf')}</h4>${inL[id].map(l => rel(l, nodeById[l.from], 'in')).join('')}` : `<h4>${T('becauseOf')}</h4><p>${T('startPoint')}</p>`) +
      (outL[id].length ? `<h4>${T('whichLed')}</h4>${outL[id].map(l => rel(l, nodeById[l.to], 'out')).join('')}` : '') +
      `<p class="cz-clear" style="margin-top:14px"><button class="linkish" data-n="">${T('clear')}</button></p>`;
    if (scroll) { const b = czNodes[id], sc = $('#czScroll'); sc.scrollLeft = b.offsetLeft - sc.clientWidth / 2; sc.scrollTop = b.offsetTop - sc.clientHeight / 2; }
  }
  $('#czInfo').addEventListener('click', e => {
    const n = e.target.closest('[data-n]'), c = e.target.closest('[data-ch]');
    if (n) selectNode(n.dataset.n || null, true);
    else if (c) { showTab('atlas'); goChapter(+c.dataset.ch); }
  });

  /* ================= story mode: the same content, one step at a time ================= */
  // Each chapter becomes: title card → one scene per paragraph (the map moves to that moment, a place is
  // highlighted and pictured) → a question (data-quiz.js) → meanwhile around the world → a second question →
  // a fact and questions to talk about.
  const siteByEn = {}; A.sites.forEach(s => { siteByEn[s.en || s.n] = s; });
  function buildSteps(ci) {
    const c = CH[ci], beats = (A.beats || {})[c.id] || [], steps = [{ k: 'intro' }];
    c.story.forEach((_, i) => {
      const b = beats[i] || [c.t0 + (c.t1 - c.t0) * (i + 0.6) / c.story.length, c.view, null];
      steps.push({ k: 'scene', i, t: b[0], view: b[1], site: b[2] ? siteByEn[b[2]] : null });
    });
    const qs = (A.quiz || {})[c.id] || [];
    qs.filter(q => q.after !== 'mean').forEach(q => steps.push({ k: 'quiz', q }));
    steps.push({ k: 'mean' });
    qs.filter(q => q.after === 'mean').forEach(q => steps.push({ k: 'quiz', q }));
    steps.push({ k: 'end' });
    return steps;
  }
  function setFocus(s) {
    story.focus.forEach(o => { o.focus = false; o.el.classList.remove('focus'); });
    story.focus = s ? [s] : [];
    if (s) { s.focus = true; s.el.classList.add('focus'); }
    requestFrame();
  }
  const picOf = s => (s && s.w && A.pics && A.pics[s.w] && A.pics[s.w].f) ? A.pics[s.w] : null;

  // Chapters whose last step has been reached, remembered between visits.
  const storyDone = () => { try { const a = JSON.parse(localStorage.getItem('atlas-story-done')); if (Array.isArray(a)) return a; } catch (e) { } return []; };
  function storyMarkDone(ci) { const a = storyDone(); if (!a.includes(ci)) { a.push(ci); try { localStorage.setItem('atlas-story-done', JSON.stringify(a)); } catch (e) { } } }
  // The chapter list: jump to any chapter of the story.
  function storyToc() {
    const done = storyDone();
    return `<div class="sm-lbl">${T('smChapters')}</div><ol class="sm-toc">` + CH.map((c, i) =>
      `<li><button data-sm="goch" data-c="${i}" class="${i === story.ch ? 'cur' : ''}${done.includes(i) ? ' done' : ''}"><b>${i + 1}</b>` +
      `<span>${c.title}<small>${fmtRange(c.t0, c.t1)}${i === story.ch ? ' · ' + T('smHere') : ''}</small></span><i>${done.includes(i) ? '✓' : ''}</i></button></li>`).join('') + '</ol>';
  }
  function storyRender() {
    const c = CH[story.ch], st = story.steps[story.step], el = $('#story');
    const lastStep = story.step === story.steps.length - 1, lastCh = story.ch === NCH - 1;
    let body = '';
    if (story.toc) body = storyToc();
    else if (st.k === 'intro') {
      body = `<div class="sm-intro"><div class="sm-num">${story.ch + 1}</div><h2>${c.title}</h2><div class="sm-range">${fmtRange(c.t0, c.t1)}</div>` +
        `<div class="sm-lbl">${T('smIdea')}</div><p class="sm-idea">${c.idea}</p></div>`;
    } else if (st.k === 'scene') {
      const s = st.site, pic = picOf(s);
      if (pic) body += `<figure class="sm-pic" data-sm="place" title="${T('tipClick')}"><img src="${esc(pic.f)}" alt="${esc(s.n)}">` +
        `<figcaption><b>${s.n}</b> · ${s.d}<small>${esc(pic.by || 'Wikimedia Commons')}${pic.lic ? ' · ' + esc(pic.lic) : ''}</small></figcaption></figure>`;
      else if (s) body += `<div class="sm-place" data-sm="place"><b>${s.n}</b> · ${s.d}</div>`;
      body += `<p class="sm-text">${c.story[st.i]}</p>`;
    } else if (st.k === 'quiz') {
      const q = st.q;
      body = `<div class="sm-quiz"><div class="sm-lbl">${T('smThink')}</div><h3>${q.q}</h3>` +
        `<div class="sm-opts">${q.a.map((o, j) => `<button data-sm="opt" data-o="${j}">${o[0]}</button>`).join('')}</div>` +
        `<div class="sm-fb" hidden></div></div>`;
    } else if (st.k === 'mean') {
      body = `<div class="sm-lbl">${T('meanwhile')}</div><ul class="mean">${c.meanwhile.map(m => `<li><b>${m[0]}</b>${m[1]}</li>`).join('')}</ul>`;
    } else {
      body = `<div class="sm-lbl">${T('didYou')}</div><div class="fact">${c.fact}</div>` +
        `<div class="sm-lbl">${T('talk')}</div><ul class="ask">${c.ask.map(q => `<li>${q}</li>`).join('')}</ul>` +
        (lastCh ? `<p class="sm-idea">${T('smTheEnd')}</p><p><button class="linkish" data-sm="chain">${T('seeChain')}</button></p>` : '') +
        `<p><button class="linkish" data-sm="explore">${T('smExplore')}</button></p>`;
    }
    const next = lastStep ? (lastCh ? '' : `<button class="nx" data-sm="next"><small>${T('smNextCh')}</small>${CH[story.ch + 1].title}</button>`)
      : `<button class="nx" data-sm="next">${T(st.k === 'intro' ? 'smBegin' : 'smNext')}</button>`;
    el.innerHTML = `<div class="sm-top"><span>${T('chOf', { n: story.ch + 1, m: NCH })} · ${c.short}</span><span class="sm-acts"><button class="linkish" data-sm="toc">☰ ${T('smChapters')}</button><button class="linkish" data-sm="exit">${T('smExit')} ✕</button></span></div>` +
      `<div class="sm-prog">${story.steps.map((_, i) => `<i class="${i < story.step ? 'done' : i === story.step ? 'cur' : ''}"></i>`).join('')}</div>` +
      `<div class="sm-body">${body}</div>` +
      (story.toc ? `<div class="s-nav sm-nav"><button data-sm="toc">${T('smBackStory')}</button></div>`
        : `<div class="s-nav sm-nav"><button data-sm="back"${story.ch === 0 && story.step === 0 ? ' disabled' : ''}>${T('smBack')}</button>${next}</div>`);
    el.scrollTop = 0;
  }

  // Move the map's clock without the "chapter changed" logic restarting the story.
  const drive = v => { story.driving = true; setTime(v, { keepView: true }); story.driving = false; };
  function storyAnim(target) {
    const id = ++story.anim, from = t;
    playing = false; playBtn();
    const dist = Math.abs(posOf(target) - posOf(from));
    if (chIndex(from) !== chIndex(target) || dist < 1e-4) return drive(target);   // another chapter: jump
    const dur = target < from ? 800 : clamp(dist * SECS * 1000, 1500, 7000);     // the speed setting applies here too
    let start = 0;
    const step = ts => {
      if (id !== story.anim) return;
      if (!start) start = ts;
      const k = clamp((ts - start) / dur), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      drive(from + (target - from) * e);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function storyShow(ci, si, opt = {}) {
    ci = clamp(ci, 0, NCH - 1);
    if (ci !== story.ch || !story.steps.length) { story.ch = ci; story.steps = buildSteps(ci); }
    story.step = clamp(si < 0 ? story.steps.length + si : si, 0, story.steps.length - 1);
    const c = CH[ci], st = story.steps[story.step], span = c.t1 - c.t0;
    story.toc = !!opt.toc;
    if (st.k === 'end') storyMarkDone(ci);
    closePlace();
    let tt = null, view = c.view;
    if (st.k === 'intro') tt = c.t0 + span * 1e-4;
    else if (st.k === 'scene') { tt = st.t; view = st.view; }
    else if (st.k === 'mean') { tt = c.t1 - span * 0.03; view = 'world'; }
    else if (st.k === 'end') tt = c.t1 - span * 1e-3;
    const away = chIndex(t) !== ci;               // resuming on a question: bring the map to this chapter first
    if (st.k === 'quiz' && away) tt = c.t1 - span * 0.05;
    setFocus(st.k === 'scene' ? st.site : null);
    storyRender();
    try { localStorage.setItem('atlas-story', JSON.stringify({ ch: ci, step: story.step })); } catch (e) { }
    if (!opt.keepTime && tt != null) storyAnim(tt);
    if (mapOK && (st.k !== 'quiz' || away)) setView(view, true);
  }
  function storyNext() { if (story.step < story.steps.length - 1) storyShow(story.ch, story.step + 1); else if (story.ch < NCH - 1) storyShow(story.ch + 1, 0); }
  function storyBack() { if (story.step > 0) storyShow(story.ch, story.step - 1); else if (story.ch > 0) storyShow(story.ch - 1, -1); }
  const storySaved = () => { try { const p = JSON.parse(localStorage.getItem('atlas-story')); if (p && p.ch >= 0 && p.ch < NCH) return p; } catch (e) { } return null; };
  // Story mode has its own address: index.html?prica (or ?story). The address bar follows the mode.
  function storyUrl(on) {
    try {
      const u = new URL(location.href); u.searchParams.delete('prica'); u.searchParams.delete('story');
      const rest = u.searchParams.toString(), qs = (on ? 'prica' : '') + (on && rest ? '&' : '') + rest;
      history.replaceState(null, '', u.pathname + (qs ? '?' + qs : '') + u.hash);
    } catch (e) { }
  }
  function storyBtn() { const b = $('#storyBtn'); b.textContent = T(story.on ? 'exploreBtn' : 'storyBtn'); b.classList.toggle('on', story.on); }
  function storyStart(ci, si, opt) {
    stop(); showTab('atlas');
    story.on = true; story.steps = []; storyUrl(true);
    document.body.classList.add('storymode'); $('#story').classList.add('sm');
    storyBtn(); storyShow(ci, si || 0, opt);
  }
  function storyExit() {
    story.on = false; story.anim++; setFocus(null); storyUrl(false);
    document.body.classList.remove('storymode'); $('#story').classList.remove('sm');
    storyBtn(); renderStory();
    if (mapOK) setView(CH[cur].view, true);
  }
  $('#storyBtn').onclick = () => {
    if (story.on) return storyExit();
    const p = storySaved();                       // pick up where you left off in this chapter, otherwise start the chapter
    storyStart(cur, p && p.ch === cur ? p.step : 0);
  };
  $('#story').addEventListener('click', e => {
    const b = e.target.closest('[data-sm]'); if (!b || !story.on) return;
    const a = b.dataset.sm, st = story.steps[story.step];
    if (a === 'toc') { story.toc = !story.toc; storyRender(); }
    else if (a === 'goch') { const p = storySaved(), ci = +b.dataset.c; storyShow(ci, ci === story.ch && p && p.ch === ci ? p.step : 0); }
    else if (a === 'next') storyNext();
    else if (a === 'back') storyBack();
    else if (a === 'exit' || a === 'explore') storyExit();
    else if (a === 'chain') { storyExit(); showTab('causes'); }
    else if (a === 'place') { if (st.site) openPlace(st.site); }
    else if (a === 'opt' && st.k === 'quiz') {
      const q = st.q, j = +b.dataset.o, fb = $('#story .sm-fb'); fb.hidden = false;
      if (j === q.ok) {
        b.classList.add('ok');
        document.querySelectorAll('#story .sm-opts button').forEach(o => { o.disabled = true; });
        fb.className = 'sm-fb ok'; fb.innerHTML = `<b>${T('qRight')}</b> ${q.a[j][1]}`;
      } else {
        b.classList.add('no'); b.disabled = true;
        fb.className = 'sm-fb no'; fb.innerHTML = `<b>${T('qNo')}</b> ${q.a[j][1]} <i>${T('qAgain')}</i>`;
      }
    }
  });

  /* ================= tabs, welcome, init ================= */
  function showTab(name) {
    document.querySelectorAll('.view').forEach(v => v.classList.toggle('on', v.id === name));
    document.querySelectorAll('.tabs [data-tab]').forEach(b => b.classList.toggle('on', b.dataset.tab === name));
    hideTip();
    if (name === 'causes') { stop(); requestAnimationFrame(drawLinks); }
    else requestFrame();
  }
  document.querySelectorAll('.tabs [data-tab]').forEach(b => { b.onclick = () => showTab(b.dataset.tab); });
  addEventListener('resize', () => { if ($('#causes').classList.contains('on')) drawLinks(); });

  const welcome = $('#welcome');
  const seenIt = () => { welcome.hidden = true; try { localStorage.setItem('atlas-seen', '1'); } catch (e) { } };
  const showWelcome = () => {
    const p = storySaved(), c = $('#contBtn');
    c.hidden = !(p && (p.ch > 0 || p.step > 0));
    if (!c.hidden) c.textContent = T('wContinue', { n: p.ch + 1 });
    welcome.hidden = false;
  };
  $('#helpBtn').onclick = showWelcome;
  $('#startBtn').onclick = () => { seenIt(); storyStart(0, 0); };
  $('#contBtn').onclick = () => { seenIt(); const p = storySaved() || { ch: 0, step: 0 }; storyStart(p.ch, p.step); };
  $('#pickBtn').onclick = () => { seenIt(); const p = storySaved() || { ch: 0, step: 0 }; storyStart(p.ch, p.step, { toc: true }); };
  $('#exploreBtn').onclick = () => { seenIt(); if (story.on) storyExit(); showTab('atlas'); };

  // speed: seconds of play per chapter
  const SPEEDS = [['spVSlow', 60], ['spSlow', 38], ['spNormal', 24], ['spFast', 12]], speedEl = $('#speed');
  SPEEDS.forEach(([k, v]) => { const o = document.createElement('option'); o.value = v; o.textContent = T(k); speedEl.appendChild(o); });
  try { const v = +localStorage.getItem('atlas-speed'); if (SPEEDS.some(s => s[1] === v)) SECS = v; } catch (e) { }
  speedEl.value = SECS;
  speedEl.onchange = () => { SECS = +speedEl.value; try { localStorage.setItem('atlas-speed', SECS); } catch (e) { } };
  welcome.addEventListener('click', e => { if (e.target === welcome) welcome.hidden = true; });
  let seen = false; try { seen = !!localStorage.getItem('atlas-seen'); } catch (e) { }
  if (!seen) showWelcome();
  storyBtn();

  buildStrip();
  buildTimeline();
  buildCauses();
  initMap();
  let back = null; try { back = JSON.parse(sessionStorage.getItem('atlas-restore')); sessionStorage.removeItem('atlas-restore'); } catch (e) { }
  if (back && typeof back.t === 'number') {
    welcome.hidden = true; setTime(back.t);
    if (back.story) { const p = storySaved() || { ch: cur, step: 0 }; storyStart(p.ch, p.step); }
    if (back.tab === 'causes') showTab('causes');
  }
  else setTime(CH[0].t1 - (CH[0].t1 - CH[0].t0) * 0.02);
  // index.html?prica (or ?story) opens straight in story mode, where you left off
  // …and index.html?prica=10 (a chapter number, or its id such as ?prica=pyramids) opens that chapter.
  let wantStory = false, wantCh = -1;
  try {
    const q = new URLSearchParams(location.search), v = q.get('prica') || q.get('story') || '';
    wantStory = q.has('prica') || q.has('story');
    wantCh = /^\d+$/.test(v) ? +v - 1 : CH.findIndex(c => c.id === v);
    if (!(wantCh >= 0 && wantCh < NCH)) wantCh = -1;
  } catch (e) { }
  if (wantStory && (!story.on || wantCh >= 0)) {
    welcome.hidden = true;
    const p = storySaved() || { ch: 0, step: 0 };
    if (wantCh >= 0) storyStart(wantCh, p.ch === wantCh ? p.step : 0); else storyStart(p.ch, p.step);
  }
  window.ATLAS_APP = {
    setTime, goChapter, setView: (v) => setView(v, false), showTab, selectNode, openPlace, closePlace,
    storyStart, storyExit, storyNext, storyBack, get story() { return story.on; }, get storyPos() { return { ch: story.ch, step: story.step, steps: story.steps.map(s => s.k) }; },
    get t() { return t; }, get tab() { return $('#causes').classList.contains('on') ? 'causes' : 'atlas'; }
  };
})();
