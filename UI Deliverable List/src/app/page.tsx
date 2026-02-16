"use client";
import Link from "next/link";
import { COMPONENTS } from "@/lib/component-data";
import { useFigmaLinks } from "@/lib/use-figma-links";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, CheckCircle2, Circle, Layers, GitBranch, Palette, Monitor } from "lucide-react";

const PRIORITY_COLORS: Record<string, string> = {
  P0: "bg-cerise-200 text-cerise-700",
  "P0-FLEX": "bg-orange-200 text-orange-700",
  P1: "bg-onyx-300 text-onyx-600",
};

export default function DashboardPage() {
  const { hasLink } = useFigmaLinks();

  const linked = COMPONENTS.filter(c => hasLink(c.id)).length;
  const totalVariants = COMPONENTS.reduce((sum, c) => sum + c.variants.length, 0);
  const totalStates = COMPONENTS.reduce((sum, c) => sum + c.states.length, 0);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-onyx-800 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center">
            <GitBranch className="text-white" size={24} />
          </div>
          GMC UI Deliverable List
        </h1>
        <p className="text-onyx-500 mt-2 text-sm">Interactive component library for the GMC Flow Engine. Toggle variants, link to Figma, view content copy.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Components", value: COMPONENTS.length, icon: Layers, color: "text-purple-600" },
          { label: "Variants", value: totalVariants, icon: Palette, color: "text-blue-700" },
          { label: "States", value: totalStates, icon: Monitor, color: "text-orange-700" },
          { label: "Figma Linked", value: `${linked}/${COMPONENTS.length}`, icon: ExternalLink, color: linked === COMPONENTS.length ? "text-green-700" : "text-onyx-500" },
        ].map(stat => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-onyx-800">{stat.value}</div>
                  <div className="text-xs text-onyx-500 mt-1">{stat.label}</div>
                </div>
                <stat.icon size={24} className={stat.color} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick links */}
      <div className="flex gap-3 mb-8">
        <Link href="/tokens" className="flex items-center gap-2 px-4 py-2.5 bg-white border border-onyx-300 rounded-xl text-sm text-onyx-700 hover:border-purple-400 hover:bg-purple-50 transition-all">
          <Palette size={16} className="text-purple-600" />Design Tokens
        </Link>
        <Link href="/screens" className="flex items-center gap-2 px-4 py-2.5 bg-white border border-onyx-300 rounded-xl text-sm text-onyx-700 hover:border-purple-400 hover:bg-purple-50 transition-all">
          <Monitor size={16} className="text-purple-600" />Layer Screens
        </Link>
      </div>

      {/* Component Grid */}
      <h2 className="text-lg font-bold text-onyx-800 mb-4">All Components</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {COMPONENTS.map(comp => (
          <Link key={comp.id} href={`/components/${comp.id}`}>
            <Card className="hover:shadow-md transition-all hover:border-purple-300 cursor-pointer h-full">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-1 bg-purple-200 text-purple-700 rounded">{comp.id}</span>
                    <Badge variant="outline" className={`text-[10px] ${PRIORITY_COLORS[comp.priority]}`}>{comp.priority}</Badge>
                  </div>
                  {hasLink(comp.id) ? (
                    <CheckCircle2 size={16} className="text-green-600" />
                  ) : (
                    <Circle size={16} className="text-onyx-300" />
                  )}
                </div>
                <h3 className="font-semibold text-sm text-onyx-800 mb-1">{comp.name}</h3>
                <div className="text-xs text-onyx-500 mb-3">Layers: {comp.layers}</div>
                <div className="flex flex-wrap gap-1.5">
                  {comp.variants.map(v => (
                    <span key={v.name} className="text-[10px] px-2 py-0.5 bg-onyx-200 text-onyx-600 rounded-full">{v.name}</span>
                  ))}
                  {comp.states.map(s => (
                    <span key={s.name} className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full">{s.name}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
