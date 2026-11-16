/* Story mode questions: two per chapter, written by hand.
   after: 'story' – asked right after the chapter's scenes · 'mean' – asked after "Meanwhile, around the world"
   q   – the question
   a   – three answers, each [ answer, what the reader is told after picking it ]
   ok  – index (0, 1 or 2) of the right answer
   The wrong answers are things a reader might honestly believe; their feedback says why they are wrong.
   Croatian versions live in lang-hr.js under q.<chapter>.<number>.q / .a0-.a2 / .f0-.f2. */
ATLAS.quiz = {
  before: [
    { after: 'story', q: `Human brains tripled in size. What made that possible?`, ok: 1, a: [
      [`Walking upright slowly stretched the skull.`, `Our ancestors walked upright for millions of years with small brains. Walking mattered in another way: it freed the hands.`],
      [`Richer food: meat and marrow reached with tools, and later cooked on fire.`, `A brain is a hungry organ. Tools opened up meat and marrow, and cooking gave more energy from every bite. A bigger brain then made better tools.`],
      [`The cold of the Ice Ages forced people to get smarter.`, `Brains were already growing before the Ice Ages began, and they grew in warm Africa.`]] },
    { after: 'mean', q: `For most of these 7 million years, where did humans live?`, ok: 0, a: [
      [`Only in Africa.`, `For about 5 million years Africa was the whole human world. Only about 2 million years ago did Homo erectus walk out.`],
      [`In Africa, Asia and Europe from the very start.`, `They reached Asia and Europe much later: Georgia 1.8 million years ago, Spain 1.2 million years ago.`],
      [`On every continent except Australia.`, `The Americas were empty too, and stayed empty for a very long time.`]] }
  ],
  sapiens: [
    { after: 'story', q: `The oldest Homo sapiens bones come from Morocco, Ethiopia and South Africa. What does that tell us?`, ok: 2, a: [
      [`Our species began in one small valley and spread out from it.`, `Then the oldest bones would all lie near one place. Instead they are spread across the whole continent.`],
      [`Homo sapiens came to Africa from Europe.`, `Europe then belonged to the Neanderthals. Our species is African.`],
      [`Our species took shape all across Africa, in groups that split up and met again.`, `As the climate swung between wet and dry, groups drifted apart and mixed again. There was no single birthplace.`]] },
    { after: 'mean', q: `People at Blombos Cave wore shell beads 100,000 years ago. Why does that matter so much?`, ok: 1, a: [
      [`Beads were the first money.`, `Money is still almost 100,000 years away. These beads were worn, not paid with.`],
      [`Beads show a mind that thinks in symbols, and probably talks like we do.`, `A bead is useless for hunting. It says "this is who I am, this is my group", and only a mind that thinks in symbols sends messages like that.`],
      [`They prove that people had learned to fish.`, `People did eat shellfish, but the beads matter for another reason: they carry a message.`]] }
  ],
  out: [
    { after: 'story', q: `People reached Australia about 50,000 years ago. What does that prove about them?`, ok: 0, a: [
      [`They had boats or rafts.`, `Even with the sea at its lowest there were at least 90 km of open water to cross.`],
      [`The sea was so low that they could walk all the way.`, `The sea was lower and many islands were joined to Asia, but at least 90 km of open water was left.`],
      [`Australia was joined to Asia at that time.`, `Australia was joined to New Guinea, never to Asia.`]] },
    { after: 'mean', q: `Why do people outside Africa still carry about 2% Neanderthal DNA?`, ok: 2, a: [
      [`Because we are descended from Neanderthals.`, `They were our cousins, not our ancestors. Both lines go back to earlier humans who left Africa long before.`],
      [`Because all humans share that DNA with chimpanzees.`, `Then everybody would carry it. It is found mostly in people whose ancestors left Africa and met Neanderthals.`],
      [`Because Homo sapiens and Neanderthals met and had children together.`, `For a few thousand years the two kinds of human lived side by side, and some families were mixed.`]] }
  ],
  ice: [
    { after: 'story', q: `During the Ice Age people could walk from Siberia to Alaska. Why?`, ok: 1, a: [
      [`The sea between them froze solid every winter.`, `It was more than ice. A wide grassy plain, Beringia, lay where the sea is now, with herds of animals to follow.`],
      [`So much water was locked in ice sheets that the sea dropped 120 m and the sea floor became dry land.`, `Ice up to 3 km thick lay on Canada and northern Europe. All that water came out of the oceans, and shallow seas turned into land.`],
      [`The continents were closer together then.`, `Continents move only a few centimetres a year. 20,000 years ago they were almost exactly where they are now.`]] },
    { after: 'mean', q: `Which of these already existed during the Ice Age, thousands of years before farming?`, ok: 0, a: [
      [`Clay pots and tame dogs.`, `Hunter-gatherers in China made the first pottery, and somewhere in Eurasia wolves became dogs. You do not need farms for either.`],
      [`Fields of wheat.`, `People at Ohalo gathered wild wheat and ground it into flour, but nobody sowed fields for another 10,000 years.`],
      [`Copper tools.`, `Metal is far in the future: the first copper was melted about 5000 BCE.`]] }
  ],
  thaw: [
    { after: 'story', q: `The Natufians lived in villages before anyone farmed. How could they stay in one place?`, ok: 2, a: [
      [`They had already learned to grow wheat.`, `Not yet. They gathered wild wheat and barley. Sowing it came a couple of thousand years later.`],
      [`They kept herds of sheep and goats.`, `Sheep and goats were tamed later. Natufian meat came from hunting gazelle.`],
      [`The warm, wet climate made wild food so plentiful all year that they did not need to move.`, `Wild grain, nuts, lentils and gazelle were all within reach. Villages came before farming, not after it.`]] },
    { after: 'mean', q: `Most of the giant animals of the Americas died out. Why did that matter thousands of years later?`, ok: 1, a: [
      [`Farming could never begin there.`, `It did begin: maize, squash and potatoes. What was missing was animals to pull and carry.`],
      [`The Americas were left with almost no large animals that could be tamed.`, `No horses, no oxen: so later there were no ploughs, carts or cavalry. Cities rose there anyway.`],
      [`People there forgot how to hunt.`, `They kept hunting smaller animals. The lasting loss was the big animals that might have been tamed.`]] }
  ],
  farm: [
    { after: 'story', q: `People had been clever for 300,000 years. Why did farming begin only after 9700 BCE?`, ok: 0, a: [
      [`The climate became warm and steady, so planting for next season finally paid off.`, `"Plant now, harvest in six months" only works if next season is like the last. For the first time in 100,000 years it was.`],
      [`Before that, nobody had thought of putting a seed in the ground.`, `Hunter-gatherers knew their plants very well. The trouble was the weather, which kept changing too fast to plan around.`],
      [`A king ordered his people to farm.`, `There were no kings yet. Nobody decided to invent farming: it crept up over a thousand years.`]] },
    { after: 'mean', q: `Farming began in the Fertile Crescent. How did China, Mexico and New Guinea get it?`, ok: 2, a: [
      [`Travellers carried the idea around the world.`, `The Americas were completely cut off, and the crops are different everywhere. Nobody carried maize or rice from the Fertile Crescent.`],
      [`Farmers from the Fertile Crescent moved there.`, `They did spread into Europe and India, but not across oceans.`],
      [`Each place invented it separately, with its own plants.`, `Rice and millet in China, maize and squash in Mexico, taro and bananas in New Guinea. The same climate and the same clever species reached the same answer.`]] }
  ],
  spread: [
    { after: 'story', q: `Farming crossed Europe at about one kilometre a year. How did it spread?`, ok: 1, a: [
      [`Hunters watched their neighbours and copied them.`, `That happened a little, but ancient DNA shows it was mostly the farmers themselves who moved in.`],
      [`Farming families had many children, and the young ones cleared new land a little further on.`, `A village fills up, a few families move on a few kilometres, and after a thousand years farming has crossed a continent.`],
      [`Armies of farmers conquered the hunters.`, `There were no armies yet, only family after family looking for a new field.`]] },
    { after: 'mean', q: `Farming reached the Nile late, only about 5200 BCE. Why?`, ok: 0, a: [
      [`The valley was so rich in fish, birds and wild plants that nobody needed it.`, `People there lived well without farming. But once it arrived it fitted perfectly: the flood left fresh wet mud every year.`],
      [`The desert kept the farmers out.`, `The Sahara was green then, and people moved through it freely.`],
      [`The Nile flood washed the fields away.`, `The flood turned out to be the best thing about farming there: sow as the water drains, harvest in spring.`]] }
  ],
  cities: [
    { after: 'story', q: `Why did the Nile valley fill up with people between 5000 and 3500 BCE?`, ok: 2, a: [
      [`A pharaoh invited settlers.`, `There were no pharaohs yet. The crowding came first, and kings grew out of it.`],
      [`Farmers fled there from wars in Mesopotamia.`, `Wheat and barley did come from the Middle East, but the big push came from the west, out of the Sahara.`],
      [`The Sahara dried out, and its herders moved to the one place where water never failed.`, `As the rains slid south, lakes shrank and grass died. The Nile was the only sure water left.`]] },
    { after: 'mean', q: `In Uruk most people were not farmers. How was that possible?`, ok: 1, a: [
      [`The city bought its food from other countries.`, `Uruk did trade, but for stone, wood and metal. Its grain grew in its own fields.`],
      [`Canal farming grew grain to spare, which the temple collected and handed out.`, `If farmers grow more than they eat, other people can be priests, potters, weavers and traders.`],
      [`City people grew what they needed in small gardens.`, `Gardens cannot feed 40,000 people. The grain came from big irrigated fields around the city.`]] }
  ],
  kings: [
    { after: 'story', q: `What was writing first used for?`, ok: 0, a: [
      [`Keeping count: lists of sheep, beer and barley.`, `Temple accountants at Uruk needed lasting records of who had given and received what. Stories came later.`],
      [`Stories about gods and heroes.`, `Those came later, once signs could stand for sounds. The first tablets are lists.`],
      [`Letters between kings.`, `Kings did write to each other, but more than a thousand years later.`]] },
    { after: 'mean', q: `Egypt became one kingdom, while Sumer stayed a dozen quarrelling cities. Why?`, ok: 2, a: [
      [`Egyptians were more peaceful.`, `They fought too: the rival towns of the south fought and merged until one ruler was left.`],
      [`The Sumerian cities had no kings.`, `Each city had its own king, its own god and its own walls. That was the problem.`],
      [`Geography: the Nile was a highway to every village, and deserts walled the country in.`, `A king with boats and scribes could reach and tax every village. Sumer had open plains, no natural borders and two unpredictable rivers.`]] }
  ],
  pyramids: [
    { after: 'story', q: `Who built the Great Pyramid?`, ok: 1, a: [
      [`Slaves driven on with whips.`, `That is the film version. Archaeologists found the workers' town, with bakeries, breweries and plenty of beef.`],
      [`Skilled crews, and farmers serving in turns, paid in bread, beer and cloth.`, `Only a state that could tax grain and keep written records could feed thousands of builders for decades.`],
      [`Prisoners captured in war.`, `Egypt had few foreign wars at this time. The builders were Egyptians, fed and housed by the king.`]] },
    { after: 'mean', q: `While the Great Pyramid was being built, which of these was also true?`, ok: 0, a: [
      [`Woolly mammoths were still alive on an island in the Arctic.`, `The last mammoths lived on Wrangel Island until about 2000 BCE, five hundred years after the pyramid was finished.`],
      [`Rome was already a great city.`, `Rome will not even be founded for another 1,800 years.`],
      [`The Greeks were building the Parthenon.`, `The Parthenon is 2,000 years younger than the Great Pyramid.`]] }
  ],
  comeback: [
    { after: 'story', q: `Why did Egypt's Old Kingdom fall apart about 2200 BCE?`, ok: 2, a: [
      [`Foreign armies conquered it.`, `Not this time. Foreign rulers, the Hyksos, come 500 years later.`],
      [`The people rose up against pyramid building.`, `The costly tombs had weakened the state, but they did not bring it down. The blow came from the sky.`],
      [`The Nile floods failed year after year, and a king whose job was to guarantee the flood lost his authority.`, `The state was already weak at the centre, with governors acting like little kings. Then the drought came, and the same drought hit Mesopotamia and the Indus.`]] },
    { after: 'mean', q: `About 2000 BCE, on the steppe, someone invented something that changed war for a thousand years. What?`, ok: 1, a: [
      [`The iron sword.`, `Iron comes about 800 years later, after the bronze trade breaks down.`],
      [`The chariot: a light cart with spoked wheels, pulled by two fast horses.`, `It spread everywhere within 400 years, from Egypt to China.`],
      [`Soldiers riding on horseback.`, `Horsemen replaced chariots much later, in the Assyrian army.`]] }
  ],
  chariots: [
    { after: 'story', q: `After driving out the Hyksos, why did Egypt go on to conquer lands as far as Syria?`, ok: 0, a: [
      [`To make a buffer zone, so that invaders could never reach Egypt again.`, `Egypt copied the invaders' chariots and bows, threw them out, and then kept going so it could never happen again.`],
      [`To find more farmland.`, `The Nile valley gave Egypt all the grain it needed.`],
      [`To spread its religion.`, `Egyptians did not try to convert anyone. They wanted safety, and tribute.`]] },
    { after: 'mean', q: `Why did the great kings of the Bronze Age write letters calling each other "brother"?`, ok: 2, a: [
      [`They really were one family.`, `They did marry each other's daughters, but that was part of the deal-making, not the reason for it.`],
      [`They shared a common enemy.`, `They were often each other's enemies. Egypt and the Hittites fought a great battle at Kadesh before making peace.`],
      [`Bronze needs copper and tin from far-apart lands, so they had to trade and talk.`, `No kingdom had everything. Kings who needed each other's metals had to talk as well as fight.`]] }
  ],
  collapse: [
    { after: 'story', q: `Why did so many kingdoms fall at about the same time, around 1200 BCE?`, ok: 1, a: [
      [`One huge army conquered them all.`, `The Sea Peoples were raiders and refugees, not one army, and they were only one of several troubles.`],
      [`They depended on each other, so drought, earthquakes and raids knocked them over like dominoes.`, `No trade meant no tin, no tin meant no bronze, and no bronze meant no weapons and no pay.`],
      [`The copper and tin mines ran empty.`, `The metal was still in the ground. What broke was the trade that carried it.`]] },
    { after: 'mean', q: `Why did the Phoenician alphabet win out over the older scripts?`, ok: 0, a: [
      [`It had only 22 signs, so anyone could learn it in weeks.`, `The old scripts had hundreds of signs and took years to learn. Busy traders needed something quicker.`],
      [`Kings ordered everyone to use it.`, `The Phoenicians were traders with no empire. The alphabet spread because it was useful.`],
      [`It was the first script that could be carved in stone.`, `Hieroglyphs had been carved in stone for 2,000 years. The difference was how easy the alphabet was to learn.`]] }
  ],
  iron: [
    { after: 'story', q: `Why did iron change ordinary people's lives more than bronze ever had?`, ok: 2, a: [
      [`Iron was much harder than bronze.`, `Early iron was not much better than good bronze. The difference was the price.`],
      [`Iron was easier to work.`, `It was harder to work. Smiths needed hotter fires and new skills.`],
      [`Iron ore is found almost everywhere, so even a farmer could own an iron axe and plough.`, `Bronze needed rare tin from far away, so it stayed with kings and soldiers. Iron was for everyone.`]] },
    { after: 'mean', q: `Greece never became one kingdom the way Egypt did. Why?`, ok: 1, a: [
      [`The Greeks spoke many different languages.`, `They shared one language and the same gods. Something else kept them apart.`],
      [`Mountains and islands split it into hundreds of separate cities.`, `Geography again. The Nile tied Egypt together; mountains and sea kept the Greek cities apart, and each ruled itself.`],
      [`Persia would not allow it.`, `Persia reached the Greeks later. The cities had been independent for centuries by then.`]] }
  ],
  ideas: [
    { after: 'story', q: `In Athens, why did poor men get a real say in running the city?`, ok: 0, a: [
      [`The city depended on them: they rowed the warships that beat Persia.`, `Men who fought for the city demanded a share in ruling it, and the city could not say no.`],
      [`A kind king gave it to them.`, `Athens had no king. The citizens voted on the laws themselves.`],
      [`Everyone in Athens could vote, women and slaves too.`, `Only free men were citizens. It was a new idea in the world, but a long way from votes for all.`]] },
    { after: 'mean', q: `The Buddha, Confucius and Socrates never met, yet all asked how people should live. What did their worlds have in common?`, ok: 2, a: [
      [`They had read each other's books.`, `India, China and Greece knew almost nothing of each other yet.`],
      [`They all lived in the Persian Empire.`, `Persia touched Greece and the Indus valley, but never China.`],
      [`Iron, cities, money and endless wars between small states had shaken the old answers.`, `The same kind of world, in three places at once, produced the same kind of questions.`]] }
  ],
  alexander: [
    { after: 'story', q: `How could Alexander conquer the huge Persian Empire in about ten years?`, ok: 1, a: [
      [`Persia was weak and badly run.`, `The opposite: it was so well run that it worked just as smoothly for a new master.`],
      [`He had his father's superb army, and Persia was so well organised that beating the king won the whole machine.`, `Roads, provinces and tax collectors were all in place. Capture the king, and everything was yours.`],
      [`The Persians welcomed him everywhere.`, `Egypt welcomed him as a liberator. The Persians fought him in three great battles.`]] },
    { after: 'mean', q: `While Rome and Carthage were fighting over the Mediterranean, what happened in China?`, ok: 0, a: [
      [`The state of Qin conquered its rivals and united China under the First Emperor.`, `In 221 BCE, just three years before Hannibal crossed the Alps. China got one script, one money and the first Great Wall.`],
      [`The Han invented paper.`, `That comes a little later, under the dynasty that followed the Qin.`],
      [`Confucius began teaching.`, `Confucius lived 300 years earlier, when China was still split into rival states.`]] }
  ],
  romehan: [
    { after: 'story', q: `Romans and Han Chinese never met. So how did Roman glass reach China, and Chinese silk reach Rome?`, ok: 2, a: [
      [`Roman merchants travelled all the way to China.`, `Almost nobody made the whole journey. Each trader covered one stretch.`],
      [`Chinese ships sailed to Italy.`, `Ships did ride the monsoon winds between Egypt and India, but nobody sailed from China to Rome.`],
      [`Goods passed from hand to hand through middlemen, such as the Parthians and the Kushans.`, `Caravans went from oasis to oasis, and the peoples in the middle grew rich, and kept Rome and China from ever meeting.`]] },
    { after: 'mean', q: `Why could Christianity spread so quickly?`, ok: 1, a: [
      [`The emperors supported it from the start.`, `For almost 300 years emperors distrusted it, and sometimes persecuted it. It became legal only in 313 CE.`],
      [`Roman peace, roads, sea lanes and shared languages let its messengers travel.`, `Ideas travel with people and goods. The same was true of Buddhism on the Silk Road.`],
      [`Roman soldiers forced people to convert.`, `In these centuries Christians had no power at all. The faith spread by word of mouth.`]] }
  ],
  end: [
    { after: 'story', q: `What weakened the Roman and Han empires at about the same time?`, ok: 0, a: [
      [`Disease that travelled along the trade routes, leaving fewer people to farm, fight and pay taxes.`, `The same roads that carried silk carried germs. Both empires were also huge, costly to defend, and easy for generals to fight over.`],
      [`They fought a long war against each other.`, `They never met. Persia and half of Asia lay between them.`],
      [`They ran out of gold and silk.`, `Trade did shrink, but as a result of the troubles, not the cause of them.`]] },
    { after: 'mean', q: `The western Roman Empire ended in 476 CE. What happened to Roman ways of life?`, ok: 2, a: [
      [`They vanished almost overnight.`, `It was less a crash than a slow change over several generations.`],
      [`The Huns ruled Rome from then on.`, `The Huns pushed other peoples into the empire and then faded away. It was a Germanic general who retired the last emperor.`],
      [`Much carried on: Latin, Roman law and the Church lived on under new kings, and the eastern half lasted another thousand years.`, `Latin turned into Italian, French and Spanish, and the eastern empire was ruled from Constantinople until 1453.`]] }
  ]
};
