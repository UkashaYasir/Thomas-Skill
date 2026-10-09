# Version 24 standard — Thomas's final word after Video 08 (read first; wins over every other file)

Source: Thomas's messages on Video 08, "Seven Types of Parents" (6–9 Oct 2026), and the build Muhammad rendered from
(`seven-types-build_3.jsx`, compiler v19 with the v20–v23 changes made during that video). Thomas approved Video 08 on
9 Oct with five points "for the next video… implemented from the very beginning". This file holds those points, quoted
exactly, and the decisions that turn them into rules. Where `v19-principles.md` or any other file says something
different, **this file wins**; everything v19 says that this file does not change still stands.

Thomas's words are the principles: applied across the whole script, exactly as written — no overdoing, no undoing. The
numbers below (two or three times larger, a change about every 3–5 seconds) are Thomas's own and stay "approximately",
judged by the moment; v19's rule against invented quotas still holds for everything else.

---

## 0. The sources, in order (later wins only where it changes an earlier point)

| # | When | What |
|---|---|---|
| T1 | 6 Oct | "the best version I have seen from you so far" — colour psychology, the helicopter example, the fire twice as big, words still missing |
| T2 | 7 Oct | "colors are not simply used more, but… intentionally and psychologically… text moments: fewer, but exactly at the right moments" |
| T3 | 8 Oct, 13:07 | eight general points: hand-drawn style, colour list, 2–3× objects, exaggeration, a change every 3–5 s, bold readable text, emotional contrast, consistency, duration |
| T4 | 8 Oct | Frame.io timestamp notes on Video 08 (scene-specific — §12) |
| T5 | 8 Oct, 21:20 | remove the numbers, the underline and the "cold, formal" font; fewer full titles; short playful words; colours "too dry", can "glow… almost like a rainbow effect when it fits" |
| T6 | 8 Oct, 23:58 | "not to fill each scene too much": ground neutral, fridge and window in black and white, too much green, no numbered title cards |
| T7 | 9 Oct, 00:07 | remove the fridge, furniture and cabinets; keep the window "with black outlines on a white background"; "ask yourself whether every object is actually necessary… simply remove it" |
| T8 | 9 Oct, 00:11 | "more zoom-ins, close-ups, and camera movements… reuse the same material with different zoom levels and framing" |
| T9 | 9 Oct, 12:40 | **approval** and the five standards for the next video (§1) |

---

## 1. The five standards (T9, verbatim) — every video, from the first frame

1. "**Colors:** Use stronger, brighter, and more vibrant colors on important objects to bring the scenes to life."
2. "**Zooms:** Add more frequent zoom-ins and close-ups on faces, eyes, hands, and important objects."
3. "**Emotions:** Avoid showing characters too small or too far away. Facial expressions and emotions must be immediately
   recognizable."
4. "**Text:** No unnecessary numbering, large titles, or decorative elements. Only short, playful words when they
   genuinely support the scene."
5. "**Dynamic visuals:** Keep scenes engaging through movement, camera changes, character reactions, and visual variety.
   Reuse existing visuals creatively through zooms and different framing."

And the standing instruction behind them (T7, T9): "start making these creative decisions independently… rather than
waiting for me to point out individual objects." "For the next production, I expect these improvements to be applied
consistently from the start, without requiring repeated revisions."

---

## 2. Background and places — white stage, black line, nothing extra

- **The ground is white.** "The clean white background is very good and should stay" (T1); "Our backgrounds should
  remain white and minimalistic" (T3). CLEAN is now pure white (`CLEAN_GROUND = #FFFFFF`); this closes v19's open
  ground-strip decision.
- **Set pieces are black line on white.** "black and white is enough for those elements" (T6); "simple with black
  outlines on a white background" (T7). Every set piece is a thin black ink outline with white fill — thinner than the
  characters' bold outlines, finished and closed. No fills, no tinted furniture, no coloured trees.
- **The ground stays neutral.** "the ground does not also need to be colored. It is too much" (T6). Wider shots get one
  thin ground line on white — never a coloured floor or grass plane.
