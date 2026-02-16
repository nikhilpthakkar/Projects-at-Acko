# C11 -- Consent Checkbox

| Property | Value |
|----------|-------|
| **ID** | C11 |
| **Name** | Consent Checkbox |
| **Priority** | P0 |
| **Layers** | L6 |
| **Construct** | All (variants depend on config) |

---

## Description

Legal consent checkboxes on the review screen. Up to 3 can appear depending on configuration. Required before enrollment can be submitted.

---

## Variants

| Variant | Condition | Label Text |
|---------|-----------|------------|
| `standard` | Always shown | "I agree to the terms and conditions of the group health insurance policy" |
| `salary-deduction` | When employee pays > ₹0 | "I consent to ₹{monthlyEmployee}/month salary deduction" |
| `wallet-overflow` | Flex + wallet overflow > 0 | "I acknowledge the wallet overflow of ₹{walletOverflow}" |

---

## States

| State | Visual Treatment | Trigger |
|-------|-----------------|---------|
| `unchecked` | Empty box: `w-5 h-5 border-2 border-onyx-300 rounded` | Initial |
| `checked` | Filled box: `border-purple-600 bg-purple-600` + white CheckCircle2 (14px) | User clicks |
| `error` | Empty box with cerise border: `border-cerise-500` | Validation triggered without check |

---

## Anatomy

```
[☐] I agree to the terms and conditions of the group 
    health insurance policy

[☐] I consent to ₹2,000/month salary deduction

[☐] I acknowledge the wallet overflow of ₹5,000
```

- Container: `flex items-start gap-3 cursor-pointer`
- Checkbox: `w-5 h-5 border-2 rounded mt-0.5 flex-shrink-0 flex items-center justify-center transition-all`
- Label: `text-xs text-onyx-600 leading-relaxed`

---

## Validation

| Rule | Error | Severity |
|------|-------|----------|
| Terms unchecked on submit | "Please accept terms and conditions" | validation |
| Salary unchecked on submit | "Please consent to salary deduction" | validation |
| Wallet unchecked on submit | "Please acknowledge wallet overflow" | validation |

---

## Figma Notes

- Build one checkbox component with 3 states (unchecked/checked/error)
- Compose 1--3 instances vertically on L6 screen
- Dynamic label text (use text override in Figma)
- The salary and wallet variants include dynamic currency values
