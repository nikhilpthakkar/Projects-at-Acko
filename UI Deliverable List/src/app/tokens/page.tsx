"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = {
  Purple: [
    { token: "purple-800", hex: "#18084A" }, { token: "purple-700", hex: "#2E1773" },
    { token: "purple-600", hex: "#4E29BB" }, { token: "purple-500", hex: "#926FF3" },
    { token: "purple-400", hex: "#B59CF5" }, { token: "purple-300", hex: "#D1C5FA" },
    { token: "purple-200", hex: "#ECEBFF" }, { token: "purple-100", hex: "#F8F7FD" },
  ],
  Onyx: [
    { token: "onyx-800", hex: "#0A0A0A" }, { token: "onyx-700", hex: "#121212" },
    { token: "onyx-600", hex: "#2F2F2F" }, { token: "onyx-500", hex: "#5D5D5D" },
    { token: "onyx-400", hex: "#B0B0B0" }, { token: "onyx-300", hex: "#E7E7E7" },
    { token: "onyx-200", hex: "#F6F6F6" }, { token: "onyx-100", hex: "#FFFFFF" },
  ],
  Green: [
    { token: "green-700", hex: "#1C772C" }, { token: "green-600", hex: "#149A40" },
    { token: "green-500", hex: "#55B94D" }, { token: "green-200", hex: "#DAFAD7" },
    { token: "green-100", hex: "#F3FFF2" },
  ],
  Orange: [
    { token: "orange-700", hex: "#B15A08" }, { token: "orange-500", hex: "#F4A024" },
    { token: "orange-200", hex: "#FFEDC5" }, { token: "orange-100", hex: "#FFF8E7" },
  ],
  Cerise: [
    { token: "cerise-700", hex: "#981950" }, { token: "cerise-500", hex: "#EC5FAB" },
    { token: "cerise-200", hex: "#FCE7F4" },
  ],
  Blue: [
    { token: "blue-700", hex: "#006A97" }, { token: "blue-500", hex: "#1EB7E7" },
    { token: "blue-200", hex: "#DEF7FF" },
  ],
};

const TYPOGRAPHY = [
  { size: "text-3xl (30px)", weight: "Bold (700)", usage: "Hero premium numbers" },
  { size: "text-2xl (24px)", weight: "Bold (700)", usage: "Sum Insured display" },
  { size: "text-xl (20px)", weight: "Bold (700)", usage: "Screen headlines" },
  { size: "text-lg (18px)", weight: "Bold (700)", usage: "Section headings" },
  { size: "text-sm (14px)", weight: "Medium (500)", usage: "Body, card content, CTAs" },
  { size: "text-xs (12px)", weight: "Regular/Medium", usage: "Labels, badges, meta" },
  { size: "10px", weight: "Bold (700)", usage: "Micro badges (SELECTED, POPULAR)" },
];

const SHADOWS = [
  { name: "shadow-sm", value: "0 1px 2px rgba(10,10,10,0.05)", usage: "Subtle elevation" },
  { name: "shadow-md", value: "0 4px 6px -1px rgba(10,10,10,0.07), ...", usage: "Card hover" },
  { name: "shadow-lg", value: "0 10px 15px -3px rgba(10,10,10,0.08), ...", usage: "Floating CTA" },
];

const RADII = [
  { size: "8px", usage: "Buttons, inputs" },
  { size: "12px", usage: "Cards (.acko-card), toggle track" },
  { size: "16px / xl", usage: "Plan cards, section cards" },
  { size: "9999px / full", usage: "Badges, dots, avatars, toggle thumb" },
  { size: "38-44px", usage: "Phone frame" },
];

