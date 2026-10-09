# Story structure — the plan, the cold open, finished scenes, motifs, explainer lines

> **v25 — lookup only.** `v24-standard.md` and `RULES-CARD.md` win over everything below, then `v19-principles.md`.
> Where this file says otherwise, the current rule is: the CLEAN ground is the clean warm white #F7F6F3 and set pieces
> are thin **black** ink lines with white fill (never soft grey), the fewest the frame needs; the colour focus is bright;
> at most two coloured objects (`ce`, `ce2`); colour by meaning (red = conflict, frustration, stress, danger; phones
> purple); white by default, and an intense line turns the whole stage to its emotion's colour (`pc`, `v24-standard.md`
> §2a); words are short, playful and hand-lettered **inside the frame's own image prompt** — never added in Premiere,
> never numbers or titles; drawn glow and action marks are allowed; "larger heads" means sudden close-ups.

> "Our strongest advantage should remain the emotional parent–teen dynamic." — Thomas
> "We want clear peaks throughout the story so it feels like a real visual journey and not just a
> sequence of illustrations." — Thomas, Video 4 brief

This file turns Steps 2, 3 and 5 into things that live in the build and get checked: a written story
plan, a cold open that pays off, scenes that always finish, motifs that travel the whole film, and a
way to stage explanation lines without turning into an infographic.

> **v19:** `v19-principles.md` wins over anything here. The per-frame plan is `shot-plan-v19.md`; recurring objects follow
> Thomas's 5 Oct rule ("have a reason; evolve with the story; mean something different later; support the emotional
> progression. It should not return only because it looks good."); explanation lines are staged first as real everyday
> moments (`everyday-situations-v19.md`). No creative numbers: every choice is judged by the moment.

## 1. The story plan — written into the build, not kept in your head

Every build carries three planning blocks above the beats (`assets/build-template.jsx`), shown in the
artifact's **Plan** tab so Muhammad can check it — (no approval stop — the whole video is delivered in one reply) on a new
family or format:

```js
const STORY = {
  idea: "What the viewer should understand and feel by the end, in one sentence.",
  arc: "The emotional journey from the first frame to the last, in one or two sentences.",
  ending: "How it lands — relief, cautious closeness, a calm moment — in one line.",
};
const PLAN = [   // one row per segment, in order, matching the beats' `sequence` values
  { sequence: "00 Cold open", purpose: "…", feel: "…", mood: "CLEAN", metaphor: "", open: true, payoff: "S182" },
  { sequence: "01 The phone war", purpose: "…", feel: "…", mood: "CLEAN", metaphor: "tug-of-war" },
];
const MOTIFS = [ // the spine object and any recurring motif — PROP or WORLD keys
  // each state also says what it means now and which emotional step it supports
  { key: "PHONE", meaning: "the contested connection",
    arc: ["contested (the fight)", "taken (control)", "ignored (distance)", "freely given (trust returning)"] },
];
```

- **purpose** — what this segment does in the story (sets up the conflict, shows the cost, the turn,
  the repair). If two segments have the same purpose, one of them is filler.
- **feel** — the emotion the segment carries; the segments in order should read as an emotional
  journey with a clear low point and a turn.
- **mood** — CLEAN by default (very light neutral ground, outline places); PEAK only where the segment
  holds a planned emotional peak; NIGHT for night; MEMORY for the past (`style-and-colour-v19.md`).
- **metaphor** — the one metaphor the segment earns, if any.
- **open / payoff** — only for a segment that deliberately ends unresolved (the cold open): the ref of
  the later frame that resolves it. Every other segment must finish inside itself (§3).

## 2. The cold open — start inside the story, not before it

Thomas: *"The first 1–3 seconds must create immediate attention."* *"The first 30 seconds… need to
create immediate curiosity, tension and visual movement. The opening should already feel strong from
the very first image."* A cold open is how: the video starts in the middle of a charged moment, with no
title, no context and no calm establishing shot, and the viewer has to keep watching to understand it.

Build it as its own segment (`"00 Cold open"`), the opening stretch of the video:
- **Frame 1 is already emotional**: a HUGE or LARGE face, or a hands-only or scale shock, inside the
  conflict (the slammed door, the snatched phone, the eye-roll, a knock on a closed door). A big face
  comes early.
