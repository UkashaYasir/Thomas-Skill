// Render-risk checks — the lessons of the test renders, enforced on every frame that carries THE PICTURE.
// Usage: node scripts/qa-render-risk.cjs <build.jsx>
// v19: the close-up share is printed as information only (no creative quotas); the wall-colour lock is gone (no tinted rooms);
// full-colour PEAK and NIGHT frames must keep the characters pure white.
const fs = require("fs"), vm = require("vm");
let s = fs.readFileSync(process.argv[2], "utf8"); s = s.slice(0, s.indexOf("/* ===== UI ===== */")).replace(/^\s*import[^\n]*\n/gm, "");
const M = vm.runInNewContext(s + ";({RAW_BEATS,PROMPTS,INSERT_PROMPTS:(typeof INSERT_PROMPTS==='undefined'?[]:INSERT_PROMPTS),PROP,WORLD,SET,MOOD,MOOD_ALIAS:(typeof MOOD_ALIAS==='undefined'?{}:MOOD_ALIAS),CAMERA_LIB:(typeof CAMERA_LIB==='undefined'?{}:CAMERA_LIB)})", {});
const moodOf = m => M.MOOD[m] ? m : (M.MOOD_ALIAS[m] || m);
// v25: inserts (I) are checked like every other frame, in line order
M.RAW_BEATS = [...M.RAW_BEATS, ...M.INSERT_PROMPTS].sort((a, b) => a.n - b.n || String(a.ref).localeCompare(String(b.ref))); M.PROMPTS = [...M.PROMPTS, ...M.INSERT_PROMPTS];
const B = M.RAW_BEATS, NEW = B.filter(b => b.picture), P = r => M.PROMPTS.find(p => p.ref === r).prompt;
let fails = 0, warns = 0; const ok = m => console.log("  ok    " + m), fail = m => { fails++; console.log("  FAIL  " + m); }, warn = m => { warns++; console.log("  WARN  " + m); };
const roles = b => b.roles === "No characters" ? [] : b.roles.split(",").map(x => x.trim()).filter(Boolean);
console.log(`\nRENDER-RISK QA — ${NEW.length} frames with THE PICTURE\n`);
const txt = b => [b.picture, b.framing, b.action, b.check].join(" ");
// 1. steep views tilt the room (S1 came out tilted, DAUGHTER floating)
const steep = NEW.filter(b => /look(?:s|ing)? (?:steeply|straight) (?:up|down)|steeply|from below|worm'?s-eye|bird'?s-eye|(?:room|camera|horizon|walls?|floor) (?:is |are )?tilted|dutch|look(?:s|ing)? up past/i.test(txt(b).replace(/never tilted|nothing tilted/g, ""))).map(b => b.ref);
steep.length ? fail("steep-view wording (renders as a tilted room): " + steep.join(" ")) : ok("no steep-view wording — angles come from the camera presets, horizon level");
// 2. characters are given a size in the frame (small figures in big rooms cost the most points)
const noSize = NEW.filter(b => roles(b).length && !["HANDS", "OBJECT", "WORD"].includes(b.shotSize) && !/fills?|cropped|from (?:her|his|their) feet|two-thirds|half of the frame|head and shoulders|shoulders up|big in|large in|extreme close-up|close two-shot|over (?:MOM|DAUGHTER)'s shoulder|small at|small far|tiny|\blarge\b|, close\b|, small\b/i.test(b.picture)).map(b => b.ref);
noSize.length ? fail("character frames whose picture line never says how big the characters are: " + noSize.join(" ")) : ok("every character frame says how much of the frame its characters fill");
// 3. strong angles use a proven camera preset
const noCam = NEW.filter(b => ["HIGH", "LOW", "OTS", "OVERHEAD"].includes(b.angle) && !(b.cam && M.CAMERA_LIB[b.cam])).map(b => b.ref);
const weird = NEW.filter(b => b.angle === "OVERHEAD" || (b.cam && !M.CAMERA_LIB[b.cam])).map(b => b.ref);
weird.length ? fail("unnatural camera choices (Muhammad: no weird angles): " + weird.join(" ")) : ok("natural camera angles only: eye level, child height, a little above head height, over the shoulder, close two-shots");
const chr = NEW.filter(b => roles(b).length), cu = chr.filter(b => ["CLOSE", "XCLOSE", "FACE_HANDS", "REACTION", "HANDS"].includes(b.shotSize)).length;
console.log(`  info  close-ups on ${cu} of ${chr.length} character frames (information only)`);
noCam.length ? fail("strong angles without a camera preset (angle names alone are ignored): " + noCam.join(" ")) : ok("every strong angle uses a proven camera preset");
// 4. the same picture twice: neighbouring frames in one place with the same size and angle
const twice = []; for (let i = 1; i < B.length; i++) { const a = B[i - 1], b = B[i]; if (!b.picture || !a.picture || b.editOnly || b.shotSize === "WORD") continue; const set = x => (M.WORLD[x.world] || {}).set || x.world; if (set(a) === set(b) && a.shotSize === b.shotSize && a.angle === b.angle && roles(a).length > 1 && roles(b).length > 1) twice.push(a.ref + "/" + b.ref); }
twice.length ? fail("neighbouring frames that read as the same picture (same place, size and angle): " + twice.join(" ")) : ok("neighbouring frames in one place always change size or angle");
// 5. the automatic locks reached the compiled prompts
const lockMiss = [];
NEW.forEach(b => { const p = P(b.ref), face = roles(b).length && b.shotSize !== "HANDS";
  if (face && (["CLOSE", "XCLOSE", "FACE_HANDS", "REACTION"].includes(b.shotSize) || b.angle === "OTS") && !/BODIES IN A CLOSE CROP|EYES-ONLY CROP/.test(p)) lockMiss.push(b.ref + " thin bodies");
  if (roles(b).length && ["PEAK", "NIGHT", "MEMORY"].includes(moodOf(b.mood)) && !/stay pure white with bold black outlines/.test(p)) lockMiss.push(b.ref + " white characters on a colour field"); });
lockMiss.length ? fail("automatic locks missing from compiled prompts: " + lockMiss.join(" ")) : ok("thin-body and white-characters-on-a-field locks are in every prompt that needs them");
// 6. objects must be recognisable things, not heaps
const vague = Object.entries(M.PROP).filter(([k, v]) => /\b(heap|pile|bunch|assorted|various)\b/i.test(v.text) && (v.text.match(/,/g) || []).length < 3).map(([k]) => k);
vague.length ? warn("objects described as a heap without naming what is in it: " + vague.join(" ")) : ok("every heap or pile names the recognisable things in it");
// 7. every rebuilt frame closes with the short restatement and keeps the placement map
const shape = NEW.filter(b => b.shotSize !== "WORD" && (!/^.*THE PICTURE: /s.test(P(b.ref)) || !/THE PICTURE IN SHORT: /.test(P(b.ref)))).map(b => b.ref); // WORD frames have their own short prompt
shape.length ? fail("prompts missing THE PICTURE or its closing restatement: " + shape.join(" ")) : ok("every rebuilt prompt opens with THE PICTURE and closes with THE PICTURE IN SHORT");
// v18: every new frame says why (purpose, feeling, focus, change) — a choice without a reason is the wrong choice
{ const hasWhy = b => b.why || (b.plan && b.plan.ft && b.plan.idea); const withWhy = NEW.filter(hasWhy), noWhy = NEW.filter(b => !hasWhy(b)).map(b => b.ref);
  if (!withWhy.length) warn("no frame carries a b.why line yet (older build) — every new video must write one per frame");
  else noWhy.length ? fail("frames without their one-line why: " + noWhy.join(" ")) : ok("every rebuilt frame says why"); }
console.log(`\n${fails ? fails + " CHECK(S) FAILED" : "ALL RENDER-RISK CHECKS PASSED"} · ${warns} warning(s)\n`); process.exitCode = fails ? 1 : 0;
