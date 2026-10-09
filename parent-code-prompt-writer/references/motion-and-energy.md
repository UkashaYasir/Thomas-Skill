# Motion and energy — the Video 4 standard, brought up to v19

> **v25 — lookup only.** `v24-standard.md` and `RULES-CARD.md` win over everything below, then `v19-principles.md`.
> Where this file says otherwise, the current rule is: the CLEAN ground is the clean warm white #F7F6F3 and set pieces
> are thin **black** ink lines with white fill (never soft grey), the fewest the frame needs; the colour focus is bright;
> at most two coloured objects (`ce`, `ce2`); colour by meaning (red = conflict, frustration, stress, danger; phones
> purple); white by default, and an intense line turns the whole stage to its emotion's colour (`pc`, `v24-standard.md`
> §2a); words are short, playful and hand-lettered **inside the frame's own image prompt** — never added in Premiere,
> never numbers or titles; drawn glow and action marks are allowed; "larger heads" means sudden close-ups.

> **v19:** `v19-principles.md` wins over anything here. The Video 4 pushes below still stand as directions; their old
> numbers (shares, minimums, frames-per-window rules) are retired — every choice is judged by the moment. Close-ups:
> `camera-and-closeups-v19.md`. Pattern interrupts and contrast: `humour-text-contrast-v19.md`. Colour:
> `style-and-colour-v19.md`.

Video 4 ("Give Me Your Phone", Sept 2026) is Thomas's **minimum** standard. He praised its colour moods, scene variety,
metaphors, close-ups and object animation, and asked for five pushes on every video after it: a more dynamic opening
(the first 30 seconds are "the most important part for retention"), stronger extreme close-ups on emotional moments,
object animations tied to important voice-over words, less static middle scenes, and continued visual metaphors. On
5 Oct 2026 he added: "movement alone is not enough. We also need stronger visual switches" — the pattern interrupts. Read
this file with `aha-humour-popins.md` (pops) and `emotion-and-performance.md` (faces).

**The line list is fixed.** Muhammad finalises the script segmentation, the wording and the voice-over timing before the
script arrives. Energy never comes from splitting, merging or re-timing lines — it comes from what each frame shows and
from the edit cues the build hands him (pop-ins, reveals, edits and camera moves).

## Contents
1. The camera-move cue (`move` field)
2. The opening
3. Extreme close-ups and large faces on emotion
4. Object animation tied to the voice-over word
5. No static middle
6. Metaphors — stronger, not more
7. What Video 4 did that must not be repeated
8. Render lessons from the Video 4 hook rewrite
9. Mask reveals
10. In-scene changes are image edits

## 1. The camera-move cue
A beat can carry one `move` — a small camera move Muhammad applies to the still in Premiere — wherever the moment needs
it; `HOLD` (no move) is a choice too. It costs nothing to generate and keeps frames alive, which is what Thomas meant by
"small zooms, perspective changes". It never changes the prompt.

```js
move: { type: "PUSH_IN", on: "", note: "slow push toward her eyes" }
```
- **type** — one of `PUSH_IN` (slow scale-up toward the hero), `PULL_OUT` (slow reveal), `SNAP_ZOOM` (fast punch-in on a
  word), `PAN_LEFT` / `PAN_RIGHT` (slide across a wide frame or a split), `TILT_UP` / `TILT_DOWN` (up a towering object,
  down to the floor), `DRIFT` (gentle diagonal float for calm frames), `SHAKE` (a short jolt on an impact word), `HOLD`.
- **on** — the exact word in the line it hits, for `SNAP_ZOOM` and `SHAKE` (required) or any move that should start on a
  word; `""` for a move that runs across the whole frame.
