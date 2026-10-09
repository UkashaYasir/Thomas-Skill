import { useState, useRef } from "react";

// =====================================================================
// THE PARENT CODE — prompt build
// Copy this file, fill PROJECT, the dictionaries and RAW_BEATS, and keep
// the shared constants, the compiler and the UI exactly as they are.
// =====================================================================

const PROJECT = {
  title: "The Parent Code — Video N: <title>",
  runtimeSec: 510, // voice-over length in seconds (8:30 default)
};

// ── SHARED CONSTANTS — verbatim from references/constants.md ──────────

const SINGLE_FRAME = "ONE single 16:9 landscape frame showing one physical moment — a hand-drawn 2D animation still for an emotional parenting explainer, flat colours and clean black ink outlines. No storyboard, panels, borders, captions, subtitles or printed words. A wide shot shows figures small in the space, a medium shot a figure about half the frame high, a close-up the head and shoulders filling most of the frame.";

const REFERENCE_LOCK = "CHARACTERS FROM THE ATTACHED REFERENCE IMAGES: MOM is exactly the attached MOM reference images and character sheets, and SON is exactly the attached SON reference images and character sheets — the same head shape and head size as in the references, the same hair, small half-round ears, big white round eyes with large black pupils, short thick eyebrows, small mouth line, thin black line body, white mitten hands with no cuffs, small white oval feet, the same ink line thickness and the same height difference as the MOM-and-SON height sheet. Only the pose, expression, camera and setting change here; nobody is redesigned.";

const CORE_CONSTRUCTION = "CONSTRUCTION, as in the references: a large round white head with small half-round ears; big white round eyes, each with one large black pupil about half the eye's width, placed toward what the character looks at; two short thick eyebrow dashes with rounded ends whose tilt carries the emotion; a small mouth that changes shape with the emotion. From the neck down the body is one thin black line; the arms curve out from its top like rounded shoulders; every arm and leg is one thin black line with soft bends — no width, no white fill, no torso shape, no clothing. Hands are small white rounded mittens with one thumb bump and no cuff or band at the wrist; feet are small flat white ovals. Head size as in the references: MOM's head is about one-fifth of her standing height, SON's about one-quarter of his, and SON stands clearly shorter than MOM; a bigger face on screen always comes from the camera moving closer. Characters without a reference image are built the same way — adults with MOM's proportions, teenagers with SON's — with their own hair and accessories. Everyone looks at something inside the scene, never into the camera.";

const HAND_LOCK = "HANDS: every arm ends in a small white mitten with one thumb bump and no cuff, as in the references; a held object stays visible in the hand; a hand near the camera stays in proportion — never a giant glove or a lone arm from a frame corner.";

// Added after the Video 4 hook renders (an upside-down table shot and a fisheye kitchen): keep every camera natural.
// From the Friend or Parent build (render polish): flat colour everywhere, pure black hair.
const FLAT_COLOUR = "FLAT COLOUR: every wall, floor, sky and colour field is one single even flat colour from edge to edge — no gradient, glow, vignette or lighting effect; the mood colour never tints the characters, their hair or any object.";
const HAIR_LOCK = "HAIR: all hair is solid pure black (#1A1A1A), never brown, grey or tinted.";
const SHOT_WORD = { XCLOSE: "extreme close-up", CLOSE: "close-up", MEDIUM: "medium shot", MEDWIDE: "medium-wide shot", WIDE: "wide shot", HANDS: "hands-only insert", OBJECT: "object insert" };
function pictureLine(b) {
  const first = String(b.framing).split(/(?<=\.)\s/)[0].replace(/\.$/, "");
  return `THE PICTURE: ${SHOT_WORD[b.shotSize] || b.shotSize} — ${first}. The feeling: ${String(b.feel).replace(/\.$/, "")}.`;
}
const NATURAL_PERSPECTIVE = "PERSPECTIVE: a natural normal-lens view — level horizon, straight verticals, normal proportions, everyone upright; no fisheye, tilt, upside-down view or oversized foreground hand.";

const HANDS_ONLY_CONSTRUCTION = "HANDS-ONLY CONSTRUCTION: only hands and short forearms are in this frame, entering from the left and right frame edges. Each forearm is one thin black ink line — never a white tube, a thick arm or a sleeve — ending in a small white mitten hand with one thumb bump, exactly the line thickness and hand shape of the reference images. No head, face, hair, torso or legs appear anywhere in the frame.";

const PERFORMANCE_AND_EXPRESSION = "EXPRESSION: every character is caught mid-action with a clear gaze target and a weight shift, bent arm, turned torso or tilted head. One specific emotion, pushed stronger than life through eyebrow tilt, pupil direction and mouth shape, in the reference construction — no teeth, snarl or distorted eyes; pride is a clean smile; thinking is a head tilt, never a hand on the chin.";

const INTERACTION = "INTERACTION: the characters share one moment rather than posing side by side — what one of them does, the other visibly reacts to in this same frame, with their own expression and their own hand action. Their eyes show clearly whether they meet or avoid each other, and the space between them matches the relationship at this moment.";

const RECOGNITION = "RECOGNITION: each character is identifiable at a glance even when small, in profile or from behind — MOM by her black bun and her greater height, SON by his black spiky messy hair and shorter build, anyone else by their own described hair and accessories; no two characters share a hair shape.";

const RECURRING_CONSISTENCY = "RECURRING CONSISTENCY: characters keep the references' hair, head size, height and build; every named object keeps the same shape and part count, colour and size across frames; the camera changes only pose, crop and angle.";

const COLOUR_HIERARCHY = "COLOUR DIRECTION \u2014 NEUTRAL FIRST, COLOUR WITH PURPOSE: about 70\u201380% of the picture stays neutral and clean \u2014 walls, floors, furniture and sky quiet and desaturated \u2014 and about 20\u201330% is targeted colour on what matters: the hero object carries the one strongest colour so the eye goes straight to it; the white characters stand out clearly; never colour just to fill empty space.";

const DETAIL_CAP = "ONE CLEAR IDEA: one visual idea and one hero the eye finds within a second. Only the characters, objects and set pieces named here appear — no wall art, plants, lamps, extra furniture, background people or clutter. Furniture is simple and complete with legs to the floor; walls, floors and skies are plain flat colour with no texture. Every shape is finished and closed, nothing half-drawn or faded, nothing cut off except by the frame edge.";

const CONSTRUCTION_RESTATED = "CHARACTER LOCKS: exactly as the attached references — head size as in the references, big white round eyes with large black pupils, short thick eyebrows, a drawn mouth, thin black line bodies and limbs with no fill, white mitten hands, small white oval feet, no clothing beyond each character's named accessory; SON clearly shorter than MOM; nothing casts a shadow.";

const FLAT_STYLE = "FLAT 2D STYLE: matte flat fills and one consistent medium-thin black outline; no gradients, shading, cast shadows, glow, 3D or blur; something switched on or important shows as flat colour, a bolder outline or a few short ink dashes; everything rests on its ground line.";

const GLOBAL_AVOID = "AVOID: a head smaller or larger than in the references; a white-filled torso, thick tube arms or width on any limb; missing feet, a hand ending in a bare line, or a cuff or band around a mitten; eyes without a white circle; thin or long eyebrows; a face with no mouth; hair changing shape from the references; coloured heads; any garment; teeth, snarls or distorted faces; a hand-on-chin pose; idle side-by-side posing; a look into the camera; a teenager as tall as an adult; shadows, gradients, glow or blur; a grey, black-and-white or washed-out frame; one colour family everywhere; strong red on anything that is not danger; clutter, texture or background people; half-drawn shapes; any printed words, paragraphs or captions except the one named text; realistic or 3D rendering.";

