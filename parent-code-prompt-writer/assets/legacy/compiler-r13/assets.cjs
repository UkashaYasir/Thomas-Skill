// Revision 13 — assets and compiler (from Revision 12, without the white repaint of room scenes): white space and selective colour, redesigned weak props, sequences, HOLD camera move.
module.exports = function (api) {
  const { srep, setProp } = api;

  // ── 1. Two white-space moods (Thomas: "more white space, more selective use of color") ──
  srep(`\n};\n\n// SET: every location family`, `
  WHITE:   { label: "WHITE", kind: "white", feel: "white space — the story object carries the colour", grade: "white space — a clean warm-white background with generous empty space around the action; the story objects carry the only strong colour in the frame", wall: ["clean warm white","#FBFAF6"], floor: ["pale warm stone","#E9E5DD"], furn: ["soft slate blue","#7C899B"], sky: ["clean white sky","#F7F9FB"], ground: ["pale warm stone","#E4E0D7"], field: ["clean warm white","#FBFAF6"] },
  NEUTRAL: { label: "NEUTRAL", kind: "white", feel: "white space around a face — the room steps back, the faces and story objects carry the frame", grade: "white space — an almost-white warm background; colour only on the story objects", wall: ["very light warm white","#F6F4F0"], floor: ["light warm stone","#E2DED6"], furn: ["soft slate blue","#7C899B"], sky: ["pale clean sky","#F1F4F7"], ground: ["light warm stone","#DEDAD2"], field: ["very light warm white","#F6F4F0"] },
};

// SET: every location family`);

  // ── 2. framePalette: white-space frames take the white palette (furniture keeps the chapter's colour — house lock);
  //       calm chapter tints are softened toward white (a hint of the chapter, never a pastel wash) ──
  srep(`function framePalette(b) {`, `// Revision 12: calm chapter tints are softened toward white — a faint hint of the chapter's colour, never a pastel wash.
function softHex(hex, k) {
  const [L, a, b] = hexToLab(hex);
  const wallish = !["floor", "ground"].includes(k);
  const L2 = wallish ? L + (96.5 - L) * 0.5 : L + (91 - L) * 0.35;
  const f = wallish ? 0.5 : 0.65; let a2 = a * f, b2 = b * f;
  const C = Math.hypot(a2, b2); if (C < 4 && C > 0.3) { a2 *= 4 / C; b2 *= 4 / C; } // keep a visible hint — never a dead grey
  return labToHex([L2, a2, b2]);
}
function framePalette(b) {`);
  srep(`  if (b.mood === "DARK" || b.mood === "ICY") return pal; // night and memories keep one code across the film`,
       `  if (M.kind === "white") { const C0 = CHAPTER[String(b.sequence).slice(0, 2)]; return { ...pal, furn: C0 ? C0.calm.furn : M.furn }; } // Revision 12: white space
  if (b.mood === "DARK" || b.mood === "ICY") return pal; // night and memories keep one code across the film`);
  srep("    const tint = x => [`${g.pre} ${x[0]}`, gradeHex(x[1], g)];\n    const out = {}; for (const k of [\"wall\", \"floor\", \"sky\", \"ground\", \"field\"]) out[k] = tint(C.calm[k]); out.furn = C.calm.furn;",
       "    const tint = x => [`${g.pre} ${x[0]}`, gradeHex(x[1], g)];\n    const W = WORLD[b.world], S = W && W.set && SET[W.set];\n    if (S) return { wall: tint(S.wall), floor: tint(S.floor), furn: S.furn, sky: tint(C.calm.sky), ground: tint(S.ground), field: tint(S.wall) }; // Revision 13: every real place keeps its own colours (place bible)\n    const out = {}; for (const k of [\"wall\", \"floor\", \"sky\", \"ground\", \"field\"]) out[k] = tint(C.calm[k]); out.furn = C.calm.furn;");

  // ── 3. colourBlock: white-space wording; on white space the props keep their full colour ──
  srep("  const g0 = (b.mood === \"DARK\" || b.mood === \"ICY\" || !C0) ? M.grade : M.kind === \"calm\" ? `a calm moment in this chapter's ${C0.look} colours, about three-quarters of the frame quiet and clean` : `an emotional beat — the whole background graded into one clean ${P0.wall[0]} tone`;",
       "  const WS = M.kind === \"white\";\n  const SW = WORLD[b.world] && WORLD[b.world].set && SET[WORLD[b.world].set];\n  const g0 = (WS || b.mood === \"DARK\" || b.mood === \"ICY\" || !C0) ? M.grade : M.kind === \"calm\" ? (SW ? `a calm moment in the ${SW.label}'s own colours, about three-quarters of the frame quiet and clean` : `a calm moment in this chapter's ${C0.look} colours, about three-quarters of the frame quiet and clean`) : `an emotional beat — the whole background graded into one clean ${P0.wall[0]} tone`;");
  srep("    return `${head}${darkLock} HERO: ${heroName(b)}, pure white with black ink against the mood colour — the strongest contrast in the frame; no other strong colour anywhere.",
       "    if (WS) return `${head} HERO: ${heroName(b)}, white with crisp black ink in clean empty space; story objects keep their locked colours as the only colour. Characters: white heads, white mitten hands and white oval feet with black ink outlines, and thin black line bodies with no fill.`;\n    return `${head}${darkLock} HERO: ${heroName(b)}, pure white with black ink against the mood colour — never skin-coloured or tinted; only the wall carries the colour; the strongest contrast in the frame; no other strong colour anywhere.");

  // ── 4. HOLD camera move, and the sequence prompts (filled in by final.cjs) ──
  srep(`  SHAKE: "short two-frame camera shake on the word",\n};`, `  SHAKE: "short two-frame camera shake on the word",\n  HOLD: "no camera move — hold the frame still; the cut between the images is the motion",\n};`);
  srep(`const EDIT_PROMPTS = EDIT_CUES.map(`, `// Revision 12 — sequence steps: the extra images of a sequence, each an image edit of an earlier image of the same scene.
const SEQ_PROMPTS = SEQUENCES.flatMap(s => s.images.filter(im => im.type === "step").map(im => { const a = RAW_BEATS.find(x => x.ref === im.ref); return { seq: s.id, title: s.title, i: im.i, of: s.images.length, ref: im.ref, on: im.on, from: im.from, change: im.change, script: a ? SCRIPT[a.n - 1] : "", prompt: editPrompt({ ref: im.ref, change: im.change }) }; }));
const EDIT_PROMPTS = EDIT_CUES.map(`);

  // the BOUNDARIES word pop is gone (the clicked latch says it), so its overlay goes too
  { const s = api.getSrc(); const i = s.indexOf('  "WORD_BOUNDARIES": {'); const j = s.indexOf('\n', i); srep(s.slice(i, j + 1), ""); }

  srep("  const parts = [SINGLE_FRAME];", "  const parts = [SINGLE_FRAME];\n  if (b.picture) parts.push(`THE PICTURE: ${b.picture}`); // Revision 13: the shot and who-is-where come first");
  srep("parts.push(castLock(b), TIER[b.tier], shotBlock(b), `ACTION: ${b.action}`);", "parts.push(castLock(b), TIER[b.tier], shotBlock(b), b.map ? `PLACEMENT, left to right: ${b.map}` : \"\", [\"CLOSE\", \"XCLOSE\", \"HANDS\", \"OBJECT\"].includes(b.shotSize) && b.picture ? \"FRAME LIMIT: this is a close shot — only what the camera and placement name is in frame; any full-body or room description below applies only to the part that is visible.\" : \"\", `ACTION: ${b.action}`);");
  srep("  parts.push(propLock(b), worldBlock(b));", "  parts.push(propLock(b), worldBlock(b));\n  if (b.master) parts.push(b.master === b.ref ? `ROOM MASTER: this frame shows the whole ${WORLD[b.world].set ? SET[WORLD[b.world].set].label : \"place\"} with its layout exactly as the setting describes it; the same layout appears in every later frame of this room.` : `ROOM REFERENCE: the attached room image shows this same room; its layout and furniture positions stay exactly as in that image, the colours are the ones named in the setting, and only the camera, the characters and the objects named here change.`);");
  srep("  parts.push(GLOBAL_AVOID);\n  return clean(parts);", "  parts.push(GLOBAL_AVOID);\n  if (b.check) parts.push(`THE PICTURE IN SHORT: ${b.check}`); // restates the shot at the end (descriptive, never instruction-shaped)\n  return clean(parts);");


  // ── Revision 13 logic (learned from three cold-open test renders) — applied automatically to every frame ──
  // 1. Camera presets: proven wording, chosen per frame with b.cam. Angle names alone are ignored by the generator; steep
  //    up/down views tilt the room. Each preset describes what the camera SEES and keeps the horizon level.
  srep("function shotBlock(b) {", `const CAMERA_LIB = { // natural angles only (Muhammad: close-ups wanted, no weird camera angles)
  CHILD_EYE: "The camera stands at a small child's height with a level horizon and upright walls — never tilted; high things sit near the top edge of the frame.",
  SLIGHTLY_ABOVE: "The camera sits a little above head height, looking gently down so a little more of the floor shows; horizon level, walls upright — never a view from the ceiling.",
  OTS: "Over the shoulder: the back of the near character's head and shoulder fill the near foreground, big and close; the other character faces the camera.",
  CLOSE_TWO: "A close two-shot: both faces at the same height, filling the frame from just below the shoulders up.",
};
function shotBlock(b) {`);
  srep("  return clean([`CAMERA: ${size}, ${ang}. ${b.framing}`, NATURAL_PERSPECTIVE, face, scale]);", "  return clean([`CAMERA: ${size}, ${ang}. ${b.framing}`, b.cam && CAMERA_LIB[b.cam] ? CAMERA_LIB[b.cam] : \"\", NATURAL_PERSPECTIVE, face, scale]);");
  srep("  const head = `COLOUR — ${g0}: the background colours named in the setting stay flat, clean and evenly filled, as in the approved episode.`;", "  const head = `COLOUR — ${g0}: the background colours named in the setting stay flat, clean and evenly filled, as in the approved episode.` + (SW && M.kind === \"calm\" ? ` The walls stay exactly ${P0.wall[0]} — never peach, never orange.` : \"\");");
  // 2. Close character crops keep the stick bodies (the close two-shot drew white blobs below the heads).
  srep("  if (hasFace && names.length > 1) parts.push(INTERACTION);", "  if (hasFace && names.length > 1) parts.push(INTERACTION);\n  if (hasFace && ([\"CLOSE\", \"XCLOSE\"].includes(b.shotSize) || b.angle === \"OTS\")) parts.push(\"BODIES IN A CLOSE CROP: below each head only thin black line necks and arms show, exactly as in the references — never shoulders or bodies drawn as white filled shapes.\");");

  // ── 5. Weaker recurring props get one characterful, countable detail (Thomas point 1) ──
  setProp("BLOCKS", { text: "THE TOY BLOCKS: exactly five square toy blocks, each about the size of a mitten hand, in flat muted tan (#C9A27A) with one black outline and one simple raised shape on the front — circle, triangle, square, half-moon, small heart — no letters, nothing else." });
  setProp("RAIN_CLOUD", { text: "THE RAIN CLOUD: one small flat rounded cloud about the size of MOM's head, in slate grey (#8A96A6) with one black outline, three round puffs along its top, a small sulky face — two black dot eyes and one short downturned mouth line — and exactly five short straight rain dashes falling from its underside; it floats in the air touching nothing unless the action says a character holds, catches or pushes it." });
  setProp("GIANT_CLOUD", { text: "THE GIANT RAIN CLOUD: one giant flat rounded rain cloud — the family's little sulky cloud grown huge — in slate grey (#8A96A6) with one black outline, about as wide as half the frame, three round puffs along its top, a small sulky face of two black dot eyes and one short downturned mouth line, floating in the air and touching nothing, with exactly nine short straight rain dashes falling from its underside." });
  setProp("CLOUD_BALLOON", { text: "THE CLOUD ON A STRING: one small flat rounded rain cloud about the size of a child's head, in slate grey (#8A96A6) with one black outline, a small sulky face of two black dot eyes and one short downturned mouth line, and exactly three short straight rain dashes under it, tied to one thin black string whose lower end is held in a small mitten hand, like a balloon — one closed outline, one flat fill, the face, one string, nothing else." });
  setProp("YOKE", { text: "THE CONTROL YOKE: one plane control yoke in flat teal (#00A6A0), shaped like a wide flattened horseshoe with two short upright grips, each grip wrapped in one cream (#F1E9D6) band, and one small round brass-coloured (#C9A15A) badge showing a tiny pair of black wings in the centre of the horseshoe, mounted on one short straight column rising from the instrument panel — one closed outline, one flat teal fill, the two bands and the badge, nothing else." });
  setProp("HEART_CUSHION", { text: "THE HEART CUSHION: one soft plump heart-shaped cushion about the size of MOM's head, in flat raspberry (#E5457F), with one thin stitched line following its edge and one small square cream (#F1E9D6) patch sewn on near its point with four short black cross-stitches — one closed outline, one flat raspberry fill, the stitched line and the patch, nothing else." });
  setProp("BALANCE_SCALE", { text: "THE BALANCE SCALE: one tall old-fashioned balance scale in muted brass (#B59A5E): one straight upright post on one flat round base, topped by one small round brass bird with one black dot eye perched on the post, one straight crossbar resting on top of the post under the bird, and two shallow round pans hanging from its two ends on three straight lines each — nothing else." });
  setProp("GIANT_CLOCK", { hex: "#118C8C", colour: "deep teal", text: "THE GIANT CLOCK: one giant round alarm clock — the family's small alarm clock grown enormous — with a deep teal (#118C8C) rim and body and one round plain cream (#F1E9D6) face showing two black hands and no numbers, two round teal bells on top and two short round feet, standing on the floor as tall as MOM or taller — one closed outline, flat fills, nothing else." });
  api.addProp("SCHOOL_DESK", { name: "THE TINY SCHOOL DESK", hex: "#7C899B", colour: "slate blue", nouns: ["desk"], text: "THE TINY SCHOOL DESK: one small child's school desk with a flat rectangular top on four straight legs, and one small separate chair beside it, both in flat soft slate blue (#7C899B) with black outlines, sized for a small child — closed outlines, flat fills, nothing else." });
  setProp("TEDDY", { text: "THE TEDDY BEAR: one small soft teddy bear about the size of ANNA's head, in flat amber (#F2A900), with two round ears — the left ear sewn back on with four short black cross-stitches — two black dot eyes, one small black oval nose, two short arms and two short legs — one closed outline, one flat amber fill, then those details, nothing else." });
};
