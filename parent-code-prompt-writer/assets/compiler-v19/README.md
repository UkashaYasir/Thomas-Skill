# Compiler v19 — the parts that build a Parent Code video

Compiler v19 turns a shot plan and frame data into one image prompt per script line, plus the edit prompts, sequences,
mask reveals and the Copy and Edit pages. It puts Thomas's direction of 5 Oct 2026 into the prompts
(`references/v19-principles.md`):
- **CLEAN is the default background.** It is a white or very light neutral ground, and places are drawn as thin outlines.
- **Each frame has one colour element**, or none.
- **Full colour is only for emotional peaks and night.**
- **Every face shows seven features**, and every interaction has an action and a reaction.
- **Close-ups make sense.** Each one has a gaze and a reason.
- **The checks pass or fail by a rule, never by a number.**

This folder holds a small worked example: the 16-line smoke test "I'm fine". It uses every mood, every shot type and
every plan field. `node assemble.cjs` builds it, and every check passes.

## Changes in compiler v19 (changelog)

**Version 19.0 (5 Oct 2026).** These notes list what changed from compiler-v18_3.

**Moods**
- There are five moods: CLEAN, WHITE, PEAK, NIGHT and MEMORY.
- The CLEAN ground comes from one constant, `CLEAN_GROUND`. Its default is #F7F6F3, a very light warm neutral. Three other
  grounds are ready for a test strip: #FFFFFF, #F4F2EE and #F2F4F5.
- Older mood names still compile:
  - BRIGHT, WARM, EVENING, COOL, DUSK, NEUTRAL and ACCENT become CLEAN.
  - DARK becomes NIGHT, and ICY becomes MEMORY.
  - TENSE and SUNNY become versions of PEAK.
- Room tints, accent walls and chapter calm palettes no longer colour any frame. `GRADE`, `accentWall` and `softHex` are gone.

**Places (`worldBlock`)**
- Set pieces are outline cues: "drawn only as a thin soft-grey outline with white fill — a complete, closed line drawing,
  not a coloured object".
- A piece appears only in the frames that name it. No anchor furniture is added on its own.
- Wider shots get one thin soft-grey ground line instead of a filled floor.
- On PEAK, NIGHT and MEMORY, the field is the colour, and the pieces are tonal outlines on it.
- WHITE has nothing behind the subject.
- WORD frames are pure white.

**Colour (`colourBlock`)**
- The colour block uses positive phrasing:
  - "The background is …"
  - "The only coloured element in the whole image is … (hex); everything else is black or soft-grey line on white"
- When no object carries colour, the block says: "Nothing carries colour; the white face of … with its bold black outline
  carries the frame".
- Every object except the colour element is drawn in black line on white. Its colour words are removed. A PROP can give its
  own `lineText` for this.

**Constants**
- PERFORMANCE_AND_EXPRESSION names the seven features.
- INTERACTION means an action and a visible reaction, with the eye line clear. A per-frame DISTANCE line follows it.
- VISUAL ORDER uses the white default.
- DETAIL_CAP is now "less, but stronger": one strong object, one strong face, one strong gesture.
- GLOBAL_AVOID is shorter. It adds coloured walls and furniture, generic symbols, and a bald or featureless head.
- EXPRESSION_STRENGTH FULL is now neutral about which emotion it is. A tender beat is no longer pushed into steep brows.
- The new CLOSE-UP LOGIC block is built from `look` and `ctx`.
- REACTION, FACE_HANDS and WORD each have their own framing text.

**Removed from the compiler**
- The HUGE face size no longer uses a percentage.
- The "five key lines" and the "3–5 image" sequence numbers are gone.

**`assemble.cjs`**
- It reads the plan fields from each frame.
- Without an `--data` folder it falls back to this folder's own data. With `--data` it uses that folder's data (`--segs`,
  `--dicts` and `--script` work too).
- `CLEAN_GROUND=#hex` sets the ground for a test strip.
- Room masters are made only where you ask for one with `ms`.
- The revision log is read from `dicts.cjs` (`REVISIONS`).

