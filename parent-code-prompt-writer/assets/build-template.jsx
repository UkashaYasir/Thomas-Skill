import { useState, useRef } from "react";

// =====================================================================
// THE PARENT CODE — prompt build · Seven Things Your Child Can't Tell You (v19 sample, lines 1–43) (compiler v24)
// Copy this file, fill PROJECT, the dictionaries and RAW_BEATS (or let assemble.cjs fill them), and keep
// the shared constants, the compiler and the UI exactly as they are.
// v24 (Thomas's final word after Video 08, 9 Oct 2026 — references/v24-standard.md): the clean warm-white stage; places as
// thin black line pieces with white fill, the fewest the frame needs; the colour focus bright and vivid by default, colour by
// meaning; a drawn halo or rainbow burst for glow; objects two or three times larger for a moment; characters never too
// small; zoom plans that reuse a still; short, playful hand-lettered words — never numbered titles. Under it, v19: the seven
// expression features, a real interaction beat, close-ups that make sense (look + ctx).
// v25 (Muhammad, 9 Oct 2026 — v24-standard.md §2a): white by default; a line that carries the emotional intensity turns the
// stage into the emotion's colour (pc), the close-up goes white, and the film returns to white; inserts (I) inside a line.
// =====================================================================

const PROJECT = {
  title: "The Parent Code — Seven Things Your Child Can't Tell You (v19 sample, lines 1–43)",
  runtimeSec: 95, // voice-over length in seconds — 43 lines ≈ 2.2 s per line
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
const DETAIL_CAP = "LESS, BUT STRONGER: one strong object, one strong face, one strong gesture — only the characters, objects and set pieces named here, each finished and closed, and each there because the moment needs it; the rest of the space stays plain and open, with no wall art, plants, table lamps, cupboards, appliances, extra furniture, people or clutter.";

const CONSTRUCTION_RESTATED = "CHARACTER LOCKS: exactly as the attached references — head size as in the references, big white round eyes with large black pupils, short thick eyebrows, a drawn mouth, thin black line bodies and limbs with no fill, white mitten hands, small white oval feet, no clothing beyond each character's named accessory; SON clearly shorter than MOM; nothing casts a shadow.";

const FLAT_STYLE = "FLAT 2D STYLE: matte flat fills; characters and story objects in bold black outlines; set pieces in thin black ink lines with white fill (solid shapes at night and on a peak), never faint; no gradients, shading, cast shadows, soft glow, bloom, 3D or blur; light is a flat pale shape with a clean edge; anything that shines or glows is drawn — a halo of clean-edged rings or short radiating strokes in flat colour; movement and impact show as a few short drawn speed lines or ink strokes at the point of action, never as decoration; everything rests on its ground line.";

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
const CLEAN_GROUND = "#F7F6F3"; // the clean warm white Video 08 was approved on — Thomas: "The clean white background is very good and should stay"; a hair below pure white so white characters still separate (3 Oct)
const CLEAN_GROUND_OPTIONS = { "#F7F6F3": "very light warm white", "#FFFFFF": "pure white", "#F4F2EE": "very light stone", "#F2F4F5": "very light cool grey" };
const OUTLINE_GREY = "#2B2B2B"; // v24: the thin black ink line of every set piece and ground line on CLEAN (Thomas: "black outlines on a white background"; v19's soft grey rendered as ghost lines)
// MOOD: five moods. kind: clean | white | peak | night | memory. ground = the background; line = the set pieces' outline colour;
// fill = the set pieces' fill. (wall/floor/furn/sky/field are kept as aliases of ground/fill for older scripts.)
const _pal = (ground, line, fill) => ({ ground, line, fill, wall: ground, floor: ground, sky: ground, field: ground, furn: fill });
const MOOD = {
  CLEAN:  { label: "CLEAN", kind: "clean", feel: "the default — the clean warm-white stage, the place told by the fewest thin black line pieces, bright colour only on the focus", ..._pal([CLEAN_GROUND_OPTIONS[CLEAN_GROUND] || "white", CLEAN_GROUND], ["black ink", OUTLINE_GREY], ["white", "#FFFFFF"]) },
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
// v25 colour stage by emotion (Muhammad, 9 Oct: white is the default; when a line carries emotional intensity the stage
// converts to colour, then comes back to white). pc names the emotion's colour family on a PEAK frame — the same meaning
// as COLOUR_LOGIC, for the whole video. Mid-light, saturated fields: black ink and the white characters both read on them.
// No orange, amber or peach field (warm fields render stronger than written and swallow warm objects — render-lessons.md):
// warmth is a warm light shape (li) on the white stage.
const EMOTION_FIELD = {
  RED:    { field: ["vivid red", "#E2443A"], floor: ["deep red", "#A3271F"], means: "conflict, anger, frustration, stress, danger — the breaking point" },
  YELLOW: { field: ["bright lemon yellow", "#FFE04A"], floor: ["deep golden yellow", "#D9AE00"], means: "surprise, discovery, the aha, sudden energy" },
  BLUE:   { field: ["clear bright blue", "#4D9BEA"], floor: ["deep blue", "#2C6BB5"], means: "trust, safety, relief — the calm after the storm" },
  GREEN:  { field: ["fresh bright green", "#3CC46E"], floor: ["deep green", "#1F8A49"], means: "growth, the breakthrough, the step forward" },
  VIOLET: { field: ["vivid violet", "#8D5CDF"], floor: ["deep violet", "#5B32A3"], means: "the screen's pull, digital overwhelm" },
  GREY:   { field: ["flat cool grey", "#A3ABB5"], floor: ["deep slate grey", "#6E7783"], means: "emptiness, numbness, absence at its strongest" },
};
function moodOf(m) { return MOOD[m] ? m : (MOOD_ALIAS[m] || m); }

// ── DICTIONARIES — rebuilt for every video (assemble.cjs fills them from dicts.cjs) ──

// ROLE: one entry per character. age: "adult" | "teen" | "child". ref: true only if a reference image exists.
// hair: the hair outline word (bun, spiky, ponytail, bob, curls, side parting…) — every character has hair, never bald.
// wear: the small accessories this character ALWAYS wears — each also described in text with its hex. [] for none.
// sameAs: the same person at another age (shares the hair of that role on purpose).
const ROLE = {
  "Mom": {"age":"adult","ref":true,"hair":"bun","wear":[],"text":"MOM (adult — the attached MOM reference images): the taller figure. Solid black hair parted softly at the centre so it meets the forehead in a small point, framing the round face down past the ears, with one thin strand hanging below each ear toward the jaw, and one round bun on top of the head marked with two or three thin curved lines. Small half-round ears show at eye level. No accessories. A full-grown adult woman with long arms and legs — her head the same size and shape as in her reference."},
  "Son": {"age":"teen","ref":true,"hair":"spikes","wear":[],"text":"SON (teenager — the attached SON reference images): clearly shorter than MOM, lean, with his larger-looking head exactly as in the reference. Solid black messy spiky hair in jagged pointed clumps: a fringe of pointed tips falling over the forehead to just above the eyebrows, spiky tips sticking out at the sides above the ears. The face is round, a touch taller than wide; small half-round ears. No accessories."},
  "Little Boy": {"short":"his size","age":"child","ref":false,"from":"Son","sameAs":"Son","hair":"spikes","wear":[],"change":"his size only — SON at seven years old, with exactly the same messy spiky black hair and the same face, and a young child's body whose head top reaches only about halfway up MOM's standing height, with short arms and legs","text":"LITTLE BOY (SON at seven years old — drawn from the attached SON reference, changing only his size): exactly SON's solid black messy spiky hair with the pointed tips over the forehead and above the ears, and the same round face; a young child whose head top reaches only about halfway up MOM's standing height, with short arms and legs. No clothing — a bare thin black line body with no fill."},
  "Dad": {"short":"his hair, his glasses and his height","age":"adult","ref":false,"from":"Son","hair":"side parting","wear":[{"item":"glasses","hex":"#3F4A5C"}],"change":"his hair — short flat solid black hair cut neatly with a clean side parting and a smooth rounded top, instead of SON's hair — one pair of small rectangular glasses with thin dark slate (#3F4A5C) frames around the big white eye circles, pupils always visible — and an adult height a little taller than MOM","text":"DAD (MOM's partner — drawn from the attached SON reference, changing only his hair, his glasses and his height): short flat solid black hair, neatly cut with a clean side parting and a smooth rounded top; one pair of small rectangular glasses with thin dark slate (#3F4A5C) frames around the big white eye circles, the pupils always visible inside them; a full-grown adult a little taller than MOM, with long arms and legs. No clothing — a bare thin black line body with no fill."},
  "Kevin": {"short":"his hair, a bow tie and his height","age":"adult","ref":false,"from":"Son","hair":"wave","wear":[{"item":"bow tie","hex":"#3E7A70"}],"change":"his hair — glossy solid black hair combed into one smooth wave up and back from the forehead, instead of SON's hair — one small neat bow tie in muted teal-green (#3E7A70) at the neck line with no collar or shirt — and an adult height a little taller than MOM, standing very straight","text":"KEVIN (the perfect cousin, a young adult — drawn from the attached SON reference, changing only his hair, a bow tie and his height): solid black hair combed into one smooth wave up and back from the forehead; one small neat bow tie in muted teal-green (#3E7A70) sitting at the neck line with no collar or shirt; a little taller than MOM, standing very straight with his chin up. No clothing — a bare thin black line body with no fill."},
  "Boss": {"short":"his hair, his tie and his height","age":"adult","ref":false,"from":"Son","hair":"flat-top","wear":[{"item":"tie","hex":"#3C4A6B"}],"change":"his hair — short solid black hair cut into a neat flat-top, square and level on top with short straight sides, instead of SON's hair — one narrow dark navy (#3C4A6B) tie hanging from the neck line with no collar or shirt — and an adult height a little taller than MOM","text":"BOSS (MOM's boss — drawn from the attached SON reference, changing only his hair, his tie and his height): short solid black hair cut into a neat flat-top, square and level on top with short straight sides; one narrow dark navy (#3C4A6B) tie hanging straight down from the neck line with no collar or shirt; a full-grown adult a little taller than MOM, standing straight. No clothing — a bare thin black line body with no fill."},
  "Sarah": {"short":"her hair","age":"adult","ref":false,"from":"Mom","hair":"ponytail","wear":[],"change":"her hair — solid black hair pulled back smooth into one long, high, perfectly straight ponytail hanging behind her head to shoulder height, instead of MOM's hair","text":"SARAH (MOM's colleague — drawn from the attached MOM reference, changing only her hair): solid black hair pulled back smooth into one long high straight ponytail hanging behind her head down to shoulder height, with no loose strands; the same height as MOM. No clothing — a bare thin black line body with no fill."},
};

// SET: optional place families (label only in v19 — places are outline cues, never tinted rooms).
const SET = {

};

// CHAPTER: keyed by the first two characters of a frame's sequence. emo = the chapter's emotional colour for PEAK frames
// (field = the colour field, floor = the deeper tone used for the outlines on it). Other keys are ignored in v19.
const CHAPTER = {
  "00": {"look":"storm violet","emo":{"field":["storm violet","#6F5C9E"],"floor":["deep storm violet","#54457D"]}},
  "01": {"look":"deep teal","emo":{"field":["deep teal","#2F7F86"],"floor":["dark teal","#235F64"]}},
};

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
    const C = CHAPTER[String(b.sequence || "").slice(0, 2)], v = EMOTION_FIELD[b.peakCol] || (C && C.emo) || PEAK_VARIANT[b.moodWas] || PEAK_VARIANT[b.mood];
    if (v) { const field = v.field || v.wall, line = v.floor || v.furn || M.line; return _pal(field, line, field); }
  }
  return _pal(M.ground, M.line, M.fill);
}

// WORLD: places described by their outline pieces, never by colour. kind: INDOOR | OUTDOOR | FIELD.
// v19 format: { kind, label, parts: [[name, regex, "outline piece text"]] } — a piece is drawn only in the frames whose own
// action or placement names it (no automatic anchor furniture). A world with no parts is an idea place: its `text` is its picture.
// Older worlds ({WALL} {FLOOR} {FURN} placeholders, head/tail, anchor flags) still compile: their colour words are dropped.
const WORLD = {
  "HALL": {"kind":"INDOOR","label":"front hall","parts":[["front door","\\bfront door\\b","one plain front door with a thin frame and one small round knob"],["stairs","\\bstairs?\\b|\\bstaircase\\b|\\bbanister\\b","a straight staircase of plain steps with one thin banister rail"],["hall table","\\bhall table\\b","one narrow hall table on four thin legs"]]},
  "KITCHEN": {"kind":"INDOOR","label":"kitchen","parts":[["table","\\btable\\b","one small round table on a single leg"],["chair","\\bchairs?\\b|\\bsits?\\b|\\bsitting\\b|\\bseated\\b","one plain chair for each person sitting, and no other chairs"],["counter","\\bcounter\\b","one long plain kitchen counter with a flat top"]]},
  "SON_ROOM": {"kind":"INDOOR","label":"bedroom","parts":[["bed","\\bbed\\b|\\bmattress\\b","one low single bed with a plain blanket and one pillow"],["door","\\bdoor\\b|\\bdoorway\\b","one plain bedroom door with a thin frame and one small round knob"]]},
  "LIVING": {"kind":"INDOOR","label":"living room","parts":[["sofa","\\bsofa\\b","one long low sofa with round armrests and one plain seat cushion along its length"],["doorway","\\bdoorway\\b","one open doorway drawn as a plain door frame"]]},
};

// PROP: name, hex, colour, text (a countable build spec). part = the coloured part ("THE JAR's tangerine-orange (#F57C00) lid").
// lineText = how it looks when it is not the frame's colour element (default: its text without colour words, in black line on white).
// mature: false marks a symbol prop (hearts, stars, trophies, smile masks, picture bubbles…) — the v19 checks fail any frame using one.
const PROP = {
  "JAR": {"part":"THE JAR's tangerine-orange (#F57C00) lid","rest":"the glass stays clear and pale","name":"THE JAR","hex":"#F57C00","colour":"tangerine orange","danger":false,"nouns":["jar"],"lineText":"THE JAR: one clear glass jar about as tall as SON's head, drawn in bold black line with a white fill, with one big wide screw lid marked with five short upright ridges round its rim; one small dark tangled knot sits inside the glass.","text":"THE JAR: one clear glass jar about as tall as SON's head, drawn with the same bold black outline as the characters, a very pale blue-white glass fill (#EEF6F9) and two short white shine dashes on its side, with one big wide screw lid in flat tangerine orange (#F57C00) — the lid about a third of the jar's height — marked with five short upright ridges round its rim; one small dark tangled knot sits inside the glass."},
  "MILK_GLASS": {"small":true,"part":"the teal (#00A6A0) stripe of THE MILK GLASS","rest":"the glass stays clear and the milk stays white","name":"THE MILK GLASS","hex":"#00A6A0","colour":"teal","danger":false,"nouns":["milk","glass"],"text":"THE MILK GLASS: one small clear tumbler with one teal (#00A6A0) stripe round its middle, holding plain white milk."},
  "PHONE": {"small":true,"part":"THE PHONE's strong purple (#8A2BE2) case","name":"THE PHONE","hex":"#8A2BE2","colour":"strong purple","fam":"VIOLET","screen":true,"danger":false,"nouns":["phone"],"text":"THE PHONE: MOM's slim rectangular smartphone in a flat strong purple (#8A2BE2) case with rounded corners and one small round camera dot at its top corner; its screen one plain dark panel with no picture and no words."},
  "TEST": {"small":true,"part":"the dark ink-blue (#2453D8) circle on THE TEST","rest":"the paper stays white","name":"THE TEST","hex":"#2453D8","colour":"dark ink blue","danger":false,"nouns":["test","paper"],"text":"THE TEST: one sheet of white school paper folded in half, showing a few short grey lines and one big hand-drawn circle in dark ink blue (#2453D8) in its top corner — no letters or numbers."},
  "NOTE": {"small":true,"name":"THE NOTE","hex":"#F2D633","colour":"lemon yellow","danger":false,"nouns":["note","plan"],"text":"THE NOTE: one square sticky note in flat lemon yellow (#F2D633) with three short scribbled black lines on it — no letters or numbers."},
  "FRIDGE": {"part":"the bright violet (#7B4FD6) marker lines on THE FRIDGE door","rest":"the fridge and the papers stay white","name":"THE FRIDGE","hex":"#7B4FD6","colour":"bright violet","danger":false,"nouns":["fridge","investigation","marker"],"lineText":"THE FRIDGE: one tall plain fridge drawn in bold black line with a white fill, its door covered with a few plain white papers held by small round magnets, joined by thin black marker lines.","text":"THE FRIDGE: one tall plain fridge drawn in bold black line with a white fill; its door is covered with a few plain white papers — a letter, a timetable grid, a small group photo drawn as tiny round heads — held by small round black magnets and joined by hand-drawn lines in bright violet (#7B4FD6) marker; no words, letters or numbers on any paper."},
  "WHITEBOARD": {"part":"the raspberry (#E5457F) frame and easel of THE WHITEBOARD","rest":"the board itself stays white","name":"THE WHITEBOARD","hex":"#E5457F","colour":"raspberry","danger":false,"nouns":["whiteboard"],"text":"THE WHITEBOARD: one big rectangular whiteboard on a three-legged easel, its thick frame and easel legs in flat raspberry (#E5457F), the board plain white with four small square boxes drawn on it in black marker, joined by short straight lines — no words, letters or numbers."},
};

// TONE (v22): bright hex in a prop text → { calm: [name, hex], bright: [name, hex] }; filled by assemble.cjs from dicts.TONE.
const TONE = {

};
// OVERLAY: pop-in elements made once on a chroma-key background. mature: false marks an emoji-style icon (checks fail it).
const OVERLAY = {

};

// ── SCRIPT — the exact voice-over lines, one per frame ──
const SCRIPT = [
  "Your child probably loves you more than almost anyone on Earth.",
  "And they are still hiding things from you.",
  "Not drugs.",
  "Not secret relationships.",
  "Something much earlier.",
  "Thoughts.",
  "Fears.",
  "Tiny moments you forgot...",
  "that they didn’t.",
  "Because children do not always hide things",
  "because they distrust their parents.",
  "Sometimes they hide them because",
  "they love their parents so much",
  "that disappointing them feels terrifying.",
  "And if children could tell their parents seven things",
  "without worrying about the reaction,",
  "these might be the ones.",
  "Number six may change the way you react tonight.",
  "Number one.",
  "Sometimes I need you to listen,",
  "not fix me.",
  "Your child comes home.",
  "“Today was terrible.”",
  "And instantly your parent brain activates.",
  "Who did it?",
  "What happened?",
  "Did you tell the teacher?",
  "Here’s what you should do tomorrow.",
  "Within thirty seconds,",
  "you have accidentally launched a federal investigation.",
  "There is just one problem.",
  "Your child did not ask for a solution.",
  "They were asking:",
  "“Can you sit inside this feeling with me for a minute?”",
  "Adults do this too.",
  "Imagine telling your partner:",
  "“I had the worst day.”",
  "And they immediately pull out a whiteboard.",
  "“Excellent. I’ve identified four efficiency improvements.”",
  "You would probably throw away the whiteboard.",
  "Children are not always asking us to remove the problem.",
  "Sometimes they are asking us to prove",
  "they do not have to carry it alone.",
];

// ── STORY PLAN ──
const STORY = {
  "idea": "Children hide things not from distrust but from love: they are afraid of disappointing the parent. What they need first is company, not a fix.",
  "arc": "the hug with a secret → the moment the parent forgot and the child didn't → hiding from love, not distrust → 'listen, not fix me' → the investigation → the whiteboard → the parent who simply sits down",
  "ending": "Chapter one ends with MOM sitting beside SON and SON setting THE JAR down between them: the first thing no longer hidden.",
};
const PLAN = [
  {"sequence":"00 Cold open","purpose":"Love and hiding in one picture; the forgotten moment the child kept; fear of disappointing","feel":"warmth with a twist, then recognition and a sting","mood":"CLEAN","metaphor":"THE JAR (the spine Thomas liked), used only where its meaning moves"},
  {"sequence":"01 Listen, not fix me","purpose":"The question flood, the comic investigation, the adult mirror, then the parent who sits down","feel":"laughter of recognition turning into relief","mood":"CLEAN","metaphor":"the parent's tools (phone, note, fridge-door board, whiteboard) put down one by one"},
];
const MOTIFS = [
  {"key":"JAR","meaning":"what the child keeps inside, and whether it feels safe to show it","arc":["hidden behind SON's back during the hug (S2)","held in his lap under the table while he swallows the words (S17)","set down on the table between them (S43)"]},
  {"key":"MILK_GLASS","meaning":"a small moment the parent forgot and the child kept","arc":["tipped over in the memory (S7)","standing upright in front of the teenager today (S9)"]},
  {"key":"PHONE","meaning":"the parent's busy answer instead of attention","arc":["at MOM's ear in the memory (S5, S8)","lifted to call the school (S27)","turned face down on the table (S41)"]},
  {"key":"NOTE","meaning":"the fix nobody asked for","arc":["stuck on SON's hand (S28)","pushed back across the table (S32)"]},
];

// The director's read — the first deliverable: written before any frame; every frame's `why` traces back to it.
const DIRECTOR_READ = null;
// The key lines (each gets a composition used nowhere else) and the moments told as sequences.
const KEY_LINES = ["S2","S9","S14","S34","S43"];
const HELD_MOMENTS = ["S42","S43"];


