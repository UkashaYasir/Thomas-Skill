# The build file — fields, compiler, UI

> **v25 — lookup only.** `v24-standard.md` and `RULES-CARD.md` win over everything below, then `v19-principles.md`.
> Where this file says otherwise, the current rule is: the CLEAN ground is the clean warm white #F7F6F3 and set pieces
> are thin **black** ink lines with white fill (never soft grey), the fewest the frame needs; the colour focus is bright;
> at most two coloured objects (`ce`, `ce2`); colour by meaning (red = conflict, frustration, stress, danger; phones
> purple); white by default, and an intense line turns the whole stage to its emotion's colour (`pc`, `v24-standard.md`
> §2a); words are short, playful and hand-lettered **inside the frame's own image prompt** — never added in Premiere,
> never numbers or titles; drawn glow and action marks are allowed; "larger heads" means sudden close-ups.

> **v19:** new videos compile with `assets/compiler-v24/` (its README lists the exact keys, moods, shot types and checks;
> `data-fields-and-build.md` has the summary). `v19-principles.md` wins over anything here. The field list below is the
> v18 beat object with the v19 plan keys added; lines that encoded retired rules have been rewritten.

Start every video from **`assets/build-template.jsx`**. For a worked example of well-filled beats —
a door-slam hook, a lonely wide shot, an overhead hands-only tug-of-war, an overwhelming-object
metaphor, a huge hurt face, a two-sided cutaway — read **`assets/legacy/example-test-frames.jsx`** (legacy, v16 style — read for prompt mechanics only, not its look) (a sample
script written to exercise the system, not a client video; it passes QA). It holds the shared constants, the default
dictionaries, one example beat, the compiler and the UI. Fill `PROJECT`, the dictionaries and
`RAW_BEATS`; leave the constants, compiler and UI alone unless the skill itself is being changed.

Why a compiler instead of hand-written prompts: a 190-frame video with ~12k-character prompts is two
million characters of text. Written by hand, one missed or reworded copy of a rule breaks consistency
on that frame silently. The compiler writes every rule once and assembles each frame from data, so a
fix to hands or eyes is one edit, and every frame gets it.

## Working files across turns
The build is written over several turns (SKILL.md, *Working across turns*), so the file carries the
whole plan:
- **`SCRIPT`** — the exact voice-over lines, saved first. Beats take their `script` from it by `n`, so
  beats never retype script text; QA checks that nothing drifts.
- **`SKETCH`** — optional and no longer written by hand (v13 removed the sketch pass); it may be
  regenerated from the beats for reference.
- **The insertion marker** — `// ── NEXT BEATS GO HERE` sits just above the closing `];` of
  `RAW_BEATS`. New beats go directly above it, in groups of about ten, with the edit tool.
- **`scripts/progress.cjs <build>`** — only if a reply was cut off: where to continue (lines done, next segment)
  and its SKETCH and script lines.
- **`scripts/qa.cjs <build> --brief`** — the full suite once every line exists (`--partial` while writing).

## Story plan blocks — above the beats
`STORY` (idea, arc, ending), `PLAN` (one row per segment: sequence, purpose, feel, mood, metaphor,
open, payoff) and `MOTIFS` (key, meaning, arc of states). Written in Steps 2–3 and shown in the Plan
tab. Full guidance: `story-structure.md`.

## Beat fields — one object per script line, in order

