# C04 -- Member Card

| Property | Value |
|----------|-------|
| **ID** | C04 |
| **Name** | Member Card |
| **Priority** | P0 |
| **Layers** | L2, L6 |
| **Construct** | All |

---

## Description

Displays a single family member with their details. Appears as a repeating item in the family list (L2) and review summary (L6).

---

## Variants

| Variant | Context | Description |
|---------|---------|-------------|
| `compact` | L2, L6 | Card with avatar, name, relation/age/gender, optional delete |

---

## States

| State | Visual Treatment | Trigger |
|-------|-----------------|---------|
| `view` | Standard display, no delete button | Self member, or review mode (L6) |
| `removable` | Trash icon visible on right | Non-Self members in L2 |

---

## Anatomy

```
┌──────────────────────────────────────┐
│  [Avatar]  Employee                🗑 │
│            Self | 32 yrs | Male      │
└──────────────────────────────────────┘
```

- Card: `border border-onyx-300 rounded-xl p-4`
- Avatar: `w-10 h-10 rounded-full bg-purple-100` with Users icon (purple-600, 18px)
- Name: `font-semibold text-sm text-onyx-800`
- Meta: `text-xs text-onyx-500` -- "{relation} | {age} yrs | {gender}"
- Delete button: `text-cerise-700 hover:text-cerise-500` Trash2 icon (16px)
  - Hidden for Self members
  - Shows for Spouse, Child, Parent, In-Law

---

## Data

| Field | Type | Example |
|-------|------|---------|
| name | string | "Employee", "Spouse", "Parent" |
| relation | string | Self, Spouse, Child, Parent, In-Law |
| age | number | 32 |
| gender | string | Male, Female, Other |

---

## Interaction

| Action | Behavior |
|--------|----------|
| Click delete icon | Remove member from list (not available for Self) |

---

## Figma Notes

- Auto-layout horizontal, 12px gap
- Avatar as nested frame (fixed 40x40)
- Text block as vertical auto-layout (name + meta)
- Delete icon right-aligned with boolean visibility property
- Build as component with "removable" boolean variant property