const TIER = {
  SIMPLE: "SCENE TIER — SIMPLE: a clean connective moment, quick to read — one clear action, simple staging, the feeling still readable at a glance.",
  EMOTIONAL: "SCENE TIER — EMOTIONAL: a turning point of the story — everything visible of the characters carries the full weight of this moment.",
  HOOK: "SCENE TIER — HOOK: a peak of the video — bold staging, dramatic scale or camera angle and the strongest colour contrast of its section, still built around one clear idea.",
};

const SHOT = {
  XCLOSE: "extreme close-up",
  CLOSE: "close-up",
  MEDIUM: "medium shot",
  MEDWIDE: "medium-wide shot",
  WIDE: "wide shot",
  HANDS: "hands-only close shot, cropped at the forearms, no head or face anywhere in the frame, the hands and what they hold filling most of the frame",
  OBJECT: "object close-up with no character in the frame",
};

const ANGLE = {
  EYE: "level eye-line camera",
  LOW: "slightly low camera, a gentle upward view with straight vertical lines",
  HIGH: "slightly high camera, a gentle downward view with every character upright",
  OVERHEAD: "camera directly overhead looking straight down, used only for table tops, floors, beds and hands",
  OTS: "over-the-shoulder camera",
  PROFILE: "side-on profile camera",
  SQUARE: "square-on frontal camera",
  POV: "point-of-view camera through a character's eyes",
};

const FACE = {
  NONE: "",
  NORMAL: "",
  LARGE: "FACE SIZE — LARGE: the camera is close enough that the head and the top of the body line fill about half the frame, the expression clearly readable; the head keeps its normal size for its body.",
  HUGE: "FACE SIZE — HUGE: the camera moves in so close that the head alone fills 60 to 80 percent of the frame and the body is cropped out below it — the head keeps its normal proportions, only the camera is closer; placed off-centre and allowed to crop at the frame edge; eyes, eyebrows and mouth are drawn big and decisive so the feeling reads instantly — bigger features, never a distorted face.",
};

const SCALE = {
  ORDINARY: "",
  DOMINANT: "SCALE — DOMINANT: {HERO} is drawn two to three times its real size, the heaviest shape in the frame, with every one of its counted details still drawn.",
  OVERWHELMING: "SCALE — OVERWHELMING: {HERO} towers over a small figure and fills most of the frame, keeping its exact shape, colour and counted details.",
};

const TYPOGRAPHY = "bold hand-drawn black capital letters with slightly uneven rounded strokes, large and few";
const DANGER_RED = "#D32F2F";
const KEY_GREEN = "#00B140";
const KEY_MAGENTA = "#FF00FF";

// ── DICTIONARIES — rebuilt for every video ─────────────────────────────

// ROLE: one entry per character. age: "adult" | "teen" | "child". ref: true only if a reference image exists.
// wear: the small accessories this character ALWAYS wears (tie, scarf, cap, beanie, glasses, headband) —
// each also described in text with its hex. Never a garment covering the body. [] for none.
const ROLE = {
  "Mom": { age: "adult", ref: true, wear: [], text: "MOM (adult — the attached MOM reference images): the taller figure. Solid black hair parted softly at the centre so it meets the forehead in a small point, framing the round face down past the ears, with one thin strand hanging below each ear toward the jaw, and one round bun on top of the head marked with two or three thin curved lines. Small half-round ears show at eye level. No accessories." },
  "Son": { age: "teen", ref: true, wear: [], text: "SON (teenager — the attached SON reference images): clearly shorter than MOM, lean, with his larger-looking head exactly as in the reference. Solid black messy spiky hair in jagged pointed clumps: a fringe of pointed tips falling over the forehead to just above the eyebrows, spiky tips sticking out at the sides above the ears. The face is round, a touch taller than wide; small half-round ears. No accessories." },
};

// MOOD: the colour script palettes. [name, hex] pairs. Defaults from references/colour-direction.md.
const MOOD = {
  NEUTRAL: { label: "NEUTRAL", feel: "clean and quiet — the room steps back so the story object and the faces carry the frame", wall: ["clean light warm grey", "#EEEBE6"], floor: ["soft stone grey", "#D9D5CE"], furn: ["mid slate grey", "#7C8794"], sky: ["pale grey sky", "#ECEEF0"], ground: ["light stone", "#D3CFC7"], field: ["light grey", "#E4E1DC"] },
  BRIGHT: { label: "BRIGHT", feel: "clarity and calm", wall: ["warm near-white", "#FAF7F1"], floor: ["light warm grey", "#E7E1D6"], furn: ["soft steel blue", "#9DB4CC"], sky: ["pale sky blue", "#E3F0FA"], ground: ["pale sand", "#DCD4C4"], field: ["pure white", "#FFFFFF"] },
  WARM: { label: "WARM", feel: "safety, closeness and memory", wall: ["soft apricot", "#F8E2C6"], floor: ["warm sand", "#E6C8A2"], furn: ["muted blue-grey", "#7E9CAB"], sky: ["peach", "#FCE6C9"], ground: ["golden sand", "#D9C29B"], field: ["apricot", "#F6BE7E"] },
  COOL: { label: "COOL", feel: "distance, loneliness and withdrawal", wall: ["pale blue", "#DCE6F0"], floor: ["grey-blue", "#BCCAD8"], furn: ["muted sand", "#CDB896"], sky: ["cool sky blue", "#CFDCEA"], ground: ["slate grey", "#AEBBC7"], field: ["steel blue", "#8EA8C6"] },
  TENSE: { label: "TENSE", feel: "conflict, pressure and alarm", wall: ["light orange", "#FAD2B0"], floor: ["burnt peach", "#E9A675"], furn: ["slate", "#556575"], sky: ["orange", "#F9B97F"], ground: ["clay", "#C98553"], field: ["strong orange", "#F08A3A"] },
  DARK: { label: "DARK", feel: "heaviness, night and the lowest point", wall: ["deep slate", "#3F4B5E"], floor: ["darker slate", "#2D3645"], furn: ["lighter slate", "#76869C"], sky: ["night blue", "#34415A"], ground: ["near-black blue", "#222A37"], field: ["storm navy", "#2A3446"] },
  EVENING: { label: "EVENING", feel: "a quiet evening at home, just before it breaks", wall: ["soft sage", "#DDE5D6"], floor: ["grey sage", "#B8C7AE"], furn: ["deep olive-grey", "#56624F"], sky: ["pale sage sky", "#E2EADC"], ground: ["muted moss", "#A9B89C"], field: ["sage green", "#8FA67F"] },
  ICY: { label: "ICY", feel: "cold shock, a frozen moment", wall: ["icy periwinkle", "#DDE4FF"], floor: ["cold periwinkle", "#B7C3F0"], furn: ["deep indigo-grey", "#4F5A86"], sky: ["ice blue", "#E3E8FF"], ground: ["frost blue", "#A7B3E2"], field: ["cornflower", "#9AAEF4"] },
  SUNNY: { label: "SUNNY", feel: "heat rising, alarm, a sharp bright moment", wall: ["pale butter", "#FFF0B3"], floor: ["mustard sand", "#F1CF63"], furn: ["cool charcoal-grey", "#5F6275"], sky: ["lemon sky", "#FFF4C4"], ground: ["golden ochre", "#E6C35A"], field: ["alarm yellow", "#FFD23F"] },
  DUSK: { label: "DUSK", feel: "relief, reflection and cautious hope", wall: ["pale lilac", "#E8DFF1"], floor: ["soft lavender", "#CFC3E0"], furn: ["warm wood brown", "#B08D6E"], sky: ["lilac", "#E4D6EE"], ground: ["dusk lavender", "#BDAECF"], field: ["lavender", "#B7A3D8"] },
};