// ── SKETCH — one short line per script line ──
const SKETCH = [
  "S1 | 00 Cold open | Front hall, evening — the hug [HALL · Mom, Son] | HOOK | MEDWIDE/PROFILE/NORMAL/ORDINARY | CLEAN | hero FIGURE | hook | feel: warmth — this love is real | idea: Side-on in the front hall: SON throws his arms round MOM the moment she comes in, and she melts into it. | moment: — | pop: — | move: PUSH_IN | device: CONTEXT | edit: —",
  "S2 | 00 Cold open | Front hall, evening — the hug [HALL · Mom, Son] | HOOK | MEDIUM/OTS/NORMAL/ORDINARY | CLEAN | hero JAR | statement | feel: a small jolt — the love is real, and so is the secret | idea: Over SON's shoulder: MOM hugs him with her eyes closed while, behind his own back, his free hand grips THE JAR out of her sight. | moment: — | pop: — | move: PUSH_IN | device: OTS_REACTION | edit: —",
  "S3 | 00 Cold open | Front hall, evening — the hug [HALL · Mom] | EMOTIONAL | XCLOSE/EYE/HUGE/ORDINARY | WHITE | hero FACE | rapid-list | feel: a laugh — the parent's suspicion fires at once | idea: Eyes only on white: over the hug, one of MOM's eyes snaps open and narrows toward his hidden hand. | moment: — | pop: — | move: SNAP_ZOOM | device: SCALE_SHIFT | edit: —",
  "S4 | 00 Cold open | Front hall, evening — the hug [HALL · Mom, Son] | EMOTIONAL | REACTION/OTS/LARGE/ORDINARY | CLEAN | hero FACE | rapid-list | feel: a laugh — he has caught her suspicion | idea: SON leans back out of the hug and gives MOM a long, flat, unimpressed look. | moment: — | pop: — | move: HOLD | device: OTS_REACTION | edit: —",
  "S5 | 00 Cold open | Kitchen, years ago [KITCHEN · Mom, Little Boy] | EMOTIONAL | WIDE/EYE/NORMAL/ORDINARY | MEMORY | hero FIGURE | time-jump | feel: a soft pull into the past — this started long ago | idea: A faded memory: LITTLE BOY alone at the kitchen table with a glass of milk, watching MOM's turned back as she talks on the phone. | moment: — | pop: — | move: DRIFT | device: TIME_MARKER | edit: —",
  "S6 | 00 Cold open | Kitchen, years ago [KITCHEN · Little Boy] | EMOTIONAL | FACE_HANDS/EYE/LARGE/ORDINARY | MEMORY | hero FACE | statement | feel: tenderness — a small head full of things to say | idea: LITTLE BOY's face propped on both hands, his eyes on MOM's turned back, his mouth working on words he doesn't say. | moment: — | pop: — | move: PUSH_IN | device: INSERT_DETAIL | edit: —",
  "S7 | 00 Cold open | Kitchen, years ago [KITCHEN · Little Boy] | EMOTIONAL | HANDS/EYE/NONE/ORDINARY | MEMORY | hero MILK_GLASS | statement | feel: a jolt of a child's fear — what will she say? | idea: Hands only: LITTLE BOY's small hand frozen in the air over THE MILK GLASS he has just knocked over, the milk spreading. | moment: — | pop: — | move: SNAP_ZOOM | device: CAUSE_EFFECT_CUT | edit: —",
  "S8 | 00 Cold open | Kitchen, years ago [KITCHEN · Mom, Little Boy] | EMOTIONAL | MEDIUM/EYE/NORMAL/ORDINARY | MEMORY | hero FIGURE | statement | feel: a wince — such a small moment, and so big for him | idea: MOM, still on the phone, wipes the milk in one quick swipe with a sharp sigh while LITTLE BOY shrinks down in his chair. | moment: — | pop: — | move: HOLD | device: CAUSE_EFFECT_CUT | edit: 'forgot' MOM straightens up and turns back toward the counter, laughing into THE PHONE, her eyebrows lifting and her mouth opening in a bright laugh, the cloth hanging from her other hand; LITTLE BOY stays exactly as he is, shrunk down in his chair",
  "S9 | 00 Cold open | Kitchen, now [KITCHEN · Son] | EMOTIONAL | FACE_HANDS/EYE/LARGE/ORDINARY | CLEAN | hero FACE | time-jump | feel: a lump in the throat — he never forgot | idea: Today: SON at the same kitchen table, a glass of milk in front of him, staring at it — the small moment is still with him. | moment: — | pop: — | move: PUSH_IN | device: BEFORE_AFTER | edit: —",
  "S10 | 00 Cold open | Bedroom, evening [SON_ROOM · Son] | EMOTIONAL | MEDWIDE/EYE/NORMAL/ORDINARY | CLEAN | hero TEST | statement | feel: recognition — every parent has seen this quick hide | idea: SON kneels by his bed and slides a folded test under the mattress, glancing back at the shut door. | moment: — | pop: — | move: DRIFT | device: CONTEXT | edit: —",
  "S11 | 00 Cold open | Bedroom, evening [SON_ROOM · Mom, Son] | EMOTIONAL | MEDIUM/OTS/NORMAL/ORDINARY | CLEAN | hero FIGURE | statement | feel: the sting of being misread | idea: Over SON's shoulder: MOM opens the door just as he spins round from the bed; her arms fold and her eyes narrow — she reads it as distrust. | moment: — | pop: — | move: HOLD | device: OTS_REACTION | edit: 'distrust' SON's mitten hands slide together behind his back and grip each other tight, and his head sinks a little lower between his shoulders; MOM stays exactly as she is in the doorway",
  "S12 | 00 Cold open | Bedroom, evening [SON_ROOM · Son] | EMOTIONAL | CLOSE/EYE/LARGE/ORDINARY | CLEAN | hero FACE | statement | feel: a turn — it was never defiance; it was fear | idea: The reverse on SON's face: not defiant at all — scared, eyebrows up, lips pressed, eyes on MOM in the doorway. | moment: — | pop: — | move: PUSH_IN | device: OTS_REACTION | edit: —",
  "S13 | 00 Cold open | Stairs, that evening [HALL · Mom, Son] | QUIET | MEDWIDE/HIGH/NORMAL/ORDINARY | CLEAN | hero FIGURE | statement | feel: tenderness — he adores her, quietly | idea: From above: SON on the top stair, hugging his knees, watching MOM below humming as she sorts the post. | moment: — | pop: — | move: DRIFT | device: POWER_ANGLE | edit: —",
  "S14 | 00 Cold open | Stairs, that evening [HALL · Mom, Son] | HOOK | WIDE/EYE/NORMAL/ORDINARY | PEAK | hero FIGURE | peak | feel: the terror of letting her down — the peak of the opening | idea: The field turns the colour of fear: MOM starts up the stairs smiling; at the top SON freezes, the folded test crushed behind his back. | moment: — | pop: — | move: PULL_OUT | device: DISTANCE | edit: 'terrifying' SON shrinks back against the banister at the top of the stairs, his shoulders jumping up toward his ears and his eyes squeezing shut; MOM stays exactly as she is, smiling up from the first step",
  "S15 | 00 Cold open | Kitchen, dinner [KITCHEN · Mom, Son] | EMOTIONAL | MEDIUM/PROFILE/NORMAL/ORDINARY | CLEAN | hero FIGURE | statement | feel: hope — he is about to say it | idea: Side-on at dinner: SON opens his mouth and lifts a hand to begin; MOM looks up from her plate, waiting. | moment: — | pop: — | move: DRIFT | device: DISTANCE | edit: —",
  "S16 | 00 Cold open | Kitchen, dinner [KITCHEN · Mom] | EMOTIONAL | REACTION/EYE/LARGE/ORDINARY | WHITE | hero FACE | statement | feel: the worry he feels — her face is already reacting | idea: MOM's face on white, the reaction already forming: eyebrows climbing, mouth tightening, before he has said a word. | moment: — | pop: — | move: PUSH_IN | device: OTS_REACTION | edit: —",
  "S17 | 00 Cold open | Kitchen, dinner [KITCHEN · Son] | EMOTIONAL | MEDIUM/EYE/NORMAL/ORDINARY | CLEAN | hero JAR | statement | feel: the ache of an unsaid thing — these are the ones | idea: Split by the table edge: SON shrugs a small never-mind above the table while, below it, his hand rests on the lid of THE JAR in his lap. | moment: — | pop: — | move: TILT_DOWN | device: SPLIT_STATE | edit: —",
  "S18 | 00 Cold open | Front hall, night [HALL · Mom] | HOOK | MEDWIDE/EYE/NORMAL/ORDINARY | NIGHT | hero FIGURE | hook | feel: curiosity and resolve — tonight could go differently | idea: Night: MOM at the foot of the stairs, one hand on the banister, eyes closed, taking a breath before she goes up to him. | moment: — | pop: — | move: PUSH_IN | device: TIME_MARKER | edit: 'tonight' MOM opens her eyes and breathes out, her shoulders dropping, and lifts one foot onto the first stair, her eyebrows settling level and calm",
  "S19 | 01 Listen, not fix me | The child's voice [HALL · Son] | HOOK | MEDWIDE/SQUARE/NORMAL/ORDINARY | WHITE | hero FIGURE | chapter-turn | feel: a hush — the child is about to speak for himself | idea: A white break: SON alone and small in empty white space, lifting his eyes to the left, toward the parent he is about to speak to. | moment: — | pop: — | move: PUSH_IN | device: CONTEXT | edit: —",
  "S20 | 01 Listen, not fix me | The child's voice [HALL · Son] | EMOTIONAL | CLOSE/EYE/LARGE/ORDINARY | WHITE | hero FACE | child-voice | feel: a quiet plea that lands | idea: SON's face fills the white frame as he speaks toward MOM, out of frame left — the parent he is asking. | moment: — | pop: — | move: HOLD | device: SCALE_SHIFT | edit: —",
  "S21 | 01 Listen, not fix me | The child's voice [HALL · Mom, Son] | EMOTIONAL | MEDIUM/EYE/NORMAL/ORDINARY | WHITE | hero FIGURE | child-voice | feel: a small, knowing smile — tidying him isn't what he needs | idea: While SON is still talking, MOM's hand reaches in to flatten his messy hair; SON gently catches her wrist with a small, tired smile. | moment: — | pop: — | move: HOLD | device: TUG_OF_WAR | edit: —",
  "S22 | 01 Listen, not fix me | Front hall, after school [HALL · Mom, Son] | EMOTIONAL | WIDE/HIGH/NORMAL/ORDINARY | CLEAN | hero FIGURE | scene-setting | feel: recognition — the walk that says it all | idea: SON drags himself in through the front door, schoolbag sliding off one shoulder; MOM turns from the hall table. | moment: — | pop: — | move: DRIFT | device: CONTEXT | edit: —",
  "S23 | 01 Listen, not fix me | Front hall, after school [HALL · Son] | EMOTIONAL | CLOSE/EYE/LARGE/ORDINARY | CLEAN | hero FACE | dialogue | feel: a small ache — he finally says it | idea: SON on the bottom stair, close: the words come out with his eyes on the floor. | moment: — | pop: — | move: PUSH_IN | device: OTS_REACTION | edit: —",
  "S24 | 01 Listen, not fix me | Front hall, after school [HALL · Mom] | EMOTIONAL | XCLOSE/EYE/HUGE/ORDINARY | WHITE | hero FACE | humour-aside | feel: a laugh — the parent's alarm goes off | idea: MOM's face, huge on white: eyes snap wide, eyebrows shoot up, both hands fly up — parent brain on. | moment: — | pop: — | move: SNAP_ZOOM | device: SCALE_SHIFT | edit: —",
  "S25 | 01 Listen, not fix me | Front hall, after school [HALL · Mom, Son] | EMOTIONAL | MEDIUM/OTS/NORMAL/ORDINARY | CLEAN | hero FIGURE | rapid-list | feel: a laugh of recognition — the questions begin | idea: Over SON's shoulder: MOM bends in close with her first question while SON leans back against the stairs. | moment: — | pop: — | move: PUSH_IN | device: OTS_REACTION | edit: —",
  "S26 | 01 Listen, not fix me | Front hall, after school [HALL · Mom, Son] | EMOTIONAL | CLOSE/PROFILE/LARGE/ORDINARY | CLEAN | hero FACE | rapid-list | feel: the squeeze — too many questions, too close | idea: Side-on, two faces close: MOM leans in at SON's ear with the next question; SON turns his face away and rolls his eyes up. | moment: — | pop: — | move: SNAP_ZOOM | device: OTS_REACTION | edit: —",
  "S27 | 01 Listen, not fix me | Front hall, after school [HALL · Mom, Son] | EMOTIONAL | MEDWIDE/EYE/NORMAL/ORDINARY | CLEAN | hero PHONE | rapid-list | feel: panic and comedy — she is already calling | idea: MOM stands with THE PHONE already at her ear, calling the school; SON half rises from the stair, reaching to stop her. | moment: — | pop: — | move: PAN_LEFT | device: TUG_OF_WAR | edit: —",
  "S28 | 01 Listen, not fix me | Front hall, after school [HALL · Mom, Son] | EMOTIONAL | HANDS/EYE/NONE/ORDINARY | CLEAN | hero NOTE | rapid-list | feel: a laugh — the to-do list arrives | idea: Hands only: MOM presses a yellow sticky note with a plan onto SON's limp hand. | moment: — | pop: NOTE PUNCH 'tomorrow' | move: HOLD | device: INSERT_DETAIL | edit: —",
  "S29 | 01 Listen, not fix me | Front hall, after school [HALL · Mom, Son] | EMOTIONAL | WIDE/PROFILE/NORMAL/ORDINARY | CLEAN | hero FIGURE | humour-aside | feel: the comedy of speed | idea: Side-on: MOM marches off toward the kitchen, phone at her ear; SON is left on the stair holding the note, mouth half open. | moment: — | pop: — | move: PAN_LEFT | device: CAUSE_EFFECT_CUT | edit: —",
  "S30 | 01 Listen, not fix me | Kitchen, after school [KITCHEN · Mom, Son] | HOOK | WIDE/EYE/NORMAL/ORDINARY | CLEAN | hero FRIDGE | humour-aside | feel: a big laugh — the overreaction made visible | idea: Wide: the fridge door has become an incident board — the school letter, his timetable and the class photo under magnets, joined by violet marker lines — MOM drawing one more line while SON slumps at the table. | moment: — | pop: — | move: PULL_OUT | device: ESCALATION_RAMP | edit: 'investigation' MOM stretches up on her toes and draws one more long marker line across THE FRIDGE door to a new paper; SON slides even lower in his chair until only his head shows above the table edge",
  "S31 | 01 Listen, not fix me | Kitchen, after school [KITCHEN · Mom] | EMOTIONAL | CLOSE/EYE/LARGE/ORDINARY | CLEAN | hero FACE | statement | feel: a held breath — she stops | idea: MOM freezes mid-point and glances at SON — the first second of noticing. | moment: — | pop: — | move: HOLD | device: SILENT_BEAT | edit: —",
  "S32 | 01 Listen, not fix me | Kitchen, after school [KITCHEN · Son] | EMOTIONAL | FACE_HANDS/EYE/LARGE/ORDINARY | CLEAN | hero NOTE | statement | feel: quiet clarity — he never wanted a plan | idea: Face and hands: SON slides the yellow note back across the table toward MOM, his eyes on the table. | moment: — | pop: — | move: DRIFT | device: INSERT_DETAIL | edit: —",
  "S33 | 01 Listen, not fix me | Kitchen, after school [KITCHEN · Son] | EMOTIONAL | XCLOSE/EYE/HUGE/ORDINARY | WHITE | hero FACE | statement | feel: the hush before the real request | idea: Eyes only on white: SON's eyes lift slowly to MOM. | moment: — | pop: — | move: PUSH_IN | device: SCALE_SHIFT | edit: —",
  "S34 | 01 Listen, not fix me | Kitchen, after school [KITCHEN · Mom, Son] | HOOK | MEDWIDE/EYE/NORMAL/ORDINARY | CLEAN | hero FIGURE | child-voice | feel: a lump in the throat — all he wants is company | idea: SON pulls out the empty chair beside him and pats its seat, looking up at MOM; her marker hand at the fridge sinks. | moment: — | pop: — | move: DRIFT | device: DISTANCE | edit: —",
  "S35 | 01 Listen, not fix me | Living room, evening [LIVING · Mom, Dad] | EMOTIONAL | WIDE/HIGH/NORMAL/ORDINARY | CLEAN | hero FIGURE | adult-mirror | feel: a smile of recognition — now it's us | idea: Wide: MOM drops onto the sofa with her head tipped back; DAD, at the other end, looks up from his laptop. | moment: — | pop: — | move: DRIFT | device: MIRROR | edit: —",
  "S36 | 01 Listen, not fix me | Living room, evening [LIVING · Mom, Dad] | EMOTIONAL | MEDIUM/OTS/NORMAL/ORDINARY | CLEAN | hero FIGURE | adult-mirror | feel: anticipation — she needs to vent | idea: Over DAD's shoulder: MOM turns to him and rests a hand on his arm; he shuts the laptop, all attention. | moment: — | pop: — | move: PUSH_IN | device: OTS_REACTION | edit: —",
  "S37 | 01 Listen, not fix me | Living room, evening [LIVING · Mom] | EMOTIONAL | CLOSE/EYE/LARGE/ORDINARY | CLEAN | hero FACE | dialogue | feel: fellow-feeling — we've all had this day | idea: MOM, close, head back on the sofa, says it with her whole face sagging. | moment: — | pop: — | move: PUSH_IN | device: OTS_REACTION | edit: —",
  "S38 | 01 Listen, not fix me | Living room, evening [LIVING · Mom, Dad] | HOOK | MEDWIDE/EYE/NORMAL/ORDINARY | CLEAN | hero WHITEBOARD | humour-aside | feel: a laugh — the fix arrives on an easel | idea: DAD wheels a whiteboard on an easel right in front of the sofa, beaming; MOM blinks at it. | moment: — | pop: WHITEBOARD PUNCH 'whiteboard' | move: SNAP_ZOOM | device: SCALE_SHIFT | edit: —",
  "S39 | 01 Listen, not fix me | Living room, evening [LIVING · Mom] | EMOTIONAL | REACTION/EYE/LARGE/ORDINARY | CLEAN | hero FACE | humour-aside | feel: a laugh — the seriously face | idea: MOM's face while DAD presents: flat stare, one eyebrow up, slow blink — the reaction is the joke. | moment: — | pop: — | move: HOLD | device: OTS_REACTION | edit: —",
  "S40 | 01 Listen, not fix me | Living room, evening [LIVING · Mom, Dad] | EMOTIONAL | WIDE/EYE/NORMAL/ORDINARY | CLEAN | hero WHITEBOARD | humour-aside | feel: a laugh of relief — gone | idea: Wide: MOM marches the whiteboard out through the doorway under one arm; DAD, on the sofa, raises both palms with a sheepish smile. | moment: — | pop: — | move: PAN_LEFT | device: CAUSE_EFFECT_CUT | edit: —",
  "S41 | 01 Listen, not fix me | Kitchen, after school [KITCHEN · Mom] | EMOTIONAL | HANDS/EYE/NONE/ORDINARY | CLEAN | hero PHONE | advice | feel: relief — she stops fixing | idea: Hands only: MOM turns THE PHONE over, screen down, on the table and slides THE NOTE aside. | moment: — | pop: — | move: HOLD | device: INSERT_DETAIL | edit: —",
  "S42 | 01 Listen, not fix me | Kitchen, after school [KITCHEN · Mom, Son] | QUIET | MEDWIDE/PROFILE/NORMAL/ORDINARY | CLEAN | hero FIGURE | advice | feel: warmth — she simply stays | idea: Side-on: MOM sits down in the chair he pulled out for her, without a word; his eyes slide toward her. | moment: — | pop: — | move: DRIFT | device: DISTANCE | edit: —",
  "S43 | 01 Listen, not fix me | Kitchen, after school [KITCHEN · Mom, Son] | HOOK | MEDIUM/EYE/NORMAL/ORDINARY | CLEAN | hero JAR | ending | feel: relief — he isn't carrying it alone any more | idea: SON sets THE JAR down on the table between them; MOM leaves it closed and rests her hand on his shoulder. | moment: — | pop: — | move: PULL_OUT | device: CALLBACK | edit: 'alone' SON's head tips gently sideways until it rests against MOM's shoulder, his eyes closing into two calm curves; MOM's hand stays on his shoulder",
];

