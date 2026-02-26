# Corrected Source — v3 CSV Exports

Programmatic CSV exports of `GMC_Final_Combinations_Complete_v3.xlsx`.
The `.xlsx` file remains the canonical source of truth for PM review.
These CSVs are consumed by the simulator, UI Components Master, and UI Deliverable List.

## File Index

| File | Sheet | Rows | Description |
|------|-------|------|-------------|
| `1_Combinations.csv` | 1. Combinations | 51 combos | V01-V20, M01-M11, F01-F20 with construct variables, payment variables, and post-construct modifiers |
| `2_JTBDs.csv` | 2. JTBDs | 51 rows | Jobs-To-Be-Done per combination |
| `3_Onboarding_Framework.csv` | 3. Onboarding Framework | 7 layers | L0-L6 layer definitions with UI patterns and content |
| `4_Decision_Matrix.csv` | 4. Decision Matrix | 51 rows | Layer-by-layer decision type (V/D/S/C) per combination |
| `5_UI_Components.csv` | 5. UI Components | 17 components | C01-C17 component registry |
| `6_Scalability_Rules.csv` | 6. Scalability Rules | 30 rules | Engine rules for layer visibility, payment, validation |
| `7_Edge_Cases.csv` | 7. Edge Cases | 32 cases | EC01-EC28 + EC-NEW-01 to EC-NEW-04 |
| `8_Post-Construct_Modifiers.csv` | 8. Post-Construct Modifiers | 5 modifiers | Min Part (component-level), Pre-Enrollment, CD Check, Grade-Based, E-Card |
| `9_Configuration_Variables.csv` | 9. Configuration Variables | Cross-cutting | Add-On Variable and Paid By Variable options |
| `10_Change_Log.csv` | 10. Change Log | 19 entries | v2 → v3 change history |

## Combination Counts

| Construct | Count | IDs |
|-----------|-------|-----|
| VANILLA | 20 | V01-V20 |
| MODULAR | 11 | M01-M11 |
| FLEX | 20 | F01-F20 |
| **Total** | **51** | |

Note: V20 is flagged for review (structurally identical to V12, differs only by system flags).
