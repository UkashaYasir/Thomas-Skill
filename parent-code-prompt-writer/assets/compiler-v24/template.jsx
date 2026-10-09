import { useState, useRef } from "react";

// =====================================================================
// THE PARENT CODE — prompt build (compiler v24)
// Copy this file, fill PROJECT, the dictionaries and RAW_BEATS (or let assemble.cjs fill them), and keep
// the shared constants, the compiler and the UI exactly as they are.
// v24 (Thomas's final word after Video 08, 9 Oct 2026 — references/v24-standard.md): a pure white stage; places as thin
// black line pieces with white fill, only the ones the frame needs; the colour focus bright and vivid by default, colour by
// meaning; a drawn halo or rainbow burst for glow; objects two or three times larger for a moment; characters never too
// small; zoom plans that reuse a still; short, playful hand-lettered words — never numbered titles. Under it, v19: the seven
// expression features, a real interaction beat, close-ups that make sense (look + ctx).
// =====================================================================

const PROJECT = {
  title: "The Parent Code — <video title>",
  runtimeSec: 510, // voice-over length in seconds — 8:30 default until Muhammad's final VO timing arrives
};

// ── SHARED CONSTANTS ───────────────────────────────────────────────────

const SINGLE_FRAME = "ONE single 16:9 landscape frame showing one physical moment — a hand-drawn 2D animation still for a modern, expressive parenting explainer: flat colours, confident hand-inked black outlines and big, clear emotions — never glossy, never vector-perfect or AI-polished. No storyboard, panels, borders, captions, subtitles or printed words. Even a wide shot keeps every character large enough that the face and its feeling read at once; a close-up fills most of the frame with the head. Every character is a simple stick figure in the style of the attached references — a round white head and a thin black line body with no fill — never a realistic or anime-style person, never skin colour, clothing or a filled body.";

const REF_SPEC = "the same head shape and head size as in the references, the same small half-round ears, big white round eyes with large black pupils, short thick eyebrows, a drawn mouth that changes shape with the feeling, thin black line body, white mitten hands with no cuffs, small white oval feet, the same ink line thickness and the same height difference as the MOM-and-SON height sheet";
// REFERENCE_LOCK (shown in the Constants tab): the frame-by-frame version is built by refLock() in the compiler.
const REFERENCE_LOCK = "CHARACTERS FROM THE ATTACHED REFERENCE IMAGES: MOM is exactly the attached MOM reference images and character sheets, and SON is exactly the attached SON reference images and character sheets; every other character is drawn by copying the MOM or SON reference and changing only the listed hair, size and small items — " + REF_SPEC + ". Only the pose, expression, camera and setting change here; nobody is redesigned.";

const CORE_CONSTRUCTION = "CONSTRUCTION, as in the references: a large round white head with small half-round ears; big white round eyes, each with one large black pupil about half the eye's width, placed toward what the character looks at; two short thick eyebrow dashes with rounded ends whose tilt carries the emotion; a mouth that changes shape with the emotion. From the neck down the body is one thin black line; the arms curve out from its top like rounded shoulders; every arm and leg is one thin black line with soft bends — no width, no white fill, no torso shape, no clothing. Hands are small white rounded mittens with one thumb bump and no cuff or band at the wrist; feet are small flat white ovals. Head size as in the references: MOM's head is about one-fifth of her standing height, SON's about one-quarter of his, and SON stands clearly shorter than MOM; a bigger face on screen always comes from the camera moving closer. Characters without a reference image are built the same way — adults with MOM's proportions, teenagers with SON's — with their own hair and accessories. Everyone looks at something inside the scene, never into the camera.";

const HAND_LOCK = "HANDS: every arm ends in a small white mitten with one thumb bump and no cuff, as in the references; a held object stays visible in the hand; a hand near the camera stays in proportion — never a giant glove or one long arm stretched across the frame. Every character has exactly two arms, each ending in exactly one mitten hand — never a third arm or hand.";

// Added after the Video 4 hook renders (an upside-down table shot and a fisheye kitchen): keep every camera natural.
const NATURAL_PERSPECTIVE = "PERSPECTIVE: a natural normal-lens view — level horizon, straight verticals, normal proportions, standing figures upright; no fisheye, tilt, upside-down view or oversized foreground hand.";
// a figure lying down (in bed, on a cushion) is not "upright"
function perspective(b) { const t = [b.action, b.map, b.performance].join(" "); return /\b(lies|lying) (awake|asleep|in bed|in the bed|on (his|her) (back|side)|back|curled)\b|\basleep\b|\b(lands|landing) on (his|her) back\b/.test(t) ? NATURAL_PERSPECTIVE.replace("standing figures upright", "standing figures upright, and anyone lying down lies flat exactly as the action says") : NATURAL_PERSPECTIVE; }

const HANDS_ONLY_CONSTRUCTION = "HANDS-ONLY CONSTRUCTION: only hands and short forearms are in this frame, entering from the nearest frame edge — the bottom edge, or the bottom corners when two people share the frame — as short lines; never long arm lines stretched across the frame. Each forearm is one thin black ink line — never a white tube, a thick arm or a sleeve — ending in a small white mitten hand with one thumb bump, exactly the line thickness and hand shape of the reference images. No head, face, hair, torso or legs appear anywhere in the frame.";

// v19 (Thomas, Oct 5: "eyes, eyebrows, mouth movement, head position, hand gestures, posture, eye direction. The characters
// should not just 'stand in the scene.' They should clearly react."): every face shows one emotion through all seven features.
const PERFORMANCE_AND_EXPRESSION = "EXPRESSION: one clear emotion with every feature working together — the eyes, the tilt of the eyebrows, a big clear mouth shape, the head position, a hand gesture, the posture and the pupils pressed toward what the character looks at. Every character is caught mid-action, never just standing in the scene; pushed big like a top animated explainer, in the reference construction: no teeth, snarl or distorted eyes; thinking is a head tilt, never a hand on the chin.";
// v19 (verification W2/W3): the features a shot can show — small faces in wide frames keep one bold shape and the body
// carries the feeling; eyes-only crops carry the feeling in the eyes alone (no mouth, hands or body to ask for).
const EXPRESSION_SMALL = "EXPRESSION: in this wider frame the whole body acts the feeling — the head position, a clear hand gesture, the posture of the whole stick body and the distance between people — and every face, even a small one, still reads at once: big white eyes with the pupils turned to what they look at, eyebrows steeply angled for the feeling, and a big clear mouth shape (a wide open oval, a deep downturned curve, a big smile curve or a wavy worried line), never a blank or mild face. Every character is caught mid-action — doing something, then reacting — never just standing in the scene. Pushed stronger than life, in the reference construction: no teeth, snarl or distorted eyes.";
const EXPRESSION_EYES = "EXPRESSION: only the eyes and the eyebrows are in this frame, so they carry the whole feeling — one clear emotion pushed stronger than life: how wide or narrow the eyes are, the tilt of the eyebrows, and the pupils pressed toward what the character looks at. No distortion, no eyelashes.";
// Version 9 (Muhammad, Oct 2026: "less emotion expressed and character interaction"): how far each tier pushes the face
const EXPRESSION_STRENGTH = {
  // v19: the push is emotion-neutral, so a quiet, tender beat is pushed into its own feeling (never into steep angry brows)
  HOOK: "EXPRESSION STRENGTH — FULL: the feeling at its peak, readable from across the room — the eyebrows, the pupils, the mouth, the head and the whole body pushed clearly and boldly into this one feeling, as the performance describes it.",
  EMOTIONAL: "EXPRESSION STRENGTH — FULL: the feeling at its peak, readable from across the room — the eyebrows, the pupils, the mouth, the head and the whole body pushed clearly and boldly into this one feeling, as the performance describes it.",
  SIMPLE: "EXPRESSION STRENGTH — CLEAR: the feeling reads instantly — eyebrows steeply angled, a big clear mouth shape, the head and the body turned with the action; never a blank or mild face.",
  QUIET: "EXPRESSION STRENGTH — HELD: one clear, quiet feeling held still — calm in the body but unmistakable in the face: the eyebrows, the eyes and the mouth clearly shaped for the feeling, readable at a glance, never blank or neutral.",
  EYES: "EXPRESSION STRENGTH — FULL: the eyebrows and the pupils pushed clearly and boldly into this one feeling, as the performance describes it.",
};

// v19 (Thomas: "more real interaction between characters"; emotion through "eye contact, hesitation, body language, distance
// between people, hands, reactions, silence"): an action and a visible reaction, the eye line clear, the distance as planned.
const INTERACTION = "INTERACTION: one character acts and the other visibly reacts in this same frame, each with a clear face, hands and posture. The eye line is unmistakable — a straight line of sight between two faces, or the head and pupils clearly turned away. They are staged in depth, one nearer the camera, overlapping or turned toward each other — never standing side by side in a row facing the camera; where the moment allows, their hands do something together: a touch, a hand-over, a pull or a block.";
// dist: the planned distance between the characters (apart for conflict, close for repair, touch where it pays off)
const DISTANCE = {
  touching: "they touch — a hand on an arm or a shoulder, or sitting pressed side by side; the touch is part of the moment",
  close: "close together, within easy reach of each other",
  apart: "apart, with a clear empty gap of open space between them, more than an arm's length",
  far: "far apart on opposite sides of the frame, the wide empty space between them part of the story",
};

const RECOGNITION = "RECOGNITION: each character is identifiable at a glance even when small, in profile or from behind — MOM by her black bun and her greater height, SON by his black spiky messy hair and shorter build, anyone else by their own described hair and accessories; no two characters share a hair shape.";

const RECURRING_CONSISTENCY = "RECURRING CONSISTENCY: characters keep the references' hair, head size, height, build and line thickness; every named object keeps the same shape and part count, colour and size across frames; the camera changes only pose, crop and angle.";

// v19 visual order with the white default: people first, then the one colour element, then the outline place.
const COLOUR_HIERARCHY = "VISUAL ORDER: first the characters and their faces, then the story object in its bright colour, last the place — the white characters with bold black outlines are the strongest contrast, the black-line set pieces stay thin and quiet on the white ground, and nothing white-filled overlaps a character's outline.";

// v19 (Thomas: "one strong object, one strong face, one strong gesture"; "one door outline, one bed outline, one chair, one
// object is enough"): less, but stronger.
const DETAIL_CAP = "LESS, BUT STRONGER: one strong object, one strong face, one strong gesture — only the characters, objects and set pieces named here, each finished and closed, and each there because the moment needs it; the rest of the space stays plain white and open, with no wall art, plants, table lamps, cupboards, appliances, extra furniture, people or clutter.";

const CONSTRUCTION_RESTATED = "CHARACTER LOCKS: exactly as the attached references — head size as in the references, big white round eyes with large black pupils, short thick eyebrows, a drawn mouth, thin black line bodies and limbs with no fill, white mitten hands, small white oval feet, no clothing beyond each character's named accessory; SON clearly shorter than MOM; nothing casts a shadow.";

const FLAT_STYLE = "FLAT 2D STYLE: matte flat fills; characters and story objects in bold black outlines; set pieces in thin black ink lines with white fill (solid shapes at night and on a peak), never faint; no gradients, shading, cast shadows, soft glow, bloom, 3D or blur; light is a flat pale shape with a clean edge; anything that shines or glows is drawn — a halo of clean-edged rings or short radiating strokes in flat colour; everything rests on its ground line.";

