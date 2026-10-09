// Smoke-test dictionaries for compiler v19 — a tiny video that exercises every mood, shot type and plan field.
module.exports = {
PROJECT: { title: "The Parent Code — Smoke test: I'm fine", runtimeSec: 48 },

ROLE: {
  "Mom": { age: "adult", ref: true, hair: "bun", wear: [], text: "MOM (adult — the attached MOM reference images): the taller figure. Solid black hair parted softly at the centre so it meets the forehead in a small point, framing the round face down past the ears, with one thin strand hanging below each ear toward the jaw, and one round bun on top of the head marked with two or three thin curved lines. Small half-round ears show at eye level. No accessories. A full-grown adult woman with long arms and legs — her head the same size and shape as in her reference." },
  "Son": { age: "teen", ref: true, hair: "spiky", wear: [], text: "SON (teenager — the attached SON reference images): clearly shorter than MOM, lean, with his larger-looking head exactly as in the reference. Solid black messy spiky hair in jagged pointed clumps: a fringe of pointed tips falling over the forehead to just above the eyebrows, spiky tips sticking out at the sides above the ears. The face is round, a touch taller than wide; small half-round ears. No accessories." },
  "Little Son": { age: "child", ref: false, from: "Son", sameAs: "Son", hair: "spiky", short: "his size", wear: [], change: "his size only — SON at six years old with exactly the same messy spiky black hair and face, and a young child's body whose head top reaches only about halfway up MOM's standing height", text: "LITTLE SON (SON at six, seen only in a memory — drawn from the attached SON reference, changing only his size): exactly SON's solid black messy spiky hair with the pointed fringe and the spiky tips above the ears, and the same round face; a young child whose head top reaches only about halfway up MOM's standing height, with short arms and legs. No accessories, no clothing — a bare thin black line body with no fill." },
},

EDIT_WHO: { Mom: "MOM is the woman with black hair in a round bun on top", Son: "SON is the teenage boy with messy spiky black hair", "Little Son": "LITTLE SON is the small six-year-old boy with the same messy spiky black hair as SON" },

SET: {},

// the chapter's emotional colour for its PEAK frames (field + the deeper tone for outlines on it)
CHAPTER: {
  "01": { look: "deep indigo", emo: { field: ["deep indigo", "#4A4E8C"], floor: ["dark indigo", "#363A6E"] } },
},

// v19 worlds: outline pieces only; a piece is drawn only where the frame names it
WORLD: {
  "KITCHEN": { kind: "INDOOR", label: "kitchen", parts: [
    ["table", "\\btable\\b", "in the CENTRE one small round table on a single leg"],
    ["chair", "\\bchairs?\\b|\\bsits?\\b|\\bsitting\\b|\\bseated\\b", "one plain chair for each person sitting, and no other chairs"],
    ["doorway", "\\bdoorway\\b", "at the RIGHT one open doorway, drawn as a plain door frame"],
  ] },
  "LIVING": { kind: "INDOOR", label: "living room", parts: [
    ["sofa", "\\bsofa\\b", "one long low sofa with round armrests and one plain seat cushion along its length"],
  ] },
  "LANDING": { kind: "INDOOR", label: "upstairs landing", parts: [
    ["door", "\\bdoor\\b", "in the CENTRE one plain closed bedroom door with a thin frame and one small round knob"],
  ] },
  "PARK": { kind: "OUTDOOR", label: "park", parts: [
    ["bench", "\\bbench\\b", "one plain park bench"],
  ] },
},

PROP: {
  "PHONE": { name: "THE PHONE", hex: "#00B3B8", colour: "turquoise", part: "THE PHONE's turquoise (#00B3B8) case", danger: false, nouns: ["phone"], text: "THE PHONE: one slim rectangular smartphone in a flat turquoise (#00B3B8) case with rounded corners and one small round camera dot at its top corner; its screen one plain dark panel with no picture and no words." },
  "MUG": { name: "THE MUG", hex: "#E07A2E", colour: "warm amber", danger: false, nouns: ["mug", "tea"], text: "THE MUG: one plain round mug in flat warm amber (#E07A2E) with one round handle, and two short wavy ink lines of steam above it." },
},

OVERLAY: {},

STORY: { idea: "Connection with a teenager comes from staying close, not from asking more.", arc: "worry → too many questions → he retreats → she simply sits beside him → he comes to her", ending: "He sits down next to her: the door opening a crack." },
PLAN: [
  { sequence: "01 I'm fine", purpose: "Show the 'I'm fine' moment, the question flood, and the quiet that brings him back", feel: "recognition, then hope", mood: "CLEAN", metaphor: "the door" },
],
MOTIFS: [
  { key: "PHONE", meaning: "his exit from the conversation — later put away face down", arc: ["held up as a wall (S5)", "face down on the table (S13)"] },
],
KEY_LINES: ["S11", "S12"],
};
