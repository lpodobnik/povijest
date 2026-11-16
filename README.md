# Povijest · Drevni svijet / The Ancient World

Povezani atlas povijesti od prvih ljudi do pada Rima, na hrvatskom i engleskom: karta koja se mijenja kroz vrijeme, lanac uzroka i posljedica, vremenska crta „istodobno, diljem svijeta” i priča korak po korak sa slikama i pitanjima.

A connected history atlas from the first humans to the fall of Rome, in Croatian and English: a map that changes through time, a chain of causes and effects, a "meanwhile, around the world" timeline, and a step-by-step story mode with pictures and questions.

- Atlas: https://lpodobnik.github.io/povijest/
- Priča / story mode: https://lpodobnik.github.io/povijest/?prica

It is a static site with no build step. Open `index.html` directly, or serve the folder with any web server. It works offline.

## Where things are

| File | What it holds |
|---|---|
| `js/data-chapters.js` | the 18 chapters: story, "meanwhile", fact, questions to talk about |
| `js/data-causes.js` | the chain of causes: changes and the links between them |
| `js/data-map.js` | map layers: regions, routes, places, views |
| `js/data-timeline.js` | the "meanwhile" timeline |
| `js/data-story.js` | story mode: the moment, map view and place for each scene |
| `js/data-quiz.js` | story mode questions |
| `js/data-wiki.js`, `js/data-pics.js` | pictures of places and their credits |
| `js/lang-hr.js` | all Croatian text |
| `js/i18n.js`, `js/app.js` | language layer and the app itself |

## Credits and caveats

- Pictures of places are from Wikipedia / Wikimedia Commons. The author, licence and source page of each one are listed in `js/data-pics.js` and shown on its card.
- Coastlines: Natural Earth, via [world-atlas](https://github.com/topojson/world-atlas). Map drawing: [D3](https://d3js.org) and [topojson-client](https://github.com/topojson/topojson-client).
- The texts were written with Claude and have not been checked against sources line by line. Early dates are rounded, the outlines of empires are rough, and population figures are loose estimates.