// v19: kept short (R3 §8 — conflicting or stacked instructions are the real risk, not length).
const GLOBAL_AVOID = "AVOID: a head smaller or larger than in the references, or a bald, featureless round head; a white-filled torso, thick tube arms or width on any limb; a hand ending in a bare line, or a cuff around a mitten; eyes without a white circle; a face with no mouth; hair changing shape from the references; any garment; teeth, snarls or distorted faces; blank, mild or neutral faces and stiff bodies just standing in the scene; a look into the camera; characters lined up side by side facing the camera; coloured walls, floors, grass or furniture, a whole room in one colour tone, or strong colour anywhere except on what the colour line names; faint or broken ghost outlines, or furniture floating off the ground; generic symbols — hearts, stars, trophies, emoji-style icons, or picture bubbles standing in for a feeling; busy rooms, clutter, texture or background people; strong red on anything that is not danger, stress, frustration or conflict; shadows, gradients, soft glow, bloom or blur; printed words, letters, captions or signs; realistic or 3D rendering.";

const TIER = {
  SIMPLE: "SCENE TIER — SIMPLE: a clean connective moment, quick to read — one clear action, simple staging, the feeling still readable at a glance.",
  EMOTIONAL: "SCENE TIER — EMOTIONAL: a turning point of the story — everything visible of the characters carries the full weight of this moment.",
  QUIET: "SCENE TIER — QUIET: a held, still moment that matters — the characters barely move, and one clear, quiet feeling shows in their faces and posture.",
  HOOK: "SCENE TIER — HOOK: a peak of the video — bold staging, a clear change of camera distance or scale, and the strongest contrast of its section, still built around one clear idea.",
};

// Shot types (v19 adds FACE_HANDS, REACTION and WORD).
const SHOT = {
  XCLOSE: "extreme close-up",
  CLOSE: "close-up",
  MEDIUM: "medium shot",
  MEDWIDE: "medium-wide shot, whole figures large in the frame so every face reads",
  WIDE: "wide shot, the characters still large enough that every face and its feeling read clearly",
  FACE_HANDS: "face-and-hands close-up: the face and both mitten hands fill the frame together, the hands raised into the frame near the face so the gesture and the expression read as one",
  REACTION: "reaction close-up: one face, with the top of the shoulders, filling most of the frame, caught in the instant it reacts to what just happened",
  HANDS: "hands-only close shot, cropped at the forearms, no head or face anywhere in the frame, the hands and what they hold filling most of the frame",
  OBJECT: "object close-up with no character in the frame",
  WORD: "plain white word frame: empty pure white space that holds one on-screen word, added later in the edit",
};

const ANGLE = {
  EYE: "level eye-line camera",
  LOW: "slightly low camera, a gentle upward view with straight vertical lines",
  HIGH: "slightly high camera, a gentle downward view with every standing character upright",
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
  EYES: "EYES-ONLY CROP: only the band from the top of the eyebrows to just below the eyes fills the frame width; the round head outline runs off the top, left and right edges; no mouth, neck, arms or body in frame — the eyes and eyebrows keep their reference shapes, only the camera is closer.",
  HUGE: "FACE SIZE — HUGE: the camera moves in so close that the head alone fills most of the frame and the body is cropped out below it — the head keeps its normal proportions, only the camera is closer; eyes, eyebrows and mouth are drawn big and decisive so the feeling reads instantly — bigger features, never a distorted face.",
};

const SCALE = {
  ORDINARY: "",
  DOMINANT: "SCALE — DOMINANT: {HERO} is drawn oversized on purpose for this moment — two to three times its usual size and the heaviest, most eye-catching shape in the frame, at the size the action gives (this overrides the usual size in the objects list) — with every one of its counted details still drawn.",
  OVERWHELMING: "SCALE — OVERWHELMING: {HERO} towers over the figures and fills most of the frame — this overrides the usual size in the objects list — keeping its exact shape, colour and counted details.",
};

// v24 on-screen words (Thomas, 8–9 Oct 2026: "short, meaningful words that feel playful, emotional and natural inside the
// scene… more hand-drawn, more alive"; "remove the numbers, remove the underline, avoid this cold formal font style"):
// one hand-lettered style, lettered into the image in open space (a no-text prompt is made too) or set in Premiere alike.
const HAND_LETTER = "bold hand-lettered capital letters, like a word written with a thick marker in the same black ink feel as the stick figures — lively and a little uneven in a hand-made way, yet clean and instantly readable, even on a phone; flat solid colour with no outline, no shadow, no 3D, no underline and no box or badge — never a geometric presentation font, never bubbly cartoon lettering";
const TYPOGRAPHY = "bold hand-lettered capital letters in flat black ink";
const WORD_COLOUR = {
  BLACK: ["charcoal black", "#1A1A1A"], WHITE: ["plain white", "#FFFFFF"], GREY: ["dark grey", "#5F6670"],
  YELLOW: ["deep golden yellow", "#E8A400"], ORANGE: ["bright orange", "#F26A1B"], RED: ["bright red", "#E0201B"], BRIGHTRED: ["bright pure red", "#F21D1D"], GREEN: ["strong green", "#1FA34A"],
  BLUE: ["strong blue", "#1F6FE0"], VIOLET: ["strong purple", "#7A2BE2"], AMBER: ["bright orange", "#F28C1A"], GOLD: ["deep golden yellow", "#E8A400"],
};
// v24 colour logic — one colour, one meaning, for the whole video (Thomas, Video 08: "think psychologically when using
// colours. Colours should create life, action, emotion and light"). Defaults, judged by context.
const COLOUR_LOGIC = {
  YELLOW: "surprise, energy, attention, discovery", RED: "conflict, frustration, stress, danger", GREEN: "positive development, growth", BLUE: "trust, safety, calm",
  VIOLET: "smartphones and digital distraction", AMBER: "warmth, positive highlights", ORANGE: "fire, heat, intensity", GOLD: "status, spectacle", GREY: "absence — colour drained on purpose",
};
const DANGER_RED = "#D32F2F";
const KEY_GREEN = "#00B140";
const KEY_MAGENTA = "#FF00FF";

// ── BACKGROUND AND MOODS (v19) ─────────────────────────────────────────
// CLEAN_GROUND: the default ground — one constant so a test strip can swap it (assemble.cjs: CLEAN_GROUND=#FFFFFF node assemble.cjs …).
const CLEAN_GROUND = "#FFFFFF"; // v24: Thomas — "The clean white background is very good and should stay"
const CLEAN_GROUND_OPTIONS = { "#FFFFFF": "pure white", "#F7F6F3": "very light warm neutral", "#F4F2EE": "very light stone", "#F2F4F5": "very light cool grey" };
const OUTLINE_GREY = "#2B2B2B"; // v24: the thin black ink line of every set piece and ground line on CLEAN (Thomas: "black outlines on a white background"; v19's soft grey rendered as ghost lines)
// MOOD: five moods. kind: clean | white | peak | night | memory. ground = the background; line = the set pieces' outline colour;
// fill = the set pieces' fill. (wall/floor/furn/sky/field are kept as aliases of ground/fill for older scripts.)
const _pal = (ground, line, fill) => ({ ground, line, fill, wall: ground, floor: ground, sky: ground, field: ground, furn: fill });
const MOOD = {
  CLEAN:  { label: "CLEAN", kind: "clean", feel: "the default — a pure white stage, the place told by the fewest thin black line pieces, bright colour only on the focus", ..._pal([CLEAN_GROUND_OPTIONS[CLEAN_GROUND] || "white", CLEAN_GROUND], ["black ink", OUTLINE_GREY], ["white", "#FFFFFF"]) },
  WHITE:  { label: "WHITE", kind: "white", feel: "pure white — face-only, object-only and word frames, and deliberate white breaks", ..._pal(["pure white", "#FFFFFF"], ["black ink", OUTLINE_GREY], ["white", "#FFFFFF"]) },
  PEAK:   { label: "PEAK", kind: "peak", feel: "an emotional peak — one full-colour field, the chapter's emotional colour (needs pk: true)", ..._pal(["storm violet", "#9C86C0"], ["deep storm violet", "#7E68A6"], ["storm violet", "#9C86C0"]) },
  NIGHT:  { label: "NIGHT", kind: "night", feel: "night — one flat navy field, the set pieces solid slate-navy shapes", ..._pal(["night navy", "#35445E"], ["dark navy", "#1C2433"], ["lighter slate navy", "#55647F"]) },
  MEMORY: { label: "MEMORY", kind: "memory", feel: "the past — a very light warm paper background, the colours faded", ..._pal(["very light warm paper", "#F4F1EB"], ["warm grey", "#7D776E"], ["white", "#FFFFFF"]) },
};
// Older mood names still compile: the calm moods become CLEAN, DARK → NIGHT, ICY → MEMORY, TENSE and SUNNY → PEAK variants.
const MOOD_ALIAS = { BRIGHT: "CLEAN", WARM: "CLEAN", EVENING: "CLEAN", COOL: "CLEAN", DUSK: "CLEAN", NEUTRAL: "CLEAN", ACCENT: "CLEAN", DARK: "NIGHT", ICY: "MEMORY", TENSE: "PEAK", SUNNY: "PEAK" };
const PEAK_VARIANT = {
  TENSE: { field: ["storm violet", "#9C86C0"], floor: ["deep storm violet", "#7E68A6"] },
  SUNNY: { field: ["lemon yellow", "#F5E77E"], floor: ["golden ochre", "#E0BA4B"] },
};
function moodOf(m) { return MOOD[m] ? m : (MOOD_ALIAS[m] || m); }

// ── DICTIONARIES — rebuilt for every video (assemble.cjs fills them from dicts.cjs) ──

// ROLE: one entry per character. age: "adult" | "teen" | "child". ref: true only if a reference image exists.
// hair: the hair outline word (bun, spiky, ponytail, bob, curls, side parting…) — every character has hair, never bald.
// wear: the small accessories this character ALWAYS wears — each also described in text with its hex. [] for none.
// sameAs: the same person at another age (shares the hair of that role on purpose).
const ROLE = {
  "Mom": { age: "adult", ref: true, hair: "bun", wear: [], text: "MOM (adult — the attached MOM reference images): the taller figure. Solid black hair parted softly at the centre so it meets the forehead in a small point, framing the round face down past the ears, with one thin strand hanging below each ear toward the jaw, and one round bun on top of the head marked with two or three thin curved lines. Small half-round ears show at eye level. No accessories. A full-grown adult woman with long arms and legs — her head the same size and shape as in her reference, never child-sized or child-proportioned." },
  "Son": { age: "teen", ref: true, hair: "spiky", wear: [], text: "SON (teenager — the attached SON reference images): clearly shorter than MOM, lean, with his larger-looking head exactly as in the reference. Solid black messy spiky hair in jagged pointed clumps: a fringe of pointed tips falling over the forehead to just above the eyebrows, spiky tips sticking out at the sides above the ears. The face is round, a touch taller than wide; small half-round ears. No accessories." },
};

// SET: optional place families (label only in v19 — places are outline cues, never tinted rooms).
const SET = {};

// CHAPTER: keyed by the first two characters of a frame's sequence. emo = the chapter's emotional colour for PEAK frames
// (field = the colour field, floor = the deeper tone used for the outlines on it). Other keys are ignored in v19.
const CHAPTER = {};