// ── BEATS — one per script line, in order ──
const RAW_BEATS = [
  {
    n: 1, ref: "S1",
    sequence: "00 Cold open", scene: "Front hall, evening — the hug", tier: "HOOK", fn: "STORY",
    roles: "Mom, Son", props: [], hero: "FIGURE",
    feel: "Warmth — this love is real.",
    meaning: "Side-on in the front hall: SON throws his arms round MOM the moment she comes in, and she melts into it.",
    shotSize: "MEDWIDE", angle: "PROFILE", face: "NORMAL", scale: "ORDINARY",
    framing: "Medium-wide shot from the side at eye level, in the front hall, horizon level: at the left MOM just inside the front door, large, half the frame height, her keys still dangling from one mitten hand; in the centre the two of them meeting in one tight hug; at the right SON, large, his arms thrown round MOM, his chin landing on her shoulder.",
    action: "SON throws both arms round MOM in a tight hug just inside the front door, his chin landing on her shoulder; MOM's free mitten hand comes round his back while her keys still dangle from the other. INTERACTION BEAT: SON throws both arms round MOM without a word; in response, MOM's eyebrows jump up, then her eyes close into happy curves and her free hand wraps round his back.",
    performance: "MOM: eyes closing into two happy curves, eyebrows lifted high with surprise, mouth a wide warm open smile, head tipping toward SON's, one mitten hand pressed to his back and the other still holding her keys, posture leaning into the hug, pupils hidden as her eyes close. SON: eyes squeezed shut in two soft curves, eyebrows relaxed and raised in the middle, mouth a content closed smile, head resting on MOM's shoulder, both arms wrapped tight round her, posture up on his toes leaning into her, pupils hidden as he holds on.",
    world: "HALL", mood: "CLEAN", peak: false,
    stage: "START",
    moment: "",
    pop: null,
    move: {"type":"PUSH_IN","on":"","note":"slow push in on the hug"},
    device: "CONTEXT",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a medium-wide shot from the side at eye level in the front hall — MOM just inside the front door, large, half the frame height, her keys still dangling from one mitten hand; the two of them meeting in one tight hug; SON, large, his arms thrown round MOM, his chin landing on her shoulder — the characters drawn large enough that their faces read.",
    map: "left — MOM just inside the front door, large, half the frame height, her keys still dangling from one mitten hand; centre — the two of them meeting in one tight hug; right — SON, large, his arms thrown round MOM, his chin landing on her shoulder.",
    check: "medium-wide shot from the side at eye level, horizon level; left: MOM just inside the front door, large, half the frame height, her keys still dangling from one mitten hand; centre: the two of them meeting in one tight hug; right: SON, large, his arms thrown round MOM, his chin landing on her shoulder; {BG}.",
    plan: {"ft":"Warmth — this love is real.","ln":"hook","idea":"Side-on in the front hall: SON throws his arms round MOM the moment she comes in, and she melts into it.","alt":["a 'love you' message on MOM's phone (rejected: words on a screen)","SON at seven running into MOM's arms (kept for the memory scene)","SON resting his head on MOM's shoulder on the sofa (kept for a later repair line)"],"ia":"SON throws both arms round MOM without a word → MOM's eyebrows jump up, then her eyes close into happy curves and her free hand wraps round his back","dist":"touching","look":"","ctx":"","ce":"none","cx":"a full, open hug to start — the warmth the next frame turns","ip":""},
    slots: {"L":"MOM just inside the front door, large, half the frame height, her keys still dangling from one mitten hand","C":"the two of them meeting in one tight hug","R":"SON, large, his arms thrown round MOM, his chin landing on her shoulder"},
    still: "the slow push is the only movement",
    why: "The hook opens on behaviour, not a symbol: love shown as a hug she did not expect.",
    heroWho: "Son",
    pieces: ["front door"],
  },
  {
    n: 2, ref: "S2",
    sequence: "00 Cold open", scene: "Front hall, evening — the hug", tier: "HOOK", fn: "STORY",
    roles: "Mom, Son", props: ["JAR"], hero: "JAR",
    feel: "A small jolt — the love is real, and so is the secret.",
    meaning: "Over SON's shoulder: MOM hugs him with her eyes closed while, behind his own back, his free hand grips THE JAR out of her sight.",
    shotSize: "MEDIUM", angle: "OTS", face: "NORMAL", scale: "ORDINARY",
    framing: "Medium shot over the shoulder, in open space, horizon level: at the left MOM, large, hugging SON, her face over his shoulder with her eyes closed; in the centre SON's free mitten hand bent behind his own back, gripping THE JAR, turned toward us; at the right the back of SON's spiky head and his shoulder, big in the near foreground.",
    action: "MOM hugs SON close with her eyes shut, smiling; behind his own back SON's free mitten hand grips THE JAR tight, out of her sight but turned toward us, its lid screwed shut over the small dark tangled knot inside. INTERACTION BEAT: MOM hugs him tighter, eyes closed and smiling; in response, SON's hand behind his own back tightens round THE JAR, keeping it out of her sight.",
    performance: "MOM: eyes closed in two calm curves, eyebrows soft and level, mouth a wide contented smile, head resting against SON's head, both mitten hands pressed flat on his back, posture sinking into the hug, pupils hidden behind her closed eyes. SON: his head turned away from us against MOM's shoulder, one mitten hand gripping THE JAR behind his back, posture straight and careful, holding still.",
    world: "HALL", mood: "CLEAN", peak: false,
    stage: "PROBLEM",
    moment: "",
    pop: null,
    move: {"type":"PUSH_IN","on":"hiding","note":"push in on the hidden jar"},
    device: "OTS_REACTION",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a medium shot over the shoulder in open space — MOM, large, hugging SON, her face over his shoulder with her eyes closed; SON's free mitten hand bent behind his own back, gripping THE JAR, turned toward us; the back of SON's spiky head and his shoulder, big in the near foreground.",
    map: "left — MOM, large, hugging SON, her face over his shoulder with her eyes closed; centre — SON's free mitten hand bent behind his own back, gripping THE JAR, turned toward us; right — the back of SON's spiky head and his shoulder, big in the near foreground.",
    check: "medium shot over the shoulder, horizon level; left: MOM, large, hugging SON, her face over his shoulder with her eyes closed; centre: SON's free mitten hand bent behind his own back, gripping THE JAR, turned toward us; right: the back of SON's spiky head and his shoulder, big in the near foreground; {BG}.",
    cam: "OTS",
    plan: {"ft":"A small jolt — the love is real, and so is the secret.","ln":"statement","idea":"Over SON's shoulder: MOM hugs him with her eyes closed while, behind his own back, his free hand grips THE JAR out of her sight.","alt":["SON's hand sliding his phone out of sight during the hug (rejected: reads as the secret relationship the next lines rule out)","THE JAR under his bed while he hugs her downstairs (loses the 'during the hug' irony)"],"ia":"MOM hugs him tighter, eyes closed and smiling → SON's hand behind his own back tightens round THE JAR, keeping it out of her sight","dist":"touching","look":"","ctx":"","ce":"JAR lid","cx":"inside the frame: the open hug against the hidden hand","ip":""},
    slots: {"L":"MOM, large, hugging SON, her face over his shoulder with her eyes closed","C":"SON's free mitten hand bent behind his own back, gripping THE JAR, turned toward us","R":"the back of SON's spiky head and his shoulder, big in the near foreground"},
    still: "the push lands on the jar",
    why: "Thomas liked the jar as a returning idea; here it starts hidden behind the hug.",
    heroWho: "Mom",
    pieces: [],
  },
  {
    n: 3, ref: "S3",
    sequence: "00 Cold open", scene: "Front hall, evening — the hug", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom", props: [], hero: "FACE",
    feel: "A laugh — the parent's suspicion fires at once.",
    meaning: "Eyes only on white: over the hug, one of MOM's eyes snaps open and narrows toward his hidden hand.",
    shotSize: "XCLOSE", angle: "EYE", face: "HUGE", scale: "ORDINARY",
    framing: "Eyes-only extreme close-up at eye level, in clean white space, horizon level: at the left one of MOM's eyes wide open and narrowing, with its eyebrow; in the centre the bridge between the eyes; at the right the other eye still closed in a calm curve, with its eyebrow.",
    action: "Over the hug, one of MOM's eyes snaps open and narrows, sliding down toward SON's hidden hand while the other stays closed.",
    performance: "MOM: one eye snapping open and narrowing to a suspicious slit while the other stays shut in a calm curve, the eyebrow above the open eye dropping low and flat, the pupil sliding down and to the right toward SON's hidden hand.",
    world: "HALL", mood: "WHITE", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"SNAP_ZOOM","on":"drugs","note":"snap in on the open eye"},
    device: "SCALE_SHIFT",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "an eyes-only extreme close-up at eye level in clean white space — one of MOM's eyes wide open and narrowing, with its eyebrow; the bridge between the eyes; the other eye still closed in a calm curve, with its eyebrow.",
    map: "left — one of MOM's eyes wide open and narrowing, with its eyebrow; centre — the bridge between the eyes; right — the other eye still closed in a calm curve, with its eyebrow.",
    check: "eyes-only extreme close-up at eye level, horizon level; left: one of MOM's eyes wide open and narrowing, with its eyebrow; centre: the bridge between the eyes; right: the other eye still closed in a calm curve, with its eyebrow; {BG}.",
    plan: {"ft":"A laugh — the parent's suspicion fires at once.","ln":"rapid-list","idea":"Eyes only on white: over the hug, one of MOM's eyes snaps open and narrows toward his hidden hand.","alt":["a bottle of pills towering over MOM (Version 9: a scare picture of the thing the line rules out)","MOM searching his room with a torch (too long a story for two words)"],"ia":"","dist":"","look":"down toward SON's hidden hand, out of frame right","ctx":"follows S2: SON and the hidden JAR are at the right","ce":"none","cx":"the warm hug → one narrowed, suspicious eye","ip":"extreme-close-up"},
    slots: {"L":"one of MOM's eyes wide open and narrowing, with its eyebrow","C":"the bridge between the eyes","R":"the other eye still closed in a calm curve, with its eyebrow"},
    still: "the snap zoom is the joke",
    why: "Humour from a parent overthinking: the eye goes where parents' fears go, and the voice-over says no.",
    eyesOnly: true,
    pieces: [],
  },
  {
    n: 4, ref: "S4",
    sequence: "00 Cold open", scene: "Front hall, evening — the hug", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom, Son", props: [], hero: "FACE",
    feel: "A laugh — he has caught her suspicion.",
    meaning: "SON leans back out of the hug and gives MOM a long, flat, unimpressed look.",
    shotSize: "REACTION", angle: "OTS", face: "LARGE", scale: "ORDINARY",
    framing: "Reaction close-up over the shoulder, in open space, horizon level: at the left the back of MOM's head with her bun, and her shoulder, big in the near foreground; in the centre a little open space between them; at the right SON's face and the top of his shoulders, large, leaning back from the hug.",
    action: "SON leans back out of the hug, his mitten hands sliding off MOM's shoulders, and gives her a long flat look. INTERACTION BEAT: MOM squints at him over the hug; in response, SON leans back with a long, flat, unimpressed look, one eyebrow climbing.",
    performance: "SON: eyes flat and level, staring, one eyebrow climbing high while the other stays low, mouth a hard straight line pulled to one side, head tipped back and to one side, both mitten hands lifting off MOM's shoulders, posture leaning back from her, pupils fixed on MOM at the left. MOM: the back of her head toward us, head tilted in suspicion, one mitten hand still on his arm, posture leaning in.",
    world: "HALL", mood: "CLEAN", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"HOLD","on":"","note":"hold on the look"},
    device: "OTS_REACTION",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a reaction close-up over the shoulder in open space — the back of MOM's head with her bun, and her shoulder, big in the near foreground; a little open space between them; SON's face and the top of his shoulders, large, leaning back from the hug.",
    map: "left — the back of MOM's head with her bun, and her shoulder, big in the near foreground; centre — a little open space between them; right — SON's face and the top of his shoulders, large, leaning back from the hug.",
    check: "reaction close-up over the shoulder, horizon level; left: the back of MOM's head with her bun, and her shoulder, big in the near foreground; centre: a little open space between them; right: SON's face and the top of his shoulders, large, leaning back from the hug; {BG}.",
    cam: "OTS",
    plan: {"ft":"A laugh — he has caught her suspicion.","ln":"rapid-list","idea":"SON leans back out of the hug and gives MOM a long, flat, unimpressed look.","alt":["SON's phone buzzing with a heart message (Version 9's heart phone: the childish symbol Thomas named)","MOM sniffing his hair (too crude)"],"ia":"MOM squints at him over the hug → SON leans back with a long, flat, unimpressed look, one eyebrow climbing","dist":"close","look":"toward MOM, frame left","ctx":"follows S1 and S3: MOM stands at the left","ce":"none","cx":"her narrowed eye → his deadpan answer","ip":"funny-reaction"},
    slots: {"L":"the back of MOM's head with her bun, and her shoulder, big in the near foreground","C":"a little open space between them","R":"SON's face and the top of his shoulders, large, leaning back from the hug"},
    still: "the held look is the punchline",
    why: "A teenager giving the seriously look — Thomas's own humour example.",
    heroWho: "Son",
    pieces: [],
  },
  {
    n: 5, ref: "S5",
    sequence: "00 Cold open", scene: "Kitchen, years ago", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom, Little Boy", props: ["PHONE","MILK_GLASS"], hero: "FIGURE",
    feel: "A soft pull into the past — this started long ago.",
    meaning: "A faded memory: LITTLE BOY alone at the kitchen table with a glass of milk, watching MOM's turned back as she talks on the phone.",
    shotSize: "WIDE", angle: "EYE", face: "NORMAL", scale: "ORDINARY",
    framing: "Wide shot at eye level, in the kitchen, horizon level: at the left MOM standing at the kitchen counter, small, her back half-turned, THE PHONE pressed to her ear; in the centre the small round table, with open space above it; at the right LITTLE BOY sitting at the table on a chair, small, his short legs dangling, THE MILK GLASS in front of him.",
    action: "LITTLE BOY sits at the kitchen table with THE MILK GLASS in front of him and lifts one small mitten hand toward MOM, who stands at the counter with her back half-turned, talking into THE PHONE. INTERACTION BEAT: LITTLE BOY watches MOM's back and lifts one hand as if to say something; in response, MOM keeps talking on the phone at the counter, not turning round.",
    performance: "LITTLE BOY: eyes wide and hopeful, eyebrows raised, mouth an open oval about to speak, head tipped up toward MOM, one small mitten hand half raised, posture perched forward on the chair, pupils on MOM's back. MOM: eyes on the counter, eyebrows busy and drawn together, mouth open mid-sentence, head turned away toward the counter, one mitten hand holding THE PHONE to her ear, posture turned away from the table, pupils on the counter top.",
    world: "KITCHEN", mood: "MEMORY", peak: false,
    stage: "START",
    moment: "",
    pop: null,
    move: {"type":"DRIFT","on":"","note":"slow drift into the memory"},
    device: "TIME_MARKER",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a wide shot at eye level in the kitchen — MOM standing at the kitchen counter, small, her back half-turned, THE PHONE pressed to her ear; the small round table, with open space above it; LITTLE BOY sitting at the table on a chair, small, his short legs dangling, THE MILK GLASS in front of him — the characters drawn large enough that their faces read.",
    map: "left — MOM standing at the kitchen counter, small, her back half-turned, THE PHONE pressed to her ear; centre — the small round table, with open space above it; right — LITTLE BOY sitting at the table on a chair, small, his short legs dangling, THE MILK GLASS in front of him.",
    check: "wide shot at eye level, horizon level; left: MOM standing at the kitchen counter, small, her back half-turned, THE PHONE pressed to her ear; centre: the small round table, with open space above it; right: LITTLE BOY sitting at the table on a chair, small, his short legs dangling, THE MILK GLASS in front of him; {BG}.",
    plan: {"ft":"A soft pull into the past — this started long ago.","ln":"time-jump","idea":"A faded memory: LITTLE BOY alone at the kitchen table with a glass of milk, watching MOM's turned back as she talks on the phone.","alt":["LITTLE BOY holding THE JAR on his bedroom floor (Version 9: the jar again, so early)","a drawing on the fridge (an object without a moment)"],"ia":"LITTLE BOY watches MOM's back and lifts one hand as if to say something → MOM keeps talking on the phone at the counter, not turning round","dist":"apart","look":"","ctx":"","ce":"none","cx":"the bright present → a faded memory; the teenager → a small child","ip":""},
    slots: {"L":"MOM standing at the kitchen counter, small, her back half-turned, THE PHONE pressed to her ear","C":"the small round table, with open space above it","R":"LITTLE BOY sitting at the table on a chair, small, his short legs dangling, THE MILK GLASS in front of him"},
    still: "a held memory — the drift is enough",
    why: "'Much earlier' becomes a real kitchen moment instead of a jar on a shelf.",
    heroWho: "Little Boy",
    pieces: ["table","chair","counter"],
  },
  {
    n: 6, ref: "S6",
    sequence: "00 Cold open", scene: "Kitchen, years ago", tier: "EMOTIONAL", fn: "STORY",
    roles: "Little Boy", props: [], hero: "FACE",
    feel: "Tenderness — a small head full of things to say.",
    meaning: "LITTLE BOY's face propped on both hands, his eyes on MOM's turned back, his mouth working on words he doesn't say.",
    shotSize: "FACE_HANDS", angle: "EYE", face: "LARGE", scale: "ORDINARY",
    framing: "Face-and-hands close-up at eye level, in a faded grey memory, horizon level: at the left open space on the side he looks toward; in the centre LITTLE BOY's face and both small mitten hands, large, his chin propped on his hands; at the right a little open space behind his head.",
    action: "LITTLE BOY props his chin on both small mitten hands and watches MOM's back, his mouth starting to form a word and stopping.",
    performance: "LITTLE BOY: eyes wide and thoughtful, eyebrows tilted up in the middle, mouth a pursed shape halfway to a word, head resting heavily on his hands, both small mitten hands cupped under his chin, posture slumped over the table, pupils fixed on MOM at the left.",
    world: "KITCHEN", mood: "MEMORY", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"PUSH_IN","on":"","note":"slow push in"},
    device: "INSERT_DETAIL",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a face-and-hands close-up at eye level in a faded grey memory — open space on the side he looks toward; LITTLE BOY's face and both small mitten hands, large, his chin propped on his hands; a little open space behind his head.",
    map: "left — open space on the side he looks toward; centre — LITTLE BOY's face and both small mitten hands, large, his chin propped on his hands; right — a little open space behind his head.",
    check: "face-and-hands close-up at eye level, horizon level; left: open space on the side he looks toward; centre: LITTLE BOY's face and both small mitten hands, large, his chin propped on his hands; right: a little open space behind his head; {BG}.",
    plan: {"ft":"Tenderness — a small head full of things to say.","ln":"statement","idea":"LITTLE BOY's face propped on both hands, his eyes on MOM's turned back, his mouth working on words he doesn't say.","alt":["a cloud of tiny drawings above his head (a picture bubble — out)","him drawing at the table (an action without the thought)"],"ia":"","dist":"","look":"toward MOM, out of frame left","ctx":"follows wide S5: MOM stands at the counter at the left","ce":"none","cx":"the wide faded room → one small face","ip":""},
    slots: {"L":"open space on the side he looks toward","C":"LITTLE BOY's face and both small mitten hands, large, his chin propped on his hands","R":"a little open space behind his head"},
    still: "the face holds the thought",
    why: "'Thoughts' shown as a child about to speak and not speaking — no thought bubble.",
    pieces: [],
  },
  {
    n: 7, ref: "S7",
    sequence: "00 Cold open", scene: "Kitchen, years ago", tier: "EMOTIONAL", fn: "STORY",
    roles: "Little Boy", props: ["MILK_GLASS"], hero: "MILK_GLASS",
    feel: "A jolt of a child's fear — what will she say?",
    meaning: "Hands only: LITTLE BOY's small hand frozen in the air over THE MILK GLASS he has just knocked over, the milk spreading.",
    shotSize: "HANDS", angle: "EYE", face: "NONE", scale: "ORDINARY",
    framing: "Hands-only close shot at eye level, on the kitchen table, horizon level: at the left open table top; in the centre THE MILK GLASS tipped on its side on the table top, a flat white puddle of milk spreading from its rim; at the right LITTLE BOY's small mitten hand rising from the bottom edge, frozen in mid-air above the table.",
    action: "LITTLE BOY's small mitten hand hangs frozen in mid-air just above the table top; THE MILK GLASS has tipped on its side and a flat white puddle of milk spreads from its rim.",
    performance: "LITTLE BOY's small mitten hand is frozen open and stiff in mid-air, pulled back a little from the fallen glass.",
    world: "KITCHEN", mood: "MEMORY", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"SNAP_ZOOM","on":"fears","note":"snap in on the spill"},
    device: "CAUSE_EFFECT_CUT",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a hands-only close shot at eye level on the kitchen table — open table top; THE MILK GLASS tipped on its side on the table top, a flat white puddle of milk spreading from its rim; LITTLE BOY's small mitten hand rising from the bottom edge, frozen in mid-air above the table.",
    map: "left — open table top; centre — THE MILK GLASS tipped on its side on the table top, a flat white puddle of milk spreading from its rim; right — LITTLE BOY's small mitten hand rising from the bottom edge, frozen in mid-air above the table.",
    check: "hands-only close shot at eye level, horizon level; left: open table top; centre: THE MILK GLASS tipped on its side on the table top, a flat white puddle of milk spreading from its rim; right: LITTLE BOY's small mitten hand rising from the bottom edge, frozen in mid-air above the table; {BG}.",
    plan: {"ft":"A jolt of a child's fear — what will she say?","ln":"statement","idea":"Hands only: LITTLE BOY's small hand frozen in the air over THE MILK GLASS he has just knocked over, the milk spreading.","alt":["a monster under the bed (a child's fear, but a cliché that says nothing about the parent)","LITTLE BOY hiding under the table"],"ia":"","dist":"","look":"","ctx":"","ce":"MILK_GLASS stripe","cx":"a still face → a sudden accident","ip":"unexpected-object"},
    slots: {"L":"open table top","C":"THE MILK GLASS tipped on its side on the table top, a flat white puddle of milk spreading from its rim","R":"LITTLE BOY's small mitten hand rising from the bottom edge, frozen in mid-air above the table"},
    still: "the snap carries the shock",
    why: "'Fears' is the second after the spill, before the parent turns round.",
    pieces: ["table"],
  },
  {
    n: 8, ref: "S8",
    sequence: "00 Cold open", scene: "Kitchen, years ago", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom, Little Boy", props: ["PHONE","MILK_GLASS"], hero: "FIGURE",
    feel: "A wince — such a small moment, and so big for him.",
    meaning: "MOM, still on the phone, wipes the milk in one quick swipe with a sharp sigh while LITTLE BOY shrinks down in his chair.",
    shotSize: "MEDIUM", angle: "EYE", face: "NORMAL", scale: "ORDINARY",
    framing: "Medium shot at eye level, at the kitchen table, horizon level: at the left MOM bending over the table, large, seen down to the table top, THE PHONE wedged at her ear, one mitten hand swiping a cloth across the table; in the centre THE MILK GLASS set upright again on the table top; at the right LITTLE BOY sitting on his chair, large, shrinking down low.",
    action: "MOM bends over the table with THE PHONE wedged at her ear and swipes the spilled milk away with a cloth in one quick stroke; LITTLE BOY shrinks down on his chair, both small mitten hands pressed between his knees. INTERACTION BEAT: MOM sighs sharply and wipes the puddle in one swipe, still talking into THE PHONE; in response, LITTLE BOY shrinks down in his chair, both hands pressed between his knees.",
    performance: "MOM: eyes rolling up to the ceiling, eyebrows pulled flat and tight, mouth a puffed-out sigh shape, head tilted to hold THE PHONE at her ear, one mitten hand swiping the cloth, posture bent over the table in a hurry, pupils up and away from him. LITTLE BOY: eyes wide and wet, eyebrows tilted up in the middle, mouth a trembling downturned curve, head sinking between his shoulders, both small mitten hands pressed between his knees, posture shrinking down in the chair, pupils on MOM's swiping hand.",
    world: "KITCHEN", mood: "MEMORY", peak: false,
    stage: "REACTION",
    moment: "",
    pop: null,
    move: {"type":"HOLD","on":"","note":"hold — the moment is quick for her, long for him"},
    device: "CAUSE_EFFECT_CUT",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a medium shot at eye level at the kitchen table — MOM bending over the table, large, seen down to the table top, THE PHONE wedged at her ear, one mitten hand swiping a cloth across the table; THE MILK GLASS set upright again on the table top; LITTLE BOY sitting on his chair, large, shrinking down low.",
    map: "left — MOM bending over the table, large, seen down to the table top, THE PHONE wedged at her ear, one mitten hand swiping a cloth across the table; centre — THE MILK GLASS set upright again on the table top; right — LITTLE BOY sitting on his chair, large, shrinking down low.",
    check: "medium shot at eye level, horizon level; left: MOM bending over the table, large, seen down to the table top, THE PHONE wedged at her ear, one mitten hand swiping a cloth across the table; centre: THE MILK GLASS set upright again on the table top; right: LITTLE BOY sitting on his chair, large, shrinking down low; {BG}.",
    plan: {"ft":"A wince — such a small moment, and so big for him.","ln":"statement","idea":"MOM, still on the phone, wipes the milk in one quick swipe with a sharp sigh while LITTLE BOY shrinks down in his chair.","alt":["MOM shouting (too big: the point is that it was small for her)","MOM's raised eyebrow alone (loses the boy shrinking)"],"ia":"MOM sighs sharply and wipes the puddle in one swipe, still talking into THE PHONE → LITTLE BOY shrinks down in his chair, both hands pressed between his knees","dist":"close","look":"","ctx":"","ce":"none","cx":"her quick swipe against his frozen shrinking","ip":""},
    slots: {"L":"MOM bending over the table, large, seen down to the table top, THE PHONE wedged at her ear, one mitten hand swiping a cloth across the table","C":"THE MILK GLASS set upright again on the table top","R":"LITTLE BOY sitting on his chair, large, shrinking down low"},
    why: "The moment the parent forgets, shown at the size it was for her.",
    heroWho: "Mom",
    pieces: ["table","chair","counter"],
  },
  {
    n: 9, ref: "S9",
    sequence: "00 Cold open", scene: "Kitchen, now", tier: "EMOTIONAL", fn: "STORY",
    roles: "Son", props: ["MILK_GLASS"], hero: "FACE",
    feel: "A lump in the throat — he never forgot.",
    meaning: "Today: SON at the same kitchen table, a glass of milk in front of him, staring at it — the small moment is still with him.",
    shotSize: "FACE_HANDS", angle: "EYE", face: "LARGE", scale: "ORDINARY",
    framing: "Face-and-hands close-up at eye level, at the kitchen table, horizon level: at the left a little open space; in the centre SON's face and both mitten hands, large, his hands resting flat on the table top either side of THE MILK GLASS; at the right a little open space.",
    action: "SON leans over the kitchen table with both mitten hands resting flat on the table top either side of THE MILK GLASS, not touching it, and stares down at it.",
    performance: "SON: eyes heavy and still, eyebrows tilted up in the middle, mouth a flat line pressed tight at one corner, head bowed toward the glass, both mitten hands flat on the table either side of it, posture hunched over the table, pupils fixed down on THE MILK GLASS.",
    world: "KITCHEN", mood: "CLEAN", peak: false,
    stage: "RESULT",
    moment: "",
    pop: null,
    move: {"type":"PUSH_IN","on":"","note":"slow push in"},
    device: "BEFORE_AFTER",
    reveal: {"what":"MILK_GLASS","on":"didn’t","method":"MASK","cover":"#FFFFFF","how":"Premiere: draw a flat white (#FFFFFF) shape over THE MILK GLASS (standing on the table top between his hands, touching nothing else); take it away on “didn’t”. Eyedropper the white fill of the piece right beside it if the render differs."},
    link: "Pays off S7: the glass that tipped in the memory stands in front of him today.",
    requiredText: "",
    picture: "a face-and-hands close-up at eye level at the kitchen table — a little open space; SON's face and both mitten hands, large, his hands resting flat on the table top either side of THE MILK GLASS; a little open space.",
    map: "left — a little open space; centre — SON's face and both mitten hands, large, his hands resting flat on the table top either side of THE MILK GLASS; right — a little open space.",
    check: "face-and-hands close-up at eye level, horizon level; left: a little open space; centre: SON's face and both mitten hands, large, his hands resting flat on the table top either side of THE MILK GLASS; right: a little open space; {BG}.",
    plan: {"ft":"A lump in the throat — he never forgot.","ln":"time-jump","idea":"Today: SON at the same kitchen table, a glass of milk in front of him, staring at it — the small moment is still with him.","alt":["SON's eyes with the memory reflected in them (reflections render badly)","MOM wiping the same table today, humming, with no memory of it (kept for a later 'forgot' line)"],"ia":"","dist":"","look":"down at THE MILK GLASS on the table in front of him","ctx":"the glass is in the frame; follows the memory S5–S8 at this same table","ce":"MILK_GLASS stripe","cx":"faded memory → the bright present; the small child → the teenager who still carries it","ip":""},
    slots: {"L":"a little open space","C":"SON's face and both mitten hands, large, his hands resting flat on the table top either side of THE MILK GLASS","R":"a little open space"},
    why: "The time cut lets the viewer feel what 'they didn't' means.",
    pieces: ["table"],
  },
  {
    n: 10, ref: "S10",
    sequence: "00 Cold open", scene: "Bedroom, evening", tier: "EMOTIONAL", fn: "STORY",
    roles: "Son", props: ["TEST"], hero: "TEST",
    feel: "Recognition — every parent has seen this quick hide.",
    meaning: "SON kneels by his bed and slides a folded test under the mattress, glancing back at the shut door.",
    shotSize: "MEDWIDE", angle: "EYE", face: "NORMAL", scale: "ORDINARY",
    framing: "Medium-wide shot at eye level, in his bedroom, horizon level: at the left the shut bedroom door with its small round knob; in the centre open floor; at the right SON kneeling by his bed, large, half the frame height, sliding THE TEST under the edge of the mattress.",
    action: "SON kneels by his bed and slides THE TEST, folded small, under the edge of the mattress with one mitten hand, his head turned back toward the shut door.",
    performance: "SON: eyes wide and alert, eyebrows raised and tense, mouth a tight pressed line, head turned back over his shoulder toward the door, one mitten hand pushing THE TEST under the mattress and the other flat on the blanket, posture kneeling low and quick, pupils on the door knob.",
    world: "SON_ROOM", mood: "CLEAN", peak: false,
    stage: "START",
    moment: "",
    pop: null,
    move: {"type":"DRIFT","on":"","note":"drift toward the bed"},
    device: "CONTEXT",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a medium-wide shot at eye level in his bedroom — the shut bedroom door with its small round knob; open floor; SON kneeling by his bed, large, half the frame height, sliding THE TEST under the edge of the mattress — the characters drawn large enough that their faces read.",
    map: "left — the shut bedroom door with its small round knob; centre — open floor; right — SON kneeling by his bed, large, half the frame height, sliding THE TEST under the edge of the mattress.",
    check: "medium-wide shot at eye level, horizon level; left: the shut bedroom door with its small round knob; centre: open floor; right: SON kneeling by his bed, large, half the frame height, sliding THE TEST under the edge of the mattress; {BG}.",
    plan: {"ft":"Recognition — every parent has seen this quick hide.","ln":"statement","idea":"SON kneels by his bed and slides a folded test under the mattress, glancing back at the shut door.","alt":["THE JAR slid under the bed (the jar is kept for the moments that change its meaning)","SON turning his phone face down as MOM walks in (kept for the phone chapter)"],"ia":"","dist":"","look":"","ctx":"","ce":"TEST circle","cx":"the open kitchen → a shut door and a hand hiding something","ip":""},
    slots: {"L":"the shut bedroom door with its small round knob","C":"open floor","R":"SON kneeling by his bed, large, half the frame height, sliding THE TEST under the edge of the mattress"},
    still: "the quick hide is the action; the next frame answers it",
    why: "Thomas's everyday moment 'hiding something', staged as a real hide.",
    pieces: ["bed","door"],
  },
  {
    n: 11, ref: "S11",
    sequence: "00 Cold open", scene: "Bedroom, evening", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom, Son", props: [], hero: "FIGURE",
    feel: "The sting of being misread.",
    meaning: "Over SON's shoulder: MOM opens the door just as he spins round from the bed; her arms fold and her eyes narrow — she reads it as distrust.",
    shotSize: "MEDIUM", angle: "OTS", face: "NORMAL", scale: "ORDINARY",
    framing: "Medium shot over the shoulder, in his bedroom, horizon level: at the left MOM in the open bedroom doorway, large, arms folding, her eyes narrowing; in the centre open floor between them; at the right the back of SON's head with its spiky hair, and his shoulders, big in the near foreground, turned toward her.",
    action: "MOM pushes the bedroom door open and stops in the doorway, folding her arms; SON, spun round from the bed in the near foreground, faces her. INTERACTION BEAT: MOM opens the door and catches SON spinning round; in response, her arms fold and her eyes narrow, reading it as defiance.",
    performance: "MOM: eyes narrowing, eyebrows pulled down and together, mouth a tight flat line, head tilted back a little, both mitten hands tucked into folded arms, posture stiff and upright in the doorway, pupils fixed on SON. SON: the back of his head toward us, head pulled down between his shoulders, both mitten hands behind his back, posture stiff and still.",
    world: "SON_ROOM", mood: "CLEAN", peak: false,
    stage: "PROBLEM",
    moment: "",
    pop: null,
    move: {"type":"HOLD","on":"","note":"hold"},
    device: "OTS_REACTION",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a medium shot over the shoulder in his bedroom — MOM in the open bedroom doorway, large, arms folding, her eyes narrowing; open floor between them; the back of SON's head with its spiky hair, and his shoulders, big in the near foreground, turned toward her.",
    map: "left — MOM in the open bedroom doorway, large, arms folding, her eyes narrowing; centre — open floor between them; right — the back of SON's head with its spiky hair, and his shoulders, big in the near foreground, turned toward her.",
    check: "medium shot over the shoulder, horizon level; left: MOM in the open bedroom doorway, large, arms folding, her eyes narrowing; centre: open floor between them; right: the back of SON's head with its spiky hair, and his shoulders, big in the near foreground, turned toward her; {BG}.",
    cam: "OTS",
    plan: {"ft":"The sting of being misread.","ln":"statement","idea":"Over SON's shoulder: MOM opens the door just as he spins round from the bed; her arms fold and her eyes narrow — she reads it as distrust.","alt":["MOM listening at the door (makes her the spy)","a locked diary on the bed (a prop instead of a misreading)"],"ia":"MOM opens the door and catches SON spinning round → her arms fold and her eyes narrow, reading it as defiance","dist":"far","look":"","ctx":"","ce":"none","cx":"his hidden hands → her folded arms","ip":""},
    slots: {"L":"MOM in the open bedroom doorway, large, arms folding, her eyes narrowing","C":"open floor between them","R":"the back of SON's head with its spiky hair, and his shoulders, big in the near foreground, turned toward her"},
    why: "Thomas's 'silence misread as disrespect': the parent reads distrust where there is fear.",
    heroWho: "Mom",
    pieces: ["bed","door"],
  },
  {
    n: 12, ref: "S12",
    sequence: "00 Cold open", scene: "Bedroom, evening", tier: "EMOTIONAL", fn: "STORY",
    roles: "Son", props: [], hero: "FACE",
    feel: "A turn — it was never defiance; it was fear.",
    meaning: "The reverse on SON's face: not defiant at all — scared, eyebrows up, lips pressed, eyes on MOM in the doorway.",
    shotSize: "CLOSE", angle: "EYE", face: "LARGE", scale: "ORDINARY",
    framing: "Close shot at eye level, in open space, horizon level: at the left open space on the side he looks toward; in the centre SON's face and the top of his shoulders, large, a little right of centre; at the right a little open space behind his head.",
    action: "SON looks toward MOM, his eyebrows lifting in the middle and his lips pressing together.",
    performance: "SON: eyes wide and glossy, eyebrows tilted up in the middle, mouth pressed into a trembling line, head pulled down a little, one mitten hand rising to rub the back of his neck, shoulders hunched up, pupils fixed on MOM at the left.",
    world: "SON_ROOM", mood: "CLEAN", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"PUSH_IN","on":"","note":"slow push in"},
    device: "OTS_REACTION",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a close shot at eye level in open space — open space on the side he looks toward; SON's face and the top of his shoulders, large, a little right of centre; a little open space behind his head.",
    map: "left — open space on the side he looks toward; centre — SON's face and the top of his shoulders, large, a little right of centre; right — a little open space behind his head.",
    check: "close shot at eye level, horizon level; left: open space on the side he looks toward; centre: SON's face and the top of his shoulders, large, a little right of centre; right: a little open space behind his head; {BG}.",
    plan: {"ft":"A turn — it was never defiance; it was fear.","ln":"statement","idea":"The reverse on SON's face: not defiant at all — scared, eyebrows up, lips pressed, eyes on MOM in the doorway.","alt":["SON's hands twisting behind his back (kept as the edit on S11)","a shrinking SON (scale tricks read as fantasy here)"],"ia":"","dist":"","look":"toward MOM, out of frame left","ctx":"reverse of S11 with the sides kept: MOM stands in the doorway at the left","ce":"none","cx":"her hard read → his frightened face","ip":""},
    slots: {"L":"open space on the side he looks toward","C":"SON's face and the top of his shoulders, large, a little right of centre","R":"a little open space behind his head"},
    still: "the face does the turn",
    why: "The reverse shows what she cannot see: fear.",
    pieces: [],
  },
  {
    n: 13, ref: "S13",
    sequence: "00 Cold open", scene: "Stairs, that evening", tier: "QUIET", fn: "STORY",
    roles: "Mom, Son", props: [], hero: "FIGURE",
    feel: "Tenderness — he adores her, quietly.",
    meaning: "From above: SON on the top stair, hugging his knees, watching MOM below humming as she sorts the post.",
    shotSize: "MEDWIDE", angle: "HIGH", face: "NORMAL", scale: "ORDINARY",
    framing: "Medium-wide shot from a little above head height, on the stairs, horizon level: at the left MOM at the foot of the stairs, small, sorting letters at the hall table and humming; in the centre the staircase running down between them; at the right SON sitting on the top stair, large, in the near foreground, hugging his knees.",
    action: "SON sits on the top stair hugging his knees and watches MOM, who stands at the hall table at the foot of the stairs, sorting letters and humming. INTERACTION BEAT: MOM hums as she sorts the post at the foot of the stairs, unaware; in response, SON watches her from the top stair, his face softening, chin on his knees.",
    performance: "SON: eyes soft and warm, eyebrows relaxed and raised in the middle, mouth a gentle curve, head resting sideways on his knees, both mitten hands wrapped round his knees, posture curled up small on the step, pupils on MOM below. MOM: eyes on the letters, eyebrows easy, mouth a round humming shape, head bobbing a little, both mitten hands sorting the letters, posture loose at the hall table, pupils down on the post.",
    world: "HALL", mood: "CLEAN", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"DRIFT","on":"","note":"gentle drift down the stairs"},
    device: "POWER_ANGLE",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a medium-wide shot from a little above head height on the stairs — MOM at the foot of the stairs, small, sorting letters at the hall table and humming; the staircase running down between them; SON sitting on the top stair, large, in the near foreground, hugging his knees — the characters drawn large enough that their faces read.",
    map: "left — MOM at the foot of the stairs, small, sorting letters at the hall table and humming; centre — the staircase running down between them; right — SON sitting on the top stair, large, in the near foreground, hugging his knees.",
    check: "medium-wide shot from a little above head height, horizon level; left: MOM at the foot of the stairs, small, sorting letters at the hall table and humming; centre: the staircase running down between them; right: SON sitting on the top stair, large, in the near foreground, hugging his knees; {BG}.",
    cam: "SLIGHTLY_ABOVE",
    plan: {"ft":"Tenderness — he adores her, quietly.","ln":"statement","idea":"From above: SON on the top stair, hugging his knees, watching MOM below humming as she sorts the post.","alt":["a fridge covered in his old drawings (an object without the behaviour)","SON leaving a drawn card on her pillow (Version 9 leaned on cards and hearts)"],"ia":"MOM hums as she sorts the post at the foot of the stairs, unaware → SON watches her from the top stair, his face softening, chin on his knees","dist":"far","look":"","ctx":"","ce":"none","cx":"a scared face → a soft one; near → far","ip":""},
    slots: {"L":"MOM at the foot of the stairs, small, sorting letters at the hall table and humming","C":"the staircase running down between them","R":"SON sitting on the top stair, large, in the near foreground, hugging his knees"},
    still: "quiet watching — stillness is the feeling",
    why: "'They love their parents so much' as behaviour: a child watching his mother with love she doesn't see.",
    heroWho: "Son",
    pieces: ["stairs","hall table"],
  },
  {
    n: 14, ref: "S14",
    sequence: "00 Cold open", scene: "Stairs, that evening", tier: "HOOK", fn: "STORY",
    roles: "Mom, Son", props: [], hero: "FIGURE",
    feel: "The terror of letting her down — the peak of the opening.",
    meaning: "The field turns the colour of fear: MOM starts up the stairs smiling; at the top SON freezes, the folded test crushed behind his back.",
    shotSize: "WIDE", angle: "EYE", face: "NORMAL", scale: "ORDINARY",
    framing: "Wide shot at eye level, on the stairs, horizon level: at the left MOM at the bottom of the stairs, one foot on the first step, smiling up; in the centre the staircase rising between them; at the right SON at the top of the stairs, frozen, one hand behind his back.",
    action: "MOM puts one foot on the first stair and smiles up at SON; at the top of the stairs SON freezes, one mitten hand hidden behind his back. INTERACTION BEAT: MOM starts up the stairs, smiling up at him; in response, SON freezes at the top, shoulders jumping up, one hand hidden behind his back.",
    performance: "SON: eyes wide open in fright, eyebrows shooting up and drawn together, mouth a tight open oval, head pulled back, one mitten hand crushing a folded paper behind his back and the other gripping the banister rail, posture rigid and pressed back, pupils locked on MOM below. MOM: eyes bright and warm, eyebrows lifted, mouth a wide easy smile, head tipped up toward him, one mitten hand on the banister, posture stepping up lightly, pupils on SON.",
    world: "HALL", mood: "PEAK", peak: true,
    stage: "PROBLEM",
    moment: "",
    pop: null,
    move: {"type":"PULL_OUT","on":"","note":"slow pull out — the stairs grow between them"},
    device: "DISTANCE",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a wide shot at eye level on the stairs — MOM at the bottom of the stairs, one foot on the first step, smiling up; the staircase rising between them; SON at the top of the stairs, frozen, one hand behind his back — the characters drawn large enough that their faces read.",
    map: "left — MOM at the bottom of the stairs, one foot on the first step, smiling up; centre — the staircase rising between them; right — SON at the top of the stairs, frozen, one hand behind his back.",
    check: "wide shot at eye level, horizon level; left: MOM at the bottom of the stairs, one foot on the first step, smiling up; centre: the staircase rising between them; right: SON at the top of the stairs, frozen, one hand behind his back; {BG}.",
    plan: {"ft":"The terror of letting her down — the peak of the opening.","ln":"peak","idea":"The field turns the colour of fear: MOM starts up the stairs smiling; at the top SON freezes, the folded test crushed behind his back.","alt":["SON tiptoeing across thin ice toward MOM (Version 9: a cliché metaphor; the real moment is stronger)","SON's face alone, terrified (kept as the edit's feeling)"],"ia":"MOM starts up the stairs, smiling up at him → SON freezes at the top, shoulders jumping up, one hand hidden behind his back","dist":"far","look":"","ctx":"","ce":"none","cx":"the white stage of the opening → the whole stage in red, the colour of the fear","ip":"strong-pose"},
    slots: {"L":"MOM at the bottom of the stairs, one foot on the first step, smiling up","C":"the staircase rising between them","R":"SON at the top of the stairs, frozen, one hand behind his back"},
    why: "The line that carries the opening's intensity converts the stage to red (v25 ladder); the gap between her smile and his fear is the story.",
    heroWho: "Son",
    peakCol: "RED",
    pieces: ["stairs"],
  },
  {
    n: 15, ref: "S15",
    sequence: "00 Cold open", scene: "Kitchen, dinner", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom, Son", props: [], hero: "FIGURE",
    feel: "Hope — he is about to say it.",
    meaning: "Side-on at dinner: SON opens his mouth and lifts a hand to begin; MOM looks up from her plate, waiting.",
    shotSize: "MEDIUM", angle: "PROFILE", face: "NORMAL", scale: "ORDINARY",
    framing: "Medium shot from the side at eye level, at the kitchen table, horizon level: at the left MOM sitting at the table, large, seen down to the table top, facing right; in the centre the small round table between them; at the right SON sitting at the table, large, seen down to the table top, facing left toward her.",
    action: "SON, sitting at the table, opens his mouth and lifts one mitten hand to begin; MOM, sitting across from him, looks up from her plate with her fork stopped halfway. INTERACTION BEAT: SON opens his mouth and lifts one hand to begin; in response, MOM looks up from her plate, her fork stopping, eyebrows lifting, waiting.",
    performance: "SON: eyes open and hopeful, eyebrows lifted, mouth an open oval at the start of a word, head lifting toward MOM, one mitten hand raised as if to begin, posture leaning forward, pupils on MOM. MOM: eyes open and curious, eyebrows lifting, mouth a soft closed curve, head tilted toward him, one mitten hand holding her fork still in mid-air, posture upright and waiting, pupils on SON.",
    world: "KITCHEN", mood: "CLEAN", peak: false,
    stage: "START",
    moment: "",
    pop: null,
    move: {"type":"DRIFT","on":"","note":"slow drift"},
    device: "DISTANCE",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a medium shot from the side at eye level at the kitchen table — MOM sitting at the table, large, seen down to the table top, facing right; the small round table between them; SON sitting at the table, large, seen down to the table top, facing left toward her.",
    map: "left — MOM sitting at the table, large, seen down to the table top, facing right; centre — the small round table between them; right — SON sitting at the table, large, seen down to the table top, facing left toward her.",
    check: "medium shot from the side at eye level, horizon level; left: MOM sitting at the table, large, seen down to the table top, facing right; centre: the small round table between them; right: SON sitting at the table, large, seen down to the table top, facing left toward her; {BG}.",
    plan: {"ft":"Hope — he is about to say it.","ln":"statement","idea":"Side-on at dinner: SON opens his mouth and lifts a hand to begin; MOM looks up from her plate, waiting.","alt":["seven closed jars on a shelf (Version 9: a symbol row standing in for the list)","SON writing a list he never gives her (words in the image)"],"ia":"SON opens his mouth and lifts one hand to begin → MOM looks up from her plate, her fork stopping, eyebrows lifting, waiting","dist":"apart","look":"","ctx":"","ce":"none","cx":"a terrified boy → a boy who almost speaks","ip":""},
    slots: {"L":"MOM sitting at the table, large, seen down to the table top, facing right","C":"the small round table between them","R":"SON sitting at the table, large, seen down to the table top, facing left toward her"},
    still: "the moment before he speaks holds",
    why: "Thomas's 'starting to say something, then changing your mind' — the start.",
    heroWho: "Son",
    pieces: ["table","chair"],
  },
  {
    n: 16, ref: "S16",
    sequence: "00 Cold open", scene: "Kitchen, dinner", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom", props: [], hero: "FACE",
    feel: "The worry he feels — her face is already reacting.",
    meaning: "MOM's face on white, the reaction already forming: eyebrows climbing, mouth tightening, before he has said a word.",
    shotSize: "REACTION", angle: "EYE", face: "LARGE", scale: "ORDINARY",
    framing: "Reaction close-up at eye level, in clean white space, horizon level: at the left MOM's face and the top of her shoulders, large, a little left of centre; in the centre open space; at the right open white space on the side she looks.",
    action: "MOM's eyebrows begin to climb and her mouth tightens as she waits for what he will say.",
    performance: "MOM: eyes widening and sharpening, eyebrows climbing and drawing together, mouth tightening into a flat line, head pulling back a little, one mitten hand rising to her collarbone, posture stiffening upright, pupils fixed on SON at the right.",
    world: "KITCHEN", mood: "WHITE", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"PUSH_IN","on":"","note":"slow push in"},
    device: "OTS_REACTION",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a reaction close-up at eye level in clean white space — MOM's face and the top of her shoulders, large, a little left of centre; open space; open white space on the side she looks.",
    map: "left — MOM's face and the top of her shoulders, large, a little left of centre; centre — open space; right — open white space on the side she looks.",
    check: "reaction close-up at eye level, horizon level; left: MOM's face and the top of her shoulders, large, a little left of centre; centre: open space; right: open white space on the side she looks; {BG}.",
    plan: {"ft":"The worry he feels — her face is already reacting.","ln":"statement","idea":"MOM's face on white, the reaction already forming: eyebrows climbing, mouth tightening, before he has said a word.","alt":["SON imagining MOM as a giant (fantasy; the real face is scarier)","MOM's fork frozen in mid-air (the hands carry less than the face)"],"ia":"","dist":"","look":"toward SON, out of frame right","ctx":"follows S15: SON sits at the right of the table","ce":"none","cx":"his open start → her face already tightening","ip":"large-face"},
    slots: {"L":"MOM's face and the top of her shoulders, large, a little left of centre","C":"open space","R":"open white space on the side she looks"},
    still: "a white break: the face is the reaction he fears",
    why: "The line names the reaction, so the camera shows it — on white, where nothing competes.",
    pieces: [],
  },
  {
    n: 17, ref: "S17",
    sequence: "00 Cold open", scene: "Kitchen, dinner", tier: "EMOTIONAL", fn: "STORY",
    roles: "Son", props: ["JAR"], hero: "JAR",
    feel: "The ache of an unsaid thing — these are the ones.",
    meaning: "Split by the table edge: SON shrugs a small never-mind above the table while, below it, his hand rests on the lid of THE JAR in his lap.",
    shotSize: "MEDIUM", angle: "EYE", face: "NORMAL", scale: "ORDINARY",
    framing: "Medium shot at eye level, at the kitchen table, horizon level: at the left open space toward the far side of the table; in the centre SON seen from the front, large, from the top of his head down to his lap, the straight edge of the table top crossing the frame at his middle: above it his small shrug, below it his lap; at the right below the table edge, SON's mitten hand resting on the lid of THE JAR in his lap.",
    action: "SON closes his mouth and gives a small shrug above the table edge, while below it one mitten hand rests on the lid of THE JAR in his lap.",
    performance: "SON: eyes dropping away, eyebrows sinking flat, mouth closing into a tight line, head dipping, one mitten hand resting on the jar's lid in his lap and the other lifting in a small shrug, shoulders rising and falling, pupils sliding down to the table.",
    world: "KITCHEN", mood: "CLEAN", peak: false,
    stage: "RESULT",
    moment: "",
    pop: null,
    move: {"type":"TILT_DOWN","on":"ones","note":"tilt down to the jar in his lap"},
    device: "SPLIT_STATE",
    reveal: null,
    link: "THE JAR returns from S2 with a new meaning: not hidden from her now, but held right here, almost said.",
    requiredText: "",
    picture: "a medium shot at eye level at the kitchen table — open space toward the far side of the table; SON seen from the front, large, from the top of his head down to his lap, the straight edge of the table top crossing the frame at his middle: above it his small shrug, below it his lap; below the table edge, SON's mitten hand resting on the lid of THE JAR in his lap.",
    map: "left — open space toward the far side of the table; centre — SON seen from the front, large, from the top of his head down to his lap, the straight edge of the table top crossing the frame at his middle: above it his small shrug, below it his lap; right — below the table edge, SON's mitten hand resting on the lid of THE JAR in his lap.",
    check: "medium shot at eye level, horizon level; left: open space toward the far side of the table; centre: SON seen from the front, large, from the top of his head down to his lap, the straight edge of the table top crossing the frame at his middle: above it his small shrug, below it his lap; right: below the table edge, SON's mitten hand resting on the lid of THE JAR in his lap; {BG}.",
    plan: {"ft":"The ache of an unsaid thing — these are the ones.","ln":"statement","idea":"Split by the table edge: SON shrugs a small never-mind above the table while, below it, his hand rests on the lid of THE JAR in his lap.","alt":["seven jars glowing on a shelf (Version 9: a symbol row)","SON pushing his plate away (shows mood, not the unsaid things)"],"ia":"","dist":"","look":"down at the table edge in front of him","ctx":"follows S15–S16 at the same table (MOM sits at the left); the jar in his lap is in the frame","ce":"JAR lid","cx":"the words he swallows above the table → the jar he holds below it","ip":""},
    slots: {"L":"open space toward the far side of the table","C":"SON seen from the front, large, from the top of his head down to his lap, the straight edge of the table top crossing the frame at his middle: above it his small shrug, below it his lap","R":"below the table edge, SON's mitten hand resting on the lid of THE JAR in his lap"},
    still: "the tilt down to the jar is the change",
    why: "The jar comes back only because its meaning moves: from hidden to almost shared.",
    pieces: ["table"],
  },
  {
    n: 18, ref: "S18",
    sequence: "00 Cold open", scene: "Front hall, night", tier: "HOOK", fn: "STORY",
    roles: "Mom", props: [], hero: "FIGURE",
    feel: "Curiosity and resolve — tonight could go differently.",
    meaning: "Night: MOM at the foot of the stairs, one hand on the banister, eyes closed, taking a breath before she goes up to him.",
    shotSize: "MEDWIDE", angle: "EYE", face: "NORMAL", scale: "ORDINARY",
    framing: "Medium-wide shot at eye level, at the foot of the stairs, horizon level: at the left MOM at the foot of the stairs, large, half the frame height, one mitten hand on the banister; in the centre the staircase rising into the dark; at the right open dark space above the stairs.",
    action: "MOM stands at the foot of the stairs with one mitten hand on the banister, eyes closed, taking a slow breath before she goes up.",
    performance: "MOM: eyes closed, eyebrows lifted and steady, mouth a soft round shape breathing out, head lifted toward the top of the stairs, one mitten hand resting on the banister and the other at her side, posture still and gathering itself, pupils hidden behind closed eyes.",
    world: "HALL", mood: "NIGHT", peak: false,
    stage: "START",
    moment: "",
    pop: null,
    move: {"type":"PUSH_IN","on":"","note":"slow push in"},
    device: "TIME_MARKER",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a medium-wide shot at eye level at the foot of the stairs — MOM at the foot of the stairs, large, half the frame height, one mitten hand on the banister; the staircase rising into the dark; open dark space above the stairs — the characters drawn large enough that their faces read.",
    map: "left — MOM at the foot of the stairs, large, half the frame height, one mitten hand on the banister; centre — the staircase rising into the dark; right — open dark space above the stairs.",
    check: "medium-wide shot at eye level, horizon level; left: MOM at the foot of the stairs, large, half the frame height, one mitten hand on the banister; centre: the staircase rising into the dark; right: open dark space above the stairs; {BG}.",
    plan: {"ft":"Curiosity and resolve — tonight could go differently.","ln":"hook","idea":"Night: MOM at the foot of the stairs, one hand on the banister, eyes closed, taking a breath before she goes up to him.","alt":["a number six on a card (no number cards)","MOM's hand on his bedroom door handle (kept for the chapter it belongs to)"],"ia":"","dist":"","look":"","ctx":"","ce":"none","cx":"the warm dinner → the night hall; a parent who stops before reacting","ip":""},
    slots: {"L":"MOM at the foot of the stairs, large, half the frame height, one mitten hand on the banister","C":"the staircase rising into the dark","R":"open dark space above the stairs"},
    why: "Thomas's 'a parent stopping before reacting' as the teaser — no chapter number on screen.",
    pieces: ["stairs"],
  },
  {
    n: 19, ref: "S19",
    sequence: "01 Listen, not fix me", scene: "The child's voice", tier: "HOOK", fn: "STORY",
    roles: "Son", props: [], hero: "FIGURE",
    feel: "A hush — the child is about to speak for himself.",
    meaning: "A white break: SON alone and small in empty white space, lifting his eyes to the left, toward the parent he is about to speak to.",
    shotSize: "MEDWIDE", angle: "SQUARE", face: "NORMAL", scale: "ORDINARY",
    framing: "Medium-wide shot straight on at eye level, in clean white space, horizon level: at the left open white space; in the centre SON standing, small, about a third of the frame height, both mitten hands loosely together in front of him, looking toward the left; at the right open white space.",
    action: "SON stands alone in the empty white space with both mitten hands loosely together in front of him and lifts his eyes toward the left.",
    performance: "SON: eyes lifting and open, eyebrows raised a little in the middle, mouth a soft closed line about to open, head lifting from a bow, both mitten hands loosely clasped in front of him, posture still and straight, pupils lifting toward the left.",
    world: "HALL", mood: "WHITE", peak: false,
    stage: "START",
    moment: "",
    pop: null,
    move: {"type":"PUSH_IN","on":"","note":"slow push in"},
    device: "CONTEXT",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a medium-wide shot straight on at eye level in clean white space — open white space; SON standing, small, about a third of the frame height, both mitten hands loosely together in front of him, looking toward the left; open white space — the characters drawn large enough that their faces read.",
    map: "left — open white space; centre — SON standing, small, about a third of the frame height, both mitten hands loosely together in front of him, looking toward the left; right — open white space.",
    check: "medium-wide shot straight on at eye level, horizon level; left: open white space; centre: SON standing, small, about a third of the frame height, both mitten hands loosely together in front of him, looking toward the left; right: open white space; {BG}.",
    plan: {"ft":"A hush — the child is about to speak for himself.","ln":"chapter-turn","idea":"A white break: SON alone and small in empty white space, lifting his eyes to the left, toward the parent he is about to speak to.","alt":["THE JAR alone on a shelf (Version 9: six of the seven chapter openers were this same picture)","a number card (chapter numbers are never on-screen words)"],"ia":"","dist":"","look":"","ctx":"","ce":"none","cx":"the night hall → empty white; the parent's view → the child's","ip":"white-break"},
    slots: {"L":"open white space","C":"SON standing, small, about a third of the frame height, both mitten hands loosely together in front of him, looking toward the left","R":"open white space"},
    still: "a white break: the stillness is the interrupt",
    why: "The chapter turns into the child's voice; a small figure in white makes the switch felt without a number.",
    pieces: [],
  },
  {
    n: 20, ref: "S20",
    sequence: "01 Listen, not fix me", scene: "The child's voice", tier: "EMOTIONAL", fn: "STORY",
    roles: "Son", props: [], hero: "FACE",
    feel: "A quiet plea that lands.",
    meaning: "SON's face fills the white frame as he speaks toward MOM, out of frame left — the parent he is asking.",
    shotSize: "CLOSE", angle: "EYE", face: "LARGE", scale: "ORDINARY",
    framing: "Close shot at eye level, in clean white space, horizon level: at the left open white space on the side he looks toward; in the centre SON's face and the top of his shoulders, large, a little right of centre; at the right a little open white space.",
    action: "SON speaks toward the left, one mitten hand rising open beside his face.",
    performance: "SON: eyes open and steady, eyebrows tilted up in the middle, mouth an open oval mid-word, head tilted a little to one side, one mitten hand rising open beside his cheek, shoulders soft and dropped, pupils on MOM at the left.",
    world: "HALL", mood: "WHITE", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"HOLD","on":"","note":"hold — the word lands on his face"},
    device: "SCALE_SHIFT",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a close shot at eye level in clean white space — open white space on the side he looks toward; SON's face and the top of his shoulders, large, a little right of centre; a little open white space.",
    map: "left — open white space on the side he looks toward; centre — SON's face and the top of his shoulders, large, a little right of centre; right — a little open white space.",
    check: "close shot at eye level, horizon level; left: open white space on the side he looks toward; centre: SON's face and the top of his shoulders, large, a little right of centre; right: a little open white space; {BG}.",
    plan: {"ft":"A quiet plea that lands.","ln":"child-voice","idea":"SON's face fills the white frame as he speaks toward MOM, out of frame left — the parent he is asking.","alt":["a giant ear (a picture of the word, not the feeling)","SON tapping MOM's shoulder (kept for a later 'notice me' line)"],"ia":"","dist":"","look":"toward MOM, out of frame left","ctx":"follows S19, where he lifts his eyes to the left; MOM comes in at the left in the next frame","ce":"none","cx":"a small figure in white → his face filling the frame","ip":""},
    slots: {"L":"open white space on the side he looks toward","C":"SON's face and the top of his shoulders, large, a little right of centre","R":"a little open white space"},
    still: "the keyword lands on a held face",
    why: "One idea word at a strong moment, on the spoken word, added in Premiere.",
    onScreen: {"w":"LISTEN","on":"listen","col":"BLACK"},
    pieces: [],
  },
  {
    n: 21, ref: "S21",
    sequence: "01 Listen, not fix me", scene: "The child's voice", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom, Son", props: [], hero: "FIGURE",
    feel: "A small, knowing smile — tidying him isn't what he needs.",
    meaning: "While SON is still talking, MOM's hand reaches in to flatten his messy hair; SON gently catches her wrist with a small, tired smile.",
    shotSize: "MEDIUM", angle: "EYE", face: "NORMAL", scale: "ORDINARY",
    framing: "Medium shot at eye level, in clean white space, horizon level: at the left MOM half in view at the left edge, large, her shoulder and arm reaching in toward SON's hair; in the centre MOM's mitten hand on top of SON's spiky hair, SON's mitten hand holding her wrist; at the right SON, large, seen down to the elbows, his head tilted under her hand.",
    action: "MOM, half in view at the left edge, reaches in and presses down SON's messy spiky hair with one mitten hand; SON lifts one mitten hand and gently catches her wrist, holding it still. INTERACTION BEAT: MOM's mitten hand reaches in to flatten SON's messy hair while he talks; in response, SON gently catches her wrist and holds it, a small tired smile on his face.",
    performance: "SON: eyes soft and a little tired, eyebrows tilted up in the middle, mouth a gentle sad closed curve, head tilted under her hand, one mitten hand holding MOM's wrist, posture patient and still, pupils on MOM at the left. MOM: half in view, eyes eager and caring, eyebrows lifted, mouth an open helpful smile, head leaning in, one mitten hand pressing down his hair, posture reaching forward, pupils on SON's hair.",
    world: "HALL", mood: "WHITE", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"HOLD","on":"","note":"hold"},
    device: "TUG_OF_WAR",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a medium shot at eye level in clean white space — MOM half in view at the left edge, large, her shoulder and arm reaching in toward SON's hair; MOM's mitten hand on top of SON's spiky hair, SON's mitten hand holding her wrist; SON, large, seen down to the elbows, his head tilted under her hand.",
    map: "left — MOM half in view at the left edge, large, her shoulder and arm reaching in toward SON's hair; centre — MOM's mitten hand on top of SON's spiky hair, SON's mitten hand holding her wrist; right — SON, large, seen down to the elbows, his head tilted under her hand.",
    check: "medium shot at eye level, horizon level; left: MOM half in view at the left edge, large, her shoulder and arm reaching in toward SON's hair; centre: MOM's mitten hand on top of SON's spiky hair, SON's mitten hand holding her wrist; right: SON, large, seen down to the elbows, his head tilted under her hand; {BG}.",
    plan: {"ft":"A small, knowing smile — tidying him isn't what he needs.","ln":"child-voice","idea":"While SON is still talking, MOM's hand reaches in to flatten his messy hair; SON gently catches her wrist with a small, tired smile.","alt":["MOM holding out a sticking plaster toward his face (a prop standing for the fix — the behaviour is stronger)","a toolbox and a spanner aimed at his head (Version 9: the fix as a cartoon)","MOM with a clipboard (kept for 'what you should do tomorrow')"],"ia":"MOM's mitten hand reaches in to flatten SON's messy hair while he talks → SON gently catches her wrist and holds it, a small tired smile on his face","dist":"touching","look":"","ctx":"","ce":"none","cx":"his plea → the fix arriving anyway, as a hand on his hair; a soft refusal","ip":""},
    slots: {"L":"MOM half in view at the left edge, large, her shoulder and arm reaching in toward SON's hair","C":"MOM's mitten hand on top of SON's spiky hair, SON's mitten hand holding her wrist","R":"SON, large, seen down to the elbows, his head tilted under her hand"},
    still: "the caught wrist is the answer",
    why: "Muhammad's verifier pitch: 'fix me' as behaviour and touch — the parent tidying the child — with no prop.",
    heroWho: "Son",
    pieces: [],
  },
  {
    n: 22, ref: "S22",
    sequence: "01 Listen, not fix me", scene: "Front hall, after school", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom, Son", props: [], hero: "FIGURE",
    feel: "Recognition — the walk that says it all.",
    meaning: "SON drags himself in through the front door, schoolbag sliding off one shoulder; MOM turns from the hall table.",
    shotSize: "WIDE", angle: "HIGH", face: "NORMAL", scale: "ORDINARY",
    framing: "Wide shot from a little above head height, in the front hall, horizon level: at the left MOM at the hall table, small, turning round from the post; in the centre the foot of the stairs between them; at the right SON in the open front door, small, his schoolbag sliding off one shoulder, his head low.",
    action: "SON comes in through the open front door with his head low, his schoolbag sliding off one shoulder; MOM, at the hall table, turns round toward him. INTERACTION BEAT: SON drags himself in through the front door, shoulders sagging; in response, MOM turns from the hall table, her eyebrows lifting.",
    performance: "SON: eyes dull and lowered, eyebrows heavy and flat, mouth a long flat line, head hanging low, one mitten hand letting the schoolbag strap slide, posture slumped and dragging, pupils on the floor. MOM: eyes opening wider, eyebrows lifting, mouth an open question shape, head turning toward him, one mitten hand still on the post, posture turning round from the table, pupils on SON.",
    world: "HALL", mood: "CLEAN", peak: false,
    stage: "START",
    moment: "",
    pop: null,
    move: {"type":"DRIFT","on":"","note":"slow drift toward the door"},
    device: "CONTEXT",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a wide shot from a little above head height in the front hall — MOM at the hall table, small, turning round from the post; the foot of the stairs between them; SON in the open front door, small, his schoolbag sliding off one shoulder, his head low — the characters drawn large enough that their faces read.",
    map: "left — MOM at the hall table, small, turning round from the post; centre — the foot of the stairs between them; right — SON in the open front door, small, his schoolbag sliding off one shoulder, his head low.",
    check: "wide shot from a little above head height, horizon level; left: MOM at the hall table, small, turning round from the post; centre: the foot of the stairs between them; right: SON in the open front door, small, his schoolbag sliding off one shoulder, his head low; {BG}.",
    cam: "SLIGHTLY_ABOVE",
    plan: {"ft":"Recognition — the walk that says it all.","ln":"scene-setting","idea":"SON drags himself in through the front door, schoolbag sliding off one shoulder; MOM turns from the hall table.","alt":["SON's shoes kicked off in the hall (no face, no reaction)","SON's silhouette in the doorway (backlight is a glow — out)"],"ia":"SON drags himself in through the front door, shoulders sagging → MOM turns from the hall table, her eyebrows lifting","dist":"far","look":"","ctx":"","ce":"none","cx":"white space → the real hall; the child's voice → the everyday moment","ip":""},
    slots: {"L":"MOM at the hall table, small, turning round from the post","C":"the foot of the stairs between them","R":"SON in the open front door, small, his schoolbag sliding off one shoulder, his head low"},
    still: "the establishing beat",
    why: "Establish the place and who stands where before the close shots.",
    heroWho: "Son",
    pieces: ["front door","stairs","hall table"],
  },
  {
    n: 23, ref: "S23",
    sequence: "01 Listen, not fix me", scene: "Front hall, after school", tier: "EMOTIONAL", fn: "STORY",
    roles: "Son", props: [], hero: "FACE",
    feel: "A small ache — he finally says it.",
    meaning: "SON on the bottom stair, close: the words come out with his eyes on the floor.",
    shotSize: "CLOSE", angle: "EYE", face: "LARGE", scale: "ORDINARY",
    framing: "Close shot at eye level, on the bottom stair, horizon level: at the left open space on the side he looks toward; in the centre SON's face and the top of his shoulders, large, sitting on the bottom stair; at the right a little open space behind his head.",
    action: "SON sinks onto the bottom stair and says it, one mitten hand rubbing his forehead.",
    performance: "SON: eyes heavy and half-lowered, eyebrows tilted up in the middle, mouth a long wavy line, head tipped forward, one mitten hand rubbing his forehead, shoulders slumped low, pupils sliding from the floor toward MOM at the left.",
    world: "HALL", mood: "CLEAN", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"PUSH_IN","on":"","note":"slow push in"},
    device: "OTS_REACTION",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a close shot at eye level on the bottom stair — open space on the side he looks toward; SON's face and the top of his shoulders, large, sitting on the bottom stair; a little open space behind his head.",
    map: "left — open space on the side he looks toward; centre — SON's face and the top of his shoulders, large, sitting on the bottom stair; right — a little open space behind his head.",
    check: "close shot at eye level, horizon level; left: open space on the side he looks toward; centre: SON's face and the top of his shoulders, large, sitting on the bottom stair; right: a little open space behind his head; {BG}.",
    plan: {"ft":"A small ache — he finally says it.","ln":"dialogue","idea":"SON on the bottom stair, close: the words come out with his eyes on the floor.","alt":["SON throwing his bag (too loud for the line)","the schoolbag alone on the floor (no face)"],"ia":"","dist":"","look":"down at the floor, then toward MOM, out of frame left","ctx":"follows wide S22: MOM stands at the hall table at the left","ce":"none","cx":"the wide hall → one tired face","ip":""},
    slots: {"L":"open space on the side he looks toward","C":"SON's face and the top of his shoulders, large, sitting on the bottom stair","R":"a little open space behind his head"},
    still: "the face holds the words",
    why: "The line is his; the camera comes close enough to hear it.",
    pieces: ["stairs"],
  },
  {
    n: 24, ref: "S24",
    sequence: "01 Listen, not fix me", scene: "Front hall, after school", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom", props: [], hero: "FACE",
    feel: "A laugh — the parent's alarm goes off.",
    meaning: "MOM's face, huge on white: eyes snap wide, eyebrows shoot up, both hands fly up — parent brain on.",
    shotSize: "XCLOSE", angle: "EYE", face: "HUGE", scale: "ORDINARY",
    framing: "Extreme close-up at eye level, in clean white space, horizon level: at the left a little open space; in the centre MOM's face, huge, a little left of centre, with both mitten hands flying up beside it; at the right open white space on the side she looks.",
    action: "MOM's head snaps up and both mitten hands fly up beside her face.",
    performance: "MOM: eyes snapping wide open, eyebrows shooting high, mouth a big round open shape, head jerking up, both mitten hands flying up beside her face, shoulders jumping up, pupils locked on SON at the right.",
    world: "HALL", mood: "WHITE", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"SNAP_ZOOM","on":"activates","note":"snap in on her face"},
    device: "SCALE_SHIFT",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "an extreme close-up at eye level in clean white space — a little open space; MOM's face, huge, a little left of centre, with both mitten hands flying up beside it; open white space on the side she looks.",
    map: "left — a little open space; centre — MOM's face, huge, a little left of centre, with both mitten hands flying up beside it; right — open white space on the side she looks.",
    check: "extreme close-up at eye level, horizon level; left: a little open space; centre: MOM's face, huge, a little left of centre, with both mitten hands flying up beside it; right: open white space on the side she looks; {BG}.",
    plan: {"ft":"A laugh — the parent's alarm goes off.","ln":"humour-aside","idea":"MOM's face, huge on white: eyes snap wide, eyebrows shoot up, both hands fly up — parent brain on.","alt":["a siren on MOM's head (a generic symbol — out)","MOM's brain drawn as a control room (a fantasy image that pulls away from the face)"],"ia":"","dist":"","look":"toward SON, out of frame right","ctx":"follows S22: SON came in at the right","ce":"none","cx":"his sinking quiet → her full-alert face on white","ip":"funny-reaction"},
    slots: {"L":"a little open space","C":"MOM's face, huge, a little left of centre, with both mitten hands flying up beside it","R":"open white space on the side she looks"},
    still: "the snap zoom is the joke",
    why: "Thomas's 'exaggerated parent reaction' — a large face reacting, no symbol.",
    pieces: [],
  },
  {
    n: 25, ref: "S25",
    sequence: "01 Listen, not fix me", scene: "Front hall, after school", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom, Son", props: [], hero: "FIGURE",
    feel: "A laugh of recognition — the questions begin.",
    meaning: "Over SON's shoulder: MOM bends in close with her first question while SON leans back against the stairs.",
    shotSize: "MEDIUM", angle: "OTS", face: "NORMAL", scale: "ORDINARY",
    framing: "Medium shot over the shoulder, at the foot of the stairs, horizon level: at the left MOM bending in close over him, large, one mitten hand raised mid-question; in the centre the banister between them; at the right the back of SON's head with its spiky hair, and his shoulder, big in the near foreground, leaning back against the stairs.",
    action: "MOM bends in close over SON with one mitten hand raised mid-question; SON leans back against the stairs in the near foreground. INTERACTION BEAT: MOM bends in close with her first question; in response, SON leans back against the stairs, his eyes sliding away.",
    performance: "MOM: eyes wide and searching, eyebrows drawn together and raised, mouth an open oval mid-question, head pushed forward, one mitten hand raised mid-gesture, posture bent in close over him, pupils fixed on SON. SON: the back of his head toward us, head tipped back away from her, both mitten hands gripping the stair behind him, posture leaning back against the stairs.",
    world: "HALL", mood: "CLEAN", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"PUSH_IN","on":"who","note":"small push on the question"},
    device: "OTS_REACTION",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a medium shot over the shoulder at the foot of the stairs — MOM bending in close over him, large, one mitten hand raised mid-question; the banister between them; the back of SON's head with its spiky hair, and his shoulder, big in the near foreground, leaning back against the stairs.",
    map: "left — MOM bending in close over him, large, one mitten hand raised mid-question; centre — the banister between them; right — the back of SON's head with its spiky hair, and his shoulder, big in the near foreground, leaning back against the stairs.",
    check: "medium shot over the shoulder, horizon level; left: MOM bending in close over him, large, one mitten hand raised mid-question; centre: the banister between them; right: the back of SON's head with its spiky hair, and his shoulder, big in the near foreground, leaning back against the stairs; {BG}.",
    cam: "OTS",
    plan: {"ft":"A laugh of recognition — the questions begin.","ln":"rapid-list","idea":"Over SON's shoulder: MOM bends in close with her first question while SON leans back against the stairs.","alt":["MOM with a magnifying glass at his face (Version 9: a detective prop for the first question — saved the joke for the investigation)","a list of questions floating in the air (words in the image)"],"ia":"MOM bends in close with her first question → SON leans back against the stairs, his eyes sliding away","dist":"close","look":"","ctx":"","ce":"none","cx":"her alarm → her lean in","ip":""},
    slots: {"L":"MOM bending in close over him, large, one mitten hand raised mid-question","C":"the banister between them","R":"the back of SON's head with its spiky hair, and his shoulder, big in the near foreground, leaning back against the stairs"},
    still: "a fast question beat",
    why: "Thomas's 'too many questions', one beat per question, each a new camera.",
    heroWho: "Mom",
    pieces: ["stairs"],
  },
  {
    n: 26, ref: "S26",
    sequence: "01 Listen, not fix me", scene: "Front hall, after school", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom, Son", props: [], hero: "FACE",
    feel: "The squeeze — too many questions, too close.",
    meaning: "Side-on, two faces close: MOM leans in at SON's ear with the next question; SON turns his face away and rolls his eyes up.",
    shotSize: "CLOSE", angle: "PROFILE", face: "LARGE", scale: "ORDINARY",
    framing: "Close shot from the side at eye level, in open space, horizon level: at the left MOM's face, large, leaning in close at SON's ear, mouth open mid-question; in the centre a small gap between their heads; at the right SON's face, large, turned a little away from her, eyes rolling up.",
    action: "MOM leans in close at SON's ear with the next question; SON turns his face away and rolls his eyes up. INTERACTION BEAT: MOM leans in at his ear with her second question; in response, SON turns his face away and rolls his eyes up to the ceiling.",
    performance: "MOM: eyes wide and eager, eyebrows raised high, mouth an open oval mid-question, head pushed in close to his, one mitten hand lifted beside her face, posture leaning in, pupils on SON's ear. SON: eyes rolling up to the ceiling, eyebrows flat and pulled together, mouth a tight flat line pulled to one side, head turned away from her, one mitten hand pressed to his temple, shoulders hunched up, pupils up and to the right.",
    world: "HALL", mood: "CLEAN", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"SNAP_ZOOM","on":"happened","note":"snap in"},
    device: "OTS_REACTION",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a close shot from the side at eye level in open space — MOM's face, large, leaning in close at SON's ear, mouth open mid-question; a small gap between their heads; SON's face, large, turned a little away from her, eyes rolling up.",
    map: "left — MOM's face, large, leaning in close at SON's ear, mouth open mid-question; centre — a small gap between their heads; right — SON's face, large, turned a little away from her, eyes rolling up.",
    check: "close shot from the side at eye level, horizon level; left: MOM's face, large, leaning in close at SON's ear, mouth open mid-question; centre: a small gap between their heads; right: SON's face, large, turned a little away from her, eyes rolling up; {BG}.",
    plan: {"ft":"The squeeze — too many questions, too close.","ln":"rapid-list","idea":"Side-on, two faces close: MOM leans in at SON's ear with the next question; SON turns his face away and rolls his eyes up.","alt":["SON pulling his hood up (a garment — out)","MOM counting questions on her hand (hands lose the faces)"],"ia":"MOM leans in at his ear with her second question → SON turns his face away and rolls his eyes up to the ceiling","dist":"close","look":"MOM toward SON's ear, frame right; SON rolls his eyes up, away from her","ctx":"follows S25 on the same stair; both faces are in the frame","ce":"none","cx":"over the shoulder → two faces side by side","ip":"funny-reaction"},
    slots: {"L":"MOM's face, large, leaning in close at SON's ear, mouth open mid-question","C":"a small gap between their heads","R":"SON's face, large, turned a little away from her, eyes rolling up"},
    still: "a fast question beat",
    why: "The eye roll — on Thomas's list of moments every family knows.",
    heroWho: "Mom",
    pieces: [],
  },
  {
    n: 27, ref: "S27",
    sequence: "01 Listen, not fix me", scene: "Front hall, after school", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom, Son", props: ["PHONE"], hero: "PHONE",
    feel: "Panic and comedy — she is already calling.",
    meaning: "MOM stands with THE PHONE already at her ear, calling the school; SON half rises from the stair, reaching to stop her.",
    shotSize: "MEDWIDE", angle: "EYE", face: "NORMAL", scale: "ORDINARY",
    framing: "Medium-wide shot at eye level, at the foot of the stairs, horizon level: at the left MOM standing by the hall table, large, THE PHONE lifted to her ear; in the centre SON's mitten hand reaching across the gap toward her arm; at the right SON on the bottom stair, half rising.",
    action: "MOM stands by the hall table with THE PHONE lifted to her ear; SON half rises from the bottom stair, one mitten hand reaching out toward her arm. INTERACTION BEAT: MOM lifts THE PHONE to her ear to call the school; in response, SON half rises from the stair, one mitten hand reaching out to stop her.",
    performance: "MOM: eyes determined and narrowed, eyebrows set low and firm, mouth a firm open shape mid-word, head held high, one mitten hand pressing THE PHONE to her ear and the other raised to hold him off, posture upright and ready, pupils on the far wall. SON: eyes wide with alarm, eyebrows shooting up, mouth an open oval, head pushed forward, one mitten hand reaching out toward her arm, posture half rising from the stair, pupils on THE PHONE.",
    world: "HALL", mood: "CLEAN", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"PAN_LEFT","on":"teacher","note":"quick pan to the phone"},
    device: "TUG_OF_WAR",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a medium-wide shot at eye level at the foot of the stairs — MOM standing by the hall table, large, THE PHONE lifted to her ear; SON's mitten hand reaching across the gap toward her arm; SON on the bottom stair, half rising — the characters drawn large enough that their faces read.",
    map: "left — MOM standing by the hall table, large, THE PHONE lifted to her ear; centre — SON's mitten hand reaching across the gap toward her arm; right — SON on the bottom stair, half rising.",
    check: "medium-wide shot at eye level, horizon level; left: MOM standing by the hall table, large, THE PHONE lifted to her ear; centre: SON's mitten hand reaching across the gap toward her arm; right: SON on the bottom stair, half rising; {BG}.",
    plan: {"ft":"Panic and comedy — she is already calling.","ln":"rapid-list","idea":"MOM stands with THE PHONE already at her ear, calling the school; SON half rises from the stair, reaching to stop her.","alt":["MOM typing an angry email (a screen with words)","MOM grabbing her car keys (one step too far)"],"ia":"MOM lifts THE PHONE to her ear to call the school → SON half rises from the stair, one mitten hand reaching out to stop her","dist":"apart","look":"","ctx":"","ce":"PHONE","cx":"two faces close → the distance opening as she stands","ip":""},
    slots: {"L":"MOM standing by the hall table, large, THE PHONE lifted to her ear","C":"SON's mitten hand reaching across the gap toward her arm","R":"SON on the bottom stair, half rising"},
    still: "the pan carries it",
    why: "The third question as an action: she is already doing something about it.",
    heroWho: "Mom",
    pieces: ["stairs","hall table"],
  },
  {
    n: 28, ref: "S28",
    sequence: "01 Listen, not fix me", scene: "Front hall, after school", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom, Son", props: ["NOTE"], hero: "NOTE",
    feel: "A laugh — the to-do list arrives.",
    meaning: "Hands only: MOM presses a yellow sticky note with a plan onto SON's limp hand.",
    shotSize: "HANDS", angle: "EYE", face: "NONE", scale: "ORDINARY",
    framing: "Hands-only close shot at eye level, in open space, horizon level: at the left MOM's mitten hand rising from the bottom edge, pressing THE NOTE down; in the centre THE NOTE stuck flat on the back of SON's hand; at the right SON's mitten hand rising from the bottom edge, lying limp.",
    action: "MOM's mitten hand presses THE NOTE flat onto the back of SON's limp mitten hand. INTERACTION BEAT: MOM's mitten hand presses THE NOTE onto the back of SON's hand; in response, SON's hand stays limp and does not close round it.",
    performance: "MOM's mitten hand presses down firmly and pats THE NOTE flat; SON's mitten hand lies limp and open, not closing round it.",
    world: "HALL", mood: "CLEAN", peak: false,
    stage: "",
    moment: "",
    pop: {"what":"NOTE","on":"tomorrow","type":"PUNCH","motion":"quick scale bump on the note"},
    move: {"type":"HOLD","on":"","note":"hold"},
    device: "INSERT_DETAIL",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a hands-only close shot at eye level in open space — MOM's mitten hand rising from the bottom edge, pressing THE NOTE down; THE NOTE stuck flat on the back of SON's hand; SON's mitten hand rising from the bottom edge, lying limp.",
    map: "left — MOM's mitten hand rising from the bottom edge, pressing THE NOTE down; centre — THE NOTE stuck flat on the back of SON's hand; right — SON's mitten hand rising from the bottom edge, lying limp.",
    check: "hands-only close shot at eye level, horizon level; left: MOM's mitten hand rising from the bottom edge, pressing THE NOTE down; centre: THE NOTE stuck flat on the back of SON's hand; right: SON's mitten hand rising from the bottom edge, lying limp; {BG}.",
    plan: {"ft":"A laugh — the to-do list arrives.","ln":"rapid-list","idea":"Hands only: MOM presses a yellow sticky note with a plan onto SON's limp hand.","alt":["MOM with a clipboard and a pen (a bigger prop for the same joke)","a list of steps written on the wall (words in the image)"],"ia":"MOM's mitten hand presses THE NOTE onto the back of SON's hand → SON's hand stays limp and does not close round it","dist":"touching","look":"","ctx":"","ce":"NOTE","cx":"a wide argument → two hands and one small yellow square","ip":"unexpected-object"},
    slots: {"L":"MOM's mitten hand rising from the bottom edge, pressing THE NOTE down","C":"THE NOTE stuck flat on the back of SON's hand","R":"SON's mitten hand rising from the bottom edge, lying limp"},
    why: "The fix made physical and funny: a plan nobody asked for, stuck on him.",
    pieces: [],
  },
  {
    n: 29, ref: "S29",
    sequence: "01 Listen, not fix me", scene: "Front hall, after school", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom, Son", props: ["PHONE","NOTE"], hero: "FIGURE",
    feel: "The comedy of speed.",
    meaning: "Side-on: MOM marches off toward the kitchen, phone at her ear; SON is left on the stair holding the note, mouth half open.",
    shotSize: "WIDE", angle: "PROFILE", face: "NORMAL", scale: "ORDINARY",
    framing: "Wide shot from the side at eye level, in the front hall, horizon level: at the left MOM striding away toward the kitchen, large, THE PHONE at her ear; in the centre the empty hall floor stretching between them; at the right SON on the bottom stair, large, holding THE NOTE up, one mitten hand half raised.",
    action: "MOM strides away toward the kitchen with THE PHONE at her ear; SON stays sitting on the bottom stair, holding THE NOTE up in one mitten hand, the other hand half raised after her. INTERACTION BEAT: MOM marches off toward the kitchen, THE PHONE at her ear; in response, SON stays on the stair holding THE NOTE up, his mouth half open, his other hand half raised.",
    performance: "MOM: eyes fixed ahead, eyebrows set and busy, mouth an open shape mid-sentence, head forward, one mitten hand holding THE PHONE to her ear and the other swinging, posture striding fast, pupils on the kitchen ahead. SON: eyes wide and blank with disbelief, eyebrows raised high, mouth a half-open oval, head turned after her, one mitten hand holding THE NOTE up and the other half raised, posture frozen on the stair, pupils on MOM's back.",
    world: "HALL", mood: "CLEAN", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"PAN_LEFT","on":"seconds","note":"pan after her"},
    device: "CAUSE_EFFECT_CUT",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a wide shot from the side at eye level in the front hall — MOM striding away toward the kitchen, large, THE PHONE at her ear; the empty hall floor stretching between them; SON on the bottom stair, large, holding THE NOTE up, one mitten hand half raised — the characters drawn large enough that their faces read.",
    map: "left — MOM striding away toward the kitchen, large, THE PHONE at her ear; centre — the empty hall floor stretching between them; right — SON on the bottom stair, large, holding THE NOTE up, one mitten hand half raised.",
    check: "wide shot from the side at eye level, horizon level; left: MOM striding away toward the kitchen, large, THE PHONE at her ear; centre: the empty hall floor stretching between them; right: SON on the bottom stair, large, holding THE NOTE up, one mitten hand half raised; {BG}.",
    plan: {"ft":"The comedy of speed.","ln":"humour-aside","idea":"Side-on: MOM marches off toward the kitchen, phone at her ear; SON is left on the stair holding the note, mouth half open.","alt":["a stopwatch in MOM's hand (Version 9: a timer prop for a time line)","a clock spinning on the wall (a generic device)"],"ia":"MOM marches off toward the kitchen, THE PHONE at her ear → SON stays on the stair holding THE NOTE up, his mouth half open, his other hand half raised","dist":"far","look":"","ctx":"","ce":"NOTE","cx":"a still boy → a mother in full motion","ip":""},
    slots: {"L":"MOM striding away toward the kitchen, large, THE PHONE at her ear","C":"the empty hall floor stretching between them","R":"SON on the bottom stair, large, holding THE NOTE up, one mitten hand half raised"},
    still: "the pan follows her exit",
    why: "Setup for the punchline: speed, shown by her leaving him behind.",
    heroWho: "Mom",
    pieces: ["stairs"],
  },
  {
    n: 30, ref: "S30",
    sequence: "01 Listen, not fix me", scene: "Kitchen, after school", tier: "HOOK", fn: "STORY",
    roles: "Mom, Son", props: ["FRIDGE"], hero: "FRIDGE",
    feel: "A big laugh — the overreaction made visible.",
    meaning: "Wide: the fridge door has become an incident board — the school letter, his timetable and the class photo under magnets, joined by violet marker lines — MOM drawing one more line while SON slumps at the table.",
    shotSize: "WIDE", angle: "EYE", face: "NORMAL", scale: "ORDINARY",
    framing: "Wide shot at eye level, in the kitchen, horizon level: at the left MOM standing at THE FRIDGE, large, half the frame height, drawing on its door with a marker in one mitten hand; in the centre THE FRIDGE door covered in papers under magnets, joined by marker lines; at the right SON sitting at the kitchen table, small, slumped low in his chair.",
    action: "MOM stands at THE FRIDGE and draws another marker line between the papers on its door with one mitten hand; SON sits slumped low at the kitchen table, his chin sinking toward the table top. INTERACTION BEAT: MOM draws another violet line across THE FRIDGE door, explaining; in response, SON slumps lower in his chair, his chin sinking to the table.",
    performance: "MOM: eyes blazing with focus, eyebrows drawn hard together, mouth an open shape mid-explanation, head jutting toward the fridge door, one mitten hand drawing with the marker and the other planted at her side, posture leaning into the door, pupils on the papers. SON: eyes half-lowered and glazed, eyebrows flat, mouth a flat sagging line, head sinking toward the table, both mitten hands limp on the table, posture slumped low in the chair, pupils on the table top.",
    world: "KITCHEN", mood: "CLEAN", peak: false,
    stage: "PROBLEM",
    moment: "",
    pop: null,
    move: {"type":"PULL_OUT","on":"investigation","note":"pull out to reveal the whole fridge door"},
    device: "ESCALATION_RAMP",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a wide shot at eye level in the kitchen — MOM standing at THE FRIDGE, large, half the frame height, drawing on its door with a marker in one mitten hand; THE FRIDGE door covered in papers under magnets, joined by marker lines; SON sitting at the kitchen table, small, slumped low in his chair — the characters drawn large enough that their faces read.",
    map: "left — MOM standing at THE FRIDGE, large, half the frame height, drawing on its door with a marker in one mitten hand; centre — THE FRIDGE door covered in papers under magnets, joined by marker lines; right — SON sitting at the kitchen table, small, slumped low in his chair.",
    check: "wide shot at eye level, horizon level; left: MOM standing at THE FRIDGE, large, half the frame height, drawing on its door with a marker in one mitten hand; centre: THE FRIDGE door covered in papers under magnets, joined by marker lines; right: SON sitting at the kitchen table, small, slumped low in his chair; {BG}.",
    plan: {"ft":"A big laugh — the overreaction made visible.","ln":"humour-aside","idea":"Wide: the fridge door has become an incident board — the school letter, his timetable and the class photo under magnets, joined by violet marker lines — MOM drawing one more line while SON slumps at the table.","alt":["a pinboard of cards and string on a stand (the same joke, but the stand appears from nowhere — the kitchen's own fridge is more real)","MOM with a magnifying glass bending over him (the detective joke in a smaller frame)","police tape across the kitchen door (too far into fantasy)"],"ia":"MOM draws another violet line across THE FRIDGE door, explaining → SON slumps lower in his chair, his chin sinking to the table","dist":"apart","look":"","ctx":"","ce":"FRIDGE marker lines","cx":"the hall's quick beats → one wide, absurd picture","ip":"short-metaphor"},
    slots: {"L":"MOM standing at THE FRIDGE, large, half the frame height, drawing on its door with a marker in one mitten hand","C":"THE FRIDGE door covered in papers under magnets, joined by marker lines","R":"SON sitting at the kitchen table, small, slumped low in his chair"},
    still: "the pull out is the reveal",
    why: "Thomas's 'parent overthinking something simple', built from the kitchen's own fridge — one wide comic picture.",
    heroWho: "Mom",
    accentMark: "a few short speed strokes flicking off MOM's marker hand",
    accentCol: "YELLOW",
    pieces: ["table","chair"],
  },
  {
    n: 31, ref: "S31",
    sequence: "01 Listen, not fix me", scene: "Kitchen, after school", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom", props: [], hero: "FACE",
    feel: "A held breath — she stops.",
    meaning: "MOM freezes mid-point and glances at SON — the first second of noticing.",
    shotSize: "CLOSE", angle: "EYE", face: "LARGE", scale: "ORDINARY",
    framing: "Close shot at eye level, in open space, horizon level: at the left a little open space behind her head; in the centre MOM's face and the top of her shoulders, large, a little left of centre; at the right open space on the side she looks.",
    action: "MOM stops with one mitten hand still raised toward the fridge door and turns her eyes toward SON.",
    performance: "MOM: eyes going still and wide, eyebrows easing up from their frown, mouth closing into a soft open shape, head turning toward SON, one mitten hand frozen in mid-air, posture stopping still, pupils on SON at the right.",
    world: "KITCHEN", mood: "CLEAN", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"HOLD","on":"","note":"hold — the silence"},
    device: "SILENT_BEAT",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a close shot at eye level in open space — a little open space behind her head; MOM's face and the top of her shoulders, large, a little left of centre; open space on the side she looks.",
    map: "left — a little open space behind her head; centre — MOM's face and the top of her shoulders, large, a little left of centre; right — open space on the side she looks.",
    check: "close shot at eye level, horizon level; left: a little open space behind her head; centre: MOM's face and the top of her shoulders, large, a little left of centre; right: open space on the side she looks; {BG}.",
    plan: {"ft":"A held breath — she stops.","ln":"statement","idea":"MOM freezes mid-point and glances at SON — the first second of noticing.","alt":["the marker running dry (a gag that keeps the noise going)","a silent clock (a device, not a face)"],"ia":"","dist":"","look":"toward SON, out of frame right","ctx":"follows wide S30: SON sits at the table at the right","ce":"none","cx":"full motion → a frozen face","ip":"visual-silence"},
    slots: {"L":"a little open space behind her head","C":"MOM's face and the top of her shoulders, large, a little left of centre","R":"open space on the side she looks"},
    still: "visual silence: nothing moves",
    why: "Thomas's 'a parent stopping before reacting', at the turn of the chapter.",
    pieces: [],
  },
  {
    n: 32, ref: "S32",
    sequence: "01 Listen, not fix me", scene: "Kitchen, after school", tier: "EMOTIONAL", fn: "STORY",
    roles: "Son", props: ["NOTE"], hero: "NOTE",
    feel: "Quiet clarity — he never wanted a plan.",
    meaning: "Face and hands: SON slides the yellow note back across the table toward MOM, his eyes on the table.",
    shotSize: "FACE_HANDS", angle: "EYE", face: "LARGE", scale: "ORDINARY",
    framing: "Face-and-hands close-up at eye level, at the kitchen table, horizon level: at the left THE NOTE sliding away across the table top toward the left; in the centre SON's face and one mitten hand, large; at the right a little open space.",
    action: "SON slides THE NOTE back across the table top toward MOM with one mitten hand, his eyes on the table.",
    performance: "SON: eyes lowered and calm, eyebrows level and a little sad, mouth a quiet flat line, head bowed slightly, one mitten hand pushing THE NOTE away across the table, posture sitting up a little, pupils on THE NOTE and then toward MOM at the left.",
    world: "KITCHEN", mood: "CLEAN", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"DRIFT","on":"","note":"drift with the note"},
    device: "INSERT_DETAIL",
    reveal: null,
    link: "Pays off S28: the note comes back unused.",
    requiredText: "",
    picture: "a face-and-hands close-up at eye level at the kitchen table — THE NOTE sliding away across the table top toward the left; SON's face and one mitten hand, large; a little open space.",
    map: "left — THE NOTE sliding away across the table top toward the left; centre — SON's face and one mitten hand, large; right — a little open space.",
    check: "face-and-hands close-up at eye level, horizon level; left: THE NOTE sliding away across the table top toward the left; centre: SON's face and one mitten hand, large; right: a little open space; {BG}.",
    plan: {"ft":"Quiet clarity — he never wanted a plan.","ln":"statement","idea":"Face and hands: SON slides the yellow note back across the table toward MOM, his eyes on the table.","alt":["SON crumpling the note (anger he doesn't feel)","SON shaking his head (the hands carry it better)"],"ia":"","dist":"","look":"down at THE NOTE, then toward MOM, out of frame left","ctx":"follows wide S30: MOM stands at the left by the fridge","ce":"NOTE","cx":"her frozen face → his small, clear gesture","ip":""},
    slots: {"L":"THE NOTE sliding away across the table top toward the left","C":"SON's face and one mitten hand, large","R":"a little open space"},
    still: "one small gesture carries it",
    why: "The recurring note changes meaning: the fix is handed back.",
    pieces: ["table"],
  },
  {
    n: 33, ref: "S33",
    sequence: "01 Listen, not fix me", scene: "Kitchen, after school", tier: "EMOTIONAL", fn: "STORY",
    roles: "Son", props: [], hero: "FACE",
    feel: "The hush before the real request.",
    meaning: "Eyes only on white: SON's eyes lift slowly to MOM.",
    shotSize: "XCLOSE", angle: "EYE", face: "HUGE", scale: "ORDINARY",
    framing: "Eyes-only extreme close-up at eye level, in clean white space, horizon level: at the left one eye with its eyebrow; in the centre the bridge between the eyes; at the right SON's other eye with its eyebrow.",
    action: "SON's eyes lift slowly up toward MOM.",
    performance: "SON: eyes lifting slowly and opening wider, eyebrows rising gently in the middle, pupils travelling up toward MOM at the left.",
    world: "KITCHEN", mood: "WHITE", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"PUSH_IN","on":"","note":"very slow push"},
    device: "SCALE_SHIFT",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "an eyes-only extreme close-up at eye level in clean white space — one eye with its eyebrow; the bridge between the eyes; SON's other eye with its eyebrow.",
    map: "left — one eye with its eyebrow; centre — the bridge between the eyes; right — SON's other eye with its eyebrow.",
    check: "eyes-only extreme close-up at eye level, horizon level; left: one eye with its eyebrow; centre: the bridge between the eyes; right: SON's other eye with its eyebrow; {BG}.",
    plan: {"ft":"The hush before the real request.","ln":"statement","idea":"Eyes only on white: SON's eyes lift slowly to MOM.","alt":["SON's hand reaching for hers (kept for the ending)","a tear on his cheek (too heavy for this line)"],"ia":"","dist":"","look":"up toward MOM, out of frame left","ctx":"follows S32: MOM stands at the left","ce":"none","cx":"a hand on the table → two eyes filling the frame","ip":"extreme-close-up"},
    slots: {"L":"one eye with its eyebrow","C":"the bridge between the eyes","R":"SON's other eye with its eyebrow"},
    still: "the eyes do the moving",
    why: "The closest frame of the chapter sits on the line before the request.",
    eyesOnly: true,
    pieces: [],
  },
  {
    n: 34, ref: "S34",
    sequence: "01 Listen, not fix me", scene: "Kitchen, after school", tier: "HOOK", fn: "STORY",
    roles: "Mom, Son", props: ["FRIDGE"], hero: "FIGURE",
    feel: "A lump in the throat — all he wants is company.",
    meaning: "SON pulls out the empty chair beside him and pats its seat, looking up at MOM; her marker hand at the fridge sinks.",
    shotSize: "MEDWIDE", angle: "EYE", face: "NORMAL", scale: "ORDINARY",
    framing: "Medium-wide shot at eye level, in the kitchen, horizon level: at the left MOM standing by THE FRIDGE, large, her raised mitten hand with the marker sinking; in the centre the empty chair pulled out beside SON; at the right SON sitting at the kitchen table, large, one mitten hand patting the seat of the empty chair.",
    action: "SON, sitting at the kitchen table, pulls out the empty chair beside him and pats its seat, looking up at MOM; MOM's raised mitten hand with the marker sinks from the fridge door. INTERACTION BEAT: SON pulls out the empty chair beside him and pats its seat, looking up at her; in response, MOM's raised marker hand sinks from the fridge door and her face softens.",
    performance: "SON: eyes open and hopeful, eyebrows tilted up in the middle, mouth a shy gentle curve, head tipped up toward MOM, one mitten hand patting the empty seat, posture turned toward her, pupils on MOM. MOM: eyes softening, eyebrows lifting gently in the middle, mouth easing into a soft open curve, head tilting toward him, one mitten hand with the marker sinking from the fridge door, posture loosening, pupils on the empty chair.",
    world: "KITCHEN", mood: "CLEAN", peak: false,
    stage: "REACTION",
    moment: "",
    pop: null,
    move: {"type":"DRIFT","on":"","note":"gentle drift toward the chair"},
    device: "DISTANCE",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a medium-wide shot at eye level in the kitchen — MOM standing by THE FRIDGE, large, her raised mitten hand with the marker sinking; the empty chair pulled out beside SON; SON sitting at the kitchen table, large, one mitten hand patting the seat of the empty chair — the characters drawn large enough that their faces read.",
    map: "left — MOM standing by THE FRIDGE, large, her raised mitten hand with the marker sinking; centre — the empty chair pulled out beside SON; right — SON sitting at the kitchen table, large, one mitten hand patting the seat of the empty chair.",
    check: "medium-wide shot at eye level, horizon level; left: MOM standing by THE FRIDGE, large, her raised mitten hand with the marker sinking; centre: the empty chair pulled out beside SON; right: SON sitting at the kitchen table, large, one mitten hand patting the seat of the empty chair; {BG}.",
    plan: {"ft":"A lump in the throat — all he wants is company.","ln":"child-voice","idea":"SON pulls out the empty chair beside him and pats its seat, looking up at MOM; her marker hand at the fridge sinks.","alt":["a blanket fort (Version 9: a child's den for a teenager's feeling — too young)","SON holding out one earbud to share (kept for a later chapter)"],"ia":"SON pulls out the empty chair beside him and pats its seat, looking up at her → MOM's raised marker hand sinks from the fridge door and her face softens","dist":"apart","look":"","ctx":"","ce":"none","cx":"a huge pair of eyes → a small invitation across the room","ip":""},
    slots: {"L":"MOM standing by THE FRIDGE, large, her raised mitten hand with the marker sinking","C":"the empty chair pulled out beside SON","R":"SON sitting at the kitchen table, large, one mitten hand patting the seat of the empty chair"},
    still: "the invitation holds; she answers later",
    why: "'Sit inside this feeling with me' as behaviour: an empty chair, offered.",
    heroWho: "Son",
    light: {"kind":"warm","where":"one flat oval of warm light on the wall behind the empty chair"},
    pieces: ["table","chair"],
  },
  {
    n: 35, ref: "S35",
    sequence: "01 Listen, not fix me", scene: "Living room, evening", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom, Dad", props: [], hero: "FIGURE",
    feel: "A smile of recognition — now it's us.",
    meaning: "Wide: MOM drops onto the sofa with her head tipped back; DAD, at the other end, looks up from his laptop.",
    shotSize: "WIDE", angle: "HIGH", face: "NORMAL", scale: "ORDINARY",
    framing: "Wide shot from a little above head height, in the living room, horizon level: at the left MOM dropping onto the left end of the sofa, small, her head tipped back; in the centre the long low sofa between them; at the right DAD at the right end of the sofa, small, a laptop open on his knees.",
    action: "MOM drops onto the left end of the sofa with her head tipped back and both mitten hands limp; DAD, at the right end, looks up from the laptop on his knees. INTERACTION BEAT: MOM drops onto the sofa with her head tipped back; in response, DAD looks up from his laptop at the other end of the sofa.",
    performance: "MOM: eyes closed, eyebrows tilted up in the middle, mouth a long tired downturned curve, head tipped back on the sofa, both mitten hands limp beside her, posture sunk into the cushion, pupils hidden behind closed eyes. DAD: eyes lifting from the screen, eyebrows raised, mouth an attentive closed shape, head turning toward her, both mitten hands resting on the laptop, posture upright, pupils on MOM.",
    world: "LIVING", mood: "CLEAN", peak: false,
    stage: "START",
    moment: "",
    pop: null,
    move: {"type":"DRIFT","on":"","note":"slow drift"},
    device: "MIRROR",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a wide shot from a little above head height in the living room — MOM dropping onto the left end of the sofa, small, her head tipped back; the long low sofa between them; DAD at the right end of the sofa, small, a laptop open on his knees — the characters drawn large enough that their faces read.",
    map: "left — MOM dropping onto the left end of the sofa, small, her head tipped back; centre — the long low sofa between them; right — DAD at the right end of the sofa, small, a laptop open on his knees.",
    check: "wide shot from a little above head height, horizon level; left: MOM dropping onto the left end of the sofa, small, her head tipped back; centre: the long low sofa between them; right: DAD at the right end of the sofa, small, a laptop open on his knees; {BG}.",
    cam: "SLIGHTLY_ABOVE",
    plan: {"ft":"A smile of recognition — now it's us.","ln":"adult-mirror","idea":"Wide: MOM drops onto the sofa with her head tipped back; DAD, at the other end, looks up from his laptop.","alt":["MOM and DAD at a restaurant (a new place for one line)","MOM venting on the phone to a friend (a phone again)"],"ia":"MOM drops onto the sofa with her head tipped back → DAD looks up from his laptop at the other end of the sofa","dist":"apart","look":"","ctx":"","ce":"none","cx":"the kitchen with the child → the living room with the partner","ip":""},
    slots: {"L":"MOM dropping onto the left end of the sofa, small, her head tipped back","C":"the long low sofa between them","R":"DAD at the right end of the sofa, small, a laptop open on his knees"},
    still: "the establishing beat",
    why: "The adult mirror needs its own place, shown before the close shots.",
    heroWho: "Mom",
    pieces: ["sofa"],
  },
  {
    n: 36, ref: "S36",
    sequence: "01 Listen, not fix me", scene: "Living room, evening", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom, Dad", props: [], hero: "FIGURE",
    feel: "Anticipation — she needs to vent.",
    meaning: "Over DAD's shoulder: MOM turns to him and rests a hand on his arm; he shuts the laptop, all attention.",
    shotSize: "MEDIUM", angle: "OTS", face: "NORMAL", scale: "ORDINARY",
    framing: "Medium shot over the shoulder, on the sofa, horizon level: at the left MOM, large, turning toward DAD on the sofa, one mitten hand on his arm; in the centre the sofa cushion between them; at the right the back of DAD's head with its side-parted hair, and his shoulder, big in the near foreground.",
    action: "MOM turns toward DAD on the sofa and rests one mitten hand on his arm; DAD, in the near foreground, shuts his laptop. INTERACTION BEAT: MOM turns to DAD and rests a mitten hand on his arm; in response, DAD shuts his laptop and turns to her, all attention.",
    performance: "MOM: eyes tired and searching, eyebrows tilted up, mouth an open shape about to speak, head tilted toward him, one mitten hand resting on his arm, posture turned toward him, pupils on DAD. DAD: the back of his head toward us, head turning toward her, both mitten hands closing the laptop, posture turning to face her.",
    world: "LIVING", mood: "CLEAN", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"PUSH_IN","on":"","note":"slow push in"},
    device: "OTS_REACTION",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a medium shot over the shoulder on the sofa — MOM, large, turning toward DAD on the sofa, one mitten hand on his arm; the sofa cushion between them; the back of DAD's head with its side-parted hair, and his shoulder, big in the near foreground.",
    map: "left — MOM, large, turning toward DAD on the sofa, one mitten hand on his arm; centre — the sofa cushion between them; right — the back of DAD's head with its side-parted hair, and his shoulder, big in the near foreground.",
    check: "medium shot over the shoulder, horizon level; left: MOM, large, turning toward DAD on the sofa, one mitten hand on his arm; centre: the sofa cushion between them; right: the back of DAD's head with its side-parted hair, and his shoulder, big in the near foreground; {BG}.",
    cam: "OTS",
    plan: {"ft":"Anticipation — she needs to vent.","ln":"adult-mirror","idea":"Over DAD's shoulder: MOM turns to him and rests a hand on his arm; he shuts the laptop, all attention.","alt":["MOM sighing at the ceiling (no one to tell yet)","DAD bringing her tea (kept for a repair line)"],"ia":"MOM turns to DAD and rests a mitten hand on his arm → DAD shuts his laptop and turns to her, all attention","dist":"close","look":"","ctx":"","ce":"none","cx":"far apart on the sofa → close, turned to each other","ip":""},
    slots: {"L":"MOM, large, turning toward DAD on the sofa, one mitten hand on his arm","C":"the sofa cushion between them","R":"the back of DAD's head with its side-parted hair, and his shoulder, big in the near foreground"},
    still: "the set-up holds",
    why: "Sets up the joke: she is about to share a feeling.",
    heroWho: "Mom",
    pieces: ["sofa"],
  },
  {
    n: 37, ref: "S37",
    sequence: "01 Listen, not fix me", scene: "Living room, evening", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom", props: [], hero: "FACE",
    feel: "Fellow-feeling — we've all had this day.",
    meaning: "MOM, close, head back on the sofa, says it with her whole face sagging.",
    shotSize: "CLOSE", angle: "EYE", face: "LARGE", scale: "ORDINARY",
    framing: "Close shot at eye level, on the sofa, horizon level: at the left a little open space behind her head; in the centre MOM's face and the top of her shoulders, large, her head back against the sofa; at the right open space on the side she looks.",
    action: "MOM lets her head fall back against the sofa and says it, both mitten hands pressed to her cheeks.",
    performance: "MOM: eyes heavy and half-open, eyebrows tilted up in the middle, mouth a long wavy line, head fallen back against the sofa, both mitten hands pressed to her cheeks, shoulders slumped, pupils rolling toward DAD at the right.",
    world: "LIVING", mood: "CLEAN", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"PUSH_IN","on":"","note":"slow push in"},
    device: "OTS_REACTION",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a close shot at eye level on the sofa — a little open space behind her head; MOM's face and the top of her shoulders, large, her head back against the sofa; open space on the side she looks.",
    map: "left — a little open space behind her head; centre — MOM's face and the top of her shoulders, large, her head back against the sofa; right — open space on the side she looks.",
    check: "close shot at eye level, horizon level; left: a little open space behind her head; centre: MOM's face and the top of her shoulders, large, her head back against the sofa; right: open space on the side she looks; {BG}.",
    plan: {"ft":"Fellow-feeling — we've all had this day.","ln":"dialogue","idea":"MOM, close, head back on the sofa, says it with her whole face sagging.","alt":["a storm cloud over MOM's head (a generic symbol — out)","MOM's shoes kicked off (no face)"],"ia":"","dist":"","look":"toward DAD, out of frame right","ctx":"follows wide S35: DAD sits at the right end of the sofa","ce":"none","cx":"a two-shot → one tired face","ip":""},
    slots: {"L":"a little open space behind her head","C":"MOM's face and the top of her shoulders, large, her head back against the sofa","R":"open space on the side she looks"},
    still: "the face holds the line",
    why: "The same line the child said, now in the adult's mouth.",
    pieces: ["sofa"],
  },
  {
    n: 38, ref: "S38",
    sequence: "01 Listen, not fix me", scene: "Living room, evening", tier: "HOOK", fn: "STORY",
    roles: "Mom, Dad", props: ["WHITEBOARD"], hero: "WHITEBOARD",
    feel: "A laugh — the fix arrives on an easel.",
    meaning: "DAD wheels a whiteboard on an easel right in front of the sofa, beaming; MOM blinks at it.",
    shotSize: "MEDWIDE", angle: "EYE", face: "NORMAL", scale: "ORDINARY",
    framing: "Medium-wide shot at eye level, in the living room, horizon level: at the left MOM on the sofa, large, staring up at the board; in the centre THE WHITEBOARD on its easel, planted in front of the sofa; at the right DAD standing beside THE WHITEBOARD, large, beaming, one mitten hand on its frame.",
    action: "DAD plants THE WHITEBOARD on its easel right in front of the sofa, one mitten hand on its frame, beaming; MOM, on the sofa, stares up at it. INTERACTION BEAT: DAD plants THE WHITEBOARD in front of the sofa, beaming; in response, MOM blinks at it, her mouth falling open.",
    performance: "DAD: eyes bright and eager, eyebrows lifted high, mouth a wide proud smile, head held high, one mitten hand on the board's frame and the other raised to present, posture puffed up and upright, pupils on MOM. MOM: eyes wide and blinking, eyebrows shooting up, mouth falling open in a round shape, head pulled back, both mitten hands frozen on her knees, posture pressed back into the sofa, pupils on THE WHITEBOARD.",
    world: "LIVING", mood: "CLEAN", peak: false,
    stage: "",
    moment: "",
    pop: {"what":"WHITEBOARD","on":"whiteboard","type":"PUNCH","motion":"the board lands with a quick scale bump"},
    move: {"type":"SNAP_ZOOM","on":"whiteboard","note":"snap in on the board"},
    device: "SCALE_SHIFT",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a medium-wide shot at eye level in the living room — MOM on the sofa, large, staring up at the board; THE WHITEBOARD on its easel, planted in front of the sofa; DAD standing beside THE WHITEBOARD, large, beaming, one mitten hand on its frame — the characters drawn large enough that their faces read.",
    map: "left — MOM on the sofa, large, staring up at the board; centre — THE WHITEBOARD on its easel, planted in front of the sofa; right — DAD standing beside THE WHITEBOARD, large, beaming, one mitten hand on its frame.",
    check: "medium-wide shot at eye level, horizon level; left: MOM on the sofa, large, staring up at the board; centre: THE WHITEBOARD on its easel, planted in front of the sofa; right: DAD standing beside THE WHITEBOARD, large, beaming, one mitten hand on its frame; {BG}.",
    plan: {"ft":"A laugh — the fix arrives on an easel.","ln":"humour-aside","idea":"DAD wheels a whiteboard on an easel right in front of the sofa, beaming; MOM blinks at it.","alt":["DAD opening a spreadsheet on the laptop (a screen — the joke needs size)","DAD handing her a self-help book (smaller and quieter)"],"ia":"DAD plants THE WHITEBOARD in front of the sofa, beaming → MOM blinks at it, her mouth falling open","dist":"apart","look":"","ctx":"","ce":"WHITEBOARD frame","cx":"a sagging face → a bright, absurd object","ip":"unexpected-object"},
    slots: {"L":"MOM on the sofa, large, staring up at the board","C":"THE WHITEBOARD on its easel, planted in front of the sofa","R":"DAD standing beside THE WHITEBOARD, large, beaming, one mitten hand on its frame"},
    why: "The partner's version of the fix: a big, bright object nobody wanted.",
    heroWho: "Dad",
    pieces: ["sofa"],
  },
  {
    n: 39, ref: "S39",
    sequence: "01 Listen, not fix me", scene: "Living room, evening", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom", props: [], hero: "FACE",
    feel: "A laugh — the seriously face.",
    meaning: "MOM's face while DAD presents: flat stare, one eyebrow up, slow blink — the reaction is the joke.",
    shotSize: "REACTION", angle: "EYE", face: "LARGE", scale: "ORDINARY",
    framing: "Reaction close-up at eye level, in open space, horizon level: at the left MOM's face and the top of her shoulders, large, a little left of centre; in the centre open space; at the right open space on the side she looks.",
    action: "MOM stares at DAD's presentation without moving, one eyebrow climbing, and blinks once, slowly.",
    performance: "MOM: eyes flat and level, staring, eyebrows uneven with one climbing high, mouth a hard straight line, head perfectly still, both mitten hands folded in her lap, posture stiff and upright, pupils fixed on DAD at the right.",
    world: "LIVING", mood: "CLEAN", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"HOLD","on":"","note":"hold — the stare is the punchline"},
    device: "OTS_REACTION",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a reaction close-up at eye level in open space — MOM's face and the top of her shoulders, large, a little left of centre; open space; open space on the side she looks.",
    map: "left — MOM's face and the top of her shoulders, large, a little left of centre; centre — open space; right — open space on the side she looks.",
    check: "reaction close-up at eye level, horizon level; left: MOM's face and the top of her shoulders, large, a little left of centre; centre: open space; right: open space on the side she looks; {BG}.",
    plan: {"ft":"A laugh — the seriously face.","ln":"humour-aside","idea":"MOM's face while DAD presents: flat stare, one eyebrow up, slow blink — the reaction is the joke.","alt":["DAD tapping the four boxes (shows the speech, not the feeling)","the board seen from MOM's eyes (no face)"],"ia":"","dist":"","look":"toward DAD at the whiteboard, out of frame right","ctx":"follows S38: DAD and the board stand at the right","ce":"none","cx":"his bright pitch → her flat stare","ip":"funny-reaction"},
    slots: {"L":"MOM's face and the top of her shoulders, large, a little left of centre","C":"open space","R":"open space on the side she looks"},
    still: "the held stare is the joke",
    why: "The picture answers the line: his words, her face.",
    pieces: [],
  },
  {
    n: 40, ref: "S40",
    sequence: "01 Listen, not fix me", scene: "Living room, evening", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom, Dad", props: ["WHITEBOARD"], hero: "WHITEBOARD",
    feel: "A laugh of relief — gone.",
    meaning: "Wide: MOM marches the whiteboard out through the doorway under one arm; DAD, on the sofa, raises both palms with a sheepish smile.",
    shotSize: "WIDE", angle: "EYE", face: "NORMAL", scale: "ORDINARY",
    framing: "Wide shot at eye level, in the living room, horizon level: at the left MOM at the open doorway, large, carrying THE WHITEBOARD out under one arm; in the centre the empty floor where the board stood; at the right DAD on the sofa, small, both mitten hands raised.",
    action: "MOM carries THE WHITEBOARD out through the open doorway under one arm; DAD, sitting on the sofa, raises both mitten hands with a sheepish smile. INTERACTION BEAT: MOM marches THE WHITEBOARD out of the room; in response, DAD raises both palms with a sheepish smile.",
    performance: "MOM: eyes set and calm, eyebrows level, mouth a satisfied flat curve, head held high, one arm clamped round THE WHITEBOARD, posture striding out, pupils on the doorway ahead. DAD: eyes wide and sheepish, eyebrows raised in the middle, mouth a crooked guilty smile, head ducking a little, both mitten hands raised palms out, posture shrinking back into the sofa, pupils on MOM.",
    world: "LIVING", mood: "CLEAN", peak: false,
    stage: "RESULT",
    moment: "",
    pop: null,
    move: {"type":"PAN_LEFT","on":"throw","note":"pan with her to the door"},
    device: "CAUSE_EFFECT_CUT",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a wide shot at eye level in the living room — MOM at the open doorway, large, carrying THE WHITEBOARD out under one arm; the empty floor where the board stood; DAD on the sofa, small, both mitten hands raised — the characters drawn large enough that their faces read.",
    map: "left — MOM at the open doorway, large, carrying THE WHITEBOARD out under one arm; centre — the empty floor where the board stood; right — DAD on the sofa, small, both mitten hands raised.",
    check: "wide shot at eye level, horizon level; left: MOM at the open doorway, large, carrying THE WHITEBOARD out under one arm; centre: the empty floor where the board stood; right: DAD on the sofa, small, both mitten hands raised; {BG}.",
    plan: {"ft":"A laugh of relief — gone.","ln":"humour-aside","idea":"Wide: MOM marches the whiteboard out through the doorway under one arm; DAD, on the sofa, raises both palms with a sheepish smile.","alt":["MOM throwing it out of the window (Version 9: a throw that renders as a falling board)","MOM wiping the board clean (smaller than the line)"],"ia":"MOM marches THE WHITEBOARD out of the room → DAD raises both palms with a sheepish smile","dist":"far","look":"","ctx":"","ce":"WHITEBOARD frame","cx":"her deadpan stillness → her decisive exit","ip":""},
    slots: {"L":"MOM at the open doorway, large, carrying THE WHITEBOARD out under one arm","C":"the empty floor where the board stood","R":"DAD on the sofa, small, both mitten hands raised"},
    still: "the pan follows the exit",
    why: "The joke ends on action, then the chapter turns back to the child.",
    heroWho: "Mom",
    pieces: ["sofa","doorway"],
  },
  {
    n: 41, ref: "S41",
    sequence: "01 Listen, not fix me", scene: "Kitchen, after school", tier: "EMOTIONAL", fn: "STORY",
    roles: "Mom", props: ["PHONE","NOTE"], hero: "PHONE",
    feel: "Relief — she stops fixing.",
    meaning: "Hands only: MOM turns THE PHONE over, screen down, on the table and slides THE NOTE aside.",
    shotSize: "HANDS", angle: "EYE", face: "NONE", scale: "ORDINARY",
    framing: "Hands-only close shot at eye level, on the kitchen table, horizon level: at the left MOM's two mitten hands rising from the bottom edge; in the centre THE PHONE lying screen-down on the table top; at the right THE NOTE slid aside, lying flat on the table top.",
    action: "MOM's two mitten hands turn THE PHONE over, screen down, on the table top and slide THE NOTE aside.",
    performance: "MOM's mitten hands move slowly and gently, laying THE PHONE screen-down and pushing THE NOTE away.",
    world: "KITCHEN", mood: "CLEAN", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"HOLD","on":"","note":"hold"},
    device: "INSERT_DETAIL",
    reveal: null,
    link: "THE PHONE returns from S27 with a new meaning: put away, face down.",
    requiredText: "",
    picture: "a hands-only close shot at eye level on the kitchen table — MOM's two mitten hands rising from the bottom edge; THE PHONE lying screen-down on the table top; THE NOTE slid aside, lying flat on the table top.",
    map: "left — MOM's two mitten hands rising from the bottom edge; centre — THE PHONE lying screen-down on the table top; right — THE NOTE slid aside, lying flat on the table top.",
    check: "hands-only close shot at eye level, horizon level; left: MOM's two mitten hands rising from the bottom edge; centre: THE PHONE lying screen-down on the table top; right: THE NOTE slid aside, lying flat on the table top; {BG}.",
    plan: {"ft":"Relief — she stops fixing.","ln":"advice","idea":"Hands only: MOM turns THE PHONE over, screen down, on the table and slides THE NOTE aside.","alt":["MOM wiping the marker lines off the fridge (a bigger action for a quieter line)","MOM putting the plaster back in a drawer (an object from another scene)"],"ia":"","dist":"","look":"","ctx":"","ce":"PHONE","cx":"the busy fridge door → two hands putting the tools down","ip":""},
    slots: {"L":"MOM's two mitten hands rising from the bottom edge","C":"THE PHONE lying screen-down on the table top","R":"THE NOTE slid aside, lying flat on the table top"},
    still: "two hands putting things down is the whole change",
    why: "The line says what children don't need; her hands put it down.",
    pieces: ["table"],
  },
  {
    n: 42, ref: "S42",
    sequence: "01 Listen, not fix me", scene: "Kitchen, after school", tier: "QUIET", fn: "STORY",
    roles: "Mom, Son", props: [], hero: "FIGURE",
    feel: "Warmth — she simply stays.",
    meaning: "Side-on: MOM sits down in the chair he pulled out for her, without a word; his eyes slide toward her.",
    shotSize: "MEDWIDE", angle: "PROFILE", face: "NORMAL", scale: "ORDINARY",
    framing: "Medium-wide shot from the side at eye level, at the kitchen table, horizon level: at the left MOM sitting down on the chair beside SON, large, turned toward him; in the centre the table edge in front of them; at the right SON sitting at the table, large, his head lifting a little toward her.",
    action: "MOM sits down on the chair beside SON, both mitten hands open in her lap; SON keeps his elbows on the table but turns his head a little toward her. INTERACTION BEAT: MOM sits down in the chair beside him without a word, her hands open in her lap; in response, SON's eyes slide toward her and his shoulders drop a little.",
    performance: "MOM: eyes calm and warm, eyebrows soft and level, mouth a gentle closed curve, head tilted toward him, both mitten hands resting open in her lap, posture settled and close, pupils on SON. SON: eyes sliding toward her, eyebrows easing, mouth an uncertain line softening, head turning a little toward MOM, both mitten hands loose on the table, shoulders dropping, pupils on MOM.",
    world: "KITCHEN", mood: "CLEAN", peak: false,
    stage: "REACTION",
    moment: "",
    pop: null,
    move: {"type":"DRIFT","on":"","note":"gentle drift"},
    device: "DISTANCE",
    reveal: null,
    link: "Pays off S34: she takes the chair he offered.",
    requiredText: "",
    picture: "a medium-wide shot from the side at eye level at the kitchen table — MOM sitting down on the chair beside SON, large, turned toward him; the table edge in front of them; SON sitting at the table, large, his head lifting a little toward her — the characters drawn large enough that their faces read.",
    map: "left — MOM sitting down on the chair beside SON, large, turned toward him; centre — the table edge in front of them; right — SON sitting at the table, large, his head lifting a little toward her.",
    check: "medium-wide shot from the side at eye level, horizon level; left: MOM sitting down on the chair beside SON, large, turned toward him; centre: the table edge in front of them; right: SON sitting at the table, large, his head lifting a little toward her; {BG}.",
    plan: {"ft":"Warmth — she simply stays.","ln":"advice","idea":"Side-on: MOM sits down in the chair he pulled out for her, without a word; his eyes slide toward her.","alt":["MOM hugging him (too quick — the line is about staying)","MOM kneeling by his chair (he is a teenager; level seats say equals)"],"ia":"MOM sits down in the chair beside him without a word, her hands open in her lap → SON's eyes slide toward her and his shoulders drop a little","dist":"close","look":"","ctx":"","ce":"none","cx":"far apart in S34 → side by side","ip":"visual-silence"},
    slots: {"L":"MOM sitting down on the chair beside SON, large, turned toward him","C":"the table edge in front of them","R":"SON sitting at the table, large, his head lifting a little toward her"},
    still: "her sitting down is the change; the sequence step carries the rest",
    why: "Love as behaviour — Thomas's 'a parent quietly sitting next to a teenager'.",
    heroWho: "Mom",
    light: {"kind":"warm","where":"one flat oval of warm light on the wall behind the two of them"},
    pieces: ["table","chair"],
  },
  {
    n: 43, ref: "S43",
    sequence: "01 Listen, not fix me", scene: "Kitchen, after school", tier: "HOOK", fn: "STORY",
    roles: "Mom, Son", props: ["JAR"], hero: "JAR",
    feel: "Relief — he isn't carrying it alone any more.",
    meaning: "SON sets THE JAR down on the table between them; MOM leaves it closed and rests her hand on his shoulder.",
    shotSize: "MEDIUM", angle: "EYE", face: "NORMAL", scale: "ORDINARY",
    framing: "Medium shot at eye level, at the kitchen table, horizon level: at the left MOM sitting close at SON's left, large, her arm round behind him, her mitten hand resting on his far shoulder; in the centre THE JAR standing on the table in front of them both, its lid still closed; at the right SON sitting at the table, large, both mitten hands just letting go of THE JAR.",
    action: "SON sets THE JAR down on the table in front of them both and lets go of it; MOM leaves it closed, her arm round behind him and her mitten hand resting on his far shoulder. INTERACTION BEAT: SON sets THE JAR down on the table between them; in response, MOM leaves it closed and rests her mitten hand on his shoulder.",
    performance: "SON: eyes calm and a little shy, eyebrows relaxed, mouth a brave curve, head tipped toward MOM, both mitten hands opening as they let go of THE JAR, posture loosening, pupils on THE JAR. MOM: eyes soft and steady, eyebrows gentle, mouth a warm closed smile, head tilted toward him, one mitten hand resting on his shoulder and the other in her lap, posture close and still, pupils on SON.",
    world: "KITCHEN", mood: "CLEAN", peak: false,
    stage: "RESULT",
    moment: "",
    pop: null,
    move: {"type":"PULL_OUT","on":"","note":"slow pull out"},
    device: "CALLBACK",
    reveal: null,
    link: "Pays off S2 and S17: hidden, then held, now set down between them.",
    requiredText: "",
    picture: "a medium shot at eye level at the kitchen table — MOM sitting close at SON's left, large, her arm round behind him, her mitten hand resting on his far shoulder; THE JAR standing on the table in front of them both, its lid still closed; SON sitting at the table, large, both mitten hands just letting go of THE JAR.",
    map: "left — MOM sitting close at SON's left, large, her arm round behind him, her mitten hand resting on his far shoulder; centre — THE JAR standing on the table in front of them both, its lid still closed; right — SON sitting at the table, large, both mitten hands just letting go of THE JAR.",
    check: "medium shot at eye level, horizon level; left: MOM sitting close at SON's left, large, her arm round behind him, her mitten hand resting on his far shoulder; centre: THE JAR standing on the table in front of them both, its lid still closed; right: SON sitting at the table, large, both mitten hands just letting go of THE JAR; {BG}.",
    plan: {"ft":"Relief — he isn't carrying it alone any more.","ln":"ending","idea":"SON sets THE JAR down on the table between them; MOM leaves it closed and rests her hand on his shoulder.","alt":["MOM opening the jar (Version 9 had a tug over it — taking, not sharing)","THE JAR grown huge and carried by both (Version 9: a size trick for a quiet line)"],"ia":"SON sets THE JAR down on the table between them → MOM leaves it closed and rests her mitten hand on his shoulder","dist":"touching","look":"","ctx":"","ce":"JAR lid","cx":"S2's jar hidden behind his back → the same jar set down between them","ip":""},
    slots: {"L":"MOM sitting close at SON's left, large, her arm round behind him, her mitten hand resting on his far shoulder","C":"THE JAR standing on the table in front of them both, its lid still closed","R":"SON sitting at the table, large, both mitten hands just letting go of THE JAR"},
    why: "The spine object returns with a new meaning: shared, not taken.",
    heroWho: "Son",
    pieces: ["table","chair"],
  },
];

