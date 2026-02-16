"use client";
import React from "react";
import { Shield, Users, Heart, CreditCard, CheckCircle2, Info, AlertCircle, AlertTriangle, ChevronLeft, Plus, Trash2, Wallet, RefreshCw, Loader2, ChevronRight } from "lucide-react";

/* ── Shared sub-components ────────────────────────── */
const Toggle = ({ on, disabled }: { on: boolean; disabled?: boolean }) => (
  <div className={`toggle-track ${on ? "on" : "off"} ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}>
    <div className="toggle-thumb" />
  </div>
);

const WalletBarInner = ({ used, total, mini }: { used: number; total: number; mini?: boolean }) => {
  const pct = Math.min(100, (used / total) * 100);
  const over = used > total;
  return (
    <div className={mini ? "" : "bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-4 text-white"}>
      {!mini && <div className="flex items-center gap-2 mb-2"><Wallet size={16} /><span className="text-sm font-semibold">Wallet Balance</span></div>}
      {!mini && <div className="flex justify-between text-xs opacity-80 mb-1"><span>Used: ₹{used.toLocaleString()}</span><span>Remaining: ₹{Math.max(0, total - used).toLocaleString()}</span></div>}
      <div className={`w-full ${mini ? "h-1.5" : "h-2"} rounded-full ${over ? "bg-cerise-200" : mini ? "bg-purple-200" : "bg-purple-400"}`}>
        <div className={`h-full rounded-full transition-all ${over ? "bg-cerise-500" : "bg-white"}`} style={{ width: `${Math.min(100, pct)}%` }} />
      </div>
      {over && !mini && <div className="text-xs mt-2 text-orange-200 flex items-center gap-1"><AlertTriangle size={12} />Exceeds wallet by ₹{(used - total).toLocaleString()}</div>}
    </div>
  );
};

/* ── C01: Progress Stepper ────────────────────────── */
export function PreviewC01({ state }: { state: string }) {
  const steps = ["Welcome", "Coverage", "Family", "Plans", "Enhance", "Payment", "Review"];
  const activeIdx = state === "completed" ? 6 : state === "active" ? 3 : 0;
  return (
    <div className="px-4 py-3 bg-white rounded-xl border border-onyx-300 font-[var(--font-euclid)]" style={{ maxWidth: 375 }}>
      <div className="flex items-center gap-1.5">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 flex flex-col items-center">
            <div className={`h-1.5 w-full rounded-full ${i < activeIdx ? "bg-purple-600" : i === activeIdx ? "bg-purple-400" : "bg-onyx-300"}`} />
            <span className={`text-[8px] mt-1 ${i === activeIdx ? "text-purple-700 font-bold" : i < activeIdx ? "text-purple-400" : "text-onyx-400"}`}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── C02: Coverage Card ────────────────────────── */
export function PreviewC02({ state }: { state: string }) {
  if (state === "loading") return <div className="rounded-xl p-4 space-y-3 border border-onyx-300" style={{ maxWidth: 375 }}><div className="skeleton-shimmer h-8 w-32" /><div className="skeleton-shimmer h-4 w-24" /><div className="skeleton-shimmer h-3 w-full mt-3" /><div className="skeleton-shimmer h-3 w-3/4" /></div>;
  if (state === "error") return <div className="rounded-xl p-4 border border-cerise-200 bg-cerise-200" style={{ maxWidth: 375 }}><div className="flex items-center gap-2 text-cerise-700 text-sm"><AlertCircle size={16} />Unable to load coverage details.</div></div>;
  return (
    <div className="border border-onyx-300 rounded-xl p-4 bg-white" style={{ maxWidth: 375 }}>
      <div className="flex justify-between items-start mb-3">
        <div><div className="text-2xl font-bold text-onyx-800">₹5,00,000</div><div className="text-xs text-onyx-500">Sum Insured</div></div>
        <span className="px-2 py-1 bg-blue-200 text-blue-700 rounded text-[10px] font-medium flex items-center gap-1"><Info size={10} />Floater</span>
      </div>
      <div className="border-t border-onyx-200 pt-3 space-y-2">
        <div className="text-xs font-semibold text-onyx-600 mb-1">COVERED FAMILY</div>
        {["Self (Employee)", "Spouse"].map(m => <div key={m} className="flex items-center gap-2 text-sm text-onyx-700"><Users size={14} className="text-purple-500" />{m}<CheckCircle2 size={14} className="text-green-600 ml-auto" /></div>)}
      </div>
    </div>
  );
}

/* ── C03: Plan Selector ────────────────────────── */
export function PreviewC03({ variant, state }: { variant: string; state: string }) {
  if (variant === "tier-cards") {
    const tiers = [{ name: "Silver", si: "₹3L", price: "Included", priceColor: "text-green-700" }, { name: "Gold", si: "₹5L", price: "+₹500/mo", priceColor: "text-orange-700" }, { name: "Platinum", si: "₹10L", price: "+₹1,200/mo", priceColor: "text-orange-700" }];
    const selectedIdx = state === "selected" ? 1 : -1;
    return (
      <div className="space-y-3" style={{ maxWidth: 375 }}>
        {tiers.map((t, i) => (
          <div key={t.name} className={`border-2 rounded-xl p-4 transition-all ${state === "disabled" && i > 0 ? "opacity-40 cursor-not-allowed" : ""} ${i === selectedIdx ? "border-purple-600 bg-purple-50" : "border-onyx-300"}`}>
            <div className="flex justify-between items-start mb-2">
              <div><div className="flex items-center gap-2"><span className="font-bold text-sm">{t.name}</span>{i === selectedIdx && <span className="px-2 py-0.5 bg-purple-200 text-purple-700 rounded text-[10px] font-bold">SELECTED</span>}{i === 0 && <span className="px-2 py-0.5 bg-onyx-200 text-onyx-500 rounded text-[10px]">DEFAULT</span>}</div><div className="text-xs text-onyx-500 mt-0.5">{t.si} Sum Insured</div></div>
              <div className={`font-bold text-sm ${t.priceColor}`}>{t.price}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="border border-onyx-300 rounded-xl p-4 bg-white" style={{ maxWidth: 375 }}>
      <div className="text-xs font-semibold text-onyx-600 mb-3">SELECT SUM INSURED</div>
      <div className="flex flex-wrap gap-2">
        {["3L", "5L", "7L", "10L", "15L"].map((si, i) => (
          <button key={si} className={`px-4 py-2 rounded-lg text-sm font-medium border-2 ${state === "selected" && i === 1 ? "border-purple-600 bg-purple-50 text-purple-700" : "border-onyx-300 text-onyx-600"}`}>{si}</button>
        ))}
      </div>
      <div className="text-xs font-semibold text-onyx-600 mt-4 mb-3">FAMILY COVERAGE</div>
      {["Self only", "Self + Spouse", "Self + Family", "Self + Family + Parents"].map((f, i) => (
        <div key={f} className={`flex items-center gap-3 p-3 rounded-lg mb-2 ${state === "selected" && i === 1 ? "bg-purple-50 border-2 border-purple-600" : "border border-onyx-200"}`}>
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${state === "selected" && i === 1 ? "border-purple-600" : "border-onyx-300"}`}>{state === "selected" && i === 1 && <div className="w-3 h-3 rounded-full bg-purple-600" />}</div>
          <span className="text-sm text-onyx-700">{f}</span>
        </div>
      ))}
    </div>
  );
}

