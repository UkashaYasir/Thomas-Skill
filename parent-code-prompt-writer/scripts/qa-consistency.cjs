// Consistency sweep — the clashes the other checks miss (v18.2/v18.3, updated for compiler v19).
// Usage: node scripts/qa-consistency.cjs <build.jsx>
// v19: the "hero colour part" and "locked colour grammar" checks are gone (the colour block now names ONE colour element);
// added: every plan field reaches its prompt block (INTERACTION BEAT, DISTANCE, CLOSE-UP LOGIC, the colour element).
const fs = require("fs"), vm = require("vm");
let s = fs.readFileSync(process.argv[2], "utf8"); s = s.slice(0, s.indexOf("/* ===== UI ===== */")).replace(/^\s*import[^\n]*\n/gm, "");
const M = vm.runInNewContext(s + ";({RAW_BEATS,PROMPTS,PROP,ROLE,WORLD,EDIT_CUES,SEQUENCES,MOOD,MOOD_ALIAS:(typeof MOOD_ALIAS==='undefined'?{}:MOOD_ALIAS),CLEAN_GROUND:(typeof CLEAN_GROUND==='undefined'?'':CLEAN_GROUND)})", {});
const moodOf = m => M.MOOD[m] ? m : (M.MOOD_ALIAS[m] || m);
let fails = 0; const out = (ok, msg, list) => { if (ok) console.log("  ok    " + msg); else { fails++; console.log("  FAIL  " + msg + ": " + list.join(" ")); } };
const ed = r => [...M.EDIT_CUES.filter(e => e.ref === r).map(e => e.change), ...M.SEQUENCES.flatMap(q => q.images.filter(i => i.ref === r && i.change).map(i => i.change))].join(" ");
const props = Object.values(M.PROP).map(p => p.name).sort((a, b) => b.length - a.length), strip = t => props.reduce((x, n) => x.split(n).join(" "), t);
const B = M.RAW_BEATS, txt = b => strip([b.action, b.map, b.performance].join(" ") + " " + ed(b.ref)), cast = b => b.roles === "No characters" ? [] : b.roles.split(",").map(x => x.trim());
const whiteClose = B.filter(b => moodOf(b.mood) === "WHITE" && cast(b).length && ["CLOSE", "XCLOSE", "FACE_HANDS", "REACTION"].includes(b.shotSize));
const room = /\b(table|chair|counter|fridge|wall|door(way)?|stairs?|rail|sofa|bed|shelf|floor|window|desk|kitchen|hall)\b/i;
let l = whiteClose.filter(b => room.test(txt(b))).map(b => `${b.ref}(${txt(b).match(room)[0]})`); out(!l.length, "pure-white face close-ups name no room part (an outline place belongs on CLEAN)", l);
l = String(M.CLEAN_GROUND).toUpperCase() === "#FFFFFF" ? [] : M.PROMPTS.filter(p => !["WHITE"].includes(moodOf(p.mood)) && p.shotSize !== "WORD" && /white (space|wall|background)|almost-white|frosty blue/i.test(strip(p.prompt))).map(p => p.ref); out(!l.length, "frames that are not WHITE never call their ground white space or a white background (whole prompt)", l);
const gone = /\b(rug|carpet|poster|potted plant|crayon drawings?|wall hooks?|doormat|floor lamp|skirting)\b/i;
l = B.filter(b => gone.test(txt(b))).map(b => `${b.ref}(${txt(b).match(gone)[0]})`); out(!l.length, "no removed room dress is named", l);
l = M.PROMPTS.filter(p => /\bplank|tiles?\b|brick|wood grain/i.test((p.prompt.match(/SETTING:[^]*?(Nothing else|nothing else)/) || [""])[0])).map(p => p.ref); out(!l.length, "settings carry no texture", l);
l = B.filter(b => b.shotSize === "HANDS" && /from the left/i.test(b.map) && /from the right/i.test(b.map) && cast(b).length === 1).map(b => b.ref); out(!l.length, "one-person hands frames do not enter from both side edges", l);
l = B.filter(b => M.PROP[b.hero] && b.focus !== "light" && new RegExp(`(shrunk to|shrinks to|tiny dot)[^.;]{0,40}${M.PROP[b.hero].name}|${M.PROP[b.hero].name}[^.;]{0,40}(shrunk to|tiny dot)|small (white )?(thought|speech) bubble[^.;]{0,30}(holding|with)[^.;]{0,20}${M.PROP[b.hero].name}`, "i").test([b.action, ed(b.ref)].join(" "))).map(b => b.ref);
out(!l.length, "object focus is light where the object is small on purpose", l);
l = B.filter(b => M.PROP[b.hero] && new RegExp(`${M.PROP[b.hero].name}[^.;]{0,30}behind (his|her) back`).test(b.action) && !/toward us/.test(b.action + b.map)).map(b => b.ref); out(!l.length, "objects hidden behind a back are turned toward us", l);
const cw = /\b(sage|lavender|powder[- ]blue|steel[- ]blue|denim|straw|butter|heather|sea-glass|dusty[- ]rose|cornflower|periwinkle|mauve|frost[- ]blue|honey)\b(?! charm)/i;
l = B.filter(b => cw.test(b.map)).map(b => `${b.ref}(${b.map.match(cw)[0]})`); out(!l.length, "placement names walls generically, not by colour", l);
const NAMES = Object.keys(M.ROLE); l = []; B.forEach(b => NAMES.forEach(n => { let t = strip([b.action, b.map].join(" ")); NAMES.filter(x => x !== n && x.length > n.length && x.toUpperCase().includes(n.toUpperCase())).forEach(x => { t = t.split(x.toUpperCase()).join(" "); }); const look = String((b.plan || {}).look || "").toUpperCase(); if (new RegExp("\\b" + n.toUpperCase() + "\\b").test(t) && !cast(b).includes(n) && !(/OUT OF FRAME/.test(look) && new RegExp("\\b" + n.toUpperCase() + "\\b").test(look))) l.push(`${b.ref}(${n})`); })); out(!l.length, "every character named in a frame is cast in it (a close-up's out-of-frame gaze target comes from its look)", l);
l = B.filter(b => { const W = M.WORLD[b.world]; return W && W.parts && /chairs\b/.test(strip([b.action, b.map].join(" "))) && !/(sit|seated|sat)/i.test(b.action) && !/\bchairs\b.*(fort|blanket)/i.test(b.action); }).map(b => b.ref); out(!l.length, "chairs appear only for people sitting", l);
// v18.3 — from the full read of Version 6
const P = M.PROMPTS, eyesOnly = b => /^Eyes-only/.test(b.framing);
l = B.filter(b => eyesOnly(b) && /\b(left|right) eye\b/i.test(b.map)).map(b => b.ref); out(!l.length, "eyes-only frames say one eye / the other eye, never a mirrored left or right eye", l);
l = P.filter(b => b.shotSize === "HANDS" && /(entering|reaching in|from) the (left|right)( edge)?\b(?! (corner|of))/i.test(b.map) && !/bottom/i.test(b.map)).map(b => b.ref); out(!l.length, "hands-only forearms rise from the bottom edge, never from a side", l);
l = P.filter(p => (p.prompt.match(/HANDS: every arm ends/g) || []).length > 1).map(p => p.ref); out(!l.length, "the hand lock appears once per prompt", l);
// v19 — every plan field reaches its block in the compiled prompt
const plan = b => b.plan || {};
l = P.filter(p => plan(p).ia && !/INTERACTION BEAT: /.test(p.prompt)).map(p => p.ref); out(!l.length, "every ia reaches the ACTION as an INTERACTION BEAT", l);
l = P.filter(p => plan(p).dist && cast(p).length > 1 && !/DISTANCE: /.test(p.prompt)).map(p => p.ref); out(!l.length, "every planned distance reaches the prompt (DISTANCE)", l);
l = P.filter(p => (plan(p).look || plan(p).ctx) && cast(p).length && ["CLOSE", "XCLOSE", "FACE_HANDS", "REACTION"].includes(p.shotSize) && !/CLOSE-UP LOGIC: /.test(p.prompt)).map(p => p.ref); out(!l.length, "every close shot with look/ctx carries its CLOSE-UP LOGIC", l);
l = P.filter(p => { const ce = String(plan(p).ce || "").trim(); if (!ce || /^none$/i.test(ce)) return false; const k = (ce.match(/^[A-Z0-9_]+/) || [""])[0]; return M.PROP[k] && !/#FFFFFF/i.test(M.PROP[k].hex) && !new RegExp("(?:coloured element (in the whole image )?is|COLOUR FOCUS in this frame is|The one colour in this frame is) " + M.PROP[k].name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "|Only " + M.PROP[k].name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).test(p.prompt); }).map(p => p.ref); out(!l.length, "every ce is the colour element the colour block names", l);
l = P.filter(p => /^none$/i.test(String(plan(p).ce || "").trim()) && /The only (other )?coloured element/.test(p.prompt)).map(p => p.ref); out(!l.length, "frames with ce: none name no colour element", l);
l = P.filter(p => ["CLEAN", "WHITE"].includes(moodOf(p.mood)) && /never tinted by the field|colour field fills/.test(p.prompt)).map(p => p.ref); out(!l.length, "CLEAN and WHITE prompts never describe a colour field", l);
l = P.filter(p => /\bsky \(#[0-9A-Fa-f]{6}\) sky\b/.test(p.prompt)).map(p => p.ref); out(!l.length, "no doubled 'sky (#…) sky'", l);
l = B.filter(b => /straight ahead|into the camera|at the camera|at the viewer/i.test(b.performance) && !/over|toward|at (MOM|SON|DAD|the)/i.test((b.performance.match(/straight ahead[^;.]*/i) || [""])[0])).map(b => b.ref); out(!l.length, "no gaze straight ahead without a target in the scene", l);
const teeth = /\bgrin(s|ning)?\b|fading out|transparent|see-through/i;
l = [...B.filter(b => teeth.test(b.performance + " " + b.action)).map(b => b.ref), ...M.EDIT_CUES.filter(e => teeth.test(e.change)).map(e => e.ref + "(edit)")]; out(!l.length, "no grin, fading or transparency wording", l);
l = M.EDIT_CUES.filter(e => { const b = B.find(x => x.ref === e.ref); const keep = (e.change.match(/[^.;]*stay exactly as they are/) || [""])[0]; return /\b(the room|the kitchen|the garden|the yard)\b/i.test(keep) && /\b(door|bin|doorway|plate|spoon)\b/i.test(e.change.replace(keep, "")) && !new RegExp(e.change.replace(keep, "").match(/\b(door|bin|doorway|plate|spoon)\b/i)[0], "i").test([b.action, b.map].join(" ")); }).map(e => e.ref); out(!l.length, "edits name only things the base image has", l);
// v18.5 — expressions that read (Muhammad: "less emotion expressed and character interaction")
l = [...B.filter(b => /mouth a (\w+ )?(small|tiny|slight)\b/.test(b.performance)).map(b => b.ref), ...M.EDIT_CUES.filter(e => /mouth a (\w+ )?(small|tiny|slight)\b/.test(e.change)).map(e => e.ref + "(edit)")]; out(!l.length, "every mouth is a clear shape, never 'a small …' line", l);
l = P.filter(p => cast(p).length && p.shotSize !== "HANDS" && !/EXPRESSION STRENGTH/.test(p.prompt)).map(p => p.ref); out(!l.length, "every frame with a face carries its expression strength", l);
console.log(`\n${fails ? fails + " CONSISTENCY CHECK(S) FAILED" : "ALL CONSISTENCY CHECKS PASSED"}\n`); process.exitCode = fails ? 1 : 0;
