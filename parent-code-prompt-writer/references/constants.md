# Constants — the construction contract and the dictionary patterns (v19)

Every frame is generated independently with no memory of any other, so anything not restated in
every prompt gets re-invented. The shared constants below are compiled into every prompt by the
compiler. **The live text is in `assets/compiler-v24/template.jsx`; the block below is a copy of it
taken when v19 was written (5 Oct 2026). If the two ever differ, the template wins — re-copy it here,
never paraphrase it.** If a constant needs changing, change it in the template and here together, and
update any check that searches for its wording (a reworded constant silently passing a check that looks
for text that no longer exists bit Video 2 three times).

> **v19:** `v19-principles.md` wins over anything here. What changed in the constants: the white or very light neutral
> ground by default (CLEAN), places as thin soft-grey outline cues, one colour element per frame, full colour only for
> emotional peaks (PEAK) and night (NIGHT); all seven expression features in every performance; an action and a visible
> reaction in every shared frame, with a planned distance; "one strong object, one strong face, one strong gesture";
> hands-only forearms from the bottom edge; a mouth that is always a clear shape; no bald or featureless round heads; no
> generic symbols; the new shot types FACE_HANDS, REACTION and WORD. The v18 constants are kept in
> `assets/legacy/compiler-v18_3/template.jsx` as legacy.

## Why the split is shaped like this (kept from the Innes system)
1. **A prompt carries only what is in that frame.** The shared construction block is genuinely
   universal (every character is built the same way); per-character traits, per-location details
   and per-object specs live in their own dictionary entries and are pulled in only where used.
2. **Identity is locked; pose and expression never are.** Characters, objects and settings get
   locked entries. Pose, action and expression are written fresh for every frame — locking them is
   exactly what would make a batch monotonous.
3. **Construction before identity before pose before expression before setting.** The generator
   weights early text more heavily; describing a pose before the stick-figure construction lets it
   commit to a fuller human body first.
4. **Top and tail.** The hand and eye locks appear near the start and again near the end
   (`CONSTRUCTION_RESTATED`, `GLOBAL_AVOID`). A rule stated once in the middle of a long prompt is
   functionally absent — Video 2 proved it.

## How Thomas's prompts differ from Innes's
Same architecture, same length class (~12–15k characters for a character frame), different taste: the
Innes restraint rules for faces (subtle brows, no exaggeration) and the five-strand MC are gone —
Thomas wants expressions stronger than life, with a ceiling. Since 5 Oct 2026 his backgrounds are, like
Innes's, white or very light neutral with minimal outline staging — but with one strong colour element,
full colour for emotional peaks and night, and a closer, more varied camera. Two production lessons are
enforced in the wording itself:
- **No instruction-shaped language.** Nothing like "override", "read these first", "check this last",
  "verify", "step one", "count them before finishing". Video 2's prompts opened with "READ THESE
  EIGHT RULES FIRST… THEY OVERRIDE EVERYTHING" and were refused as a prompt injection. A prompt
  describes a picture.
- **No rules that fight.** "Wobbly line" + "one clean stroke" gave scribbled legs; "thumb notch" +
  "never fingers" gave missing hands; "maximum exaggeration" with no limit gave rage faces. So the
  hand-drawn feel lives in the ink quality, never the stroke path; the hand is defined once,
  positively, as a mitten loop with a soft thumb bump (the word "finger" never appears); every push
  on expression carries its ceiling. v19 adds positive phrasing for colour: "The background is …",
  "The only coloured element in the whole image is …".

## Shared constants (copy of the v19 template)

