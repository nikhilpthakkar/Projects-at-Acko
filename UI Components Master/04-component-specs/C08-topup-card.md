# C08 -- Top-up Card

| Property | Value |
|----------|-------|
| **ID** | C08 |
| **Name** | Top-up Card |
| **Priority** | P1 |
| **Layers** | L4 |
| **Construct** | When `topUp` is configured |

---

## Description

Card offering additional top-up coverage that activates after the base sum insured is exhausted. Has a toggle to opt in/out.

---

## Variants

| Variant | Context | Description |
|---------|---------|-------------|
| `standard` | Vanilla, Flex | Standard top-up with fixed amount |
| `modular` | Modular | Tier-based top-up |

---

## States

| State | Visual Treatment | Trigger |
|-------|-----------------|---------|
| `available` | Default card, toggle OFF | Initial |
| `selected` | Toggle ON, card unchanged | User toggles on |

---

## Anatomy

```
┌──────────────────────────────────────┐
│  [Shield]  Top-up Cover   ₹4,800/yr │
│            Extra ₹5L after           │
│            base exhausted            │
│  ────────────────────────────────    │
│  Add to coverage           [toggle]  │
└──────────────────────────────────────┘
```

- Card: `border border-onyx-300 rounded-xl p-4`
- Icon container: `w-10 h-10 rounded-lg bg-blue-200` with Shield icon (blue-700, 18px)
- Title: `font-semibold text-sm`
- Description: `text-xs text-onyx-500`
- Cost: `text-sm font-bold` (right-aligned)
- Flex note: `text-[10px] text-purple-600` "from wallet"
- Toggle row: `mt-3 flex items-center justify-between`
- Label: `text-xs text-onyx-600` -- "Added" when on, "Add to coverage" when off

---

## Data

| Property | Value |
|----------|-------|
| Annual cost | ₹4,800 |
| Coverage | Extra ₹5L after base exhausted |

---

## Figma Notes

- Auto-layout vertical
- Top section: horizontal auto-layout (icon + text + cost)
- Bottom section: horizontal auto-layout (label + toggle)
- Divider line between sections
