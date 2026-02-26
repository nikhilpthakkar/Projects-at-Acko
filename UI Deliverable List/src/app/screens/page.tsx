"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Shield, Users, Settings, Heart, CreditCard, CheckCircle2, Layers } from "lucide-react";

const LAYERS = [
  {
    id: "L0", name: "Context & Welcome", shortName: "Welcome", icon: Play,
    question: "What am I about to do?", purpose: "Set expectations, reduce anxiety",
    decisionType: { VANILLA: "View", MODULAR: "View", FLEX: "View" },
    components: ["C01"],
    content: { VANILLA: { headline: "Let's set up your health coverage", subtext: "Review your benefits from [Company]" }, MODULAR: { headline: "Let's set up your health coverage", subtext: "Choose your benefits from [Company]" }, FLEX: { headline: "Let's set up your health coverage", subtext: "You have a benefits wallet to customize your protection" } },
  },
  {
    id: "L1", name: "Base Coverage View", shortName: "Coverage", icon: Shield,
    question: "What protection do I already have?", purpose: "Show employer coverage, build trust",
    decisionType: { VANILLA: "View", MODULAR: "View", FLEX: "View" },
    components: ["C01", "C02", "C10 (Flex)"],
    content: { VANILLA: { headline: "Your coverage from [Company]", subtext: "₹5 lakh coverage for your family" }, MODULAR: { headline: "Your coverage from [Company]", subtext: "₹5 lakh coverage for your family" }, FLEX: { headline: "Your benefits wallet", subtext: "₹25,000 to build your protection" } },
  },
  {
    id: "L2", name: "Family Configuration", shortName: "Family", icon: Users,
    question: "Who is covered?", purpose: "Capture/confirm family members",
    decisionType: { VANILLA: "Conditional", MODULAR: "Conditional", FLEX: "Decision" },
    components: ["C01", "C04", "C05"],
    content: { VANILLA: { headline: "Your covered family members", subtext: "Review and update if needed" }, MODULAR: { headline: "Your covered family members", subtext: "Review and update if needed" }, FLEX: { headline: "Your covered family members", subtext: "Review and update if needed" } },
  },
  {
    id: "L3", name: "Plan Selection", shortName: "Plans", icon: Settings,
    question: "What level of coverage do I want?", purpose: "Choose/upgrade plan configuration",
    decisionType: { VANILLA: "Skip", MODULAR: "Decision*", FLEX: "Decision*" },
    components: ["C01", "C03", "C06", "C10 (Flex)", "C17 (Modular Tier Upgrade)"],
    content: { VANILLA: { headline: "(Skipped)", subtext: "" }, MODULAR: { headline: "Upgrade your plan / View assigned tier", subtext: "Tier Upgrade: choose higher tier | View-only: M01/M07" }, FLEX: { headline: "Configure coverage / View base", subtext: "Base Variable: SI + Family config | Base Fixed: view-only" } },
  },
  {
    id: "L4", name: "Enhancement Options", shortName: "Enhance", icon: Heart,
    question: "What additional protection?", purpose: "Offer top-ups, secondary, add-ons",
    decisionType: { VANILLA: "Decision*", MODULAR: "Decision", FLEX: "Decision" },
    components: ["C01", "C07", "C08", "C09", "C10 (Flex)"],
    content: { VANILLA: { headline: "Enhance your coverage", subtext: "Add more protection" }, MODULAR: { headline: "Enhance your coverage", subtext: "Add more protection" }, FLEX: { headline: "Enhance your coverage", subtext: "Add more protection" } },
  },
  {
    id: "L5", name: "Premium & Payment", shortName: "Payment", icon: CreditCard,
    question: "How much will I pay?", purpose: "Show cost breakdown, payment method",
    decisionType: { VANILLA: "Skip*", MODULAR: "Decision", FLEX: "Decision" },
    components: ["C01", "C06", "C10 (Flex)"],
    content: { VANILLA: { headline: "Your investment", subtext: "Review your premium breakdown" }, MODULAR: { headline: "Your investment", subtext: "Review your premium breakdown" }, FLEX: { headline: "Your investment", subtext: "Review your premium breakdown" } },
  },
  {
    id: "L6", name: "Review & Consent", shortName: "Review", icon: CheckCircle2,
    question: "Is everything correct?", purpose: "Final confirmation, legal consent",
    decisionType: { VANILLA: "Decision", MODULAR: "Decision", FLEX: "Decision" },
    components: ["C01", "C04", "C11", "C12"],
    content: { VANILLA: { headline: "Review and confirm", subtext: "Check your selections before submitting" }, MODULAR: { headline: "Review and confirm", subtext: "Check your selections before submitting" }, FLEX: { headline: "Review and confirm", subtext: "Check your selections before submitting" } },
  },
];