```javascript
// ── SHARED CONSTANTS ───────────────────────────────────────────────────

const SINGLE_FRAME = "ONE single 16:9 landscape frame showing one physical moment — a hand-drawn 2D animation still for a mature, understated parenting explainer for parents and teenagers, flat colours, the characters in clean black ink outlines. No storyboard, panels, borders, captions, subtitles or printed words. A wide shot shows figures small in the space, a medium shot a figure about half the frame high, a close-up the head and shoulders filling most of the frame. Every character is a simple stick figure in the style of the attached references — a round white head and a thin black line body with no fill — never a realistic or anime-style person, never skin colour, clothing, a dress or a filled black body.";

const REF_SPEC = "the same head shape and head size as in the references, the same small half-round ears, big white round eyes with large black pupils, short thick eyebrows, a drawn mouth that changes shape with the feeling, thin black line body, white mitten hands with no cuffs, small white oval feet, the same ink line thickness and the same height difference as the MOM-and-SON height sheet";
// REFERENCE_LOCK (shown in the Constants tab): the frame-by-frame version is built by refLock() in the compiler.
const REFERENCE_LOCK = "CHARACTERS FROM THE ATTACHED REFERENCE IMAGES: MOM is exactly the attached MOM reference images and character sheets, and SON is exactly the attached SON reference images and character sheets; every other character is drawn by copying the MOM or SON reference and changing only the listed hair, size and small items — " + REF_SPEC + ". Only the pose, expression, camera and setting change here; nobody is redesigned.";

const CORE_CONSTRUCTION = "CONSTRUCTION, as in the references: a large round white head with small half-round ears; big white round eyes, each with one large black pupil about half the eye's width, placed toward what the character looks at; two short thick eyebrow dashes with rounded ends whose tilt carries the emotion; a mouth that changes shape with the emotion. From the neck down the body is one thin black line; the arms curve out from its top like rounded shoulders; every arm and leg is one thin black line with soft bends — no width, no white fill, no torso shape, no clothing. Hands are small white rounded mittens with one thumb bump and no cuff or band at the wrist; feet are small flat white ovals. Head size as in the references: MOM's head is about one-fifth of her standing height, SON's about one-quarter of his, and SON stands clearly shorter than MOM; a bigger face on screen always comes from the camera moving closer. Characters without a reference image are built the same way — adults with MOM's proportions, teenagers with SON's — with their own hair and accessories. Everyone looks at something inside the scene, never into the camera.";

const HAND_LOCK = "HANDS: every arm ends in a small white mitten with one thumb bump and no cuff, as in the references; a held object stays visible in the hand; a hand near the camera stays in proportion — never a giant glove or one long arm stretched across the frame. Every character has exactly two arms, each ending in exactly one mitten hand — never a third arm or hand.";

// Added after the Video 4 hook renders (an upside-down table shot and a fisheye kitchen): keep every camera natural.
const NATURAL_PERSPECTIVE = "PERSPECTIVE: a natural normal-lens view — level horizon, straight verticals, normal proportions, everyone upright; no fisheye, tilt, upside-down view or oversized foreground hand.";

const HANDS_ONLY_CONSTRUCTION = "HANDS-ONLY CONSTRUCTION: only hands and short forearms are in this frame, entering from the nearest frame edge — the bottom edge, or the bottom corners when two people share the frame — as short lines; never long arm lines stretched across the frame. Each forearm is one thin black ink line — never a white tube, a thick arm or a sleeve — ending in a small white mitten hand with one thumb bump, exactly the line thickness and hand shape of the reference images. No head, face, hair, torso or legs appear anywhere in the frame.";

// v19 (Thomas, Oct 5: "eyes, eyebrows, mouth movement, head position, hand gestures, posture, eye direction. The characters
// should not just 'stand in the scene.' They should clearly react."): every face shows one emotion through all seven features.
const PERFORMANCE_AND_EXPRESSION = "EXPRESSION: every face shows one clear emotion with all seven features working together — the eyes (how wide or narrow, soft or hard), the eyebrows (their tilt carries the feeling), the mouth (a big clear shape, never a tiny neutral dash), the head position (tilted, dropped, turned away or lifted), a hand gesture, the posture of the whole stick body, and the eye direction (the pupils pressed toward what the character looks at). Every character is caught mid-action — doing something, then reacting — never just standing in the scene. Pushed stronger than life, in the reference construction: no teeth, snarl or distorted eyes; pride is a clean smile; thinking is a head tilt, never a hand on the chin.";
// Version 9 (Muhammad, Oct 2026: "less emotion expressed and character interaction"): how far each tier pushes the face
const EXPRESSION_STRENGTH = {
  HOOK: "EXPRESSION STRENGTH — FULL: the feeling at its peak, readable from across the room — eyebrows at a steep angle, pupils pressed hard toward their target, a big bold mouth shape, the head tilted and the body leaning, recoiling or slumping with it.",
  EMOTIONAL: "EXPRESSION STRENGTH — FULL: the feeling at its peak, readable from across the room — eyebrows at a steep angle, pupils pressed hard toward their target, a big bold mouth shape, the head tilted and the body leaning, recoiling or slumping with it.",
  SIMPLE: "EXPRESSION STRENGTH — CLEAR: the feeling reads at a glance — eyebrows clearly angled, a clear mouth shape, the body turned with the action; never a blank face.",
};

// v19 (Thomas: "more real interaction between characters"; emotion through "eye contact, hesitation, body language, distance
// between people, hands, reactions, silence"): an action and a visible reaction, the eye line clear, the distance as planned.
const INTERACTION = "INTERACTION: one character acts and the other visibly reacts in this same frame — each with their own clear face, hands and posture, their heads and bodies turned by the moment, toward each other or clearly away. The eye line is unmistakable: a meeting look is a clear straight line of sight between the two faces; an avoided look turns the pupils and the head clearly away.";
// dist: the planned distance between the characters (apart for conflict, close for repair, touch where it pays off)
const DISTANCE = {
  touching: "they touch — a hand on an arm or a shoulder, or sitting pressed side by side; the touch is part of the moment",
  close: "close together, within easy reach of each other",
  apart: "apart, with a clear empty gap of open space between them, more than an arm's length",
  far: "far apart on opposite sides of the frame, the wide empty space between them part of the story",
};

const RECOGNITION = "RECOGNITION: each character is identifiable at a glance even when small, in profile or from behind — MOM by her black bun and her greater height, SON by his black spiky messy hair and shorter build, anyone else by their own described hair and accessories; no two characters share a hair shape.";

const RECURRING_CONSISTENCY = "RECURRING CONSISTENCY: characters keep the references' hair, head size, height and build; every named object keeps the same shape and part count, colour and size across frames; the camera changes only pose, crop and angle.";

// v19 visual order with the white default: people first, then the one colour element, then the outline place.
const COLOUR_HIERARCHY = "VISUAL ORDER: first the characters and their faces, then the one colour element, last the place. The white characters with bold black outlines are the strongest contrast in the frame; set pieces are thinner, softer lines that never compete, and nothing white-filled overlaps a character's outline. The eye knows at once where to look.";

// v19 (Thomas: "one strong object, one strong face, one strong gesture"; "one door outline, one bed outline, one chair, one
// object is enough"): less, but stronger.
const DETAIL_CAP = "LESS, BUT STRONGER: one strong object, one strong face, one strong gesture. Only the characters, objects and outline set pieces named here appear; the place is suggested by those few outlines alone, and the rest of the space stays plain and open — no wall art, plants, lamps, extra furniture, people or clutter. Every shape is finished and closed, nothing cut off except by the frame edge.";

const CONSTRUCTION_RESTATED = "CHARACTER LOCKS: exactly as the attached references — head size as in the references, big white round eyes with large black pupils, short thick eyebrows, a drawn mouth, thin black line bodies and limbs with no fill, white mitten hands, small white oval feet, no clothing beyond each character's named accessory; SON clearly shorter than MOM; nothing casts a shadow.";

const FLAT_STYLE = "FLAT 2D STYLE: matte flat fills; characters and story objects in one medium-thin black outline; set pieces in thinner, softer lines; no gradients, shading, cast shadows, glow, 3D or blur; something switched on or important shows as flat colour, a bolder outline or a few short ink dashes; everything rests on its ground line.";

// v19: kept short (R3 §8 — conflicting or stacked instructions are the real risk, not length).
const GLOBAL_AVOID = "AVOID: a head smaller or larger than in the references, or a bald, featureless round head; a white-filled torso, thick tube arms or width on any limb; a hand ending in a bare line, or a cuff around a mitten; eyes without a white circle; a face with no mouth; hair changing shape from the references; any garment; teeth, snarls or distorted faces; a hand-on-chin pose; blank faces and stiff bodies just standing in the scene; a look into the camera; a teenager as tall as an adult; coloured walls, coloured furniture or a room filled with one colour; generic symbols — hearts, stars, trophies, emoji-style icons, or picture bubbles standing in for a feeling; busy rooms, clutter, texture or background people; strong red on anything that is not danger; shadows, gradients, glow or blur; half-drawn shapes; printed words or captions except the one named text; realistic or 3D rendering.";

const TIER = {
  SIMPLE: "SCENE TIER — SIMPLE: a clean connective moment, quick to read — one clear action, simple staging, the feeling still readable at a glance.",
  EMOTIONAL: "SCENE TIER — EMOTIONAL: a turning point of the story — everything visible of the characters carries the full weight of this moment.",
  HOOK: "SCENE TIER — HOOK: a peak of the video — bold staging, a clear change of camera distance or scale, and the strongest contrast of its section, still built around one clear idea.",
};

// Shot types (v19 adds FACE_HANDS, REACTION and WORD).
const SHOT = {
  XCLOSE: "extreme close-up",
  CLOSE: "close-up",
  MEDIUM: "medium shot",
  MEDWIDE: "medium-wide shot",
  WIDE: "wide shot",
  FACE_HANDS: "face-and-hands close-up: the face and both mitten hands fill the frame together, the hands raised into the frame near the face so the gesture and the expression read as one",
  REACTION: "reaction close-up: one face, with the top of the shoulders, filling most of the frame, caught in the instant it reacts to what just happened",
  HANDS: "hands-only close shot, cropped at the forearms, no head or face anywhere in the frame, the hands and what they hold filling most of the frame",
  OBJECT: "object close-up with no character in the frame",
  WORD: "plain white word frame: empty pure white space that holds one on-screen word, added later in the edit",
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
  EYES: "EYES-ONLY CROP: only the band from the top of the eyebrows to just below the eyes fills the frame width; the round head outline runs off the top, left and right edges; no mouth, neck, arms or body in frame — the eyes and eyebrows keep their reference shapes, only the camera is closer.",
  HUGE: "FACE SIZE — HUGE: the camera moves in so close that the head alone fills most of the frame and the body is cropped out below it — the head keeps its normal proportions, only the camera is closer; eyes, eyebrows and mouth are drawn big and decisive so the feeling reads instantly — bigger features, never a distorted face.",
};

const SCALE = {
  ORDINARY: "",
  DOMINANT: "SCALE — DOMINANT: {HERO} is drawn oversized on purpose for this moment — clearly bigger than its usual size and the heaviest shape in the frame, at the size the action gives (this overrides the usual size in the objects list) — with every one of its counted details still drawn.",
  OVERWHELMING: "SCALE — OVERWHELMING: {HERO} towers over the figures and fills most of the frame — this overrides the usual size in the objects list — keeping its exact shape, colour and counted details.",
};

const TYPOGRAPHY = "bold hand-drawn black capital letters with slightly uneven rounded strokes, large and few";
const DANGER_RED = "#D32F2F";
const KEY_GREEN = "#00B140";
const KEY_MAGENTA = "#FF00FF";

// ── BACKGROUND AND MOODS (v19) ─────────────────────────────────────────
// CLEAN_GROUND: the default ground — one constant so a test strip can swap it (assemble.cjs: CLEAN_GROUND=#FFFFFF node assemble.cjs …).
const CLEAN_GROUND = "#F7F6F3";
const CLEAN_GROUND_OPTIONS = { "#F7F6F3": "very light warm neutral", "#FFFFFF": "pure white", "#F4F2EE": "very light stone", "#F2F4F5": "very light cool grey" };
const OUTLINE_GREY = "#B4B8BD"; // the thin soft-grey line of every outline set piece and ground line on CLEAN
// MOOD: five moods. kind: clean | white | peak | night | memory. ground = the background; line = the set pieces' outline colour;
// fill = the set pieces' fill. (wall/floor/furn/sky/field are kept as aliases of ground/fill for older scripts.)
const _pal = (ground, line, fill) => ({ ground, line, fill, wall: ground, floor: ground, sky: ground, field: ground, furn: fill });
const MOOD = {
  CLEAN:  { label: "CLEAN", kind: "clean", feel: "the default — a very light neutral ground, the place as thin outlines, one colour element", ..._pal([CLEAN_GROUND_OPTIONS[CLEAN_GROUND] || "very light neutral", CLEAN_GROUND], ["soft grey", OUTLINE_GREY], ["white", "#FFFFFF"]) },
  WHITE:  { label: "WHITE", kind: "white", feel: "pure white — face-only, object-only and word frames, and deliberate white breaks", ..._pal(["pure white", "#FFFFFF"], ["soft grey", OUTLINE_GREY], ["white", "#FFFFFF"]) },
  PEAK:   { label: "PEAK", kind: "peak", feel: "an emotional peak — one full-colour field, the chapter's emotional colour (needs pk: true)", ..._pal(["storm violet", "#9C86C0"], ["deep storm violet", "#7E68A6"], ["storm violet", "#9C86C0"]) },
  NIGHT:  { label: "NIGHT", kind: "night", feel: "night — one flat navy field", ..._pal(["night navy", "#2C384E"], ["dim slate", "#5A677D"], ["night navy", "#2C384E"]) },
  MEMORY: { label: "MEMORY", kind: "memory", feel: "the past — a faded light grey, as if the colour has drained out", ..._pal(["faded memory grey", "#DDE1E7"], ["faded grey", "#B8BFCA"], ["faded memory grey", "#DDE1E7"]) },
};
// Older mood names still compile: the calm moods become CLEAN, DARK → NIGHT, ICY → MEMORY, TENSE and SUNNY → PEAK variants.
const MOOD_ALIAS = { BRIGHT: "CLEAN", WARM: "CLEAN", EVENING: "CLEAN", COOL: "CLEAN", DUSK: "CLEAN", NEUTRAL: "CLEAN", ACCENT: "CLEAN", DARK: "NIGHT", ICY: "MEMORY", TENSE: "PEAK", SUNNY: "PEAK" };
const PEAK_VARIANT = {
  TENSE: { field: ["storm violet", "#9C86C0"], floor: ["deep storm violet", "#7E68A6"] },
  SUNNY: { field: ["lemon yellow", "#F5E77E"], floor: ["golden ochre", "#E0BA4B"] },
};
```

