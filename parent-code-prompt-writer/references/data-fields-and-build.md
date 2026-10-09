# Building a new video — data fields and steps (v18 fields, with the v19 additions)

> **v25 — lookup only.** `v24-standard.md` and `RULES-CARD.md` win over everything below, then `v19-principles.md`.
> Where this file says otherwise, the current rule is: the CLEAN ground is the clean warm white #F7F6F3 and set pieces
> are thin **black** ink lines with white fill (never soft grey), the fewest the frame needs; the colour focus is bright;
> at most two coloured objects (`ce`, `ce2`); colour by meaning (red = conflict, frustration, stress, danger; phones
> purple); white by default, and an intense line turns the whole stage to its emotion's colour (`pc`, `v24-standard.md`
> §2a); words are short, playful and hand-lettered **inside the frame's own image prompt** — never added in Premiere,
> never numbers or titles; drawn glow and action marks are allowed; "larger heads" means sudden close-ups.

> **v19:** new videos build with `assets/compiler-v24/` (see its README for the exact keys, moods, shot types and
> checks); `assets/legacy/compiler-v18_3/` is kept as legacy. `v19-principles.md` wins over anything here. The v18 fields below
> still work; where a v18 field encoded a rule v19 retired, it is marked.

## v19 additions (shared names — use exactly)
- **`lk` is the link note** ("jar two of the seven from S15") — it used to be `ln`; v19 uses `ln` for the line type. An old `ln` that is a sentence is still read as the link. ROLE gains `hair` (the hair outline word, unique in the cast), `sameAs` (the same person at another age) and optional `heightText`; PROP and OVERLAY gain `mature: false` for symbols; PROP gains `lineText`.
- **Shot-plan fields per frame** (segment short key → meaning; full guidance in `shot-plan-v19.md`):
  `ft` what the viewer should feel (required, every frame) · `ln` line type (hook, chapter-turn, child-voice,
  scene-setting, dialogue, rapid-list, statement, adult-mirror, humour-aside, advice, model-sentence, peak, time-jump,
  ending — open list, new types allowed) · `idea` the chosen idea in one line · `alt` the other ideas considered (array of
  short strings) · `ia` interaction beat "who does what → who reacts how" (required when two or more characters are
  visible; the compiler appends it to the ACTION as "INTERACTION BEAT: …") · `dist` distance between characters:
  touching / close / apart / far · `look` gaze target and side for close shots, e.g. "toward MOM, out of frame left"
  (required for CLOSE, XCLOSE, FACE_HANDS and REACTION with a face) · `ctx` what makes a close shot make sense ("follows
  wide S12", "hands + object", "over the shoulder"…) · `ce` the one colour element: a PROP key, a PROP key + part, or
  "none" · `cx` the contrast this frame makes · `ip` interrupt type when the frame is one (white-break,
  extreme-close-up, word, unexpected-object, funny-reaction, strong-pose, short-metaphor, visual-silence, large-face —
  open list) · `pk` true on an emotional-peak frame (required for a PEAK mood).
- **Moods:** CLEAN (default: very light neutral ground, outline places, one colour element) · WHITE (pure white:
  face-only, object-only, word frames, white breaks) · PEAK (full-colour field for an emotional-peak frame — the
  chapter's emotional colour; the old TENSE/SUNNY and chapter emotional palettes are PEAK variants) · NIGHT (navy; old
  DARK) · MEMORY (faded light grey; old ICY). The old calm moods BRIGHT, WARM, EVENING, COOL, DUSK, NEUTRAL and ACCENT are
  aliases of CLEAN.
- **Shot types:** WIDE, MEDWIDE, MEDIUM, CLOSE, XCLOSE (incl. eyes-only), FACE_HANDS, REACTION, HANDS, OBJECT, WORD (a
  white frame with the on-screen word hand-lettered into its own prompt — v24.1).
- **Places:** set pieces are outline cues — "drawn only as a thin black ink outline with white fill (v24): a complete, closed
  line drawing, not a coloured object"; wider shots get one thin black ground line instead of a filled floor; a piece
  appears only when the frame names it (no automatic anchor furniture). SET tints and chapter accents no longer colour
  CLEAN frames.

`assets/build-template.jsx` is the "Seven Things" Version 6 build (v18.2): everything above the data blocks is the compiler
(keep it); the data blocks are that video's (replace them). The fastest way to build is `assets/compiler-v24/` (see its README). Each prompt is compiled from one frame (`RAW_BEATS` entry) plus the
shared dictionaries.

## Data blocks to replace
`PROJECT` (title, runtimeSec) · `SCRIPT` (the final lines, never changed) · `STORY` / `PLAN` (chapters and per-chapter
plan rows) · `CHAPTER` (each chapter's emotional peak colour — v19 uses only its PEAK and NIGHT values) · `SET` (each real
place's outline cue and label; v18 wall, floor and furniture colours are legacy) · `WORLD` (places and idea worlds — see
below) · `PROP` (objects) · `OVERLAY` (pop-in
graphics) · `MOTIFS` · `RAW_BEATS` (one per line) · `EDIT_CUES` (in-scene edits) · `SEQUENCES` · `INSERT_BEATS` ·
`REVISIONS`.

## A frame (`RAW_BEATS` entry)
Core: `n`, `ref` (S1…), `sequence` (chapter key), `scene`, `tier`, `fn`, `roles` ("Mom, Daughter" or "No characters"),
`props` (PROP keys), `hero` (a PROP key, FACE or FIGURE), `world` (WORLD key), `mood`, `shotSize` (WIDE, MEDWIDE,
MEDIUM, CLOSE, XCLOSE, HANDS, OBJECT), `angle` (EYE, LOW, HIGH, OTS, PROFILE, SQUARE), `face`, `scale`, `framing`,
`action`, `performance`, `device`, `peak`, `link`, `move` ({type, on, note}), `pop` ({what, on, type, motion} or null),
`reveal` ({what, on, method, cover, how} or null).
v13–v18 fields:
- `picture` — THE PICTURE: shot, angle, place and who is where with their size; opens the prompt.
- `map` — PLACEMENT, left to right.
- `check` — THE PICTURE IN SHORT; closes the prompt (descriptive, never "final check").
- `cam` — a CAMERA_LIB preset: CHILD_EYE, SLIGHTLY_ABOVE, OTS, CLOSE_TWO (required for LOW, HIGH, OTS).
- `master` — the ref of the room's master frame (or its own ref when it is the master); omit for close shots.
- `touch` — one interaction sentence appended to the action and the picture.
- `still` — a reason when the frame is deliberately still (no edit, reveal or pop).
- `why` — one line: purpose, feeling, focus, change (required on every new frame).
- `plain` — PROP keys drawn uncoloured (black outline, white fill). In v19 every object except the colour element (`ce`)
  is uncoloured by default.
- `colourReason` — legacy: why a frame carries more than one strong colour. In v19 a frame has one colour element; an
  exception needs a story reason.
- `keyword` — { word, on }: an on-screen idea word — since v24.1 lettered into the frame's own image prompt (`kw`/`tx`), never a separate image — TRUST, SAFE, LISTEN, SHAME,
  MISREAD, NOT REJECTION…, only at strong moments, never a chapter number.
- `editOnly` — { seq, from }: the line has no base image; its picture is an edit of an earlier image.
v18.2 fields and structures (see `archive/contrast-and-detail-v18_2.md`):
- `pieces` — computed by the assembler: the WORLD parts this frame's own action, placement, edits or sequence steps name.
- `focus` (segment key `fo`) — "light" when the story object is small on purpose; "door" when the door is the story object.
- `SET[place].moods` — legacy (v18.2): { BRIGHT, WARM, EVENING, COOL, DUSK }: { wall, floor, furn } per calm mood. v19 does
  not tint CLEAN frames with them. `CHAPTER[ch].accent` — legacy; `CHAPTER[ch].emo` — the chapter's PEAK field colour.
- `WORLD` rooms — { kind, set, text, head, closeHead, close, parts: [[key, regex, text, anchor?]], tail }: in v19 every
  part, including the old anchor, is drawn only when `pieces` includes it, as a thin black ink outline with white fill (v24).
Moods (v18, legacy names): WHITE, NEUTRAL, ACCENT, the calm moods, and the meaning colours. In v19 they map onto CLEAN,
WHITE, PEAK, NIGHT and MEMORY as listed at the top of this file.

## Places (`WORLD`)
`{ kind: "INDOOR" | "OUTDOOR", set: SET key (for real places), text }`. The text describes one fixed layout (LEFT · CENTRE
· RIGHT) of outline cues with "nothing else"; in v19 the {WALL}/{FLOOR}/{FURN} colour placeholders are filled with the
light ground and thin black ink outlines on CLEAN frames, and with the field colour and darker tonal outlines on PEAK and NIGHT
frames. Close shots usually show no place at all: the viewer already knows where we are from the frame before
(`ctx`), and a face alone on white is often the strongest choice (`camera-and-closeups-v19.md`).

## Edits and sequences
`EDIT_CUES`: { ref, on (a word in the line), change }. One change, from what to what, at least 180 characters, ends
with a "stays exactly as" sentence; only names in the frame; no finger, anatomy or clothing words.
`SEQUENCES`: { id, title, base, images: [ { i, ref, type: "base" | "edit" | "step", from: "image N", on, change } ] }.
`type: "edit"` uses that frame's `EDIT_CUES` entry; `type: "step"` carries its own change. Never more than two edits
away from a generated base image.

## Steps
1. Copy the template; replace the data blocks with the new video's (or write part files and run
   `assets/legacy/compiler-r13/transform.cjs` (legacy); `seg04.cjs` shows the `api.P` helper that writes `picture`, `framing`, `map` and
   `check` from one left-centre-right spec).
