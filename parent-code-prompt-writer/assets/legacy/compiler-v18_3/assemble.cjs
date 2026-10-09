// Assembles the Parent Code build from template.jsx + dicts.cjs + segs/segNN.cjs
// usage: node assemble.cjs [out.jsx]
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = __dirname, OUT = path.resolve(process.argv[2] || path.join(ROOT, "out/build.jsx"));
const D = require("./dicts.cjs");
const SCRIPT = fs.readFileSync(path.join(ROOT, "script.txt"), "utf8").split("\n").map(s => s.replace(/\s+$/, "")).filter(s => s.length);
const J = v => JSON.stringify(v);
const SIZE = { WIDE: "wide shot", MEDWIDE: "medium-wide shot", MEDIUM: "medium shot", CLOSE: "close shot", XCLOSE: "extreme close-up", HANDS: "hands-only close shot", OBJECT: "object shot" };
const ANG = { EYE: "at eye level", LOW: "at a small child's height", HIGH: "from a little above head height", OTS: "over the shoulder", PROFILE: "from the side at eye level", SQUARE: "straight on at eye level" };
const CAM = { LOW: "CHILD_EYE", HIGH: "SLIGHTLY_ABOVE", OTS: "OTS" };
const TIERS = { S: "SIMPLE", E: "EMOTIONAL", H: "HOOK" };
const CLOSE = ["CLOSE", "XCLOSE", "HANDS", "OBJECT"];
const BG = m => ({ TENSE: "the background one flat {BGWALL} tone", SUNNY: "the background one flat {BGWALL} tone", DARK: "night navy", ICY: "a faded grey memory", WHITE: "clean white", NEUTRAL: "a subtle soft beige behind the characters", ACCENT: "one subtle soft colour behind the characters, everything else white" })[m] || "the place in its own soft colours, quiet furniture";
const cap = s => s[0].toUpperCase() + s.slice(1);
const art = s => (/^[aeiou]/i.test(s) ? "an " : "a ") + s;