/* ── C04: Member Card ────────────────────────── */
export function PreviewC04({ state }: { state: string }) {
  return (
    <div className="border border-onyx-300 rounded-xl p-4 bg-white" style={{ maxWidth: 375 }}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center"><Users size={18} className="text-purple-600" /></div>
          <div><div className="font-semibold text-sm text-onyx-800">Employee</div><div className="text-xs text-onyx-500">Self | 32 yrs | Male</div></div>
        </div>
        {state === "removable" && <button className="text-cerise-700 p-1"><Trash2 size={16} /></button>}
      </div>
    </div>
  );
}

/* ── C05: Member Form ────────────────────────── */
export function PreviewC05({ state }: { state: string }) {
  if (state === "collapsed") return (
    <button className="w-full border-2 border-dashed border-onyx-300 rounded-xl py-4 text-sm text-purple-600 font-medium flex items-center justify-center gap-2" style={{ maxWidth: 375 }}><Plus size={16} />Add family member</button>
  );
  return (
    <div className="border-2 border-purple-300 rounded-xl p-4 bg-purple-50 space-y-3" style={{ maxWidth: 375 }}>
      <div className="text-sm font-semibold text-purple-700">Add Family Member</div>
      <input placeholder="Name" className="acko-input text-sm" style={{ height: 40 }} defaultValue={state === "error" ? "" : "Parent"} />
      <select className="acko-input text-sm" style={{ height: 40 }}><option value="">Select Relationship</option><option>Spouse</option><option>Child</option><option>Parent</option></select>
      <div className="flex gap-2"><input placeholder="Age" type="number" className="acko-input text-sm flex-1" style={{ height: 40 }} defaultValue={state === "error" ? "85" : ""} /><select className="acko-input text-sm flex-1" style={{ height: 40 }}><option value="">Gender</option><option>Male</option><option>Female</option></select></div>
      {state === "error" && <div className="text-xs text-cerise-700 flex items-center gap-1"><AlertCircle size={12} />Parent age cannot exceed 80 years</div>}
      <div className="flex gap-2"><button className="flex-1 bg-purple-600 text-white rounded-lg py-2 text-sm font-semibold">Add</button><button className="flex-1 border border-onyx-300 rounded-lg py-2 text-sm text-onyx-600">Cancel</button></div>
    </div>
  );
}

