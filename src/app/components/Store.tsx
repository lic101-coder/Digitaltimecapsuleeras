import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { ThemeDetailModal } from './store/ThemeDetailModal';
import { BundleDetailModal } from './store/BundleDetailModal';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner';
import { 
  Sparkles, 
  Loader2,
  ArrowLeft,
  X,
  Crown,
  Check,
  Lock,
  ShoppingCart,
  Info,
  ChevronUp,
  ChevronDown,
  Shield,
  ExternalLink,
  Users
} from 'lucide-react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface ThemeConfig {
  id: string;
  name: string;
  emoji: string;
  description: string;
  price: number;
  ceremonies: CeremonyInfo[];
  features: string[];
  color: string;
  textColor: 'black' | 'white';
  category: 'premium' | 'mid' | 'impulse';
}

interface CeremonyInfo {
  icon: string;
  name: string;
  description: string;
  color: string;
}

interface BundleConfig {
  id: string;
  name: string;
  description: string;
  price: number;
  savings: number;
  themeIds: string[];
  ceremonyCount: number;
  badge?: string;
}

interface PurchasedTheme {
  theme_id: string;
  purchase_date: string;
}

// ============================================================================
// THEME CONFIGURATIONS — 11 Premium Themes, New Pricing
// ============================================================================