const B = [], E = [], Q = [], INS = [];
const masters = {};
let SEQ = "";
const api = {
  seg(name) { SEQ = name; },
  F(n, o) {
    const ref = "S" + n, size = o.sz, ang = o.an || "EYE";
    if (!SIZE[size]) throw new Error(ref + " bad size " + size);
    if (!ANG[ang]) throw new Error(ref + " bad angle " + ang);
    const s = SIZE[size], a = ANG[ang], where = (o.m === "WHITE" && ["CLOSE", "XCLOSE"].includes(size) && o.r) ? "in clean white space" : (o.wh || ""); // Version 7: a pure-white close-up names no room
    const W = D.WORLD[o.w]; if (!W) throw new Error(ref + " unknown world " + o.w);
    const pic = o.eyes ? `an eyes-only extreme close-up at eye level ${where} — ${o.L}; ${o.C}; ${o.R}.` : `${art(s)} ${a} ${where} — ${o.L}; ${o.C}; ${o.R}.`;
    const framing = o.eyes ? `Eyes-only extreme close-up at eye level, ${where}, horizon level: at the left ${o.L}; in the centre ${o.C}; at the right ${o.R}.` : `${cap(s)} ${a}, ${where}, horizon level: at the left ${o.L}; in the centre ${o.C}; at the right ${o.R}.`;
    const roles = o.r || "No characters";
    let master = null;
    if (o.ms === true) { master = ref; if (W.set) masters[W.set] = ref; }
    else if (typeof o.ms === "string") master = o.ms;
    else if (o.ms !== false && W.set && !CLOSE.includes(size)) { if (masters[W.set]) master = masters[W.set]; else { masters[W.set] = ref; master = ref; } }
    const b = {
      n, ref, sequence: SEQ, scene: o.sc, tier: TIERS[o.t] || o.t, fn: o.fn || (o.mf ? "CONCEPT" : "STORY"),
      roles, props: o.p || [], hero: o.h,
      feel: o.fe, meaning: o.me,
      shotSize: size, angle: ang, face: o.fa || (["HANDS", "OBJECT"].includes(size) || roles === "No characters" ? "NONE" : "NORMAL"), scale: o.sl || "ORDINARY",
      framing, action: o.a, performance: o.pf || "",
      world: o.w, mood: o.m, peak: !!o.pk, stage: o.st || "", moment: o.mo || "",
      pop: o.pop ? { what: o.pop[0], on: o.pop[1], type: o.pop[2] || "ADD", motion: o.pop[3] || "pops in with a small bounce" } : null,
      move: o.mv ? { type: o.mv[0], on: o.mv[1] || "", note: o.mv[2] || "" } : { type: "HOLD", on: "", note: "hold still" },
      device: o.dv, reveal: o.rv ? { what: o.rv[0], on: o.rv[1], method: "MASK", cover: "", how: "", _surf: o.rv[2] || null, _at: o.rv[3] || "" } : null,
      link: o.ln || "", requiredText: "",
      picture: pic, map: `left — ${o.L}; centre — ${o.C}; right — ${o.R}.`, check: `${o.eyes ? "eyes-only extreme close-up" : s} ${a}, horizon level; left: ${o.L}; centre: ${o.C}; right: ${o.R}; ${o.m === "NEUTRAL" && /\{SKY\}/.test(W.text || W.head || "") ? "a subtle pale sky behind the characters" : !o.r && ["NEUTRAL", "ACCENT"].includes(o.m) ? BG(o.m).replace("behind the characters", "behind the story object") : BG(o.m)}.`,
      cam: o.cam !== undefined ? o.cam : (CAM[ang] || null),
    };
    if (master) b.master = master;
    if (o.mf) b.metaphor = o.mf;
    if (o.to) b.touch = o.to;
    if (o.sti) b.still = o.sti;
    if (o.y) b.why = o.y;
    if (o.pl) b.plain = o.pl;
    if (o.cr) b.colourReason = o.cr;
    if (o.fo) b.focus = o.fo;
    if (o.eyes) b.eyesOnly = true; // Version 7: eyes-only crop text replaces FACE SIZE
    if (o.hr) b.heroWho = o.hr; // Version 7: the hero face/figure when it is not the first-named role
    if (o.os) b.oneSided = o.os;
    if (o.na) b.noAnchor = true; // Version 7: drop the room's anchor piece in this frame
    if (o.px) { b.propText = {}; for (let i = 0; i < o.px.length; i += 2) b.propText[o.px[i]] = o.px[i + 1]; } // Version 7: px: ["KEY", "full object text for this frame"] // Version 7: a one-sided beat replaces the interaction rule // Version 6: "light" = the object is small on purpose (a drifting or shrinking bubble); "door" = the door is the story object
    if (o.kw) b.keyword = { word: o.kw[0], on: o.kw[1] };
    if (o.eo) b.editOnly = { seq: o.eo[0], from: o.eo[1] };
    if (!b.cam) delete b.cam;
    if (B.some(x => x.ref === ref)) throw new Error("duplicate " + ref);
    B.push(b);
  },
  E(ref, on, change) { if (E.some(e => e.ref === ref)) throw new Error("dup edit " + ref); E.push({ ref, on, change }); },
  Q(id, title, base, images) { Q.push({ id, title, base, images: images.map((im, i) => ({ i: i + 1, ...im })) }); },
};
const segs = fs.readdirSync(path.join(ROOT, "segs")).filter(f => /^seg\d\d\.cjs$/.test(f)).sort();
for (const f of segs) { const p = path.join(ROOT, "segs", f); delete require.cache[require.resolve(p)]; require(p)(api); }
B.sort((a, b) => a.n - b.n);
E.sort((a, b) => Number(a.ref.slice(1)) - Number(b.ref.slice(1)));
// Version 5 — set pieces by need: a piece of furniture is drawn only in the frames whose own action, placement, edits or
// sequence steps use it (close shots: their own action and placement only). The anchor piece is drawn in every wider shot.
for (const b of B) {
  const W = D.WORLD[b.world]; if (!W || !W.parts) continue;
  const close = !W.close && ["CLOSE", "XCLOSE"].includes(b.shotSize);
  const own = [b.action, b.map].join(" ");
  const more = close ? "" : [b.performance, ...E.filter(e => e.ref === b.ref).map(e => e.change), ...Q.flatMap(q => q.images.filter(i => i.ref === b.ref && i.change).map(i => i.change))].join(" ");
  const t = own + " " + more;
  b.pieces = W.parts.filter(p => new RegExp(p[1], "i").test(t)).map(p => p[0]);
}

