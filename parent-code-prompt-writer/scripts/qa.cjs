#!/usr/bin/env node
// The Parent Code — QA suite for a prompt build made with compiler v19 (assets/compiler-v24/ or assets/build-template.jsx).
//
//   node scripts/qa.cjs build.jsx [--lines 190] [--runtime 510] [--script script.txt] [--partial] [--brief]
//
// --partial: for batch turns while the build is still being written. Checks every written frame fully, but treats
// film-level structure (unused dictionary entries, unwritten PLAN rows, the segment still in progress) as info.
//
// Prints ok / WARN / FAIL per check and a verdict line; exits 1 on any FAIL.
// v19 (references/v19-principles.md §0.2 — no numbers for creative choices): every check here passes or fails by a RULE.
// Distributions (shot sizes, moods, close-ups, locations, edits, reveals, metaphors…) are PRINTED as information only —
// never judged against a target. The v19 rule checks (plan fields, colour, cast, composition, symbols, keywords) are in
// scripts/qa-v19.cjs. Every check measures the PROMPTS, never the pictures. Render test frames before a batch.

const fs = require("fs");
const vm = require("vm");

// ── args ──
const argv = process.argv.slice(2);
const file = argv.find(a => !a.startsWith("--"));
const opt = k => { const i = argv.indexOf("--" + k); return i >= 0 ? argv[i + 1] : undefined; };
if (!file) { console.log("usage: node qa.cjs build.jsx [--lines N] [--runtime SECONDS] [--script script.txt] [--partial]"); process.exit(2); }
const PARTIAL = argv.includes("--partial");

// ── load the data half of the build ──
let src = fs.readFileSync(file, "utf8");
const marker = src.indexOf("/* ===== UI ===== */");
if (marker < 0) { console.log("FAIL  build has no '/* ===== UI ===== */' marker — was it made from the v19 template?"); process.exit(1); }
src = src.slice(0, marker).replace(/^\s*import[^\n]*\n/gm, "");
let M;
try {
  M = vm.runInNewContext(src + "\n;({PROJECT,RAW_BEATS,PROMPTS,ROLE,MOOD,WORLD,PROP,OVERLAY,POP_CUES,OVERLAY_PROMPTS,REVISIONS,CONSTANTS,framePalette,MOOD_ALIAS:(typeof MOOD_ALIAS==='undefined'?null:MOOD_ALIAS),STORY:(typeof STORY==='undefined'?null:STORY),BEATS:(typeof BEATS==='undefined'?null:BEATS),SCRIPT:(typeof SCRIPT==='undefined'?null:SCRIPT),EDIT_CUES:(typeof EDIT_CUES==='undefined'?[]:EDIT_CUES),INSERT_BEATS:(typeof INSERT_BEATS==='undefined'?[]:INSERT_BEATS),SEQUENCES:(typeof SEQUENCES==='undefined'?[]:SEQUENCES),SKETCH:(typeof SKETCH==='undefined'?null:SKETCH),PLAN:(typeof PLAN==='undefined'?null:PLAN),MOTIFS:(typeof MOTIFS==='undefined'?null:MOTIFS)})", { console });
} catch (e) {
  console.log("FAIL  the build does not compile: " + e.message);
  process.exit(1);
}
const { PROJECT, RAW_BEATS, BEATS, PROMPTS: P, ROLE, MOOD, WORLD, PROP, OVERLAY, POP_CUES, OVERLAY_PROMPTS, STORY, PLAN, MOTIFS, SCRIPT, SKETCH, EDIT_CUES, INSERT_BEATS, SEQUENCES, MOOD_ALIAS } = M;
if (!MOOD_ALIAS) { console.log("FAIL  this build was not made with compiler v19 (no MOOD_ALIAS) — rebuild it with assets/compiler-v24/"); process.exit(1); }
const D = BEATS || RAW_BEATS;
const N = D.length;
const SCRIPT_OK = Array.isArray(SCRIPT) && SCRIPT.length > 0 && !SCRIPT.some(l => /^<.*>$/.test(String(l).trim()));
const TOTAL = Number(opt("lines") || (SCRIPT_OK ? SCRIPT.length : 0) || N);
const FILM = !PARTIAL && N >= 60;
const runtime = Number(opt("runtime") || (PROJECT && PROJECT.runtimeSec) || 510);
const spf = runtime / Math.max(TOTAL, N, 1);

let fails = 0, warns = 0;
const BRIEF = argv.includes("--brief");
if (BRIEF) { const _log = console.log; console.log = (...a) => { const s = String(a[0] ?? ""); if (/^\s*\n?=== /.test(s) || /^\n=== /.test(s)) return; _log(...a); }; }
const ok = m => { if (!BRIEF) console.log("  ok    " + m); };
const info = m => { if (!BRIEF) console.log("  info  " + m); };
const warn = m => { console.log("  WARN  " + m); warns++; };
const fail = m => { console.log("  FAIL  " + m); fails++; };
const pct = x => Math.round(100 * x / Math.max(N, 1));
const refs = arr => arr.slice(0, 25).join(" ") + (arr.length > 25 ? ` …(+${arr.length - 25})` : "");
const dist = (arr, f) => JSON.stringify(arr.reduce((a, b) => { const k = f(b); a[k] = (a[k] || 0) + 1; return a; }, {}));
const roleList = b => b.roles === "No characters" ? [] : String(b.roles || "").split(",").map(s => s.trim()).filter(Boolean);
const propKeys = b => (b.props || []).map(e => { const m = String(e).trim().match(/^(\d+)x\s+(.+)$/i); return (m ? m[2] : String(e)).trim(); });
const CLOSE_FACE = ["CLOSE", "XCLOSE", "FACE_HANDS", "REACTION"];
const isClose = b => [...CLOSE_FACE, "HANDS"].includes(b.shotSize);
const bigFace = b => b.face === "HUGE" || b.face === "LARGE";
const scaled = b => b.scale === "DOMINANT" || b.scale === "OVERWHELMING";
const hasFace = b => roleList(b).length > 0 && b.shotSize !== "HANDS";
const isWord = b => b.shotSize === "WORD";
const moodOf = m => MOOD[m] ? m : (MOOD_ALIAS[m] || m);

// colour maths — chroma (max-min) is used for "how saturated it looks"; HSL saturation lies about pastels
const rgb = h => [1, 3, 5].map(i => parseInt(String(h).slice(i, i + 2), 16) / 255);
const hue = h => { const [r, g, b] = rgb(h), mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; if (d === 0) return -1; let x = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return (x * 60 + 360) % 360; };
const chroma = h => { const c = rgb(h); return Math.max(...c) - Math.min(...c); };
const hueDiff = (a, b) => { const x = hue(a), y = hue(b); if (x < 0 || y < 0) return 180; const d = Math.abs(x - y); return Math.min(d, 360 - d); };
const isRed = h => { const x = hue(h); return x >= 0 && (x <= 12 || x >= 348) && chroma(h) >= 0.45; };
const bgHex = b => { try { return M.framePalette(b).ground[1]; } catch (e) { return null; } };
// the frame's colour element key: plan ce ("PHONE case" → PHONE), else the hero prop, else the first object not marked plain
const ceKey = b => { const ce = String((b.plan && b.plan.ce) || "").trim(); if (/^none$/i.test(ce)) return null; if (ce) return (ce.match(/^[A-Z0-9_]+/) || [ce])[0]; if (PROP[b.hero]) return b.hero; return propKeys(b).find(k => PROP[k] && !(b.plain || []).includes(k)) || null; };

