# C17 -- Comparison Table

| Property | Value |
|----------|-------|
| **ID** | C17 |
| **Name** | Comparison Table |
| **Priority** | P1 |
| **Layers** | L3, L4 |
| **Construct** | Modular only |

---

## Description

Side-by-side comparison of plan tiers allowing users to compare features, coverage, and pricing before selecting.

---

## Variants

| Variant | Context | Description |
|---------|---------|-------------|
| `side-by-side` | L3 (Modular) | 3-column comparison grid |

---

## States

| State | Visual Treatment | Trigger |
|-------|-----------------|---------|
| `interactive` | Columns are clickable to select tier | Normal |

---

## Comparison Data

| Feature | Silver | Gold | Platinum |
|---------|--------|------|----------|
| Sum Insured | ₹3L | ₹5L | ₹10L |
| Monthly Cost | Included | +₹500/mo | +₹1,200/mo |
| Network | Basic | Wide | Global |
| Room Rent | Sub-limits | Waived | Waived |
| Sub-limits | Yes | Reduced | None |

---

## Figma Notes

- Build as a grid/table component
- 3 columns, each selectable
- Selected column: purple-600 header highlight
- Consider as an expanded view of C03 tier-cards
- May be shown below the tier cards on larger screens
