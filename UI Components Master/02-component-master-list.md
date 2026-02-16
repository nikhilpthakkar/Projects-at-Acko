# 02 -- Component Master List

> All 17 UI components used across the GMC Flow Engine interactive mobile simulator. Each row is one Figma component to build.

---

## Master Table

| ID | Component Name | Layer(s) | Priority | Variants | States | Construct Condition | Suggested Figma Frame |
|----|----------------|----------|----------|----------|--------|---------------------|----------------------|
| C01 | Progress Stepper | ALL | P0 | `horizontal` | `active` (current layer highlighted), `completed` (filled bar), `upcoming` (grey bar) | All constructs | `Stepper/Horizontal` |
| C02 | Coverage Card | L1, L3, L4 | P0 | `view-only` | `default` (showing SI + family list) | All constructs | `Card/Coverage` |
| C03 | Plan Selector | L3 | P0 | `tier-cards` (Modular), `configurator` (Flex) | `default` (no selection), `selected` (highlighted tier/SI), `disabled` (grade-restricted) | Modular: tier-cards, Flex: configurator, Vanilla: skip | `PlanSelector/TierCards`, `PlanSelector/Configurator` |
| C04 | Member Card | L2, L6 | P0 | `compact` | `view` (display mode), `removable` (with delete icon, non-Self members) | All constructs | `Card/Member` |
| C05 | Member Form | L2 | P0 | `add` | `empty` (blank form), `filled` (with values), `error` (validation failed) | All constructs | `Form/AddMember` |
| C06 | Premium Calculator | L3, L4, L5 | P0 | `inline` (compact summary), `detailed` (full breakdown with bars) | `calculated` (showing values), `loading` (shimmer), `error` (calc failed) | All constructs (varies by layer) | `Premium/Inline`, `Premium/Detailed` |
| C07 | Add-on Card | L4 | P1 | `toggle` | `available` (can toggle on), `selected` (toggled on, purple border), `disabled` (eligibility failed), `popular` (with POPULAR badge) | Only when `addOns` is configured | `Card/Addon` |
| C08 | Top-up Card | L4 | P1 | `standard`, `modular` | `available` (can toggle), `selected` (toggled on) | Only when `topUp` is configured | `Card/TopUp` |
| C09 | Secondary Plan Card | L4 | P1 | `single`, `multi-plan` | `available` (can toggle), `selected` (toggled on) | Only when `secondary` is configured | `Card/SecondaryPlan` |
| C10 | Wallet Display | L1, L3, L4, L5 | P0-FLEX | `banner` (full bar + labels), `detailed` (with breakdown), `inline` (compact bar + remaining text), `mini` (thin bar only) | `full` (under budget), `partial` (partially used), `exceeded` (over wallet, cerise bar + warning) | Flex only | `Wallet/Banner`, `Wallet/Detailed`, `Wallet/Inline`, `Wallet/Mini` |
| C11 | Consent Checkbox | L6 | P0 | `standard` (terms), `salary-deduction` (salary consent), `wallet-overflow` (wallet acknowledgment) | `unchecked` (empty border), `checked` (purple filled + checkmark), `error` (cerise border) | Standard: all. Salary: when employee pays. Wallet: Flex with overflow | `Checkbox/Consent` |
| C12 | Review Summary | L6 | P0 | `detailed` | `editable` (with Edit links per section) | All constructs | `Card/ReviewSummary` |
| C13 | Success Screen | POST | P0 | `confirmed` (e-card ready), `pending-mp` (min participation), `pending-cd` (CD check), `preferences` (pre-enrollment) | `success` (green icon + card), `pending` (info message) | All constructs | `Screen/Success` |
| C14 | Tooltip/Info | ALL | P1 | `popover` | `closed` (hidden), `open` (visible with content) | All constructs | `Tooltip/Popover` |
| C15 | Error Message | ALL | P0 | `inline` (within content), `banner` (full-width) | `hidden` (not shown), `visible` (cerise bg + icon + message) | All constructs | `Message/Error` |
| C16 | Loading State | ALL | P1 | `skeleton` (shimmer blocks), `spinner` (circular) | `loading` (animated) | All constructs | `State/Loading` |
| C17 | Comparison Table | L3, L4 | P1 | `side-by-side` | `interactive` (selectable columns) | Modular only | `Table/Comparison` |

---

## Priority Legend

| Priority | Meaning | Figma Implication |
|----------|---------|-------------------|
| **P0** | Must-have for all flows | Build first, include in all screen mocks |
| **P0-FLEX** | Must-have but only for Flex construct | Build but only compose into Flex screens |
| **P1** | Important but not blocking | Build after P0, may be hidden in minimal flows |

---

## Component Count by Layer

| Layer | P0 Components | P1 Components | Total | Flex-specific |
|-------|---------------|---------------|-------|---------------|
| L0 | C01 | C14, C15 | 3 | -- |
| L1 | C01, C02 | C14, C15 | 4 | +C10 |
| L2 | C01, C04, C05 | C14, C15 | 5 | -- |
| L3 | C01, C03, C06 | C14, C15, C17 | 6 | +C10 |
| L4 | C01 | C07, C08, C09, C14, C15 | 6 | +C10 |
| L5 | C01, C06 | C14, C15 | 4 | +C10 |
| L6 | C01, C04, C11, C12 | C14, C15 | 6 | +C11 (wallet variant) |
| POST | C13 | -- | 1 | -- |

---

## Variant Matrix (Component x Construct)

| Component | VANILLA | MODULAR | FLEX |
|-----------|---------|---------|------|
| C01 Stepper | Same | Same | Same |
| C02 Coverage | view-only | view-only | view-only + wallet context |
| C03 Plan Selector | N/A (skip L3) | tier-cards (3 tiers) | configurator (SI + family) |
| C04 Member Card | compact | compact | compact + wallet impact notice |
| C05 Member Form | add | add | add + wallet warning |
| C06 Premium | inline/detailed | inline/detailed + tier delta | inline/detailed + wallet split |
| C07 Add-on Card | toggle | toggle | toggle + wallet deduction |
| C08 Top-up Card | standard | modular | standard + from wallet |
| C09 Secondary Card | single | single | single + from wallet |
| C10 Wallet | N/A | N/A | banner / detailed / inline / mini |
| C11 Consent | standard | standard + salary | standard + salary + wallet-overflow |
| C12 Review Summary | coverage + family | + tier name | + wallet usage + overflow charge |
| C13 Success | confirmed / pending | confirmed / pending | confirmed / pending + wallet summary |
