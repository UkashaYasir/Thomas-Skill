# History — SKILL.md as it stood at Version 18.5 (4 Oct 2026)

**History only.** v19 (`references/v19-principles.md`, 5 Oct 2026) wins wherever this file differs, and every number,
share, quota, cap, minimum or "every N seconds" target in here is retired. Thomas's quoted words below are kept exactly
as they were, as the record of what he asked for at each stage. Use this file to understand why a rule exists, never as
a rule to follow. Compilers, builds and page scripts from these versions are in `assets/legacy/`.

The body of the v18.5 SKILL.md follows unchanged (the versions 18.5 → 18 summaries, the old QUICK START, the core
animation rule with its old minimums, Thomas's Video 4 and Video 5 rules, the bundled-file map, the Targets table, the
delivery notes, the eight-step workflow, revisions and the old "What NOT to do").

---

## Version 18.5 — emotion and interaction that read (read with 18.3 and 18.4)

Muhammad on the first renders: "less emotion expressed and character interaction — everything else is best". Cause: 165 of
the performances gave the mouth as "a small … line" (a small worried line, a small flat line), which the generator draws as a
tiny neutral dash, and the interaction rule did not ask bodies to turn or move closer. Rules:
1. **Every mouth is a shape, never "a small … line":** a big round open circle (surprise), a wide open oval (calling, shock),
   a deep downturned curve (sad, sorry, hurt), a big wavy line (worry, guilt, panic), a hard flat line or a tight pressed line
   (stubborn, tense), a clear smile or curve (warm, proud, relieved). `assets/compiler-v18_3/mouth_shapes.py` rewrites old
   phrases; `qa-consistency.cjs` fails any "mouth a small …".
2. **EXPRESSION STRENGTH** follows every performance (compiler): FULL on hook and emotional beats — steep eyebrows, pupils
   pressed to the target, a bold mouth, the head tilted and the body leaning, recoiling or slumping; CLEAR on simple beats.
   Blank faces and stiff upright bodies are in the avoid list.
3. **INTERACTION** turns heads and bodies toward each other, asks for an equally strong reaction, a clear line of sight,
   closeness unless the beat is about distance, and a touch or hand-over wherever the action allows. In shared beats the
   listener looks at the speaker, not at the object, unless looking away is the point (then use `os`).

## Version 18.4 — what the first renders taught (read with 18.3)

From the first 15 renders of "Seven Things" Version 7: (1) an action like "wipes the counter" makes the generator draw a
sink and tap even when the setting says not to — say "the bare flat counter top" in the action, and kitchen frames carry a
sink, tap, cooker and cupboards in the avoid list (compiler does this); (2) a character standing under a shelf of objects
hides one behind his head — say "his head below the shelf and clear of every jar"; (3) "the edge of the table" in one third
renders as a big grey shape — put a table edge "along the bottom of the frame"; (4) a seven-year-old copied from the teen
reads as the teen — the child line now gives a slightly bigger head for a short body (about one-third of his height) in
every frame he is in, alone or not. Render a first batch of about 15 frames and read them against the prompts before the
full run.

## Version 18.3 — the full-QA rules (read with 18.2; it overrides anything below that conflicts)

Source: a full read of every compiled prompt of "Seven Things" Version 6 by eight reviewers (about 280 findings), and
Muhammad's ask to fix the real errors before rendering. The compiler now does most of this by itself; when writing frames,
keep the rest. Full list with examples: `references/qa-lessons-v18_3.md`.

1. **Hero colour names the coloured part**, never the whole object, when only a part is coloured (the jar's lid, the mug's
   gold seams, the test's red circle). PROP entries carry `part` and `rest`; white objects get a HERO SHAPE line.
2. **One size per object per frame.** DOMINANT/OVERWHELMING overrides the object's usual size; small things (keys, frog,
   crayon, stopwatch, marbles…) are flagged `small` and stay small; never "head-sized" beside "small" or "three times her height".