- **Object necessity, decided by us.** "Review each scene carefully and ask yourself whether every object is actually
  necessary. If an element doesn't contribute to the story, emotion, or visual understanding, simply remove it" (T7).
  Before a frame is written, every set piece and every prop answers yes to one of: does it tell the story, carry the
  emotion, or make the moment understandable? Otherwise it is cut. The study scene is the model: the character and the
  colourful books; one window outline to say "home"; no fridge, no counter, no cabinets.
- **Balance white moments and place moments.** "the balance between minimal white scenes and environmental scenes will be
  very important" (Thomas, approving the plan for Video 08). Faces, objects and words land on WHITE; real moments keep
  their few black-line pieces on CLEAN. Neither runs a whole chapter alone (a check warns when a chapter has no white
  moment).
- **Keep it clean even when colours get stronger.** "please be careful not to fill each scene too much… The main focus
  must always remain on the characters and the important objects" (T6).

**What went wrong in Video 08 (so it never returns):** the v22 compiler filled every set piece with "its own soft colour"
and laid a coloured floor plane under wider shots (sandy ground at the campfire; mint fridge, sage counter, teal chairs and
a blue window in the study; grass-green ground, a green tree and an emerald bike on the path). Thomas cut all of it. The
v19 checks had flagged it; v24 makes it impossible in the compiler and keeps the checks failing it.

---

## 3. Colour — psychological, bright on the important thing, quiet everywhere else

- **Bright by default on the important object.** "Use stronger, brighter, and more vibrant colors on important objects"
  (T9); the colours were "too dry and slightly boring… they still need more life" (T5). The frame's colour focus (`ce`)
  is drawn in its **bright, vivid tone** unless the moment is deliberately quiet (sadness, absence, a held beat — then
  `calm`). The v22 default of a "calm, deeper everyday tone" is what read as dry.
