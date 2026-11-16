/* Language layer. Loaded after the data files and lang-hr.js, before app.js.
   - ATLAS.lang            'en' | 'hr'
   - ATLAS.t(key, vars)    interface strings (the UI table below)
   - ATLAS.i18nWalk(fn)    visits every translatable content string: fn(key, english, set)
   Content keys: things with an id get a path key (ch.<id>.title, n.<id>.text, l.<from>><to>, s.<name>@<year>.x,
   q.<chapter>.<number>.q / .a0 / .f0 for story-mode questions …);
   short labels are looked up by their English text ("=Fertile Crescent").
   The Croatian content lives in js/lang-hr.js as window.ATLAS_HR = { key: 'tekst', … }.
   Anything without a translation stays in English. */
(function () {
  const A = window.ATLAS;

  A.i18nWalk = function (fn) {
    const used = {};
    const uniq = k => { if (!used[k]) { used[k] = 1; return k; } return k + '#' + (++used[k]); };
    const K = (key, o, p) => { if (typeof o[p] === 'string' && o[p]) fn(uniq(key), o[p], v => { o[p] = v; }); };
    const D = (o, p) => { if (typeof o[p] === 'string' && o[p]) fn('=' + o[p], o[p], v => { o[p] = v; }); };

    A.chapters.forEach(c => {
      const k = 'ch.' + c.id;
      K(k + '.title', c, 'title'); K(k + '.short', c, 'short'); K(k + '.idea', c, 'idea');
      c.story.forEach((_, i) => K(k + '.story.' + i, c.story, i));
      c.meanwhile.forEach((m, i) => { D(m, 0); K(k + '.mw.' + i, m, 1); });
      K(k + '.fact', c, 'fact');
      c.ask.forEach((_, i) => K(k + '.ask.' + i, c.ask, i));
    });
    A.themes.forEach(th => K('th.' + th[0], th, 1));
    A.nodes.forEach(n => { K('n.' + n.id + '.title', n, 'title'); K('n.' + n.id + '.text', n, 'text'); });
    A.links.forEach(l => K('l.' + l.from + '>' + l.to, l, 'why'));
    A.lanes.forEach(l => K('lane.' + l[0], l, 1));
    A.timeline.forEach(it => D(it, 'label'));
    for (const v in A.views) K('view.' + v, A.views[v], 'name');
    A.climate.forEach(c => D(c, 1));
    A.regions.forEach(r => {
      const id = 'r.' + (r.label || r.kind) + '@' + (Array.isArray(r.when) ? r.when[0] : typeof r.when === 'string' ? r.when : 'shelf');
      D(r, 'label'); D(r, 'sub'); K(id + '.x', r, 'x');
    });
    A.rivers.forEach(r => D(r, 'n'));
    A.routes.forEach(r => { const id = 'p.' + (r.label || r.kind) + '@' + r.t0; D(r, 'label'); K(id + '.x', r, 'x'); });
    A.sites.forEach(s => { const id = 's.' + s.n + '@' + s.t0; D(s, 'n'); D(s, 'd'); K(id + '.x', s, 'x'); });
    for (const ch in (A.quiz || {})) A.quiz[ch].forEach((q, i) => {
      const k = 'q.' + ch + '.' + i;
      K(k + '.q', q, 'q');
      q.a.forEach((o, j) => { K(k + '.a' + j, o, 0); K(k + '.f' + j, o, 1); });
    });
  };

  /* ---------- which language ---------- */
  let lang = 'en';
  if (typeof document !== 'undefined') {
    try {
      const q = new URLSearchParams(location.search).get('lang');
      const saved = localStorage.getItem('atlas-lang');
      if (q === 'hr' || q === 'en') lang = q;
      else if (saved === 'hr' || saved === 'en') lang = saved;
      else if ((navigator.language || '').toLowerCase().startsWith('hr')) lang = 'hr';
    } catch (e) { }
  }
  A.lang = lang;

  /* ---------- content ---------- */
  A.sites.forEach(s => { s.en = s.n; s.w = (A.wiki || {})[s.n] || null; });   // picture source, looked up by the English name
  A.i18nMissing = [];
  if (lang === 'hr') {
    const HR = window.ATLAS_HR || {};
    A.i18nWalk((key, en, set) => { const v = HR[key]; if (typeof v === 'string' && v) set(v); else A.i18nMissing.push(key); });
  }

  /* ---------- interface ---------- */
  const UI = {
    en: {
      title: 'The Ancient World',
      docTitle: 'The Ancient World — a connected atlas',
      tagline: 'a connected atlas · from the first humans to the fall of Rome',
      tabAtlas: 'Atlas', tabCauses: 'Chain of causes', help: 'How to use',
      mapAria: 'World map for the selected moment in time',
      prev: 'Previous chapter', next: 'Next chapter', playTitle: 'Play this chapter (space)', play: 'Play', pause: 'Pause', time: 'Time',
      meanwhile: 'Meanwhile, around the world',
      tlHint: 'Each row is a part of the world. Read down the red line to see what was happening at the same moment.',
      taller: 'Taller', shorter: 'Shorter',
      czTitle: 'The chain of causes',
      czIntro: 'Every box is a big change. Arrows show what caused what. Time runs left to right. Click a box to trace everything that led to it and everything it led to.',
      wLead: 'One connected story in 18 chapters, from the first upright walkers to the fall of Rome. Egypt runs through it from the green Sahara to Cleopatra.',
      w1: '<b>The map is a time machine.</b> Drag the time bar or press ▶ and watch ice sheets melt, people spread, deserts dry and empires grow. Hover over anything for details, and click a place to see a picture.',
      w2: '<b>Every chapter asks why.</b> Beside each story you will find what caused it and what it led to. Click a cause to jump back to where it began.',
      w3: '<b>The bottom timeline shows "meanwhile".</b> Each row is a part of the world, so you can see what was happening everywhere at the same moment.',
      w0: '<b>Story mode tells it step by step.</b> Short scenes with pictures, the map moving along, and questions to check you followed the why.',
      start: 'Start the story', wContinue: 'Continue the story (chapter {n})', wExplore: 'Explore on my own',
      storyBtn: '▶ Story mode', exploreBtn: 'Explore freely', speed: 'Speed',
      spVSlow: 'Very slow', spSlow: 'Slow', spNormal: 'Normal speed', spFast: 'Fast',
      smBack: '← Back', smNext: 'Next →', smBegin: 'Begin →', smNextCh: 'Next chapter →', smExit: 'Exit story',
      smIdea: 'The big idea', smThink: 'Your turn', qRight: 'Yes!', qNo: 'Not quite.', qAgain: 'Try another answer.',
      smExplore: 'Explore this chapter on the map', smTheEnd: 'You have reached the end of the story. Everything that came after grew out of it.',
      mapErrT: 'The map could not load.', mapErrLib: 'The map library files in the vendor folder are missing.',
      mapErrLand: 'The coastline file vendor/land-50m.js is missing.', mapErrRest: 'The story, timeline and chain of causes still work.',
      route: 'Route', tipClick: 'Click for a picture', plMore: 'More on Wikipedia →', plCredit: 'Picture: Wikipedia', plPic: 'Picture', plNoNet: 'This picture needs an internet connection.', plNoImg: 'No picture for this place yet.', plClose: 'Close',
      lgIce: 'Ice sheets', lgShelf: 'Dry land when seas were lower', lgGreen: 'Green Sahara', lgEarly: 'Earlier humans',
      lgNeander: 'Neanderthals', lgDeniso: 'Denisovans', lgSapiens: 'Homo sapiens (us)', lgFarm: 'Where farming began',
      lgCulture: 'Peoples and cultures', lgCiv: 'Kingdoms and empires', lgMigr: 'Migrations', lgFarmSp: 'Farming spreads',
      lgMove: 'Peoples on the move', lgTrade: 'Trade routes', lgWar: 'Armies and invasions',
      dPeople: 'people', dVillage: 'village', dCity: 'city', dMonument: 'monument', dArt: 'art, ideas', dInvention: 'invention', dNature: 'nature', dBattle: 'battle',
      stClimate: 'Climate', stSea: 'Sea level', stPop: 'People on Earth',
      seaSame: 'about the same as today', seaLower: '{n} m lower than today',
      popUnknown: 'unknown, but well under a million', popUnder: 'under a million', popAbout: 'about {n} million',
      chShort: 'ch.{n}', because: 'Because', ledTo: 'Led to', chOf: 'Chapter {n} of {m}',
      whyH: 'Why it happened, and what it led to', whyHint: 'click a link to see how',
      seeChain: 'See the whole chain of causes →', didYou: 'Did you know?', talk: 'Talk about it',
      prevS: '← Previous', nextS: 'Next →', goCh: 'Go to chapter {n}: {title} →',
      openCh: 'Open this chapter', howRead: 'How to read this',
      howReadP: 'History is not a list of dates. Each change made the next one possible. Thick arrows mark the main chain; thin arrows are the side links.',
      tryFrom: 'Try tracing back from', chParen: '(chapter {n})', chLink: 'Chapter {n}: {title} →',
      becauseOf: 'Because of', startPoint: 'This is one of the starting points of the story.', whichLed: 'Which led to', clear: 'Clear selection'
    },
    hr: {
      title: 'Drevni svijet',
      docTitle: 'Drevni svijet — povezani atlas',
      tagline: 'povezani atlas · od prvih ljudi do pada Rima',
      tabAtlas: 'Atlas', tabCauses: 'Lanac uzroka', help: 'Kako se koristi',
      mapAria: 'Karta svijeta za odabrani trenutak u vremenu',
      prev: 'Prethodno poglavlje', next: 'Sljedeće poglavlje', playTitle: 'Pokreni ovo poglavlje (razmaknica)', play: 'Pokreni', pause: 'Pauza', time: 'Vrijeme',
      meanwhile: 'Istodobno, diljem svijeta',
      tlHint: 'Svaki red je jedan dio svijeta. Čitaj niz crvenu crtu da vidiš što se događalo u istom trenutku.',
      taller: 'Povećaj', shorter: 'Smanji',
      czTitle: 'Lanac uzroka',
      czIntro: 'Svaki okvir je jedna velika promjena. Strelice pokazuju što je uzrokovalo što. Vrijeme teče slijeva nadesno. Klikni na okvir da pratiš sve što je do njega dovelo i sve do čega je on doveo.',
      wLead: 'Jedna povezana priča u 18 poglavlja, od prvih uspravnih hodača do pada Rima. Egipat se provlači kroz nju od zelene Sahare do Kleopatre.',
      w1: '<b>Karta je vremeplov.</b> Povuci vremensku traku ili pritisni ▶ i gledaj kako se ledeni pokrovi tope, ljudi se šire, pustinje se suše, a carstva rastu. Prijeđi mišem preko bilo čega za detalje, a klikni na mjesto da vidiš sliku.',
      w2: '<b>Svako poglavlje pita zašto.</b> Uz svaku priču naći ćeš što ju je uzrokovalo i do čega je dovela. Klikni na uzrok da skočiš natrag onamo gdje je sve počelo.',
      w3: '<b>Donja vremenska crta pokazuje „istodobno”.</b> Svaki red je jedan dio svijeta, pa možeš vidjeti što se u istom trenutku događalo posvuda.',
      w0: '<b>Priča vodi korak po korak.</b> Kratki prizori sa slikama, karta koja se kreće i pitanja kojima provjeravaš jesi li shvatio zašto se što dogodilo.',
      start: 'Započni priču', wContinue: 'Nastavi priču ({n}. poglavlje)', wExplore: 'Istraži samostalno',
      storyBtn: '▶ Priča', exploreBtn: 'Slobodno istraži', speed: 'Brzina',
      spVSlow: 'Vrlo sporo', spSlow: 'Sporo', spNormal: 'Normalna brzina', spFast: 'Brzo',
      smBack: '← Natrag', smNext: 'Dalje →', smBegin: 'Kreni →', smNextCh: 'Sljedeće poglavlje →', smExit: 'Izađi iz priče',
      smIdea: 'Glavna misao', smThink: 'Tvoj red', qRight: 'Točno!', qNo: 'Nije baš.', qAgain: 'Pokušaj s drugim odgovorom.',
      smExplore: 'Istraži ovo poglavlje na karti', smTheEnd: 'Stigli ste do kraja priče. Sve što je došlo poslije izraslo je iz nje.',
      mapErrT: 'Karta se nije mogla učitati.', mapErrLib: 'Nedostaju datoteke biblioteke za kartu u mapi vendor.',
      mapErrLand: 'Nedostaje datoteka s obalama vendor/land-50m.js.', mapErrRest: 'Priča, vremenska crta i lanac uzroka i dalje rade.',
      route: 'Ruta', tipClick: 'Klikni za sliku', plMore: 'Više na Wikipediji →', plCredit: 'Slika: Wikipedija', plPic: 'Slika', plNoNet: 'Za ovu sliku potrebna je internetska veza.', plNoImg: 'Za ovo mjesto još nema slike.', plClose: 'Zatvori',
      lgIce: 'Ledeni pokrovi', lgShelf: 'Kopno dok je more bilo niže', lgGreen: 'Zelena Sahara', lgEarly: 'Raniji ljudi',
      lgNeander: 'Neandertalci', lgDeniso: 'Denisovci', lgSapiens: 'Homo sapiens (mi)', lgFarm: 'Gdje je počela poljoprivreda',
      lgCulture: 'Narodi i kulture', lgCiv: 'Kraljevstva i carstva', lgMigr: 'Seobe', lgFarmSp: 'Širenje poljoprivrede',
      lgMove: 'Narodi u pokretu', lgTrade: 'Trgovački putovi', lgWar: 'Vojske i invazije',
      dPeople: 'ljudi', dVillage: 'selo', dCity: 'grad', dMonument: 'spomenik', dArt: 'umjetnost, ideje', dInvention: 'izum', dNature: 'priroda', dBattle: 'bitka',
      stClimate: 'Klima', stSea: 'Razina mora', stPop: 'Ljudi na Zemlji',
      seaSame: 'otprilike kao danas', seaLower: '{n} m niža nego danas',
      popUnknown: 'nepoznato, ali znatno manje od milijun', popUnder: 'manje od milijun', popAbout: 'oko {n} milijuna', popOne: 'oko milijun',
      chShort: 'pogl. {n}', because: 'Uzroci', ledTo: 'Dovelo do', chOf: 'Poglavlje {n} od {m}',
      whyH: 'Zašto se dogodilo i do čega je dovelo', whyHint: 'klikni na vezu da vidiš kako',
      seeChain: 'Pogledaj cijeli lanac uzroka →', didYou: 'Jeste li znali?', talk: 'Razgovarajte o tome',
      prevS: '← Prethodno', nextS: 'Sljedeće →', goCh: 'Idi na poglavlje {n}: {title} →',
      openCh: 'Otvori ovo poglavlje', howRead: 'Kako ovo čitati',
      howReadP: 'Povijest nije popis datuma. Svaka promjena omogućila je sljedeću. Debele strelice označavaju glavni lanac, a tanke sporedne veze.',
      tryFrom: 'Pokušaj pratiti unatrag od', chParen: '(poglavlje {n})', chLink: 'Poglavlje {n}: {title} →',
      becauseOf: 'Zbog čega', startPoint: 'Ovo je jedno od polazišta priče.', whichLed: 'Što je dovelo do', clear: 'Poništi odabir'
    }
  };
  A.t = function (key, vars) {
    let s = UI[lang][key]; if (s == null) s = UI.en[key]; if (s == null) return key;
    if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
    return s;
  };

  if (typeof document === 'undefined') return;
  document.documentElement.lang = lang;
  document.title = A.t('docTitle');
  document.querySelectorAll('[data-i18n]').forEach(e => { e.innerHTML = A.t(e.dataset.i18n); });
  document.querySelectorAll('[data-i18n-title]').forEach(e => { e.title = A.t(e.dataset.i18nTitle); });
  document.querySelectorAll('[data-i18n-aria]').forEach(e => { e.setAttribute('aria-label', A.t(e.dataset.i18nAria)); });

  /* Switching language reloads the page; app.js puts you back at the same moment and tab. */
  document.querySelectorAll('[data-lang]').forEach(b => {
    b.classList.toggle('on', b.dataset.lang === lang);
    b.onclick = () => {
      if (b.dataset.lang === lang) return;
      try {
        localStorage.setItem('atlas-lang', b.dataset.lang);
        const app = window.ATLAS_APP;
        if (app) sessionStorage.setItem('atlas-restore', JSON.stringify({ t: app.t, tab: app.tab, story: app.story }));
      } catch (e) { }
      const u = new URL(location.href); u.searchParams.delete('lang');
      location.replace(u.href);
    };
  });
})();