// WORLD: settings described by their elements, never by the place's name. kind: INDOOR | OUTDOOR | FIELD | SURFACE.
// Placeholders {WALL} {FLOOR} {SKY} {GROUND} {FIELD} are filled from the frame's mood.
// HOUSE LOCK: furniture keeps one fixed flat colour per set in every mood (write it into the text, e.g.
// "in flat slate grey-blue (#6E7C8E)") — never {FURN} for a set's furniture; the mood changes only walls,
// floors, sky and fields.
// The FIRST placeholder in the text is treated as the dominant background colour (QA compares the hero against it).
const WORLD = {
  "HALL_DOOR": { kind: "INDOOR", text: "a flat {WALL} wall meeting a flat {FLOOR} floor at one thin ink line, and one complete plain bedroom door in flat soft grey-blue (#8E9AAE) with a simple round handle, set into the wall." },
  "KITCHEN": { kind: "INDOOR", text: "a flat {WALL} wall meeting a flat {FLOOR} floor at one thin ink line; one simple rectangular table and two plain chairs, all in flat slate grey-blue (#6E7C8E), complete with legs reaching the floor." },
  "TABLETOP": { kind: "SURFACE", text: "the flat top of one plain table in {FLOOR}, seen from directly above and filling the whole background from edge to edge, with no texture, grain or edge visible." },
  "FIELD": { kind: "FIELD", text: "one flat {FIELD} colour field filling the entire background from edge to edge, with nothing else in it." },
};

// PROP: every story object. text = countable build spec; hex = its locked colour; nouns = words that name it in a script line.
const PROP = {
  "SPEECH": { name: "THE SPEECH BUBBLE", hex: "#FFFFFF", colour: "white", danger: false, nouns: [], text: "THE SPEECH BUBBLE: one hand-drawn speech bubble — a rounded white oval with one black ink line around it and one short pointed tail aimed toward the speaker's mouth but ending just short of it — about the size of the speaker's head or larger, floating over plain background and touching nothing, holding only the one small simple picture this frame names, in black ink and flat colour, with no words, letters or numbers; anyone inside it is drawn exactly like the characters — round white head, big white eye circles with black pupils, black ink — never with skin colour or a more detailed style." },
  "THOUGHT": { name: "THE THOUGHT BUBBLE", hex: "#FFFFFF", colour: "white", danger: false, nouns: [], text: "THE THOUGHT BUBBLE: one hand-drawn cloud-shaped thought bubble — a white cloud with a scalloped black ink edge — joined toward the thinker by exactly three small white circles that get smaller toward the head and stop short of it, about the size of the thinker's head or larger, floating over plain background and touching nothing, holding only the one small simple picture this frame names, in black ink and flat colour, with no words, letters or numbers; anyone inside it is drawn exactly like the characters — round white head, big white eye circles with black pupils, black ink — never with skin colour or a more detailed style." },
  "PHONE": { name: "THE PHONE", hex: "#F2A900", colour: "bright amber", danger: false, nouns: ["phone", "smartphone", "screen"], text: "THE PHONE: one hand-sized smartphone, a flat rectangle with softly rounded corners in bright amber (#F2A900), with exactly one black screen rectangle on its face and one small round camera dot above the screen — one closed outer outline, one flat amber fill, then those two details and nothing else." },
};

// OVERLAY: elements that exist only as pop-ins (never drawn into a base frame).
const OVERLAY = {
  "QUESTION": { name: "THE QUESTION MARK", hex: "#2F6FE0", danger: false, text: "one large bold question mark in flat cobalt blue (#2F6FE0) with a black ink outline, slightly tilted, hand-drawn." },
};

// ── SCRIPT — the exact voice-over lines, one per frame, saved once in the planning turn ──
// Beats take their script text from here by number, so batch turns never retype it.
const SCRIPT = [
  "<exact script line 1>",
];

// ── STORY PLAN — written before the beats (references/story-structure.md) ──
const STORY = {
  idea: "<what the viewer should understand and feel by the end, in one sentence>",
  arc: "<the emotional journey from the first frame to the last>",
  ending: "<how it lands — relief, cautious closeness, a calm moment>",
};

// One row per segment, in order; `sequence` must match the beats. open/payoff only for a segment that
// deliberately ends unresolved (the cold open), naming the ref of the frame that resolves it.
const PLAN = [
  { sequence: "01 Hook", purpose: "Drop the viewer into the conflict with no context.", feel: "Shock and tension.", mood: "TENSE", metaphor: "", open: false, payoff: "" },
];

// The spine object and recurring motifs — PROP or WORLD keys, each with the states it moves through.
const MOTIFS = [
  { key: "HALL_DOOR", meaning: "the closed relationship", arc: ["slammed", "knocked on", "sat beside", "opened"] },
];

// ── SKETCH — the scene-by-scene plan: one short line per script line, written in the sketch turn.
// Batch turns expand these into full beats instead of re-planning. Format (pipe-separated):
// "ref | sequence | scene | TIER | SHOT/ANGLE/FACE/SCALE | MOOD | hero KEY | STAGE | feel: … | idea: … | moment: … | pop: … | move: … | device: …"
const SKETCH = [
  "<S1 | 01 Hook | Hall, evening | HOOK | CLOSE/LOW/HUGE/ORDINARY | TENSE | hero FACE | PROBLEM | feel: shock | idea: SON slams his door on MOM mid-sentence; impact dashes | moment: surprise, the slam opens the film | pop: QUESTION ADD 'wrong' | move: SHAKE 'wrong'>",
];

// ── BEATS — one per script line, in order ──────────────────────────────
// Field reference: references/jsx-template.md. `script` is filled from SCRIPT by `n` — don't retype it.
const RAW_BEATS = [
  {
    n: 1, ref: "S1",
    sequence: "01 Hook", scene: "Hall, evening", tier: "HOOK", fn: "STORY",
    roles: "Son", props: [], hero: "FACE",
    feel: "Shock — something is badly wrong in this family.",
    meaning: "The film opens inside the conflict: the teen slams his door on his mother, and we meet him at his angriest.",
    shotSize: "CLOSE", angle: "LOW", face: "HUGE", scale: "ORDINARY",
    framing: "SON's head fills the right of the frame, cropped at the edge, the door edge cutting diagonally across the left as it swings shut.",
    action: "SON yanks the door shut with one mitten hand gripping its edge; three short ink impact dashes burst from the door edge.",
    performance: "SON: eyebrows pressed low with a steep inward tilt, pupils locked sideways on the gap in the closing door, mouth a tight flat pressed line; shoulder turned hard away.",
    world: "HALL_DOOR", mood: "TENSE", peak: true,
    stage: "PROBLEM",
    moment: "surprise: the slam opens the film",
    pop: { what: "QUESTION", on: "wrong", type: "ADD", motion: "pops in with a small bounce beside the door" },
    move: { type: "SHAKE", on: "wrong", note: "two-frame jolt as the door hits the frame" },
    device: "CONTEXT",
    reveal: null,
    link: "Sets up the closed door that MOM finally knocks on and opens in the last segment.",
    requiredText: "",
  },
  // ── NEXT BEATS GO HERE (keep this line: batch turns insert new beats just above it) ──
];

