import { Fragment } from "react";

type Props = { text: string; /** Fill word by word instead of letter by letter */ byWord?: boolean; className?: string };

/**
 * A line of copy whose letters are filled in by scroll (useStageMotion dims and fills every [data-fill]).
 * Words never break in the middle. Arabic fills word by word: splitting its letters breaks their joins.
 * Screen readers get the plain sentence; without motion the text simply shows at full strength.
 */
export default function FillText({ text, byWord = false, className = "" }: Props) {
  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split(" ").map((word, i) => (
          <Fragment key={i}>
            <span className="inline-block whitespace-nowrap">
              {byWord
                ? <span data-fill className="will-change-[opacity]">{word}</span>
                : [...word].map((ch, k) => <span key={k} data-fill className="will-change-[opacity]">{ch}</span>)}
            </span>{" "}
          </Fragment>
        ))}
      </span>
    </p>
  );
}
