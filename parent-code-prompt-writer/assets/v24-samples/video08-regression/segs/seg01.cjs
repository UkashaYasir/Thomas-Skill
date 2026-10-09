// v24 regression sample — every v24 key on Thomas's Video 08 notes (see dicts.cjs). Test frames, not a Parent Code script.
module.exports = ({ seg, F, E }) => {
seg("01 Video 08 notes");

// 00:00 campfire — "Make the fire noticeably larger… stronger orange and yellow"; "the ground does not also need to be colored"
F(1, { sc: "The cave mouth, forty thousand years ago", t: "H", r: "Mom", p: ["FIRE"], h: "FIRE", sl: "DOMINANT",
  ft: "Curiosity and a grin — one job, one fire, one mother on guard.", ln: "hook",
  idea: "MOM on a low rock beside a huge, blazing fire, scanning the far horizon like a guard on duty.",
  alt: ["a cave painting of a family (reads as a museum, not a moment)", "a stone tablet with one rule (text in the image)"],
  ce: "FIRE", gl: "rays", cx: "white stage vs one blazing fire",
  sz: "MEDWIDE", an: "EYE", w: "CAVE", m: "CLEAN", wh: "at the cave mouth",
  L: "THE FIRE blazing huge on the ground, its flames higher than MOM's head", C: "MOM sitting on the low rock, large in the frame, one mitten hand shading her eyes", R: "open space and the far horizon line",
  a: "MOM sits on the low rock beside THE FIRE and scans the far horizon with one mitten hand raised flat above her eyes; THE FIRE blazes two to three times bigger than a normal campfire.",
  pf: "MOM: eyes narrowed and alert, eyebrows pulled low and level, mouth a tight determined line, head turned toward the horizon on the right, one mitten hand shading her eyes and the other gripping her knee, posture upright and watchful on the rock, pupils pressed toward the far right.",
  st: "START", mv: ["PUSH_IN", "job", "slow push toward the fire"], dv: "SCALE_SHIFT", zm: [["one job", "MOM's face", "punch"]],
  y: "The opening grabs attention with one huge bright object on a white stage; the reframe to her face lands the joke." });

// 00:10 helicopter — "a large exaggerated yellow or bright green helicopter behind the character for a few seconds"
F(2, { sc: "The hall, a school morning", t: "H", r: "Mom, Son", p: ["HELICOPTER"], h: "HELICOPTER", sl: "OVERWHELMING",
  ft: "A laugh of recognition — the hovering parent, made absurd.", ln: "humour-aside",
  idea: "A giant bright yellow helicopter hovers right behind MOM as she hovers over SON on his way out; SON turns and stares at it, deadpan.",
  alt: ["a small rotor above MOM's head (Video 08's version — too small to land)", "MOM with a stopwatch (another idea)"],
  ia: "MOM hovers over SON, both mitten hands an inch from his back → SON turns his head and stares at the helicopter with a flat, unimpressed look", dist: "close",
  ce: "HELICOPTER", cx: "an ordinary morning vs an impossible helicopter", ip: "unexpected-object",
  sz: "MEDWIDE", an: "LOW", w: "STREET", m: "CLEAN", wh: "by the front door",
  L: "SON walking toward the front door, large in the frame", C: "MOM right behind him, large, both mitten hands hovering an inch from his back", R: "THE HELICOPTER hovering huge right behind MOM, filling the top right of the frame",
  a: "SON walks toward the front door while MOM hovers right behind him, both mitten hands an inch from his back; behind her THE HELICOPTER hovers enormous, its rotor blades spinning.",
  pf: "MOM: eyes wide and anxious, eyebrows raised high, mouth a worried open oval, head bent toward SON, both mitten hands hovering behind his back, posture hunched forward, pupils on SON. SON: eyes half-closed and flat, eyebrows level, mouth a straight unimpressed line, head turned back over his shoulder, one mitten hand reaching for the door, posture mid-step, pupils on the helicopter behind MOM.",
  mv: ["SHAKE", "helicopter", "a short shake as the helicopter roars in"], dv: "METAPHOR_OBJECT", sti: "the shake on the word is the beat",
  y: "Thomas's own example: exaggerate to amplify the voice-over, with the child's reaction as the punchline." });

// 00:20 / 02:30 phone — "Keep the smartphone visually distinctive with a strong purple color"; "consider a short dramatic close-up"
F(3, { sc: "The living room, evening", t: "E", r: "Mom, Son", p: ["SON_PHONE"], h: "SON_PHONE",
  ft: "A sting — the phone taken mid-scroll, the protest on his face.", ln: "dialogue",
  idea: "MOM plucks the phone out of SON's mitten hands; he lunges after it.",
  alt: ["MOM pointing at the phone from across the room (no contact)", "the phone alone on the table (no reaction)"],
  ia: "MOM lifts SON'S PHONE out of his mitten hands → SON lunges after it, arm stretched, mouth open in protest", dist: "close",
  ce: "SON_PHONE", cx: "calm hands vs a lunging body", ip: "large-face",
  sz: "MEDIUM", an: "EYE", w: "IDEA", m: "CLEAN", wh: "in open space",
  L: "SON on the floor cushion, large, both mitten hands reaching up", C: "SON'S PHONE held high in MOM's mitten hand between them", R: "MOM standing, large, looking down at him",
  a: "MOM lifts SON'S PHONE high out of SON's mitten hands while SON lunges up after it with both arms stretched.",
  pf: "MOM: eyes calm and steady, eyebrows level, mouth a firm closed line, head tilted down toward SON, one mitten hand holding SON'S PHONE high and the other open toward him, posture upright, pupils on SON. SON: eyes wide and outraged, eyebrows shot up, mouth a big open protest oval, head thrown back, both mitten hands reaching up, posture lunging forward off the cushion, pupils on SON'S PHONE.",
  mv: ["HOLD", "", "hold"], dv: "CONTEXT", zm: [["second", "SON's face", "punch"]],
  y: "The phone is the bright purple focus; the reframe to his face is Thomas's 'short dramatic close-up' without a new image." });
E("S3", "down", "SON's arms drop and he slumps back onto the cushion; his eyebrows sink into a sulk and his mouth turns into a deep downturned curve; MOM, SON'S PHONE and the white background stay exactly the same.");

// study — "It is enough if the books are colorful"; "remove the refrigerator completely… Keep only the window"
F(4, { sc: "The kitchen, after school", t: "S", r: "Son", p: ["BOOKS"], h: "BOOKS",
  ft: "Quiet effort — alone with a mountain of books.", ln: "scene-setting",
  idea: "SON at the table behind a tall leaning pile of bright books, one window outline behind him to say 'home'.",
  alt: ["the full kitchen with fridge and counter (Thomas cut it)", "SON with a laptop (two focus objects)"],
  ce: "BOOKS", cx: "bright books vs a white room",
  sz: "MEDIUM", an: "PROFILE", w: "KITCHEN", m: "CLEAN", wh: "at the kitchen table",
  L: "the window behind SON, a simple line drawing", C: "SON sitting at the table, large, chin on one mitten hand", R: "THE BOOKS leaning in a tall pile on the table",
  a: "SON sits at the table beside THE BOOKS, one mitten hand propping his head and the other turning a page; behind him one window.",
  pf: "SON: eyes heavy and tired, eyebrows sagging, mouth a wavy tired line, head propped on one mitten hand, the other mitten hand turning a page, posture slumped over the table, pupils on THE BOOKS.",
  mv: ["PUSH_IN", "alone", "slow push in"], dv: "CONTEXT", zm: [["alone", "SON's face", "push"]],
  y: "The study scene after Thomas's fix: character and colourful books, one window, nothing else." });

// 01:40 night — "Make the smartphone glow more noticeable"
F(5, { sc: "SON's bedroom, late at night", t: "E", r: "Son", p: ["SON_PHONE"], h: "SON_PHONE",
  ft: "Unease — the screen pulls him in while the house sleeps.", ln: "statement",
  idea: "SON in bed in the dark, the phone's screen the only light, its drawn glow on his face.",
  alt: ["a clock showing the late hour (text and numbers)", "the door closed with light under it (no phone)"],
  ce: "SON_PHONE", gl: "rays", cx: "dark room vs one bright screen",
  sz: "MEDIUM", an: "EYE", w: "SON_ROOM", m: "NIGHT", wh: "in his bed",
  L: "the edge of the bed", C: "SON lying in bed, large, holding SON'S PHONE above his face", R: "the dark room",
  a: "SON lies in bed holding SON'S PHONE above his face with both mitten hands, the screen lighting his face.",
  pf: "SON: eyes wide and glassy, eyebrows raised, mouth a slack open oval, head sunk in the pillow, both mitten hands holding SON'S PHONE above his face, posture lying flat and still, pupils locked on the screen.",
  mv: ["PUSH_IN", "only", "slow push in"], dv: "CONTEXT", zm: [["light", "SON's eyes", "push"]],
  y: "Night stays dark navy; the phone's drawn rays make it the only light." });

// 02:10 the F — "The oversized F is a strong concept. Make it more visually striking with a brighter red"
F(6, { sc: "The test, on white", t: "H", r: "", p: ["TEST"], h: "TEST", sl: "DOMINANT",
  ft: "A cold drop — the grade is all you can see.", ln: "peak",
  idea: "The test alone on white, huge, the bright red F filling its circle.",
  alt: ["SON holding the test (the face would compete)", "a red cross over a heart (a symbol)"],
  ce: "TEST", cx: "empty white vs one huge red letter", ip: "unexpected-object",
  sz: "OBJECT", an: "EYE", w: "IDEA", m: "WHITE",
  L: "white space", C: "THE TEST, huge, tilted slightly", R: "white space",
  a: "THE TEST lies alone, huge, its red circle filled by one big red F.",
  pf: "", ol: ["F", "failed", "BRIGHTRED", "inside the huge red circle at the top of THE TEST", "a huge, thick handwritten capital letter in bright red marker strokes, filling most of the circle"],
  mv: ["SNAP_ZOOM", "failed", "zoom punch"], dv: "SCALE_SHIFT",
  y: "A letter on an object only because the letter is the story; brighter red, the same size contrast." });

// 06:00 table conflict — "Push the father's facial expression further"; ENOUGH! as a playful word
F(7, { sc: "The kitchen, dinner", t: "H", r: "Dad, Son", p: [], h: "FACE", hr: "Dad",
  ft: "A jolt — the anger lands, the son flinches.", ln: "peak",
  idea: "DAD's mitten hand slams the table, short red jagged strokes bursting from it; SON recoils.",
  alt: ["DAD shouting with a speech bubble (a symbol)", "a broken plate (an object instead of a face)"],
  ia: "DAD slams one mitten hand flat on the table → SON flinches back, both mitten hands up near his face", dist: "apart",
  ce: "none", mk: ["three short jagged strokes bursting from DAD's mitten hand where it hits the table", "RED"], cx: "a shout vs a flinch",
  tx: ["ENOUGH!", "Enough", "RED", "in the open space above the table, between them, clear of both faces", true],
  sz: "MEDWIDE", an: "EYE", w: "KITCHEN", m: "CLEAN", wh: "at the kitchen table",
  L: "DAD standing at the table, large, one mitten hand slammed flat on it", C: "the table between them", R: "SON sitting, large, leaning away",
  a: "DAD slams one mitten hand flat on the table; across the table SON leans away with both mitten hands raised.",
  pf: "DAD: eyes wide and furious, eyebrows slammed down in a deep V, mouth a big open shouting shape, head thrust forward, one mitten hand slammed flat on the table and the other clenched, posture leaning over the table, pupils on SON. SON: eyes squeezed half shut, eyebrows shot up, mouth a startled open oval, head pulled back, both mitten hands raised near his face, posture leaning far back, pupils on DAD.",
  mv: ["SHAKE", "slams", "short shake"], dv: "CONTEXT", zm: [["slams", "SON's face", "punch"]],
  y: "Red marks the conflict; the word is short, playful in style and lands on the spoken word." });

// 06:00 bike — "too much green… The bike, ground, and trees do not all need to compete"
F(8, { sc: "The park path, Saturday", t: "E", r: "Mom, Little Boy", p: ["BIKE"], h: "BIKE",
  ft: "Pride — he rides on his own.", ln: "chapter-turn",
  idea: "MOM's mitten hands open behind LITTLE BOY as he wobbles away on the bike, on his own for the first time.",
  alt: ["MOM still gripping the handlebars (the problem, not the turn)", "a medal (a symbol)"],
  ia: "MOM opens both mitten hands and lets go of the saddle → LITTLE BOY pedals off, eyes wide with surprise", dist: "apart",
  ce: "BIKE", gl: "rays", cx: "letting go vs holding on",
  sz: "MEDWIDE", an: "PROFILE", w: "PATH", m: "CLEAN", wh: "on the park path",
  L: "MOM standing, large, both mitten hands open in the air", C: "the open path between them", R: "LITTLE BOY on THE BIKE, large, pedalling away",
  a: "MOM stands on the path with both mitten hands just opened in the air as LITTLE BOY pedals THE BIKE away on his own.",
  pf: "MOM: eyes bright and wet, eyebrows lifted, mouth a wide proud smile curve, head tilted, both mitten hands open in the air, posture leaning forward, pupils on LITTLE BOY. LITTLE BOY: eyes huge with surprise, eyebrows high, mouth a big open oval, head turned back toward MOM, both mitten hands on the handlebars, posture upright and rolling forward, pupils on MOM.",
  mv: ["PAN_RIGHT", "rides", "pan with the bike"], dv: "BEFORE_AFTER", zm: [["rides", "LITTLE BOY's face", "punch"]],
  y: "Only the bike is green; the path is a line, no tree, no grass colour." });

// 04:40 absent parent — "The gray atmosphere fits"; 05:10 "the calendar… as a symbol of missing time"
F(9, { sc: "MIA's bedroom, evening", t: "Q", r: "Mia", p: ["CALENDAR"], h: "FIGURE", cm: true, mu: true,
  ft: "Ache — waiting for someone who does not come.", ln: "statement",
  idea: "MIA kneeling at the window sill, chin on her mitten hands, the calendar of crossed-off days beside her.",
  alt: ["MIA hugging a teddy (childish)", "an empty chair at a table (no face)"],
  ce: "CALENDAR", cx: "affinity — the stillness is the point",
  sz: "MEDIUM", an: "PROFILE", w: "MIA_ROOM", m: "CLEAN", wh: "at the window",
  L: "THE CALENDAR on the wall, every day crossed off", C: "MIA kneeling at the window sill, large, chin resting on both mitten hands", R: "the window, empty outside",
  a: "MIA kneels at the window sill with her chin on both mitten hands, looking out; THE CALENDAR hangs on the wall beside her.",
  pf: "MIA: eyes heavy and searching, eyebrows tilted up in the middle, mouth a deep downturned curve, head resting on her mitten hands, both mitten hands folded under her chin on the sill, posture still and curled, pupils on the empty window.",
  mv: ["HOLD", "", "hold"], dv: "CONTEXT", sti: "the stillness is the waiting", zm: [["Nobody", "MIA's face", "push"]],
  y: "Grey on purpose for absence; the calendar is the one calm colour; a slow push to her face instead of a new image." });

// 02:50 hug — "Strengthen the positive emotions with subtle warm color accents"
F(10, { sc: "The hall, evening", t: "E", r: "Mom, Son", p: [], h: "FIGURE", hr: "Son",
  ft: "Warmth and relief — finally held.", ln: "peak",
  idea: "MOM pulls SON into a tight hug at the front door; a flat warm light shape behind them.",
  alt: ["a heart above them (a symbol)", "a gift handed over (an object instead of contact)"],
  ia: "MOM wraps both arms around SON → SON sinks into the hug, eyes closed", dist: "touching",
  ce: "none", li: ["warm", "one soft flat oval of warm light behind the two of them"], cx: "the conflict before vs touch now",
  sz: "MEDIUM", an: "EYE", w: "STREET", m: "CLEAN", wh: "by the front door",
  L: "the front door, a line drawing", C: "MOM and SON in a tight hug, large in the frame", R: "open space",
  a: "MOM wraps both arms tightly around SON by the front door; SON sinks into the hug.",
  pf: "MOM: eyes closed in relief, eyebrows soft and lifted, mouth a gentle smile curve, head resting against SON's head, both mitten hands pressed on his back, posture leaning in, pupils hidden. SON: eyes closed, eyebrows soft, mouth a soft relieved smile curve, head on MOM's shoulder, both mitten hands holding her back, posture sinking into her, pupils hidden.",
  mv: ["PUSH_IN", "hugs", "slow push in"], dv: "CONTEXT", zm: [["needed", "SON's face", "push"]],
  y: "The positive moment looks different: warm light, touch, a softer push." });

// 08:50 ending — "WHICH DIAL? The concept works. Check text size, contrast, and readability, especially on mobile"
F(11, { sc: "The dials, on white", t: "H", r: "", p: ["DIALS"], h: "DIALS",
  ft: "A gentle challenge — the question is yours now.", ln: "hook",
  idea: "The two dials alone on white, the question lettered big above them.",
  alt: ["a long closing title (Thomas: no titles)", "a hand turning both dials (answers the question)"],
  ce: "DIALS", gl: "halo", cx: "two bright knobs vs empty white",
  tx: ["WHICH DIAL?", "dial", "BLACK", "in open space above THE DIALS, centred", true],
  sz: "OBJECT", an: "EYE", w: "IDEA", m: "WHITE",
  L: "white space", C: "THE DIALS side by side, large", R: "white space",
  a: "THE DIALS stand side by side, large, on clean white.",
  pf: "", st: "RESULT", mv: ["PUSH_IN", "adjusting", "slow push in"], dv: "CONTEXT", zm: [["adjusting", "THE DIALS", "push"]],
  y: "The ending stays short; the word is big enough for a phone." });
};
