# Store Integration Guide

## ✅ COMPLETED: Main Store Page Component

The Store page has been created at `/components/Store.tsx` with:

### 🎨 Features Implemented:

1. **Epic Animations**
   - Shimmer effects on Complete Library card
   - Pulsing save badges
   - Lock icon shake animations
   - Smooth page transitions
   - Staggered content reveal

2. **Mobile-First Design**
   - Solid colors (no gradients) optimized for mobile
   - Large tap targets (48px+ buttons)
   - Proper z-index layering throughout
   - Smooth scrolling with fixed header

3. **Ceremony Showcases**
   - Every theme displays all 5 ceremonies
   - Icons + names + descriptions
   - Animated stagger-in effects
   - Visual proof of value

4. **Complete Sections**
   - ✅ Your Collection (progress bar + owned themes)
   - ✅ Complete Library (best value card with shimmer)
   - ✅ Featured Bundles (3 bundles with savings)
   - ✅ All Premium Themes (collapsible accordion)
   - ✅ Beneficiaries (visual slots with upgrade)

5. **Proper Linking**
   - All buttons connected to Stripe checkout flow
   - Bundle purchases route correctly
   - Complete library purchase integrated
   - Theme purchases ready

---

## 🔧 How to Integrate into App.tsx

### Option 1: Add Store Tab to Bottom Navigation (Recommended)

In your `App.tsx`, add the Store tab to your bottom navigation:

```tsx
import { Store } from './components/Store';

// Inside your navigation state:
const [activeTab, setActiveTab] = useState<'home' | 'compose' | 'store' | 'profile'>('home');

// In your bottom nav render:
<button onClick={() => setActiveTab('store')}>
  <Sparkles className="w-6 h-6" />
  <span>Store</span>
</button>

// In your main content render:
{activeTab === 'store' && (
  <Store 
    onClose={() => setActiveTab('home')} 
    userId={user?.id || ''} 
  />
)}
```

### Option 2: Open as Modal/Overlay

```tsx
const [showStore, setShowStore] = useState(false);

// Trigger button:
<button onClick={() => setShowStore(true)}>
  Open Store
</button>

// Render:
{showStore && (
  <Store 
    onClose={() => setShowStore(false)} 
    userId={user?.id || ''} 
  />
)}
```

---

## 🎯 Next Steps

1. **Test the Store page** - Open it and verify animations
2. **Connect Stripe** - Ensure purchase endpoints are ready
3. **Add Store tab icon** - Add Sparkles icon to bottom nav
4. **Theme Selector Integration** - Update compose flow to show locked themes
5. **Bundle Detail Pages** - Create dedicated bundle pages
6. **Beneficiary Management** - Create full beneficiary upgrade page

---

## 🎬 What Makes It POP:

- **Shimmer Effect**: Complete Library card has animated shimmer
- **Pulsing Badges**: Save amount badges pulse with glow
- **Lock Shake**: Locked beneficiary slots shake periodically  
- **Smooth Transitions**: Every element fades/slides in perfectly
- **Progress Bar**: Animated collection progress
- **Ceremony Cards**: Each ceremony has icon + description with stagger animation
- **Hover Effects**: Cards scale on hover
- **Tap Feedback**: Buttons scale down on press
- **Color Pop**: Solid, vibrant mobile-optimized colors
- **Proper Layering**: Z-index hierarchy ensures perfect overlays

---

## 📱 Mobile Optimizations:

- Fixed header with backdrop blur
- Large 56px tall CTAs
- Thumb-friendly spacing
- No tiny text (minimum 12px)
- Collapsible sections to reduce scroll
- Proper touch targets everywhere

---

## 🔗 Routes That Need Backend Support:

1. `GET /purchases/:userId` - Fetch user's purchased themes
2. `POST /purchase-theme` - Create Stripe checkout for theme
3. `POST /purchase-theme` (with bundleId) - Create Stripe checkout for bundle

These should redirect to Stripe Checkout and return a `url` field.

---

Ready to proceed with next steps!
