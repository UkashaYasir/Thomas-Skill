# Seven Things — v19 worked example (lines 1–43)

The cold open and chapter one of "Seven Things Your Child Can't Tell You", re-planned with Thomas's direction of 5 Oct 2026
(`references/v19-principles.md`). The script lines are exactly the delivered ones; every picture is new. The compiled
build is `assets/build-template.jsx` (recompiled with the v25 compiler; the phone is purple since v24).

What it shows:
- every frame planned first: `ft`, `ln`, `idea`, `alt` (with the Version 9 staging and why it lost), `ce`, `cx`; `ia` and
  `dist` on every shared frame; `look` and `ctx` on every close shot with a face; `ip` on interrupts; `pk` on the one peak;
- the CLEAN ground with outline places, WHITE for face-only, eyes-only and the child-voice break, one MEMORY scene, one
  colour stage (S14, a wide frame — `pc: "RED"` since v25: the fear of letting her down), one NIGHT frame (S18);
- close-ups that make sense: the place shown first, gaze sides matching, reverse shots keeping the sides;
- real moments instead of symbols, humour from Thomas's list, and THE JAR — the recurring idea Thomas liked — used only
  where its meaning moves (hidden S2 → held S17 → set down between them S43);
- the whole cast, including BOSS redesigned with a flat-top (see `../seven-things-cast-lineup/`).

Build and check (from `assets/compiler-v24/`):

```bash
node assemble.cjs --data ../v19-samples/seven-things-v19
node ../../scripts/qa-all.cjs ../v19-samples/seven-things-v19/out/build.jsx      # EVERY CHECK PASSED
node ../../scripts/copy-page.cjs ../v19-samples/seven-things-v19/out/build.jsx ../v19-samples/seven-things-v19/out/copy.html "Seven Things — v19 sample"
```

The one warning left is expected: KEVIN, BOSS and SARAH are in the cast but appear after line 43.

## Before and after (Version 9 delivered → v19)

| Line | Version 9 | v19 |
|---|---|---|
| S3 "Not drugs." | a pill bottle towering over MOM | one of MOM's eyes snapping open and narrowing over the hug — the parent overthinking, eyes only on white |
| S4 "Not secret relationships." | the heart phone (the symbol Thomas named) | SON leans back out of the hug with a flat, unimpressed look |
| S5–S9 "Something much earlier… that they didn't." | jars on shelves, a thought bubble with a milk glass | a real memory: the spilled milk wiped away in one swipe while MOM is on the phone, then the teenager today staring at a glass of milk |
| S14 "…disappointing them feels terrifying." | tiptoeing across thin ice (a cliché metaphor) | the one PEAK: MOM smiles up the stairs while SON freezes at the top with the test crushed behind his back |
| S15–S17 "seven things… these might be the ones." | seven jars in a row | starting to say it at dinner, MOM's face already reacting, the never-mind shrug with his hand on THE JAR under the table |
| S19 "Number one." | THE JAR alone, the same opener as six other chapters | a white break: SON small in white space, lifting his eyes — no number on screen |
| S21 "not fix me." | a spanner aimed at his head | MOM reaches to flatten his hair while he talks; SON gently catches her wrist |
| S30 "…a federal investigation." | a pinboard of cards and string | the fridge door turned into an incident board, MOM drawing one more marker line |
| S34 "Can you sit inside this feeling with me…" | a blanket fort | SON pulls out the empty chair beside him and pats the seat; MOM sits in it at S42 |
