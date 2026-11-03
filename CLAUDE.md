# CLAUDE.md — Agent Guidelines for The A&M Internationals

Enterprise B2B website for The A&M Internationals (Oracle EPM Cloud, Financial Transformation, and Enterprise AI & Automations).

## Stack & Commands
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5
- **Styling:** Tailwind CSS v4 + Lucide React icons
- **i18n:** Intlayer / next-intlayer (Bilingual English & Arabic)
- **Dev:** `npm run dev`
- **Typecheck:** `npm run typecheck` (`tsc --noEmit`)
- **Lint:** `npm run lint` (`eslint`)
- **Build:** `npm run build` (`npx intlayer build && next build`)

## Non-Negotiable Directives
1. **Verification First:** Never declare any task complete without running `npm run typecheck` and confirming 0 errors.
2. **Component Modularity:** Keep all component files modular and strictly under 120 lines. Decompose large sections into atomic components under `src/components/`.
3. **Cursor Pointer:** Every interactive or clickable element (button, link, tab, card trigger) must have `cursor-pointer`.
4. **Visual Polish:**
   - Canvas: `#F4F6F9`
   - Cards: Pure white `bg-white border border-slate-200/80 rounded-xl shadow-xs`
   - Transitions: `transition-all duration-150 ease-in-out` on interactive states
   - Anti-Squish: Strict aspect ratios and overflow boundaries on all media/cards.
5. **Debugging & Skills:** See detailed protocols in `.agents/skills/`:
   - `systematic-debugging`: Root-cause diagnosis before patching.
   - `verification`: Command-backed proof of completion.
   - `token-optimization`: Concise, targeted output and minimal reads.