- **Few strong colours per frame.** "not too many strong colored elements in the same scene" (T6); "We do not want
  everything colorful" (T3). One colour focus; a second coloured object only when the moment needs both (`ce2`, e.g. the
  phone and the F in one argument). Every other story object is black line with white fill. One object may hold several
  bright colours when that is its nature (the stack of books, the fire's orange and yellow, a rainbow burst).
- **One colour, one meaning, for the whole video** (T1, T3). The defaults:

  | Colour | Means | Typical objects and moments |
  |---|---|---|
  | **Yellow** | surprise, energy, attention, discovery | the "aha", the sudden idea, a surprise entrance, an exaggerated cutaway |
  | **Red** | conflict, frustration, stress, danger | the failed grade, the argument's object, a warning |
  | **Blue** | trust, safety, calm | the safe moment, the steady parent's object, reassurance |
  | **Purple / dark violet** | smartphones, digital distraction | every phone, tablet, screen that pulls attention |
  | **Green** | positive development, growth, an unexpected bright object | the step forward, the plant that grows, the bike he finally rides |
  | **Orange / warm yellow** | warmth, fire, positive highlights | the campfire, a hug's warm accent, a reward |
  | **Grey** | absence — colour drained on purpose | the absent parent, the empty chair, waiting |

  These are defaults, judged by context ("These meanings are contextual guidance"). Red is no longer "danger only": it is
  conflict, frustration and stress too (T3), still never decoration.
- **Glow and rainbow are drawn, not rendered.** "the colours can glow much more strongly, almost like a rainbow effect when
  it fits" (T5); "Make the smartphone glow more noticeable" (T4). In this flat style a glow is a **drawn halo**: one or two
  clean-edged rings, or a ring of short radiating strokes, in a lighter tint of the object's colour. A **rainbow burst** is
  a ring of short radiating strokes in several bright colours — for delight, discovery or reward only. Never a soft
  gradient, bloom or blur. At night a screen is the light in the room: its flat light wedge stays.
- **Drawn marks carry action, never decoration.** Video 08's approved frames used them: short ink dashes round a buzzing
  phone, dashes flicking off the flames, speed dashes on the rotor. Allowed, at the point of action: a few speed lines
  behind a moving ball, bike or arm; short impact strokes where a hand hits a table; buzz dashes round a phone; shine strokes
  (`gl`). Still out: sweat drops, steam, stars or swirls round a head, anger veins, blush marks, tears — and any graphic
  that only fills space ("No unnecessary… decorative elements", T9). Crying is drawn by the face and body (screwed-up
  eyes, a wobbling open mouth, shoulders up, mitten hands at the eyes), not by tears — as Video 08 did.
- **Positive moments look different from stressful ones.** "Positive scenes should feel visually different from the more
  stressful moments" (T4); "subtle warm color accents" on the hug and the achievement; "subtle visual highlights instead of
  maintaining exactly the same calm presentation" (T4). Warm: a flat warm light shape, the warm accent, people closer.
  Stress: a red focus, red tension marks, tighter framing, people apart. Sadness: grey, negative space, the calm tone.
- **Night stays dark blue-grey**, the colour with "a clear psychological purpose" (Video 05, confirmed in T4: "The darker
  atmosphere works well").

---

## 4. Objects, exaggeration and metaphors — bolder, bigger, still clean

- **Two or three times larger.** "Objects can also become two or three times larger when it improves the storytelling"
  (T3); "the fire could easily be twice as big and more dramatic. Important objects should sometimes dominate the scene
  for a moment" (T1). SCALE DOMINANT now means two to three times the normal size.
- **Exaggerated cutaways are allowed.** "if the voice-over mentions a helicopter, we can suddenly show a large exaggerated
  yellow or bright green helicopter behind the character for a few seconds. It does not always have to look completely
  realistic. We are allowed to exaggerate because that creates attention, action and keeps the viewer engaged" (T1).
  When the voice-over names a vivid concrete image, show it — big, bright, behind or around the character, with the
  character reacting. This replaces v19.1's removal of the helicopter-parent picture as a cliché: Thomas asked for it.
  The maturity test still holds — no hearts, stars, emoji or picture bubbles — but a big, real, exaggerated object is not
  a symbol icon.
- **Humour and exaggeration are channel identity.** "Humor and exaggeration are essential parts of our channel identity"
  (T3). Exaggerated reactions and impossible scale are in; childish symbols stay out.
- **Metaphors understood at once.** The control dials (Video 08) are the model: "a good visual concept".
- **A metaphor or an explanation enters with a surprise.** "Make the transition into this explanation more impactful and
  surprising" (T4, 07:20). The frame that opens it is a change in kind — a snap to white, the object bursting in big, a
  sudden jump in scale, a SNAP_ZOOM on its word — never a slow drift into a diagram. Its plan names the interrupt (`ip`);
  a check warns when the first frame of a metaphor family has none.
- **The metaphor stays visible inside the real scene.** "Strengthen the… contrast between the dial settings and the
  conflict" (T4, 07:40): when the story returns to the real moment, the metaphor object sits in it, showing the state that
  explains the moment (the dial on the wall turned to "control" while the argument plays).
- **Save the biggest picture for the peak.** A recurring object's biggest, brightest version belongs to its peak; earlier
  returns stay smaller (Video 05: the phone drawn huge in thirteen frames cheapened the one where it became a wall).
- **Names stay off objects.** A prop's name or text never names a character who is not in the frame ("SON's phone" in a
  frame without SON pulls SON in) — call it "the phone" or "his phone" (a check warns).
- **Letters on an object.** A single letter or number drawn on an object is allowed when the letter *is* the story — the
  oversized red F was "a strong concept" (T4). Never a label, a sign or a sentence.

---

## 5. Characters and emotion — closer, bigger on screen, pushed further

- "Avoid showing characters too small or too far away. Facial expressions and emotions must be immediately recognizable"
  (T9). WIDE is used only when the distance or the place is the point, and even then the characters fill enough of the
  frame that every face reads. MEDWIDE is the usual full-figure shot.
- "Push facial expressions and body language further. Use dramatic close-ups, exaggerated reactions, expressive eyes,
  active hands, and stronger emotional contrasts" (T3). Strength still matches the beat: a quiet sadness is held (tier Q),
  a conflict or a comic surprise is pushed to full.
- **"larger heads" (T3) means the camera closer** — decided by Muhammad on 9 Oct: "Larger head means camera close or like
  the closeup to get a sudden visual change to grab the audience attention." So the reference proportions stay locked, and
  a big head on screen comes from a **sudden close-up**: a REACTION or XCLOSE frame, or a punch reframe (`zm`) to the face,
  placed where the line turns, a feeling peaks or attention might drift. Every chapter with characters has at least one
  such moment (a check warns when one has none).
- "Keep the current hand-drawn stick-figure style. Avoid overly polished or AI-generated-looking visuals" (T3).
- "Maintain consistent character proportions, line thickness, facial features, colors, and object styling throughout the
  video" (T3).

---

## 6. Camera, zooms and rhythm — reuse before regenerating

- **Zoom into what matters.** "Add more frequent zoom-ins and close-ups on faces, eyes, hands, and important objects"
  (T9); "use more zoom-ins, close-ups, and camera movements focusing on the characters, their facial expressions, and
  important objects" (T8).
- **Reuse a still with new framing.** "You can even reuse the same material with different zoom levels and framing,
  keeping the viewer engaged without constantly creating new scenes" (T8); "Reuse existing visuals creatively through
  zooms and different framing" (T9). Each frame can carry a **zoom plan** (`zm`): Premiere reframes of the same image on
  cue words — punch to the face, the eyes, the hands or the object. A frame with a planned reframe is composed for it: the
  target large and clear enough to survive the crop (a face reframed to the eyes starts at MEDIUM or closer). Order of
  choice for more rhythm: reframe the still → a crop to a face or object → an edit of the image → a new frame.
- **A meaningful change about every 3–5 seconds.** "Aim for a meaningful visual change approximately every 3–5 seconds…
  However, every movement should support the story. Avoid unnecessary animation" (T3). A change is a new frame, an edit, a
  reveal, a reframe or a camera move with a reason. It is an editing guideline, not a count of generated images.
- **Vary the moves.** Zoom and pan "selectively, not exactly the same way on every image" (Video 05) still holds.
- **Action sequences move big and read easily.** "The basketball sequence could benefit from stronger movement and more
  expressive reactions"; "Keep the bicycle sequence clear and easy to follow" (T4). Each still in an action sequence is a
  big, clear change of pose (wind-up → throw → miss → reaction), with speed lines on the moving part; the camera and the
  place stay the same across the stills, the action moves one way across the frame, and the last still is a face reacting.
- **Conversations change framing.** "Add more variety in framing and camera perspectives" (T4, 06:30): an exchange moves
  between a two-shot, over the shoulder and reaction close-ups — never one framing for the whole talk.
- **No fragments at the frame edge.** A metaphor or story object in a close-up is either whole in the frame or left out —
  never a strip of it along the top of a face (Video 05: a cloud edge above four close-ups read as an error).

---

## 7. Text — short, playful, hand-drawn, only when it helps

- **Out:** numbered section titles and title cards ("The numbers should be removed completely"), the underline, "this
  current font style with the clean presentation look… too cold, too formal and too much like a slide presentation" (T5),
  large titles and decorative elements (T9). The 8 Oct distinction between "professional section headings" and keywords
  (T3) is superseded by T5 and T9: no section headings.
- **In:** "short, meaningful words that feel playful, emotional and natural inside the scene… more hand-drawn, more alive
  and more in the style of our stick-figure world. Words should support the emotion of the moment, not feel like chapter
  headings" (T5). His examples: "WAIT…", "ENOUGH!", "SAFE", "TRUST", "PRESSURE", "WHY?", "INVISIBLE", "AHA!".
- **Readable at once, even on a phone:** "clean, bold, highly readable text that works immediately, even on mobile
  devices" (T3); "sophisticated does not necessarily mean more effective".
- **Few, exactly at the right moment:** "fewer, but exactly at the right moments" (T2); "Only short, playful words when
  they genuinely support the scene" (T9). A word is a reaction or a feeling (WAIT…, ENOUGH!, WHY?) or the one idea of the
  line (TRUST, PRESSURE, INVISIBLE); never a term from a textbook ("FRUSTRATION TOLERANCE", "AUTHORITATIVE PARENTING"),
  never a sentence, never a number. A short closing question works ("WHICH DIAL?" — "The concept works").
- **The look:** bold hand-lettered capitals, like a thick marker in the same black ink as the stick figures — lively but
  clean, the letters slightly uneven in a hand-made way, never a geometric presentation font; flat, no outline, shadow,
  3D, underline, badge or number; black, or the meaning colour of the moment (red ENOUGH!, yellow AHA!, blue SAFE);
  about one eighth of the frame height, in open space beside what it is about, never over a face.
- **Where it is made: inside the frame's own image prompt, always** — decided by Muhammad on 9 Oct: "need text in image
  prompts not separate images". The word is lettered into the line's frame (`tx`, or `kw`, which compiler v24.1 letters
  in too). A WORD frame is a white frame with the word lettered into it, generated like any other frame — never an empty
  white image with the word added later. If Flow misspells a word, the Copy page's **word-fix edit** redraws it on the
  same image.

