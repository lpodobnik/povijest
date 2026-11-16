/* The "meanwhile" timeline: one lane per part of the world.
   T(lane, start, end|null, label)  — end = null makes a single-moment dot. */
(function () {
  const items = [];
  const T = (lane, t0, t1, label) => items.push({ lane, t0, t1, label });

  ATLAS.lanes = [
    ['climate', 'Climate & Earth'],
    ['africa', 'Africa'],
    ['nile', 'Nile valley · Egypt'],
    ['mideast', 'Middle East'],
    ['europe', 'Europe & Mediterranean'],
    ['sasia', 'India & Central Asia'],
    ['easia', 'East Asia'],
    ['oceania', 'SE Asia & Pacific'],
    ['americas', 'Americas']
  ];

  // Climate & Earth
  T('climate', ya(2.6e6), ya(115000), 'Ice ages come and go');
  T('climate', ya(130000), ya(115000), 'Warm spell');
  T('climate', ya(115000), -9700, 'The last Ice Age');
  T('climate', ya(74000), null, 'Toba super-eruption');
  T('climate', ya(26000), ya(19000), 'Coldest point: seas 120 m lower');
  T('climate', -12700, -10900, 'Sudden warming');
  T('climate', -10900, -9700, 'Younger Dryas cold snap');
  T('climate', -9700, 500, 'Warm, steady climate (the Holocene)');
  T('climate', -8500, -5300, 'Green Sahara');
  T('climate', -6200, null, 'Cold snap; Doggerland drowns');
  T('climate', -5300, -3500, 'The Sahara dries out');
  T('climate', -2200, -1950, 'Great drought');
  T('climate', -1600, null, 'Thera eruption');
  T('climate', -1250, -1100, 'Drought around the Mediterranean');
  T('climate', -200, 150, 'Warm, steady "Roman" climate');
  T('climate', 165, 270, 'Plagues; cooler climate');

  // Africa
  T('africa', ya(7e6), null, 'First upright walkers');
  T('africa', ya(3.3e6), null, 'First stone tools');
  T('africa', ya(1.9e6), null, 'Homo erectus');
  T('africa', ya(1e6), null, 'Fire');
  T('africa', ya(300000), null, 'Homo sapiens');
  T('africa', ya(100000), ya(73000), 'Paint and beads at Blombos');
  T('africa', ya(65000), null, 'A small group leaves Africa');
  T('africa', ya(20000), null, 'Ishango tally bone');
  T('africa', -8500, -5000, 'Fishers and cattle herders across the green Sahara');
  T('africa', -4800, null, 'Nabta Playa stone calendar');
  T('africa', -5000, -3500, 'Herders retreat south and to the Nile');
  T('africa', -2500, -1500, 'Kingdom of Kerma (Nubia)');
  T('africa', -2500, null, 'Millet farmed in West Africa');
  T('africa', -1500, 500, 'Bantu-speaking farmers spread across Africa');
  T('africa', -1000, 300, 'Nok culture: iron and sculpture');
  T('africa', -814, -146, 'Carthage');
  T('africa', -780, 350, 'Kingdom of Kush: Napata, then Meroë');
  T('africa', 100, 500, 'Aksum (Ethiopia)');

  // Nile valley · Egypt
  T('nile', ya(18000), null, 'Fishing camps by the Nile');
  T('nile', -11400, null, 'Jebel Sahaba: early warfare');
  T('nile', -5200, null, 'Farming arrives');
  T('nile', -4400, -4000, 'Badarian villages');
  T('nile', -4000, -3300, 'Naqada towns and chiefs');
  T('nile', -3300, -3100, 'Rival kingdoms');
  T('nile', -3250, null, 'First hieroglyphs');
  T('nile', -3100, null, 'Narmer unites Egypt');
  T('nile', -3100, -2686, 'First dynasties');
  T('nile', -2686, -2181, 'Old Kingdom');
  T('nile', -2650, null, 'Step Pyramid');
  T('nile', -2560, null, 'Great Pyramid');
  T('nile', -2181, -2055, 'Egypt breaks apart');
  T('nile', -2055, -1650, 'Middle Kingdom');
  T('nile', -1650, -1550, 'Hyksos rule the north');
  T('nile', -1550, -1070, 'New Kingdom: Egypt\'s empire');
  T('nile', -1479, null, 'Hatshepsut');
  T('nile', -1330, null, 'Tutankhamun');
  T('nile', -1274, null, 'Ramesses II at Kadesh');
  T('nile', -1177, null, 'Sea Peoples beaten off');
  T('nile', -1070, -664, 'Divided Egypt; Libyan and Kushite pharaohs');
  T('nile', -664, -525, 'Last great Egyptian dynasty');
  T('nile', -525, -332, 'Persian rule and revolts');
  T('nile', -332, null, 'Alexander crowned pharaoh');
  T('nile', -305, -30, 'Ptolemies: Greek pharaohs');
  T('nile', -30, null, 'Cleopatra dies; Egypt is Roman');
  T('nile', -30, 500, 'Roman Egypt: grain for the empire');

  // Middle East
  T('mideast', ya(1.8e6), null, 'First humans outside Africa (Georgia)');
  T('mideast', ya(120000), ya(90000), 'Early Homo sapiens visit');
  T('mideast', ya(55000), null, 'Homo sapiens and Neanderthals mix');
  T('mideast', ya(23000), null, 'Wild grain ground into flour');
  T('mideast', -12500, -9600, 'Natufian villages (no farming yet)');
  T('mideast', -9500, -8000, 'Göbekli Tepe');
  T('mideast', -9500, -7000, 'Farming invented: wheat, barley, goats, sheep');
  T('mideast', -8000, null, 'Jericho\'s wall and tower');
  T('mideast', -7400, -6000, 'Çatalhöyük');
  T('mideast', -6200, -4000, 'Ubaid villages: irrigation, temples');
  T('mideast', -4000, -3100, 'Uruk: the first city');
  T('mideast', -3500, null, 'The wheel');
  T('mideast', -3300, null, 'First writing');
  T('mideast', -2900, -2334, 'Sumerian city-states');
  T('mideast', -2550, null, 'Royal Tombs of Ur');
  T('mideast', -2334, -2154, 'Akkadian Empire');
  T('mideast', -2112, -2004, 'Ur revives');
  T('mideast', -1792, -1595, 'Babylon; Hammurabi\'s laws');
  T('mideast', -1650, -1180, 'Hittite Empire');
  T('mideast', -1595, -1155, 'Kassite Babylon');
  T('mideast', -1177, null, 'Ugarit and Hattusa destroyed');
  T('mideast', -1100, -540, 'Phoenician cities; the alphabet');
  T('mideast', -1000, -586, 'Kingdoms of Israel and Judah');
  T('mideast', -911, -609, 'Assyrian Empire');
  T('mideast', -612, -539, 'Babylon under Nebuchadnezzar');
  T('mideast', -550, -330, 'Persian Empire');
  T('mideast', -312, -63, 'Seleucid kings');
  T('mideast', -247, 224, 'Parthian Empire');
  T('mideast', 30, null, 'Jesus is crucified');
  T('mideast', 70, null, 'Jerusalem\'s Temple destroyed');
  T('mideast', 224, 500, 'Sasanian Persia');

  // Europe & Mediterranean
  T('europe', ya(1.2e6), null, 'First humans in Europe');
  T('europe', ya(400000), ya(40000), 'Neanderthals');
  T('europe', ya(130000), null, 'Krapina Neanderthals');
  T('europe', ya(45000), null, 'Homo sapiens arrive');
  T('europe', ya(40000), null, 'Lion-man and flutes');
  T('europe', ya(36000), null, 'Chauvet cave paintings');
  T('europe', ya(26000), ya(19000), 'People shelter in the south');
  T('europe', ya(17000), null, 'Lascaux');
  T('europe', -9600, -6500, 'Hunters and fishers in the forests');
  T('europe', -6500, null, 'Farmers reach Greece');
  T('europe', -6000, null, 'Farmers on the Adriatic');
  T('europe', -5500, -4900, 'Longhouse farmers cross Europe');
  T('europe', -5000, null, 'Copper smelting (Balkans)');
  T('europe', -4500, null, 'Varna gold');
  T('europe', -4500, -2500, 'Megalith builders');
  T('europe', -3250, null, 'Ötzi the Iceman');
  T('europe', -3000, -2600, 'Steppe herders sweep in');
  T('europe', -3000, -2400, 'Vučedol culture');
  T('europe', -2500, null, 'Stonehenge\'s great stones');
  T('europe', -2000, -1450, 'Minoan palaces (Crete)');
  T('europe', -1600, -1150, 'Mycenaean Greece');
  T('europe', -1100, -800, 'Greek "Dark Age"');
  T('europe', -800, -500, 'Greek city-states and colonies');
  T('europe', -800, -300, 'Etruscans');
  T('europe', -776, null, 'First Olympic Games');
  T('europe', -753, null, 'Rome founded (legend)');
  T('europe', -600, -50, 'Celts');
  T('europe', -509, -27, 'Roman Republic');
  T('europe', -508, -322, 'Athenian democracy');
  T('europe', -480, null, 'Greeks defeat Persia');
  T('europe', -431, -404, 'Athens vs Sparta');
  T('europe', -334, -323, 'Alexander');
  T('europe', -264, -146, 'Rome vs Carthage');
  T('europe', -44, null, 'Caesar murdered');
  T('europe', -27, 476, 'Roman Empire');
  T('europe', 79, null, 'Vesuvius buries Pompeii');
  T('europe', 235, 284, 'Rome\'s fifty years of chaos');
  T('europe', 305, null, 'Diocletian\'s palace at Split');
  T('europe', 330, null, 'Constantinople founded');
  T('europe', 376, 476, 'Goths, Huns, Vandals');
  T('europe', 410, null, 'Goths sack Rome');
  T('europe', 476, null, 'Last western emperor');

  // India & Central Asia
  T('sasia', ya(65000), null, 'Homo sapiens reach India');
  T('sasia', ya(45000), null, 'Homo sapiens in Siberia');
  T('sasia', -7000, null, 'Mehrgarh: first farmers');
  T('sasia', -3500, null, 'Horses tamed on the steppe');
  T('sasia', -3300, -2600, 'Early Indus towns');
  T('sasia', -2600, -1900, 'Indus cities: Mohenjo-daro, Harappa');
  T('sasia', -2000, null, 'Chariot invented on the steppe');
  T('sasia', -1900, -1300, 'Indus cities fade');
  T('sasia', -1500, -500, 'Vedic age: Sanskrit hymns, iron, the Ganges');
  T('sasia', -800, -200, 'Scythian horse nomads');
  T('sasia', -450, null, 'The Buddha teaches');
  T('sasia', -322, -185, 'Maurya Empire');
  T('sasia', -260, null, 'Ashoka turns to Buddhism');
  T('sasia', 30, 375, 'Kushan Empire');
  T('sasia', 320, 500, 'Gupta golden age; the zero');

  // East Asia
  T('easia', ya(1.5e6), null, 'Homo erectus in Java and China');
  T('easia', ya(300000), ya(45000), 'Denisovans');
  T('easia', ya(40000), null, 'Homo sapiens near Beijing');
  T('easia', ya(38000), null, 'People reach Japan');
  T('easia', ya(20000), null, 'World\'s first pottery');
  T('easia', -14000, -900, 'Jōmon Japan: villages and pottery without farming');
  T('easia', -7000, -5000, 'Rice and millet farming begins');
  T('easia', -5000, -3000, 'Yangshao villages');
  T('easia', -3300, -2300, 'Liangzhu: jade and waterworks');
  T('easia', -3000, -1900, 'Longshan walled towns');
  T('easia', -1900, -1500, 'Erlitou: first bronze palaces');
  T('easia', -1600, -1046, 'Shang dynasty');
  T('easia', -1250, null, 'Oracle bones: first Chinese writing');
  T('easia', -1046, -771, 'Western Zhou');
  T('easia', -771, -221, 'Rival states at war');
  T('easia', -551, null, 'Confucius born');
  T('easia', -221, null, 'Qin unites China');
  T('easia', -202, 220, 'Han dynasty');
  T('easia', -130, 500, 'Silk Road');
  T('easia', 105, null, 'Paper');
  T('easia', 220, 500, 'China divided; Buddhism spreads');
  T('easia', -900, 300, 'Yayoi Japan: rice and metal');

  // SE Asia & Pacific
  T('oceania', ya(190000), ya(50000), '"Hobbit" humans on Flores');
  T('oceania', ya(51000), null, 'Oldest picture story (Sulawesi)');
  T('oceania', ya(50000), 500, 'Aboriginal Australians: the oldest continuous cultures on Earth');
  T('oceania', ya(42000), null, 'Lake Mungo burials');
  T('oceania', ya(26000), ya(12000), 'Australia and New Guinea are one land');
  T('oceania', -6000, null, 'The sea separates New Guinea');
  T('oceania', -5000, null, 'Gardens in New Guinea');
  T('oceania', -3000, -1500, 'Sailors from Taiwan settle the islands');
  T('oceania', -1500, -850, 'Lapita sailors reach Fiji, Tonga, Samoa');
  T('oceania', -850, 500, 'Polynesian culture forms');
  T('oceania', 100, 500, 'Trading kingdoms of Southeast Asia');

  // Americas
  T('americas', ya(7e6), ya(23000), 'No humans in the Americas');
  T('americas', ya(22000), null, 'Footprints at White Sands');
  T('americas', -12500, null, 'Monte Verde, Chile');
  T('americas', -11100, -10700, 'Clovis hunters');
  T('americas', -11000, -9000, 'Giant animals die out');
  T('americas', -8000, null, 'Squash farmed in Mexico');
  T('americas', -7000, null, 'Maize bred from wild grass');
  T('americas', -5000, null, 'Chinchorro mummies');
  T('americas', -5000, -3000, 'Potatoes, quinoa and llamas in the Andes');
  T('americas', -3500, null, 'First mounds (Louisiana)');
  T('americas', -3000, -1800, 'Norte Chico: Caral\'s pyramids');
  T('americas', -1400, -400, 'Olmecs');
  T('americas', -900, -200, 'Chavín (Andes)');
  T('americas', -700, 250, 'Early Maya towns and pyramids');
  T('americas', -500, 500, 'Mound builders (Ohio)');
  T('americas', -100, 500, 'Teotihuacan');
  T('americas', 100, 500, 'Moche and Nazca (Peru)');
  T('americas', 250, 500, 'Classic Maya cities');

  ATLAS.timeline = items;
})();
