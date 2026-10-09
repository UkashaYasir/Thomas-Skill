#!/usr/bin/env node
// The Parent Code — v24 rule checks (Thomas's final word after Video 08 — references/v24-standard.md).
//
//   node scripts/qa-v24.cjs build.jsx [--brief]
//
// Each check passes or fails by a rule. The only numbers are Thomas's own (two or three times larger; a meaningful change
// about every 3–5 seconds — a WARN to read, never a quota) and technical ones.
//   STAGE    CLEAN is the approved clean warm white · set pieces are black line with white fill — no fills, no coloured floor or grass plane ·
//            the place told by its fewest pieces (close shots one slice, others three at most — a WARN to review; Muhammad 9 Oct:
//            "don't try to show too much furniture")
//   INTENSITY white by default; an emotional peak (pk) reaches colour — its colour stage (PEAK + pc), marks, glow or light — and
//            the colour comes back to white (Muhammad 9 Oct) · a PEAK field names its emotion's colour (pc) · one moment, one
//            field colour · long stretches with no colour lift and long runs of colour fields are listed (WARN)
//   COLOUR   at most the focus (ce) and one second object (ce2) carry colour · the focus is bright unless the beat is calm ·
//            ce2 is in its frame and differs from ce · glow (gl) only on a frame with a colour focus or accent marks
//   SIZE     wide frames keep every face readable · DOMINANT says two to three times larger
//   WORDS    no numbers, numbered titles, section headings or underlines · hand-lettered style · a letter on an object is one
//            letter or number · the cue word is in its line
//   ZOOMS    every reframe cue word is in its line · every target is in the frame
//   RHYTHM   a still that holds well past five seconds with nothing changing (WARN, from the word count) · the same camera
//            move four frames in a row (WARN — "not exactly the same way on every image")
//   INSERTS  an insert (I) cuts in on a word of its line
const fs = require("fs"), vm = require("vm");
const argv = process.argv.slice(2), file = argv.find(a => !a.startsWith("--"));
if (!file) { console.log("usage: node qa-v24.cjs build.jsx [--brief]"); process.exit(2); }
const BRIEF = argv.includes("--brief");
let src = fs.readFileSync(file, "utf8");
const marker = src.indexOf("/* ===== UI ===== */");
if (marker < 0) { console.log("FAIL  build has no UI marker"); process.exit(1); }
src = src.slice(0, marker).replace(/^\s*import[^\n]*\n/gm, "");
let M;
try { M = vm.runInNewContext(src + ";({PROJECT,BEATS,PROMPTS,PROP,ROLE,MOOD,MOOD_ALIAS,SCRIPT,EDIT_CUES,SEQUENCES,CLEAN_GROUND,OUTLINE_GREY,INSERT_PROMPTS:(typeof INSERT_PROMPTS==='undefined'?[]:INSERT_PROMPTS),EMOTION_FIELD:(typeof EMOTION_FIELD==='undefined'?{}:EMOTION_FIELD),CHAPTER:(typeof CHAPTER==='undefined'?{}:CHAPTER),HAND_LETTER:(typeof HAND_LETTER==='undefined'?null:HAND_LETTER),colouredItems:(typeof colouredItems==='undefined'?null:colouredItems),ce2Key:(typeof ce2Key==='undefined'?null:ce2Key),heroKey:(typeof heroKey==='undefined'?null:heroKey)})", {}); }
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
["#F7F6F3"].includes(String(M.CLEAN_GROUND).toUpperCase()) ? ok("the CLEAN ground is the clean warm white Video 08 was approved on (#F7F6F3)") : warn(`the CLEAN ground is ${M.CLEAN_GROUND}, not the approved clean warm white #F7F6F3 — Thomas: "The clean white background is very good and should stay"; pure white everywhere risks white characters fading (3 Oct)`);
const filled = P.filter(p => ["CLEAN", "WHITE"].includes(moodOf(p.mood)) && !p.mute).filter(p => /filled flat in|plane from the ground line|filled flat in its own soft colou?r/i.test(block(p.prompt, "SETTING"))).map(p => p.ref);
// object necessity (Thomas: "ask yourself whether every object is actually necessary… If an element doesn't contribute to the
// story, emotion, or visual understanding, simply remove it"): a frame drawing four or more set pieces is listed for review (the Video 08 study had five)
// v25 (Muhammad, 9 Oct: "don't try to show too much furniture… just show the visuals that show the overall scenario"): the
// place is told by its fewest pieces — the one the character uses, a second only if the place can't be read without it, a
// third only when the shot is wide enough to need it. More is listed for review (Video 08 drew up to six; Thomas cut the fridge,
// counter and cabinets and kept the table, the chair and one window).
const PIECE_CAP = { CLOSE: 1, XCLOSE: 1, FACE_HANDS: 1, REACTION: 1, HANDS: 1, OBJECT: 1, MEDIUM: 3, MEDWIDE: 3, WIDE: 3 };
const busy = [...D, ...(M.INSERT_PROMPTS || [])].filter(b => (b.pieces || []).length > (PIECE_CAP[b.shotSize] || 3)).map(b => `${b.ref}(${b.shotSize}: ${b.pieces.join(", ")})`);
busy.length ? warn("frames that draw more set pieces than their shot needs (a close shot one slice, any other shot three at most — Thomas's approved study: the table, the chair and one window) — keep the piece the character uses and the one that says where we are; cut the rest: " + refs(busy)) : ok("every frame tells its place with the fewest pieces (close shots one slice, others three at most)");
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