/* ── C06: Premium Calculator ────────────────────────── */
export function PreviewC06({ variant, state }: { variant: string; state: string }) {
  if (state === "loading") return <div className="space-y-2" style={{ maxWidth: 375 }}><div className="skeleton-shimmer h-20 w-full rounded-xl" /><div className="skeleton-shimmer h-4 w-3/4" /></div>;
  if (state === "error") return <div className="bg-cerise-200 text-cerise-700 rounded-xl p-4 text-sm flex items-center gap-2" style={{ maxWidth: 375 }}><AlertCircle size={16} />Unable to calculate premium</div>;
  if (variant === "inline") return (
    <div className="bg-onyx-200 rounded-xl p-3" style={{ maxWidth: 375 }}><div className="flex justify-between text-sm"><span className="text-onyx-500">Premium impact</span><span className="font-semibold text-onyx-800">+₹500/month</span></div></div>
  );
  return (
    <div className="border border-onyx-300 rounded-xl overflow-hidden" style={{ maxWidth: 375 }}>
      <div className="bg-onyx-800 text-white p-4"><div className="text-xs opacity-70">Total Annual Premium</div><div className="text-3xl font-bold mt-1">₹24,000</div><div className="text-xs opacity-70 mt-1">₹2,000/month</div></div>
      <div className="p-4 space-y-4">
        <div><div className="flex justify-between text-sm mb-2"><span className="text-onyx-500">[Company] pays</span><span className="font-bold text-green-700">₹12,000 (50%)</span></div><div className="w-full bg-onyx-200 rounded-full h-3"><div className="bg-green-500 rounded-full h-3" style={{ width: "50%" }} /></div></div>
        <div><div className="flex justify-between text-sm mb-2"><span className="text-onyx-500">You pay</span><span className="font-bold text-orange-700">₹12,000 (50%)</span></div><div className="w-full bg-onyx-200 rounded-full h-3"><div className="bg-orange-500 rounded-full h-3" style={{ width: "50%" }} /></div></div>
        <div className="border-t border-onyx-200 pt-3"><div className="text-xs font-semibold text-onyx-600 mb-2">BREAKDOWN</div>{[["Base Coverage", "₹12,000"], ["Top-up", "₹4,800"], ["Add-ons", "₹7,200"]].map(([item, cost]) => <div key={item} className="flex justify-between text-sm py-1.5 border-b border-onyx-100"><span className="text-onyx-700">{item}</span><span className="font-medium">{cost}</span></div>)}</div>
      </div>
    </div>
  );
}

