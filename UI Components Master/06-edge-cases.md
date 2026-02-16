# 06 -- Edge Cases

> Per-layer edge cases with expected UI behavior. Each should be accounted for in Figma prototypes.

---

## L0 -- Context & Welcome

| Edge Case | Expected UI Behavior | Construct |
|-----------|---------------------|-----------|
| Exception plan (skip to e-card) | Skip entire flow, show success screen directly with pre-generated e-card | All |
| Multiple packages available | Show package selector before welcome screen (dropdown or card selector) | All |

---

## L1 -- Base Coverage View

| Edge Case | Expected UI Behavior | Construct |
|-----------|---------------------|-----------|
| Show wallet prominently | Wallet bar (C10 banner) appears as the first element below headline | Flex |
| Grade-based: Only eligible plans | Non-eligible tiers greyed out with "Not available for your grade" label | Modular (grade-based) |

---

## L2 -- Family Configuration

| Edge Case | Expected UI Behavior | Construct |
|-----------|---------------------|-----------|
| Family changes affect wallet | Orange-100 warning banner: "Family changes affect wallet allocation" below member list | Flex |
| Parent age > 80 | Block addition with inline error: "Parent age cannot exceed 80 years" in add form | All |
| Mid-flow family change | Warning dialog: "Changing family members may affect your premium and coverage selections" | All |

---

## L3 -- Plan Selection

| Edge Case | Expected UI Behavior | Construct |
|-----------|---------------------|-----------|
| Show price delta clearly | Each tier card shows "+₹X/mo" in orange-700 next to tier name | Modular |
| Wallet meter real-time | Wallet bar (C10) updates instantly as SI or family options change | Flex |
| Downgrade selection | Warning text: "Selecting a lower plan reduces your coverage" below cards | Modular, Flex |

---

## L4 -- Enhancement Options

| Edge Case | Expected UI Behavior | Construct |
|-----------|---------------------|-----------|
| Add-on eligibility depends on SI | OPD card shows error if SI < ₹5L; toggle disabled with explanation | Flex |
| Consolidated top-up spans base+secondary | Single top-up card covers both base and secondary plan | Vanilla (consolidated) |
| Exception plan: Skip | L4 skipped entirely, flow goes from L3 to L5/L6 | Exception configs |

---

## L5 -- Premium & Payment

| Edge Case | Expected UI Behavior | Construct |
|-----------|---------------------|-----------|
| All employer-paid: Skip layer | L5 is not shown; flow goes directly from L4 to L6 | Employer-only configs |
| Flex wallet overflow | Separate orange alert card showing overflow amount and required salary deduction consent | Flex |
| Partial employer subsidy | Premium card shows "Subsidized by [Company]: ₹X" with subsidy percentage highlighted | Partial payment configs |

---

## L6 -- Review & Consent

| Edge Case | Expected UI Behavior | Construct |
|-----------|---------------------|-----------|
| Pre-enrollment: "Submit Preferences" | CTA text changes, blue-200 banner: "Pre-enrollment: preferences only, not final" | Pre-enroll configs |
| Min participation: Pending warning | Orange-100 banner: "E-card pending minimum participation" below consents | minPart configs |
| CD check: E-card delay warning | Blue info text on success screen: "CD balance check in progress" | cdCheck configs |

---

## Summary Table

| Layer | Count | Most Impactful |
|-------|-------|----------------|
| L0 | 2 | Exception plan skip |
| L1 | 2 | Flex wallet display |
| L2 | 3 | Age validation blocking |
| L3 | 3 | Real-time wallet meter |
| L4 | 3 | SI-dependent eligibility |
| L5 | 3 | Wallet overflow consent |
| L6 | 3 | Pre-enrollment CTA change |
| **Total** | **19** | |
