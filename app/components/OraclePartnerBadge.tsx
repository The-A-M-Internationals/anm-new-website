import Image from "next/image";

/**
 * Oracle PartnerNetwork member badge (official artwork, cropped). The artwork has black "PARTNER"
 * text, so it always sits on its own white chip, which keeps it legible on the navy hero and footer.
 */
export default function OraclePartnerBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center rounded-lg bg-white px-3 py-2 shadow-md ring-1 ring-black/5 ${className}`}
      title="Oracle PartnerNetwork Member"
    >
      <Image
        src="/oracle-partner.png"
        alt="Oracle PartnerNetwork Member"
        width={454}
        height={67}
        sizes="180px"
        className="h-5 w-auto sm:h-6"
      />
    </div>
  );
}
