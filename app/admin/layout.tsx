import type { Metadata } from "next";
import "../globals.css";

/** Admin portal: its own page shell (no site navbar, footer or smooth scrolling) and never indexed */
export const metadata: Metadata = {
  title: "Admin | The A&M Internationals",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F4F6F9] text-slate-900 antialiased">{children}</body>
    </html>
  );
}