- **note** — where the move goes, in a few words ("push toward the phone", "pan from MOM to SON", "tilt up the phone
  wall").

Choosing a move — the move follows the feeling, the same way the shot does (seed examples):
| Frame | Move |
|---|---|
| Emotion building on a face | `PUSH_IN` toward the eyes |
| Reveal (a hidden object, the other side of the door, a big scale) | `PULL_OUT` or `TILT_UP` |
| Shock, slam, sudden demand, aha | `SNAP_ZOOM` or `SHAKE` on the word |
| Two characters apart, a split frame | `PAN` from one to the other (the one who acts first) |
| Calm, relief, warm closeness | `DRIFT` or a very slow `PUSH_IN` |
| Oversized object | `TILT` along its height or `PUSH_IN` onto it |
| The later images of a sequence, an emotional hold, a visual silence | `HOLD` |

Don't let one move type run on; vary it with the feeling. Frame the prompt with a little breathing room around the hero
so a push or pan has somewhere to go.

## 2. The opening
Thomas: the first 1–3 seconds "create immediate attention"; the first 30 seconds "need to create immediate curiosity,
tension and visual movement. The opening should already feel strong from the very first image." The cut rate is fixed by
the lines, so the energy comes from inside the frames:
- **Strong from frame 1**: inside the conflict, a large face or a strong close-up, never a calm establishing shot.
- **The camera distance changes clearly from frame to frame**, and no composition repeats — the same place may return,
  never with the same shot and layout.
- **Extreme close-ups and large faces where the opening's emotion peaks**, each looking different (different emotion,
  crop and gaze side).
- **Pop-ins and camera moves tied to the important words**, so the opening keeps moving.
- **Variety comes from camera, faces, composition and contrast, not from background colour.** History: the first Video 4
  hook rewrite used five plain orange backgrounds and three hands-with-phone frames; on screen they all looked like the
  same picture. With the white default this risk is bigger, so the opening changes distance, gaze side, layout and
  contrast on every frame, and keeps a full-colour field for its emotional peak only (`pk: true`).
- One continuous moment keeps one mood (no one-frame colour flicker); a single contrasting frame is a deliberate jolt,
  not a pattern.
- The spine object arrives early and with weight (a strong close-up, a DOMINANT scale or a `SNAP_ZOOM` on its word).

## 3. Extreme close-ups and large faces on emotion
Thomas, Video 4: "When a parent or teenager is shocked, angry, hurt or thoughtful, we should really feel that emotion."
Thomas, 5 Oct: "Bring the camera closer… Sometimes a large face on a white background is much stronger than a complete
room. Important emotional lines should visually feel important."
History: Video 4 used very few extreme close-ups; the first hook rewrite then put three huge faces alone on plain colour
into twelve frames, and Muhammad called them weird. The lesson v19 keeps is not "fewer faces" — it is that a close-up
must make sense:
- It has a reason: the peak of the line (the shock, the anger, the hurt, the moment of realising), a reaction, or a
  detail the line names.
- The viewer knows where we are (a wider frame of the place came first) and who looks at whom (the gaze matches the
  person or thing established before — `look`).
- The face reacts to something visible or clearly placed: the phone under his chin, her outstretched hand in the
  foreground, the other face in the next frame (`ctx`).
- The face fills most of the frame; the head shape stays whole and readable, with open space on the side the eyes look
  — never a face pushed to one edge with half the frame empty (empty space invites printed text).
- Expression at the top of the ceiling in `emotion-and-performance.md`, never past it.
- Pair it with a move: `PUSH_IN` for hurt and thinking, `SNAP_ZOOM` for shock and anger, `HOLD` for a visual silence.

## 4. Object animation tied to the voice-over word
Thomas: "Keep using object animations, but connect them specifically to important words." History: in Video 4 most
pop-ins were generic symbols (question marks, ticks, numbers) and only a minority were story objects.
- **Pop-ins are story objects** (`PROP` keys) — the actual object the voice names or acts on, landing on that exact word:
  the phone on "phone", the clock on "midnight", the padlock on "restricted", the charging tray on "charge".
- Prefer `PUNCH` on an object already in the frame (a scale bump, a buzz, a slide toward the character) or a mask reveal
  — it ties the animation to the story instead of floating a symbol over it.
- Generic overlays (?, !, ticks, emoji-style icons, hearts, stars) are out: "generic symbols" are on Thomas's "Less" list.
  The one other text moment is a short hand-lettered idea word inside the frame's own prompt (`humour-text-contrast-v19.md`, `v24-standard.md` §7).
- The `on` word is the important word of the line — the noun or verb carrying its meaning — never a filler word.

