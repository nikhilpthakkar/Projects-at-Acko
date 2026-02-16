# C06 -- Premium Calculator

| Property | Value |
|----------|-------|
| **ID** | C06 |
| **Name** | Premium Calculator |
| **Priority** | P0 |
| **Layers** | L3, L4, L5 |
| **Construct** | All |

---

## Description

Displays premium costs. Has an inline variant (compact summary) used in L3/L4 and a detailed variant (full breakdown with progress bars) used in L5.

---

## Variants

### `inline` (L3, L4)

Simple summary bar showing premium impact of current selection.

```
┌──────────────────────────────────────┐
│  Premium impact          ₹X from    │
│                          wallet      │
└──────────────────────────────────────┘
```

- Container: `bg-onyx-100 rounded-xl p-3`
- Layout: flex justify-between
- Label: `text-sm text-onyx-500`
- Value: `font-semibold text-onyx-800`

**Content by layer:**

| Layer | Construct | Value shown |
|-------|-----------|-------------|
| L3 | Modular | "Included" or "+₹500/month" or "+₹1,200/month" |
| L3 | Flex | "₹{walletUsed} from wallet" |
| L4 | All | "₹{topUp + secondary + addOns}/yr" as "Enhancement total" |

---

### `detailed` (L5)

Full premium breakdown card with dark header, progress bars, and line-item table.

```
┌══════════════════════════════════════┐
║  Total Annual Premium                ║  <- dark bg (onyx-800)
║  ₹24,000                            ║
║  ₹2,000/month                       ║
├──────────────────────────────────────┤
│  [Company] pays    ₹12,000 (50%)    │
│  [████████░░░░░░░░]                  │  <- green progress bar
│                                      │
│  You pay           ₹12,000 (50%)    │
│  [████████░░░░░░░░]                  │  <- orange progress bar
│  ─────────────────────────────────   │
│  BREAKDOWN                           │
│  Base Coverage             ₹12,000   │
│  Top-up                     ₹4,800   │
│  Secondary                  ₹9,600   │
│  Add-ons                    ₹2,400   │
└──────────────────────────────────────┘
```

**Dark header:**
- `bg-onyx-800 text-white p-4`
- "Total Annual Premium": `text-xs opacity-70`
- Amount: `text-3xl font-bold mt-1`
- Monthly: `text-xs opacity-70 mt-1`

**Split bars:**
- Label row: flex justify-between, `text-sm`
  - Employer/Wallet: `font-bold text-green-700`
  - Employee: `font-bold text-orange-700`
- Bar: `w-full bg-onyx-200 rounded-full h-3`
  - Employer fill: `bg-green-500 rounded-full h-3`
  - Employee fill: `bg-orange-500 rounded-full h-3`
  - Width = percentage of total

**Breakdown table:**
- `border-t border-onyx-200 pt-3`
- Section label: `text-xs font-semibold text-onyx-600 mb-2`
- Each row: `flex justify-between text-sm py-1.5 border-b border-onyx-100`
  - Item name: `text-onyx-700`
  - Cost: `font-medium`
- Only shows items with cost > 0

---

## States

| State | Visual Treatment | Trigger |
|-------|-----------------|---------|
| `calculated` | Shows computed values | Normal |
| `loading` | Shimmer skeleton | Calculating |
| `error` | E-L4-02: "Unable to calculate premium" | Calc failure |

---

## Premium Calculation Data

| Input | Formula |
|-------|---------|
| Base | SI cost or Tier cost, multiplied by (1 + (members-1) * 0.25) |
| Top-up | ₹4,800/yr if enabled |
| Secondary | ₹9,600/yr if enabled |
| Add-ons | OPD: ₹2,400, Dental: ₹1,800, Wellness: ₹1,200 |
| **Total** | Base + TopUp + Secondary + AddOns |

### Payment split by construct

| Construct | Employer/Wallet | Employee |
|-----------|----------------|----------|
| VANILLA (all employer) | Total | ₹0 |
| VANILLA (employee enhancements) | Base | TopUp + Secondary + AddOns |
| MODULAR | Base | TopUp + Secondary + AddOns |
| FLEX | min(Total, ₹25,000) | max(0, Total - ₹25,000) |
| Partial | 70% of Base | Rest |

---

## Figma Notes

- Build two component variants: `Premium/Inline` and `Premium/Detailed`
- Detailed variant: auto-layout vertical, dark header as nested frame
- Progress bars: two-layer rectangle (track + fill), fill width as percentage
- Breakdown: repeating list item component
