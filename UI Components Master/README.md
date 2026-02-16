# UI Components Master -- GMC Flow Engine

> Single source of truth for all UI components, states, variants, and content used in the GMC Flow Engine Simulator interactive mobile preview. Use this to build and maintain Figma designs.

---

## How to Use

1. **Building in Figma** -- Start with `01-design-tokens.md` to set up your Figma variables (colors, typography, shadows). Then use `02-component-master-list.md` as your checklist of what to build.
2. **Per-component detail** -- Open the matching file in `04-component-specs/` for full variant/state/content specs.
3. **Screen-level reference** -- Use `03-layer-screens.md` to see which components appear on each screen and how they compose together.
4. **Content & copy** -- `07-content-framework.md` has every headline, subtext, CTA, tooltip, and anxiety reducer per layer per construct.
5. **Edge cases & errors** -- `05-error-states.md` and `06-edge-cases.md` document what can go wrong and how the UI should respond.
6. **Spreadsheet use** -- The `exports/` folder has CSV versions of the key tables.

## Quick Reference

| Stat | Count |
|------|-------|
| Components | 17 (C01--C17) |
| Layers/Screens | 8 (L0--L6 + Success) |
| Constructs | 3 (Vanilla, Modular, Flex) |
| Policy Combinations | 52 |
| Error Definitions | 21 |
| Edge Cases | 17 |

---

## File Index

| File | Description |
|------|-------------|
| `01-design-tokens.md` | ACKO design system: colors, typography, shadows, spacing, border radii, component classes |
| `02-component-master-list.md` | All 17 components in one master table with variants, states, layers, priority |
| `03-layer-screens.md` | Per-screen specs (L0--L6 + Success): component inventory, content, layout, construct variations |
| `04-component-specs/` | 17 individual component spec files with full variant/state/interaction detail |
| `05-error-states.md` | All error definitions: ID, layer, message, severity, trigger, UI treatment |
| `06-edge-cases.md` | Per-layer edge cases with expected UI behavior |
| `07-content-framework.md` | Complete content matrix: headlines, subtexts, CTAs, tooltips, anxiety reducers |
| `08-interaction-patterns.md` | Navigation model, stepper, floating CTA, toggles, validation flows |
| `exports/` | CSV exports of key tables for spreadsheet/plugin use |

---

## Mapping to Code

All data in this folder is extracted from:
- **`gmc-flow-engine-simulator.jsx`** -- the single-file React app containing all components, logic, and data
- **Source objects**: `UI_COMPONENTS`, `LAYER_META`, `LAYER_ERRORS`, `LAYER_EDGE_CASES`, `PremiumCalc`, `FlowEngine`, `ackoStyles`

When you update a component in Figma, the corresponding code changes go into the `MobileSimulator` / `renderScreen()` function in that file.

---

## Construct Quick Guide

| Construct | Base Model | Plan Selection | Payment | Key Difference |
|-----------|-----------|----------------|---------|----------------|
| **VANILLA** | Fixed SI | No selection (skip L3) | Employer or Employee | Simplest flow, fewest decisions |
| **MODULAR** | Tiered plans | Choose Silver/Gold/Platinum | Employer + Employee upgrade | Tier-based selection with price delta |
| **FLEX** | Wallet-based | Configure SI + Family | Wallet with overflow | Most complex: wallet meter, real-time budget tracking |
