import Image from "next/image";

/**
 * Oracle Partner logo (official artwork, cropped). `tone` picks the version for the background:
 * "light" = original colours for white backgrounds (navbar), "dark" = grey text/divider turned
 * white, red ORACLE kept, for navy backgrounds (hero, footer).
 */
export default function OraclePartnerBadge({ tone = "light", className = "h-6 w-auto" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Image
      src={tone === "dark" ? "/oracle-partner-white.png" : "/oracle-partner.png"}
      alt="Oracle Partner"
      title="Oracle PartnerNetwork Member"
      width={640}
      height={150}
      sizes="160px"
      className={className}
    />
  );
}
