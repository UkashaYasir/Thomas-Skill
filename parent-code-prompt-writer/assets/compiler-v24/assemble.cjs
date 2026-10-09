// Assembles a Parent Code build (compiler v24) from template.jsx + dicts.cjs + segs/segNN.cjs + script.txt.
//
//   node assemble.cjs [out.jsx] [--data DIR] [--segs DIR] [--dicts FILE] [--script FILE]
//
//   --data DIR    a video folder holding segs/, dicts.cjs and script.txt (each missing one falls back to this folder's own);
//                 the default output is then DIR/out/build.jsx. Env DATA, SEGS, DICTS, SCRIPT do the same as the flags.
//   CLEAN_GROUND=#FFFFFF  (env) or PROJECT.cleanGround in dicts.cjs swaps the CLEAN ground for a test (default #F7F6F3, the
//                 clean warm white Video 08 was approved on; other prepared options #FFFFFF, #F4F2EE, #F2F4F5).
//
// Frames: F(n, {short keys}) · edits: E(ref, on, change) · sequences: Q(id, title, base, images). Short keys: see README.md.
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = __dirname;
const argv = process.argv.slice(2);
const flag = k => { const i = argv.indexOf("--" + k); return i >= 0 ? argv[i + 1] : undefined; };
const positional = argv.filter((a, i) => !a.startsWith("--") && !(i > 0 && argv[i - 1].startsWith("--")));
const DATA = flag("data") || process.env.DATA ? path.resolve(flag("data") || process.env.DATA) : null;
const pick = (f, envKey, name) => { const v = flag(f) || process.env[envKey]; if (v) return path.resolve(v); if (DATA && fs.existsSync(path.join(DATA, name))) return path.join(DATA, name); return path.join(ROOT, name); };
const SEGS = pick("segs", "SEGS", "segs"), DICTS = pick("dicts", "DICTS", "dicts.cjs"), SCRIPT_FILE = pick("script", "SCRIPT", "script.txt");
const OUT = path.resolve(positional[0] || path.join(DATA || ROOT, "out/build.jsx"));
fs.mkdirSync(path.dirname(OUT), { recursive: true });
const D = require(DICTS);
const SCRIPT = fs.readFileSync(SCRIPT_FILE, "utf8").split("\n").map(s => s.replace(/\s+$/, "")).filter(s => s.length);
const J = v => JSON.stringify(v);
const TEMPLATE = fs.readFileSync(path.join(ROOT, "template.jsx"), "utf8");
// the template's own constants are the single source for moods and shot types
const T = vm.runInNewContext(TEMPLATE.slice(0, TEMPLATE.indexOf("// ── DICTIONARIES")).replace(/^\s*import[^\n]*\n/gm, "") + ";({MOOD, MOOD_ALIAS, SHOT, ANGLE, EMOTION_FIELD})", {});
const SIZE = { WIDE: "wide shot", MEDWIDE: "medium-wide shot", MEDIUM: "medium shot", CLOSE: "close shot", XCLOSE: "extreme close-up", FACE_HANDS: "face-and-hands close-up", REACTION: "reaction close-up", HANDS: "hands-only close shot", OBJECT: "object shot", WORD: "plain white word frame" };
const ANG = { EYE: "at eye level", LOW: "at a small child's height", HIGH: "from a little above head height", OTS: "over the shoulder", PROFILE: "from the side at eye level", SQUARE: "straight on at eye level" };
const CAM = { LOW: "CHILD_EYE", HIGH: "SLIGHTLY_ABOVE", OTS: "OTS" };
const TIERS = { S: "SIMPLE", Q: "QUIET", E: "EMOTIONAL", H: "HOOK" };
const CLOSE = ["CLOSE", "XCLOSE", "FACE_HANDS", "REACTION", "HANDS", "OBJECT"];
const DISTS = ["touching", "close", "apart", "far"];
const cap = s => s[0].toUpperCase() + s.slice(1);
const art = s => (/^[aeiou]/i.test(s) ? "an " : "a ") + s;
const canon = m => T.MOOD[m] ? m : (T.MOOD_ALIAS[m] || m);
// ln is the v19 line type (one lower-case word or hyphenated words: hook, chapter-turn, child-voice…); an older ln that is a
// sentence is the old link text. lk is the link from now on.
const isLineType = s => typeof s === "string" && /^[a-z][a-z-]*$/.test(s.trim());
// ia "who does what → who reacts how" becomes one sentence in the ACTION
const iaText = s => String(s).trim().split(/\s*(?:→|->)\s*/).filter(Boolean).join("; in response, ").replace(/[.\s]*$/, ".");