// ── COLOUR helpers (sRGB ↔ Lab) — used by the colour QA; no need to edit ──
function _lin(v) { return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }
function _srgb(v) { return v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055; }
function _f(t) { return t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116; }
function _fi(t) { const t3 = t * t * t; return t3 > 0.008856 ? t3 : (t - 16 / 116) / 7.787; }
function hexToLab(h) {
  const [r, g, b] = [1, 3, 5].map(i => _lin(parseInt(h.slice(i, i + 2), 16) / 255));
  const X = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047, Y = r * 0.2126 + g * 0.7152 + b * 0.0722, Z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  const fx = _f(X), fy = _f(Y), fz = _f(Z);
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}
function labToHex([L, a, b]) {
  const fy = (L + 16) / 116, fx = fy + a / 500, fz = fy - b / 200;
  const X = 0.95047 * _fi(fx), Y = _fi(fy), Z = 1.08883 * _fi(fz);
  const rl = X * 3.2406 - Y * 1.5372 - Z * 0.4986, gl = -X * 0.9689 + Y * 1.8758 + Z * 0.0415, bl = X * 0.0557 - Y * 0.2040 + Z * 1.0570;
  return "#" + [rl, gl, bl].map(v => Math.round(Math.max(0, Math.min(1, _srgb(Math.max(0, v)))) * 255).toString(16).padStart(2, "0")).join("").toUpperCase();
}
// framePalette(b): the colours this frame is painted in — { ground, line, fill } as [name, hex] (+ the older aliases).
// CLEAN and WHITE never take a place tint; PEAK takes the chapter's emotional colour (or the TENSE/SUNNY variant, or the default).
function framePalette(b) {
  const key = moodOf(b.mood), M = MOOD[key];
  if (!M) throw new Error(`Unknown MOOD "${b.mood}" in ${b.ref}`);
  if (key === "PEAK") {
    const C = CHAPTER[String(b.sequence || "").slice(0, 2)], v = (C && C.emo) || PEAK_VARIANT[b.moodWas] || PEAK_VARIANT[b.mood];
    if (v) { const field = v.field || v.wall, line = v.floor || v.furn || M.line; return _pal(field, line, field); }
  }
  return _pal(M.ground, M.line, M.fill);
}

// WORLD: places described by their outline pieces, never by colour. kind: INDOOR | OUTDOOR | FIELD.
// v19 format: { kind, label, parts: [[name, regex, "outline piece text"]] } — a piece is drawn only in the frames whose own
// action or placement names it (no automatic anchor furniture). A world with no parts is an idea place: its `text` is its picture.
// Older worlds ({WALL} {FLOOR} {FURN} placeholders, head/tail, anchor flags) still compile: their colour words are dropped.
const WORLD = {
  "FIELD": { kind: "FIELD", text: "an open plain space with nothing in it." },
};

// PROP: name, hex, colour, text (a countable build spec). part = the coloured part ("THE JAR's tangerine-orange (#F57C00) lid").
// lineText = how it looks when it is not the frame's colour element (default: its text without colour words, in black line on white).
// mature: false marks a symbol prop (hearts, stars, trophies, smile masks, picture bubbles…) — the v19 checks fail any frame using one.
const PROP = {};

// TONE (v22): bright hex in a prop text → { calm: [name, hex], bright: [name, hex] }; filled by assemble.cjs from dicts.TONE.
const TONE = {

};
// OVERLAY: pop-in elements made once on a chroma-key background. mature: false marks an emoji-style icon (checks fail it).
const OVERLAY = {};

// ── SCRIPT — the exact voice-over lines, one per frame ──
const SCRIPT = [];

// ── STORY PLAN ──
const STORY = { idea: "<the one idea of the video>", arc: "<the emotional arc>", ending: "<how it lands>" };
const PLAN = [];
const MOTIFS = [];


// ── SKETCH — one short line per script line ──
const SKETCH = [];

// ── BEATS — one per script line, in order ──
const RAW_BEATS = [];

// Insert frames: extra shots cut into a frame on its strongest word; same fields as RAW_BEATS, n = the parent frame's line.
const INSERT_BEATS = [];
// Sequences: an important moment told as a short run of stills in one scene. Each image is the base frame of a line (type base),
// that frame's in-scene edit from EDIT_CUES (type edit), or an extra edit image (type step, change written here).
// from = the image it is made from — never more than two edits away from a generated base image.
const SEQUENCES = [];
// In-scene changes (Muhammad's rule): a dynamic change inside a scene is an image EDIT of this frame's generated image, never a new prompt.
// The editor attaches the frame's image and pastes the edit prompt; show the original, then cut to the edited image on the cue word.
const EDIT_KEEP = "KEEP EXACTLY THE SAME: every character's design — the same round white head size, black hair shape, big white eye circles with black pupils, short thick eyebrows, thin black line body with no fill, small white mitten hands and small white oval feet; everyone and everything not named in the change in exactly the same position and pose; the same background, set pieces, props, colours and flat fills; the same camera position, framing, crop and zoom; the same black ink line thickness and flat 2D style.";
const EDIT_DONT = "DO NOT: move, zoom or re-crop the camera; redraw or restyle any face or character not named in the change; add any object, text, letters, shadow, gradient or glow that the change does not name; change any colour.";
// Each: { ref: "S12", on: "cue word", change: "who changes, from what to what — pose, limbs, head, eyebrows, pupils, mouth, object positions; what stays" }
const EDIT_CUES = [];
const EDIT_WHO = { Mom: "MOM is the woman with black hair in a round bun on top", Son: "SON is the teenage boy with messy spiky black hair" };
function editWho(e) {
  const a = RAW_BEATS.find(x => x.ref === e.ref);
  const people = a.roles === "No characters" ? [] : a.roles.split(",").map(r => r.trim()).filter(r => EDIT_WHO[r]).map(r => EDIT_WHO[r]);
  const things = Object.values(PROP).filter(p => p.name && e.change.includes(p.name)).map(p => { const key = Object.keys(PROP).find(k => PROP[k] === p), T = TONE[String(p.hex).toUpperCase()], col = T ? (isAccentKey(a, key) ? T.bright[0] : T.calm[0]) : p.colour; return p.editLook ? `${p.name} is ${p.editLook}` : p.rest && p.part ? `${p.name} ${/[^S']S$/.test(p.name) ? "are the objects with their" : "is the object with its"} ${p.part.replace(p.name + "'s ", "").replace(p.name + "' ", "").replace(/\s*\(#[0-9A-Fa-f]{6}\)/g, "")} — ${p.rest}` : `${p.name} ${/[^S']S$/.test(p.name) ? "are" : "is"} the ${col ? col + " " : ""}${p.name.replace(/^(THE|HIS OWN|MOM'S|DAD'S|SON'S|THE CLASSMATE'S|THE COUSIN'S) /, "").toLowerCase()}`; });
  const list = [...people, ...things];
  return list.length ? `WHO AND WHAT IS WHO IN THIS IMAGE: ${list.join("; ")}.` : "";
}
function editPrompt(e) { const f = (typeof RAW_BEATS !== "undefined" ? RAW_BEATS : []).find(x => x.ref === e.ref); const word = !(f && f.onScreen) ? "" : f.onScreen.font ? `KEEP THE WORD: the on-screen word "${f.onScreen.w}" stays exactly as it is — the same letters, spelling, colour, size and place.` : (() => { const n = wordLines(String(f.onScreen.w)).length; return `KEEP THE TEXT: if the image shows the on-screen text "${f.onScreen.w}"${n > 1 ? ` (on ${n} lines)` : ""}, it stays exactly as it is — the same letters, line breaks, spelling, colours, size and place, with nothing moving in front of it; if the image has no text, add none.`; })(); return [`EDIT THIS IMAGE — make exactly one change and keep everything else identical.`, editWho(e), `CHANGE: ${e.change}`, EDIT_KEEP, word, EDIT_DONT].filter(Boolean).join("\n\n"); }

// Revision rounds: one batch per round of feedback; entries list the refs to regenerate.
const REVISIONS = [];

// ── COMPILER ───────────────────────────────────────────────────────────

function clean(parts) { return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim(); }

function roleList(b) { return b.roles === "No characters" ? [] : String(b.roles || "").split(",").map(x => x.trim()).filter(Boolean); }

function mustRole(name, b) { if (!ROLE[name]) throw new Error(`Unknown ROLE "${name}" in ${b.ref}`); return ROLE[name]; }

const CLOSE_FACE = ["CLOSE", "XCLOSE", "FACE_HANDS", "REACTION"]; // close shots that show a face
const CLOSE_ANY = [...CLOSE_FACE, "HANDS", "OBJECT"];
const WIDER = ["WIDE", "MEDWIDE", "MEDIUM"];
const poss = n => /S$/.test(n) ? n + "'" : n + "'s";

function castLock(b) {
  const names = roleList(b);
  if (!names.length) return "CHARACTER COUNT: exactly 0. No person, head, face, hand or silhouette anywhere in this frame.";
  const upper = names.map(n => n.toUpperCase()).join(", ");
  if (b.shotSize === "HANDS") return `CHARACTER COUNT: exactly ${names.length} (${upper}), seen only as hands and forearms entering the frame; no head or face anywhere in the frame.`;
  const figs = (b.props || []).map(e => String(e).replace(/^\d+x\s+/i, "").trim()).filter(k => PROP[k] && PROP[k].drawnFigure).map(k => PROP[k].drawnFigure);
  return `CHARACTER COUNT: exactly ${names.length}: ${upper}. No other person, head or silhouette anywhere in the frame${figs.length ? `, apart from ${figs.join(" and ")}` : ""}.`;
}

function heightBlock(b) {
  if (b.shotSize === "HANDS") return "";
  const names = roleList(b);
  const by = age => names.filter(n => mustRole(n, b).age === age).map(n => n.toUpperCase());
  const adults = by("adult"), teens = by("teen"), kids = by("child");
  const out = [];
  if (adults.length && teens.length) { const her = adults.length === 1 ? (/\b(woman|her|she)\b/i.test((ROLE[Object.keys(ROLE).find(r => r.toUpperCase() === adults[0])] || {}).text || "") ? "hers" : "his") : "the adults'"; out.push(`HEIGHTS: ${teens.join(" and ")} stand${teens.length > 1 ? "" : "s"} clearly shorter than ${adults.join(" and ")}, as in the MOM-and-SON height sheet — standing together, the teenager's chin is at about the adult's shoulder and his face sits clearly lower than ${her}; seated or cropped, the teenager still reads as the younger, leaner one.`); }
  const kidRole = k => ROLE[Object.keys(ROLE).find(r => r.toUpperCase() === k)] || {};
  names.forEach(n => { const R = mustRole(n, b); if (R.heightText) out.push(`${n.toUpperCase()}: ${R.heightText}`.replace(/[.\s]*$/, ".")); }); // v19: a role can state its own size (a toddler, a very tall uncle)
  const kidsDefault = kids.filter(k => !kidRole(k).heightText);
  if (kidsDefault.length) out.push(`${kidsDefault.join(" and ")} ${kidsDefault.length > 1 ? "are young children whose heads reach" : "is a young child whose head reaches"} only about halfway up an adult's standing height, with ${kidsDefault.every(k => (ROLE[k.charAt(0) + k.slice(1).toLowerCase()] || ROLE[Object.keys(ROLE).find(r => r.toUpperCase() === k)] || {}).from === "Son") ? "the head a little bigger for the body than SON's — about one-third of the height — with a young child's short body" : "the head about one-fifth of their height"}, short arms and legs — never an oversized bobble head.`);
  return out.join(" ");
}

// The reference block names only who is in the frame — MOM and SON as their references, everyone else as a copy of one of them
// with a short list of changes — and tells the model when MOM or SON are absent, so they aren't drawn in.
function refLock(b) {
  const names = roleList(b);
  if (b.shotSize === "HANDS") return `HANDS FROM THE ATTACHED REFERENCE IMAGES: ${names.map(n => n.toUpperCase()).join(" and ")} appear${names.length > 1 ? "" : "s"} only as mitten hands on short forearm lines, drawn exactly as in the attached MOM and SON references — the same small white mitten with one thumb bump and no cuff, the same thin black ink forearm line and line thickness.`;
  const who = names.map(n => { const R = mustRole(n, b), N = n.toUpperCase();
    return R.ref ? `${N} is exactly the attached ${N} reference images — ${R.age === "adult" ? "with the adult proportions" : "with the teenage proportions"}` : `${N} has no reference image, so ${N} is drawn by copying the attached ${String(R.from || "Mom").toUpperCase()} reference exactly and changing only ${R.short || "the hair and size described below"} (described below)`; });
  const absent = ["Mom", "Son"].filter(r => !names.includes(r)).map(r => r.toUpperCase());
  const absentLine = absent.length ? ` ${absent.join(" and ")} ${absent.length > 1 ? "do" : "does"} not appear in this frame — use ${absent.length > 1 ? "their images" : "that image"} only as the drawing style.` : "";
  return `CHARACTERS FROM THE ATTACHED REFERENCE IMAGES (the MOM and SON images are the master for every character): ${who.join("; ")} — everyone with ${REF_SPEC}.${absentLine} No eyelashes, no clothing beyond the small items named, no filled body. Only the pose, expression, camera and setting change here; nobody is redesigned.`;
}
function roleText(b) { return roleList(b).map(n => mustRole(n, b).text).join(" "); }