`TYPOGRAPHY` describes text drawn inside an image, which v19 keeps to the one named text a frame may
carry (rare). The on-screen idea words are not drawn: Muhammad adds them in Premiere in the one channel
style defined in `humour-text-contrast-v19.md`.

## Dictionary patterns — rebuilt per video

```javascript
// ── DICTIONARIES — rebuilt for every video ─────────────────────────────

// ROLE: one entry per character. age: "adult" | "teen" | "child". ref: true only if a reference image exists.
// hair: the hair outline word (bun, spiky, ponytail, bob, curls, side parting…) — every character has hair, never bald,
// and no two roles share it. wear: the small accessory this character ALWAYS wears (tie, scarf, cap, beanie, glasses,
// headband) — also described in text with its hex. Never a garment covering the body. [] for none.
const ROLE = {
  "Mom": { age: "adult", ref: true, hair: "bun", wear: [], text: "MOM (adult — the attached MOM reference images): the taller figure. Solid black hair parted softly at the centre so it meets the forehead in a small point, framing the round face down past the ears, with one thin strand hanging below each ear toward the jaw, and one round bun on top of the head marked with two or three thin curved lines. No accessories." },
  "Son": { age: "teen", ref: true, hair: "spiky", wear: [], text: "SON (teenager — the attached SON reference images): clearly shorter than MOM, lean, with his larger-looking head exactly as in the reference. Solid black messy spiky hair in jagged pointed clumps: a fringe of pointed tips falling over the forehead to just above the eyebrows, spiky tips sticking out at the sides above the ears. No accessories." },
};

// MOOD: the five v19 moods (CLEAN, WHITE, PEAK, NIGHT, MEMORY) are in the shared block above; old mood names alias to them.
// CHAPTER[ch].emo = the chapter's emotional colour, used only on its PEAK frames: { field: [name, hex], floor: [name, hex] }.

// WORLD: places described by their outline pieces, never by colour. kind: INDOOR | OUTDOOR | FIELD | SURFACE.
// A piece is drawn only in the frames whose own action or placement names it — no automatic anchor furniture.
// A world with no parts is an idea place: its `text` is its picture.
const WORLD = {
  "KITCHEN": { kind: "INDOOR", label: "kitchen", parts: [
    ["TABLE", /\btable\b/i, "one small round table drawn only as a thin soft-grey outline with white fill: a complete, closed line drawing, not a coloured object"],
    ["DOOR", /\bdoor(way)?\b/i, "one plain doorway drawn only as a thin soft-grey outline with white fill: a complete, closed line drawing"],
  ] },
  "TABLETOP": { kind: "SURFACE", text: "the flat top of one plain table seen from directly above, filling the whole background from edge to edge, white with a thin soft-grey edge line." },
  "FIELD": { kind: "FIELD", text: "an open plain space with nothing in it." },
};

// PROP: every story object. text = countable build spec; hex = its locked colour; part = the coloured part when only part
// of it is the colour element; nouns = words that name it in a script line; mature: false marks a symbol prop (hearts,
// stars, trophies, podium, smile masks, picture bubbles, stop paddle…) — the v19 checks fail any frame that uses one.
const PROP = {
  "PHONE": { name: "THE PHONE", hex: "#F2A900", colour: "bright amber", danger: false, nouns: ["phone", "smartphone", "screen"], text: "THE PHONE: one hand-sized smartphone, a flat rectangle with softly rounded corners in bright amber (#F2A900), with exactly one black screen rectangle on its face and one small round camera dot above the screen — one closed outer outline, one flat amber fill, then those two details and nothing else." },
};

// OVERLAY: story elements that only ever appear as pop-ins (never drawn into a base frame). Never a generic symbol:
// warning triangles, question marks, arrows, ticks, hearts, stars and emoji-style icons are flagged (mature: false).
const OVERLAY = {
  "NOTIFICATION": { name: "THE NOTIFICATION", hex: "#2F6FE0", danger: false, text: "one phone notification card: a white rounded rectangle with a cobalt-blue (#2F6FE0) dot at its left end and two short soft-grey lines beside it, no letters, a black ink outline." },
};
```