// Revision rounds: one batch per round of Thomas's feedback; entries list the refs to regenerate.
// Insert frames: extra shots cut into a frame on its strongest word; same fields as RAW_BEATS, n = the parent frame's line.
// Thomas's method: important moments as 3–5 image sequences in one scene (frame → its edit → inserts).
// { id, title, from: "S12", to: "S13", images: ["S12 frame", "S12 edit", "S12b insert", "S13 frame"] }
const SEQUENCES = [];
const INSERT_BEATS = [];
// In-scene changes (Muhammad's rule): a dynamic change inside a scene is an image EDIT of this frame's generated image, never a new prompt.
// The editor attaches the frame's image and pastes the edit prompt; show the original, then cut to the edited image on the cue word.
const EDIT_KEEP = "KEEP EXACTLY THE SAME: every character's design — the same round white head size, black hair shape, big white eye circles with black pupils, short thick eyebrows, thin black line body with no fill, small white mitten hands and small white oval feet; everyone and everything not named in the change in exactly the same position and pose; the same background, furniture, props, colours and flat fills; the same camera position, framing, crop and zoom; the same black ink line thickness and flat 2D style.";
const EDIT_DONT = "DO NOT: move, zoom or re-crop the camera; redraw or restyle any face or character not named in the change; add any object, text, letters, shadow, gradient or glow that the change does not name; change any colour.";
// Each: { ref: "S12", on: "cue word", change: "who changes, from what to what — pose, limbs, head, eyebrows, pupils, mouth, object positions; what stays" }
const EDIT_CUES = [];
const EDIT_WHO = { Mom: "MOM is the woman with black hair in a round bun on top", Son: "SON is the teenage boy with messy spiky black hair", Tara: "TARA is the teenage girl with a ponytail", Ben: "BEN is the teenage boy with curly hair and a cap", Boss: "BOSS is the bald man with glasses and a tie" };
function editWho(e) {
  const a = RAW_BEATS.find(x => x.ref === e.ref);
  const people = a.roles === "No characters" ? [] : a.roles.split(",").map(r => r.trim()).filter(r => EDIT_WHO[r]).map(r => EDIT_WHO[r]);
  const things = Object.values(PROP).filter(p => p.name && e.change.includes(p.name)).map(p => `${p.name} is the ${p.colour ? p.colour + " " : ""}${p.name.replace(/^(THE|HIS OWN|MOM'S) /, "").toLowerCase()}`);
  const list = [...people, ...things];
  return list.length ? `WHO AND WHAT IS WHO IN THIS IMAGE: ${list.join("; ")}.` : "";
}
function editPrompt(e) { return [`EDIT THIS IMAGE — make exactly one change and keep everything else identical.`, editWho(e), `CHANGE: ${e.change}`, EDIT_KEEP, EDIT_DONT].filter(Boolean).join("\n\n"); }

const REVISIONS = [
  // { batch: "Round 1 — <date / what the round was>", entries: [ { point: "3 — the opening needs more energy", refs: ["S1", "S2"] } ] },
];

// ── COMPILER ───────────────────────────────────────────────────────────

function clean(parts) { return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim(); }

function roleList(b) { return b.roles === "No characters" ? [] : b.roles.split(",").map(x => x.trim()).filter(Boolean); }

function mustRole(name, b) { if (!ROLE[name]) throw new Error(`Unknown ROLE "${name}" in ${b.ref}`); return ROLE[name]; }

function castLock(b) {
  const names = roleList(b);
  if (!names.length) return "CHARACTER COUNT: exactly 0. No person, head, face, hand or silhouette anywhere in this frame.";
  const upper = names.map(n => n.toUpperCase()).join(", ");
  if (b.shotSize === "HANDS") return `CHARACTER COUNT: exactly ${names.length} (${upper}), seen only as hands and forearms entering the frame; no head or face anywhere in the frame. Exactly the number of hands the action names, each entering from the edge it names — no extra hand anywhere.`;
  return `CHARACTER COUNT: exactly ${names.length}: ${upper}. No other person, head or silhouette anywhere in the frame${b.inset ? ", apart from the small simple drawings inside the bubble or on the screen described below" : ""}.`;
}

function heightBlock(b) {
  if (b.shotSize === "HANDS") return "";
  const names = roleList(b);
  const by = age => names.filter(n => mustRole(n, b).age === age).map(n => n.toUpperCase());
  const adults = by("adult"), teens = by("teen"), kids = by("child");
  const out = [];
  if (adults.length && teens.length) out.push(`HEIGHTS: ${teens.join(" and ")} stand${teens.length > 1 ? "" : "s"} clearly shorter than ${adults.join(" and ")}, as in the MOM-and-SON height sheet — standing together, the teenager's chin is at about the adult's shoulder and his face sits clearly lower than hers; seated or cropped, the teenager still reads as the younger, leaner one. The teenager's head sits clearly lower than the adult's, standing or seated.`);
  if (kids.length && (adults.length || teens.length)) out.push(`${kids.join(" and ")} ${kids.length > 1 ? "are young children whose heads reach" : "is a young child whose head reaches"} only about halfway up an adult's standing height, with a young child's proportions — the head about one-fifth of their height, short arms and legs — never an oversized bobble head.`);
  return out.join(" ");
}

function roleText(b) { return roleList(b).map(n => mustRole(n, b).text).join(" "); }

function paint(text, mood, b) {
  const M = MOOD[mood];
  if (!M) throw new Error(`Unknown MOOD "${mood}" in ${b.ref}`);
  const map = { WALL: M.wall, FLOOR: M.floor, FURN: M.furn, SKY: M.sky, GROUND: M.ground, FIELD: M.field };
  return text.replace(/\{(WALL|FLOOR|FURN|SKY|GROUND|FIELD)\}/g, (_, k) => `${map[k][0]} (${map[k][1]})`);
}

function worldBlock(b) {
  const W = WORLD[b.world];
  if (!W) throw new Error(`Unknown WORLD "${b.world}" in ${b.ref}`);
  return "SETTING: " + paint(W.text, b.mood, b);
}

function propItems(b) {
  return (b.props || []).map(e => {
    const m = String(e).trim().match(/^(\d+)x\s+(.+)$/i);
    const key = (m ? m[2] : String(e)).trim(), qty = m ? Number(m[1]) : 1;
    if (!PROP[key]) throw new Error(`Unknown PROP key "${key}" in ${b.ref}`);
    return { key, qty };
  });
}

function propLock(b) {
  const items = propItems(b);
  if (!items.length) return "OBJECTS: none beyond the set pieces named in the setting.";
  const total = items.reduce((t, i) => t + i.qty, 0);
  const list = items.map(i => (i.qty > 1 ? `${i.qty} of ` : "") + PROP[i.key].text).join(" ");
  return `OBJECTS: exactly ${total} story object${total > 1 ? "s" : ""}, plus the set pieces named in the setting. ${list}`;
}

function heroName(b) {
  if (b.hero === "FACE" || b.hero === "FIGURE") {
    const first = roleList(b)[0];
    return first ? `${first.toUpperCase()}'s ${b.hero === "FACE" ? "face" : "figure"}` : "the subject";
  }
  if (PROP[b.hero]) return PROP[b.hero].name;
  throw new Error(`Unknown hero "${b.hero}" in ${b.ref}`);
}

