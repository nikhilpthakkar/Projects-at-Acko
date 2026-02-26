# AI Studio - GMC Flow Engine Simulator Update Instructions

## Overview
The GMC Combinations sheet has been updated from v2 to v3. This document outlines all changes that need to be reflected in the Flow Engine Simulator.

---

## 1. TERMINOLOGY CHANGES

### 1.1 Modular Construct - Top-Up Renamed
```
OLD: "Modular Top-Up"
NEW: "Tier Upgrade"
```

**Where to update:**
- `POLICY_COMBINATIONS` object - all M01-M11 entries
- UI labels in Plan Selection (L3)
- Flow diagram labels
- Test scenario descriptions
- Any dropdown/selector options

**Example change:**
```javascript
// OLD
M02: { construct: 'MODULAR', topUp: 'modular', ... }

// NEW  
M02: { construct: 'MODULAR', topUp: 'tier-upgrade', ... }
```

### 1.2 FLEX Construct - Base Plan Simplified
```
OLD: Multiple variants
  - "Wallet-Based"
  - "Wallet-Based (SI Variants)"
  - "Wallet-Based (Family Variants)"
  - "Wallet-Based (SI+Family)"
  - "Wallet-Based (Custom)"
  - "Wallet-Based (Upgrade)"
  - "Wallet-Based (Downgrade)"
  - "Wallet-Based (Cover Variants)"
  - "Wallet-Based (Grade)"
  - "Wallet-Based (Wellness)"

NEW: Two variants only
  - "Base Variable" (employee can configure SI, family, etc.)
  - "Base Fixed" (fixed base, wallet for enhancements only)
```

**Where to update:**
- `POLICY_COMBINATIONS` object - all F01-F20 entries
- Base plan type checks in FlowEngine
- UI display labels
- RFQ matcher logic

**Example change:**
```javascript
// OLD
F01: { construct: 'FLEX', base: 'wallet', ... }
F03: { construct: 'FLEX', base: 'wallet-si', ... }
F05: { construct: 'FLEX', base: 'wallet-si-family', ... }

// NEW
F01: { construct: 'FLEX', base: 'base-variable', ... }
F03: { construct: 'FLEX', base: 'base-variable', ... }
F05: { construct: 'FLEX', base: 'base-variable', ... }
// Note: All configurable variants → 'base-variable'
// Only truly fixed base plans → 'base-fixed'
```

---

## 2. COMBINATION CHANGES

### 2.1 V20 - REMOVE
```
REMOVED: V20 (Base only with Min Participation)
REASON: Base plan NEVER has minimum participation - it's employer-provided and auto-enrolled
```

**Where to update:**
- Remove V20 from `POLICY_COMBINATIONS` object
- Remove from preset selector dropdown
- Remove from test scenarios
- Update total combination count (52 → 51)

### 2.2 V21 - FLAG FOR REVIEW
```
FLAGGED: V21 (Pre-enrollment full config)
REASON: Structurally identical to V12, differs only by system flags
ACTION: Keep for now, but note it may be consolidated later
```

### 2.3 M01 - CLARIFIED
```
OLD: "View tiers only"
NEW: "View assigned tier only - no upgrade option (tier display)"
```
This is a view-only scenario where employee sees their assigned tier but cannot upgrade.

### 2.4 M07 - CLARIFIED  
```
OLD: "Tier + Add-ons only"
NEW: "Modular view-only with add-ons selection (no tier upgrade)"
```
Employee can view their tier and select add-ons, but cannot upgrade tier.

---

## 3. SYSTEM FLAGS / POST-CONSTRUCT MODIFIERS

### 3.1 Min Participation - Now Per-Component
```
OLD: Single policy-level flag
  minPart: true/false (applies to entire policy)

NEW: Component-level flags
  minPart_topUp: true/false
  minPart_secondary: true/false  
  minPart_addOns: true/false
  // Note: Base NEVER has min participation
```

