# 08 -- Interaction Patterns

> Navigation model, stepper behavior, floating CTA, toggles, validation flows, and wallet overflow flow. Use this to set up Figma prototyping interactions.

---

## 1. Navigation Model

### Forward Navigation

| Trigger | Behavior |
|---------|----------|
| "Continue" CTA | Advance to next visible layer |
| "Get Started" (L0) | Advance to L1 |
| "Continue to Review" (L5) | Advance to L6 |
| "Confirm Enrollment" (L6) | Submit and show Success screen |
| "Submit Preferences" (L6, preEnroll) | Submit and show Success screen |

### Backward Navigation

| Trigger | Behavior |
|---------|----------|
| "Back" text button (top-left) | Go back one layer |
| Click completed stepper segment | Jump back to that layer |
| Click layer dot (below phone) | Jump back to that layer (completed only) |
| "Edit" link in Review (L6) | Jump to the specific layer for that section |

### Navigation Rules

- Users can go back to any completed layer
- Users cannot skip forward to uncompleted layers
- Going back preserves all selections (state is retained)
- Errors clear when navigating away

---

## 2. Progress Stepper

### Visual States

| Segment State | Bar Color | Label Style | Clickable |
|---------------|-----------|-------------|-----------|
| Completed | purple-600 (solid) | purple-400 | Yes |
| Active | purple-400 | purple-700, font-bold | No |
| Upcoming | onyx-300 | onyx-400 | No |

### Behavior

- Number of segments = number of visible layers (varies by config: 4--7)
- Click on completed segment navigates to that layer
- Active segment shows current position
- Upcoming segments are non-interactive

---

## 3. Floating CTA Button

### Position & Style

- Fixed at bottom of phone screen inside a `px-5 py-3 bg-white border-t border-onyx-200` container
- Button: `w-full py-3.5 rounded-xl font-semibold text-sm shadow-lg`
- Always visible (except on Success screen)

### CTA Text by Layer

| Layer | CTA Text | Button Color |
|-------|----------|-------------|
| L0 | Get Started | purple-600 |
| L1 | Continue | purple-600 |
| L2 | Continue | purple-600 |
| L3 | Continue | purple-600 |
| L4 | Continue | purple-600 |
| L5 | Continue to Review | purple-600 |
| L6 | Confirm Enrollment | green-600 |
| L6 (preEnroll) | Submit Preferences | green-600 |

### Secondary CTA

| Layer | Secondary Text | Style |
|-------|---------------|-------|
| L4 | Skip enhancements | Text link below button: `text-xs text-onyx-500 py-2` |

---

## 4. Layer Dots

- Row of circular buttons below the phone frame
- Each dot: `w-8 h-8 rounded-full text-xs font-bold`
- Shows layer number (0--6)

| Dot State | Style | Clickable |
|-----------|-------|-----------|
| Completed | `bg-purple-200 text-purple-700` | Yes |
| Active | `bg-purple-600 text-white scale-110` | No |
| Upcoming | `bg-onyx-200 text-onyx-600` | No |
| Submitted | `bg-green-200 text-green-700` (all dots) | No |

---

## 5. Arrow Navigation

Two circular arrow buttons flanking the phone frame:

| Button | Icon | Position | Behavior |
|--------|------|----------|----------|
| Left arrow | ChevronLeft | Left of phone | Go to previous layer |
| Right arrow | ChevronRight | Right of phone | Go to next layer |

### States

| State | Style |
|-------|-------|
| Enabled | `bg-purple-100 text-purple-700 hover:bg-purple-200` |
| Disabled | `bg-onyx-200 text-onyx-400` |

Disabled when: at first layer (left), at last layer and not L6 (right), or submitted (both).

---

## 6. Toggle Switch

Used in C07 (Add-on), C08 (Top-up), C09 (Secondary).

### Dimensions

- Track: 44px wide x 24px tall, border-radius 12px
- Thumb: 20px x 20px circle, white with shadow

