#!/usr/bin/env node
// The Parent Code — v19 rule checks (Thomas, 5 Oct 2026 — references/v19-principles.md).
//
//   node scripts/qa-v19.cjs build.jsx [--brief]
//
// Every check here passes or fails by a RULE, never against a number (v19 §0.2). Distributions are printed as information.
//   PLAN FIELDS   ft, ln, idea, alt and ce on every frame (cx: a WARN) · ia + dist on frames with two or more characters ·
//                 look + ctx on close shots with a face ·
//                 ctx refs point at an earlier, wider frame · ce names an object in the frame (or "none")
//   BACKGROUND    CLEAN/WHITE frames carry no tinted wall/furniture wording and no set-piece colour · full colour only with
//                 pk (PEAK) or at night (NIGHT) · no PEAK or NIGHT field behind a face close-up · one colour element per frame
//   FACES         every performance names the seven features (eyes, eyebrows, mouth, head position, hand gesture, posture,
//                 eye direction) · WORD frames carry their word and no characters
//   SYMBOLS       no symbol props (hearts, stars, trophies, smile masks, picture bubbles…) and no emoji-style pop-ins
//   CAST          every ROLE describes hair (never bald or a featureless round head); no two roles share a hair outline word
//   COMPOSITION   the same composition never repeats · the same character back to back changes distance family or angle ·
//                 inside one scene characters keep their sides (a SQUARE frame or a stated crossing may switch them) ·
//                 close-up gaze matches where the other person stands
//   KEYWORDS      idea words, never "NUMBER …", digits or a sentence
const fs = require("fs"), vm = require("vm");
const argv = process.argv.slice(2), file = argv.find(a => !a.startsWith("--"));
if (!file) { console.log("usage: node qa-v19.cjs build.jsx [--brief]"); process.exit(2); }
const BRIEF = argv.includes("--brief");
let src = fs.readFileSync(file, "utf8");
const marker = src.indexOf("/* ===== UI ===== */");
if (marker < 0) { console.log("FAIL  build has no UI marker"); process.exit(1); }
src = src.slice(0, marker).replace(/^\s*import[^\n]*\n/gm, "");
let M;
try { M = vm.runInNewContext(src + ";({RAW_BEATS,BEATS,PROMPTS,INSERT_PROMPTS:(typeof INSERT_PROMPTS==='undefined'?[]:INSERT_PROMPTS),ROLE,PROP,OVERLAY,WORLD,MOOD,SCRIPT,EDIT_CUES,SEQUENCES,framePalette,MOOD_ALIAS:(typeof MOOD_ALIAS==='undefined'?null:MOOD_ALIAS),CLEAN_GROUND:(typeof CLEAN_GROUND==='undefined'?null:CLEAN_GROUND),OUTLINE_GREY:(typeof OUTLINE_GREY==='undefined'?null:OUTLINE_GREY)})", {}); }
catch (e) { console.log("FAIL  the build does not compile: " + e.message); process.exit(1); }
if (!M.MOOD_ALIAS) { console.log("FAIL  this build was not made with compiler v19 or later — rebuild it with assets/compiler-v24/"); process.exit(1); }
const { ROLE, PROP, OVERLAY, WORLD, MOOD, MOOD_ALIAS } = M;
const D = M.BEATS || M.RAW_BEATS, P = M.PROMPTS, N = D.length;
// v25: inserts (I) are frames too — every per-frame check below reads them (DI, PI); the sequence checks read the line frames
const DI = [...D, ...(M.INSERT_PROMPTS || [])], PI = [...P, ...(M.INSERT_PROMPTS || [])];
let fails = 0, warns = 0;
const ok = m => { if (!BRIEF) console.log("  ok    " + m); }, info = m => { if (!BRIEF) console.log("  info  " + m); };
const warn = m => { warns++; console.log("  WARN  " + m); }, fail = m => { fails++; console.log("  FAIL  " + m); };
const head = t => { if (!BRIEF) console.log("\n=== " + t + " ==="); };
const refs = a => a.slice(0, 30).join(" ") + (a.length > 30 ? ` …(+${a.length - 30})` : "");
const dist = (arr, f) => JSON.stringify(arr.reduce((a, b) => { const k = f(b); a[k] = (a[k] || 0) + 1; return a; }, {}));
const moodOf = m => MOOD[m] ? m : (MOOD_ALIAS[m] || m);
const roleList = b => b.roles === "No characters" ? [] : String(b.roles || "").split(",").map(s => s.trim()).filter(Boolean);
const propKeys = b => (b.props || []).map(e => { const m = String(e).trim().match(/^(\d+)x\s+(.+)$/i); return (m ? m[2] : String(e)).trim(); });
const plan = b => b.plan || {};
const CLOSE_FACE = ["CLOSE", "XCLOSE", "FACE_HANDS", "REACTION"];
const WIDER = ["WIDE", "MEDWIDE", "MEDIUM"];
const isWord = b => b.shotSize === "WORD";
const closeFace = b => CLOSE_FACE.includes(b.shotSize) && roleList(b).length > 0;
const NAMES = Object.keys(ROLE).map(k => k.toUpperCase()).sort((a, b) => b.length - a.length);
const esc = s => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// a role name, ignoring longer role names that contain it (SON inside LITTLE SON)
const nameRe = n => new RegExp("\\b" + esc(n) + "\\b");
const stripLonger = (t, n) => NAMES.filter(x => x !== n && x.length > n.length && x.includes(n)).reduce((s, x) => s.split(x).join(" "), String(t || ""));
const hasName = (t, n) => nameRe(n).test(stripLonger(t, n));
const slotsOf = b => { if (b.slots) return b.slots; const m = String(b.map || "").match(/^left — (.*); centre — (.*); right — (.*)\.$/); return m ? { L: m[1], C: m[2], R: m[3] } : { L: "", C: "", R: "" }; };
const slotOf = (b, n) => { const s = slotsOf(b); let best = null, bi = Infinity; for (const k of ["L", "C", "R"]) { const t = stripLonger(s[k], n), i = t.search(nameRe(n)); if (i >= 0 && i < bi) { best = k; bi = i; } } return best; };
const slotOfText = (b, needle) => { const s = slotsOf(b); let best = null, bi = Infinity; for (const k of ["L", "C", "R"]) { const i = String(s[k]).indexOf(needle); if (i >= 0 && i < bi) { best = k; bi = i; } } return best; };
console.log(`\nv19 RULE CHECKS — ${N} frames — every check is a rule, never a number\n`);