const B = [], E = [], Q = [], INS = [];
const masters = {};
let SEQ = "";
// makeBeat: one frame record from the short keys — used by F() (the line's frame) and I() (an insert inside the line)
function makeBeat(n, o, ref) {
    const size = o.sz, ang = o.an || "EYE";
    if (!SIZE[size] || !T.SHOT[size]) throw new Error(ref + " bad size " + size);
    if (!ANG[ang] && !T.ANGLE[ang]) throw new Error(ref + " bad angle " + ang);
    const word = size === "WORD";
    const world = o.w || (word ? "WORD" : undefined);
    const W = word ? {} : D.WORLD[world]; if (!W) throw new Error(ref + " unknown world " + o.w);
    // v25: pc (the emotion's colour family) turns the stage into that colour — it implies m: "PEAK"
    if (o.pc !== undefined && !T.EMOTION_FIELD[String(o.pc).toUpperCase()]) throw new Error(ref + " pc must be one of " + Object.keys(T.EMOTION_FIELD).join(", "));
    if (o.pc && o.m && canon(o.m) !== "PEAK") throw new Error(ref + " pc (a colour stage) needs m: \"PEAK\" (or no m), not " + o.m);
    const moodIn = word ? "WHITE" : (o.m || (o.pc ? "PEAK" : "CLEAN")), mood = canon(moodIn);
    if (!T.MOOD[mood]) throw new Error(ref + " unknown mood " + o.m);
    const roles = o.r || "No characters";
    let master = null;
    if (o.ms === true) { master = ref; if (W.set) masters[W.set] = ref; } else if (typeof o.ms === "string") master = o.ms; // v19: masters only where asked
    const lineType = isLineType(o.ln) ? o.ln.trim() : "";
    const plan = { ft: o.ft || "", ln: lineType, idea: o.idea || "", alt: Array.isArray(o.alt) ? o.alt : (o.alt ? [o.alt] : []), ia: o.ia || "", dist: o.dist || "", look: o.look || "", ctx: o.ctx || "", ce: o.ce || "", cx: o.cx || "", ip: o.ip || "" };
    if (o.ce2) plan.ce2 = o.ce2; // v24: a second coloured object, only when the moment needs both
    const b = {
      n, ref, sequence: SEQ, scene: o.sc, tier: TIERS[o.t] || o.t || "SIMPLE", fn: o.fn || (o.mf ? "CONCEPT" : "STORY"),
      roles, props: o.p || [], hero: o.h || (roles === "No characters" ? ((o.p || [])[0] || "FACE") : "FACE"),
      feel: o.fe || o.ft || "", meaning: o.me || o.idea || "",
      shotSize: size, angle: ang, face: o.fa || (["HANDS", "OBJECT", "WORD"].includes(size) || roles === "No characters" ? "NONE" : "NORMAL"), scale: o.sl || "ORDINARY",
      framing: "", action: (o.a || "") + (o.ia ? ` INTERACTION BEAT: ${iaText(o.ia)}` : ""), performance: o.pf || "",
      world, mood, peak: !!o.pk, stage: o.st || "", moment: o.mo || "",
      pop: o.pop ? { what: o.pop[0], on: o.pop[1], type: o.pop[2] || "ADD", motion: o.pop[3] || "pops in with a small bounce" } : null,
      move: o.mv ? { type: o.mv[0], on: o.mv[1] || "", note: o.mv[2] || "" } : { type: "HOLD", on: "", note: "hold still" },
      device: o.dv, reveal: o.rv ? { what: o.rv[0], on: o.rv[1], method: "MASK", cover: "", how: "", _surf: o.rv[2] || null, _at: o.rv[3] || "" } : null,
      link: o.lk || (!lineType && o.ln ? o.ln : ""), requiredText: "",
      picture: "", map: word ? "" : `left — ${o.L}; centre — ${o.C}; right — ${o.R}.`, check: "",
      cam: o.cam !== undefined ? o.cam : (CAM[ang] || null),
      plan,
      _raw: { L: o.L, C: o.C, R: o.R, wh: o.wh || "", eyes: !!o.eyes },
    };
    if (!word) b.slots = { L: o.L || "", C: o.C || "", R: o.R || "" };
    if (moodIn !== mood) b.moodWas = moodIn;
    if (master) b.master = master;
    if (o.mf) b.metaphor = o.mf;
    if (o.to) b.touch = o.to;
    if (o.sti) b.still = o.sti;
    if (o.y) b.why = o.y;
    if (o.pl) b.plain = o.pl;
    if (o.cr) b.colourReason = o.cr;
    if (o.fo) b.focus = o.fo;
    if (o.eyes) b.eyesOnly = true; // eyes-only crop text replaces FACE SIZE
    if (o.hr) b.heroWho = o.hr; // the hero face/figure when it is not the first-named role
    if (o.os) b.oneSided = o.os; // a one-sided beat replaces the interaction rule
    if (o.na) b.noAnchor = true; // (older builds) no anchor piece — v19 never adds one automatically
    if (o.px) { b.propText = {}; for (let i = 0; i < o.px.length; i += 2) b.propText[o.px[i]] = o.px[i + 1]; } // px: ["KEY", "full object text for this frame"]
    // v24.1 (Muhammad: text goes in the image prompts, not separate images): kw is lettered into this frame's own prompt,
    // like tx — on a WORD frame it is the big word in the centre of the white frame
    if (o.kw && !o.tx) b.onScreen = { w: o.kw[0], on: o.kw[1], col: (o.kw[2] || "BLACK").toUpperCase(), ...(word ? { at: "in the centre of the white frame", big: true } : {}) };
    if (o.eo) b.editOnly = { seq: o.eo[0], from: o.eo[1] };
    // ── v24 keys (references/v24-standard.md; README.md) ──
    if (o.pc) b.peakCol = String(o.pc).toUpperCase(); // v25: the PEAK field in the emotion's colour (EMOTION_FIELD)
    if (o.cm) b.calm = true; // the colour focus in its calm tone — a deliberately quiet beat (default: bright)
    if (o.ac) b.accent = o.ac; // why this frame's colour is pushed (shown on the Copy page)
    if (o.gl) { if (!["halo", "rays", "rainbow"].includes(o.gl)) throw new Error(ref + " gl must be halo, rays or rainbow"); b.glow = o.gl; }
    if (o.mk) { b.accentMark = o.mk[0]; b.accentCol = (o.mk[1] || "YELLOW").toUpperCase(); } // marks on an action: ["a few short strokes…", "YELLOW"]
    if (o.li) b.light = { kind: o.li[0], where: o.li[1] || "" }; // a flat, clean-edged light shape: warm | cool | dusk
    if (o.mu) b.mute = true; // absence: grey on purpose
    if (o.fg) b.fg = o.fg; // a near foreground piece at one edge
    if (o.sx) b.slice = true; // a close face shot shows one slice of the place
    if (o.tx) b.onScreen = { w: o.tx[0], on: o.tx[1], col: (o.tx[2] || "BLACK").toUpperCase(), ...(o.tx[3] ? { at: o.tx[3] } : {}), ...(o.tx[4] ? { big: true } : {}) }; // hand-lettered word: [word, cue, colour, where, big]
    if (o.ol) b.onScreen = { w: o.ol[0], on: o.ol[1], col: (o.ol[2] || "BLACK").toUpperCase(), at: o.ol[3], font: o.ol[4] || "a big, thick handwritten capital letter in marker strokes" }; // a letter on an object: [letter, cue, colour, on what, how drawn]
    if (o.zm) b.zooms = o.zm.map(z => ({ on: z[0], to: z[1], kind: z[2] || "punch" })); // Premiere reframes of this still: [[cue, target, punch|push]]
    if (!b.cam) delete b.cam;
    return b;
}
const api = {
  seg(name) { SEQ = name; },
  F(n, o) {
    const ref = "S" + n;
    if (B.some(x => x.ref === ref)) throw new Error("duplicate " + ref);
    B.push(makeBeat(n, o, ref));
  },
  // v25 insert: a second generated image inside line n (a cutaway, the object big, a sudden close-up), cut in on the word
  // `in` — I(n, {in: "cue", …the same keys as F}). Refs run S12b, S12c… An insert is a new image, so use one only when a
  // reframe (zm) or an edit (E) of the line's frame cannot show it.
  I(n, o) {
    if (!o || !o.in) throw new Error("S" + n + " insert needs in: the cue word it cuts in on");
    const ref = "S" + n + "bcdefgh"[INS.filter(x => x.n === n).length];
    const b = makeBeat(n, o, ref); b.cutIn = o.in; b.insert = true;
    if (b.move.type === "HOLD" && !b.move.on) b.move.on = o.in;
    INS.push(b);
  },
  E(ref, on, change) { if (E.some(e => e.ref === ref)) throw new Error("dup edit " + ref); E.push({ ref, on, change }); },
  Q(id, title, base, images) { Q.push({ id, title, base, images: images.map((im, i) => ({ i: i + 1, ...im })) }); },
};
const segs = fs.readdirSync(SEGS).filter(f => /^seg\d\d\.cjs$/.test(f)).sort();
if (!segs.length) throw new Error("no segNN.cjs files in " + SEGS);
for (const f of segs) { const p = path.join(SEGS, f); delete require.cache[require.resolve(p)]; require(p)(api); }
B.sort((a, b) => a.n - b.n);
E.sort((a, b) => Number(a.ref.slice(1)) - Number(b.ref.slice(1)));