function colourBlock(b) {
  const M = MOOD[b.mood];
  if (!M) throw new Error(`Unknown MOOD "${b.mood}" in ${b.ref}`);
  const head = `COLOUR — ${M.label} mood, ${M.feel}: the background colours named in the setting stay flat and calm.`;
  const darkLock = b.mood === "DARK" ? " The dark mood is deep navy and slate blue — never grey, never black-and-white, never a photo filter or a border; every character keeps solid black (#1A1A1A) hair." : "";
  if (b.hero === "FACE" || b.hero === "FIGURE") {
    return `${head}${darkLock} HERO: ${heroName(b)}, pure white with black ink against the mood colour — the strongest contrast in the frame; no other strong colour anywhere. Characters: white heads, white mitten hands and white oval feet with black ink outlines, and thin black line bodies with no fill.`;
  }
  const P = PROP[b.hero];
  const others = propItems(b).filter(i => i.key !== b.hero).map(i => PROP[i.key].name);
  const rest = others.length ? ` ${others.join(", ")} keep their own locked colours, quieter than the hero.` : "";
  return `${head}${darkLock} HERO COLOUR: ${P.name} in saturated ${P.colour} (${P.hex}) — the brightest, most saturated colour in the frame, a hue nothing else in the frame shares.${rest} Characters: white heads, white mitten hands and white oval feet with black ink outlines, and thin black line bodies with no fill, clearly separate from the background.`;
}

function shotBlock(b) {
  const size = SHOT[b.shotSize], ang = ANGLE[b.angle];
  if (!size) throw new Error(`Unknown shotSize "${b.shotSize}" in ${b.ref}`);
  if (!ang) throw new Error(`Unknown angle "${b.angle}" in ${b.ref}`);
  const face = FACE[b.face || "NORMAL"];
  if (face === undefined) throw new Error(`Unknown face "${b.face}" in ${b.ref}`);
  const sc = SCALE[b.scale || "ORDINARY"];
  if (sc === undefined) throw new Error(`Unknown scale "${b.scale}" in ${b.ref}`);
  const scale = sc ? sc.replace("{HERO}", heroName(b)) : "";
  return clean([`CAMERA: ${size}, ${ang}. ${b.framing}`, NATURAL_PERSPECTIVE, face, scale]);
}

function textLock(b) {
  if (b.requiredText) return `TEXT: the only readable text in this frame is exactly "${b.requiredText}", in ${TYPOGRAPHY}, placed on the surface described above. No other words, letters, numbers or labels.`;
  return "TEXT: no readable words, letters, numbers, labels or signs anywhere in this frame.";
}

function buildPrompt(b) {
  const names = roleList(b), hasHumans = names.length > 0, hasFace = hasHumans && b.shotSize !== "HANDS";
  if (!TIER[b.tier]) throw new Error(`Unknown tier "${b.tier}" in ${b.ref}`);
  // Order is load-bearing (reworked after the Video 4 hook renders): the reference anchor first, then the
  // story moment — camera, action, expression, objects, setting — so the idea is never buried, then a short
  // construction block that agrees with the reference images, colour, the restated locks and the avoid list.
  const parts = [pictureLine(b), SINGLE_FRAME, FLAT_COLOUR];
  if (hasHumans) parts.push(REFERENCE_LOCK);
  if (hasFace) parts.push(HAIR_LOCK);
  parts.push(castLock(b), TIER[b.tier], shotBlock(b), `ACTION: ${b.action}`);
  if (hasHumans && b.performance) parts.push(`PERFORMANCE: ${b.performance}`);
  if (hasFace && names.length > 1) parts.push(INTERACTION);
  parts.push(propLock(b), worldBlock(b));
  if (hasFace) parts.push(CORE_CONSTRUCTION, HAND_LOCK, roleText(b), heightBlock(b));
  if (hasFace && (names.length > 1 || ["WIDE", "MEDWIDE"].includes(b.shotSize) || ["PROFILE", "OTS", "HIGH", "OVERHEAD"].includes(b.angle))) parts.push(RECOGNITION);
  else if (hasHumans && !hasFace) parts.push(HANDS_ONLY_CONSTRUCTION, HAND_LOCK); // hands-only: no head, hair or face text to tempt a head into frame
  parts.push(colourBlock(b), COLOUR_HIERARCHY, DETAIL_CAP);
  if (hasFace) parts.push(CONSTRUCTION_RESTATED, PERFORMANCE_AND_EXPRESSION);
  parts.push(RECURRING_CONSISTENCY, FLAT_STYLE, textLock(b));
  if (hasHumans && !hasFace) parts.push(HAND_LOCK);
  parts.push(GLOBAL_AVOID);
  return clean(parts);
}

// Overlay (pop-in) assets: one isolated element on a flat chroma-key background.
function hueOf(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, bl = parseInt(hex.slice(5, 7), 16) / 255;
  const mx = Math.max(r, g, bl), mn = Math.min(r, g, bl), d = mx - mn;
  if (d === 0) return -1;
  let h = mx === r ? ((g - bl) / d) % 6 : mx === g ? (bl - r) / d + 2 : (r - g) / d + 4;
  return (h * 60 + 360) % 360;
}
function keyFor(hex) { const h = hueOf(hex); return h >= 75 && h <= 170 ? KEY_MAGENTA : KEY_GREEN; }
function overlayEntry(key) { return OVERLAY[key] || PROP[key] || null; }
function buildOverlayPrompt(key) {
  const E = overlayEntry(key);
  if (!E) throw new Error(`Unknown pop element "${key}"`);
  const k = keyFor(E.hex);
  return clean([
    "ONE single isolated element, centred with a generous empty margin on every side, on a perfectly flat, uniform",
    k === KEY_GREEN ? `pure chroma green (${KEY_GREEN})` : `pure chroma magenta (${KEY_MAGENTA})`,
    "background that fills the whole 16:9 frame edge to edge, for keying. The element:", E.text,
    "Hand-drawn 2D style: flat solid fills and one medium-thin hand-inked black outline. No ground line, no shadow, no glow, no gradient, no other object, no character, and no text unless the element itself is a word. The background colour appears nowhere on the element.",
  ]);
}

const BEATS = RAW_BEATS.map(b => ({ ...b, script: b.script || SCRIPT[b.n - 1] || "" }));
const PROMPTS = BEATS.map(b => ({ ...b, prompt: buildPrompt(b) }));

const POP_CUES = PROMPTS.filter(p => p.pop).map(p => ({ ref: p.ref, script: p.script, ...p.pop }));
const INSERT_PROMPTS = INSERT_BEATS.map(b => ({ ...b, script: SCRIPT[b.n - 1], prompt: buildPrompt(b) }));
const EDIT_PROMPTS = EDIT_CUES.map(e => { const a = RAW_BEATS.find(x => x.ref === e.ref); return { ...e, script: a ? SCRIPT[a.n - 1] : "", prompt: editPrompt(e) }; });
// Camera-move cues for the edit (Video 4 standard): one per frame, applied to the still in Premiere. Never part of the prompt.
const MOVE_TYPES = {
  PUSH_IN: "slow push-in toward the hero (scale up about 5–10%)",
  PULL_OUT: "slow pull-out to reveal (scale down about 5–10%)",
  SNAP_ZOOM: "fast zoom punch on the word",
  PAN_LEFT: "slow pan to the left",
  PAN_RIGHT: "slow pan to the right",
  TILT_UP: "slow tilt up",
  TILT_DOWN: "slow tilt down",
  DRIFT: "gentle diagonal drift",
  SHAKE: "short two-frame camera shake on the word",
  HOLD: "no camera move — hold the frame still; the cut to the next image carries the motion",
};
PROMPTS.forEach(p => { if (p.move && !MOVE_TYPES[p.move.type]) throw new Error(`Unknown move type "${p.move.type}" in ${p.ref}`); });
const MOVE_CUES = PROMPTS.filter(p => p.move).map(p => ({ ref: p.ref, script: p.script, ...p.move }));
// Mask reveals (no extra generation): the element sits on one flat colour and touches nothing; in Premiere a flat shape in the cover colour hides it until the cue word.
const REVEAL_CUES = PROMPTS.filter(p => p.reveal).map(p => ({ ref: p.ref, script: p.script, ...p.reveal }));
const OVERLAY_PROMPTS = [...new Set(POP_CUES.filter(c => c.type === "ADD").map(c => c.what))]
  .map(key => ({ key, name: overlayEntry(key) ? overlayEntry(key).name : key, uses: POP_CUES.filter(c => c.what === key && c.type === "ADD").map(c => c.ref), prompt: buildOverlayPrompt(key) }));

