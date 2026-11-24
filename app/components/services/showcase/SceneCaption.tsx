import type { SceneCaption as Caption } from "../webgl/types";

/**
 * Live story caption, pinned to the top corner on the model's side of the panel.
 * Top (not bottom) so it never sits under the fixed back-to-top button.
 * Scene captions are English, so the block is forced LTR for correct ordering in Arabic.
 */
export default function SceneCaption({ caption, flip }: { caption: Caption; flip: boolean }) {
  const side = flip ? "start-5 lg:start-8" : "start-5 lg:start-auto lg:end-8";

  return (
    <div dir="ltr" className={`absolute top-5 lg:top-8 ${side} max-w-[80%]`}>
      <p className={`flex items-baseline gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] ${caption.done ? "text-[#e7c873]" : "text-white/60"}`}>
        {caption.idx && <span className="text-[#e7c873]">{caption.idx}</span>}
        <span>{caption.title}</span>
      </p>
      {caption.line && <p className="mt-1 text-xs text-white/45">{caption.line}</p>}
    </div>
  );
}
