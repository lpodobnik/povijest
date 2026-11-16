/* The Ancient World — chapter stories.
   Years: negative = BCE, positive = CE. ya(n) converts "n years ago" to that scale. */
window.ATLAS = window.ATLAS || {};
const ya = n => -(n - 2000);
ATLAS.ya = ya;

ATLAS.chapters = [
{
  id: 'before', t0: ya(7e6), t1: ya(300000), w: 240, view: 'old',
  title: 'Before Us', short: 'Before us',
  idea: `For millions of years there were many kinds of human. Walking upright, making tools and taming fire slowly built the body and brain we have today.`,
  story: [
    `Our story starts in Africa about 7 million years ago, when the family line that leads to us split from the line that leads to chimpanzees. The first members of our branch were small and ape-like, but they began to walk on two legs. That freed their hands.`,
    `Free hands can carry food and babies, and they can make things. By 3.3 million years ago someone in Kenya was chipping stones into tools: sharp flakes to cut meat, heavy stones to crack bones for marrow. Richer food fed a growing brain, and a bigger brain made better tools. A loop had started.`,
    `About 2 million years ago a tall, long-legged human called <i>Homo erectus</i> appeared. They were the first to walk out of Africa, reaching Georgia by 1.8 million years ago and later Java and China. Somewhere along the way people learned to control fire: warmth, light, safety from predators, and cooked food that gives far more energy.`,
    `By 300,000 years ago the descendants of those wanderers had become several different kinds of human: Neanderthals in Europe, Denisovans in Asia, and others. And back in Africa a new kind was appearing: us.`
  ],
  meanwhile: [
    ['Africa', `Every early human species begins here. For 5 million years, Africa is the whole human world.`],
    ['Asia', `<i>Homo erectus</i> reaches Java about 1.5 million years ago and survives there for more than a million years.`],
    ['Europe', `The first humans reach Spain by 1.2 million years ago. By 430,000 years ago early Neanderthals live at Atapuerca.`],
    ['Americas & Australia', `No humans at all, and there will not be any for a very long time.`],
    ['Climate', `About 2.6 million years ago the Ice Ages begin: cold and warm periods taking turns, again and again.`]
  ],
  fact: `This chapter covers 96% of the whole story. If these 7 million years were one day, everything in the other seventeen chapters would fit into the last hour.`,
  ask: [`Why might walking on two legs have been such a big deal?`, `Fire did more than cook food. How many uses can you think of?`]
},
{
  id: 'sapiens', t0: ya(300000), t1: ya(70000), w: 280, view: 'old',
  title: 'One Human Among Many', short: 'Many humans',
  idea: `Our own species, Homo sapiens, took shape across Africa. We shared the planet with at least five other kinds of human.`,
  story: [
    `The oldest known bones of <i>Homo sapiens</i> are about 300,000 years old and come from Jebel Irhoud in Morocco. Others nearly as old turn up in Ethiopia and South Africa. So there was no single birthplace: our species took shape across the whole of Africa, in groups that drifted apart and met again as the climate changed.`,
    `And the climate changed a lot. In wet times the Sahara turned green and people could cross it; in dry times it was a wall. (Drag the time bar and watch it pulse.) Several times small bands walked out of Africa into Arabia and the Middle East. These early journeys mostly died out.`,
    `We were not alone. Neanderthals lived from Spain to Siberia. Denisovans lived across East Asia. On Indonesian islands there were tiny "hobbit" humans about a metre tall. In South Africa lived small-brained <i>Homo naledi</i>, and on Java the last <i>Homo erectus</i>.`,
    `Something new was stirring in Africa. From about 100,000 years ago people at Blombos Cave mixed red paint, scratched patterns into stone and wore shell beads. Beads are useless for hunting. They send a message: this is who I am, this is my group. That is a mind that thinks in symbols, and almost certainly talks like we do.`
  ],
  meanwhile: [
    ['Europe', `Neanderthals hunt big game, make glue from birch tar and sometimes bury their dead.`],
    ['Asia', `Denisovans live from Siberia to Southeast Asia. We know them mostly from DNA in a finger bone and a few teeth.`],
    ['Indonesia', `On Flores, "hobbit" humans hunt dwarf elephants and dodge giant lizards.`],
    ['Americas & Australia', `Still no humans.`],
    ['Climate', `About 74,000 years ago the Toba volcano in Sumatra erupts: the biggest eruption in 2 million years. People seem to have coped better than once thought.`]
  ],
  fact: `Krapina in Croatia is one of the richest Neanderthal sites in the world: bones of dozens of people who lived about 130,000 years ago, found in 1899.`,
  ask: [`Shell beads cannot help you hunt or keep warm. Why would people spend hours making them?`, `What do you think it was like to meet a different kind of human?`]
},
{
  id: 'out', t0: ya(70000), t1: ya(30000), w: 320, view: 'old',
  title: 'Out of Africa', short: 'Out of Africa',
  idea: `A small group of Homo sapiens left Africa. Within 40,000 years their descendants had reached Australia, Europe and Siberia, and every other kind of human had vanished.`,
  story: [
    `Sometime between 70,000 and 50,000 years ago a group of <i>Homo sapiens</i>, perhaps only a few thousand people, left Africa. This time the move stuck. Everyone alive today whose ancestors lived outside Africa descends mostly from that group.`,
    `They moved fast. Following coasts and rivers they reached India, then Southeast Asia. The sea was lower, so many of today's islands were joined to the mainland. But reaching Australia still meant crossing at least 90 km of open water, so they had boats or rafts. People were in Australia by 50,000 years ago, maybe earlier.`,
    `Others turned north and west, reaching Europe about 45,000 years ago, where Neanderthals had lived for 300,000 years. The two met and had children together, which is why people outside Africa still carry about 2% Neanderthal DNA. But by 40,000 years ago the Neanderthals were gone, and soon the other humans too. We probably outnumbered, out-competed and absorbed them.`,
    `Everywhere they went, these people made art: painted animals in Sulawesi (51,000 years ago) and in France's Chauvet cave, an ivory lion-man and bone flutes in Germany. And one small invention with huge results: the sewing needle. Fitted fur clothing let people live in the Arctic cold.`
  ],
  meanwhile: [
    ['Africa', `Most humans still live here. People make bone harpoons, bows and arrows, and trade beads over hundreds of kilometres.`],
    ['Europe', `For a few thousand years Neanderthals and Homo sapiens live side by side.`],
    ['Australia', `The first Australians spread across a continent of giant kangaroos and wombats the size of cars. Most of the giants die out by 40,000 years ago.`],
    ['Siberia', `People are living north of the Arctic Circle by 32,000 years ago.`],
    ['Americas', `Still empty of people.`]
  ],
  fact: `Bones from Vindija Cave in Croatia were used in 2010 to read the Neanderthal genome for the first time. That is how we know you carry a little Neanderthal in you.`,
  ask: [`Why do you think Homo sapiens survived and the other humans did not?`, `To reach Australia, people sailed toward land they could not see. Why would anyone do that?`]
},
{
  id: 'ice', t0: ya(30000), t1: ya(15000), w: 280, view: 'world',
  title: 'The Great Freeze', short: 'Great Freeze',
  idea: `At the peak of the last Ice Age so much water was locked in ice that the seas dropped 120 metres, opening land bridges that led people to the last empty continents.`,
  story: [
    `About 26,000 years ago the Ice Age reached its coldest point. Ice up to 3 km thick covered Canada and northern Europe. With so much water frozen on land, the oceans stood about 120 metres lower than today.`,
    `Lower seas redrew the map. Britain was joined to Europe. Borneo, Java and Sumatra were part of Asia. Australia and New Guinea were one land. Most important of all, Siberia and Alaska were joined by a wide grassy plain: Beringia.`,
    `Life near the ice was hard. In Europe people pulled back to refuges in Spain, southern France, Italy and the Balkans, where they painted the caves of Lascaux and Altamira. On the cold plains of Ukraine they built houses from mammoth bones. Survival took sewn fur clothing, stored food and friends far away to turn to in a bad year.`,
    `Hunters followed the herds into Beringia and on into the Americas. Footprints at White Sands in New Mexico show people there by about 22,000 years ago. And two quiet inventions appeared: in China, hunter-gatherers made the world's first pottery, and somewhere in Eurasia wolves became dogs, our first tamed animal.`
  ],
  meanwhile: [
    ['Africa', `Cooler and drier; the Sahara is even bigger than today. People cluster along rivers and lakes. On the Nile they fish and grind wild roots.`],
    ['Middle East', `At Ohalo by the Sea of Galilee, people gather wild wheat and barley and grind flour, 10,000 years before farming.`],
    ['East Asia', `The first pots, used for cooking fish and shellfish. People have reached Japan.`],
    ['Australia', `People live from the tropics to icy Tasmania, which they reached on foot.`],
    ['Americas', `The first people arrive, into a continent of mammoths, giant sloths and sabre-tooth cats.`]
  ],
  fact: `The northern Adriatic Sea was dry land. You could have walked from Italy to Croatia across a wide plain with the river Po running down the middle.`,
  ask: [`Look at the map: which places could you walk to then that need a boat today?`, `Why is pottery more useful to people who stay put than to people who move around?`]
},
{
  id: 'thaw', t0: ya(15000), t1: -9700, w: 300, view: 'world',
  title: 'The Great Thaw', short: 'Great Thaw',
  idea: `As the world warmed, ice melted, seas rose and the giant animals vanished. In the Middle East people found so much wild food that they stopped moving, and settled down before anyone farmed.`,
  story: [
    `About 14,700 years ago temperatures jumped. Ice sheets shrank, forests spread north, and the sea rose, at times by several metres in a century, drowning the coastal plains.`,
    `In the Americas people spread from Alaska to Chile in a couple of thousand years. Soon after, most of the giant animals died out: mammoths, mastodons, giant sloths. Changing climate and human hunters both played a part. This mattered later: the Americas were left with almost no large animals that could be tamed.`,
    `In the Fertile Crescent, the arc of hills from Israel through Syria and Turkey to Iran, the warm wet climate made wild wheat, barley, lentils, nuts and gazelle so plentiful that people called Natufians could stay in one place all year. They built round stone houses, made sickles and grinding stones, and baked the first known bread. Villages came before farming.`,
    `Then a shock. About 12,900 years ago the cold came back within decades, probably because meltwater flooded the North Atlantic. This "Younger Dryas" lasted 1,200 years. Wild food shrank. Some villagers went back to wandering; others may have begun planting seeds on purpose. Then in 9700 BCE warmth returned suddenly, and this time it stayed.`
  ],
  meanwhile: [
    ['Europe', `Reindeer hunters follow the melting ice north. Doggerland, where the North Sea is now, is a rich land of marshes and rivers.`],
    ['Japan', `Jōmon people make pottery and live in villages by fishing and gathering, with no farming at all.`],
    ['Africa', `The rains return and the Sahara starts to turn green. By the Nile at Jebel Sahaba, a cemetery of people killed by arrows: one of the earliest signs of war.`],
    ['Americas', `Clovis hunters with finely made spear points spread across North America.`],
    ['Australia', `Rising seas cut Tasmania off from the mainland.`]
  ],
  fact: `From here on we count in years BCE ("before the common era"), backwards toward year 1. So 9700 BCE is about 11,700 years ago.`,
  ask: [`Would you rather wander and hunt, or live in one village all year? What is good and bad about each?`, `Which big animals could people ride, milk or use to pull a plough? Now imagine a continent without them.`]
},
{
  id: 'farm', t0: -9700, t1: -6500, w: 360, view: 'world',
  title: 'Seeds of Change', short: 'Farming',
  idea: `In a newly warm and steady world, people in at least seven places invented farming without knowing about each other. It was the biggest change in how humans live, and it was not all good.`,
  story: [
    `9700 BCE marks the start of the warm, steady period we still live in. For the first time in 100,000 years the seasons were reliable for thousands of years in a row. A plan like "plant now, harvest in six months" finally made sense.`,
    `In the Fertile Crescent, villagers who had gathered wild grain began sowing it. By keeping seed from the best plants they slowly turned wild grasses into wheat and barley. They did the same with animals: goats and sheep, then pigs and cattle. Nobody decided to invent farming. It crept up over a thousand years.`,
    `The amazing part is that it happened again and again, separately: rice and millet in China, squash and maize in Mexico, potatoes in the Andes, taro and bananas in New Guinea, later sorghum in Africa. The same climate and the same clever species arrived at the same answer.`,
    `Farming feeds up to a hundred times more people from the same land. Villages grew: Jericho had a stone wall and tower by 8000 BCE, and Çatalhöyük housed thousands. But early farmers were shorter and sicker than hunters: a duller diet, harder work, and diseases caught from animals and neighbours. And once there was stored grain and owned land, there was something to steal, inherit and fight over.`,
    `Meanwhile the same shift pushed Africa's monsoon rains north. The Sahara became grassland with lakes, hippos and giraffes, home to fishers and cattle herders. Remember them: their descendants matter for Egypt.`
  ],
  meanwhile: [
    ['Middle East', `At Göbekli Tepe people carve and raise 5-metre stone pillars, around the very moment farming begins nearby.`],
    ['East Asia', `At Jiahu (7000 BCE) villagers grow rice and millet, keep pigs, brew a rice-and-honey drink and play bone flutes.`],
    ['South Asia', `Mehrgarh in Pakistan: wheat, barley, humped cattle, and dentists drilling teeth.`],
    ['Europe', `Still hunters and fishers in the forests. Doggerland is shrinking as the sea rises.`],
    ['Americas', `Squash is grown in Mexico by 8000 BCE; maize is slowly being bred from a wild grass called teosinte.`],
    ['Africa', `Green Sahara: pottery, bone harpoons, and cattle herders at Nabta Playa.`]
  ],
  fact: `The first pet cat: on Cyprus about 7500 BCE a person was buried with a cat. Wildcats had moved in to hunt the mice that ate stored grain.`,
  ask: [`Farmers worked harder and were less healthy than hunters. So why did farming take over?`, `People in Mexico, China and the Middle East never met, yet all invented farming. What does that tell you?`]
},
{
  id: 'spread', t0: -6500, t1: -4500, w: 340, view: 'west',
  title: 'Farmers on the Move', short: 'Farmers spread',
  idea: `Farming made populations boom, and booming populations needed new land. Farmers spread out carrying crops, animals and ideas into Europe, toward India and, surprisingly late, to the Nile.`,
  story: [
    `A farming family can raise more children than a hunting family. In a few generations the village is full and some young families clear new land a few kilometres on. Repeat that for a thousand years and farming crosses a continent at about one kilometre a year.`,
    `From Turkey, farmers crossed into Greece about 6500 BCE. Then they took two roads: up the Danube into central Europe, and by boat along the Mediterranean, reaching the Adriatic coast of Croatia about 6000 BCE and Spain by 5500. Ancient DNA shows they mostly replaced or mixed with the local hunters.`,
    `Farming reached the Nile only about 5200 BCE. Why so late? The valley was so rich in fish, birds and wild plants that nobody needed it. But once it arrived it fitted perfectly: each summer the river flooded and left fresh wet mud; you sowed as the water drained and harvested in spring.`,
    `New inventions piled up. In Mesopotamia, the flat land between the Tigris and Euphrates, it hardly rains but the soil is rich, so people dug canals to water their fields. Harvests were huge, but canals need many hands and someone to organise them. In the Balkans, potters with very hot kilns found about 5000 BCE that certain green rocks melt into copper: the first metal.`,
    `About 6200 BCE the last great ice lake in Canada burst into the ocean and chilled the world for a century. The seas reached nearly today's level, drowning Doggerland and making Britain an island.`
  ],
  meanwhile: [
    ['East Asia', `Villages of painted pottery, millet and pigs along the Yellow River; rice paddies and houses on stilts along the Yangtze.`],
    ['Americas', `Maize spreads south and reaches South America. In Chile the Chinchorro people begin making mummies.`],
    ['Africa', `Sahara herders paint their cattle on rock walls. At Nabta Playa they set up a stone circle to mark midsummer and the coming rains.`],
    ['Europe', `In Bulgaria, graves at Varna hold the oldest gold treasure in the world: already there are rich and poor.`],
    ['Oceania', `Gardens of taro and banana in New Guinea. Australians stay hunter-gatherers, managing the land with fire.`]
  ],
  fact: `The Chinchorro people of Chile were making mummies about 5000 BCE, two thousand years before the Egyptians.`,
  ask: [`Why did farming reach Egypt 4,000 years after it was invented just next door?`, `Canals need many people to work together. Who decides who gets the water first?`]
},
{
  id: 'cities', t0: -4500, t1: -3300, w: 380, view: 'west',
  title: 'A Drying Desert, the First Cities', short: 'First cities',
  idea: `As the Sahara dried into desert, people crowded into the Nile valley. In Mesopotamia, canal villages grew into the world's first cities. Crowding forced people to invent new ways of living together.`,
  story: [
    `From about 5300 BCE the monsoon rains slid back south. Lakes shrank and grass died. By 3500 BCE the green Sahara was the desert we know. The herders had to move: some south, some to oases, and many east to the one place where water never failed: the Nile.`,
    `The valley filled up. Herders mixed with farmers, villages became towns, and towns competed. By 3500 BCE the south had three power centres, Hierakonpolis, Naqada and Abydos, with chiefs, workshops, breweries and rich tombs. The Nile made a perfect road: the current carries boats north, and the wind blows them back south.`,
    `Southern Mesopotamia felt the same squeeze. Uruk grew from a town into the first true city: by 3300 BCE perhaps 40,000 people, with great temples at its heart. In a city most people are not farmers. Priests, potters, weavers, metalworkers and traders were all fed by grain the temple collected and handed out.`,
    `Inventions cluster in these centuries: the wheel, the ox-drawn plough, the sail, the pack donkey, wool, and bronze. And at Uruk the temple accountants, who had long used clay tokens to count sheep and grain, began pressing marks into clay tablets. By about 3300 BCE that had become the first writing.`
  ],
  meanwhile: [
    ['Europe', `Farmers raise giant stone monuments: Malta's temples, Newgrange in Ireland. Ötzi the Iceman dies in the Alps with a copper axe.`],
    ['Steppe', `On the grasslands north of the Black Sea and in Kazakhstan, people tame the horse and build wagons.`],
    ['South Asia', `Farming villages along the Indus grow into walled towns.`],
    ['East Asia', `Jade dragons in the north, silk and painted pots along the Yellow River.`],
    ['Americas', `Hunter-gatherers in Louisiana build earth mounds; on the coast of Peru people build great plazas and grow cotton for fishing nets.`]
  ],
  fact: `The oldest wooden wheel ever found, still with its axle, is about 5,150 years old and comes from the Ljubljana Marshes in Slovenia.`,
  ask: [`The drying Sahara was a disaster for the herders. Was it also the making of Egypt?`, `In a city you depend on strangers for food. What do you need in order to trust them?`]
},
{
  id: 'kings', t0: -3300, t1: -2700, w: 380, view: 'mideast',
  title: 'Writing and Kings', short: 'Writing & kings',
  idea: `Cities needed records, records became writing, and writing made large kingdoms possible. About 3100 BCE the whole Nile valley was united under one king: Egypt, the first large country.`,
  story: [
    `Writing began as bookkeeping. The first tablets from Uruk are lists: sheep, jars of beer, sacks of barley. But signs for things soon stood for sounds too, and then you could write names, orders, laws and stories. In Egypt hieroglyphs appear at almost the same moment. The idea may have travelled along trade routes, but the script is purely Egyptian.`,
    `Along the Nile, the rival kingdoms of the south merged and then took over the Delta in the north. A carved stone palette shows King Narmer about 3100 BCE wearing the white crown of the south on one side and the red crown of the north on the other. A new capital, Memphis, was built where valley meets delta.`,
    `Why did one big kingdom form here? Geography. The yearly flood gave huge harvests for little work. The river was a highway, so a tax collector or an army could reach any village by boat. And desert on both sides made Egypt hard to invade and hard to leave. A king with boats and scribes could count and collect grain along 1,000 km.`,
    `Mesopotamia went another way. A dozen Sumerian cities, Uruk, Ur, Kish, Lagash, each with its own god, king and walls, fought over land and water for centuries. Open plains, no natural borders, two unpredictable rivers.`,
    `The two worlds were already linked by trade. Blue lapis lazuli, mined only in Afghanistan, turns up in Egyptian graves 4,000 km away. Bronze needs tin, which is rare, so traders tied together lands from Central Asia to the Mediterranean.`
  ],
  meanwhile: [
    ['Europe', `Herders from the steppe (Yamnaya) roll west with wagons, bringing the family of languages that will become Greek, Latin, Croatian and English. On the Danube, the Vučedol people cast copper. Stonehenge is begun.`],
    ['South Asia', `Walled towns along the Indus mark their pots with signs that will become a script.`],
    ['East Asia', `Liangzhu, near today's Shanghai: a walled city with dams, canals and superb jade.`],
    ['Americas', `On the coast of Peru the first cities of the Americas rise at Caral, with stone platforms and sunken plazas.`],
    ['Africa', `Nubia, south of Egypt, sends gold, ivory and ebony north, and is raided by the new Egyptian state.`]
  ],
  fact: `"Upper Egypt" is the south and "Lower Egypt" is the north, because the Nile flows downhill from south to north.`,
  ask: [`Egypt became one kingdom; Sumer stayed a dozen quarrelling cities. Look at the map: why?`, `Writing was invented to count sheep and beer. What is most writing used for today?`]
},
{
  id: 'pyramids', t0: -2700, t1: -2200, w: 400, view: 'mideast',
  title: 'The Age of Pyramids', short: 'Pyramids',
  idea: `With one land, a god-king, writing and a huge grain surplus, Egypt could do what nobody had done before: organise tens of thousands of people for decades to build mountains of stone. Meanwhile, civilisations were rising on four continents.`,
  story: [
    `Egyptians believed their king was a living god who kept the world in order: he made the Nile flood and the sun rise. When he died he had to be preserved so he could carry on that work among the gods. So his tomb was the most important building project in the country.`,
    `About 2650 BCE the architect Imhotep stacked six stone platforms for King Djoser: the Step Pyramid, the first big stone building on Earth. Within a century builders had worked out the smooth-sided pyramid. Khufu's Great Pyramid at Giza, about 2560 BCE, has 2.3 million blocks and stood 146 m high, the tallest building in the world for the next 3,800 years.`,
    `Who built it? Not slaves. Archaeologists found the workers' town: bakeries, breweries and enough cattle bones to feed thousands. Skilled crews and farmers serving in turns were paid in bread, beer and cloth. Everything from the earlier chapters made it possible: surplus grain, taxes and written records, Nile boats, a united state, copper tools. And organising the work made the state itself stronger.`,
    `Look around the world at this same moment. At Ur, Sumerian royals are buried with gold, harps and dozens of servants. On the Indus, Mohenjo-daro has straight streets, brick houses with bathrooms and covered drains. In Peru, Caral builds its own stone pyramids. In Britain, farmers drag the great stones of Stonehenge into place. And on an Arctic island the last woolly mammoths are still alive.`,
    `About 2334 BCE Sargon of Akkad conquered all the Sumerian cities and more: the first empire, many peoples under one ruler.`
  ],
  meanwhile: [
    ['Mesopotamia', `Sargon's daughter Enheduanna, a priestess at Ur, writes hymns: the first author in history known by name.`],
    ['South Asia', `Indus merchants sail to Mesopotamia, which calls their land Meluhha. Their cities show no palaces and almost no weapons.`],
    ['Africa', `The kingdom of Kerma rises in Nubia. Egyptian ships sail to the land of Punt for incense and to Lebanon for cedar.`],
    ['East Asia', `Walled towns of the Longshan culture along the Yellow River, with fine black pottery made on the wheel.`],
    ['Pacific', `Farmers from Taiwan sail to the Philippines: the start of the voyages that will one day reach Hawaii and New Zealand.`],
    ['Americas', `Caral trades cotton from the valleys for fish from the coast.`]
  ],
  fact: `Cleopatra lived closer in time to us than to the building of the Great Pyramid.`,
  ask: [`Egypt spent a huge share of its wealth on a tomb for one man. Why did that make sense to them?`, `Indus cities had great drains and no palaces; Egypt had great tombs and no drains. What does a society's biggest building tell you about it?`]
},
{
  id: 'comeback', t0: -2200, t1: -1600, w: 420, view: 'mideast',
  title: 'Collapse and Comeback', short: 'Collapse & comeback',
  idea: `A long drought helped topple Egypt's Old Kingdom and the Akkadian Empire at the same moment. Both lands rebuilt, with written laws and wiser kings, just as a new war machine rolled in from the steppe: the chariot.`,
  story: [
    `Trouble had been building inside Egypt. Pyramids and temples were expensive. Governors of the provinces passed their jobs to their sons and behaved like little kings. Then, about 2200 BCE, the monsoon rains weakened from Africa to China. The Nile floods came low year after year. A king whose main job was to guarantee the flood had failed, and Egypt broke into rival pieces.`,
    `It was not only Egypt. In northern Mesopotamia the rain-fed fields dried out, whole towns were abandoned and the Akkadian Empire fell. Along the Indus the cities began to shrink as people drifted east toward the Ganges.`,
    `Then came recovery. Kings from Thebes reunited Egypt about 2050 BCE. These Middle Kingdom pharaohs showed themselves as careful shepherds of their people, dug canals and filled granaries against the next bad year. In Mesopotamia, Ur rose again and built its great stepped temple. Later Hammurabi of Babylon had 282 laws carved on a stone pillar for everyone to see, "so that the strong may not harm the weak".`,
    `On Crete the Minoans built palaces without walls and traded across the sea. And about 2000 BCE, on the steppe near the Ural mountains, someone put two fast horses in front of a light cart with spoked wheels. The chariot spread everywhere within 400 years. Around 1650 BCE foreigners with chariots, the Hyksos, took over the north of Egypt.`
  ],
  meanwhile: [
    ['Europe', `Bronze spreads across Europe. Stonehenge reaches its final form. Amber from the Baltic and tin from Cornwall travel south.`],
    ['South Asia', `The great Indus cities empty out after 1900 BCE; their script is forgotten and has never been read.`],
    ['East Asia', `At Erlitou, the first palaces and bronze vessels in China, perhaps the legendary Xia dynasty.`],
    ['Americas', `Caral is abandoned. The first pottery and maize-farming villages appear in Mexico.`],
    ['Africa', `Kerma grows rich on gold and becomes Egypt's rival in the south.`],
    ['Arctic', `The last mammoths on Earth die on Wrangel Island, about 2000 BCE.`]
  ],
  fact: `Geologists named the age we live in, the Meghalayan, after a cave in India whose stalagmites recorded this drought.`,
  ask: [`Egypt and Akkad were hit by the same drought. What had made them weak before it arrived?`, `Why does it matter that Hammurabi's laws were written where everyone could see them?`]
},
{
  id: 'chariots', t0: -1600, t1: -1200, w: 420, view: 'mideast',
  title: 'Chariots and Great Kings', short: 'Chariot empires',
  idea: `Chariots and bronze turned a handful of kingdoms into superpowers. Egypt, the Hittites, Babylon and Mycenae fought, traded, wrote letters and married into each other's families: the first international world.`,
  story: [
    `The Egyptians learned the chariot and the powerful composite bow from the Hyksos, drove them out about 1550 BCE, and then kept going so that it could never happen again. This New Kingdom ruled from Sudan to Syria. Its pharaohs are the famous ones, Hatshepsut, Akhenaten, Tutankhamun, Ramesses II, a thousand years after the pyramids. They were buried in hidden tombs in the Valley of the Kings, because every pyramid had been robbed.`,
    `Other great powers shared the stage: the Hittites in Turkey, Mitanni in Syria, Babylon, Assyria, and the Mycenaean Greeks, the heroes of the later Trojan War stories. The Minoans of Crete, weakened by the huge eruption of Thera, were taken over by Mycenae.`,
    `Bronze tied them together. Copper came from Cyprus, tin from as far as Afghanistan. No kingdom had everything, so they traded and talked. In clay letters found at Amarna, kings call each other "brother" and haggle over gold and brides. A ship wrecked off Turkey about 1320 BCE carried goods from at least nine lands. After the great chariot battle of Kadesh, Egypt and the Hittites signed the first peace treaty we know of.`,
    `Everything ran through palaces, which collected, stored and handed out goods, with scribes recording it all. It was rich and well organised, and every part depended on every other part. Remember that.`
  ],
  meanwhile: [
    ['East Asia', `Shang kings at Anyang have chariots, magnificent bronzes, and questions to their ancestors scratched on bones: the earliest Chinese writing.`],
    ['South Asia', `Herders with horses and chariots move into northern India, bringing the language of the Vedic hymns.`],
    ['Americas', `The Olmecs in Mexico carve giant stone heads and play ball games with rubber balls.`],
    ['Pacific', `Lapita sailors with outrigger canoes push out into the open ocean toward Fiji.`],
    ['Europe', `Bronze Age chiefs across Europe trade amber and tin. Sardinians build thousands of stone towers.`],
    ['Africa', `Egypt conquers Kerma and rules Nubia for its gold.`]
  ],
  fact: `A copy of the peace treaty between Ramesses II and the Hittites hangs today at the United Nations in New York.`,
  ask: [`Why would kings who are rivals also call each other "brother"?`, `When everyone depends on everyone else, what are the benefits? What are the dangers?`]
},
{
  id: 'collapse', t0: -1200, t1: -800, w: 420, view: 'med',
  title: 'The Great Collapse and the Age of Iron', short: 'Bronze Age collapse',
  idea: `Within about fifty years around 1177 BCE almost every great kingdom of the eastern Mediterranean was destroyed or crippled. From the ruins came smaller, freer societies and two world-changing inventions: cheap iron and the alphabet.`,
  story: [
    `From Greece to Syria, cities burned. Mycenae, Hattusa and Ugarit were destroyed; the Hittite Empire vanished. Egypt beat off the raiders it called the Sea Peoples but lost its empire and never fully recovered. In Greece even writing was forgotten for 400 years.`,
    `Why? There was no single cause. There was a long drought and famine, a string of earthquakes, raiders and refugees on the move, and rebellions. Because the palaces depended on each other, failure spread like falling dominoes: no trade meant no tin, no tin meant no bronze, and no bronze meant no weapons and no pay.`,
    `With tin cut off, smiths turned to iron. Iron ore is found almost everywhere. It is harder to work, but once smiths learned how, an ordinary farmer could own an iron axe and plough.`,
    `With the great powers gone, small trading cities on the coast of Lebanon were free to sail where they liked. These Phoenicians traded across the whole Mediterranean and founded Carthage. They wrote with just 22 signs, one for each sound, instead of hundreds that took years to learn. The Greeks borrowed this alphabet and added vowels; the Romans borrowed it from them. You are reading its descendant now.`
  ],
  meanwhile: [
    ['Egypt', `Divided and weaker: priests rule the south, and later Libyan chiefs become pharaohs.`],
    ['Middle East', `New small peoples appear: Israelites, Philistines, Arameans. Assyria survives and waits.`],
    ['East Asia', `In 1046 BCE the Zhou overthrow the Shang, saying Heaven gives the right to rule only to just rulers: the "Mandate of Heaven".`],
    ['South Asia', `Iron axes open the forests of the Ganges valley to farming.`],
    ['Africa', `Bantu-speaking farmers begin to spread from West Africa. Kush, south of Egypt, becomes independent.`],
    ['Americas', `The Olmecs flourish at La Venta; in the Andes pilgrims climb to the temple of Chavín.`],
    ['Pacific', `Lapita sailors reach Tonga and Samoa, where Polynesian culture will form.`]
  ],
  fact: `The letter A began as a drawing of an ox's head. Turn it upside down and you can still see the horns.`,
  ask: [`Was the collapse bad for everyone? Who might have been better off afterwards?`, `Compare this collapse with the drought of 2200 BCE. What is the same?`]
},
{
  id: 'iron', t0: -800, t1: -500, w: 440, view: 'med',
  title: 'Iron Empires and City-States', short: 'Iron & cities',
  idea: `Iron armies let Assyria build the biggest empire yet, and its cruelty got it destroyed. On the edges, Greeks and Phoenicians built a different kind of world: hundreds of small free cities linked by sea. Then Persia swallowed almost everything.`,
  story: [
    `Assyria had the first professional army: iron weapons, horsemen instead of chariots, siege towers, and a policy of terror. Conquered peoples were marched off to distant lands. In 671 BCE Assyria even took Egypt. But it was hated, and in 612 BCE the Babylonians and Medes burned its capital Nineveh. Babylon had a last golden age under Nebuchadnezzar.`,
    `Egypt in these years was ruled first by pharaohs from Kush in the south, who built pyramids of their own in Sudan, then by Assyrians, then by its own kings again with the help of hired Greek soldiers.`,
    `Greece is mountains and islands, so no single king could control it. Instead there were hundreds of independent cities. Iron tools and olive oil fed a growing population, land ran short, and Greeks founded colonies from the Black Sea to Spain. Citizens who fought side by side as soldiers wanted a say in how they were ruled. In Lydia someone invented coins, which made buying and selling far easier. And in Miletus a few people began asking what the world is made of, without using gods as the answer.`,
    `Then in 550 BCE Cyrus the Persian began to conquer: the Medes, Lydia, Babylon. His son took Egypt. Unlike the Assyrians, the Persians let peoples keep their gods and customs and sent the deported home. Darius tied it together with provinces, a 2,700 km Royal Road and mounted messengers: the largest empire the world had seen.`
  ],
  meanwhile: [
    ['Italy', `Rome is a small town ruled by kings, learning from its Etruscan neighbours. In 509 BCE it throws out its last king.`],
    ['North Africa', `Carthage becomes the great power of the western Mediterranean.`],
    ['Europe', `Celtic chiefs north of the Alps trade salt and iron for Greek wine. Scythian horse archers rule the steppe.`],
    ['South Asia', `Cities return to India, now in the Ganges valley, in sixteen rival kingdoms.`],
    ['East Asia', `The Zhou kings lose control and their lords fight each other. Confucius is born in 551 BCE.`],
    ['Africa', `The Nok people of Nigeria smelt iron and make life-size clay sculptures.`],
    ['Americas', `The Zapotecs of Mexico carve the first writing in the Americas. Maya villages grow into towns.`]
  ],
  fact: `The kings of Kush built more than 200 pyramids in what is now Sudan. That is more than there are in Egypt.`,
  ask: [`Assyria ruled by fear and Persia by tolerance. Which do you think lasts longer, and why?`, `Why did geography give Greece many small cities and Egypt one big kingdom?`]
},
{
  id: 'ideas', t0: -500, t1: -330, w: 420, view: 'west',
  title: 'Persia, Greece and the Age of Big Ideas', short: 'Big ideas',
  idea: `Small Greek cities stopped the giant Persian Empire, and Athens invented democracy. At the same time, in Greece, India and China, thinkers who never met began asking the same new questions: what is right, and how should we live?`,
  story: [
    `When Greek cities in Turkey rebelled, Persia set out to punish Athens for helping them. The Athenians won at Marathon in 490 BCE. Ten years later a huge Persian army and fleet returned; the Spartans delayed it at Thermopylae, the Athenian navy smashed the fleet at Salamis, and the invasion failed. The Greeks were fighting at home, with heavy armour and with ships paid for by a lucky silver strike.`,
    `Athens had become a democracy in 508 BCE: citizens voted on laws themselves. Citizens meant free men only, not women, slaves or foreigners, but it was a new idea in the world. The poor men who rowed the warships now had real power. Victory brought a golden age: the Parthenon, theatre, history, medicine, and the philosophers Socrates, Plato and Aristotle.`,
    `Athens paid for much of it with money squeezed from its "allies". Sparta grew afraid, and the two fought a ruinous war from 431 to 404 BCE. Athens lost, and all Greece was left weak enough for King Philip of Macedon to conquer it in 338 BCE.`,
    `Meanwhile, look east. In India the Buddha taught that suffering comes from craving and that kindness is the way out. In China Confucius taught that a good society rests on respect, learning and honest rulers. All of them lived in a time of iron, cities, money and endless wars between small states. Old answers had stopped working, and the cities were full of people ready to argue.`
  ],
  meanwhile: [
    ['Egypt', `A Persian province that keeps rebelling. Nectanebo II, the last Egyptian-born pharaoh, is defeated in 343 BCE.`],
    ['Italy', `The young Roman Republic writes down its laws and slowly conquers its neighbours. Celts sack Rome in 390 BCE.`],
    ['East Asia', `The Warring States: seven kingdoms with crossbows, iron and armies of hundreds of thousands, and a "hundred schools" of thinkers.`],
    ['South Asia', `The kingdom of Magadha grows on the Ganges. Persia rules the Indus valley.`],
    ['Africa', `Bantu farmers with iron reach the Great Lakes. Kush thrives at Meroë.`],
    ['Americas', `The Maya build their first great pyramids. The Zapotecs found Monte Albán on a levelled mountaintop.`]
  ],
  fact: `Confucius, the Buddha and Socrates all lived within about a hundred years of each other, at opposite ends of the world.`,
  ask: [`Athenian democracy left out women and slaves. Was it a democracy?`, `Why might hard, violent times produce great thinkers?`]
},
{
  id: 'alexander', t0: -330, t1: -200, w: 400, view: 'eurasia',
  title: 'Alexander and the Age of Empires', short: 'Alexander',
  idea: `In ten years Alexander of Macedon conquered the whole Persian Empire, tying Greece, Egypt, Persia and India into one world. In the same century India and China were each united for the first time, and Rome began its rise.`,
  story: [
    `Alexander crossed into Asia in 334 BCE with about 40,000 men. Egypt welcomed him as a liberator and crowned him pharaoh; he founded Alexandria there. He beat the Persian king at Gaugamela, burned Persepolis, marched through Afghanistan into India, and died in Babylon aged 32. It was possible because of his father's superb army, and because Persia was so well organised: capture the king and the whole machine was yours.`,
    `His generals carved up the empire. The Ptolemies ruled Egypt as Greek pharaohs for 300 years. Greek became the common language from Marseille to Afghanistan. In Alexandria's great library Euclid wrote the geometry still taught today, and Eratosthenes measured the size of the Earth using nothing but shadows.`,
    `In India, Chandragupta Maurya built an empire in the gap Alexander left. His grandson Ashoka, horrified by the blood shed in his own conquests, turned to Buddhism and carved messages of kindness on pillars across India. In China, the state of Qin, hardened by centuries of war, conquered all its rivals in 221 BCE. The First Emperor gave China one script, one money, standard weights, and the first Great Wall.`,
    `In the west, Rome had united Italy and now fought Carthage for the sea. Hannibal crossed the Alps with elephants and crushed a Roman army at Cannae, but Rome's allies stayed loyal and its supply of soldiers seemed endless. By 202 BCE Rome had won.`
  ],
  meanwhile: [
    ['Steppe', `The Xiongnu nomads unite north of China: the reason for the Wall.`],
    ['Persia', `The Parthians, horse archers from the north-east, break away from Greek rule.`],
    ['Europe', `Celts raid Greece and settle as far away as central Turkey.`],
    ['Americas', `At El Mirador the Maya build La Danta, one of the largest pyramids ever raised.`],
    ['Japan', `Rice farming and metal arrive from Korea.`],
    ['Africa', `Meroë smelts iron on a large scale. Carthage rules the western sea, for now.`]
  ],
  fact: `Eratosthenes worked out the distance around the Earth about 240 BCE, by comparing shadows at noon in two Egyptian towns. He was right to within a few percent.`,
  ask: [`Alexander's empire broke up when he died, but Greek culture stayed for centuries. What lasts longer than armies?`, `Ashoka gave up war after winning. Why is that so rare?`]
},
{
  id: 'romehan', t0: -200, t1: 200, w: 520, view: 'eurasia',
  title: 'Rome and Han: Two Empires, One World', short: 'Rome & Han',
  idea: `At the two ends of Eurasia, Rome and Han China each ruled about 60 million people. They never met, but silk, spices, glass, coins, religions and germs travelled between them along the Silk Roads.`,
  story: [
    `Rome destroyed Carthage in 146 BCE and went on conquering. But conquest made generals too rich and powerful, and the Republic tore itself apart in civil wars. Julius Caesar conquered Gaul and was murdered. His heir defeated Antony and Cleopatra, and in 30 BCE Egypt became a Roman province. After 3,000 years the last pharaoh was gone. As Augustus, he became the first emperor, and Rome's 200 years of peace began: roads, aqueducts, concrete, law, and Egyptian grain to feed the capital.`,
    `In China the Han dynasty kept the united state the Qin had built but ruled more gently. Officials were chosen for learning, not birth. The Han invented paper. Emperor Wu, fighting the Xiongnu nomads, sent an envoy west to find allies; he came back with news of rich lands and magnificent horses, and the Silk Road opened.`,
    `Caravans crossed the deserts from oasis to oasis. Sailors learned to ride the monsoon winds from Egypt to India and back in a year. Roman gold coins turn up in India and Roman glass in China. In the middle, the Kushan Empire passed everything along, including Buddhism, which reached China in these years.`,
    `In Roman Judea a Jewish teacher, Jesus, was crucified about 30 CE. His followers carried his message along Roman roads and sea lanes. Rome's peace and common languages let a new religion travel faster than any before.`
  ],
  meanwhile: [
    ['Americas', `Teotihuacan in Mexico grows to about 100,000 people, with pyramids of the Sun and Moon. The Nazca draw giant figures in the desert.`],
    ['Africa', `Aksum in Ethiopia grows rich on Red Sea trade. Bantu-speaking farmers reach southern Africa.`],
    ['Europe', `Germanic tribes destroy three legions in 9 CE and Rome stops at the Rhine. Dalmatia is a Roman province; the arena at Pula is built.`],
    ['South Asia', `South Indian ports grow rich selling pepper to Rome.`],
    ['Southeast Asia', `Trading kingdoms rise where the sea routes between India and China meet.`],
    ['Persia', `The Parthians grow rich as middlemen, and keep Rome and China from ever meeting.`]
  ],
  fact: `In the year 2 CE Han officials counted the people of China and reached almost 60 million. Rome ruled about the same number.`,
  ask: [`Rome and China knew each other only by rumour. How might history have gone if they had met?`, `Roads spread goods and ideas, and also diseases. Is that still true today?`]
},
{
  id: 'end', t0: 200, t1: 500, w: 400, view: 'eurasia',
  title: 'The Ancient World Ends', short: 'End of antiquity',
  idea: `Plagues, a cooler climate, civil wars and peoples on the move shook every empire from Rome to China. The western Roman Empire dissolved into new kingdoms, but the ancient world's religions, languages, laws and ideas lived on.`,
  story: [
    `The same roads that carried silk carried disease. A plague, probably smallpox, swept the Roman Empire from 165 CE. Han China, struck by epidemics, floods and rebellions, fell in 220 CE and stayed divided for 350 years. Rome went through fifty years of chaos with more than twenty emperors, while a new and tougher Persian dynasty, the Sasanians, attacked from the east.`,
    `The empire was rebuilt by Diocletian, a soldier from Dalmatia, who split it into an eastern and a western half to make it manageable, then retired to his palace at Split. Constantine made Christianity legal in 313 CE and built a new capital, Constantinople. Within a lifetime the once-persecuted faith was the religion of the empire.`,
    `About 370 CE the Huns rode out of the steppe, driving the Goths ahead of them into Roman lands. The Goths killed an emperor in battle and in 410 CE sacked Rome itself. Vandals took North Africa and its grain. In 476 CE a Germanic general sent the last western emperor, a boy, into retirement. It was less a crash than a slow change: Latin, Roman law and the Church carried on under new kings. The eastern half, ruled from Constantinople, lasted another thousand years.`,
    `Elsewhere this was a beginning, not an end. In India the Gupta kings ruled over a golden age: the numbers we use today, with zero, come from there. In Mexico and Guatemala the Maya cities were at their height.`
  ],
  meanwhile: [
    ['East Asia', `China is divided between rival kingdoms, and Buddhism spreads widely. Japan's rulers build enormous keyhole-shaped tombs.`],
    ['Persia', `The Sasanian Empire is Rome's equal and rival.`],
    ['Africa', `King Ezana of Aksum becomes Christian about 330 CE and conquers Meroë. Camels begin to carry trade across the Sahara.`],
    ['Americas', `Teotihuacan sends warriors to the Maya city of Tikal. In Peru the Moche build huge mud-brick pyramids.`],
    ['Europe', `Franks settle in Gaul, Angles and Saxons in Britain. The Slavs begin to spread; ancestors of the Croats will reach the Adriatic in the 600s.`],
    ['Pacific', `Polynesians in Tonga and Samoa perfect the canoes that will later carry them to Hawaii and New Zealand.`]
  ],
  fact: `Diocletian's retirement palace in Split is still lived in. About 3,000 people have their homes inside its walls today.`,
  ask: [`Did Rome fall, or did it change into something else?`, `Look back at the collapses of 2200 BCE, 1177 BCE and 476 CE. What do they have in common?`]
}
];