3. **Each third holds what is really there.** A person and the thing they sit in, lie on or hold share one third; room
   pieces stay where the setting puts them (move the people, or `na: true` when a giant object takes the anchor's place).
4. **Edits:** an edit-only frame's base text shows the *before* state; an edit never repeats its base, never contradicts the
   next frame, names nothing the base image lacks, makes one change, and its keep clause never lists what changes.
5. **Heights and gazes:** SON is shorter than MOM at the same depth; nobody looks into the lens — every gaze has a target
   ("toward her son out of frame at the left"). Over-the-shoulder: the far face turns three-quarters to the near one.
6. **Eyes-only shots** use the EYES-ONLY CROP (no mouth, neck or body) and say "one eye … the other eye", never a mirrored
   left/right eye. **Pure-white close-ups** name no room part anywhere.
7. **One-sided beats** (`os`) replace the interaction rule when the point is that nobody reacts; **`hr`** sets the hero face
   or figure when it is not the first-named role; **`px`** restates one object's state for one frame (a mug not yet mended).
8. Hands-only forearms rise from the bottom edge; no grins (teeth); no "fading", glow or transparency; objects held to the
   ear or lying flat at eye level are drawn so they still read; a wall-hung story object is the one exception to plain walls.
9. Run the five checks three times; `qa-consistency.cjs` now also catches mirrored eyes, side-entering hands, a doubled hand
   lock, whole-object hero colour, grammar, "sky … sky", gaze straight ahead, grins, and edits naming missing things.

## Version 18.2 — read this first (it overrides anything below that conflicts, including Version 18)

Source: Thomas's October 2026 contrast note after the first renders of "Seven Things Your Child Can't Tell You", and
Muhammad's reviews of that build's Versions 3–6 ("the coloured backgrounds went monotonous", "the background is a mess, I
can't focus on the characters", "too much detail in the kitchen", "I can't find the jar"). Thomas's words: *"The main issue
is not the colour combination itself, but the contrast between the characters and the background… first I see the
characters and their emotion, then the main action or object, and only after that the background."*

**1. The visual order is a constant.** Every frame reads in this order: the characters and their faces → the one story
object → the background. Every prompt states the order line that fits the frame (characters on a soft colour, a face alone
on white, or an object with no characters). If a frame cannot be read in that order, change the frame, not the order.

**2. Contrast behind white characters — plenty of white, never white behind a white character.**
- The wall or field directly behind the characters is a subtle, flat soft tint (very light grey, beige, sage, blush, soft
  blue, lilac-grey…; Lab lightness about 84–92, chroma about 5–10). Floors are near-white. Furniture is quiet and tonal:
  the wall's own tint one step deeper, never a second strong colour. No gradients — the image generator turns them into
  glows and vignettes and they break the flat style.
- Background lines are thinner and softer than the characters' outlines; characters and story objects keep the bold
  black outline.
- One soft hue per room (each room a different hue). The calm moods move only the lightness and temperature of that tint
  (warm a little warmer, evening a little deeper, cool a little cooler, dusk a little richer) — never into peach.
- **WHITE (pure white) is for two things only:** face close-ups (CLOSE or XCLOSE with a LARGE or HUGE face) on the lines
  where the expression carries the moment — a 2–3 second visual break, nothing behind the face, no room words in the frame's
  text — and object-only frames. Never a medium or wide shot with figures, or a hands frame, on pure white. If the idea needs
  the furniture (a desk interrogation, a test on the table, a back against the shut door), use the soft room instead.
- **NEUTRAL** is now a soft beige backdrop, not white. **ACCENT** is one subtle soft colour behind the characters with
  everything else white; inside a scene it keeps the room's own wall (nearest calm frame of the same room, up to three
  frames away, same chapter, same time of day); idea frames take the chapter's accent tint.
- Meaning colours stay for meaning: night navy, the storm, one peak colour per chapter (each chapter on a different hue).
  Their furniture is a tonal step of the field, never cream on a dark field. The past is a faded grey memory: cool light
  greys with only the story object in colour.
- Build the palette around the spine objects. An orange object dies on wood, honey, mustard or peach: keep large areas
  cool or clean wherever it appears. The story object's hue stays far from its wall.

**3. Set pieces by need — detail is the enemy of focus.**
- Each room is its soft wall, its floor and ONE anchor piece that says where we are (kitchen table, sofa, front door, bed,
  desk, landing door). Every other piece (doorway, counter, fridge, stairs, hall table, window, shelf, chairs) appears only
  in frames whose own action, placement, edits or sequence steps use it; close shots show only the pieces their own action
  or placement names. Pieces keep fixed places (left · centre · right), so the room never jumps.
- Chairs only for the people sitting. A counter is a flat top on a plain block — never sinks, taps, drawers or handles. A
  fridge only where the story uses it. No room dress at all: no pictures, posters, rugs, plants, drawings, hooks, mats,
  lamps, skirting, planks or tiles.
- Placement never fills a third of the frame with furniture: "the plain wall" is a valid third.
- Room masters are generated first and are minimal. The room-reference line keeps the wall colour and the named pieces only
  — "draw only the pieces this setting names, even if the attached image shows more" — because an attached master copies
  its furniture into every later frame.

**4. The story object is second — the OBJECT FOCUS line.** Every frame with a story object says: after the faces the eye
goes straight to it — a little larger than life (at least head-sized; large and central in hands and object shots), only
plain wall or plain background behind it, fully visible, outlined with the same bold black line as the characters; other
objects smaller and quieter. Exceptions: where smallness is the story (a drifting or shrinking bubble) use the light line
(`fo: "light"`); where a door is the metaphor the door is the focus (`fo: "door"` or `mf: "door"`). Something hidden from a
character is still turned toward us. Spine objects are designed to read at a glance (the jar: bold outline, a lid a third of
its height).

**5. Hands-only frames.** Forearms enter from the nearest edge — the bottom edge, or the bottom corners when two people
share the frame — as short lines; never two arms stretched in from opposite sides (they render as long cables).

**6. Interaction and children.** Warm beats get a touch (a hand on the shoulder, an arm round him, taking the bag);
distance only where distance is the story. A small child alone in a medium shot needs a size cue (furniture at his shoulder
height, an object big in his small arms), or he reads as the teenager.

**7. Consistency sweep before delivery** (with the four QA scripts, three times). Check that no pure-white close-up names a
room part; no frame on a soft colour still says "white"; every piece named in placement or action is in the setting and
none is drawn without a reason; no removed set piece is still named; the object-focus size never contradicts an object that
is small, hidden or inside a bubble on purpose; hands never enter from both side edges; settings carry no texture words;
placement text names walls generically ("the plain soft wall"), never by colour; every character named in a frame is cast
in it. Run `scripts/qa-consistency.cjs` with the other four checks. Full rules, tables and values:
`references/contrast-and-detail-v18_2.md`; the compiler that implements them: `assets/build-template.jsx` and
`assets/compiler-v18_3/` (it rebuilds the reference video byte-for-byte).

**Changelog v18.2 (3 Oct 2026)** — added: the visual order as a constant; the soft tint behind white characters, tonal
furniture, near-white floors and soft background lines; pure white only for face close-ups and object frames; NEUTRAL as
soft beige; ACCENT that keeps the room's wall inside a scene; the faded-grey past; set pieces by need with one anchor per
room and a room reference that cannot add furniture; the OBJECT FOCUS line with its light and door variants; hands from the
bottom edge; interaction and child size cues; the consistency sweep (`scripts/qa-consistency.cjs`); the v18.2 compiler (`assets/build-template.jsx`,
`assets/compiler-v18_3/`). Replaces: "two or
three calm details per room" and "a glimpse of the room in every close-up" (v16), fixed full-room layouts in every frame,
NEUTRAL as near-white, pure white with full figures, cream furniture on emotional fields, frost blue for the past, and hands
entering from both side edges. Proven on "Seven Things Your Child Can't Tell You" Versions 3–6 (232 frames; all four QA
scripts pass three times). Full entry in `CHANGELOG.md`.

## Version 18 — read this first (it overrides anything below that conflicts)

**The whole skill now runs through one way of deciding: `references/director-framework.md`.** Read it before anything
else, and apply it to every step and every action — story, ideas, scenes, shots, angles, motion, edits, sequences,
metaphors, objects, rooms, colour, white space, contrast, text, humour, transitions, pacing and review.

- **Read what Thomas means, not only what he said.** He judges the feel of the finished video and corrects extremes
  (too plain → clutter, more white → all white, more colour → too much colour, more movement → an edit on almost every
  frame, which he had warned against). Every note is a dial set by the moment, never a switch, a blanket rule or a quota.
- **The director's read comes first:** the emotional curve, the 8–12 signature images, where the story moves and where it
  stands still, where we need a face, an idea or the place.
- **The four questions decide every frame:** purpose, feeling, focus, change — with one line of "why" (`b.why`). *(v18: only where the story moves — director-framework.md §4)*
- **Moment types** (hook, everyday story, anger peak, hurt, explanation, aha, tenderness, memory, humour, night) give
  starting treatments for background, colour, shot, motion and keywords; the four questions can override them.
- **Motion only where the story moves:** an edit when the line describes a change, the emotion turns or a punchline
  needs a beat; a sequence only for a visible cause-and-effect mini-story at a key moment (usually 10–15 per video);
  otherwise the cut is the motion, and stillness (`b.still`) is used on purpose.
- **Metaphors must pass five tests** (explains the mechanism, reads in one second, emotionally true, from the family's
  world, can pay off later). Stay at the middle point: never too simple, never random.
- **Checks:** constants hard-fail (characters, contrast, natural angles, text style, edit wording, cue words, room layout);
  everything counted — colour, white, close-ups, metaphors, keywords, frames without an edit — is a flag to judge, never
  a reason to change a frame just to pass.

Start every video with `references/director-read-template.md` (the director's read is the first deliverable). Build with `references/data-fields-and-build.md` (every data field, the template blocks and the build steps). Older rules further down this file and in older references are marked *(v18: …)* where they read as quotas or forbid text — treat them as guides judged by the moment.

Then read, in this order: `references/system-v17.md` (the story-first steps and gates),
`references/colour-and-text-v17.md` (Thomas's Oct 2026 notes: less colour where it helps, white + one soft colour
(ACCENT), contrast always, rhythm per chapter, occasional keywords in one Premiere style),
`references/render-lessons.md` (what the generator follows: natural camera presets, THE PICTURE first and last, sizes,
room masters, automatic locks) and `references/video05-worked-example.md`.

Tools: `assets/build-template.jsx` is the "Seven Things" Version 7 build with the v18.3 compiler (keep the compiler,
replace the data; it supports ACCENT, `b.plain`, `b.keyword`, `b.touch`, `b.still`, `b.why`, `b.pieces`, `b.focus`, `b.heroWho`, `b.oneSided`, `b.propText`, `b.noAnchor`, `b.eyesOnly`, CAMERA_LIB,
room masters, sequences and edit-only lines); `assets/compiler-v18_3/` rebuilds it from parts (template, assemble.cjs,
dicts.cjs, segs/ — see its README); the Video 05 build is kept as `assets/build-template-video05.jsx` and its part files in
`assets/compiler-r13/`; `scripts/copy-page.cjs` and `scripts/edit-page.cjs`
make the pages; run `qa.cjs`, `qa-render-risk.cjs`, `qa-sequences-colour.cjs`, `qa-colour-v17.cjs` and `qa-consistency.cjs`
three times before delivery. Muhammad's standing preferences: plenty of close-ups where the moments call for them, natural angles
only, prompts at full length, every instruction applied across the whole framework, and Claude takes creative ownership.

Client: **Thomas Kolonjak**, channel **The Parent Code**. Topics: parenting, teen psychology,
family behaviour, emotional development. Videos run about 8:15–8:45 of final voice-over, roughly 190–220 lines.
Muhammad generates every frame in Flow with the **MOM** and **SON** reference images attached,
then cuts in Premiere. This skill's job is the visuals: scene planning, prompts, the pop-in plan
and the camera-move plan. **The script segmentation, the final wording and the voice-over timing
are Muhammad's and arrive finished — never merge, split, reword or re-time a line.** Edit, audio,
runtime and SFX are his side too. Every push for more energy comes from inside the frames and the
edit cues, never from changing the line list.

This skill is the Innes explainer-prompt-writer's workflow — the multi-pass story process,
the director rules, the character construction, the data-driven compiler — with every rule
that belonged to *her* taste removed and Thomas's taste put in its place. Where the two
clients are opposites, this file is Thomas's side:

| Innes wants | Thomas wants |
|---|---|
| White backgrounds by default, colour the exception | v17: plenty of white — white or one soft colour on 35–50% of frames, soft rooms for places, full colour only with a meaning, strong colour only on the important objects, varied scene to scene *(v18: a guide to judge by the moment, never a quota — director-framework.md)*; v18.2: never white directly behind a white character |
| Restrained expressions, subtle eyebrows | Expressions pushed stronger than life, faces up to 60–80% of the frame (with a hard ceiling) *(v18: a guide to judge by the moment, never a quota — director-framework.md)* |
| Calm, minimal, uncluttered | Few elements per frame, but alive: something happens inside every scene |
| Occasional "that was clever" beat, never comedy | Aha moments, surprises and small humour where the script allows |
| One MC mascot | A family cast rebuilt per video, teen/adult/child instantly distinguishable |
| Environments rare | Many locations (25+), time visibly moving inside long scenes |

It is a **judgment-heavy creative task**, not a find-and-replace. Four failure modes it exists to
prevent — each one cost a full revision round with this client:
1. **Illustrating the sentence instead of the feeling.** A line mentions a guitar, the frame shows
   a boy holding a guitar. Thomas asks what the viewer should *feel*, then builds the frame from
   that. See `references/idea-not-object.md`.
2. **A stack of correct frames that is not a film.** Every frame passes, the video is still a
   slideshow — same rooms, same medium shot, nothing happening inside the scenes. Steps 2, 3 and 5
   exist to catch this.
3. **Flat colour.** Everything the same pale intensity (Video 3), or a whole scene drowned in one
   hue (Video 2). The eye has nowhere to go. Step 6 is a dedicated colour-and-energy pass for it.
4. **Drift.** A guitar loses its strings, a hand disappears, the teen grows to his mother's
   height. Consistency is locked through constants restated in every prompt, not hoped for.

## QUICK START — what happens when Muhammad pastes a script
- **He gives:** the script split into lines (and segments), optionally the voice-over length and any
  editor briefing from Thomas. Lines are final — never merge, split, reword or re-time them.
- **You deliver, in that same reply:** the build file, every frame prompt, the in-scene edit prompts *(v18: only where the story moves — director-framework.md §4)*
  (30%+ of frames), mask reveals, inserts, QA passed three times, the copy page and the edit page. *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
  No plan approval, no batches, no "proceed".
- **You read:** `references/RULES-CARD.md` (every rule in one card), `references/jsx-template.md`
  (the beat fields), the character images in `assets/characters/`. Everything else is looked up with
  grep when needed — `metaphor-bank.md` for metaphors, the others for detail.
- **The rules that decide quality, in priority order:** (1) the CORE ANIMATION RULE, (2) THOMAS'S RULES
  (neutral first; metaphor as the main visual engine; a fresh stimulus every 20–30 seconds; keep
  characters, emotions, variety and close-ups), (3) the Targets table, (4) the construction and render
  rules the compiler writes into every prompt.

## CORE ANIMATION RULE — read this before anything else
Thomas's videos must *move* inside the scene, and Flow can't hold a scene steady across two prompts: a
new prompt redraws the room, the characters and the camera. So animation inside a scene is built in
the edit, from one generated image per frame:

1. **Change inside a scene → an IMAGE-EDIT prompt, never a new prompt.** A character sits up, picks
   something up, turns their head, reacts, walks past, a hand pulls the phone free, stones appear across
   the river — each is an `EDIT_CUES` entry for that frame. Muhammad opens the frame's generated image in
   the image editor, pastes the edit prompt, and cuts from the original to the edited image on the cue
   word. Write the change in detail — who changes, from what to what (which arm, where the hand goes,
   where the head turns, eyebrows, pupils, mouth; or where an object appears, its size and colour) — and
   one sentence of what stays exactly as it is. `editPrompt()` adds who-is-who, keep-exactly and do-not.
2. **An object appearing on one flat colour → a MASK reveal.** It sits alone on a shelf, table top,
   wall, floor, sky, sheet or screen, touching nothing; Muhammad hides it with a flat shape in the cover
   colour and uncovers it on the word. No generation at all.
3. **Only then** inserts, overlay pop-ins and camera moves.

Minimums (the QA fails below them): edits on **30%+ of frames** — at least one frame in three changes while it plays — **4+ in the first 30 seconds**, at *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
least **one in every segment of 6+ frames**, and every same-place character scene of 3+ frames gets one;
mask reveals on 15%+ of frames. Every video ships with the **edit-prompt page** (`scripts/edit-page.cjs`) *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
and the **copy page** (`scripts/copy-page.cjs`). Full detail: `references/motion-and-energy.md` §9–§10.

## THOMAS'S RULES FROM THE VIDEO 4 REVIEW — exactly as he said them, as important as the core rule
1. **Neutral first. Colour with purpose. Never colour just to fill empty space.** Inside every frame
   about 70–80% of the picture is neutral and clean and about 20–30% is targeted colour on what matters *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
   (the phone strong turquoise, the room neutral, so the eye goes straight to it). Across the film most
   frames sit on NEUTRAL or BRIGHT; full-colour backgrounds are the purposeful 20–30% — night scenes in *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
   dark blue-grey (he praised these), the strongest peaks, metaphor places. Never orange/peach by default.
2. **Much bolder objects and much more metaphor.** Amplify the voice-over, don't just illustrate it:
   scale, perspective, surprising objects, transformations, with a character reacting inside the
   metaphor. His examples (crushing backpack, wall between them, giant phone pulling him in, giant clock
   chasing him, mountain of messages) are samples of the principle — `references/metaphor-bank.md` has
   90+ idea rows and a metaphor engine for any new idea. Metaphors are the video's main visual engine:
   about half the frames (45–60%; Video 5 settled at 51%), every idea line gets one unless a story frame *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
   shows it better, 5–8 metaphor families per video as through-lines tied to the story (never random),
   two or more in every segment of 8+, and never the same family 4+ frames running.
3. **A fresh visual stimulus every 20–30 seconds** — metaphor, surprising object or scale, unusual
   perspective, or a transformation edit. Never chaotic: fewer, more interesting elements.
4. **Keep what already works:** characters, emotions, scene variety, close-ups.
Apply all of this to the WHOLE script in one amplification pass over every segment. The QA fails
outside 20–30% colour-background frames, on any ~25-second stretch without a bold idea, on any segment *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
of 8+ frames with fewer than two metaphor frames, and far outside 45–60% metaphor frames; it warns when a *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
metaphor has no family tag, a family runs 4+ frames in a row, or the video has fewer than three
through-line families.

## THOMAS'S RULES FROM THE VIDEO 5 ROUNDS — standing rules for every video from now on
1. **Objects are designed, never generic.** Every recurring object gets one characterful, countable
   detail (the phone's ray lines, the alarm clock's bells, the stone's backpack straps, the bill that curls,
   the keys' pompom). Colours and counts stay locked. Only the story's key papers stay plain on purpose.
2. **Rooms have character but stay clean.** Every setting carries two or three calm details in the house
   tones (a window with a plant, a rug, a lamp, picture frames, magnets). Close-ups add one short glimpse
   of the room behind the head so the room still shows. Plain colour fields stay plain on purpose. *(v18.2: superseded — a room is its soft wall, its
   floor and one anchor piece; other pieces only where the action uses them; no room dress; close-ups show only what their own
   action names, and some face close-ups are pure white. See Version 18.2.)*
3. **Characters act on objects.** No one stands next to an object: they grab, tug, carry, hide, push,
   drop, plant, swat it. The object is part of the action in the frame and in its edit.
4. **Movement is a story told in stills.** Most frames carry an in-scene edit (Video 5: 87%); no frame *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
   is left with no edit, reveal or pop. **Important and emotional moments are told as image sequences:
   3–5 images in one scene** (the frame, its edit, then an insert, read in that order), each image visibly
   changing what the characters do — e.g. on the phone → MOM takes it → he reaches → she reacts; throws
   the teddy → stamps → turns away → the parent kneels calmly. List them in `SEQUENCES`. Simple scenes
   stay simple. Video 5: 17 sequences.
5. **Zoom and pan selectively.** `HOLD` (no camera move) is a valid move: the later images of a sequence
   and gentle filler frames hold still so the cut carries the motion; peaks and word-timed hits keep
   their move. Aim for 10–30% HOLD and never the same move 4 frames running. *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
6. **No explanatory text.** Show it instead of writing it (a drawn face on a phone screen, not the word).
   No quoted words anywhere in a scene or edit — image models print them — so mouths are described as
   shapes ("a small round circle"), never as a letter.
7. **Write for mitten hands.** Never "finger" or "fingers"; no anatomy or clothing words in edits
   either; no lighting words (glow, shadow) that fight the flat style.
8. **Edits only touch what is in the frame.** An edit never names a character or object that is not in
   that frame, and never lands on the same word as a pop-in or mask reveal when the line has another
   word to use.
9. **Bold, surprising metaphors on the explanatory lines** (Video 5: a mountain of message bubbles that
   buries MOM, an invisible tension rope only the child can see), each with a character inside it.

## What the user provides each time

1. **The script, split into lines** — final. Muhammad has already segmented it; one prompt per line,
   in order, words untouched.
2. **The line count** — one prompt per line, exactly. If a stated count and the pasted lines disagree,
   follow the pasted lines and mention it in the reply; never merge or split lines yourself, and never
   stop to ask.
3. Optionally, Thomas's **editor briefing** with scene directions, and the voice-over timing — when
   Muhammad gives the timing, set `PROJECT.runtimeSec` from it (the 40-second bands depend on it).
   Treat his directions as strong input, not a script to copy: follow them where they serve the
   feeling, and where one is weak, keep its intent and stage a stronger version (he has said
   repeatedly he wants independent ideas, not copying). Default runtime if none is given: 8:30
   (Thomas targets 8:15–8:45 of final voice-over).

Everything else is bundled. If the user hands over a newer version of any rule in-chat, it
supersedes the bundled copy for that conversation. If reference images of the cast are shared in
the conversation, `view` them before writing any character frame.

## What's bundled — read the rules card; look the rest up only when needed

- **`references/metaphor-bank.md`** — 90+ idea → bold picture → transformation-edit rows and the
  metaphor engine for new ideas. Grep it for the line's idea; never read it whole.
- **`references/RULES-CARD.md`** — every rule in one short card: characters, camera, Thomas's colour
  and metaphor rules, the core edit rule, mask reveals, story, delivery. Read it first, every video.

- **`references/director-rules.md`** — the philosophy: film not slideshow, one idea and one hero per
  frame, emotion before information, camera as storytelling, body language and hands, continuity,
  visual rhythm, the production-tested construction rules, and the appendix checklist.
- **`assets/characters/`** — the approved MOM and SON reference images (`mom-body.png`,
  `mom-portrait.png`, `son-body.png`, `son-portrait.png`) and character sheets (turnarounds, poses,
  MOM's expressions, the MOM-and-SON height sheet). **`view` them all before writing any character
  frame, every video.** They are the source of truth for head size, hair, eyes, body, hands, feet and
  the height difference.
- **`references/characters.md`** — what the reference images show (measured), why Video 4's hook
  drifted (text that fought the images), how to write short reference-first character text, and
  the character-sheet prompts for Muhammad to generate once and attach on every frame.
- **`references/visual-library.md`** — the wider vocabulary: 25 storytelling devices (context frames,
  house cross-sections, escalation ramps, object's-eye views, through-the-doorway shots, cause-and-effect
  cuts, power angles, callbacks…), five views of every recurring room, nine colour moods with ramps and
  hotspots, and the variety rules. Every line starts from "what must the viewer understand here?"; the
  answer picks the device, logged in each beat's `device` field.
- **`references/staging-and-props.md`** — every frame tells the story: where the object is now,
  the story leading the action's first sentence, one or two lived-in story details per location,
  close-ups with context (never floating heads), characters acting on each other, text and props
  being used, explainer lines staged as small stories.
- **`references/motion-and-energy.md`** — **the Video 4 standard.** Thomas's five pushes after Video 4
  made concrete: the `move` cue on every frame, a first 30 seconds 10–15% more dynamic without *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
  touching the line list, 5–10% extreme close-ups on the emotional peaks (always with context), pop-ins that are story *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
  objects landing on their word, no static middle, metaphors kept at the top of the range, and the
  Video 4 weaknesses not to repeat. Read it right after `client-standards.md`.
- **`references/emotion-and-performance.md`** — Thomas's number-one rule made concrete: the
  feeling-first build order, the expression table (brows / pupils / mouth / body / hands per
  emotion), the exaggeration ceiling, face sizes, hands-only shots, character interaction (action
  and reaction in one frame), recognition kits, distance, teen/adult/child distinction,
  cause-and-effect sequences.
- **`references/colour-direction.md`** — the colour system: the colour script planned per section
  before any frame, the six mood palettes, the per-frame hierarchy (hero → character → background),
  visual peaks, the red rule, the failure table, and the Step 6 self-check.
- **`references/idea-not-object.md`** — "don't illustrate the sentence," with Thomas's four questions
  and the measured noun-in-hands check.
- **`references/story-structure.md`** — the story plan written into the build (STORY, PLAN, MOTIFS),
  the cold open and its payoff, "no scene stays unfinished" (the `stage` field), the spine object
  and motifs across the film, how to stage explanation lines without becoming an infographic, and
  emotion running through the whole film.
- **`references/aha-humour-popins.md`** — action inside the scene, the four-beat scene progression,
  aha and humour techniques and cadence, the hook, and the pop-in plan with overlay prompts.
- **`references/constants.md`** — the full text of every shared constant (copy verbatim) plus the
  patterns for ROLE, MOOD, WORLD, PROP, OVERLAY and TEXT, the setting decision checklist, and the
  consistency hard rules.
- **`references/client-standards.md`** — every standard Thomas has set, the targets and why each
  number exists, every complaint he has made with what he actually wanted, what he praised, his
  reference channels, and how to handle his feedback. Read the complaint history hardest.
- **`references/jsx-template.md`** + **`assets/build-template.jsx`** — the beat fields, the compiler,
  and the UI. Copy the template file and fill it; don't rebuild the UI from memory.
  **`assets/example-test-frames.jsx`** is a worked six-beat example that passes QA — read it to see
  what well-filled beats look like.
- **`scripts/qa.cjs`** — the QA suite. Run it; reading the targets is not the same as running them.
  `--brief` prints only failures, warnings and the result (use it — it keeps the chat short);
  `--partial` checks a build that is still being written.
- **`scripts/progress.cjs`** — reads a saved build and says which lines are written and where to
  continue. Only needed if a reply was cut off; the next message then continues from it.

## Targets — the level Thomas already signed off on

Every number comes from his feedback (see `client-standards.md` for the why). Percentages are of
the whole film; film-level targets apply from about 60 frames up. Video 4's delivered level is the
floor — every new video starts at or above it and pushes the rows marked **V4+** further.

| He asked for | Target |
|---|---|
| Close-ups on emotion | 45%+ of frames CLOSE, XCLOSE or HANDS; 25%+ in every segment *(v18: a guide to judge by the moment, never a quota — director-framework.md)* |
| Bigger faces | 10%+ HUGE (head 60–80% of frame), 25%+ HUGE or LARGE; every 40-second band has one HUGE or two LARGE *(v18: a guide to judge by the moment, never a quota — director-framework.md)* |
| **V4+** Extreme close-ups on emotion | 5–10% XCLOSE, only on the peak shocked, angry, hurt and thinking lines; 2+ in the first 30 seconds; every close-up has context in frame (the object, the other character's hand, the place) — never a floating head; never two huge faces within three frames *(v18: a guide to judge by the moment, never a quota — director-framework.md)* |
| **V4+** Explainer direction, no presets | every beat names its storytelling device; segments of 8+ frames use 3+ devices; no device over 30% of the film; every scene opens with context; the same room and angle never twice within six frames *(v18: a guide to judge by the moment, never a quota — director-framework.md)* |
| **V4+** Story in every frame | a story object placed deliberately in 60%+ of character frames (where is it now?); the action's first sentence is the story; 40%+ of two-character frames have a physical exchange *(v18: a guide to judge by the moment, never a quota — director-framework.md)* |
| **V4+** Render risks | no prop given two sizes, no close shot describing a full figure, two strong colours at most per frame, no stray-hands or half-drawn wording, no one-frame mood flicker, dark frames stay navy with black hair (see `motion-and-energy.md` §8) |
| Isolate the hands | 5%+ hands-only frames, head fully out of shot *(v18: a guide to judge by the moment, never a quota — director-framework.md)* |
| Important objects big | 10%+ frames DOMINANT or OVERWHELMING; at least one in every segment *(v18: a guide to judge by the moment, never a quota — director-framework.md)* |
| Varied perspective | level eye-line on 60% of frames or fewer, and natural angles (eye level, square-on, side-on, over-the-shoulder) on 45%+; strong low and high angles only where power, scale or helplessness is the point; close-ups at eye level; a natural normal-lens look always (no fisheye, tilt or upside-down); never a character as a lone arm reaching in from a frame corner *(v18: a guide to judge by the moment, never a quota — director-framework.md)* |
| Scene variety | 30+ locations in a full video; distinct scenes (place **or** time) on 30%+ of frames *(v18: a guide to judge by the moment, never a quota — director-framework.md)* |
| **V4+** No static middle | no location more than 4 frames in a row; in the middle half, every 7 frames use 3+ locations and every 4-frame window has a close-up, hands, an object shot, a scale change or a snap zoom / shake |
| **V4+** Camera moves | a `move` cue on every frame (push, pull, snap zoom, pan, tilt, drift, shake), never the same move 4 frames running; snap zooms and shakes name their word *(v18: only where the story moves — director-framework.md §4)* |
| No monotony | two heaviest locations under 40% combined; no 3 identical shot sizes in a row *(v18: a guide to judge by the moment, never a quota — director-framework.md)* |
| Strong opening | a cold open: frame 1 is a HOOK inside the conflict, a big face in the first 3 frames; the first 30 frames hold 10+ distinct scenes, 4+ shot sizes, a HUGE face and dense pop-ins; an open cold open names its later payoff; **V4+** every frame in the first 30 seconds has a pop-in and a camera move, the shot size changes every frame, 2+ extreme close-ups that look different, at most 2 plain backgrounds and 2 hands-only frames, no look-alike frames *(v18: only where the story moves — director-framework.md §4)* |
| Emotion all the way through | 2+ EMOTIONAL or HOOK frames in every 40-second band; no more than 4 SIMPLE frames in a row |
| Characters interact | in every multi-character frame each character has their own performance, and the eye line between them is stated |
| Correct characters | built exactly like the MOM and SON reference images in `assets/characters/` (head size, hair, eyes, thin-line body, mitten hands, oval feet); bare bodies with only the small accessories locked in each ROLE; character text kept short so it never fights the images |
| No unfinished scenes | every segment reaches a RESULT; every PROBLEM gets a REACTION and a RESULT; every setup ref exists |
| Motifs travel | the spine object/motifs appear in the first and last fifth and across 3+ segments; the last segment calls back |
| Props and text are used | every prop in a character frame is touched, used or looked at; on-screen text 4 words max, on a real surface |
| Something happens | an aha, surprise or humour beat in every 40-second band |
| Colour direction (Thomas) | neutral first: inside each frame ~70–80% neutral, ~20–30% targeted colour on what matters; full-colour backgrounds on 20–30% of frames, only with purpose (night blue-grey, peaks, metaphor places); a saturated hero in every frame; no BRIGHT run over 5 *(v18: a guide to judge by the moment, never a quota — director-framework.md)* |
| Red means danger | strong red only on danger/warning objects |
| Don't illustrate the words | under 4% of frames answer their own line with its noun in a lone character's hands *(v18: a guide to judge by the moment, never a quota — director-framework.md)* |
| Symbolism, not infographics (Thomas: much more) | metaphor frames 45–60%, bold and physical, on every idea line unless a story frame shows it better; 3–5 through-line families tied to the story (`metaphor` tag); two or more per segment of 8+; a fresh visual stimulus every 20–30 seconds *(v18: a guide to judge by the moment, never a quota — director-framework.md)* |
| **V4+** Mask reveals | an element on one flat colour, touching nothing, hidden by a flat shape in Premiere until its word — on 15%+ of frames, 2+ per segment of 8+ frames, 2+ in the first 30 seconds; each gives the cover colour and the word; bubbles baked, floating icons as overlays *(v18: a guide to judge by the moment, never a quota — director-framework.md)* |
| **V4+** In-scene changes are image edits | any change inside a scene (a pose, a reaction, someone moving, something appearing that can't be masked) is an edit prompt for that frame's image, never a new prompt — detailed (who, from what to what, what stays exactly the same), one per frame, on 30%+ of frames and 4+ in the first 30 seconds *(v18: a guide to judge by the moment, never a quota — director-framework.md)* |
| **V4+** Object animation on the word | 50%+ of pop-ins are story props landing on the word that names or acts on them; generic symbols (?, !, ticks, numbers) under half *(v18: a guide to judge by the moment, never a quota — director-framework.md)* |
| Prompt actually generates | reference anchor first, story second; character prompts ~5–9k characters (long character text fights the reference images), nothing over 12k, zero instruction-shaped wording |

## One message, one finished video — no batches, no "proceed"
Muhammad pastes the script (lines, segments, optionally the voice-over length) and the skill delivers
the whole video in that same reply: plan, every beat, the edits, reveals and inserts, the passes, QA
three times, and both pages. Never stop for plan approval, never end with "say proceed" or "next batch".

**Staying under the chat length limit** (the reason earlier chats got stuck):
- **Read little.** Read `references/RULES-CARD.md`, `references/jsx-template.md` and view the character
  images — not every reference file. Open another reference only to look one thing up, with `grep`
  or a line range, never whole.
- **Write straight into files, never into the chat.** Copy the template to
  `/mnt/user-data/outputs/<video>-build.jsx`, then write the PLAN and the beats with bash (python or
  heredoc) one segment per call, appended into the file. Never paste beats, prompts or plans into the
  reply, and never read the build back with `view` — check it with the scripts.
- **Keep beats lean.** One or two short sentences per framing/action/performance field; the compiler
  adds every lock and constant. No SKETCH pass — the PLAN rows plus the beats are the plan.
- **Keep tool output short.** Run QA as `node scripts/qa.cjs <build> --brief` (prints only failures,
  warnings and the result); pipe long commands through `tail` or `grep`.
- **Decide once.** Don't draft beats in thinking and retype them; decide and write.
- **Resume, never restart.** Everything is saved as it is written. If a reply is ever cut off, the next
  message of any kind (even "ok") continues from `node scripts/progress.cjs <build>` — never from zero,
  and never asking Muhammad to say "proceed".
- **One video per chat.** Start each new video in a fresh chat with the skill installed.

Order inside the one reply: (1) read the card and template, view the characters; (2) write PROJECT,
SCRIPT, STORY, PLAN (segments, colour, metaphors, motifs, edit plan) into the file; (3) write the beats
segment by segment, each with its colour, metaphor, pop, reveal and move decided on the spot; (4) add
EDIT_CUES (30%+), INSERT_BEATS and overlays; (5) run QA `--brief`, fix, repeat until three clean runs; *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
(6) build and publish the copy page and the edit page; (7) reply briefly: what was made, the numbers,
anything that needs Muhammad's eye.

## Workflow — a multi-pass process, not one line-by-line pass

### Step 1 — Read the bundled references in full
`view` the reference images and character sheets in `assets/characters/` first (and any newer
character images Muhammad shares) — every character frame is written from them.
`references/RULES-CARD.md` and `references/jsx-template.md` in full, and `view` any cast reference
images shared in the conversation. The other references are for looking things up, not for reading
whole (see "Staying under the chat length limit"). Carry these rule families through every prompt:
- One idea, one hero, three-second read; sound-off test and pause test (director-rules §2, §10–11)
- Feel before you frame: face → eyes → body → hands → distance → camera → object → colour
- Expressions stronger than life, with the ceiling; eyes never static; hands always doing something
- Insight over sentence (`idea-not-object.md`); CHARACTER → EMOTION → ACTION → SYMBOL
- Camera as an explicit choice every frame; never the same shot size three frames running
- Colour neutral first: a clean NEUTRAL room, one saturated hero, white-and-black characters; full-colour
  backgrounds only with purpose (Thomas's rule)
- Something happens inside the scene; scenes progress start → problem → reaction → result
- The construction rules in `constants.md`, restated verbatim in every prompt

### Step 2 — Read the whole script for story and feeling (no writing yet)
Read start to finish and answer these — they become the build's `STORY` block
(`story-structure.md`):
- What is this video about, and what psychological idea should the viewer leave with?
- What is the emotional journey — where are the peaks, where is the lowest point, how does it end?
  (Endings: relief, cautious closeness, calm — never a perfect happy ending.)
- Who is the family? Thomas rebuilds the cast per video when the topic needs a different family;
  reuse MOM and SON when the story fits them.
- What is the **spine object** — the one real object the conflict lives in (Video 1's phone:
  contested → taken → ignored → freely given)? It must come from the story. Never invent a symbolic
  thread (a cord, a spark, a flag) — Thomas rejected three of those as meaningless.
- Which lines carry an idea (a claim, a lesson, a feeling named, a "this is why")? Each gets a bold
  metaphor unless a story frame shows it better. Pick the video's 3–5 metaphor families (through-lines)
  from its themes — `metaphor-bank.md` (grep it) and its metaphor engine for anything new.
- What is the hook? Plan a **cold open** (`story-structure.md` §2): the video starts in the middle of
  a charged moment, emotional from frame one, ending on a question the film pays off later.
- Which lines are explanation (psychology, research, reasons, lists)? They get the explainer-line
  playbook (`story-structure.md` §5) — simpler staging, still a family moment, never a diagram.

### Step 3 — Break into segments and plan each one before writing frames
Divide the script into segments wherever the subject, setting or story beat genuinely shifts, and
write the build's `PLAN` (one row per segment: purpose, feel, mood, metaphor) and `MOTIFS` (the
spine object and recurring motifs with the states they move through). For the whole film first,
then segment by segment:
- **Cast (ROLE).** One entry per character, written before their first frame: age group, height
  relative to the others, hairstyle, head details and any small accessories (tie, cap, scarf,
  glasses — minimal clothing, never a garment on the body) — a **recognition kit** that reads from
  the front, in profile, from behind and small (`emotion-and-performance.md`). When MOM and SON return,
  copy their ROLE text verbatim from the last approved build; never rewrite a returning character. Teens
  reach an adult's shoulder; children are a different build, not small teens. A character with no
  reference image gets an explicit note, and their first frame is one of the four test frames.
- **Colour plan (MOOD) — neutral first.** Most frames sit on NEUTRAL (or BRIGHT); decide the
  purposeful 20–30% of full-colour frames up front: night scenes in DARK blue-grey, the strongest *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
  peaks, the metaphor places. Inside every frame the hero object carries the strong colour. See *(v18: only where the story moves — director-framework.md §4)*
  `colour-direction.md`.
- **Locations (WORLD).** Many and varied: each location is a simple layout with one or two signature
  set pieces; walls and floors take the frame's mood, furniture keeps one fixed colour per set (house
  lock). *(v18.2: walls are a subtle soft tint per room, furniture a quiet tonal step of it,
  floors near-white; one anchor piece per room plus pieces by need — `references/contrast-and-detail-v18_2.md`.)* Plan time progression inside any long scene
  (dinner starts → halfway → going cold; night → small hours).
- **Objects (PROP).** Every recurring object gets a countable build spec (six strings, two straps,
  one screen border) and a locked hex. Danger objects are flagged; only they may be strong red.
- **Tier every line** — Thomas's own structure: *"normal explanation scenes can be simpler and
  cleaner; emotional key moments should get the stronger close-ups, facial expressions, eye
  direction, hands and body language; major hooks or pattern interrupts can use stronger metaphors
  or more complex visuals."* SIMPLE, EMOTIONAL, HOOK — roughly 20 / 55 / 25, never more than four
  SIMPLE in a row. *"Keep it simple where simple is enough, and add detail where the emotion really
  matters."*
- **Sketch each scene's four beats** — start → problem or change → reaction → result — then write
  frames to fill them, instead of writing sentence by sentence. Mark them in the `stage` field; a
  scene that starts must finish on screen (`story-structure.md` §3).
- **Mark candidate spots** for aha, surprise and humour beats and for pop-in cues, spread across the
  film and dense in the first 30–40 seconds (`aha-humour-popins.md`).
- **The opening 30 seconds**: storyboard it as one sequence — inside the conflict on frame one, fast
  changes of distance, a huge face early, objects popping, curiosity about what happens next.


### Step 4 — Line by line, plan before writing
For each line, fill the beat's fields in this order (field reference: `jsx-template.md`):
1. **feel** — what should the viewer feel here? Then **meaning** — what should they understand?
   One sentence each. If the meaning is only the noun in the line, reread `idea-not-object.md`.
2. **hero** — the one thing the eye lands on first. It also gets the frame's hero colour.
3. **Camera** — `shotSize`, `angle`, `face`, `scale`, and `framing` prose. Choose them for the
   feeling, and check the last few frames so nothing repeats three times.
4. **action** — what physically happens inside this frame; something moves, changes, escalates,
   falls, or is reacted to. Every prop in the frame is used, held, looked at or reacted to. With two
   characters: what one does, the other reacts to — plus the distance and who is where.
5. **performance** — for every visible character, named: eyebrows, pupils (where they look — and
   whether eye contact is met or refused), mouth; plus body and hands. Use the expression table;
   push it; respect the ceiling.
6. **props**, **world**, **mood** — only the objects the moment uses, the setting, the colour mood.
7. **stage**, **moment**, **pop**, **link** — where the frame sits in its scene, any planned
   aha/humour beat, any pop-in cue (a story object on its word wherever possible), and any setup
   or callback (name the ref it points to).
8. **device** — which storytelling device from `visual-library.md` answers "what must the viewer
   understand here?"; vary it across the segment.
9. **reveal** — where an object or effect can appear on the key word with a mask: on one flat colour,
   touching nothing, with the cover colour and the word (`motion-and-energy.md` §9).
   **edit** — where something changes inside the scene, add an `EDIT_CUES` entry: a detailed image-edit
   prompt for that frame, never a new prompt (`motion-and-energy.md` §10).
10. **move** — the camera move for the edit, chosen from the feeling (`motion-and-energy.md` §1):
   push in on building emotion, snap zoom or shake on a shock word, pan across a gap, tilt up a
   towering object, drift on calm. Emotional peaks get an XCLOSE and a push or snap.
Then check the prompt the compiler will produce reads as one clear picture.

### Step 5 — Story pass: does this read as a film?
Reread each segment the way a viewer watches it, not as a checklist:
- Does it flow as continuous moments, or read as images slapped on sentences? Re-stage the weak
  ones — change the shot idea, not just the wording.
- Does time only move forward, does the main character's state change step by step and never
  reset, and can you point at consequences (the object moved in segment 3 is still moved in 7)?
- Are cause-and-effect sequences shown, not summarised (he tries to speak → gets talked over →
  hand drops → eyes leave her → withdraws)?
- **Dedicated aha-and-humour pass**: reread the whole film hunting for places a surprise, a
  reaction, an escalation or a small funny beat could live. Its own pass, not a hope that Step 4
  caught everything.
- Any visibly recycled shot (same place, same size, same angle, same pose)? Change the camera
  distance, the hand action, the expression or the composition.
- Does the ending land as relief or cautious closeness, not a perfect happy ending?
- Is any scene left unfinished — a problem with no reaction or result, an action that never lands,
  a setup never paid off, a cold open never answered?
- Do the motifs appear early, middle and late, each time in a new state, and does the ending call
  back to one?
- Is every explanation line a family moment rather than a diagram, chart or label?
- In every shared frame, does each character react to the other, with the eye line stated?
- See `story-structure.md` §7 for the full list.

### Step 6 — Colour-and-metaphor pass (its own step — never skipped or merged)
Run it after the story pass so everything Step 5 added is audited too. Colour (`colour-direction.md`):
per frame — one hero, the most saturated hue, nothing else sharing it, the room neutral and calm, the
character separated from the background, furniture distinct from wall and floor. Across the film —
full-colour backgrounds on 20–30% of frames and each one purposeful (night, peak, metaphor place), no *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
orange/peach by default, no strong red on a non-danger object, no one-frame colour flicker in a scene.
Metaphor (`metaphor-bank.md`): 45–60% metaphor frames, no family 4+ in a row, every idea line covered, *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
3–5 families returning changed, two or more per segment of 8+, a fresh stimulus every 20–30 seconds,
never chaotic. Energy: any stretch where nothing happens inside the frames gets an edit, a reveal or a pop.

### Step 7 — Validate before delivering
While writing, `node scripts/qa.cjs <build.jsx> --partial --brief` after each segment is optional. When every line
is written, run the full suite: `node scripts/qa.cjs <build.jsx> --runtime <seconds> --brief` (the line count
comes from `SCRIPT`; add `--lines <N>` to cross-check the count Muhammad gave). Run it three times across a session: after the first
build, after any bulk edit, and before handing over — bulk edits break things three checks away.
- Read every flagged frame before editing it: sometimes the regex is wrong, not the frame.
- "Does this frame communicate?" cannot be tested by script. Read the meaning and feel fields of
  every HOOK and EMOTIONAL frame by hand.
- Then ask Thomas's own five review questions of the whole film, honestly: are the first 30 seconds
  strong enough? Do the colours have enough contrast? Do the important objects stand out clearly?
  Is there enough visual variety? Does it feel alive from beginning to end?
- Then the Video 4 questions (`motion-and-energy.md`): would the first 30 seconds feel clearly busier
  than Video 4's? Is every shocked, angry, hurt or thinking peak an extreme close-up? Does each object
  animation land on the word that names it? Is there any stretch in the middle where the location,
  the camera and the characters all stand still?
- A green suite is evidence about the prompts, never about the pictures. Recommend Muhammad renders
  **four test frames before generating the rest**: the opening hook, one HUGE face, one oversized-object
  frame, one hands-only frame (plus the first frame of any character without a reference image).

### Step 8 — Assemble and deliver
Always ship the two pages with the build, generated from it:
`node scripts/copy-page.cjs <build.jsx> <out.html> "<Title>"` (every frame prompt, inserts after their
frame, the edit prompt and the mask cover colour on the frames that have one) and
`node scripts/edit-page.cjs <build.jsx> <out.html> "<Title>"` (the in-scene edit prompts grouped by
segment, each with its line, scene, time, cue word and a one-line "what to do"). Publish both.
The build file is the deliverable: dictionaries, plan and `RAW_BEATS` filled,
compiler and UI untouched. Deliver that single `.jsx` file from the outputs folder and present it. Tabs:
**Plan** (story, segment plan with moods, motifs and where they appear), **Prompts** (segment
filter, copy per frame), **Sections** (copy-all per segment), **Pop-ins & moves** (pop-in cue list, camera-move
cue list, and one overlay prompt per element), **Constants**, **Fixes** (revision batches). The header
shows the colour script bar so monotony is visible at a glance. In the chat reply, keep it short:
count, segments, the four test frames to render first, and anything that needs his or Muhammad's
decision.

## Revisions against Thomas's feedback
He gives numbered points and expects each to become permanent.
1. Map every point to specific frames before changing anything; say plainly where a timestamp
   mapping is uncertain.
2. Separate prompt work from edit work (length, SFX, hold times, audio) and say which is which.
3. If he says "don't rebuild" — don't. Change only what he named; new frames get suffixed refs
   (`S53a`) so existing numbering and rendered images stay valid.
4. Add one batch to `REVISIONS` per feedback round, one entry per point with the refs to
   regenerate. Explain what changed in the chat reply, point by point, quoting his words briefly.
5. Flag fixes that are cheaper in the editor than regenerating (a colour swap, a crop, a hold).
6. If a point reveals a missing rule, add the rule to the skill's references — not only to this
   video's frames.

## What NOT to do
- Don't write a new full prompt for a change inside the same scene (a pose, a reaction, someone moving,
  something appearing) — it redraws the whole scene. It is an image-edit prompt for that frame (CORE RULE).
- Don't write vague edits ("he reacts", "she looks surprised") — the editor ignores them; spell out the
  from-and-to for every body part or object that changes, and what stays exactly the same.
- Don't pull anything from Innes's taste into this channel: no white-first backgrounds, no
  restrained or subtle expressions, no pale pastel scenes, no minimal-staging rule, no MC with five
  hair strands.
- Don't paraphrase the shared constants — use them verbatim from `constants.md`.
- Don't write instruction-shaped text into prompts: "override", "ignore the above", "read these
  first", "check this last", "verify", "step one", "count them before finishing". An image prompt
  describes a picture. Video 2's prompts were refused outright for this.
- Don't write two rules that fight: a wobbly line against one smooth stroke; a thumb notch against
  "never fingers"; "maximum exaggeration" with no ceiling. Each produced a visible defect.
- Don't put the line's noun in the character's hands as the whole idea.
- Don't leave a scene unfinished — in the drawing (half-drawn, implied or outline-only shapes) or in
  the story (a problem with no result, a setup with no payoff).
- Don't pose two characters side by side as separate portraits — one acts, the other reacts.
- Don't clothe the body. No shirts, jackets, dresses or trousers, and no garment words (pocket,
  sleeve, hood) in action text — "hands in pockets" becomes hands tucked behind the back. Minimal
  clothing only: small accessories (tie, scarf, cap, beanie, glasses) locked in a character's ROLE
  and worn in every frame.
- Don't change head sizes. Proportions come from the reference images (MOM's head about one-fifth of
  her height, SON's about one-quarter); a bigger face on screen is always the camera moving closer,
  never a bigger head, and never write a proportion that contradicts the images.
- Don't invent a recurring symbolic system or turn the video into an infographic — no cards, labels
  or floating icons standing in for a character's reaction; isolated number/text slides are rare.
- Don't colour a whole scene in one hue, and don't leave a scene pale and even. One saturated hero,
  a calmer mood background, a white-and-black character.
- Don't use strong red on anything that isn't danger, warning or negative pressure.
- Don't leave a frame static: no two characters standing face to face with empty hands, no idle
  standing, no arms hanging unless the hanging arms are the emotion.
- Don't ask the user to re-supply the rules or constants. Don't start generating prompts just
  because a script is in the conversation — produce the file when asked.
- Don't merge, split, reword or re-time script lines — the segmentation, wording and timing are
  Muhammad's and arrive final. If the count doesn't match, ask.
- Don't try to produce a whole video in one reply, and don't keep the plan only in thinking. Plan,
  the plan and the beats go straight into the saved file (see *One message, one finished video*).


---

# Appendix A — the v18.5 frontmatter description

description: Turns a line-broken script for The Parent Code — Thomas Kolonjak's parenting and teen-psychology stick-figure YouTube channel — into one AI image prompt per line, delivered as a single JSX compiler artifact. Core animation rule built in — every change inside a scene is a detailed image-edit prompt for that frame (never a new prompt), and objects appear with flat-shape mask reveals. Thomas's taste built in — strong expressions, huge faces and eyes-only close-ups, a planned colour script, visual metaphors, a dense first 30 seconds, pop-ins and camera moves tied to voice-over words, and a QA script. Video 4 is the minimum standard. Lines and voice-over timing arrive final from Muhammad and are never changed. Use whenever a Parent Code, Thomas or Kolonjak script is pasted, prompts or edit prompts are requested for it, or a batch is revised against his feedback, even without the word skill. Supersedes kolonjak-parenting-channel; never use for the Innes explainer channel.


# Appendix B — the v18.5 RULES-CARD.md, unchanged

## v18 quick card (overrides older lines below)
- Everything is decided through director-framework.md: the director's read first, then the four questions (purpose, feeling, focus, change) and one line of why per frame. Read what Thomas means; every note is a dial, never a quota.
- Motion only where the story moves; the cut is the motion for statements and lists; stillness on purpose (b.still). Sequences only for cause-and-effect mini-stories at key moments.
- Metaphors pass five tests (mechanism, one second, emotionally true, family's world, pays off); the middle point: never too simple, never random.
- Colour: hero + at most one strong-coloured object when the moment needs it; white or ACCENT for focus, curiosity, loneliness, ideas; contrast always; a build-and-release rhythm per chapter; keywords only at key concepts, turns and the final message.
- Camera: natural angles only; close-ups where emotion is the information; THE PICTURE first and last; sizes stated; room masters.
- Checks: constants hard-fail; everything counted is a flag to judge.

## RULES CARD — everything needed to write a Parent Code video (read this first; it replaces reading all references)

Read this card, `jsx-template.md` (the beat fields) and `view` the images in `assets/characters/`.
Open other reference files only to look something specific up — never read them all (it fills the chat).

### 1. Input and output
- Input: Muhammad's script, already split into lines (and segments), plus the voice-over length if known.
  Lines are final: never merge, split, reword or re-time them. Default runtime 8:30.
- Output, in ONE reply: the build file, the copy page, the edit-prompt page, QA passed three times.
  No plan-approval stop, no batches, no "say proceed". See SKILL.md "One message, one finished video".

### 2. Characters (from the reference images and sheets)
- MOM: black hair centre-parted to the jaw with a round bun on top. SON: messy spiky black hair.
  Round white heads, big white eye circles with black pupils, short thick eyebrows, small mouth line,
  thin black line bodies (no fill), small white mitten hands (no cuffs), small white oval feet.
- Hair always solid pure black. The teen's head is always clearly lower than the adult's.
- Expressions stronger than life; open mouths are plain black shapes, no teeth. Eyes never static;
  hands always doing something; every multi-character frame states the eye line and the distance.
- Close-ups show context (an object, the other character's hand, the place). Never a lone arm reaching
  in from a frame corner — show the other person half in view or leave them out.

### 3. Camera
- Natural lens always: level horizon, straight verticals, everyone upright, no fisheye or tilt.
- Natural angles (eye level, square-on, side-on, over-the-shoulder) on 45%+ of frames; low or high *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
  angles only for power, scale or helplessness. Never the same shot size three frames running.
- 45%+ close-ups (CLOSE, XCLOSE, HANDS); 10%+ huge faces; 5–10% extreme close-ups (eyes-only on shock, *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
  fear and thought); a move cue on every frame, never the same move four frames running. *(v18: only where the story moves — director-framework.md §4)*

### 4. Colour — Thomas's rule, exactly as he said it
- **Neutral first. Colour with purpose. Never colour just to fill empty space.**
- Inside every frame: about **70–80% of the picture neutral and clean**, about **20–30% targeted colour** *(v18: only where the story moves — director-framework.md §4)*
  on what matters. Example: the phone is strong turquoise while the room stays neutral, so the eye goes
  straight to it.
- Across the film: most frames sit on the NEUTRAL (clean light warm grey) or BRIGHT mood. Full-colour
  backgrounds are the purposeful exception, about **20–30% of frames**: night scenes in dark blue-grey *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
  (DARK — Thomas praised these), the strongest emotional peaks, and metaphor places. Orange/peach and other
  full-colour backgrounds are never the default.
- Furniture keeps one colour per set in every mood (house lock). No one-frame colour flicker in a scene.

### 5. Metaphors and objects — Thomas's rule, as the video's main visual engine
- Amplify the voice-over, don't illustrate it. Standard objects (phone, table, sofa, bed, lamp, door,
  clock) are fine as setting, but every idea line gets a bold, physical, surprising picture: scale,
  perspective, transformation, an unexpected object — with a character reacting inside it.
- **How much:** about half the frames are metaphor frames (45–60%; Video 5 settled at 51%). More than *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
  that and the same objects start repeating — never the same family 4+ frames in a row, and never a
  partial object (a strip of cloud edge) above a close-up face. Every idea line
  (a claim, a lesson, a feeling named, a "this is why") gets a metaphor unless a story frame already
  shows it better. At least two per segment of 8+ frames, and **a fresh visual stimulus every 20–30
  seconds**.
- **Never random:** pick 5–8 metaphor *families* for the video in the plan (through-lines that set up,
  escalate and resolve), each tied to the spine object or a motif; one-off surprises around them must
  still touch the story. Tag every metaphor beat with `metaphor: "<family>"`.
- **Finding one:** `grep -i "<idea>" references/metaphor-bank.md` (90+ idea rows with bold pictures and
  the edit that moves them). Nothing fits? Run the metaphor engine in its §1: idea → feeling → physical
  lens → tie to the story → character inside → transformation edit → planned return.
- Never chaotic: one bold idea per frame, neutral room, one strong colour on the metaphor's key object.
- Keep what works: characters, emotions, scene variety and close-ups.
- **Objects are designed:** every recurring object gets one characterful countable detail (ray lines on
  the phone, bells on the clock, straps on the stone, a pompom on the keys); colours and counts locked.
- **Rooms have character:** two or three calm details per setting in the house tones; close-ups add one
  short glimpse of the room behind the head. Characters act on objects — never stand beside them.

### 6. Animation inside a scene (CORE RULE)
- A change inside a scene is an **image-edit prompt** for that frame (`EDIT_CUES`), never a new prompt:
  most frames (Video 5: 87%), 4+ in the first 30 seconds, and no frame without an edit, reveal or pop. *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
  Write who changes, from what to what (limbs, head, eyebrows, pupils, mouth; object position, size,
  colour) and one sentence of what stays exactly the same. One edit per frame.
- An object appearing on one flat colour, touching nothing → a **mask reveal** (cover colour + word):
  15%+ of frames, 2+ per segment of 8+ frames, 2+ in the first 30 seconds. *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
- Speech and thought bubbles and phone-screen pictures are baked into the frame (drawn like the
  characters, no words) and float clear of heads so they can be mask-revealed. *(v18: images stay text-free; occasional keywords are added in Premiere — colour-and-text-v17.md)*
- Floating viewer-only symbols (icons, bursts) are reusable overlays; pop-ins land on meaning words;
  50%+ of pop-ins are story objects; no pop on a quiet or sad close-up. *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
- Insert frames (S3b) on the strongest opening words and as the extra image of a sequence.
- **Sequences (Thomas, Video 5):** important and emotional moments are 3–5 images in one scene — frame,
  its edit, then an insert — each visibly changing the action; list them in `SEQUENCES`. Simple scenes
  stay simple.
- **Camera selective:** `HOLD` (no move) on the later images of a sequence and on gentle filler frames,
  10–30% of frames; peaks and word-timed hits keep their move; never the same move 4 frames running. *(v18: a guide to judge by the moment, never a quota — director-framework.md)*
- **Edit wording:** no quoted words (they get printed), no "finger", no anatomy or clothing words, no
  glow or shadow; never name a character or object that is not in the frame; don't land an edit on the
  same word as a pop or mask if the line has another word.

### 7. Story and structure
- Every scene opens with context; every segment reaches a result; motifs (spine object, clock, a
  place) travel and return changed; a cold open inside the conflict; a big face in the first 3 frames.
- The first 30 seconds: a motion event on every frame, the shot size changing every cut.
- Scenes vary: 30+ locations; no location more than 4 frames in a row; rotate each room's views.

### 8. Delivery
- `scripts/copy-page.cjs` and `scripts/edit-page.cjs` build the two pages from the build; publish both.
- Every skill update: bump the version in SKILL.md, add a CHANGELOG.md entry, name the package
  `parent-code-prompt-writer-vN.skill`, and list the additions in the reply.
