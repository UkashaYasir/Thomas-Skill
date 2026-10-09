# Aha moments, humour, the hook, and pop-ins

> "The scene should not simply exist. Something should happen inside the scene."
> "We need small surprises, visual changes and special moments throughout the video so the viewer's
> eyes stay engaged." — Thomas

Adapted from the Innes skill's `human-moments.md`, turned up for this client. Innes wants the
occasional "that was clever"; Thomas wants regular aha moments, drama on strong statements, and
human, relatable humour.

> **v19:** `v19-principles.md` §5 wins over anything here; humour, on-screen words, contrast and pattern interrupts are
> detailed in `humour-text-contrast-v19.md`. Thomas, 5 Oct: "More subtle humor… not childish humor"; "a few strong
> on-screen words… only at strong moments, not constantly"; "movement alone is not enough. We also need stronger visual
> switches." No cadences or counts: moments go where the script and the emotion put them.

## 1. Something happens inside the scene
Thomas's own list (Video 3) — reach for these whenever a frame is just "a character + an object + a
background":
- a sudden change of camera distance (a wide frame cutting to an extreme close-up) — natural camera
  positions only; exaggerated angles render badly
- a strong close-up on a reaction to something that just happened
- objects moving or falling (the phone slides off the table, the stack of books topples)
- a character visibly reacting to an event in that same frame
- a situation briefly escalating (voices rising → the door slam)
- a visual transformation of the scene (the room cools and empties as she leaves)
- an unexpected comparison (the teen's calendar vs the parent's calendar)
- strong contrast between two situations shown together (safe road / dangerous road)
- a small humorous beat when it fits

And his pattern interrupts (5 Oct): "suddenly white background; extreme close-up; one-word text;
unexpected object; funny reaction; strong pose; short metaphor; sudden silence visually; large facial
reaction." These are seed examples; any sharp, story-true switch that resets the eye counts. The plan
marks them in `ip`.

## 2. Scenes progress — start → problem or change → reaction → result
Every scene, not only every segment, should imply this shape. It doesn't mean every frame holds all
four beats; a run of frames covering one narrative unit should be checkable against it. Sketch
the four beats first, then write frames to fill them. This is what makes a viewer want the next
frame.

## 3. Aha techniques
Vary which one you use across a video:
1. **Visible reaction** — a strong, specific face right after a realisation, a setback or a small win.
2. **Scale surprise** — the thing that matters is suddenly huge (the unread message towers over him).
3. **An object with a flicker of personality** — the phone buzzing itself across the table toward her,
   the kettle lid starting to rattle.
4. **Quick before/after** — the same shot, one thing changed, shown back to back.
5. **Brief loss of control** — trying to hold, stack, balance or manage something and failing for a
   beat; human and physically plausible, never slapstick.
6. **Contradiction, then resolution** — the frame seems to show the opposite of the narration; the
   next frame reveals why. Only when the next beat pays it off.
7. **A reinforcing consequence** — a small visual result of the idea, not another picture of it
   (after the fight, his plate still full; her keys left in the door).
8. **Callback** — an object or shot from an early segment returning changed at the end.

## 4. Humour — human, relatable, never childish, never at the pain
Thomas: *"small humorous moments when they fit the script."* And 5 Oct: *"We also need more humor, but
not childish humor. Use small relatable moments like: exaggerated parent reaction; teenager giving a
'seriously?' look; awkward pause; parent overthinking something simple; visual contradiction between
what someone says and what they actually do; short funny reaction before returning to the serious
topic."* Build it as setup, a held beat, then the reaction; the picture can contradict the fixed
voice-over line. The funny that works for parenting is **recognition**: the mountain of laundry that
grew overnight, the teen answering "fine" with a face that says the opposite, the parent's "just five
minutes" that became two hours, the dog being the only one who listens. These are seeds — the method
for new ones is in `humour-text-contrast-v19.md`.
- Put humour on SIMPLE and connective beats, on relatable household moments, and in the lighter
  segments. Keep it away from the lines where someone is hurt, ignored, frightened or in danger.
- The joke is never on the child's pain or the parent's struggle; it's on the shared, familiar
  situation.
- Exaggeration for humour follows the same ceiling as everything else (no distorted faces).
- Humour goes wherever the script allows it, spread through the video. A forced joke reads worse than
  none.
- Mark it `moment: "humour: <what>"` in the beat data.

## 5. Spread of moments
Aha, surprise and humour beats are spread through the whole video rather than clustered, denser in the
opening, so the video never settles into one look; pace follows the emotion — more switches through
calm explanation, held related frames at the peaks. Mark each in the beat's `moment` field (`"aha: …"`,
`"surprise: …"`, `"humour: …"`) and interrupts in `ip`. A moment never replaces the core idea of the
frame.

## 6. The hook — the first seconds and the opening
Thomas standard 1: the first 1–3 seconds create immediate attention. No calm establishing shot.
Build it as a **cold open** — four shapes, escalation, and the payoff rule are in
`story-structure.md` §2; the points below are its visual checklist.
- **Frame 1 opens inside the conflict**: the door slam, the eye-roll close-up, the phone snatched, the
  knock on a closed door. Tier HOOK, a HUGE or LARGE face or a dramatic scale.