**Where to update:**
```javascript
// OLD FlowEngine check
if (config.minPart) {
  // Show pending status
}

// NEW FlowEngine check
const hasMinPart = config.minPart_topUp || config.minPart_secondary || config.minPart_addOns;

// Per-component checks
if (config.minPart_topUp && selectedTopUp) {
  // Show pending badge on top-up selection
}
if (config.minPart_secondary && selectedSecondary) {
  // Show pending badge on secondary selection
}
```

### 3.2 RFQ Matcher - Update Input Fields
Split the RFQ input into two sections:

**Construct Variables:**
- Construct Type (VANILLA / MODULAR / FLEX)
- Has Top-Up
- Has Secondary
- Has Add-Ons
- Base Type (for FLEX: Variable / Fixed)

**Post-Construct Modifiers:**
- Min Participation - TopUp (Yes/No)
- Min Participation - Secondary (Yes/No)
- Min Participation - Add-ons (Yes/No)
- Pre-Enrollment (Yes/No)
- CD Balance Check (Yes/No/Optional)
- Grade-Based (Yes/No)

---

## 4. VALIDATION ENGINE UPDATES

### 4.1 New Edge Case: EC-NEW-01 (Data Mismatch)
```javascript
// Add validation for dependent count mismatch
validateDependentMismatch: (previousDependents, currentConfig) => {
  const errors = [];
  const warnings = [];
  
  // Check if previous policy had more dependents than current allows
  if (previousDependents.children > currentConfig.maxChildren) {
    warnings.push({
      type: 'DEPENDENT_SELECTION_REQUIRED',
      message: `Please select which ${currentConfig.maxChildren} child(ren) to cover. Previous policy had ${previousDependents.children}.`,
      requiresSelection: true,
      selectionType: 'children'
    });
  }
  
  // Similar for parents, spouse variants, etc.
  return { errors, warnings };
}
```

### 4.2 New Edge Case: EC-NEW-02 (Incomplete Enrollment)
```javascript
// Add completion tracking
const enrollmentState = {
  layersCompleted: [],
  layersRequired: [], // Dynamically set based on config
  isComplete: false
};

// Show warning on exit attempt
if (!enrollmentState.isComplete) {
  showModal({
    title: "Exit Enrollment?",
    message: "Your selections won't be saved until you complete all steps.",
    actions: ["Continue Enrollment", "Exit Anyway"]
  });
}
```

### 4.3 New Edge Case: EC-NEW-03 (Drop-off Recovery)
```javascript
// Track drop-off for recovery comms
logDropOff: (stage, selections) => {
  return {
    timestamp: Date.now(),
    layer: stage,
    partialSelections: selections,
    recoveryEligible: true
  };
}

// On re-entry, check for existing draft
checkExistingDraft: () => {
  const draft = getDraft();
  if (draft) {
    showModal({
      title: "Continue where you left off?",
      message: `You have an incomplete enrollment from ${formatDate(draft.timestamp)}`,
      actions: ["Continue", "Start Fresh"]
    });
  }
}
```

### 4.4 New Edge Case: EC-NEW-04 (Re-enrollment Override)
```javascript
// Check for existing completed enrollment
checkExistingEnrollment: () => {
  const existing = getCompletedEnrollment();
  if (existing) {
    showModal({
      title: "You've already enrolled",
      message: "Starting again will require completing all steps. New selections will override your current enrollment.",
      currentSummary: existing.summary,
      actions: ["Proceed", "Cancel"]
    });
  }
}
```

### 4.5 Updated Edge Case: EC02 (Parent Addition)
```javascript
// Hybrid L2/L4 approach for parent addition
handleParentAddition: (member, config) => {
  if (member.relation === 'Parent' && !config.baseCoversParents) {
    return {
      allowInL2: true,
      showInlineMessage: true,
      inlineMessage: `Parents not covered under base plan. Additional premium: ₹${calculateParentalPremium()}/year`,
      flagForL4: true,
      l4Enhancement: {
        type: 'parental-coverage',
        preSelected: true,
        premium: calculateParentalPremium()
      }
    };
  }
}
```

---

## 5. UI COMPONENT UPDATES

