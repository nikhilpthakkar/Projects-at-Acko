# 03 -- Layer Screen Specifications

> Per-screen breakdown of every layer in the interactive mobile preview. Use this to compose Figma frames for each screen.

---

## Screen Flow Overview

```
L0 (Welcome) --> L1 (Coverage) --> L2 (Family) --> L3 (Plans)* --> L4 (Enhance)* --> L5 (Payment)* --> L6 (Review) --> Success
```

`*` = conditionally shown based on policy configuration.

---

## L0 -- Context & Welcome

**Purpose**: Set expectations, reduce anxiety
**Core Question**: "What am I about to do?"
**Decision Type**: View (no user decision)

### Component Inventory

| Component | ID | Variant | Notes |
|-----------|----|---------|-------|
| Progress Stepper | C01 | horizontal | All steps shown as upcoming |
| Tooltip/Info | C14 | popover | Available on terms |
| Error Message | C15 | inline | Session expired (E-L0-01) |

### Layout (top to bottom)

1. **Brand header** -- Purple square icon (Shield) + "acko health" text
2. **Headline** -- "Let's set up your health coverage"
3. **Subtext** -- Construct-dependent (see Content Framework)
4. **What to Expect card** -- Purple-100 background, numbered list of visible layers
5. **Anxiety reducers** -- Green-100 pills: "~5 minutes to complete", "You can change selections later"

### Construct Variations

| Element | VANILLA | MODULAR | FLEX |
|---------|---------|---------|------|
| Subtext | "Review your benefits from [Company]" | "Choose your benefits from [Company]" | "You have a benefits wallet to customize your protection" |
| Step count | Fewer steps (L3 often skipped) | All steps | All steps |

---

## L1 -- Base Coverage View

**Purpose**: Show employer coverage, build trust
**Core Question**: "What protection do I already have?"
**Decision Type**: View

### Component Inventory

| Component | ID | Variant | Notes |
|-----------|----|---------|-------|
| Progress Stepper | C01 | horizontal | Step 2 active |
| Coverage Card | C02 | view-only | SI amount + family list |
| Wallet Display | C10 | banner | Flex only -- full wallet bar |
| Tooltip/Info | C14 | popover | "Sum Insured", "Floater", "Cashless" |
| Error Message | C15 | inline | Policy data unavailable (E-L1-01) |

### Layout

1. **Back button** -- ChevronLeft + "Back" (purple-600)
2. **Headline + Subtext**
3. **Wallet Bar** (Flex only) -- gradient purple, shows full balance
4. **Coverage Card** -- Large SI number, "Floater" badge (blue-200), covered family members list with checkmarks
5. **Key Benefits** -- Checklist: Cashless at 10,000+ hospitals, Pre & Post hospitalization, Day care procedures, Ambulance charges

### Construct Variations

| Element | VANILLA | MODULAR | FLEX |
|---------|---------|---------|------|
| Headline | "Your coverage from [Company]" | "Your coverage from [Company]" | "Your benefits wallet" |
| Subtext | "₹5 lakh coverage for your family" | "₹5 lakh coverage for your family" | "₹25,000 to build your protection" |
| Wallet Bar | Hidden | Hidden | Shown (full balance) |
| SI Display | Fixed "₹5,00,000" | Fixed "₹5,00,000" | Dynamic based on selectedSI |

---

## L2 -- Family Configuration

**Purpose**: Capture/confirm family members
**Core Question**: "Who is covered?"
**Decision Type**: Conditional (Vanilla/Modular), Decision (Flex)

### Component Inventory

| Component | ID | Variant | Notes |
|-----------|----|---------|-------|
| Progress Stepper | C01 | horizontal | Step 3 active |
| Member Card | C04 | compact | One per family member |
| Member Form | C05 | add | Inline form when adding |
| Tooltip/Info | C14 | popover | "Dependent", "Relationship" |
| Error Message | C15 | inline | DOB, max dependents, age limit |

### Layout

