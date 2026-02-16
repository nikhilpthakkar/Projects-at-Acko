import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/layout/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "GMC UI Deliverable List",
  description: "Interactive component library for GMC Flow Engine — Figma design handoff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ fontFamily: "'Euclid Circular B', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        <TooltipProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-onyx-200">{children}</main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