### 5.1 Layer L3 (Plan Selection) - Modular
```javascript
// Update labels for Modular construct
if (config.construct === 'MODULAR') {
  return {
    headline: config.topUp === 'tier-upgrade' 
      ? "Upgrade Your Plan" 
      : "Your Assigned Plan",  // For M01, M07 (view-only)
    subtext: config.topUp === 'tier-upgrade'
      ? "Choose a higher tier for better benefits"
      : "Review your plan details",
    showUpgradeOptions: config.topUp === 'tier-upgrade',
    viewOnly: !config.topUp || config.topUp === null
  };
}
```

### 5.2 Layer L4 (Enhancements) - Min Participation Badge
```javascript
// Show pending badge per component
const EnhancementCard = ({ item, config }) => {
  const hasPendingStatus = 
    (item.type === 'topUp' && config.minPart_topUp) ||
    (item.type === 'secondary' && config.minPart_secondary) ||
    (item.type === 'addon' && config.minPart_addOns);
  
  return (
    <Card>
      {hasPendingStatus && (
        <Badge variant="warning">
          Subject to minimum enrollment
        </Badge>
      )}
      {/* ... rest of card */}
    </Card>
  );
};
```

### 5.3 Success Screen - Dynamic Status
```javascript
// Determine success status based on modifiers
const getSuccessStatus = (config, selections) => {
  const hasMinPartPending = 
    (config.minPart_topUp && selections.topUp) ||
    (config.minPart_secondary && selections.secondary) ||
    (config.minPart_addOns && selections.addOns.length > 0);
  
  if (config.preEnroll) {
    return {
      title: "Preferences Submitted!",
      message: "Your selections have been recorded for the upcoming policy period.",
      eCardStatus: "pending"
    };
  }
  
  if (hasMinPartPending) {
    return {
      title: "Enrollment Pending",
      message: "Some of your selections are subject to minimum participation. E-card will be generated once confirmed.",
      eCardStatus: "pending"
    };
  }
  
  if (config.cdCheck) {
    return {
      title: "Enrollment Complete!",
      message: "Your e-card will be generated after CD balance verification.",
      eCardStatus: "verifying"
    };
  }
  
  return {
    title: "Enrollment Complete!",
    message: "Your e-card is being generated.",
    eCardStatus: "generating"
  };
};
```

---

## 6. FLOW ENGINE UPDATES

### 6.1 Updated getLayerVisibility
```javascript
getLayerVisibility: (config) => {
  const layers = {
    L0: { show: true, type: 'view', name: 'Welcome' },
    L1: { show: true, type: 'view', name: 'Coverage' },
    L2: { show: true, type: config.construct === 'FLEX' ? 'decision' : 'conditional', name: 'Family' },
    L3: { show: false, type: 'skip', name: 'Plan' },
    L4: { show: false, type: 'skip', name: 'Enhance' },
    L5: { show: false, type: 'skip', name: 'Payment' },
    L6: { show: true, type: 'decision', name: 'Review' },
  };
  
  // L3: Plan Selection
  if (config.construct === 'MODULAR') {
    // Show L3 for all Modular, but type depends on upgrade availability
    layers.L3.show = true;
    layers.L3.type = config.topUp === 'tier-upgrade' ? 'decision' : 'view';
    layers.L3.name = config.topUp === 'tier-upgrade' ? 'Upgrade' : 'Plan View';
  } else if (config.construct === 'FLEX') {
    layers.L3.show = true;
    layers.L3.type = 'decision';
    layers.L3.name = config.base === 'base-variable' ? 'Configure' : 'Plan';
  }
  
  // ... rest of logic
  return layers;
}
```