// ── write blocks into the template ──
let src = fs.readFileSync(path.join(ROOT, "template.jsx"), "utf8");
function blockRange(lines, name) {
  const s = lines.findIndex(l => l.startsWith(`const ${name} = `)); if (s < 0) throw new Error("block " + name);
  if (/[\]}];\s*$/.test(lines[s]) && !/[\[{]\s*$/.test(lines[s])) return [s, s];
  let e = s + 1; while (!/^[\]}];\s*$/.test(lines[e])) e++; return [s, e];
}
function replaceBlock(name, text) { const lines = src.split("\n"); const [s, e] = blockRange(lines, name); lines.splice(s, e - s + 1, text); src = lines.join("\n"); }
const obj = (name, o) => `const ${name} = {\n` + Object.entries(o).map(([k, v]) => `  ${J(k)}: ${J(v)},`).join("\n") + "\n};";
const arr = (name, a) => `const ${name} = [\n` + a.map(v => "  " + J(v) + ",").join("\n") + "\n];";
const ORDER = ["n", "ref", "sequence", "scene", "tier", "fn", "roles", "props", "hero", "feel", "meaning", "shotSize", "angle", "face", "scale", "framing", "action", "performance", "world", "mood", "peak", "stage", "moment", "pop", "move", "device", "reveal", "link", "requiredText"];
function serBeat(b) {
  const L = [`    n: ${b.n}, ref: ${J(b.ref)},`, `    sequence: ${J(b.sequence)}, scene: ${J(b.scene)}, tier: ${J(b.tier)}, fn: ${J(b.fn)},`, `    roles: ${J(b.roles)}, props: ${J(b.props)}, hero: ${J(b.hero)},`,
    `    feel: ${J(b.feel)},`, `    meaning: ${J(b.meaning)},`, `    shotSize: ${J(b.shotSize)}, angle: ${J(b.angle)}, face: ${J(b.face)}, scale: ${J(b.scale)},`,
    `    framing: ${J(b.framing)},`, `    action: ${J(b.action)},`, `    performance: ${J(b.performance)},`, `    world: ${J(b.world)}, mood: ${J(b.mood)}, peak: ${J(b.peak)},`,
    `    stage: ${J(b.stage)},`, `    moment: ${J(b.moment)},`, `    pop: ${J(b.pop)},`, `    move: ${J(b.move)},`, `    device: ${J(b.device)},`, `    reveal: ${J(b.reveal)},`, `    link: ${J(b.link)},`, `    requiredText: ${J(b.requiredText)},`];
  Object.keys(b).filter(k => !ORDER.includes(k)).forEach(k => L.push(`    ${k}: ${J(b[k])},`));
  return "  {\n" + L.join("\n") + "\n  },";
}
const lc = s => s ? s.charAt(0).toLowerCase() + s.slice(1).replace(/\.$/, "") : "";
const sketch = b => { const e = E.find(x => x.ref === b.ref); return [b.ref, b.sequence, `${b.scene} [${b.world} · ${b.roles}]`, b.tier, `${b.shotSize}/${b.angle}/${b.face}/${b.scale}`, b.mood, `hero ${b.hero}`, b.stage, `feel: ${lc(b.feel)}`, `idea: ${b.meaning}`, `moment: ${b.moment || "—"}`, `pop: ${b.pop ? `${b.pop.what} ${b.pop.type} '${b.pop.on}'` : "—"}`, `move: ${b.move.type}`, `device: ${b.device}`, `edit: ${e ? `'${e.on}' ${e.change.split(". ")[0]}` : "—"}`].join(" | "); };

