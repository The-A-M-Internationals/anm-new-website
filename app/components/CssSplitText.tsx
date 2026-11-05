import { Fragment, type CSSProperties } from "react";

/**
 * Letter-by-letter rise, done in pure CSS.
 * The letters are in the server HTML and animate with CSS keyframes, which the
 * compositor (GPU) runs on its own thread — so the animation starts on first paint
 * and never freezes while the page is busy loading or hydrating.
 * Arabic is split by word, so letters keep their joined shapes.
 */
type Props = {
  text: string;
  className?: string;
  /** ms between letters */
  stagger?: number;
  /** ms before the first letter */
  delay?: number;
};

export default function CssSplitText({ text, className = "", stagger = 40, delay = 0 }: Props) {
  const byWord = /[؀-ۿ]/.test(text);
  const words = text.split(" ");
  let i = 0;
  const unit = (s: string, key: string) => (
    <span key={key} className="char-rise" style={{ animationDelay: `${delay + i++ * stagger}ms` } as CSSProperties}>
      {s}
    </span>
  );

  return (
    <span className={className} aria-label={text}>
      {words.map((word, w) => (
        <Fragment key={w}>
          <span aria-hidden className="inline-block whitespace-nowrap">
            {byWord ? unit(word, "w") : Array.from(word).map((ch, c) => unit(ch, String(c)))}
          </span>
          {w < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}
