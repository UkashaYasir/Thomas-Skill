// Revision 12 — film-wide pass: white space and selective colour, selective camera (HOLD), quoted letters,
// metaphor tags so the skill QA can measure them, the SEQUENCES block, and the revision entry.
module.exports = function (api) {
  const { B, E, by, rw, ed, srep, d } = api;

  // cue fixes found while writing (edit and pop on the same word, or two images on one word)
  { const e = E.find(x => x.ref === "S184"); ed("S184", "lead", e.change); }
  { const e = E.find(x => x.ref === "S204"); ed("S204", "not", e.change); }
  { const e = E.find(x => x.ref === "S205"); ed("S205", "not", e.change); }

  // ── quoted letters: image models print them; mouths are shapes (skill v16 rule 6) ──
  const unq = s => String(s).replace(/['‘’](?:o|oh)['‘’]/g, "circle").replace("as if weighing her own 'no'", "as if weighing her own refusal");
  for (const b of B) for (const k of ["framing", "action", "performance"]) { const t = unq(b[k]); if (t !== b[k]) { b[k] = t; api.changed.add(b.ref); } }
  for (const e of E) { const t = unq(e.change); if (t !== e.change) ed(e.ref, e.on, t); }

  // ── metaphor frames are tagged CONCEPT with their family (the skill QA counts metaphors by this tag) ──
  const MDEV = new Set(["METAPHOR_OBJECT", "METAPHOR_WORLD", "SCALE_SHIFT", "SPLIT_STATE", "HYPOTHETICAL", "TUG_OF_WAR"]);
  const MWORLD = new Set(["GIANT_SWING", "SKY_STORM", "COCKPIT", "CABIN", "ROAD", "CROSSROADS", "BOOK_MAZE", "EXAM_DESK"]);
  const FAM = [
    ["the gate", ["GATE", "GATE_MINI", "PUZZLE", "BALLOONS"], []],
    ["the storm cloud", ["RAIN_CLOUD", "GIANT_CLOUD", "CLOUD_BALLOON", "STORM_CLOUD"], ["SKY_STORM"]],
    ["the flight", ["PLANE", "YOKE", "GAUGE", "SEATBELT", "TEACUP"], ["COCKPIT", "CABIN"]],
    ["the clock", ["GIANT_CLOCK", "CLOCK", "PENDULUM_CLOCK", "PARK_CLOCK", "HOURGLASS"], []],
    ["the rulebook", ["BOOK", "BOOK_TOWER", "TEST_SHEET", "RED_PEN", "CHECKLIST", "LONG_CHECKLIST", "FLIPCHART", "MAGNIFIER"], ["BOOK_MAZE", "EXAM_DESK"]],
    ["the words", ["SPEECH_PILE", "SPEECH_ROW", "PODCAST_MICS", "SCRIBBLE_STORM", "QUESTION_CARD", "PROTEST_SIGN", "DOMINOES", "CEREAL_BOX"], []],
    ["the road", ["SIGNPOST", "CAR"], ["GIANT_SWING", "ROAD", "CROSSROADS"]],
    ["the heavy feelings", ["BACKPACK", "IRON_WEIGHT", "BALANCE_SCALE", "MOUSETRAP", "LOCKBOX", "PUPPET_BAR", "ANGER_BALL", "HEART_CUSHION", "BATTERY", "LIKE_METER", "TUMBLEWEED", "SPOTLIGHT", "TROPHY", "UNICORN", "UNICORN_BUN", "MAGIC_WAND", "TOY_HILL", "GIANT_TABLET"], []],
  ];
  const keyOf = p => String(p).replace(/^\d+x\s+/i, "").trim();
  const family = b => { const ks = (b.props || []).map(keyOf); const hero = keyOf(b.hero);
    for (const [n, ps, ws] of FAM) if (ws.includes(b.world)) return n;
    for (const [n, ps] of FAM) if (ps.includes(hero)) return n;
    for (const [n, ps] of FAM) if (ks.some(k => ps.includes(k))) return n;
    return "the heavy feelings"; };
  for (const b of B) {
    const isM = b.fn === "CONCEPT" || MDEV.has(b.device) || b.scale === "OVERWHELMING" || MWORLD.has(b.world);
    if (isM) { if (b.fn !== "CONCEPT" || !b.metaphor) { b.fn = "CONCEPT"; b.metaphor = family(b); api.changed.add(b.ref); } }
  }

  // ── colour (Revision 13): rooms keep their place colours; white only where a frame is set to it (idea frames);
  //    full colour where the frame's mood says so (storm purple, night navy, the past's frosty blue). No film-wide repaint.
  by("S190").mood = "DARK"; // bedtime: the hands insert sits between two night frames (S189, S191)
  // PLAN: each segment's planned mood follows the new colour script (its most common mood)
  api.replaceBlock("PLAN", "const PLAN = [\n" + d.PLAN.map(row => { const c = {}; B.filter(b => b.sequence === row.sequence).forEach(b => c[b.mood] = (c[b.mood] || 0) + 1); const m = Object.entries(c).sort((x, y) => y[1] - x[1])[0][0]; return "  " + JSON.stringify({ ...row, mood: m }) + ","; }).join("\n") + "\n];");

  // ── camera: selective — HOLD on the later images of a sequence and on gentle filler; no type above ~25% ──
  const SEQ = api.SEQ;
  const later = new Set(); for (const s of SEQ) { const bases = [...new Set(s.images.map(im => im.ref))]; bases.slice(1).forEach(r => later.add(r)); }
  const words = d.SCRIPT.map(s => String(s).split(/\s+/).filter(Boolean).length), spw = d.PROJECT.runtimeSec / words.reduce((a, c) => a + c, 0);
  const tStart = b => words.slice(0, b.n - 1).reduce((a, c) => a + c, 0) * spw;
  const hold = (b, note) => { b.move = { type: "HOLD", on: "", note }; api.changed.add(b.ref); };
  for (const b of B) if (b.editOnly || (later.has(b.ref) && !b.peak && b.shotSize !== "XCLOSE" && !["SNAP_ZOOM", "SHAKE"].includes(b.move.type))) hold(b, "hold still — the cut from the previous image of the sequence is the motion");
  const N = B.length, target = Math.round(N * 0.17), nHold = () => B.filter(x => x.move.type === "HOLD").length;
  const moves = new Set(E.map(e => e.ref)); // a held frame still moves: its edit or reveal does the work
  const quiet = b => !b.peak && tStart(b) > 30 && !b.move.on && (moves.has(b.ref) || b.reveal) && ["PUSH_IN", "DRIFT", "PULL_OUT", "PAN_LEFT", "PAN_RIGHT"].includes(b.move.type);
  for (const tier of ["SIMPLE", "EMOTIONAL"]) for (let i = 0; i < N; i++) { const b = B[i]; if (nHold() >= target) break;
    if (b.tier === tier && quiet(b) && (i === 0 || B[i - 1].move.type !== "HOLD") && (i === N - 1 || B[i + 1].move.type !== "HOLD")) hold(b, tier === "SIMPLE" ? "gentle line — hold still and let the voice carry it" : "quiet moment — hold still; the edit is the motion"); }
  const cap = Math.floor(N * 0.25), alt = ["DRIFT", "PULL_OUT", "PAN_RIGHT", "PAN_LEFT"];
  let k = 0; for (const b of B) { if (B.filter(x => x.move.type === "PUSH_IN").length <= cap) break;
    if (b.move.type === "PUSH_IN" && !b.peak && !b.move.on) { b.move = { ...b.move, type: alt[k++ % alt.length] }; api.changed.add(b.ref); } }
  for (let i = 3; i < N; i++) { const t = B[i].move.type; if (B[i - 1].move.type === t && B[i - 2].move.type === t && B[i - 3].move.type === t) { B[i].move = { ...B[i].move, type: t === "HOLD" ? "DRIFT" : "HOLD" }; api.changed.add(B[i].ref); } }

  // ── the SEQUENCES block (the editor reads the images of each important moment in this order) ──
  srep("const INSERT_BEATS = [];", "const INSERT_BEATS = [];\n// Revision 12 — Thomas's 3–5 image sequences for the important and emotional moments. Each image is the base frame of a line\n// (type base), that frame's in-scene edit from EDIT_CUES (type edit), or an extra edit image (type step, change written here).\n// from = the image it is made from — never more than two edits away from a generated base image.\nconst SEQUENCES = [\n" + SEQ.map(s => "  " + JSON.stringify(s) + ",").join("\n") + "\n];");

  if (api.afterFinal) api.afterFinal(); // the cold open keeps the camera plan written in Delivery 2
  api.revisionEntry = { batch: "Revision 13 — the new system: Delivery 1 and 2 (story map, chapter ideas, scene cards, place and object bibles) applied to the cold open;  — Thomas's newest notes (more white space, selective colour, stronger sequences) and the Phase 1 audit fixes", entries: [
    { point: "White space and selective colour: 0 near-white frames before; white-space backgrounds added, calm chapter tints softened almost to white, full colour kept for night, the storm and the old-house memories", refs: ["S1", "S47", "S104", "S143"] },
    { point: "Sequences: 24 important moments told as 3–5 images in one scene, chained as image edits from the approved base; S37, S75 and S205 became edit images of their scene (no base image)", refs: SEQ.map(s => s.images[0].ref) },
    { point: "Movement: every frame now has an edit, a mask reveal or a pop-in (32 frames had none)", refs: ["S32", "S90", "S164", "S225"] },
    { point: "Camera used selectively: HOLD on the later images of a sequence and on gentle lines, no move type above a quarter of the film", refs: ["S36", "S75", "S205"] },
    { point: "Objects: blocks, rain cloud, yoke, heart cushion, balance scale and teddy each get one memorable detail", refs: ["S54", "S215", "S101", "S125"] },
    { point: "Key lines get five different pictures (S104 over the shoulder, S206 side-on cut through the house, S235 eye-level close); BOUNDARIES word removed — the clicked latch says it", refs: ["S74", "S104", "S206", "S235"] },
    { point: "Mouths written as shapes, not quoted letters (29 prompts), so no letters get printed", refs: ["S17", "S74", "S143"] },
  ] };
  api.revisionEntry = { batch: "Revision 13 — the new system: Deliveries 1 and 2 (story map, chapter ideas, scene cards, place and object bibles, cold-open shot list) applied to the cold open", entries: [
    { point: "Cold open rebuilt from the shot list: one living room laid out once, MOM left and DAUGHTER right, the storm as the room turning purple on the peaks, white idea frames for calm, the lecture and the endless chart", refs: ["S1", "S4", "S8", "S15"] },
    { point: "Every cold-open prompt opens with THE PICTURE, names its placement left to right and its room master, and ends with a FINAL CHECK; full prompt length kept", refs: ["S1", "S13"] },
    { point: "Real places keep their own colours (place bible); the white repaint of room scenes from Revision 12 is removed", refs: ["S13", "S38"] },
    { point: "The giant clock is deep teal, not orange; a tiny school desk added for the classroom idea frame", refs: ["S8", "S10"] },
  ] };
};
