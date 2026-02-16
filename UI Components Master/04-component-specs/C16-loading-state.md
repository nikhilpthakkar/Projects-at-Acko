# C16 -- Loading State

| Property | Value |
|----------|-------|
| **ID** | C16 |
| **Name** | Loading State |
| **Priority** | P1 |
| **Layers** | ALL |
| **Construct** | All |

---

## Description

Skeleton shimmer loading states shown while data is being fetched or calculations are running.

---

## Variants

| Variant | Context | Description |
|---------|---------|-------------|
| `skeleton` | Content areas | Shimmer blocks matching content layout |
| `spinner` | Buttons/actions | Circular loading indicator |

---

## States

| State | Visual Treatment | Trigger |
|-------|-----------------|---------|
| `loading` | Animated shimmer or spinner | Data fetching |

---

## Skeleton Shimmer CSS

```css
background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
background-size: 200% 100%;
animation: shimmer 1.5s ease-in-out infinite;
border-radius: 8px;
```

- Class: `.skeleton-shimmer`
- Typical block sizes: match the content they replace (e.g., h-4 w-3/4 for a text line)

---

## Figma Notes

- Build skeleton blocks as rectangles with rounded corners
- Use Figma's smart animate for shimmer effect in prototypes
- Create skeleton variants of key components (Coverage Card skeleton, Member Card skeleton, etc.)