**Checks**
- Every check now passes or fails by a rule.
- Distributions are printed as information only.
- `scripts/qa-v19.cjs` is new.
- `scripts/qa-all.cjs` runs everything.

**Pages**
- The Copy page shows each frame's plan.
- WORD frames are marked "no image needed".

## Folder

| File | What it is |
|---|---|
| `template.jsx` | The compiler and the review page (a React artifact). It holds the constants, moods, `framePalette`, `worldBlock`, `colourBlock`, `closeLogic`, `buildPrompt` and the UI. Its data blocks are placeholders, and `assemble.cjs` fills them. |
| `assemble.cjs` | Reads `dicts.cjs`, `segs/segNN.cjs` and `script.txt`, and writes `out/build.jsx`. |
| `dicts.cjs` | The video's dictionaries: PROJECT, ROLE, EDIT_WHO, SET, CHAPTER, WORLD, PROP, OVERLAY, STORY, PLAN, MOTIFS, KEY_LINES, REVISIONS. |
| `script.txt` | The exact voice-over lines, one per line. |
| `segs/segNN.cjs` | One file per chapter. It holds `F(n, {…})` frames, `E(ref, on, change)` edits and `Q(id, title, base, images)` sequences. |
| `fk.cjs` | Prints the source fields of chosen frames: `node fk.cjs 3,4 ft,look,ctx,ce`. Set `SEGS=path/segs` for another folder. |
| `q.cjs` | Queries compiled frames: `node q.cjs "b.mood==='PEAK'" ref,peak,plan.ft`. Set `BUILD=path/build.jsx` for another build. |
| `passlib.py` | Helpers for scripted fix passes (`sub`, `suball`, `setf`, `delf`, `esub`, `eset`, `edel`, `add_edit`, `qsub`, `save`). Set `ROOT` to the video folder; the default is the current folder. |

The check scripts and the page scripts are in the skill's `scripts/` folder.

## How to run

```bash
# build (this folder's example, or any video folder that has segs/, dicts.cjs and script.txt)
node assemble.cjs                              # → out/build.jsx
node assemble.cjs --data path/to/video         # → path/to/video/out/build.jsx
node assemble.cjs out/strip-white.jsx --data path/to/video   # choose the output file

# every check, with one summary line per script (WARN and FAIL lines only; --full prints everything)
node ../../scripts/qa-all.cjs out/build.jsx
node ../../scripts/qa.cjs out/build.jsx --partial   # batch turns while the video is still being written

# the pages Muhammad works from
node ../../scripts/copy-page.cjs out/build.jsx out/copy.html "Video title"
node ../../scripts/edit-page.cjs out/build.jsx out/edits.html "Video title"
ONLY=S1-S16 node ../../scripts/copy-page.cjs …     # print a range only

# where the build is, and what comes next
node ../../scripts/progress.cjs out/build.jsx

# CLEAN-ground test strip: build the same frames on each prepared ground and render a few of each
for g in F7F6F3 FFFFFF F4F2EE F2F4F5; do CLEAN_GROUND=#$g node assemble.cjs out/strip-$g.jsx; done
```

Older frame data still compiles. For example, `node assemble.cjs out/legacy.jsx --data ../legacy/compiler-v18_3` builds Seven
Things with the v19 compiler. It fails the new plan-field checks, as expected, because it has no ft, ia, look and so on.

## Moods (the `m` key)

