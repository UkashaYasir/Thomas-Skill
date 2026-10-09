// Cast lineup test for "Seven Things" (v19): render these frames once, with the MOM and SON references attached, to check
// every character design (references/cast-design-v19.md §4) before the video's frames are generated. Test only — not a video.
module.exports = {
PROJECT: { title: "The Parent Code — Seven Things cast lineup (test renders, not a video)", runtimeSec: 12 },

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
},

PROP: {},

OVERLAY: {},

STORY: {
  idea: "A render test: every Seven Things character side by side, so the designs are checked before production.",
  arc: "the whole cast from the front → BOSS's new design up close → the whole cast from behind",
  ending: "Every character reads at a glance; nobody is bald; no two hair outlines alike.",
},
PLAN: [
  { sequence: "00 Cast lineup", purpose: "Check every character design in one row, close, and from behind", feel: "neutral and clear", mood: "WHITE", metaphor: "none" },
],
MOTIFS: [],
KEY_LINES: ["S1"],
};
