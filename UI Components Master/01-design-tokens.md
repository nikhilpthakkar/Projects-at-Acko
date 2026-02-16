# 01 -- Design Tokens (ACKO Design System)

> All color, typography, shadow, spacing, and border-radius values used in the GMC Flow Engine UI. Map these to Figma variables/styles.

---

## Typography

| Property | Value |
|----------|-------|
| Font Family | Euclid Circular B |
| Fallback Stack | -apple-system, BlinkMacSystemFont, sans-serif |
| Smoothing | -webkit-font-smoothing: antialiased |

### Font Weights

| Weight | Name | Usage |
|--------|------|-------|
| 400 | Regular | Body text, descriptions, subtexts |
| 500 | Medium | Labels, inputs, buttons, secondary headings |
| 600 | Semibold | Section headings, card titles, badge labels |
| 700 | Bold | Primary headings, amounts, hero numbers |

### Font Sizes (used in mobile simulator)

| Token | Size | Usage |
|-------|------|-------|
| text-3xl | 30px | Hero premium number (L5) |
| text-2xl | 24px | Sum Insured display (L1) |
| text-xl | 20px | Screen headlines (L0, success) |
| text-lg | 18px | Screen headlines (L1-L6) |
| text-sm | 14px | Body text, card content, CTA labels |
| text-xs | 12px | Labels, badges, meta text, tooltips |
| text-[10px] | 10px | Micro badges (SELECTED, DEFAULT, POPULAR), feature tags |
| text-[9px] | 9px | Annotation badges (component IDs) |
| text-[8px] | 8px | Stepper labels |

---

## Colors

### Purple (Primary / Brand)

| Token | Hex | Usage |
|-------|-----|-------|
| purple-800 | #18084A | -- |
| purple-700 | #2E1773 | -- |
| purple-600 | #4E29BB | Primary buttons, active stepper, selected borders, brand accents |
| purple-500 | #926FF3 | -- |
| purple-400 | #B59CF5 | Active stepper bar |
| purple-300 | #D1C5FA | -- |
| purple-200 | #ECEBFF | Selected backgrounds, Flex construct badge, focus ring |
| purple-100 | #F8F7FD | Light backgrounds, hover states, selected card bg |
| purple-50 | (Tailwind) | Selected card fill, form backgrounds |

### Onyx (Neutrals)

| Token | Hex | Usage |
|-------|-----|-------|
| onyx-800 | #0A0A0A | Primary text, phone frame, dark backgrounds |
| onyx-700 | #121212 | Premium dark section background |
| onyx-600 | #2F2F2F | Secondary text |
| onyx-500 | #5D5D5D | Tertiary text, descriptions, labels |
| onyx-400 | #B0B0B0 | Disabled text, arrows, dividers |
| onyx-300 | #E7E7E7 | Borders, card outlines, inactive stepper, divider lines |
| onyx-200 | #F6F6F6 | Page background, info backgrounds, feature tags |
| onyx-100 | #FFFFFF | Card backgrounds, input backgrounds |

### Green (Success / Positive)

| Token | Hex | Usage |
|-------|-----|-------|
| green-700 | #1C772C | Success icon fills, employer-pays text |
| green-600 | #149A40 | Confirm CTA button (L6), battery fill |
| green-500 | #55B94D | Progress bars (employer share), benefit checkmarks |
| green-200 | #DAFAD7 | Success backgrounds, benefit badges, e-card border |
| green-100 | #F3FFF2 | Light success backgrounds |

### Orange (Warning / Attention)

| Token | Hex | Usage |
|-------|-----|-------|
| orange-700 | #B15A08 | Upgrade price text, employee-pays text |
| orange-500 | #F4A024 | Progress bars (employee share), warning icons |
| orange-200 | #FFEDC5 | Warning backgrounds, POPULAR badge |
| orange-100 | #FFF8E7 | Light warning backgrounds, Flex wallet change notice |

### Cerise (Error / Destructive)

| Token | Hex | Usage |
|-------|-----|-------|
| cerise-700 | #981950 | Error text, delete icon color |
| cerise-500 | #EC5FAB | Error border highlight (consent checkboxes) |
| cerise-200 | #FCE7F4 | Error message backgrounds, mismatch badges |

