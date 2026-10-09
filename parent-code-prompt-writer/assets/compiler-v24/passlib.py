# passlib.py — helpers for frame-level fix passes (Version 7).
# Usage in a pass file:   exec(open(os.environ.get("ROOT", os.getcwd()) + "/passlib.py").read())   (ROOT = the video folder with segs/ — default: the current folder)
#   ... calls ...
#   save("pass13_c1")
# Every helper prints "MISSING ..." and counts a failure when its old text is not found, so a pass never half-applies silently.
import re, glob, os
ROOT = os.environ.get("ROOT", os.getcwd())
FILES = sorted(glob.glob(ROOT + "/segs/seg[0-9][0-9].cjs"))
SRC = {f: open(f).read() for f in FILES}
FAILS = []

def _where(n):
    for f, s in SRC.items():
        if ("F(%d, {" % n) in s: return f
    raise Exception("no frame %d" % n)

def _span(s, n):
    i = s.index("F(%d, {" % n)
    ends = [x for x in (s.find("\nF(", i + 5), s.find("\nE(", i + 5), s.find("\nQ(", i + 5), s.find("\n};", i + 5)) if x > 0]
    return i, (min(ends) if ends else len(s))

def sub(n, a, b, count=1):
    """replace text a with b inside frame n's F(...) block (all fields)."""
    f = _where(n); s = SRC[f]; i, j = _span(s, n); seg = s[i:j]
    if a not in seg: print("MISSING S%d: %s" % (n, a[:100])); FAILS.append(("S%d" % n, a)); return
    SRC[f] = s[:i] + seg.replace(a, b, count) + s[j:]

def suball(n, a, b):
    sub(n, a, b, count=-1)

def setf(n, key, val):
    """set or replace a simple field: val is source text, e.g. '"Son"', 'true', '["JAR", "tell", null, "(…)"]', 'null'."""
    f = _where(n); s = SRC[f]; i, j = _span(s, n); seg = s[i:j]
    pat = re.compile(r'(\b%s: )("(?:[^"\\]|\\.)*"|\[[^\]]*\]|true|false|null)' % re.escape(key))
    if pat.search(seg): seg2 = pat.sub(lambda m: m.group(1) + val, seg, count=1)
    else: seg2 = seg.replace("F(%d, { " % n, "F(%d, { %s: %s, " % (n, key, val), 1)
    SRC[f] = s[:i] + seg2 + s[j:]

def delf(n, key):
    """remove a simple field from frame n."""
    f = _where(n); s = SRC[f]; i, j = _span(s, n); seg = s[i:j]
    pat = re.compile(r'\b%s: ("(?:[^"\\]|\\.)*"|\[[^\]]*\]|true|false|null), ?' % re.escape(key))
    if not pat.search(seg): print("MISSING field S%d.%s" % (n, key)); FAILS.append(("S%d" % n, key)); return
    SRC[f] = s[:i] + pat.sub("", seg, count=1) + s[j:]

def _eline(ref):
    for f, s in SRC.items():
        k = s.find('\nE("%s", ' % ref)
        if k >= 0: return f, k + 1, s.index("\n", k + 1)
    return None, -1, -1

def esub(ref, a, b):
    """replace text inside the edit line E("Sxx", ...)."""
    f, i, j = _eline(ref)
    if not f: print("MISSING edit %s" % ref); FAILS.append((ref, "edit")); return
    s = SRC[f]; line = s[i:j]
    if a not in line: print("MISSING edit %s: %s" % (ref, a[:100])); FAILS.append((ref, a)); return
    SRC[f] = s[:i] + line.replace(a, b, 1) + s[j:]

def eset(ref, on, change):
    """replace an existing edit's cue word and change text entirely."""
    f, i, j = _eline(ref)
    if not f: print("MISSING edit %s" % ref); FAILS.append((ref, "edit")); return
    s = SRC[f]
    SRC[f] = s[:i] + 'E("%s", "%s", "%s");' % (ref, on, change.replace('"', '\\"')) + s[j:]

def edel(ref):
    """delete an edit line (and any sequence entry that points at it must be fixed by hand)."""
    f, i, j = _eline(ref)
    if not f: print("MISSING edit %s" % ref); FAILS.append((ref, "edit")); return
    s = SRC[f]; SRC[f] = s[:i] + s[j + 1:]

def add_edit(n, on, change):
    f = _where(n); s = SRC[f]
    if ('E("S%d"' % n) in s: print("edit exists S%d" % n); FAILS.append(("S%d" % n, "edit exists")); return
    i, j = _span(s, n); end = s.index("});", i) + 4
    SRC[f] = s[:end] + 'E("S%d", "%s", "%s");\n' % (n, on, change.replace('"', '\\"')) + s[end:]

def qsub(a, b):
    """replace text inside sequence (Q) blocks — exactly one match across all files required."""
    hits = [f for f, s in SRC.items() if s.count(a) == 1 and s.find(a) > s.find("\nQ(") >= 0]
    if len(hits) != 1: print("MISSING/AMBIGUOUS seq text: %s" % a[:100]); FAILS.append(("Q", a)); return
    f = hits[0]; SRC[f] = SRC[f].replace(a, b, 1)

def save(name):
    for f, s in SRC.items(): open(f, "w").write(s)
    print("%s saved — %d missing" % (name, len(FAILS)))
