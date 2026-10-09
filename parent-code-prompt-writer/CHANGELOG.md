# Changelog — parent-code-prompt-writer

Every update gets a new version number and an entry here: what was added, why (which feedback), and
what it replaces. The newest version is at the top. The version is also written at the top of
SKILL.md and in the package file name (parent-code-prompt-writer-vN.skill).

## v19.1 — 6 Oct 2026 · finishing the v19 update

**Why:** the remaining items from the independent verification of v19, so the skill is complete before the next video.

**Changed**
- Old metaphor and visual libraries: the childish or cliché pictures (a house glowing red, balloons, a throne and sceptre,
  puppet strings, a helicopter parent, a bubble-wrap suit, an umbrella, message bubbles buzzing like bees, a glowing phone
  as a second sun) replaced with in-world behaviour versions (the slammed cupboard, the Wi-Fi router held out of reach, the
  hand still on the bike seat, the kettle taken off the heat…).
- Research notes now ship inside the skill (`references/research/`: SOURCES, R1, R2, R3 with a README), so every citation
  in the v19 files can be followed; they are background, never rules.
- New tier `Q` (QUIET) for held, still beats: the prompt asks for one clear, quiet feeling held still, instead of full
  strength.
- RULES-CARD: a principles line (emotion first, plan first, better not more, Less/More, real objects out) and Thomas's
  contrast pairs and pattern-interrupt types as seeds.
- Compiler: an important object in a medium or wide frame is "a little larger than life, so it reads at a glance" (no
  longer "at least head-sized"); cast-check lineup frames are exempt from the prompt-length warning.
- WORD frames: a white matte in Premiere can replace generating a blank frame.
- Director's-read template: the frame's reason now traces through the plan fields (`y` is optional).
- Seed designs for the props the shot-plan worked example uses (PAN, CERTIFICATE, TEA_MUG, SAND_TIMER).
- "One characterful detail" → "a characterful detail".
- Worked example (Seven Things lines 1–43): "not fix me" is now MOM flattening his hair and SON catching her wrist
  (behaviour, no plaster); "a federal investigation" uses the fridge door as the incident board (no pinboard stand from
  nowhere); the jar ending sits in front of them both; the two held beats use tier Q.

**Still to decide (not a skill change):** Thomas's choice of CLEAN ground from the test strip; the cast lineup render.

## v19 — 5–6 Oct 2026 · Thomas's "less, but stronger" direction after "Seven Things"

**Why:** Thomas's notes of 5 Oct 2026 (long note, short note, the summary he approved, his answer on real objects, his final
priority list) and Muhammad's direction: Thomas's words are the principles, applied across the whole script exactly as he
said them; no numbers for creative choices; open libraries that grow; close-ups that make sense; much more interaction;
the cast grows and every new character is designed; explore every idea and keep the strongest.

**Added**
- `references/v19-principles.md` — the law (overrides every older file).
- Eight v19 references: style-and-colour, camera-and-closeups, shot-plan, acting-and-interaction, everyday-situations,
  cast-design, props-symbols-metaphors, humour-text-contrast — each seed examples plus a method.
- `assets/compiler-v19/` — moods CLEAN (default very light neutral, `CLEAN_GROUND`), WHITE, PEAK (needs `pk`), NIGHT,
  MEMORY; outline places (pieces only when named); one colour element (`ce`) in positive phrasing; shots FACE_HANDS,
  REACTION, WORD; plan fields `ft ln idea alt ia dist look ctx ce cx ip pk`; close-up logic block; small-face and eyes-only
  expression text; ROLE `hair`/`sameAs`/`heightText`; PROP `mature`/`lineText`.
- `scripts/qa-v19.cjs` and `scripts/qa-all.cjs` — checks pass or fail by rules; distributions are information only.
- `assets/v19-samples/` — Seven Things lines 1–43 re-planned (also `assets/build-template.jsx`), the cast lineup with BOSS
  redesigned (flat-top), "The car ride" generality test, and the CLEAN-ground test strip.
- `references/history-v16-v18.md` — the old SKILL.md and RULES-CARD, kept as history.