## 5. No static middle
Thomas: "Some scenes in the middle are still slightly static." History: in Video 4 the Tuesday-afternoon talk put almost
every frame at the same kitchen table, and the framework steps opened on near-identical fridge-sheet frames.
- **A long conversation moves the camera, not the house.** The place stays one outline cue; the camera finds the story
  inside it: the two at the table, her face, his hands on the sheet from above, his reaction, a quick cutaway to what they
  are talking about. (Thomas, 5 Oct: "We do not need to fully illustrate every location.")
- **Through calm explanation, switch more**: a close-up, hands, an object close-up, a reaction shot, a scale change, a
  pattern interrupt (a sudden white frame, a one-word text, a funny reaction, a visual silence). At the peaks, hold related
  frames instead.
- **A repeated device changes each time it returns** — a new angle, a new hand action, the object in a new state and a
  new meaning. Never identical inserts.
- Characters *move* in the middle: walking, turning, reaching, sitting down beside, handing over — the action field says
  what changes in the second the frame catches.

## 6. Metaphors — stronger, not more
Video 4's metaphors were "one of the strongest improvements". Thomas named what worked: keys, doors, the phone, a plant,
crossroads, a balance — physical, everyday objects that explain the psychology at a glance. Since 5 Oct the direction is
"stronger visual metaphors", not a share of frames: a metaphor is used where it adds meaning the words don't already
carry; real moments carry the everyday lines; love, trust, attention and safety are shown through behaviour; nothing
childish (`props-symbols-metaphors-v19.md`). A character reacts inside the metaphor wherever possible.

## 7. What Video 4 did that must not be repeated
| Video 4 (history) | Now (v19) |
|---|---|
| Few extreme close-ups | Large faces and extreme close-ups on every important emotional line, each one making sense |
| Most pop-ins were generic symbols | Pop-ins are story objects on their word; generic symbols are out |
| Not every opening frame moved | The opening is strong from frame 1 and keeps moving on the important words |
| Almost every frame of one talk at one table | The camera moves inside the place: faces, hands, reactions, cutaways |
| Identical inserts for the framework steps | Each return of a device changes angle, action, state and meaning |
| No camera-move plan | A `move` cue (or a deliberate `HOLD`) wherever the moment needs it |

## 8. Render lessons from the Video 4 hook rewrite
The first rewrite of the Video 4 hook passed every check and still rendered badly. What the pictures taught, now enforced
by the QA's RENDER RISKS section:
- **No half-empty frames.** A face pushed to one edge of a plain background left half the frame empty, and Flow printed
  the prompt text into it. Close-ups fill most of the frame; the open space on the gaze side stays modest.
- **Night stays blue.** A dark wide wall-cutaway view came out grey and black-and-white, and both characters' black hair
  turned white. The compiler adds a navy-not-grey, solid-black-hair lock to every NIGHT frame.
- **Hands-only frames: short forearms rising from the bottom edge** (or the bottom corners for two people). History: one
  Video 4 tug from the sides rendered, but in Seven Things two arms from opposite side edges became long cables, and a
  single big forearm from a corner became a white blob.
- **One size per object.** If a metaphor needs a giant version of a prop, give the giant version its own PROP entry — a
  locked "twice the length of a phone" in the same prompt as "giant" fights itself.
- **One colour element.** A second strong colour makes the hero compete (`style-and-colour-v19.md`).
- **No one-frame mood flicker** inside a continuous scene.
- **Natural camera, strong angles only with a reason.** The second hook rewrite used a low or high camera on almost every
  close and medium shot; Flow pushed them into a fisheye kitchen with flying chairs and an upside-down boy at the table.
  Eye level, square-on, side-on and over-the-shoulder are the base; low and high angles are for power, scale and
  helplessness. The compiler adds a natural-lens PERSPECTIVE line to every prompt.
- **No lone arms.** A character shown only as an arm reaching in from a frame corner renders as a long noodle arm with a
  giant glove. Show them half in view — head, shoulder and arm — or leave them out.