console.log(`\nQA — ${PROJECT ? PROJECT.title : file} — ${N}${TOTAL !== N ? " of " + TOTAL : ""} frames, ${runtime}s (${spf.toFixed(1)} s/frame)${PARTIAL ? " — PARTIAL: written frames checked fully, film-level structure as info" : FILM ? "" : " — small batch: film-level structure shown as info"}\n`);

// ════════════════════════════════════════════════════════════════
console.log("=== STRUCTURE ===");
const REQ = ["n", "ref", "script", "sequence", "scene", "tier", "fn", "roles", "props", "hero", "feel", "meaning", "shotSize", "angle", "face", "scale", "framing", "action", "performance", "world", "mood", "stage", "moment", "pop", "link", "requiredText"];
const missing = D.filter(b => REQ.some(k => b[k] === undefined)).map(b => b.ref + "(" + REQ.filter(k => b[k] === undefined).join(",") + ")");
missing.length ? fail("beats missing fields: " + refs(missing)) : ok("every beat has every field");
D.every((b, i) => b.n === i + 1) ? ok("n runs 1.." + N) : fail("n is not sequential");
new Set(D.map(b => b.ref)).size === N ? ok("refs unique") : fail("duplicate refs");
const lines = TOTAL;
if (PARTIAL) (N <= lines) ? ok(`${N} of ${lines} lines written`) : fail(`${N} frames written but the script has only ${lines} lines`);
else if (opt("lines") || SCRIPT_OK) Number(lines) === N ? ok(`frame count matches the ${lines} script lines`) : fail(`frame count ${N} does not match the ${lines} script lines — find the merged or split line`);
if (SCRIPT_OK) {
  const normS = x => String(x).replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();
  const typed = (RAW_BEATS || []).filter(b => b.script && normS(b.script) !== normS(SCRIPT[b.n - 1])).map(b => b.ref);
  typed.length ? fail("beats whose typed script differs from SCRIPT (leave `script` out and let SCRIPT fill it): " + refs(typed)) : ok("every frame's script text comes from SCRIPT");
} else if (Array.isArray(SCRIPT)) warn("SCRIPT still holds the template placeholder — paste the exact script lines into SCRIPT");
if (Array.isArray(SKETCH) && SKETCH.length && !SKETCH.some(l => /^<.*>$/.test(String(l).trim()))) {
  const skRefs = SKETCH.map(l => String(l).split("|")[0].trim());
  (SCRIPT_OK && skRefs.length !== SCRIPT.length) ? warn(`SKETCH has ${skRefs.length} lines but SCRIPT has ${SCRIPT.length} — every script line needs its sketch line`) : ok(`SKETCH covers ${skRefs.length} lines`);
  const off = D.filter((b, i) => skRefs[i] !== b.ref).map(b => b.ref);
  off.length ? warn("written beats whose ref doesn't match the SKETCH line at the same position: " + refs(off)) : ok("written beats line up with the SKETCH");
}
const scriptFile = opt("script");
if (scriptFile) {
  const norm = s => String(s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();
  const sl = fs.readFileSync(scriptFile, "utf8").split(/\r?\n/).map(norm).filter(Boolean);
  const mm = D.filter((b, i) => norm(b.script) !== sl[i]).map(b => b.ref);
  mm.length ? fail("script text differs from the script file at: " + refs(mm)) : ok("every script line matches the script file exactly");
}
const ENUM = { tier: ["SIMPLE", "QUIET", "EMOTIONAL", "HOOK"], fn: ["STORY", "REACTION", "DETAIL", "CONCEPT", "TEXT"], shotSize: ["XCLOSE", "CLOSE", "MEDIUM", "MEDWIDE", "WIDE", "FACE_HANDS", "REACTION", "HANDS", "OBJECT", "WORD"], angle: ["EYE", "LOW", "HIGH", "OVERHEAD", "OTS", "PROFILE", "SQUARE", "POV"], face: ["NONE", "NORMAL", "LARGE", "HUGE"], scale: ["ORDINARY", "DOMINANT", "OVERWHELMING"], stage: ["START", "PROBLEM", "REACTION", "RESULT", ""] };
const badEnum = [];
D.forEach(b => Object.entries(ENUM).forEach(([k, v]) => { if (!v.includes(b[k])) badEnum.push(`${b.ref}.${k}=${b[k]}`); }));
badEnum.length ? fail("invalid field values: " + refs(badEnum)) : ok("every tier, fn, shot size, angle, face, scale and stage value is valid");
const und = P.filter(p => /undefined|\[object Object\]|\{(WALL|FLOOR|FURN|SKY|GROUND|FIELD|HERO|BG|BGWALL)\}/.test(p.prompt)).map(p => p.ref);
und.length ? fail("prompts with unresolved text (undefined / placeholders): " + refs(und)) : ok("no unresolved placeholders in any prompt");
const noRoles = D.filter(b => roleList(b).length === 0 && !["OBJECT", "WORD"].includes(b.shotSize) && b.roles !== "No characters").map(b => b.ref);
noRoles.length ? fail("roles field empty (use \"No characters\"): " + refs(noRoles)) : ok("roles field filled on every beat");
const objWithCast = D.filter(b => ["OBJECT", "WORD"].includes(b.shotSize) && roleList(b).length).map(b => b.ref);
objWithCast.length ? fail("OBJECT or WORD shots that list characters: " + refs(objWithCast)) : ok("OBJECT and WORD shots carry no characters");
const heroNotIn = D.filter(b => !isWord(b) && !["FACE", "FIGURE"].includes(b.hero) && !propKeys(b).includes(b.hero)).map(b => b.ref);
heroNotIn.length ? fail("hero object not in that frame's props: " + refs(heroNotIn)) : ok("every hero object is in its frame's props");
const faceHeroNoCast = D.filter(b => !isWord(b) && ["FACE", "FIGURE"].includes(b.hero) && !roleList(b).length).map(b => b.ref);
faceHeroNoCast.length ? fail("FACE/FIGURE hero with no character: " + refs(faceHeroNoCast)) : ok("FACE/FIGURE heroes all have a character");
// a close-up may name the person it looks toward when its plan says so (look: "toward MOM, out of frame left")
const castNamed = D.filter(b => { const upper = (b.action + " " + b.performance), look = String((b.plan || {}).look || "").toUpperCase(); return Object.keys(ROLE).some(r => new RegExp("\\b" + r.toUpperCase() + "\\b").test(upper) && !roleList(b).includes(r) && !roleList(b).some(x => x.toUpperCase().includes(r.toUpperCase())) && !(new RegExp("\\b" + r.toUpperCase() + "\\b").test(look) && /out of frame/i.test(look))); }).map(b => b.ref);
castNamed.length ? warn("a character is named in action/performance but missing from roles (a close-up may name who it looks at only through its look: \"toward X, out of frame left\"): " + refs(castNamed)) : ok("no character named in the action without being cast (out-of-frame gaze targets come from look)");
const txt = D.filter(b => b.requiredText);
info(`printed-text frames (${txt.length}): ` + (txt.map(b => `${b.ref} "${b.requiredText}"`).join(", ") || "none"));
const usedWorld = new Set(D.map(b => b.world)), usedProp = new Set(D.flatMap(propKeys)), usedRole = new Set(D.flatMap(roleList));
const usedOverlay = new Set((POP_CUES || []).map(c => c.what));
const unused = [...Object.keys(WORLD).filter(k => !usedWorld.has(k)).map(k => "WORLD." + k), ...Object.keys(PROP).filter(k => !usedProp.has(k) && !usedOverlay.has(k)).map(k => "PROP." + k), ...Object.keys(ROLE).filter(k => !usedRole.has(k)).map(k => "ROLE." + k), ...Object.keys(OVERLAY).filter(k => !usedOverlay.has(k)).map(k => "OVERLAY." + k)];
unused.length ? (PARTIAL ? info : FILM ? fail : warn)("dictionary entries never used — give them a frame or delete them: " + unused.join(" ")) : ok("every dictionary entry is used");
const noRefChar = Object.entries(ROLE).filter(([k, v]) => !v.ref).map(([k]) => k);
if (noRefChar.length) info("characters without a reference image — render their first frame as a test frame: " + noRefChar.join(", "));

// ════════════════════════════════════════════════════════════════
console.log("\n=== CAMERA (distributions are information only) ===");
info("shot sizes " + dist(D, b => b.shotSize) + " · angles " + dist(D, b => b.angle));
info(`close shots (CLOSE/XCLOSE/FACE_HANDS/REACTION/HANDS) ${D.filter(isClose).length} (${pct(D.filter(isClose).length)}%) · HUGE faces ${D.filter(b => b.face === "HUGE").length} · LARGE ${D.filter(b => b.face === "LARGE").length} · eyes-only ${D.filter(b => b.eyesOnly).length} · scaled objects ${D.filter(scaled).length}`);
{ let run = 1, best = 1, at = D[0] ? D[0].ref : ""; for (let i = 1; i < N; i++) { run = D[i].shotSize === D[i - 1].shotSize ? run + 1 : 1; if (run > best) { best = run; at = D[i].ref; } } info(`longest run of one shot size: ${best} (ending at ${at}) — the same character back to back is checked in qa-v19.cjs`); }
{ let run = 0, best = 0, at = ""; D.forEach(b => { run = ["MEDIUM", "MEDWIDE", "WIDE"].includes(b.shotSize) ? run + 1 : 0; if (run > best) { best = run; at = b.ref; } }); info(`longest run of medium/wide framings: ${best}${at ? " (ending at " + at + ")" : ""} — Thomas: "avoid staying too long in the same medium/wide framing"`); }
info(`${new Set(D.map(b => b.world)).size} worlds, ${new Set(D.map(b => b.scene)).size} scenes`);
const grams = {};
D.forEach(b => { const w = String(b.action).toLowerCase().replace(/[^a-z ]/g, " ").split(/\s+/).filter(Boolean); for (let i = 0; i + 6 <= w.length; i++) { const g = w.slice(i, i + 6).join(" "); grams[g] = (grams[g] || 0) + 1; } });
const stock = Object.entries(grams).sort((a, b) => b[1] - a[1]).slice(0, 3).filter(([, v]) => v > 2);
if (stock.length) info("most repeated action phrasing: " + stock.map(([g, v]) => `${v}× "${g}"`).join(" | "));
if (FILM) { const f1 = D[0]; f1 && f1.tier === "HOOK" ? ok("frame 1 is a HOOK frame") : warn("frame 1 is not a HOOK frame — open inside the conflict"); }

// ════════════════════════════════════════════════════════════════
console.log("\n=== EMOTION AND PERFORMANCE ===");
const noHands = D.filter(b => roleList(b).length && !["HUGE"].includes(b.face) && b.shotSize !== "XCLOSE" && !/hand/i.test(b.action + " " + b.performance)).map(b => b.ref);
noHands.length ? fail("character frames that never say what the hands do: " + refs(noHands)) : ok("every character frame states the hands (HUGE/XCLOSE exempt)");
const handFace = D.filter(b => b.shotSize === "HANDS" && /brow|pupil|mouth|\bface\b|\bhead\b|\bhair\b/i.test(b.performance + " " + b.action)).map(b => b.ref);
handFace.length ? fail("hands-only frames describing a face they crop out: " + refs(handFace)) : ok("hands-only frames describe hands, not faces");
const blank = D.filter(b => isClose(b) && hasFace(b) && /\b(blank|neutral|unreadable|expressionless)\b/i.test(b.performance)).map(b => b.ref);
blank.length ? fail("blank or neutral close-ups: " + refs(blank)) : ok("every close-up names a specific feeling");
const faceWide = D.filter(b => bigFace(b) && ["WIDE", "MEDWIDE"].includes(b.shotSize)).map(b => b.ref);
faceWide.length ? fail("LARGE/HUGE face on a wide framing: " + refs(faceWide)) : ok("no big face on a wide framing");
const faceNoCast = D.filter(b => bigFace(b) && !hasFace(b)).map(b => b.ref);
faceNoCast.length ? fail("big face value on a frame with no visible face: " + refs(faceNoCast)) : ok("face values only where a face is visible");
const scaleContra = D.filter(b => scaled(b) && /ordinary size|never any larger|no bigger than|normal size/i.test(b.action + " " + b.framing)).map(b => b.ref);
scaleContra.length ? fail("scale field contradicted by the action text: " + refs(scaleContra)) : ok("no scale contradictions");
const ceiling = D.filter(b => /(gritted|bared|clenched) teeth|\bteeth\b|snarl|bulging|popping eyes|scream(ing)?|rage face|distorted/i.test(b.performance)).map(b => b.ref);
ceiling.length ? fail("performance breaks the expression ceiling (teeth, snarl, bulging, screaming, distortion): " + refs(ceiling)) : ok("every expression stays under the ceiling");
const smug = D.filter(b => /smirk|lidded|half-closed eyes|hand on (his|her|the) chin/i.test(b.performance + " " + b.action)).map(b => b.ref);
smug.length ? warn("banned defaults (smirk / lidded eyes / hand on chin) — check they are deliberate: " + refs(smug)) : ok("no banned default expressions or poses");
const anat = P.filter(p => /\b(thigh|thighs|hips?|waist|chest|his body|her body|crotch|buttocks?)\b/i.test(p.prompt)).map(p => p.ref);
anat.length ? fail("anatomy vocabulary in prompts (reads badly beside 'teenager'): " + refs(anat)) : ok("no anatomy vocabulary in any prompt");
if (FILM) { const last = D.slice(-3); last.some(b => /broad smile|big smile|grin|laugh|celebrat|cheer|triumph|jump(s|ing)? for joy/i.test(b.performance + " " + b.action)) ? warn("the ending reads very happy — land on relief or cautious closeness unless the script says otherwise") : ok("the ending stays restrained"); }
const multi = D.filter(b => hasFace(b) && roleList(b).length > 1);
const unperformed = multi.filter(b => roleList(b).some(r => !new RegExp("\\b" + r.toUpperCase() + "\\b").test(b.performance))).map(b => b.ref);
unperformed.length ? fail("multi-character frames where a character gets no performance of their own: " + refs(unperformed)) : ok(`every character in all ${multi.length} multi-character frames has their own performance`);
const noGaze = multi.filter(b => !/\b(look|looks|looking|eye contact|pupils?|gaze|watch|watches|stares?|glances?)\b/i.test(b.performance + " " + b.action)).map(b => b.ref);
noGaze.length ? warn("multi-character frames that never say who looks at whom: " + refs(noGaze)) : ok("every multi-character frame states the eye line between them");
info("tiers " + dist(D, b => b.tier));
const GARMENT = /\b(pockets?|sleeves?|shirts?|t-shirt|jackets?|trousers|pants|jeans|dress|skirt|coat|hoodie|sweater|jumper|collar|vest|apron|uniform)\b/i;
const garment = D.filter(b => { let t = (b.action + " " + b.performance + " " + b.framing).replace(/\b(no|without|never|not)\b[^.;:]*/gi, ""); const propText = propKeys(b).map(k => PROP[k] ? PROP[k].name + " " + PROP[k].text : "").join(" "); propKeys(b).forEach(k => { if (PROP[k]) t = t.split(PROP[k].name).join(" "); }); const hits = (t.match(new RegExp(GARMENT.source, "gi")) || []).filter(w => !new RegExp("\\b" + w + "\\b", "i").test(propText)); return hits.length > 0; }).map(b => b.ref);
garment.length ? fail("body-garment words in beat text — only the small accessories in a ROLE are worn (a carried garment must be a PROP, named by its PROP name): " + refs(garment)) : ok("no body garments in beat text");
const roleGarment = Object.entries(ROLE).filter(([, v]) => GARMENT.test(String(v.text).replace(/\b(no|without|never|not)\b[^.;:]*/gi, ""))).map(([k]) => k);
roleGarment.length ? fail("ROLE entries that dress the body in a garment: " + roleGarment.join(" ")) : ok("no ROLE entry dresses the body");
const bigHead = D.filter(b => /\b(big|bigger|large|larger|huge|oversized|giant|enlarged|massive) head\b/i.test(b.action + " " + b.performance + " " + b.framing)).map(b => b.ref);
bigHead.length ? fail("beat text asking for a big head — use face: HUGE (the camera moves closer; the head never grows): " + refs(bigHead)) : ok("no beat asks for an enlarged head");

// ════════════════════════════════════════════════════════════════
console.log("\n=== PROPS, TEXT AND RECOGNITION ===");
const idleProps = D.filter(b => roleList(b).length).flatMap(b => propKeys(b).filter(k => PROP[k]).filter(k => { const t = (b.action + " " + b.framing + " " + b.performance).toLowerCase(); return !t.includes(PROP[k].name.toLowerCase().replace(/^the /, "")) && !(PROP[k].nouns || []).some(w => t.includes(w.toLowerCase())) && !t.includes(k.toLowerCase()); }).map(k => `${b.ref}(${k})`));
idleProps.length ? fail("props in a character frame that nobody uses, holds, looks at or reacts to: " + refs(idleProps)) : ok("every prop in a character frame is interacted with");
const longText = D.filter(b => b.requiredText && b.requiredText.trim()).map(b => `${b.ref}("${b.requiredText}")`);
longText.length ? fail("text printed inside the image — v19 puts no words in images; idea words go on screen in Premiere (kw): " + refs(longText)) : ok("no text is printed inside any image");
const floating = D.filter(b => b.requiredText && !/\b(sheet|paper|page|sign|board|note|card|letter|screen|label|jar|calendar|wall|door|banner|book|notebook|envelope|mug|poster|fridge|phone)\b/i.test(b.action + " " + b.framing)).map(b => b.ref);
floating.length ? warn("printed-text frames that never name the surface the words are on (floating text reads as infographic): " + refs(floating)) : ok("every printed-text frame puts its words on a real surface");
const unfinishedWords = D.filter(b => /\b(implied|suggested|partial(ly)?|half-drawn|sketch(ed|y)?|unfinished)\b/i.test(b.action + " " + b.framing)).map(b => b.ref);
unfinishedWords.length ? warn("beat text that invites unfinished drawing (implied / partial / sketched / half-drawn) — v19 outline places are complete, closed line drawings: " + refs(unfinishedWords)) : ok("no beat text invites unfinished shapes");
const ACC = ["tie", "bow tie", "scarf", "cap", "beanie", "glasses", "headband", "hair bow", "bandana", "hat", "headphones"];
const wearIssues = [], wearLoud = [];
Object.entries(ROLE).forEach(([k, v]) => {
  (v.wear || []).forEach(w => {
    if (!w || !w.item || !/^#[0-9a-f]{6}$/i.test(String(w.hex))) { wearIssues.push(`${k}(accessory needs item + hex)`); return; }
    if (!new RegExp("\\b" + w.item + "\\b", "i").test(v.text) || !String(v.text).toUpperCase().includes(String(w.hex).toUpperCase())) wearIssues.push(`${k}(${w.item} not described with its hex in the ROLE text)`);
    if (isRed(w.hex)) wearIssues.push(`${k}(${w.item} is strong red — red is for danger only)`);
    if (chroma(w.hex) > 0.6) wearLoud.push(`${k}(${w.item} ${w.hex})`);
  });
});
wearIssues.length ? fail("accessory problems: " + wearIssues.join(" ")) : ok("every accessory is locked in its ROLE with a hex");
wearLoud.length ? warn("accessories as saturated as a colour element — tone them down so the one colour element still wins: " + wearLoud.join(" ")) : ok("accessories stay quieter than the colour elements");
const accDrift = D.filter(b => roleList(b).length && b.shotSize !== "HANDS").filter(b => { const t = b.action + " " + b.performance + " " + b.framing; const worn = roleList(b).map(r => String((ROLE[r] || {}).text || "")).join(" "); return ACC.some(a => new RegExp("\\b" + a + "\\b", "i").test(t) && !new RegExp("\\b" + a + "\\b", "i").test(worn) && !propKeys(b).some(k => PROP[k] && new RegExp("\\b" + a + "\\b", "i").test(PROP[k].text))); }).map(b => b.ref);
accDrift.length ? warn("accessory named in beat text but not locked in any cast ROLE or PROP in that frame — it will drift: " + refs(accDrift)) : ok("no loose accessories in beat text");
const accClash = [];
D.forEach(b => { const k = ceKey(b); if (!k || !PROP[k]) return; roleList(b).forEach(r => ((ROLE[r] || {}).wear || []).forEach(w => { if (/^#[0-9a-f]{6}$/i.test(String(w.hex)) && hueDiff(w.hex, PROP[k].hex) < 30 && chroma(w.hex) > 0.35) accClash.push(`${b.ref}(${r}'s ${w.item} vs ${k})`); })); });
accClash.length ? warn("an accessory shares the colour element's hue — the eye splits between them: " + refs(accClash)) : ok("no accessory competes with its frame's colour element");
const byAge = {};
Object.entries(ROLE).forEach(([k, v]) => { (byAge[v.age] = byAge[v.age] || []).push(k); });
const sameAge = Object.entries(byAge).filter(([, v]) => v.length > 1);
if (sameAge.length) info("same-age characters (hair outline differs by rule — see qa-v19.cjs; also vary height or a head detail): " + sameAge.map(([a, v]) => `${a}: ${v.join(", ")}`).join(" · "));

// ════════════════════════════════════════════════════════════════
console.log("\n=== STORY ===");
const noPurpose = D.filter(b => !String(b.meaning).trim() || !String(b.feel).trim()).map(b => b.ref);
noPurpose.length ? fail("frames without an idea (idea / me) or a feel (ft / fe): " + refs(noPurpose)) : ok("every frame states its idea and its feel");
if (FILM) { const orphan = [...new Set(D.map(b => b.sequence))].filter(s => !D.some(b => b.sequence === s && String(b.link).trim().length > 5)); orphan.length ? warn("segments with no stated link (lk: setup / callback / consequence) to any other: " + orphan.join(" | ")) : ok("every segment states a link to another"); }
const concept = D.filter(b => b.fn === "CONCEPT");
info(`metaphor (CONCEPT) frames: ${concept.length} — v19: a metaphor only where it adds meaning the words don't already carry`);
if (FILM && concept.length) {
  const noFam = concept.filter(b => !String(b.metaphor || "").trim()).map(b => b.ref);
  noFam.length ? warn("metaphor frames without a family tag (`mf`) — name the through-line each belongs to so none is random: " + refs(noFam)) : ok("every metaphor frame names its family");
}
info(`humour beats (moment "humour…" or line type humour-aside): ${D.filter(b => /^humou?r/i.test(String(b.moment)) || /humou?r/.test(String((b.plan || {}).ln))).length}`);

console.log("\n=== STORY PLAN, FINISHED SCENES, MOTIFS ===");
const seqs = [...new Set(D.map(b => b.sequence))];
if (!STORY || !PLAN || !MOTIFS) fail("the build has no STORY / PLAN / MOTIFS blocks — copy them from the template");
else {
  (STORY.idea && STORY.arc && STORY.ending && ![STORY.idea, STORY.arc, STORY.ending].some(x => /^</.test(String(x)))) ? ok("STORY idea, arc and ending written") : fail("STORY idea / arc / ending not written");
  const planSeqs = PLAN.map(r => r.sequence);
  const noRow = seqs.filter(q => !planSeqs.includes(q)), ghost = planSeqs.filter(q => !seqs.includes(q));
  noRow.length ? fail("segments with no PLAN row: " + noRow.join(" | ")) : ok("every segment has a PLAN row");
  ghost.length ? (PARTIAL ? info("PLAN rows not written yet: " + ghost.join(" | ")) : fail("PLAN rows with no frames: " + ghost.join(" | "))) : ok("every PLAN row has frames");
  JSON.stringify(planSeqs.filter(q => seqs.includes(q))) === JSON.stringify(seqs.filter(q => planSeqs.includes(q))) ? ok("PLAN order matches the film") : fail("PLAN rows are out of order");
  const thin = PLAN.filter(r => !String(r.purpose || "").trim() || !String(r.feel || "").trim()).map(r => r.sequence);
  thin.length ? fail("PLAN rows without a purpose and feel: " + thin.join(" | ")) : ok("every PLAN row states its purpose and feel");
  const badPlanMood = PLAN.filter(r => !MOOD[moodOf(r.mood)]).map(r => r.sequence);
  badPlanMood.length ? fail("PLAN rows with an unknown mood: " + badPlanMood.join(" | ")) : ok("every PLAN mood is valid");
  const unfinished = [];
  const inProgress = PARTIAL && N < TOTAL ? seqs[seqs.length - 1] : null;
  seqs.forEach(q => {
    const row = PLAN.find(r => r.sequence === q) || {};
    if (row.open || q === inProgress) return;
    const st = D.filter(b => b.sequence === q).map(b => b.stage);
    const iP = st.indexOf("PROBLEM");
    const iR = st.lastIndexOf("RESULT");
    if (iR < 0) unfinished.push(`${q.slice(0, 22)}(no RESULT)`);
    else if (iP >= 0 && (st.indexOf("REACTION", iP) < 0 || st.lastIndexOf("RESULT") < iP)) unfinished.push(`${q.slice(0, 22)}(problem without reaction/result)`);
  });
  unfinished.length ? fail("scenes left unfinished — every segment needs its reaction and result: " + unfinished.join(" | ")) : ok("every segment finishes (problem → reaction → result)");
  PLAN.filter(r => r.open).forEach(r => {
    const last = D.filter(b => b.sequence === r.sequence).slice(-1)[0], pay = D.find(b => b.ref === r.payoff);
    if (PARTIAL && !pay && /^S\d+/.test(String(r.payoff || ""))) { info(`open segment "${r.sequence}" pays off at ${r.payoff} — not written yet`); return; }
    (pay && last && pay.n > last.n) ? ok(`open segment "${r.sequence}" is paid off at ${r.payoff}`) : fail(`open segment "${r.sequence}" has no valid later payoff ref (got "${r.payoff || ""}")`);
  });
  const refSet = new Set(D.map(b => b.ref));
  const badLinks = D.flatMap(b => (String(b.link).match(/\bS\d+[a-z]?\b/g) || []).filter(r => !refSet.has(r)).map(r => `${b.ref}→${r}`));
  const skAll = new Set((SKETCH || []).map(l => String(l).split("|")[0].trim()));
  const hardBad = PARTIAL ? badLinks.filter(x => !skAll.has(x.split("→")[1])) : badLinks;
  if (PARTIAL && badLinks.length > hardBad.length) info("links to frames not written yet: " + refs(badLinks.filter(x => !hardBad.includes(x))));
  hardBad.length ? fail("links pointing at refs that don't exist (setups never paid off): " + refs(hardBad)) : ok("every ref named in a link exists");
  const mBad = MOTIFS.filter(m => !PROP[m.key] && !WORLD[m.key]).map(m => m.key);
  mBad.length ? fail("MOTIFS with keys that are neither PROP nor WORLD: " + mBad.join(" ")) : ok("every motif key is a PROP or WORLD");
  // Thomas: "every recurring object should have a reason, evolve with the story, mean something different later"
  const flat = MOTIFS.filter(m => (PROP[m.key] || WORLD[m.key]) && D.filter(b => b.world === m.key || propKeys(b).includes(m.key)).length > 1 && (m.arc || []).length < 2).map(m => m.key);
  flat.length ? fail("recurring objects with no change of meaning written in MOTIFS.arc (a recurring object must evolve): " + flat.join(" ")) : ok("every recurring motif states how its meaning changes");
  MOTIFS.filter(m => PROP[m.key] || WORLD[m.key]).forEach(m => { const hits = D.filter(b => b.world === m.key || propKeys(b).includes(m.key)); info(`motif ${m.key}: ${hits.length} appearances in ${new Set(hits.map(b => b.sequence)).size} segments — ${refs(hits.map(b => b.ref))}; arc ${(m.arc || []).join(" → ")}`); });
}

// ════════════════════════════════════════════════════════════════
console.log("\n=== COLOUR (the v19 background rules are in qa-v19.cjs) ===");
const badMood = D.filter(b => !MOOD[moodOf(b.mood)]).map(b => b.ref);
badMood.length ? fail("unknown moods: " + refs(badMood)) : ok("every frame has a valid mood");
const legacy = D.filter(b => b.moodWas || MOOD_ALIAS[b.mood]).map(b => `${b.ref}(${b.moodWas || b.mood}→${moodOf(b.mood)})`);
if (legacy.length) info("older mood names mapped by the compiler: " + refs(legacy));
const badHero = D.filter(b => !isWord(b) && !["FACE", "FIGURE"].includes(b.hero) && !PROP[b.hero]).map(b => b.ref);
badHero.length ? fail("unknown heroes: " + refs(badHero)) : ok("every frame has a valid hero");
const lowHero = [], sameFamily = [];
D.forEach(b => {
  const k = ceKey(b); if (!k || !PROP[k]) return; const h = PROP[k].hex, bg = bgHex(b); if (!bg) return;
  if (/^#(FFFFFF|F4F1E8)$/i.test(h) && !PROP[k].part) return; // a white object is a line drawing, not a colour element
  if (chroma(h) < 0.45) lowHero.push(`${b.ref}(${k} ${h})`);
  if (chroma(bg) > 0.12 && hueDiff(h, bg) < 35 && chroma(h) - chroma(bg) < 0.3) sameFamily.push(`${b.ref}(${k} on ${moodOf(b.mood)} ${bg})`);
});
lowHero.length ? fail("colour elements not saturated enough to lead the eye: " + refs(lowHero)) : ok("every colour element is saturated");
sameFamily.length ? fail("colour element in the same colour family as its background field: " + refs(sameFamily)) : ok("no colour element sits in its background's colour family");
info(`mood mix ${dist(D, b => moodOf(b.mood))} · peaks marked: ${D.filter(b => b.peak).length}`);
const redBad = [...Object.entries(PROP), ...Object.entries(OVERLAY)].filter(([, v]) => isRed(v.hex) && !v.danger).map(([k]) => k);
redBad.length ? fail("strong red on objects not flagged as danger: " + redBad.join(" ")) : ok("strong red only on danger objects");
const redFrames = D.filter(b => propKeys(b).some(k => PROP[k] && isRed(PROP[k].hex)) || /DANGER_RED|#D32F2F/i.test(b.action)).map(b => b.ref);
info("frames with danger red: " + (refs(redFrames) || "none"));
const forced = P.filter(p => /at least three (large )?areas|must carry (the )?colou?r|three large areas of solid/i.test(p.prompt)).map(p => p.ref);
forced.length ? fail("forced-saturation quota language (the Video 2 single-hue bug): " + refs(forced)) : ok("no forced-saturation quota language");
const noColourBlock = P.filter(p => !/COLOUR: /.test(p.prompt)).map(p => p.ref);
noColourBlock.length ? fail("prompts missing the per-frame colour block: " + refs(noColourBlock)) : ok("every prompt carries its per-frame colour block");

// ════════════════════════════════════════════════════════════════
console.log("\n=== POP-INS ===");
const cues = D.filter(b => b.pop);
const badPop = cues.filter(b => !b.pop.what || !(PROP[b.pop.what] || OVERLAY[b.pop.what]) || !["ADD", "PUNCH"].includes(b.pop.type) || !b.pop.on || !b.pop.motion).map(b => b.ref);
badPop.length ? fail("malformed pop cues (what / on / type ADD|PUNCH / motion): " + refs(badPop)) : ok(`${cues.length} pop cues, all well-formed`);
const addInFrame = cues.filter(b => b.pop.type === "ADD" && propKeys(b).includes(b.pop.what)).map(b => b.ref);
addInFrame.length ? fail("ADD pops whose element is also drawn in the base frame: " + refs(addInFrame)) : ok("ADD pop elements are absent from their base frames");
const punchMissing = cues.filter(b => b.pop.type === "PUNCH" && !propKeys(b).includes(b.pop.what)).map(b => b.ref);
punchMissing.length ? fail("PUNCH pops whose element isn't in the frame: " + refs(punchMissing)) : ok("PUNCH pop elements are in their frames");
const wordMissing = cues.filter(b => !new RegExp(String(b.pop.on).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(b.script)).map(b => b.ref);
wordMissing.length ? warn("pop cue word not found in its script line: " + refs(wordMissing)) : ok("every pop cue word appears in its line");
info(`${cues.length} pop cues, ${(OVERLAY_PROMPTS || []).length} overlay prompts to generate`);

// ════════════════════════════════════════════════════════════════
console.log("\n=== MOTION, EDITS AND REVEALS ===");
const MOVES = ["PUSH_IN", "PULL_OUT", "SNAP_ZOOM", "PAN_LEFT", "PAN_RIGHT", "TILT_UP", "TILT_DOWN", "DRIFT", "SHAKE", "HOLD"];
const esc = w => String(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const noMove = D.filter(b => !b.move || !MOVES.includes(b.move.type)).map(b => b.ref);
noMove.length ? fail("frames without a valid camera-move cue (move.type " + MOVES.join(" / ") + "): " + refs(noMove)) : ok(`every frame has a camera-move cue (${N})`);
const moveOff = D.filter(b => b.move && b.move.on && !new RegExp("\\b" + esc(b.move.on) + "\\b", "i").test(b.script)).map(b => b.ref);
moveOff.length ? (SCRIPT_OK ? fail : warn)("camera moves timed to a word that is not in the line: " + refs(moveOff)) : ok("every word-timed camera move lands on a word in its line");
const hitNoWord = D.filter(b => b.move && ["SNAP_ZOOM", "SHAKE"].includes(b.move.type) && !String(b.move.on || "").trim()).map(b => b.ref);
hitNoWord.length ? fail("SNAP_ZOOM / SHAKE cues that don't name the word they hit: " + refs(hitNoWord)) : ok("every snap zoom and shake names its word");
info("camera moves " + dist(D, b => b.move ? b.move.type : "none"));
const xcSoft = D.filter(b => b.shotSize === "XCLOSE" && roleList(b).length && b.face !== "HUGE").map(b => b.ref);
xcSoft.length ? warn("XCLOSE frames whose face value isn't HUGE — an extreme close-up crops into the face: " + refs(xcSoft)) : ok("every extreme close-up is a HUGE face");
// CORE RULE: in-scene changes are image edits of the frame, never new prompts
const EC = EDIT_CUES || [];
const badEdit = EC.filter(e => { const b = D.find(x => x.ref === e.ref); return !b || !e.on || !e.change || !new RegExp("\\b" + esc(e.on) + "\\b", "i").test(b.script); }).map(e => e.ref);
badEdit.length ? fail("CORE RULE — edit cues pointing at a missing frame, with no change text, or with a cue word not in the line: " + refs(badEdit)) : ok(`CORE RULE — every edit names its frame, its cue word and the change (${EC.length} edits)`);
const thinEdit = EC.filter(e => String(e.change).length < 180 || !/(stay|stays) exactly/i.test(e.change)).map(e => e.ref);
thinEdit.length ? fail("CORE RULE — edit changes too vague for the image editor: say who changes, from what to what (pose, limbs, head, eyebrows, pupils, mouth, or the object's position, size and colour), and what stays exactly as it is: " + refs(thinEdit)) : ok("CORE RULE — every edit is detailed and says what stays exactly as it is");
const dupEdit = EC.filter((e, i) => EC.findIndex(x => x.ref === e.ref) !== i).map(e => e.ref);
dupEdit.length ? fail("CORE RULE — more than one edit on the same frame: " + refs(dupEdit)) : ok("CORE RULE — one edit per frame");
const noCharEdit = EC.filter(e => { const b = D.find(x => x.ref === e.ref); return b && b.roles === "No characters" && !/appears?/i.test(e.change); }).map(e => e.ref);
noCharEdit.length ? warn("edits on frames with no characters that don't make something appear: " + refs(noCharEdit)) : ok("edits change a character or make something appear");
const editSet = new Set(EC.map(e => e.ref));
const peakNoMotion = D.filter(b => b.peak && b.roles !== "No characters" && b.shotSize !== "XCLOSE" && !editSet.has(b.ref) && !b.pop && !b.reveal && !b.still).map(b => b.ref);
peakNoMotion.length ? warn("emotional peaks with a character but no edit, pop, reveal or stated stillness (sti): " + refs(peakNoMotion)) : ok("every character peak has an edit, pop, reveal or a stated stillness");
const revAll = D.filter(b => b.reveal);
const heldMask = revAll.filter(b => b.reveal.method === "MASK" && !/on the sheet|on the page|display|screen|dial|paper/i.test(b.reveal.how || "") && String(b.reveal.what).split("+").some(w => PROP[w] && new RegExp("(holds?|grips?|clutch\\w*|in (his|her) (mitten )?hand)[^.;]*" + (PROP[w].name || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(b.action))).map(b => b.ref);
heldMask.length ? warn("mask reveals on an object someone is holding — the cover shape would cut into the hand; keep the object on a surface or in the air: " + refs(heldMask)) : ok("no mask reveal on an object held in a hand");
const REV_SPECIAL = ["EFFECT", "SET", "SPEECH", "THOUGHT"];
const badRev = revAll.filter(b => { const r = b.reveal; if (!r.what || !r.on) return true; if (r.method === "MASK") { if (!/^#[0-9A-Fa-f]{6}$/.test(String(r.cover || "")) || !r.how) return true; } else if (!r.ps || !["LAYER", "FILL"].includes(r.method) || (r.method === "LAYER" && !r.anim)) return true; return String(r.what).split("+").some(w => !(propKeys(b).includes(w) || roleList(b).includes(w) || REV_SPECIAL.includes(w))); }).map(b => b.ref);
badRev.length ? fail("reveal cues missing what / on / method (MASK with cover + how, or LAYER / FILL with ps steps), or removing something that isn't in the frame: " + refs(badRev)) : ok(`every reveal names the element, the word and how to do it in the edit (${revAll.length} reveals, no extra generation)`);
const revWord = revAll.filter(b => !new RegExp("\\b" + esc(b.reveal.on) + "\\b", "i").test(b.script)).map(b => b.ref);
revWord.length ? (SCRIPT_OK ? fail : warn)("reveal words that aren't in the line: " + refs(revWord)) : ok("every reveal lands on a word in its line");
const revFill = revAll.filter(b => !/^#[0-9A-Fa-f]{6}$/.test(String(b.reveal.cover || b.reveal.fill || ""))).map(b => b.ref);
revFill.length ? warn("reveals without the exact background fill colour for touch-ups: " + refs(revFill)) : ok("every reveal gives the exact background colour for touch-ups");
info(`in-scene edits ${EC.length} · mask reveals ${revAll.length} · pop-ins ${cues.length} · sequences ${(SEQUENCES || []).length} · still on purpose (sti) ${D.filter(b => b.still).length}`);
const noLife = D.filter(b => !editSet.has(b.ref) && !b.pop && !b.reveal && !b.still && !(b.zooms && b.zooms.length) && !b.onScreen && !isWord(b)).map(b => b.ref); // v24: a planned reframe (zm) or a landing word is a change
noLife.length ? warn("frames with no edit, reveal, pop-in, reframe or word and no stated stillness (sti) — say why the frame is still, or let something change: " + refs(noLife)) : ok("every frame changes on screen or says why it is still");
const DEVICES = ["CONTEXT", "CUTAWAY_MAP", "THROUGH_FRAME", "AFTERMATH", "ESCALATION_RAMP", "CONSTANT_VS_CHANGE", "REPEAT_WITH_VARIATION", "TIME_MARKER", "CAUSE_EFFECT_CUT", "BEFORE_AFTER", "SCALE_SHIFT", "OBJECT_POV", "INSERT_DETAIL", "METAPHOR_OBJECT", "METAPHOR_WORLD", "SILENT_BEAT", "OTS_REACTION", "POWER_ANGLE", "DISTANCE", "MIRROR", "TUG_OF_WAR", "SPLIT_STATE", "HYPOTHETICAL", "LIST_DEVICE", "CALLBACK"];
const withDev = D.filter(b => b.device);
if (withDev.length) { const newDev = [...new Set(withDev.filter(b => !DEVICES.includes(b.device)).map(b => b.device))]; info("storytelling devices " + dist(withDev, b => b.device) + (newDev.length ? ` · new device keys (open library — add them to the library if they worked): ${newDev.join(", ")}` : "")); }

console.log("\n=== RENDER RISKS ===");
const strongClose = D.filter(b => CLOSE_FACE.includes(b.shotSize) && ["LOW", "HIGH", "POV"].includes(b.angle)).map(b => b.ref);
strongClose.length ? warn("close-ups with a strong low, high or point-of-view angle — close-ups read best at eye level (natural camera positions): " + refs(strongClose)) : ok("close-ups at natural angles");
const loneArm = D.filter(b => b.shotSize !== "HANDS" && /(arm|forearm)[^.;]*(reach|reaches|enter|enters)[^.;]*(edge|corner)|rest of (her|him) (cropped|out of frame)|seen (only )?as (her|his) (arm|hand)/i.test(b.framing + " " + b.action + " " + b.performance)).map(b => b.ref);
loneArm.length ? warn("a character shown only as an arm reaching in from the frame edge — it renders as a long noodle arm with a giant glove; show them half in view (head, shoulder and arm) or cut them: " + refs(loneArm)) : ok("no lone arms reaching in from the frame edge");
const rtxt = b => `${b.framing} ${b.action} ${b.performance}`;
const bigWord = /\b(giant|towering|enormous|as tall as|twice real size)\b/i;
const sizeWords = D.filter(b => bigWord.test(b.framing + " " + b.action) && !(scaled(b) && PROP[b.hero]) && !propKeys(b).some(k => PROP[k] && bigWord.test(PROP[k].text))).map(b => b.ref);
sizeWords.length ? warn("a prop is called giant/towering in the text but the frame's scale says ORDINARY — give the big object its own PROP entry with that size, or make it the scaled hero: " + refs(sizeWords)) : ok("no prop is given two different sizes");
const closeFull = D.filter(b => CLOSE_FACE.includes(b.shotSize) && /\b(full figure|from the knees up|whole figure)\b/i.test(rtxt(b))).map(b => b.ref);
closeFull.length ? warn("close shots that also describe a full figure — pick one framing: " + refs(closeFull)) : ok("close shots never describe a full figure");
const risky = D.filter(b => /camera's hands|half[- ]hidden|partly hidden|barely visible|faintly/i.test(rtxt(b))).map(b => b.ref);
risky.length ? warn("wording that invites stray hands or half-drawn objects: " + refs(risky)) : ok("no stray-hands or half-drawn wording");
// v19: off-centre close-ups are right when the open side is the side the eyes look (lead room, from `look`); without a look
// the empty half has no reason and invites the generator to print text there.
const emptyClose = D.filter(b => CLOSE_FACE.includes(b.shotSize) && ["WHITE", "CLEAN"].includes(moodOf(b.mood)) && /off-centre|at the (left|right) edge|cropped at the (left|right)/i.test(b.framing) && !String((b.plan || {}).look || "").trim()).map(b => b.ref);
emptyClose.length ? warn("close-ups pushed to one edge with no look to explain the open side — give them a look (lead room) or centre them: " + refs(emptyClose)) : ok("every off-centre close-up has a gaze that explains its open side");
const flip = [];
const spot = b => String(b.scene || "").split(",")[0].trim().toLowerCase();
const tone = b => ["WHITE"].includes(moodOf(b.mood)) || isWord(b) ? "break" : moodOf(b.mood);
for (let i = 1; i < N - 1; i++) { const a = D[i - 1], b = D[i], c = D[i + 1]; if (tone(b) === "break" || b.peak) continue; if (spot(a) === spot(b) && spot(b) === spot(c) && tone(a) === tone(c) && tone(b) !== tone(a) && tone(a) !== "break") flip.push(b.ref); }
flip.length ? warn("one-frame background flicker inside a continuous scene (A → B → A in the same place, not a white break or a peak) — keep the scene's background: " + refs(flip)) : ok("no one-frame background flicker inside a scene (white breaks and peaks are deliberate)");
const darkNoLock = P.filter(p => moodOf(p.mood) === "NIGHT" && roleList(p).length && !/never grey, never black-and-white/.test(p.prompt)).map(p => p.ref);
darkNoLock.length ? fail("NIGHT character frames without the navy-not-grey lock (the Video 4 cutaway rendered grey with white hair): " + refs(darkNoLock)) : ok("night frames carry the navy-not-grey and black-hair lock");

console.log("\n=== PROMPT SHAPE ===");
const inj = P.filter(p => /\boverride\b|ignore (the |all )?(previous|above)|read these|check (them|this|it) last|final check|\bverify\b|go back over|\bstep (1|2|3|one|two|three)\b|before finali[sz]ing|count them|\brecheck\b|you must|as an ai/i.test(p.prompt)).map(p => p.ref);
inj.length ? fail("instruction-shaped wording a safety layer reads as injection: " + refs(inj)) : ok("no instruction-shaped wording in any prompt");
const contra = P.filter(p => /finger/i.test(p.prompt) || /wobbl/i.test(p.prompt)).map(p => p.ref);
contra.length ? fail("rule-fighting vocabulary (\"finger\" beside the mitten hand, or \"wobbly\" beside single-stroke limbs): " + refs(contra)) : ok("no rule-fighting vocabulary");
const charLens = P.filter(p => roleList(p).length).map(p => p.prompt.length), objLens = P.filter(p => !roleList(p).length).map(p => p.prompt.length);
const med = a => a.length ? [...a].sort((x, y) => x - y)[Math.floor(a.length / 2)] : 0;
info(`prompt length: character frames median ${med(charLens)} (${Math.min(...charLens, Infinity)}–${Math.max(...charLens, 0)}), no-character frames median ${med(objLens) || "n/a"}`);
const tooLong = P.filter(p => p.prompt.length > 18000).map(p => `${p.ref}:${p.prompt.length}`);
tooLong.length ? fail("prompts over 18,000 characters (Video 2's 22k prompts were refused): " + refs(tooLong)) : ok("every prompt under 18,000 characters");
const bandOut = P.filter(p => hasFace(p) && !(p.plan && p.plan.ln === "cast-check") && (p.prompt.length < 4000 || p.prompt.length > 13000)).map(p => `${p.ref}:${p.prompt.length}`); // a cast-check lineup carries every ROLE text on purpose
bandOut.length ? warn("face prompts outside the 4k–13k band — long character text fights the reference images; check for stacked blocks: " + refs(bandOut)) : ok("face prompts sit in the 4k–13k band (the reference images carry identity; the text carries the moment)");
const lockPos = [];
P.filter(p => roleList(p).length).forEach(p => {
  const t = p.prompt, L = t.length;
  const first = s => t.indexOf(s) / L, lastI = s => t.lastIndexOf(s) / L;
  if (!(first("mitten") >= 0 && first("mitten") < 0.25 && lastI("mitten") > 0.6)) lockPos.push(p.ref + "(hands)");
  if (hasFace(p) && !(first("white round eyes") >= 0 && first("white round eyes") < 0.25 && lastI("white round eyes") > 0.6)) lockPos.push(p.ref + "(eyes)");
  if (hasFace(p) && !(first("head size as in the references") >= 0 && first("head size as in the references") < 0.25 && lastI("head size as in the references") > 0.6)) lockPos.push(p.ref + "(proportions)");
  if (!/ATTACHED REFERENCE IMAGES/.test(t.slice(0, 1500))) lockPos.push(p.ref + "(reference anchor not at the top)");
});
lockPos.length ? fail("construction locks missing from the top or the tail of the prompt: " + refs(lockPos)) : ok("reference anchor at the top; hand, eye and head-size locks at both the top and the tail of every character prompt");
const objLock = P.filter(p => !isWord(p) && !/same shape and part count/.test(p.prompt)).map(p => p.ref);
objLock.length ? fail("prompts missing the object-consistency lock: " + refs(objLock)) : ok("object-consistency lock in every prompt");
const noCount = Object.entries(PROP).filter(([, v]) => !/\b(exactly|one|two|three|four|five|six|seven|eight|nine|ten|\d+)\b/i.test(v.text)).map(([k]) => k);
noCount.length ? fail("props without a countable build spec: " + noCount.join(" ")) : ok("every prop carries a countable build spec");

// ── wording that image models print or fight ──
{
  const QUOTE = /['‘’"“”][A-Za-z][^'"“”‘’\n]{0,20}['’"”]/;
  const unq = s => String(s).replace(/\b\w+['’]s\b/g, "");
  const qBeat = D.filter(b => QUOTE.test(unq([b.framing, b.action, b.performance].join(" ")))).map(b => b.ref);
  qBeat.length ? warn("quoted words in the scene — image models print them; describe the gesture or shape instead: " + refs(qBeat)) : ok("no quoted words in any scene");
  const light = D.filter(b => /\b(glow|glowing|shadows?|gradient)\b/i.test([b.framing, b.action, b.performance].join(" "))).map(b => b.ref);
  light.length ? warn("lighting words that fight the flat style: " + refs(light)) : ok("no glow or shadow words in scenes");
  const NAMES = Object.keys(ROLE).map(k => k.toUpperCase()).sort((a, b) => b.length - a.length);
  const propNames = Object.entries(PROP).map(([k, v]) => [k, v.name]);
  const eFinger = [], eAnat = [], eQuote = [], eWho = [], eWhat = [], eSame = [];
  const STOP = new Set("a an the and or but of to in on at for with you your i it its is are was be that this they them their there then not no so as by from my me we our he she his her him do does did can may".split(" "));
  for (const e of (EDIT_CUES || [])) {
    const b = D.find(x => x.ref === e.ref); if (!b) continue; const ch = String(e.change || "");
    if (/\bfingers?\b/i.test(ch)) eFinger.push(e.ref);
    if (/\b(thigh|thighs|hips?|waist|chest|crotch|buttocks?)\b/i.test(ch) || GARMENT.test(ch)) eAnat.push(e.ref);
    if (QUOTE.test(unq(ch))) eQuote.push(e.ref);
    let stripped = ch; for (const [, n] of propNames) stripped = stripped.split(n).join(" ");
    const cast = roleList(b).map(x => x.toUpperCase());
    for (const n of NAMES) { if (new RegExp("\\b" + n + "\\b").test(stripped) && !cast.includes(n)) eWho.push(e.ref + ":" + n); stripped = stripped.split(n).join(" "); }
    for (const [k, n] of propNames) if (ch.includes(n) && !propKeys(b).includes(k)) eWhat.push(e.ref + ":" + n);
    const busy = [b.pop && b.pop.on, b.reveal && b.reveal.on].filter(Boolean).map(x => String(x).toLowerCase());
    if (busy.includes(String(e.on).toLowerCase())) { const other = (String(b.script || "").match(/[A-Za-z]+/g) || []).filter(w => w.length >= 3 && !STOP.has(w.toLowerCase()) && !busy.includes(w.toLowerCase())); if (other.length) eSame.push(e.ref); }
  }
  eFinger.length ? fail("edits that say finger — the characters have mitten hands: " + refs(eFinger)) : ok("no edit mentions fingers");
  eAnat.length ? fail("anatomy or clothing words in edits: " + refs(eAnat)) : ok("no anatomy or clothing words in edits");
  eQuote.length ? warn("quoted words in edits — they get printed: " + refs(eQuote)) : ok("no quoted words in edits");
  eWho.length ? fail("edits that name a character who is not in the frame: " + refs(eWho)) : ok("every edit names only characters in its frame");
  eWhat.length ? fail("edits that name an object that is not in the frame: " + refs(eWhat)) : ok("every edit names only objects in its frame");
  eSame.length ? warn("edits landing on the same word as a pop-in or mask when the line has another word: " + refs(eSame)) : ok("edits and pop-ins land on different words");
  info(`HOLD frames ${D.filter(b => b.move && b.move.type === "HOLD").length} · sequences ${(SEQUENCES || []).length} (${(SEQUENCES || []).map(s => s.id + ":" + s.images.length).join(" ") || "none"})`);
}

// ════════════════════════════════════════════════════════════════
console.log("\n" + (fails ? `${fails} CHECK(S) FAILED` : "ALL CHECKS PASSED") + (warns ? ` · ${warns} warning(s) to read` : "") + ` — ${N}${TOTAL !== N ? " of " + TOTAL : ""} frames` + (PARTIAL ? " (partial — run without --partial once every line is written)" : ""));
console.log("A green suite is evidence about the prompts, not the pictures: render test frames before the batch. Run qa-v19.cjs too.\n");
process.exit(fails ? 1 : 0);
