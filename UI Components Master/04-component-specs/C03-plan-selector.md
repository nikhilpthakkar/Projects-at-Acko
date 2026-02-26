# C03 -- Plan Selector

| Property | Value |
|----------|-------|
| **ID** | C03 |
| **Name** | Plan Selector |
| **Priority** | P0 |
| **Layers** | L3 |
| **Construct** | Modular, Flex (Vanilla skips L3) |

---

## Description

The primary decision component on L3. Has two completely different variants based on construct: tier cards for Modular, and a configurator for Flex.

---

## Variant 1: `tier-cards` (MODULAR — Tier Upgrade)

### States

| State | Visual Treatment | Trigger |
|-------|-----------------|---------|
| `default` | No selection highlighted, Silver has DEFAULT badge | Initial load |
| `selected` | Selected card: `border-2 border-purple-600 bg-purple-50` + SELECTED badge | User clicks a tier |
| `disabled` | Card: `opacity-40 cursor-not-allowed` | Grade restriction (E-L3-03) |

### Anatomy (per tier card)

```
┌──────────────────────────────────────┐
│  Silver  [DEFAULT]     Included      │
│  ₹3L Sum Insured                     │
│  [Basic coverage] [Cashless network] │
└──────────────────────────────────────┘
```

- Card: `border-2 rounded-xl p-4 cursor-pointer transition-all`
- Selected: `border-purple-600 bg-purple-50`
- Unselected: `border-onyx-300 hover:border-purple-300`
- Tier name: `font-bold text-sm`
- SELECTED badge: `px-2 py-0.5 bg-purple-200 text-purple-700 rounded text-[10px] font-bold`
- DEFAULT badge: `px-2 py-0.5 bg-onyx-200 text-onyx-500 rounded text-[10px]`
- Price: `font-bold text-sm` -- green-700 for "Included", orange-700 for "+₹X/mo"
- SI: `text-xs text-onyx-500`
- Features: `text-[10px] px-2 py-0.5 bg-onyx-100 text-onyx-600 rounded-full` (flex-wrap)

### Tier Data

| Tier | SI | Monthly Price | Features |
|------|-----|---------------|----------|
| Silver | ₹3L | Included | Basic coverage, Cashless network |
| Gold | ₹5L | +₹500/mo | Enhanced coverage, Wider network, Room rent waiver |
| Platinum | ₹10L | +₹1,200/mo | Premium coverage, Global, No sub-limits |

---

## Variant 2: `configurator` (FLEX)

> For Base Variable configurations (F01-F05, F11-F15). Base Fixed configurations (F06-F10, F16-F20) show a view-only coverage card instead.

### States

| State | Visual Treatment | Trigger |
|-------|-----------------|---------|
| `default` | 5L selected, Self + Spouse family | Initial load |
| `selected` | Active SI button: `border-2 border-purple-600 bg-purple-50 text-purple-700` | User selects |
| `exceeded` | Wallet bar turns cerise, overflow warning | Selections > wallet |

### Anatomy

```
┌──────────────────────────────────────┐
│  SELECT SUM INSURED                  │
│  [3L] [5L] [7L] [10L] [15L]         │
│                                      │
│  FAMILY COVERAGE                     │
│  ○ Self only                         │
│  ● Self + Spouse                     │
│  ○ Self + Family                     │
│  ○ Self + Family + Parents           │
└──────────────────────────────────────┘
```

- Container: `border border-onyx-300 rounded-xl p-4`
- Section labels: `text-xs font-semibold text-onyx-600 mb-3`
- SI buttons: `px-4 py-2 rounded-lg text-sm font-medium border-2`
  - Selected: `border-purple-600 bg-purple-50 text-purple-700`
  - Unselected: `border-onyx-300 text-onyx-600 hover:border-purple-300`
- Radio items: `p-3 rounded-lg mb-2 cursor-pointer`
  - Selected: `bg-purple-50 border-2 border-purple-600`
  - Unselected: `border border-onyx-200 hover:border-purple-300`
- Radio circle: `w-5 h-5 rounded-full border-2`
  - Selected: `border-purple-600` with inner `w-3 h-3 rounded-full bg-purple-600`
  - Unselected: `border-onyx-300`

### SI Options

| Option | Annual Cost |
|--------|-------------|
| 3L | ₹9,600 |
| 5L | ₹12,000 |
| 7L | ₹16,800 |
| 10L | ₹21,600 |
| 15L | ₹30,000 |

### Family Options

| Option | Index |
|--------|-------|
| Self only | 0 |
| Self + Spouse | 1 |
| Self + Family | 2 |
| Self + Family + Parents | 3 |

---

## Figma Notes

- Build as two separate components: `PlanSelector/TierCards` and `PlanSelector/Configurator`
- Tier cards: vertical auto-layout of 3 card instances, each with boolean "selected" property
- Configurator: vertical auto-layout with SI button row (horizontal) and radio list (vertical)
- Both need a premium impact summary below (see C06)

---

## Variant 3: `view-only` (MODULAR M01, M07 / FLEX Base Fixed)

### States

| State | Visual Treatment | Trigger |
|-------|-----------------|---------|
| `default` | Assigned plan/tier shown, no selection UI | Config has no upgrade option |

### Anatomy

```
┌──────────────────────────────────────┐
│  Your Assigned Plan                  │
│  Gold - ₹5L Sum Insured             │
│  [Enhanced coverage] [Wider network] │
│                                      │
│  ℹ️ This plan is assigned by your    │
│     employer and cannot be changed   │
└──────────────────────────────────────┘
```

- Used for M01 (view tier only, no upgrade), M07 (view tier + add-ons only), and Base Fixed Flex configs
- Card style same as tier-cards but without selection border or SELECTED badge
- Info text: `text-xs text-onyx-500 italic`
