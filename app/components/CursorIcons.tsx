/** Icons for the glass cursor; CSS shows the one matching the cursor's data-kind (see .glass-cursor in globals.css). */
export default function CursorIcons() {
  const svg = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <>
      <svg data-icon="drag" {...svg}><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M3 12h18" /></svg>
      <svg data-icon="play" {...svg} fill="currentColor" stroke="none"><path d="M9 6.5v11a.75.75 0 0 0 1.14.64l8.6-5.5a.75.75 0 0 0 0-1.28l-8.6-5.5A.75.75 0 0 0 9 6.5z" /></svg>
      <svg data-icon="view" {...svg} className="rtl:-scale-x-100"><path d="M7 17L17 7M9 7h8v8" /></svg>
    </>
  );
}
