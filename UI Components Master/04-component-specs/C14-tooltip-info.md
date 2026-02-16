# C14 -- Tooltip / Info

| Property | Value |
|----------|-------|
| **ID** | C14 |
| **Name** | Tooltip/Info |
| **Priority** | P1 |
| **Layers** | ALL |
| **Construct** | All |

---

## Description

Information tooltips that explain insurance terminology. Appear as popovers when users tap on terms they don't understand.

---

## Variants

| Variant | Context | Description |
|---------|---------|-------------|
| `popover` | All layers | Small overlay with explanation text |

---

## States

| State | Visual Treatment | Trigger |
|-------|-----------------|---------|
| `closed` | Hidden (not rendered) | Default |
| `open` | Visible popover with content | User taps info icon or term |

---

## Tooltip Terms by Layer

| Layer | Terms |
|-------|-------|
| L0 | (none defined) |
| L1 | Sum Insured, Floater, Cashless |
| L2 | Dependent, Relationship |
| L3 | Tier, Sum Insured |
| L4 | Top-up, Secondary, Add-on |
| L5 | Premium, Salary Deduction |
| L6 | (none defined) |

---

## Figma Notes

- Build as a popover component with an arrow/tail
- Background: `bg-onyx-800 text-white text-xs rounded-lg px-3 py-2`
- Arrow: `border-4 border-transparent border-t-onyx-800` pointing down
- Position: centered above the trigger element
- Content is a text override