function writeAll(beats) {
  src = fs.readFileSync(path.join(ROOT, "template.jsx"), "utf8");
  // drop Video 05's planning notes comment
  const a = src.indexOf("/* ── PLANNING NOTES"); if (a >= 0) { const z = src.indexOf("*/", a); src = src.slice(0, a) + src.slice(z + 2); }
  src = src.replace(/\/\/ THE PARENT CODE — prompt build[^\n]*/, "// THE PARENT CODE — prompt build · Seven Things Your Child Can't Tell You (skill v18.3)");
  replaceBlock("PROJECT", `const PROJECT = {\n  title: ${J(D.PROJECT.title)},\n  runtimeSec: ${D.PROJECT.runtimeSec}, // 8:30 default until Muhammad's final VO timing — ${SCRIPT.length} lines ≈ ${(D.PROJECT.runtimeSec / SCRIPT.length).toFixed(1)} s per line\n};`);
  replaceBlock("ROLE", obj("ROLE", D.ROLE));
  replaceBlock("SET", obj("SET", D.SET));
  replaceBlock("CHAPTER", obj("CHAPTER", D.CHAPTER));
  replaceBlock("WORLD", obj("WORLD", D.WORLD));
  replaceBlock("PROP", obj("PROP", D.PROP));
  replaceBlock("OVERLAY", obj("OVERLAY", D.OVERLAY));
  replaceBlock("SCRIPT", arr("SCRIPT", SCRIPT));
  replaceBlock("STORY", obj("STORY", D.STORY));
  replaceBlock("PLAN", arr("PLAN", D.PLAN));
  replaceBlock("MOTIFS", arr("MOTIFS", D.MOTIFS) + "\n\n// The director's read (v18) — the first deliverable: written before any frame; every frame's `why` traces back to it.\nconst DIRECTOR_READ = " + J(D.DIRECTOR_READ) + ";\n// The five most powerful lines (each gets a composition used nowhere else) and the moments told as sequences.\nconst KEY_LINES = " + J(D.KEY_LINES) + ";\nconst HELD_MOMENTS = " + J([...new Set(Q.flatMap(s => s.images.map(i => i.ref)))]) + ";");
  replaceBlock("SKETCH", arr("SKETCH", beats.map(sketch)));
  replaceBlock("RAW_BEATS", "const RAW_BEATS = [\n" + beats.map(serBeat).join("\n") + "\n];");
  replaceBlock("INSERT_BEATS", "const INSERT_BEATS = [\n" + INS.map(serBeat).join("\n") + "\n];");
  replaceBlock("SEQUENCES", arr("SEQUENCES", Q));
  replaceBlock("EDIT_CUES", "const EDIT_CUES = [\n" + E.map(e => `  { ref: ${J(e.ref)}, on: ${J(e.on)}, change: ${J(e.change)} },`).join("\n") + "\n];");
  replaceBlock("EDIT_WHO", `const EDIT_WHO = ${J(D.EDIT_WHO)};`);
  replaceBlock("REVISIONS", `const REVISIONS = [\n  {batch: "Build 1 — 3 Oct 2026 · first full build of the video (skill v18.1)", entries: [{point: "All 232 lines built through the director's framework: director's read first, one-line why per frame, edits and sequences only where the story moves", refs: ["S1", "S34", "S94", "S192", "S232"]}]},\n  {batch: "Version 3 — 3 Oct 2026 · colour script v2 (Muhammad: the coloured backgrounds had gone monotonous)", entries: [{point: "Every room has its own hue and value — straw-yellow hall, sage kitchen, dusty-rose living room, denim-blue bedroom, heather landing, aqua office — and each calm mood now repaints it visibly (sunlit, evening, cool, dusk)", refs: ["S1", "S52", "S64", "S75", "S116"]}, {point: "ACCENT frames take their chapter's own accent colour (cornflower, mint, butter, lilac, sky, blush, duck-egg, lemon, dawn pink); inside a scene they keep the room's wall, so nothing flickers", refs: ["S44", "S104", "S131", "S190", "S221"]}, {point: "Every chapter peak on a different hue: deep sea teal, aqua, golden ochre, bold berry, spring green, storm violet; night navy and the frost-blue past unchanged", refs: ["S14", "S30", "S45", "S110", "S181", "S196"]}, {point: "Heroes kept far from their wall's hue: the frog memory on the light kitchen, the lime chair and the umbrella on their chapter accent, the milk glass now teal, the water bottle amber, the phone uncoloured under the falling face", refs: ["S69", "S127", "S167", "S9", "S139", "S80"]}]},\n  {batch: "Version 4 — 3 Oct 2026 · Thomas's contrast note: characters first", entries: [{point: "Every room is a subtle soft tint directly behind the white characters, with quiet tonal furniture one step deeper and near-white floors — never white behind a white character", refs: ["S2", "S10", "S12", "S52", "S116"]}, {point: "Rooms cut to the pieces the action needs: the bedroom keeps only the door, bed and jar shelf; no desk, chair, window, poster or rug; no hooks, wall pictures, plants or crayon drawings anywhere", refs: ["S10", "S64", "S177", "S22", "S34"]}, {point: "Background lines thinner and softer than the characters' outlines; the prompt sets the visual order: people and faces first, then the object, then the background", refs: ["S1", "S35", "S127"]}, {point: "Face close-ups on the strongest lines are pure white with nothing behind them; white idea frames with full figures or hands now sit on a soft beige", refs: ["S23", "S33", "S156", "S191", "S3", "S192"]}, {point: "Meaning colours kept but quieter furniture: night navy, storm violet and the chapter peaks; the past is now a faded grey memory", refs: ["S5", "S14", "S45", "S110", "S185", "S227"]}]},\n  {batch: "Version 5 — 3 Oct 2026 · less detail, the story object second", entries: [{point: "Set pieces by need: each room is its soft wall, its floor and one anchor piece (kitchen table, sofa, front door, bed, desk, landing door); any other piece is drawn only in frames whose own action, edits or sequence steps use it — 1.5 pieces per room frame on average, never more than 3", refs: ["S12", "S2", "S75", "S196", "S232"]}, {point: "Chairs only for the people sitting; counter drawn as a flat top on a plain block with no sink, taps, drawers or handles; fridge only where the story uses it", refs: ["S12", "S127", "S183"]}, {point: "Placement text no longer fills a third of the frame with furniture — the plain wall can be the third", refs: ["S5", "S15", "S158", "S178", "S218"]}, {point: "Room reference: keep the wall colour and the named pieces only, even if the attached master shows more", refs: ["S12", "S10", "S2"]}, {point: "OBJECT FOCUS in every frame with a story object: after the faces the eye goes straight to it — at least head-sized, plain wall behind it, fully visible, outlined like the characters; the jar gets a bold outline and a bigger lid", refs: ["S2", "S9", "S12", "S104", "S230"]}]},\n  {batch: "Version 6 — 3 Oct 2026 · review fixes before the skill update", entries: [{point: "Pure-white face close-ups no longer describe a room; three that need their furniture for the idea (interrogation desk, test on the table, back against the shut door) are back on soft beige", refs: ["S20", "S23", "S33", "S123", "S168", "S191"]}, {point: "The visual-order line now fits the frame: characters on a soft colour, a face alone on white, or an object with no characters", refs: ["S23", "S6", "S12"]}, {point: "Frames moved from white to soft beige no longer say white", refs: ["S29", "S85", "S86", "S122", "S142", "S192", "S202"]}, {point: "Object focus is lighter where smallness is the story; the door is the focus where it is the metaphor", refs: ["S8", "S57", "S59", "S64", "S65", "S66", "S67", "S208", "S226"]}, {point: "Detail leftovers removed (attic planks, picture frame, Sarah's desk on a plain field, honey floor, fridge as filler, extra chairs)", refs: ["S227", "S194", "S118", "S176", "S30", "S126"]}, {point: "Hands rise from the bottom edge, or the bottom corners for two people, so arms never stretch across the frame", refs: ["S7", "S42", "S48", "S159", "S175", "S223", "S231"]}, {point: "Hidden objects are turned toward us; four warm beats get a touch; the little boy gets a size cue", refs: ["S12", "S158", "S124", "S129", "S183", "S205", "S5"]}]},\n  {batch: "Version 7 — 4 Oct 2026 · full QA of every prompt (8 readers) and the error fixes", entries: [{point: "Hero colour names only the coloured part (the jar's lid, the mug's gold seams, the test's red circle, the bill's stamp…), so the rest of the object stays white or clear", refs: ["S2", "S146", "S168", "S78", "S30"]}, {point: "Eyes-only shots get their own crop text; pure-white close-ups name no room; one size per object (the SCALE line wins, small things stay small)", refs: ["S4", "S16", "S33", "S20", "S27", "S43"]}, {point: "Edits never repeat their base or contradict the next frame: edit-only bases now show the before state (S57, S59, S172); the keys stay in his hand; the umbrella stays closed until S167", refs: ["S57", "S59", "S172", "S185", "S166", "S137"]}, {point: "Staging fixed where a person and the thing they hold sat in different thirds, where a room piece moved, where SON was drawn taller than MOM, or where a gaze went into the lens", refs: ["S27", "S36", "S22", "S158", "S124", "S212"]}, {point: "One-sided beats say so instead of asking for a reaction; the hero face or figure is the right character; hands-only frames rise from the bottom edge", refs: ["S60", "S64", "S77", "S105", "S18", "S29"]}, {point: "Stop paddle teal instead of danger red; outdoor colour lines talk about sky and ground; no grins; plain walls allow the one story object hung on them", refs: ["S215", "S101", "S139", "S117", "S129"]}]},\n  {batch: "Version 8 — 4 Oct 2026 · after the first 15 renders, plus the picture-changing minor fixes", entries: [{point: "The counter is a bare flat top: no sink, tap or fridge (the S8 render drew them); kitchen frames add a sink, tap, cooker and cupboards to the avoid list", refs: ["S8"]}, {point: "All seven jars stay clear of SON's head; the table edge runs along the bottom of the close-up", refs: ["S15", "S13"]}, {point: "The little boy reads as seven: a slightly bigger head for a short body, in every frame he appears", refs: ["S5", "S46", "S60"]}, {point: "Edit-only bases show the before state (S65, S120); papers stand upright so they read; the mended-mug toast uses a plain second mug", refs: ["S65", "S120", "S133", "S135", "S154"]}, {point: "Smaller staging fixes: the couple and the high five keep their sides, the iceberg in one piece, the toolbox, cable, notepad, plates and magnets defined, no tiny envelope lying flat", refs: ["S125", "S157", "S47", "S51", "S217", "S74"]}, {point: "Kept as written after review: S105–S108 stay the teenage son (he is being compared now, the brother's old mark is the 'at your age'); the Number four card keeps the warm kitchen colours; S227–S229 keep SON's design, the drained attic carries 'years from now'", refs: ["S106", "S104", "S227"]}]},\n  {batch: "Version 9 — 4 Oct 2026 · stronger emotion and interaction (Muhammad: everything else is best)", entries: [{point: "Every mouth is a clear shape — a big round open circle, a wide open oval, a deep downturned curve, a big wavy line, a hard flat line, a clear smile — instead of 'a small … line' (177 phrases)", refs: ["S14", "S27", "S10", "S15"]}, {point: "An EXPRESSION STRENGTH line after every performance: full on hook and emotional beats (steep eyebrows, pupils pressed to the target, bold mouth, the body leaning or recoiling), clear on simple beats; blank faces and stiff bodies added to the avoid list", refs: ["S9", "S12", "S22", "S158"]}, {point: "The interaction rule now turns heads and bodies toward each other, asks for an equally strong reaction, a clear line of sight, closeness unless the beat is about distance, and a touch or hand-over wherever the action allows; three shared beats now look at the other person", refs: ["S32", "S106", "S206"]}]},\n];`);
  fs.writeFileSync(OUT, src);
}
const clean = beats => beats.map(b => { const c = { ...b }; if (c.reveal) { c.reveal = { ...c.reveal }; delete c.reveal._surf; delete c.reveal._at; } return c; });
// pass 1 (covers unknown) → evaluate palettes → pass 2
writeAll(clean(B));
let code = src.slice(0, src.indexOf("/* ===== UI ===== */")).replace(/^\s*import[^\n]*\n/gm, "");
const M = vm.runInNewContext(code + ";({framePalette, WORLD, PROP})", {});
for (const b of B) {
  if (!b.reveal) continue;
  const pal = M.framePalette(b);
  const W = D.WORLD[b.world];
  let key = b.reveal._surf;
  if (!key) { const m = W.text.match(/\{(WALL|FLOOR|FURN|SKY|GROUND|FIELD)\}/); key = m ? m[1] : "WALL"; }
  const k = key.toLowerCase(); const [nm, hex] = pal[k];
  const what = b.reveal.what, wname = D.PROP[what] ? D.PROP[what].name : what === "THOUGHT" ? "the thought bubble" : what === "SPEECH" ? "the speech bubble" : what === "EFFECT" ? "the effect lines" : what;
  const surf = { wall: "wall", field: "background", sky: "sky", floor: "floor", ground: "ground", furn: "surface" }[k];
  b.reveal.cover = hex;
  b.reveal.how = `Premiere: draw a flat ${nm} (${hex}) shape over ${wname}${b.reveal._at ? " " + b.reveal._at : ""}; take it away on “${b.reveal.on}”. Eyedropper the ${surf} right beside it if the render differs.`;
}
writeAll(clean(B));
console.log(`${path.basename(OUT)}: ${B.length} beats, ${E.length} edits, ${Q.length} sequences, masters ${J(masters)}`);
