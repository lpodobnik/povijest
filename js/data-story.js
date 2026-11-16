/* Story mode: one "beat" for each paragraph of a chapter's story (same order as in data-chapters.js).
   [ year, map view, place ]
     year  – the moment the map moves to while that paragraph is on screen (inside the chapter's range)
     view  – a key of ATLAS.views (data-map.js)
     place – English name of a place from data-map.js to highlight and show a picture of, or null
   Nothing here needs translating. */
(function () {
  const ya = ATLAS.ya;
  ATLAS.beats = {
    before: [[ya(6.9e6), 'old', 'Toros-Menalla'], [ya(3.3e6), 'old', 'Lomekwi'], [ya(1.8e6), 'old', 'Dmanisi'], [ya(320000), 'old', 'Atapuerca']],
    sapiens: [[ya(295000), 'old', 'Jebel Irhoud'], [ya(120000), 'old', 'Skhul & Qafzeh'], [ya(116000), 'europe', 'Krapina'], [ya(90000), 'old', 'Blombos Cave']],
    out: [[ya(62000), 'old', null], [ya(52000), 'old', 'Madjedbebe'], [ya(44000), 'europe', 'Vindija Cave'], [ya(36000), 'old', 'Chauvet Cave']],
    ice: [[ya(26000), 'world', null], [ya(23500), 'world', null], [ya(18800), 'europe', 'Lascaux'], [ya(16000), 'americas', 'White Sands']],
    thaw: [[-12500, 'world', null], [-11500, 'americas', 'Monte Verde'], [-11200, 'mideast', 'Ain Mallaha'], [-10500, 'mideast', 'Abu Hureyra']],
    farm: [[-9600, 'world', null], [-9000, 'mideast', 'Göbekli Tepe'], [-7000, 'world', 'Jiahu'], [-6900, 'mideast', 'Çatalhöyük'], [-6600, 'old', "Tassili n'Ajjer"]],
    spread: [[-6400, 'west', null], [-5950, 'europe', 'Adriatic farmers'], [-5200, 'nile', 'Fayum'], [-5000, 'mideast', 'Eridu'], [-6150, 'europe', 'Storegga tsunami']],
    cities: [[-4200, 'old', 'Nabta Playa'], [-3500, 'nile', 'Hierakonpolis'], [-3400, 'mideast', 'Uruk'], [-3320, 'mideast', null]],
    kings: [[-3250, 'mideast', 'Uruk'], [-3100, 'nile', 'Memphis'], [-3000, 'nile', 'Abydos'], [-2850, 'mideast', 'Ur'], [-2750, 'west', 'Badakhshan mines']],
    pyramids: [[-2650, 'nile', 'Saqqara'], [-2550, 'nile', 'Giza'], [-2545, 'nile', 'Wadi al-Jarf'], [-2450, 'west', 'Mohenjo-daro'], [-2330, 'mideast', 'Akkad']],
    comeback: [[-2180, 'nile', 'Memphis'], [-2150, 'west', 'Harappa'], [-2000, 'mideast', 'Thebes'], [-1900, 'west', 'Knossos']],
    chariots: [[-1500, 'nile', 'Thebes'], [-1400, 'med', 'Mycenae'], [-1320, 'mideast', 'Uluburun wreck'], [-1260, 'mideast', 'Hattusa']],
    collapse: [[-1190, 'med', 'Ugarit'], [-1175, 'med', 'Delta battle'], [-1050, 'med', null], [-900, 'med', 'Tyre']],
    iron: [[-690, 'mideast', 'Nineveh'], [-670, 'nile', 'Napata'], [-600, 'med', 'Athens'], [-510, 'west', 'Persepolis']],
    ideas: [[-488, 'med', 'Marathon'], [-440, 'med', 'Athens'], [-405, 'med', 'Sparta'], [-390, 'eurasia', 'Lumbini']],
    alexander: [[-325, 'west', 'Alexandria'], [-280, 'west', 'Ai-Khanoum'], [-250, 'eurasia', 'Sanchi'], [-216, 'med', 'Cannae']],
    romehan: [[-27, 'med', 'Rome'], [1, 'easia', "Chang'an"], [20, 'eurasia', 'Petra'], [40, 'med', 'Galilee']],
    end: [[225, 'eurasia', 'Luoyang'], [310, 'med', 'Split'], [455, 'europe', 'Ravenna'], [480, 'world', 'Nalanda']]
  };
})();
