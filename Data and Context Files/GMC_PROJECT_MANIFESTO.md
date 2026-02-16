# GMC ENROLLMENT ENHANCEMENT - PROJECT MANIFESTO
## For AI Assistant Migration (Claude → Gemini Pro)

**Document Version:** 1.0  
**Created:** February 2025  
**Purpose:** Complete project context transfer for seamless AI assistant migration  

---

# TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Core Architecture](#2-core-architecture)
3. [Current State & Completion Status](#3-current-state--completion-status)
4. [Critical Context NOT in Project Files](#4-critical-context-not-in-project-files)
5. [Unsolved Challenges & Known Issues](#5-unsolved-challenges--known-issues)
6. [Key Decisions Made](#6-key-decisions-made)
7. [File Inventory & Purpose](#7-file-inventory--purpose)
8. [Terminology & Domain Knowledge](#8-terminology--domain-knowledge)
9. [Stakeholder Context](#9-stakeholder-context)
10. [Next Steps & Roadmap](#10-next-steps--roadmap)

---

# 1. PROJECT OVERVIEW

## What This Project Is
This is a **Product Design & Architecture** project (not a coding project yet) for **Acko Insurance's Group Medical Cover (GMC)** enrollment system. The goal is to redesign how employees enroll in corporate health insurance—transforming it from a confusing, high-drop-off process into an intuitive, educational experience.

## Business Context
- **Company:** Acko (Indian InsurTech)
- **Product:** GMC (Group Medical Cover) - B2B2C insurance
- **Users:** 
  - Primary: Employees enrolling in corporate health insurance
  - Secondary: HR teams, employers managing enrollment
- **Problem:** Current enrollment has ~30-40% drop-off, users don't understand what they're buying

## Project Vision
> Transform GMC enrollment from a complex, drop-off prone process to an intuitive, educational experience that positions Acko as the go-to Employee Benefits & Perks platform—not just insurance.

## Success Metrics
| Metric | Current | Target |
|--------|---------|--------|
| Enrollment Completion Rate | ~60-70% | 95% |
| Time to Complete | 8-12 mins | <5 mins |
| Drop-off at Top-up Selection | High | -80% |
| User Comprehension | Unknown | +30% |

---

# 2. CORE ARCHITECTURE

## 2.1 Policy Construct Types (The Foundation)

The entire system is built around **three policy construct types**:

### VANILLA (21 combinations: V01-V21)
- **Definition:** Fixed base plan, optional enhancements
- **Base Plan:** Cannot be changed by employee
- **Enhancements:** Top-ups, Secondary plans, Add-ons (optional)
- **Complexity:** Low to Medium
- **Example:** "Your employer gives you ₹5L coverage. You can add top-up if you want."

### MODULAR (11 combinations: M01-M11)
- **Definition:** Tiered base plans (Silver/Gold/Platinum)
- **Base Plan:** Employee can upgrade to higher tiers
- **Enhancements:** Modular top-ups (tier upgrades), Secondary, Add-ons
- **Complexity:** Medium
- **Example:** "You're on Silver tier. Pay ₹500/month more to upgrade to Gold."

### FLEX (20 combinations: F01-F20)
- **Definition:** Wallet-based, fully customizable
- **Base Plan:** Configurable (SI, family definition, cover variants)
- **Wallet:** Employer provides ₹X budget to "build" coverage
- **Enhancements:** Everything payable from wallet or out-of-pocket
- **Complexity:** High
- **Example:** "You have ₹25,000 wallet. Build your coverage—change SI, add parents, buy add-ons."

## 2.2 Policy Components

Every policy can have these components:

| Component | What It Is | Who Pays | Notes |
|-----------|------------|----------|-------|
| **Base Plan** | Default coverage | Employer (usually) | Mandatory foundation |
| **Top-Up** | Extra coverage on base | Employer or Employee | Kicks in after base exhausted |
| **Secondary Plan** | Different family coverage | Either | e.g., Parental plan separate from ESC |
| **Secondary Top-Up** | Extra coverage on secondary | Employee (usually) | Rare but supported |
| **Add-Ons** | Optional benefits | Employee (usually) | OPD, Dental, Wellness, etc. |
| **Consolidated Top-Up** | Single top-up across base+secondary | Either | Covers entire family together |

## 2.3 Payment Models

- **Employer-Paid:** Employee sees but doesn't pay
- **Employee-Paid:** Deducted from salary
- **Partial:** Employer subsidizes, employee pays difference
- **Wallet (Flex only):** Employer provides budget, employee allocates

## 2.4 System Flags (Backend Configuration)

| Flag | Purpose | Impact |
|------|---------|--------|
| `minParticipation` | Plan requires X% enrollment to roll out | E-card generation blocked until decision |
| `preEnrollment` | Collecting preferences before policy creation | No actual policy created yet |
| `cdBalanceCheck` | Check Corporate Deposit before e-card | E-card blocked if insufficient CD |
| `gradeBasedPlans` | Filter plans by employee grade/slab | Only eligible options shown |

## 2.5 Enrollment Flow Architecture (L0-L6 Layers)

The universal enrollment flow has 7 potential layers:

```
L0: Context & Welcome    → Always shown
L1: Base Coverage View   → Always shown
L2: Family Configuration → If family edit allowed
L3: Plan Selection       → MODULAR and FLEX only (skip for VANILLA)
L4: Enhancement Options  → If any optional components exist
L5: Premium & Payment    → If employee payment required
L6: Review & Consent     → Always shown
```

**Key Insight:** The flow engine determines which layers to show based on policy configuration. A simple VANILLA policy might be: L0 → L1 → L2 → L6 (4 steps). A complex FLEX policy: L0 → L1 → L2 → L3 → L4 → L5 → L6 (7 steps).

## 2.6 State Management Concept

```
Enrollment States:
├── NotStarted    → Employee hasn't begun enrollment
├── InProgress    → Draft exists, coverage NOT active
└── Completed     → Submitted, coverage active/activating

Draft Persistence:
- Auto-save on every selection change
- Resume from where user left off
- Critical for reducing drop-offs
```

## 2.7 E-Card Generation Rules

E-cards (digital insurance cards) generation depends on:
1. **Enrollment completion** - User must submit
2. **CD Balance** - If `cdBalanceCheck` flag, must have funds
3. **Min Participation** - If `minParticipation` flag, must await rollout decision
4. **UHID Generation** - Unique Health ID created at submission (not during flow)

---

# 3. CURRENT STATE & COMPLETION STATUS

## 3.1 What Is 100% FINISHED

### ✅ Policy Combinations Matrix
- **File:** `GMC_Final_Combinations_Complete_v2.xlsx` → Sheet 1
- **Status:** All 52 combinations defined (V01-V21, M01-M11, F01-F20)
- **Contains:** Components, payment models, system flags, e-card eligibility, real-world examples
- **Validation Needed:** Underwriting team should confirm these match actual RFQs

### ✅ Jobs-To-Be-Done (JTBD) Framework
- **File:** `GMC_Final_Combinations_Complete_v2.xlsx` → Sheet 2
- **Status:** Complete JTBD entries for all 52 combinations
- **Contains:** Primary JTBD, Secondary JTBDs, Anxiety Points, Key Decisions, Education Moments, Flow Layers Shown, Content Designer Input

### ✅ Onboarding Framework (L0-L6)
- **File:** `GMC_Final_Combinations_Complete_v2.xlsx` → Sheet 3
- **Status:** Complete layer definitions
- **Contains:** Core Question, Purpose, What Gets Decided, Triggers/Logic, UI Patterns, Content Framework Data, Construct-specific notes

### ✅ Decision Flow Matrix
- **File:** `GMC_Final_Combinations_Complete_v2.xlsx` → Sheet 4
- **Status:** Complete V/D/S/C matrix for all scenarios
- **Contains:** Per-layer decision requirements, Total Decisions count, color-coded cells

### ✅ UI Component Specifications
- **File:** `GMC_Final_Combinations_Complete_v2.xlsx` → Sheet 5
- **Status:** 17 components fully specified
- **Contains:** Purpose, Key Features, Variants, States, Props, Content Slots, Cross-References, Priority

### ✅ Scalability Rules
- **File:** `GMC_Final_Combinations_Complete_v2.xlsx` → Sheet 6
- **Status:** 30 rules documented
- **Contains:** Layer visibility, decision reduction, content adaptation, premium logic, validation, system flags, performance, accessibility, analytics

### ✅ Edge Cases
- **File:** `GMC_Final_Combinations_Complete_v2.xlsx` → Sheet 7
- **Status:** 28 edge cases documented
- **Contains:** Employee, Family, System, MODULAR-specific, FLEX-specific, Plan Rules scenarios

### ✅ Project Tracker Structure
- **File:** `GMC_Project_Tracker.xlsx`
- **Status:** Framework created, tracking 6 main deliverables

## 3.2 What Is IN PROGRESS / PARTIALLY COMPLETE

### 🟡 Flow Engine Definition
- **Status:** Conceptually defined, not implemented
- **What Exists:** Input/output parameters listed in Project Tracker Sheet 2
- **What's Missing:** Actual logic implementation, API contract with backend

### 🟡 Content Framework
- **Status:** Structure defined, content not written
- **What Exists:** Content slots identified in UI Components, Content Designer Input in JTBDs
- **What's Missing:** Actual copy for all layers × constructs × payment models

### 🟡 Research Plan
- **Status:** Interview guides created, not executed
- **What Exists:** Employee and Employer interview guides in GMC_Project_Plan.md
- **What's Missing:** Actual interviews, synthesis, insights

## 3.3 What Is NOT STARTED

### 🔴 UI/Visual Design
- No mockups, wireframes, or prototypes created
- Component specs exist but no visual design

### 🔴 Development/Coding
- No code written
- This is still in product design phase
- Cursor/AI Studio prompts were planned but not executed

### 🔴 Backend Integration
- No API contracts finalized
- PAT (Policy Administration Tool) integration is Phase 2
- CD Balance, Min Participation features are Phase 2

### 🔴 Testing
- Test matrix template exists but not filled
- No manual or automated testing done

---

# 4. CRITICAL CONTEXT NOT IN PROJECT FILES

## 4.1 The "Why" Behind Design Decisions

### Why 52 Combinations?
We systematically enumerated all possible combinations of:
- 3 construct types × component availability × payment models × system flags
- This ensures the flow engine can handle ANY policy configuration
- Real-world may use only 20-30 combinations, but architecture supports all

### Why Layer-Based Architecture?
- Each layer is a "mini-app" that can be shown/hidden based on config
- Allows same codebase to render simple (4-step) and complex (7-step) flows
- Content and UI components are layer-aware, not flow-aware

### Why JTBD Approach?
- Insurance is confusing; users don't care about "policy constructs"
- JTBDs frame everything from user's perspective
- Each combination has different user goals and anxieties

## 4.2 Implicit Requirements from PRDs

The PRD documents contain requirements that aren't fully captured in our sheets:

### UHID Generation Timing
- **Current:** UHIDs generated early, causing latency
- **Proposed:** Generate at final submission only
- **Impact:** Screens must work without UHIDs during flow

### Exception Plans
- Some employees are on "exception plans" (custom/manual)
- These should skip enrollment entirely, show e-cards directly
- Need `exceptionPlan` flag in config

### Multiple Packages
- Some employees have multiple insurance packages
- Each package = separate enrollment
- UI needs package selector or sequential flow

### Plan Relationships/Dependencies
- Add-on eligibility can depend on base plan SI
- Example: OPD add-on only if SI > ₹7L
- Needs dynamic eligibility rules in config

## 4.3 Unwritten Assumptions

1. **Mobile-First:** Majority of employees will enroll on mobile
2. **Low Insurance Literacy:** Users don't know terms like "Sum Insured", "Floater"
3. **Time-Constrained:** Users want to finish in under 5 minutes
4. **Trust Deficit:** Users are skeptical of insurance, need reassurance
5. **HR Involvement:** HR often helps employees; consider HR-assisted flow later

## 4.4 Domain-Specific Knowledge

### Indian Health Insurance Context
- **Cashless:** User shows e-card at hospital, insurer pays directly
- **Reimbursement:** User pays, claims back later
- **TPA:** Third Party Administrator handles claims
- **Waiting Period:** Time before pre-existing conditions covered (usually 2-4 years)
- **Floater:** Single sum insured shared by family (vs Individual for each)

### Corporate Insurance Specifics
- **Corporate Deposit (CD):** Employer deposits premium with insurer
- **Salary Deduction:** Employee portion deducted from payroll
- **Minimum Participation:** Insurers require X% enrollment for optional plans
- **Grade/Slab:** Employee level determines plan eligibility

---

# 5. UNSOLVED CHALLENGES & KNOWN ISSUES

## 5.1 Architectural Challenges

### Challenge 1: Wallet Overflow Handling (FLEX)
**Problem:** When user's selections exceed wallet balance, need to:
- Show clear overflow amount
- Get consent for salary deduction
- Handle partial wallet usage correctly

**Status:** Conceptually addressed, needs detailed UX flow

### Challenge 2: Plan Dependency Rules
**Problem:** Complex eligibility rules like:
- "Add-on X available only if SI > ₹7L"
- "Add-on Y available only if Add-on X selected"
- "Secondary plan Z requires base plan A or B"

**Status:** Mentioned in edge cases, needs formal rule engine design

### Challenge 3: Mid-Flow Plan Changes
**Problem:** User selects ESCP family definition, adds parents, then changes to ESC (no parents).
- What happens to parent data?
- How to warn user about impact?

**Status:** Edge case EC06 documents this, needs detailed interaction design

### Challenge 4: Pre-Enrollment vs Actual Enrollment
**Problem:** Pre-enrollment collects preferences without creating policy.
- Same UI but different backend behavior
- User must understand it's not final

**Status:** Flag exists, UI differentiation not fully designed

## 5.2 Content Challenges

### Challenge 5: Insurance Jargon
**Problem:** Terms like "Sum Insured", "Floater", "Co-pay", "Deductible" confuse users.
- Tooltips help but add friction
- Plain language alternatives needed

**Status:** Tooltip system designed, actual content not written

### Challenge 6: Context-Sensitive Headlines
**Problem:** Headlines must change based on:
- Construct type (Vanilla/Modular/Flex)
- Payment model (employer-paid vs employee-paid)
- User's progress

**Status:** Framework in Content Designer Input, actual copy not written

## 5.3 Technical Challenges

### Challenge 7: Premium Calculation Performance
**Problem:** Real-time premium updates on every selection change.
- API calls could be slow
- Need debouncing or local calculation

**Status:** Mentioned in scalability rules, no implementation

### Challenge 8: Draft Persistence
**Problem:** User drops off mid-flow, returns later.
- Need to save draft on every change
- Resume exactly where they left off
- Handle stale data (policy changed meanwhile)

**Status:** Conceptually addressed, no implementation

## 5.4 Business Logic Gaps

### Challenge 9: Minimum Participation Rollout
**Problem:** When MP not met:
- Move to alternate plan? Which one?
- Move to default base? Always?
- KAM/Bizops manual decision needed

**Status:** Documented in PRD, decision tree not fully mapped

### Challenge 10: CD Balance Insufficient
**Problem:** When corporate deposit insufficient:
- Block e-card
- Notify employer
- User in limbo state

**Status:** Flow documented in PRD, user communication not designed

---

# 6. KEY DECISIONS MADE

| # | Decision | Rationale | Date |
|---|----------|-----------|------|
| 1 | Three construct types (Vanilla/Modular/Flex) | Matches actual policy variations in market | Feb 2025 |
| 2 | 52 combinations as exhaustive set | Ensures architecture handles all cases | Feb 2025 |
| 3 | Layer-based flow (L0-L6) | Allows dynamic flow based on config | Feb 2025 |
| 4 | JTBD-driven design | User-centric approach reduces confusion | Feb 2025 |
| 5 | Content slots in components | Enables dynamic copy per scenario | Feb 2025 |
| 6 | Partial payment as modifier, not separate combo | Reduces complexity, applies as overlay | Feb 2025 |
| 7 | System flags for edge cases | Separates common flow from special handling | Feb 2025 |
| 8 | UHID generation at submission | Reduces latency during enrollment flow | Per PRD |

---

# 7. FILE INVENTORY & PURPOSE

## Project Folder Files

| File | Purpose | Status |
|------|---------|--------|
| `GMC_Project_Plan.md` | Master project plan with phases, research guides | Reference doc |
| `PRD__Enrolment_Journey_Revamp.pdf` | Official PRD from PM (38 pages) | Source of truth |
| `Flex_Project__Scope_and_Milestones.pdf` | Backend + Frontend milestones | Phase planning |
| `Enrolment_Journey_Enhancement_1.pdf` | 10 use cases document | Requirements |
| `GMC_Final_Combinations_Complete_v2.xlsx` | **PRIMARY DELIVERABLE** - 7 sheets | Active |
| `GMC_Project_Tracker.xlsx` | Task tracking, input/output params | Active |

## Output Files Created (May Not Be in Project Folder)

| File | Purpose | Notes |
|------|---------|-------|
| `GMC_AI_Studio_Prompts.md` | Prompts for Cursor/AI Studio dev | Not started |
| `GMC_Research_Toolkit.md` | Interview guides and templates | From project plan |
| Multiple .xlsx iterations | Earlier versions of combinations sheet | Superseded by v2 |

---

# 8. TERMINOLOGY & DOMAIN KNOWLEDGE

## Insurance Terms

| Term | Definition | Context |
|------|------------|---------|
| **Sum Insured (SI)** | Maximum coverage amount | ₹5 lakh, ₹10 lakh, etc. |
| **Floater** | Single SI shared by family | vs Individual SI per person |
| **Top-Up** | Extra coverage that kicks in after base exhausted | Not to be confused with "Upgrade" |
| **Add-On** | Optional benefit (OPD, Dental, Wellness) | Usually employee-paid |
| **Waiting Period** | Time before pre-existing diseases covered | 2-4 years typically |
| **E-Card** | Digital insurance card | Needed for cashless claims |
| **Cashless** | Hospital billing directly to insurer | User shows e-card |
| **TPA** | Third Party Administrator | Handles claims processing |

## Acko-Specific Terms

| Term | Definition |
|------|------------|
| **GMC** | Group Medical Cover (product name) |
| **PAT** | Policy Administration Tool (backend system) |
| **CD** | Corporate Deposit (employer's premium deposit) |
| **UHID** | Unique Health ID (per dependent) |
| **KAM** | Key Account Manager |
| **Bizops** | Business Operations team |
| **PDP** | (Unclear from docs - possibly Policy Details Page) |

## Family Definitions

| Code | Meaning |
|------|---------|
| **E** | Employee only |
| **ES** | Employee + Spouse |
| **ESC** | Employee + Spouse + Children |
| **ESCP** | Employee + Spouse + Children + Parents |
| **EC** | Employee + Children |
| **P** | Parents only (secondary plan) |

---

# 9. STAKEHOLDER CONTEXT

## Primary Stakeholders

| Role | Involvement | Notes |
|------|-------------|-------|
| **Product Manager (You)** | Owner of this project | Creating framework, specs |
| **Content Designer** | Will write actual copy | Needs Content Framework |
| **UX Designer** | Will create visual designs | Uses Component Specs |
| **Frontend Dev** | Will build UI | Uses Flow Engine, Components |
| **Backend Dev** | Will build APIs | Needs API contract |
| **Underwriting** | Validates combinations | Should review Sheet 1 |

## Secondary Stakeholders

| Role | Involvement |
|------|-------------|
| **HR/Employers** | End users (employer portal) |
| **Employees** | End users (enrollment) |
| **KAMs/Bizops** | Handle min participation, CD issues |
| **QA** | Will test all 52 combinations |

---

# 10. NEXT STEPS & ROADMAP

## Immediate Next Steps (This Week)

1. **Validate Combinations with Underwriting**
   - Review Sheet 1 with UW team
   - Confirm these match real RFQs
   - Remove theoretical-only combinations

2. **Begin Content Framework**
   - Start writing actual copy with Content Designer
   - Prioritize: Headlines, CTAs, Tooltips
   - Create content matrix per construct × payment model

3. **Start Visual Design**
   - UX Designer to create component mockups
   - Start with P0 components: Progress Stepper, Coverage Card, Plan Selector

## Phase 1B (Week 2-3)

1. **Build Prototypes**
   - Create clickable prototypes for 3-4 key flows
   - Flows: V01 (simplest), V11 (full Vanilla), M02 (basic Modular), F05 (basic Flex)

2. **User Research Round 1**
   - Execute interview guides from project plan
   - 5-8 employee interviews
   - Test comprehension with prototypes

3. **Finalize API Contract**
   - Work with backend on config structure
   - Define exact payload for each layer

## Phase 2 (Week 4+)

1. **Development Sprint**
   - Build Flow Engine
   - Build UI Components
   - Integrate with backend

2. **Integration**
   - PAT integration for policy config
   - CD Balance checking
   - Min Participation handling

3. **Testing**
   - Test all 52 combinations
   - User acceptance testing
   - Performance testing

---

# APPENDIX: QUICK REFERENCE

## The 52 Combinations at a Glance

**VANILLA (V01-V21):** Fixed base, optional extras
- V01-V02: Base only (employer-paid)
- V03-V07: With top-ups and/or secondary
- V08-V14: With add-ons
- V15-V19: Partial payment scenarios
- V20-V21: System flag scenarios (min participation, pre-enrollment)

**MODULAR (M01-M11):** Tier-based upgrades
- M01-M02: Basic tier selection
- M03-M06: With secondary and add-ons
- M07-M11: Special scenarios (partial, min participation, grade-based)

**FLEX (F01-F20):** Wallet-based customization
- F01-F05: Basic wallet scenarios (SI, family config)
- F06-F10: With top-ups, secondary, add-ons
- F11-F16: Advanced wallet (custom, upgrade, downgrade, consolidated)
- F17-F20: Special scenarios (min participation, pre-enrollment, grade, wellness)

## Decision Points Per Construct

| Construct | Min Decisions | Max Decisions |
|-----------|---------------|---------------|
| VANILLA | 1 (just confirm) | 4 (top-up + secondary + add-ons + confirm) |
| MODULAR | 1 (view tier) | 5 (tier + secondary + add-ons + payment + confirm) |
| FLEX | 1 (basic wallet) | 5+ (SI + family + top-up + secondary + add-ons) |

---

**END OF MANIFESTO**

*This document should be provided to any AI assistant taking over this project to ensure continuity and context preservation.*
