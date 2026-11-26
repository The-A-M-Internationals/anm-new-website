"use client";

import { useRef } from "react";
import StageCopy from "./StageCopy";
import VideoLayer from "./VideoLayer";
import { useStageMotion } from "./useStageMotion";
import type { ShowcaseService } from "./types";

/* The film box has a notch cut into the side that faces the copy (mirrored for Arabic). */
const NOTCH_CLASS = [
  /* box on the end side: notch on its start edge */
  "ltr:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%,0_70%,5%_65%,5%_33%,0_28%)] rtl:[clip-path:polygon(100%_0,0_0,0_100%,100%_100%,100%_70%,95%_65%,95%_33%,100%_28%)]",
  /* box on the start side: notch on its end edge */
  "ltr:[clip-path:polygon(100%_0,0_0,0_100%,100%_100%,100%_70%,95%_65%,95%_33%,100%_28%)] rtl:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%,0_70%,5%_65%,5%_33%,0_28%)]",
];

/**
 * One row per service, each with its own film box:
 * - Desktop: the first service has its copy on the start side and its film on the end side; the next row
 *   underneath is mirrored (film on the start side), and so on.
 * - Phones / tablets: film box, then its copy, one service after the other.
 * The films are the centred cuts, so the animation sits in the middle of the box.
 */
export default function ShowcaseStage({ services, byWord }: { services: ShowcaseService[]; byWord: boolean }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const { playing, motion } = useStageMotion(stageRef);

  return (
    <div ref={stageRef} className="no-global-reveal flex flex-col lg:gap-[clamp(64px,12vh,140px)]">
      {services.map((service, i) => {
        const boxAtEnd = i % 2 === 0;
        return (
          <div
            key={service.id}
            className={`lg:grid lg:items-center lg:gap-x-[clamp(20px,5vw,80px)] ${
              boxAtEnd ? "lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)]"
            }`}
          >
            <div
              data-film
              aria-hidden
              className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#08090c] sm:aspect-[16/10] lg:aspect-auto lg:h-[min(84svh,680px)] ${
                boxAtEnd ? "lg:order-2" : ""
              } ${NOTCH_CLASS[boxAtEnd ? 0 : 1]}`}
            >
              <VideoLayer scene={service.id} active={!!playing[i]} flip={false} motion={motion} centred />
            </div>
            <StageCopy service={service} index={i} byWord={byWord} />
          </div>
        );
      })}
    </div>
  );
}