if (INS.some(i => !B.some(b => b.n === i.n))) throw new Error("an insert I(n) needs the frame F(n) of its line: " + INS.filter(i => !B.some(b => b.n === i.n)).map(i => i.ref).join(" "));
INS.sort((a, b) => a.n - b.n || a.ref.localeCompare(b.ref));
// Set pieces by need (v19): a piece is drawn only in the frames whose own action, placement, edits or sequence steps name it
// (close shots: their own action and placement only). No anchor piece is added automatically.
for (const b of [...B, ...INS]) {
  const W = D.WORLD[b.world]; if (!W || !W.parts) { b.pieces = []; continue; }
  const close = !W.close && ["CLOSE", "XCLOSE", "FACE_HANDS", "REACTION"].includes(b.shotSize);
  const own = [b.action, b.map].join(" ");
  const more = close ? "" : [b.performance, ...E.filter(e => e.ref === b.ref).map(e => e.change), ...Q.flatMap(q => q.images.filter(i => i.ref === b.ref && i.change).map(i => i.change))].join(" ");
  const t = own + " " + more;
  b.pieces = W.parts.filter(p => new RegExp(p[1], "i").test(t)).map(p => p[0]);
}
// THE PICTURE, the camera line and THE PICTURE IN SHORT ({BG} is filled by the compiler from the frame's mood and pieces)
const OPEN = { CLEAN: "in open space", PEAK: "on one flat colour field", NIGHT: "against the night navy", MEMORY: "in a faded grey memory" };
for (const b of [...B, ...INS]) {
  const r = b._raw; delete b._raw;
  if (b.shotSize === "WORD") { b.picture = "a plain, clean, pure white word frame with nothing drawn on it."; b.framing = "Plain white word frame, flat and empty."; b.check = "a plain pure white frame; {BG}."; continue; }
  const W = D.WORLD[b.world], s = SIZE[b.shotSize], a = ANG[b.angle] || T.ANGLE[b.angle];
  const where = b.mood === "WHITE" ? "in clean white space" : (W.parts && !b.pieces.length) || b.shotSize === "XCLOSE" ? OPEN[b.mood] : r.wh;
  const big = ["WIDE", "MEDWIDE"].includes(b.shotSize) && b.roles !== "No characters" ? " — the characters drawn large enough that their faces read" : ""; // v24: never too small
  b.picture = r.eyes ? `an eyes-only extreme close-up at eye level ${where} — ${r.L}; ${r.C}; ${r.R}.` : `${art(s)} ${a} ${where} — ${r.L}; ${r.C}; ${r.R}${big}.`;
  b.framing = r.eyes ? `Eyes-only extreme close-up at eye level, ${where}, horizon level: at the left ${r.L}; in the centre ${r.C}; at the right ${r.R}.` : `${cap(s)} ${a}, ${where}, horizon level: at the left ${r.L}; in the centre ${r.C}; at the right ${r.R}.`;
  b.check = `${r.eyes ? "eyes-only extreme close-up" : s} ${a}, horizon level; left: ${r.L}; centre: ${r.C}; right: ${r.R}; {BG}.`;
}