const SECTIONS = [...new Set(PROMPTS.map(p => p.sequence))];

const CONSTANTS = [
  { label: "[SINGLE_FRAME]", text: SINGLE_FRAME },
  { label: "[REFERENCE_LOCK]", text: REFERENCE_LOCK },
  { label: "[CORE_CONSTRUCTION]", text: CORE_CONSTRUCTION },
  { label: "[HAND_LOCK]", text: HAND_LOCK },
  { label: "[HANDS_ONLY_CONSTRUCTION]", text: HANDS_ONLY_CONSTRUCTION },
  { label: "[PERFORMANCE_AND_EXPRESSION]", text: PERFORMANCE_AND_EXPRESSION },
  { label: "[INTERACTION] two or more visible characters", text: INTERACTION },
  { label: "[RECOGNITION] wide, profile, over-the-shoulder, high, overhead and multi-character frames", text: RECOGNITION },
  { label: "[RECURRING_CONSISTENCY]", text: RECURRING_CONSISTENCY },
  { label: "[COLOUR_HIERARCHY]", text: COLOUR_HIERARCHY },
  { label: "[DETAIL_CAP]", text: DETAIL_CAP },
  { label: "[CONSTRUCTION_RESTATED]", text: CONSTRUCTION_RESTATED },
  { label: "[FLAT_STYLE]", text: FLAT_STYLE },
  { label: "[GLOBAL_AVOID]", text: GLOBAL_AVOID },
  ...Object.entries(TIER).map(([k, v]) => ({ label: `[TIER_${k}]`, text: v })),
  ...Object.entries(ROLE).map(([k, v]) => ({ label: `[ROLE_${k.toUpperCase().replace(/\s+/g, "_")}] ${v.age}${v.ref ? " · reference image" : " · no reference image"}${v.wear && v.wear.length ? " · wears " + v.wear.map(w => `${w.item} ${w.hex}`).join(", ") : ""}`, text: v.text })),
  ...Object.entries(MOOD).map(([k, v]) => ({ label: `[MOOD_${k}] ${v.feel}`, text: ["wall", "floor", "furn", "sky", "ground", "field"].map(f => `${f}: ${v[f][0]} ${v[f][1]}`).join(" · ") })),
  ...Object.entries(WORLD).map(([k, v]) => ({ label: `[WORLD_${k}] ${v.kind}`, text: v.text })),
  ...Object.entries(PROP).map(([k, v]) => ({ label: `[PROP_${k}] ${v.hex}${v.danger ? " · danger" : ""}`, text: v.text })),
  ...Object.entries(OVERLAY).map(([k, v]) => ({ label: `[OVERLAY_${k}] ${v.hex}${v.danger ? " · danger" : ""}`, text: v.text })),
];

/* ===== UI ===== */

function heroHex(p) { return PROP[p.hero] ? PROP[p.hero].hex : null; }
function motifRefs(key) { return PROMPTS.filter(p => p.world === key || (p.props || []).some(x => String(x).replace(/^\d+x\s+/i, "").trim() === key)).map(p => p.ref); }

function copyText(text) {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed"; ta.style.top = "0"; ta.style.left = "0"; ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    if (ok) return Promise.resolve(true);
  } catch (e) { /* fall through */ }
  if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }
  return Promise.resolve(false);
}

function PromptBox({ label, meta, text, pills }) {
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const onCopy = () => copyText(text).then(ok => {
    if (ok) { setStatus("copied"); setTimeout(() => setStatus(""), 1600); return; }
    setOpen(true); setStatus("manual");
    setTimeout(() => { if (ref.current) { ref.current.focus(); ref.current.select(); } }, 0);
  });
  return (
    <div style={S.card}>
      <div style={S.cardHead}>
        <div style={S.labelWrap}>
          <span style={S.label}>{label}</span>
          {meta && <span style={S.meta}>{meta}</span>}
          {pills && pills.length > 0 && (
            <div style={S.pills}>{pills.map((p, i) => <span key={i} style={{ ...S.pill, background: p.bg, color: p.fg || "#fff" }}>{p.text}</span>)}</div>
          )}
        </div>
        <button onClick={onCopy} style={{ ...S.copyBtn, ...(status === "copied" ? S.copyOk : {}) }}>
          {status === "copied" ? "✓ Copied" : status === "manual" ? "Press Ctrl/Cmd+C" : "Copy"}
        </button>
      </div>
      <textarea ref={ref} readOnly value={text} onDoubleClick={e => e.target.select()} style={{ ...S.ta, height: open ? 360 : 92 }} />
      <div style={S.foot}>
        <span style={S.hint}>{text.length.toLocaleString()} characters · double-click the text to select all of it</span>
        <button onClick={() => setOpen(v => !v)} style={S.linkBtn}>{open ? "Show less" : "Show more"}</button>
      </div>
    </div>
  );
}

function pillsFor(p) {
  const M = MOOD[p.mood];
  const out = [
    { text: p.tier.toLowerCase(), bg: p.tier === "HOOK" ? "#b3261e" : p.tier === "EMOTIONAL" ? "#6d4c9f" : "#607080" },
    { text: `${p.shotSize.toLowerCase()} · ${p.angle.toLowerCase()}`, bg: "#37474f" },
    { text: `mood ${p.mood.toLowerCase()}`, bg: M ? M.field[1] : "#999", fg: M && ["DARK", "TENSE"].includes(p.mood) ? "#fff" : "#1a1a1a" },
  ];
  if (heroHex(p)) out.push({ text: `hero ${PROP[p.hero].name.toLowerCase()}`, bg: heroHex(p), fg: "#1a1a1a" });
  if (p.face === "HUGE" || p.face === "LARGE") out.push({ text: `face ${p.face.toLowerCase()}`, bg: "#8d6e63" });
  if (p.scale && p.scale !== "ORDINARY") out.push({ text: p.scale.toLowerCase(), bg: "#00796b" });
  if (p.stage) out.push({ text: p.stage.toLowerCase(), bg: "#5d4037" });
  if (p.peak) out.push({ text: "peak", bg: "#1a1a1a" });
  if (p.moment) out.push({ text: p.moment.split(":")[0], bg: "#c77700" });
  if (p.pop) out.push({ text: `pop ${p.pop.type.toLowerCase()}`, bg: "#2f6fe0" });
  if (p.move) out.push({ text: `move ${String(p.move.type).toLowerCase().replace("_", " ")}`, bg: "#6a1b9a" });
  if (p.reveal) out.push({ text: "reveal", bg: "#00897b" });
  return out;
}

function Frame({ p }) {
  return <PromptBox label={`${p.ref} · ${p.scene}`} meta={`"${p.script}" · feel: ${p.feel} · cast: ${p.roles}${p.props && p.props.length ? " · props: " + p.props.join(", ") : ""}${p.move ? " · move: " + String(p.move.type).replace("_", " ") + (p.move.on ? " on “" + p.move.on + "”" : "") : ""}${p.reveal ? " · reveal on “" + p.reveal.on + "”" : ""}`} text={p.prompt} pills={pillsFor(p)} />;
}