// ════════════════════════════════════════════════════════════════
head("PLAN FIELDS (shot-plan-v19.md)");
const noFt = DI.filter(b => !String(plan(b).ft || "").trim()).map(b => b.ref);
noFt.length ? fail("frames without ft (what the viewer should feel): " + refs(noFt)) : ok("every frame states ft — what the viewer should feel");
// shot-plan-v19.md: ln, idea, alt and ce are written for every frame; cx whenever the frame makes a contrast ("affinity — …" when sameness is chosen)
const filled = (b, k) => Array.isArray(plan(b)[k]) ? plan(b)[k].some(x => String(x).trim()) : !!String(plan(b)[k] || "").trim();
const noPlan = DI.map(b => [b.ref, ["ln", "idea", "alt", "ce"].filter(k => !filled(b, k))]).filter(([, m]) => m.length).map(([r, m]) => `${r}(${m.join(",")})`);
noPlan.length ? fail("frames missing plan fields that shot-plan-v19.md asks for on every frame (ln line type, idea, alt — the ideas considered, ce — the colour element or \"none\"): " + refs(noPlan)) : ok("every frame records its line type, idea, the other ideas considered, and its colour element");
const noCx = DI.filter(b => !filled(b, "cx")).map(b => b.ref);
noCx.length ? warn("frames without cx — write the contrast this frame makes, or \"affinity — \" and why sameness is chosen: " + refs(noCx)) : ok("every frame states its contrast (or its chosen affinity)");
const two = DI.filter(b => roleList(b).length >= 2);
const noIa = two.filter(b => !String(plan(b).ia || "").trim()).map(b => b.ref);
noIa.length ? fail("frames with two or more characters and no ia (who does what → who reacts how): " + refs(noIa)) : ok(`every frame with two or more characters has its interaction beat (${two.length})`);
const DISTS = ["touching", "close", "apart", "far"];
const badDist = two.filter(b => !DISTS.includes(String(plan(b).dist || "").trim())).map(b => `${b.ref}(${plan(b).dist || "—"})`);
badDist.length ? fail("frames with two or more characters whose dist is missing or not touching / close / apart / far: " + refs(badDist)) : ok("every frame with two or more characters plans its distance");
const iaNoArrow = two.filter(b => plan(b).ia && !/→|->/.test(plan(b).ia)).map(b => b.ref);
iaNoArrow.length ? warn("ia written without an arrow — the beat is \"who does what → who reacts how\": " + refs(iaNoArrow)) : ok("every ia names an action and a reaction");
const cf = DI.filter(closeFace);
const noLook = cf.filter(b => !String(plan(b).look || "").trim() || !String(plan(b).ctx || "").trim()).map(b => `${b.ref}(${!plan(b).look ? "look" : ""}${!plan(b).look && !plan(b).ctx ? "+" : ""}${!plan(b).ctx ? "ctx" : ""})`);
noLook.length ? fail("close shots with a face but no look (gaze target and side) or ctx (what makes the close-up make sense): " + refs(noLook)) : ok(`every close shot with a face has its look and ctx (${cf.length})`);
const byRef = Object.fromEntries(DI.map(b => [b.ref, b]));
const badCtx = [];
cf.forEach(b => { const c = String(plan(b).ctx || ""); (c.match(/\bS\d+[a-z]?\b/g) || []).forEach(r => { const x = byRef[r]; if (!x) badCtx.push(`${b.ref}→${r} (no such frame)`); else if (x.n > b.n) badCtx.push(`${b.ref}→${r} (comes later)`); else if (/\bwide|wider|establish/i.test(c) && !WIDER.includes(x.shotSize)) badCtx.push(`${b.ref}→${r} (${x.shotSize} is not a wider frame)`); }); });
badCtx.length ? fail("ctx refs that do not establish the place (missing, later, or not a wider frame): " + refs(badCtx)) : ok("every ctx ref points at an earlier frame (a wider one where ctx says wide)");
const badCe = [];
DI.forEach(b => { const ce = String(plan(b).ce || "").trim(); if (!ce || /^none$/i.test(ce)) return; const k = (ce.match(/^[A-Z0-9_]+/) || [""])[0]; if (!PROP[k]) badCe.push(`${b.ref}(${ce}: no such PROP)`); else if (!propKeys(b).includes(k)) badCe.push(`${b.ref}(${k} is not in the frame's props)`); });
badCe.length ? fail("ce (the one colour element) that is not an object in the frame: " + refs(badCe)) : ok("every ce names an object in its frame, or none");
info("line types " + dist(D.filter(b => plan(b).ln), b => plan(b).ln) + " · interrupts " + dist(D.filter(b => plan(b).ip), b => plan(b).ip) + " · distance " + dist(two, b => plan(b).dist || "—"));