// ── write blocks into the template ──
let src = TEMPLATE;
function blockRange(lines, name) {
  const s = lines.findIndex(l => l.startsWith(`const ${name} = `)); if (s < 0) throw new Error("block " + name);
  if (/[\]}];\s*$/.test(lines[s]) && !/[\[{]\s*$/.test(lines[s])) return [s, s];
  let e = s + 1; while (!/^[\]}];\s*$/.test(lines[e])) e++; return [s, e];
}
function replaceBlock(name, text) { const lines = src.split("\n"); const [s, e] = blockRange(lines, name); lines.splice(s, e - s + 1, text); src = lines.join("\n"); }
const obj = (name, o) => `const ${name} = {\n` + Object.entries(o || {}).map(([k, v]) => `  ${J(k)}: ${J(v)},`).join("\n") + "\n};";
const arr = (name, a) => `const ${name} = [\n` + (a || []).map(v => "  " + J(v) + ",").join("\n") + "\n];";
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
const sketch = b => { const e = E.find(x => x.ref === b.ref); return [b.ref, b.sequence, `${b.scene} [${b.world} · ${b.roles}]`, b.tier, `${b.shotSize}/${b.angle}/${b.face}/${b.scale}`, b.mood, `hero ${b.hero}`, b.plan.ln || b.stage, `feel: ${lc(b.plan.ft || b.feel)}`, `idea: ${b.plan.idea || b.meaning}`, `moment: ${b.moment || "—"}`, `pop: ${b.pop ? `${b.pop.what} ${b.pop.type} '${b.pop.on}'` : "—"}`, `move: ${b.move.type}`, `device: ${b.device || "—"}`, `edit: ${e ? `'${e.on}' ${e.change.split(". ")[0]}` : "—"}`].join(" | "); };
const STORY0 = { idea: "", arc: "", ending: "" };
const REVISIONS0 = [{ batch: `Build 1 — ${new Date().toISOString().slice(0, 10)} · first full build (compiler v24)`, entries: [] }];
const GROUND = process.env.CLEAN_GROUND || (D.PROJECT && D.PROJECT.cleanGround) || "";
if (GROUND && !/^#[0-9A-Fa-f]{6}$/.test(GROUND)) throw new Error("CLEAN_GROUND must be a #RRGGBB hex, got " + GROUND);

function writeAll(beats, inserts) {
  src = TEMPLATE;
  src = src.replace(/\/\/ THE PARENT CODE — prompt build[^\n]*/, `// THE PARENT CODE — prompt build · ${String(D.PROJECT.title).replace(/^The Parent Code — /, "")} (compiler v24)`);
  if (GROUND) src = src.replace(/^const CLEAN_GROUND = "#[0-9A-Fa-f]{6}";/m, `const CLEAN_GROUND = "${GROUND.toUpperCase()}"; // test strip: set by CLEAN_GROUND / PROJECT.cleanGround`);
  replaceBlock("PROJECT", `const PROJECT = {\n  title: ${J(D.PROJECT.title)},\n  runtimeSec: ${D.PROJECT.runtimeSec || 510}, // voice-over length in seconds — ${SCRIPT.length} lines ≈ ${((D.PROJECT.runtimeSec || 510) / Math.max(SCRIPT.length, 1)).toFixed(1)} s per line\n};`);
  replaceBlock("ROLE", obj("ROLE", D.ROLE));
  replaceBlock("SET", obj("SET", D.SET || {}));
  replaceBlock("CHAPTER", obj("CHAPTER", D.CHAPTER || {}));
  replaceBlock("WORLD", obj("WORLD", D.WORLD));
  replaceBlock("PROP", obj("PROP", D.PROP || {}));
  replaceBlock("TONE", obj("TONE", D.TONE || {})); // v24: { "#hex in a prop text": { calm: [name, hex], bright: [name, hex] } }
  replaceBlock("OVERLAY", obj("OVERLAY", D.OVERLAY || {}));
  replaceBlock("SCRIPT", arr("SCRIPT", SCRIPT));
  replaceBlock("STORY", obj("STORY", D.STORY || STORY0));
  replaceBlock("PLAN", arr("PLAN", D.PLAN || []));
  replaceBlock("MOTIFS", arr("MOTIFS", D.MOTIFS || []) + "\n\n// The director's read — the first deliverable: written before any frame; every frame's `why` traces back to it.\nconst DIRECTOR_READ = " + J(D.DIRECTOR_READ || null) + ";\n// The key lines (each gets a composition used nowhere else) and the moments told as sequences.\nconst KEY_LINES = " + J(D.KEY_LINES || []) + ";\nconst HELD_MOMENTS = " + J([...new Set(Q.flatMap(s => s.images.map(i => i.ref)))]) + ";");
  replaceBlock("SKETCH", arr("SKETCH", beats.map(sketch)));
  replaceBlock("RAW_BEATS", "const RAW_BEATS = [\n" + beats.map(serBeat).join("\n") + "\n];");
  replaceBlock("INSERT_BEATS", "const INSERT_BEATS = [\n" + (inserts || []).map(serBeat).join("\n") + "\n];");
  replaceBlock("SEQUENCES", arr("SEQUENCES", Q));
  replaceBlock("EDIT_CUES", "const EDIT_CUES = [\n" + E.map(e => `  { ref: ${J(e.ref)}, on: ${J(e.on)}, change: ${J(e.change)} },`).join("\n") + "\n];");
  replaceBlock("EDIT_WHO", `const EDIT_WHO = ${J(D.EDIT_WHO || {})};`);
  replaceBlock("REVISIONS", arr("REVISIONS", D.REVISIONS || REVISIONS0));
  fs.writeFileSync(OUT, src);
}
const clean = beats => beats.map(b => { const c = { ...b }; if (c.reveal) { c.reveal = { ...c.reveal }; delete c.reveal._surf; delete c.reveal._at; } return c; });
// pass 1 (covers unknown) → evaluate palettes → pass 2
writeAll(clean(B), clean(INS));
let code = src.slice(0, src.indexOf("/* ===== UI ===== */")).replace(/^\s*import[^\n]*\n/gm, "");
const M = vm.runInNewContext(code + ";({framePalette, moodOf, WORLD, PROP})", {});
for (const b of [...B, ...INS]) {
  if (!b.reveal) continue;
  // v19 cover colour: the ground (or field) the element sits on; "FURN" = it sits on an outline piece's white fill (CLEAN only)
  const pal = M.framePalette(b), onPiece = /^(FURN|PIECE)$/i.test(String(b.reveal._surf || "")) && b.mood === "CLEAN";
  const [nm, hex] = onPiece ? pal.fill : pal.ground;
  const what = b.reveal.what, wname = D.PROP && D.PROP[what] ? D.PROP[what].name : what === "THOUGHT" ? "the thought bubble" : what === "SPEECH" ? "the speech bubble" : what === "EFFECT" ? "the effect lines" : what;
  const surf = onPiece ? "white fill of the piece" : b.mood === "CLEAN" || b.mood === "WHITE" ? "ground" : "background field";
  b.reveal.cover = hex;
  b.reveal.how = `Premiere: draw a flat ${nm} (${hex}) shape over ${wname}${b.reveal._at ? " " + b.reveal._at : ""}; take it away on “${b.reveal.on}”. Eyedropper the ${surf} right beside it if the render differs.`;
}
writeAll(clean(B), clean(INS));
console.log(`${path.relative(process.cwd(), OUT) || OUT}: ${B.length} beats, ${INS.length ? INS.length + " inserts, " : ""}${E.length} edits, ${Q.length} sequences${Object.keys(masters).length ? ", masters " + J(masters) : ""}${GROUND ? ", CLEAN ground " + GROUND : ""}`);