const PREMIUM_THEMES: ThemeConfig[] = [
  {
    id: 'wedding',
    name: 'Golden Moments',
    emoji: '💍',
    description: 'Capture wedding memories with cinema-quality VFX',
    price: 2.99,
    color: '#D4AF37',
    textColor: 'black',
    category: 'premium',
    ceremonies: [
      { icon: '🏆', name: 'Photo Finish Victory', description: 'Triumphant & Explosive', color: '#fbbf24' },
      { icon: '🎓', name: 'Graduation Cap Toss', description: 'Inspiring & Celestial', color: '#a78bfa' },
      { icon: '🤵👰', name: 'Wedding First Dance', description: 'Romantic & Magical', color: '#ec4899' },
    ],
    features: ['150+ particle effects', 'Cinema-quality VFX', 'Lifetime access']
  },
  {
    id: 'career',
    name: 'Career Summit',
    emoji: '💼',
    description: 'Mark professional achievements with epic celebrations',
    price: 1.99,
    color: '#1E40AF',
    textColor: 'white',
    category: 'mid',
    ceremonies: [
      { icon: '🏆', name: 'Victory Podium', description: 'Triumphant & Energetic', color: '#fbbf24' },
      { icon: '🖼️', name: 'Hall of Excellence', description: 'Prestigious & Inspiring', color: '#c084fc' },
      { icon: '🎭', name: 'The Curtain Call', description: 'Theatrical & Epic', color: '#dc2626' },
    ],
    features: ['Epic achievement VFX', 'Professional animations', 'Lifetime access']
  },
  {
    id: 'future',
    name: 'Time Traveler',
    emoji: '⚡',
    description: 'Messages to your future self with cosmic animations',
    price: 1.99,
    color: '#10B981',
    textColor: 'white',
    category: 'mid',
    ceremonies: [
      { icon: '⏰', name: "Time's Passage", description: 'Contemplative & Beautiful', color: '#60a5fa' },
      { icon: '💻', name: 'Digital Archive', description: 'Futuristic & Tech', color: '#22d3ee' },
      { icon: '🌀', name: 'Stargate Portal', description: 'Epic & Cosmic', color: '#a855f7' },
    ],
    features: ['Cosmic VFX', 'Time-warp effects', 'Lifetime access']
  },
  {
    id: 'travel',
    name: 'Voyage',
    emoji: '✈️',
    description: 'Adventures and journeys with travel-themed ceremonies',
    price: 0.99,
    color: '#F97316',
    textColor: 'white',
    category: 'impulse',
    ceremonies: [
      { icon: '🧭', name: 'Compass Rose Bloom', description: 'Classic & Elegant', color: '#d4af37' },
      { icon: '✈️', name: 'Around the World', description: 'Whimsical & Adventurous', color: '#0ea5e9' },
      { icon: '🌌', name: 'Aurora Navigation Pathways', description: 'Epic & Cosmic', color: '#22d3ee' },
    ],
    features: ['Travel-themed VFX', 'Map animations', 'Lifetime access']
  },
  {
    id: 'new_year',
    name: "New Year's Eve",
    emoji: '🎉',
    description: 'Ring in the new year with epic resolutions',
    price: 0.99,
    color: '#8B5CF6',
    textColor: 'white',
    category: 'impulse',
    ceremonies: [
      { icon: '🎉', name: 'Neon Countdown Pulse', description: 'Electric & High-Energy', color: '#ec4899' },
      { icon: '🍾', name: 'Champagne Supernova', description: 'Elegant & Epic', color: '#fbbf24' },
      { icon: '🎆', name: 'Firework Symphony', description: 'Grand & Spectacular', color: '#f43f5e' },
    ],
    features: ['Firework effects', 'Countdown animations', 'Lifetime access']
  },
  {
    id: 'new_life',
    name: 'New Life',
    emoji: '👶',
    description: 'Welcoming a new arrival with gentle beauty',
    price: 1.99,
    color: '#EC4899',
    textColor: 'white',
    category: 'mid',
    ceremonies: [
      { icon: '🌅', name: 'Sunrise Symphony', description: 'Cinematic & Radiant', color: '#fbbf24' },
      { icon: '👶', name: 'Special Delivery', description: 'Epic & Devoted', color: '#fb923c' },
      { icon: '🌍', name: 'Genesis - Birth of a World', description: 'Epic & Primordial', color: '#3b82f6' },
    ],
    features: ['Gentle animations', 'Soft pastel effects', 'Lifetime access']
  },
  {
    id: 'friendship',
    name: 'Mixtape',
    emoji: '📼',
    description: 'Retro vibes for friends with cassette animations',
    price: 0.99,
    color: '#14B8A6',
    textColor: 'white',
    category: 'impulse',
    ceremonies: [
      { icon: '💿', name: 'Vinyl Spin', description: 'Nostalgic & Epic', color: '#ff00ff' },
      { icon: '🌃', name: 'Neon Nights', description: '80s Synthwave', color: '#00ffff' },
      { icon: '🕹️', name: 'Arcade Insert Coin', description: 'Fun & Epic', color: '#00e676' },
    ],
    features: ['Retro cassette VFX', 'Music animations', 'Lifetime access']
  },
  {
    id: 'pet',
    name: 'Furry Friends',
    emoji: '🐾',
    description: 'Celebrate beloved pet companions with warmth',
    price: 0.99,
    color: '#92400E',
    textColor: 'white',
    category: 'impulse',
    ceremonies: [
      { icon: '🏡', name: 'First Paws Home', description: 'Joyful & Heartwarming', color: '#fbbf24' },
      { icon: '⭐', name: 'Starlit Companions', description: 'Peaceful & Celestial', color: '#60a5fa' },
      { icon: '🌈', name: 'Rainbow Bridge', description: 'Legendary & Beautiful', color: '#ef4444' },
    ],
    features: ['Pet-themed effects', 'Warm animations', 'Lifetime access']
  },
  {
    id: 'gratitude',
    name: 'Grateful Heart',
    emoji: '🙏',
    description: 'Express heartfelt thanks and appreciation',
    price: 0.99,
    color: '#DC2626',
    textColor: 'white',
    category: 'impulse',
    ceremonies: [
      { icon: '🏮', name: 'Lantern of Thanks', description: 'Heartfelt & Tender', color: '#f97316' },
      { icon: '🌸', name: 'Garden of Gratitude', description: 'Vibrant & Joyful', color: '#ec4899' },
      { icon: '✨', name: 'Infinite Gratitude', description: 'Epic & Transcendent', color: '#a855f7' },
    ],
    features: ['Peaceful animations', 'Meditation effects', 'Lifetime access']
  },
  {
    id: 'graduation',
    name: 'Launchpad',
    emoji: '🚀',
    description: 'Big achievements and next steps with epic launches',
    price: 0.99,
    color: '#0EA5E9',
    textColor: 'white',
    category: 'impulse',
    ceremonies: [
      { icon: '🦋', name: 'Metamorphosis', description: 'Inspiring & Graceful', color: '#ff6b35' },
      { icon: '⚡', name: "Storm's Fury", description: 'Powerful & Electric', color: '#88ccff' },
      { icon: '🚀', name: 'To the Stars', description: 'Epic & Aspirational', color: '#8a2be2' },
    ],
    features: ['Graduation effects', 'Achievement animations', 'Lifetime access']
  },
  {
    id: 'new_home',
    name: 'New Nest',
    emoji: '🏠',
    description: 'Celebrate your new home sweet home',
    price: 0.99,
    color: '#16A34A',
    textColor: 'white',
    category: 'impulse',
    ceremonies: [
      { icon: '💡', name: 'First Light Switch', description: 'Simple & Magical', color: '#fbbf24' },
      { icon: '🔮', name: 'Snowglobe Escape', description: 'Transformative & Epic', color: '#60a5fa' },
      { icon: '⏰', name: 'Time Lapse Legacy', description: 'Emotional & Cinematic', color: '#ea580c' },
    ],
    features: ['Home-themed VFX', 'Move-in animations', 'Lifetime access']
  }
];

