#!/bin/sh
# make a require-able copy of a build's data + compiler (everything before the UI) for analysis
f=$1; out=$2
end=$(grep -n "^const PROMPTS = " $f | cut -d: -f1)
sed -n "2,$((end))p" $f > $out
cat >> $out <<'X'
module.exports = { SEQUENCES: (typeof SEQUENCES === "undefined" ? [] : SEQUENCES), ROLE, MOOD, SET, WORLD, PROP, OVERLAY, SCRIPT, STORY, PLAN, MOTIFS, SKETCH, RAW_BEATS, EDIT_CUES, REVISIONS, PROJECT, PROMPTS, framePalette, buildPrompt };
X