export default function TokensPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-onyx-800 mb-2">Design Tokens</h1>
      <p className="text-sm text-onyx-500 mb-8">ACKO Design System tokens used across all GMC components. Map these to Figma variables.</p>

      {/* Colors */}
      <h2 className="text-lg font-bold text-onyx-800 mb-4">Colors</h2>
      <div className="space-y-6 mb-10">
        {Object.entries(COLORS).map(([group, colors]) => (
          <Card key={group}>
            <CardHeader><CardTitle className="text-sm">{group}</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {colors.map(c => (
                  <div key={c.token} className="flex flex-col items-center gap-1.5">
                    <div className="w-16 h-16 rounded-xl border border-onyx-300 shadow-sm" style={{ background: c.hex }} />
                    <div className="text-[10px] font-mono text-onyx-600">{c.token}</div>
                    <div className="text-[10px] text-onyx-400">{c.hex}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Typography */}
      <h2 className="text-lg font-bold text-onyx-800 mb-4">Typography</h2>
      <Card className="mb-10">
        <CardContent className="pt-6">
          <div className="mb-4 text-sm text-onyx-600">Font: <span className="font-semibold">Euclid Circular B</span> | Weights: 400, 500, 600, 700</div>
          <div className="space-y-4">
            {TYPOGRAPHY.map(t => (
              <div key={t.size} className="flex items-baseline gap-4 py-2 border-b border-onyx-200 last:border-0">
                <div className="w-40 text-xs font-mono text-purple-600">{t.size}</div>
                <div className="w-32 text-xs text-onyx-500">{t.weight}</div>
                <div className="text-sm text-onyx-700">{t.usage}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shadows */}
      <h2 className="text-lg font-bold text-onyx-800 mb-4">Shadows</h2>
      <Card className="mb-10">
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-6">
            {SHADOWS.map(s => (
              <div key={s.name} className="text-center">
                <div className="w-full h-20 bg-white rounded-xl mb-3" style={{ boxShadow: s.value }} />
                <div className="text-xs font-mono text-purple-600">{s.name}</div>
                <div className="text-[10px] text-onyx-500 mt-1">{s.usage}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Border Radii */}
      <h2 className="text-lg font-bold text-onyx-800 mb-4">Border Radii</h2>
      <Card className="mb-10">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-6">
            {RADII.map(r => (
              <div key={r.size} className="text-center">
                <div className="w-16 h-16 bg-purple-200 border-2 border-purple-400 mb-2" style={{ borderRadius: r.size === "9999px / full" ? "9999px" : r.size.split(" ")[0] }} />
                <div className="text-xs font-mono text-purple-600">{r.size}</div>
                <div className="text-[10px] text-onyx-500 mt-1">{r.usage}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Component Classes */}
      <h2 className="text-lg font-bold text-onyx-800 mb-4">Component Classes</h2>
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div>
            <div className="text-xs font-semibold text-onyx-600 mb-2">.acko-card</div>
            <div className="acko-card p-4"><span className="text-sm text-onyx-700">Card with 12px radius, onyx-300 border, shadow on hover</span></div>
          </div>
          <div>
            <div className="text-xs font-semibold text-onyx-600 mb-2">.acko-btn</div>
            <div className="flex gap-3">
              <button className="acko-btn bg-purple-600 text-white hover:bg-purple-700 px-6">Primary</button>
              <button className="acko-btn bg-green-600 text-white hover:bg-green-700 px-6">Confirm</button>
              <button className="acko-btn border border-onyx-300 text-onyx-700 px-6">Secondary</button>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-onyx-600 mb-2">.acko-input</div>
            <input className="acko-input" placeholder="Input with 44px height, 8px radius, purple focus ring" style={{ maxWidth: 375 }} />
          </div>
          <div>
            <div className="text-xs font-semibold text-onyx-600 mb-2">.toggle-track</div>
            <div className="flex gap-4 items-center">
              <div className="toggle-track on"><div className="toggle-thumb" /></div>
              <span className="text-xs text-onyx-500">ON</span>
              <div className="toggle-track off"><div className="toggle-thumb" /></div>
              <span className="text-xs text-onyx-500">OFF</span>
              <div className="toggle-track off" style={{ opacity: 0.4 }}><div className="toggle-thumb" /></div>
              <span className="text-xs text-onyx-500">Disabled</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
