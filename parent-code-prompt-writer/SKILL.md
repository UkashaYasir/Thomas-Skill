---
name: "parent-code-prompt-writer"
description: "Turns a line-broken script for The Parent Code — Thomas Kolonjak's parenting and teen-psychology stick-figure YouTube channel — into a shot plan and one AI image prompt per line, delivered as a Copy page and an Edit page. Core rule: in-scene changes are image-edit prompts, objects appear with mask reveals. Thomas's standard built in: a white stage, black-line places, the fewest pieces; at emotional peaks the stage turns the emotion's colour, then back to white; bright colour by meaning on the key object; objects two or three times larger; characters never too small; sudden close-ups and zooms that reuse stills; strong faces, real interaction, everyday situations, mature props, humour; short playful hand-lettered words, never numbered titles. Lines and timing come final from Muhammad. Use whenever a Parent Code, Thomas or Kolonjak script is pasted, prompts or edit prompts are requested, or a batch is revised against his feedback. Supersedes kolonjak-parenting-channel; not for the Innes channel."
---

# Parent Code — prompt writer

**Version 25.0** (9 Oct 2026). What each version added is in `CHANGELOG.md`. Whenever this skill is updated: bump the
version here, add an entry at the top of `CHANGELOG.md` (what was added, why, what it replaces), name the package
`parent-code-prompt-writer-vN.skill`, and list the additions in the reply.

## Read this first

**`references/v24-standard.md` comes first.** It holds Thomas's final word after Video 08 (approved 9 Oct 2026), quoted
exactly: bright colour on important objects; more zoom-ins and close-ups; characters never too small; only short, playful
words — no numbered titles; dynamic visuals that reuse stills through zooms and framing; white ground, black-line places,
every object necessary; colour by meaning; drawn glow; objects two or three times larger and exaggerated cutaways — and,
from v25, Muhammad's direction on top of it (§2a, §2): **white by default; when a line carries the emotional intensity the
stage converts to the emotion's colour, then back to white — minimal, never monotonous; places told by their fewest
pieces.** It wins over every other file. Start the first reply by naming the skill version in use; an attached `.skill` file wins over the
installed copy.

**`references/v19-principles.md` is the law for everything v24 does not change.** It holds Thomas's direction of 5 Oct 2026, quoted exactly, and Muhammad's
rules for applying it. Where any other file in this skill says something different, v19-principles.md wins. In short:

- **Thomas's words are the principles.** Each one is applied across the whole script, exactly as he said it — no
  overdoing, no undoing.
- **No numbers for creative choices.** No counts, quotas, percentages, caps or minimums for ideas, close-ups, shot types,
  places, characters, props, edits, humour, words, interrupts or colours. Every choice is judged by the moment. Thomas's
  own numbers stay as he gave them — objects "two or three times larger", a change "approximately every 3–5 seconds" —
  as guidelines, never quotas.
- **The system is open.** Every library is seed examples plus a method for making new ones. When a line needs something
  that is not listed, invent it with the method. After every video, add what worked back into the library.
- **Emotion before decoration.** For every line: what should the viewer feel? Only then background, prop, colour, camera
  and movement.
- **Plan before production.** Every video gets a shot plan before any prompt is written.
- **Better, not more. Less, but stronger.** One strong object, one strong face, one strong gesture.

Then read `references/RULES-CARD.md` (the whole system on one card, v25) and `view` the reference images in
`assets/characters/`. Open the other files when the step you are on needs them:

| File | Open it for |
|---|---|
| `references/client-feedback-ledger.md` | every point Thomas made (and Muhammad's decisions), each traced to its rule and its check — read before a video, extend after every feedback round |
| `references/v24-standard.md` | Thomas's final standard: white stage and black-line places, bright colour by meaning, glow, scale and exaggerated cutaways, characters never small, zoom plans, hand-lettered words, the Video 08 test cases |
| `references/shot-plan-v19.md` | the plan: the order of decisions, the plan fields, ideation, the whole-film passes, a worked example |
| `references/style-and-colour-v19.md` | the five moods, NIGHT, MEMORY, PEAK (the colour stage, `pc`), how prompts phrase colour |
| `references/camera-and-closeups-v19.md` | shot types, natural angles, close-up logic, back-to-back changes, screen sides, composition variety, line types |
| `references/acting-and-interaction-v19.md` | the seven face-and-body features, verbs not states, interaction, distance, love and trust through behaviour |
| `references/everyday-situations-v19.md` | real moments parents and teens recognise, and the method to turn any line into one |
| `references/cast-design-v19.md` | designing any new character from the MOM or SON reference, the ROLE template, the lineup render |
| `references/props-symbols-metaphors-v19.md` | the maturity test, the symbols that are out, mature props, metaphors, recurring objects |
| `references/humour-text-contrast-v19.md` | humour, on-screen idea words, contrast, pattern interrupts, pacing by emotion |
| `references/director-read-template.md` | the form for the director's read of the whole script |
| `assets/compiler-v24/README.md` | the data files, every key (v24 adds `cm gl mk li mu tx ol zm fg sx ce2`; v25 adds `pc` and inserts `I()`), the moods and shot types, the checks and how to run them |

The older references (`director-framework.md`, `director-rules.md`, `emotion-and-performance.md`, `metaphor-bank.md`,
`visual-library.md`, `staging-and-props.md`, `motion-and-energy.md`, `aha-humour-popins.md`, `story-structure.md`,
`idea-not-object.md`, `characters.md`, `constants.md`, `data-fields-and-build.md`, `jsx-template.md`,
`render-lessons.md`, `qa-lessons-v18_3.md`, `client-standards.md`) carry a v19 banner and were cleaned to agree with v19.
Use them to look a detail up with `grep`, never to overrule a v19 or v24 file. `references/archive/` (the superseded
colour systems, the v17 system, the Video 05 walk-through and the old SKILL.md) and `assets/legacy/` are history only —
never copy from them.

## QUICK START — what happens when Muhammad pastes a script

1. **Read.** v24-standard.md, v19-principles.md, RULES-CARD.md, the character images. Any newer character images Muhammad shares are
   viewed too.
2. **Director's read** (`director-read-template.md`). Read the whole script once as a viewer. Write down the story world
   (one family, one stretch of time, the spine object — `v24-standard.md` §15), the film in one
   sentence, the feeling of each chapter, the emotional peaks, the everyday situations the script touches, the people the
   story needs, and the recurring objects with what each comes to mean.
3. **Shot plan for every line** (`shot-plan-v19.md`, with the scene-by-scene starting choices in `v24-standard.md` §14),
   in this order: the line type (`ln`); what the viewer should feel (`ft`); the idea — explore every direction (real moment, behaviour, reaction, object, contrast, humour, metaphor,
   unexpected angle), keep going until one is clearly the strongest, keep it in `idea` and the runner-ups in `alt`; the
   camera, with `look` and `ctx` on every close shot; the interaction (`ia`) and distance (`dist`) whenever two or more
   people are in the frame; the contrast (`cx`); the interrupt (`ip`); an idea word (`kw`) only at a strong moment; the
   colour focus (`ce`, bright by default; `ce2` only when two objects must both carry colour); the rung of the colour
   ladder (`v24-standard.md` §2a): the white stage by default, colour on the feeling (`mk`, `gl`, `li`) where it rises, and
   on a line that carries the intensity `pk` + `pc` — the stage in the emotion's colour on the wider frame, the close-up on
   white, then back to white; the object-necessity pass with the fewest pieces of furniture (every set piece and prop tells the story, carries the emotion or makes the
   moment understandable — or it goes); then edits, reveals, reframes (`zm`) and moves. Then run the
   whole-film passes (emotional curve, distance script, contrast map, interrupt flow, word moments, motif evolution,
   composition variety, colour script along the ladder, life, humour and cast) and revise what they flag.
4. **Cast, places and props.** Places are black-line pieces on white, only the ones the frame needs. Design every character the story needs with `cast-design-v19.md` (the cast grows with the
   story; never bald, never a featureless round head; each with its own hair outline). Places are outline cues — only the
   pieces a frame names. Every prop passes the maturity test.
5. **Write the video folder.** Copy `assets/compiler-v24/` to a working folder for the video and replace its example data:
   `script.txt` (the exact lines), `dicts.cjs` (PROJECT, ROLE, EDIT_WHO, WORLD, PROP, STORY, PLAN, MOTIFS, REVISIONS…)
   and `segs/segNN.cjs` (one file per chapter: frames `F()`, inserts `I()`, edits `E()`, sequences `Q()`), with every plan
   field filled. `assets/v24-samples/video08-regression/` shows every v24 and v25 key (its second chapter is the colour
   ladder); `assets/build-template.jsx` and `assets/v19-samples/` are older worked examples, compiled with the current
   compiler (their plans predate v24).
6. **Build:** `node assemble.cjs` inside the folder (or `node assemble.cjs --data <folder>`) → `out/build.jsx`.
7. **Check:** `node <skill>/scripts/qa-all.cjs out/build.jsx` until every check passes (eight scripts, the contradiction
   scan among them; read every warning — each is a question, never a quota). Then read every compiled prompt
   against v24-standard.md, v19-principles.md and the RULES-CARD — at least three full QA rounds before anything is shared (Muhammad's
   standing rule). A green suite is evidence about the prompts, never about the pictures.
8. **Pages:** `copy-page.cjs` and `edit-page.cjs` (in `<skill>/scripts/`) make the Copy page — the one page Muhammad
   generates from — and the Edit page. Publish both and deliver the build file.
9. **Grow the system.** Add the new situations, behaviours, interactions, places, props, metaphors, humour beats and
   characters that worked to the v19 files they belong in, marked with the video they came from.

While planning, point out weak ideas — in the script's visual brief, in Thomas's editor notes or in your own first
draft — and pitch a stronger version. The script's words are never changed; the pictures are open.

## CORE ANIMATION RULE

Flow cannot hold a scene steady across two prompts: a new prompt redraws the room, the characters and the camera. So
movement inside a scene is built from one generated image per frame:

1. **A change inside a scene is an image-edit prompt on that frame's generated image, never a new prompt.** A character
   turns, sits down beside someone, reaches out, looks away, picks something up — each is an edit. Write it in detail:
   who changes, from what to what (which arm, where the hand goes, where the head turns, the eyebrows, the pupils, the
   mouth shape; or where an object appears, its size and colour), one change at a time, and one sentence of what stays
   exactly the same. The compiler adds who-is-who, keep-exactly and the avoid list. An edit never names someone or
   something that is not in the frame. An edited image is never more than two edits away from a generated base (each edit degrades the image — a
   technical limit, not a creative one).
2. **An object appearing is a mask reveal** where it can be: it sits alone on the ground, a table top, a shelf or a
   screen, apart from hands and bodies; Muhammad hides it with a flat shape in the cover colour and uncovers it on its
   word.
3. **Important moments can be a short sequence of stills in one scene** (`Q()`), each still visibly changing what the
   people do. Not every scene; simple moments stay simple.
4. **Camera moves, holds and reframes are Premiere moves**, chosen from the feeling. Thomas: "Reuse existing visuals
   creatively through zooms and different framing." A frame's zoom plan (`zm`) lists the reframes of the same still on
   cue words — to a face, the eyes, the hands or the object — and the frame is composed so its target survives the crop.
   Reframe before regenerating. A held still is a real choice.

Detail: `motion-and-energy.md` §9–§10, `v24-standard.md` §6 and `assets/compiler-v24/README.md`.

## What Muhammad provides

1. **The script, split into lines** — final. One prompt per line, in order, words untouched. If a stated line count and
   the pasted lines disagree, follow the pasted lines and say so in the reply.
2. Optionally the **voice-over timing** (set `PROJECT.runtimeSec` from it) and **Thomas's editor briefing**. Treat the
   briefing as strong input: follow it where it serves the feeling; where a direction is weak, keep its intent and stage a
   stronger version (Thomas wants independent ideas, not copying).
3. Newer character images, when there are any — they are viewed before any character frame is written.

Everything else is bundled. A newer rule Muhammad gives in the chat overrides the bundled copy for that conversation.

## One message, one finished video

Muhammad produces the whole video in one pass from the Copy page. Deliver the plan, every frame, the edits, reveals and
sequences, the checks and both pages in the same reply. Never stop for plan approval, never end with "say proceed".

Staying under the chat length limit:
- **Read little.** v19-principles.md, RULES-CARD.md and the images in full; everything else by `grep` or a line range.
- **Write straight into files, never into the chat.** One chapter's segment file per call; never paste frames, prompts or
  plans into the reply, and never read the build back whole — query it (`q.cjs`, `fk.cjs`) and check it with the scripts.
- **Keep frame text lean.** Short, clear sentences in every field; the compiler adds every lock and constant.
- **Keep tool output short.** `qa-all.cjs` prints only warnings and failures; pipe long commands through `tail`.
- **Resume, never restart.** Everything is saved as it is written. If a reply is cut off, the next message of any kind
  continues from `node <skill>/scripts/progress.cjs out/build.jsx`.
- **One video per chat.**

## Checks and the read-through

`qa-all.cjs` runs every check script. Each check passes or fails by a rule (plan fields present, close-up logic fields,
interaction fields, the seven features in every performance, CLEAN frames free of tinted walls and furniture, full colour
only with `pk` or at night, no symbol props, cast hair rules, no repeated composition, back-to-back changes, screen sides
inside a scene, edits, reveals, sequences, prompt order, teeth, hands from the bottom edge, the colour ladder, the fewest
pieces, inserts…), and `qa-contradictions.cjs` fails any prompt whose own sentences disagree. Distributions are printed as
information only — never a target.

The read-through asks what a script cannot:
- Does every frame make the viewer feel its `ft`? Is the idea the strongest of the directions explored?
- Is every object and set piece necessary — the fewest pieces that show the scenario? Is the ground white and every set
  piece black line? Is the important object bright, and is nothing else competing with it?
- Does every line that carries the intensity reach its colour — the stage in the emotion's colour on the wider frame, the
  close-up on white — and does the film come back to white after it? Is any colour stage there only for decoration? Is any
  long stretch flat without reason?
- Is any character too small to read? Does every chapter have its sudden close-up? Would a reframe of an earlier still
  do the job of a new frame?
- Does every place change have a story reason, and does every aside keep its one look?
- Is every word short, playful and needed — no numbers, titles or labels?
- Does any frame repeat a weakness already listed in `client-feedback-ledger.md` (§F, §P)?
- Could a reframe, a crop or an edit do what a new frame would?
- Does every emotional peak have its short dramatic close-up? Does every metaphor enter with a surprise and stay visible
  in the real scene? Do action sequences move big and read easily? Does a conflict turn into repair with a held beat?
- Is every phone purple, and does every chapter balance white moments with place moments?
- Does every close-up make sense — the place shown before, the gaze matching, open space on the side the eyes look, the
  head shape whole, the cause visible or clearly placed?
- Does every face clearly react, and does every shared frame show an action and a visible reaction?
- Is anything a generic or childish symbol, a coloured room, or a prop that is there only because it looks good?
- Does any composition, idea or motif picture come back unchanged?
- Thomas's questions of the whole film: does it feel like a mature, emotional, high-quality story? Is it always clear
  where to look? Does it ever feel like the visuals repeat?

Before Muhammad generates the rest, recommend test renders: the lineup of any new characters, the opening frame, a face
close-up on white, a frame where the bright colour focus carries the moment, a place frame (black line on white, nothing
extra), a colour-stage frame (the field flat, the characters white, nothing vanishing into it), a frame with a
hand-lettered word, and one planned reframe cropped in Premiere. (Thomas approved the clean warm-white
ground of Video 08, so the v19 ground strip is history.)

## When renders come back

When Muhammad shares rendered frames, look at the images — never assume a prompt worked. For each frame compare the
picture with its plan: the feeling (`ft`), the focus and its colour, nothing extra in the place, faces readable, the word
spelled right, the characters on model. Then choose the smallest fix that solves it, in this order: a Photoshop clean-up
(remove an extra piece, recolour a floor), the word-fix edit, an image-edit prompt on that frame, a crop or reframe, and
only then a new prompt. If a failure could happen again, add it to `client-feedback-ledger.md` §P and, where a script can
catch it, to the checks.

## Delivery

- `node <skill>/scripts/copy-page.cjs out/build.jsx out/copy.html "<Title>"` — every frame prompt with its plan, the edit
  prompts, inserts and mask cover colours in order. This is the page Muhammad generates from.
- `node <skill>/scripts/edit-page.cjs out/build.jsx out/edits.html "<Title>"` — the in-scene edit prompts by chapter, each
  with its line, cue word and a one-line "what to do".
- Publish both pages and deliver `out/build.jsx`. The chat reply stays short: what was made, the test renders to do
  first, and anything that needs Muhammad's or Thomas's decision.

## Revisions against Thomas's feedback

Timestamp notes (Frame.io): map each note to its frames with `node <skill>/scripts/timestamp-map.cjs out/build.jsx
"02:30-02:40"` — the times come from the word count, so add `--anchor S140=04:42` with a real time from the Premiere
timeline whenever an exact frame matters. Fix the frames the note names, then apply the rule the note shows across the whole script (`v24-standard.md` §16
is the model). Add every new point to `client-feedback-ledger.md`. Removing extras from an already-rendered frame in
Photoshop is an accepted, cheaper fix (Thomas, 9 Oct) — say which fixes are Photoshop or Premiere work and which need new
prompts.

Before saying a round is finished, report every point as **done / partly / not**, checked against the build with frame
refs — never from intent. When Thomas's example refers to a scene from another video, say so and apply the principle.

1. His words are the principle. Apply each point across the whole script, exactly as he said it — not only where he gave
   an example — with no overdoing and no undoing.
2. Map every point to specific frames before changing anything; say plainly where a timestamp mapping is uncertain.
3. Separate prompt work from editing work (length, sound, hold times) and say which is which. Flag fixes that are cheaper
   in Premiere than regenerating.
4. If he says "don't rebuild", change only what he named; new frames get suffixed refs (`S53a`) so existing numbering and
   rendered images stay valid.
5. Add one batch to `REVISIONS` per feedback round, one entry per point with the refs to regenerate.
6. If a point reveals a missing rule, add the rule to the skill — a new version with a CHANGELOG entry — not only to this
   video's frames.

## What NOT to do

- Don't write a new full prompt for a change inside the same scene — it is an image-edit prompt on that frame.
- Don't write vague edits ("he reacts") — spell out the from-and-to and what stays exactly the same.
- Don't decide anything creative by a number, and don't turn a seed list into a menu.
- Don't colour rooms, walls, floors, grass or furniture; places are thin black line pieces with white fill on the white
  ground, and only the fewest pieces the frame needs. Don't put a full-colour field behind a face close-up.
- Don't use a colour stage for decoration or variety, don't change its colour inside one moment, don't use an orange,
  amber or peach field, and don't stay on a colour field for long — it is earned by the line and returns to white.
- Don't leave the important object in a dull, calm tone — it is bright and vivid unless the beat is deliberately quiet —
  and don't colour everything else to match it.
- Don't show characters so small that their faces can't be read.
- Don't crop a face at random or put a close-up where the viewer can't tell where we are or who is looked at.
- Don't leave a character standing in the scene: every face reacts with the seven features the shot can show, as one clear
  emotion with a verb; every shared frame has an action and a visible reaction.
- Don't use hearts, stars, trophies, emoji, question marks, thought or picture bubbles, or any generic symbol for a
  feeling. Show love, trust and attention through behaviour.
- Don't let an object return unchanged or only because it looks good.
- Don't draw a new character bald or with a featureless round head, or give two characters the same hair outline.
- Don't clothe the body: no garments and no garment words. Small accessories only, locked in the ROLE.
- Don't change head sizes: proportions come from the reference images (MOM's head about one-fifth of her height, SON's
  about one-quarter); a bigger face on screen is always the camera moving closer.
- Don't put numbers, section titles, underlines, presentation fonts or textbook terms on screen. Words are short,
  playful, hand-lettered, always inside the frame's own image prompt (`tx` or `kw`) — never a separate image — and only
  where they genuinely support the moment; no signs to read;
  a letter on an object only when the letter is the story (the F).
- Don't write "finger", anatomy or clothing words, or soft-lighting words (shadow, gradient, bloom) that fight the flat
  style — a glow is a drawn halo or radiating strokes (`gl`); mouths are shapes, never letters; no teeth.
- Don't paraphrase the shared constants — the compiler writes them.
- Don't write instruction-shaped text into prompts ("override", "ignore the above", "step one", "verify") — an image
  prompt describes a picture.
- Don't write two rules that fight in one prompt.
- Don't merge, split, reword or re-time script lines.
- Don't mix in the Innes explainer channel's characters or constants.
- Don't use real-photo objects; the style stays fully illustrated (Thomas: "let's leave real objects out").