function ColourBar() {
  return (
    <div style={S.barWrap} title="Colour script: top row = mood per frame (white tick = planned peak), bottom row = hero colour">
      <div style={S.barRow}>{PROMPTS.map(p => <div key={p.ref} title={`${p.ref} · ${p.mood}${p.peak ? " · peak" : ""}`} style={{ flex: 1, background: MOOD[p.mood] ? MOOD[p.mood].field[1] : "#ccc", borderTop: p.peak ? "3px solid #fff" : "3px solid transparent" }} />)}</div>
      <div style={S.barRow2}>{PROMPTS.map(p => <div key={p.ref} style={{ flex: 1, background: heroHex(p) || "#555" }} />)}</div>
    </div>
  );
}

function stats() {
  const n = PROMPTS.length || 1, pct = x => Math.round(100 * x / n) + "%";
  const close = PROMPTS.filter(p => ["CLOSE", "XCLOSE", "HANDS"].includes(p.shotSize)).length;
  return [
    `${PROMPTS.length} of ${Math.max(SCRIPT.length, PROMPTS.length)} lines written`, `${SECTIONS.length} sections`,
    `close ${pct(close)}`, `huge faces ${PROMPTS.filter(p => p.face === "HUGE").length}`,
    `hands-only ${PROMPTS.filter(p => p.shotSize === "HANDS").length}`,
    `big objects ${PROMPTS.filter(p => p.scale && p.scale !== "ORDINARY").length}`,
    `moments ${PROMPTS.filter(p => p.moment).length}`, `pop-ins ${POP_CUES.length}`, `moves ${MOVE_CUES.length}`, `mask reveals ${REVEAL_CUES.length}`, `inserts ${INSERT_PROMPTS.length}`, `edits ${EDIT_PROMPTS.length}`,
  ].join(" · ");
}