// marks beside a coloured focus and a second coloured object make three strong colours — read it against "not too many strong colored elements"
const three = D.filter(b => b.accentMark && M.colouredItems(b).length >= 2).map(b => b.ref);
three.length ? warn("frames with a coloured focus, a second coloured object and coloured marks — three strong colours; drop ce2 or the marks unless the moment needs all three: " + refs(three)) : ok("no frame stacks marks on two coloured objects");

// ════════════════════════════════════════════════════════════════
head("INTENSITY — white by default, colour when the feeling peaks (v24-standard.md §2a)");
// Muhammad, 9 Oct: "the default background is white… whenever a scene or a script segment shows the emotional intensity and
// the overall scenario, we convert to colours… staying minimalistic… not monotonous". Rung 1: the white stage (the bright
// focus object is the baseline). Rung 2: colour carried by the feeling — marks (mk), glow (gl), light (li), a coloured word,
// or the bright focus drawn two or three times larger.
// Rung 3: the stage itself turns — a PEAK field in the emotion's colour (pc), NIGHT, absence grey (mu).
const isColWord = b => b.onScreen && !b.onScreen.font && !["BLACK", "WHITE", "GREY"].includes(String(b.onScreen.col || "BLACK").toUpperCase());
const bigFocus = b => ["DOMINANT", "OVERWHELMING"].includes(b.scale) && !b.calm && !!M.heroKey(b); // the bright focus two or three times larger fills the frame with its colour (the red F on white)
const rung = b => { const m = moodOf(b.mood); if (m === "PEAK" || m === "NIGHT" || b.mute) return 3; if (b.accentMark || b.glow || b.light || isColWord(b) || bigFocus(b)) return 2; return 1; };
const ALL = [...D, ...(M.INSERT_PROMPTS || [])].sort((a, b) => a.n - b.n || String(a.ref).localeCompare(String(b.ref)));
const peaks = D.filter(b => b.peak || plan(b).ln === "peak");
// the peak line itself climbs (rung 2 or 3), or the colour stage sits on the frame beside it in the same moment (the wider
// frame in colour, the close-up on white)
const flatPeak = peaks.filter(b => rung(b) < 2 && !ALL.some(x => x !== b && x.sequence === b.sequence && x.scene === b.scene && Math.abs(x.n - b.n) <= 1 && rung(x) === 3) && !(M.INSERT_PROMPTS || []).some(x => x.n === b.n && rung(x) >= 2)).map(b => b.ref);
flatPeak.length ? warn("emotional peaks that never leave the plain white stage — at the peak the colour comes in: the stage in the emotion's colour (m: PEAK + pc) on the wider frame, or at least marks, glow or light on the action: " + refs(flatPeak)) : ok("every emotional peak reaches colour (its stage, marks, glow or light)");
const named = k => !!(M.EMOTION_FIELD && M.EMOTION_FIELD[k]);
const noPc = D.filter(b => moodOf(b.mood) === "PEAK" && !named(b.peakCol) && !(M.CHAPTER[String(b.sequence || "").slice(0, 2)] || {}).emo && !["TENSE", "SUNNY"].includes(b.moodWas)).map(b => b.ref);
noPc.length ? warn(`colour stages with no emotion colour — name it with pc (${Object.keys(M.EMOTION_FIELD || {}).join(", ")}), one colour, one meaning for the whole video: ` + refs(noPc)) : ok("every colour stage names its emotion's colour");
const byScene = {}; D.filter(b => moodOf(b.mood) === "PEAK").forEach(b => { const k = b.sequence + "/" + (b.scene || b.ref); (byScene[k] = byScene[k] || new Set()).add(b.peakCol || "chapter"); });
const mixed = Object.entries(byScene).filter(([, v]) => v.size > 1).map(([k, v]) => `${k}(${[...v].join("/")})`);
mixed.length ? warn("one moment shown on two different field colours — a moment keeps one colour until it returns to white: " + refs(mixed)) : ok("every colour moment keeps one field colour");
let pr = [], longPeak = [];
ALL.forEach((b, i) => { if (moodOf(b.mood) === "PEAK") pr.push(b.ref); if (moodOf(b.mood) !== "PEAK" || i === ALL.length - 1) { if (pr.length > 5) longPeak.push(`${pr[0]}–${pr[pr.length - 1]}(${pr.length})`); pr = []; } });
longPeak.length ? warn("more than five colour-field frames in a row — colour hits hardest against white; return to the white stage between peaks: " + refs(longPeak)) : ok("colour fields stay short and come back to white");
{ const rt = (M.PROJECT && M.PROJECT.runtimeSec) || 0, tw = SCRIPT.reduce((t, l) => t + words(l).length, 0);
  if (rt && tw) {
    const spw = rt / tw, perLine = {}; ALL.forEach(b => { perLine[b.n] = (perLine[b.n] || 0) + 1; });
    const sec = b => words(b.script || SCRIPT[b.n - 1]).length * spw / perLine[b.n];
    let run = [], t = 0; const flat = [];
    const close = () => { if (t > 30) flat.push(`${run[0]}–${run[run.length - 1]}(~${Math.round(t)}s)`); run = []; t = 0; };
    ALL.forEach(b => { if (rung(b) === 1 && moodOf(b.mood) !== "MEMORY") { run.push(b.ref); t += sec(b); } else close(); }); close();
    flat.length ? warn("more than half a minute on the plain white stage with no colour lift — read the lines: if one carries the feeling, give it its colour (stage, marks, glow or light); if the stretch is calm on purpose, leave it: " + refs(flat)) : ok("no long stretch stays on the plain white stage without a colour lift");
  } else info("no runtime set — the white-stretch check needs PROJECT.runtimeSec"); }
