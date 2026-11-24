import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

/** Same markdown renderer as the Careers job page, styled for long-form reading */
const components: Components = {
    h2: ({ children }) => <h2 className="text-2xl md:text-[28px] font-semibold text-black mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl md:text-2xl font-semibold text-black mt-8 mb-3">{children}</h3>,
    p: ({ children }) => <p className="text-[#374151] text-base md:text-lg leading-relaxed mb-5">{children}</p>,
    strong: ({ children }) => <strong className="font-semibold text-black">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    ul: ({ children }) => <ul className="list-disc ps-6 mb-5 space-y-2 text-[#374151] text-base md:text-lg">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal ps-6 mb-5 space-y-2 text-[#374151] text-base md:text-lg">{children}</ol>,
    a: ({ href = "", children }) => {
        const external = /^https?:\/\//.test(href);
        return (
            <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="text-[#B8962E] underline underline-offset-4 hover:text-[#D4AF37] transition-all duration-150 ease-in-out cursor-pointer"
            >
                {children}
            </a>
        );
    },
};

export default function ArticleBody({ markdown }: { markdown: string }) {
    return (
        <div className="max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {markdown}
            </ReactMarkdown>
        </div>
    );
}