## 9. Mask reveals — hide it with a flat shape, uncover it on the word
Muhammad's object animation, with no extra generation: the element sits on ONE flat colour and touches nothing, so in
Premiere a flat shape (rectangle or pen tool) in that colour hides it until the cue word. On the v19 white or very light
neutral ground this is easier than ever. Each reveal frame carries:

```js
reveal: { what: "PHONE", on: "phone", method: "MASK", cover: "#FFFFFF",
          how: "Premiere: draw a white (#FFFFFF) shape over the phone lying on the shelf outline; take the shape away on “phone”. Eyedropper the surface right beside it if the render's colour differs." }
```
- **What masks cleanly:** an object alone on the ground, on a shelf, table top or floor outline; clock hands (cover with
  the face's colour); a phone screen's picture (cover with plain black, it "lights up"); lines, ticks or crosses on a white
  sheet; an effect (steam, dashes) over one plain colour; the part of a metaphor over one colour (the iceberg below the
  waterline).
- **What does not:** a character appearing, an object held in a hand, anything crossing two colours or touching a line.
  Those get an in-scene edit (§10) instead.
- Write the separation into the action ("the clock sits alone on the floor line with plain ground around it").
- Use a reveal wherever an object should appear on its word and can sit apart; a reveal frame usually needs no other pop.

## 10. In-scene changes are image edits, never new prompts
Muhammad's rule: a new prompt redraws the whole scene, so a change *inside* a scene — a character sits up, picks
something up, turns, reacts, a stone appears — is made by **editing that frame's generated image**. The editor attaches
the frame's image, pastes the edit prompt, keeps the result, and in the timeline cuts from the original to the edited
image on the cue word (same line; or holds the edit into the next line when the scene continues).

Each edit is one entry in `EDIT_CUES`:
```js
{ ref: "S12", on: "taking", change: "MOM's mitten hand pulls THE PHONE completely free and a little up toward the top left of the frame. SON's mitten hand is left open and empty above the homework, its thumb bump turned up. The short tension dashes disappear. The homework and the table top stay exactly the same." }
```
`editPrompt()` wraps it: EDIT THIS IMAGE (one change only) → WHO AND WHAT IS WHO (MOM = the woman with the bun, SON = the
boy with spiky hair, each named prop with its colour) → CHANGE → KEEP EXACTLY THE SAME (character design, everything not
named, background, colours, camera and crop, line style) → DO NOT (re-crop, redraw other faces, add objects, text,
shadows, change colours).

**Write the change in detail, or the editor ignores it:** who changes; from what to what — which arm, where the hand goes,
where the head turns, the eyebrows, the pupils and the mouth; for an object, where it appears, how big relative to a
head, its colour and outline; and one sentence naming what stays exactly as it is. One change per edit, one edit per
frame (the editor handles one change reliably).

Where to use them: reactions on the key word (a head snapping up, an eye-roll, a smile breaking), a pose that completes
the action (the phone pulled free, the door slid down, the phone tucked behind the back), a character moving within the
same shot (walking past), and something appearing that can't be masked (stones across the river). Use an edit wherever
the line describes a change inside the scene; a statement or explanation line cuts to a new image instead. Pose pairs
generated from a second full prompt are retired — use an edit.

## Sequences and selective camera (Thomas, Video 5)
The production is still images, so movement comes from **image sequences**: an important or emotional moment is told as
a short sequence of stills in one scene — the frame, its in-scene edit, then an insert (`S12b`) — each changing what the
characters visibly do. Thomas's examples: on the phone → MOM enters → takes it → he reaches → she reacts; throws the teddy
→ stamps → turns away → the parent kneels calmly. Thomas's everyday situations make natural sequences too: the parent
walks past the room, notices something is wrong, and comes back; the child starts to say something, then changes their
mind (`everyday-situations-v19.md`). Not every scene needs one; simple scenes stay simple. Record them in `SEQUENCES` so
the editor reads the images in order.

Zoom and pan are used **selectively**. `HOLD` means no camera move: give it to the later images of a sequence (the cut is
the motion), to emotional holds and to visual silences. Peaks and word-timed hits (SNAP_ZOOM, SHAKE) keep their move, the
opening keeps moving, and no move type takes over.