### Blue (Info / Neutral Highlight)

| Token | Hex | Usage |
|-------|-----|-------|
| blue-700 | #006A97 | Info badge text, top-up icon |
| blue-500 | #1EB7E7 | -- |
| blue-200 | #DEF7FF | Info badge backgrounds, Floater badge, pre-enrollment banner |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| shadow-sm | `0 1px 2px rgba(10,10,10,0.05)` | Subtle card elevation |
| shadow-md | `0 4px 6px -1px rgba(10,10,10,0.07), 0 2px 4px -2px rgba(10,10,10,0.05)` | Card hover state |
| shadow-lg | `0 10px 15px -3px rgba(10,10,10,0.08), 0 4px 6px -4px rgba(10,10,10,0.05)` | Floating CTA button |
| phone-shadow | `0 0 0 2px rgba(0,0,0,0.1), 0 20px 60px -10px rgba(0,0,0,0.3), 0 10px 20px -5px rgba(0,0,0,0.15)` | Phone frame |

---

## Border Radii

| Size | Value | Usage |
|------|-------|-------|
| xs | 2px | Battery corners |
| sm | 4px | Severity badges |
| md | 8px | Buttons, inputs, inner cards |
| lg | 12px | Cards (`.acko-card`), toggle track |
| xl | 16px | Section cards, plan cards |
| 2xl | 20px | -- |
| full | 9999px | Badges, dots, toggle thumb, avatar circles |
| phone-inner | 38px | Phone screen inner border |
| phone-outer | 44px | Phone frame outer border |

---

## Spacing Scale (commonly used)

| Token | Value | Usage |
|-------|-------|-------|
| px-5 / py-4 | 20px / 16px | Screen content padding |
| px-4 / py-3 | 16px / 12px | Card inner padding |
| px-3 / py-2 | 12px / 8px | Badge padding, info bars |
| gap-2 | 8px | Common element gap |
| gap-3 | 12px | Card content gap |
| gap-4 | 16px | Section spacing |
| space-y-3 | 12px | Vertical stack spacing (cards) |
| space-y-4 | 16px | Vertical stack spacing (sections) |

---

## Component Classes

### `.acko-card`
```
background: white
border: 1px solid var(--onyx-300)
border-radius: 12px
transition: box-shadow 0.2s
hover: box-shadow var(--shadow-md)
```

### `.acko-btn`
```
height: 40px
border-radius: 8px
font-weight: 500
display: inline-flex
align-items: center
justify-content: center
transition: all 0.2s
cursor: pointer
```

### `.acko-input`
```
height: 44px
border-radius: 8px
border: 1px solid var(--onyx-300)
padding: 0 16px
width: 100%
font-size: 14px
focus: border-color var(--purple-600), box-shadow 0 0 0 2px var(--purple-200)
```

### `.toggle-track`
```
width: 44px
height: 24px
border-radius: 12px
position: relative
cursor: pointer
transition: background 0.2s
ON: background var(--purple-600)
OFF: background var(--onyx-300)
```

### `.toggle-thumb`
```
width: 20px
height: 20px
border-radius: 50%
background: white
box-shadow: 0 1px 3px rgba(0,0,0,0.2)
ON position: left 22px
OFF position: left 2px
transition: left 0.2s
```

---

## Phone Frame Dimensions

| Property | Value |
|----------|-------|
| Outer frame | 375 x 780px |
| Corner radius | 44px outer, 38px inner |
| Bezel | 8px all sides |
| Notch | 120px wide x 32px tall, centered, pill shape |
| Status bar top padding | 14px (pt-14 = 56px from top of inner frame) |
| Home indicator | 134px x 5px, centered, rounded full |

---

## Animations (for Figma prototyping reference)

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| fadeInUp | 300ms | ease-out | Screen transitions, card appearances |
| shimmer | 1500ms | ease-in-out, infinite | Loading skeleton states |
| pulse-ring | 1500ms | ease-out, infinite | Annotation badges |
| scoreReveal | 800ms | ease-out | RFQ match score ring |
