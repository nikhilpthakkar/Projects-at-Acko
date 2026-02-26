# 07 -- Content Framework

> Every headline, subtext, CTA, tooltip, and anxiety reducer per layer per construct. Use this as the copy source for Figma text layers.

---

## Content Matrix

### L0 -- Context & Welcome

| Construct | Headline | Subtext | Primary CTA | Secondary CTA | Tooltips | Anxiety Reducers |
|-----------|----------|---------|-------------|---------------|----------|------------------|
| VANILLA | Let's set up your health coverage | Review your benefits from [Company] | Get Started | -- | -- | ~5 minutes to complete; You can change selections later |
| MODULAR | Let's set up your health coverage | Choose your benefits from [Company] | Get Started | -- | -- | ~5 minutes to complete; You can change selections later |
| FLEX | Let's set up your health coverage | You have a benefits wallet to customize your protection | Get Started | -- | -- | ~5 minutes to complete; You can change selections later |

---

### L1 -- Base Coverage View

| Construct | Headline | Subtext | Primary CTA | Secondary CTA | Tooltips | Anxiety Reducers |
|-----------|----------|---------|-------------|---------------|----------|------------------|
| VANILLA | Your coverage from [Company] | ₹5 lakh coverage for your family | Continue | -- | Sum Insured, Floater, Cashless | -- |
| MODULAR | Your coverage from [Company] | ₹5 lakh coverage for your family | Continue | -- | Sum Insured, Floater, Cashless | -- |
| FLEX | Your benefits wallet | ₹25,000 to build your protection | Continue | -- | Sum Insured, Floater, Cashless | -- |

---

### L2 -- Family Configuration

| Construct | Headline | Subtext | Primary CTA | Secondary CTA | Tooltips | Anxiety Reducers |
|-----------|----------|---------|-------------|---------------|----------|------------------|
| ALL | Your covered family members | Review and update if needed | Continue | + Add family member | Dependent, Relationship | -- |

---

### L3 -- Plan Selection

| Construct | Headline | Subtext | Primary CTA | Secondary CTA | Tooltips | Anxiety Reducers |
|-----------|----------|---------|-------------|---------------|----------|------------------|
| VANILLA | *(L3 skipped)* | -- | -- | -- | -- | -- |
| MODULAR | Upgrade your plan | Choose a higher tier for better benefits | Continue | -- | Tier, Sum Insured | Compare plans side-by-side |
| MODULAR (view-only: M01, M07) | Your assigned plan | Review your coverage details | Continue | -- | Tier, Sum Insured | -- |
| FLEX (Base Variable) | Configure your coverage | Select Sum Insured and family coverage | Continue | -- | Tier, Sum Insured | Compare plans side-by-side |
| FLEX (Base Fixed) | Your base coverage | Your fixed coverage from [Company] | Continue | -- | Sum Insured | Use your wallet for enhancements |

---

### L4 -- Enhancement Options

| Construct | Headline | Subtext | Primary CTA | Secondary CTA | Tooltips | Anxiety Reducers |
|-----------|----------|---------|-------------|---------------|----------|------------------|
| Employer-paid enhancements | Enhance your coverage | Additional benefits included | Continue | Skip enhancements | Top-up, Secondary, Add-on | Most popular choices highlighted |
| Employee-paid enhancements | Enhance your coverage | Add more protection (employee-paid) | Continue | Skip enhancements | Top-up, Secondary, Add-on | Most popular choices highlighted |
| Min Participation components | Enhance your coverage | Add more protection (subject to enrollment) | Continue | Skip enhancements | Top-up, Secondary, Add-on | "Subject to minimum [X]% enrollment" badge per component |

---

### L5 -- Premium & Payment

| Construct | Headline | Subtext | Primary CTA | Secondary CTA | Tooltips | Anxiety Reducers |
|-----------|----------|---------|-------------|---------------|----------|------------------|
| VANILLA / MODULAR | Your investment | Review your premium breakdown | Continue to Review | -- | Premium, Salary Deduction | -- |
| FLEX | Your investment | Review your premium breakdown | Continue to Review | -- | Premium, Salary Deduction | Wallet covers: ₹[X]; You pay: ₹[Y] |

---

### L6 -- Review & Consent

| Construct | Headline | Subtext | Primary CTA | Secondary CTA | Tooltips | Anxiety Reducers |
|-----------|----------|---------|-------------|---------------|----------|------------------|
| Standard | Review and confirm | Check your selections before submitting | Confirm Enrollment | Edit selections | -- | You can update during next enrollment window |
| Pre-enrollment | Review and confirm | Check your selections before submitting | Submit Preferences | Edit selections | -- | You can update during next enrollment window |
| Re-enrollment | Review and confirm | You are updating your previous enrollment | Update Enrollment | Edit selections | -- | Previous enrollment will be superseded |

