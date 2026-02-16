# C15 -- Error Message

| Property | Value |
|----------|-------|
| **ID** | C15 |
| **Name** | Error Message |
| **Priority** | P0 |
| **Layers** | ALL |
| **Construct** | All |

---

## Description

Inline error and warning messages that appear when validation fails or system errors occur.

---

## Variants

| Variant | Context | Description |
|---------|---------|-------------|
| `inline` | Within content flow | Small cerise banner with icon and message |
| `banner` | Full-width alerts | Wider banner for system-level errors |

---

## States

| State | Visual Treatment | Trigger |
|-------|-----------------|---------|
| `hidden` | Not rendered | No errors |
| `visible` | Cerise background with icon and message | Validation/system error |

---

## Anatomy

```
┌──────────────────────────────────────┐
│  ⚠ Error message text here          │
└──────────────────────────────────────┘
```

- Container: `text-xs text-cerise-700 bg-cerise-200 rounded-lg px-3 py-2 flex items-center gap-2`
- Icon: AlertCircle (cerise-700, 14px)
- Text: `text-xs text-cerise-700`

---

## Error Messages Used

| Layer | Error | Message |
|-------|-------|---------|
| L2 | No members | "At least one member required" |
| L2 | Add form invalid | "Name and relation are required" |
| L2 | Max members | "Maximum 6 members allowed" |
| L2 | Parent age | "Parent age cannot exceed 80 years" |
| L2 | Child age | "Child age cannot exceed 25 years" |
| L4 | OPD eligibility | "OPD requires Sum Insured >= ₹5L" |
| L6 | Consent missing | "Please accept terms and conditions" |
| L6 | Salary consent | "Please consent to salary deduction" |
| L6 | Wallet consent | "Please acknowledge wallet overflow" |

---

## Severity Styles (for system errors in side panel)

| Severity | Badge Color |
|----------|-------------|
| critical | `bg-cerise-700 text-white` |
| validation | `bg-orange-700 text-white` |
| warning | `bg-orange-500 text-white` |
| blocking | `bg-cerise-700 text-white` |
| info | `bg-blue-700 text-white` |

---

## Figma Notes

- Build one component with "visible" boolean property
- Text is an override
- Consider building severity variants for the side panel badge style