/* ── C07: Add-on Card ────────────────────────── */
export function PreviewC07({ state }: { state: string }) {
  const isOn = state === "selected";
  return (
    <div className={`border rounded-xl p-3 transition-all ${isOn ? "border-purple-400 bg-purple-50" : state === "disabled" ? "border-onyx-200 opacity-40" : "border-onyx-200"}`} style={{ maxWidth: 375 }}>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2"><span className="font-medium text-sm">OPD Cover</span>{(state === "popular" || state === "available") && <span className="px-1.5 py-0.5 bg-orange-200 text-orange-700 text-[9px] font-bold rounded">POPULAR</span>}</div>
          <div className="text-xs text-onyx-500 mt-0.5">₹15,000/year | ₹2,400/yr</div>
        </div>
        <Toggle on={isOn} disabled={state === "disabled"} />
      </div>
    </div>
  );
}

/* ── C08: Top-up Card ────────────────────────── */
export function PreviewC08({ state }: { state: string }) {
  return (
    <div className="border border-onyx-300 rounded-xl p-4 bg-white" style={{ maxWidth: 375 }}>
      <div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-blue-200 flex items-center justify-center"><Shield size={18} className="text-blue-700" /></div><div><div className="font-semibold text-sm">Top-up Cover</div><div className="text-xs text-onyx-500">Extra ₹5L after base exhausted</div></div></div><div className="text-sm font-bold">₹4,800/yr</div></div>
      <div className="mt-3 flex items-center justify-between"><span className="text-xs text-onyx-600">{state === "selected" ? "Added" : "Add to coverage"}</span><Toggle on={state === "selected"} /></div>
    </div>
  );
}

/* ── C09: Secondary Plan Card ────────────────────────── */
export function PreviewC09({ state }: { state: string }) {
  return (
    <div className="border border-onyx-300 rounded-xl p-4 bg-white" style={{ maxWidth: 375 }}>
      <div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-green-200 flex items-center justify-center"><Users size={18} className="text-green-700" /></div><div><div className="font-semibold text-sm">Parent Cover</div><div className="text-xs text-onyx-500">₹3L for parents</div></div></div><div className="text-sm font-bold">₹9,600/yr</div></div>
      <div className="mt-3 flex items-center justify-between"><span className="text-xs text-onyx-600">{state === "selected" ? "Added" : "Add to coverage"}</span><Toggle on={state === "selected"} /></div>
    </div>
  );
}

/* ── C10: Wallet Display ────────────────────────── */
export function PreviewC10({ variant, state }: { variant: string; state: string }) {
  const used = state === "exceeded" ? 30000 : state === "partial" ? 15000 : 0;
  if (variant === "mini") return <div style={{ maxWidth: 375 }}><WalletBarInner used={used} total={25000} mini /></div>;
  if (variant === "inline") return (
    <div className="flex items-center gap-3 bg-purple-100 rounded-xl p-3" style={{ maxWidth: 375 }}><Wallet size={16} className="text-purple-600" /><div className="flex-1"><div className="text-xs text-purple-700 font-semibold">₹{Math.max(0, 25000 - used).toLocaleString()} remaining</div><WalletBarInner used={used} total={25000} mini /></div></div>
  );
  return <div style={{ maxWidth: 375 }}><WalletBarInner used={used} total={25000} /></div>;
}