```js
{
  n: 12,                       // 1..N, sequential — also picks the line from SCRIPT
  ref: "S12",                  // stable id; later insertions get suffixes (S12a) so rendered frames keep their refs
  // script: filled from SCRIPT[n-1] by the compiler — leave it out
  sequence: "03 The first wall",   // segment, prefixed with a sort number — drives Sections and the per-segment checks
  scene: "Kitchen, after dinner",  // place AND time — planning metadata, never emitted into the prompt; change it as time moves
  // ── v19 shot-plan keys (shot-plan-v19.md) ──
  ft: "Humiliation turning into anger.",  // what the viewer should feel — required on every frame
  ln: "dialogue",              // line type — open list (hook, chapter-turn, statement, peak, humour-aside, …)
  idea: "...",                 // the chosen idea in one line
  alt: ["...", "..."],         // the other ideas considered, so later lines can use them and nothing repeats
  ia: "MOM holds out her hand → SON pulls THE PHONE against his chest", // required with two or more characters
  dist: "apart",               // touching | close | apart | far — with two or more characters
  look: "toward MOM, out of frame left",  // close shots with a face: gaze target and side
  ctx: "follows wide S11",     // close shots: what makes the close-up make sense
  ce: "PHONE",                 // the one colour element: a PROP key, a PROP key + part, or "none"
  cx: "large face vs the small phone in the frame before", // the contrast this frame makes
  ip: "",                      // interrupt type when the frame is one (white-break, word, funny-reaction, …) — open list
  pk: false,                   // true on an emotional-peak frame (required for a PEAK mood)
  tier: "EMOTIONAL",           // SIMPLE | EMOTIONAL | HOOK
  fn: "STORY",                 // STORY | REACTION | DETAIL | CONCEPT (a metaphor/symbolic frame) | TEXT
  roles: "Mom, Son",           // ROLE keys, comma-separated, or "No characters"
  props: ["PHONE", "2x MUG"],  // PROP keys this frame uses ("2x KEY" for a pair); [] for none
  hero: "PHONE",               // a PROP key in this frame, or "FACE" / "FIGURE" (the first role is the hero)
  feel: "Humiliation turning into anger.",       // legacy name of ft — what the viewer should FEEL, one line
  meaning: "...",              // what the viewer should understand; the director's note, 40+ characters
  shotSize: "CLOSE",           // WIDE | MEDWIDE | MEDIUM | CLOSE | XCLOSE | FACE_HANDS | REACTION | HANDS | OBJECT | WORD
  angle: "OTS",                // EYE | LOW | HIGH | OVERHEAD | OTS | PROFILE | SQUARE | POV
  face: "LARGE",               // NONE | NORMAL | LARGE | HUGE  (NONE for hands-only and object frames)
  scale: "ORDINARY",           // ORDINARY | DOMINANT | OVERWHELMING — applies to the hero
  framing: "...",              // who is where in the frame, how it's cropped, what's in the foreground
  action: "...",               // what physically happens in this frame; the distance between characters; hands
  performance: "...",          // per visible face: eyes, eyebrows, mouth, head position, hand gesture, posture, eye direction. "" when no character
  world: "KITCHEN",            // WORLD key — its outline cues; must match the camera (an overhead hands shot uses a SURFACE world)
  mood: "CLEAN",               // CLEAN (default) | WHITE | PEAK (needs pk) | NIGHT | MEMORY — old mood names alias to these
  peak: false,                 // legacy name of pk
  stage: "PROBLEM",            // START | PROBLEM | REACTION | RESULT | "" — the scene's arc; every segment reaches a RESULT
  moment: "",                  // "aha: …" | "surprise: …" | "humour: …" — or ""
  pop: null,                   // { what, on, type: "ADD" | "PUNCH", motion } — see aha-humour-popins.md; pops are story PROPs on their word, never generic symbols
  move: { type: "PUSH_IN", on: "", note: "slow push toward her eyes" }, // where the moment needs it (HOLD is a choice) — PUSH_IN | PULL_OUT | SNAP_ZOOM | PAN_LEFT | PAN_RIGHT | TILT_UP | TILT_DOWN | DRIFT | SHAKE | HOLD; `on` = the word it hits (required for SNAP_ZOOM / SHAKE); edit-only, never enters the prompt — see motion-and-energy.md
  device: "CONTEXT",           // a KEY from references/visual-library.md §2 (seed list — new keys allowed) — the checks print the spread per segment
  metaphor: "",                // on metaphor frames (fn CONCEPT): the family, e.g. "lockbox-grows" — the families set in the PLAN
  reveal: null,                // or { what: "PHONE", on: "phone", method: "MASK", cover: "#hex", how: "Premiere: draw a … shape over …; take it away on “phone”." } (motion-and-energy.md §9)
  link: "",                    // setup / callback / consequence tying this frame to another segment; name refs ("pays off at S140") — QA checks they exist
  keyword: null,               // { word, on } — an on-screen idea word (TRUST, SHAME…) — since v24.1 lettered into the frame's own image prompt; never a chapter number
  requiredText: "",            // legacy — images stay text-free in v19
}
```

Writing the fields well is the whole job — the architecture changes how the content is stored, not
how a scene is imagined. A lazily filled `action` produces a lazy prompt exactly as lazy prose would.
- `framing` + `action` + `performance` are the picture. Write them as one continuous moment with
  something happening in it. Refer to objects by their locked names (THE PHONE) and characters by
  their upper-case names (MOM, SON).
- `performance` covers every visible face with all seven features — eyes, eyebrows, mouth (a shape,
  never "a small … line"), head position, hand gesture, posture, eye direction — as one clear emotion
  with a verb. On a HANDS frame it describes only the hands. Never on an OBJECT or WORD frame.
- Hands: every character frame says what the hands are doing (HUGE faces and extreme close-ups are
  exempt when the hands are out of shot).
- Distance: every two-character frame says where each one is and how far apart (`dist`), planned:
  apart for conflict, close for repair, touch where it pays off.
- Interaction: with two or more characters, `ia` names the action and the visible reaction; name each one
  in the performance with their own features, and say who is looking at whom.
- Close shots with a face carry `look` and `ctx`, so every close-up makes sense
  (`camera-and-closeups-v19.md`).
- Props: every prop listed in a character frame is used, held, looked at or reacted to in the action.
- Text: none in the image. Sheets, lists and calendars carry marks (ticks, lines), never readable words;
  on-screen idea words go in `kw`/`tx` and are lettered into the frame's own prompt (v24.1).
- Don't restate what a constant already says (construction, no shadows, colour hierarchy) in the beat
  text — the compiler adds it. Beat text is the specific moment.

