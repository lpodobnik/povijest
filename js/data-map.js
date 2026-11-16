/* Map layers. All coordinates are [longitude, latitude]; rings are rough outlines
   (most are clipped to the coastline when drawn). Years: negative = BCE. */
(function () {
  const regions = [], routes = [], sites = [], rivers = [];
  // R(kind, label, ring, when, opts)  when: [from,to] | 'ice' | 'green' | 'always' | {shelf:g}
  const R = (kind, label, ring, when, o = {}) => regions.push(Object.assign({ kind, label, ring, when }, o));
  // P(kind, label, points, start, arrive, until, text)
  const P = (kind, label, pts, t0, t1, until, x) => routes.push({ kind, label, pts, t0, t1, until, x });
  // S(name, lon, lat, from, to, kind, rank, dateText, text)
  //   kind: f fossil/people · a art & ideas · v village · c city · m monument · e natural event · i invention · b battle
  const S = (n, lon, lat, t0, t1, k, r, d, x) => sites.push({ n, c: [lon, lat], t0, t1, k, r, d, x });

  /* ---------------- ICE, SEA LEVEL, CLIMATE ---------------- */
  R('ice', 'Ice sheet', [[-140,61],[-150,60.5],[-158,57],[-152,58],[-140,58.5],[-135,55],[-130,51],[-125,47.5],[-120,47],[-115,47.5],[-110,48],[-104,47.5],[-100,45],[-96,42],[-92,41],[-89,39.5],[-85,39.5],[-81,40.5],[-77,41],[-74,40.6],[-70,41.3],[-66,43],[-60,45],[-55,47],[-52,49],[-56,54],[-60,58],[-63,62],[-66,66],[-72,71],[-78,75],[-85,79],[-95,81],[-110,79],[-122,76],[-128,71],[-135,69],[-134,65],[-137,62.5]],
    'ice', { end: [-8000, -5000], at: [-95, 60], x: `The North American ice sheet: up to 3 km thick, reaching as far south as New York.` });
  R('ice', '', [[-73,78],[-60,82],[-35,83.5],[-18,81],[-18,75],[-22,70],[-32,67.5],[-42,60],[-48,61],[-53,66],[-56,72],[-66,76.5]], 'always', {});
  R('ice', 'Ice sheet', [[-10,52],[-4,51.8],[0,52.8],[4,54.5],[9,53.5],[13,52.3],[18,52],[23,53],[28,54.5],[33,56.5],[38,59.5],[44,62],[50,66],[58,69],[66,72.5],[68,77],[55,81],[30,81.5],[10,80.5],[8,76],[10,71],[2,65],[-3,61.5],[-9,58.5],[-11,55]],
    'ice', { end: [-9700, -7800], at: [22, 64], x: `The European ice sheet covered Scandinavia, the Baltic, and most of Britain and Ireland.` });
  R('ice', '', [[5.5,45.2],[8,45.4],[11,45.8],[14.3,46.6],[13.5,47.8],[10,47.9],[7,47.5],[5.8,46.4]], 'ice', { end: [-12500, -9500] });
  R('ice', '', [[-73.5,-38],[-71,-39],[-70.5,-45],[-70,-51],[-67.5,-55],[-72,-55.5],[-75.5,-50],[-75,-44]], 'ice', { end: [-12500, -9500] });

  R('shelf', 'Beringia', [[170,70.5],[180,71.5],[192,71.5],[203,71],[203,66],[198,62],[200,58.5],[196,56.5],[190,57],[181,61.5],[177,62.5],[172,64],[170,67]],
    { shelf: 0.33 }, { at: [184, 65.5], x: `Beringia: a cold, grassy plain that joined Siberia to Alaska whenever the sea was low.` });
  R('shelf', 'Doggerland', [[-1.5,55.5],[1,57.6],[5,57.8],[8.3,56.5],[8.6,54],[5,53.2],[3.5,51.6],[1.4,51.2],[1.6,52.8],[0,53.8]],
    { shelf: 0.08 }, { at: [3.5, 55], x: `Doggerland: hills, rivers and marshes where the North Sea is now. Fishing boats still dredge up mammoth bones and spear points.` });
  R('shelf', '', [[-5.5,49],[-2,49.3],[1.5,50.2],[2,51.2],[0,50.9],[-3,50.5],[-5.3,50.1]], { shelf: 0.2 }, {});
  R('shelf', 'Sunda', [[100,13],[103,10],[106,9],[109.5,6],[113,5],[117.5,7],[118.5,4],[117.5,0],[116.3,-3.8],[114.5,-5],[115.5,-8.2],[112,-8.2],[108,-7.7],[105.5,-6.8],[104,-5.5],[101,-2],[98,2],[95.5,5.5],[98.5,8],[99,10]],
    { shelf: 0.15 }, { at: [108, 3], x: `Sundaland: Sumatra, Java and Borneo were joined to mainland Asia by dry plains.` });
  R('shelf', 'Sahul', [[130,-10.5],[133,-8.5],[134.5,-5.8],[138,-5.5],[141,-8],[144,-9.2],[144.5,-12],[142,-15],[139.5,-18],[135.5,-15.8],[131.5,-13]],
    { shelf: 0.1 }, { at: [137.5, -10.5], x: `Sahul: Australia and New Guinea were a single continent.` });
  R('shelf', '', [[121,-19],[123,-14.5],[127.5,-11.5],[130.5,-10.5],[131,-12.5],[128.5,-15],[125,-16.5],[122.5,-18.5]], { shelf: 0.2 }, {});
  R('shelf', '', [[143.5,-38.5],[146.5,-38.6],[148.5,-40.5],[148.3,-43.5],[146,-43.8],[144.5,-41],[143.6,-39.5]], { shelf: 0.42 }, {});
  R('shelf', '', [[48,30],[50.5,29.8],[53,26.8],[56.3,26.5],[56,25],[53.5,24.2],[51,24.5],[50,26.5],[48.2,28.5]], { shelf: 0.1 }, {});
  R('shelf', '', [[118,39],[122,40.5],[125,39],[126.5,35],[126,33],[124,30],[122.5,27],[121,25],[120,23],[117,23.5],[119,27],[121,31],[119.5,35],[118,37.5]], { shelf: 0.15 }, {});
  R('shelf', '', [[12.3,45.7],[13.7,45.7],[14.3,45],[15.2,44],[16,43.3],[15.5,42.6],[14.4,42.6],[13.6,43.5],[12.6,44.2],[12.3,45]], { shelf: 0.2 }, {});

  R('green', 'Green Sahara', [[-15,17],[-13,26],[-6,31],[5,33],[10,31.5],[20,30.5],[28,30.5],[32,29.5],[34,26],[36.5,21],[36,17],[30,15],[20,14.5],[10,15],[0,16],[-8,16.5]],
    'green', { at: [10, 23.5], x: `In wet periods the Sahara was grassland with lakes and rivers, full of hippos, giraffes and people.` });
  R('green', '', [[36,28],[40,30],[46,29],[50,25],[55,22.5],[57,19],[52,16.5],[45,13.5],[42.5,16],[39,21],[36.5,25]], 'green', {});
  R('lake', 'Lake Mega-Chad', [[13,12],[15.5,11.5],[18.5,13.5],[19.5,16.5],[18,18],[15.5,17],[13.5,15]], 'green', { at: [16.3, 14.8], x: `In the green Sahara, Lake Chad was bigger than any lake on Earth today.` });
  R('lake', 'Lake Agassiz', [[-104,53],[-98,56],[-92,54],[-90,50],[-94,47],[-98,46],[-101,49]], [-11500, -6300], { at: [-97, 51], x: `A vast lake of meltwater dammed by the ice. When it burst into the ocean it chilled the whole northern world.` });

  /* ---------------- WHO LIVES WHERE: HUMAN SPECIES ---------------- */
  R('early', 'Early humans', [[12,14],[22,17],[38,15],[44,10],[41,-3],[40,-15],[35,-25],[28,-34.5],[18,-34],[14,-20],[22,-8],[28,3],[15,8]], [ya(7e6), ya(300000)], { at: [29, -6], x: `For millions of years upright-walking apes and early humans lived only in Africa.` });
  R('early', 'Homo erectus', [[35,30],[45,42],[60,40],[75,37],[90,30],[105,40],[118,42],[122,37],[121,28],[110,20],[108,10],[104,1],[106,-6.5],[114,-8.5],[105,-8.2],[98,3],[97,16],[90,21],[80,10],[73,18],[67,24],[57,25],[48,29],[40,25]], [ya(1.75e6), ya(300000)], { at: [92, 26], fin: 150000, x: `Homo erectus: the first humans to live outside Africa, for well over a million years.` });
  R('early', '', [[-9.5,36.5],[-9,43.5],[-2,48],[8,51],[20,50],[30,47],[40,45],[44,41],[36,36.5],[27,36],[15,37],[0,37]], [ya(1.2e6), ya(400000)], { fin: 150000 });
  R('neander', 'Neanderthals', [[-9,37],[-9,43],[-4,48.5],[2,51],[12,52.5],[25,52],[40,51],[55,51.5],[70,52],[85,52.5],[90,50],[84,46],[70,40],[60,36.5],[50,32],[40,31],[35,30.5],[34,34],[27,36],[22,37],[15,37.5],[8,39],[0,37.5],[-5,36]], [ya(400000), ya(40000)], { at: [32, 48.5], fout: 3000, x: `Neanderthals: strong, big-brained humans adapted to the cold of Ice Age Europe and western Asia.` });
  R('deniso', 'Denisovans', [[84,52],[100,53],[120,52],[130,47],[128,40],[122,37],[121.5,28],[118,23],[108,17],[103,14],[98,17],[93,24],[85,28],[80,33],[78,40],[80,47]], [ya(300000), ya(45000)], { at: [105, 36], fout: 5000, x: `Denisovans: a mysterious human group known mostly from DNA. People in Asia and Oceania still carry some of it.` });
  const SAP = { fout: 1200 };
  R('sapiens', 'Homo sapiens', [[-19,15],[-13,29],[-6,36.5],[11,38],[25,33],[33,32],[36,25],[44,11.5],[52,12],[48,0],[41,-14],[36,-25],[28,-35.5],[17,-35.5],[11,-17],[8,-1],[7,4.5],[-9,4],[-18,10]], [ya(300000), -9000], Object.assign({ at: [22, 3], fin: 20000, x: `Homo sapiens: our own species, at first found only in Africa.` }, SAP));
  R('sapiens', '', [[33,31.5],[36,37],[44,37.5],[48,31],[52,26],[57,24.5],[59,21],[55,16.5],[45,12.5],[42.5,15],[38.5,21],[34.5,28]], [ya(125000), ya(90000)], { fin: 8000, fout: 8000 });
  R('sapiens', '', [[33,31.5],[36,37],[44,37.5],[48,31],[52,26],[57,24.5],[59,21],[55,16.5],[45,12.5],[42.5,15],[38.5,21],[34.5,28]], [ya(62000), -9000], Object.assign({ fin: 6000 }, SAP));
  R('sapiens', '', [[48,38],[60,38],[72,36],[80,31],[89,27.5],[93,22],[88,20.5],[80.5,14],[78,7.5],[75.5,10],[72,20.5],[66,24.5],[57,25],[50,29.5]], [ya(60000), -9000], Object.assign({ fin: 6000 }, SAP));
  R('sapiens', '', [[92,27],[100,26],[108,22.5],[110,15],[108,9],[118,7.5],[120,-2],[117,-9],[105,-8],[97,1],[95,6],[98,9],[97.5,17],[93,20]], [ya(56000), -9000], Object.assign({ fin: 6000 }, SAP));
  R('sapiens', '', [[113,-22],[122,-17],[131,-11],[137,-2],[147,-5],[151,-10],[146,-18],[154,-27],[150,-38],[147,-44],[140,-38.5],[130,-32],[115,-35]], [ya(50000), -9000], Object.assign({ fin: 6000 }, SAP));
  R('sapiens', '', [[100,26],[98,35],[104,42],[118,43],[130,43],[131,37],[123,37],[122.5,30],[119.5,25],[110,21]], [ya(42000), -9000], Object.assign({ fin: 6000 }, SAP));
  R('sapiens', '', [[129.5,31],[131,34.5],[136,37.5],[140,41.8],[142,45.6],[145.8,43.5],[141.5,37],[140.5,34.8],[135,33],[131,30.7]], [ya(38000), -9000], Object.assign({ fin: 2000 }, SAP));
  R('sapiens', '', [[50,40],[52,50],[60,56],[75,59],[90,58],[105,57],[118,54],[118,44],[104,42],[98,36],[80,36],[70,37],[60,38]], [ya(43000), -9000], Object.assign({ fin: 5000 }, SAP));
  R('sapiens', '', [[-9.5,36.5],[-9.5,43.5],[-4.5,48.5],[2,51],[8,53.5],[18,54.5],[30,56],[42,56],[50,50],[50,41],[42,41],[36,36.5],[28,36.5],[23,36.5],[15,37],[8,43.5],[0,38]], [ya(41000), -9000], Object.assign({ fin: 5000 }, SAP));
  R('sapiens', '', [[105,57],[110,66],[125,72],[145,72.5],[170,70],[190,67],[203,66],[202,58],[196,56],[180,61],[165,58],[156,50],[142,52],[135,54],[120,54]], [ya(26000), -9000], Object.assign({ fin: 7000 }, SAP));
  R('sapiens', '', [[-125,48],[-110,48.5],[-95,43],[-83,40],[-75,40],[-76,34],[-81,25],[-90,29],[-97,25.5],[-97,16],[-88,15],[-83,9],[-78,7],[-83,7.5],[-92,13],[-105,19],[-110,23],[-117,32],[-124,40]], [ya(16000), -9000], Object.assign({ fin: 6000 }, SAP));
  R('sapiens', '', [[-78,8],[-72,12],[-60,9.5],[-50,1],[-35,-6],[-39,-17],[-48,-27],[-57,-37.5],[-65,-45],[-68,-54.5],[-74,-51],[-73,-38],[-70,-18],[-81,-5],[-79,2]], [-12300, -9000], Object.assign({ fin: 1500 }, SAP));

  /* ---------------- FARMING HOMELANDS ---------------- */
  const FARM = { fin: 800, fout: 800 };
  R('farm', 'Fertile Crescent', [[35,30.5],[36,36],[38,38],[42,38.5],[44.5,37],[47.5,34.5],[49.5,31.5],[47.5,31.5],[45.5,34],[43,36],[40,36.2],[38,35.8],[36.8,33.5],[36.2,30.5]], [-9500, -4200], Object.assign({ sub: 'wheat · barley · sheep · goats', at: [40.5, 37.2], x: `The Fertile Crescent: the hills where wild wheat, barley, sheep and goats all lived, and where they were first farmed.` }, FARM));
  R('farm', 'Yellow River', [[105,34],[108,38],[114,38.5],[118.5,37],[118,34],[112,33.5]], [-6800, -3600], Object.assign({ sub: 'millet · pigs', at: [112, 36.3], x: `Northern China: millet and pigs.` }, FARM));
  R('farm', 'Yangtze', [[108,29],[110,32],[116,32.5],[121.5,32],[121.5,29.5],[115,28]], [-7300, -3600], Object.assign({ sub: 'rice', at: [115, 30.3], x: `Southern China: the home of rice.` }, FARM));
  R('farm', 'New Guinea', [[140.5,-4],[144,-4.5],[147.5,-6],[146.5,-7.5],[142.5,-6.8],[140.5,-5.5]], [-5000, -1500], Object.assign({ sub: 'taro · banana', at: [144, -5.8], x: `Highland New Guinea: taro, bananas and sugar cane, in drained swamp gardens.` }, FARM));
  R('farm', 'Mexico', [[-104.5,20.5],[-98,21],[-93,18.5],[-91.5,15],[-96,15.5],[-103,17.5]], [-7500, -1700], Object.assign({ sub: 'squash · maize · beans', at: [-98.5, 18], x: `Mexico: squash, beans, and maize bred from a wild grass.` }, FARM));
  R('farm', 'Andes', [[-80.5,1],[-76,1],[-70,-8],[-66.5,-16],[-68.5,-19],[-72,-17],[-79,-8],[-81,-4]], [-7000, -3100], Object.assign({ sub: 'potato · quinoa · llama', at: [-74.5, -8], x: `The Andes: potatoes, quinoa, beans, and the llama.` }, FARM));
  R('farm', 'Amazonia', [[-68,-9.5],[-62,-9],[-60.5,-13],[-64,-15.5],[-68,-13.5]], [-6000, -2500], Object.assign({ sub: 'manioc', at: [-64.3, -12], x: `South-west Amazonia: manioc (cassava) and peanuts.` }, FARM));
  R('farm', 'Sahel', [[-10,16],[10,16.5],[25,16],[36,15.5],[36,11.5],[20,10.5],[0,11],[-10,12]], [-3000, -1400], Object.assign({ sub: 'sorghum · millet', at: [12, 13.5], x: `The Sahel: sorghum and pearl millet, crops made for hot dry summers.` }, FARM));
  R('farm', 'Ohio & Mississippi', [[-92,40],[-84,40.5],[-82,37],[-86,34],[-92,35]], [-2500, -1000], Object.assign({ sub: 'sunflower · squash', at: [-87.5, 37.5], x: `Eastern North America: sunflowers, squash and goosefoot.` }, FARM));

  /* ---------------- CULTURES, KINGDOMS, EMPIRES ---------------- */
  const EG = [[29.6,31.4],[32.5,31.5],[31.7,30],[31.7,28],[32.1,27],[33.2,26.1],[33.3,24],[32.5,23.9],[32.2,25.6],[31.2,26.4],[30.5,27.5],[30.2,29.3],[30.4,30.2]];
  R('civ', 'Lower Egypt', [[29.6,31.4],[32.5,31.5],[31.7,30],[31.6,29.4],[30.4,29.3],[30.4,30.2]], [-3600, -3100], { c: 'b', at: [31, 30.7], x: `Lower Egypt: the marshy Delta in the north. Its symbol was a red crown.` });
  R('civ', 'Upper Egypt', [[31.6,29.3],[31.7,28],[32.1,27],[33.2,26.1],[33.3,24],[32.5,23.9],[32.2,25.6],[31.2,26.4],[30.5,27.5],[30.4,29.2]], [-3600, -3100], { c: 'a', at: [32.2, 26.3], x: `Upper Egypt: the narrow valley in the south. Its symbol was a white crown.` });
  R('civ', 'Egypt', EG, [-3100, -2181], { c: 'a', sub: 'Old Kingdom', at: [31.3, 28], x: `Egypt united: one king rules the whole valley. The Old Kingdom is the age of the pyramids.` });
  R('culture', 'Egypt', EG, [-2181, -2055], { sub: 'broken into rival provinces', at: [31.3, 28], x: `The First Intermediate Period: no single king; governors and two rival dynasties fight it out.` });
  R('civ', 'Egypt', [[29.6,31.4],[32.5,31.5],[31.7,30],[31.7,28],[32.1,27],[33.2,26.1],[33.3,24],[32.6,22],[31.6,21.3],[30.8,21.6],[31.8,23.5],[32.2,25.6],[31.2,26.4],[30.5,27.5],[30.2,29.3],[30.4,30.2]], [-2055, -1650], { c: 'a', sub: 'Middle Kingdom', at: [31.3, 28], x: `The Middle Kingdom: Egypt reunited from Thebes, with forts pushed south into Nubia.` });
  R('civ', 'Hyksos', [[29.6,31.4],[32.5,31.5],[34.4,31.3],[32.5,29.8],[31,29.5],[30.4,30.2]], [-1650, -1550], { c: 'b', at: [31.6, 30.8], x: `The Hyksos: rulers from the Levant who held northern Egypt, with chariots and bronze weapons.` });
  R('civ', 'Thebes', [[32.1,27],[33.2,26.1],[33.3,24],[32.5,23.9],[32.2,25.6],[31.4,26.6]], [-1650, -1550], { c: 'a', at: [32.6, 25.4], x: `Egyptian kings held on in the south at Thebes, squeezed between the Hyksos and Kush.` });
  R('civ', 'Egypt', [[24.5,31.5],[29,31.5],[34.3,31.3],[35.3,33],[35.8,35.5],[37.5,36],[38,34.5],[36.8,32.5],[36,30.5],[35,29.5],[34,28],[34.5,25],[35.5,23],[34,19.5],[33,18],[31,18],[30,19.5],[30.5,22],[31.5,24],[30,26],[28.5,28.5],[26,30]], [-1550, -1070], { c: 'a', sub: 'New Kingdom empire', at: [31.5, 27], fin: 60, x: `The New Kingdom: Egypt at its largest, ruling Nubia in the south and Canaan and Syria in the north.` });
  R('civ', 'Egypt', EG, [-1070, -747], { c: 'a', sub: 'divided', at: [31.3, 28], x: `After the empire: priests rule the south, kings of Libyan descent rule the north.` });
  R('civ', 'Kush & Egypt', [[29.6,31.4],[32.5,31.5],[31.7,30],[32.1,27],[33.3,24],[34.5,19.5],[34.8,16.5],[33,15],[31.5,16.5],[30,18.5],[30.8,21.6],[32.2,25.6],[30.5,27.5],[30.2,29.3]], [-747, -656], { c: 'e', sub: 'pharaohs from Kush', at: [31.4, 24], x: `The 25th Dynasty: kings from Kush (Sudan) rule all of Egypt and revive its old traditions.` });
  R('civ', 'Egypt', EG, [-656, -525], { c: 'a', sub: 'last independent dynasty', at: [31.3, 28], x: `The Saite kings: Egypt's last long spell of independence, defended by hired Greek soldiers.` });
  R('civ', 'Kerma', [[30,21.5],[31.5,21.5],[31.2,19],[30.5,18.3],[29.9,19.5]], [-2500, -1500], { c: 'e', at: [30.6, 19.8], x: `Kerma: the first kingdom of Nubia, rich in gold and cattle, and Egypt's rival.` });
  R('civ', 'Kush', [[30,22],[32.5,22],[34.5,19.5],[34.8,16.5],[33,15],[31.5,16.5],[30,18.5]], [-1070, 350], { c: 'e', at: [32.5, 18], x: `Kush: a Nubian kingdom that lasted 1,400 years, first at Napata, then at Meroë, with pyramids of its own.` });
  R('civ', 'Ptolemies', [[20,33],[25,32],[31,31.8],[34.5,31.5],[35.5,33.5],[36,32],[35,29.5],[34.5,27],[35.5,24],[33,23.5],[32.5,24],[30,26],[27,29],[24.5,30.5],[20,30.5]], [-305, -30], { c: 'a', sub: 'Greek pharaohs of Egypt', at: [29.5, 28], x: `The Ptolemies: a Greek family that ruled Egypt as pharaohs from Alexandria. Cleopatra was the last.` });

  R('culture', 'Ubaid villages', [[44,33.2],[45.5,33.5],[47,32],[48,30.8],[47.5,30],[46,30.3],[44.5,31.5]], [-6200, -4000], { at: [46, 31.8], x: `The Ubaid people: the first canal farmers of southern Mesopotamia.` });
  R('civ', 'Sumer', [[44,33.2],[45.5,33.5],[47,32],[48,30.8],[47.5,30],[46,30.3],[44.5,31.5]], [-4000, -2334], { c: 'c', sub: 'city-states', at: [46, 31.8], x: `Sumer: a dozen walled cities, each with its own god and king, sharing one language and one way of writing.` });
  R('civ', 'Akkadian Empire', [[36.5,36.8],[40,37.5],[44,37],[46.5,35],[48.5,32],[48.5,30],[47,29.8],[45,31],[43,33.2],[40.5,34.5],[38,35],[36.2,35.5]], [-2334, -2154], { c: 'c', at: [43, 34.6], fin: 20, x: `The Akkadian Empire: Sargon and his heirs ruled all Mesopotamia, the first empire in history.` });
  R('civ', 'Ur', [[43,34.5],[44.5,35.2],[46.5,33.5],[48.3,31],[47.5,30],[46,30.3],[44.2,31.5],[43.5,33]], [-2112, -2004], { c: 'c', sub: 'Third Dynasty', at: [45.6, 32], fin: 15, fout: 15, x: `The kings of Ur rebuilt Sumer, raised the great ziggurat and wrote the oldest law code that survives.` });
  R('civ', 'Babylon', [[40.5,35],[43,36.5],[45,35],[47,33],[48.3,30.5],[47.5,29.9],[46,30.2],[44.5,31],[43.5,32.5],[41.5,33.8]], [-1792, -1595], { c: 'c', sub: 'Hammurabi', at: [44.6, 32.9], fin: 30, x: `Babylon under Hammurabi united Mesopotamia again and gave it one law.` });
  R('civ', 'Babylonia', [[43.5,33.5],[45,34.5],[47,33],[48.3,30.5],[47.5,29.9],[46,30.2],[44.5,31]], [-1570, -1155], { c: 'c', sub: 'Kassite kings', at: [45.6, 32], x: `Babylonia under the Kassites: a quiet great power for four centuries.` });
  R('civ', 'Assyria', [[41.5,35],[42.5,37],[44.5,37],[45,35.5],[43.5,34.5]], [-1400, -900], { c: 'b', at: [43.3, 36], x: `Assyria: a tough kingdom on the Tigris that survived the great collapse.` });
  R('civ', 'Assyrian Empire', [[34.3,31.2],[34.8,29.6],[36.5,30.5],[37.5,32.5],[40,32],[44,30],[47.8,29.8],[48.8,31],[48,33.5],[46.5,35.5],[45.5,37.5],[43,38.5],[40,38.6],[37,38.3],[35,37.3],[34.5,36.5],[36,36],[35.7,34.5]], [-900, -612], { c: 'b', at: [41.5, 35], fin: 150, fout: 6, x: `The Assyrian Empire: iron weapons, siege engines and terror. At its height it even held Egypt.` });
  R('civ', 'Babylon', [[34.3,31.2],[35,29.6],[37.5,31],[41,31],[45,29.8],[48,29.9],[48.5,31.5],[46,33.8],[44.5,35.5],[42,36.3],[39,36.8],[36.5,37],[35.8,35.5]], [-612, -539], { c: 'c', sub: 'Nebuchadnezzar', at: [42.5, 33.3], fin: 10, fout: 4, x: `Babylon's last empire: the Ishtar Gate, the great ziggurat, and the exile of the Jews.` });
  R('civ', 'Medes', [[44,37],[47,39],[52,37],[58,37],[61,34],[57,31],[52,32.5],[48.5,33.5],[46,35.5]], [-625, -550], { c: 'g', at: [52, 34.8], x: `The Medes of Iran helped destroy Assyria, then were taken over by their Persian cousins.` });
  R('civ', 'Lydia', [[26.5,40.3],[30,41],[34,40.5],[34.2,38.5],[31,37],[27.5,36.8]], [-680, -546], { c: 'f', at: [30, 39], x: `Lydia: the rich kingdom that invented coins.` });
  R('civ', 'Hittites', [[28.5,38.5],[30,40.8],[33.5,41.8],[37.5,41],[40,39.5],[39,37],[37.5,35.3],[36,35.5],[36,36.6],[33,36.3],[30.5,36.8],[28.8,37.2]], [-1650, -1180], { c: 'b', at: [33.8, 39.2], fout: 15, x: `The Hittite Empire of central Turkey: Egypt's great rival, and an early worker of iron.` });
  R('civ', 'Mitanni', [[36.8,36.8],[40,37.8],[43.5,37.3],[44,35.8],[41,35],[38,35.5]], [-1500, -1300], { c: 'g', at: [40.3, 36.5], x: `Mitanni: a chariot kingdom in northern Syria.` });
  R('civ', 'Minoans', [[23.4,35.7],[25,37],[26.5,35.5],[26.3,34.8],[23.5,34.9]], [-2000, -1450], { c: 'd', at: [25, 35.1], x: `Minoan Crete: palaces without walls, sea trade, bull-leaping.` });
  R('civ', 'Mycenaeans', [[20.5,37.3],[21,39.2],[23,39.5],[24.3,38],[26.5,35],[23.5,34.8],[22,36.3]], [-1600, -1150], { c: 'd', at: [22.4, 38.3], fout: 30, x: `Mycenaean Greece: warrior kings in hilltop palaces, remembered in the stories of Troy.` });
  R('culture', 'Greek cities', [[19.6,39.8],[22.5,40.6],[24.5,40.5],[27.6,39.5],[28,37],[26,35],[23.5,34.9],[21.3,36.6]], [-800, -338], { at: [23.2, 39], x: `Hundreds of independent Greek city-states around the Aegean Sea.` });
  R('civ', 'Persian Empire', [[26,41.5],[29,41.5],[36,42],[41.5,41.8],[48,41.5],[50,40.5],[52,37],[54,39],[58,42],[63,43],[68,42],[70.5,40.5],[73,38],[72,34.5],[73,31],[71,27],[68,24],[66.5,25.2],[61,25.2],[57,26.5],[56,27],[51.5,27.8],[50,30],[48,29.9],[46,29],[40,31],[37,29.5],[35,28],[35,24],[33,23.8],[31,24],[28,26],[25,28.5],[21,30],[20,32.5],[25,32],[31,31.8],[34.3,31.3],[35.7,34],[36,36.3],[33,36.2],[30,36.3],[27.5,36.7],[26.2,39]], [-550, -330], { c: 'c', at: [51, 33], fin: 30, fout: 4, x: `The Persian Empire: twenty-some provinces from Egypt to the Indus, tied together by the Royal Road.` });
  R('civ', `Alexander's empire`, [[19.6,39.8],[21,42],[26,41.8],[29,41.5],[36,41.5],[41.5,40.5],[48,39.5],[52,37],[58,40],[66,41],[70.5,40.5],[73,38],[72,34.5],[73,31],[71,27],[68,24],[66.5,25.2],[61,25.2],[57,26.5],[51.5,27.8],[50,30],[48,29.9],[46,29],[40,31],[37,29.5],[35,28],[35,24],[33,23.8],[31,24],[28,26],[25,28.5],[21,30],[20,32.5],[25,32],[31,31.8],[34.3,31.3],[35.7,34],[36,36.3],[30,36.3],[27.5,36.7],[24,35],[21.3,36.6]], [-329, -305], { c: 'd', at: [50, 33.5], fin: 5, fout: 8, x: `For a few years one man ruled from Greece to the Indus.` });
  R('civ', 'Seleucid kingdom', [[27,37],[30,39.5],[36,39],[40,38.5],[45,39],[50,38],[54,38.5],[60,39],[66,39.5],[70,38],[70,34],[67,30],[64,26],[61,25.2],[57,26.5],[51.5,27.8],[50,30],[48,29.9],[44,31],[40,32.5],[37,33.5],[35.9,34.5],[36,36.5],[32,36.3],[29,36.5]], [-305, -140], { c: 'd', at: [49, 34], fout: 60, x: `The Seleucids: Greek kings ruling Syria, Mesopotamia and Iran from Antioch.` });
  R('civ', 'Macedon', [[19.8,39.6],[20.5,41.8],[23.5,42],[26,41.3],[24,40.3],[23.6,38],[21.5,37.5]], [-359, -168], { c: 'd', at: [22.3, 40.9], x: `Macedon: the northern kingdom that conquered Greece, and then Persia.` });
  R('civ', 'Parthia', [[44,37.5],[47,39.5],[50,38],[54,38.5],[60,39],[63,37],[62,33],[63,28],[61,25.3],[57,26.5],[51.5,27.8],[50,30],[48,29.9],[44,31.5],[41,34.5],[40,37]], [-140, 224], { c: 'c', at: [53, 33.5], fin: 100, x: `The Parthians: horse archers who ruled Iran and Mesopotamia, standing between Rome and China.` });
  R('civ', 'Sasanian Persia', [[44,37.5],[47,39.5],[50,38],[54,38.5],[60,39],[64,37.5],[66,33],[66,27],[61,25.3],[57,26.5],[51.5,27.8],[50,30],[48,29.9],[44,31.5],[41,34.5],[40,37]], [224, 600], { c: 'c', at: [53, 33.5], x: `Sasanian Persia: a strong new Persian empire, Rome's equal and rival.` });
  R('civ', 'Carthage', [[7.5,37.4],[11.3,37.3],[11.2,33.5],[8.5,34.5]], [-814, -146], { c: 'g', at: [9.5, 35.8], fout: 3, x: `Carthage: a Phoenician colony that grew into the richest city of the western Mediterranean.` });
  R('culture', 'Etruscans', [[10.2,44],[12.3,43.8],[12.6,42],[11.5,41.9],[10.3,42.8]], [-800, -300], { at: [11.3, 43], x: `The Etruscans: city-dwellers of central Italy who taught the Romans a great deal.` });
  R('culture', 'Celts', [[-4.5,48.5],[-1.5,43.5],[4,43.8],[7,45.8],[14,46.5],[18,47.8],[17,50],[10,51],[4,51],[-4,50.5]], [-600, -50], { at: [5, 47.6], x: `Celtic peoples: skilled iron-workers living in tribes across much of Europe.` });
  R('culture', 'Germanic peoples', [[6,52],[9,57],[14,55],[20,55],[24,51],[18,49],[12,50],[8,50.5]], [-50, 400], { at: [13, 52.8], x: `Germanic tribes beyond Rome's frontier: sometimes enemies, sometimes soldiers in Rome's own army.` });
  R('culture', 'Scythians', [[29,46],[34,50],[45,52],[55,52],[60,48],[52,45],[45,45],[38,45.5],[33,45.5]], [-800, -200], { at: [44, 48.5], x: `The Scythians: horse-riding nomads of the steppe, famous for archery and gold.` });
  R('culture', 'Huns', [[17,47.5],[22,49],[32,49],[44,49],[46,45],[38,45.5],[30,45],[22,44.8],[17.5,45.8]], [375, 469], { at: [28, 47.2], x: `The Huns: steppe horsemen whose arrival set off a chain of migrations into the Roman Empire.` });
  R('civ', 'Rome', [[9.8,44.3],[12.6,44.2],[14.5,42.3],[18.6,40.2],[17,38.8],[16,37.8],[15.5,38.2],[15.8,40],[13,41],[11,42.3]], [-272, -200], { c: 'b', at: [13.5, 42.4], fin: 60, fout: 40, x: `By 272 BCE the Roman Republic controls all of Italy south of the Po.` });
  R('civ', 'Roman Republic', [[-9.5,37],[-8,41.5],[-2,42.8],[3.2,43.5],[7,45.5],[13.5,46],[14,45],[17,43],[19.5,42],[21,41.8],[24.5,41.5],[26.5,40.5],[30.5,40],[31,37.5],[28,36.3],[24,34.6],[21,36],[19.5,39],[16,37.5],[12,36.5],[11.5,34.5],[8,35.5],[8.5,37.5],[3,38],[-1,36.6],[-5.5,35.9]], [-200, -27], { c: 'b', at: [12.5, 42.6], fin: 50, fout: 30, x: `After beating Carthage, Rome takes Spain, Greece, North Africa and western Turkey.` });
  R('civ', 'Roman Empire', [[-9.5,36.5],[-9.5,43.5],[-1.5,43.8],[-5,48.5],[-5.8,50],[-3.5,55],[-1.5,55],[1.8,52.5],[4.5,52.2],[7,51],[8.5,50],[10,48.8],[13,48.6],[17,48],[19,47.5],[21,45],[22,47.5],[26,47.5],[27,45.5],[29.5,45.2],[28.7,43.5],[29,41.3],[33,42.1],[38,41.2],[41.5,41],[42.5,38.5],[40,36.8],[39.5,34.5],[37,32.5],[36,29.5],[34.9,29.5],[35.5,24],[33,23.8],[31.5,23.8],[29,27],[25,29.5],[20,30],[15,31],[10,32],[8,33.5],[2,34],[-3,33.5],[-7,33],[-9.5,32],[-6,35.8]], [-27, 395], { c: 'b', at: [14, 43.5], fin: 40, fout: 15, x: `The Roman Empire at its height: about 60 million people around the whole Mediterranean.` });
  R('civ', 'Western Roman Empire', [[-9.5,36.5],[-9.5,43.5],[-1.5,43.8],[-5,48.5],[-5.8,50],[1.8,51],[4.5,52.2],[7,51],[8.5,50],[10,48.8],[13,48.6],[17,48],[19,46],[19.3,42],[18,40.5],[16,37.5],[12,36.5],[11.5,33],[8,33.5],[2,34],[-3,33.5],[-7,33],[-6,35.8]], [395, 420], { c: 'b', at: [8, 44.5], fin: 10, fout: 56, x: `The western half of the empire, ruled from Ravenna. It shrank province by province.` });
  R('civ', 'Eastern Roman Empire', [[19.2,41.8],[19.5,44.8],[22.6,44.2],[25,43.7],[28.5,45.2],[29.6,45],[28.7,43.5],[29,41.3],[33,42.1],[38,41.2],[41.5,41],[42.5,38.5],[40,36.8],[39.5,34.5],[37,32.5],[36,29.5],[34.9,29.5],[35.5,24],[33,23.8],[31.5,23.8],[29,27],[25,29.5],[20,30],[19,32.5],[20,34],[19,39]], [395, 700], { c: 'd', sub: 'Constantinople', at: [31, 38.5], fin: 10, x: `The eastern half of the Roman Empire, Greek-speaking and Christian. It lasted until 1453.` });

  R('culture', 'Vinča culture', [[19.3,45.5],[22.5,45.5],[23,43],[21,42.3],[19.5,43.5]], [-5700, -4500], { at: [21, 44.2], x: `The Vinča people: big villages on the Danube, and the first copper smelters in the world.` });
  R('culture', 'Longhouse farmers', [[4,50.5],[8,52],[16,52],[21,50],[18,47.5],[11,48],[5,48.5]], [-5500, -4900], { at: [12, 50.2], x: `The first farmers of central Europe lived in long timber houses and made pottery with band patterns.` });
  R('culture', 'Trypillia mega-villages', [[26,48.5],[30,50],[32.5,49],[31,46.8],[27,46.5]], [-4800, -3000], { at: [29, 48.3], x: `Huge planned villages of up to 15,000 people in Ukraine, with no sign of kings.` });
  R('culture', 'Yamnaya herders', [[28,46],[34,50.5],[45,52],[55,51.5],[53,46],[45,44.5],[38,45.5],[33,45.5]], [-3300, -2600], { at: [42, 48.5], x: `The Yamnaya: steppe herders with wagons and horses. Half of Europe's ancestry and most of its languages trace back to them.` });
  R('culture', 'Megalith builders', [[-10,36.8],[-9.5,43.5],[-5,48.7],[-6.5,50],[-10.5,52],[-8,58.5],[-2,59.5],[-1,55],[1,51],[-1.5,47],[-1,43.5],[-6,38]], [-4500, -2500], { at: [-4.2, 46.2], x: `Along the Atlantic coast, farmers raised stone circles, rows and tombs for 2,000 years.` });

  R('culture', 'Yangshao villages', [[105,34],[108,38],[114,37.5],[114.5,34],[110,33.2]], [-5000, -3000], { at: [110, 35.6], x: `Yangshao: millet farmers of the Yellow River, famous for painted pottery.` });
  R('civ', 'Liangzhu', [[119.3,31.6],[121.6,31.6],[121.6,29.9],[119.5,29.9]], [-3300, -2300], { c: 'f', at: [120.4, 30.7], x: `Liangzhu: a walled city with dams and canals, and China's finest early jade.` });
  R('culture', 'Longshan towns', [[109,34],[111,38],[117,38.5],[120.5,37],[119.5,34.5],[114,33.5]], [-3000, -1900], { at: [114.5, 36], x: `Longshan: walled towns, wheel-made black pottery, and growing warfare.` });
  R('civ', 'Shang', [[110,34],[111.5,38],[116,39.5],[119,37.5],[119,34],[116,32],[112,32.5]], [-1600, -1046], { c: 'f', at: [114.7, 35.8], x: `The Shang dynasty: bronze-casting kings whose oracle bones carry the first Chinese writing.` });
  R('civ', 'Zhou', [[104.5,34],[107,38],[113,40.5],[118.5,40.5],[122,37],[120,32],[116,30],[111,30],[107,32]], [-1046, -771], { c: 'f', at: [113, 35.5], x: `The Zhou kings ruled through lords who owed them loyalty, and claimed the Mandate of Heaven.` });
  R('culture', 'Rival Chinese states', [[104.5,34],[107,38],[113,40.5],[118.5,40.5],[122,37],[120,31],[116,28.5],[110,28.5],[105,30.5]], [-771, -221], { at: [113, 34.5], x: `After 771 BCE the Zhou lands broke into states that fought each other for five centuries.` });
  R('civ', 'Qin', [[103.5,26],[102,32],[103.5,36.5],[106,40.5],[112,41],[119,41.5],[123,40.5],[121.5,39],[122.5,37],[121,31],[120,27],[116,23],[110,21.5],[106,23]], [-221, -206], { c: 'f', at: [112, 33], fin: 6, fout: 3, x: `Qin: the first empire to unite China, under the First Emperor.` });
  R('civ', 'Han China', [[103,23],[100,26],[102.5,32],[101,36.5],[97,39.5],[94.5,40.5],[95,41.5],[101,40],[106,41],[112,41.5],[119,41.8],[124.5,41],[127,38.5],[124.5,39.5],[121.5,39],[122.5,37],[121,31],[120,27],[116.5,23],[110,20.5],[107.5,17.5],[105.5,18.5],[104,22]], [-202, 220], { c: 'f', at: [112, 33], fin: 5, fout: 10, x: `Han China: about 60 million people under one emperor and thousands of trained officials.` });
  R('culture', 'China divided', [[103,23],[100,26],[102.5,32],[101,36.5],[106,41],[112,41.5],[119,41.8],[124.5,41],[121.5,39],[122.5,37],[121,31],[120,27],[116.5,23],[110,20.5],[106,22]], [220, 589], { at: [112, 33], x: `After the Han: three kingdoms, then centuries of rival dynasties north and south.` });
  R('culture', 'Xiongnu', [[88,48],[95,52],[110,53],[120,50],[124,45],[113,42.5],[103,41.5],[93,43.5]], [-209, 90], { at: [106, 47.5], x: `The Xiongnu: a confederation of steppe nomads, the great enemy of Han China.` });

  R('culture', 'Early Indus towns', [[66,24.5],[68,23],[71,21.2],[73,22.5],[72.5,25],[75,28],[77.5,30],[76.5,31.5],[73,32.5],[70.5,31.5],[68,29.5],[66.5,27]], [-3300, -2600], { at: [71, 28], x: `Farming towns along the Indus, slowly growing together into one civilisation.` });
  R('civ', 'Indus civilisation', [[66,24.5],[68,23],[71,21.2],[73,22.5],[72.5,25],[75,28],[77.5,30],[76.5,31.5],[73,32.5],[70.5,31.5],[68,29.5],[66.5,27]], [-2600, -1900], { c: 'e', at: [71, 28], fout: 200, x: `The Indus civilisation: over a thousand towns and cities with the same bricks, weights and seals, and no sign of kings.` });
  R('culture', 'Vedic peoples', [[70,30],[73,34],[77,32.5],[82,28.5],[88,26.5],[88,24],[82,24],[76,26.5],[72,27.5]], [-1500, -500], { at: [78, 28.5], x: `Indo-Aryan speakers settled the plains of northern India. Their hymns, the Vedas, were passed on by memory.` });
  R('civ', 'Maurya Empire', [[62,31],[66,35],[71,35.5],[75,33],[80,30],[88,27],[92,25.5],[90,21.5],[86,19.5],[82,16.5],[80,13.5],[78,12],[75,12.5],[73,16],[72.5,21],[69,22],[67,24.5],[62,25.5]], [-322, -185], { c: 'e', at: [78.5, 22.5], fin: 30, x: `The Maurya Empire united most of India for the first time. Its greatest ruler was Ashoka.` });
  R('civ', 'Kushan Empire', [[61,37],[66,41],[72,41],[76,37],[79,33],[83,27.5],[84,25],[80,24.5],[74,27],[70,28],[66,30],[62,33]], [30, 375], { c: 'g', at: [70.5, 33.5], x: `The Kushans ruled the crossroads of the Silk Road and helped Buddhism travel to China.` });
  R('civ', 'Gupta Empire', [[69,23],[72,30],[76,32],[82,28.5],[88,27],[91,24],[88,21],[84,19],[80,20],[75,20.5],[72.5,21]], [320, 550], { c: 'e', at: [79.5, 25], x: `The Gupta Empire: India's golden age of mathematics, astronomy and literature.` });

  R('civ', 'Norte Chico', [[-78.6,-9.8],[-76.9,-10.1],[-76.7,-11.7],[-77.9,-11.9]], [-3000, -1800], { c: 'e', at: [-77.5, -10.9], x: `Norte Chico: the first cities of the Americas, with stone pyramids as old as Egypt's.` });
  R('civ', 'Olmecs', [[-96.5,18.8],[-93,18.6],[-93.2,17.2],[-95.5,17]], [-1400, -400], { c: 'g', at: [-94.6, 18], x: `The Olmecs: the first great culture of Mexico, carvers of giant stone heads.` });
  R('civ', 'Chavín', [[-80.5,-6],[-77,-6.5],[-75.5,-11],[-76.5,-13.5],[-78.5,-11]], [-900, -200], { c: 'e', at: [-77.5, -9.3], x: `Chavín: a religion and art style that spread across the Andes from one mountain temple.` });
  R('civ', 'Maya', [[-92.5,18.5],[-90.5,21.3],[-87,21.5],[-87.8,17],[-88.5,14.2],[-91.5,14.2],[-92.3,16]], [-700, 900], { c: 'd', at: [-89.6, 17.8], fin: 200, x: `The Maya: dozens of rival city-states with pyramids, a full writing system and a remarkable calendar.` });
  R('culture', 'Mound builders', [[-90,40.5],[-83,41.5],[-80.5,39.5],[-83,37.5],[-89,37.5]], [-500, 500], { at: [-85, 39.4], x: `The Adena and Hopewell peoples built great earthworks and traded from the Rockies to the Gulf.` });
  R('civ', 'Moche', [[-81,-5.3],[-79,-5.3],[-77.9,-9.4],[-78.9,-10]], [100, 700], { c: 'f', at: [-79.4, -7.4], x: `The Moche of northern Peru: mud-brick pyramids, canals, and the finest pottery portraits in the Americas.` });
  R('civ', 'Nazca', [[-76.2,-13.9],[-74.4,-14.1],[-74.5,-15.9],[-75.9,-15.6]], [-100, 700], { c: 'g', at: [-75.2, -14.8], x: `The Nazca: makers of giant desert drawings that can only be seen whole from the air.` });
  R('culture', 'Nok', [[6,10.5],[9.5,10.8],[9.5,8.5],[6.5,8.3]], [-1000, 300], { at: [7.8, 9.6], x: `The Nok people of Nigeria: early iron smelters and makers of striking clay sculptures.` });
  R('civ', 'Aksum', [[37,15.5],[40,15.5],[40.5,13],[38,12.3],[36.8,13.5]], [100, 700], { c: 'f', at: [38.7, 14], x: `Aksum: an Ethiopian trading kingdom with its own coins, script and giant stone stelae.` });

  /* ---------------- RIVERS ---------------- */
  rivers.push(
    { n: 'Nile', at: [30.2, 26.2], pts: [[31.2,31.5],[31.2,30.1],[31,29.2],[30.75,28.1],[31.1,27.2],[31.7,26.55],[32.2,26.05],[32.72,26.16],[32.65,25.7],[32.87,24.98],[32.9,24.1],[32.6,23],[31.5,22.2],[30.6,20.8],[30.4,19.5],[30.9,18.1],[32.1,18.2],[33.3,19.5],[33.9,18],[33.6,16.7],[32.5,15.6],[32.6,13.2],[32,10.5],[30.9,9.4],[31.6,6.2],[31.5,3.6],[32.9,0.5]] },
    { n: '', pts: [[32.5,15.6],[33.6,14.4],[34.4,12.2],[35.2,11.2],[36.4,10.4],[37.4,11.6]] },
    { n: 'Euphrates', at: [40, 34], pts: [[38.8,38.8],[38.3,37.5],[38,36.8],[38.3,36],[39.5,35.8],[40.4,35],[40.9,34.5],[41.9,34.4],[42.8,33.9],[43.8,33.3],[44.3,32.6],[44.9,31.8],[45.9,31.2],[46.7,31],[47.4,31],[47.9,30.5],[48.5,30]] },
    { n: 'Tigris', at: [44.6, 35.2], pts: [[39.6,38.4],[40.3,37.9],[41.2,37.5],[42.2,37.3],[42.9,36.6],[43.15,36.35],[43.3,35.4],[43.7,34.6],[44.2,33.7],[44.4,33.3],[45,32.6],[45.8,32.4],[46.8,31.9],[47.2,31.4],[47.4,31]] },
    { n: 'Indus', at: [69.6, 26.5], pts: [[79.5,32.5],[76.5,34.5],[74.5,35.6],[73,34.9],[72.3,33.9],[71.5,32.7],[70.9,31],[70.8,29.3],[69.5,28.2],[68.8,27.6],[68.2,26.5],[68.3,25.3],[67.7,24.2]] },
    { n: 'Ganges', at: [82, 26.4], pts: [[78.2,30],[78.2,29],[80,27],[81.9,25.4],[83,25.3],[85.1,25.6],[87.3,25.3],[88.1,24.8],[89.8,23.8],[90.5,23]] },
    { n: 'Yellow R.', at: [108.5, 41.3], pts: [[96,35],[101,36.2],[103.8,36.1],[105.9,38],[107,40.3],[109.8,40.6],[111.2,40],[110.6,38],[110.4,35],[111.5,34.8],[113.6,34.9],[115.5,35.6],[117,36.7],[118.8,37.6]] },
    { n: 'Yangtze', at: [107, 28.2], pts: [[97.5,31],[99.5,27.5],[102,26.3],[104.6,28.7],[106.6,29.6],[108.4,30.8],[111.3,30.7],[112.9,29.7],[114.3,30.6],[116,29.8],[117.8,31.1],[118.8,32.1],[120.5,32],[121.8,31.4]] },
    { n: 'Danube', at: [24.5, 44.3], pts: [[8.2,48],[10,48.4],[12.1,49],[13.5,48.6],[16.4,48.2],[17.1,48.1],[18.9,47.8],[19.05,47.5],[18.9,45.9],[19,45.35],[20.45,44.82],[21.4,44.75],[22.5,44.55],[22.9,43.9],[25.4,43.65],[27.3,44.1],[28,45.3],[29.7,45.2]] },
    { n: 'Rhine', at: [6.3, 50], pts: [[9.6,47.5],[7.6,47.6],[7.6,48.6],[8.3,49.9],[7.6,50.4],[6.9,51],[6.2,51.85],[4.5,51.9]] }
  );

  /* ---------------- ROUTES ---------------- */
  // Earlier humans
  P('migr', 'Homo erectus', [[36,5],[35,20],[36,31],[44,41]], ya(1.95e6), ya(1.8e6), ya(400000), `Homo erectus walks out of Africa.`);
  P('migr', '', [[40,33],[55,30],[70,28],[85,25],[98,20],[103,8],[110,-7]], ya(1.8e6), ya(1.5e6), ya(400000), `Across southern Asia to Java, which was joined to the mainland.`);
  P('migr', '', [[98,22],[108,30],[115,39]], ya(1.7e6), ya(1.3e6), ya(400000), `Into China.`);
  P('migr', '', [[38,37],[28,41],[15,44],[2,43],[-3.5,42.3]], ya(1.5e6), ya(1.2e6), ya(400000), `Into Europe.`);
  // Homo sapiens
  P('migr', 'towards Australia', [[38,8],[43.3,12.6],[52,16.5],[57,25.5],[65,25],[72,22],[80,15],[88,22],[97,17],[101,8],[105,-2],[112,-7.5],[120,-9.5],[125,-9.5],[130,-12.5]], ya(68000), ya(52000), ya(28000), `The southern route: along the coasts of Arabia and India, through Southeast Asia, and by boat to Australia.`);
  P('migr', '', [[33,27],[34.5,31],[36,34]], ya(60000), ya(54000), ya(28000), `North along the Nile and through Sinai.`);
  P('migr', 'towards Europe', [[36,35],[33,39],[29,41],[24,43],[19,46],[10,48.5],[2,46],[-3,42]], ya(48000), ya(41000), ya(28000), `Up the Danube into Europe, the land of the Neanderthals.`);
  P('migr', '', [[50,34],[62,38],[70,41],[85,50],[100,50],[115,48],[116,40]], ya(50000), ya(42000), ya(28000), `Through Central Asia and Siberia.`);
  P('migr', '', [[98,20],[108,24],[115,31],[117,38],[127,36.5],[131,34],[136,35.5]], ya(50000), ya(38000), ya(28000), `North through China and on to Japan.`);
  P('migr', 'towards Beringia', [[108,53],[125,60],[135,70],[160,68],[185,66]], ya(34000), ya(24000), -11000, `Hunters follow mammoth and reindeer to the far north-east of Asia.`);
  P('migr', '', [[190,62],[208,58],[225,55],[235,47],[238,38],[244,33],[253.5,33]], ya(24500), ya(21500), -10500, `Down the Pacific coast, past the ice, perhaps by boat.`);
  P('migr', 'towards Chile', [[250,28],[262,17],[277,9],[280,-3],[283,-13],[288,-30],[286.8,-41.5]], ya(17500), ya(14500), -10000, `From North America to the southern tip in a couple of thousand years.`);
  P('migr', 'ice-free corridor', [[205,65],[222,62],[243,55],[250,47],[257,36]], -11800, -11000, -9800, `As the ice sheets pull apart, a passage opens east of the Rocky Mountains.`);
  // Farming spreads
  P('farm', 'farmers', [[33,38.5],[27,39.5],[23,40],[21,44],[19,47],[12,50],[4,50.5],[-1,52]], -6700, -4000, -3800, `Up the Danube and across central Europe to Britain.`);
  P('farm', '', [[22,39],[16.5,43],[16,40.5],[9,43.5],[4,43.3],[-1,39],[-8.5,38]], -6200, -5400, -3800, `By boat along the Mediterranean coast: the Adriatic, Italy, France, Spain.`);
  P('farm', '', [[35,31.5],[32.5,30.5],[30.7,29.4]], -5800, -5200, -4300, `Farming reaches the Nile from the Middle East.`);
  P('farm', '', [[48,34],[57,32],[65,30],[67.6,29.4]], -8000, -7000, -5500, `Across Iran to the edge of the Indus valley.`);
  P('farm', 'rice', [[115,29],[110,23],[104,16],[101,13]], -3000, -2000, -1500, `Rice farmers spread south into Southeast Asia.`);
  // Pacific
  P('migr', '', [[119.5,26],[121,23.5],[121.5,17],[124,9]], -3000, -2000, 500, `Farmers from Taiwan sail to the Philippines.`);
  P('migr', '', [[124,9],[128,1],[140,-2.5],[150,-4]], -2000, -1450, 500, `On through Indonesia to the islands off New Guinea.`);
  P('migr', 'Lapita sailors', [[150,-4],[160,-9],[167,-15.5],[178,-17.5],[185,-21],[188,-13.8]], -1450, -850, 500, `Out into the open Pacific: Vanuatu, Fiji, Tonga, Samoa.`);
  // People on the move
  P('move', '', [[26,27],[31,27]], -4800, -3600, -3200, `As the Sahara dries, herders move to the Nile.`);
  P('move', 'herders to the Nile', [[27,22.5],[32.3,24.6]], -4800, -3600, -3200, `As the Sahara dries, herders move to the Nile.`);
  P('move', '', [[23,18.5],[30.5,18.5]], -4800, -3600, -3200, `As the Sahara dries, herders move to the Nile.`);
  P('move', '', [[5,22],[2,17],[-3,14]], -4500, -3300, -3000, `Others follow the retreating rains south.`);
  P('move', '', [[18,20],[17,14],[14,11]], -4500, -3300, -3000, `Others follow the retreating rains south.`);
  P('move', 'steppe herders', [[40,48],[28,47],[20,47.5],[12,51]], -3100, -2700, -2400, `Yamnaya herders with wagons move west into Europe.`);
  P('move', '', [[45,49],[65,50],[85,51]], -3300, -3000, -2500, `Other steppe herders move east as far as the Altai mountains.`);
  P('move', 'Indo-Aryans', [[60,50],[63,42],[67,36.5],[72,33],[77,29]], -2000, -1500, -1200, `Herders with horses and chariots move south from the steppe into Iran and India.`);
  P('move', 'Greek colonies', [[23.7,37.9],[20,37.5],[15.3,37.1],[11.5,39.5],[7,42.5],[5.4,43.3]], -750, -600, -400, `Greeks found new cities in Sicily, southern Italy and France.`);
  P('move', '', [[24.5,38.5],[26.2,40.2],[29,41.05],[31,43.5],[31.9,46.6]], -700, -600, -400, `And around the Black Sea.`);
  P('move', '', [[10.5,6.5],[12,1],[14,-5],[16,-12]], -1500, -300, 500, `Bantu-speaking farmers spread south through the rainforest.`);
  P('move', 'Bantu farmers', [[11,6],[20,4.5],[30,0.5],[34,-6],[33,-15],[31,-25]], -1000, 300, 500, `Bantu-speaking farmers spread east to the Great Lakes, then south.`);
  // Trade
  P('trade', 'lapis lazuli', [[70.8,36.2],[62,35],[54.4,36.1],[48.2,32.2],[45.6,31.3],[41,35],[36.8,35.5],[35.6,34.1],[31.5,30.5]], -3500, -3300, -1900, `Blue lapis lazuli from one valley in Afghanistan travelled 4,000 km to Egypt.`);
  P('trade', 'cedar', [[35.6,34.1],[34,32.6],[31.6,31.5]], -3000, -2900, -1100, `Egypt has no big trees. Cedar logs came by sea from Byblos in Lebanon.`);
  P('trade', 'ships to Meluhha', [[46.1,31],[50.55,26.1],[56.5,25.8],[62,24.8],[67.5,24.3]], -2600, -2500, -1800, `Ships linked Sumer with Bahrain, Oman and the Indus cities.`);
  P('trade', 'ships to Punt', [[33.9,26.6],[37.5,20],[41,15]], -2500, -2450, -1100, `Egyptian ships sailed down the Red Sea to the land of Punt for incense, gold and baboons.`);
  P('trade', 'tin caravans', [[43.26,35.46],[41,36.8],[38,37.5],[35.63,38.85]], -1950, -1900, -1750, `Assyrian merchants led donkey caravans of tin and cloth to Turkey and wrote thousands of letters home.`);
  P('trade', 'copper & tin', [[35.8,35.6],[33,34.9],[29.7,36.1],[26,35.5],[22.8,37.7]], -1500, -1400, -1190, `Ships carried copper from Cyprus and tin from the east to the palaces of the Aegean.`);
  P('trade', 'Phoenician ships', [[35.2,33.3],[30,34.3],[25,34.5],[15,35.8],[10.3,36.9],[3,37.6],[-2,36.4],[-6.3,36.5]], -1000, -800, -300, `Phoenician traders sailed the length of the Mediterranean to the silver of Spain.`);
  P('trade', 'Royal Road', [[48.25,32.19],[45.5,34.5],[44,36.2],[41,37.2],[37,38],[33,39.3],[30,38.8],[28.04,38.49]], -515, -500, -330, `The Persian Royal Road: 2,700 km from Susa to Sardis. Royal messengers rode it in a week.`);
  P('trade', 'Silk Road', [[108.9,34.3],[103.8,36],[94.7,40.1],[83,41.7],[76,39.5],[67,39.65],[61.8,37.6],[51.4,35.6],[44.6,33.1],[38.27,34.55],[36.16,36.2]], -130, -100, 600, `The Silk Road: a chain of caravan routes from China through Central Asia and Persia to the Mediterranean.`);
  P('trade', 'monsoon sea route', [[32.5,29.9],[35.5,23.9],[43,13],[50,13.5],[76.2,10.2],[80.5,5.8],[92,8],[100,4.5],[105.15,10.25],[110,18],[113.3,23.1]], -100, 60, 600, `With the monsoon winds, ships sailed from Egypt to India, and on to Southeast Asia and China.`);
  // Wars and invasions
  P('war', 'Sea Peoples', [[24,37.5],[28,35.5],[33,34.7],[35.3,34],[34.5,32],[32,31.4]], -1210, -1177, -1100, `Raiders and refugees the Egyptians called the Sea Peoples swept down the coast to Egypt's border.`);
  P('war', 'Persian invasion', [[28,38.5],[26.5,40.2],[24,40.8],[22.6,40],[22.5,38.8],[23.7,38]], -481, -480, -470, `Xerxes leads a huge Persian army into Greece.`);
  P('war', 'Alexander', [[22.5,40.75],[26.4,40.2],[28,38.5],[32,37.5],[36.2,36.8],[35.2,33.3],[34.4,31.5],[31.25,29.85],[34,31.3],[35.5,33.5],[38,36.5],[43.25,36.36],[44.42,32.54],[48.25,32.19],[52.89,29.93],[48.5,34.8],[54,36],[62.2,34.35],[65.7,31.6],[69.2,34.5],[66.9,36.75],[66.97,39.65],[69.5,35],[72.8,33.75],[73.5,32.8],[71,29],[68.5,25.5],[62,25.8],[56.5,27.5],[52.89,29.93],[48.25,32.19],[44.42,32.54]], -334, -323, -300, `Alexander's march: 11 years and more than 30,000 km, from Macedon to India and back to Babylon.`);
  P('war', 'Hannibal', [[-1,37.6],[-0.3,39.5],[2.2,41.4],[4.5,43.7],[6.5,44.9],[8.5,45],[11,44.2],[12.2,43.2],[16.15,41.3]], -218, -216, -200, `Hannibal marches from Spain over the Alps into Italy with 37 elephants.`);
  P('war', 'Huns', [[60,48],[45,47.5],[34,47.5],[21,47]], 350, 440, 470, `The Huns ride west across the steppe into the heart of Europe.`);
  P('war', 'Goths', [[28,45],[23,42],[14,45.5],[12.5,41.9],[1,43.5],[-4,40]], 376, 418, 480, `The Visigoths flee the Huns across the Danube, sack Rome, and end up ruling Spain.`);
  P('war', 'Vandals', [[16,51],[7,49.5],[-1,43],[-5.5,36.5],[3,36.6],[10.3,36.8]], 400, 439, 480, `The Vandals cross Gaul and Spain into Africa and capture Carthage.`);
  P('war', '', [[9,54],[0.5,52.5]], 430, 480, 520, `Angles and Saxons cross the North Sea to Britain.`);

  /* ---------------- SITES ---------------- */
  // 0 — Before us
  S('Toros-Menalla', 17.5, 16.2, ya(7e6), ya(5e6), 'f', 2, '7 million years ago', `"Toumaï", one of the oldest known members of the human branch.`);
  S('Laetoli', 35.2, -3.2, ya(3.7e6), ya(2.5e6), 'f', 3, '3.7 million years ago', `Footprints of three upright walkers, preserved in volcanic ash.`);
  S('Lomekwi', 35.75, 3.9, ya(3.3e6), ya(2e6), 'i', 1, '3.3 million years ago', `The oldest stone tools ever found.`);
  S('Hadar', 40.6, 11.1, ya(3.2e6), ya(2e6), 'f', 2, '3.2 million years ago', `"Lucy": a small upright walker with an ape-sized brain.`);
  S('Olduvai Gorge', 35.35, -2.99, ya(2e6), ya(700000), 'i', 2, '2 million years ago', `Layer upon layer of stone tools and the bones of the animals they cut up.`);
  S('Dmanisi', 44.34, 41.34, ya(1.8e6), ya(700000), 'f', 1, '1.8 million years ago', `The oldest humans found outside Africa.`);
  S('Sangiran', 110.8, -7.45, ya(1.5e6), ya(300000), 'f', 1, '1.5 million years ago', `"Java Man": Homo erectus in Indonesia.`);
  S('Wonderwerk Cave', 23.55, -27.85, ya(1e6), ya(300000), 'i', 2, '1 million years ago', `Ash and burnt bone deep inside a cave: the earliest good evidence of fire.`);
  S('Atapuerca', -3.5, 42.35, ya(1.2e6), ya(300000), 'f', 2, '1.2 million – 430,000 years ago', `Europe's oldest human remains, and later a pit holding 29 early Neanderthals.`);
  S('Zhoukoudian', 115.9, 39.7, ya(770000), ya(250000), 'f', 2, '770,000 years ago', `"Peking Man": Homo erectus in northern China.`);
  S('Schöningen', 10.99, 52.13, ya(330000), ya(200000), 'i', 3, '300,000 years ago', `Wooden throwing spears, perfectly balanced, found with butchered horses.`);
  // 1 — One human among many
  S('Jebel Irhoud', -8.87, 31.85, ya(315000), ya(150000), 'f', 1, '300,000 years ago', `The oldest known bones of Homo sapiens.`);
  S('Florisbad', 26.07, -28.77, ya(260000), ya(150000), 'f', 3, '260,000 years ago', `An early Homo sapiens skull from South Africa.`);
  S('Rising Star Cave', 27.71, -25.92, ya(335000), ya(236000), 'f', 2, '335,000–236,000 years ago', `Homo naledi: a small-brained human living at the same time as early Homo sapiens.`);
  S('Omo Kibish', 35.97, 5.4, ya(233000), ya(120000), 'f', 2, '233,000 years ago', `Early Homo sapiens in Ethiopia.`);
  S('Misliya Cave', 34.97, 32.74, ya(180000), ya(140000), 'f', 3, '180,000 years ago', `A Homo sapiens jaw: an early trip out of Africa.`);
  S('Pinnacle Point', 22.09, -34.21, ya(164000), ya(90000), 'a', 3, '164,000 years ago', `People on the South African coast gather shellfish and grind red ochre.`);
  S('Krapina', 15.87, 46.16, ya(135000), ya(115000), 'f', 1, '130,000 years ago', `Bones of dozens of Neanderthals, one of the richest Neanderthal sites in the world.`);
  S('Skhul & Qafzeh', 35.1, 32.68, ya(120000), ya(90000), 'f', 2, '120,000–90,000 years ago', `Early Homo sapiens buried with shell beads and red ochre. This group did not last.`);
  S('Ngandong', 111.65, -7.3, ya(117000), ya(108000), 'f', 3, '110,000 years ago', `The last known Homo erectus anywhere.`);
  S('Blombos Cave', 21.22, -34.41, ya(100000), ya(70000), 'a', 1, '100,000–73,000 years ago', `A paint workshop, engraved patterns and shell beads: early signs of a symbolic mind.`);
  S('Flores', 120.46, -8.53, ya(190000), ya(50000), 'f', 1, 'until 50,000 years ago', `Homo floresiensis, the "hobbit": a human species only a metre tall.`);
  S('Denisova Cave', 84.68, 51.4, ya(200000), ya(50000), 'f', 2, '200,000–50,000 years ago', `Home at different times to Denisovans, Neanderthals and a girl whose parents were one of each.`);
  S('Al Wusta', 39.4, 28.4, ya(88000), ya(82000), 'f', 3, '85,000 years ago', `A Homo sapiens finger bone beside an ancient lake in what is now the Arabian desert.`);
  S('Toba eruption', 98.8, 2.68, ya(75000), ya(72000), 'e', 1, '74,000 years ago', `The largest volcanic eruption of the last 2 million years.`);
  // 2 — Out of Africa
  S('Madjedbebe', 132.88, -12.5, ya(60000), ya(40000), 'f', 2, '65,000–50,000 years ago', `The oldest known camp in Australia.`);
  S('Sulawesi cave art', 119.6, -4.9, ya(51200), ya(35000), 'a', 1, '51,000 years ago', `A painting of people and a wild pig: the oldest known picture that tells a story.`);
  S('Lake Mungo', 143.1, -33.75, ya(42000), ya(30000), 'f', 2, '42,000 years ago', `Careful burials with red ochre, and the oldest known cremation.`);
  S('Bacho Kiro', 25.43, 42.95, ya(45500), ya(40000), 'f', 2, '45,000 years ago', `Among the first Homo sapiens in Europe.`);
  S('Ust\'-Ishim', 71.17, 57.7, ya(45000), ya(40000), 'f', 3, '45,000 years ago', `A leg bone from Siberia with the oldest fully read modern human DNA.`);
  S('Vindija Cave', 16.08, 46.3, ya(48000), ya(40000), 'f', 1, '44,000 years ago', `Late Neanderthals whose bones gave us the first Neanderthal genome.`);
  S('Swabian caves', 9.75, 48.38, ya(42000), ya(32000), 'a', 1, '40,000 years ago', `Bone flutes, an ivory lion-man and the oldest carvings of people.`);
  S('El Castillo', -3.97, 43.29, ya(41000), ya(32000), 'a', 3, '40,000 years ago', `Red dots and hand stencils on a cave wall.`);
  S('Tianyuan Cave', 115.87, 39.66, ya(40000), ya(34000), 'f', 3, '40,000 years ago', `An early Homo sapiens near today's Beijing.`);
  S('Chauvet Cave', 4.42, 44.39, ya(37000), ya(28000), 'a', 1, '36,000 years ago', `Lions, rhinos and horses drawn with shading and movement.`);
  S('Sungir', 40.5, 56.2, ya(34500), ya(30000), 'a', 3, '34,000 years ago', `Two children buried in clothes sewn with 10,000 ivory beads.`);
  S('Yana', 133.4, 70.7, ya(32500), ya(26000), 'f', 2, '32,000 years ago', `Mammoth hunters living north of the Arctic Circle.`);
  // 3 — The Great Freeze
  S('Dolní Věstonice', 16.65, 48.88, ya(30000), ya(25000), 'a', 2, '29,000 years ago', `Fired clay figures and the oldest traces of woven cloth.`);
  S('Mal\'ta', 103.5, 52.9, ya(24500), ya(22000), 'f', 3, '24,000 years ago', `A boy whose DNA links today's Europeans and Native Americans.`);
  S('Ohalo', 35.57, 32.72, ya(23500), ya(21500), 'v', 2, '23,000 years ago', `Brush huts by a lake, with wild wheat and barley ground into flour.`);
  S('White Sands', -106.3, 32.8, ya(23000), ya(19000), 'f', 1, '23,000–21,000 years ago', `Human footprints beside an Ice Age lake: people were already in America.`);
  S('Xianrendong', 117.2, 28.73, ya(20000), ya(15000), 'i', 1, '20,000 years ago', `The oldest pottery in the world, made by hunter-gatherers.`);
  S('Ishango', 29.6, -0.13, ya(22000), ya(18000), 'a', 3, '20,000 years ago', `A bone carved with groups of notches: perhaps a tally or a counting aid.`);
  S('Wadi Kubbaniya', 32.8, 24.2, ya(19000), ya(16500), 'v', 2, '18,000 years ago', `Camps by the Nile where people fished and ground wild roots.`);
  S('Lascaux', 1.17, 45.05, ya(19000), ya(15000), 'a', 1, '17,000 years ago', `Hundreds of painted bulls, horses and deer.`);
  S('Vela Spila', 16.72, 42.97, ya(17500), ya(15000), 'a', 3, '17,500 years ago', `Small fired-clay animal figures from a cave on the island of Korčula.`);
  S('Mezhyrich', 31.4, 49.63, ya(16500), ya(13500), 'v', 2, '15,000 years ago', `Round houses built from hundreds of mammoth bones.`);
  // 4 — The Great Thaw
  S('Altamira', -4.12, 43.38, ya(16000), ya(13000), 'a', 2, '14,500 years ago', `A ceiling of painted bison.`);
  S('Monte Verde', -73.2, -41.5, -12500, -11500, 'v', 1, '14,500 years ago', `A camp in southern Chile, with huts, tools and even seaweed medicine.`);
  S('Shubayqa', 37.2, 32.4, -12400, -11500, 'i', 2, '14,400 years ago', `Charred crumbs of the oldest known bread, baked 4,000 years before farming.`);
  S('Oberkassel', 7.17, 50.71, -12200, -11500, 'f', 3, '14,200 years ago', `A dog buried with two people.`);
  S('Ain Mallaha', 35.58, 33.09, -12500, -9600, 'v', 1, '14,000–11,600 years ago', `A Natufian village of round stone houses. One woman was buried with a puppy.`);
  S('Jebel Sahaba', 31.3, 21.95, -11500, -11000, 'b', 2, '13,400 years ago', `A cemetery where many people died from arrow wounds: early evidence of war.`);
  S('Clovis', -103.3, 34.28, -11100, -10700, 'f', 2, '13,000 years ago', `Beautifully made spear points found with mammoth bones.`);
  S('Abu Hureyra', 38.4, 35.87, -11500, -7000, 'v', 2, 'from 11,500 BCE', `A village of gatherers that slowly turned into a village of farmers.`);
  // 5 — Seeds of change
  S('Göbekli Tepe', 38.92, 37.22, -9500, -8000, 'm', 1, '9500–8000 BCE', `Rings of carved stone pillars up to 5 m tall, raised at the dawn of farming.`);
  S('Jericho', 35.44, 31.87, -9000, -6000, 'v', 1, 'from 9000 BCE', `A stone wall and an 8-metre tower, around 8000 BCE.`);
  S('Ganj Dareh', 47.48, 34.27, -8200, -7600, 'v', 3, '8000 BCE', `Some of the first herded goats.`);
  S('Shillourokambos', 33.0, 34.75, -8500, -7000, 'v', 3, '8500–7500 BCE', `Farmers sailed to Cyprus with their animals. One was buried with a cat.`);
  S('Guilá Naquitz', -96.33, 16.95, -8000, -6500, 'v', 2, '8000 BCE', `The oldest farmed squash in the Americas.`);
  S('Çatalhöyük', 32.83, 37.67, -7400, -6000, 'v', 1, '7400–6000 BCE', `A town of thousands with no streets: people walked on the roofs and climbed in by ladder.`);
  S('Ain Ghazal', 35.97, 31.99, -7200, -6500, 'a', 3, '7000 BCE', `Large plaster statues of people with wide painted eyes.`);
  S('Mehrgarh', 67.6, 29.4, -7000, -2600, 'v', 1, 'from 7000 BCE', `South Asia's first farming village, with early dentistry.`);
  S('Jiahu', 113.67, 33.62, -7000, -5700, 'v', 1, '7000–5700 BCE', `Rice, millet, bone flutes and a fermented drink.`);
  S('Nabta Playa', 30.73, 22.51, -7500, -3600, 'v', 1, '7500–3600 BCE', `Cattle herders in the green Sahara, who set up a stone circle to mark midsummer.`);
  S('Tassili n\'Ajjer', 8.0, 25.5, -8000, -3500, 'a', 2, '8000–3500 BCE', `Thousands of rock paintings of cattle, hunters and swimmers, in what is now desert.`);
  S('Gobero', 9.5, 17.1, -7700, -4500, 'v', 3, '7700–4500 BCE', `A lakeside cemetery in the middle of today's Sahara.`);
  S('Lepenski Vir', 22.03, 44.56, -7000, -5900, 'v', 2, '7000–5900 BCE', `A fishing village on the Danube with fish-faced stone sculptures.`);
  S('Kuk Swamp', 144.33, -5.78, -5000, -2000, 'v', 2, 'from 5000 BCE', `Drained garden plots in the New Guinea highlands.`);
  // 6 — Farmers on the move
  S('Sesklo', 22.84, 39.36, -6500, -5500, 'v', 2, '6500 BCE', `One of Europe's first farming villages.`);
  S('Starčevo', 20.69, 44.83, -6200, -5500, 'v', 2, '6200 BCE', `The first farmers of the Danube lands.`);
  S('Adriatic farmers', 16.0, 43.6, -6000, -5000, 'v', 2, '6000 BCE', `Farmers arrive by boat with sheep, wheat and shell-stamped pottery.`);
  S('Storegga tsunami', 3.0, 64.0, -6200, -6100, 'e', 2, '6150 BCE', `An undersea landslide sends a giant wave across the last of Doggerland.`);
  S('Choga Mami', 45.5, 33.9, -6000, -5000, 'i', 3, '6000 BCE', `The oldest known irrigation canals.`);
  S('Eridu', 46.0, 30.82, -5400, -2000, 'c', 2, 'from 5400 BCE', `A shrine rebuilt on the same spot 18 times, growing from a hut into a great temple.`);
  S('Fayum', 30.6, 29.5, -5200, -4000, 'v', 1, '5200 BCE', `The first farmers in Egypt.`);
  S('Belovode', 21.4, 44.3, -5000, -4600, 'i', 1, '5000 BCE', `The oldest known copper smelting.`);
  S('Hemudu', 121.35, 29.96, -5000, -3300, 'v', 2, '5000 BCE', `Rice farmers in wooden houses on stilts.`);
  S('Banpo', 109.05, 34.27, -4800, -3600, 'v', 2, '4800 BCE', `A moated village of millet farmers.`);
  S('Chinchorro', -70.3, -18.5, -5000, -1500, 'a', 2, 'from 5000 BCE', `The world's oldest deliberately made mummies.`);
  S('Varna', 27.9, 43.2, -4600, -4200, 'a', 1, '4500 BCE', `The oldest gold treasure in the world, buried with a chief.`);
  S('Badari', 31.42, 27.0, -4400, -4000, 'v', 2, '4400 BCE', `Farming villages of Upper Egypt, with fine pottery and the first copper.`);
  S('Carnac', -3.08, 47.58, -4500, -3300, 'm', 2, '4500–3300 BCE', `Three thousand standing stones in long rows.`);
  // 7 — First cities
  S('Uruk', 45.64, 31.32, -4000, -1800, 'c', 1, 'from 4000 BCE', `The first city: 40,000 people, great temples and the earliest writing.`);
  S('Susa', 48.25, 32.19, -4200, -330, 'c', 2, 'from 4200 BCE', `Capital of Elam, and later of the Persian kings.`);
  S('Tell Brak', 41.06, 36.67, -4000, -3300, 'c', 3, '4000–3500 BCE', `An early city in the north, with a temple full of little "eye idols".`);
  S('Hierakonpolis', 32.78, 25.1, -3800, -2700, 'c', 1, '3800–3100 BCE', `The biggest town on the Nile, with a brewery, a zoo and the first painted tomb.`);
  S('Naqada', 32.72, 25.9, -4000, -3000, 'c', 2, '4000–3100 BCE', `A rival town that gave its name to the culture of early Egypt.`);
  S('Abydos', 31.92, 26.18, -3400, -2000, 'c', 1, 'from 3400 BCE', `Burial place of the first kings. Labels in tomb U-j carry the earliest hieroglyphs.`);
  S('Buto', 30.74, 31.2, -3900, -3000, 'c', 3, '3900–3100 BCE', `Chief town of the Delta, trading with the Levant.`);
  S('Botai', 67.65, 53.3, -3600, -3000, 'i', 2, '3500 BCE', `People who kept horses, and milked them.`);
  S('Ggantija', 14.27, 36.05, -3600, -2500, 'm', 3, '3600 BCE', `Stone temples on Malta, older than the pyramids.`);
  S('Watson Brake', -92.13, 32.37, -3500, -2800, 'm', 2, '3500 BCE', `A ring of eleven earth mounds built by hunter-gatherers.`);
  S('Niuheliang', 119.5, 41.3, -3600, -2900, 'm', 3, '3500 BCE', `A ritual centre with jade dragons and a "goddess temple".`);
  S('Ötzi', 10.84, 46.78, -3300, -3200, 'f', 1, '3250 BCE', `A man frozen in the Alps with his copper axe, bow, medicine kit and 61 tattoos.`);
  S('Newgrange', -6.47, 53.69, -3200, -2500, 'm', 2, '3200 BCE', `A great tomb whose chamber is lit by the sun on midwinter morning.`);
  S('Ljubljana Marshes wheel', 14.4, 45.97, -3200, -3050, 'i', 2, '3150 BCE', `The oldest wooden wheel and axle ever found.`);
  S('Badakhshan mines', 70.8, 36.2, -3500, -1900, 'i', 3, 'from 3500 BCE', `The only source of blue lapis lazuli in the ancient world.`);
  // 8 — Writing and kings
  S('Memphis', 31.25, 29.85, -3100, -300, 'c', 1, 'from 3100 BCE', `Capital of united Egypt, built where the valley meets the Delta.`);
  S('Kish', 44.6, 32.54, -3000, -2300, 'c', 3, '2900 BCE', `A Sumerian city whose kings claimed to rule all the others.`);
  S('Ur', 46.1, 30.96, -3800, -1700, 'c', 1, 'from 3800 BCE', `A great Sumerian city: royal tombs full of gold, and later a towering ziggurat.`);
  S('Lagash', 46.4, 31.41, -2900, -2000, 'c', 3, '2900–2000 BCE', `A Sumerian city that fought its neighbour Umma over a canal for 150 years.`);
  S('Mari', 40.89, 34.55, -2900, -1759, 'c', 3, '2900–1759 BCE', `A trading city on the Euphrates with a palace of 300 rooms.`);
  S('Byblos', 35.65, 34.12, -3000, -300, 'c', 2, 'from 3000 BCE', `The port that shipped cedar wood to Egypt for 2,000 years.`);
  S('Troy', 26.24, 39.96, -3000, -950, 'c', 2, 'from 3000 BCE', `A fortress town guarding the sea road to the Black Sea, rebuilt nine times.`);
  S('Stonehenge', -1.83, 51.18, -3000, -1500, 'm', 1, '3000–2000 BCE', `Begun as a ring of earth and timber; the giant stones were raised about 2500 BCE.`);
  S('Skara Brae', -3.34, 59.05, -3180, -2500, 'v', 3, '3180–2500 BCE', `A stone village in Orkney with stone beds and dressers.`);
  S('Vučedol', 19.0, 45.35, -3000, -2400, 'v', 1, '3000–2400 BCE', `A copper-casting town on the Danube, home of the Vučedol Dove.`);
  S('Harappa', 72.87, 30.63, -3300, -1900, 'c', 2, '3300–1900 BCE', `From farming town to great Indus city.`);
  S('Shahr-i Sokhta', 61.33, 30.6, -3200, -2000, 'c', 3, '3200–2000 BCE', `A desert trading city where lapis was cut, and a woman wore an artificial eye.`);
  S('Caral', -77.52, -10.89, -2900, -1800, 'c', 1, '2900–1800 BCE', `The oldest city in the Americas, with six stone pyramids.`);
  // 9 — The age of pyramids
  S('Saqqara', 31.22, 29.87, -2670, -2200, 'm', 1, '2650 BCE', `Djoser's Step Pyramid: the first big building of cut stone.`);
  S('Dahshur', 31.21, 29.79, -2600, -2200, 'm', 3, '2600 BCE', `The Bent Pyramid and the Red Pyramid, where builders worked out the true shape.`);
  S('Giza', 31.13, 29.98, -2570, -300, 'm', 1, '2560–2500 BCE', `The Great Pyramid of Khufu, the pyramids of Khafre and Menkaure, and the Sphinx.`);
  S('Wadi al-Jarf', 32.66, 28.89, -2580, -2540, 'i', 2, '2560 BCE', `The oldest harbour in the world, and the diary of a boat captain who hauled stone for the Great Pyramid.`);
  S('Elephantine', 32.89, 24.08, -3000, -300, 'c', 3, 'from 3000 BCE', `Egypt's southern frontier town, at the first cataract.`);
  S('Mohenjo-daro', 68.14, 27.33, -2600, -1900, 'c', 1, '2600–1900 BCE', `A planned city of 40,000 with brick houses, bathrooms and covered drains.`);
  S('Dholavira', 70.21, 23.89, -2600, -1900, 'c', 3, '2600–1900 BCE', `An Indus city with huge stone water tanks.`);
  S('Lothal', 72.25, 22.52, -2400, -1900, 'c', 3, '2400–1900 BCE', `An Indus port with a brick dock.`);
  S('Shortugai', 69.5, 37.33, -2200, -1900, 'c', 3, '2200 BCE', `An Indus trading post beside the lapis mines, 1,000 km from home.`);
  S('Ebla', 36.8, 35.8, -2500, -2250, 'c', 2, '2400 BCE', `A Syrian city whose palace archive held 17,000 clay tablets.`);
  S('Akkad', 44.3, 33.1, -2334, -2154, 'c', 1, '2334–2154 BCE', `Sargon's capital. Its ruins have never been found.`);
  S('Kerma', 30.41, 19.6, -2500, -1500, 'c', 1, '2500–1500 BCE', `Capital of the first Nubian kingdom.`);
  S('Wrangel Island', -179.5, 71.2, -6000, -2000, 'f', 1, 'until 2000 BCE', `The last woolly mammoths on Earth lived here, long after the pyramids were built.`);
  // 10 — Collapse and comeback
  S('Tell Leilan', 41.5, 36.96, -2600, -2200, 'c', 3, 'abandoned 2200 BCE', `A city left empty for 300 years when the rains failed.`);
  S('Mawmluh Cave', 91.7, 25.26, -2250, -2000, 'e', 2, '2200 BCE', `A stalagmite here recorded the great drought. Geologists named our present age after it.`);
  S('Thebes', 32.64, 25.7, -2100, -650, 'c', 1, 'from 2100 BCE', `Home of the kings who reunited Egypt, and later the empire's religious capital.`);
  S('Babylon', 44.42, 32.54, -1894, -140, 'c', 1, 'from 1894 BCE', `Hammurabi's city, and for a thousand years the greatest city of Mesopotamia.`);
  S('Assur', 43.26, 35.46, -2500, -614, 'c', 2, 'from 2500 BCE', `The city that gave Assyria its name.`);
  S('Kanesh', 35.63, 38.85, -1950, -1750, 'c', 2, '1950–1750 BCE', `Assyrian merchants living here left 23,000 clay letters about tin, cloth, debts and family.`);
  S('Knossos', 25.16, 35.3, -1950, -1350, 'c', 1, '1950–1350 BCE', `The largest Minoan palace, with wall paintings and running water.`);
  S('Erlitou', 112.7, 34.7, -1900, -1500, 'c', 2, '1900–1500 BCE', `China's first palaces and bronze workshops.`);
  S('Sintashta', 60.2, 52.5, -2100, -1800, 'i', 1, '2000 BCE', `The oldest chariots, buried with their owners and horses.`);
  S('Avaris', 31.82, 30.79, -1700, -1550, 'c', 2, '1650–1550 BCE', `Capital of the Hyksos kings.`);
  S('Poverty Point', -91.41, 32.63, -1700, -1100, 'm', 2, '1700–1100 BCE', `Huge earth ridges and mounds built by hunter-gatherers in Louisiana.`);
  // 11 — Chariots and great kings
  S('Thera eruption', 25.4, 36.4, -1630, -1560, 'e', 1, 'about 1600 BCE', `A volcanic island blows apart, burying a Minoan town and sending waves across the sea.`);
  S('Hattusa', 34.62, 40.02, -1650, -1180, 'c', 1, '1650–1180 BCE', `The walled Hittite capital, with an archive of 30,000 tablets.`);
  S('Mycenae', 22.76, 37.73, -1600, -1100, 'c', 1, '1600–1100 BCE', `A hilltop fortress with a Lion Gate and graves full of gold.`);
  S('Ugarit', 35.78, 35.6, -1450, -1185, 'c', 2, '1450–1185 BCE', `A trading port that wrote with a 30-letter alphabet. It was burned and never rebuilt.`);
  S('Amarna', 30.9, 27.65, -1346, -1330, 'c', 2, '1346–1332 BCE', `Akhenaten's new capital for his one god, and the archive of the kings' letters.`);
  S('Uluburun wreck', 29.68, 36.13, -1325, -1300, 'i', 2, '1320 BCE', `A sunken ship carrying copper, tin, glass, ivory and amber from nine different lands.`);
  S('Kadesh', 36.52, 34.56, -1280, -1255, 'b', 1, '1274 BCE', `Egypt and the Hittites fight the biggest chariot battle in history. Both claim victory.`);
  S('Abu Simbel', 31.63, 22.34, -1264, -300, 'm', 2, '1264 BCE', `Ramesses II has four giant statues of himself cut into a cliff in Nubia.`);
  S('Anyang', 114.3, 36.12, -1300, -1046, 'c', 1, '1300–1046 BCE', `The last Shang capital, where oracle bones carry the earliest Chinese writing.`);
  S('San Lorenzo', -94.76, 17.75, -1400, -900, 'c', 1, '1400–900 BCE', `The first Olmec centre, with colossal stone heads.`);
  S('Su Nuraxi', 8.99, 39.7, -1500, -500, 'm', 3, 'from 1500 BCE', `One of 7,000 stone towers built on Sardinia.`);
  // 12 — The great collapse
  S('Delta battle', 31.9, 31.25, -1180, -1170, 'b', 1, '1177 BCE', `Ramesses III defeats the Sea Peoples at the mouths of the Nile.`);
  S('Pylos', 21.7, 37.03, -1300, -1180, 'c', 3, 'burned 1180 BCE', `A Mycenaean palace whose last tablets record coast-watchers looking out for raiders.`);
  S('Tyre', 35.2, 33.27, -1200, 500, 'c', 1, 'from 1200 BCE', `The leading Phoenician city, famous for purple dye and far-sailing ships.`);
  S('Jerusalem', 35.23, 31.78, -1000, 500, 'c', 1, 'from 1000 BCE', `Capital of the kingdom of Israel and Judah, and holy city of the Jews.`);
  S('Zhou capital', 108.75, 34.2, -1046, -771, 'c', 2, '1046–771 BCE', `Seat of the Zhou kings near today's Xi'an.`);
  S('Sanxingdui', 104.2, 31.0, -1250, -1050, 'a', 3, '1200 BCE', `Bronze masks with bulging eyes, from a kingdom nobody knew existed.`);
  S('Gordion', 32.0, 39.65, -900, -600, 'c', 3, '900–600 BCE', `Capital of Phrygia and of King Midas.`);
  S('Carthage', 10.32, 36.85, -814, 500, 'c', 1, 'founded 814 BCE', `Founded by settlers from Tyre; later Rome's great rival.`);
  S('La Venta', -94.04, 18.1, -900, -400, 'c', 2, '900–400 BCE', `An Olmec city with one of the first pyramids in Mexico.`);
  S('Chavín de Huántar', -77.18, -9.59, -900, -200, 'm', 2, '900–200 BCE', `A temple high in the Andes with dark tunnels and a carved stone god.`);
  S('Hallstatt', 13.65, 47.56, -800, -450, 'v', 2, '800–450 BCE', `A salt-mining village that grew rich and gave its name to the early Celts.`);
  S('Tonga', -175.2, -21.15, -850, 500, 'v', 1, 'from 850 BCE', `Lapita sailors settle Tonga and Samoa, the cradle of Polynesia.`);
  S('Napata', 31.83, 18.53, -780, -590, 'c', 2, '780–590 BCE', `Capital of Kush, at the foot of a holy mountain.`);
  // 13 — Iron empires and city-states
  S('Nineveh', 43.15, 36.36, -705, -612, 'c', 1, '705–612 BCE', `The Assyrian capital. Its royal library held 30,000 tablets, including the story of Gilgamesh.`);
  S('Athens', 23.73, 37.98, -800, 500, 'c', 1, 'from 800 BCE', `The city of democracy, theatre and philosophy.`);
  S('Sparta', 22.43, 37.07, -800, -190, 'c', 2, '800–190 BCE', `A city organised like an army camp.`);
  S('Olympia', 21.63, 37.64, -776, 393, 'm', 3, 'from 776 BCE', `Site of the Olympic Games, held every four years for over a thousand years.`);
  S('Miletus', 27.28, 37.53, -700, -494, 'a', 2, '600 BCE', `Home of Thales and the first philosophers.`);
  S('Syracuse', 15.29, 37.08, -734, 500, 'c', 2, 'founded 734 BCE', `The greatest Greek city in the west, and home of Archimedes.`);
  S('Massalia', 5.37, 43.3, -600, 500, 'c', 3, 'founded 600 BCE', `A Greek colony: today's Marseille.`);
  S('Rome', 12.49, 41.89, -753, 500, 'c', 1, 'founded 753 BCE (by legend)', `From hill villages by the Tiber to the capital of an empire.`);
  S('Sardis', 28.04, 38.49, -680, -300, 'c', 2, '680–546 BCE', `Capital of Lydia, where the first coins were struck.`);
  S('Meroë', 33.75, 16.94, -590, 350, 'c', 1, '590 BCE – 350 CE', `Capital of Kush: iron furnaces and more than 200 pyramids.`);
  S('Lumbini', 83.28, 27.47, -500, 500, 'a', 2, 'about 480 BCE', `Birthplace of the Buddha.`);
  S('Qufu', 116.99, 35.6, -551, -400, 'a', 2, '551 BCE', `Birthplace of Confucius.`);
  S('Luoyang', 112.45, 34.62, -771, 500, 'c', 2, 'from 771 BCE', `Capital of the later Zhou, and later of the Han.`);
  S('Monte Albán', -96.77, 17.04, -500, 500, 'c', 2, 'from 500 BCE', `The Zapotec capital, built on a flattened mountaintop.`);
  S('Cyrene', 21.86, 32.82, -631, 500, 'c', 3, 'founded 631 BCE', `A Greek colony in Libya.`);
  // 14 — Persia, Greece and big ideas
  S('Persepolis', 52.89, 29.93, -518, -330, 'c', 1, '518–330 BCE', `The ceremonial capital of the Persian kings, burned by Alexander.`);
  S('Marathon', 23.97, 38.12, -491, -470, 'b', 2, '490 BCE', `Athenians defeat the first Persian invasion.`);
  S('Thermopylae', 22.54, 38.8, -481, -470, 'b', 3, '480 BCE', `Three hundred Spartans and their allies hold a narrow pass.`);
  S('Salamis', 23.5, 37.95, -481, -470, 'b', 3, '480 BCE', `The Greek fleet destroys the Persian navy.`);
  S('Pataliputra', 85.14, 25.61, -490, 550, 'c', 1, 'from 490 BCE', `Capital of Magadha, then of the Maurya and Gupta empires.`);
  S('Taxila', 72.8, 33.75, -500, 500, 'c', 2, 'from 500 BCE', `A city of learning where India met Persia and Greece.`);
  S('Pazyryk', 88.0, 50.75, -450, -250, 'f', 3, '400 BCE', `Scythian chiefs frozen in their tombs, with tattoos, carpets and horses.`);
  S('Pella', 22.52, 40.76, -400, -168, 'c', 3, '400–168 BCE', `Capital of Macedon, birthplace of Alexander.`);
  S('Tikal', -89.62, 17.22, -300, 500, 'c', 1, 'from 300 BCE', `One of the greatest Maya cities.`);
  // 15 — Alexander and the age of empires
  S('Gaugamela', 43.25, 36.36, -332, -320, 'b', 2, '331 BCE', `Alexander defeats the Persian king and wins the empire.`);
  S('Alexandria', 29.92, 31.2, -331, 500, 'c', 1, 'founded 331 BCE', `Capital of Greek Egypt: the great Library, the lighthouse, and half a million people.`);
  S('Ai-Khanoum', 69.4, 37.17, -300, -145, 'c', 2, '300–145 BCE', `A Greek city in Afghanistan, complete with theatre and gymnasium.`);
  S('Antioch', 36.16, 36.2, -300, 500, 'c', 2, 'founded 300 BCE', `Capital of the Seleucid kings; later the third city of the Roman Empire.`);
  S('Sanchi', 77.74, 23.48, -250, 500, 'm', 3, '250 BCE', `A great Buddhist dome begun by Ashoka.`);
  S('Xianyang', 108.7, 34.35, -350, -206, 'c', 1, '350–206 BCE', `Capital of Qin, and of the First Emperor.`);
  S('Terracotta Army', 109.28, 34.38, -210, 500, 'm', 1, '210 BCE', `Eight thousand life-size clay soldiers guarding the First Emperor's tomb.`);
  S('Great Wall', 110.0, 40.6, -214, 500, 'm', 2, 'from 214 BCE', `Qin joined older walls into one line against the steppe nomads.`);
  S('Cannae', 16.15, 41.3, -217, -200, 'b', 2, '216 BCE', `Hannibal surrounds and destroys a Roman army twice the size of his own.`);
  S('Petra', 35.44, 30.33, -300, 400, 'c', 2, '300 BCE – 400 CE', `A caravan city carved into rose-red cliffs.`);
  S('El Mirador', -89.92, 17.76, -300, 150, 'c', 2, '300 BCE – 150 CE', `An early Maya city with one of the largest pyramids ever built.`);
  // 16 — Rome and Han
  S('Chang\'an', 108.94, 34.3, -202, 500, 'c', 1, 'from 202 BCE', `Capital of Han China and the eastern end of the Silk Road.`);
  S('Dunhuang', 94.66, 40.14, -111, 500, 'c', 2, 'from 111 BCE', `The oasis gateway between China and Central Asia.`);
  S('Samarkand', 66.97, 39.65, -500, 500, 'c', 3, 'from 500 BCE', `A city of merchants at the centre of the Silk Road.`);
  S('Ctesiphon', 44.58, 33.09, -120, 500, 'c', 2, 'from 120 BCE', `Capital of the Parthian and then the Sasanian kings.`);
  S('Palmyra', 38.27, 34.55, -100, 273, 'c', 2, '100 BCE – 273 CE', `A desert caravan city grown rich between Rome and Persia.`);
  S('Actium', 20.72, 38.93, -32, -20, 'b', 2, '31 BCE', `Octavian's fleet defeats Antony and Cleopatra. Egypt becomes Roman.`);
  S('Galilee', 35.4, 32.75, 25, 60, 'a', 2, 'about 30 CE', `Where Jesus taught.`);
  S('Teutoburg Forest', 8.13, 52.41, 5, 30, 'b', 3, '9 CE', `Germanic tribes wipe out three Roman legions.`);
  S('Pompeii', 14.49, 40.75, 70, 120, 'e', 2, '79 CE', `Mount Vesuvius buries a Roman town in ash, preserving it exactly as it was.`);
  S('Pula arena', 13.85, 44.87, 60, 500, 'm', 3, '1st century CE', `An amphitheatre for 20,000 people, still standing.`);
  S('Hadrian\'s Wall', -2.3, 55.0, 122, 410, 'm', 2, '122 CE', `A wall 118 km long across northern Britain, marking the edge of the empire.`);
  S('Muziris', 76.2, 10.2, -100, 300, 'c', 2, '100 BCE – 300 CE', `A pepper port in South India where Roman gold coins piled up.`);
  S('Oc Eo', 105.15, 10.25, 100, 500, 'c', 3, '100–500 CE', `A trading port in Vietnam where a Roman coin was found.`);
  S('Teotihuacan', -98.84, 19.69, -100, 550, 'c', 1, '100 BCE – 550 CE', `A planned city of 100,000 people with the Pyramids of the Sun and Moon.`);
  S('Nazca lines', -75.13, -14.74, -100, 500, 'a', 2, '100 BCE – 500 CE', `Giant drawings of a monkey, a spider and a hummingbird scraped into the desert.`);
  S('Aksum', 38.72, 14.13, 100, 500, 'c', 1, 'from 100 CE', `Capital of an Ethiopian trading kingdom, with stone stelae 30 m tall.`);
  // 17 — The ancient world ends
  S('Split', 16.44, 43.51, 300, 500, 'm', 1, '305 CE', `The palace Diocletian built for his retirement. People still live inside it.`);
  S('Constantinople', 28.98, 41.01, 330, 500, 'c', 1, 'founded 330 CE', `Constantine's "New Rome", capital of the eastern empire for 1,100 years.`);
  S('Adrianople', 26.56, 41.68, 375, 400, 'b', 2, '378 CE', `Goths destroy a Roman army and kill the emperor.`);
  S('Ravenna', 12.2, 44.42, 402, 500, 'c', 2, 'from 402 CE', `Last capital of the western empire, safe behind its marshes.`);
  S('Catalaunian Plains', 4.4, 48.95, 449, 460, 'b', 3, '451 CE', `Romans and Goths together stop Attila the Hun.`);
  S('Nalanda', 85.44, 25.14, 427, 500, 'a', 2, 'from 427 CE', `A Buddhist university with thousands of students from across Asia.`);
  S('Ajanta', 75.7, 20.55, 440, 500, 'a', 3, '460 CE', `Cave temples covered in paintings.`);
  S('Nanjing', 118.8, 32.06, 317, 500, 'c', 2, 'from 317 CE', `Capital of southern China while nomad kings ruled the north.`);
  S('Daisen tomb', 135.49, 34.56, 400, 500, 'm', 2, '5th century CE', `A keyhole-shaped tomb for a Japanese ruler, longer than the Great Pyramid is wide.`);
  S('Copán', -89.14, 14.84, 426, 500, 'c', 3, 'from 426 CE', `A Maya city famous for its carved stairway of hieroglyphs.`);

  ATLAS.regions = regions; ATLAS.routes = routes; ATLAS.sites = sites; ATLAS.rivers = rivers;

  /* Map views: [west, south, east, north] */
  ATLAS.views = {
    world: { name: 'World', box: [-27.5, -56, 331.5, 80] },
    old: { name: 'Africa, Europe, Asia', box: [-20, -40, 160, 70] },
    west: { name: 'Europe to India', box: [-14, 8, 82, 58] },
    med: { name: 'Mediterranean', box: [-11, 22, 52, 52] },
    europe: { name: 'Europe', box: [-12, 34, 42, 62] },
    mideast: { name: 'Middle East', box: [22, 12, 64, 44] },
    nile: { name: 'Nile', box: [24, 14, 40, 33.5] },
    eurasia: { name: 'Rome to China', box: [-12, 2, 148, 60] },
    easia: { name: 'East Asia', box: [92, 14, 150, 52] },
    americas: { name: 'Americas', box: [-128, -56, -32, 62] }
  };

  /* Ice volume through time (0 = like today, 1 = coldest). Sea level and land bridges follow it. */
  ATLAS.glacial = [
    [ya(7e6), 0], [ya(2.7e6), 0], [ya(2.5e6), 0.3], [ya(310000), 0.3], [ya(280000), 0.5], [ya(250000), 0.5],
    [ya(240000), 0.12], [ya(200000), 0.12], [ya(185000), 0.5], [ya(140000), 0.9], [ya(130000), 0.1], [ya(118000), 0.05],
    [ya(108000), 0.35], [ya(70000), 0.6], [ya(60000), 0.55], [ya(30000), 0.85], [ya(26000), 1], [ya(19000), 1],
    [-14000, 0.9], [-12700, 0.8], [-12000, 0.72], [-10900, 0.52], [-9700, 0.45], [-8000, 0.3], [-7000, 0.2],
    [-6000, 0.1], [-5000, 0.03], [-4000, 0]
  ];
  /* How green the Sahara is (0–1). */
  ATLAS.green = [
    [ya(135000), 0], [ya(128000), 0.8], [ya(118000), 0.6], [ya(110000), 0.2], [ya(105000), 0.6], [ya(95000), 0.2],
    [ya(85000), 0.5], [ya(75000), 0.15], [ya(70000), 0], [ya(60000), 0], [ya(55000), 0.3], [ya(48000), 0],
    [-13000, 0], [-12500, 0.35], [-10900, 0.3], [-10700, 0.12], [-9700, 0.15], [-9000, 0.6], [-8500, 1],
    [-5300, 1], [-4500, 0.75], [-4000, 0.5], [-3500, 0.15], [-3000, 0]
  ];
  /* Very rough world population, in millions. */
  ATLAS.population = [
    [ya(300000), 0.2], [ya(70000), 0.3], [ya(30000), 1.5], [-9700, 4], [-6500, 8], [-4500, 15], [-3300, 25],
    [-2700, 32], [-2200, 40], [-1600, 55], [-1200, 75], [-800, 85], [-500, 110], [-200, 170], [1, 230], [200, 240], [500, 200]
  ];
  ATLAS.climate = [
    [ya(7e6), 'Warmer than today; no ice ages yet'],
    [ya(2.6e6), 'Ice ages come and go'],
    [ya(130000), 'A warm spell, much like today'],
    [ya(115000), 'The last Ice Age'],
    [ya(27000), 'The coldest point of the Ice Age'],
    [ya(19000), 'Ice Age, slowly easing'],
    [-12700, 'Warming fast; ice melting'],
    [-10900, 'Sudden cold snap (Younger Dryas)'],
    [-9700, 'Warm and steady'],
    [-6250, 'Brief cold snap'],
    [-6050, 'Warm and steady; Sahara green'],
    [-4500, 'Warm; the Sahara is drying'],
    [-3000, 'Warm and steady, much like today'],
    [-2250, 'Great drought'],
    [-1950, 'Much like today'],
    [-1250, 'Drought around the Mediterranean'],
    [-1050, 'Much like today'],
    [-250, 'Warm, steady "Roman" climate'],
    [170, 'Cooler and less steady']
  ];
})();