function propItems(b) {
  return (b.props || []).map(e => {
    const m = String(e).trim().match(/^(\d+)x\s+(.+)$/i);
    const key = (m ? m[2] : String(e)).trim(), qty = m ? Number(m[1]) : 1;
    if (!PROP[key]) throw new Error(`Unknown PROP key "${key}" in ${b.ref}`);
    return { key, qty };
  });
}

// colourEl(b) — v19: the frame's ONE colour element, from the plan field ce ("PHONE", "PHONE case", "none").
// Default: the hero object (its coloured part); for a face or figure hero, the first object not marked plain; else none.
// v22 two tones (Thomas: colour used intentionally — important objects, actions or surprises deliberately brighter):
// heroKey(b) is the frame's hero object; toneText swaps each TONE colour in a text to its calm tone, or to its bright tone
// when the text belongs to the accent object of an accent frame (b.accent).
function heroKey(b) {
  const ce = String((b.plan && b.plan.ce) || "").trim();
  if (/^none$/i.test(ce)) return null;
  if (ce) { const m = ce.match(/^([A-Z0-9_]+)/); return m && PROP[m[1]] ? m[1] : null; }
  if (PROP[b.hero]) return b.hero;
  return (b.props || []).map(e => String(e).replace(/^\d+x\s+/i, "").trim()).find(k => PROP[k] && !(b.plain || []).includes(k)) || null;
}
// v24: the colour focus is bright by default ("stronger, brighter, and more vibrant colors on important objects");
// cm (calm: true) keeps a deliberately quiet beat in the calm tone. ce2 names a second coloured object, only when needed.
function isAccentKey(b, key) { return !!(b && key && !b.calm && heroKey(b) === key); }
function ce2Key(b) { const c = String((b.plan && b.plan.ce2) || "").trim(); const m = c.match(/^[A-Z0-9_]+/); return m && PROP[m[0]] ? m[0] : null; }
let _TONE_RE = null;
function toneText(b, key, s) {
  if (!s || typeof s !== "string" || !Object.keys(TONE).length) return s;
  const bright = isAccentKey(b, key);
  const W = `(?:${_CM.slice(3, -1)}|${_CW.slice(3, -1)}|burnt|tiger|leaf|electric|vivid|dusky|antique|crayon|carrot|water|storm|mustard)`;
  return Object.entries(TONE).reduce((t, [hex, T]) => {
    const re = new RegExp(`(?:\\b${W}[ -])*(?:${W}\\s)?\\(${hex}\\)`, "gi");
    const [nm, hx] = bright ? T.bright : T.calm;
    return t.replace(re, `${nm} (${hx})`);
  }, s);
}
function colourEl(b) {
  const ce = String((b.plan && b.plan.ce) || "").trim();
  if (/^none$/i.test(ce)) return null;
  let key = null, part = "";
  if (ce) {
    const m = ce.match(/^([A-Z0-9_]+)(?:\s*[:.,—–-]\s*|\s+)?(.*)$/);
    key = m ? m[1] : ce; part = m ? m[2].trim() : "";
    if (!PROP[key]) throw new Error(`Unknown colour element "${ce}" in ${b.ref}`);
  } else if (PROP[b.hero]) key = b.hero;
  else key = (b.props || []).map(e => String(e).replace(/^\d+x\s+/i, "").trim()).find(k => PROP[k] && !(b.plain || []).includes(k)) || null;
  if (!key) return null;
  const P = PROP[key];
  if (/^#(FFFFFF|F4F1E8)$/i.test(P.hex) && !P.part && !part) return { key, white: true, text: P.name, hex: P.hex };
  const text = toneText(b, key, part ? `${poss(P.name)} ${part} in ${P.colour ? P.colour + " " : ""}(${P.hex})` : P.part ? P.part : `${P.name} in ${P.colour ? P.colour + " " : ""}(${P.hex})`);
  return { key, text, hex: P.hex };
}
// lineText — an object that is not the frame's colour element is drawn in black line on white: its colour words come out.
const _CW = "(?:graphite|red|orange|yellow|green|blue|teal|turquoise|violet|purple|pink|raspberry|lime|amber|brown|walnut|slate|grey|gray|tan|cork|white|lemon|sunflower|emerald|cobalt|indigo|grape|mauve|navy|sky|gold|golden|ochre|aqua|mint|sage|cream|beige|black|silver|steel|stone|wood|biscuit|cardboard|tangerine|danger|holiday|berry|rose|coral|peach|apricot|olive|plum|lilac|lavender|charcoal|cyan|magenta|crimson|scarlet|maroon|khaki|honey|caramel|chocolate|copper|bronze|ivory|pearl|sea|ice|denim|butter|heather|periwinkle|oak|paper)";
const _CM = "(?:flat|bright|shiny|saturated|vivid|deep|warm|muted|pale|light|soft|dark|dim|dusty|clear|bold|glossy|matte|very|spring|electric|storm|calm|pressure|emergency|tiger|teacher's)";
const _COLOUR_PHRASE = new RegExp(`(?:\\s+in)?\\s+(?:${_CM}[ -])*${_CW}(?:-${_CW})*(?:\\s${_CW}(?:-${_CW})*)*\\s\\(#[0-9A-Fa-f]{6}\\)`, "gi");
function lineText(key, base) {
  if (PROP[key].lineText) return PROP[key].lineText;
  return String(base).replace(_COLOUR_PHRASE, "").replace(/\s{2,}/g, " ").replace(/\s+([,.;])/g, "$1").replace(/,,+/g, ",").trim() + " Here it is drawn only in black ink line with white fill.";
}

// v24: an object keeps the same locked colour whenever it carries colour (RECURRING CONSISTENCY); in a frame where it is not
// the focus (ce) or the second object (ce2) it is black line with white fill. (v20 coloured every story object — Thomas: "not
// too many strong colored elements in the same scene".)
function neutralFrame(b) { return false; }
// v24 ("not too many strong colored elements in the same scene"): only the colour focus (ce) and, when named, ce2 carry
// colour; every other story object is black line with white fill. A frame whose ce is "none" is face-led: all line.
const isPlain = (b, k) => (b.plain || []).includes(k) || (heroKey(b) !== k && ce2Key(b) !== k);
function colouredItems(b) {
  if (neutralFrame(b)) return [];
  const ce = colourEl(b), seen = [];
  propItems(b).forEach(i => { if (!seen.includes(i.key)) seen.push(i.key); });
  return seen.filter(k => !isPlain(b, k) && (!/^#(FFFFFF|F4F1E8)$/i.test(PROP[k].hex) || PROP[k].part)).map(k => {
    const P = PROP[k], hero = !!(ce && ce.key === k);
    return { key: k, hero, text: hero && !ce.white ? ce.text : toneText(b, k, P.part || `${P.name} in ${P.colour ? P.colour + " " : ""}(${P.hex})`) };
  });
}
function propLock(b) {
  const items = propItems(b);
  if (!items.length) return "OBJECTS: none beyond the set pieces named in the setting.";
  const neutral = neutralFrame(b), total = items.reduce((t, i) => t + i.qty, 0);
  const lit = k => !!PROP[k].screen || /PHONE|TABLET/.test(k); // v21/v24: at night a phone's screen is the light in the room (violet = digital), its glow drawn
  const list = items.map(i => { const base = toneText(b, i.key, (b.propText && b.propText[i.key]) || PROP[i.key].text); const lt = moodOf(b.mood) === "NIGHT" && lit(i.key) && !isPlain(b, i.key) ? " At night its screen is switched on: a bright light-purple (#C9A6FF) panel — the brightest thing in the dark room — ringed by short drawn light-purple strokes, throwing one wide, flat, clean-edged wedge of pale purple light (#B48CF0) across the face and hands nearest it." : ""; return (i.qty > 1 ? `${i.qty} of ` : "") + (neutral || isPlain(b, i.key) ? lineText(i.key, base) : base) + lt; }).join(" ");
  return `OBJECTS: exactly ${total} story object${total > 1 ? "s" : ""}, plus the set pieces named in the setting. ${list}`;
}

function heroName(b) {
  if (b.hero === "FACE" || b.hero === "FIGURE") {
    const first = b.heroWho || roleList(b)[0];
    return first ? `${first.toUpperCase()}'s ${b.hero === "FACE" ? "face" : "figure"}` : "the subject";
  }
  if (PROP[b.hero]) return PROP[b.hero].name;
  throw new Error(`Unknown hero "${b.hero}" in ${b.ref}`);
}

// ── places as outline cues (v19) ──
// outlineText: drops the colour placeholders and wall/floor/sky fills of an older world text, keeping the pieces.
function outlineText(t) {
  return String(t || "")
    .replace(/,?\s*every piece always in the same place:?/gi, ":")
    .replace(/one flat \{FIELD\} colou?r field filling the entire background from edge to edge(, with a flat \{FLOOR\} ground band along the bottom fifth under one thin ink line,)?( with no ground line)?( and)?/gi, "")
    .replace(/a flat \{SKY\} sky over (?:the top half of the frame and )?a flat \{GROUND\} ([a-z]+ )?(ground|lawn)( at one thin (ink )?line)?/gi, "one thin ground line")
    .replace(/a flat \{SKY\} sky over (the top half of the frame)?/gi, "")
    .replace(/with a flat \{WALL\} wall and a flat \{FLOOR\} floor/gi, "")
    .replace(/a flat \{WALL\} (back |sloping roof )?wall( behind( the head)?)?( meeting a flat( plain)? \{FLOOR\} (stage )?floor( at one thin line)?)?/gi, "")
    .replace(/,?\s*over a flat \{FLOOR\} floor/gi, "")
    .replace(/(,? and)? a flat( plain)? \{FLOOR\} (stage )?floor( in front)?/gi, "")
    .replace(/a flat \{(WALL|FLOOR|FIELD)\} [a-z ]+? (wall|floor|field)/gi, "")
    .replace(/framed in \{FURN\}/gi, "with a plain frame")
    .replace(/showing a flat \{SKY\} sky/gi, "showing plain sky")
    .replace(/\s*\bin \{(WALL|FLOOR|FURN|SKY|GROUND|FIELD)\}/gi, "")
    .replace(/\{(WALL|FLOOR|FURN|SKY|GROUND|FIELD)\}\s*/gi, "")
    .replace(/(Nothing else( in the (room|hall))?[:.]?\s*)?the walls? (are|is) plain and empty( and the floor is bare)?\.?/gi, "")
    .replace(/,?\s*with no ground line/gi, "")
    .replace(/:\s*[,;]\s*/g, ": ").replace(/:\s*(and|with)\s+/gi, ": ").replace(/\bwith\s*([;,.])/gi, "$1").replace(/\s*,\s*,/g, ",").replace(/;\s*;/g, ";").replace(/\s+([,.;:])/g, "$1").replace(/:\s*\./g, ".").replace(/,\s*\./g, ".").replace(/\s{2,}/g, " ").trim()
    .replace(/^[,;\s]*(and\s+)?nothing else\.?$/i, "");
}
function pieceList(b) {
  const W = WORLD[b.world]; if (!W || !W.parts) return [];
  return W.parts.filter(p => (b.pieces || []).includes(p[0]));
}
function theLabel(l) { return /^(a|an|the)\s/i.test(l) || /^[A-Z][A-Z ]*'s\b/.test(l) ? l : "the " + l; }
function placeLabel(b) { const W = WORLD[b.world]; return W ? (W.label || (W.set && SET[W.set] && SET[W.set].label) || "") : ""; }

function worldBlock(b) {
  const names = roleList(b), items = propItems(b), key = moodOf(b.mood), P = framePalette(b);
  const face = names.length && b.shotSize !== "HANDS";
  if (b.shotSize === "WORD") return `SETTING: a plain, clean, pure white (#FFFFFF) frame, flat and empty from edge to edge${items.length ? ", with only the one small object named here, small and low in the frame, resting on nothing" : ""}; it holds the space for one on-screen word that is added later in the edit.`;
  const W = WORLD[b.world];
  if (!W) throw new Error(`Unknown WORLD "${b.world}" in ${b.ref}`);
  if (key === "WHITE") return `SETTING: a plain, clean, pure white (#FFFFFF) background from edge to edge — open white space around ${face ? "the characters" : names.length ? "the hands" : "the object"}${items.length && names.length ? " and the story objects named here" : ""}, with nothing drawn behind them. ${face ? "The face and its expression carry the whole frame." : names.length ? "The hands and what they do carry the whole frame." : "The story object carries the whole frame."}`;
  let g = `${P.ground[0]} (${P.ground[1]})`; const ln = `${P.line[0]} (${P.line[1]})`;
  const wider = WIDER.includes(b.shotSize) || (b.shotSize === "OBJECT" && !pieceList(b).length);
  const parts = W.parts ? pieceList(b).map(p => outlineText(p[2])) : [];
  const idea = !W.parts && W.text ? outlineText(W.text).replace(/[;,.]?\s*nothing else\.?\s*$/i, "").replace(/[.\s]+$/, "") : "";
  const hasGround = /ground line|horizon/i.test(idea);
  const label = parts.length ? placeLabel(b) : "";
  if (b.shotSize === "XCLOSE") return `SETTING: only the plain, flat ${g} ${key === "CLEAN" ? "ground" : "field"} behind the head — the camera is so close that nothing of the place is in frame.`;
  if (key === "CLEAN" || key === "MEMORY") {
    // v24: every drawn piece is thin black line with white fill on the white ground, with one ground line on wider shots (the
    // v22 soft fills and floor planes were cut by Thomas); a close face shot may show one slice of the place behind the head;
    // absence (mute) turns the place quiet cool grey-blue — the grey atmosphere Thomas approved.
    const MUTE_FILL = "filled flat in quiet cool grey-blue (#AEB8C4)";
    const fillOf = p => b.mute ? (/^white\b/.test(p[3] || "") ? p[3] : MUTE_FILL) : "with white fill"; // v24: set pieces are black line on white — no soft fills
    if (b.mute) g = "very light cool grey (#F1F3F5)"; // v22: absence is cool — the light ground too
    const pl = W.parts ? pieceList(b) : [];
    const fl = b.mute ? ["pale cool grey", "#E4E7EA"] : null; // v24: no coloured floor or grass plane (Thomas: "the ground does not also need to be colored")
    const outdoor = W.kind === "OUTDOOR", floorWord = outdoor ? "ground" : "floor";
    const floorTxt = fl && wider && pl.length ? ` The ${outdoor ? "sky" : "wall"} is ${g}, plain and light; the ${floorWord} is one flat ${fl[0]} (${fl[1]}) plane from the ground line down to the bottom edge of the frame.` : "";
    if (b.slice && pl.length) {
      const p = pl[0];
      return `SETTING: behind ${face ? "the head" : names.length ? "the hands" : "the object"}, cut off by the frame edge, one slice of ${theLabel(label || placeLabel(b) || "the place")}: part of ${outlineText(p[2])}, ${fillOf(p)} — just enough to place the moment, drawn in thin ${P.line[0]} (${P.line[1]}) line and set a little to one side so the ${face ? "face" : "subject"} stays clear; the rest is the plain ${g} background, and nothing else is drawn.`;
    }
    if (b.shotSize === "XCLOSE") return `SETTING: only the plain, flat ${g} ground behind the head — the camera is so close that nothing of the place is in frame.`;
    const pt = pl.map(p => outlineText(p[2]) + ", " + fillOf(p));
    const pcs = pt.length ? `${label ? `${theLabel(label)}, ` : ""}told by ${pt.length > 1 ? "these pieces" : "this piece"}: ${pt.join("; ")}. ` : idea ? `${idea}. ` : "";
    const rule = pt.length ? `Every set piece is a clear, complete drawing in thin ${P.line[0]} (${P.line[1]}) line, standing firmly on the ${floorWord}, ${b.mute ? "all in the same quiet cool grey-blue — the place quiet, never empty" : "thinner than the characters' outlines, with plain white fill — never coloured, never shaded"}. ` : idea ? `Every piece is a clear, complete drawing in thin ${P.line[0]} (${P.line[1]}) line. ` : "";
    const bg = floorTxt || ` The background is ${g}, flat and even${wider && !hasGround ? `, with one thin ${P.line[0]} ground line that the figures${pt.length ? " and the furniture" : ""} stand on` : ""}.`;
    return `SETTING: ${pcs}${rule}${bg.trim()} Nothing else is drawn; the rest of the space stays plain and open.`;
  }
  const fieldWord = key === "NIGHT" ? "night" : "emotional peak";
  const head = `one flat, even ${g} colour field fills the whole background from edge to edge — the colour of this ${fieldWord}`;
  const fillTxt = key === "NIGHT" ? `a solid flat shape filled in ${P.fill[0]} (${P.fill[1]}) with a ${P.line[0]} (${P.line[1]}) outline` : `a solid flat shape filled in ${P.line[0]} (${P.line[1]}) with a thin darker outline`;
  const pcs = parts.length ? `; ${label ? `${theLabel(label)} is told` : "the place is told"} by ${parts.length > 1 ? "these pieces" : "this piece"}: ${parts.join("; ")} — ${parts.length > 1 ? "each" : ""} drawn as ${fillTxt}, complete and standing firmly on the ground, never a pale or glowing outline` : idea ? `; ${idea}, drawn as ${fillTxt}` : "";
  return `SETTING: ${head}${pcs}${wider && !hasGround ? `; one ${P.line[0]} ground line runs under the figures` : ""}; the rest of the field is plain and open.`;
}

// Version 7: a story object that hangs on the wall is the one exception to plain space
function wallObjects(b) { const w = (b.props || []).map(e => String(e).replace(/^\d+x\s+/i, "").trim()).filter(k => PROP[k] && PROP[k].onWall).map(k => PROP[k].name); return w.join(" and "); }

// bgShort(b) — the background in a few words for THE PICTURE IN SHORT ({BG} in b.check)
function bgShort(b) {
  const key = moodOf(b.mood), P = framePalette(b);
  if (b.shotSize === "WORD" || key === "WHITE") return "clean pure white space";
  const pcs = b.shotSize === "XCLOSE" ? [] : pieceList(b).map(p => p[0]);
  const pl = pcs.length ? ` with ${pcs.length > 1 ? pcs.slice(0, -1).map(x => "the " + x).join(", ") + " and the " + pcs[pcs.length - 1] : "the " + pcs[0]} as ${key === "NIGHT" ? "solid slate-navy shapes" : key === "PEAK" ? "solid darker shapes" : "clear line drawings"}` : "";
  if (key === "CLEAN") return `a ${P.ground[0]} background${pl}`;
  if (key === "PEAK") return `one flat ${P.ground[0]} field${pl}`;
  if (key === "NIGHT") return `night navy${pl}`;
  return `a faded memory on ${P.ground[0]}${pl}`;
}

// v22: the bright tone of an accent that has no object (a few marks on the action), by meaning
const ACCENT_COL = { YELLOW: ["bright yellow", "#FFD21F"], RED: ["vivid red", "#E8322B"], GREEN: ["vivid green", "#22D35E"], BLUE: ["vivid blue", "#2F7DF0"], VIOLET: ["vivid violet", "#8A2BE2"], AMBER: ["bright warm amber", "#FFA62B"], GOLD: ["bright gold", "#F2B705"], ORANGE: ["vivid orange", "#FF7A1F"] };
// v22 light as feeling (Thomas: colours create life, emotion and light): one flat, clean-edged light shape
const LIGHT = {
  warm: ["pale warm amber", "#FBE3B8", "the warmth of this moment"],
  cool: ["pale cool blue", "#D6E2F0", "the loneliness of this moment"],
  dusk: ["pale dusk rose", "#F1D6CF", "the quiet end of a day"],
};
function lightBlock(b) {
  if (!b.light || !LIGHT[b.light.kind]) return "";
  const L = LIGHT[b.light.kind], night = moodOf(b.mood) === "NIGHT";
  return `LIGHT: one flat, clean-edged shape of ${night && b.light.kind === "warm" ? "warm lamplight" : b.light.kind === "cool" ? "cool window light" : "light"} in ${L[0]} (${L[1]})${b.light.where ? ` — ${b.light.where}` : ""} — ${L[2]}; a flat shape with a sharp edge, never a glow, gradient or beam of rays.`;
}
function fgBlock(b) {
  return b.fg ? `FOREGROUND: ${b.fg} — close to the camera at one edge of the frame, cut off by the frame edge and drawn in the same flat style and line, nearer than the characters; it frames the moment and covers no face.` : "";
}
// v24 glow (Thomas: "the colours can glow much more strongly, almost like a rainbow effect when it fits"): drawn, never
// rendered — gl: "halo" | "rays" | "rainbow" on the colour focus.
const GLOW = {
  halo: "a drawn halo — two clean-edged rings in paler versions of its own colour hugging its outline, flat shapes, never a soft blur",
  rays: "a ring of short, straight radiating strokes in a paler version of its own colour, like a drawn shine — flat ink strokes, never a soft blur",
  rainbow: "a burst of short, straight radiating strokes in several bright colours — yellow, orange, pink, green, blue and purple — like a joyful drawn shine, flat strokes, never a soft blur",
};
function glowText(b, hero) {
  const g = b.glow && GLOW[b.glow]; if (!g) return "";
  const who = hero ? (PROP[hero.key] || {}).name : b.accentMark ? "the action" : ""; if (!who) return "";
  return `GLOW: around ${who}, ${g}.`;
}
// v24 zoom plan (Thomas: "reuse the same material with different zoom levels and framing"): the targets of the planned
// Premiere reframes are drawn crisp and complete, so a crop of the still holds up. Descriptive only — never an instruction.
function clarityLine(b) {
  const z = (b.zooms || []).map(x => String(x.to || "").trim()).filter(Boolean); if (!z.length || b.shotSize === "XCLOSE" || b.eyesOnly) return "";
  const u = [...new Set(z)];
  return `CLARITY: ${u.length > 1 ? u.slice(0, -1).join(", ") + " and " + u[u.length - 1] : u[0]} ${u.length > 1 ? "are drawn crisp, complete and clearly readable, each on its own." : "is drawn crisp, complete and clearly readable."}`;
}
// colourBlock(b) — v19, positive phrasing (Google's guidance, R3 §8): name the background, then the ONE coloured element;
// "everything else is drawn in black or soft-grey line with white fill" (style-and-colour-v19.md §7). A face hero with no colour element: "Nothing carries colour; the white face … carries the frame."
function colourBlock(b) {
  const key = moodOf(b.mood), P = framePalette(b), names = roleList(b), hands = b.shotSize === "HANDS";
  const ce = colourEl(b), acc = names.some(n => ROLE[n] && (ROLE[n].wear || []).length) ? ", apart from the characters' own small accessories in their muted locked colours" : "";
  const subject = hands && !PROP[b.hero] ? "the white mitten hands" : (b.hero === "FACE" || b.hero === "FIGURE") && names.length > 1 && !CLOSE_FACE.includes(b.shotSize) ? `the white figures of ${names.map(n => n.toUpperCase()).join(" and ")}` : b.hero === "FACE" || b.hero === "FIGURE" ? `the white ${b.hero === "FACE" ? "face" : "figure"} of ${(b.heroWho || names[0] || "the character").toUpperCase()}` : PROP[b.hero] ? PROP[b.hero].name : "the subject";
  const chars = !names.length ? "" : hands ? " The hands are white mittens with bold black outlines on thin black forearm lines." : b.eyesOnly ? " The eyes are white circles with black pupils inside the white head, drawn with bold black outlines — the strongest contrast in the frame." : CLOSE_FACE.includes(b.shotSize) ? " The face is white with a bold black outline — the strongest contrast in the frame." : " The characters are white — white heads, white mitten hands and white oval feet with bold black outlines and thin black line bodies — the strongest contrast in the frame.";
  // v24: the colour focus is bright (calm only with cm); ce2, when named, keeps its own clear colour, quieter; everything else,
  // set pieces included, is black line with white fill; walls, floors and grass are never coloured.
  const items = colouredItems(b), hero = items.find(i => i.hero), rest = items.filter(i => !i.hero);
  const accent = !b.calm, mark = !hero && b.accentMark ? ACCENT_COL[String(b.accentCol || "YELLOW").toUpperCase()] || ACCENT_COL.YELLOW : null; // v24: bright by default
  const plural = i => /[^S']S$/.test((PROP[i.key] || {}).name || "");
  const after = names.length && !hands ? "right after the faces" : names.length ? "right after the hands" : "first";
  const heroLine = hero ? (accent ? `THE BRIGHT COLOUR FOCUS in this frame is ${hero.text} — vivid, saturated and full of life, deliberately the brightest colour in the picture, so the eye goes to it ${after}.` : `The one colour in this frame is ${hero.text}, in ${plural(hero) ? "their" : "its"} calm, deeper tone — a deliberately quiet moment.`) : mark ? `THE BRIGHT ACCENT in this frame is ${b.accentMark}, in ${mark[0]} (${mark[1]}) — vivid and deliberate, so the eye goes to the action ${after}.` : "";
  const restLine = rest.length ? `${rest.map(i => i.text).join("; ")} — ${rest.length > 1 ? "each in its" : plural(rest[0]) ? "in their" : "in its"} own clear colour, quieter than ${hero || mark ? "the focus" : "the faces"}.` : "";
  const calmTail = items.length || mark ? "Every other object and every set piece is black line with white fill — no other strong colour anywhere in the frame." : "";
  const glowLine = glowText(b, hero);
  const none = !items.length && !mark ? (ce && ce.white ? `Nothing carries strong colour; ${ce.text}, white with one bold black outline, carries the frame.` : `Nothing carries strong colour; ${subject} with ${/^the white figures/.test(subject) ? "their bold black outlines carry" : "its bold black outline carries"} the frame.`) : "";
  const capCol = b.onScreen && !b.onScreen.font && !["BLACK", "WHITE", "GREY"].includes(String(b.onScreen.col || "BLACK").toUpperCase()) ? textInk(b, b.onScreen) : "";
  const none2 = none && capCol ? none.replace("Nothing carries strong colour;", `Nothing carries strong colour except the on-screen keyword in ${capCol};`) : none;
  const accLine = acc ? " The characters' own small accessories keep their muted locked colours." : "";
  const pcsShown = b.shotSize !== "XCLOSE" || b.slice ? pieceList(b) : [];
  if (b.shotSize === "WORD") return `COLOUR: The whole frame is pure white (#FFFFFF). ${hero ? heroLine + " Everything else is white." : "Nothing in it carries colour."}`;
  if (key === "CLEAN" || key === "WHITE" || key === "MEMORY") {
    const bg = key === "WHITE" ? "The background is pure white (#FFFFFF), clean and empty from edge to edge." : `The background is plain ${b.mute ? "very light cool grey (#F1F3F5)" : `${P.ground[0]} (${P.ground[1]})`}, flat and even from edge to edge.`;
    const setLine = key === "WHITE" || !pcsShown.length ? "" : b.mute ? "" : ` Every set piece is a thin black line drawing with plain white fill, and the ground stays plain ${P.ground[0]} — the place reads at a glance without any colour.`;
    const mem = (key === "MEMORY" ? ` This is a memory: the set pieces are faded and soft, like an old photograph, with warm grey lines.${names.length ? (hands ? " The mitten hands stay pure white with bold black outlines." : " The characters stay pure white with bold black outlines, exactly as on a white page.") : ""}` : "") + (b.mute ? ` This moment is drained of warmth on purpose — absence: the place is quiet cool grey-blue and the other objects are black line.` : "");
    return clean([`COLOUR: ${bg}`, heroLine, glowLine, restLine, none2, calmTail, setLine, mem, accLine, chars]);
  }
  const white = names.length ? (hands ? " The mitten hands stay pure white with bold black outlines." : " The characters stay pure white with bold black outlines, exactly as on a white page — never tinted by the field.") : "";
  const objs = items.length || mark ? clean([heroLine, glowLine, restLine, key === "NIGHT" && !accent ? "Story objects keep their own colours, only a shade darker for the night, and stay clearly visible against the set pieces." : "", calmTail]) : "No object carries colour; the field and the white faces carry the frame.";
  if (key === "PEAK") return clean([`COLOUR: The background is one flat, even ${P.ground[0]} (${P.ground[1]}) field filling the whole frame — the colour of this emotional peak; set pieces are solid flat shapes in ${P.line[0]} (${P.line[1]}) with a thin darker outline.${white}`, objs, accLine]);
  return clean([`COLOUR: The background is one flat ${P.ground[0]} (${P.ground[1]}) field — the night is deep navy, a flat colour rather than a photo filter or a border, never grey, never black-and-white; set pieces are solid flat shapes in ${P.fill[0]} (${P.fill[1]}) with ${P.line[0]} (${P.line[1]}) outlines, never pale or glowing outlines.${white}${names.length && !hands ? " Every character keeps solid black (#1A1A1A) hair." : ""}`, objs, accLine]);
}

// visualOrder(b): the order line matches the frame — people first; a face alone on white; or an object with no characters.
function visualOrder(b) {
  const ce = colourEl(b);
  if (b.shotSize === "WORD") return "";
  if (!roleList(b).length) return `VISUAL ORDER: the story object first, then the place. ${ce && !ce.white ? "The object carries the strongest colour and" : "The object carries"} the strongest contrast in the frame; any set pieces stay thin and quiet.`;
  if (b.shotSize === "HANDS") return `VISUAL ORDER: first the hands and what they do${ce && !ce.white ? ", then the strongest colour" : ""}, last the place. The white mitten hands with bold black outlines are the strongest contrast in the frame; any set pieces stay thin and quiet.`;
  if (moodOf(b.mood) === "WHITE" && CLOSE_FACE.includes(b.shotSize)) return `VISUAL ORDER: the face and its expression first${ce && !ce.white ? ", then the strongest colour" : ""}. The white face holds the frame with its bold black outline on the clean white background.`;
  return ce && !ce.white ? COLOUR_HIERARCHY : COLOUR_HIERARCHY.replace(", then the story object with the strongest colour", "");
}
// objectFocus(b) — after the characters the eye must find the story object: big enough to read at once, in clean space,
// never overlapped, outlined like the characters.
function objectFocus(b) {
  if (b.focus === "door" || b.metaphor === "door") return "OBJECT FOCUS: after the faces the eye goes to the door — the one set piece drawn with the same bold black outline as the characters, clearly showing how far open or shut it stands; any other object stays small and quiet.";
  const items = propItems(b); if (!items.length) return "";
  const ceK = (() => { const ce = String((b.plan && b.plan.ce) || "").trim(); const k = (ce.match(/^[A-Z0-9_]+/) || [""])[0]; return PROP[k] && items.some(i => i.key === k) ? k : null; })();
  const heroIsProp = !!(ceK || PROP[b.hero]), P = PROP[ceK || (PROP[b.hero] ? b.hero : items[0].key)];
  const white = moodOf(b.mood) === "WHITE" || b.shotSize === "WORD";
  const space = white ? "with clean white space around it" : "with plain open space around it";
  if (heroIsProp && P.mark) return `OBJECT FOCUS: ${roleList(b).length ? "after the faces the eye goes straight to" : "the eye goes straight to"} ${P.name} — bright and clear at exactly the size its description gives, ${space}, flat paint with no black outline round it; other objects smaller and quieter.`;
  if (!heroIsProp || b.shotSize === "XCLOSE") return `OBJECT FOCUS: ${roleList(b).length ? "after the faces the eye goes next to" : "the eye goes straight to"} ${P.name} — clearly visible, ${space}.`;
  if (b.focus === "light" || (P.small && !["DOMINANT", "OVERWHELMING"].includes(b.scale) && !["OBJECT", "HANDS"].includes(b.shotSize))) return `OBJECT FOCUS: ${roleList(b).length ? "after the faces the eye goes next to" : "the eye goes straight to"} ${P.name} — small on purpose at its natural size, with a bold black outline so it still reads clearly, ${space}.`;
  const size = ["DOMINANT", "OVERWHELMING"].includes(b.scale) ? "at the size the SCALE line gives" : ["HANDS", "OBJECT"].includes(b.shotSize) ? "large and central" : b.shotSize === "FACE_HANDS" ? "clear in the hands at its natural size" : "a little larger than life, so it reads at a glance";
  const oneHand = b.shotSize === "HANDS" && roleList(b).length === 1 && !/hands\b/i.test(b.map || "");
  const lead = !roleList(b).length ? `${P.name} is the first thing the eye finds` : b.shotSize === "HANDS" ? `${oneHand ? "beside the hand" : "between the hands"} the eye goes straight to ${P.name}` : `after the faces the eye goes straight to ${P.name}`;
  return `OBJECT FOCUS: ${lead} — ${size}, ${space}, fully visible, outlined in ${roleList(b).length ? "the same bold black line as the characters" : "one bold black line"}; other objects smaller and quieter.`;
}

// closeLogic(b) — v19 close-ups that make sense: the gaze (look), the open space on that side (lead room), the head shape
// whole, and the reason the close-up is here (ctx: "follows wide S12", "hands + object", "over the shoulder"…).
function _refsOut(t) { return String(t || "").replace(/\s*\b(?:frame |shot )?S\d+[a-z]?\b/g, "").replace(/\s*\+\s*/g, " and ").replace(/\(\s*\)/g, "").replace(/\s{2,}/g, " ").replace(/\s+([,.;)])/g, "$1").trim(); }
function startsWithName(t, names) { return names.some(n => new RegExp("^" + n.toUpperCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b").test(String(t).trim())); }
function closeLogic(b) {
  const names = roleList(b);
  if (!names.length || !CLOSE_FACE.includes(b.shotSize)) return "";
  const P = b.plan || {}, look = String(P.look || "").trim(), ctx = String(P.ctx || "").trim();
  if (!look && !ctx) return "";
  const who = (b.heroWho || names[0]).toUpperCase();
  const side = /\bleft\b/i.test(look) ? "left" : /\bright\b/i.test(look) ? "right" : "";
  const out = [];
  if (look && b.eyesOnly) out.push(`${who} looks ${look.replace(/^(looks?|looking)\s+/i, "").replace(/[.\s]+$/, "")}: both pupils sit clearly toward the ${side || "side they look"} of the white eyes.`);
  else if (look && names.length > 1 && b.angle !== "OTS") out.push(`${startsWithName(look, names) ? "" : who + " looks "}${look.replace(/^(looks?|looking)\s+/i, "").replace(/[.\s]+$/, "")}: each face looks where it is described, with the pupils and the turn of the head pointing that way; the open space sits between and in front of the faces.`);
  else if (look) out.push(`${startsWithName(look, names) ? "" : who + " looks "}${look.replace(/^(looks?|looking)\s+/i, "").replace(/[.\s]+$/, "")}: the pupils and the turn of the head point that way${side ? `, and the open space in the frame sits on the ${side}, in front of the eyes, with the head placed a little toward the ${side === "left" ? "right" : "left"}` : ""}.`);
  out.push(b.eyesOnly ? "The crop is clean and deliberate: both eyes and both eyebrows stay whole inside the frame." : b.shotSize === "XCLOSE" ? "The crop is clean and deliberate: the eyes, the eyebrows and the mouth stay whole inside the frame and read at once." : `The whole head shape stays inside the frame and readable — the round head outline, the hair silhouette and ${b.angle === "PROFILE" ? "the ear on the camera side" : "both ears"}.`);
  if (ctx) {
    const t = _refsOut(ctx);
    if (/^(follows|after)\b/i.test(ctx) && /\b(wide|wider|establish|S\d+)/i.test(ctx)) out.push(b.slice ? "The place and who stands where were already shown in the wider frame just before, so only a slice of the place shows, to one side — the face and what it reacts to carry the frame." : "The place and who stands where were already shown in the wider frame just before, so this close-up needs nothing of the room — only the face and what it reacts to.");
    else if (/over the shoulder|\bOTS\b/i.test(ctx)) out.push("The other person's shoulder and the back of their head sit in the near foreground, so it is clear who is listening and who is speaking.");
    else out.push(`Also in the frame, so the reaction has its cause: ${t}.`);
  }
  return "CLOSE-UP LOGIC: " + out.join(" ");
}

const CAMERA_LIB = { // natural angles only (Muhammad: close-ups wanted, no weird camera angles)
  CHILD_EYE: "The camera stands at a small child's height with a level horizon and upright verticals — never tilted; high things sit near the top edge of the frame.",
  SLIGHTLY_ABOVE: "The camera sits a little above head height, looking gently down; horizon level, verticals upright — never a view from the ceiling.",
  OTS: "Over the shoulder: the back of the near character's head and the thin black line of the neck fill the near foreground, big and close; the far character faces the near character, turned three-quarters toward the camera — never looking into the lens.",
  CLOSE_TWO: "A close two-shot: both faces at the same height, filling the frame from just below the shoulders up.",
};
function shotBlock(b) {
  const size = SHOT[b.shotSize], ang = ANGLE[b.angle];
  if (!size) throw new Error(`Unknown shotSize "${b.shotSize}" in ${b.ref}`);
  if (!ang) throw new Error(`Unknown angle "${b.angle}" in ${b.ref}`);
  const face = b.eyesOnly ? FACE.EYES : ["REACTION", "FACE_HANDS"].includes(b.shotSize) && b.face === "LARGE" ? "" : FACE[b.face || "NORMAL"]; // the shot itself sets the face size
  if (face === undefined) throw new Error(`Unknown face "${b.face}" in ${b.ref}`);
  const sc = SCALE[b.scale || "ORDINARY"];
  if (sc === undefined) throw new Error(`Unknown scale "${b.scale}" in ${b.ref}`);
  const hn = heroName(b), pl = /[^S']S$/.test(hn);
  const scale = sc ? sc.replace("{HERO}", hn).replace(" towers over", pl ? " tower over" : " towers over").replace(" is drawn oversized", pl ? " are drawn oversized" : " is drawn oversized").replace("keeping its exact", pl ? "keeping their exact" : "keeping its exact") : "";
  return clean([`CAMERA: ${size}, ${ang}. ${b.framing}`, b.cam && CAMERA_LIB[b.cam] ? CAMERA_LIB[b.cam] : "", perspective(b), face, scale]);
}

function isDarkField(b) { const m = moodOf(b.mood); return m === "NIGHT" || m === "PEAK"; }
// letters on an object (the teacher's handwritten grade) keep that object's own ink
function objectInk(b, w) { const k = String(w.col || "BLACK").toUpperCase(); const c = WORD_COLOUR[k] && k !== "GREY" ? WORD_COLOUR[k] : WORD_COLOUR.BLACK; return `${c[0]} (${c[1]})`; }
// a word of three or more parts breaks into two lines
function wordLines(txt) { const parts = String(txt).split(" "); if (parts.length >= 3) { const h = Math.ceil(parts.length / 2); return [parts.slice(0, h).join(" "), parts.slice(h).join(" ")]; } return [String(txt)]; }
function spelled(txt) { return txt.split(" ").map(x => x.split("").join("-")).join(", then a space, then "); }
function textInk(b, w) { const k = String(w.col || "BLACK").toUpperCase(); if (isDarkField(b)) return k === "BLACK" || !WORD_COLOUR[k] ? "plain white (#FFFFFF)" : `${WORD_COLOUR[k][0]} (${WORD_COLOUR[k][1]})`; const c = WORD_COLOUR[k] || WORD_COLOUR.BLACK; return `${c[0]} (${c[1]})`; }
function textLock(b) {
  if (b._cardSpace) return `TEXT: no readable words, letters, numbers, labels or signs anywhere in this frame. Keep the space where the word goes — ${b._cardSpace} — clear and empty; the word is added there later in the edit.`;
  if (b.onScreen) { const w = b.onScreen, txt = String(w.w);
    if (w.font) return `TEXT: the only readable text in this frame is "${txt}" — ${w.font}, in ${objectInk(b, w)}, set ${w.at}, in clear space on that surface with nothing else written there, spelled exactly ${spelled(txt)}. No other words, letters, numbers or labels anywhere.`;
    const L = wordLines(txt), ink = textInk(b, w), where = w.at || "in open space near the top of the frame, toward whichever top corner is empty";
    const keep = "with open space all round, touching and overlapping no character, hand, face or object, sharp and readable at a glance even on a phone screen";
    const lines = L.length > 1 ? `, on two lines: ${L[0]} on top and ${L[1]} below it` : ", on one line";
    return `TEXT: the only readable text in this frame is the short word "${txt}" — ${HAND_LETTER}, large: the capital letters about ${w.big ? "one sixth" : "one eighth"} of the frame height tall, in ${ink}${lines}. Set ${where}, ${keep}; it belongs to the drawn world and lands like an emotional beat. Spelled exactly ${spelled(txt)}. No other words, letters, numbers or labels anywhere.`; }
  if (b.requiredText) return `TEXT: the only readable text in this frame is exactly "${b.requiredText}", in ${TYPOGRAPHY}, placed on the surface described above. No other words, letters, numbers or labels.`;
  return "TEXT: no readable words, letters, numbers, labels or signs anywhere in this frame.";
}
// WORD frames: a short prompt — pure white, nothing drawn (or the one small object named).
function wordPrompt(b) {
  const items = propItems(b);
  return clean([
    `ONE single 16:9 landscape frame for a modern parenting explainer: ${items.length ? "a plain, clean, pure white (#FFFFFF) frame with one small object drawn in flat 2D style with one medium-thin black ink outline, small and low in the frame." : "a plain, clean, pure white (#FFFFFF) frame, flat and empty from edge to edge."}`,
    items.length ? propLock(b) : "",
    worldBlock(b), colourBlock(b),
    "CHARACTER COUNT: exactly 0. No person, head, face, hand or silhouette anywhere in this frame.",
    textLock(b),
    "FLAT 2D STYLE: matte flat fills, no gradients, shading, cast shadows, glow, texture, 3D or blur.",
  ]);
}

function buildPrompt(b) {
  if (b.shotSize === "WORD") return wordPrompt(b);
  const names = roleList(b), hasHumans = names.length > 0, hasFace = hasHumans && b.shotSize !== "HANDS";
  if (!TIER[b.tier]) throw new Error(`Unknown tier "${b.tier}" in ${b.ref}`);
  // Order is load-bearing (reworked after the Video 4 hook renders): the reference anchor first, then the story moment —
  // camera, close-up logic, action, expression, interaction, objects, setting — so the idea is never buried, then a short
  // construction block that agrees with the reference images, colour, the restated locks and the avoid list.
  const parts = [b.onScreen ? SINGLE_FRAME.replace(", captions, subtitles or printed words", " or subtitle bars — the only words are those named under TEXT") : SINGLE_FRAME];
  if (b.picture) parts.push(`THE PICTURE: ${b.picture}${b.touch ? " " + b.touch : ""}`);
  // v22: the place and its colours come right after the picture, so the image model weighs them (they sat 40–60% deep before)
  if (hasHumans) parts.push(refLock(b));
  parts.push(worldBlock(b), colourBlock(b), lightBlock(b), fgBlock(b));
  if (b.master) parts.push(b.master === b.ref ? `PLACE MASTER: this frame shows the ${placeLabel(b) || "place"} with its set pieces exactly as the setting describes them; the same pieces keep the same shapes in every later frame of this place.` : `PLACE REFERENCE: the attached image shows this same place — keep the shape and position of every set piece the setting names here; draw only the pieces this setting names, even if the attached image shows more.`);
  parts.push(castLock(b), TIER[b.tier], shotBlock(b), CLOSE_ANY.includes(b.shotSize) && b.picture ? "FRAME LIMIT: this is a close shot — only what the camera and placement name is in frame; any full-body or place description applies only to the part that is visible." : "", closeLogic(b), `ACTION: ${b.action}${b.touch ? " " + b.touch : ""}`);
  if (hasHumans && b.performance) parts.push(`PERFORMANCE: ${b.performance}`);
  if (hasFace) parts.push(b.eyesOnly ? EXPRESSION_STRENGTH.EYES : (EXPRESSION_STRENGTH[b.tier] || EXPRESSION_STRENGTH.SIMPLE));
  const dist = b.plan && DISTANCE[b.plan.dist] ? ` DISTANCE: ${DISTANCE[b.plan.dist]}.` : "";
  if (hasFace && names.length > 1) parts.push(b.oneSided ? `ONE-SIDED MOMENT: ${b.oneSided} The gap between them is the story.${dist}` : INTERACTION + dist);
  else if (names.length > 1 && dist) parts.push(`DISTANCE:${dist.replace(/^ DISTANCE:/, "")}`);
  if (hasFace && !b.eyesOnly && (CLOSE_FACE.includes(b.shotSize) || b.angle === "OTS")) parts.push("BODIES IN A CLOSE CROP: below each head only thin black line necks and arms show, exactly as in the references — never shoulders or bodies drawn as white filled shapes.");
  parts.push(propLock(b), objectFocus(b), clarityLine(b));
  if (hasFace) parts.push(CORE_CONSTRUCTION, HAND_LOCK, roleText(b), heightBlock(b));
  if (hasFace && (names.length > 1 || ["WIDE", "MEDWIDE"].includes(b.shotSize) || ["PROFILE", "OTS", "HIGH", "OVERHEAD"].includes(b.angle))) parts.push(RECOGNITION);
  else if (hasHumans && !hasFace) parts.push(HANDS_ONLY_CONSTRUCTION, HAND_LOCK); // hands-only: no head, hair or face text to tempt a head into frame
  { let cap = wallObjects(b) ? DETAIL_CAP.replace("no wall art,", `no wall art apart from ${wallObjects(b)} (the story object),`) : DETAIL_CAP;
    if (!propItems(b).length) cap = cap.replace("one strong object, one strong face, one strong gesture", "one strong face, one strong gesture");
    else if (!names.length) cap = cap.replace("one strong object, one strong face, one strong gesture", "one strong object");
    if (propItems(b).some(i => i.key === "PLANT")) cap = cap.replace(" plants,", "");
    if (b.fg) cap = cap.replace("only the characters, objects and set pieces named here", "only the characters, objects, set pieces and foreground named here");
    parts.push(cap); }
  if (hasFace) parts.push(b.eyesOnly ? EXPRESSION_EYES : ["WIDE", "MEDWIDE"].includes(b.shotSize) ? EXPRESSION_SMALL : PERFORMANCE_AND_EXPRESSION);
  if (hasFace) parts.push(CONSTRUCTION_RESTATED);
  parts.push(RECURRING_CONSISTENCY, FLAT_STYLE, textLock(b));
  { let av = b.eyesOnly ? GLOBAL_AVOID.replace(" a face with no mouth;", "") : GLOBAL_AVOID; if (b.mute) av = av.replace("coloured walls, a whole room in one colour tone, or bright", "coloured walls, or bright"); if (b.onScreen) av = av.replace("printed words, letters, captions or signs;", "any other printed words, letters, captions or signs, or a misspelled word;"); if (WORLD[b.world] && (WORLD[b.world].set === "KITCHEN" || /kitchen/i.test(placeLabel(b)))) av = av.replace("busy rooms,", "busy rooms, a sink, tap, cooker or cupboards,"); parts.push(av); }
  if (b.check) parts.push(`THE PICTURE IN SHORT: ${b.check.replace(/\{BG(WALL)?\}/g, bgShort(b))}`); // restates the shot at the end (descriptive, never instruction-shaped)
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

// v21: every frame carries the reason for its strongest colour (COLOUR_LOGIC), shown on the Copy page
function _ceKey(b) { const ce = String((b.plan && b.plan.ce) || "").trim(); if (/^none$/i.test(ce)) return null; const k = (ce.match(/^[A-Z0-9_]+/) || [""])[0]; return PROP[k] ? k : (PROP[b.hero] ? b.hero : null); }
function colourWhy(b) { if (b.colourReason) return b.colourReason; const k = _ceKey(b), P = k && PROP[k]; const m = P ? (P.why || (P.fam && COLOUR_LOGIC[P.fam] ? `${P.fam.toLowerCase()} = ${COLOUR_LOGIC[P.fam]}` : "")) : (b.accentMark && b.accentCol ? `${String(b.accentCol).toLowerCase()} = ${COLOUR_LOGIC[String(b.accentCol).toUpperCase()] || ""}` : ""); if (b.mute && !k) return "grey = " + COLOUR_LOGIC.GREY; if (!k && !b.accentMark) return ""; return `${b.calm ? "calm" : "bright"}${b.accent ? " — " + b.accent : ""}${m ? " (" + m + ")" : ""}${b.glow ? " · glow: " + b.glow : ""}`; }
const BEATS = RAW_BEATS.map(b => ({ ...b, mood: moodOf(b.mood), ...(MOOD_ALIAS[b.mood] && !b.moodWas ? { moodWas: b.mood } : {}), script: b.script || SCRIPT[b.n - 1] || "", colourReason: colourWhy(b) }));
const PROMPTS = BEATS.map(b => ({ ...b, prompt: buildPrompt(b), ...(b.onScreen && !b.onScreen.font ? { promptNoText: buildPrompt({ ...b, onScreen: null, keyword: null, _cardSpace: b.onScreen.at || "near the top of the frame" }) } : {}) }));

const POP_CUES = PROMPTS.filter(p => p.pop).map(p => ({ ref: p.ref, script: p.script, ...p.pop }));
// v24: the Premiere reframes of each still (zm) — reuse before regenerating
const ZOOM_CUES = PROMPTS.filter(p => p.zooms && p.zooms.length).map(p => ({ ref: p.ref, script: p.script, zooms: p.zooms }));
const INSERT_PROMPTS = INSERT_BEATS.map(b => ({ ...b, mood: moodOf(b.mood), script: SCRIPT[b.n - 1], prompt: buildPrompt({ ...b, mood: moodOf(b.mood) }) }));
// Sequence steps: the extra images of a sequence, each an image edit of an earlier image of the same scene.
const SEQ_PROMPTS = SEQUENCES.flatMap(s => s.images.filter(im => im.type === "step").map(im => { const a = RAW_BEATS.find(x => x.ref === im.ref); return { seq: s.id, title: s.title, i: im.i, of: s.images.length, ref: im.ref, on: im.on, from: im.from, change: im.change, script: a ? SCRIPT[a.n - 1] : "", prompt: editPrompt({ ref: im.ref, change: im.change }) }; }));
const EDIT_PROMPTS = EDIT_CUES.map(e => { const a = RAW_BEATS.find(x => x.ref === e.ref); return { ...e, script: a ? SCRIPT[a.n - 1] : "", prompt: editPrompt(e), ...(e.changeNoText ? { promptNoText: editPrompt({ ...e, change: e.changeNoText }) } : {}) }; });
// Camera-move cues for the edit: one per frame, applied to the still in Premiere. Never part of the prompt.
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
  HOLD: "no camera move — hold the frame still; the cut between the images is the motion",
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
  { label: "[PERFORMANCE_AND_EXPRESSION] the seven features", text: PERFORMANCE_AND_EXPRESSION },
  { label: "[EXPRESSION_STRENGTH_FULL] hook and emotional frames", text: EXPRESSION_STRENGTH.EMOTIONAL },
  { label: "[EXPRESSION_STRENGTH_HELD] quiet held frames (t: \"Q\")", text: EXPRESSION_STRENGTH.QUIET },
  { label: "[EXPRESSION_STRENGTH_CLEAR] simple frames", text: EXPRESSION_STRENGTH.SIMPLE },
  { label: "[INTERACTION] two or more visible characters (+ the frame's DISTANCE)", text: INTERACTION },
  ...Object.entries(DISTANCE).map(([k, v]) => ({ label: `[DISTANCE_${k.toUpperCase()}] dist: ${k}`, text: v })),
  { label: "[RECOGNITION] wide, profile, over-the-shoulder, high, overhead and multi-character frames", text: RECOGNITION },
  { label: "[RECURRING_CONSISTENCY]", text: RECURRING_CONSISTENCY },
  { label: "[COLOUR_HIERARCHY] visual order", text: COLOUR_HIERARCHY },
  { label: "[DETAIL_CAP] less, but stronger", text: DETAIL_CAP },
  { label: "[CONSTRUCTION_RESTATED]", text: CONSTRUCTION_RESTATED },
  { label: "[FLAT_STYLE]", text: FLAT_STYLE },
  { label: "[GLOBAL_AVOID]", text: GLOBAL_AVOID },
  ...Object.entries(TIER).map(([k, v]) => ({ label: `[TIER_${k}]`, text: v })),
  ...Object.entries(SHOT).map(([k, v]) => ({ label: `[SHOT_${k}]`, text: v })),
  ...Object.entries(ROLE).map(([k, v]) => ({ label: `[ROLE_${k.toUpperCase().replace(/\s+/g, "_")}] ${v.age}${v.ref ? " · reference image" : " · no reference image"}${v.wear && v.wear.length ? " · wears " + v.wear.map(w => `${w.item} ${w.hex}`).join(", ") : ""}`, text: v.text })),
  ...Object.entries(MOOD).map(([k, v]) => ({ label: `[MOOD_${k}] ${v.feel}`, text: `ground: ${v.ground[0]} ${v.ground[1]} · set-piece line: ${v.line[0]} ${v.line[1]} · set-piece fill: ${v.fill[0]} ${v.fill[1]}` })),
  { label: "[MOOD_ALIAS] older mood names", text: Object.entries(MOOD_ALIAS).map(([k, v]) => `${k} → ${v}`).join(" · ") },
  ...Object.entries(WORLD).map(([k, v]) => ({ label: `[WORLD_${k}] ${v.kind}${v.label ? " · " + v.label : ""}`, text: v.parts ? v.parts.map(p => `${p[0]}: ${outlineText(p[2])}`).join(" · ") : outlineText(v.text) })),
  ...Object.entries(PROP).map(([k, v]) => ({ label: `[PROP_${k}] ${v.hex}${v.danger ? " · danger" : ""}${v.mature === false ? " · SYMBOL — not for v19 frames" : ""}`, text: v.text })),
  ...Object.entries(OVERLAY).map(([k, v]) => ({ label: `[OVERLAY_${k}] ${v.hex}${v.danger ? " · danger" : ""}${v.mature === false ? " · ICON — not for v19 pops" : ""}`, text: v.text })),
];

/* ===== UI ===== */

function heroHex(p) { const c = colourEl(p); return c && !c.white ? c.hex : null; } // v19: the frame's one colour element
function planLine(p) { const x = p.plan || {}; return [x.ft && "feel: " + x.ft, x.ln && "line: " + x.ln, x.ia && "interaction: " + x.ia + (x.dist ? " (" + x.dist + ")" : ""), x.look && "look: " + x.look, x.ctx && "context: " + x.ctx, x.ce && "colour: " + x.ce, x.cx && "contrast: " + x.cx, x.ip && "interrupt: " + x.ip].filter(Boolean).join(" · "); }
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
  const M = MOOD[moodOf(p.mood)];
  const out = [
    { text: p.tier.toLowerCase(), bg: p.tier === "HOOK" ? "#b3261e" : p.tier === "EMOTIONAL" ? "#6d4c9f" : p.tier === "QUIET" ? "#3f7f86" : "#607080" },
    { text: `${p.shotSize.toLowerCase()} · ${p.angle.toLowerCase()}`, bg: "#37474f" },
    { text: `mood ${p.mood.toLowerCase()}`, bg: M ? framePalette(p).ground[1] : "#999", fg: M && ["NIGHT", "PEAK"].includes(p.mood) ? "#fff" : "#1a1a1a" },
  ];
  { const c = colourEl(p); if (c && !c.white) out.push({ text: `colour ${PROP[c.key].name.toLowerCase()}`, bg: c.hex, fg: "#1a1a1a" }); }
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
  return <PromptBox label={`${p.ref} · ${p.scene}`} meta={`"${p.script}" · ${planLine(p) || "feel: " + p.feel} · cast: ${p.roles}${p.props && p.props.length ? " · props: " + p.props.join(", ") : ""}${p.move ? " · move: " + String(p.move.type).replace("_", " ") + (p.move.on ? " on “" + p.move.on + "”" : "") : ""}${p.reveal ? " · reveal on “" + p.reveal.on + "”" : ""}`} text={p.prompt} pills={pillsFor(p)} />;
}

function ColourBar() {
  return (
    <div style={S.barWrap} title="Colour script: top row = the background of each frame (white tick = planned peak), bottom row = the one colour element (grey = nothing carries colour)">
      <div style={S.barRow}>{PROMPTS.map(p => <div key={p.ref} title={`${p.ref} · ${p.mood}${p.peak ? " · peak" : ""}`} style={{ flex: 1, background: framePalette(p).ground[1], borderTop: p.peak ? "3px solid #fff" : "3px solid transparent" }} />)}</div>
      <div style={S.barRow2}>{PROMPTS.map(p => <div key={p.ref} style={{ flex: 1, background: heroHex(p) || "#555" }} />)}</div>
    </div>
  );
}

function stats() {
  const n = PROMPTS.length || 1, pct = x => Math.round(100 * x / n) + "%";
  const close = PROMPTS.filter(p => ["CLOSE", "XCLOSE", "FACE_HANDS", "REACTION", "HANDS"].includes(p.shotSize)).length;
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
                    <td style={S.td}><span style={{ ...S.swatch, background: MOOD[moodOf(r.mood)] ? MOOD[moodOf(r.mood)].ground[1] : "#ccc" }} /> {moodOf(r.mood)}</td>
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
            <div style={S.note}>Pop-in cues for the edit. <b>ADD</b> = the element is not in the base frame; key its overlay (below) and pop it in on the word (v19: story objects only — no emoji-style icons). <b>PUNCH</b> = the element is already in the frame; give it a quick zoom, scale bump or shake on the word.</div>
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