---

## 8. Emotional storytelling

- "We need stronger contrasts between frustration, sadness, humor, surprise, and positive emotional moments. Our audience
  should immediately feel what the characters are experiencing" (T3).
- "Every scene should create emotion, provide value, build curiosity, or entertain" (T3). A frame that does none of these
  is cut or merged into its neighbour's still with a reframe.
- "Create a stronger emotional contrast between frustration and the positive interaction that follows. Focus on facial
  reactions and timing" (T4). The turn from conflict to repair shows in three things at once — the faces, the distance
  (apart → close or touching) and the colour (red → warm) — with a held beat (tier Q, or a HOLD) between them so the
  change lands.
- "The indoor scene feels relatively calm. Create a stronger contrast with the exaggerated playground action that
  follows" (T4, 00:30): when a calm scene hands over to an action scene, the jump is made big on purpose — held and close
  before, exaggerated, bright and moving after.

---

## 9. Guarding against the opposite extreme (each point, and how it fails)

| Thomas asked for | The failure | The rule |
|---|---|---|
| brighter colours | every object coloured; coloured floors and furniture | bright on the focus only; set pieces black line; ground white |
| fewer elements | empty, lifeless frames | cut what does not serve — then make what stays bigger, brighter and acting |
| stronger faces | the same shocked face everywhere | the precise emotion of the beat, its strength matched to the beat |
| more close-ups and zooms | every frame a close-up; the viewer lost | establish the place, then go close; reframes on the cue word, with a reason |
| more words | titles and labels return | a short playful word, only where it lands a feeling |
| bigger objects | everything oversized | two or three times larger *for a moment*, where it tells the story |
| glow | soft rendered bloom, gradients | a drawn halo or a few radiating strokes |
| more movement | motion with no reason | every change supports the story |

