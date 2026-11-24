import type { ReactNode } from "react";

/**
 * A button label that rolls on hover: the label slides up and an identical one rolls in from below
 * (the motion lives in globals.css, `.roll-label`; it only runs with a mouse and with motion allowed).
 * Use inside a link or button: <button><RollLabel>{text}</RollLabel></button>
 */
export default function RollLabel({ children }: { children: ReactNode }) {
  return (
    <span className="roll-label">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}