// Insert frames: extra shots cut into a frame on its strongest word; same fields as RAW_BEATS, n = the parent frame's line.
const INSERT_BEATS = [
  {
    n: 14, ref: "S14b",
    sequence: "00 Cold open", scene: "Stairs, that evening", tier: "HOOK", fn: "STORY",
    roles: "Son", props: [], hero: "FACE",
    feel: "The fear itself, up close.",
    meaning: "SON's face alone on pure white at the top of the stairs: eyes wide, eyebrows shot up and drawn together.",
    shotSize: "CLOSE", angle: "HIGH", face: "NORMAL", scale: "ORDINARY",
    framing: "Close shot from a little above head height, in clean white space, horizon level: at the left white space; in the centre SON's face, large; at the right white space.",
    action: "SON's face fills the frame, frozen in fright, one mitten hand pressed to his chest.",
    performance: "SON: eyes wide open in fright, eyebrows shooting up and drawn together, mouth a tight open oval, head pulled back, one mitten hand pressed to his chest, shoulders jumped up, pupils pressed down toward frame left.",
    world: "HALL", mood: "WHITE", peak: false,
    stage: "",
    moment: "",
    pop: null,
    move: {"type":"SNAP_ZOOM","on":"terrifying","note":"snap in"},
    device: "DISTANCE",
    reveal: null,
    link: "",
    requiredText: "",
    picture: "a close shot from a little above head height in clean white space — white space; SON's face, large; white space.",
    map: "left — white space; centre — SON's face, large; right — white space.",
    check: "close shot from a little above head height, horizon level; left: white space; centre: SON's face, large; right: white space; {BG}.",
    cam: "SLIGHTLY_ABOVE",
    plan: {"ft":"The fear itself, up close.","ln":"peak-close-up","idea":"SON's face alone on pure white at the top of the stairs: eyes wide, eyebrows shot up and drawn together.","alt":["a punch into S14 (his face would sit on the red field)","MOM's smiling face (the fear is his)"],"ia":"","dist":"","look":"down and to frame left, toward MOM at the bottom of the stairs","ctx":"follows S14 (the wide red stairs): the same moment, the camera suddenly in on his face","ce":"none","cx":"a wide red stage → one frightened face on white","ip":"snap-to-white"},
    slots: {"L":"white space","C":"SON's face, large","R":"white space"},
    why: "A face close-up never sits on a colour field: the peak's close-up is an insert on white.",
    cutIn: "terrifying",
    insert: true,
    pieces: [],
  },
];
// Sequences: an important moment told as a short run of stills in one scene. Each image is the base frame of a line (type base),
// that frame's in-scene edit from EDIT_CUES (type edit), or an extra edit image (type step, change written here).
// from = the image it is made from — never more than two edits away from a generated base image.
const SEQUENCES = [
  {"id":"Q01","title":"She sits; he sets it down","base":"S42 and S43 bases — generate them now","images":[{"i":1,"ref":"S42","type":"base"},{"i":2,"ref":"S42","type":"step","from":"image 1","on":"prove","change":"SON's head turns a little more toward MOM and his eyes settle on her for a moment, his eyebrows easing; MOM stays exactly as she is, her hands open in her lap. The table, the chairs, the colours and the camera stay exactly as they are."},{"i":3,"ref":"S43","type":"base"}]},
];
// In-scene changes (Muhammad's rule): a dynamic change inside a scene is an image EDIT of this frame's generated image, never a new prompt.
// The editor attaches the frame's image and pastes the edit prompt; show the original, then cut to the edited image on the cue word.
const EDIT_KEEP = "KEEP EXACTLY THE SAME: every character's design — the same round white head size, black hair shape, big white eye circles with black pupils, short thick eyebrows, thin black line body with no fill, small white mitten hands and small white oval feet; everyone and everything not named in the change in exactly the same position and pose; the same background, set pieces, props, colours and flat fills; the same camera position, framing, crop and zoom; the same black ink line thickness and flat 2D style.";
const EDIT_DONT = "DO NOT: move, zoom or re-crop the camera; redraw or restyle any face or character not named in the change; add any object, text, letters, shadow, gradient or glow that the change does not name; change any colour.";
// Each: { ref: "S12", on: "cue word", change: "who changes, from what to what — pose, limbs, head, eyebrows, pupils, mouth, object positions; what stays" }
const EDIT_CUES = [
  { ref: "S8", on: "forgot", change: "MOM straightens up and turns back toward the counter, laughing into THE PHONE, her eyebrows lifting and her mouth opening in a bright laugh, the cloth hanging from her other hand; LITTLE BOY stays exactly as he is, shrunk down in his chair. The table, THE MILK GLASS, the colours and the camera stay exactly as they are." },
  { ref: "S11", on: "distrust", change: "SON's mitten hands slide together behind his back and grip each other tight, and his head sinks a little lower between his shoulders; MOM stays exactly as she is in the doorway. The room, the colours and the camera stay exactly as they are." },
  { ref: "S14", on: "terrifying", change: "SON shrinks back against the banister at the top of the stairs, his shoulders jumping up toward his ears and his eyes squeezing shut; MOM stays exactly as she is, smiling up from the first step. The stairs, the colour field and the camera stay exactly as they are." },
  { ref: "S18", on: "tonight", change: "MOM opens her eyes and breathes out, her shoulders dropping, and lifts one foot onto the first stair, her eyebrows settling level and calm. The stairs, the night colours and the camera stay exactly as they are." },
  { ref: "S30", on: "investigation", change: "MOM stretches up on her toes and draws one more long marker line across THE FRIDGE door to a new paper; SON slides even lower in his chair until only his head shows above the table edge. The kitchen outlines, the other papers on the fridge door, the colours and the camera stay exactly as they are." },
  { ref: "S43", on: "alone", change: "SON's head tips gently sideways until it rests against MOM's shoulder, his eyes closing into two calm curves; MOM's hand stays on his shoulder. THE JAR, the table, the colours and the camera stay exactly as they are." },
];
const EDIT_WHO = {"Mom":"MOM is the woman with black hair in a round bun on top","Son":"SON is the teenage boy with messy spiky black hair","Little Boy":"LITTLE BOY is the small seven-year-old boy with the same messy spiky black hair as SON","Dad":"DAD is the man with flat side-parted black hair and small rectangular glasses","Kevin":"KEVIN is the young man with one smooth wave of black hair and a small bow tie","Boss":"BOSS is the man with a neat square black flat-top and a narrow navy tie","Sarah":"SARAH is the woman with one long high black ponytail"};
function editWho(e) {
  const a = RAW_BEATS.find(x => x.ref === e.ref);
  const people = a.roles === "No characters" ? [] : a.roles.split(",").map(r => r.trim()).filter(r => EDIT_WHO[r]).map(r => EDIT_WHO[r]);
  const things = Object.values(PROP).filter(p => p.name && e.change.includes(p.name)).map(p => { const key = Object.keys(PROP).find(k => PROP[k] === p), T = TONE[String(p.hex).toUpperCase()], col = T ? (isAccentKey(a, key) ? T.bright[0] : T.calm[0]) : p.colour; return p.editLook ? `${p.name} is ${p.editLook}` : p.rest && p.part ? `${p.name} ${/[^S']S$/.test(p.name) ? "are the objects with their" : "is the object with its"} ${p.part.replace(p.name + "'s ", "").replace(p.name + "' ", "").replace(/\s*\(#[0-9A-Fa-f]{6}\)/g, "")} — ${p.rest}` : `${p.name} ${/[^S']S$/.test(p.name) ? "are" : "is"} the ${col ? col + " " : ""}${p.name.replace(/^(THE|HIS OWN|MOM'S|DAD'S|SON'S|THE CLASSMATE'S|THE COUSIN'S) /, "").toLowerCase()}`; });
  const list = [...people, ...things];
  return list.length ? `WHO AND WHAT IS WHO IN THIS IMAGE: ${list.join("; ")}.` : "";
}
function editPrompt(e) { const f = (typeof RAW_BEATS !== "undefined" ? RAW_BEATS : []).find(x => x.ref === e.ref); const word = !(f && f.onScreen) ? "" : f.onScreen.font ? `KEEP THE WORD: the on-screen word "${f.onScreen.w}" stays exactly as it is — the same letters, spelling, colour, size and place.` : (() => { const n = wordLines(String(f.onScreen.w)).length; return `KEEP THE TEXT: if the image shows the on-screen text "${f.onScreen.w}"${n > 1 ? ` (on ${n} lines)` : ""}, it stays exactly as it is — the same letters, line breaks, spelling, colours, size and place, with nothing moving in front of it; if the image has no text, add none.`; })(); return [`EDIT THIS IMAGE — make exactly one change and keep everything else identical.`, editWho(e), `CHANGE: ${e.change}`, EDIT_KEEP, word, EDIT_DONT].filter(Boolean).join("\n\n"); }

