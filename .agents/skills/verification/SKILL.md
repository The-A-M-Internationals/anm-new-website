---
name: verification-before-completion
description: Use before claiming any task is done, fixed, or passing. Requires fresh command output proof.
---

# Verification Before Completion

**Rule: Never tell the user "it works" or "done" without executing the command and verifying it passes with zero errors.**

1. Identify the verification command (`npm run typecheck`, `npm run lint`, or `npm run build`).
2. Execute the command in the workspace.
3. Inspect exit code, failure count, and compiler warnings.
4. Only then report back to the user, quoting the exact passing output or exit code.