export default function App() {
  const [tab, setTab] = useState("prompts");
  const [section, setSection] = useState("ALL");
  const [openSec, setOpenSec] = useState(SECTIONS[0] || "");
  const [copiedSec, setCopiedSec] = useState("");
  const byRef = Object.fromEntries(PROMPTS.map(p => [p.ref, p]));
  const shown = section === "ALL" ? PROMPTS : PROMPTS.filter(p => p.sequence === section);
  const copySection = s => {
    const text = PROMPTS.filter(p => p.sequence === s).map(p => `=== ${p.ref} ===\n${p.prompt}`).join("\n\n");
    copyText(text).then(ok => { setCopiedSec(ok ? s : "fail:" + s); setTimeout(() => setCopiedSec(""), 1800); });
  };
  const tabs = [
    { id: "plan", label: "Plan" },
    { id: "prompts", label: `Prompts (${PROMPTS.length})` },
    { id: "sections", label: `Sections (${SECTIONS.length})` },
    { id: "pops", label: `Pop-ins, reveals, edits & moves (${POP_CUES.length}/${REVEAL_CUES.length}/${EDIT_PROMPTS.length}/${MOVE_CUES.length})` },
    { id: "constants", label: "Constants" },
    { id: "fixes", label: `Fixes (${REVISIONS.reduce((t, r) => t + r.entries.length, 0)})` },
  ];
  return (
    <div style={S.root}>
      <div style={S.header}>
        <h1 style={S.title}>{PROJECT.title}</h1>
        <div style={S.sub}>{stats()}</div>
        <ColourBar />
        <div style={S.tabs}>{tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ ...S.tab, ...(tab === t.id ? S.tabOn : {}) }}>{t.label}</button>)}</div>
      </div>
      <div style={S.body}>
        {tab === "plan" && (
          <div>
            <div style={S.note}><b>Idea:</b> {STORY.idea}<br /><b>Arc:</b> {STORY.arc}<br /><b>Ending:</b> {STORY.ending}</div>
            <div style={S.tableWrap}>
              <table style={S.table}>
                <thead><tr><th style={S.th}>Segment</th><th style={S.th}>Purpose</th><th style={S.th}>Feel</th><th style={S.th}>Mood</th><th style={S.th}>Metaphor</th><th style={S.th}>Frames</th></tr></thead>
                <tbody>{PLAN.map(r => (
                  <tr key={r.sequence}>
                    <td style={S.td}>{r.sequence}{r.open ? ` · open → paid off at ${r.payoff}` : ""}</td>
                    <td style={S.td}>{r.purpose}</td>
                    <td style={S.td}>{r.feel}</td>
                    <td style={S.td}><span style={{ ...S.swatch, background: MOOD[r.mood] ? MOOD[r.mood].field[1] : "#ccc" }} /> {r.mood}</td>
                    <td style={S.td}>{r.metaphor || "—"}</td>
                    <td style={S.td}>{PROMPTS.filter(p => p.sequence === r.sequence).length}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <h3 style={S.h3}>Spine object and motifs</h3>
            {MOTIFS.map(m => <div key={m.key} style={S.note}><b>{m.key}</b> — {m.meaning}<br />arc: {m.arc.join(" → ")}<br />appears in: {motifRefs(m.key).join(", ") || "—"}</div>)}
          </div>
        )}
        {tab === "prompts" && (
          <div>
            <select value={section} onChange={e => setSection(e.target.value)} style={S.select}>
              <option value="ALL">All sections</option>
              {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {shown.map(p => <Frame key={p.ref} p={p} />)}
          </div>
        )}
        {tab === "sections" && SECTIONS.map(s => {
          const items = PROMPTS.filter(p => p.sequence === s), open = openSec === s;
          return (
            <div key={s}>
              <div style={S.secHead}>
                <button onClick={() => setOpenSec(open ? "" : s)} style={S.secBtn}>{open ? "▾" : "▸"} {s} · {items.length} frames</button>
                <button onClick={() => copySection(s)} style={S.secCopy}>{copiedSec === s ? "✓ Copied" : copiedSec === "fail:" + s ? "Copy blocked — use each frame" : "Copy all"}</button>
              </div>
              {open && items.map(p => <Frame key={p.ref} p={p} />)}
            </div>
          );
        })}
        {tab === "pops" && (
          <div>
            <div style={S.note}>Pop-in cues for the edit. <b>ADD</b> = the element is not in the base frame; key its overlay (below) and pop it in on the word. <b>PUNCH</b> = the element is already in the frame; give it a quick zoom, scale bump or shake on the word.</div>
            <div style={S.tableWrap}>
              <table style={S.table}>
                <thead><tr><th style={S.th}>Frame</th><th style={S.th}>On the word</th><th style={S.th}>Element</th><th style={S.th}>Type</th><th style={S.th}>Motion</th></tr></thead>
                <tbody>{POP_CUES.map((c, i) => <tr key={i}><td style={S.td}>{c.ref}</td><td style={S.td}>“{c.on}”</td><td style={S.td}>{overlayEntry(c.what) ? overlayEntry(c.what).name : c.what}</td><td style={S.td}>{c.type}</td><td style={S.td}>{c.motion}</td></tr>)}</tbody>
              </table>
            </div>
            <h3 style={S.h3}>Insert frames — cut into the frame of the same line, on the word</h3>
            {INSERT_PROMPTS.map(p => <PromptBox key={p.ref} label={`${p.ref} · “${p.script}” · cut in on “${p.move.on}”`} meta={p.meaning} text={p.prompt} />)}
            <h3 style={S.h3}>Edit prompts — dynamic changes inside the scene</h3>
            <div style={S.note}>Don't generate a new frame for these. Open the frame's generated image in the image editor, paste the edit prompt, and keep the result. In the edit, show the original image, then cut to the edited one on the cue word.</div>
            {EDIT_PROMPTS.map(p => <PromptBox key={p.ref} label={`${p.ref} · edit, cut on “${p.on}”`} meta={`“${p.script}”`} text={p.prompt} />)}
            <h3 style={S.h3}>Mask reveals — hide with a flat shape, uncover on the word</h3>
            <div style={S.note}>No extra generation. Each element sits on one flat colour and touches nothing. In Premiere, draw a shape in the cover colour over it and take the shape away on the cue word.</div>
            <div style={S.tableWrap}>
              <table style={S.table}>
                <thead><tr><th style={S.th}>Frame</th><th style={S.th}>On the word</th><th style={S.th}>Element</th><th style={S.th}>Cover colour</th><th style={S.th}>How</th></tr></thead>
                <tbody>{REVEAL_CUES.map((c, i) => <tr key={i}><td style={S.td}>{c.ref}</td><td style={S.td}>“{c.on}”</td><td style={S.td}>{c.what}</td><td style={S.td}><span style={{ display: "inline-block", width: 12, height: 12, background: c.cover, border: "1px solid #999", verticalAlign: "middle", marginRight: 6 }} />{c.cover}</td><td style={S.td}>{c.how}</td></tr>)}</tbody>
              </table>
            </div>
            <h3 style={S.h3}>Camera moves — apply to each still in the edit</h3>
            <div style={S.note}>One small move per frame keeps every still alive. <b>SNAP_ZOOM</b> and <b>SHAKE</b> hit the named word; the others run across the frame, starting on the word when one is given.</div>
            <div style={S.tableWrap}>
              <table style={S.table}>
                <thead><tr><th style={S.th}>Frame</th><th style={S.th}>Move</th><th style={S.th}>On the word</th><th style={S.th}>Note</th></tr></thead>
                <tbody>{MOVE_CUES.map((c, i) => <tr key={i}><td style={S.td}>{c.ref}</td><td style={S.td}>{String(c.type).replace("_", " ")} — {MOVE_TYPES[c.type]}</td><td style={S.td}>{c.on ? `“${c.on}”` : "whole frame"}</td><td style={S.td}>{c.note}</td></tr>)}</tbody>
              </table>
            </div>
            <h3 style={S.h3}>Overlay prompts — generate each once, reuse everywhere it pops</h3>
            {OVERLAY_PROMPTS.map(o => <PromptBox key={o.key} label={`${o.name}`} meta={`pops in at ${o.uses.join(", ")}`} text={o.prompt} />)}
          </div>
        )}
        {tab === "constants" && CONSTANTS.map((c, i) => <PromptBox key={i} label={c.label} text={c.text} />)}
        {tab === "fixes" && (
          <div>
            {REVISIONS.length === 0 && <div style={S.note}>No revision rounds yet.</div>}
            {REVISIONS.map((r, i) => (
              <div key={i}>
                <h3 style={S.h3}>{r.batch}</h3>
                {r.entries.map((e, j) => (
                  <div key={j}>
                    <div style={S.tag}>{e.point}</div>
                    {e.refs.map(ref => byRef[ref] ? <Frame key={ref} p={byRef[ref]} /> : <div key={ref} style={S.note}>{ref} not found</div>)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const S = {
  root: { fontFamily: "Georgia, serif", background: "#faf8f4", minHeight: "100vh", color: "#1a1a1a" },
  header: { background: "#1a1a1a", color: "#fff", padding: "24px 28px 0" },
  title: { margin: 0, fontSize: 21, fontWeight: "bold" },
  sub: { marginTop: 6, fontSize: 12, fontFamily: "monospace", color: "#bdbdbd" },
  barWrap: { marginTop: 12, borderRadius: 4, overflow: "hidden", border: "1px solid #444" },
  barRow: { display: "flex", height: 16 },
  barRow2: { display: "flex", height: 6 },
  tabs: { display: "flex", gap: 2, flexWrap: "wrap", marginTop: 14 },
  tab: { padding: "9px 16px", border: "none", background: "#333", color: "#ccc", cursor: "pointer", fontSize: 13, fontFamily: "monospace", borderRadius: "6px 6px 0 0" },
  tabOn: { background: "#faf8f4", color: "#1a1a1a", fontWeight: "bold" },
  body: { padding: "22px 28px", maxWidth: 960, margin: "0 auto" },
  select: { marginBottom: 14, padding: "6px 10px", fontFamily: "monospace", fontSize: 12, borderRadius: 5, border: "1px solid #ccc", maxWidth: "100%" },
  card: { background: "#fff", border: "1px solid #e0ddd8", borderRadius: 8, marginBottom: 14, overflow: "hidden" },
  cardHead: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, padding: "10px 14px", background: "#f5f2ec", borderBottom: "1px solid #e0ddd8" },
  labelWrap: { display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 },
  label: { fontSize: 12, fontFamily: "monospace", fontWeight: "bold" },
  meta: { fontSize: 11, fontFamily: "monospace", color: "#777", fontStyle: "italic", lineHeight: 1.4 },
  pills: { display: "flex", flexWrap: "wrap", gap: 4 },
  pill: { fontSize: 10, fontFamily: "monospace", padding: "2px 7px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)" },
  copyBtn: { padding: "5px 13px", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 12, fontFamily: "monospace", whiteSpace: "nowrap", flexShrink: 0 },
  copyOk: { background: "#2e7d32" },
  ta: { display: "block", width: "100%", boxSizing: "border-box", border: "none", resize: "vertical", padding: "12px 14px", fontSize: 12, lineHeight: 1.65, fontFamily: "monospace", color: "#2a2a2a", background: "#fff" },
  foot: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "6px 14px 10px", flexWrap: "wrap" },
  hint: { fontSize: 10.5, fontFamily: "monospace", color: "#999", fontStyle: "italic" },
  linkBtn: { padding: "3px 10px", background: "transparent", color: "#555", border: "1px solid #ccc", borderRadius: 5, cursor: "pointer", fontSize: 11, fontFamily: "monospace" },
  secHead: { display: "flex", gap: 6, margin: "10px 0 8px" },
  secBtn: { flex: 1, textAlign: "left", padding: "10px 14px", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, fontFamily: "monospace" },
  secCopy: { padding: "10px 14px", background: "#444", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12, fontFamily: "monospace", whiteSpace: "nowrap" },
  note: { background: "#fff8e6", border: "1px solid #e8d9a8", borderRadius: 8, padding: "10px 14px", fontSize: 12.5, lineHeight: 1.6, marginBottom: 14, color: "#5a4a20" },
  tableWrap: { overflowX: "auto", marginBottom: 18 },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "monospace", background: "#fff" },
  th: { textAlign: "left", padding: "6px 8px", borderBottom: "2px solid #ddd", background: "#f5f2ec" },
  td: { padding: "6px 8px", borderBottom: "1px solid #eee", verticalAlign: "top" },
  h3: { fontSize: 14, fontFamily: "monospace", margin: "18px 0 10px" },
  swatch: { display: "inline-block", width: 12, height: 12, borderRadius: 3, border: "1px solid #999", verticalAlign: "middle" },
  tag: { display: "inline-block", fontSize: 11.5, fontFamily: "monospace", color: "#7a6a3a", background: "#f6efdc", borderRadius: 5, padding: "5px 10px", marginBottom: 6 },
};
