"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPONENTS } from "@/lib/component-data";
import { LayoutDashboard, Palette, Layers, GitBranch, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tokens", label: "Design Tokens", icon: Palette },
  { href: "/screens", label: "Layer Screens", icon: Layers },
];

const PRIORITY_ORDER: Record<string, { label: string; color: string }> = {
  P0: { label: "P0 — Must Have", color: "bg-cerise-200 text-cerise-700" },
  "P0-FLEX": { label: "P0-FLEX — Flex Only", color: "bg-orange-200 text-orange-700" },
  P1: { label: "P1 — Important", color: "bg-onyx-300 text-onyx-600" },
};

export function Sidebar() {
  const pathname = usePathname();

  const groups = {
    P0: COMPONENTS.filter(c => c.priority === "P0"),
    "P0-FLEX": COMPONENTS.filter(c => c.priority === "P0-FLEX"),
    P1: COMPONENTS.filter(c => c.priority === "P1"),
  };

  return (
    <aside className="w-72 border-r border-onyx-300 bg-white flex flex-col flex-shrink-0">
      <div className="p-5 border-b border-onyx-300">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center">
            <GitBranch className="text-white" size={18} />
          </div>
          <div>
            <div className="font-bold text-sm text-onyx-800">GMC UI Library</div>
            <div className="text-[10px] text-onyx-500">17 Components | 3 Constructs</div>
          </div>
        </Link>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-1">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                pathname === item.href
                  ? "bg-purple-100 text-purple-700 font-medium"
                  : "text-onyx-600 hover:bg-onyx-200 hover:text-onyx-800"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </div>

        <Separator className="my-2" />

        <div className="p-4 space-y-5">
          {Object.entries(groups).map(([priority, comps]) => (
            <div key={priority}>
              <div className="flex items-center gap-2 mb-2 px-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${PRIORITY_ORDER[priority]?.color}`}>
                  {priority}
                </span>
                <span className="text-[10px] text-onyx-400">{comps.length}</span>
              </div>
              <div className="space-y-0.5">
                {comps.map(comp => {
                  const isActive = pathname === `/components/${comp.id}`;
                  return (
                    <Link
                      key={comp.id}
                      href={`/components/${comp.id}`}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all group ${
                        isActive
                          ? "bg-purple-100 text-purple-700 font-medium"
                          : "text-onyx-600 hover:bg-onyx-200 hover:text-onyx-800"
                      }`}
                    >
                      <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isActive ? "bg-purple-600 text-white" : "bg-onyx-200 text-onyx-500"
                      }`}>{comp.id}</span>
                      <span className="truncate flex-1">{comp.name}</span>
                      <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? "opacity-100" : ""}`} />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
