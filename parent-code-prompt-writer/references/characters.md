# Characters — built from the reference images

> **v25 — lookup only.** `v24-standard.md` and `RULES-CARD.md` win over everything below, then `v19-principles.md`.
> Where this file says otherwise, the current rule is: the CLEAN ground is the clean warm white #F7F6F3 and set pieces
> are thin **black** ink lines with white fill (never soft grey), the fewest the frame needs; the colour focus is bright;
> at most two coloured objects (`ce`, `ce2`); colour by meaning (red = conflict, frustration, stress, danger; phones
> purple); white by default, and an intense line turns the whole stage to its emotion's colour (`pc`, `v24-standard.md`
> §2a); words are short, playful and hand-lettered **inside the frame's own image prompt** — never added in Premiere,
> never numbers or titles; drawn glow and action marks are allowed; "larger heads" means sudden close-ups.

The reference images and character sheets in `assets/characters/` are the source of truth for MOM
and SON: `mom-body.png`, `mom-portrait.png`, `son-body.png`, `son-portrait.png` (the originals), plus
the approved sheets `mom-turnaround.png`, `mom-poses.png`, `mom-expressions.png`, `son-turnaround.png`,
`son-poses.png` and `mom-son-height.png`. **`view` them all before writing any character frame**, every
video. Muhammad attaches the same images in Flow on every
generation. If he shares updated references, view those and update the ROLE text to match before
writing anything.

> **v19:** `v19-principles.md` §3 and §6 win over anything here. New characters are designed with
> `cast-design-v19.md`; performances and interaction follow `acting-and-interaction-v19.md` (every performance names
> eyes, eyebrows, mouth, head position, hand gesture, posture and eye direction).

## The rule behind every character prompt
The reference image carries identity; the prompt carries the moment. Long character descriptions
fight the reference and produce a blend, so the character text in a prompt is short and never
contradicts the images. Video 4's hook renders drifted for three reasons that all came from the text,
not the images:
1. The prompt said heads were "about one-seventh of the height" while the references show a head of
   about one-fifth (MOM) and one-quarter (SON). The generator split the difference, so head sizes
   jumped from frame to frame.
2. The colour block said characters were "pure white fill", which turned stick arms and torsos into
   white tubes and blocks (S1's arm, S5's and S8's torsos).
3. Character prompts ran to about 14,000 characters, burying the story and the reference anchor.
The compiler now puts the reference anchor first, the story moment second, a short construction block
that agrees with the images third, and keeps character prompts around 5,000–9,000 characters.

## What the references show (measured)
Shared construction:
- **Head:** a large round white head, outlined in a clean medium-thin black line; small half-round
  ears on both sides at eye level.
- **Eyes:** big white circles with a large solid black pupil, about half the width of the eye.
- **Eyebrows:** short, thick black dashes with rounded ends, nearly straight (MOM's arch very slightly).
- **Mouth:** a tiny, thin short line when neutral; it changes shape with the emotion. In prompts the mouth is always
  written as a clear shape for the emotion (an open circle, a wide oval, a deep downturned curve, a wavy line, a tight
  pressed line, a clear smile), never "a small … line" — the generator draws that as a neutral dash.
- **Body:** one thin black line from the neck down; the arms curve out from the top of that line like
  rounded shoulders; every arm and leg is one thin line with no width and no fill.
- **Hands:** small white rounded mittens with one thumb bump.
- **Feet:** small flat white ovals — always drawn when the feet are in frame.
- **Line:** one consistent medium-thin black line everywhere, about half a percent of the image height.

MOM (`mom-body.png`, `mom-portrait.png`):
- Solid black hair parted softly at the centre, meeting the forehead in a small point, framing the
  face down past the ears, with one thin strand hanging below each ear toward the jaw; one round bun
  on top marked with two or three thin curved lines.
- Round face. The round face alone is about one-fifth of her standing height; with hair and bun the
  head is about a third. Body line about one and a half head-heights, legs about two and a half,
  hands hanging just below the hips.

SON (`son-body.png`, `son-portrait.png`):
- Solid black messy spiky hair in jagged pointed clumps; a fringe of pointed tips falling over the
  forehead to just above the eyebrows; spiky tips sticking out at the sides above the ears.
- Face round, a touch taller than wide. The face is about one-quarter of his standing height —
  a bigger-looking head on a shorter body than MOM. Body line about one and a third head-heights,
  legs about one and a half. Clearly shorter than MOM: standing together (`mom-son-height.png`) he is
  about four-fifths of her height, his chin at about her shoulder and his face clearly lower than hers.

## Characters without reference images
Only two reference images exist, MOM and SON. Every other character — and the cast grows with the
interaction a story needs — is built by copying one of them (adults from MOM, teenagers from SON) and
changing only the hair (a beard or moustache counts as hair), the size and age, and small accessories where they tell people apart or cue the role, all described in the ROLE text. Every character has
hair with its own outline: never bald, never "no hair", never a featureless round head, and no two roles
share the same hair outline (`cast-design-v19.md`). If a new character recurs across videos, ask Muhammad
for an approved image of them and add it to `assets/characters/`.

## Writing character frames
- Name the attached image each character comes from ("MOM is exactly the attached MOM reference").
  The `REFERENCE_LOCK` constant does this; keep it as the first block after the frame line.
- Never write a proportion, head size, eye size or hair detail that contradicts the images.
- Say what the body *does*, not what it is: the construction block already covers the build.
- Close-ups: say which parts are in frame (eyes and brows, face and hands, head and shoulders), which
  way the eyes look and toward whom (`look`), and what makes the close-up make sense (`ctx`: it follows a
  wider frame of the place, the hands and object are in frame, the other person's shoulder is in the
  foreground…). A face alone on pure white is right when the place and the gaze were established
  (`camera-and-closeups-v19.md`); the head shape stays whole with open space on the side the eyes look.
- Wide group frames: state both characters' hair in the framing when the mood is NIGHT (the compiler
  also adds a navy-not-grey, black-hair lock to every NIGHT frame).
- Hands-only frames: short forearms rising from the bottom edge, or the bottom corners for two people;
  never one big forearm from a corner (it renders as a white tube) and never two arms from opposite side
  edges (they render as long cables).

## Character sheets — approved and attached every time
Generated in Flow from the references (Sept 2026) and approved by Muhammad:
- `mom-turnaround.png` — front, three-quarter, profile, back.
- `mom-poses.png` — sitting on a box, walking, holding a rectangle, palm held out.
- `mom-expressions.png` — angry, sad, shocked, calm smile.
- `son-turnaround.png` — front, three-quarter, profile, back.
- `son-poses.png` — sitting on a box, slouched walk, holding the phone, crouching.
- `mom-son-height.png` — the two together: SON about four-fifths of MOM's height.

Known quirks to keep out of the prompts: some of MOM's sheet mittens show a small cuff band at the wrist
(the originals have none — prompts say "no cuff"); MOM's profile has a tiny nose point, fine for profile
views only. The first SON expression sheet drew teeth in the angry face and was held back; when a
version with a plain black open mouth is approved, add it as `son-expressions.png`. Thomas's 5 Oct note
("We need stronger facial expressions… This is one of the biggest areas we can still improve") makes an
approved SON expression sheet worth asking Muhammad for.

Muhammad attaches the originals plus the relevant sheets on every frame; `REFERENCE_LOCK` names both.
To add a sheet later, use the same prompt pattern (attach both references of the character, plain white
background, four views in one row, "exactly as the reference images", flat 2D, no shadows, no text),
check it against the originals (head size, hair, big pupils, thin unfilled body, feet, no teeth), then
add it here and to `assets/characters/`.
