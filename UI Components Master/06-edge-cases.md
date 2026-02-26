# 06 -- Edge Cases

> Per-layer edge cases with expected UI behavior. Each should be accounted for in Figma prototypes. Updated to v3 (32 edge cases).

---

## L0 -- Context & Welcome

| EC ID | Edge Case | Expected UI Behavior | Construct |
|-------|-----------|---------------------|-----------|
| EC01 | Employee has no dependents but plan covers ESC | Allow enrollment, info message about incomplete family | All |
| EC03 | Multiple packages available | Show package selector before welcome screen (dropdown or card selector) | All |
| EC27 | Exception plan (skip to e-card) | Skip entire flow, show success screen directly with pre-generated e-card | Exception |
| EC-NEW-02 | Incomplete enrollment expectation | L0: Clear messaging "Complete all steps to confirm your enrollment". Progress indicator. Banner: "Your selections will only be saved once you complete all steps." | All |

---

## L1 -- Base Coverage View

| EC ID | Edge Case | Expected UI Behavior | Construct |
|-------|-----------|---------------------|-----------|
| EC04 | Show wallet prominently | Wallet bar (C10 banner) appears as the first element below headline | Flex |
| EC05 | Grade-based: Only eligible plans | Non-eligible tiers greyed out with "Not available for your grade" label | Modular (grade-based) |

---

## L2 -- Family Configuration

| EC ID | Edge Case | Expected UI Behavior | Construct |
|-------|-----------|---------------------|-----------|
| EC02 | Employee adds parent but base plan is ESC only | L2: Show inline premium "Parents not in base — ₹X additional". L4: Parental coverage as pre-selected enhancement. No redirect loop. | All |
| EC03 | Employee removes dependent mid-flow | Recalculate premium, confirmation dialog, premium update | All |
| EC04 | Plan allows ESCP, employee adds 2 parents | Allow if plan permits, show both parents in summary | All |
| EC06 | Family changes affect wallet | Orange-100 warning banner: "Family changes affect wallet allocation" below member list | Flex |
| EC06 (v2) | Downgrade from ESCP to ESC — parents become ineligible | Warn user, warning modal with impact explanation, remove parents from coverage | Flex |
| EC-NEW-01 | Data mismatch — more dependents than allowed | Show selection UI: "Select which [relation] to cover under this policy." Clear policy limit messaging. E.g. "Your policy covers 1 child. Please select which child to include." | All |

---

## L3 -- Plan Selection

| EC ID | Edge Case | Expected UI Behavior | Construct |
|-------|-----------|---------------------|-----------|
| EC09 | Show price delta clearly | Each tier card shows "+₹X/mo" in orange-700 next to tier name | Modular |
| EC10 | Wallet meter real-time | Wallet bar (C10) updates instantly as SI or family options change | Flex |
| EC11 | Downgrade selection | Warning text: "Selecting a lower plan reduces your coverage" below cards | Modular, Flex |
| EC12 | No tiers available (only base) | Hide tier selection, proceed as Vanilla, skip L3 | Modular |
| EC13 | Grade restricts available tiers | Show only eligible tiers, filter tier list by grade | Modular |

---

## L4 -- Enhancement Options

| EC ID | Edge Case | Expected UI Behavior | Construct |
|-------|-----------|---------------------|-----------|
| EC18 | Add-on eligibility depends on base SI | OPD card shows error if SI < ₹5L; toggle disabled with explanation | Flex |
| EC19 | OPD add-on only if SI > 7L | Hide OPD if SI <= 7L, conditional add-on display | All |
| EC14 | Consolidated top-up spans base+secondary | Single top-up card covers both base and secondary plan | Vanilla (consolidated) |
| EC05 (Flex) | Split family — spouse and children have different coverage | Show split clearly, handle as per plan config | All |

---

## L5 -- Premium & Payment

| EC ID | Edge Case | Expected UI Behavior | Construct |
|-------|-----------|---------------------|-----------|
| EC14 | All employer-paid: Skip layer | L5 is not shown; flow goes directly from L4 to L6 | Employer-only configs |
| EC15 | Wallet insufficient for base plan minimum | Require employee top-up, clear shortfall amount | Flex |
| EC16 | Flex wallet overflow | Separate orange alert card showing overflow amount and salary deduction consent | Flex |
| EC17 | Partial employer subsidy | Premium card shows "Subsidized by [Company]: ₹X" with subsidy percentage highlighted | Partial payment configs |
| EC10 | CD balance insufficient | Block e-card, "Policy issuance pending" message, flag for HR | cdCheck configs |

---

## L6 -- Review & Consent

| EC ID | Edge Case | Expected UI Behavior | Construct |
|-------|-----------|---------------------|-----------|
| EC24 | Pre-enrollment: "Submit Preferences" | CTA text changes, blue-200 banner: "Pre-enrollment: preferences only, not final" | Pre-enroll configs |
| EC21-23 | Min participation: Pending warning | Orange-100 banner: "E-card pending minimum participation" below consents. Component-level: TopUp / Secondary / Add-ons each shown separately. | minPart configs |
| EC20 | CD check: E-card delay warning | Blue info text: "CD balance check in progress" | cdCheck configs |

---

## System / Cross-Layer

| EC ID | Edge Case | Expected UI Behavior | Construct |
|-------|-----------|---------------------|-----------|
| EC07 | Session expires mid-enrollment | Resume from last saved state. Login redirect then resume. | All |
| EC08 | Premium calculation API fails | Error state with retry button | All |
| EC09 | E-card generation fails | Pending state with support contact | All |
| EC11 | User upgrades then downgrades back | Allow, warn about losing benefits, track final selection | Modular |
| EC-NEW-03 | Drop-off recovery | In-app back nav: modal "Exit enrollment? Selections won't be saved." App close: log drop-off, trigger email/WhatsApp/push. Re-entry: summary of previous stage, option to continue or restart. | All |
| EC-NEW-04 | Re-enrollment override | Modal: "You've already enrolled. Starting again will override." Display current selections summary. Confirmation required. | All |

---

## Summary Table

| Category | Count | Most Impactful |
|----------|-------|----------------|
| L0 | 4 | Incomplete enrollment expectation (EC-NEW-02) |
| L1 | 2 | Flex wallet display |
| L2 | 6 | Data mismatch selection (EC-NEW-01) |
| L3 | 5 | Real-time wallet meter |
| L4 | 4 | SI-dependent eligibility |
| L5 | 5 | Wallet overflow consent |
| L6 | 3 | Component-level min participation |
| System | 6 | Drop-off recovery (EC-NEW-03) |
| **Total** | **35** | |

Note: Some edge cases from the v3 sheet (EC25, EC26, EC28) are lower priority (P2) and can be addressed in later iterations.