---

## Construct Verb Mapping

Used in L0 subtext construction:

| Construct | Verb | Full Subtext Pattern |
|-----------|------|---------------------|
| VANILLA | Review | "Review your benefits from [Company]" |
| MODULAR | Choose | "Choose your benefits from [Company]" |
| FLEX | Build | "You have a benefits wallet to customize your protection" |

---

## Dynamic Content (values computed at runtime)

| Placeholder | Source | Example |
|-------------|--------|---------|
| [Company] | Policy config (employer name) | "Acme Corp" |
| ₹[X] (wallet covers) | PremiumCalc.walletUsed | "₹12,000" |
| ₹[Y] (you pay) | PremiumCalc.employeePays | "₹5,000" |
| {monthlyEmployee} | PremiumCalc.monthlyEmployee | "₹417" |
| {walletOverflow} | PremiumCalc.walletOverflow | "₹3,000" |
| {members.length} | members array length | "3" |
| {comboId} | Selected combination | "F09" |

---

## Tooltip Definitions (suggested content)

| Term | Definition |
|------|------------|
| Sum Insured | The maximum amount the insurance company will pay for your medical expenses during the policy period |
| Floater | Coverage shared among all family members -- any member can use up to the full amount |
| Cashless | Treatment at network hospitals where the insurer pays the hospital directly |
| Dependent | A family member covered under your policy |
| Relationship | Your relation to the covered family member (spouse, child, parent) |
| Tier | A plan level with specific coverage limits and benefits |
| Top-up | Additional coverage that activates after your base sum insured is exhausted |
| Secondary | A separate policy for additional family members (typically parents) |
| Add-on | Optional extra benefits like OPD, dental, or wellness |
| Premium | The annual cost of your insurance coverage |
| Salary Deduction | Monthly amount deducted from your salary to pay for employee-portion of premium |

---

## Anxiety Reducers (when shown)

| Layer | Reducer | Icon |
|-------|---------|------|
| L0 | ~5 minutes to complete | CheckCircle2 (green) |
| L0 | You can change selections later | CheckCircle2 (green) |
| L3 | Compare plans side-by-side | CheckCircle2 (green) |
| L4 | Most popular choices highlighted | CheckCircle2 (green) |
| L5 (Flex) | Wallet covers: ₹[X] | CheckCircle2 (green) |
| L5 (Flex) | You pay: ₹[Y] | CheckCircle2 (green) |
| L6 | You can update during next enrollment window | CheckCircle2 (green) |

---

## Post-Construct Modifier Content

Content variations triggered by system flags (not construct type).

### Min Participation (per component)

| Layer | Element | Copy |
|-------|---------|------|
| L4 | Badge below component card | "Subject to minimum [X]% enrollment" |
| L6 | Banner per component | "[Component] selection pending minimum participation" |
| Success | Status per component | "E-card pending — [component] awaiting minimum enrollment" |

### Pre-Enrollment

| Layer | Element | Copy |
|-------|---------|------|
| L0 | Subtext addition | "This is a pre-enrollment window — your preferences will be recorded" |
| L6 | CTA | "Submit Preferences" (replaces "Confirm Enrollment") |
| L6 | Banner | "Pre-enrollment: preferences only, not final confirmation" |
| Success | Headline | "Preferences Submitted!" |
| Success | Message | "Your selections have been recorded for the upcoming policy period" |

### CD Balance Check

| Layer | Element | Copy |
|-------|---------|------|
| L5 | Info text | "Verifying CD balance..." |
| Success | Message | "CD balance check in progress — e-card will be generated once verified" |

### Grade-Based

| Layer | Element | Copy |
|-------|---------|------|
| L1 | Badge | "Plans for Grade [X]" |
| L3 | Disabled tier label | "Not available for your grade" |

### New Edge Case Content

| EC ID | Layer | Element | Copy |
|-------|-------|---------|------|
| EC-NEW-01 | L2 | Selection prompt | "Please select which [N] [relation] to cover. Your policy covers [limit]." |
| EC-NEW-02 | L0 | Banner | "Complete all steps to confirm your enrollment" |
| EC-NEW-02 | ALL (exit) | Modal | "Exit enrollment? Your selections won't be saved." |
| EC-NEW-03 | ALL (re-entry) | Modal | "Continue where you left off?" with previous stage summary |
| EC-NEW-03 | Comms | Email/WhatsApp | "Your enrollment is incomplete. Continue where you left off." |
| EC-NEW-04 | ALL (restart) | Modal | "You've already enrolled. New selections will override your current enrollment." |
| EC02 | L2 | Inline message | "Parents not covered under base plan. Additional premium: ₹X/year" |
| EC02 | L4 | Pre-selected badge | "Added in Family step" on parental coverage card |