// ============================================================================
// BUNDLE CONFIGURATIONS — New Pricing
// ============================================================================

const BUNDLES: BundleConfig[] = [
  {
    id: 'life-milestones',
    name: 'Life Milestones',
    description: 'Capture all major life chapters in one bundle',
    price: 5.99,
    savings: 2.96,
    themeIds: ['wedding', 'career', 'new_life', 'graduation', 'new_home'],
    ceremonyCount: 15,
    badge: '🌟 Popular'
  },
  {
    id: 'celebration',
    name: 'Celebration Pack',
    description: 'Fun, recurring moments with friends and adventures',
    price: 2.49,
    savings: 1.47,
    themeIds: ['friendship', 'travel', 'new_year', 'pet'],
    ceremonyCount: 12
  },
  {
    id: 'inner-journey',
    name: 'Inner Journey',
    description: 'Personal growth and reflection',
    price: 1.99,
    savings: 0.99,
    themeIds: ['future', 'gratitude'],
    ceremonyCount: 6
  }
];

// ============================================================================
// BENEFICIARY SLOT TIERS
// ============================================================================

const SLOT_TIERS = [
  {
    type: 'slot-1',
    label: '+1 Slot',
    price: '$0.99',
    desc: 'One extra person',
    emoji: '👤',
    color: '#60a5fa'
  },
  {
    type: 'slot-3',
    label: '+3 Slots',
    price: '$1.99',
    desc: 'Small family pack',
    emoji: '👨‍👩‍👧',
    badge: '⭐ Best Value',
    color: '#a78bfa'
  },
  {
    type: 'unlimited',
    label: 'Unlimited',
    price: '$4.99',
    desc: 'Everyone who matters',
    emoji: '♾️',
    color: '#fbbf24'
  }
] as const;

// ============================================================================
// FREE THEMES
// ============================================================================

const FREE_THEMES = [
  { id: 'standard', emoji: '⭐', name: 'Standard Eras' },
  { id: 'birthday', emoji: '🎁', name: 'Solar Return' },
  { id: 'anniversary', emoji: '💕', name: 'Eternal Flame' },
  { id: 'first_day', emoji: '🌅', name: 'Fresh Start' }
];

// ============================================================================
// MAIN STORE COMPONENT
// ============================================================================

interface StoreProps {
  onClose: () => void;
  userId: string;
  onOpenLegacyAccess?: () => void;
}

