# C07 -- Add-on Card

| Property | Value |
|----------|-------|
| **ID** | C07 |
| **Name** | Add-on Card |
| **Priority** | P1 |
| **Layers** | L4 |
| **Construct** | When `addOns` is configured |

---

## Description

Toggle card for individual add-on benefits. Up to 3 can appear (OPD, Dental, Wellness). Each has a toggle switch, cost, and optional POPULAR badge.

---

## Variants

| Variant | Context | Description |
|---------|---------|-------------|
| `toggle` | L4 | Card with name, description, cost, toggle switch |

---

## States

| State | Visual Treatment | Trigger |
|-------|-----------------|---------|
| `available` | Default border (`border-onyx-200`), toggle OFF | Initial |
| `selected` | Purple border (`border-purple-400 bg-purple-50`), toggle ON | User toggles on |
| `disabled` | Greyed out, toggle disabled | Eligibility failed (E-L4-01) |
| `popular` | Same as available/selected + POPULAR badge | OPD add-on (hardcoded) |

---

## Anatomy

```
┌──────────────────────────────────────┐
│  OPD Cover  [POPULAR]      [toggle] │
│  ₹15,000/year | ₹2,400/yr          │
└──────────────────────────────────────┘
```

- Card: `border rounded-xl p-3 transition-all`
  - Off: `border-onyx-200`
  - On: `border-purple-400 bg-purple-50`
- Name: `font-medium text-sm`
- POPULAR badge: `px-1.5 py-0.5 bg-orange-200 text-orange-700 text-[9px] font-bold rounded`
- Description: `text-xs text-onyx-500 mt-0.5` -- "{coverage}/year | ₹{cost}/yr"
- Toggle: C-Toggle component, right-aligned

---

## Add-on Data

| Add-on | Description | Coverage | Annual Cost | Badge |
|--------|-------------|----------|-------------|-------|
| OPD Cover | OPD Cover | ₹15,000/year | ₹2,400 | POPULAR |
| Dental & Vision | Dental & Vision | ₹10,000/year | ₹1,800 | -- |
| Wellness Program | Health checkups | Health checkups | ₹1,200 | -- |

---

## Eligibility Rules

| Rule | Error | Severity |
|------|-------|----------|
| OPD requires SI >= ₹5L (Flex only) | "OPD requires Sum Insured >= ₹5L" | blocking |
| Add-on requires base SI >= ₹7L (general) | E-L4-01 | blocking |

---

## Flex-specific

When construct is FLEX, each add-on cost deducts from the wallet. The cost label may show "from wallet" text.

---

## Figma Notes

- Single component with boolean properties: `selected`, `popular`, `disabled`
- Toggle is a nested C-Toggle instance
- Auto-layout horizontal: text block (fill) + toggle (fixed)
