# C02 -- Coverage Card

| Property | Value |
|----------|-------|
| **ID** | C02 |
| **Name** | Coverage Card |
| **Priority** | P0 |
| **Layers** | L1, L3, L4 |
| **Construct** | All |

---

## Description

Displays the user's base coverage information including Sum Insured amount, coverage type badge, and list of covered family members.

---

## Variants

| Variant | Context | Description |
|---------|---------|-------------|
| `view-only` | L1 | Full card with SI, badge, family list, key benefits |

---

## States

| State | Visual Treatment | Trigger |
|-------|-----------------|---------|
| `default` | White card, `border-onyx-300`, standard display | Normal load |
| `loading` | Skeleton shimmer blocks | Data fetching |
| `error` | Error banner E-L1-01 shown | API failure |

---

## Anatomy

```
┌──────────────────────────────────────┐
│  ₹5,00,000              [Floater]   │
│  Sum Insured                         │
│  ─────────────────────────────────   │
│  COVERED FAMILY                      │
│  👤 Self (Employee)            ✓     │
│  👤 Spouse                     ✓     │
└──────────────────────────────────────┘
```

- Card: `border border-onyx-300 rounded-xl p-4`
- SI amount: `text-2xl font-bold text-onyx-800`
- "Sum Insured" label: `text-xs text-onyx-500`
- Floater badge: `px-2 py-1 bg-blue-200 text-blue-700 rounded text-[10px] font-medium` with Info icon
- Family section: `border-t border-onyx-200 pt-3`
- Each member: Users icon (purple-500) + relation text + CheckCircle2 (green-600) right-aligned

---

## Content Slots

| Slot | VANILLA / MODULAR | FLEX |
|------|-------------------|------|
| SI Amount | ₹5,00,000 (fixed) | Dynamic based on selectedSI (₹9,600--₹30,000 mapped) |
| Badge | Floater | Floater |
| Family list | From members array | From members array |

---

## Key Benefits (below card in L1)

| Benefit |
|---------|
| Cashless at 10,000+ hospitals |
| Pre & Post hospitalization |
| Day care procedures |
| Ambulance charges |

Each with CheckCircle2 icon (green-500), text-sm.

---

## Figma Notes

- Auto-layout vertical, 16px padding
- SI number and badge in horizontal auto-layout with space-between
- Family section as repeating list item component
- Benefits as separate component below card