### ROLE — the cast
- One entry per character, written before their first frame, including one-offs (a one-line entry
  costs nothing and lets the compiler restate the character automatically). The cast grows with the
  interaction a story needs; design new characters with `cast-design-v19.md`.
- Only MOM and SON have reference images. Every other character copies one of them — adults from MOM,
  teenagers from SON — changing only the hair (a beard or moustache counts as hair), the size and age, and small accessories where they tell people apart or cue the role, all described in the text.
- `age`: `adult` | `teen` | `child` — the compiler writes the height relationship whenever ages mix.
  Teens reach an adult's shoulder; a child's head reaches about halfway up an adult's height. Proportions
  are realistic: adults and teens take the proportions of the MOM and SON reference images (MOM's head
  about one-fifth of her height, SON's about one-quarter), children a little larger again — never bigger
  than the references.
- `ref: true` only when a reference image exists (currently MOM and SON).
- `hair`: the hair outline word. Every character has hair with its own outline: never "bald", "no hair",
  "hairless" or "completely round"; no two roles share the same hair outline word.
- Text: age and build, height relation, hairstyle with a hex for the hair, head details (glasses,
  beard, moustache, hair tie), the accessory with its hex, then "bare stick body otherwise" (or
  "no garments and no accessories"). Never a garment covering the body; never another character's
  hairstyle silhouette. Never write "big head" or "large head" — a big face is a camera choice.
- **Minimal clothing — `wear`.** A character may wear small accessories where needed: a tie, a bow tie or a scarf
  hanging from the neck; a cap, a beanie, a headband, a hair bow or glasses on the head. List it in
  `wear` (`[{ item: "tie", hex: "#4A6FA5" }]`) and describe it in the text with its hex and "with no
  collar or shirt around it" — a tie on its own invites the generator to draw the shirt. An accessory
  is identity, so it is worn in **every** frame; when the story takes it off (he throws the cap down),
  that frame uses a PROP for the removed item. Colours: a muted, locked hue different for each character
  (it helps recognition), quieter than any colour element and never strong red. MOM and SON currently
  wear nothing — add accessories to them only if their reference images show them. Example:
  `"Dad": { age: "adult", ref: false, hair: "side parting", wear: [{ item: "tie", hex: "#4A6FA5" }], text: "DAD
  (adult, copied from the MOM reference's adult build): a little taller than MOM. Short, flat black
  (#1A1A1A) hair with a neat side parting, and a short trimmed beard along the jaw. Wears one narrow tie in
  muted denim blue (#4A6FA5) hanging straight down from the neck line, with no collar or shirt around it;
  bare stick body otherwise." }`
- Adults read adult (a beard, glasses, a bun, a side parting); teens read teen (lean, lanky, messy
  hair, a slouch in the performance); children read young (rounder, shorter hair, short limbs).
- **Recognition kit** (`emotion-and-performance.md`): hairstyle silhouette + height/build + one head
  detail or accessory where two characters could be confused. Every character has its own hair outline;
  family members also differ clearly in height/build or a head detail.
- **Returning characters are copied, never rewritten.** When MOM and SON (or any character from an
  earlier video) return, paste their ROLE text verbatim from the last approved build.
- The MOM and SON entries above follow earlier builds; if the current reference images differ in
  any detail, the reference image wins — update the entry to match it.

### MOOD — the five moods
CLEAN is the default: a very light neutral ground (`CLEAN_GROUND`), set pieces as thin soft-grey outlines
with white fill, one colour element. WHITE is pure white for face-only, object-only and word frames and
deliberate white breaks. PEAK is a full-colour field in the chapter's emotional colour, only on an
emotional-peak frame with `pk: true`, never behind a face close-up. NIGHT is a flat navy field. MEMORY is a
faded light grey with only the story object coloured. Old names still compile (`MOOD_ALIAS`). When and why:
`style-and-colour-v19.md`.

### WORLD — places, described by outline cues
- `kind`: `INDOOR` / `OUTDOOR` (outline set pieces on the ground), `FIELD` (an open plain space — face-only,
  object-only, word frames, idea places; on PEAK and NIGHT it is the colour field), `SURFACE` (a tabletop,
  a floor or a bedspread filling the frame — overhead and hands-only shots).
- Every set piece is "drawn only as a thin soft-grey outline with white fill: a complete, closed line
  drawing, not a coloured object". Wider shots get one thin soft-grey ground line instead of a filled
  floor. On PEAK and NIGHT frames the pieces are darker tonal outlines on the field.
- A piece appears only when the frame names it. Thomas: "one door outline, one bed outline, one chair, one
  object is enough to communicate the place." The place is established by the frame that names its
  outline cue; close shots usually show no place at all.
- The world must match the camera: an overhead hands shot over a table uses a SURFACE world, not a
  room the camera can't see.
- Never name the place in the text ("in a kitchen" invites stereotypical decor). Name the outline cue that
  makes the place readable — a table, a door, a bed, a bus-stop post and bench, a car's two front seats and
  steering wheel, school gates — drawn complete.
- A window, door or object the action uses is named; nothing else is on the ground. Swapping one outline
  cue is enough to make a friend's room read as not-his. Variety comes from the camera, not from more
  places.

### PROP — every story object
- `name` ("THE PHONE"), `hex` (its locked colour), `colour` (a plain name for it), `danger` (true only for
  danger/warning objects — the only ones allowed strong red), `nouns` (the words a script line would use
  for it; the checks use them to list noun-in-hands frames), `part` (the coloured part when only part of
  the object is the colour element), `mature` (false for a symbol prop) and `text`.
- `text` is a **build spec with numbers** (a technical consistency count, not a creative quota): exact
  counts of every visible part (six strings, six tuning pegs, one sound hole; two straps and one front
  pocket line), its size relative to a hand or a head, its flat colour and hex, and the build order — one
  closed outer outline, one flat fill, then exactly the counted details, nothing more. A description gets
  re-interpreted every frame; a count repeats. The object must be nameable from its black outline alone.
- **Detailed, but minimal.** Give each object the few details that make it *that* object and nothing else
  (a school bag: two straps, one front pocket line, one zip line; a mug: a handle and one stripe; a
  guitar: six strings, six pegs, one sound hole). The hero is drawn with its details crisp; everything
  around it stays plain — Thomas: *"keep it simple where simple is enough, and add detail where the
  emotion really matters."*
- **Mature.** Real objects a parent or teenager would recognise — "we are not creating a kids channel".
  No hearts, stars, trophies, podiums, smile masks, emoji-style icons or picture bubbles standing in for a
  feeling (`props-symbols-metaphors-v19.md`).
- In action text refer to the object by its locked name ("THE PHONE"), never re-describe it inline —
  an inline description silently bypasses the dictionary and drifts (Video 1's engine icon became a
  hazard triangle in most of its frames this way).
- Only objects the frame uses. Props change state rather than being replaced (closed → opening →
  open), and a changed state is described in absolute terms in that frame, never "as before". When the
  object is not the frame's colour element it is drawn uncoloured (black line on white).

### OVERLAY — pop-in-only story elements
Story elements that only ever appear as edit pop-ins and are never drawn into a base frame (a notification
card, a ringing alarm clock). Same fields as PROP minus `nouns`. A PROP can also be used as a pop element
when a story object pops into a frame where it isn't drawn. Generic symbols are not overlays.

### TEXT — none in the image
Images stay text-free except, rarely, the one named text a frame needs. Sheets, lists and calendars carry
marks (ticks, lines, one red circle), never readable words. On-screen idea words (TRUST, SAFE, LISTEN,
SHAME, MISREAD, NOT REJECTION…) are added by Muhammad in Premiere at strong moments
(`humour-text-contrast-v19.md`). Whenever a character can show the emotion, use the character.

## Setting decision checklist (v19)
Stop at the first match:
1. **A face-only frame, an object-only frame, a word frame or a deliberate white break** → WHITE: pure
   white, nothing behind (or one small named object on a word frame).
2. **A planned emotional peak** (`pk: true`) that is not a face close-up → PEAK: one flat field in the
   chapter's emotional colour, pieces as darker tonal outlines. A night scene → NIGHT. The past → MEMORY.
3. **Hands-only or object detail** → hands-only inserts stay on CLEAN (white mitten hands need the very
   light ground to separate from it); an object alone goes on WHITE; a tabletop SURFACE for an overhead
   shot.
4. **Comparison of two states** → one frame split down the middle, or two characters on one plain field.
   A character appears **once** per frame — never the same person in both halves (the generator can't draw
   one character twice reliably). Show the other state with objects, or stand the character on the centre
   line turning toward one half (learned on Video 4, S47, S99, S120).
5. **Everything else — the default** → CLEAN: the very light neutral ground; the place's outline cue only
   when the frame needs to say where we are (a placing frame, a wider shot), with one thin ground line in
   wider shots; close shots usually carry no place at all.

## Consistency hard rules
- **Every prompt is standalone.** No "same as S12", "the previous frame", "as before". Evolving
  object or scene state is written in absolute terms each time.
- **Camera stated every frame** — `shotSize` and `angle` fields plus framing prose. The same character in
  back-to-back frames changes size or angle clearly; the same composition (shot + angle + place +
  left/centre/right) never repeats anywhere in the film; inside one scene characters keep their screen
  sides.
- **Shot-scale consistency** — the same shot type reads at the same scale (stated in `SINGLE_FRAME`).
- **Two or more characters** — each one's position (left/right/near/far/above), the planned distance
  (`dist`) and the interaction beat (`ia`) stated in that frame, with who is looking at whom.
- **Close shots with a face** — the gaze target and side (`look`) and what makes the close-up make sense
  (`ctx`) are stated; the compiler writes a CLOSE-UP LOGIC block from them.
- **Every object's colour and size restated** every time it appears (the PROP text does this).
- **No meta-commentary in prompt text** — no client names, dates, "client-flagged", channel names or
  "recurring error" notes; state the rule itself.
- **No cast shadows, ever**, and a dark threatening shape near a character is described as a "dark
  shape", never a "shadow", so the generator doesn't draw it as that character's cast shadow.
- **Pictogram rows** (several small identical figures as a diagram) — every figure grounded on a
  line or seat, poses varied across the row.
- **Finished, never implied.** Outline places are finished too: write "drawn only as a thin soft-grey
  outline with white fill: a complete, closed line drawing". Don't write "suggested", "implied",
  "partial" or "sketched" into beat text; those words produce half-drawn frames.

## Natural perspective (added after the Video 4 hook renders)
`NATURAL_PERSPECTIVE` (in the block above) is appended to every CAMERA line; a figure lying down gets
the lying-down variant.

## Render polish (v7, history) — what it became
`pictureLine(b)` opens every prompt ("THE PICTURE: shot — who is where. The feeling: …"). The old v7
`FLAT_COLOUR` and `HAIR_LOCK` lines are now carried by the v19 colour block ("The background is …, flat
and even from edge to edge"; NIGHT frames add "Every character keeps solid black (#1A1A1A) hair"). The
cast line adds an exception for drawings inside a screen (`inset: true`); hands-only frames state the
exact hands and their edges; the height line keeps the teen's head lower.