| Mood | Background | Use |
|---|---|---|
| `CLEAN` (the default) | `CLEAN_GROUND`: a very light warm neutral, #F7F6F3. Set pieces are thin soft-grey (#B4B8BD) outlines with white fill. Wider shots get one ground line. | Most frames: real places shown by a few outline cues. |
| `WHITE` | Pure white #FFFFFF, with nothing behind the subject. | Face-only, object-only and word frames, and deliberate white breaks. |
| `PEAK` | One full-colour field: the chapter's `CHAPTER[xx].emo` colour (its `field` or `wall`, with `floor` as the darker outline tone), or the TENSE/SUNNY variant, or a storm-violet default. | An emotional peak scene only. The frame must carry `pk: true`. Never behind a face close-up. |
| `NIGHT` | One flat night-navy field (#2C384E) with dim slate outlines. The navy-not-grey and black-hair lock is included. | Night scenes. A face close-up inside a night scene goes WHITE, and the next wider frame brings the night back. |
| `MEMORY` | A faded light grey (#DDE1E7), as if the colour has drained out. | The past. |

The older names are aliases: BRIGHT, WARM, EVENING, COOL, DUSK, NEUTRAL and ACCENT are CLEAN; DARK is NIGHT; ICY is MEMORY;
TENSE and SUNNY are PEAK. The compiled beat keeps the old name in `moodWas`. If no mood is given, the frame is CLEAN. WORD
frames are always WHITE.

## Shot types (the `sz` key)

| Shot | Meaning |
|---|---|
| `WIDE`, `MEDWIDE`, `MEDIUM` | Wider shots. On CLEAN they get one thin ground line. |
| `CLOSE` | A close-up: head and shoulders. |
| `XCLOSE` | An extreme close-up. Add `eyes: true` for an eyes-only crop. |
| `FACE_HANDS` | **new.** The face and both mitten hands fill the frame together. |
| `REACTION` | **new.** One face, with the top of the shoulders, in the instant it reacts. |
| `HANDS` | Hands only. Forearms rise from the bottom edge or the bottom corners. |
| `OBJECT` | An object with no character in the frame. |
| `WORD` | **new.** A pure white frame for one on-screen word, which Muhammad adds in Premiere. Nothing is drawn, or only one small object if `p` names it. It needs `kw` and no characters. `w` and `m` are not needed. |

Angles (the `an` key): `EYE` (the default), `SQUARE`, `PROFILE`, `OTS`, `LOW` (child height), `HIGH` (a little above head
height), `OVERHEAD` and `POV`. Natural camera positions read best.

## Frame keys: `F(n, { … })`

### Plan fields (new in v19; see `references/shot-plan-v19.md`)

| Key | Meaning | Required? |
|---|---|---|
| `ft` | What the viewer should feel. | Every frame. |
| `ln` | The line type: hook, chapter-turn, child-voice, scene-setting, dialogue, rapid-list, statement, adult-mirror, humour-aside, advice, model-sentence, peak, time-jump, ending… The list is open: write one lower-case word, or hyphenated words. | Every frame (shot-plan-v19.md). |
| `idea` | The chosen idea, in one line. It also fills `meaning` when `me` is missing. | Every frame. |
| `alt` | The other ideas you considered, as an array of short strings. | Every frame (at least one other idea). |
| `ia` | The interaction beat: "who does what → who reacts how". It is added to the ACTION as "INTERACTION BEAT: …; in response, …". | When two or more characters are in the frame. |
| `dist` | The distance between the characters: `touching`, `close`, `apart` or `far`. It becomes a DISTANCE line. | When two or more characters are in the frame. |
| `look` | The gaze target and its side, e.g. "toward MOM, out of frame left". It builds CLOSE-UP LOGIC: the eye direction, the open space on that side, and the whole head shape. | CLOSE, XCLOSE, FACE_HANDS and REACTION frames with a face. |
| `ctx` | What makes the close-up make sense: "follows wide S12", "hands + object", "over the shoulder"… An S-ref must point at an earlier frame, and at a wider one when ctx says "wide". | Same frames as `look`. |
| `ce` | The one colour element: a PROP key (`"PHONE"`), a key plus a part (`"PHONE case"`), or `"none"`. The default is the hero object, then the first object not marked plain. | Every frame (write `"none"` when nothing carries colour). If it is missing, the prompt still defaults to the hero object, but the check fails. |
| `cx` | The contrast this frame makes, with the frame before or inside the frame. | Whenever the frame makes a contrast; when sameness is chosen, write `"affinity — …"` and why. Missing gives a WARN. |
| `ip` | The interrupt type: white-break, extreme-close-up, word, unexpected-object, funny-reaction, strong-pose, short-metaphor, visual-silence, large-face… The list is open. | When the frame is an interrupt. Not checked; printed as information. |
| `pk` | `true` on an emotional-peak frame. | Every PEAK frame. |

All the plan fields are stored together in `beat.plan`. The Copy page, the Edit page and the review page show them.

**`ln` with older data.** In older segments, `ln` was the link text. If an `ln` value is a sentence rather than a single
line-type word, it is still read as the link. Use `lk` for the link from now on.

### Picture keys (as before)

| Key | Meaning |
|---|---|
| `sc` | The scene label. Characters keep their screen sides inside one `sc`. |
| `t` | The tier: S (simple), Q (quiet — a held, still moment: the expression is held soft but clear), E (emotional) or H (hook). |
| `r` | The roles, e.g. `"Mom, Son"`. Leave it empty or out for no characters. |
| `p` | The props; `"2x KEY"` means two of one object. |
| `h` | The hero: FACE, FIGURE or a PROP key. |
| `hr` | The hero face or figure, when it is not the first role. |
| `fe` / `me` | The older feel and meaning. Either may be used instead of `ft` / `idea` for display. |
| `sz`, `an`, `fa`, `sl` | The shot type; the angle; the face size (NORMAL, LARGE or HUGE); the scale (ORDINARY, DOMINANT or OVERWHELMING). |
| `eyes` | `true` gives an eyes-only crop (with XCLOSE). |
| `w` | The WORLD key. |
| `m` | The mood. |
| `wh` | Where we are, e.g. "at the kitchen table". It is replaced by "in open space" when the frame names no outline piece. |
| `L`, `C`, `R` | The placement: left, centre and right. The composition and screen-side checks read who stands where from these. |
| `a`, `pf` | The action and the performance. Write `pf` as "MOM: eyes …, eyebrows …, mouth …, head …, one mitten hand …, posture …, pupils on SON. SON: …". |
| `mv` | The camera move for the edit: `[TYPE, cue word, note]`. |
| `dv` | The storytelling device. It is an open library, so new keys are only listed. |
| `pop` | A pop-in: `[KEY, cue word, ADD or PUNCH, motion]`. Use story objects only; emoji-style icons fail the checks. |
| `rv` | A mask reveal: `[KEY, cue word, surface, where]`. The surface `"FURN"` means it sits on an outline piece's white fill. Otherwise the cover is the ground or field colour. |
| `kw` | The on-screen keyword: `[WORD, cue word]`. It must be an idea word: never "NUMBER …", digits or a sentence. |
| `mf` | The metaphor family. It also sets `fn: CONCEPT`. |
| `mo` | The moment, e.g. "humour: …". |
| `st` | The scene stage: START, PROBLEM, REACTION or RESULT. |
| `sti` | Why the frame stays still, when it has no edit, pop or reveal. |
| `y` | Why: the reason for the frame, in one line. |
| `lk` | The link: a setup, callback or consequence that names its S-refs. |
| `ms` | `true` makes this frame the place master; `"S12"` attaches S12's image. Masters are now made only where you ask. |
| `pl` | Older data: objects marked plain. In v19, every object except `ce` is already drawn in line. |
| `cr` | Older data: a colour reason. |
| `fo` | Focus: `"light"` (small on purpose) or `"door"`. |
| `os` | A one-sided moment. Its text replaces the interaction rule, and DISTANCE still follows. |
| `px` | `["KEY", "full object text for this frame"]`. |
| `to` | A touch line. |
| `cam` | A camera preset. |
| `eo` | Edit-only: `[sequence id, from]`. The frame's picture is an edit, not a new generation. |
| `na` | Older data: no anchor piece. It is ignored, because v19 never adds one. |

**Edits and sequences**
- `E("S14", "next", "who changes, from what to what … The table, the colours and the camera stay exactly as they are.")`
- `Q("Q01", "title", "base note", [{ ref: "S7", type: "base" }, { ref: "S7", type: "step", from: "image 1", on: "beside", change: "… stay exactly as they are." }, { ref: "S8", type: "base" }])`

## Dictionary fields that matter in v19

- **WORLD**
  - Format: `{ kind: "INDOOR" | "OUTDOOR" | "FIELD", label: "kitchen", parts: [[name, regex, "outline piece text"]] }`.
  - The piece text has no colour, e.g. "in the CENTRE one small round table on a single leg".
  - A piece is drawn when the frame's action, placement, edit or sequence step matches its regex. For close shots, only the
    action and placement count.
  - A world with no parts is an idea place, and its `text` is its picture.
  - Older worlds still compile. Their `{WALL}`, `{FLOOR}` and `{FURN}` colour words are removed, and the anchor flag is ignored.
- **PROP**
  - `name`, `hex`, `colour` and `text` (a build spec you can count).
  - `part`: the coloured part, e.g. "THE PHONE's turquoise (#00B3B8) case".
  - `lineText`: optional. This is how the object looks when it is not the colour element.
  - `small` and `onWall`, as before.
  - `nouns`: the words that count as using the object.
  - `danger: true` is needed for strong red.
  - **`mature: false`** marks a symbol prop. **`mature: true`** clears an object whose words look like a symbol (heart,
    star, arrow…) but which is a real, mature object.
- **OVERLAY:** `mature: false` marks an emoji-style icon. Any pop that uses one fails the checks.
- **ROLE**
  - **`hair`** is the hair outline word: bun, spiky, ponytail, bob, curls, side parting, wave… Every character has hair.
  - **`sameAs`** links the same person at another age, who may share the hair outline.
  - `from`, `short`, `change` and `text` copy the MOM or SON reference.
  - `wear` lists accessories with their hex.
- **CHAPTER:** `emo: { field: [name, hex], floor: [name, hex] }` is the chapter's peak colour, keyed by the first two
  characters of the segment name.
- **PROJECT:** `cleanGround: "#FFFFFF"` is optional. It sets this video's CLEAN ground.

## The checks (skill `scripts/`)

`qa-all.cjs` runs all six scripts below and prints one summary line for each. Every check passes or fails by a rule. Shares,
counts and runs are printed as `info` only.

| Script | What it checks |
|---|---|
| `qa-v19.cjs` (**new**) | **Plan fields:** ft, ln, idea, alt and ce on every frame (a missing cx gives a WARN); ia, and dist as one of touching, close, apart or far, on frames with two or more characters; look and ctx on close shots with a face; ctx refs point at an earlier frame, and at a wider one when ctx says wide; ce names an object in the frame, or none. **Background:** no tinted wall, room or furniture wording in CLEAN or WHITE frames; no set-piece colour there (only the ground, the soft-grey line and white); full colour only with pk (PEAK) or at night; no PEAK or NIGHT field behind a face close-up (it goes WHITE; the next wider frame brings the colour back); every colour block names one colour element or says nothing carries colour; WHITE face close-ups name no room part. **Faces:** every performance names the seven features (hands-only frames name the hands; eyes-only frames name the eyes, eyebrows and eye direction; a face turned away names the head, hands and posture); WORD frames carry their word and no characters. **Symbols:** no symbol props and no emoji-style pop-ins (a symbol word in the beat text gives a WARN). **Cast:** every ROLE describes its hair and is never bald or a featureless round head; no two roles share a hair outline word, unless `sameAs` links them. **Composition:** the same composition (shot + angle + place + who stands where) never repeats; the same character in back-to-back frames moves to another distance family (far WIDE/MEDWIDE · middle MEDIUM · near CLOSE/FACE_HANDS/REACTION · very near XCLOSE · inserts HANDS/OBJECT; MEDIUM↔MEDWIDE is no change) or changes the angle clearly (EYE and SQUARE are both frontal) — edits and the stills of one sequence are not compared; characters keep their sides inside a scene (a SQUARE frame on the line, or an action or edit that says the character crosses, may switch them); close-up gaze matches where the other person stands (eyeline match). **Keywords:** idea words only, never "NUMBER …", digits or a sentence. |
| `qa.cjs` (**rewritten**) | **Structure:** fields, script match, sketch, value lists, placeholders, cast and hero sanity, unused entries. **Expression:** hands stated, the ceiling (no teeth or snarls), blank faces, big faces on wide shots, garments, anatomy words, each character performed, eye lines. **Props:** used, accessories locked. **Story plan:** STORY, PLAN, finished scenes, links, and recurring motifs whose `arc` shows a change of meaning. **Colour:** valid moods, a saturated colour element, no colour element in its field's family, red for danger only, the colour block present. **Motion:** pop cues, move cues, edits (detailed, one per frame, with a keep-clause), reveals and stated stillness. **Render risks** and **prompt shape:** injection wording, finger and wobbly words, lengths, lock positions, countable props, quoted words, edit wording. |
| `qa-render-risk.cjs` (**converted**) | Steep-view wording; character size stated; natural cameras and presets; neighbouring frames that read as the same picture; the thin-body lock; the white-characters-on-a-field lock (PEAK, NIGHT, MEMORY); heaps named; THE PICTURE and its closing summary; the why line. |
| `qa-consistency.cjs` (**converted**) | WHITE close-ups name no room part; frames that are not WHITE never call their ground white; removed room dress; texture; hands from the bottom edge; hidden objects; wall colours in placement; cast naming (an out-of-frame gaze target is allowed through `look`); chairs only for people sitting; eyes-only wording; one hand lock; **new:** every plan field reaches its prompt block (INTERACTION BEAT, DISTANCE, CLOSE-UP LOGIC, the ce colour element, ce none); CLEAN and WHITE never describe a colour field; grins and fading; edits name only what the base has; mouth shapes; expression strength. |
| `qa-colour-v17.cjs` (**converted**) | The colour element stands apart from its background; keyword cue words are in their lines. The background mix and keyword timing are printed as information. |
| `qa-sequences-colour.cjs` (**converted**) | Placement map and summary on every frame; held moments told as sequences; sequence images (cue word, keep-clause, wording, cast and objects, at most two edits from a base); edit-only frames; SEQ_PROMPTS in step; no mouth written as a quoted letter. Mood mix, sequence lengths, camera moves and key lines are printed as information. |

**Removed or converted** (R1 §2.6 and every other creative quota). Each of these now prints as information, or is replaced
by a rule:
- The longest single-mood run and the BRIGHT run.
- FIELD counted as one location, and "location held more than 4 frames".
- The opening-30-frames scene and mood counts, and the first-30-seconds counts.
- The plain-field share, the colour-background share, a colour moment in every 40-s band, and "at least 4 moods".
- The white-space share, and "long stretch on one kind of background".
- Floating heads, and two huge faces within three frames.
- The XCLOSE, close-up, HUGE, LARGE, hands and scale shares.
- The segment floors.
- "30+ locations", the two heaviest locations, "3+ locations in 7 frames", and "rotate the room's five views".
- The story-object share and the DOMINANT share.
- "Fresh stimulus = metaphor only". The concept share, and the metaphors-per-segment, devices-per-segment and
  through-line counts.
- "Outline of" as a warning.
- The white face on BRIGHT, and furniture tone versus wall tone.
- The eye-line share and the 60/40 screen-side balance.
- The SIMPLE run and the emotional frames per band.
- The humour, pop-in, edit, reveal and HOLD shares, the moves-per-film limits, and the same move four running.
- The 3–5 sequence length and the sequences-per-film count.
- The colour-script 20–30 %, and "room master required".
- The key-line variety counts, and keyword spacing.
- The noun-in-line share, and "a big face in the first three frames".

**Kept as rules:** every structural check (edits, reveals, sequences, prompt order, locks, teeth, cast naming, hands from
the bottom edge, and so on).

**Technical thresholds** stay because they are not creative choices:
- Prompt length: under 18,000 characters; face prompts warn outside 4k–13k (v18 builds already had a median of 11.9k).
- Printed text: at most four words inside an image.
- Edit detail.
- Chain depth: at most two edits from a base.
- Colour contrast maths.