2. Extract and check with the scripts in `scripts/` (the v19 suite and its run commands are in
   `assets/compiler-v24/README.md`). Rule checks must pass; printed distributions are information, never targets.
3. Pages: `node scripts/copy-page.cjs build.jsx out.html "<title>"` (set ONLY=S1-S16 for a range) and
   `scripts/edit-page.cjs` the same way; publish both.


## v18.3 additions
- Frame fields: `heroWho` (short key `hr`) — the character whose face/figure is the HERO when it is not the first role;
  `oneSided` (`os`) — replaces INTERACTION with "ONE-SIDED MOMENT: … The gap between them is the story."; `propText` (`px`,
  written as ["KEY", "text"]) — one object's full text for this frame; `noAnchor` (`na: true`) — legacy: the room's anchor
  piece is not drawn (v19 draws no anchor unless named); `eyesOnly` (set by `eyes: true`) — EYES-ONLY CROP instead of FACE
  SIZE.
- PROP fields: `mature: false` (v19) marks a symbol prop — hearts, stars, trophies, podium, gold pillow, smile mask,
  picture/story bubbles, stop paddle and similar — which the checks fail; `part` — the coloured part with its hex, used in
  the colour line and as the default `ce` ("THE JAR's tangerine-orange (#F57C00) lid");
  `rest` — what stays uncoloured ("the glass stays clear and pale"); `small: true` — the object stays at its natural size in
  OBJECT FOCUS (set it on every hand-sized real object — a phone, a note, a glass, a dial, a plaster; without it, a hero
  object in a medium or wide frame is written "a little larger than life, at least head-sized"); `onWall: true` — a story object hung on a wall, the one exception to plain walls.
- THE PICTURE IN SHORT may carry `{BGWALL}`, replaced by the frame's real main colour.