### States

| State | Track Color | Thumb Position |
|-------|-------------|----------------|
| OFF | onyx-300 | left: 2px |
| ON | purple-600 | left: 22px |
| Disabled | opacity: 40%, cursor: not-allowed | Current position |

### Interaction

- Click track to toggle
- Transition: 200ms for both track color and thumb position

---

## 7. Form Inputs

Uses `.acko-input` class throughout.

### Dimensions

- Height: 44px (40px in add member form)
- Border-radius: 8px
- Padding: 0 16px

### States

| State | Border | Shadow | Text Color |
|-------|--------|--------|------------|
| Default | onyx-300 | none | onyx-800 |
| Focused | purple-600 | `0 0 0 2px purple-200` | onyx-800 |
| Error | cerise-500 | none | onyx-800 |
| Placeholder | onyx-300 | none | onyx-400 |

---

## 8. Checkbox

Used in C11 (Consent).

### Dimensions

- Box: 20px x 20px, border-radius 4px, border-width 2px

### States

| State | Border | Fill | Icon |
|-------|--------|------|------|
| Unchecked | onyx-300 | transparent | none |
| Checked | purple-600 | purple-600 | CheckCircle2 white 14px |
| Error | cerise-500 | transparent | none |

### Interaction

- Click anywhere on the label row to toggle
- On check: errors related to that checkbox clear immediately

---

## 9. Validation Flow

### When Validation Runs

| Trigger | What's Checked |
|---------|---------------|
| Click "Continue" on L2 | members.length > 0 |
| Click "Add" in member form | name, relation required; age limits; max members |
| Toggle add-on (L4) | SI eligibility for OPD |
| Click "Confirm Enrollment" on L6 | All consent checkboxes |

### Error Display

1. Error object is set in state
2. C15 (Error Message) renders inline at the relevant position
3. Affected inputs/checkboxes get cerise border
4. CTA remains enabled (user can retry)

### Error Clearing

- Navigating away clears all errors
- Checking a consent box clears that specific error
- Toggling an add-on clears add-on error
- Config/combo change resets all errors

---

## 10. Wallet Overflow Flow (Flex-specific)

This is the most complex interaction flow in the app.

```
User selects SI / add-ons / top-up / secondary
            |
            v
  PremiumCalc computes total
            |
            v
  total > ₹25,000 wallet?
     /            \
   No              Yes
   |                |
   v                v
 Normal          Wallet bar turns cerise
 display         Overflow amount shown
                 L5 shows overflow alert
                 L6 adds wallet-overflow consent checkbox
                 User must check all 3 consents
                 Submit triggers salary deduction
```

### Wallet States Through the Flow

| Layer | Wallet State | Visual |
|-------|-------------|--------|
| L1 | Full (₹25,000 available) | Green/white banner |
| L3 | Partial (after SI selection) | Partially filled bar |
| L4 | More used (after enhancements) | Further filled bar |
| L5 | Final (may overflow) | Cerise if overflow |
| L6 | Summary | Overflow charge line item if applicable |

---

## 11. Component Annotation Toggle

A "Show IDs" / "Hide IDs" button in the simulator header.

| State | Button Style | Effect |
|-------|-------------|--------|
| OFF | `bg-onyx-200 text-onyx-600` + Tag icon | Component annotations hidden |
| ON | `bg-purple-600 text-white` + Tag icon | Purple badges appear on components with their IDs |

Annotation badge: `absolute -top-2 -right-2 px-1.5 py-0.5 bg-purple-600 text-white text-[9px] font-bold rounded-full` with pulse animation.

---

## 12. State Reset Behavior

| Trigger | What Resets |
|---------|-------------|
| Change policy combination | All selections, all errors, navigation back to L0 |
| "Start Over" button (Success) | All selections, all errors, submitted flag, navigation to L0 |
| Navigate back | Errors clear, selections preserved |
