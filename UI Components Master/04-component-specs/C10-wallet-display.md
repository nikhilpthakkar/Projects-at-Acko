# C10 -- Wallet Display

| Property | Value |
|----------|-------|
| **ID** | C10 |
| **Name** | Wallet Display |
| **Priority** | P0-FLEX |
| **Layers** | L1, L3, L4, L5 |
| **Construct** | Flex only |

---

## Description

Shows the user's wallet balance, usage, and remaining amount. The most construct-specific component -- appears only in Flex flows. Has 4 distinct size variants.

---

## Variants

### `banner` (L1, L3)

Full-width gradient bar with labels and progress.

```
┌══════════════════════════════════════┐
║  🔑 Wallet Balance                   ║
║  Used: ₹12,000    Remaining: ₹13,000║
║  [████████████░░░░░░░░░░░]           ║
║  ⚠ Exceeds wallet by ₹X (if over)   ║
└══════════════════════════════════════┘
```

- Container: `bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-4 text-white`
- Header: Wallet icon (16px) + "Wallet Balance" (`text-sm font-semibold`)
- Labels: `text-xs opacity-80` -- "Used: ₹X" / "Remaining: ₹X"
- Track: `h-2 rounded-full bg-purple-400` (or `bg-cerise-200` when exceeded)
- Fill: `h-full rounded-full bg-white` (or `bg-cerise-500` when exceeded)
- Width: percentage of used/total, capped at 100%
- Overflow warning: `text-xs mt-2 text-orange-200` with AlertTriangle icon

---

### `detailed` (L5)

Same as banner but with detailed breakdown context (used in premium section).

---

### `inline` (L4)

Compact horizontal bar with remaining amount.

```
┌──────────────────────────────────────┐
│  🔑 ₹13,000 remaining  [████░░░░]   │
└──────────────────────────────────────┘
```

- Container: `flex items-center gap-3 bg-purple-100 rounded-xl p-3`
- Wallet icon: `text-purple-600` (16px)
- Text: `text-xs text-purple-700 font-semibold`
- Mini bar: WalletBar with `mini` prop

---

### `mini` (bar only)

Just the thin progress bar, no labels.

- Track: `h-1.5 rounded-full bg-purple-200` (or `bg-cerise-200`)
- Fill: `h-full rounded-full bg-white` (or `bg-cerise-500`)

---

## States

| State | Visual Treatment | Trigger |
|-------|-----------------|---------|
| `full` | Bar empty/minimal, all white fill | No selections yet (L1) |
| `partial` | Bar partially filled | Some wallet used |
| `exceeded` | Cerise track + fill, overflow warning | Used > ₹25,000 total |

---

## Data

| Property | Value |
|----------|-------|
| Wallet total | ₹25,000 |
| Used | Calculated from selections |
| Remaining | max(0, total - used) |
| Overflow | max(0, used - total) |

---

## Figma Notes

- Build 4 component variants: Banner, Detailed, Inline, Mini
- Banner and Detailed share most structure (gradient bg)
- Progress bar: two nested rectangles (track + fill), fill width as percentage
- State property: normal / exceeded (changes colors)
- The banner variant is the most visually prominent -- use as hero element on Flex screens

---

## Base Variable vs Base Fixed (v3)

| Flex Base Type | Wallet Variants Used | Context |
|---------------|---------------------|---------|
| Base Variable (F01-F05, F11-F15) | `banner`, `detailed`, `inline`, `mini` — all 4 variants | Employee configures SI, family. Wallet shows real-time impact. |
| Base Fixed (F06-F10, F16-F20) | `banner`, `inline` — 2 variants only | Fixed base plan. Wallet shown for enhancement spending only. |

Note: Base Fixed does not need `detailed` or `mini` variants because the base plan cost is fixed — wallet changes only come from L4 enhancements.
