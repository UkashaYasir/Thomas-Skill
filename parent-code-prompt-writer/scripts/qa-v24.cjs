#!/usr/bin/env node
// The Parent Code — v24 rule checks (Thomas's final word after Video 08 — references/v24-standard.md).
//
//   node scripts/qa-v24.cjs build.jsx [--brief]
//
// Each check passes or fails by a rule. The only numbers are Thomas's own (two or three times larger; a meaningful change
// about every 3–5 seconds — a WARN to read, never a quota) and technical ones.
//   STAGE    CLEAN is pure white · set pieces are black line with white fill — no fills, no coloured floor or grass plane
//   COLOUR   at most the focus (ce) and one second object (ce2) carry colour · the focus is bright unless the beat is calm ·
//            ce2 is in its frame and differs from ce · glow (gl) only on a frame with a colour focus or accent marks
//   SIZE     wide frames keep every face readable · DOMINANT says two to three times larger
//   WORDS    no numbers, numbered titles, section headings or underlines · hand-lettered style · a letter on an object is one
//            letter or number · the cue word is in its line
//   ZOOMS    every reframe cue word is in its line · every target is in the frame
//   RHYTHM   a still that holds well past five seconds with nothing changing (WARN, from the word count)
const fs = require("fs"), vm = require("vm");
const argv = process.argv.slice(2), file = argv.find(a => !a.startsWith("--"));
if (!file) { console.log("usage: node qa-v24.cjs build.jsx [--brief]"); process.exit(2); }
const BRIEF = argv.includes("--brief");
let src = fs.readFileSync(file, "utf8");
const marker = src.indexOf("/* ===== UI ===== */");
if (marker < 0) { console.log("FAIL  build has no UI marker"); process.exit(1); }
src = src.slice(0, marker).replace(/^\s*import[^\n]*\n/gm, "");
let M;
try { M = vm.runInNewContext(src + ";({PROJECT,BEATS,PROMPTS,PROP,ROLE,MOOD,MOOD_ALIAS,SCRIPT,EDIT_CUES,SEQUENCES,CLEAN_GROUND,OUTLINE_GREY,HAND_LETTER:(typeof HAND_LETTER==='undefined'?null:HAND_LETTER),colouredItems:(typeof colouredItems==='undefined'?null:colouredItems),ce2Key:(typeof ce2Key==='undefined'?null:ce2Key),heroKey:(typeof heroKey==='undefined'?null:heroKey)})", {}); }
catch (e) { console.log("FAIL  the build does not compile: " + e.message); process.exit(1); }
if (!M.HAND_LETTER || !M.colouredItems) { console.log("FAIL  this build was not made with compiler v24 — rebuild it with assets/compiler-v24/"); process.exit(1); }
const { PROP, MOOD, MOOD_ALIAS, SCRIPT } = M;
const D = M.BEATS, P = M.PROMPTS, N = D.length;
let fails = 0, warns = 0;
const ok = m => { if (!BRIEF) console.log("  ok    " + m); }, info = m => { if (!BRIEF) console.log("  info  " + m); };
const warn = m => { warns++; console.log("  WARN  " + m); }, fail = m => { fails++; console.log("  FAIL  " + m); };
const head = t => { if (!BRIEF) console.log("\n=== " + t + " ==="); };
const refs = a => a.slice(0, 30).join(" ") + (a.length > 30 ? ` …(+${a.length - 30})` : "");
const moodOf = m => MOOD[m] ? m : (MOOD_ALIAS[m] || m);
const roleList = b => b.roles === "No characters" ? [] : String(b.roles || "").split(",").map(s => s.trim()).filter(Boolean);
const propKeys = b => (b.props || []).map(e => { const m = String(e).trim().match(/^(\d+)x\s+(.+)$/i); return (m ? m[2] : String(e)).trim(); });
const plan = b => b.plan || {};
const block = (t, name) => { const m = String(t).match(new RegExp(name + ": (.*?)(?= [A-Z][A-Z ,'—-]{3,}: |$)")); return m ? m[1] : ""; };
const words = t => String(t || "").toLowerCase().replace(/[“”"’']/g, "").split(/[^a-z0-9-]+/).filter(Boolean);
const inLine = (cue, line) => { const c = String(cue || "").toLowerCase().replace(/[“”"’'.,!?…]/g, "").trim(); return !!c && String(line || "").toLowerCase().replace(/[“”"’']/g, "").includes(c); };
console.log(`\nv24 RULE CHECKS — ${N} frames — Thomas's final standard after Video 08\n`);

// ════════════════════════════════════════════════════════════════
head("STAGE — white ground, black-line places (v24-standard.md §2)");
String(M.CLEAN_GROUND).toUpperCase() === "#FFFFFF" ? ok("the CLEAN ground is pure white") : warn(`the CLEAN ground is ${M.CLEAN_GROUND}, not pure white — Thomas: "The clean white background is very good and should stay"`);
const filled = P.filter(p => ["CLEAN", "WHITE"].includes(moodOf(p.mood)) && !p.mute).filter(p => /filled flat in|plane from the ground line|filled flat in its own soft colou?r/i.test(block(p.prompt, "SETTING"))).map(p => p.ref);
// object necessity (Thomas: "ask yourself whether every object is actually necessary… If an element doesn't contribute to the
// story, emotion, or visual understanding, simply remove it"): a frame drawing four or more set pieces is listed for review (the Video 08 study had five)
const busy = D.filter(b => (b.pieces || []).length >= 4 && b.shotSize !== "WIDE").map(b => `${b.ref}(${b.pieces.join(", ")})`);
busy.length ? warn("frames that draw four or more set pieces — keep each piece only if the moment needs it (Video 08: Thomas cut the fridge, counter and cabinets and kept one window): " + refs(busy)) : ok("no frame crowds its place with set pieces");
filled.length ? fail("set pieces with a colour fill or a coloured floor plane — Thomas: \"the ground does not also need to be colored\", \"black and white is enough\": " + refs(filled)) : ok("every set piece is black line with white fill, and no frame has a coloured floor or grass plane");

// ════════════════════════════════════════════════════════════════
head("COLOUR — bright on the focus, nothing competing (v24-standard.md §3)");
const many = D.filter(b => M.colouredItems(b).length > 2).map(b => `${b.ref}(${M.colouredItems(b).map(i => i.key).join("+")})`);
many.length ? fail("frames where more than two objects carry colour — Thomas: \"not too many strong colored elements in the same scene\": " + refs(many)) : ok("no frame colours more than its focus and one second object");
const ce2bad = D.filter(b => plan(b).ce2).filter(b => { const k = M.ce2Key(b); return !k || !propKeys(b).includes(k) || k === M.heroKey(b); }).map(b => `${b.ref}("${plan(b).ce2}")`);
ce2bad.length ? fail("ce2 that is not an object in the frame, or repeats the focus: " + refs(ce2bad)) : ok("every ce2 names a second object in its frame");
const glowBad = D.filter(b => b.glow && !M.heroKey(b) && !b.accentMark).map(b => b.ref);
glowBad.length ? fail("glow (gl) on a frame with no colour focus or accent marks — a glow belongs to the important object: " + refs(glowBad)) : ok("every glow belongs to a colour focus");
const softGlow = P.filter(p => /\b(?:glowing|glows|soft glow|bloom|lens flare|gradient)\b/i.test([p.framing, p.action, p.performance].join(" "))).map(p => p.ref);
softGlow.length ? warn("beat text asking for a soft glow, bloom or gradient — a glow is drawn (gl: halo, rays, rainbow): " + refs(softGlow)) : ok("no beat text asks for a rendered glow");
const calm = D.filter(b => b.calm).length, bright = D.filter(b => !b.calm && M.heroKey(b)).length;
info(`colour focus: ${bright} bright · ${calm} calm (quiet beats) · ${D.filter(b => !M.heroKey(b)).length} face-led or no colour · glow: ${D.filter(b => b.glow).map(b => b.ref + " " + b.glow).join(" · ") || "none"}`);

// phones are purple in every video (Thomas, 00:20: "Keep the smartphone visually distinctive with a strong purple color")
const hue = h => { const r = parseInt(h.slice(1, 3), 16) / 255, g = parseInt(h.slice(3, 5), 16) / 255, bl = parseInt(h.slice(5, 7), 16) / 255, mx = Math.max(r, g, bl), mn = Math.min(r, g, bl), d = mx - mn; if (!d) return -1; let x = mx === r ? ((g - bl) / d) % 6 : mx === g ? (bl - r) / d + 2 : (r - g) / d + 4; return (x * 60 + 360) % 360; };
const phones = Object.entries(PROP).filter(([k, p]) => /(^|_)(PHONE|SMARTPHONE|TABLET)(_|$)/.test(k) || (p.nouns || []).some(n => /^(smart)?phones?$|^tablets?$/i.test(n))).filter(([k, p]) => /^#[0-9a-f]{6}$/i.test(p.hex || "") && !(hue(p.hex) >= 250 && hue(p.hex) <= 300)).map(([k, p]) => `${k}(${p.hex})`);
phones.length ? warn("phones that are not purple — Thomas: \"Purple: Smartphones and digital distractions\": " + refs(phones)) : ok("every phone is purple");

// ════════════════════════════════════════════════════════════════
head("SIZE — never too small; bigger objects (v24-standard.md §4–§5)");
const smallWide = P.filter(p => ["WIDE", "MEDWIDE"].includes(p.shotSize) && roleList(p).length && !/large enough that (?:every face|their faces)|every face reads|faces read/.test(p.prompt)).map(p => p.ref);
smallWide.length ? fail("wide frames whose prompt never keeps the faces readable — Thomas: \"Avoid showing characters too small or too far away\": " + refs(smallWide)) : ok("every wide and medium-wide frame keeps its faces readable");
const domNoHero = D.filter(b => ["DOMINANT", "OVERWHELMING"].includes(b.scale) && !PROP[b.hero] && !M.heroKey(b)).map(b => b.ref);
domNoHero.length ? fail("oversized scale with no object to enlarge: " + refs(domNoHero)) : ok("every oversized frame names the object it enlarges");
info(`wide frames: ${D.filter(b => b.shotSize === "WIDE").map(b => b.ref).join(" ") || "none"} — each one only where distance or place is the point`);
info(`oversized objects: ${D.filter(b => ["DOMINANT", "OVERWHELMING"].includes(b.scale)).map(b => `${b.ref} ${b.hero}`).join(" · ") || "none"}`);

// ════════════════════════════════════════════════════════════════
head("WORDS — short, playful, hand-lettered (v24-standard.md §7)");
const W = D.filter(b => b.onScreen || (b.keyword && b.keyword.word));
const wordOf = b => String(b.onScreen ? b.onScreen.w : b.keyword.word).trim();
const numbered = W.filter(b => /\d/.test(wordOf(b)) && !(b.onScreen && b.onScreen.font)).map(b => `${b.ref}("${wordOf(b)}")`);
numbered.length ? fail("numbers on screen — Thomas: \"The numbers should be removed completely\": " + refs(numbered)) : ok("no word carries a number");
const titles = W.filter(b => (b.onScreen && b.onScreen.title) || /^(?:\d+\s+)?THE\b.*\bPARENT(S|ING)?$|\bPARENTING$/i.test(wordOf(b))).map(b => `${b.ref}("${wordOf(b)}")`);
titles.length ? fail("section titles on screen — Thomas: \"I do not want these numbered section titles… use fewer full titles\": " + refs(titles)) : ok("no section title on screen");
const longW = W.filter(b => !(b.onScreen && b.onScreen.font) && wordOf(b).split(/\s+/).length > 3).map(b => `${b.ref}("${wordOf(b)}")`);
longW.length ? fail("words longer than a short phrase — \"Only short, playful words\": " + refs(longW)) : ok("every word is a word or a short phrase");
const objLetters = D.filter(b => b.onScreen && b.onScreen.font && String(b.onScreen.w).replace(/\s/g, "").length > 2).map(b => `${b.ref}("${b.onScreen.w}")`);
objLetters.length ? fail("text on an object longer than one letter or number — a letter on an object only when the letter is the story (the F); no labels or signs: " + refs(objLetters)) : ok("every letter on an object is a single letter or number");
const underline = P.filter(p => /\bunderline\b(?! and no box)/i.test(block(p.prompt, "TEXT").replace(/no underline/gi, ""))).map(p => p.ref);
underline.length ? fail("underlined words — Thomas: \"the underline should be removed\": " + refs(underline)) : ok("no underlined word");
const formal = P.filter(p => p.onScreen && !p.onScreen.font && /sans-serif|geometric headline|Poppins|condensed|editorial|caption/i.test(block(p.prompt, "TEXT").replace(/never a geometric presentation font/gi, ""))).map(p => p.ref);
formal.length ? fail("words in a presentation font — Thomas: \"too cold, too formal and too much like a slide presentation\": " + refs(formal)) : ok("every lettered word uses the hand-lettered style");
const premiere = D.filter(b => b.keyword && b.keyword.word && !b.onScreen).map(b => `${b.ref}("${b.keyword.word}")`);
premiere.length ? fail("words left for a separate image or Premiere — Muhammad: the text goes in the image prompt; letter it into the frame (tx, or kw in compiler v24.1): " + refs(premiere)) : ok("every word is lettered into its frame's own prompt");
const cueMiss = W.filter(b => !inLine(b.onScreen ? b.onScreen.on : b.keyword.on, b.script || SCRIPT[b.n - 1])).map(b => b.ref);
cueMiss.length ? warn("word cues not found in their script line — the word lands on the spoken word: " + refs(cueMiss)) : ok("every word lands on a word of its line");
info(`${W.length} words: ${W.map(b => `${b.ref} ${wordOf(b)}`).join(" · ") || "none"}`);

// a sudden close-up grabs attention (Thomas: "larger heads"; "more frequent zoom-ins and close-ups on faces, eyes, hands")
const CLOSE_FACE = ["CLOSE", "XCLOSE", "FACE_HANDS", "REACTION"];
const faceTarget = z => /face|eyes|head/i.test(String(z.to || ""));
const segs = [...new Set(D.map(b => b.sequence))];
const noPunch = segs.filter(q => { const F = D.filter(b => b.sequence === q); return F.some(b => roleList(b).length) && !F.some(b => (CLOSE_FACE.includes(b.shotSize) && roleList(b).length) || (b.zooms || []).some(faceTarget)); });
noPunch.length ? warn("chapters with characters but no close face and no punch to a face — a sudden close-up is how this channel grabs attention: " + refs(noPunch)) : ok("every chapter with characters has a close face or a punch to a face");
// every emotional peak gets a short dramatic close-up (Thomas, 02:30: "Important emotional moment!… consider a short dramatic close-up")
const isCloseFace = b => b && CLOSE_FACE.includes(b.shotSize) && roleList(b).length > 0;
const peakNoClose = D.filter(b => (b.peak || plan(b).ln === "peak") && roleList(b).length).filter(b => { const nx = D.find(x => x.n === b.n + 1); return !isCloseFace(b) && !(b.zooms || []).some(faceTarget) && !(nx && nx.sequence === b.sequence && isCloseFace(nx)); }).map(b => b.ref);
peakNoClose.length ? warn("emotional peaks without a short dramatic close-up on the line or the next frame (a close face or a punch to the face): " + refs(peakNoClose)) : ok("every emotional peak has its dramatic close-up");
// a metaphor or explanation enters with a surprise (Thomas, 07:20: "Make the transition into this explanation more impactful and surprising")
const famSeen = new Set(), flatEntry = [];
D.forEach(b => { const fam = b.metaphor || (/^METAPHOR/.test(String(b.device || "")) ? "dv:" + (PROP[b.hero] ? b.hero : b.ref) : null); if (!fam || famSeen.has(fam)) return; famSeen.add(fam); if (!plan(b).ip) flatEntry.push(b.ref); });
flatEntry.length ? warn("metaphors that enter without a surprise — the first frame of each metaphor names its interrupt (ip): a snap to white, the object bursting in big, a sudden scale jump: " + refs(flatEntry)) : ok("every metaphor enters with a surprise");
// the balance between minimal white scenes and environmental scenes (Thomas, approving the Video 08 plan)
const noWhite = segs.filter(q => { const F = D.filter(b => b.sequence === q); return F.length > 1 && !F.some(b => moodOf(b.mood) === "WHITE" || b.shotSize === "WORD"); });
noWhite.length ? warn("chapters with no white moment (a face, an object or a word on pure white) — balance white moments with place moments: " + refs(noWhite)) : ok("every chapter balances white moments with place moments");
// a prop text that names a character who is not in the frame pulls that character in (Video 05: 29 frames)
const absentName = D.flatMap(b => { const here = roleList(b).map(r => r.toUpperCase()); return propKeys(b).filter(k => PROP[k]).flatMap(k => { const t = String(PROP[k].name) + " " + String((b.propText && b.propText[k]) || PROP[k].text); return Object.keys(M.ROLE).map(r => r.toUpperCase()).filter(r => !here.includes(r) && new RegExp("\\b" + r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?:'S|'s)?\\b").test(t) && !here.some(h => h.includes(r) && h !== r)).map(r => `${b.ref}(${k}: ${r})`); }); });
absentName.length ? warn("object texts that name a character who is not in the frame — the name can pull that character into the picture; rename the prop or say \"his phone\": " + refs([...new Set(absentName)])) : ok("no object text names a character who is not in its frame");

// ════════════════════════════════════════════════════════════════
head("ZOOMS — reuse a still (v24-standard.md §6)");
const Z = D.filter(b => b.zooms && b.zooms.length);
const zCue = Z.filter(b => b.zooms.some(z => !inLine(z.on, b.script || SCRIPT[b.n - 1]))).map(b => b.ref);
zCue.length ? fail("reframe cue words not found in their script line: " + refs(zCue)) : ok("every reframe lands on a word of its line");
const zTarget = Z.filter(b => b.zooms.some(z => { const t = String(z.to || "").toUpperCase(); const who = roleList(b).some(r => t.includes(r.toUpperCase())); const what = propKeys(b).some(k => PROP[k] && t.includes(String(PROP[k].name).toUpperCase().replace(/^THE /, ""))); return !who && !what; })).map(b => b.ref);
zTarget.length ? fail("reframe targets that are not a character or object in the frame: " + refs(zTarget)) : ok("every reframe targets a character or object in its frame");
const zTight = Z.filter(b => b.shotSize === "XCLOSE" || b.eyesOnly).map(b => b.ref);
zTight.length ? warn("reframes planned on an extreme close-up — there is nothing left to crop into: " + refs(zTight)) : ok("no reframe is planned on an extreme close-up");
info(`${Z.length} frames with reframes: ${Z.map(b => `${b.ref} → ${b.zooms.map(z => z.to).join(", ")}`).join(" · ") || "none"}`);

// ════════════════════════════════════════════════════════════════
head("RHYTHM — a meaningful change about every 3–5 seconds (v24-standard.md §6)");
const runtime = (M.PROJECT && M.PROJECT.runtimeSec) || 0, totalWords = SCRIPT.reduce((t, l) => t + words(l).length, 0);
if (!runtime || !totalWords) info("no runtime set — the rhythm check needs PROJECT.runtimeSec");
else {
  const spw = runtime / totalWords;
  const edited = new Set((M.EDIT_CUES || []).map(e => e.ref)), seqd = new Set((M.SEQUENCES || []).flatMap(s => (s.images || []).map(i => i.ref)));
  const long = D.filter(b => { const sec = words(b.script || SCRIPT[b.n - 1]).length * spw; const changes = (edited.has(b.ref) ? 1 : 0) + (seqd.has(b.ref) ? 1 : 0) + (b.reveal ? 1 : 0) + (b.pop ? 1 : 0) + ((b.zooms || []).length) + (b.move && b.move.type && b.move.type !== "HOLD" ? 1 : 0) + (b.onScreen ? 1 : 0); return sec / (changes + 1) > 6 && !b.still; }).map(b => `${b.ref}(~${Math.round(words(b.script || SCRIPT[b.n - 1]).length * spw)}s)`);
  long.length ? warn("stills that hold well past five seconds with nothing changing — add a reframe (zm), an edit or a move with a reason, or state the hold (sti): " + refs(long)) : ok("no still holds long with nothing changing");
  info(`about ${(runtime / N).toFixed(1)} s per frame on average (${N} frames, ${runtime} s)`);
}

console.log(`\n${fails ? fails + " v24 CHECK(S) FAILED" : "ALL v24 CHECKS PASSED"} · ${warns} warning(s)\n`);
process.exit(fails ? 1 : 0);