/* ── C11: Consent Checkbox ────────────────────────── */
export function PreviewC11({ variant, state }: { variant: string; state: string }) {
  const labels: Record<string, string> = { standard: "I agree to the terms and conditions of the group health insurance policy", "salary-deduction": "I consent to ₹2,000/month salary deduction", "wallet-overflow": "I acknowledge the wallet overflow of ₹5,000" };
  const checked = state === "checked";
  return (
    <div className="flex items-start gap-3" style={{ maxWidth: 375 }}>
      <div className={`w-5 h-5 border-2 rounded mt-0.5 flex-shrink-0 flex items-center justify-center transition-all ${checked ? "border-purple-600 bg-purple-600" : state === "error" ? "border-cerise-500" : "border-onyx-300"}`}>
        {checked && <CheckCircle2 size={14} className="text-white" />}
      </div>
      <span className="text-xs text-onyx-600 leading-relaxed">{labels[variant] || labels.standard}</span>
    </div>
  );
}

/* ── C12: Review Summary ────────────────────────── */
export function PreviewC12() {
  return (
    <div className="space-y-3" style={{ maxWidth: 375 }}>
      {[{ icon: Shield, title: "Coverage", content: "Gold Tier - ₹5L Floater" }, { icon: Users, title: "Family (2)", content: "Self, Spouse" }, { icon: Heart, title: "Enhancements", content: "Top-up: ₹4,800/yr" }, { icon: CreditCard, title: "Your Investment", content: "₹2,000/month from salary" }].map(s => (
        <div key={s.title} className="border border-onyx-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><s.icon size={16} className="text-purple-600" /><span className="font-semibold text-sm">{s.title}</span></div><button className="text-xs text-purple-600 font-medium">Edit</button></div>
          <div className="text-sm text-onyx-600">{s.content}</div>
        </div>
      ))}
    </div>
  );
}

/* ── C13: Success Screen ────────────────────────── */
export function PreviewC13({ variant }: { variant: string }) {
  const headlines: Record<string, string> = { confirmed: "Enrollment Confirmed!", "pending-mp": "Enrollment Confirmed!", "pending-cd": "Enrollment Confirmed!", preferences: "Preferences Submitted!" };
  const messages: Record<string, string> = { confirmed: "Your e-card has been generated successfully!", "pending-mp": "E-card will be generated once minimum participation is met.", "pending-cd": "CD balance check in progress. E-card will be generated shortly.", preferences: "Your preferences have been recorded." };
  return (
    <div className="text-center space-y-4 bg-white rounded-xl p-6" style={{ maxWidth: 375 }}>
      <div className="w-20 h-20 rounded-full bg-green-200 flex items-center justify-center mx-auto"><CheckCircle2 size={40} className="text-green-700" /></div>
      <h2 className="text-xl font-bold text-onyx-800">{headlines[variant]}</h2>
      <p className="text-sm text-onyx-500">{messages[variant]}</p>
      {variant === "confirmed" && <div className="border border-green-200 rounded-xl p-4 bg-green-100 text-left"><div className="text-xs font-semibold text-green-700 mb-2">E-CARD READY</div><div className="bg-white rounded-lg p-3 border border-green-200"><div className="flex items-center gap-3"><Shield size={24} className="text-purple-600" /><div><div className="font-bold text-sm">ACKO Health</div><div className="text-xs text-onyx-500">Policy: GMC-V11</div></div></div></div></div>}
      <button className="bg-purple-600 text-white rounded-xl px-6 py-2.5 text-sm font-semibold flex items-center gap-2 mx-auto"><RefreshCw size={16} />Start Over</button>
    </div>
  );
}

/* ── C14: Tooltip ────────────────────────── */
export function PreviewC14({ state }: { state: string }) {
  return (
    <div className="relative inline-block" style={{ maxWidth: 375 }}>
      <span className="text-sm text-purple-600 underline cursor-pointer">Sum Insured</span>
      {state === "open" && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-onyx-800 text-white text-xs rounded-lg whitespace-nowrap z-10">
          Maximum amount the insurer will pay
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-onyx-800" />
        </div>
      )}
    </div>
  );
}

