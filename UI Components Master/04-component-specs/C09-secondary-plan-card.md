# C09 -- Secondary Plan Card

| Property | Value |
|----------|-------|
| **ID** | C09 |
| **Name** | Secondary Plan Card |
| **Priority** | P1 |
| **Layers** | L4 |
| **Construct** | When `secondary` is configured |

---

## Description

Card offering secondary/parent coverage as an additional plan. Has a toggle to opt in/out.

---

## Variants

| Variant | Context | Description |
|---------|---------|-------------|
| `single` | Most configs | One secondary plan option |
| `multi-plan` | When secondary='multi' | Multiple secondary options to choose from |

---

## States

| State | Visual Treatment | Trigger |
|-------|-----------------|---------|
| `available` | Default card, toggle OFF | Initial |
| `selected` | Toggle ON | User toggles on |

---

## Anatomy

```
┌──────────────────────────────────────┐
│  [Users]  Parent Cover    ₹9,600/yr │
│           ₹3L for parents            │
│  ────────────────────────────────    │
│  Add to coverage           [toggle]  │
└──────────────────────────────────────┘
```

- Card: `border border-onyx-300 rounded-xl p-4`
- Icon container: `w-10 h-10 rounded-lg bg-green-200` with Users icon (green-700, 18px)
- Title: `font-semibold text-sm` -- "Parent Cover"
- Description: `text-xs text-onyx-500` -- "₹3L for parents"
- Cost: `text-sm font-bold` (right-aligned)
- Toggle row: same pattern as C08

---

## Data

| Property | Value |
|----------|-------|
| Annual cost | ₹9,600 |
| Coverage | ₹3L for parents |

---

## Figma Notes

- Near-identical layout to C08 (Top-up Card)
- Different icon (Users vs Shield) and color (green vs blue)
- Consider building C08 and C09 as variants of the same base component `Card/Enhancement`
