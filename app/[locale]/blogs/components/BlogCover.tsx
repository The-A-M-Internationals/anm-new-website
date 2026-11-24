/** Stand-in cover for articles without a photo: navy panel with the title in gold */
export default function BlogCover({ title, className = "" }: { title: string; className?: string }) {
    return (
        <div className={`absolute inset-0 overflow-hidden bg-gradient-to-br from-[#050E30] via-[#0B1E4F] to-[#050E30] flex items-center justify-center p-6 md:p-10 ${className}`}>
            <div aria-hidden className="absolute -top-16 -end-16 w-56 h-56 rounded-full border border-[#C9A84C]/30" />
            <div aria-hidden className="absolute -bottom-20 -start-20 w-64 h-64 rounded-full border border-[#C9A84C]/20" />
            <div className="relative flex flex-col items-center gap-4 text-center">
                <span aria-hidden className="block w-12 h-0.5 bg-[#D4AF37]" />
                <span className="text-xl md:text-3xl font-semibold leading-snug text-[#E3C973] line-clamp-4" style={{ fontFamily: "Lora, Georgia, serif" }}>
                    {title}
                </span>
                <span aria-hidden className="block w-12 h-0.5 bg-[#D4AF37]" />
            </div>
        </div>
    );
}
