// v19 test script — "The car ride" (written for testing only, not a Parent Code script). It checks that the v19 system
// handles a topic far from "Seven Things": new characters (LILY, GRANDMA, COACH, YOUNG MOM as MOM at another age), new
// places (the car, the road, the football pitch), a NIGHT drive with its face close-ups on WHITE, a MEMORY, a PEAK, a WORD
// frame, a recurring object that changes meaning, humour, and every shot type.
module.exports = {
PROJECT: { title: "The Parent Code — test script: The car ride (v19 generality test, not for publishing)", runtimeSec: 50 },

ROLE: {
  "Mom": { age: "adult", ref: true, hair: "bun", wear: [], text: "MOM (adult — the attached MOM reference images): the taller figure. Solid black hair parted softly at the centre so it meets the forehead in a small point, framing the round face down past the ears, with one thin strand hanging below each ear toward the jaw, and one round bun on top of the head marked with two or three thin curved lines. Small half-round ears show at eye level. No accessories. A full-grown adult woman with long arms and legs — her head the same size and shape as in her reference." },
  "Son": { age: "teen", ref: true, hair: "spikes", wear: [], text: "SON (teenager — the attached SON reference images): clearly shorter than MOM, lean, with his larger-looking head exactly as in the reference. Solid black messy spiky hair in jagged pointed clumps: a fringe of pointed tips falling over the forehead to just above the eyebrows, spiky tips sticking out at the sides above the ears. The face is round, a touch taller than wide; small half-round ears. No accessories." },
  "Lily": { short: "her hair", age: "teen", ref: false, from: "Son", hair: "braid", wear: [], change: "her hair — solid black hair pulled smooth into one long thick braid hanging forward over one shoulder, instead of SON's hair", text: "LILY (a teenage girl, GRANDMA's granddaughter — drawn from the attached SON reference, changing only her hair): solid black hair pulled smooth into one long thick braid hanging forward over one shoulder; a lean teenager about SON's height. No clothing — a bare thin black line body with no fill." },
  "Grandma": { short: "her hair, her glasses and her height", age: "adult", ref: false, from: "Mom", hair: "curls", wear: [{ item: "round glasses", hex: "#3F444C" }], change: "her hair — a short rounded cap of tight solid black curls close to the head, instead of MOM's hair — one pair of small round glasses with thin graphite (#3F444C) frames around the big white eye circles, pupils always visible — and a height a little shorter than MOM, her standing line curving slightly forward", text: "GRANDMA (LILY's grandmother — drawn from the attached MOM reference, changing only her hair, her glasses and her height): a short rounded cap of tight solid black curls close to the head; one pair of small round glasses with thin graphite (#3F444C) frames around the big white eye circles, the pupils always visible inside them; a full-grown older woman a little shorter than MOM, her standing line curving slightly forward. No clothing — a bare thin black line body with no fill." },
  "Coach": { short: "his hair, his cap and his height", age: "adult", ref: false, from: "Son", hair: "cap", wear: [{ item: "baseball cap", hex: "#3F4A5C" }], change: "one plain dark slate (#3F4A5C) baseball cap with a short curved peak facing forward, its peak sitting above the eyebrows so the eyes and brows stay fully visible, with short solid black hair showing below it at the sides and back, instead of SON's hair — and an adult height a little taller than MOM", text: "COACH (LILY's football coach — drawn from the attached SON reference, changing only his hair, his cap and his height): one plain dark slate (#3F4A5C) baseball cap with a short curved peak facing forward, the peak above the eyebrows so the eyes and brows stay fully visible, short solid black hair showing below it at the sides and back; a full-grown adult a little taller than MOM. No clothing — a bare thin black line body with no fill." },
  "Young Mom": { short: "her hair", age: "teen", ref: false, from: "Son", sameAs: "Mom", hair: "bun", wear: [], change: "her hair — exactly MOM's solid black hair, parted softly at the centre and framing the face, with one round bun on top, instead of SON's hair — the same person as MOM at sixteen, with a teenager's lean build", text: "YOUNG MOM (MOM at sixteen, seen only in a memory — drawn from the attached SON reference, changing only her hair): exactly MOM's solid black hair parted softly at the centre and framing the round face, with one round bun on top marked with two or three thin curved lines; a lean teenager about SON's height. No clothing — a bare thin black line body with no fill." },
},

EDIT_WHO: {
  Mom: "MOM is the woman with black hair in a round bun on top",
  Son: "SON is the teenage boy with messy spiky black hair",
  Lily: "LILY is the teenage girl with one long black braid over her shoulder",
  Grandma: "GRANDMA is the older woman with short tight black curls and small round glasses",
  Coach: "COACH is the man in a dark baseball cap",
  "Young Mom": "YOUNG MOM is the teenage girl with MOM's black bun",
},

SET: {},

CHAPTER: {
  "01": { look: "storm blue", emo: { field: ["storm blue", "#3F5FA8"], floor: ["deep storm blue", "#2F4682"] } },
},

WORLD: {
  "CAR": { kind: "INDOOR", label: "car", parts: [
    ["windscreen", "\\bwindscreen\\b", "one wide windscreen frame drawn as a thin rounded rectangle"],
    ["wheel", "\\bsteering wheel\\b", "one round steering wheel"],
    ["seats", "\\bseats?\\b", "two plain front seat backs"],
    ["dashboard", "\\bdashboard\\b", "one long plain dashboard line"],
    ["window", "\\bside window\\b", "one side window drawn as a thin rounded frame"],
  ] },
  "ROAD": { kind: "OUTDOOR", label: "road", parts: [
    ["road", "\\broad\\b", "one long straight road drawn as two thin lines running to the horizon"],
    ["car", "\\bsmall car\\b", "one small car seen from the side, drawn as a simple rounded outline with two windows and two round wheels"],
    ["trees", "\\btrees?\\b", "two plain round trees far off"],
  ] },
  "PITCH": { kind: "OUTDOOR", label: "football pitch", parts: [
    ["goal", "\\bgoal\\b", "one plain goal frame far off"],
    ["bench", "\\bbench\\b", "one plain bench"],
    ["fence", "\\bfence\\b", "one low plain fence line"],
  ] },
},

PROP: {
  "CAR": { name: "THE CAR", hex: "#F2B705", colour: "sunflower yellow", danger: false, nouns: ["car"], part: "THE CAR's sunflower yellow (#F2B705) body", lineText: "THE CAR: a small rounded car seen from the side, drawn in bold black line with white fill, with two windows and two round wheels.", text: "THE CAR: a small rounded car seen from the side, its body in flat sunflower yellow (#F2B705), with two plain white windows and two round black wheels." },
  "RADIO": { small: true, name: "THE RADIO DIAL", hex: "#E8A317", colour: "amber", danger: false, nouns: ["radio"], text: "THE RADIO DIAL: one round car-radio dial in flat amber (#E8A317) with one short black pointer line, set into the dashboard." },
},

OVERLAY: {},

STORY: {
  idea: "Teenagers often talk most where nobody has to look at them; a parent who keeps listening without fixing makes that space safe.",
  arc: "the car as a place to talk → Lily's silence → Grandma turns the radio down → the news → the parent who jumps in → Grandma who doesn't → Lily keeps talking",
  ending: "MOM tries it with SON: eyes on the road, and he keeps talking.",
},
PLAN: [
  { sequence: "01 The car ride", purpose: "Show why the car works, then the grandmother who simply listens", feel: "recognition, a laugh, then quiet relief", mood: "CLEAN", metaphor: "none — real moments carry it; THE RADIO DIAL returns with a new meaning" },
],
MOTIFS: [
  { key: "RADIO", meaning: "making room to talk", arc: ["turned down so LILY can speak (S9)", "turned down in the memory, a generation earlier (S10)", "alone on white: what mattered was the space, not the answer (S17)"] },
  { key: "CAR", meaning: "a safe place to talk", arc: ["waiting at the pitch (S6)", "alone on the night road (S15)"] },
],
KEY_LINES: ["S11", "S14", "S18"],
};
