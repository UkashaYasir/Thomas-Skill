# Seven Things — cast lineup (test renders)

Three frames to render once in Flow, with the MOM and SON references attached, before any frame of the video is generated
(`references/cast-design-v19.md` §4):

1. the whole cast in one row from the front — MOM, SON, LITTLE BOY, DAD, KEVIN, SARAH, BOSS;
2. BOSS up close and surprised — the redesign (a neat flat-top instead of the old round bald head) must hold a strong face;
3. the same row from behind — the hair outlines alone must tell everyone apart.

Check: nobody bald; no two hair outlines alike (LITTLE BOY shares SON's hair on purpose — he is SON at seven); heights as
written; accessories small and dark; no clothing. If anything drifts, fix the ROLE text, re-render, then lock it.

Build (from `assets/compiler-v24/`): `node assemble.cjs --data ../v19-samples/seven-things-cast-lineup`, then
`qa-all.cjs` (one expected warning: the row frames are longer than a normal character prompt because every ROLE text is in
them).
