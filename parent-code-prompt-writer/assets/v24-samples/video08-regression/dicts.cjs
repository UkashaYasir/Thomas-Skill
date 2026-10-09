// v24 regression sample — Thomas's Video 08 notes ("Seven Types of Parents", 6–9 Oct 2026) as test frames. These are TEST
// lines written to exercise every v24 rule, not a Parent Code script; the scenes recreate the moments Thomas corrected:
// the campfire (white ground), the helicopter (exaggerated cutaway), the phone (bright purple, a reframe), the study
// (colourful books, one window, no fridge), night (the screen's drawn glow), the F (a letter on an object), the table
// conflict (red marks, ENOUGH!), the bike (only the bike green), absence (grey), the hug (warm light) and WHICH DIAL?.
// Cast, places and props are copied from the Video 08 build with the v22 colour fills removed.
module.exports = {
PROJECT: { title: "The Parent Code — v24 regression sample (Video 08 notes, not for publishing)", runtimeSec: 38 },
ROLE: {
  "Mom": {
    "age": "adult",
    "ref": true,
    "hair": "bun",
    "wear": [],
    "text": "MOM (adult — the attached MOM reference images): the taller figure. Solid black hair parted softly at the centre so it meets the forehead in a small point, framing the round face down past the ears, with one thin strand hanging below each ear toward the jaw, and one round bun on top of the head marked with two or three thin curved lines. Small half-round ears show at eye level. No accessories. A full-grown adult woman with long arms and legs — her head the same size and shape as in her reference."
  },
  "Son": {
    "age": "teen",
    "ref": true,
    "hair": "spikes",
    "wear": [],
    "text": "SON (teenager — the attached SON reference images): clearly shorter than MOM, lean, with his larger-looking head exactly as in the reference. Solid black messy spiky hair in jagged pointed clumps: a fringe of pointed tips falling over the forehead to just above the eyebrows, spiky tips sticking out at the sides above the ears. The face is round, a touch taller than wide; small half-round ears. No accessories."
  },
  "Dad": {
    "short": "his hair, his glasses and his height",
    "age": "adult",
    "ref": false,
    "from": "Son",
    "hair": "side parting",
    "wear": [
      {
        "item": "glasses",
        "hex": "#3F4A5C"
      }
    ],
    "change": "his hair — short flat solid black hair cut neatly with a clean side parting and a smooth rounded top, instead of SON's hair — one pair of small rectangular glasses with thin dark slate (#3F4A5C) frames around the big white eye circles, pupils always visible — and an adult height a little taller than MOM",
    "text": "DAD (MOM's partner — drawn from the attached SON reference, changing only his hair, his glasses and his height): short flat solid black hair, neatly cut with a clean side parting and a smooth rounded top; one pair of small rectangular glasses with thin dark slate (#3F4A5C) frames around the big white eye circles, the pupils always visible inside them; a full-grown adult a little taller than MOM, with long arms and legs. No clothing — a bare thin black line body with no fill."
  },
  "Mia": {
    "short": "her hair",
    "age": "teen",
    "ref": false,
    "from": "Son",
    "hair": "braid",
    "wear": [],
    "change": "her hair — solid black hair pulled smooth into one long thick braid hanging forward over one shoulder, instead of SON's hair",
    "text": "MIA (a teenage girl whose parents rarely show up — drawn from the attached SON reference, changing only her hair): solid black hair pulled smooth into one long thick braid hanging forward over one shoulder; a lean teenager about SON's height. No clothing — a bare thin black line body with no fill."
  },
  "Little Boy": {
    "short": "his size",
    "age": "child",
    "ref": false,
    "from": "Son",
    "sameAs": "Son",
    "hair": "spikes",
    "wear": [],
    "change": "his size only — SON at seven years old, with exactly the same messy spiky black hair and the same face, and a young child's body whose head top reaches only about halfway up MOM's standing height, with short arms and legs",
    "text": "LITTLE BOY (SON at seven years old — drawn from the attached SON reference, changing only his size): exactly SON's solid black messy spiky hair with the pointed tips over the forehead and above the ears, and the same round face; a young child whose head top reaches only about halfway up MOM's standing height, with short arms and legs. No clothing — a bare thin black line body with no fill."
  }
},
EDIT_WHO: {
  "Mom": "MOM is the woman with black hair in a round bun on top",
  "Son": "SON is the teenage boy with messy spiky black hair",
  "Dad": "DAD is the man with flat side-parted black hair and small rectangular glasses",
  "Mia": "MIA is the teenage girl with one long black braid over her shoulder",
  "Little Boy": "LITTLE BOY is the small seven-year-old boy with the same messy spiky black hair as SON"
},
SET: {},
CHAPTER: {},
WORLD: {
  "CAVE": {
    "kind": "OUTDOOR",
    "label": "a cave mouth, forty thousand years ago",
    "parts": [
      [
        "cave mouth",
        "\\bcave mouth\\b",
        "one low rounded cave mouth in a rough rock face"
      ],
      [
        "rock",
        "\\brock\\b",
        "one low flat rock to sit on"
      ],
      [
        "cliff edge",
        "\\bcliff\\b",
        "one straight cliff edge where the ground stops and drops away"
      ],
      [
        "cave wall",
        "\\bcave wall\\b",
        "one stretch of rough cave wall"
      ]
    ]
  },
  "KITCHEN": {
    "kind": "INDOOR",
    "label": "kitchen",
    "parts": [
      [
        "table",
        "\\btable\\b",
        "one plain rectangular kitchen table on four straight legs"
      ],
      [
        "chair",
        "\\bchairs?\\b|\\bsits?\\b|\\bsitting\\b|\\bseated\\b",
        "one plain chair for each person sitting, and no other chairs"
      ],
      [
        "counter",
        "\\bcounter\\b",
        "one long plain kitchen counter with a flat top"
      ],
      [
        "fridge",
        "\\bfridge\\b",
        "one tall plain fridge with one long handle"
      ],
      [
        "doorway",
        "\\bdoorway\\b",
        "one open doorway drawn as a plain door frame"
      ],
      [
        "window",
        "\\bwindow\\b",
        "one plain square window with a cross frame"
      ]
    ]
  },
  "PATH": {
    "kind": "OUTDOOR",
    "label": "park path",
    "parts": [
      [
        "path",
        "\\bpath\\b",
        "one long straight park path drawn as two thin lines"
      ],
      [
        "bench",
        "\\bbench\\b",
        "one plain park bench"
      ],
      [
        "tree",
        "\\btree\\b",
        "one plain round-topped tree"
      ]
    ]
  },
  "SON_ROOM": {
    "kind": "INDOOR",
    "label": "SON's bedroom",
    "parts": [
      [
        "bed",
        "\\bbed\\b",
        "one low single bed with a plain blanket and one pillow"
      ],
      [
        "desk",
        "\\bdesk\\b",
        "one plain desk with one chair"
      ],
      [
        "door",
        "\\bdoor\\b|\\bdoorway\\b",
        "one plain bedroom door with a thin frame and one small round knob"
      ],
      [
        "window",
        "\\bwindow\\b",
        "one plain square window with a cross frame"
      ]
    ]
  },
  "MIA_ROOM": {
    "kind": "INDOOR",
    "label": "MIA's bedroom",
    "parts": [
      [
        "bed",
        "\\bbed\\b",
        "one low single bed with a plain blanket and one pillow"
      ],
      [
        "window",
        "\\bwindow\\b|\\bwindowsill\\b",
        "one tall plain window with a cross frame and a low wide sill"
      ],
      [
        "door",
        "\\bdoor\\b|\\bdoorway\\b",
        "one plain bedroom door with a thin frame and one small round knob"
      ]
    ]
  },
  "IDEA": {
    "kind": "FIELD",
    "text": "one long plain floor line"
  },
  "STREET": {
    "kind": "OUTDOOR",
    "label": "street outside the house",
    "parts": [
      [
        "front door",
        "\\bfront door\\b",
        "one plain front door with a thin frame and one small round knob"
      ],
      [
        "pavement",
        "\\bpavement\\b",
        "one long pavement edge drawn as one thin line"
      ]
    ]
  }
},
PROP: {
  "FIRE": {
    "why": "orange and yellow = life, energy and light — the fire at the centre of the one job: keep the baby alive",
    "fam": "AMBER",
    "name": "THE FIRE",
    "hex": "#FF7A1F",
    "colour": "vivid orange",
    "danger": false,
    "nouns": [
      "fire",
      "flames"
    ],
    "part": "THE FIRE's vivid orange (#FF7A1F) and bright yellow (#FFC93C) flames",
    "text": "THE FIRE: one huge, dramatic campfire of crossed logs with tall flat pointed flames leaping up higher than a standing adult's head — vivid orange (#FF7A1F) outer flames, bright yellow (#FFC93C) inner flames and a pale yellow (#FFF3B0) core — three short ink dashes flicking off the flame tips, and one wide flat pale warm yellow (#FFF1CC) oval of firelight on the ground around it, flat with no gradient or glow; the brightest, most saturated thing in the picture.",
    "lineText": "THE FIRE: one huge campfire of crossed logs with tall flat pointed flames drawn in black line with white fill."
  },
  "SON_PHONE": {
    "fam": "VIOLET",
    "small": true,
    "name": "SON'S PHONE",
    "hex": "#8A2BE2",
    "colour": "vivid purple",
    "danger": false,
    "nouns": [
      "phone"
    ],
    "text": "SON'S PHONE: one slim rectangular smartphone in a flat vivid purple (#8A2BE2) case with one small round white sticker on its back; its screen one plain grey panel with no words.",
    "screen": true
  },
  "TEST": {
    "why": "red = stress — the teacher's red pen, grades as pressure",
    "fam": "RED",
    "small": true,
    "part": "THE TEST's huge teacher's red (#D32F2F) circle and grade",
    "rest": "the paper stays white",
    "name": "THE TEST",
    "hex": "#D32F2F",
    "colour": "teacher's red",
    "danger": true,
    "nouns": [
      "test",
      "paper",
      "report card"
    ],
    "text": "THE TEST: one sheet of white school paper with a few short grey lines and one huge hand-drawn circle in teacher's red (#D32F2F) in its top corner.",
    "lineText": "THE TEST: one sheet of white school paper with a few short grey lines and one big hand-drawn circle in black ink in its top corner — no letters or numbers."
  },
  "BIKE": {
    "fam": "GREEN",
    "part": "THE BIKE's emerald-green (#00A86B) frame",
    "name": "THE BIKE",
    "hex": "#00A86B",
    "colour": "emerald green",
    "danger": false,
    "nouns": [
      "bike",
      "bicycle",
      "handlebars",
      "chain"
    ],
    "text": "THE BIKE: one bicycle with two thin round wheels with a few straight spokes, one small saddle, straight handlebars with two grips and a thin chain, its frame in flat emerald green (#00A86B).",
    "lineText": "THE BIKE: one bicycle with two thin round wheels with a few straight spokes, one small saddle, straight handlebars with two grips and a thin chain, drawn in black line with white fill."
  },
  "CALENDAR": {
    "fam": "BLUE",
    "part": "THE CALENDAR's circles in calm blue (#2F6FD0)",
    "name": "THE CALENDAR",
    "hex": "#2F6FD0",
    "colour": "calm blue",
    "danger": false,
    "nouns": [
      "calendar"
    ],
    "text": "THE CALENDAR: one white wall calendar, a grid of six rows of seven empty squares with no numbers or words, most of the squares crossed off with a short black X, and one square circled in flat calm blue (#2F6FD0) marker — the visit that has not come yet."
  },
  "DIALS": {
    "onWall": true,
    "why": "amber = warmth, blue = structure — the two settings in their own colours",
    "part": "THE DIALS' warm amber (#F29A2E) left knob and calm blue (#2F6FD0) right knob",
    "rest": "the dial plates stay white",
    "name": "THE DIALS",
    "hex": "#F29A2E",
    "colour": "warm amber and calm blue",
    "danger": false,
    "nouns": [
      "dials",
      "dial",
      "knob"
    ],
    "text": "THE DIALS: two big round dials side by side, each a plain white round plate with short black marks round its edge and no numbers, each with one big round knob at its centre carrying one short black pointer line — the left knob in flat warm amber (#F29A2E) for warmth, the right knob in flat calm blue (#2F6FD0) for structure.",
    "lineText": "THE DIALS: two big round dials side by side, each a plain white round plate with short black marks round its edge and no numbers, each with one big round knob at its centre carrying one short black pointer line, drawn in black line with white fill."
  },
  "BOOKS": {
    "fam": "YELLOW",
    "why": "bright spines = the energy of learning; the books are the one colourful thing in the study (Thomas, Video 08)",
    "name": "THE BOOKS",
    "hex": "#FFD21F",
    "colour": "bright yellow",
    "danger": false,
    "nouns": [
      "books"
    ],
    "part": "THE BOOKS' spines in bright yellow (#FFD21F), vivid red (#E8322B) and vivid blue (#2F7DF0)",
    "text": "THE BOOKS: one tall leaning stack of plain thick books with blank spines, each spine flat in one bright colour — bright yellow (#FFD21F), vivid red (#E8322B) or vivid blue (#2F7DF0) — no words.",
    "lineText": "THE BOOKS: one tall leaning stack of plain thick books with blank spines, drawn in black line with white fill — no words."
  },
  "HELICOPTER": {
    "fam": "YELLOW",
    "why": "yellow = attention and alarm — the hovering parent made huge and absurd for a moment (Thomas's own example)",
    "name": "THE HELICOPTER",
    "hex": "#FFD21F",
    "colour": "bright yellow",
    "danger": false,
    "nouns": [
      "helicopter"
    ],
    "part": "THE HELICOPTER's bright yellow (#FFD21F) body",
    "text": "THE HELICOPTER: one big cartoon helicopter with a round bubble cockpit window, a short tail with a small tail rotor, two landing skids and one wide main rotor with two long straight blades and three short black speed dashes at each blade tip; its body in flat bright yellow (#FFD21F), the window white, the skids and rotor black line — no pilot, no words.",
    "lineText": "THE HELICOPTER: one big cartoon helicopter with a round bubble cockpit window, a short tail rotor, two landing skids and one wide main rotor, drawn in black line with white fill."
  }
},
TONE: {
  "#D32F2F": { "calm": ["deep red", "#A33B33"], "bright": ["bright pure red", "#F21D1D"] },
  "#7E57C2": {
    "calm": [
      "muted violet",
      "#6B5698"
    ],
    "bright": [
      "vivid purple",
      "#9D6BFF"
    ]
  },
  "#2F6FD0": {
    "calm": [
      "deep blue",
      "#2E5590"
    ],
    "bright": [
      "vivid calm blue",
      "#2F7DF0"
    ]
  },
  "#F29A2E": {
    "calm": [
      "deep amber",
      "#C47E2F"
    ],
    "bright": [
      "bright warm amber",
      "#FFA62B"
    ]
  },
  "#00A86B": {
    "calm": [
      "deep emerald",
      "#1F7A57"
    ],
    "bright": [
      "vivid emerald green",
      "#00C27A"
    ]
  }
},
OVERLAY: {},
STORY: { idea: "Test frames for the v24 standard.", arc: "campfire → helicopter → phone → study → night → the F → conflict → bike → absence → hug → which dial", ending: "WHICH DIAL? on the dials." },
PLAN: [{ sequence: "01 Video 08 notes", purpose: "Every v24 rule in one short run", feel: "the full range: curiosity, comedy, conflict, ache, warmth", mood: "CLEAN", metaphor: "the helicopter cutaway; the dials" }],
MOTIFS: [{ key: "SON_PHONE", meaning: "attention pulled away", arc: ["S3 · state: in his hands, taken · now means: the fight over attention · picture: medium, then a reframe to his eyes", "S5 · state: the only light at night · now means: the pull · picture: night medium"] }],
REVISIONS: [],
};