### 6.2 Updated RFQ Matcher
```javascript
matchRFQToCombinations: (rfqParams) => {
  const matches = [];
  
  Object.entries(POLICY_COMBINATIONS).forEach(([id, config]) => {
    // Skip removed combinations
    if (id === 'V20') return;
    
    let score = 0;
    let matchReasons = [];
    
    // Construct Variables matching
    if (rfqParams.construct && config.construct === rfqParams.construct) {
      score += 30;
      matchReasons.push(`Construct: ${config.construct}`);
    }
    
    // FLEX base type matching
    if (rfqParams.construct === 'FLEX' && rfqParams.baseType) {
      if (rfqParams.baseType === 'variable' && config.base === 'base-variable') {
        score += 15;
        matchReasons.push('Base Variable');
      } else if (rfqParams.baseType === 'fixed' && config.base === 'base-fixed') {
        score += 15;
        matchReasons.push('Base Fixed');
      }
    }
    
    // Post-Construct Modifiers matching (separate section)
    if (rfqParams.minPart_topUp === config.minPart_topUp) score += 3;
    if (rfqParams.minPart_secondary === config.minPart_secondary) score += 3;
    if (rfqParams.minPart_addOns === config.minPart_addOns) score += 3;
    if (rfqParams.preEnroll === config.preEnroll) score += 5;
    if (rfqParams.cdCheck === config.cdCheck) score += 3;
    if (rfqParams.gradeBased === config.gradeBased) score += 3;
    
    // ... rest of matching logic
    
    if (score > 0) {
      matches.push({ id, config, score, matchReasons });
    }
  });
  
  return matches.sort((a, b) => b.score - a.score);
}
```

---

## 7. DATA MODEL UPDATES

### 7.1 Updated POLICY_COMBINATIONS Structure
```javascript
const POLICY_COMBINATIONS = {
  // VANILLA - V01 to V19, V21 (V20 REMOVED)
  V01: { 
    construct: 'VANILLA', 
    base: 'fixed', 
    topUp: null, 
    secondary: null, 
    addOns: null,
    // Payment
    basePay: 'employer', 
    topUpPay: null, 
    secPay: null, 
    addOnPay: null,
    // Post-Construct Modifiers (component level)
    minPart_topUp: false,
    minPart_secondary: false,
    minPart_addOns: false,
    preEnroll: false, 
    cdCheck: false, 
    gradeBased: false,
    // Meta
    name: 'Base only (employer-paid)' 
  },
  
  // MODULAR - M01 to M11
  M02: { 
    construct: 'MODULAR', 
    base: 'tier-selectable', 
    topUp: 'tier-upgrade',  // RENAMED from 'modular'
    // ... rest
  },
  
  // FLEX - F01 to F20
  F01: { 
    construct: 'FLEX', 
    base: 'base-variable',  // SIMPLIFIED from 'wallet'
    // ... rest
  },
  F03: { 
    construct: 'FLEX', 
    base: 'base-variable',  // SIMPLIFIED from 'wallet-si'
    // ... rest
  },
  
  // ... all other combinations
};
```

---

## 8. CONTENT FRAMEWORK UPDATES

### 8.1 Updated Copy for Modular
```javascript
const CONTENT = {
  MODULAR: {
    L3: {
      // With tier upgrade
      withUpgrade: {
        headline: "Upgrade Your Plan",
        subtext: "Choose a higher tier for better benefits",
        cta: "Select Tier"
      },
      // View only (M01, M07)
      viewOnly: {
        headline: "Your Assigned Plan",
        subtext: "Review your coverage details",
        cta: "Continue"
      }
    }
  }
};
```

### 8.2 Min Participation Messaging (Per Component)
```javascript
const MIN_PART_MESSAGES = {
  topUp: {
    badge: "Pending",
    tooltip: "Subject to minimum enrollment for top-up",
    successNote: "Top-up selection pending minimum participation"
  },
  secondary: {
    badge: "Pending", 
    tooltip: "Subject to minimum enrollment for this plan",
    successNote: "Secondary plan pending minimum participation"
  },
  addOns: {
    badge: "Pending",
    tooltip: "Subject to minimum enrollment",
    successNote: "Add-on selection pending minimum participation"
  }
};
```

---

## 9. SUMMARY CHECKLIST