- **Pick a shape** (seed examples — invent others the same way):
  1. *In the middle of it* — the argument is already happening; we cut in at its hottest line.
  2. *Flash-forward* — show the story's lowest or strangest moment first (the parent sitting outside
     the locked door at 2 a.m.), then the video explains how we got there.
  3. *The calm about to break* — one ordinary second, then the thing that shatters it.
  4. *The question* — a striking image that makes no sense yet (the teen's room completely empty).
- **It escalates** — each frame raises the stakes or tightens the camera; no two frames at the same
  distance and no composition repeated. Variety comes from camera, faces and contrast, not colour; pop-ins
  land on the important words (`aha-humour-popins.md`); a PEAK colour only on its emotional peak.
- **It ends on an open question**, and the question is **paid off later** — the cold open is the one
  segment allowed to stay unresolved, so its PLAN row carries `open: true` and the `payoff` ref of the
  frame that answers it. An unanswered cold open is a broken promise.
- If the script opens with a list or a promise, go straight into a fast visual preview — no number card
  and never a held title card (chapter numbers are not on-screen words).

## 3. No scene stays unfinished

Two meanings, both enforced.

**In the picture.** Every shape is finished: closed outlines, no sketch lines, no half-drawn or faded
patches, furniture whole, and nothing cut off except by the frame edge. A place drawn as an outline is
finished too: a complete, closed thin black ink line drawing with white fill (v24) (`style-and-colour-v19.md`).
Write it that way ("drawn only as a thin black ink outline with white fill: a complete, closed line
drawing"); don't undercut it with words like "suggested", "implied", "partial" or "sketched" in beat
text.

**In the story.** Every scene runs **start → problem or change → reaction → result**. Mark it with the
beat's `stage` field (`START`, `PROBLEM`, `REACTION`, `RESULT`, or `""` for frames in between):
- A problem that appears must get a visible reaction and a visible result in the same segment — the
  phone is taken → he reacts → **the result**: the door closes, the plate stays full, the gap widens.
- An action that starts must land: the reach connects or is refused, the thing that falls hits the
  floor, the question asked gets a face in reply.
- Every segment reaches a RESULT. Only a PLAN row with `open: true` may end unresolved, and it names its
  payoff.
- Setups must pay off: when a `link` says a frame sets something up and names a ref, that ref exists.
- The last segment resolves the story's main tension (relief, cautious closeness), and brings back an
  early motif with a new meaning.

## 4. Spine object, motifs, callbacks

- The **spine object** is the one real object the conflict lives in, taken from the story (Video 1's
  phone: contested → taken → ignored → freely given). It is a MOTIF with an `arc` of states.
- A **motif** is any object or place that returns and means something more each time — the closed
  door, the coin jar, the empty chair. Keep them few and strong; they are what makes the ending land
  (Thomas praised Video 1's ending *"especially because you bring back visual motifs from earlier parts
  of the video"*, and on 5 Oct: *"The jar concept is a good example… Please continue doing this."*).
- Each appearance shows the motif **in a new state and with a new meaning**, described in absolute terms
  in that frame (the door now half open; the jar now nearly full), and with a new picture (a new camera,
  a new hand on it). Never "as before".
- A motif returns only when it has something new to say and supports the emotional step of that moment.
  "It should not return only because it looks good." How often and where it returns is a result of the
  story, not a target.
- A motif is always a real object from the story, never an invented abstract system (Thomas rejected
  the cord, the photographs and the drawings as meaningless).

## 5. Explainer lines — explaining without becoming an infographic

Much of every script explains: psychology, brain development, research, reasons, lists. Thomas's
structure for these: *"normal explanation scenes can be simpler and cleaner; emotional key moments
should get the stronger close-ups, facial expressions, eye direction, hands and body language; major
hooks or pattern interrupts can use stronger metaphors or more complex visuals."* So explanation lines
are usually SIMPLE tier — fewer elements, faster to read — but never a diagram, never text doing the
work, and never without a person in them.

Stage an explanation line with the first of these that fits:
1. **Show it happening to the family — a real everyday moment.** "Teens need more sleep" → SON asleep
   over his homework at the table outline while MOM checks the clock. The family is the example; the
   moments parents and teens recognise at once are in `everyday-situations-v19.md`.
2. **Before / after** — two halves of one frame (the character in one half, the other state shown with
   objects — a character never appears twice in a frame) or two frames with the same framing.
3. **The character inside a simple metaphor everyone knows** — "the teenage brain has a strong
   accelerator and weak brakes" → SON in a small car racing downhill, the brake pedal tiny. He reacts.
4. **Cause → effect across a few frames** — the explanation as a tiny sequence.
5. **A known physical model with someone reacting to it** — a seesaw, a battery level, a fork
   in the road, a kettle coming to the boil, falling dominoes — with a character's face telling us how it feels.
6. **Research / "studies show" lines** — show the finding's real-life consequence in the family, or a
   character's reaction to it; never a chart, a graph, a lab or a scientist.
7. **Lists ("three reasons…")** — each item its own mini-scene with a framing device that returns
   changed each time (the same doorway from a new side, the same table from above with a new object) so
   the viewer feels the list's rhythm; the voice says the number — no number card. An idea word for the
   item can land in Premiere.
These are seed staging patterns; a line that fits none gets a new one made the same way. Every
explanation frame still has a clear focus (the one colour element or the face), a readable feeling, a
stated camera, and passes the sound-off test. And whenever the explanation touches the parent–teen relationship, bring it back to the
two of them — that dynamic is the channel's strongest advantage.

## 6. Emotion runs through the whole film, not only the peaks

- The emotion never drops out for long: big faces and EMOTIONAL beats are spread through the film, and a
  run of SIMPLE frames is broken by a face, a reaction or a pattern interrupt before it feels flat.
- The `feel` field changes as the story moves: the segment feels in PLAN should read like a journey
  (tension → hurt → frustration → realisation → cautious hope), never five segments of "sad".
- Quiet explanation stretches still carry a feeling on the faces — guarded, curious, tired, softening.
- Emotional contrast is a peak too: a warm memory right after the coldest moment lands harder than
  either alone.

## 7. Step 5 story-pass questions (add to the ones in SKILL.md)
- Could someone tell this segment's story from the frames alone, sound off?
- Does every PROBLEM get its REACTION and RESULT on screen? Any action left hanging?
- Is the cold open paid off, and does the viewer feel the payoff as a callback?
- Does every motif return only with a new meaning and a new picture?
- Is any explanation line illustrated as a diagram, chart or label instead of a family moment?
- Does the emotion keep moving between segments?