// ════════════════════════════════════════════════════════════════
head("BACKGROUND AND COLOUR (style-and-colour-v19.md)");
info("moods " + dist(D, b => moodOf(b.mood)) + (D.some(b => b.moodWas) ? " · older names mapped: " + dist(D.filter(b => b.moodWas), b => b.moodWas + "→" + moodOf(b.mood)) : ""));
const peakNoPk = DI.filter(b => moodOf(b.mood) === "PEAK" && !b.peak).map(b => `${b.ref}${b.moodWas ? "(" + b.moodWas + ")" : ""}`);
peakNoPk.length ? fail("full-colour PEAK frames without pk: true — full colour is only for an emotional peak (or NIGHT): " + refs(peakNoPk)) : ok("every full-colour PEAK frame is a marked emotional peak (pk)");
const peakFace = DI.filter(b => moodOf(b.mood) === "PEAK" && closeFace(b)).map(b => b.ref);
peakFace.length ? fail("a full-colour field behind a face close-up — the face is important there, keep the rest neutral (CLEAN or WHITE): " + refs(peakFace)) : ok("no full-colour field sits behind a face close-up");
const nightFace = DI.filter(b => moodOf(b.mood) === "NIGHT" && closeFace(b)).map(b => b.ref);
nightFace.length ? fail("night-navy fields behind face close-ups — a face close-up inside a night scene goes WHITE like a peak close-up; the next wider frame brings the night back (style-and-colour-v19.md §1.4): " + refs(nightFace)) : ok("no night field behind a face close-up");
const block = (t, name, next) => { const m = t.match(new RegExp(name + ": (.*?)(?= (?:" + next + ")[^:]{0,40}:|$)")); return m ? m[1] : ""; };
const NEXT_SET = "PLACE MASTER|PLACE REFERENCE|CONSTRUCTION, as in the references|HANDS-ONLY CONSTRUCTION|HANDS|COLOUR|CHARACTER COUNT|TEXT";
const NEXT_COL = "OBJECT FOCUS|VISUAL ORDER|LESS, BUT STRONGER|CHARACTER COUNT|TEXT|CHARACTER LOCKS|RECURRING CONSISTENCY";
const TINT = /\b(?:soft|subtle|pale|quiet|light|dusty|muted|warm|cool)[ -](?:sage|blush|beige|lilac|mint|rose|aqua|periwinkle|lavender|mauve|peach|apricot|cream|oat|linen|blue|green|pink|yellow|teal|lilac grey|grey-aqua|grey-blue)\b|\btint(?:ed)?\b|\bthe (?:room|place|kitchen|hall|living room)'s (?:own )?(?:soft )?colou?rs\b|\bquiet furniture\b|\bone step deeper\b|\bwalls? stays? exactly\b|\bcolou?red (?:wall|walls|room|rooms|furniture)\b|\bwall colou?r\b|\bnear-white floor\b|\bsoft-colou?red wall\b|\bflat [a-z -]+ \(#[0-9A-Fa-f]{6}\) (?:back )?wall\b/i;
const tinted = [], extraHex = [];
PI.filter(p => ["CLEAN", "WHITE"].includes(moodOf(p.mood))).forEach(p => {
  const set = block(p.prompt, "SETTING", NEXT_SET), col = block(p.prompt, "COLOUR", NEXT_COL);
  const beat = [p.framing, p.action, p.map].join(" ");
  // v24: an absence frame (mute) is grey on purpose — its fixed grey wording is not a tint
  const t = [set, col, beat].join(" ").replace(p.mute ? /quiet cool grey-blue|very light cool grey|pale cool grey/g : /$^/, ""), m = t.match(TINT);
  if (m) tinted.push(`${p.ref}("${m[0]}")`);
  const allowed = new Set([String(M.CLEAN_GROUND).toUpperCase(), String(M.OUTLINE_GREY).toUpperCase(), "#FFFFFF", ...(p.mute ? ["#AEB8C4", "#F1F3F5", "#E4E7EA"] : [])]);
  const bad = (set.match(/#[0-9A-Fa-f]{6}/g) || []).filter(h => !allowed.has(h.toUpperCase()));
  if (bad.length) extraHex.push(`${p.ref}(${[...new Set(bad)].join(" ")})`);
});
tinted.length ? fail("CLEAN/WHITE frames with tinted-room wording (a coloured wall, tinted room or furniture colour): " + refs(tinted)) : ok("CLEAN and WHITE frames carry no tinted wall, room or furniture wording");
extraHex.length ? fail("CLEAN/WHITE settings that colour a set piece or the place (only the white ground, the black line and white fill are allowed there — Thomas: \"black and white is enough\"): " + refs(extraHex)) : ok("CLEAN and WHITE settings are the white ground, black-line pieces and white fill only");
const noOne = PI.filter(p => !/THE BRIGHT COLOUR FOCUS in this frame is|The one colour in this frame is|THE (?:BRIGHT )?ACCENT in this frame is|The only (?:other )?coloured element|Nothing (?:in it )?carries (?:strong )?colou?r|No object carries colou?r|Only .{1,80} keeps its colou?r|Only the word carries colou?r|Everything is black ink and white|THE FOCUS in this frame is [^.]*drawn white/.test(block(p.prompt, "COLOUR", NEXT_COL))).map(p => p.ref);
noOne.length ? fail("colour blocks that do not name one colour element (or say that nothing carries colour): " + refs(noOne)) : ok("every colour block names its one colour element, or says that nothing carries colour");
info("colour elements " + dist(D, b => { const ce = String(plan(b).ce || "").trim(); return ce ? (/^none$/i.test(ce) ? "none" : (ce.match(/^[A-Z0-9_]+/) || [ce])[0]) : PROP[b.hero] ? b.hero + " (default)" : "none (default)"; }));
const roomWhite = DI.filter(b => moodOf(b.mood) === "WHITE" && closeFace(b)).filter(b => /\b(table|chair|counter|fridge|wall|door(way)?|stairs?|rail|sofa|bed|shelf|floor|window|desk)\b/i.test(stripProps([b.action, b.map].join(" ")))).map(b => b.ref);
function stripProps(t) { return Object.values(PROP).map(p => p.name).sort((a, b) => b.length - a.length).reduce((x, n) => x.split(n).join(" "), t); }
roomWhite.length ? fail("WHITE face close-ups that name a room part — WHITE has nothing behind the face; put an outline place on CLEAN instead: " + refs(roomWhite)) : ok("WHITE face close-ups name no room part");

// ════════════════════════════════════════════════════════════════
head("FACES, BODIES AND INTERACTION (acting-and-interaction-v19.md)");
const FEAT = {
  eyes: /\beyes?\b|\beyelids?\b|\bwide-eyed\b|\bsquint|\bblink|\bglossy\b|\bteary\b|\btears?\b/i,
  eyebrows: /\b(?:eye)?brows?\b/i,
  mouth: /\bmouth\b|\blips?\b/i,
  "head position": /\bhead\b|\bchin\b/i,
  "hand gesture": /\bhands?\b|\bmittens?\b|\bpalms?\b|\bfists?\b|\barms?\b/i,
  posture: /\bposture\b|\bshoulders?\b|\bbody\b|\bleans?\b|\bleaning\b|\bslump|\bhunch|\bstands?\b|\bstanding\b|\bsits?\b|\bsitting\b|\bback\b|\bknees?\b|\brecoil|\bstiff\b|\bupright\b|\bcrouch|\bkneel|\bstoop|\bcurl|\bweight\b|\bspine\b|\btoes\b/i,
  "eye direction": /\bpupils?\b|\blooks?\b|\blooking\b|\bgaze|\bglanc|\bstares?\b|\bstaring\b|\bwatch|\beye contact\b|\beyes? on\b|\bavoid/i,
};
const LABEL = new RegExp("\\b(" + NAMES.map(esc).join("|") + ")\\s*:", "g");
const perfOf = (b, n) => { const t = String(b.performance || ""); const hits = [...t.matchAll(LABEL)]; if (!hits.length) return t; const i = hits.findIndex(h => h[1] === n); if (i < 0) return ""; return t.slice(hits[i].index + hits[i][0].length, i + 1 < hits.length ? hits[i + 1].index : t.length); };
const sevenMiss = [];
DI.filter(b => roleList(b).length && !isWord(b)).forEach(b => {
  roleList(b).forEach(r => {
    const n = r.toUpperCase(), t = perfOf(b, n);
    let need = Object.keys(FEAT);
    if (b.shotSize === "HANDS") need = ["hand gesture"];
    else if (["WIDE", "MEDWIDE"].includes(b.shotSize) && !b.eyesOnly && !/seen from behind|back of|turned away from (us|the camera)|back to (us|the camera)/i.test(t + " " + Object.values(slotsOf(b)).join(" "))) { need = ["head position", "hand gesture", "posture"]; if (!FEAT.eyebrows.test(t) && !FEAT.mouth.test(t) && !FEAT.eyes.test(t)) need.push("one bold face shape (eyebrows or mouth)"); }
    else if (b.eyesOnly) need = ["eyes", "eyebrows", "eye direction"];
    else if (new RegExp("back of " + esc(n) + "'s head|" + esc(n) + "[^.;]{0,60}\\bfrom behind\\b").test(Object.values(slotsOf(b)).join(" ")) || /turned away from (us|the camera)|seen from behind|back to (us|the camera)/i.test(t)) need = ["head position", "hand gesture", "posture"];
    const miss = need.filter(f => !FEAT[f] || !FEAT[f].test(t));
    if (miss.length) sevenMiss.push(`${b.ref}(${n}: ${miss.join(", ")})`);
  });
});
sevenMiss.length ? fail("performances that do not name all seven features — eyes, eyebrows, mouth, head position, hand gesture, posture, eye direction (hands-only frames: the hands; eyes-only: eyes, eyebrows, eye direction; a face turned away: head, hands, posture): " + refs(sevenMiss)) : ok("every performance names the seven features for every visible character");
const words = D.filter(isWord);
const wordNoKw = words.filter(b => !(b.keyword && String(b.keyword.word || "").trim()) && !(b.onScreen && String(b.onScreen.w || "").trim())).map(b => b.ref);
wordNoKw.length ? fail("WORD frames without their on-screen word (kw: [\"WORD\", \"cue word\"]): " + refs(wordNoKw)) : ok(`every WORD frame carries its word (${words.length})`);
const wordCast = words.filter(b => roleList(b).length).map(b => b.ref);
wordCast.length ? fail("WORD frames with characters — a word frame is pure white with nothing drawn (or one small object): " + refs(wordCast)) : ok("WORD frames carry no characters");

// ════════════════════════════════════════════════════════════════
head("SYMBOLS AND PROPS (props-symbols-metaphors-v19.md)");
const SYMBOL = /\b(?:hearts?|stars?|trophy|trophies|podium|medals?|rosettes?|emoji|smiley|smile mask|thumbs?[- ]up|light ?bulbs?|halo|sparkles?|confetti|rainbow|speech bubbles?|thought bubbles?|story bubbles?|stop paddle|stop sign|question marks?|exclamation marks?|tick marks?|check ?marks?|cross marks?|lightning|zigzags?|sweat drops?|alarm light|siren|warning (?:sign|triangle)|arrows?)\b/i;
const isSymbol = e => !!e && (e.mature === false || (e.mature !== true && SYMBOL.test(String(e.name || "") + " " + String(e.text || ""))));
const symUse = [];
D.forEach(b => {
  propKeys(b).filter(k => isSymbol(PROP[k])).forEach(k => symUse.push(`${b.ref}(${k})`));
  if (b.pop && isSymbol(PROP[b.pop.what] || OVERLAY[b.pop.what])) symUse.push(`${b.ref}(pop ${b.pop.what})`);
});
symUse.length ? fail("symbol props or emoji-style pop-ins in frames (hearts, stars, trophies, smile masks, picture bubbles, icons) — show the feeling through behaviour instead, or mark a genuinely mature object mature: true: " + refs(symUse)) : ok("no symbol props and no emoji-style pop-ins");
const symDict = [...Object.entries(PROP).filter(([, v]) => isSymbol(v)).map(([k]) => "PROP." + k), ...Object.entries(OVERLAY).filter(([, v]) => isSymbol(v)).map(([k]) => "OVERLAY." + k)];
if (symDict.length) info("symbol entries in the dictionaries (fine only if no frame uses them): " + refs(symDict));
const symText = D.filter(b => SYMBOL.test(stripProps([b.framing, b.action, b.performance].join(" ")))).map(b => `${b.ref}("${stripProps([b.framing, b.action, b.performance].join(" ")).match(SYMBOL)[0]}")`);
symText.length ? warn("beat text that names a symbol word — check it is not a generic symbol standing in for a feeling: " + refs(symText)) : ok("no symbol words in the beat text");

// ════════════════════════════════════════════════════════════════
head("CAST (cast-design-v19.md)");
const BALD = /\bbald\b|\bno hair\b|\bhairless\b|\bcompletely round\b|\bfeatureless\b|\bshaved head\b/i;
const HAIR_OUTLINES = ["bun", "top knot", "topknot", "ponytail", "pigtails", "bunches", "braids", "braid", "plaits", "plait", "bob", "pixie", "afro", "curls", "curly", "coils", "dreadlocks", "locs", "cornrows", "buzz cut", "crew cut", "undercut", "mohawk", "quiff", "wave", "wavy", "spiky", "spikes", "side parting", "centre parting", "middle parting", "fringe", "bangs", "messy", "shaggy", "straight", "long", "short", "flat"];
const unneg = t => String(t).replace(/\b(?:no|not|never|without|instead of)\s+[^.;,—]*/gi, " ");
// the outline word is read only from the sentences that describe the hair (so "a tie hanging straight down" never counts)
const hairWord = (k, v) => { if (v.hair) return String(v.hair).toLowerCase(); const t = unneg(v.text).toLowerCase().split(/[.;:—]/).filter(x => /\bhair\b|\bbun\b|ponytail|pigtail|braid|plait|\bcurl|\bbob\b|afro|fringe|parting|locs\b|dreadlock/.test(x)).join(" . "); return HAIR_OUTLINES.find(w => new RegExp("\\b" + w + "\\b").test(t)) || null; };
const castBad = [];
Object.entries(ROLE).forEach(([k, v]) => { const t = String(v.text || ""); if (BALD.test(t) || BALD.test(String(v.change || ""))) castBad.push(`${k}(bald or a featureless round head)`); else if (!/\bhair\b/i.test(t)) castBad.push(`${k}(no hair described)`); else if (!hairWord(k, v)) castBad.push(`${k}(no hair outline word — add hair: "bun" / "ponytail" / "bob" / "curls"…)`); });
castBad.length ? fail("cast without a readable hair outline — every character has hair, never bald or a featureless round head: " + castBad.join(" ")) : ok("every ROLE describes its hair with a clear outline word");
const hw = Object.entries(ROLE).map(([k, v]) => [k, hairWord(k, v), v.sameAs || null]).filter(x => x[1]);
const clash = [];
for (let i = 0; i < hw.length; i++) for (let j = i + 1; j < hw.length; j++) { const [a, wa, sa] = hw[i], [b, wb, sb] = hw[j]; if (wa === wb && !(sa === b || sb === a || (sa && sa === sb))) clash.push(`${a}/${b}(${wa})`); }
clash.length ? fail("two characters share the same hair outline word — give one a different outline (or mark a younger/older self with sameAs): " + clash.join(" ")) : ok("no two characters share a hair outline word (the same person at another age is linked by sameAs)");
info("hair outlines " + hw.map(([k, w, s]) => `${k}: ${w}${s ? " (same person as " + s + ")" : ""}`).join(" · "));

// ════════════════════════════════════════════════════════════════
head("COMPOSITION (camera-and-closeups-v19.md)");
const visible = b => roleList(b).filter(() => b.shotSize !== "HANDS");
const compKey = b => {
  if (isWord(b) || b.editOnly) return null;
  const w = moodOf(b.mood) === "WHITE" ? "WHITE" : b.world;
  const lay = roleList(b).map(r => `${r.toUpperCase()}@${slotOf(b, r.toUpperCase()) || "?"}`).sort();
  if (PROP[b.hero]) lay.push(`${b.hero}@${slotOfText(b, PROP[b.hero].name) || "?"}`);
  return [b.shotSize + (b.eyesOnly ? "-eyes" : ""), b.angle, w, lay.join(",")].join("|");
};
const seen = {}, repeats = [];
D.forEach(b => { const k = compKey(b); if (!k) return; if (seen[k]) repeats.push(`${seen[k]}/${b.ref} (${k})`); else seen[k] = b.ref; });
repeats.length ? fail("the same composition comes back (shot + angle + place + who stands where) — change the distance, the angle, the side or the place: " + refs(repeats)) : ok(`no composition repeats anywhere in the film (${Object.keys(seen).length} compositions)`);
// camera-and-closeups-v19.md §1/§5: the second frame moves to a different distance family or changes the angle clearly.
// Families: far (WIDE, MEDWIDE) · middle (MEDIUM) · near (CLOSE, FACE_HANDS, REACTION) · very near (XCLOSE) · inserts (HANDS,
// OBJECT) · text (WORD); MEDIUM and MEDWIDE look alike, so moving between them is not a change. EYE and SQUARE are both
// frontal. In-scene edits and the stills of one sequence are continuations of one frame, so they are not compared.
const FAMILY = { WIDE: "far", MEDWIDE: "far", MEDIUM: "middle", CLOSE: "near", FACE_HANDS: "near", REACTION: "near", XCLOSE: "very near", HANDS: "insert", OBJECT: "insert", WORD: "text" };
const AGROUP = a => ({ EYE: "front", SQUARE: "front" })[a] || a;
const sameSize = (a, b) => FAMILY[a] === FAMILY[b] || (["MEDIUM", "MEDWIDE"].includes(a) && ["MEDIUM", "MEDWIDE"].includes(b));
const inOneSeq = (a, b) => (M.SEQUENCES || []).some(q => q.images.some(i => i.ref === a) && q.images.some(i => i.ref === b));
const same = [];
for (let i = 1; i < N; i++) {
  const a = D[i - 1], b = D[i]; if (b.editOnly || inOneSeq(a.ref, b.ref)) continue;
  const shared = roleList(a).filter(r => roleList(b).includes(r)); if (!shared.length) continue;
  if (sameSize(a.shotSize, b.shotSize) && AGROUP(a.angle) === AGROUP(b.angle)) same.push(`${a.ref}/${b.ref}(${shared.join(",")}: ${a.shotSize} ${a.angle} → ${b.shotSize} ${b.angle})`);
}
same.length ? fail("the same character in back-to-back frames without a clear change — move to another distance family (far · middle · near · very near · inserts; MEDIUM↔MEDWIDE is no change) or change the angle clearly: " + refs(same)) : ok("the same character back to back always changes distance family or angle clearly");
const scenes = {};
D.forEach(b => { (scenes[b.scene] = scenes[b.scene] || []).push(b); });
const flips = [], sideMap = {};
// camera-and-closeups-v19.md §6.1: a scene may cross the line only through a SQUARE frame on the line, when a character walks
// to the other side inside a frame or an edit (the edit says "crosses" / "walks … to the other side"), or by a new scene.
const CROSS = /\bcross(es|ing)? (over|to)\b|\bcrosses the frame\b|\b(walks|moves|steps|goes) (across|over|round|around) to the (other|left|right) side\b|\bto the other side of the frame\b/i;
const crossesAt = b => b.angle === "SQUARE" || CROSS.test(b.action || "") || (M.EDIT_CUES || []).some(e => e.ref === b.ref && CROSS.test(e.change));
Object.entries(scenes).forEach(([sc, fr]) => {
  let side = {}; const final = {};
  const close = () => Object.entries(side).forEach(([n, v]) => { if (v.L && v.R) flips.push(`"${sc}": ${n} left in ${v.L.join(",")}, right in ${v.R.join(",")}`); else final[n] = v.L ? "L" : "R"; });
  fr.forEach(b => {
    if (b.angle !== "SQUARE") roleList(b).forEach(r => { const n = r.toUpperCase(), s = slotOf(b, n); if (s === "L" || s === "R") (side[n] = side[n] || {})[s] = (side[n][s] || []).concat(b.ref); });
    if (crossesAt(b)) { close(); side = {}; }
  });
  close(); sideMap[sc] = final;
});
flips.length ? fail("characters who change screen side inside one scene (180° rule — keep sides inside a scene; cross only through a SQUARE frame on the line or a crossing the viewer sees; vary sides between scenes): " + flips.join(" | ")) : ok("inside every scene each character keeps their side");
const eyeline = [];
cf.forEach(b => {
  const look = String(plan(b).look || ""), lookSide = /\bleft\b/i.test(look) ? "L" : /\bright\b/i.test(look) ? "R" : null; if (!lookSide) return;
  const who = (b.heroWho || roleList(b)[0] || "").toUpperCase(), sm = sideMap[b.scene] || {};
  const target = NAMES.find(n => n !== who && hasName(look.toUpperCase(), n)); if (!target || !sm[target]) return;
  const mine = sm[who] || (sm[target] === "L" ? "R" : "L");
  if (mine === sm[target]) return;
  if (sm[target] !== lookSide) eyeline.push(`${b.ref}(${who} looks ${lookSide === "L" ? "left" : "right"} toward ${target}, who stands ${sm[target] === "L" ? "left" : "right"} in "${b.scene}")`);
});
eyeline.length ? fail("close-up gaze that does not match where the other person stands in the scene (eyeline match): " + refs(eyeline)) : ok("every close-up looks toward the side where the other person was established");

// ════════════════════════════════════════════════════════════════
head("KEYWORDS (humour-text-contrast-v19.md)");
// v24: lettered words (onScreen without a font) count as keywords too
const K = D.map(b => b.keyword && String(b.keyword.word || "").trim() ? b : b.onScreen && !b.onScreen.font ? { ...b, keyword: { word: b.onScreen.w, on: b.onScreen.on } } : null).filter(Boolean);
const NUMWORD = /^(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth)$/i;
const badKw = K.filter(b => { const w = String(b.keyword.word).trim(); return /^NUMBER\b/i.test(w) || /\d/.test(w) || NUMWORD.test(w) || /^(?:no\.|#)/i.test(w); }).map(b => `${b.ref}("${b.keyword.word}")`);
badKw.length ? fail("keywords that are numbers or list labels — on-screen words are idea words from the line (TRUST, SAFE, NOT REJECTION…): " + refs(badKw)) : ok("every keyword is an idea word, never a number or list label");
// v24: Thomas's own words end in "…", "!" or "?" (WAIT…, ENOUGH!, WHY?) — a full stop or four or more words read as a sentence
const sentence = K.filter(b => { const w = String(b.keyword.word).trim(); return (/[^.]\.$/.test(w) && !/\.\.\.$/.test(w)) || w.split(/\s+/).length >= 4 || (b.script && w.toLowerCase().replace(/[^a-z ]/g, "") === String(b.script).toLowerCase().replace(/[^a-z ]/g, "")); }).map(b => `${b.ref}("${b.keyword.word}")`);
sentence.length ? fail("keywords that read as a sentence or repeat the whole line — a few strong words, never a voice-over sentence on screen: " + refs(sentence)) : ok("no keyword is a sentence or the whole line");
info(`${K.length} keywords: ${K.map(b => `${b.ref} ${b.keyword.word}`).join(" · ") || "none"}`);

console.log(`\n${fails ? fails + " v19 CHECK(S) FAILED" : "ALL v19 CHECKS PASSED"} · ${warns} warning(s)\n`);
process.exitCode = fails ? 1 : 0;