---

## 10. What stays exactly as it is

Everything in v19 that this file does not change: the characters and the reference proportions; the seven features and
the interaction beat; close-ups that make sense (`look`, `ctx`); screen sides inside a scene; natural camera angles;
mature props and no symbol icons; recurring objects that evolve; the shot plan before production; edits, mask reveals and
sequences; no teeth; no clothing; one video per chat, delivered in one pass.

---

## 11. The video-08 build, version by version (history — never copy from it)

| Build change | What it did | Thomas's verdict | v24 |
|---|---|---|---|
| v20 | every story object kept its locked colour in every frame; set-piece line darkened to #6B7079 | "not too many strong colored elements" | one focus bright, others black line; the dark line kept, now black |
| v21 | one meaning per colour (`COLOUR_LOGIC`); `mute` absence frames in grey; the phone screen as the light at night | colour psychology approved; grey absence approved; "phone glow more noticeable" | kept |
| v21.1 | quiet editorial captions with a thin coloured underline | "remove the underline… too cold, too formal" | removed |
| v22 | calm/bright tone per prop, `accent` frames; set pieces filled in soft colours; a coloured floor plane; flat light shapes; foreground and slice | colours "too dry"; ground and furniture colour "too much" | bright by default; fills and floor plane removed; light, foreground and slice kept |
| v23 | bold geometric headline type; numbered section headings with a number badge | "I do not want these numbered section titles… avoid this cold formal font style" | removed; hand-lettered words only |

---

## 12. Video 08 notes as test cases (scene-specific — not rules for every video)

These were Thomas's notes on single scenes. They are kept as regression examples in
`assets/v24-samples/video08-regression/`, never copied as content into new videos.

