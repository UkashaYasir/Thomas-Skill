# QA lessons v18.3 — what a full read of 232 prompts found

Source: "Seven Things Your Child Can't Tell You", Version 6 → Version 7 (4 Oct 2026). Eight reviewers read every compiled
prompt, edit and sequence step. These are the error classes, most damaging first, with the fix the compiler or the frame
now uses. Read this before writing frames; the compiler handles the items marked (auto).

> **v19:** these error classes still apply to every build. `v19-principles.md` wins where a lesson below mentions a v18
> room rule (anchor pieces, wall colours); the v19 equivalents are noted in place.

## 1. Edits that fight their own base
- **Edit-only frame whose base already shows the result** (S57, S59, S172): the base text must show the *before* state —
  copy the previous frame's PICTURE, ACTION and PERFORMANCE word for word; the edit makes the change once.
- **Edit that contradicts the next frame** (S185 keys slip, but S186–S187 still hold them; S166 umbrella half open, S167
  closed): read the next two frames before writing an edit.
- **Edit that names something the base lacks** (a bin, a doorway, a plate, a spoon, an empty chair): the generator adds it.
  Name only what is drawn, or put the thing in the base.
- **Keep clause that freezes what changes** ("the ice stays exactly…" while cracks spread; "the colours stay…" while a new
  object appears): list only what really stays.
- **Several changes at once** (door shuts + boy sits + mother steps + face changes): one character's one action, or one
  object's state.

## 2. Placement that splits a person from what they hold
- Wrong: "centre — THE BIG CUSHION; right — DAD landing on the cushion". Right: "centre — DAD lying back on THE BIG CUSHION".
- Place pieces are fixed in the layout (hall door LEFT, hall table CENTRE, stairs RIGHT; kitchen table CENTRE; sofa CENTRE;
  bed CENTRE): move the people, not the piece. In v19 a piece is drawn only when the frame names it (as a soft-grey outline
  with white fill), so a giant object simply takes the space; `na: true` is legacy.
- The same people keep the same screen sides through a scene (S35–S39 MOM left, DAD right) — the 180° rule; vary sides
  between scenes.

## 3. Sizes that contradict
- One size per object per frame (auto: SCALE overrides; `small` props stay small). Never "one small cup" + "at least
  head-sized", or "about as tall as SON's head" + "twice its size" + "taller than him".
- Heights: SON's chin at MOM's shoulder at the same depth. "SON two-thirds, MOM half" at the back wall makes him taller.
  "MOM cropped at the knees" next to "SON filling half the frame" makes him a child — write "SON cropped at the shins, his
  head top at MOM's chin".

## 4. Faces the camera can't see, gazes into the lens
- Back views carry no face performance (BOSS seen from behind with "pupils on MOM" turns him round). Use profile or
  three-quarter when the face matters (S66, S178).
- "pupils straight ahead" in a frontal close-up is a look into the camera: give a target ("toward the right edge of the
  frame, at the boy off-screen").
- A sheet or object held toward the other person, shot in profile, is edge-on: turn it three-quarters to both (S82, S169,
  S180).
- A close shot needs a gaze target on the correct side (`look`): the eyes point toward where the other person was placed in
  the wider frame before.

## 5. Crops that cut the action
- Eyes-only shots: no mouth, hands, table or floor (auto crop text). Say "one eye … the other eye" — "her left eye" at frame
  left is mirrored.
- A HUGE face cannot show "both hands flat on the table"; a LARGE head-and-shoulders cannot show hands between the knees.
- A shrug needs LARGE, not HUGE (S62).

## 6. Colour words that paint the wrong thing (auto)
- "HERO COLOUR: THE JAR in tangerine" → an orange jar. Name the part: "THE JAR's tangerine lid; the glass stays clear".
- A FACE hero line that says "no other strong colour anywhere" while a turquoise phone is in frame.
- A FIELD frame described with the chapter's wall colour (lemon field, "lilac grey" in the colour line).
- Outdoor frames told about "walls, quiet furniture and a near-white floor".
- v19: a CLEAN frame whose text still names a tinted wall or coloured furniture (the checks fail it); a FACE hero with a
  colour element named — face frames carry no colour.

## 7. Words that render badly
- "grin" (teeth) → "a closed smile" / "an open smile"; "face crumples", "wobbles", "steeply" (tilted room); "pupils wet",
  "glassy" (shine); "fading out" (transparency); "a tiny folded test paper" (grade letter) → "blank, one small red circle";
  "a calendar grid" (numbers); "sums" (digits); "wire fence" (mesh).

## 8. Undefined incidental objects
- Cups, plates, forks, shopping bags, a notepad, footprints, a book: either cut them (preferred — fewer objects) or describe
  them once in plain colours with "no logos, letters or print".

## 9. One-sided beats
- When the point is that nobody reacts (the mother on her phone, the parents not looking up, the father asleep, the teen
  who wants attention but pretends not to care), the INTERACTION rule fights the picture. Use `os: "LITTLE BOY watches and reaches; MOM does not react at all — her eyes never
  leave THE PHONE."`.

## 10. Render lessons (v18.4, first 15 renders)
- "MOM wipes the counter" → a sink, tap and fridge appeared despite "no sink" in the setting. Write "the bare flat counter
  top", drop the fridge from the placement, and keep the kitchen avoid list.
- Seven jars on a shelf with SON standing under it → the seventh jar was hidden behind his head. Write "all seven fully
  visible" and "his head below the shelf and clear of every jar".
- "left — the edge of the round table" in a close-up → a big grey shape at the side. A table edge goes "along the bottom of
  the frame".
- LITTLE BOY copied from SON with the teen's head ratio → reads as SON. Give the child a slightly bigger head for a short
  body (about one-third of his height) and keep the size line in solo frames too.
