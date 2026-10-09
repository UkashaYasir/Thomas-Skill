# Camera and close-ups — v19 (distance, close-up logic, composition, script line types)

> **v24 (9 Oct 2026) — `v24-standard.md` §5–§6 adds:** "Avoid showing characters too small or too far away" — WIDE only
> when distance or place is the point, with every face still readable; MEDWIDE is the usual full-figure shot. More zoom-ins
> on faces, eyes, hands and objects, and a **zoom plan** (`zm`) that reuses a still with new framing in Premiere; a frame
> with a planned reframe is composed so its target survives the crop.

Source: Thomas's messages of 5 Oct 2026 (SOURCES.md A5, A6, A10, A14, A15, D), Muhammad's close-up direction
(references/v19-principles.md §2), the Seven Things build audit (research R2 §1, §9, §10) and the craft research (R3 §1,
§3, §5, §7, §8), plus the film-grammar sources listed at the end. Where an older file in this skill says otherwise about
camera, close-ups or composition ("never a floating head", caps on extreme close-ups, "a real room with a new camera beats a
plain field", variety by adding rooms, five views of every room), this file wins.

Every list in this file is a set of seed examples plus a method for making new ones. Nothing here is a menu to pick from.
When a line needs a shot, a composition or a line type that is not listed, make it with the method and add it after the
video.

Thomas, in his words: "Bring the camera closer… close-ups, extreme close-ups, face-only moments, face + hands, emotional
details. Sometimes a large face on a white background is much stronger than a complete room. Important emotional lines
should visually feel important." — "Please avoid staying too long in the same medium/wide framing." — "If we are working
with 300+ images, the viewer should still never feel like the visuals are repeating or that the same composition keeps
coming back."

---

## 1. The shot types

| Shot | What the frame shows | Use it for | Usual mood |
|---|---|---|---|
| **WIDE** | whole figures, small in the space; the place's outline cue and a ground line | a new place; distance between people; loneliness; scale; a reveal; the empty frame after someone leaves | CLEAN (PEAK, NIGHT, MEMORY when they apply) |
| **MEDWIDE** | whole figures, larger; two people and the space between them | an action of the whole body (arriving, walking past, slamming a door); distance as the story | CLEAN |
| **MEDIUM** | figures cropped at the knees or at the table top; hands and objects readable | two people in one action; body language; handling an object | CLEAN |
| **CLOSE** | head and shoulders; the face readable | dialogue; contact; the feeling of the line | CLEAN, or WHITE when no place is drawn |
| **XCLOSE** | a huge face that fills the frame, or an **eyes-only** crop (the band from the top of the eyebrows to just below the eyes) | the emotion is the information: the peak of a line, a shock, a realisation, a look that says everything — "an exclamation point or BOLD text" (R3 S2) | WHITE |
| **FACE_HANDS** | the face and the hands together in one close frame (a hand at the mouth, both hands round a mug under the chin, the phone held just below the face) | feelings that show in face and hands at once: hesitation, holding something back, nerves, tenderness | WHITE, or CLEAN with an outline cue |
| **REACTION** | the listener's face responding to what was just said or done, the cause shown just before or placed in the frame | after a trigger; the "seriously?" look; any moment where the face tells the viewer how to feel about the frame before (the Kuleshov effect, R3 S4) | WHITE, or CLEAN with an outline cue |
| **HANDS** | hands only, short forearms rising from the bottom edge; no head | an inner state through the hands: a thumb above SEND, a hand stopping short of the door handle, a hand pausing on the keys, hiding, giving | CLEAN |
| **OBJECT** | the object alone, no character | the object is the information (the test and its mark, the keys in the bun); chapter turns; aftermath | WHITE (object-only), or CLEAN when its place matters |
| **WORD** | a pure white frame for an on-screen word; nothing drawn, or one small object if the plan names it | a strong moment where an idea word sharpens the line; text added by Muhammad in Premiere (references/humour-text-contrast-v19.md); Muhammad may use a white matte in Premiere instead of generating a blank frame — generate it only when the plan names an object in it | WHITE |

**Distance families.** For the rules on change (§5) and the distance script (§7), the shots fall into families that read
differently on screen:
- far — WIDE, MEDWIDE
- middle — MEDIUM
- near — CLOSE, FACE_HANDS, REACTION
- very near — XCLOSE (huge face, eyes-only)
- inserts — HANDS, OBJECT
- text — WORD

MEDIUM and MEDWIDE look alike on screen; moving between them is not a change. CLOSE and REACTION of the same face at the
same angle look alike too.

---

## 2. Angles — natural only

Thomas and Muhammad: natural camera positions; exaggerated angles render badly.

| Angle | What it is | Use it for |
|---|---|---|
| **EYE** | a level camera at the eye line (the default) | most frames |
| **PROFILE** | side-on | two faces nose to nose; walking past; comparing two things |
| **OTS** | over the shoulder: the near person's head and shoulder large in the foreground | conversation, confrontation, the cause placed in the frame |
| **SQUARE** | square-on, frontal | a still, direct frame; a frame straight on the line between two people (§6) |
| **LOW** | slightly low, at a child's height, a gentle upward view with straight verticals | the child's world; the power gap; a parent towering |
| **HIGH** | slightly high, a gentle downward view, everyone upright | someone feeling small or overwhelmed |
| **POV** | through a character's eyes | what the child sees from his height; what is on the phone |
| **OVERHEAD** | straight down, **only onto a flat surface with hands and objects** (a table top, a bed cover) | an exchange across a table; what lies between two people. Test-render before relying on it |

Never: a tilted (Dutch) horizon, a floor-level or ceiling view, a fisheye, a tilted room. The horizon stays level and the
verticals straight in every frame.

---

## 3. Bring the camera closer

- **An emotional line is shot near or very near.** A line is emotional when it carries a feeling rather than information:
  a hurt, a fear, a cry, a realisation, the child's own voice, a reaction, a turn in the chapter. "Important emotional
  lines should visually feel important."
- **Explanation lines do not default to medium.** Show the claim through something near — one object, the hands doing the
  thing, a face reacting — or through a wide that is about space (distance, loneliness, a reveal). Seven Things put almost
  half its frames at medium or wide inside a room (SOURCES.md G); that is the habit to break.
- **A wide shot always has a reason**: the place is new, the distance between people is the story, someone is alone, the
  scale matters, or the wide is the punchline of a reveal.
- **The face must be large enough to read.** Never write a detailed expression into a small face in a wide frame (R2 §2).
  If the expression matters, move the camera in.

---

## 4. Close-up logic — every close-up makes sense

A close-up is CLOSE, XCLOSE (huge face or eyes-only), FACE_HANDS, or REACTION with a face. Each one passes all of these.
The plan records them in `look` (where the eyes go) and `ctx` (what makes the shot make sense).

### 4.1 It has a reason
One of three: the emotional peak of the line; a reaction to something; a detail the line names. The plan shows the reason
through `ft` (what we feel) and `ln` (the line type), and through `ia` when it is a reaction.

### 4.2 The viewer knows where we are
A wider frame of the place, showing who is where, comes first in the scene. Once the scene is known, its close-ups can
drop the place entirely and go to white.
- If a scene must open close (a hook, a jolt), the close frame carries its own context — over the shoulder, hands and the
  object, or one outline edge — and the wider frame follows soon after.
- `ctx` says which: "follows wide S22", "over MOM's shoulder", "hands + THE PHONE", "door post at the left edge".

### 4.3 The viewer knows who looks at whom (eyeline match)
"An audience will want to see what the character on-screen is seeing" — the shot begins with "a character looking at
something off-screen, followed by a cut of another object or person" (Wikipedia, eyeline match). So:
- The gaze matches the positions established before. If MOM stood at the left of SON in the wide, SON's close-up looks
  out of frame left and MOM's looks out of frame right. "Actor A looks off camera right and Actor B looks off camera left."
- `look` names the target and the side: "toward MOM, out of frame left"; "down at THE PHONE in her hands"; "away from MOM,
  toward the lower right".
- Nobody looks into the camera. A POV frame is the one place the camera is a character's eyes.

### 4.4 The face reacts to something visible or clearly placed
The cause of the expression is in the frame (the hands, the object, the other person's shoulder in an over-the-shoulder
frame) or placed by the cut: shown in the frame just before, or answered by the other face in the frame just after
(shot-reverse-shot: "a subsequent setup to show the reverse view of the previous setup", StudioBinder). A face reacting to
nothing is a random face.

### 4.5 Open space on the side the eyes look (lead room)
Lead room is "the space in front, and in the direction of, moving or stationary subjects"; without it, a subject's
"progress will seem impeded" (Wikipedia, lead room). So the face sits toward one side and the open space lies on the side
the eyes look. The eyes are never pressed against the edge they look toward. In an eyes-only crop the pupils point into
the open side or at the cause in the frame.

### 4.6 The head shape stays whole and readable (headroom)
Headroom is "the distance between the top of the subject's head and the top of the frame"; too little feels
"claustrophobic", and in an extreme close-up "the top of the head is out of the frame" but the eyes still sit about a third
down from the top (Wikipedia, headroom). So:
- **CLOSE, FACE_HANDS, REACTION**: the whole round head is in the frame with a little space above it, and the hair outline
  is whole, so we know who it is.
- **Huge face**: the face fills most of the frame and the head outline stays readable — at most the very top of the hair
  touches the top edge, never a cut through the face; the eyes sit in the upper part of the frame; the hair shows enough to
  name the character (MOM's bun, SON's spikes). Never a bald or featureless round head.
- **Eyes-only**: the head outline runs off the top and sides by design; who it is comes from the frame before.

### 4.7 No random crops
Crops fall at natural lines: below the shoulders, at the chin for a huge face, at the forearms for hands. Never through the
eyes, the mouth, a hand or the held object. No sliver of a face at the frame edge, except the large foreground head and
shoulder of an over-the-shoulder frame, which is clearly a person. A hand entering the frame comes from the side where its
owner stands.

### 4.8 Face-only on white for the strongest lines
A face alone on pure white is right when:
1. the line is one of the strongest emotional moments of its scene (the peak, the child's own voice, the cry, the
   realisation, the reaction that carries the joke);
2. the scene and the other person are already established, or the gaze points to a cause placed in the frame;
3. the expression is the whole information — eyes, eyebrows, mouth, head position, hand gesture where hands show, posture,
   eye direction, all as one clear emotion (references/acting-and-interaction-v19.md).

This replaces the old "never a floating head" rule. A face on white is not floating when the viewer knows where we are,
who the character looks at, and why. Face-only frames can follow each other when each one changes the person, the size or
the side — a shot-reverse-shot of two faces, or one face escalating in size. The scene goes back to a wider frame when
the viewer needs to know again where people are.

### 4.9 Eyes-only with the cause shown
An eyes-only crop always shows or points at its cause: the top edge of the phone just below the eyes, the edge of the
test, the shoulder of the person they look at — or the cause is the frame just before and the pupils point at where it
was. Use it for a look that says the line on its own: the side-eye, eyes sliding away, eyes that will not leave the phone.

### 4.10 Writing `look` and `ctx`
| Frame | `look` | `ctx` |
|---|---|---|
| SON's huge face after MOM's question in the wide | "toward MOM, out of frame left" | "follows wide S22 (MOM left, SON right)" |
| MOM's eyes-only over her phone | "down at THE PHONE" | "phone top edge in frame below the eyes" |
| SON's REACTION with MOM's hand and phone entering from the left | "toward MOM's hand, frame left" | "hands + THE PHONE enter from the left; follows S106" |
| MOM listening, FACE_HANDS, mug held under her chin | "toward SON, out of frame right, level" | "follows MEDIUM S96 at the table" |
| SON's face, MOM's back of head large in the foreground | "up at MOM, frame left" | "over MOM's shoulder" |

---

## 5. The same character in back-to-back frames changes size or angle clearly

- When two separate frames in a row show the same character, the second moves to a different distance family (§1) or
  changes the angle clearly (front → profile → over the shoulder → POV → child's height).
- Why: the 30-degree rule asks the camera to move "at least 30 degrees relative to the subject between successive shots of
  the same subject", otherwise "the transition between shots can look like a jump cut"; the same goes for a small change of
  lens. Murch: viewers struggle when "displacements are neither subtle nor total" (Wikipedia, 30-degree rule). A small
  change reads as a mistake; a clear change reads as a decision.
- In-scene image edits and the stills of one sequence are continuations of one frame, not new shots: the camera stays on
  purpose so the change of face or action reads ("change only X, keep everything else unchanged", R3 S25).

---

## 6. Screen sides

### 6.1 Inside a scene: the 180° rule
"The camera should be kept on one side of an imaginary axis between two characters, so that the first character is
always frame right of the second character" (Wikipedia, 180-degree rule). Inside one scene (the same `sc`), each character
keeps their side of the frame across wides, mediums, over-the-shoulder frames and close-ups, and the eyelines follow
(§4.3). A scene may cross the line only:
- when a character walks to the other side inside a frame or an edit, so the viewer sees the move;
- through a frame straight on the line (a SQUARE frontal frame) between the two sides;
- by starting a new scene.

### 6.2 Between scenes: variety
New scenes choose sides and layouts afresh. Seven Things put MOM on the left in most MOM–child pairs and repeated "MOM
left · object · SON right" again and again (R2 §1). So:
- Choose each scene's sides from the story: who enters, who is blocked, whose world we are in. Do not default to the
  parent on the left.
- Stage pairs in depth (one near, one far) as well as left and right.
- Put the parent and child at the same height when the line is about listening or respect (kneeling, sitting together),
  at different heights when it is about power.

---

## 7. Camera distance across the whole film

- The film never settles into one distance. A run of MEDIUM, MEDWIDE and WIDE frames is one look on screen, however
  the keys change; break it with a near frame, an insert or a white frame.
- **Pace by emotion** (R3 §7): through calm explanation, change more often and in kind (size family, white, an insert, a
  word). At the emotional peaks, slow down: fewer, held, related frames, closer, a short sequence of stills of one moment.
  Fast cutting overloads the viewer on arousing content (Lang et al., R3 S24).
- **The opening** is the densest stretch: strong related changes from the first frame (Thomas: the first 30 seconds are
  "the most important part for retention").
- **The reaction is the cut that gives meaning** (Kuleshov, R3 S4): after a trigger frame, cut to the face that shows what
  it means, rather than illustrating the line again.
- **The extreme close-up is bold type** (R3 S2): it goes where the line is bold. If everything is bold, nothing is.
- The distance script is planned before production in the shot plan (references/shot-plan-v19.md §4). It runs alongside a
  second script, the distance between characters (`dist`, references/acting-and-interaction-v19.md).

---

## 8. Composition variety across the whole film

### 8.1 What a composition is
A composition is the shot, the angle, the place, and who or what sits at the left, the centre and the right (plus which
layer is near and which is far). **No composition comes back unchanged anywhere in the film.** The build checks the exact
repeat; the writer also avoids the near-repeats that read as the same picture.

Seven Things' repeated formulas (R2 §1), each fine once and never as a default:
- two characters on either side with an object or a gap in the centre;
- one subject centred between two empty walls;
- across-the-table two-shots;
- every chapter opener as the same centred object;
- the same eyes-only frame in the same place more than once.

### 8.2 Seed compositions (open library)
| Composition | What the frame shows | What it says |
|---|---|---|
| **Over the shoulder** | one person's head and shoulder large in the foreground, the other's face toward us | conversation, confrontation, being looked at; the cause placed in the frame |
| **Figure in a doorway** | one person framed by the door outline, the other outside it | being shut out; hesitating to come in; watching; "walks past, notices, comes back" |
| **Top-down table** | hands and objects on a table seen from straight above | an exchange; what lies between two people (the toast slid across, the test face-down) |
| **Hands insert** | hands only, rising from the bottom edge, doing one telling thing | an inner state without words |
| **Empty frame after someone leaves** | the place's outline cue with nobody in it: the chair pushed back, the door just shut | absence; aftermath; the punchline of an exit |
| **Split frame** | a door edge or a wall line divides the frame, one person on each side | two worlds; a wall between them; the parent on the phone on one side, the child waiting on the other |
| **Mirror or window reflection** | a face seen in a night window or in the black screen of a phone | looking at oneself; what someone sees of themselves. Keep it simple and test-render first |
| **Foreground–background depth** | one person large near the camera, the other small behind | cause and reaction in one frame; who is affected and who does not notice |
| **POV of a phone screen** | the camera looks up from the phone at the face over it, or sees what is on the screen | the phone's grip on attention. The screen shows one simple drawn picture, never words |
| **Far-apart two-shot on white space** | two small figures at opposite edges, empty ground between them | emotional distance. CLEAN with a ground line; pure WHITE only as a deliberate white break after a test render |
| **Through the stair rail** | the child seen between the rails, or seeing the parents through them | listening in; being outside the adults' world |
| **Back to camera** | one character from behind, facing the other | the viewer stands with them; the teen looking away but still listening |
| **Profile two-shot, nose to nose** | two faces in profile at the same height, close | confrontation, or closeness after repair |
| **Same-height two-shot** | the parent kneeling or sitting so both heads are level | connection; listening; respect |
| **Small figure at the frame's edge** | one small person at the edge, large empty ground | loneliness; carrying something alone |
| **Large object near, figure behind** | the object big in the foreground, the person smaller behind it | the weight of the object (the test on the table, the phone between them) |
| **A hand entering toward a face** | one hand reaching in from the frame edge toward the other's face or shoulder | a hand reaching out; comfort offered or refused |

### 8.3 How to invent a new composition
Turn one dial from the seed list until the frame says the line's feeling:
- **where the camera stands** — in front, at the side, behind one person, through something, above a flat surface, at a
  child's height;
- **what is near and what is far** — depth instead of left and right;
- **who is in the frame** — and who is present only as a hand, a shoulder or the direction of a look;
- **where the subject sits** — edge, centre or a third, and how much empty ground surrounds it;
- **the scale relation** — a small person and a large object, a large face and a small prop;
- **a frame inside the frame** — a doorway, a window, the stair rail, a phone screen;
- **a divider** — a door edge, a wall line, a table edge;
- **time** — the frame just before someone enters, or just after they leave.

Then: check the composition against the film's log (shot + angle + place + sides) so it is new; check it can be generated
(a natural angle, few elements, revealed objects apart from hands, no words in the image); record it in the plan. After
the video, add the ones that worked to the seed list.

---

## 9. Natural angles only

Keep the horizon level and verticals straight; describe what the camera sees in plain photographic words ("close-up:
SON's head and shoulders fill the right side of the frame"; "wide shot: two small figures far apart with empty
ground between them"), never a dramatic angle name alone (R3 §8; render-lessons.md). Natural framing is what makes the
close-ups and depth compositions above render well.

---

## 10. Script line types — how each kind of line is staged

Every script line gets a line type (`ln` in the plan). The type does not choose the picture; it tells the writer what the
viewer should feel and which tools usually serve that feeling. The feeling of the actual line (`ft`) always decides.
The list is open: when a line fits none of these, name a new type, write its five answers below, and add it after the
video. A line can carry two types (a child's voice that is also the chapter's peak); choose the one that leads.

Each type answers: **Viewer feels** · **Staging** · **Camera** · **Colour** · **Interrupt, word, edit** · **Example**
(a Seven Things line, what the build did, how v19 stages it).

### hook
- **Viewer feels**: recognition with a jolt — "that is my child" — and the need to keep watching.
- **Staging**: a real everyday moment with a twist: what is said against what is shown, something hidden in plain sight.
- **Camera**: a strong close frame and a wide that sets the place, with large size jumps between related frames.
- **Colour**: CLEAN or WHITE with one bold colour element; PEAK only if the hook is itself the emotional peak.
- **Interrupt, word, edit**: interrupts are welcome here (extreme close-up, large face, unexpected object); an edit on the
  turn word; a word only if it names the film's question.
- **Example**: S2 "And they are still hiding things from you." The build put THE JAR behind SON's back during the hug —
  a strong idea (R2 §6). v19: S1 is the wide hug in the hall (front-door outline, MOM left, SON right); S2 cuts over MOM's
  shoulder: her back fills the foreground at the left, SON's face rests on her shoulder at the right, and his eyes slide
  down to his own hand on her back, which holds THE JAR with its lid toward us. `ce: "JAR lid"`, `look: "down at his own
  hand on MOM's back"`, `ctx: "follows wide S1; over MOM's shoulder"`.

### chapter-turn
- **Viewer feels**: a reset and a small promise — "here comes the next one".
- **Staging**: the film's recurring object in a new picture that already hints at the chapter, or a white break. Every
  chapter turn is a different composition.
- **Camera**: OBJECT, HANDS, top-down, through a doorway, held by a character — never the same set-up twice.
- **Colour**: WHITE or CLEAN; the colour element is the object the chapter is about.
- **Interrupt, word, edit**: often a white-break or unexpected-object interrupt; a reveal on the number word. The voice
  says the number; on-screen words are idea words, never "NUMBER …".
- **Example**: S44 "Number two." The build showed THE JAR alone, centred on a shelf, plain wall either side — the same
  picture as most other chapter openers (R2 §1). v19: OBJECT on WHITE, seen from slightly above: MOM's phone lying across
  THE JAR's lid, pressing it shut. `ce: "PHONE"` (the chapter is about the phone; the jar stays in black outline). The
  next line, "I notice when your phone is more interesting than me.", now has its picture prepared.

### child-voice
- **Viewer feels**: hearing the child directly — tenderness, a small ache, "I didn't know he felt that".
- **Staging**: the child's own face, large, looking toward the parent established before — or a behaviour that says it
  (hesitating, starting to speak and stopping).
- **Camera**: CLOSE, XCLOSE, FACE_HANDS, or over the parent's shoulder; `look` and `ctx` always filled.
- **Colour**: WHITE (face-only, `ce: "none"`) or CLEAN with the one object he holds.
- **Interrupt, word, edit**: large-face or white-break; often the chapter's idea word on the spoken word (LISTEN,
  ATTENTION); usually held, without an edit — the line lands.
- **Example**: S20 "Sometimes I need you to listen," The build showed SON alone in profile on white, mouth open, looking
  up at nothing. v19: over MOM's shoulder — the back of her head and her bun large in the foreground at the left, turned
  half away from him; SON's face large at the right, looking up at her, eyebrows lifted in the middle, mouth starting to
  open. WHITE, `ce: "none"`, `look: "up at MOM, frame left"`, `ctx: "over MOM's shoulder"`, word LISTEN on "listen".

### scene-setting
- **Viewer feels**: orientation — "I know this moment".
- **Staging**: the place by its one outline cue, who is where, and the first action; this frame sets the screen sides
  for the scene.
- **Camera**: WIDE or MEDWIDE, or an insert that says the place on its own (keys turning in the front door).
- **Colour**: CLEAN, ground line, outline cue; `ce` is the story object if there is one.
- **Interrupt, word, edit**: rarely an interrupt; an edit for the arrival or the first action.
- **Example**: S22 "Your child comes home." The build used a MEDWIDE tinted hall with a hall table and stairs. v19: WIDE
  CLEAN: the front-door outline at the left, SON just inside it with his shoulders low and his bag sliding off one
  shoulder; MOM at the right, small, looking up from her phone. `ia: "SON drops his bag at the door → MOM looks up from
  her phone"`, `dist: "far"`. SON stays left and MOM right for the rest of this scene.

### dialogue
- **Viewer feels**: inside the conversation — and above all, how the words land on the other person.
- **Staging**: the speaker and the listener; often the listener's face matters more than the speaker's (cut to the
  listener). Shot and reverse shot keep the sides and the eyelines.
- **Camera**: CLOSE, REACTION, OTS; quoted lines in a row alternate speaker and listener with clear size changes.
- **Colour**: CLEAN, or WHITE for face-only frames.
- **Interrupt, word, edit**: a funny-reaction where the line allows; an edit for the reaction on the cue word.
- **Example**: S58 "“Really?”" The build used the third of three near-identical profile phone two-shots (S56, S57, S59).
  v19: eyes-only XCLOSE of MOM: her eyebrows jump up on "Really?" while her pupils stay fixed down on the phone, whose top
  edge sits in the frame just below her eyes. WHITE, `ce: "PHONE"`, `look: "down at THE PHONE"`, `ctx: "phone top edge in
  frame; follows S57 where the boy talks at her elbow"`, `ip: "funny-reaction"`. The say-and-do contradiction is the joke.

### rapid-list
- **Viewer feels**: momentum and recognition piling up; sometimes the comedy of too much.
- **Staging**: each item its own picture. Keep one anchor (the same person, or the same object) and change one thing per
  item so the list builds; end the list with a contrast — a dead-still reaction, a wide, a white frame.
- **Camera**: each item in a different distance family or composition; the cut is the motion.
- **Colour**: CLEAN; each item's colour element is that item's object.
- **Interrupt, word, edit**: few edits (each line is its own image); the list's end is often the interrupt
  (funny-reaction, visual-silence).
- **Example**: S194–S196 "The slammed door. / The eye roll. / The tantrum." The build staged them in the chapter's storm
  colour, including the close-up. v19: S194 WIDE, the landing as one door outline, the door just slammed and SON gone,
  MOM small at the left end of the landing, one hand still raised mid-sentence (the empty frame after someone leaves);
  S195 XCLOSE of SON, a huge face with the pupils rolled to the top and the head tipped back, while MOM's raised hand
  enters from the left edge, `look: "up and away from MOM's hand"`, `ctx: "MOM's raised hand placed at the left edge"`;
  S196 MEDWIDE, SON mid-tantrum in the kitchen, arms flung out, MOM stopped in the doorway at the left. If the plan marks
  this run as the chapter's peak, S194 and S196 are PEAK with `pk: true` and S195 is WHITE.

### statement
- **Viewer feels**: understanding — "so that is why".
- **Staging**: the claim shown through one real behaviour or one strong object. A metaphor only when it adds meaning the
  words do not already carry; never a drawing of the noun the voice-over says.
- **Camera**: whichever family the frame before did not use; often OBJECT, HANDS or a near face; one object centred on
  white for a pure idea.
- **Colour**: CLEAN or WHITE, one element.
- **Interrupt, word, edit**: a short-metaphor or unexpected-object interrupt where it earns it; a word when the statement
  is the chapter's thesis.
- **Example**: S76 "Children are emotional detectives." The build gave SON a magnifier (it draws the word
  "detectives", R2 §6). v19 goes one step past the noun: CLOSE of SON at the table edge, spoon stopped halfway to his
  mouth, only his pupils moving — sliding toward MOM. The noticing is done by the eyes, not by a prop. CLEAN (the table
  edge as an outline), `ce: "none"`, `look: "toward MOM, out of frame left"`, `ctx: "follows S75, where MOM stands large
  in the foreground at the left and SON sits at the table behind her"`.

### adult-mirror
- **Viewer feels**: the parent's own sting of recognition, often with a laugh — "oh, that is me".
- **Staging**: put the adult in the child's position with the same staging idea as the child's scene (the same power
  geometry, the same object role), in a real adult place. The echo is in the idea; the camera, sides or size change so it
  is never the same composition.
- **Camera**: mirrors the child's frame with a clear change of angle or side.
- **Colour**: CLEAN; the mirrored object carries the colour.
- **Interrupt, word, edit**: funny-reaction; an edit on the cue word.
- **Example**: S116 "But imagine your boss saying:" — the mirror of S106, where MOM taps a high mark above SON's head.
  v19: MEDIUM at a seated adult's eye level in the office: BOSS at the right, standing over MOM's desk, tapping a framed
  certificate high on the wall; MOM at the left, looking up from her chair with a polite, stiffening smile. CLEAN, desk
  and frame as outlines, `ce: "CERTIFICATE"`, sides flipped from S106 so it reads as an echo, not a repeat.

### humour-aside
- **Viewer feels**: a small laugh of recognition and a release before the serious point returns.
- **Staging**: setup, a held beat, then the reaction. Understatement over slapstick; the picture may contradict the fixed
  line. Never cartoon effects (swirling eyes, sweat drops) or symbols.
- **Camera**: the setup wider, the reaction near (REACTION or XCLOSE), often on white.
- **Colour**: WHITE or CLEAN.
- **Interrupt, word, edit**: funny-reaction; the reaction as an edit on the cue word, or a held still frame.
- **Example**: S134 "“Oops.”" The build gave DAD a sheepish shrug (one of its best subtle beats, R2 §7). v19 keeps the
  idea and adds the logic: S133 "Dad forgets the permission form." is a MEDIUM at the front-door outline, DAD with his keys,
  the unsigned form lying on the hall table behind him; S134 is DAD's REACTION, CLOSE: eyebrows up, mouth a crooked
  line, shoulders up to his ears, one hand rubbing the back of his head. `look: "back at the form, out of frame left"`,
  `ctx: "follows S133 where the form is seen"`, `ip: "funny-reaction"`. The child's harsher version (S135–S136) then lands
  as the contrast.

### advice
- **Viewer feels**: reassured and able — "I can do that".
- **Staging**: the advised behaviour done well, concretely: sitting next to the child, kneeling to the child's level,
  pausing before reacting, putting the phone face-down.
- **Camera**: MEDIUM to CLOSE at eye level, often both heads at the same height.
- **Colour**: CLEAN; the object the advice is about carries the colour.
- **Interrupt, word, edit**: a word when the advice is the chapter's key idea (SAFE); an edit for the moment the child
  responds.
- **Example**: S184 "But make failure safe enough to tell you about." The build showed SON with a big surprised face and
  his arms at his sides (R2 §2, "just stands"). v19: MEDIUM at the kitchen-table outline: MOM has pulled her chair next to
  SON's; the failed test lies face-up between them; her hand rests flat on the table near his, not on the test; SON's
  shoulders drop and his eyes move from the test to her face. `ce: "TEST mark"`, `ia: "MOM slides her chair next to his →
  SON's shoulders drop and he looks at her"`, `dist: "close"`, word SAFE on "safe".

### model-sentence
- **Viewer feels**: warmth and relief — "this is what it sounds like".
- **Staging**: the parent says it at the child's level; the child's answer is in the body (shoulders dropping, posture
  opening). A two-part sentence gives its first half to the parent's face and its second half to the child's reaction.
- **Camera**: CLOSE two-shot at the same height, OTS, FACE_HANDS.
- **Colour**: CLEAN; often `none` (the faces carry it) or the object the worry is about.
- **Interrupt, word, edit**: a word on the key word when it is the chapter's idea (SAFE, HONESTY); an edit for the
  child's response.
- **Example**: S95–S96 "“I'm stressed about money,” / “but you are safe.”" v19: S95 FACE_HANDS of MOM at the table
  outline, lowering THE BILL from her face, her eyes on SON out of frame right, `ce: "BILL stamp"`; S96 over MOM's
  shoulder to SON, his shoulders coming down from his ears, his eyebrows easing, MOM's hand now resting on his.
  `ia: "MOM puts her hand on his → SON's shoulders drop"`, `dist: "touching"`, word SAFE on "safe".

### peak
- **Viewer feels**: the full weight of the emotion — hurt, fear, love.
- **Staging**: slow down. Held, related frames; a short sequence of stills of one moment; the face; the distance between
  the people as part of the meaning.
- **Camera**: the wider frames of the peak scene in the peak colour field; the faces large, eyes-only where a look says it.
- **Colour**: PEAK with `pk: true` for the wider frames (NIGHT when the peak happens at night); face close-ups on WHITE.
- **Interrupt, word, edit**: large-face or visual-silence; few edits; a word only when it sharpens the meaning (SHAME,
  NOT REJECTION).
- **Example**: S197 "“I hate you!”" The build put SON's close-up in front of the storm-colour field. v19: S196 "The
  tantrum." is the peak wide in the chapter's PEAK colour (`pk: true`), MOM stopped in the doorway at the left; S197 is
  XCLOSE on WHITE, SON's mouth a huge open shout shape, eyebrows slammed down, `look: "toward MOM, out of frame left"`,
  `ctx: "follows the peak wide S196"`; S198 is MOM's REACTION on white — she does not shout back; she stops.
  `ip: "visual-silence"`.

### time-jump
- **Viewer feels**: time passing and its consequence.
- **Staging**: one anchor stays (the same door outline, the same object) while one thing changes (the child's age and
  height, how far the door is open). Echo with change: the anchor is recognisable, the camera is not the same.
- **Camera**: change the side or the size between the before and the after so the composition is new.
- **Colour**: CLEAN for the present and the future; MEMORY for the past.
- **Interrupt, word, edit**: the jump itself can be an image edit on the same frame (the boy becomes the teenager), which
  keeps the camera on purpose.
- **Example**: S65–S67 "Then: “Mom's busy.” / Then years later: / “She wouldn't understand anyway.”" The build's door
  that closes a little more over the years is one of its best recurring ideas (R2 §6). v19: S65 MEDIUM from the hall: the
  younger boy at his half-open door watching MOM pass with her phone; S67 from inside his room, the reverse: teenage SON on
  his bed, the door edge now almost shut between him and the hall — a split frame. The door is the anchor; the camera,
  side and composition change.

### ending
- **Viewer feels**: quiet resolve and warmth, without a perfect bow (Thomas: no overly happy endings).
- **Staging**: the recurring object's last meaning in a new picture; closeness at touching distance; room for the last
  words.
- **Camera**: slow, held; a close two-shot or a quiet wide.
- **Colour**: CLEAN or WHITE; the recurring object's colour.
- **Interrupt, word, edit**: the film's key word, once (SAFE); few edits.
- **Example**: S230–S231 "But they may remember exactly how safe it felt... / to tell you the truth." The build opened
  THE JAR at the kitchen table in a tinted evening room, with SAFE. v19: CLOSE two-shot at the same height on CLEAN, the
  bed edge as one outline: teenage SON sitting next to MOM, THE JAR open between them with its lid off; SON mid-sentence,
  MOM leaning toward him, eyes on his face. `ce: "JAR lid"`, `dist: "touching"`, word SAFE on "safe".

### Two more types, as examples of growing the list
- **inner-question** (the child's private fear, quoted: S87–S90 "“Are we losing the house?”" …). Viewer feels the
  child's fear in the dark. Staging: what he hears and sees, not a picture bubble — the light under the door, the
  parents' voices from below, him small in his bed. Camera: a far frame of him alone, then his eyes. Colour: NIGHT for the
  wide, WHITE for the eyes. Interrupt: visual-silence.
- **contrast-pair** (two lines built as opposites: S142–S143 "Adults receive context. / Children receive correction.").
  Viewer feels the unfairness. Staging: the same moment twice with one thing swapped. Camera: two compositions that
  mirror each other with sides flipped. Colour: CLEAN; each frame's own element. Interrupt: the second frame is the jolt.

---

## Sources
- Thomas and Muhammad: SOURCES.md A5, A6, A10, A14, A15, C, D, F; references/v19-principles.md §2.
- Seven Things measurements and examples: research/R2_build_audit.md §1, §2, §6, §7, §9, §10.
- Craft research: R3 §1 (S1 Murch, S2 StudioBinder on the extreme close-up, S3 30-degree rule, S4 Kuleshov, S5 inserts,
  S6 Block's contrast and affinity), §3 (proxemics and shot size), §5 (visual comedy), §7 (pace and arousing content),
  §8 (photographic framing words).
- Eyeline match: https://en.wikipedia.org/wiki/Eyeline_match
- Lead room: https://en.wikipedia.org/wiki/Lead_room
- Headroom: https://en.wikipedia.org/wiki/Headroom_(photographic_framing)
- Shot-reverse-shot, cutaways, coverage: https://www.studiobinder.com/blog/shot-reverse-shot-cutaways-coverage/
- 30-degree rule: https://en.wikipedia.org/wiki/30-degree_rule
- 180-degree rule: https://en.wikipedia.org/wiki/180-degree_rule
- Render lessons (natural angles, small figures): references/render-lessons.md
