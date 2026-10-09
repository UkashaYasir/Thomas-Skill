# Test report — the twelve tests from Muhammad's master prompt (9 Oct 2026, skill v24.3)

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

## Still to do with real images

Render S1, S4, S6, S7 and S8 of this sample first and check: the white ground stays white (no tinted floor); the set pieces
are thin black line; the focus colour is bright and alone; the hand-lettered ENOUGH! and the F are spelled right and look
drawn, not typed; the speed and impact strokes read as action, not decoration. Report any failure in
`references/client-feedback-ledger.md` §P and, where a script can catch it, add a check.
