# 05 -- Error States

> All error definitions, validation messages, and their UI treatments. Build each as a Figma state variant.

---

## System-Defined Errors (from LAYER_ERRORS)

These are predefined error scenarios per layer.

| Error ID | Layer | Error Name | User Message | Severity | UI Treatment |
|----------|-------|------------|--------------|----------|-------------|
| E-L0-01 | L0 | Session expired | Please refresh to continue. | critical | Full-screen blocking overlay, refresh CTA |
| E-L1-01 | L1 | Policy data unavailable | Unable to load coverage details. | critical | Error banner replacing coverage card |
| E-L2-01 | L2 | DOB required | Date of birth is required | validation | Inline error below DOB field (red border) |
| E-L2-02 | L2 | Max dependents | Maximum dependents reached | warning | Orange banner, add button disabled |
| E-L2-03 | L2 | Age limit | Parent age exceeds limit (80 years) | validation | Inline error in add form |
| E-L3-01 | L3 | Selection required | Please select a plan to continue | validation | CTA disabled, inline message below selector |
| E-L3-02 | L3 | Wallet exceeded | Selections exceed wallet balance | warning | Wallet bar turns cerise, overflow warning shown |
| E-L3-03 | L3 | Grade restriction | Not available for your grade | blocking | Tier card greyed out, disabled |
| E-L4-01 | L4 | Eligibility failed | Add-on requires base SI >= 7L | blocking | Add-on card disabled, error below |
| E-L4-02 | L4 | Premium calc failed | Unable to calculate premium | critical | Error banner replacing premium display |
| E-L5-01 | L5 | CD balance insufficient | E-card may be delayed | warning | Info banner on premium page |
| E-L5-02 | L5 | Wallet overflow | Consent for salary deduction required | warning | Orange alert card with overflow amount |
| E-L6-01 | L6 | Consent required | Accept terms to proceed | validation | Checkbox border turns cerise, error below |
| E-L6-02 | L6 | Submission failed | Unable to submit. Please retry. | critical | Error banner, CTA changes to "Retry" |
| E-L6-03 | L6 | Min participation pending | E-card pending threshold | info | Blue info banner below consents |

---

## Runtime Validation Errors (from validate/addMember functions)

These are triggered by user interaction within the mobile simulator.

| Error Key | Layer | Trigger | Message | Component Affected |
|-----------|-------|---------|---------|-------------------|
| `errors.members` | L2 | Submit with 0 members | "At least one member required" | C15 inline below member list |
| `errors.addForm` | L2 | Add with empty name/relation | "Name and relation are required" | C15 inline in add form |
| `errors.addForm` | L2 | Add when 6 members exist | "Maximum 6 members allowed" | C15 inline in add form |
| `errors.addForm` | L2 | Parent age > 80 | "Parent age cannot exceed 80 years" | C15 inline in add form |
| `errors.addForm` | L2 | Child age > 25 | "Child age cannot exceed 25 years" | C15 inline in add form |
| `errors.addon` | L4 | Toggle OPD with SI=3L (Flex) | "OPD requires Sum Insured >= ₹5L" | C15 inline below add-ons |
| `errors.consent` | L6 | Submit without terms checked | "Please accept terms and conditions" | C15 inline below checkboxes |
| `errors.salary` | L6 | Submit without salary consent | "Please consent to salary deduction" | C11 checkbox border cerise + C15 |
| `errors.wallet` | L6 | Submit without wallet consent | "Please acknowledge wallet overflow" | C11 checkbox border cerise + C15 |

---

## Severity Visual Guide

| Severity | Badge Style | Background | Icon | Description |
|----------|-------------|------------|------|-------------|
| **critical** | `bg-cerise-700 text-white` | cerise-200 | AlertCircle (red) | System failure, blocks entire flow |
| **blocking** | `bg-cerise-700 text-white` | cerise-200 | AlertCircle (red) | Feature-specific, blocks that option |
| **validation** | `bg-orange-700 text-white` | cerise-200 or inline | AlertCircle (orange) | User input error, fixable |
| **warning** | `bg-orange-500 text-white` | orange-100 | AlertTriangle (orange) | Non-blocking advisory |
| **info** | `bg-blue-700 text-white` | blue-200 | Info (blue) | Informational, no action needed |

---

## Error Clearing Behavior

| Trigger | Behavior |
|---------|----------|
| User fixes the input | Error clears immediately |
| Navigate to a different layer | Errors reset |
| Toggle add-on off/on | Add-on error clears |
| Check a consent box | Related consent error clears |
| Config/combo change | All errors reset |