export function Store({ onClose, userId, onOpenLegacyAccess }: StoreProps) {
  const [purchasedThemes, setPurchasedThemes] = useState<PurchasedTheme[]>([]);
  const [beneficiaryLimit, setBeneficiaryLimit] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [allThemesExpanded, setAllThemesExpanded] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [selectedBundleId, setSelectedBundleId] = useState<string | null>(null);
  const [showBundleModal, setShowBundleModal] = useState(false);
  const { getAccessToken } = useAuth();

  // Ref for Complete Library section
  const completeLibraryRef = React.useRef<HTMLDivElement>(null);

  // Function to scroll to Complete Library
  const scrollToCompleteLibrary = () => {
    completeLibraryRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  useEffect(() => { fetchPurchases(); }, [userId]);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      console.log('🎨 [Store] Fetching purchases for user:', userId);
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/purchases/${userId}`;
      console.log('📡 [Store] Fetch URL:', url);
      
      const token = await getAccessToken();
      if (!token) {
        console.error('❌ [Store] No access token available');
        toast.error('Please sign in to view purchases');
        onClose();
        return;
      }
      
      const response = await fetch(
        url,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      console.log('📡 [Store] Response status:', response.status, response.statusText);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ [Store] Purchases loaded:', data);
        setPurchasedThemes(data.themes || []);
        setBeneficiaryLimit(data.beneficiaryLimit ?? 1);
      } else if (response.status === 401) {
        console.error('❌ [Store] Authentication error - session expired');
        toast.error('Your session has expired. Please sign in again.');
        onClose();
        // Trigger logout
        window.location.reload();
      } else if (response.status === 404) {
        console.log('ℹ️ [Store] No purchases found for user (404) - treating as empty');
        setPurchasedThemes([]);
        setBeneficiaryLimit(1);
      } else {
        console.error('❌ [Store] Failed to fetch purchases:', response.status, response.statusText);
        toast.error('Failed to load purchases');
      }
    } catch (error) {
      console.error('❌ [Store] Error fetching purchases:', error);
      toast.error('Failed to load purchases');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (themeId: string) => {
    try {
      // ✅ VALIDATION: Prevent repurchasing already owned themes
      if (isThemePurchased(themeId)) {
        toast.error('You already own this theme!');
        return;
      }

      setPurchasing(themeId);
      const token = await getAccessToken();
      if (!token) { toast.error('Please sign in to make purchases'); setPurchasing(null); return; }
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/purchase-theme`,
        { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, themeId }) }
      );
      if (!response.ok) throw new Error('Purchase failed');
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Failed to start purchase');
      setPurchasing(null);
    }
  };

  const handleBundlePurchase = async (bundleId: string) => {
    try {
      // ✅ VALIDATION: Prevent repurchasing bundles
      // Special case: 'complete-library' is not in BUNDLES array
      if (bundleId !== 'complete-library') {
        const bundle = BUNDLES.find(b => b.id === bundleId);
        if (!bundle) {
          toast.error('Bundle not found');
          return;
        }

        // Check if user owns all themes in this bundle
        const themesInBundle = bundle.themeIds;
        const allThemesOwned = themesInBundle.every(tid => isThemePurchased(tid));
        
        if (allThemesOwned) {
          toast.error(`You already own all themes in the ${bundle.name}!`);
          return;
        }
      } else {
        // For complete-library, check if user owns all premium themes
        const allPremiumThemesOwned = PREMIUM_THEMES.every(t => isThemePurchased(t.id));
        if (allPremiumThemesOwned) {
          toast.error('You already own all premium themes!');
          return;
        }
      }

      setPurchasing(bundleId);
      const token = await getAccessToken();
      if (!token) { toast.error('Please sign in to make purchases'); setPurchasing(null); return; }
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/purchase-theme`,
        { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, bundleId }) }
      );
      if (!response.ok) throw new Error('Purchase failed');
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Bundle purchase error:', error);
      toast.error('Failed to start purchase');
      setPurchasing(null);
    }
  };

  const handleSlotPurchase = async (slotType: string) => {
    try {
      // ✅ VALIDATION: Prevent purchasing slots after buying unlimited
      if (beneficiaryLimit === -1 && slotType !== 'unlimited') {
        toast.error('You already have unlimited beneficiary slots!');
        return;
      }

      // ✅ VALIDATION: Prevent purchasing unlimited if already purchased
      if (slotType === 'unlimited' && beneficiaryLimit === -1) {
        toast.error('You already have unlimited beneficiary slots!');
        return;
      }

      setPurchasing(`slot-${slotType}`);
      const token = await getAccessToken();
      if (!token) { toast.error('Please sign in to make purchases'); setPurchasing(null); return; }
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/purchase-beneficiary`,
        { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, purchaseType: slotType }) }
      );
      if (!response.ok) throw new Error('Purchase failed');
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Slot purchase error:', error);
      toast.error('Failed to start purchase');
      setPurchasing(null);
    }
  };

  const isThemePurchased = (themeId: string) => purchasedThemes.some(p => p.theme_id === themeId);
  const ownedCount = FREE_THEMES.length + purchasedThemes.length;
  const totalCount = FREE_THEMES.length + PREMIUM_THEMES.length;
  const progressPercent = (ownedCount / totalCount) * 100;
  const totalIndividualPrice = PREMIUM_THEMES.reduce((sum, t) => sum + t.price, 0);
  const completeLibraryPrice = 9.99;
  const completeLibrarySavings = totalIndividualPrice - completeLibraryPrice;
  const isUnlimited = beneficiaryLimit === -1;
  const slotLabel = isUnlimited ? '∞ Unlimited' : `${beneficiaryLimit} slot${beneficiaryLimit !== 1 ? 's' : ''}`;
  const allPremiumThemesOwned = PREMIUM_THEMES.every(t => isThemePurchased(t.id));

  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 overflow-y-auto">
      {/* Header */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-300 hover:text-white">
            <ArrowLeft className="w-5 h-5 mr-2" />Back
          </Button>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />Store
          </h1>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      <div className="px-4 py-6 space-y-6 pb-20">

        {/* Your Collection */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-3">
          <h2 className="text-lg font-bold text-white">🎨 Your Collection</h2>
          <Card className="bg-slate-800/50 border-slate-700/50 p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300">{ownedCount} of {totalCount} themes unlocked</span>
              <span className="text-white font-bold">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
            <div className="flex flex-wrap gap-2 mt-3">
              {FREE_THEMES.map(theme => (
                <motion.div key={theme.id} whileHover={{ scale: 1.05 }} className="flex items-center gap-1 px-3 py-1.5 bg-slate-700/50 rounded-full text-sm">
                  <span>{theme.emoji}</span><span className="text-slate-300 text-xs">{theme.name}</span>
                </motion.div>
              ))}
              {PREMIUM_THEMES.filter(t => isThemePurchased(t.id)).map(theme => (
                <motion.div key={theme.id} whileHover={{ scale: 1.05 }} className="flex items-center gap-1 px-3 py-1.5 bg-slate-700/50 rounded-full text-sm">
                  <span>{theme.emoji}</span><span className="text-slate-300 text-xs">{theme.name}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Sparkle Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700/50"></div></div>
          <div className="relative flex justify-center">
            <motion.div
              animate={{ boxShadow: ['0 0 20px rgba(139,92,246,0.3)','0 0 40px rgba(139,92,246,0.5)','0 0 20px rgba(139,92,246,0.3)'] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="px-3 py-1 bg-slate-900 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
            </motion.div>
          </div>
        </div>

        {/* Complete Library */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-2 mb-3">
            <Crown className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">💎 Best Value</h2>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 via-slate-800/50 to-amber-900/50 border-2 border-amber-500/50 p-6 shadow-2xl" ref={completeLibraryRef}>
            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" animate={{ x: [-300, 300] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', repeatDelay: 1 }} style={{ zIndex: 1 }} />
            <div className="relative z-10 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Complete Theme Library</h3>
                  <p className="text-slate-300 text-sm">All 11 themes, unlimited ceremonies</p>
                </div>
                <Badge className="bg-amber-500 text-black font-bold border-0">⭐ Best Value</Badge>
              </div>
              <div className="space-y-2">
                {['All 11 premium themes', '33 VFX ceremonies', 'Lifetime theme access', 'Does not include beneficiary slots'].map((item, idx) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    {idx === 3 ? (
                      <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    ) : (
                      <Check className="w-4 h-4 text-emerald-400" />
                    )}
                    <span className={idx === 3 ? 'text-slate-400 italic' : ''}>{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-end justify-between pt-3 border-t border-slate-700/50">
                <div>
                  <div className="text-sm text-slate-400 line-through">${totalIndividualPrice.toFixed(2)}</div>
                  <div className="text-4xl font-bold text-white">${completeLibraryPrice}</div>
                </div>
                <motion.div
                  animate={{ scale: [1,1.05,1], boxShadow: ['0 0 0 0 rgba(16,185,129,0.4)','0 0 0 10px rgba(16,185,129,0)','0 0 0 0 rgba(16,185,129,0)'] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-full font-bold text-sm"
                >
                  💰 Save ${completeLibrarySavings.toFixed(2)}
                </motion.div>
              </div>
              {allPremiumThemesOwned ? (
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/50 px-6 py-3 text-base">
                  <Check className="w-5 h-5 mr-2" />Owned
                </Badge>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBundlePurchase('complete-library')}
                  disabled={purchasing === 'complete-library'}
                  className="w-full h-14 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-black font-bold rounded-xl shadow-lg hover:shadow-amber-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {purchasing === 'complete-library' ? <><Loader2 className="w-5 h-5 animate-spin" />Processing...</> : <><Lock className="w-5 h-5" />Unlock Everything</>}
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>

        <div className="border-t border-slate-700/50"></div>

        {/* Featured Bundles */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">🎁 Featured Bundles</h2>
          {BUNDLES.map((bundle, index) => {
            const bundleThemes = PREMIUM_THEMES.filter(t => bundle.themeIds.includes(t.id));
            const allPurchased = bundleThemes.every(t => isThemePurchased(t.id));
            return (
              <motion.div key={bundle.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + index * 0.1 }} whileHover={{ scale: 1.01 }} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white">{bundle.name}</h3>
                      {bundle.badge && <Badge variant="outline" className="bg-amber-500/20 text-amber-300 border-amber-500/50 text-xs">{bundle.badge}</Badge>}
                    </div>
                    <p className="text-sm text-slate-400">{bundle.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 py-2">
                  {bundleThemes.map(theme => (
                    <div key={theme.id} className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shadow-lg" style={{ backgroundColor: theme.color }}>
                      {theme.emoji}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-300">
                  <div className="flex items-center gap-1"><Check className="w-4 h-4 text-emerald-400" /><span>{bundle.ceremonyCount} ceremonies</span></div>
                  <div className="flex items-center gap-1"><Check className="w-4 h-4 text-emerald-400" /><span>Lifetime access</span></div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">${bundle.price}</span>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/50">💰 Save ${bundle.savings.toFixed(2)}</Badge>
                  </div>
                  {allPurchased ? (
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/50 px-4 py-2"><Check className="w-4 h-4 mr-1" />Owned</Badge>
                  ) : (
                    <Button onClick={() => { setSelectedBundleId(bundle.id); setShowBundleModal(true); }} disabled={purchasing === bundle.id} className="bg-purple-600 hover:bg-purple-700 text-white">
                      {purchasing === bundle.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <>View Details →</>}
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="border-t border-slate-700/50"></div>

        {/* All Premium Themes */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-4">
          <Collapsible open={allThemesExpanded} onOpenChange={setAllThemesExpanded}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full flex items-center justify-between p-4 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span className="text-lg font-bold text-white">🎨 All Premium Themes (11)</span>
                </div>
                {allThemesExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-4 mt-4">
                {PREMIUM_THEMES.map((theme, index) => {
                  const isPurchased = isThemePurchased(theme.id);
                  return (
                    <motion.div key={theme.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
                      <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: theme.color }}>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{theme.emoji}</span>
                          <span className="font-bold text-lg" style={{ color: theme.textColor }}>{theme.name}</span>
                        </div>
                        {isPurchased ? <Check className="w-5 h-5 text-emerald-400" /> : <Lock className="w-5 h-5" style={{ color: theme.textColor }} />}
                      </div>
                      <div className="p-4 space-y-4">
                        <p className="text-sm text-slate-300">{theme.description}</p>
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-white">Includes {theme.ceremonies.length} Ceremonies:</h4>
                          <div className="space-y-2">
                            {theme.ceremonies.map((ceremony, idx) => (
                              <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + idx * 0.05 }} className="flex items-start gap-2 p-2 bg-slate-700/30 rounded-lg">
                                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ filter: `drop-shadow(0 0 5px ${ceremony.color}99)` }}>
                                  <span className="text-2xl leading-none">{ceremony.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-white text-sm">{ceremony.name}</div>
                                  <div className="text-xs text-slate-400">{ceremony.description}</div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-1">
                          {theme.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                              <Check className="w-3 h-3 text-purple-400" /><span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-3 border-t border-slate-700/50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-3xl font-bold text-white">${theme.price}</div>
                            {isPurchased && <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/50"><Check className="w-4 h-4 mr-1" />Owned</Badge>}
                          </div>
                          {!isPurchased && (
                            <>
                              <motion.button whileTap={{ scale: 0.98 }} onClick={() => handlePurchase(theme.id)} disabled={purchasing === theme.id} className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-2">
                                {purchasing === theme.id ? <><Loader2 className="w-5 h-5 animate-spin" />Processing...</> : <><ShoppingCart className="w-5 h-5" />Unlock Now</>}
                              </motion.button>
                              <div className="text-center text-xs text-slate-400">
                                or save with: <button onClick={scrollToCompleteLibrary} className="text-purple-400 hover:text-purple-300 underline">Complete Library</button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        <div className="border-t border-slate-700/50"></div>

        {/* ================================================================ */}
        {/* BENEFICIARIES SECTION                                            */}
        {/* ================================================================ */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-400" />
            👥 Beneficiaries
          </h2>

          <Card className="bg-slate-800/50 border-slate-700/50 p-4 space-y-4">
            <p className="text-sm text-slate-300">Protect your memories for those who matter most.</p>

            {/* Slot Status Bar */}
            <div className="flex items-center justify-between bg-slate-700/40 rounded-lg px-3 py-2.5">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Users className="w-4 h-4 text-purple-400" />
                <span>Your beneficiary slots</span>
              </div>
              <Badge className={isUnlimited
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-purple-500/20 text-purple-300 border-purple-500/50'}>
                {isUnlimited ? '♾️ Unlimited' : slotLabel}
              </Badge>
            </div>

            {/* Slot Purchase Options */}
            {!isUnlimited && (
              <div className="space-y-2">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Add more slots</p>
                {SLOT_TIERS.map((tier) => (
                  <motion.div
                    key={tier.type}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center justify-between p-3 bg-slate-700/30 border border-slate-600/40 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 flex items-center justify-center text-xl flex-shrink-0"
                        style={{ filter: `drop-shadow(0 0 6px ${tier.color}88)` }}
                      >
                        {tier.emoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-white font-semibold text-sm">{tier.label}</span>
                          {'badge' in tier && tier.badge && (
                            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/50 text-xs px-1.5 py-0 h-4">
                              {tier.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">{tier.desc}</p>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSlotPurchase(tier.type)}
                      disabled={purchasing === `slot-${tier.type}`}
                      className="flex-shrink-0 px-3.5 py-1.5 rounded-lg font-bold text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all"
                      style={{ background: `linear-gradient(135deg, ${tier.color}99, ${tier.color}dd)` }}
                    >
                      {purchasing === `slot-${tier.type}`
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : tier.price
                      }
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Unlimited already owned */}
            {isUnlimited && (
              <div className="flex items-center gap-2 text-sm text-amber-300 bg-amber-500/10 rounded-lg px-3 py-2.5">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>You have unlimited beneficiary slots — everyone who matters is covered.</span>
              </div>
            )}

            {/* Go to Legacy Access */}
            <Button
              variant="outline"
              onClick={() => {
                if (onOpenLegacyAccess) {
                  onClose();
                  onOpenLegacyAccess();
                }
              }}
              className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/10 flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Manage Legacy Access →
            </Button>
          </Card>
        </motion.div>

        {/* Info footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="flex items-start gap-3 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
          <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-300">All purchases are one-time payments. Themes and upgrades never expire.</p>
        </motion.div>
      </div>

      {/* Bundle Detail Modal */}
      {selectedBundleId && (
        <BundleDetailModal
          bundleId={selectedBundleId}
          bundleName={BUNDLES.find(b => b.id === selectedBundleId)?.name || ''}
          bundleDescription={BUNDLES.find(b => b.id === selectedBundleId)?.description || ''}
          bundlePrice={BUNDLES.find(b => b.id === selectedBundleId)?.price || 0}
          bundleSavings={BUNDLES.find(b => b.id === selectedBundleId)?.savings || 0}
          themes={PREMIUM_THEMES.filter(t => BUNDLES.find(b => b.id === selectedBundleId)?.themeIds.includes(t.id)).map(t => ({
            id: t.id, name: t.name, emoji: t.emoji, description: t.description, price: t.price, color: t.color, ceremonyCount: t.ceremonies.length,
          }))}
          totalCeremonies={BUNDLES.find(b => b.id === selectedBundleId)?.ceremonyCount || 0}
          badge={BUNDLES.find(b => b.id === selectedBundleId)?.badge}
          isOpen={showBundleModal}
          onClose={() => { setShowBundleModal(false); setSelectedBundleId(null); }}
          onPurchase={handleBundlePurchase}
          onViewTheme={(themeId) => { setShowBundleModal(false); setSelectedThemeId(themeId); setShowThemeModal(true); }}
          purchasedThemeIds={purchasedThemes.map(p => p.theme_id)}
          isProcessing={purchasing === selectedBundleId}
        />
      )}

      {/* Theme Detail Modal */}
      {selectedThemeId && (
        <ThemeDetailModal
          themeId={selectedThemeId}
          isOpen={showThemeModal}
          onClose={() => { setShowThemeModal(false); setSelectedThemeId(null); }}
          onPurchase={handlePurchase}
          onViewAllCeremonies={(themeId) => { console.log('View ceremonies for theme:', themeId); }}
          isPurchased={isThemePurchased(selectedThemeId)}
          isProcessing={purchasing === selectedThemeId}
        />
      )}
    </div>
  );
}