/* ── C15: Error Message ────────────────────────── */
export function PreviewC15({ variant, state }: { variant: string; state: string }) {
  if (state === "hidden") return <div className="text-xs text-onyx-400 italic p-4">(Error message hidden — no errors)</div>;
  if (variant === "banner") return <div className="bg-cerise-200 text-cerise-700 rounded-xl p-4 text-sm flex items-center gap-2" style={{ maxWidth: 375 }}><AlertCircle size={16} />Unable to submit. Please retry.</div>;
  return <div className="text-xs text-cerise-700 bg-cerise-200 rounded-lg px-3 py-2 flex items-center gap-2" style={{ maxWidth: 375 }}><AlertCircle size={14} />Please accept terms and conditions</div>;
}

/* ── C16: Loading State ────────────────────────── */
export function PreviewC16({ variant }: { variant: string }) {
  if (variant === "spinner") return <div className="flex items-center justify-center p-8"><Loader2 size={32} className="text-purple-600 animate-spin" /></div>;
  return (
    <div className="space-y-3 p-4 bg-white rounded-xl border border-onyx-300" style={{ maxWidth: 375 }}>
      <div className="skeleton-shimmer h-6 w-32" />
      <div className="skeleton-shimmer h-4 w-48" />
      <div className="skeleton-shimmer h-24 w-full" />
      <div className="skeleton-shimmer h-4 w-3/4" />
      <div className="skeleton-shimmer h-4 w-1/2" />
    </div>
  );
}

/* ── C17: Comparison Table ────────────────────────── */
export function PreviewC17({ state }: { state: string }) {
  const tiers = [{ name: "Silver", si: "₹3L", price: "Included", network: "Basic", roomRent: "Sub-limits" }, { name: "Gold", si: "₹5L", price: "+₹500/mo", network: "Wide", roomRent: "Waived" }, { name: "Platinum", si: "₹10L", price: "+₹1,200/mo", network: "Global", roomRent: "Waived" }];
  const selected = state === "interactive" ? 1 : -1;
  return (
    <div className="overflow-hidden rounded-xl border border-onyx-300" style={{ maxWidth: 375 }}>
      <div className="grid grid-cols-3">
        {tiers.map((t, i) => (
          <div key={t.name} className={`p-3 text-center border-r border-onyx-200 last:border-r-0 ${i === selected ? "bg-purple-50" : "bg-white"}`}>
            <div className={`font-bold text-sm mb-1 ${i === selected ? "text-purple-700" : "text-onyx-800"}`}>{t.name}</div>
            <div className="text-xs text-onyx-500">{t.si}</div>
            <div className={`text-xs font-semibold mt-2 ${i === 0 ? "text-green-700" : "text-orange-700"}`}>{t.price}</div>
            <div className="mt-2 space-y-1 text-[10px] text-onyx-600">
              <div>{t.network}</div>
              <div>{t.roomRent}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Renderer map ────────────────────────── */
export const PREVIEW_MAP: Record<string, React.FC<{ variant: string; state: string }>> = {
  C01: ({ state }) => <PreviewC01 state={state} />,
  C02: ({ state }) => <PreviewC02 state={state} />,
  C03: ({ variant, state }) => <PreviewC03 variant={variant} state={state} />,
  C04: ({ state }) => <PreviewC04 state={state} />,
  C05: ({ state }) => <PreviewC05 state={state} />,
  C06: ({ variant, state }) => <PreviewC06 variant={variant} state={state} />,
  C07: ({ state }) => <PreviewC07 state={state} />,
  C08: ({ state }) => <PreviewC08 state={state} />,
  C09: ({ state }) => <PreviewC09 state={state} />,
  C10: ({ variant, state }) => <PreviewC10 variant={variant} state={state} />,
  C11: ({ variant, state }) => <PreviewC11 variant={variant} state={state} />,
  C12: () => <PreviewC12 />,
  C13: ({ variant }) => <PreviewC13 variant={variant} />,
  C14: ({ state }) => <PreviewC14 state={state} />,
  C15: ({ variant, state }) => <PreviewC15 variant={variant} state={state} />,
  C16: ({ variant }) => <PreviewC16 variant={variant} />,
  C17: ({ state }) => <PreviewC17 state={state} />,
};
