# Helpers for targeted passes over the segment files (used for every revision round of "Seven Things").
# Usage: run your pass script from this folder and start it with  exec(open('seg_helpers.py').read())  — then sub(), setf(), add_edit(), save().
import re, glob, os
HERE = os.path.dirname(os.path.abspath(__file__)) if '__file__' in globals() else os.getcwd()
FILES = sorted(glob.glob(os.path.join(HERE, 'segs', 'seg0*.cjs')))
SRC = {f: open(f).read() for f in FILES}
def where(n):
    for f, s in SRC.items():
        if ("F(%d, {" % n) in s: return f
    raise Exception("no frame %d" % n)
def span(s, n):
    i = s.index("F(%d, {" % n)
    ends = [x for x in (s.find("\nF(", i + 5), s.find("\nE(", i + 5), s.find("\nQ(", i + 5)) if x > 0]
    return i, (min(ends) if ends else len(s))
def sub(n, a, b, count=1):
    """replace text inside frame n's F(...) block (its edit E(...) lines are separate — replace those directly)"""
    f = where(n); s = SRC[f]; i, j = span(s, n); seg = s[i:j]
    if a not in seg: print("MISSING S%d: %s" % (n, a[:90])); return
    SRC[f] = s[:i] + seg.replace(a, b, count) + s[j:]
def setf(n, key, val):
    """set or replace a short option such as m: "WHITE", fo: "light", pl: ["PHONE"]"""
    f = where(n); s = SRC[f]; i, j = span(s, n); seg = s[i:j]
    pat = re.compile(r'(\b%s: )("[^"]*"|\[[^\]]*\]|true|false)' % re.escape(key))
    seg2 = pat.sub(lambda m: m.group(1) + val, seg, count=1) if pat.search(seg) else seg.replace("F(%d, { " % n, "F(%d, { %s: %s, " % (n, key, val), 1)
    SRC[f] = s[:i] + seg2 + s[j:]
def add_edit(n, on, change):
    f = where(n); s = SRC[f]; i, j = span(s, n)
    if ('E("S%d"' % n) in s: print("edit exists S%d" % n); return
    end = s.index("});", i) + 4
    SRC[f] = s[:end] + 'E("S%d", %s, %s);\n' % (n, '"' + on + '"', '"' + change.replace('"', '\\"') + '"') + s[end:]
def save():
    for f, s in SRC.items(): open(f, 'w').write(s)
