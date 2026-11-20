import Image from "next/image";
import type { LogoItem } from "./logos-data";

/** One logo in the gliding strip: always in its real colours, grows slightly on hover. */
export default function LogoTile({ item, hidden }: { item: LogoItem; hidden?: boolean }) {
  return (
    <li className="ls-item" aria-hidden={hidden || undefined}>
      {item.logo ? (
        <span className="ls-logo">
          <Image src={item.logo} alt={hidden ? "" : item.name} fill sizes="120px" className="object-contain" draggable={false} />
        </span>
      ) : (
        <span className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.14em] text-[#0b1e4f] sm:text-sm">
          {item.name}
        </span>
      )}
    </li>
  );
}