- Campfire (00:00–00:10): the fire much larger, strong orange and yellow; the rocks fine; the ground not coloured.
- Phone (00:20, 01:40, 02:30): a strong purple phone; at night its glow more noticeable; the child's reaction exaggerated.
- Indoor → playground (00:30–00:40): the calm indoor scene contrasts with exaggerated playground action.
- The F (02:10–02:20): oversized, brighter red, the size contrast kept.
- Hug, piano, achievement (02:50–03:10): warm accents; the reward feels rewarding.
- Absent parent (04:40–05:00): grey atmosphere; loneliness through framing, body language, close-ups; the calendar as
  missing time (days crossed off).
- Table conflict (06:00–06:20): the father's face pushed further; the bike sequence clear.
- Family conversation (06:30–06:50): more framing variety; positive looks different from stressful.
- Control dials (07:20–07:50): a more surprising entrance; the dial setting tied visibly to the conflict.
- Study scene (T7): books colourful; one window in black line; no fridge, furniture or cabinets.
- Bike scene (T6): only the bike in strong colour; no green ground or tree.
- Section titles (T5, T6): no numbers, no title cards.
- Ending (08:50–08:57): "WHICH DIAL?" short and impactful, readable on mobile; no outro.
- Duration: up to 9:00 is fine (T3) — the script and its timing stay final.

---

## 13. Decided by Muhammad (9 Oct 2026)

1. "larger heads" = the camera close: a sudden close-up that grabs attention (§5).
2. Words live inside the frame's image prompt, never a separate image or a Premiere overlay (§7).

---

## 14. Scene by scene — how each rule is used, depending on the moment

Every frame starts with the feeling (`ft`) and the kind of moment. The table gives the starting choice for each kind;
the line itself decides the rest. Nothing here is a quota: a moment uses an extra only when it makes the feeling land.

| Moment | Camera | Stage and colour | Extras (scale, glow, marks, light) | Word | Motion |
|---|---|---|---|---|---|
| **Hook, the opening line** | the strongest picture of the video: a big object or a big face in the first frame | CLEAN or WHITE; the focus bright | an oversized object or an exaggerated cutaway; a drawn glow if it shines | only if one word lands the promise | push in, or punch to the face on the key word |
| **Chapter turn (a new point)** | a fresh place or a new state of the motif — never a title card | CLEAN; the chapter's colour by meaning | the chapter's signature object, bigger | a short playful word for the feeling, never a number or a title | a change in kind: a white break, a big face |
| **Explanation, a statement** | a real everyday moment at MEDIUM; sizes switch often | CLEAN; the object the line is about bright | a metaphor only if it adds meaning; scale on the object | usually none; the idea word if the line turns on it | a reframe to the face or the object every few seconds; an edit for a small action |
| **Dialogue, an everyday moment** | a two-shot, over the shoulder and reaction close-ups in turn — never one framing for the whole exchange; both faces readable | CLEAN; the object at stake bright | — | a reaction word (WAIT…, WHY?) only at the turn | a 3–5-still sequence if it is a key moment, else one edit |
| **Action, sport, play** | the setup readable, then big pose changes still by still, ending on a reacting face | CLEAN; the ball, bike or toy bright | speed lines on the moving part; exaggerated poses | rarely | a 3–5-still sequence, same camera and place, the action moving one way |
| **Opening a metaphor or an explanation** | a change in kind: the object bursting in big, or a snap to white | WHITE or CLEAN; the object bright by meaning | sudden scale | the idea word if it lands it | SNAP_ZOOM or SHAKE on the word; never a slow drift |
| **Humour, exaggeration** | the setup wide enough to read, then a punch to the reacting face | CLEAN; yellow for surprise | impossible scale, the cutaway, an exaggerated reaction | AHA! or WAIT… if it sharpens the joke | SHAKE or SNAP_ZOOM on the word; the reaction as an edit |
| **Conflict, frustration** | closer and tighter; faces pushed full | CLEAN; a red focus or red tension marks (`mk`) | the object of the fight bigger | ENOUGH! or WHY? in red | SHAKE on the hit word; the reaction as an edit |
| **Sadness, loneliness, absence** | open space around the person, then a slow push to the face; the figure still readable | `mu` grey for absence; the focus calm (`cm`) | the object that stands for the missing person (the crossed-off calendar) | rarely; a quiet word if any | HOLD or a slow push; tier Q |
| **Pressure, worry, fear** | the object looming over the figure, then the face | CLEAN, or PEAK at the peak; orange or red | the pressure object two or three times larger | PRESSURE | a slow push; the object grows across an edit |
| **Realisation, surprise, aha** | a sudden close-up: XCLOSE or REACTION | a WHITE break; a yellow focus | rays, or a rainbow burst for delight, on what was found | AHA! or WAIT… | SNAP_ZOOM on the word |
| **Warmth, reward, repair** | people closer, touching; a softer push; after a conflict, one held beat first | CLEAN; a warm light shape (`li`); green for growth, warm amber for warmth | rays on the reward; a rainbow burst for real joy | rarely (SAFE, TRUST) | a slow push; the hug as a sequence when it is the payoff |
| **Memory, the past** | as the moment needs | MEMORY | — | none | HOLD or a slow drift |
| **Imagined, "what if"** | bookended by the imagining face, close | WHITE; exaggeration welcome | big cutaway objects | WHY? or the like | cut in and out on the words |
| **Night** | close; the screen-lit face | NIGHT; the screen the only light, with drawn rays | — | none, or a white word | a slow push |
| **Rapid list** | one quick real still per item, the same person, sizes varied | CLEAN; each item its own colour | — | none | the cuts are the motion |
| **Ending, the question** | short: the motif object or the face | WHITE or CLEAN | a halo on the motif | the closing question, big (WHICH DIAL?) | a push in; no outro |