1. **Back button**
2. **Headline**: "Your covered family members"
3. **Member Cards** (repeating) -- Avatar circle (purple-100), name, relation/age/gender, Trash icon for non-Self
4. **Error message** (conditional) -- "At least one member required"
5. **Add Member Form** (expandable) -- Name input, Relation dropdown, Age + Gender row, Add/Cancel buttons
6. **Add Member button** (collapsed state) -- Dashed border, "+" icon, "Add family member"
7. **Wallet impact notice** (Flex only) -- Orange-100 banner: "Family changes affect wallet allocation"

### Validations

| Rule | Error Message | Severity |
|------|---------------|----------|
| No members | "At least one member required" | validation |
| Max 6 members | "Maximum 6 members allowed" | warning |
| Parent age > 80 | "Parent age cannot exceed 80 years" | validation |
| Child age > 25 | "Child age cannot exceed 25 years" | validation |
| Name/relation empty | "Name and relation are required" | validation |

---

## L3 -- Plan Selection

**Purpose**: Choose/upgrade plan configuration
**Core Question**: "What level of coverage do I want?"
**Decision Type**: Decision (Modular/Flex), Skip (Vanilla)

### Component Inventory

| Component | ID | Variant | Notes |
|-----------|----|---------|-------|
| Progress Stepper | C01 | horizontal | |
| Plan Selector | C03 | tier-cards / configurator | Construct-dependent |
| Premium Calculator | C06 | inline | Premium impact summary |
| Wallet Display | C10 | banner | Flex only |
| Comparison Table | C17 | side-by-side | Modular only |

### Layout -- MODULAR

1. **Back button**
2. **Headline**: "Upgrade your plan"
3. **Tier Cards** (3 stacked):
   - **Silver** -- ₹3L SI, "Included", DEFAULT badge, 2 features
   - **Gold** -- ₹5L SI, "+₹500/mo" (orange), 3 features
   - **Platinum** -- ₹10L SI, "+₹1,200/mo" (orange), 3 features
   - Selected card: `border-purple-600 bg-purple-50` + SELECTED badge
4. **Premium impact** -- "Included" or "+₹X/month"

### Layout -- FLEX

1. **Back button**
2. **Headline**: "Configure your coverage"
3. **Wallet Bar** (full banner)
4. **SI Selector** -- Button group: 3L, 5L, 7L, 10L, 15L. Selected: `border-purple-600 bg-purple-50`
5. **Family Coverage** -- Radio list: Self only, Self + Spouse, Self + Family, Self + Family + Parents
6. **Premium impact** -- "₹X from wallet"

### Construct Variations

| Element | VANILLA | MODULAR | FLEX |
|---------|---------|---------|------|
| Visibility | SKIP | Show | Show |
| Selector type | N/A | 3 tier cards | SI buttons + family radios |
| Pricing | N/A | Monthly upgrade delta | Wallet deduction |

---

## L4 -- Enhancement Options

**Purpose**: Offer top-ups, secondary, add-ons
**Core Question**: "What additional protection?"
**Decision Type**: Decision (if employee-paid), View (if employer-paid)

### Component Inventory

| Component | ID | Variant | Notes |
|-----------|----|---------|-------|
| Progress Stepper | C01 | horizontal | |
| Top-up Card | C08 | standard/modular | If topUp configured |
| Secondary Plan Card | C09 | single/multi-plan | If secondary configured |
| Add-on Card | C07 | toggle | If addOns configured, up to 3 |
| Wallet Display | C10 | inline | Flex only -- remaining balance |
| Premium Calculator | C06 | -- | Enhancement total |

### Layout

1. **Back button**
2. **Headline**: "Enhance your coverage"
3. **Wallet remaining** (Flex only) -- Inline: wallet icon + "₹X remaining" + mini bar
4. **Top-up Card** -- Shield icon (blue), "Top-up Cover", "Extra ₹5L after base exhausted", ₹4,800/yr, Toggle
5. **Secondary Plan Card** -- Users icon (green), "Parent Cover", "₹3L for parents", ₹9,600/yr, Toggle
6. **Add-ons section** -- Label "ADD-ONS", then 3 cards:
   - OPD Cover: ₹15,000/year, ₹2,400/yr, POPULAR badge
   - Dental & Vision: ₹10,000/year, ₹1,800/yr
   - Wellness Program: Health checkups, ₹1,200/yr
