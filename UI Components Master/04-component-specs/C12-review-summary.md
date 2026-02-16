# C12 -- Review Summary

| Property | Value |
|----------|-------|
| **ID** | C12 |
| **Name** | Review Summary |
| **Priority** | P0 |
| **Layers** | L6 |
| **Construct** | All |

---

## Description

Collection of summary cards on the review screen, each showing a section of the user's selections with an "Edit" link to navigate back to the relevant layer.

---

## Variants

| Variant | Context | Description |
|---------|---------|-------------|
| `detailed` | L6 | Multiple section cards, each editable |

---

## States

| State | Visual Treatment | Trigger |
|-------|-----------------|---------|
| `editable` | "Edit" link visible on each card | Normal |

---

## Section Cards

### Coverage Card

```
┌──────────────────────────────────────┐
│  🛡 Coverage                  Edit   │
│  Gold Tier - ₹5L Floater            │
└──────────────────────────────────────┘
```

- Icon: Shield (purple-600, 16px)
- Title: "Coverage" (`font-semibold text-sm`)
- Edit: `text-xs text-purple-600 font-medium` -- navigates to L1
- Content: Tier name + SI (Modular), SI (Flex), "₹5L Floater" (Vanilla)

### Family Card

```
┌──────────────────────────────────────┐
│  👥 Family (3)                Edit   │
│  Self, Spouse, Child                 │
└──────────────────────────────────────┘
```

- Icon: Users (purple-600, 16px)
- Title: "Family ({count})"
- Edit: navigates to L2
- Content: comma-separated relation list

### Enhancements Card (conditional)

Only shown if any enhancement is active (topUp, secondary, or addOns).

```
┌──────────────────────────────────────┐
│  ❤ Enhancements              Edit   │
│  Top-up: ₹4,800/yr                  │
│  Secondary: ₹9,600/yr               │
│  OPD Cover                           │
└──────────────────────────────────────┘
```

- Icon: Heart (purple-600, 16px)
- Edit: navigates to L4
- Content: list of active enhancements with costs

### Investment Card (conditional)

Only shown if employee pays > ₹0.

```
┌──────────────────────────────────────┐
│  💳 Your Investment                  │
│  ₹2,000/month from salary           │
│  ₹12,000 from wallet                │
│  + ₹5,000 overflow charge           │
└──────────────────────────────────────┘
```

- Icon: CreditCard (purple-600, 16px)
- Title: "Your Investment"
- Content: monthly deduction, wallet usage (Flex), overflow (if any, orange-700 font-semibold)

---

## Card Styling

- Each: `border border-onyx-200 rounded-xl p-4`
- Header: flex items-center justify-between, `mb-2`
- Icon + title: flex items-center gap-2
- Content: `text-sm text-onyx-600`

---

## Figma Notes

- Build as a set of section cards, each a component variant
- Each card: auto-layout vertical, header (horizontal with space-between) + content
- "Edit" button is a text link, not a button -- interactions navigate to specific layers
- Enhancements and Investment cards have boolean visibility