Wherever the line turns, a feeling peaks or attention could drift, the next frame or reframe is a sudden close-up (§5).
Wherever a still would hold well past five seconds, a reframe, an edit or a move with a reason comes in (§6).

---

## 15. Organised, never random (Muhammad's direction, Video 05)

Muhammad, 28 Sep 2026: "there should be no random scenes etc each and everything must be organized and there will be no
random vibes"; and, on the one-week structure that fixed it: "Perfect… add more scenes if we can, but it doesn't drift
too much or get random. All scenes or story do still feel connected."

- **A story world in the director's read.** One family, one stretch of time (a day, a week, an evening), and a spine
  object whose state we always know. A list script ("seven types…") gets this container so the points never feel like
  separate illustrations.
- **A place changes only when the story moves there** — time passes, or someone walks into another room — never for
  variety. Inside a scene the camera moves around the place instead of jumping to a new one.
- **Asides look the same every time and have a way in and out:** the past is MEMORY; an imagined or "what if" moment is
  bookended by the imagining face and plays on WHITE; a jump forward is CLEAN with the change shown in the people.
- The whole-film pass **J. Where and when** (`shot-plan-v19.md` §4) checks every place change against these rules.


---

## 16. The rule behind every Video 08 timestamp note

Thomas's Frame.io notes were about single scenes, but each one shows a rule. The scene fix stays in §12 as a test case;
the rule applies to every video. To find the frames a note means, use `scripts/timestamp-map.cjs` (with `--anchor` times
from the timeline — on Video 08 the 02:10–03:10 notes sit about 80 seconds earlier than the word-count estimate).

