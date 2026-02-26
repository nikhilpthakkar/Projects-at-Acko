# C13 -- Success Screen

| Property | Value |
|----------|-------|
| **ID** | C13 |
| **Name** | Success Screen |
| **Priority** | P0 |
| **Layers** | POST (after L6 submission) |
| **Construct** | All |

---

## Description

Full-screen confirmation after enrollment submission. Shows success state, optional e-card, and next steps.

---

## Variants

| Variant | Condition | Headline | E-card |
|---------|-----------|----------|--------|
| `confirmed` | No special flags | "Enrollment Confirmed!" | Shown |
| `pending-cd` | cdCheck = true | "Enrollment Confirmed!" | Hidden |
| `pending-mp` | minPart_topUp / minPart_secondary / minPart_addOns = true (component-level) | "Enrollment Confirmed!" | Hidden |
| `preferences` | preEnroll = true | "Preferences Submitted!" | Hidden |
| `updated` | Re-enrollment (EC-NEW-04) | "Enrollment Updated!" | Shown |

---

## States

| State | Visual Treatment | Trigger |
|-------|-----------------|---------|
| `success` | Green icon, e-card displayed | Normal completion |
| `pending` | Green icon, info message, no e-card | minPart or cdCheck |

---

## Anatomy

```
        [ ✓ ]              <- Green circle with checkmark
    
  Enrollment Confirmed!    <- Headline
  
  Your e-card has been     <- Status message
  generated successfully!
  
  ┌────────────────────┐
  │  E-CARD READY      │   <- Green border card
  │  ┌──────────────┐  │
  │  │ 🛡 ACKO Health│  │
  │  │ Policy: GMC-V01│ │
  │  │ UHID: UH12345 │  │
  │  └──────────────┘  │
  └────────────────────┘
  
  💳 ₹2,000/month from salary  <- If employee pays
  
  [🔄 Start Over]          <- Restart button
```

---

## Element Details

**Success icon:**
- Container: `w-20 h-20 rounded-full bg-green-200 flex items-center justify-center mx-auto`
- Icon: CheckCircle2 (green-700, 40px)

**Headline:** `text-xl font-bold text-onyx-800`

**Status message:** `text-sm text-onyx-500`

| Config | Message |
|--------|---------|
| Default | "Your e-card has been generated successfully!" |
| minPart | "Your enrollment is recorded. E-card will be generated once minimum participation is met." |
| cdCheck | "CD balance check in progress. E-card will be generated shortly." |
| preEnroll | (implied: preferences recorded) |

**E-card (conditional):**
- Outer: `border border-green-200 rounded-xl p-4 bg-green-100`
- Label: `text-xs font-semibold text-green-700 mb-2` -- "E-CARD READY"
- Inner: `bg-white rounded-lg p-3 border border-green-200`
  - Shield icon (purple-600, 24px) + "ACKO Health" (font-bold text-sm)
  - Policy: `text-xs text-onyx-500` -- "Policy: GMC-{comboId}"
  - UHID: `text-xs text-onyx-500` -- "UHID: UH{random8digits}"

**Salary deduction info:**
- `bg-onyx-100 rounded-xl p-3 text-sm text-onyx-700`
- CreditCard icon inline

**Start Over button:**
- `acko-btn bg-purple-600 text-white hover:bg-purple-700 px-6`
- RefreshCw icon + "Start Over"

---

## Figma Notes

- Centered layout, vertical auto-layout
- E-card is a nested component (show/hide based on variant)
- Build 4 variants: confirmed, pending-cd, pending-mp, preferences

---

## New Success Variants (v3)

### Component-Level Min Participation

When min participation applies to individual components (not the whole policy):
- Show separate status lines per component:
  - "Top-up: Pending minimum enrollment"
  - "Secondary: Pending minimum enrollment"  
  - "Add-ons: Pending minimum enrollment"
- E-card status shows partial: "Base coverage confirmed. Some selections pending."

### Re-enrollment Updated

- Headline: "Enrollment Updated!"
- Message: "Your previous enrollment has been superseded with your new selections."
- E-card: Shown (new enrollment is active)
- Previous enrollment reference: "Previous enrollment from [date] has been replaced"
