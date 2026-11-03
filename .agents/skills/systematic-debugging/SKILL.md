---
name: systematic-debugging
description: Use for any bug, error, failing test, or unexpected behavior — before proposing a fix. Finds the root cause with evidence instead of guessing.
---

# Systematic Debugging Protocol

**Rule: No fix before the root cause is identified with evidence.**

1. **Reproduce:**
   - Get the exact error message, stack trace, and expected vs actual result.
   - Run minimal reproduction steps or verification commands.

2. **Gather Evidence:**
   - Trace data flow from source to UI (DB / Service -> Route Handler / Server Action -> Component).
   - Check recent git diffs (`git diff`).
   - Inspect build/lint/typecheck logs directly.

3. **Hypothesis & Verification:**
   - State: "X fails because of Y, demonstrated by Z."
   - Test the hypothesis with a targeted check or inspection.
   - If proven wrong, discard and form the next hypothesis (max 3 tries before consulting the user).

4. **Minimal Targeted Fix:**
   - Fix the actual root cause, not just the symptom.
   - Re-run verification commands (`npm run typecheck && npm run lint`) before declaring done.
