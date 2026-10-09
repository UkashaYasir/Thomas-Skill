# The car ride — v19 generality test (not a Parent Code script)

A short test script written to check that the v19 system handles a topic far from "Seven Things". It is not for
publishing. It covers:
- new characters made with the cast method: LILY (braid), GRANDMA (curls, round glasses), COACH (cap), and YOUNG MOM —
  MOM at sixteen, linked with `sameAs` so she keeps MOM's bun;
- new places as outline cues: the car (windscreen, steering wheel, seats, dashboard, side window), the road, the football
  pitch;
- a NIGHT drive whose face close-ups go WHITE, a hands-only insert that stays NIGHT, a MEMORY, one colour stage on a wide frame (S11, `pc: "GREY"` since v25 — being left out), a
  WORD frame (SAFE), an OBJECT frame with a mask reveal;
- every shot type, humour (the escape that isn't; the parent who swivels round), love shown through behaviour (three words
  and one squeeze, eyes on the road), and a recurring object that changes meaning (THE RADIO DIAL).

What the test found and fixed in the skill:
- the cast bank's GRANDMA and GRANDPA said "her/his body line", which the anatomy check rejects → now "standing line";
- several expression seeds said "mouth a small …", "half-lidded", "chest line" or "steeply", which the checks reject →
  reworded in the acting, everyday, humour, props and camera files;
- a blue object on a NIGHT field fails the colour check → style-and-colour-v19.md §1.4 now says to use a warm hue at night;
- hand-sized objects need `small: true`, or a hero object is written "at least head-sized" → noted in
  data-fields-and-build.md.

Build (from `assets/compiler-v24/`): `node assemble.cjs --data ../v19-samples/car-ride`, then `qa-all.cjs` — every check
passes.