info(`colour ladder: ${ALL.filter(b => rung(b) === 1).length} white stage · ${ALL.filter(b => rung(b) === 2).length} colour on the feeling · ${ALL.filter(b => rung(b) === 3).length} colour stage — stages: ${ALL.filter(b => rung(b) === 3).map(b => `${b.ref} ${moodOf(b.mood) === "PEAK" ? (b.peakCol || "chapter") : b.mute ? "grey" : moodOf(b.mood).toLowerCase()}`).join(" · ") || "none"}`);

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
// a punch into a face on a colour stage (PEAK) leaves the face on the field — Thomas: "If the face is important, keep almost
// everything else neutral"; the close-up there is a WHITE frame or insert, never a crop of the field (v25). (Night keeps its
// screen-lit face: v24-standard §14.)
const onField = b => moodOf(b.mood) === "PEAK";
const facePunch = b => !onField(b) && (b.zooms || []).some(faceTarget);
const fieldFace = [...D, ...(M.INSERT_PROMPTS || [])].filter(b => onField(b) && (b.zooms || []).some(faceTarget)).map(b => `${b.ref}(${moodOf(b.mood)} → ${(b.zooms || []).filter(faceTarget).map(z => z.to).join(", ")})`);
fieldFace.length ? warn("punches into a face on a colour stage — the crop leaves the face on the field; cut to a WHITE close-up (the next frame or an insert, I()) and punch to an object or the hands here: " + refs(fieldFace)) : ok("no reframe puts a face on a colour stage");
const segs = [...new Set(D.map(b => b.sequence))];
const noPunch = segs.filter(q => { const F = D.filter(b => b.sequence === q); return F.some(b => roleList(b).length) && !F.some(b => (CLOSE_FACE.includes(b.shotSize) && roleList(b).length) || facePunch(b)); });
noPunch.length ? warn("chapters with characters but no close face and no punch to a face — a sudden close-up is how this channel grabs attention: " + refs(noPunch)) : ok("every chapter with characters has a close face or a punch to a face");
// every emotional peak gets a short dramatic close-up (Thomas, 02:30: "Important emotional moment!… consider a short dramatic close-up")
const isCloseFace = b => b && CLOSE_FACE.includes(b.shotSize) && roleList(b).length > 0;
const insClose = n => (M.INSERT_PROMPTS || []).some(i => i.n === n && isCloseFace(i)); // a WHITE close-up insert inside the line counts (v25)
const peakNoClose = D.filter(b => (b.peak || plan(b).ln === "peak") && roleList(b).length).filter(b => { const nx = D.find(x => x.n === b.n + 1); return !isCloseFace(b) && !facePunch(b) && !insClose(b.n) && !(nx && nx.sequence === b.sequence && (isCloseFace(nx) || insClose(nx.n))); }).map(b => b.ref);
peakNoClose.length ? warn("emotional peaks without a short dramatic close-up on the line or the next frame (a close face, a close-up insert, or a punch to the face off a colour stage): " + refs(peakNoClose)) : ok("every emotional peak has its dramatic close-up");
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
  const insN = new Set((M.INSERT_PROMPTS || []).map(i => i.n)); // v25: an insert is a change inside its line
  const edited = new Set((M.EDIT_CUES || []).map(e => e.ref)), seqd = new Set((M.SEQUENCES || []).flatMap(s => (s.images || []).map(i => i.ref)));
  const long = D.filter(b => { const sec = words(b.script || SCRIPT[b.n - 1]).length * spw; const changes = (edited.has(b.ref) ? 1 : 0) + (seqd.has(b.ref) ? 1 : 0) + (b.reveal ? 1 : 0) + (b.pop ? 1 : 0) + ((b.zooms || []).length) + (b.move && b.move.type && b.move.type !== "HOLD" ? 1 : 0) + (b.onScreen ? 1 : 0) + (insN.has(b.n) ? 1 : 0); return sec / (changes + 1) > 6 && !b.still; }).map(b => `${b.ref}(~${Math.round(words(b.script || SCRIPT[b.n - 1]).length * spw)}s)`);
  long.length ? warn("stills that hold well past five seconds with nothing changing — add a reframe (zm), an edit or a move with a reason, or state the hold (sti): " + refs(long)) : ok("no still holds long with nothing changing");
  info(`about ${(runtime / N).toFixed(1)} s per frame on average (${N} frames, ${runtime} s)`);
}

