import Image from "next/image";
import type { ReactNode, Ref } from "react";

type Props = {
  /** Motion target for the crop/scale/parallax tweens */
  ref?: Ref<HTMLDivElement>;
  /** Still image rendered first; falls back to the WebGL stage gradient */
  poster?: string;
  className?: string;
  /** Live media layer (WebGL / video) mounted on top of the poster in step 2 */
  children?: ReactNode;
};

/**
 * Fixed-ratio media container. Owns the box size so nothing inside can shift
 * layout: mobile 4:5, tablet 16:10, desktop fills the panel (panel owns 16:9).
 */
export default function MediaStage({ ref, poster, className = "", children }: Props) {
  return (
    <div
      ref={ref}
      aria-hidden
      className={`relative overflow-hidden bg-[#08090c] aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto ${className}`}
    >
      {poster ? (
        <Image src={poster} alt="" fill sizes="(min-width: 1024px) 90vw, 100vw" className="object-cover" />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_60%,#1a1d26,#08090c)]">
          <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>
      )}

      {children && <div className="absolute inset-0">{children}</div>}
    </div>
  );
}