7. **Add-on error** (conditional) -- "OPD requires Sum Insured >= ₹5L"
8. **Enhancement total** -- "₹X/yr"

### CTA

- Primary: "Continue"
- Secondary: "Skip enhancements" (text link below)

---

## L5 -- Premium & Payment

**Purpose**: Show cost breakdown, payment method
**Core Question**: "How much will I pay?"
**Decision Type**: Decision (if employee pays), Skip (if all employer-paid)

### Component Inventory

| Component | ID | Variant | Notes |
|-----------|----|---------|-------|
| Progress Stepper | C01 | horizontal | |
| Premium Calculator | C06 | detailed | Full breakdown with progress bars |
| Wallet Display | C10 | detailed | Flex only -- exceeded state |

### Layout

1. **Back button**
2. **Headline**: "Your investment"
3. **Premium Card**:
   - Dark header (onyx-800): Total annual premium (3xl), monthly (xs)
   - Employer/wallet bar: green, percentage label
   - Employee bar: orange, percentage label (if applicable)
   - Breakdown table: Base Coverage, Top-up, Secondary, Add-ons (each with amount)
4. **Wallet Overflow alert** (Flex, if over) -- Orange-100 border card: "Exceeds wallet by ₹X", monthly deduction
5. **Salary deduction info** -- CreditCard icon + "₹X/month salary deduction"

---

## L6 -- Review & Consent

**Purpose**: Final confirmation, legal consent
**Core Question**: "Is everything correct?"
**Decision Type**: Decision

### Component Inventory

| Component | ID | Variant | Notes |
|-----------|----|---------|-------|
| Progress Stepper | C01 | horizontal | Last step |
| Review Summary | C12 | detailed | Editable sections |
| Member Card | C04 | compact | In review summary |
| Consent Checkbox | C11 | standard / salary / wallet | Up to 3 checkboxes |
| Error Message | C15 | inline | Consent required |

### Layout

1. **Back button**
2. **Headline**: "Review and confirm"
3. **Review sections** (each a bordered card with Edit link):
   - Coverage: Shield icon, tier/SI info
   - Family: Users icon, member count + names
   - Enhancements (if any): Heart icon, list of active enhancements with costs
   - Your Investment (if employee pays): CreditCard icon, monthly amount, wallet usage, overflow
4. **Consent checkboxes**:
   - Terms (always): "I agree to the terms and conditions..."
   - Salary deduction (if employee pays): "I consent to ₹X/month salary deduction"
   - Wallet overflow (Flex + overflow): "I acknowledge the wallet overflow of ₹X"
5. **Error message** (if validation fails)
6. **Pre-enrollment banner** (if preEnroll): Blue-200, "Pre-enrollment: preferences only, not final"
7. **Min participation banner** (if minPart): Orange-100, "E-card pending minimum participation"

### CTA

- Primary: "Confirm Enrollment" (green-600) or "Submit Preferences" (if preEnroll)

---

## Success Screen (POST)

**Purpose**: Confirmation and next steps
**Decision Type**: Terminal

### Layout

1. **Success icon** -- Green circle (80x80) with CheckCircle2 (40px)
2. **Headline** -- "Enrollment Confirmed!" or "Preferences Submitted!"
3. **Status message** -- Varies by config:
   - Default: "Your e-card has been generated successfully!"
   - minPart: "E-card will be generated once minimum participation is met."
   - cdCheck: "CD balance check in progress. E-card will be generated shortly."
4. **E-card** (if ready) -- Green border card with Shield icon, "ACKO Health", Policy number, UHID
5. **Salary deduction info** (if employee pays)
6. **Start Over button** -- Purple-600, RefreshCw icon

### Variants

| Config Flag | Headline | Message | E-card Shown |
|-------------|----------|---------|--------------|
| Default | Enrollment Confirmed! | E-card generated | Yes |
| preEnroll | Preferences Submitted! | Preferences recorded | No |
| minPart | Enrollment Confirmed! | Pending min participation | No |
| cdCheck | Enrollment Confirmed! | CD check in progress | No |
