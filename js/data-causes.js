/* The chain of causes: nodes (big developments) and links (why one led to another).
   N(id, chapterIndex, theme, title, text)   L(from, to, why, isMainSpine) */
(function () {
  const nodes = [], links = [];
  const N = (id, ch, th, title, text) => nodes.push({ id, ch, th, title, text });
  const L = (from, to, why, main) => links.push({ from, to, why, main: !!main });

  ATLAS.themes = [
    ['earth', 'Climate & Earth'],
    ['food', 'Food'],
    ['people', 'People & places'],
    ['ideas', 'Tools & ideas'],
    ['power', 'Power & society']
  ];

  // 0 — Before us
  N('upright', 0, 'people', 'Walking upright', `Our ancestors stood up on two legs between 7 and 4 million years ago.`);
  N('bigbrain', 0, 'people', 'Bigger brains', `Human brains tripled in size over 2 million years.`);
  N('erectusout', 0, 'people', 'First humans leave Africa', `Homo erectus spreads across Asia and Europe.`);
  N('tools', 0, 'ideas', 'Stone tools', `From 3.3 million years ago: sharp flakes and hammer stones.`);
  N('fire', 0, 'ideas', 'Fire and cooking', `Controlled fire, perhaps a million years ago.`);
  L('upright', 'tools', `Walking on two legs freed the hands to carry things and to make things.`, 1);
  L('tools', 'bigbrain', `Tools opened up meat and marrow: rich food for a hungry, growing brain.`, 1);
  L('fire', 'bigbrain', `Cooked food gives more energy for less chewing and digesting.`);
  L('bigbrain', 'erectusout', `Smarter, tool-using humans could cope with new lands and climates.`);
  L('fire', 'erectusout', `Fire made cold places liveable.`);

  // 1 — One human among many
  N('swings', 1, 'earth', 'Wild swings of climate', `Ice ages came and went; the Sahara flipped between desert and grassland.`);
  N('sapiens', 1, 'people', 'Homo sapiens', `Our species takes shape across Africa by 300,000 years ago.`);
  N('symbols', 1, 'ideas', 'Symbols and language', `Paint, beads and patterns: signs of shared stories and full language.`);
  L('bigbrain', 'sapiens', `The long growth of the brain led to our own species.`, 1);
  L('swings', 'sapiens', `A constantly changing world favoured humans who were flexible, inventive and good at working together.`);
  L('sapiens', 'symbols', `Larger groups needed ways to show who belonged and to pass on what they knew.`, 1);

  // 2 — Out of Africa
  N('outofafrica', 2, 'people', 'Out of Africa', `Homo sapiens spreads across Asia, Australia and Europe.`);
  N('othersgone', 2, 'people', 'The other humans vanish', `Neanderthals, Denisovans and the rest are gone by about 40,000 years ago.`);
  N('boats', 2, 'ideas', 'Boats and sea crossings', `Rafts or canoes good enough to reach Australia.`);
  N('needles', 2, 'ideas', 'Art, music and the needle', `Cave paintings, flutes and sewn clothing.`);
  L('symbols', 'outofafrica', `Language let people plan, teach and cooperate with strangers: the toolkit for settling new lands.`, 1);
  L('swings', 'outofafrica', `Wet phases opened green corridors through the deserts, and low seas narrowed the water crossings.`);
  L('boats', 'outofafrica', `Without boats, Australia and many islands were out of reach.`);
  L('outofafrica', 'othersgone', `Wherever Homo sapiens arrived in numbers, the older humans disappeared within a few thousand years.`);
  L('erectusout', 'othersgone', `The earlier migrants had become the Neanderthals, Denisovans and others that our species now met.`);
  L('symbols', 'needles', `Minds that think in symbols make art, and invent.`);

  // 3 — The Great Freeze
  N('lgm', 3, 'earth', 'The coldest Ice Age', `Ice sheets 3 km thick; seas 120 m lower.`);
  N('bridges', 3, 'earth', 'Land bridges', `Beringia, Sunda, Sahul and Doggerland are dry land.`);
  N('dogs', 3, 'food', 'Dogs', `Wolves become the first tamed animal.`);
  N('americas', 3, 'people', 'People reach the Americas', `Across Beringia and down the coast.`);
  L('lgm', 'bridges', `Water locked up in ice lowered the oceans and exposed the shallow sea floor.`);
  L('bridges', 'americas', `Siberia and Alaska were joined by land.`);
  L('needles', 'americas', `Only people with sewn fur clothing could live in the Arctic long enough to cross.`);
  L('outofafrica', 'americas', `The same great expansion, continued.`, 1);

  // 4 — The Great Thaw
  N('warming', 4, 'earth', 'The world warms', `From 14,700 years ago the ice melts.`);
  N('searise', 4, 'earth', 'Seas rise', `Land bridges drown; continents are cut off from each other.`);
  N('yd', 4, 'earth', 'A sudden cold snap', `The Younger Dryas: 1,200 years of cold and drought.`);
  N('megafauna', 4, 'food', 'The giant animals die out', `Mammoths, giant sloths and many more.`);
  N('wildgrain', 4, 'food', 'Wild grain in plenty', `Wheat, barley and lentils grow wild across the Fertile Crescent.`);
  N('settle', 4, 'people', 'Villages before farming', `Natufians stay in one place all year.`);
  L('lgm', 'warming', `Earth's slowly shifting orbit brought more summer sun to the north, and the ice began to melt.`);
  L('warming', 'searise', `Melted ice ran back into the oceans.`);
  L('warming', 'wildgrain', `Warmer, wetter weather let grasses and nut trees spread.`, 1);
  L('wildgrain', 'settle', `With enough food in one place all year, there was no need to move.`, 1);
  L('warming', 'megafauna', `Their cold grassland home shrank.`);
  L('americas', 'megafauna', `Skilled hunters arrived among animals that had never learned to fear people.`);
  L('warming', 'yd', `A flood of meltwater probably switched off the ocean current that warms the north.`);

  // 5 — Seeds of change
  N('holocene', 5, 'earth', 'A warm, steady climate', `The Holocene: 11,700 years of reliable seasons.`);
  N('greensahara', 5, 'earth', 'The green Sahara', `Monsoon rains turn the desert to grassland and lakes.`);
  N('farming', 5, 'food', 'Farming is invented', `Crops and herds, in at least seven separate places.`);
  N('surplus', 5, 'food', 'Stored food to spare', `Grain keeps for years in a jar or a granary.`);
  N('popboom', 5, 'people', 'Population boom', `Farming feeds up to 100 times more people from the same land.`);
  N('villages', 5, 'people', 'Villages and towns', `Jericho, Çatalhöyük: thousands living side by side.`);
  N('disease', 5, 'people', 'New diseases', `Germs jump from herds to crowded humans.`);
  N('property', 5, 'power', 'Property, rich and poor', `Land and stores can be owned, inherited and stolen.`);
  L('settle', 'farming', `People who stay put can tend, guard and store a crop.`, 1);
  L('holocene', 'farming', `Planting only pays if next season will be like the last.`, 1);
  L('yd', 'farming', `When wild food shrank, settled villagers may have begun planting to make up the difference.`);
  L('megafauna', 'farming', `With fewer big animals to hunt, people leaned more on plants.`);
  L('dogs', 'farming', `Taming the wolf showed that animals could become partners: a first step toward herding.`);
  L('farming', 'surplus', `Grain can be stored; one good harvest feeds you for more than a year.`, 1);
  L('surplus', 'popboom', `More food and settled life meant more children survived.`, 1);
  L('farming', 'villages', `Fields tie you to one spot.`);
  L('farming', 'disease', `Measles, flu and smallpox began as animal diseases.`);
  L('surplus', 'property', `Once there is a store of food, someone owns it and someone else wants it.`);
  L('holocene', 'greensahara', `Stronger summer sun pulled Africa's monsoon rains north.`);

  // 6 — Farmers on the move
  N('herders', 6, 'food', 'Herders of the green Sahara', `Cattle people live across what is now desert.`);
  N('irrigation', 6, 'food', 'Irrigation', `Canals bring river water to dry fields in Mesopotamia.`);
  N('farmspread', 6, 'people', 'Farmers spread', `Into Europe, toward India, and to the Nile.`);
  N('kilns', 6, 'ideas', 'Kilns, pottery, copper', `Hot ovens for pots lead to the first metal.`);
  L('popboom', 'farmspread', `Full villages sent their young families out to clear new land.`, 1);
  L('farming', 'irrigation', `Farmers moving onto dry but fertile river plains had to bring the water to the fields.`, 1);
  L('greensahara', 'herders', `There was grass and water where there is now sand.`);
  L('farming', 'herders', `Tame cattle, sheep and goats spread into Africa.`);
  L('villages', 'kilns', `Settled people can keep heavy pots and build ovens.`);

  // 7 — A drying desert, the first cities
  N('saharadries', 7, 'earth', 'The Sahara dries out', `The rains retreat; grassland turns to desert by 3500 BCE.`);
  N('nilecrowd', 7, 'people', 'Crowding into the Nile valley', `Herders and farmers pack into a thin strip of green.`);
  N('cities', 7, 'people', 'The first cities', `Uruk: 40,000 people, most of them not farmers.`);
  N('wheel', 7, 'ideas', 'Wheel, plough, sail, donkey', `A burst of inventions for growing and moving more.`);
  N('specialists', 7, 'power', 'Specialists', `Priests, potters, smiths, traders, soldiers.`);
  N('temple', 7, 'power', 'Temples and chiefs take charge', `Someone has to store the grain and settle the quarrels.`);
  L('greensahara', 'saharadries', `The same slow wobble of Earth's orbit that brought the rains took them away again.`);
  L('saharadries', 'nilecrowd', `The Nile was the one place where water never failed.`, 1);
  L('herders', 'nilecrowd', `Sahara herders brought their cattle, and their reverence for cattle, into the valley.`);
  L('farmspread', 'nilecrowd', `Wheat and barley farming had reached the Nile from the Middle East just before.`);
  L('irrigation', 'cities', `Canal farming grew enough grain to feed tens of thousands in one place.`, 1);
  L('surplus', 'specialists', `If farmers grow more than they eat, other people can do other work.`, 1);
  L('specialists', 'cities', `Craftspeople and traders gather where the customers and the grain are.`);
  L('irrigation', 'temple', `Canals need organising: who digs, and who gets water first.`);
  L('property', 'temple', `Owners want their stores guarded and their disputes judged.`);

  // 8 — Writing and kings
  N('nilegift', 8, 'earth', 'The Nile: flood, highway, walls', `A yearly flood, a river road, and desert on both sides.`);
  N('writing', 8, 'ideas', 'Writing', `Clay tablets in Sumer, hieroglyphs in Egypt.`);
  N('bronze', 8, 'ideas', 'Bronze', `Copper plus tin: hard, sharp, and it can be melted and recast.`);
  N('trade', 8, 'ideas', 'Long-distance trade', `Lapis from Afghanistan, cedar from Lebanon, tin from afar.`);
  N('states', 8, 'power', 'Kings, taxes, states', `Rulers with scribes, storehouses and soldiers.`);
  N('unification', 8, 'power', 'Egypt becomes one kingdom', `About 3100 BCE, from the first cataract to the sea.`);
  L('cities', 'writing', `There were too many people and goods to keep track of by memory.`, 1);
  L('temple', 'writing', `Temple accountants needed lasting records of who had given and received what.`);
  L('writing', 'states', `Written records let a ruler tax, command and remember across great distances.`, 1);
  L('temple', 'states', `Temple managers and war leaders hardened into kings.`);
  L('nilecrowd', 'unification', `Crowded rival towns fought and merged until only one ruler was left.`, 1);
  L('nilegift', 'unification', `The river made every village reachable by boat, and the deserts kept rivals out and farmers in.`);
  L('wheel', 'unification', `Sailing boats could go upstream on the wind and downstream on the current.`);
  L('kilns', 'bronze', `Smiths who could smelt copper learned to mix it with tin.`);
  L('bronze', 'trade', `Tin is rare, so bronze-makers had to trade over huge distances.`);
  L('wheel', 'trade', `Carts, pack donkeys and sailing boats move heavy goods far.`);

  // 9 — The age of pyramids
  N('otherciv', 9, 'people', 'Cities on four continents', `Indus, Peru, China: civilisation invented again and again.`);
  N('godking', 9, 'power', 'The god-king', `Pharaoh keeps the world in order, alive or dead.`);
  N('pyramids', 9, 'power', 'The pyramids', `Stone mountains built by a whole country.`);
  N('strain', 9, 'power', 'Costly tombs, mighty governors', `Wealth and power leak away from the king.`);
  N('akkad', 9, 'power', 'The first empire', `Sargon of Akkad rules many peoples.`);
  L('unification', 'godking', `One ruler over the whole land seemed more than human.`, 1);
  L('godking', 'pyramids', `If the dead king still keeps the Nile flowing, his tomb is the most important building there is.`, 1);
  L('states', 'pyramids', `Only a state that could tax grain and keep records could feed 20,000 builders for decades.`, 1);
  L('nilegift', 'pyramids', `Flood harvests produced the spare grain, and boats carried the stone.`);
  L('pyramids', 'strain', `Generations of giant tombs and temples drained the treasury and handed land to priests and officials.`);
  L('states', 'akkad', `Once cities had kings and armies, the strongest could conquer the rest.`);
  L('bronze', 'akkad', `Bronze weapons armed the first standing army.`);
  L('farming', 'otherciv', `Wherever farming produced a surplus, towns and rulers followed.`);
  L('searise', 'otherciv', `Cut off by the risen seas, the Americas developed entirely on their own, and still invented farming and cities.`);
  L('megafauna', 'otherciv', `The Americas were left with few animals to tame: no ploughs, carts or cavalry. Cities rose anyway.`);

  // 10 — Collapse and comeback
  N('drought42', 10, 'earth', 'The great drought', `Around 2200 BCE the monsoon weakens for decades.`);
  N('indusfade', 10, 'people', 'The Indus cities fade', `People drift away to smaller villages.`);
  N('lawcodes', 10, 'ideas', 'Written laws', `Ur-Nammu, then Hammurabi: the rules carved in stone.`);
  N('chariot', 10, 'ideas', 'The chariot', `Tamed horses plus spoked wheels, from the steppe.`);
  N('collapse1', 10, 'power', 'Old Kingdom and Akkad fall', `Two great states break up at the same moment.`);
  N('recovery', 10, 'power', 'Comeback', `Middle Kingdom Egypt; Ur, and then Babylon.`);
  L('drought42', 'collapse1', `Low Nile floods and failed rains meant famine, and kings who could not prevent it lost their authority.`, 1);
  L('strain', 'collapse1', `The state was already weak at the centre when the drought hit.`, 1);
  L('drought42', 'indusfade', `The Indus cities depended on the same monsoon.`);
  L('collapse1', 'recovery', `New rulers learned from the failure: store grain, dig canals, look after the people.`, 1);
  L('writing', 'lawcodes', `Once you can write, you can fix the rules so that no judge can quietly change them.`);
  L('states', 'lawcodes', `Kingdoms of many cities and peoples needed one set of rules.`);
  L('wheel', 'chariot', `The heavy solid cart wheel was lightened into a spoked one, and horses replaced oxen.`);

  // 11 — Chariots and great kings
  N('palaces', 11, 'people', 'Palace economies', `Everything is collected, stored and shared out by the palace.`);
  N('tintrade', 11, 'ideas', 'The bronze trade web', `Copper and tin shipped across the whole known world.`);
  N('hyksos', 11, 'power', 'Chariot invaders', `Hyksos in Egypt, Kassites in Babylon: new rulers everywhere.`);
  N('newkingdom', 11, 'power', `Egypt's empire`, `The New Kingdom rules from Sudan to Syria.`);
  N('club', 11, 'power', 'The club of great kings', `Letters, gifts, treaties, royal weddings.`);
  N('shang', 11, 'power', 'Shang China', `Bronze, chariots and oracle bones.`);
  L('chariot', 'hyksos', `Whoever had chariots first could scatter armies on foot.`, 1);
  L('hyksos', 'newkingdom', `Egypt copied the invaders' weapons, threw them out, and conquered a buffer zone so it could never happen again.`, 1);
  L('recovery', 'newkingdom', `The reunited Egyptian state gave the base to build on.`);
  L('bronze', 'tintrade', `Every army needed bronze, and tin came from very far away.`);
  L('trade', 'tintrade', `Old trade routes grew into a web linking a dozen kingdoms.`, 1);
  L('tintrade', 'club', `Kings who needed each other's metals had to talk as well as fight.`);
  L('newkingdom', 'club', `Egypt's gold made it the partner everyone wanted.`);
  L('tintrade', 'palaces', `Palaces ran the trade and the workshops that depended on it.`, 1);
  L('chariot', 'shang', `Chariots reached China about 1200 BCE and became the mark of Shang kings.`);
  L('otherciv', 'shang', `China's walled towns grew into a kingdom.`);

  // 12 — The great collapse and the age of iron
  N('stress', 12, 'earth', 'Drought, quakes, famine', `Decades of bad harvests around 1200 BCE.`);
  N('seapeoples', 12, 'people', 'Sea Peoples and refugees', `Whole peoples on the move, raiding as they go.`);
  N('phoenicians', 12, 'people', 'Phoenician traders', `Free sea-trading cities, with colonies as far as Spain.`);
  N('bantu', 12, 'people', 'Bantu farmers spread', `Farming, and later iron, carried across Africa.`);
  N('iron', 12, 'ideas', 'Iron', `A metal whose ore lies almost everywhere.`);
  N('alphabet', 12, 'ideas', 'The alphabet', `About two dozen signs, one for each sound.`);
  N('bacollapse', 12, 'power', 'The Bronze Age collapse', `Hittites, Mycenae and Ugarit destroyed; Egypt crippled.`);
  L('stress', 'seapeoples', `Hungry people leave home, and some take what they need by force.`);
  L('seapeoples', 'bacollapse', `Raids cut the sea lanes and burned the ports.`);
  L('stress', 'bacollapse', `Famine emptied the storehouses that the palaces depended on.`);
  L('palaces', 'bacollapse', `Over-organised palaces could not cope when supplies stopped.`, 1);
  L('tintrade', 'bacollapse', `Each kingdom depended on the others, so they fell like dominoes.`);
  L('bacollapse', 'iron', `With the tin trade broken, smiths turned to the ore under their feet.`, 1);
  L('bacollapse', 'phoenicians', `With the great powers gone, small port cities were free to trade for themselves.`);
  L('phoenicians', 'alphabet', `Busy traders needed a script anyone could learn in weeks, not years.`, 1);
  L('bacollapse', 'alphabet', `The palace scribes and their difficult scripts had vanished.`);
  L('farming', 'bantu', `West African farmers spread the way Europe's first farmers had: growing villages sending families on to new land.`);
  L('iron', 'bantu', `Iron axes and hoes cleared forest for fields.`);

  // 13 — Iron empires and city-states
  N('cheapiron', 13, 'food', 'Iron axes and ploughs', `More land cleared, more food, more people.`);
  N('coins', 13, 'ideas', 'Coins', `Stamped lumps of metal, from Lydia about 630 BCE.`);
  N('assyria', 13, 'power', 'Assyria', `The first empire built on iron and terror.`);
  N('persia', 13, 'power', 'The Persian Empire', `From Egypt to India, ruled with tolerance.`);
  N('polis', 13, 'power', 'Greek city-states', `Hundreds of small independent cities and their colonies.`);
  N('warringchina', 13, 'power', `China's rival states`, `The Zhou kingdom splinters into warring states.`);
  L('iron', 'cheapiron', `Iron was cheap enough for ordinary farmers.`);
  L('iron', 'assyria', `Iron armed huge armies of foot soldiers.`, 1);
  L('assyria', 'persia', `Assyria's cruelty united its enemies; the Persians inherited its lands and roads and ruled them more gently.`, 1);
  L('cheapiron', 'polis', `Growing populations ran out of land and founded colonies overseas.`);
  L('phoenicians', 'polis', `Greeks learned sea routes, trade and letters from the Phoenicians.`);
  L('alphabet', 'polis', `When ordinary citizens can read, laws can be posted up and argued over.`, 1);
  L('trade', 'coins', `Traders wanted a quicker way to pay than weighing out silver.`);
  L('cheapiron', 'warringchina', `Iron and bigger populations gave every lord a large army.`);
  L('shang', 'warringchina', `The Zhou, who replaced the Shang, could not hold their own lords together.`);

  // 14 — Persia, Greece and the age of big ideas
  N('thinkers', 14, 'ideas', 'The age of big ideas', `Buddha, Confucius, Socrates, the Hebrew prophets.`);
  N('persianwars', 14, 'power', 'Greeks stop Persia', `Marathon, Thermopylae, Salamis.`);
  N('democracy', 14, 'power', 'Athenian democracy', `Citizens vote on the laws themselves.`);
  N('greekwar', 14, 'power', 'Greeks exhaust each other', `Athens against Sparta, 431–404 BCE.`);
  N('republic', 14, 'power', 'The Roman Republic', `Elected leaders, a Senate, written law.`);
  L('persia', 'persianwars', `Persia's empire had reached the Greek cities of Turkey, and they rebelled.`);
  L('polis', 'persianwars', `Free citizens fighting for their own cities proved hard to beat.`);
  L('polis', 'democracy', `Men who fought for the city demanded a share in ruling it.`, 1);
  L('persianwars', 'democracy', `Victory made Athens rich and confident, and gave power to the poor citizens who rowed the fleet.`);
  L('democracy', 'greekwar', `Athens turned its alliance into an empire, and Sparta struck back.`, 1);
  L('polis', 'thinkers', `Cities full of traders and arguments were schools for new thinking.`);
  L('coins', 'thinkers', `Money and markets upset the old order of nobles and priests.`);
  L('warringchina', 'thinkers', `Endless war made Chinese thinkers ask what a good ruler and a good life are.`);
  L('alphabet', 'thinkers', `Easy writing let ideas be recorded, copied and argued with.`);
  L('polis', 'republic', `Rome was a city-state too, and like many Greek cities it threw out its king.`);

  // 15 — Alexander and the age of empires
  N('hellenism', 15, 'ideas', 'A Greek-speaking world', `Alexandria, libraries, science; Greek from Egypt to Afghanistan.`);
  N('alexander', 15, 'power', `Alexander's conquests`, `Greece to India in ten years.`);
  N('maurya', 15, 'power', 'India united', `The Maurya Empire; Ashoka spreads Buddhism.`);
  N('qin', 15, 'power', 'China united', `The First Emperor: one script, one law, one wall.`);
  N('romerise', 15, 'power', 'Rome defeats Carthage', `Master of Italy, then of the western sea.`);
  L('greekwar', 'alexander', `The worn-out Greek cities fell to Macedon, whose king then led them east.`, 1);
  L('persia', 'alexander', `Persia's roads and tidy provinces meant that whoever beat the king got everything.`, 1);
  L('alexander', 'hellenism', `His soldiers settled in new Greek cities across Asia.`, 1);
  L('thinkers', 'hellenism', `Greek philosophy and science travelled with them.`);
  L('alexander', 'maurya', `His invasion shook north-west India, and Chandragupta filled the gap.`);
  L('thinkers', 'maurya', `Ashoka made the Buddha's teaching the guide for his empire.`);
  L('warringchina', 'qin', `Centuries of war bred ruthless, efficient states, and the most efficient won.`, 1);
  L('thinkers', 'qin', `Qin followed the Legalists, who taught strict laws and harsh punishments.`);
  L('republic', 'romerise', `The Republic could call up citizen soldiers year after year, and never gave up.`, 1);

  // 16 — Rome and Han
  N('silkroad', 16, 'ideas', 'The Silk Roads', `Caravans and monsoon ships link Rome, Persia, India and China.`);
  N('christianity', 16, 'ideas', 'Christianity begins', `From Roman Judea across the empire.`);
  N('buddhism', 16, 'ideas', 'Buddhism reaches China', `Carried by monks and merchants along the Silk Road.`);
  N('romanemp', 16, 'power', 'The Roman Empire', `All the lands around the Mediterranean.`);
  N('egyptend', 16, 'power', 'The last pharaoh', `30 BCE: Egypt becomes a Roman province.`);
  N('han', 16, 'power', 'Han China', `A united empire run by scholar-officials.`);
  L('romerise', 'romanemp', `With Carthage gone nobody could stop Rome, and its generals turned the Republic into one-man rule.`, 1);
  L('hellenism', 'egyptend', `Alexander's general Ptolemy founded the Greek dynasty that ended with Cleopatra.`);
  L('romanemp', 'egyptend', `Rome wanted Egypt's grain and gold, and took them.`, 1);
  L('qin', 'han', `Qin's harshness caused revolt; the Han kept the united state and softened the rule.`, 1);
  L('thinkers', 'han', `The teachings of Confucius became the training for Han officials.`);
  L('han', 'silkroad', `Han armies pushed west and opened the road through Central Asia.`, 1);
  L('romanemp', 'silkroad', `Rich Romans paid in gold for silk and pepper.`);
  L('hellenism', 'silkroad', `Greek-founded cities and Greek-speaking traders lined the route.`);
  L('romanemp', 'christianity', `Peace, roads and shared languages let a new faith travel fast.`);
  L('thinkers', 'christianity', `It grew out of the Jewish prophets' teaching of one just God.`);
  L('silkroad', 'buddhism', `Ideas travel with goods.`);
  L('maurya', 'buddhism', `Ashoka's missionaries had already carried Buddhism to the edge of Central Asia.`);

  // 17 — The ancient world ends
  N('plague', 17, 'earth', 'Plagues and a cooler climate', `Great epidemics; harvests fail.`);
  N('huns', 17, 'people', 'Huns and peoples on the move', `Steppe riders push Goths and others into Rome.`);
  N('christianemp', 17, 'ideas', 'A Christian empire', `Constantine; Christianity becomes the state religion.`);
  N('legacy', 17, 'ideas', 'What the ancient world left us', `Alphabets, numbers, laws, religions, cities.`);
  N('crisis', 17, 'power', 'Empires in crisis', `Han China falls; Rome nearly does.`);
  N('fallwest', 17, 'power', 'The western empire ends', `476 CE: new kingdoms in the West.`);
  L('silkroad', 'plague', `Germs travelled the trade routes along with the silk.`, 1);
  L('plague', 'crisis', `Fewer people meant fewer soldiers, farmers and taxes.`, 1);
  L('romanemp', 'crisis', `An empire this large was costly to defend and easy for generals to fight over.`);
  L('han', 'crisis', `Han China broke apart under epidemics, floods, rebellions and warlords.`);
  L('crisis', 'christianemp', `In frightening times people looked for hope, and emperors for something to unite the empire.`);
  L('christianity', 'christianemp', `Three centuries of quiet growth had made Christians too many to ignore.`);
  L('huns', 'fallwest', `Whole peoples crossed the frontier to escape the Huns, and stayed.`, 1);
  L('crisis', 'fallwest', `A weakened West could no longer pay or control its armies.`, 1);
  L('fallwest', 'legacy', `The new kingdoms kept Latin, Roman law and the Church.`, 1);
  L('hellenism', 'legacy', `Greek science and philosophy were copied and kept, in Constantinople and later Baghdad.`);
  L('alphabet', 'legacy', `Nearly every alphabet in use today descends from the Phoenician one.`);
  L('thinkers', 'legacy', `Buddhism, Confucianism, Judaism and Greek philosophy still shape how billions of people think.`);
  L('democracy', 'legacy', `The idea of citizens who vote was rediscovered two thousand years later.`);

  ATLAS.nodes = nodes;
  ATLAS.links = links;
})();