## Compiler order (load-bearing)
1. `SINGLE_FRAME` — one frame, the hand-drawn style, shot-scale definitions
2. `castLock` — exact character count (hands-only frames: "seen only as hands and forearms")
3. `REFERENCE_LOCK`, `CORE_CONSTRUCTION`, `HAND_LOCK`, the ROLE texts, the height relationship, and
   `RECOGNITION` on wide, profile, over-the-shoulder, high, overhead and multi-character frames
4. `TIER` block, `CAMERA` (shot size + angle + framing), face size, scale
5. `ACTION`, `PERFORMANCE`, and `INTERACTION` when two or more characters are visible
6. `OBJECTS` (the closed list of story objects with their build specs), `SETTING` (the outline cues on
   the light ground, or the PEAK/NIGHT field), `COLOUR` (the mood + the one colour element `ce`),
   `COLOUR_HIERARCHY`, `DETAIL_CAP`
7. `CONSTRUCTION_RESTATED`, `PERFORMANCE_AND_EXPRESSION`, `RECURRING_CONSISTENCY`, `FLAT_STYLE`
8. `TEXT` lock, `GLOBAL_AVOID` last — freshest in the generator's context when it renders
Object-only frames skip every character block. Hands-only frames swap `CORE_CONSTRUCTION`, the ROLE
texts and the heights for `HANDS_ONLY_CONSTRUCTION`, and skip the restated face construction and the
expression block — head, hair and eye text in a hands-only prompt tempts the generator to draw a head.
Construction first because early words weigh most; the restated locks and the avoid list last
because the generator reads them just before rendering. Don't reorder casually.

The compiler throws on any unknown ROLE, PROP, WORLD, MOOD, hero, shot size, angle, face or scale,
naming the beat — fix the typo, don't catch the error.

## The UI
- **Header** — title, a stats line (frames, sections, close-up share, huge faces, hands-only, big
  objects, moments, pop-ins), and the **colour script bar**: the top strip is every frame's mood
  colour in order (a white tick marks a planned peak), the bottom strip the hero colour. Monotony is
  visible at a glance; read it during Step 6.
- **Plan** — the STORY block, the segment plan (purpose, feel, planned mood swatch, metaphor, open
  cold open and its payoff, frame count) and each motif with its arc and the refs it appears in.
- **Prompts** — every frame in order, with a section filter. Each card shows the ref, scene, script
  line, feel, cast and props, pills for tier / camera / mood / hero / face / scale / peak / moment /
  pop, move, and the prompt in a read-only box with a Copy button.
- **Sections** — collapsible segments with a Copy-all per segment.
- **Pop-ins & moves** — the pop-in cue table for the edit (frame, word, element, ADD/PUNCH, motion), the
  camera-move cue table (frame, move, on the word, note) and one overlay
  prompt per ADD element, generated once and reused.
- **Constants** — every shared constant and dictionary entry, derived from the code so it can't drift.
- **Fixes** — revision rounds (`REVISIONS`), each point with the current cards for the refs to
  regenerate. Explanations of what changed go in the chat reply, not here.

**Copying:** `navigator.clipboard` is blocked in the sandboxed frame artifacts run in, and fails
silently. The template's `copyText` tries `document.execCommand("copy")` on a hidden textarea first,
falls back to the clipboard API, and if both are refused opens the card, selects the whole prompt and
shows "Press Ctrl/Cmd+C". Double-clicking any prompt box also selects all of it. Keep this behaviour.

## Validation — every delivery
The v19 suite and its commands are in `assets/compiler-v24/README.md`; rule checks must pass, printed shares are
information. The classic entry point still works:
1. `node scripts/qa.cjs build.jsx --lines <N> --runtime <seconds> [--script script.txt]`. It loads
   everything above the `/* ===== UI ===== */` marker, so keep that marker in place.
2. It prints ok / WARN / FAIL per check across STRUCTURE, CAMERA AND VARIETY, EMOTION AND
   PERFORMANCE, PROPS TEXT AND RECOGNITION, STORY, STORY PLAN FINISHED SCENES AND MOTIFS, COLOUR,
   POP-INS and PROMPT SHAPE, and exits non-zero on any FAIL.
3. A syntax slip in the JSX shows up as "the build does not compile". The UI half isn't loaded by QA,
   so if you edited the UI, check the whole file parses too (for example with TypeScript's
   `transpileModule` if it's available).
4. Read flagged frames before editing them — a regex can be wrong. Re-run after every bulk edit;
   scripted rewrites introduce their own bugs (duplicated clauses, "a THE PHONE" grammar, empty
   performance fields).
5. When a constant is reworded, update any check that searches for its wording.

## In-scene edits and inserts
- `EDIT_CUES` — `{ ref, on, change }` per in-scene change; `editPrompt()` builds the full edit prompt
  (who-is-who, change, keep-exactly, do-not). Shown in the Pop-ins tab; exported per frame.
- `INSERT_BEATS` — extra shots cut into a frame on its strongest word (ref "S3b", same fields as a beat,
  `n` = the parent line). Built with `buildPrompt()` like any frame.

