// v19 worked example — "Seven Things Your Child Can't Tell You", lines 1–43 (the cold open and chapter one), re-planned
// with Thomas's direction of 5 Oct 2026 (references/v19-principles.md). The script lines are unchanged; the pictures are new.
module.exports = {
PROJECT: { title: "The Parent Code — Seven Things Your Child Can't Tell You (v19 sample, lines 1–43)", runtimeSec: 95 },

// The whole Seven Things cast, designed with references/cast-design-v19.md (BOSS redesigned: a neat flat-top instead of the
// old round bald head). Characters who appear after line 43 are here so the lineup render can check them now.
ROLE: {
  "Mom": { age: "adult", ref: true, hair: "bun", wear: [], text: "MOM (adult — the attached MOM reference images): the taller figure. Solid black hair parted softly at the centre so it meets the forehead in a small point, framing the round face down past the ears, with one thin strand hanging below each ear toward the jaw, and one round bun on top of the head marked with two or three thin curved lines. Small half-round ears show at eye level. No accessories. A full-grown adult woman with long arms and legs — her head the same size and shape as in her reference." },
  "Son": { age: "teen", ref: true, hair: "spikes", wear: [], text: "SON (teenager — the attached SON reference images): clearly shorter than MOM, lean, with his larger-looking head exactly as in the reference. Solid black messy spiky hair in jagged pointed clumps: a fringe of pointed tips falling over the forehead to just above the eyebrows, spiky tips sticking out at the sides above the ears. The face is round, a touch taller than wide; small half-round ears. No accessories." },
  "Little Boy": { short: "his size", age: "child", ref: false, from: "Son", sameAs: "Son", hair: "spikes", wear: [], change: "his size only — SON at seven years old, with exactly the same messy spiky black hair and the same face, and a young child's body whose head top reaches only about halfway up MOM's standing height, with short arms and legs", text: "LITTLE BOY (SON at seven years old — drawn from the attached SON reference, changing only his size): exactly SON's solid black messy spiky hair with the pointed tips over the forehead and above the ears, and the same round face; a young child whose head top reaches only about halfway up MOM's standing height, with short arms and legs. No clothing — a bare thin black line body with no fill." },
  "Dad": { short: "his hair, his glasses and his height", age: "adult", ref: false, from: "Son", hair: "side parting", wear: [{ item: "glasses", hex: "#3F4A5C" }], change: "his hair — short flat solid black hair cut neatly with a clean side parting and a smooth rounded top, instead of SON's hair — one pair of small rectangular glasses with thin dark slate (#3F4A5C) frames around the big white eye circles, pupils always visible — and an adult height a little taller than MOM", text: "DAD (MOM's partner — drawn from the attached SON reference, changing only his hair, his glasses and his height): short flat solid black hair, neatly cut with a clean side parting and a smooth rounded top; one pair of small rectangular glasses with thin dark slate (#3F4A5C) frames around the big white eye circles, the pupils always visible inside them; a full-grown adult a little taller than MOM, with long arms and legs. No clothing — a bare thin black line body with no fill." },
  "Kevin": { short: "his hair, a bow tie and his height", age: "adult", ref: false, from: "Son", hair: "wave", wear: [{ item: "bow tie", hex: "#3E7A70" }], change: "his hair — glossy solid black hair combed into one smooth wave up and back from the forehead, instead of SON's hair — one small neat bow tie in muted teal-green (#3E7A70) at the neck line with no collar or shirt — and an adult height a little taller than MOM, standing very straight", text: "KEVIN (the perfect cousin, a young adult — drawn from the attached SON reference, changing only his hair, a bow tie and his height): solid black hair combed into one smooth wave up and back from the forehead; one small neat bow tie in muted teal-green (#3E7A70) sitting at the neck line with no collar or shirt; a little taller than MOM, standing very straight with his chin up. No clothing — a bare thin black line body with no fill." },
  "Boss": { short: "his hair, his tie and his height", age: "adult", ref: false, from: "Son", hair: "flat-top", wear: [{ item: "tie", hex: "#3C4A6B" }], change: "his hair — short solid black hair cut into a neat flat-top, square and level on top with short straight sides, instead of SON's hair — one narrow dark navy (#3C4A6B) tie hanging from the neck line with no collar or shirt — and an adult height a little taller than MOM", text: "BOSS (MOM's boss — drawn from the attached SON reference, changing only his hair, his tie and his height): short solid black hair cut into a neat flat-top, square and level on top with short straight sides; one narrow dark navy (#3C4A6B) tie hanging straight down from the neck line with no collar or shirt; a full-grown adult a little taller than MOM, standing straight. No clothing — a bare thin black line body with no fill." },
  "Sarah": { short: "her hair", age: "adult", ref: false, from: "Mom", hair: "ponytail", wear: [], change: "her hair — solid black hair pulled back smooth into one long, high, perfectly straight ponytail hanging behind her head to shoulder height, instead of MOM's hair", text: "SARAH (MOM's colleague — drawn from the attached MOM reference, changing only her hair): solid black hair pulled back smooth into one long high straight ponytail hanging behind her head down to shoulder height, with no loose strands; the same height as MOM. No clothing — a bare thin black line body with no fill." },
},

EDIT_WHO: {
  Mom: "MOM is the woman with black hair in a round bun on top",
  Son: "SON is the teenage boy with messy spiky black hair",
  "Little Boy": "LITTLE BOY is the small seven-year-old boy with the same messy spiky black hair as SON",
  Dad: "DAD is the man with flat side-parted black hair and small rectangular glasses",
  Kevin: "KEVIN is the young man with one smooth wave of black hair and a small bow tie",
  Boss: "BOSS is the man with a neat square black flat-top and a narrow navy tie",
  Sarah: "SARAH is the woman with one long high black ponytail",
},

SET: {},

// each chapter's emotional colour, used only on its marked peak frames (pk)
CHAPTER: {
  "00": { look: "storm violet", emo: { field: ["storm violet", "#6F5C9E"], floor: ["deep storm violet", "#54457D"] } },
  "01": { look: "deep teal", emo: { field: ["deep teal", "#2F7F86"], floor: ["dark teal", "#235F64"] } },
},

// outline places: a piece is drawn only in the frames that name it
WORLD: {
  "HALL": { kind: "INDOOR", label: "front hall", parts: [
    ["front door", "\\bfront door\\b", "one plain front door with a thin frame and one small round knob"],
    ["stairs", "\\bstairs?\\b|\\bstaircase\\b|\\bbanister\\b", "a straight staircase of plain steps with one thin banister rail"],
    ["hall table", "\\bhall table\\b", "one narrow hall table on four thin legs"],
  ] },
  "KITCHEN": { kind: "INDOOR", label: "kitchen", parts: [
    ["table", "\\btable\\b", "one small round table on a single leg"],
    ["chair", "\\bchairs?\\b|\\bsits?\\b|\\bsitting\\b|\\bseated\\b", "one plain chair for each person sitting, and no other chairs"],
    ["counter", "\\bcounter\\b", "one long plain kitchen counter with a flat top"],
  ] },
  "SON_ROOM": { kind: "INDOOR", label: "bedroom", parts: [
    ["bed", "\\bbed\\b|\\bmattress\\b", "one low single bed with a plain blanket and one pillow"],
    ["door", "\\bdoor\\b|\\bdoorway\\b", "one plain bedroom door with a thin frame and one small round knob"],
  ] },
  "LIVING": { kind: "INDOOR", label: "living room", parts: [
    ["sofa", "\\bsofa\\b", "one long low sofa with round armrests and one plain seat cushion along its length"],
    ["doorway", "\\bdoorway\\b", "one open doorway drawn as a plain door frame"],
  ] },
},

PROP: {
  // the spine object Thomas liked ("The jar concept is a good example") — it returns only when its meaning changes
  "JAR": { part: "THE JAR's tangerine-orange (#F57C00) lid", rest: "the glass stays clear and pale", name: "THE JAR", hex: "#F57C00", colour: "tangerine orange", danger: false, nouns: ["jar"], lineText: "THE JAR: one clear glass jar about as tall as SON's head, drawn in bold black line with a white fill, with one big wide screw lid marked with five short upright ridges round its rim; one small dark tangled knot sits inside the glass.", text: "THE JAR: one clear glass jar about as tall as SON's head, drawn with the same bold black outline as the characters, a very pale blue-white glass fill (#EEF6F9) and two short white shine dashes on its side, with one big wide screw lid in flat tangerine orange (#F57C00) — the lid about a third of the jar's height — marked with five short upright ridges round its rim; one small dark tangled knot sits inside the glass." },
  "MILK_GLASS": { small: true, part: "the teal (#00A6A0) stripe of THE MILK GLASS", rest: "the glass stays clear and the milk stays white", name: "THE MILK GLASS", hex: "#00A6A0", colour: "teal", danger: false, nouns: ["milk", "glass"], text: "THE MILK GLASS: one small clear tumbler with one teal (#00A6A0) stripe round its middle, holding plain white milk." },
  "PHONE": { small: true, part: "THE PHONE's turquoise (#00B3B8) case", name: "THE PHONE", hex: "#00B3B8", colour: "turquoise", danger: false, nouns: ["phone"], text: "THE PHONE: MOM's slim rectangular smartphone in a flat turquoise (#00B3B8) case with rounded corners and one small round camera dot at its top corner; its screen one plain dark panel with no picture and no words." },
  "TEST": { small: true, part: "the dark ink-blue (#2453D8) circle on THE TEST", rest: "the paper stays white", name: "THE TEST", hex: "#2453D8", colour: "dark ink blue", danger: false, nouns: ["test", "paper"], text: "THE TEST: one sheet of white school paper folded in half, showing a few short grey lines and one big hand-drawn circle in dark ink blue (#2453D8) in its top corner — no letters or numbers." },
  "NOTE": { small: true, name: "THE NOTE", hex: "#F2D633", colour: "lemon yellow", danger: false, nouns: ["note", "plan"], text: "THE NOTE: one square sticky note in flat lemon yellow (#F2D633) with three short scribbled black lines on it — no letters or numbers." },
  "FRIDGE": { part: "the bright violet (#7B4FD6) marker lines on THE FRIDGE door", rest: "the fridge and the papers stay white", name: "THE FRIDGE", hex: "#7B4FD6", colour: "bright violet", danger: false, nouns: ["fridge", "investigation", "marker"], lineText: "THE FRIDGE: one tall plain fridge drawn in bold black line with a white fill, its door covered with a few plain white papers held by small round magnets, joined by thin black marker lines.", text: "THE FRIDGE: one tall plain fridge drawn in bold black line with a white fill; its door is covered with a few plain white papers — a letter, a timetable grid, a small group photo drawn as tiny round heads — held by small round black magnets and joined by hand-drawn lines in bright violet (#7B4FD6) marker; no words, letters or numbers on any paper." },
  "WHITEBOARD": { part: "the raspberry (#E5457F) frame and easel of THE WHITEBOARD", rest: "the board itself stays white", name: "THE WHITEBOARD", hex: "#E5457F", colour: "raspberry", danger: false, nouns: ["whiteboard"], text: "THE WHITEBOARD: one big rectangular whiteboard on a three-legged easel, its thick frame and easel legs in flat raspberry (#E5457F), the board plain white with four small square boxes drawn on it in black marker, joined by short straight lines — no words, letters or numbers." },
},

OVERLAY: {},

STORY: {
  idea: "Children hide things not from distrust but from love: they are afraid of disappointing the parent. What they need first is company, not a fix.",
  arc: "the hug with a secret → the moment the parent forgot and the child didn't → hiding from love, not distrust → 'listen, not fix me' → the investigation → the whiteboard → the parent who simply sits down",
  ending: "Chapter one ends with MOM sitting beside SON and SON setting THE JAR down between them: the first thing no longer hidden.",
},
PLAN: [
  { sequence: "00 Cold open", purpose: "Love and hiding in one picture; the forgotten moment the child kept; fear of disappointing", feel: "warmth with a twist, then recognition and a sting", mood: "CLEAN", metaphor: "THE JAR (the spine Thomas liked), used only where its meaning moves" },
  { sequence: "01 Listen, not fix me", purpose: "The question flood, the comic investigation, the adult mirror, then the parent who sits down", feel: "laughter of recognition turning into relief", mood: "CLEAN", metaphor: "the parent's tools (phone, note, fridge-door board, whiteboard) put down one by one" },
],
MOTIFS: [
  { key: "JAR", meaning: "what the child keeps inside, and whether it feels safe to show it", arc: ["hidden behind SON's back during the hug (S2)", "held in his lap under the table while he swallows the words (S17)", "set down on the table between them (S43)"] },
  { key: "MILK_GLASS", meaning: "a small moment the parent forgot and the child kept", arc: ["tipped over in the memory (S7)", "standing upright in front of the teenager today (S9)"] },
  { key: "PHONE", meaning: "the parent's busy answer instead of attention", arc: ["at MOM's ear in the memory (S5, S8)", "lifted to call the school (S27)", "turned face down on the table (S41)"] },
  { key: "NOTE", meaning: "the fix nobody asked for", arc: ["stuck on SON's hand (S28)", "pushed back across the table (S32)"] },
],
KEY_LINES: ["S2", "S9", "S14", "S34", "S43"],
};
