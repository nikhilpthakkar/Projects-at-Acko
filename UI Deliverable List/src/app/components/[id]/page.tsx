"use client";
import { use, useState } from "react";
import { notFound } from "next/navigation";
import { getComponent } from "@/lib/component-data";
import { useFigmaLinks } from "@/lib/use-figma-links";
import { FigmaLinkField } from "@/components/layout/figma-link-field";
import { PREVIEW_MAP } from "@/components/preview/all-previews";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Layers, AlertTriangle, AlertCircle, FileText, Eye, Palette } from "lucide-react";

const PRIORITY_COLORS: Record<string, string> = {
  P0: "bg-cerise-200 text-cerise-700",
  "P0-FLEX": "bg-orange-200 text-orange-700",
  P1: "bg-onyx-300 text-onyx-600",
};
const SEVERITY_COLORS: Record<string, string> = {
  critical: "bg-cerise-700 text-white",
  validation: "bg-orange-700 text-white",
  warning: "bg-orange-500 text-white",
  blocking: "bg-cerise-700 text-white",
  info: "bg-blue-700 text-white",
};

export default function ComponentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const comp = getComponent(id.toUpperCase());
  if (!comp) return notFound();

  const { getLink, setLink } = useFigmaLinks();
  const [activeVariant, setActiveVariant] = useState(comp.variants[0]?.name || "");
  const [activeState, setActiveState] = useState(comp.states[0]?.name || "");

  const PreviewComponent = PREVIEW_MAP[comp.id];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-lg font-bold px-3 py-1.5 bg-purple-200 text-purple-700 rounded-lg">{comp.id}</span>
            <Badge variant="outline" className={PRIORITY_COLORS[comp.priority]}>{comp.priority}</Badge>
            <span className="text-xs text-onyx-400">Layers: {comp.layers}</span>
          </div>
          <h1 className="text-2xl font-bold text-onyx-800">{comp.name}</h1>
          <p className="text-sm text-onyx-500 mt-1">{comp.constructCondition}</p>
        </div>
        <div className="text-right text-xs text-onyx-400">
          <div>Figma: <span className="font-mono">{comp.figmaFrame}</span></div>
          <div>{comp.variants.length} variants | {comp.states.length} states</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Preview Canvas (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2"><Eye size={16} className="text-purple-600" />Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Variant Tabs */}
              {comp.variants.length > 1 && (
                <div className="mb-4">
                  <div className="text-xs font-semibold text-onyx-500 mb-2">VARIANT</div>
                  <Tabs value={activeVariant} onValueChange={setActiveVariant}>
                    <TabsList>
                      {comp.variants.map(v => (
                        <TabsTrigger key={v.name} value={v.name} className="text-xs">{v.name}</TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
              )}

              {/* State Tabs */}
              {comp.states.length > 1 && (
                <div className="mb-4">
                  <div className="text-xs font-semibold text-onyx-500 mb-2">STATE</div>
                  <Tabs value={activeState} onValueChange={setActiveState}>
                    <TabsList>
                      {comp.states.map(s => (
                        <TabsTrigger key={s.name} value={s.name} className="text-xs">{s.name}</TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
              )}

              {/* Preview */}
              <div className="bg-onyx-200 rounded-xl p-6 min-h-[200px] flex items-center justify-center border-2 border-dashed border-onyx-300">
                {PreviewComponent ? (
                  <PreviewComponent variant={activeVariant} state={activeState} />
                ) : (
                  <div className="text-onyx-400 text-sm">Preview not available</div>
                )}
              </div>

              {/* Active state description */}
              <div className="mt-3 space-y-1">
                {comp.variants.find(v => v.name === activeVariant) && (
                  <div className="text-xs text-onyx-500"><span className="font-semibold">Variant:</span> {comp.variants.find(v => v.name === activeVariant)?.description}</div>
                )}
                {comp.states.find(s => s.name === activeState) && (
                  <div className="text-xs text-onyx-500"><span className="font-semibold">State:</span> {comp.states.find(s => s.name === activeState)?.description} — <span className="font-mono">{comp.states.find(s => s.name === activeState)?.visual}</span></div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Figma Link */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2"><Palette size={16} className="text-purple-600" />Figma Link</CardTitle>
            </CardHeader>
            <CardContent>
              <FigmaLinkField componentId={comp.id} value={getLink(comp.id)} onChange={(url) => setLink(comp.id, url)} />
            </CardContent>
          </Card>
        </div>

        {/* Right: Metadata (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Variants Table */}
          <Card>
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Layers size={16} className="text-purple-600" />Variants ({comp.variants.length})</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {comp.variants.map(v => (
                  <div key={v.name} className={`p-3 rounded-lg border ${activeVariant === v.name ? "border-purple-400 bg-purple-50" : "border-onyx-200"}`}>
                    <div className="font-mono text-xs font-bold text-purple-700">{v.name}</div>
                    <div className="text-xs text-onyx-500 mt-0.5">{v.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* States Table */}
          <Card>
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Eye size={16} className="text-purple-600" />States ({comp.states.length})</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {comp.states.map(s => (
                  <div key={s.name} className={`p-3 rounded-lg border ${activeState === s.name ? "border-purple-400 bg-purple-50" : "border-onyx-200"}`}>
                    <div className="font-mono text-xs font-bold text-onyx-800">{s.name}</div>
                    <div className="text-xs text-onyx-500 mt-0.5">{s.description}</div>
                    <div className="text-[10px] text-onyx-400 font-mono mt-1">{s.visual}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Slots */}
          {comp.contentSlots.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-sm flex items-center gap-2"><FileText size={16} className="text-purple-600" />Content Copy</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {comp.contentSlots.map((cs, i) => (
                    <div key={i} className="p-3 bg-onyx-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-purple-200 text-purple-700 rounded">{cs.layer}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-onyx-300 text-onyx-600 rounded">{cs.construct}</span>
                      </div>
                      <div className="text-sm font-semibold text-onyx-800">{cs.headline}</div>
                      <div className="text-xs text-onyx-500">{cs.subtext}</div>
                      {cs.ctaPrimary && <div className="mt-2 inline-block px-3 py-1 bg-purple-600 text-white rounded text-xs">{cs.ctaPrimary}</div>}
                      {cs.ctaSecondary && <span className="ml-2 text-xs text-onyx-500">{cs.ctaSecondary}</span>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Errors */}
          {comp.errors.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-sm flex items-center gap-2"><AlertCircle size={16} className="text-cerise-700" />Error States ({comp.errors.length})</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {comp.errors.map(err => (
                    <div key={err.id} className="p-3 bg-onyx-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${SEVERITY_COLORS[err.severity] || "bg-onyx-300 text-onyx-600"}`}>{err.severity}</span>
                        <span className="text-[10px] font-mono text-onyx-400">{err.id}</span>
                      </div>
                      <div className="text-sm font-medium text-onyx-800">{err.error}</div>
                      <div className="text-xs text-onyx-500">{err.message}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Edge Cases */}
          {comp.edgeCases.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-sm flex items-center gap-2"><AlertTriangle size={16} className="text-orange-500" />Edge Cases</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {comp.edgeCases.map((ec, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-onyx-700 p-2 bg-orange-100 rounded-lg">
                      <AlertTriangle size={14} className="text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{ec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