- **The opening** is storyboarded as one sequence: the camera distance changes clearly from frame to
  frame, the extreme close-ups look different from each other, the spine object is introduced with
  weight, pop-ins and camera moves land on the important words, no composition repeats, and a question
  the viewer wants answered. Variety comes from camera, faces, composition and contrast, not from
  background colour. The line list is fixed — the energy comes from inside the frames
  (`motion-and-energy.md` §2).
- If the script opens with a list or a promise ("seven signs…"), cut straight into a fast visual preview
  of what's coming — no number card and no static title card (history: the Video 1 "7" held for six
  seconds was the weakest moment of that video). Chapter numbers are not on-screen words.
- A one-word idea text (a WORD frame — pure white, the word added in Premiere) is a pattern interrupt;
  number and symbol slides are out.

## 7. Pop-ins — small moments added in the edit

Thomas doesn't want full animation. In Video 3 he asked that *"an important object can suddenly
appear, a warning symbol can pop up, something can briefly enlarge, an arrow or psychological symbol
can appear, or an object can have a small movement."* Since 5 Oct "generic symbols" are on his "Less"
list, so the object half of that note stands and the symbol half is retired: pop-ins are the story's
own objects. Muhammad adds them in Premiere. The skill plans them.

### The `pop` field
```js
pop: { what: "PHONE", on: "phone", type: "ADD", motion: "pops in with a clean cut" }
// or null
```
- **what** — a PROP key or an OVERLAY key (the element).
- **on** — the exact word in the script line it syncs to.
- **type**
  - `ADD` — the element is **not** drawn in the base frame; it's generated separately on a keyable
    background and pops into the frame in the edit. The element must not also be in that beat's
    `props` (the QA checks this).
  - `PUNCH` — the element **is** in the frame; the edit gives it a quick zoom, scale bump or shake.
- **motion** — pops in with a clean cut or a soft scale-in, slides in from the left, drops in from the top, grows for a
  beat then settles, shakes twice, blinks on — or interacts with the character: slides into their
  hand, bumps against them, buzzes toward them across the table (Thomas listed "interact with the
  character" explicitly). For an interacting pop the base frame leaves room where it lands, and the
  character's hand or gaze is already turned toward that spot.

### Overlay prompts
Every element used as an `ADD` pop gets one overlay prompt in the **Pop-ins** tab (one asset,
reused everywhere it pops). The compiler puts it alone, centred, on a perfectly flat chroma-key
background — green (#00B140), or magenta (#FF00FF) when the element itself is green — with no ground
line, no shadow and no other object, so it keys cleanly in Premiere (Ultra Key). The `OVERLAY`
dictionary holds story elements that only ever appear as pops (a notification card, a ringing alarm
clock), each with its locked colour and shape. Generic symbols — warning triangles, question marks,
arrows, ticks, hearts, stars, emoji-style icons — are not overlays any more (the checks flag them). On-
screen words are not overlay prompts: Muhammad types them in Premiere.

### What to pop, and how often
- Pop what the narration names at the moment it names it: the phone on "phone", the dashboard warning
  light on "warning", the padlock on "locked". The object reinforces the character; it never replaces a
  reaction.
- **Mask reveals first where they fit:** an object on one flat colour, touching nothing, hidden by a flat
  shape in Premiere until its word (`motion-and-energy.md` §9) — no extra generation. A change that
  can't be masked (a pose, a reaction, someone appearing) is an in-scene image edit
  (`motion-and-energy.md` §10). Picture bubbles standing in for a feeling are out.
- **Story objects only:** pop-ins are `PROP` keys — the real object the voice names or acts on, landing
  on that word, usually as a `PUNCH` on an object already in the frame. See `motion-and-energy.md` §4.
- Dense in the opening, then wherever a key statement needs a beat — never as decoration.
- Pops and camera moves work together (`motion-and-energy.md` §1); a `SNAP_ZOOM` or `SHAKE` on the same
  word as a `PUNCH` doubles the hit.
- On-screen idea words (TRUST, SAFE, LISTEN, SHAME, MISREAD, NOT REJECTION…) are not pops from this
  dictionary: Muhammad adds them in Premiere on the spoken word, in the one channel style
  (`humour-text-contrast-v19.md`), never a sentence, never small, only at strong moments.
- Don't pop an object on a line that's carried by a quiet close-up face — let the face hold.

## What this is NOT
- Not a licence for a gag or a pop in every frame; most frames still just communicate the idea well.
- Not a symbol layer: no hearts, stars, trophies, emoji-style icons or picture bubbles standing in for a
  feeling — "we are not creating a kids channel".
- Not an excuse to break the expression ceiling, the construction rules, or the no-camera-gaze rule.
- Not infographics: no stacks of icons, no labels explaining what the characters should be showing.
