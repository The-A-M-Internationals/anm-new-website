# The A&M Internationals Agent Instructions & Operating Rules

## Overview
Enterprise B2B website for The A&M Internationals, specializing in Oracle EPM Cloud, Financial Transformation, and Enterprise AI & Automations.

## Tech Stack
- Framework: Next.js 16 (App Router), React 19
- Language: TypeScript 5
- Styling: Tailwind CSS v4, Lucide React icons
- Internationalization (i18n): Intlayer / next-intlayer (Bilingual English & Arabic)
- Animation: GSAP, Lenis Smooth Scroll, AOS
- Backend / Services: Firebase (v12), Nodemailer, AWS S3 Client

## Essential Commands
- Start Dev Server: `npm run dev`
- Typecheck: `npm run typecheck` (`tsc --noEmit`)
- Lint: `npm run lint` (`eslint`)
- Production Build: `npm run build` (`npx intlayer build && next build`)

## Architecture & Conventions
- App Router Pages: `src/app/[locale]/`
- Reusable UI Components: `src/components/` (decomposed into modular units)
- Content Dictionaries: `src/app/[locale]/**/*.content.ts` (Intlayer format)
- Services / Config: `src/services/` & `src/lib/`

## Visual Hierarchy & Quality Directives
- Surface Contrast: Clean neutral canvas (`#F4F6F9`), pure white card containers, soft borders (`border-slate-200/80`).
- Interactivity: Every clickable element (buttons, links, triggers, cards) MUST have `cursor-pointer`.
- Micro-interactions: Smooth transitions (`transition-all duration-150 ease-in-out`) on hover and focus.
- Anti-Squish Containers: Strict aspect ratios and overflow boundaries; never let banners or cards stretch or squash vertically.

## Code Rules
- Keep components modular and strictly under 120 lines.
- No monolithic page files; extract sections into separate presentational components.
- Zero TypeScript errors (`npm run typecheck` must pass before task completion).

## Operational Guardrails & Working Model
1. **Systematic Debugging:** Find root cause with evidence before patching (`.agents/skills/systematic-debugging/SKILL.md`).
2. **Strict Verification:** Never declare a task complete without running `npm run typecheck` and showing fresh passing output (`.agents/skills/verification/SKILL.md`).
3. **Git Safety:** Zero destructive git commands (`git push --force`, `git reset --hard`, or deleting remote branches).
4. **Token Optimization:** Keep responses concise, targeted, and link to files rather than dumping huge code blocks (`.agents/skills/token-optimization/SKILL.md`).