// Revision rounds: one batch per round of feedback; entries list the refs to regenerate.
const REVISIONS = [
  {"batch":"Build 1 — 2026-10-09 · first full build (compiler v24)","entries":[]},
];

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
// v25: on a PEAK colour field, an object (or a mark, or a word) in the field's own hue would vanish into it — it is drawn white
// with its bold black outline instead, so it stands out sharply (the red F on a red field becomes a white F).
function _sat(hex) { const v = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255), mx = Math.max(...v), mn = Math.min(...v); return mx ? (mx - mn) / mx : 0; }
function clashesField(b, hex) {
  if (moodOf(b.mood) !== "PEAK" || !/^#[0-9A-Fa-f]{6}$/.test(String(hex || ""))) return false;
  const f = framePalette(b).ground[1]; if (_sat(f) < 0.25 || _sat(hex) < 0.25) return false;
  const d = Math.abs(hueOf(f) - hueOf(hex)); return Math.min(d, 360 - d) < 30;
}
function fieldIsLight(b) { return moodOf(b.mood) === "PEAK" && hexToLab(framePalette(b).ground[1])[0] >= 68; }
const isPlain = (b, k) => (b.plain || []).includes(k) || (heroKey(b) !== k && ce2Key(b) !== k) || clashesField(b, PROP[k] && PROP[k].hex);
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
  if (b.shotSize === "WORD") return `SETTING: a plain, clean, pure white (#FFFFFF) frame, flat and empty from edge to edge${items.length ? ", with only the one small object named here, small and low in the frame, resting on nothing" : ""}${b.onScreen ? "; the only thing on it is the word named under TEXT" : ""}.`;
  const W = WORLD[b.world];
  if (!W) throw new Error(`Unknown WORLD "${b.world}" in ${b.ref}`);
  if (key === "WHITE") return `SETTING: a plain, clean, pure white (#FFFFFF) background from edge to edge — open white space around ${face ? "the characters" : names.length ? "the hands" : "the object"}${items.length && names.length ? " and the story objects named here" : ""}, with nothing drawn behind them. ${face ? "The face and its expression carry the whole frame." : names.length ? "The hands and what they do carry the whole frame." : "The story object carries the whole frame."}`;
  let g = `${P.ground[0]} (${P.ground[1]})`; const ln = `${P.line[0]} (${P.line[1]})`;
  const wider = WIDER.includes(b.shotSize) || (b.shotSize === "OBJECT" && !pieceList(b).length);
  const parts = W.parts ? pieceList(b).map(p => outlineText(p[2])) : [];
  const idea = !W.parts && W.text ? outlineText(W.text).replace(/[;,.]?\s*nothing else\.?\s*$/i, "").replace(/[.\s]+$/, "") : "";
  const hasGround = /ground line|floor line|horizon/i.test(idea);
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
  const lineOnly = !parts.length && /^(?:one|a) [a-z ]*\b(?:floor|ground) line$/i.test(idea); // the place is only its ground line
  const pcs = parts.length ? `; ${label ? `${theLabel(label)} is told` : "the place is told"} by ${parts.length > 1 ? "these pieces" : "this piece"}: ${parts.join("; ")} — ${parts.length > 1 ? "each" : ""} drawn as ${fillTxt}, complete and standing firmly on the ground, never a pale or glowing outline` : lineOnly ? `; ${idea} in ${P.line[0]} (${P.line[1]}) runs under the figures` : idea ? `; ${idea}, drawn as ${fillTxt}` : "";
  return `SETTING: ${head}${pcs}${wider && !hasGround && !lineOnly ? `; one ${P.line[0]} ground line runs under the figures` : ""}; the rest of the field is plain and open.`;
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
  return `LIGHT: one flat, clean-edged shape of ${night && b.light.kind === "warm" ? "warm lamplight" : b.light.kind === "cool" ? "cool window light" : "light"} in ${L[0]} (${L[1]})${b.light.where ? ` — ${b.light.where}` : ""} — ${L[2]}; the light itself is a flat shape with a sharp edge — never a soft glow, gradient or beam.`;
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
function glowText(b, hero, whiteKey) {
  const g = b.glow && GLOW[b.glow]; if (!g) return "";
  const who = hero ? (PROP[hero.key] || {}).name : whiteKey ? (PROP[whiteKey] || {}).name : b.accentMark ? "the action" : ""; if (!who) return "";
  return `GLOW: around ${who}, ${whiteKey && b.glow !== "rainbow" ? g.replace(/paler versions? of its own colou?r/, "white") : g}.`;
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
  // v25: a focus in the PEAK field's own hue turns white with its bold outline (clashesField)
  const hk = heroKey(b), whiteHero = !hero && hk && key === "PEAK" && clashesField(b, (colourEl(b) || {}).hex || PROP[hk].hex) ? hk : null;
  const accent = !b.calm, markCol = b.accentMark ? ACCENT_COL[String(b.accentCol || "YELLOW").toUpperCase()] || ACCENT_COL.YELLOW : null; // v24: bright by default
  const mark = markCol && clashesField(b, markCol[1]) ? ["bold black ink", "#1A1A1A"] : markCol;
  const plural = i => /[^S']S$/.test((PROP[i.key] || {}).name || "");
  const after = names.length && !hands ? "right after the faces" : names.length ? "right after the hands" : "first";
  const fieldName = key === "PEAK" ? `${P.ground[0]} field` : "";
  const heroLine = hero ? (accent ? `THE BRIGHT COLOUR FOCUS in this frame is ${hero.text} — vivid, saturated, crisp-edged and full of life, deliberately the brightest colour in the picture, so the eye goes to it ${after}.` : `The one colour in this frame is ${hero.text}, in ${plural(hero) ? "their" : "its"} calm, deeper tone — a deliberately quiet moment.`) : whiteHero ? `THE FOCUS in this frame is ${PROP[whiteHero].name}, drawn white with a bold black outline so it stands out sharply against the ${fieldName}, so the eye goes to it ${after}.` : mark ? `${mark === markCol ? "THE BRIGHT ACCENT" : "THE ACCENT"} in this frame is ${b.accentMark}, in ${mark[0]} (${mark[1]}) — ${mark === markCol ? "vivid and deliberate" : "bold and deliberate against the field"}, so the eye goes to the action ${after}.` : "";
  // v25: drawn marks may sit beside a coloured focus — they carry the feeling of the action (Thomas: "emotional moments need stronger, brighter colors")
  const markLine = mark && (hero || whiteHero) ? `MARKS: at the point of action, ${b.accentMark}, in ${mark[0]} (${mark[1]}) — a few bold drawn strokes that carry the feeling of the action, never decoration.` : "";
  const restLine = rest.length ? `${rest.map(i => i.text).join("; ")} — ${rest.length > 1 ? "each in its" : plural(rest[0]) ? "in their" : "in its"} own clear colour, quieter than ${hero || mark || whiteHero ? "the focus" : "the faces"}.` : "";
  const wcK = String((b.onScreen && b.onScreen.col) || "BLACK").toUpperCase();
  const wordCol = b.onScreen && !b.onScreen.font && !["BLACK", "WHITE", "GREY"].includes(wcK) && !(WORD_COLOUR[wcK] && clashesField(b, WORD_COLOUR[wcK][1])); // a coloured word is the one allowed exception
  // set pieces are black line on the light stages only: at night and on a peak they are solid tonal shapes, in absence quiet grey
  const linePieces = ["CLEAN", "WHITE", "MEMORY"].includes(key) && !b.mute;
  const except = [key === "PEAK" ? "the field" : "", markLine ? "the marks" : "", wordCol ? "the word named under TEXT" : ""].filter(Boolean);
  const others = propItems(b).filter(i => i.key !== hk && !items.some(x => x.key === i.key)).length; // story objects left in black line
  const apart = except.length ? `, apart from ${except.length > 1 ? except.slice(0, -1).join(", ") + " and " + except[except.length - 1] : except[0]}` : "";
  const calmTail = !(items.length || mark || whiteHero) ? "" : linePieces ? `Every other object and every set piece is black line with white fill — no other strong colour anywhere in the frame${apart}.` : others ? `Every other story object is black line with white fill — no other strong colour anywhere in the frame${apart}.` : `No other strong colour anywhere in the frame${apart}.`;
  const glowLine = glowText(b, hero, whiteHero);
  const none = !items.length && !mark && !whiteHero ? (ce && ce.white ? `Nothing carries strong colour; ${ce.text}, white with one bold black outline, carries the frame.` : `Nothing carries strong colour; ${subject} with ${/^the white figures/.test(subject) ? "their bold black outlines carry" : "its bold black outline carries"} the frame.`) : "";
  const capCol = wordCol ? textInk(b, b.onScreen) : "";
  const none2 = none && capCol ? none.replace("Nothing carries strong colour;", `Nothing carries strong colour except the on-screen keyword in ${capCol};`) : none;
  const accLine = acc ? " The characters' own small accessories keep their muted locked colours." : "";
  const pcsShown = b.shotSize !== "XCLOSE" || b.slice ? pieceList(b) : [];
  if (b.shotSize === "WORD") return `COLOUR: The whole frame is pure white (#FFFFFF). ${hero ? heroLine + " Everything else is white." : capCol ? `Only the word carries colour, in ${capCol}; everything else is white.` : "Nothing in it carries colour."}`;
  if (key === "CLEAN" || key === "WHITE" || key === "MEMORY") {
    const bg = key === "WHITE" ? "The background is pure white (#FFFFFF), clean and empty from edge to edge." : `The background is plain ${b.mute ? "very light cool grey (#F1F3F5)" : `${P.ground[0]} (${P.ground[1]})`}, flat and even from edge to edge.`;
    const setLine = key === "WHITE" || !pcsShown.length ? "" : b.mute ? "" : ` The place reads at a glance without any colour on walls, floor or furniture.`;
    const mem = (key === "MEMORY" ? ` This is a memory: the set pieces are faded and soft, like an old photograph, with warm grey lines.${names.length ? (hands ? " The mitten hands stay pure white with bold black outlines." : " The characters stay pure white with bold black outlines, exactly as on a white page.") : ""}` : "") + (b.mute ? ` This moment is drained of warmth on purpose — absence: the place is quiet cool grey-blue and the other objects are black line.` : "");
    return clean([`COLOUR: ${bg}`, heroLine, markLine, glowLine, restLine, none2, calmTail, setLine, mem, accLine, chars]);
  }
  const white = names.length ? (hands ? " The mitten hands stay pure white with bold black outlines." : " The characters stay pure white with bold black outlines, exactly as on a white page — never tinted by the field.") : "";
  const objs = items.length || mark || whiteHero ? clean([heroLine, markLine, glowLine, restLine, key === "NIGHT" && !accent ? "Story objects keep their own colours, only a shade darker for the night, and stay clearly visible against the set pieces." : "", calmTail]) : "No object carries colour; the field and the white faces carry the frame.";
  if (key === "PEAK") return clean([`COLOUR: The background is one flat, even ${P.ground[0]} (${P.ground[1]}) field filling the whole frame — the colour of this emotional peak, bold and saturated, flat from edge to edge with no gradient, texture or vignette; set pieces are solid flat shapes in ${P.line[0]} (${P.line[1]}) with a thin darker outline.${white}`, objs, accLine]);
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

function isDarkField(b) { const m = moodOf(b.mood); return m === "NIGHT" || (m === "PEAK" && !fieldIsLight(b)); }
// letters on an object (the teacher's handwritten grade) keep that object's own ink
function objectInk(b, w) { const k = String(w.col || "BLACK").toUpperCase(); const c = WORD_COLOUR[k] && k !== "GREY" ? WORD_COLOUR[k] : WORD_COLOUR.BLACK; return `${c[0]} (${c[1]})`; }
// a word of three or more parts breaks into two lines
function wordLines(txt) { const parts = String(txt).split(" "); if (parts.length >= 3) { const h = Math.ceil(parts.length / 2); return [parts.slice(0, h).join(" "), parts.slice(h).join(" ")]; } return [String(txt)]; }
function spelled(txt) { return txt.split(" ").map(x => x.split("").join("-")).join(", then a space, then "); }
// v25: a word in the PEAK field's own hue would vanish — it takes the plain ink of that field (white on a dark field, black on a light one)
function textInk(b, w) { const k = String(w.col || "BLACK").toUpperCase(), same = WORD_COLOUR[k] && clashesField(b, WORD_COLOUR[k][1]); if (isDarkField(b)) return k === "BLACK" || !WORD_COLOUR[k] || same ? "plain white (#FFFFFF)" : `${WORD_COLOUR[k][0]} (${WORD_COLOUR[k][1]})`; const c = same || !WORD_COLOUR[k] ? WORD_COLOUR.BLACK : WORD_COLOUR[k]; return `${c[0]} (${c[1]})`; }
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
// WORD frames — v24.1 (Muhammad: the text goes in the image prompts, never a separate image): a pure white frame with the
// line's word hand-lettered into it (or the one small object named), generated like any other frame.
function wordPrompt(b) {
  const items = propItems(b), w = b.onScreen;
  return clean([
    `ONE single 16:9 landscape frame for a modern parenting explainer: a plain, clean, pure white (#FFFFFF) frame${w ? ` holding one big hand-lettered word, "${String(w.w)}", as the whole picture` : ""}${items.length ? `, with one small object drawn in flat 2D style with one medium-thin black ink outline, small and low in the frame` : ""}.`,
    items.length ? propLock(b) : "",
    worldBlock(b), colourBlock(b),
    "CHARACTER COUNT: exactly 0. No person, head, face, hand or silhouette anywhere in this frame.",
    textLock(b),
    "FLAT 2D STYLE: matte flat fills, no gradients, shading, cast shadows, soft glow, texture, 3D or blur.",
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
  { let av = b.eyesOnly ? GLOBAL_AVOID.replace(" a face with no mouth;", "") : GLOBAL_AVOID; { const AV_COL = "coloured walls, floors, grass or furniture, a whole room in one colour tone, or strong colour anywhere except on what the colour line names;", mk = moodOf(b.mood); // v25: the avoid line agrees with a colour stage
    if (mk === "PEAK" || mk === "NIGHT") av = av.replace(AV_COL, "walls, floors, grass or furniture in any colour other than the one flat field and its deeper tone, or strong colour anywhere except on what the colour line names;");
    else if (b.mute) av = av.replace(AV_COL, "walls, floors, grass or furniture in any colour other than the quiet grey, or strong colour anywhere except on what the colour line names;"); } if (b.onScreen) av = av.replace("printed words, letters, captions or signs;", "any other printed words, letters, captions or signs, or a misspelled word;"); if (WORLD[b.world] && (WORLD[b.world].set === "KITCHEN" || /kitchen/i.test(placeLabel(b)))) av = av.replace("busy rooms,", "busy rooms, a sink, tap, cooker or cupboards,"); parts.push(av); }
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
function colourWhy(b) { if (b.colourReason) return b.colourReason; const k = _ceKey(b), P = k && PROP[k]; const m = P ? (P.why || (P.fam && COLOUR_LOGIC[P.fam] ? `${P.fam.toLowerCase()} = ${COLOUR_LOGIC[P.fam]}` : "")) : (b.accentMark && b.accentCol ? `${String(b.accentCol).toLowerCase()} = ${COLOUR_LOGIC[String(b.accentCol).toUpperCase()] || ""}` : ""); const F = moodOf(b.mood) === "PEAK" && EMOTION_FIELD[b.peakCol], st = F ? `stage: ${F.field[0]} field (${String(b.peakCol).toLowerCase()} = ${F.means})` : ""; if (b.mute && !k) return ["grey = " + COLOUR_LOGIC.GREY, st].filter(Boolean).join(" · "); if (!k && !b.accentMark) return st; if (k && F && clashesField(b, P.hex)) return [`white on its own colour stage (${P.fam ? P.fam.toLowerCase() : "its colour"} would vanish into the field)`, st].join(" · "); return [`${b.calm ? "calm" : "bright"}${b.accent ? " — " + b.accent : ""}${m ? " (" + m + ")" : ""}${b.glow ? " · glow: " + b.glow : ""}`, st].filter(Boolean).join(" · "); }
const BEATS = RAW_BEATS.map(b => ({ ...b, mood: moodOf(b.mood), ...(MOOD_ALIAS[b.mood] && !b.moodWas ? { moodWas: b.mood } : {}), script: b.script || SCRIPT[b.n - 1] || "", colourReason: colourWhy(b) }));
// v24.1: the word is part of the frame prompt; if Flow misspells it, the word-fix edit repairs it on the same image
function wordFixPrompt(b) {
  const w = b.onScreen, txt = String(w.w);
  return [`EDIT THIS IMAGE — make exactly one change and keep everything else identical.`, `CHANGE: redraw the ${w.font ? `letter ${w.at ? "set " + w.at : "on the object"}` : "on-screen word"} so it reads exactly "${txt}" — spelled ${spelled(txt)} — in the same ${w.font ? "handwritten marker strokes" : "bold hand-lettered capitals"}, the same colour, size and place; any missing, doubled or misshapen letter is redrawn correctly, and nothing else is added.`, EDIT_KEEP, EDIT_DONT.replace("add any object, text, letters,", "add any object, other text or letters,")].join("\n\n");
}
const PROMPTS = BEATS.map(b => ({ ...b, prompt: buildPrompt(b), ...(b.onScreen ? { wordFix: wordFixPrompt(b) } : {}) }));

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
            {INSERT_PROMPTS.map(p => <PromptBox key={p.ref} label={`${p.ref} · “${p.script}” · cut in on “${p.cutIn || p.move.on}”`} meta={p.meaning} text={p.prompt} />)}
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
