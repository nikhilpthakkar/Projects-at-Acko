# C01 -- Progress Stepper

| Property | Value |
|----------|-------|
| **ID** | C01 |
| **Name** | Progress Stepper |
| **Priority** | P0 |
| **Layers** | ALL (L0--L6) |
| **Construct** | All |

---

## Description

Horizontal progress bar showing the user's position in the enrollment flow. Each visible layer gets a segment. Clickable for completed layers (go back), not clickable for future layers.

---

## Variants

| Variant | Context | Description |
|---------|---------|-------------|
| `horizontal` | All layers | Single row of bars with layer labels below |

---

## States

| State | Visual Treatment | Trigger |
|-------|-----------------|---------|
| `completed` | Bar fill: `purple-600` (solid), label: `purple-400` | Layer index < current index |
| `active` | Bar fill: `purple-400`, label: `purple-700 font-bold` | Layer index = current index |
| `upcoming` | Bar fill: `onyx-300`, label: `onyx-400` | Layer index > current index |

---

## Anatomy

```
[--- bar ---] [--- bar ---] [--- bar ---] [--- bar ---]
  Welcome      Coverage       Family        Plans
```

- Each bar: `flex-1`, height `6px` (h-1.5), `rounded-full`
- Labels: `text-[8px]`, centered below bar, `mt-1`
- Container: `px-4 py-2`, `flex items-center gap-1.5`

---

## Interaction

| Action | Behavior |
|--------|----------|
| Click completed segment | Navigate back to that layer |
| Click active segment | No action |
| Click upcoming segment | No action (cursor-not-allowed) |

---

## Content

Labels are the `shortName` values from LAYER_META:

| Layer | Label |
|-------|-------|
| L0 | Welcome |
| L1 | Coverage |
| L2 | Family |
| L3 | Plans |
| L4 | Enhance |
| L5 | Payment |
| L6 | Review |

Only visible layers are shown (e.g., Vanilla may skip L3, L4, L5).

---

## Figma Notes

- Build as auto-layout horizontal frame
- Each segment is a nested frame: bar (rectangle) + label (text)
- Use component properties for state (completed/active/upcoming)
- Dynamic: number of segments varies (4--7 depending on construct)
