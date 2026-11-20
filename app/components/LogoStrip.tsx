"use client";

import { Fragment, useRef } from "react";
import LogoTile from "./LogoTile";
import { useLogoStrip } from "./useLogoStrip";
import { GLIDE_FROM, LOGOS, type LogoItem } from "./logos-data";
import "./logoStrip.css";

const HEADLINE = ["Enterprises", "that", "run", "their", "numbers", "on", "our", "architecture."];
const GOLD = new Set(["our", "architecture."]);

/** Our Clients section: the original heading, with the client cards replaced by one gliding line of logos. */
export default function LogoStrip({ logos = LOGOS }: { logos?: LogoItem[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  useLogoStrip(root, track);
  // The row adapts to the count: a few logos sit still and centred, a longer list glides
  const still = logos.length < GLIDE_FROM;
  // When gliding, the list is repeated so one set is always wider than the screen and the loop has no gaps
  const set = Array.from({ length: Math.max(1, Math.ceil(10 / logos.length)) }, () => logos).flat();

  return (
    <section ref={root} id="our-clients" className="ls" dir="ltr" /* client copy is English-only */ aria-labelledby="ls-title">
      <div className="ls-orb" aria-hidden="true" />
      <div className="ls-orb ls-orb--navy" aria-hidden="true" />
      <div className="ls-grid" aria-hidden="true" />

      <div className="ls-head">
        <h2 id="ls-title" className="ls-title">
          {HEADLINE.map((w, i) => (
            <Fragment key={w}>
              <span className="ls-wmask">
                <span data-word className={GOLD.has(w) ? "ls-highlight" : undefined}>
                  {w}
                </span>
              </span>
              {i < HEADLINE.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </h2>
        <p className="ls-lede" data-reveal>
          From multi-entity consolidation to rolling forecasts, we architect Oracle EPM platforms that enterprise finance leaders rely upon at month-end.
        </p>
      </div>

      <div className={still ? "ls-strip ls-strip--still" : "ls-strip"} data-reveal>
        <ul ref={still ? undefined : track} className="ls-track">
          {(still ? logos : [...set, ...set]).map((item, i) => (
            <LogoTile key={`${item.id}-${i}`} item={item} hidden={!still && i >= logos.length} />
          ))}
        </ul>
      </div>
    </section>
  );
}
