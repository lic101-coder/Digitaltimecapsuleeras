# ERAS STORE - VISUAL REFERENCE GUIDE

## 📐 EXACT LAYOUT STRUCTURE

### 🎯 Z-INDEX HIERARCHY (Strictly Enforced)
```
z-50  → Fixed header with backdrop blur
z-10  → Content cards and sections  
z-5   → Theme/bundle cards
z-1   → Base shimmer overlays
```

---

## 🎨 COLOR PALETTE (Mobile-Optimized Solid Colors)

### Premium Theme Colors:
- 💍 Golden Moments: `#D4AF37` (Gold) - Black text
- 💼 Career Summit: `#1E40AF` (Deep Blue) - White text  
- ⚡ Time Traveler: `#10B981` (Emerald) - White text
- ✈️ Voyage: `#F97316` (Orange) - White text
- 🎉 New Year's Eve: `#8B5CF6` (Purple) - White text
- 👶 New Life: `#EC4899` (Pink) - White text
- 📼 Mixtape: `#14B8A6` (Teal) - White text
- 🐾 Furry Friends: `#92400E` (Brown) - White text
- 🙏 Grateful Heart: `#DC2626` (Red) - White text
- 🚀 Launchpad: `#0EA5E9` (Sky Blue) - White text
- 🏠 New Nest: `#16A34A` (Green) - White text

### UI Colors:
- Background: `#0F172A` (Slate 900)
- Card BG: `rgba(30, 41, 59, 0.5)` (Slate 800/50)
- Border: `rgba(51, 65, 85, 0.5)` (Slate 700/50)
- Text Primary: `#FFFFFF`
- Text Secondary: `#CBD5E1` (Slate 300)
- Text Muted: `#94A3B8` (Slate 400)

---

## 🏗️ SECTION BREAKDOWN

### 1. FIXED HEADER (Always Visible)
```
Height: 64px
Background: rgba(15, 23, 42, 0.95) with backdrop-blur-xl
Border: Bottom 1px slate-700/50
Z-index: 50

[← Back]    [💎 Store]    [×]
```

### 2. YOUR COLLECTION
```
Padding: 16px
Background: Slate 800/50
Border-radius: 12px

🎨 Your Collection
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4 of 15 themes unlocked    27%
[████████░░░░░░░░░░░░░░░░░░] ← Animated progress bar

⭐ Standard    🎁 Solar    💕 Eternal    🌅 Fresh
[Pills showing owned themes]
```

### 3. COMPLETE LIBRARY (Hero Card)
```
Padding: 24px
Border: 2px solid amber-500/50
Background: Gradient from purple-900/50 → slate-800/50 → amber-900/50
Border-radius: 16px
Shadow: 2xl

[ANIMATED SHIMMER OVERLAY] ← Moves left to right every 2.5s

💎 Best Value ⭐
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Complete Theme Library
Unlock everything, forever

✓ All 11 premium themes
✓ 55 VFX ceremonies  
✓ Lifetime access

~~$63.89~~  $34.99     [💰 Save $28.90] ← PULSING

[🔓 Unlock Everything] ← 56px tall, gradient, shimmer
```

### 4. FEATURED BUNDLES
```
🎁 Featured Bundles
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────┐
│ 🌟 Life Milestones  [⭐ Popular]│
│ Capture all major life chapters │
│                                 │
│ [💍] [💼] [👶] [🚀] [🏠]       │ ← Theme icon circles
│                                 │
│ ✓ 25 ceremonies                 │
│ ✓ Lifetime access               │
│                                 │
│ $19.99  [💰 Save $13.90]        │
│                                 │
│ [View Details →]                │
└─────────────────────────────────┘

[2 more bundle cards...]
```

