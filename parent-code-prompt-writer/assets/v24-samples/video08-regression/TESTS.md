# Test report — the twelve tests from Muhammad's master prompt, and the v25 tests (9 Oct 2026, skill v25)

What was run: the compiler and every check on this sample, on the template smoke test and the three v19 samples; the
planted-mistake copy of this sample (`/tmp/neg` in the session: a numbered title, a "GRADE F" label, a glow with no focus,
a reframe whose cue and target are not in the line or frame, an off-white ground); and Video 08's own 263 frames compiled
with compiler v24. **No image has been rendered** — every result below is about the prompts, never the pictures.

| # | Test | Expected | What happened | Result |
|---|---|---|---|---|
| 1 | Colour overload — many objects that could be coloured | one focus bright, the rest black line | Video 08's study frame (books, laptop, phone) compiles to "THE BRIGHT COLOUR FOCUS… THE PHONE… Every other object and every set piece is black line with white fill"; the compiler cannot colour more than `ce` + `ce2`; qa-v24 fails a frame with more than two | Pass (prompt) |
| 2 | Unnecessary furniture around a studying child | clutter removed | Sample S4 draws a table, a chair and one window only; on Video 08 qa-v24 lists the five-piece kitchen frames (S21, S49…) for review; set-piece fills and floor planes are gone from every compiled prompt | Pass (prompt); the cut itself is a plan decision |
| 3 | Emotional close-up | the right face, gestures and framing at the peak | qa-v24 warns on peaks without a close-up (it found car-ride S11 and seven-things S14); sample S7 has a punch to SON's face on "slams" | Pass |
| 4 | Character interaction | a readable action and reaction | qa-v19 fails a shared frame without `ia` and `dist`; samples S2, S3, S7, S8, S10 pass | Pass |
| 5 | Organic typography | a short playful word, no numbered title card | planted "03 THE ANGRY PARENT" fails three checks; Video 08's seven numbered titles, the title card and "THE FIXER PARENT" fail; ENOUGH! and WHICH DIAL? compile as hand-lettered words with no underline | Pass |
| 6 | Colour psychology on a phone | a purple phone, nothing else coloured | qa-v24 flagged the template's turquoise phone (now purple) and Video 08's grey MIA_PHONE; sample S3 colours only the purple phone | Pass |
| 7 | Visual metaphor | a simple metaphor with a surprising entrance | qa-v24 warns when a metaphor's first frame has no interrupt (it found Video 08 frames); sample S2 (the helicopter) enters with `ip: unexpected-object` and a SHAKE | Pass |
| 8 | Scene variety | no repeated framing | qa-v19 caught the first draft of this sample (S1/S2 and S3/S4 at the same size and angle) until they were changed | Pass |
| 9 | Style consistency | same characters, line, colours | every prompt carries the reference, hand and object-consistency locks (qa, qa-render-risk, qa-consistency pass) | Pass (prompt); **visual: not executed** |
| 10 | Image reuse | reframes before new images | `zm` reframes compile into CLARITY lines and the Copy page; the planted reframe with a wrong cue and target fails two checks | Pass |
| 11 | Latest instruction wins | numbered headings (8 Oct) lose to "no numbered titles" (8 Oct night, 9 Oct) | the heading path is gone from the compiler; every heading-style word fails | Pass |
| 12 | Client isolation | this channel's rules never reach another client | single-client skill; the description excludes the Innes channel; no shared files | Not applicable |

## v25 tests (Muhammad, 9 Oct: white by default, colour at intensity, the fewest pieces; the audit fixes)

What was run: this sample (15 lines, two inserts), the three v19 samples, `assets/build-template.jsx`, the compiler's smoke
test and Video 08's 263 frames recompiled with compiler v25; two planted-mistake copies (`/tmp/v25neg`, `/tmp/v25neg2` in
the session); and Video 08's frames compiled with the v24.3 compiler from `main`, for the contradiction scan.

| # | Test | Expected | What happened | Result |
|---|---|---|---|---|
| 13 | Intensity ladder | an intense line turns the stage to its emotion's colour, the close-up goes white, the film returns to white | S12 compiles to "one flat, even vivid red (#E2443A) field… the characters stay pure white"; S13 is a WHITE close-up; S14 back on CLEAN with warm light; S15 a lemon-yellow stage | Pass (prompt) |
| 14 | Nothing vanishes on a field | an object, mark or word in the field's own hue is drawn white or black | S12's red test is "drawn white with a bold black outline", its red marks "bold black ink"; S15's OH! and marks are black on yellow; a hue table run on all six fields turns only same-hue objects white (the purple phone on violet, the bike on green…) | Pass (prompt) |
| 15 | Peaks reach colour | a peak that stays on the plain white stage is listed | a planted peak with no stage, marks, glow or light is listed; the F on white (oversized bright focus) counts as a lift; Video 08 has none | Pass |
| 16 | Colour misuse | a stage with no `pc`, two colours in one moment, more than five fields in a row, a field behind a face close-up, `pc` with another mood, an unknown `pc` | listed (WARN), listed, listed, FAIL (qa-v19), compiler error, compiler error | Pass |
| 17 | Not monotonous | about half a minute with no colour lift is listed, calm on purpose allowed | a planted 70-s white stretch is listed; it also found the Seven Things sample's S19–S43 (56 s) — fixed with marks and warm light on its key lines | Pass |
| 18 | Fewest pieces | a close shot with more than one piece, any shot with more than three, is listed | the planted six-piece study is listed; on Video 08 it lists 26 frames (up to six pieces) — the clutter Thomas cut; the samples were trimmed | Pass |
| 19 | Contradiction scan | a prompt whose sentences disagree fails | Video 08 on the v24.3 compiler fails four rules (11 + 25 + 8 + 42 prompts); on v25, every build passes; a planted template change fails | Pass |
| 20 | Inserts | an insert compiles, lands on its word, shows on the pages and in the timestamp map, and passes every per-frame check | S14b (hands) and S15b (the aha close-up) compile, appear after their lines on the Copy page, map as "S14+S14b"; a wrong cue word fails; an insert without its line's frame or cue word is a compiler error; the per-frame checks caught both inserts' unfinished performances until they were written | Pass |
| 23 | A colour stage's close-up | the close-up of an intense line is on white, never a crop into the field | a punch into a face on a PEAK frame is listed and no longer counts as the peak's close-up; a WHITE close-up insert counts; the sample peaks (S15, Seven Things S14, car-ride S11) carry white inserts | Pass |
| 21 | Varied moves | the same move four frames running is listed | a planted run of four PUSH_INs is listed; Video 08's longest run is three | Pass |
| 22 | Old samples on v25 | every sample and `build-template.jsx` compile and pass | all pass; the Seven Things phone is purple; its peak and car-ride's peak carry `pc` | Pass |

## Still to do with real images

Render S1, S4, S6, S7, S8, S12 and S15 of this sample first and check: the white ground stays white (no tinted floor); the set pieces
are thin black line; the focus colour is bright and alone; the hand-lettered ENOUGH! and the F are spelled right and look
drawn, not typed; the speed and impact strokes read as action, not decoration; the colour fields stay flat and even, the white
characters stay white on them, and the white test and the black OH! read clearly. Report any failure in
`references/client-feedback-ledger.md` §P and, where a script can catch it, add a check.