### Must Update:
- [ ] Remove V20 from POLICY_COMBINATIONS
- [ ] Rename "Modular Top-Up" → "Tier Upgrade" in all M combinations
- [ ] Simplify FLEX base types to "base-variable" / "base-fixed"
- [ ] Update M01, M07 descriptions and flow logic
- [ ] Split minPart into component-level flags
- [ ] Add data mismatch validation (EC-NEW-01)
- [ ] Add incomplete enrollment handling (EC-NEW-02)
- [ ] Add drop-off recovery logic (EC-NEW-03)
- [ ] Add re-enrollment override check (EC-NEW-04)
- [ ] Update EC02 parent handling (hybrid L2/L4)
- [ ] Update RFQ matcher with two sections (Construct + Post-Construct)
- [ ] Update success screen status logic

### Nice to Have:
- [ ] Split RFQ input UI into Construct Variables and Post-Construct Modifiers sections
- [ ] Add visual indicators for pending min participation per component
- [ ] Add draft recovery UI for drop-off scenarios

---

## 10. TESTING SCENARIOS TO ADD

```javascript
const NEW_TEST_SCENARIOS = [
  {
    id: 'DATA-MISMATCH-01',
    name: 'Previous policy more children than current allows',
    setup: { previousChildren: 2, currentMaxChildren: 1 },
    expected: 'Selection UI shown to pick which child'
  },
  {
    id: 'INCOMPLETE-01',
    name: 'User tries to exit at L4',
    action: 'Click back/close at L4',
    expected: 'Warning modal shown, selections not saved if exit'
  },
  {
    id: 'DROPOFF-01',
    name: 'User returns after drop-off',
    setup: { previousDropoff: 'L3', hasDraft: true },
    expected: 'Continue/Start Fresh modal shown'
  },
  {
    id: 'REENROLL-01',
    name: 'User starts enrollment after completion',
    setup: { hasCompletedEnrollment: true },
    expected: 'Override warning with current selections shown'
  },
  {
    id: 'MINPART-COMPONENT-01',
    name: 'Only top-up has min participation',
    config: { minPart_topUp: true, minPart_secondary: false },
    expected: 'Pending badge only on top-up, not secondary'
  }
];
```

---

*Document Version: 1.0*
*Based on: GMC_Final_Combinations_v3_Updated.xlsx*
*Last Updated: February 2025*

---

## 11. FLEX BASE TYPE REASSIGNMENT (ADDITIONAL UPDATE)

### The 20 FLEX combinations are now split evenly:

**BASE VARIABLE (10 combinations) - F01-F05, F11-F15:**
Employee can configure SI, family definition, cover variants, etc.

| Combo | Structure |
|-------|-----------|
| F01 | Base Variable only |
| F02 | Base Variable + Add-ons |
| F03 | Base Variable (SI configurable) |
| F04 | Base Variable (Family configurable) |
| F05 | Base Variable (SI + Family configurable) |
| F11 | Base Variable (Custom) + Add-ons |
| F12 | Base Variable with upgrade beyond wallet |
| F13 | Base Variable with downgrade option |
| F14 | Base Variable (Cover variants) |
| F15 | Base Variable + Multi Secondary + Add-ons |

**BASE FIXED (10 combinations) - F06-F10, F16-F20:**
Fixed base plan, wallet used for enhancements only.

| Combo | Structure |
|-------|-----------|
| F06 | Base Fixed + Flex Top-up |
| F07 | Base Fixed + Secondary |
| F08 | Base Fixed + Flex Top-up + Secondary |
| F09 | Base Fixed + Full stack |
| F10 | Base Fixed + Maximum config |
| F16 | Base Fixed + Consolidated Top-up |
| F17 | Base Fixed + Add-ons (with min part) |
| F18 | Base Fixed + Full stack (pre-enroll) |
| F19 | Base Fixed (Grade-based wallet) |
| F20 | Base Fixed + Wellness products |

### Update POLICY_COMBINATIONS:

```javascript
const POLICY_COMBINATIONS = {
  // ... VANILLA and MODULAR ...
  
  // FLEX - BASE VARIABLE (F01-F05, F11-F15)
  F01: { construct: 'FLEX', base: 'base-variable', topUp: null, secondary: null, addOns: null, ... },
  F02: { construct: 'FLEX', base: 'base-variable', topUp: null, secondary: null, addOns: 'available', ... },
  F03: { construct: 'FLEX', base: 'base-variable', topUp: null, secondary: null, addOns: null, ... },
  F04: { construct: 'FLEX', base: 'base-variable', topUp: null, secondary: null, addOns: null, ... },
  F05: { construct: 'FLEX', base: 'base-variable', topUp: null, secondary: null, addOns: null, ... },
  F11: { construct: 'FLEX', base: 'base-variable', topUp: null, secondary: null, addOns: 'available', ... },
  F12: { construct: 'FLEX', base: 'base-variable', topUp: null, secondary: null, addOns: null, ... },
  F13: { construct: 'FLEX', base: 'base-variable', topUp: null, secondary: null, addOns: 'available', ... },
  F14: { construct: 'FLEX', base: 'base-variable', topUp: null, secondary: null, addOns: null, ... },
  F15: { construct: 'FLEX', base: 'base-variable', topUp: null, secondary: 'multi', addOns: 'available', ... },
  
  // FLEX - BASE FIXED (F06-F10, F16-F20)
  F06: { construct: 'FLEX', base: 'base-fixed', topUp: 'flex', secondary: null, addOns: null, ... },
  F07: { construct: 'FLEX', base: 'base-fixed', topUp: null, secondary: 'single', addOns: null, ... },
  F08: { construct: 'FLEX', base: 'base-fixed', topUp: 'flex', secondary: 'single', addOns: null, ... },
  F09: { construct: 'FLEX', base: 'base-fixed', topUp: 'flex', secondary: 'single', addOns: 'available', ... },
  F10: { construct: 'FLEX', base: 'base-fixed', topUp: 'flex', secondary: 'single', addOns: 'available', ... },
  F16: { construct: 'FLEX', base: 'base-fixed', topUp: 'consolidated', secondary: 'single', addOns: 'available', ... },
  F17: { construct: 'FLEX', base: 'base-fixed', topUp: null, secondary: null, addOns: 'available', ... },
  F18: { construct: 'FLEX', base: 'base-fixed', topUp: 'flex', secondary: 'single', addOns: 'available', ... },
  F19: { construct: 'FLEX', base: 'base-fixed', topUp: null, secondary: null, addOns: 'available', ... },
  F20: { construct: 'FLEX', base: 'base-fixed', topUp: null, secondary: null, addOns: 'wellness', ... },
};
```

### Update Layer L3 Logic for FLEX:

```javascript
// In FlowEngine.getLayerVisibility
if (config.construct === 'FLEX') {
  layers.L3.show = true;
  
  if (config.base === 'base-variable') {
    // Employee configures base - more complex UI
    layers.L3.type = 'decision';
    layers.L3.name = 'Configure Coverage';
    layers.L3.components = ['SI Selector', 'Family Definition Picker', 'Cover Variants'];
  } else if (config.base === 'base-fixed') {
    // Fixed base - simpler view, wallet for enhancements
    layers.L3.type = 'view';
    layers.L3.name = 'Your Coverage';
    layers.L3.components = ['Coverage Card (view-only)', 'Wallet Balance Display'];
  }
}
```

### Update Mobile Preview UI:

```javascript
// LayerL3 component - different UI for Base Variable vs Base Fixed
const LayerL3 = ({ config, ... }) => {
  if (config.construct === 'FLEX') {
    if (config.base === 'base-variable') {
      return (
        <div>
          <h2>Configure Your Coverage</h2>
          <SISelector options={siOptions} />
          <FamilyDefinitionPicker />
          <WalletImpactDisplay />
        </div>
      );
    } else {
      // base-fixed
      return (
        <div>
          <h2>Your Base Coverage</h2>
          <CoverageCard viewOnly={true} />
          <WalletDisplay remaining={walletBalance} />
          <p>Use your wallet for enhancements in the next step</p>
        </div>
      );
    }
  }
  // ... other constructs
};
```

---

*Updated: February 2025*
*Change: Added FLEX Base Fixed reassignment (F06-F10, F16-F20)*