// the same camera move four frames in a row (Thomas, Video 05: "zoom and pan selectively… not exactly the same way on every image"; v16's rule)
{ const mv = b => (b.move && b.move.type) || "HOLD"; let r = [], reps = [];
  D.forEach((b, i) => { if (mv(b) !== "HOLD" && r.length && mv(D[i - 1]) === mv(b)) r.push(b.ref); else { if (r.length >= 4) reps.push(`${r[0]}–${r[r.length - 1]}(${mv(D[i - 1])})`); r = mv(b) !== "HOLD" ? [b.ref] : []; } });
  if (r.length >= 4) reps.push(`${r[0]}–${r[r.length - 1]}(${mv(D[D.length - 1])})`);
  reps.length ? warn("the same camera move on four or more frames in a row — vary it, or hold where the moment is still: " + refs(reps)) : ok("camera moves vary from frame to frame"); }

// ════════════════════════════════════════════════════════════════
head("INSERTS — a second image inside a line (README: I())");
const INS = M.INSERT_PROMPTS || [];
const insCue = INS.filter(b => !inLine(b.cutIn || (b.move && b.move.on), b.script || SCRIPT[b.n - 1])).map(b => b.ref);
INS.length ? (insCue.length ? fail("inserts whose cut-in word is not in their line: " + refs(insCue)) : ok(`every insert cuts in on a word of its line (${INS.map(b => b.ref).join(" ")})`)) : info("no inserts");

console.log(`\n${fails ? fails + " v24 CHECK(S) FAILED" : "ALL v24 CHECKS PASSED"} · ${warns} warning(s)\n`);
process.exit(fails ? 1 : 0);
