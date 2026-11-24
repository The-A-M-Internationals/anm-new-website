import type { ElementType } from "react";

/**
 * Hero text split into words, each inside a mask, so `useHeroTextReveal` can raise it line by line.
 * Words start below their mask only when motion is allowed; with reduced motion the text is simply there.
 */
export default function HeroRevealText({ as: Tag = "h3", text, className }: { as?: ElementType; text: string; className?: string }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden>
          <span data-hero-word className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <span className="inline-block will-change-transform motion-safe:[transform:translateY(115%)]">{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