const DECISION_COLORS: Record<string, string> = {
  View: "bg-blue-200 text-blue-700",
  Decision: "bg-orange-200 text-orange-700",
  "Decision*": "bg-orange-200 text-orange-700",
  Conditional: "bg-purple-200 text-purple-700",
  Skip: "bg-onyx-200 text-onyx-500",
  "Skip*": "bg-onyx-200 text-onyx-500",
};

export default function ScreensPage() {
  const [construct, setConstruct] = useState<"VANILLA" | "MODULAR" | "FLEX">("MODULAR");

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-onyx-800">Layer Screens</h1>
          <p className="text-sm text-onyx-500 mt-1">How components compose across the 7-layer flow. Switch constructs to see variations.</p>
        </div>
        <Tabs value={construct} onValueChange={(v) => setConstruct(v as typeof construct)}>
          <TabsList>
            <TabsTrigger value="VANILLA" className="text-xs">Vanilla</TabsTrigger>
            <TabsTrigger value="MODULAR" className="text-xs">Modular</TabsTrigger>
            <TabsTrigger value="FLEX" className="text-xs">Flex</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Flow diagram */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
        {LAYERS.map((layer, i) => {
          const dt = layer.decisionType[construct];
          const isSkip = dt === "Skip" || dt === "Skip*";
          return (
            <div key={layer.id} className="flex items-center gap-3">
              <div className={`px-4 py-3 rounded-xl border-2 min-w-[100px] text-center transition-all ${isSkip ? "opacity-40 border-onyx-300" : DECISION_COLORS[dt]?.includes("blue") ? "border-blue-200" : DECISION_COLORS[dt]?.includes("orange") ? "border-orange-200" : DECISION_COLORS[dt]?.includes("purple") ? "border-purple-200" : "border-onyx-300"}`}>
                <div className="flex items-center justify-center gap-1 mb-1"><layer.icon size={14} /><span className="font-bold text-xs">{layer.id}</span></div>
                <div className="text-[10px]">{layer.shortName}</div>
                <Badge variant="outline" className={`text-[9px] mt-1 ${DECISION_COLORS[dt]}`}>{dt}</Badge>
              </div>
              {i < LAYERS.length - 1 && <span className="text-onyx-400 text-lg">→</span>}
            </div>
          );
        })}
      </div>

      {/* Layer Cards */}
      <div className="space-y-4">
        {LAYERS.map(layer => {
          const dt = layer.decisionType[construct];
          const isSkip = dt === "Skip" || dt === "Skip*";
          const content = layer.content[construct];

          return (
            <Card key={layer.id} className={isSkip ? "opacity-50" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center"><layer.icon size={18} className="text-purple-600" /></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{layer.id}</span>
                        <span className="font-normal text-onyx-700">{layer.name}</span>
                        <Badge variant="outline" className={DECISION_COLORS[dt]}>{dt}</Badge>
                        {isSkip && <span className="text-xs text-onyx-400">(Not shown for {construct})</span>}
                      </div>
                      <div className="text-xs text-onyx-500 font-normal mt-0.5">{layer.purpose}</div>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              {!isSkip && (
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs font-semibold text-onyx-600 mb-2">CORE QUESTION</div>
                      <div className="text-sm italic text-purple-700">&ldquo;{layer.question}&rdquo;</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-onyx-600 mb-2">CONTENT ({construct})</div>
                      <div className="text-sm font-medium text-onyx-800">{content.headline}</div>
                      <div className="text-xs text-onyx-500">{content.subtext}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-onyx-600 mb-2">COMPONENTS</div>
                      <div className="flex flex-wrap gap-1.5">
                        {layer.components.map(c => (
                          <span key={c} className="text-[10px] px-2 py-0.5 bg-purple-200 text-purple-700 rounded-full font-mono font-bold">{c}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
