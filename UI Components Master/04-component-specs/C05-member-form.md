# C05 -- Member Form

| Property | Value |
|----------|-------|
| **ID** | C05 |
| **Name** | Member Form |
| **Priority** | P0 |
| **Layers** | L2 |
| **Construct** | All |

---

## Description

Inline form for adding a new family member. Has a collapsed state (dashed add button) and expanded state (form fields + action buttons).

---

## Variants

| Variant | Context | Description |
|---------|---------|-------------|
| `add` | L2 | Expandable form with 4 fields |

---

## States

| State | Visual Treatment | Trigger |
|-------|-----------------|---------|
| `collapsed` | Dashed border button: "Add family member" with Plus icon | Default, or after cancel/add |
| `expanded` | Purple-bordered form with inputs and buttons | User clicks add button |
| `error` | Error text below inputs in cerise | Validation failure |

---

## Collapsed Anatomy

```
┌ - - - - - - - - - - - - - - - - - - ┐
│         + Add family member          │
└ - - - - - - - - - - - - - - - - - - ┘
```

- `border-2 border-dashed border-onyx-300 rounded-xl py-4`
- Text: `text-sm text-purple-600 font-medium`
- Hover: `border-purple-400 bg-purple-50`

---

## Expanded Anatomy

```
┌──────────────────────────────────────┐
│  Add Family Member                   │
│  ┌────────────────────────────────┐  │
│  │ Name                           │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │ Select Relationship       ▼    │  │
│  └────────────────────────────────┘  │
│  ┌───────────────┐ ┌──────────────┐  │
│  │ Age           │ │ Gender    ▼  │  │
│  └───────────────┘ └──────────────┘  │
│  [Error message if any]              │
│  ┌──────────┐  ┌──────────────────┐  │
│  │   Add    │  │     Cancel       │  │
│  └──────────┘  └──────────────────┘  │
└──────────────────────────────────────┘
```

- Container: `border-2 border-purple-300 rounded-xl p-4 bg-purple-50`
- Title: `text-sm font-semibold text-purple-700`
- Inputs: `.acko-input` (height 40px)
- Name: text input, placeholder "Name"
- Relation: select dropdown -- options: Spouse, Child, Parent, In-Law
- Age: number input, placeholder "Age" (flex-1)
- Gender: select dropdown -- options: Male, Female, Other (flex-1)
- Error: `text-xs text-cerise-700` with AlertCircle icon
- Add button: `flex-1 bg-purple-600 text-white rounded-lg py-2 text-sm font-semibold`
- Cancel button: `flex-1 border border-onyx-300 rounded-lg py-2 text-sm text-onyx-600`

---

## Validation Rules

| Rule | Error Message |
|------|---------------|
| Name empty | "Name and relation are required" |
| Relation empty | "Name and relation are required" |
| Max 6 members | "Maximum 6 members allowed" |
| Parent age > 80 | "Parent age cannot exceed 80 years" |
| Child age > 25 | "Child age cannot exceed 25 years" |

---

## Figma Notes

- Build two variants: `collapsed` and `expanded`
- Expanded form uses vertical auto-layout, 12px spacing
- Age + Gender row is horizontal auto-layout with equal flex
- Buttons row is horizontal auto-layout with equal flex
