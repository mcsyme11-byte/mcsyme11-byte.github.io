#!/usr/bin/env python3
"""Rebuilds data/activity.js: commits per day across all of Malcolm Syme's repositories.

Run:  TZ=America/Edmonton python3 dev/build_activity.py <folder of clones with full history>
(bare clones made with `git clone --bare --filter=tree:0 <url>` are enough: only the log is read).
Automatic commits are left out: the rebuilt Project Records, scheduled data updates and Logbook's share page.
Only counts and dates are written; nothing else from the private repositories.
"""
import collections, datetime, glob, json, pathlib, subprocess, sys

AUTO = ("Project Record (automatic)", "github-actions[bot]", "Logbook share page")
src = pathlib.Path(sys.argv[1])
days, repos = collections.Counter(), 0
for g in sorted(glob.glob(str(src / "*"))):
    out = subprocess.run(["git", "-C", g, "log", "--date=format-local:%Y-%m-%d", "--format=%ad|%an|%s"],
                         capture_output=True, text=True).stdout.splitlines()
    n = 0
    for line in out:
        d, author, subject = line.split("|", 2)
        if author in AUTO or "(automatic)" in subject or subject.startswith("Data update"):
            continue
        days[d] += 1
        n += 1
    repos += 1 if n else 0
data = {"updated": datetime.date.today().isoformat(), "total": sum(days.values()), "repos": repos,
        "since": min(days), "days": dict(sorted(days.items()))}
head = ("/* Commits per day across all of Malcolm Syme's repositories (public and private), counted from their histories.\n"
        " * Automatic commits (rebuilt records, scheduled data updates) are left out. Rebuilt by dev/build_activity.py.\n */\n")
(pathlib.Path(__file__).resolve().parent.parent / "data" / "activity.js").write_text(
    head + "window.ACTIVITY = " + json.dumps(data, separators=(",", ":")) + ";\n", encoding="utf-8")
print(data["total"], "commits,", repos, "repositories, since", data["since"])
