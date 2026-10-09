// Cast lineup test — render before production (references/cast-design-v19.md §4).
module.exports = ({ seg, F, E, Q }) => {
seg("00 Cast lineup");
const calm = n => `${n}: eyes open and calm, eyebrows relaxed and level, mouth a gentle closed smile, head level, both mitten hands relaxed a little away from the sides, posture standing upright and easy, pupils looking toward the person beside them.`;
F(1, { sc: "Lineup, front", t: "S", r: "Mom, Son, Little Boy, Dad, Kevin, Sarah, Boss", p: [], h: "FIGURE", hr: "Mom",
  ft: "Clarity — every person reads at a glance.", ln: "cast-check",
  idea: "The whole cast in one row from the front, feet on one ground line, a little apart, so hair outlines, heights and accessories can be compared.",
  alt: ["one character per frame (loses the height comparison)", "the cast inside a room (the room would hide the outlines)"],
  ia: "SON glances up at MOM beside him → MOM smiles down at him; the others stand relaxed, glancing at their neighbours", dist: "close",
  ce: "none", cx: "a plain row against white: nothing but the designs",
  sz: "WIDE", an: "SQUARE", w: "HALL", m: "WHITE", wh: "",
  L: "MOM, small, full height, then SON beside her, clearly shorter, then LITTLE BOY, a young child whose head reaches about halfway up MOM's height", C: "DAD, small, full height, a little taller than MOM, then KEVIN, standing very straight", R: "SARAH, small, full height, the same height as MOM, then BOSS, a little taller than MOM",
  a: "The seven characters stand in one row on one thin ground line, front view, a little apart, arms a little away from their sides: from left to right MOM, SON, LITTLE BOY, DAD, KEVIN, SARAH and BOSS.",
  pf: [calm("MOM"), calm("SON"), calm("LITTLE BOY"), calm("DAD"), calm("KEVIN"), calm("SARAH"), calm("BOSS")].join(" "),
  mv: ["HOLD", "", "hold"], dv: "CONTEXT", sti: "a test render: everyone holds still",
  y: "One render checks every hair outline, height and accessory against MOM and SON." });
F(2, { sc: "Lineup, close", t: "E", r: "Boss", p: [], h: "FACE", fa: "LARGE",
  ft: "A check — the new face holds a strong expression.", ln: "cast-check",
  idea: "BOSS up close, surprised, so the flat-top, the tie and the face construction can be checked at a large size.",
  alt: ["BOSS angry (the surprise shape tests the eyebrows and mouth better)", "BOSS in profile (kept for the row from behind)"],
  look: "toward the left, at someone just out of frame", ctx: "follows the lineup S1, where BOSS stands at the right end of the row", ce: "none", cx: "a small row → one large face",
  sz: "CLOSE", an: "EYE", w: "HALL", m: "WHITE", wh: "",
  L: "open white space on the side he looks", C: "BOSS's face and the top of his shoulders, large, a little right of centre, the knot of his tie just showing below", R: "a little open white space",
  a: "BOSS's head jerks back in surprise, one mitten hand rising beside his face.",
  pf: "BOSS: eyes wide open, eyebrows shooting up high, mouth a round open shape, head jerking back a little, one mitten hand rising open beside his face, shoulders lifting, pupils on the left.",
  mv: ["HOLD", "", "hold"], dv: "SCALE_SHIFT", sti: "a test render",
  y: "The redesigned BOSS must hold a strong expression up close." });
F(3, { sc: "Lineup, behind", t: "S", r: "Mom, Son, Little Boy, Dad, Kevin, Sarah, Boss", p: [], h: "FIGURE", hr: "Mom",
  ft: "Clarity — everyone is still recognisable from behind.", ln: "cast-check",
  idea: "The same row seen from behind: the hair outlines alone must tell who is who.",
  alt: ["the row in profile (a second test if any outline is unclear from behind)"],
  ia: "SON leans his head toward MOM and looks at her → MOM looks back at him and rests a hand on his shoulder; the others stand still, facing away from us", dist: "close",
  ce: "none", cx: "the front row → the same row from behind",
  sz: "WIDE", an: "EYE", w: "HALL", m: "WHITE", wh: "",
  L: "the back of BOSS's head and body, small, full height, then the back of SARAH's head with its long ponytail", C: "the back of KEVIN's head, then the back of DAD's head", R: "the back of LITTLE BOY's head, then the back of SON's head, then the back of MOM's head with her bun",
  a: "The seven characters stand in one row on one thin ground line, seen from behind, a little apart; from left to right BOSS, SARAH, KEVIN, DAD, LITTLE BOY, SON and MOM. SON leans his head toward MOM, and MOM rests one mitten hand on his shoulder.",
  pf: ["MOM", "SON", "LITTLE BOY", "DAD", "KEVIN", "SARAH", "BOSS"].map(n => `${n}: seen from behind, head level, both mitten hands relaxed at the sides, posture standing upright.`).join(" "),
  st: "RESULT", mv: ["HOLD", "", "hold"], dv: "CONTEXT", sti: "a test render: everyone holds still",
  y: "The silhouette test from cast-design-v19.md: hair outlines alone tell the cast apart." });
};