| Time | Thomas | The rule for every video | Where it lives |
|---|---|---|---|
| 00:00–00:10 | "The opening should immediately attract attention and create an emotional reaction." | The first frame is the strongest picture of the video: a big bright object or a big face, and a clear feeling. | §14 hook; qa: frame 1 is a hook |
| 00:20 | "Keep the smartphone visually distinctive with a strong purple color. Make the child's facial reaction more expressive and exaggerated." | Phones are purple in every video; a reaction to the phone is pushed to full. | §3 colours; qa-v24: phones purple |
| 00:30–00:40 | "Create a stronger contrast with the exaggerated playground action that follows." | Calm → action handovers are made big on purpose. | §8; pass C (contrast map) |
| 00:50–01:00 | "Strengthen the mother's facial expression, especially through her eyes, eyebrows, and head position." | In a close-up the head moves too — tilted, dropped, turned — never a straight neutral head. | §5; the seven features (qa-v19) |
| 01:10–01:20 | "Increase the humor and exaggeration. The basketball sequence could benefit from stronger movement and more expressive reactions." | Action sequences: big pose changes, speed lines, a reaction still; humour exaggerates the pose. | §6; §3 drawn marks; §14 action |
| 01:40–01:50 | "The darker atmosphere works well. Make the smartphone glow more noticeable." | Night stays navy; the screen is the brightest thing, with drawn rays. | §3; compiler night screen |
| 02:10–02:20 | "The oversized F is a strong concept… brighter red… Keep the exaggerated contrast in size." | A letter on an object when the letter is the story, bright, two to three times larger. | §4; `ol`, `sl`, TONE |
| 02:30–02:40 | "Important emotional moment! Increase the child's facial expression and consider a short dramatic close-up. Make the smartphone stand out clearly." | Every emotional peak gets a short dramatic close-up on its line; the object at stake stays the bright focus. | §5; qa-v24: peaks have a close face |
| 02:50–03:10 | "Strengthen the positive emotions with subtle warm color accents. Make the achievement feel more rewarding and visually meaningful." | Positive beats: a warm light shape or warm accent, a proud face close, the reward with rays — never a trophy icon. | §3; §14 warmth |
| 03:50–04:10 | "Create a stronger emotional contrast between frustration and the positive interaction that follows. Focus on facial reactions and timing." | Conflict → repair changes face, distance and colour together, with a held beat between. | §8; §14 warmth |
| 04:30–04:40 | "The text is readable but looks relatively ordinary. Improve its visual impact while keeping the typography simple and professional." | (Refined by T5 and T9.) Words are hand-lettered, bold, coloured by meaning, placed beside what they are about. | §7 |
| 04:40–05:00 | "The gray atmosphere fits the serious topic. Emphasize loneliness through stronger framing, body language, and emotional close-ups." | Absence is grey (`mu`); loneliness shows in open space, a curled body and a close face — the figure still readable. | §3; §14 sadness |
| 05:10–05:30 | "Make the sadness more visually powerful… The calendar could also be emphasized as a symbol of missing time or absence." | Sadness gets a close face; an everyday object that shows time passing carries the absence. | §14 sadness |
| 06:00–06:20 | "Good exaggeration and character movement! Push the father's facial expression further… Keep the bicycle sequence clear and easy to follow." | Conflict faces pushed full; sequences keep one camera, one place, one clear change per still. | §6; §14 conflict |
| 06:30–06:50 | "Add more variety in framing and camera perspectives. Positive scenes should feel visually different from the more stressful moments." | Conversations change framing; positive scenes look warmer, closer and calmer than stressful ones. | §6; §3 |
| 07:20–07:30 | "The control dials are a good visual concept. Make the transition into this explanation more impactful and surprising." | A metaphor or explanation enters with a surprise. | §4; qa-v24: metaphor entrances |
| 07:40–07:50 | "Strengthen the emotional reaction and contrast between the dial settings and the emotional conflict. This has the potential to become a memorable scene." | The metaphor stays visible inside the real scene, showing the state that explains it. | §4 |
| 08:10–08:30 | "Increase emotional expressions and make the positive interaction feel more rewarding. Use subtle visual highlights instead of maintaining exactly the same calm presentation." | Positive interactions get highlights (warm light, rays, closer faces), not the same calm frame again. | §3; §14 warmth |
| 08:50–08:57 | "The concept works. Check text size, contrast, and readability, especially on mobile screens. Keep the ending short and impactful without adding an unnecessary outro." | The closing question is big and readable on a phone; the ending is short; no outro. | §7; §14 ending |
| Priorities | "Consistent, impactful typography and emotional keywords. Stronger facial expressions and emotional close-ups. More strategic use of bright colors and contrast. Greater visual variety, humor, and exaggeration. Maintain our clean, recognizable hand-drawn style." | All five, as above. | §3–§7 |
| Scope | "These are targeted improvements, not a request to rebuild the entire video. Please preserve the elements that already work well." | A timestamp round changes only the frames it names; everything that works stays. | SKILL.md revisions |
| Runtime | "The current runtime of 8:57 is approved." / "Our videos can run up to 9:00 minutes" | Up to about nine minutes is fine; the script's timing stays final. | RULES-CARD §1 |
