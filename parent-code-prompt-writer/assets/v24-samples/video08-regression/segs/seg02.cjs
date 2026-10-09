// v25 test lines — the colour-intensity ladder (Muhammad, 9 Oct: "the default background is white… whenever a scene shows
// the emotional intensity and the overall scenario, we convert to colours… staying minimalistic") and the new keys:
// pc (the stage in the emotion's colour), a focus in the field's own hue turning white, marks beside a focus, I() inserts.
module.exports = ({ seg, F, I }) => {
seg("02 The intensity ladder");

// rung 3 — the fight: the stage turns red (conflict); the red test would vanish on red, so it is drawn white
F(12, { sc: "The kitchen, the fight", t: "H", r: "Dad, Son", p: ["TEST"], h: "TEST", pk: true, pc: "RED",
  ft: "A punch in the stomach — the whole room is the fight now.", ln: "peak",
  idea: "DAD and SON on their feet across the table, shouting at once; the failed test flung down between them; the whole stage turns red.",
  alt: ["the same fight on the white stage with red marks only (the colour stays on the action, not the scenario)", "a storm cloud over the table (a symbol)"],
  ia: "DAD jabs one mitten hand at THE TEST on the table → SON shouts back, both mitten hands thrown wide", dist: "apart",
  ce: "TEST", mk: ["short jagged strokes flying between their two open mouths", "RED"], cx: "the quiet kitchen before vs the whole room in red",
  sz: "MEDWIDE", an: "EYE", w: "KITCHEN", wh: "at the kitchen table",
  L: "DAD standing, large, one mitten hand jabbing at the test", C: "THE TEST flung on the table between them", R: "SON standing, large, both mitten hands thrown wide",
  a: "DAD and SON stand on either side of the table shouting at the same time; DAD jabs one mitten hand at THE TEST lying flung on the table.",
  pf: "DAD: eyes wide and furious, eyebrows slammed down in a deep V, mouth a big open shouting shape, head thrust forward, one mitten hand jabbing at the test and the other clenched, posture leaning over the table, pupils on SON. SON: eyes narrowed and hurt, eyebrows steep and angry, mouth a big open shouting shape, head pushed forward, both mitten hands thrown wide, posture leaning in, pupils on DAD.",
  st: "START", mv: ["SHAKE", "fight", "short shake as the stage turns red"], dv: "CONTEXT", zm: [["listening", "THE TEST", "punch"]],
  y: "The peak is where the stage converts to colour: one red field, white figures, the test drawn white so it still reads." });

// the jump back to white — the sudden close-up lands on pure white (a face is never on a colour field)
F(13, { sc: "The kitchen, the fight", t: "E", r: "Son", p: [], h: "FACE",
  ft: "A drop — under the shouting, fear.", ln: "reveal",
  idea: "SON's face alone on white, the shout gone, eyes wide and wet.",
  alt: ["SON's whole figure walking out (the face carries this better)", "a crack drawn across the table (a symbol)"],
  look: "down and to frame left, toward where the test lies", ctx: "follows S12 (the wide red fight): the same moment, the camera suddenly in on his face", ce: "none", cx: "a red shouting room → one quiet face on white", ip: "snap-to-white",
  sz: "CLOSE", an: "EYE", w: "IDEA", m: "WHITE",
  L: "white space", C: "SON's face, large, filling most of the frame", R: "white space",
  a: "SON's face fills the frame; the shout has gone out of it, and one mitten hand rises to the edge of his cheek.",
  pf: "SON: eyes wide and wet, eyebrows pulled up in the middle, mouth a big uneven wavy line, head lowered a little, one mitten hand rising to the edge of his cheek, shoulders pulled up and in, pupils pressed down toward frame left.",
  mv: ["HOLD", "", "hold"], dv: "CONTEXT", sti: "the stillness after the shouting is the beat",
  y: "The jump from the red field to white is itself the contrast; the close-up is the sudden visual change." });

// rung 2 — back on the white stage; warmth is a light shape, never a warm field
F(14, { sc: "The hall, later", t: "E", r: "Mom, Son", p: [], h: "FIGURE", hr: "Son",
  ft: "Relief, slowly — someone stayed.", ln: "turn",
  idea: "MOM sits down on the floor next to SON in the hall, not talking, just there; a flat warm light behind them.",
  alt: ["MOM lecturing from the doorway (the opposite of the turn)", "a heart between them (a symbol)"],
  ia: "MOM sits down next to SON and rests one open mitten hand on the floor beside his → SON glances sideways at her hand", dist: "close",
  ce: "none", li: ["warm", "one flat oval of warm light on the wall behind the two of them"], cx: "the red fight vs a quiet warm floor",
  sz: "MEDIUM", an: "EYE", w: "STREET", m: "CLEAN", wh: "on the hall floor by the front door",
  L: "the front door, a line drawing", C: "SON sitting on the floor, large, knees up", R: "MOM sitting down next to him, large, one mitten hand open on the floor",
  a: "SON sits on the hall floor with his knees up; MOM sits down next to him by the front door and rests one open mitten hand on the floor beside his.",
  pf: "SON: eyes tired and red-rimmed, eyebrows soft and tilted, mouth a flat tired line, head resting on his knees, both mitten hands loose round his knees, posture curled, pupils sliding toward MOM's hand. MOM: eyes soft, eyebrows gently lifted, mouth a patient smile curve, head tilted toward him, one mitten hand open on the floor, posture settled beside him, pupils on SON.",
  mv: ["PULL_OUT", "quietly", "slow pull out"], dv: "CONTEXT",
  y: "After the colour stage the film returns to white; the warmth is carried by a flat light shape." });
// an insert inside line 14 — a second image cut in on the word: the two mitten hands, side by side
I(14, { in: "waits", sc: "The hall, later", t: "Q", r: "Mom, Son", p: [], h: "FIGURE", hr: "Mom",
  ft: "Hope — the hand is there if he wants it.", ln: "detail",
  idea: "Only the two mitten hands on the floor, MOM's open and waiting, SON's an inch away.",
  alt: ["MOM's face waiting (the hands say it more quietly)", "the two figures again (no new information)"],
  ia: "MOM's open mitten hand waits on the floor → SON's mitten hand edges toward it", dist: "close",
  ce: "none", cx: "two figures → two hands", ip: "detail-insert",
  sz: "HANDS", an: "HIGH", w: "STREET", m: "CLEAN",
  L: "SON's mitten hand entering from the bottom left corner, edging closer", C: "the small gap of floor between the two hands", R: "MOM's open mitten hand entering from the bottom right corner, resting still",
  a: "MOM's open mitten hand rests still on the floor; SON's mitten hand edges toward it until only a small gap is left.",
  pf: "MOM: one open mitten hand resting still on the floor, palm up, waiting. SON: one mitten hand edging slowly toward hers, stopping a small gap away.", mv: ["PUSH_IN", "waits", "slow push in on the gap"], dv: "CONTEXT",
  y: "An insert is a new image inside one line — used here because a crop of S14 could not make the hands this large." });

// rung 3 — the aha: the stage turns yellow; a black word on the light field
F(15, { sc: "The hall, later", t: "H", r: "Son", p: [], h: "FACE", pk: true, pc: "YELLOW",
  ft: "A spark — he suddenly understands.", ln: "peak",
  idea: "SON jolts upright, eyes huge, as it finally clicks; the whole stage flashes yellow and OH! is lettered beside him.",
  alt: ["a light bulb over his head (a symbol)", "the same moment on white (the discovery deserves its colour)"],
  ce: "none", mk: ["a burst of short straight strokes around SON's raised head", "YELLOW"], cx: "a slumped boy → upright, eyes huge",
  tx: ["OH!", "suddenly", "BLACK", "in the open space to the right of SON's head", true],
  sz: "MEDIUM", an: "LOW", w: "IDEA", wh: "in open space",
  L: "SON sitting bolt upright, large, both mitten hands flat on the floor", C: "open space", R: "the word, clear of his head",
  a: "SON jolts bolt upright with both mitten hands flat on the floor as it finally clicks.",
  pf: "SON: eyes huge and round, eyebrows shot up high, mouth a big open oval, head lifted sharply, both mitten hands flat on the floor, posture bolt upright, pupils on the space ahead of him.",
  st: "RESULT", mv: ["SHAKE", "suddenly", "a short jolt as the stage turns yellow"], dv: "CONTEXT", sti: "the yellow stage and the word land together; the insert brings the face",
  y: "Discovery is yellow for the whole video; on the light yellow field the word and the marks turn black so they read." });
// the sudden close-up of the aha, on pure white — an insert, because a crop of S15 would leave his face on the yellow field
I(15, { in: "clicks", sc: "The hall, later", t: "H", r: "Son", p: [], h: "FACE",
  ft: "The jolt of understanding, up close.", ln: "peak-close-up",
  idea: "SON's face alone on pure white, eyes huge, mouth open — the moment it clicks.",
  alt: ["a punch into S15 (his face would sit on the yellow field)", "his hands slapping the floor (the face says it better)"],
  look: "straight ahead, slightly up, at the open space on frame right", ctx: "follows S15 (the yellow stage, the same moment): the camera suddenly in on his face", ce: "none", cx: "a yellow stage → one face on white", ip: "snap-to-white",
  sz: "XCLOSE", an: "EYE", w: "IDEA", m: "WHITE",
  L: "white space", C: "SON's face, huge, filling the frame", R: "white space",
  a: "SON's face fills the frame, eyes huge and round as it clicks, one mitten hand flying up beside his cheek.",
  pf: "SON: eyes huge and round, eyebrows shot up high, mouth a big open oval, head lifted sharply, one mitten hand flying up into the frame beside his cheek, shoulders jerked up, pupils pressed up toward frame right.",
  mv: ["SNAP_ZOOM", "clicks", "a quick punch in"], dv: "CONTEXT",
  y: "A face close-up never sits on a colour field: the aha's close-up is an insert on white." });
};
