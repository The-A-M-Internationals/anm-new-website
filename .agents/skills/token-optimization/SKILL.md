---
name: token-optimization
description: Guidelines to keep AI context clean, prevent truncation, and maximize speed.
---

# Token Optimization & Context Cleanliness

1. **Targeted Reads:** Read only specific lines or functions using line ranges rather than reading whole 1000-line files.
2. **Concise Explanations:** Explain what changed in 2-3 bullet points; do not print entire unchanged files back to the user.
3. **Use Git Diffs:** Prefer running `git diff --stat` or inspecting specific chunks rather than dumping whole project trees.
4. **Clean Ephemeral Artifacts:** Do not leave temporary scripts, large test fixtures, or stray logs in the repository.