**Replaces**
- Tinted rooms, mood-coloured furniture and chapter calm palettes → white/light neutral ground with outline places.
- Every creative quota and share (metaphor %, close-up %, XCLOSE %, edits %, locations, colour-background %, "every N
  seconds") → judged by the moment.
- Symbol props (hearts, stars, trophies, masks, picture bubbles) → behaviour and mature real objects.
- Chapter-number cards → idea words added in Premiere at strong moments.
- "Never a floating head" → face-only on white as a main tool, with close-up logic.
- "One small accessory" → small accessories only where they tell people apart (a beard or moustache counts as hair).

**Fixed after independent verification (6 Oct):** the seven features are "the ones the shot can show" (small faces in wide
frames keep one bold shape; eyes-only frames use eyes, eyebrows, eye direction) in the law, card, compiler and checks;
eyes-only prompts no longer ask for a mouth; two-face close-ups compile cleanly; the over-the-shoulder text no longer forces
open eyes; the avoid list no longer allows "one named text"; any printed text now fails; check-rejected wording removed from
the seeds ("mouth a small", "half-lidded", "chest line", "steeply", "body line"); night colour elements must be warm hues;
hand-sized props need `small: true`; "one or two outline cues" removed.

**Open for the next version:** move the old metaphor-bank/visual-library leftovers (glowing house, balloons, throne,
helicopter parent, umbrella) to in-world versions; bring SOURCES/R2/R3 research into the package or drop their citations;
a quieter expression-strength line for held beats; trim the lineup prompts; Thomas's choice of CLEAN ground from the strip.

## v18.5 — 4 Oct 2026 (stronger emotion and interaction; "Seven Things" Version 9)
**Why:** Muhammad, after the first renders: "less emotion expressed and character interaction. Everything else is best."
165 performances described the mouth as "a small … line", which renders as a tiny neutral dash.
**Added**
- `EXPRESSION_STRENGTH` constant (FULL for hook/emotional, CLEAR for simple), printed after every performance with a face.
- `PERFORMANCE_AND_EXPRESSION`: the mouth is a big clear shape, never a tiny neutral dash, and the stick body acts the feeling.
- `INTERACTION` rewritten: bodies and heads turned toward each other, an equally strong reaction, a clear line of sight,
  closeness unless the beat is about distance, a touch or hand-over wherever the action allows.
- GLOBAL_AVOID: blank, neutral or half-hearted faces and stiff upright bodies.
- `assets/compiler-v18_3/mouth_shapes.py`: the mouth-shape rewrite used on the build (177 phrases); SKILL.md 18.5 lists the
  shape vocabulary.
- `scripts/qa-consistency.cjs`: two checks — no "mouth a small …", and every face frame carries its expression strength.
**Replaces:** "mouth a small <feeling> line" as the default way to write a mouth.

## v18.4 — 4 Oct 2026 (the first 15 renders of "Seven Things" Version 7 → Version 8)
**Why:** Muhammad rendered the first 15 frames. They followed the prompts well, but the S8 counter grew a sink, tap and
fridge, one of seven jars hid behind SON's head, a table edge became a grey blob, and the little boy read as the teen.
**Added**
- Kitchen frames add "a sink, tap, cooker or cupboards" to the avoid list (compiler); SKILL.md 18.4 lists the four render
  lessons; `references/qa-lessons-v18_3.md` gets a render section.
- The child height line prints in every frame with a child (not only beside an adult) and gives the young child a slightly
  bigger head for a short body (about one-third of his height) instead of the teen's ratio.
- STORY BUBBLE's tail points to the child telling the story; SON'S CHAIR no longer "like the others"; boarded-house planks in
  dim slate.
**Replaces:** "the head the same proportion to the body as SON's" for the little boy (v18.3, read as the teen in renders).
**Decisions recorded in the build (Version 8):** S105–S108 stay the teenage son; the Number four card keeps the warm
kitchen colours; S227–S229 keep SON's design, the drained attic carries "years from now".

## v18.3 — 4 Oct 2026 (full QA of "Seven Things Your Child Can't Tell You" Version 6 → Version 7)
**Why:** Muhammad asked for a full QA before rendering. Eight reviewers read all 232 compiled prompts, 67 edits and the
sequences (about 280 findings). The errors were fixed in the build (Version 7) and the repeatable ones moved into the compiler
and the checks, so the next video starts clean.
**Added**
- Compiler: HERO COLOUR names the coloured part (`part`/`rest` on PROP); HERO SHAPE for white objects; "keeps its own locked
  colour"; heroes allow the other objects' locked colours; `small` props and `fo: "light"` keep small things small; SCALE
  lines override the usual size; one-person hands frames say "beside the hand"; WHITE frames say "clean white space".
- New frame keys: `hr` (hero face/figure), `os` (one-sided moment), `px` (one object's text for one frame), `na` (no anchor
  piece), and `eyes` now prints an EYES-ONLY CROP block and drops the close-crop body line.
- Pure-white close-ups ignore `wh` ("in clean white space"); WHITE object frames get a white setting (pedestal only).
- Colour line describes colour, not mood ("a calm moment" removed); "graded into" → "filled with one flat, even … tone";
  outdoor and car frames talk about sky and ground; NEUTRAL outdoors uses the sky; the main colour comes from the world's
  first placeholder (a FIELD frame's field, not the chapter wall); drained ICY objects say so; "sky (#…) sky" and the white
  furniture hex fixed.
- ROOM REFERENCE keeps shape and place but uses only this setting's colours. Wall-hung story objects (`onWall`) are the one
  exception to plain walls, DETAIL_CAP and the avoid list.
- HAND_LOCK printed once and no longer bans corner arms; hands-only frames get a short hands reference block; OTS text turns
  the far face three-quarters; FACE HUGE follows the placement; LITTLE BOY's head is SON's ratio scaled down; HEIGHTS pronoun
  for male adults; PERSPECTIVE allows a figure lying down; the stop paddle is deep teal, not danger red.
- `scripts/qa-consistency.cjs`: nine new checks (see SKILL.md 18.3 item 9). `scripts/qa-render-risk.cjs` accepts the
  eyes-only crop.
- `references/qa-lessons-v18_3.md`: the error classes found, with a before/after for each.
- `assets/compiler-v18_3/` (renamed from `compiler-v18_2`): rebuilds the Version 7 build byte-for-byte; `passlib.py` (sub,
  setf, delf, esub, eset, edel, add_edit, qsub) for revision passes and `fk.cjs` to print a frame's source fields.
**Replaces:** whole-object hero colour; FACE SIZE HUGE in eyes-only shots; "placed off-centre"; "a little larger than life"
beside a SCALE line or on small objects; the INTERACTION rule on beats where nobody reacts; "keep its wall colour" in the
room reference; the stop paddle in danger red.

## v18.2 — 3 Oct 2026 (Thomas's contrast note; "Seven Things Your Child Can't Tell You" Versions 3–6)
**Added**
- `references/contrast-and-detail-v18_2.md`: the visual order as a constant (characters and faces → the story object → the
  background); a subtle soft tint directly behind the white characters, quiet tonal furniture, near-white floors and soft
  background lines; pure white only for face close-ups and object frames; NEUTRAL as a soft beige backdrop; ACCENT that keeps
  the room's own wall inside a scene; meaning colours with tonal furniture; the past as a faded grey memory; set pieces by
  need (one anchor per room, other pieces only where the frame uses them, no room dress, filler-free placement, a room
  reference that cannot add furniture); the OBJECT FOCUS line (at least head-sized, plain wall behind it, bold outline) with
  its light and door variants; hands from the bottom edge; touch on warm beats; size cues for a small child.
- Compiler v18.2: `assets/build-template.jsx` is now the "Seven Things" Version 6 build; `assets/compiler-v18_2/` holds the
  parts that rebuild it byte-for-byte (template with `accentWall`, set-pieces `worldBlock`, white close-up settings,
  `visualOrder`, `objectFocus`, new MOOD palettes and constants; `assemble.cjs` computing `b.pieces` and passing `fo`;
  `dicts.cjs` with SET moods, CHAPTER accents and WORLD parts; `design4.cjs` palette recipe; `seg_helpers.py`).
- `scripts/qa-consistency.cjs`: the clashes the other checks miss (white close-ups naming room parts, "white" left in soft
  frames anywhere in the prompt, room dress, texture, hands from both side edges, object focus vs small-on-purpose objects,
  hidden objects not turned toward us, colour words in placement, cast, chairs).
- `scripts/qa-sequences-colour.cjs` fixed: it reads the video's own held moments and key lines from the build (`HELD_MOMENTS`,
  `KEY_LINES`) instead of Video 05's hard-coded refs, which made it crash on any new video.
- `references/render-lessons.md`: six new render lessons (white on white, warm materials rendering stronger, counter → sink,
  masters copying furniture, arms as cables, the child reading as the teenager).
**Changed**
- SKILL.md: Version 18.2 section at the top; v16 "two or three calm details per room" and "a glimpse of the room in every
  close-up" marked superseded; the Locations rule points to the new reference; tools and checks list the new compiler and
  the fifth check. `references/data-fields-and-build.md`: new fields (`pieces`, `focus`) and structures (SET moods, CHAPTER
  accent, WORLD parts).
**Replaces** fixed full-room layouts in every frame, NEUTRAL as near-white, pure white with full figures or hands, cream
furniture on emotional fields, frost blue for the past, hands entering from both side edges, colour words in placement
text. The Video 05 build is kept as `assets/build-template-video05.jsx`.
**Why** — Thomas: "the main issue is the contrast between the characters and the background… first I see the characters
and their emotion, then the main action or object, and only after that the background." Muhammad: too much detail in the
rooms, the jar got lost, and every change must be implemented precisely without overdoing it.

## v18.1 — 3 Oct 2026 (the full audit v18 should have included)
- Audited the whole skill against the director's framework: 101 older quota-style or no-text lines in SKILL.md and the references are now marked *(v18: …)* as guides judged by the moment.
- `scripts/qa.cjs`: film-level percentage targets (colour share, close-up share, eye-line share, extreme close-ups, concept frames), the segment floor, the first-30-seconds count and the bold-ideas-per-segment count now print as flags, not failures; constants still fail.
- New `references/data-fields-and-build.md` (every data field incl. picture, map, check, cam, master, touch, still, why, plain, colourReason, keyword, editOnly; the template blocks; build steps) and `references/director-read-template.md` (the first deliverable of every video).
- `scripts/qa-render-risk.cjs`: every new frame must carry its one-line `why`.

## v18 — 3 Oct 2026
**Added**
- `references/director-framework.md`, which now governs every step and every action: what Thomas means vs what he says (he corrects extremes, so every note is a dial set by the moment); the director's read (emotional curve, 8–12 signature images, where to move and where to hold); the four questions per frame with a one-line `b.why`; moment types with starting treatments; motion only where the story moves (`b.still` for deliberate stillness); shot sizes and angles chosen by the moment; the five-test metaphor rule and the middle point between too simple and too random; colour, white, contrast, variety and keywords read from the moment; interaction, objects, rooms, humour; the strip-and-cut review; reading every new note from all sides.
**Changed**
- Thomas's Oct 2026 notes rewritten as moment-driven rules (what he means, when to use, when not) — no percentages or counts.
- System: the director's read comes first; the definition of done no longer asks for a change on every line; sequences only for cause-and-effect mini-stories at key moments.
- Checks: quotas became flags (white share, close-up share, keyword count, frames without an edit, hold share); constants still hard-fail (contrast, characters, angles, text style, edit wording, cue words, room layout).
**Why** — v17 turned the notes into blanket rules and quotas (e.g. edits on almost every frame, a white percentage), which Muhammad saw would make the story worse; the client wants judgment from the whole story.

## v17 — 2 Oct 2026 (Video 05 accepted)
**Added**
- The story-first system (`references/system-v17.md`): research sheet, story map and video spine, scored chapter ideas, scene cards and Gate A before any prompt; shot list with beat → tool → shot; place/object bibles with room masters; sequences and transitions; four test frames per chapter and a cold-open cut; scorecard and learning loop. Why: Video 05 went from "the same as before" (3/10) to accepted only after this.
- Thomas's Oct 2026 colour and text notes (`references/colour-and-text-v17.md`): the ACCENT mood (one soft wall colour, everything else white), white/accent on 35–50% of frames, `b.plain` uncoloured secondary objects (compiler line UNCOLOURED OBJECTS), contrast rule against same-family colours, tier variety, and on-screen keywords added in Premiere (`b.keyword`, shown on the Copy page).
- Render lessons (`references/render-lessons.md`): natural camera presets only (CAMERA_LIB), THE PICTURE / PLACEMENT / THE PICTURE IN SHORT, room masters, automatic thin-body, white-face and wall-colour locks, close-ups ≥ 40–45%.
- `assets/build-template.jsx` is now the Video 05 final build; `assets/compiler-r13/` part files with the api.P helper; new Copy/Edit pages (ranges, masters, sequences, edit-only lines, keywords); checks `qa-render-risk.cjs`, `qa-sequences-colour.cjs`, `qa-colour-v17.cjs`.
- `references/video05-worked-example.md`.
**Replaces** "no text in frames" (now: occasional keywords as edit overlays), colour on every background, the v16 template and pages (kept under `build-template-v16.jsx` and `scripts/v16/`).

## v16 — 1 Oct 2026 · Thomas's Video 5 rounds
- **Why:** Thomas reviewed Video 5 in several rounds (objects, environments, movement, sequences) and
  approved the direction; these are now standing rules, not one-video fixes.
- **Metaphors:** target moves from 20–40% to **45–60%** of frames (Video 5 settled at 51%), 5–8 families,
  never the same family 4+ frames in a row, never a partial object (cloud edge) above a close-up face.
  Replaces v15's 20–40%.
- **Objects designed, not generic:** every recurring object gets one characterful countable detail.
- **Rooms with character:** two or three calm details per setting in the house tones, and a short glimpse
  of the room in close-ups. Characters act on objects, never stand beside them.
- **Image sequences:** important and emotional moments as 3–5 images in one scene (frame → edit →
  insert), listed in the new `SEQUENCES` constant. Simple scenes stay simple.
- **Selective camera:** new `HOLD` move (no zoom or pan) for the later images of a sequence and gentle
  filler frames, 10–30% of frames.
- **Wording:** no quoted words in scenes or edits, no "finger", no anatomy or clothing words in edits, no
  glow/shadow; edits never name a character or object outside their frame or share a pop/mask word.
- **QA:** new checks for all of the above (family runs, quotes, lighting words, edit wording and
  consistency, HOLD share, sequence count and length, frames with no edit/reveal/pop); concept-frame range
  updated.

## v15 — 28 Sep 2026 · audit: one clean, consistent skill
- **Fixed (real gap):** the render polish from v7 lived only in the Video 4 build, not in the template —
  new videos would have lost it. Now in the template: the THE PICTURE opening line, the flat-colour
  sentence, pure black hair, the cast-count exception for drawings in bubbles and screens, exact hand
  counts in hands-only frames, the teen's head always lower, phone screens that can show a picture,
  baked SPEECH and THOUGHT bubbles, and the house lock (fixed furniture colours per set).
- **Added:** a QUICK START at the top of SKILL.md (what Muhammad gives, what is delivered, what to read,
  the rules in priority order).
- **Fixed contradictions:** colour guidance that still pushed a mood per segment and "colour keeps
  moving" (Step 1, Step 3, Step 6, `visual-library.md` §4, `director-rules.md`) now says neutral first;
  Step 6 is now the colour-and-metaphor pass; old Photoshop "lift-out" wording and batch wording removed
  from the references; `client-standards.md` marked as the history file and given Thomas's Video 4
  review; `constants.md` synced with the template.
- **QA:** the 40-second band check now asks for an emotional peak or a purposeful colour moment (neutral
  bands are right); the white-on-white warning points to NEUTRAL.
- **Why:** Muhammad asked for a skill with no mess, no contradictions and no deficiencies.

## v14 — 28 Sep 2026 · a much bigger metaphor bank, metaphor as the main engine
(This is the skill's own version 14 — unrelated to the Innes Master Prompt V14 removed in v10.)
- **Added:** `references/metaphor-bank.md` — 90+ idea rows across emotions, relationships, screens and
  tech, rules and consequences, growing up, school and daily life, and parenting stances, each with bold
  pictures and the transformation edit that moves them.
- **Added:** the metaphor engine for any new idea (idea → feeling → physical lens from 20 lenses → tie
  to the story → character inside → transformation edit → planned return → three tests), and metaphor
  through-lines: 3–5 families per video that set up, escalate and resolve, so nothing is random.
- **Changed:** metaphor frames 20–40% depending on the script (idea-heavy scripts near 35–40%, was
  15–25%); every idea line gets a metaphor unless a story frame shows it better.
- **Added:** a `metaphor` family tag on metaphor beats; QA warns on untagged metaphors and on fewer than
  three returning families; RULES-CARD §5 rewritten.
- **Why:** Muhammad — handle any new topic easily and make every video engaging, fresh and unique
  through metaphor, always tied to the story.

## v13 — 28 Sep 2026 · Thomas exactly, one-message delivery, no length-limit stalls
- **Changed:** Thomas's rules written exactly as he said them. Colour: inside every frame about 70–80%
  neutral and 20–30% targeted colour on what matters; across the film full-colour backgrounds on
  20–30% of frames (night blue-grey included), only with purpose. Metaphors: much more (15–25% metaphor
  frames, two or more per segment of 8+), a fresh visual stimulus every 20–30 seconds.
- **Added:** a metaphor bank in `visual-library.md` §5 (20 idea families with bold pictures), and the
  COLOUR DIRECTION line in every prompt now carries the 70–80 / 20–30 split.
- **Added:** `references/RULES-CARD.md` — every rule in one short card, read instead of all references.
- **Changed workflow:** one message → one finished video. No plan approval, no batches, no "proceed":
  plan, beats, edits, inserts, QA and both pages in the same reply. Beats are written straight into the
  file segment by segment, never pasted into the chat; QA runs with `--brief`; references are looked up,
  not read whole; one video per chat; `progress.cjs` resumes if a reply is ever cut off.
- **Added QA:** `--brief` mode; colour-background frames must sit at 20–30% (DARK counts); the
  fresh-stimulus window is now ~25 seconds; metaphor frames 15–25%.
- **Removed:** the plan-approval stop, the SKETCH pass and the batch turns.
- **Why:** Muhammad — precise to Thomas's feedback, no redoing, and chats were stalling at the length
  limit and needing "proceed" every batch.

## v12 — 28 Sep 2026 · Thomas's rules across the whole script
- **Added:** SKILL.md now says Thomas's rules apply to the WHOLE script — his examples are samples, not
  the list — with a required amplification pass over every segment.
- **Added QA (failing):** every segment of 8+ frames needs two or more bold ideas (metaphor frames); the
  fresh-stimulus check now counts only metaphor frames and transformation edits (a big ordinary phone or
  clock no longer counts); concept frames may reach 25%.
- **Why:** v11 applied the colour rule everywhere but the bold-object rule only at the spots matching
  Thomas's five examples, and the looser stimulus check let that pass.

## v11 — 28 Sep 2026 · Thomas's review: neutral first, bolder metaphors
- **Added:** "Thomas's rules from the Video 4 review" at the top of SKILL.md, next to the core rule.
- **Added:** the NEUTRAL colour mood (clean light warm grey walls, soft stone floor, slate furniture) and
  a new COLOUR DIRECTION line in every prompt: rooms quiet and desaturated, strong colour only on the hero
  object. `colour-direction.md` now opens with the neutral-first rule (70–80% neutral, 20–30% colour).
- **Added:** `visual-library.md` §5, bold metaphors from Thomas's list (crushing backpack, wall of
  secrecy, giant phone pulling him in, giant clock chasing him, message mountain, lifeline sea), each
  made physical with a transformation edit, and the fresh-stimulus-every-20–30-seconds rule.
- **Added QA:** fails above 30% colour-background frames; fails any ~28-second stretch with no fresh
  visual stimulus; concept frames now 8–22% (was 3–12%); neutral moods may run as long as needed.
- **Replaces:** the colour-everywhere approach (full orange, peach and other colour backgrounds by default).
- **Why:** Thomas's review of Video 4 — too much colour, objects too predictable.

## v10 — 28 Sep 2026 · V14 references removed
- **Removed:** every reference to the Innes channel's Master Prompt V14 — the "Adapted from … V14" and
  "section numbers follow V14" notes in `references/director-rules.md`, and the V14 mention in SKILL.md's
  file list. The director rules now stand on their own as The Parent Code's rules; no rule changed.
- **Why:** Muhammad asked for V14 out of this skill.

## v9 — 28 Sep 2026 · edits on 30% of frames
- **Added:** the CORE RULE minimum rises to in-scene edits on **30%+ of frames** (was 18%) and **4+ in the
  first 30 seconds** (was 3). The QA fails below both.
- **Added:** this changelog, the version line at the top of SKILL.md, and the rule that every future
  update adds an entry here.
- **Why:** Muhammad wants at least one frame in three to change while it plays.

## v8 — 28 Sep 2026 · CORE RULE: in-scene changes are image edits
- **Added:** a "CORE ANIMATION RULE" section at the top of SKILL.md and in the skill description. Any
  change inside a scene (a pose, a reaction, someone moving, something appearing) is an image-edit
  prompt for that frame's generated image, never a new prompt.
- **Added:** `EDIT_CUES` + `editPrompt()` in the template. Each edit prompt carries: one change only,
  a who-is-who line (MOM = the woman with the bun, SON = the boy with spiky hair, each prop with its
  colour), the detailed change, keep-exactly-the-same, and do-not.
- **Added:** `INSERT_BEATS` for insert frames (S3b etc.), and two page builders that ship with every
  video — `scripts/copy-page.cjs` (all prompts) and `scripts/edit-page.cjs` (edits by segment).
- **Added QA (failing):** every edit has its word, enough detail and a "stays exactly" sentence; one
  edit per frame; one per segment of 6+ frames. Warnings for same-place scenes and peaks without motion.
- **Replaces:** pose pairs generated from a second full prompt (retired).
- **Why:** a new prompt redraws the whole scene; editing the frame keeps it and adds movement.

## v7 — 28 Sep 2026 · mask reveals, context layer, render polish
- **Added:** mask reveals — the element sits on one flat colour and touches nothing; Muhammad hides it
  with a flat shape in the cover colour in Premiere and uncovers it on the word (`reveal.method: "MASK"`,
  `cover`, `how`).
- **Added:** baked speech and thought bubbles with pictures, phone screens that show a picture, and a
  cast-count exception for drawings inside a bubble or screen (lessons from the Friend or Parent build).
- **Added:** a "THE PICTURE:" opening line, a flat-colour sentence, pure black hair, the teen's head
  always lower than the adult's, exact hand counts in hands-only frames, and one furniture colour per
  set in every mood (house lock).
- **Replaces:** the Photoshop lift-out reveals of v6.
- **Why:** removing objects that touch hands or bodies breaks the picture; a flat-shape mask is fast
  and clean.

## v6 — 27 Sep 2026 · prop reveals (superseded by v7)
- **Added:** the before/after prop reveal — first as a Flow edit of the frame, then as a Photoshop
  lift-out with a Premiere animation; reusable overlays for floating elements.
- **Why:** Muhammad's object-animation trick (show the frame without the object, then with it).

## v5 — 27 Sep 2026 · natural camera
- **Added:** a natural-lens PERSPECTIVE line in every prompt (level horizon, straight verticals, no
  fisheye, tilt or upside-down view, no oversized foreground hand); softer LOW and HIGH wording;
  natural angles on 45%+ of frames; close-ups at eye level; no lone arm reaching in from a corner.
- **Why:** the hook renders came out as a fisheye kitchen and an upside-down boy, with noodle arms.

## v4 — 27 Sep 2026 · explainer direction, not presets
- **Added:** `references/visual-library.md` — 25 storytelling devices, five views of every recurring
  room, colour ramps and hotspots; three new moods (EVENING, ICY, SUNNY); a `device` field on every
  beat with variety checks.
- **Why:** scenes felt generic — the same orange living room, navy hallway and plain field.

## v3 — 27 Sep 2026 · character sheets
- **Added:** the approved sheets (MOM and SON turnarounds and poses, MOM's expressions, the MOM-and-SON
  height sheet); prompts name the sheets; mittens without cuffs; open mouths without teeth; the height
  difference taken from the height sheet.

## v2 — 27 Sep 2026 · Video 4 feedback and the character rebuild
- **Added:** a camera-move cue on every frame and the Pop-ins & moves tab; motion-and-energy,
  render-risk and staging QA sections; raised floors (Video 4 is the minimum standard).
- **Added:** the character system rebuilt from the four reference images, with much shorter character
  text so the images carry identity.

## v1 — before 27 Sep 2026 · base skill
- The multi-pass workflow (plan, sketch, batches, story and colour passes), the data-driven JSX
  compiler, Thomas's taste targets and the QA script.