### 5. ALL PREMIUM THEMES (Collapsible)
```
[🎨 All Premium Themes (11)    ▼] ← Tap to expand
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When expanded:

┌─────────────────────────────────┐
│ [💍 Golden Moments]        [🔒] │ ← Solid #D4AF37 header
├─────────────────────────────────┤
│ Capture wedding memories with   │
│ cinema-quality VFX              │
│                                 │
│ Includes 5 Ceremonies:          │
│                                 │
│ [👁️] First Look               │
│      Epic reveal with particles │
│                                 │
│ [🎂] Cake Cutting              │
│      Sparkling celebration      │
│                                 │
│ [🥂] Champagne Toast           │
│      Flowing liquid physics     │
│                                 │
│ [🎵] First Dance               │
│      150+ coordinated particles │
│                                 │
│ [✨] Grand Finale              │
│      Volumetric lighting        │
│                                 │
│ ✓ Cinema-quality VFX            │
│ ✓ Lifetime access               │
│                                 │
│         $9.99                   │
│                                 │
│ [🛒 Unlock Now] ← 48px tall    │
│                                 │
│ or save with: [Complete Library]│
└─────────────────────────────────┘

[10 more theme cards...]
```

### 6. BENEFICIARIES
```
👥 Beneficiaries
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Protect your memories for those
who matter most when you're gone

Current: 1 Free Slot

[✓]  [🔒]  [🔒]  [🔒]  [🔒] ← Locks shake every 3s
Mom

[Upgrade Slots →]
```

---

## 🎬 ANIMATION TIMELINE

### On Page Load:
```
0.0s: Header slides down from top
0.1s: Your Collection fades in
0.2s: Complete Library fades in + shimmer starts
0.3s: Bundles stagger in (0.1s apart each)
0.5s: Premium themes accordion appears
0.6s: Beneficiaries section fades in
0.7s: Info alert fades in
```

### Continuous Animations:
```
Shimmer: Repeats every 2.5s with 1s delay
Save Badge Pulse: Continuous 2s loop
Lock Shake: Every 3s with 4s delay
Progress Bar: Smooth fill animation
```

### Interaction Animations:
```
Card Hover: Scale 1.01-1.05, 0.2s ease
Button Tap: Scale 0.98, instant
Accordion: Smooth expand/collapse 0.3s
```

---

## 📱 RESPONSIVE BREAKPOINTS

### Mobile (Default):
- Single column layout
- Full-width cards
- 16px padding
- 48px+ tap targets

### Desktop (Optional Enhancement):
- Could add 2-column grid for theme cards
- Wider max-width container
- Larger ceremony previews

---

## 🎯 INTERACTIVE STATES

### Buttons:
```
Default: Gradient background, bold text
Hover: Slightly brighter, shadow grows
Active: Scale 0.98
Disabled: 50% opacity, no pointer
Loading: Spinner replaces text
```

### Cards:
```
Default: Semi-transparent bg, border
Hover: Scale 1.02, shadow appears
Owned: Green border + check badge
Locked: Lock icon + price badge
```

---

## 🔗 NAVIGATION FLOWS

### From Store:
- [← Back] → Previous page (home/settings)
- [× Close] → Same as back
- [Unlock Theme] → Stripe checkout → Success page
- [View Bundle] → Bundle detail page (future)
- [Complete Library] → Stripe checkout
- [Upgrade Slots] → Beneficiary page (future)

### To Store:
- Bottom nav 💎 tab
- Settings > Theme Store
- Compose > Locked theme tap → Modal → Store link

---

## ✨ WHAT MAKES IT POP

1. **Shimmer Overlay** - White gradient sweeps across Complete Library card
2. **Pulsing Save Badge** - Green badge grows/shrinks with glow ring
3. **Lock Shake** - Beneficiary locks wiggle to draw attention
4. **Stagger Reveals** - Content appears in sequence, not all at once
5. **Smooth Scrolling** - 60fps scroll with momentum
6. **Color Contrast** - Every theme has distinct, vibrant color
7. **Ceremony Details** - Full list visible, not hidden behind "more"
8. **Progress Visual** - Animated bar shows collection completion
9. **Hover Feedback** - Everything responds to touch/mouse
10. **Typography Hierarchy** - Clear size/weight differences

---

## 🚀 PERFORMANCE OPTIMIZATIONS

- Uses `motion` from `motion/react` (lightweight)
- Animates `transform` and `opacity` only (GPU-accelerated)
- Lazy loads ceremony cards on accordion expand
- Debounced purchase button to prevent double-clicks
- Memoized theme cards to prevent re-renders

---

Ready to test! 🎉
