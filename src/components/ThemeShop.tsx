import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { 
  Sparkles, 
  Check, 
  Loader2, 
  Package, 
  Clock, 
  Users,
  ShoppingCart,
  Zap,
  Star,
  Gift,
  Crown,
  Lock,
  Unlock,
  Heart,
  Palette
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { useAuth } from '../contexts/AuthContext';

interface Theme {
  id: string;
  name: string;
  description: string;
  priceId: string;
  price: number;
  icon: React.ReactNode;
  features: string[];
  category: 'premium' | 'seasonal' | 'special';
  popular?: boolean;
}

interface Bundle {
  id: string;
  name: string;
  description: string;
  priceId: string;
  price: number;
  savings: number;
  themes: string[];
  icon: React.ReactNode;
  features: string[];
}

interface PurchasedTheme {
  theme_id: string;
  purchase_date: string;
  source: string;
}

interface ThemeShopProps {
  userId: string;
}

const THEMES: Theme[] = [
  {
    id: 'time-traveler',
    name: 'Time Traveler',
    description: 'Send messages to your future self with cosmic animations',
    priceId: 'price_1QxALLGxe18YCdZ2aDG7OfVv',
    price: 4.99,
    icon: <Clock className="w-5 h-5" />,
    features: ['Cosmic opening ceremony', 'Futuristic UI theme', 'Special delivery animations'],
    category: 'premium',
    popular: true,
  },
  {
    id: 'mixtape',
    name: 'Mixtape',
    description: 'Create nostalgic music-themed capsules with cassette animations',
    priceId: 'price_1QxAMcGxe18YCdZ2FeJmvPUu',
    price: 4.99,
    icon: <Heart className="w-5 h-5" />,
    features: ['Cassette tape ceremony', 'Retro music UI', 'Audio-focused design'],
    category: 'premium',
  },
  {
    id: 'wedding',
    name: 'Wedding',
    description: 'Elegant wedding-themed capsules with champagne celebrations',
    priceId: 'price_1QxANEGxe18YCdZ2B0MRKgzT',
    price: 4.99,
    icon: <Sparkles className="w-5 h-5" />,
    features: ['Champagne ceremony', 'Elegant design', 'Romance-focused layout'],
    category: 'special',
    popular: true,
  },
];

const BUNDLES: Bundle[] = [
  {
    id: 'premium-pack',
    name: 'Premium Theme Pack',
    description: 'Get all 3 premium themes at a special price',
    priceId: 'price_bundle_premium',
    price: 12.99,
    savings: 2.00,
    themes: ['time-traveler', 'mixtape', 'wedding'],
    icon: <Package className="w-5 h-5" />,
    features: ['All 3 premium themes', 'Save $2.00', 'Unlock all ceremonies', 'Future themes included'],
  },
];

const BENEFICIARY_LIMITS = [
  {
    id: 'beneficiary-5',
    name: '5 Beneficiaries',
    priceId: 'price_beneficiary_5',
    price: 4.99,
    limit: 5,
  },
  {
    id: 'beneficiary-10',
    name: '10 Beneficiaries',
    priceId: 'price_beneficiary_10',
    price: 9.99,
    limit: 10,
  },
  {
    id: 'beneficiary-unlimited',
    name: 'Unlimited Beneficiaries',
    priceId: 'price_beneficiary_unlimited',
    price: 19.99,
    limit: -1,
  },
];

export function ThemeShop({ userId }: ThemeShopProps) {
  const [purchasedThemes, setPurchasedThemes] = useState<PurchasedTheme[]>([]);
  const [beneficiaryLimit, setBeneficiaryLimit] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<string | null>(null);
  const { accessToken, getAccessToken, isAuthenticated, session } = useAuth();

  useEffect(() => {
    fetchPurchases();
  }, [userId]);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/purchases/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch purchases');
      }

      const data = await response.json();
      setPurchasedThemes(data.themes || []);
      setBeneficiaryLimit(data.beneficiaryLimit || 1);
    } catch (error) {
      console.error('Error fetching purchases:', error);
      toast.error('Failed to load your purchases');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (priceId: string, type: 'theme' | 'bundle' | 'beneficiary', itemId: string) => {
    try {
      setPurchasing(itemId);
      
      // Check authentication status first
      console.log('🔐 [ThemeShop] Authentication check:', {
        isAuthenticated,
        hasAccessToken: !!accessToken,
        hasSession: !!session,
        sessionAccessToken: session?.access_token ? 'exists' : 'missing'
      });
      
      // Get the user's access token
      const token = await getAccessToken();
      console.log('🔐 [ThemeShop] Retrieved token:', token ? 'exists (length: ' + token.length + ')' : 'null');
      
      if (!token) {
        console.error('❌ [ThemeShop] No access token available - user not authenticated');
        toast.error('Please sign in to make purchases');
        setPurchasing(null);
        return;
      }
      
      // Validate token format
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        console.error('❌ [ThemeShop] Invalid token format:', tokenParts.length, 'parts');
        toast.error('Invalid authentication token. Please log in again.');
        setPurchasing(null);
        return;
      }
      
      // Decode and check token payload
      try {
        const payload = JSON.parse(atob(tokenParts[1]));
        console.log('🔐 [ThemeShop] Token payload:', {
          role: payload.role,
          sub: payload.sub,
          email: payload.email,
          hasUserId: !!payload.sub
        });
        
        if (!payload.sub) {
          console.error('❌ [ThemeShop] Token has no user ID (sub claim)');
          toast.error('Invalid user session. Please log in again.');
          setPurchasing(null);
          return;
        }
      } catch (e) {
        console.error('❌ [ThemeShop] Failed to decode token:', e);
        toast.error('Invalid authentication token');
        setPurchasing(null);
        return;
      }
      
      let endpoint: string;
      let body: any;

      if (type === 'beneficiary') {
        // Parse beneficiary type from itemId (e.g., 'beneficiary-5' -> '5')
        const quantity = itemId.includes('unlimited') ? undefined : parseInt(itemId.split('-')[1]);
        const purchaseType = itemId.includes('unlimited') ? 'unlimited' : 'quantity';
        
        endpoint = `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/purchase-beneficiary`;
        body = {
          userId,
          purchaseType,
          quantity,
        };
      } else {
        // Theme or bundle purchase
        endpoint = `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/purchase-theme`;
        body = {
          userId,
          themeId: type === 'theme' ? itemId : undefined,
          bundleId: type === 'bundle' ? itemId : undefined,
        };
      }
      
      console.log('💳 [ThemeShop] Creating checkout session:', { endpoint, type, itemId });
      
      // Create checkout session with user's access token
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('❌ [ThemeShop] Checkout failed:', error);
        throw new Error(error.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      console.log('✅ [ThemeShop] Checkout session created, redirecting to Stripe');
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error('❌ [ThemeShop] Error creating checkout:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to start purchase');
      setPurchasing(null);
    }
  };

  const isThemePurchased = (themeId: string) => {
    return purchasedThemes.some(p => p.theme_id === themeId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Palette className="w-8 h-8 text-purple-400" />
          <h2 className="text-3xl font-bold text-white">Theme Shop</h2>
        </div>
        <p className="text-slate-300 text-lg">
          Enhance your capsules with premium themes and unlock new ceremonies
        </p>
      </div>

      {/* Bundles Section */}
      {BUNDLES.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-bold text-white">Bundle Deals</h3>
            <Badge variant="outline" className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-300">
              Best Value
            </Badge>
          </div>

          <div className="grid gap-4">
            {BUNDLES.map((bundle) => {
              const allThemesPurchased = bundle.themes.every(themeId => isThemePurchased(themeId));
              
              return (
                <Card key={bundle.id} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/50 hover:border-purple-400/70 transition-all shadow-lg shadow-purple-500/10">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                          {bundle.icon}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-xl font-bold text-white">{bundle.name}</h4>
                            <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                              Save ${bundle.savings.toFixed(2)}
                            </Badge>
                          </div>
                          <p className="text-slate-300">{bundle.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {bundle.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-1 text-sm text-slate-400">
                              <Check className="w-4 h-4 text-purple-400" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="flex flex-col items-end justify-between gap-3 md:min-w-[180px]">
                        <div className="text-right">
                          <div className="text-3xl font-bold text-white">
                            ${bundle.price.toFixed(2)}
                          </div>
                          <div className="text-sm text-slate-400 line-through">
                            ${(bundle.price + bundle.savings).toFixed(2)}
                          </div>
                        </div>

                        {allThemesPurchased ? (
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/50 px-4 py-2">
                            <Check className="w-4 h-4 mr-1" />
                            Owned
                          </Badge>
                        ) : (
                          <Button
                            onClick={() => handlePurchase(bundle.priceId, 'bundle', bundle.id)}
                            disabled={purchasing === bundle.id}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 shadow-lg shadow-purple-500/30"
                          >
                            {purchasing === bundle.id ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Purchase Bundle
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Individual Themes */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-bold text-white">Individual Themes</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {THEMES.map((theme) => {
            const isPurchased = isThemePurchased(theme.id);
            
            return (
              <Card 
                key={theme.id} 
                className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 border transition-all hover:shadow-lg ${
                  theme.popular 
                    ? 'border-yellow-500/50 hover:border-yellow-400/70 shadow-yellow-500/10' 
                    : 'border-slate-700/50 hover:border-slate-600/70'
                }`}
              >
                <CardHeader className="pb-3">
                  {theme.popular && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center mb-3 shadow-lg shadow-purple-500/30">
                    {theme.icon}
                  </div>
                  
                  <CardTitle className="text-white">{theme.name}</CardTitle>
                  <CardDescription className="text-slate-300">
                    {theme.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Features */}
                  <div className="space-y-2">
                    {theme.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                        <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & Actions */}
                  <div className="pt-4 border-t border-slate-700/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">
                        ${theme.price.toFixed(2)}
                      </span>
                      {isPurchased && (
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                          <Check className="w-3 h-3 mr-1" />
                          Owned
                        </Badge>
                      )}
                    </div>

                    {!isPurchased && (
                      <Button
                        onClick={() => handlePurchase(theme.priceId, 'theme', theme.id)}
                        disabled={purchasing === theme.id}
                        className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold shadow-lg shadow-purple-500/20"
                      >
                        {purchasing === theme.id ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Purchase Theme
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Beneficiary Upgrades */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-bold text-white">Beneficiary Add-ons</h3>
        </div>

        <Alert className="bg-blue-500/10 border-blue-500/30">
          <Users className="w-4 h-4 text-blue-400" />
          <AlertDescription className="text-slate-300">
            Current limit: <strong className="text-white">{beneficiaryLimit === -1 ? 'Unlimited' : beneficiaryLimit}</strong> beneficiary{beneficiaryLimit !== 1 ? 's' : ''}
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-3 gap-4">
          {BENEFICIARY_LIMITS.map((option) => {
            const isActive = beneficiaryLimit === option.limit || (beneficiaryLimit >= option.limit && option.limit !== -1);
            const isUpgrade = option.limit > beneficiaryLimit || (option.limit === -1 && beneficiaryLimit !== -1);
            
            return (
              <Card 
                key={option.id}
                className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 transition-all ${
                  isActive 
                    ? 'border-green-500/50 shadow-lg shadow-green-500/10' 
                    : 'border-slate-700/50 hover:border-slate-600/70'
                }`}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="text-center space-y-2">
                    <div className={`w-12 h-12 rounded-xl ${
                      option.limit === -1 
                        ? 'bg-gradient-to-br from-yellow-500 to-orange-500' 
                        : 'bg-gradient-to-br from-blue-600 to-cyan-600'
                    } flex items-center justify-center mx-auto shadow-lg`}>
                      {option.limit === -1 ? (
                        <Crown className="w-6 h-6 text-white" />
                      ) : (
                        <Users className="w-6 h-6 text-white" />
                      )}
                    </div>
                    
                    <h4 className="text-lg font-bold text-white">{option.name}</h4>
                    <div className="text-3xl font-bold text-white">
                      ${option.price.toFixed(2)}
                    </div>
                  </div>

                  {isActive ? (
                    <Badge className="w-full justify-center bg-green-500/20 text-green-300 border-green-500/50 py-2">
                      <Check className="w-4 h-4 mr-1" />
                      Active
                    </Badge>
                  ) : isUpgrade ? (
                    <Button
                      onClick={() => handlePurchase(option.priceId, 'beneficiary', option.id)}
                      disabled={purchasing === option.id}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg shadow-blue-500/20"
                    >
                      {purchasing === option.id ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Upgrade
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      disabled
                      variant="outline"
                      className="w-full border-slate-600 text-slate-400"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Unavailable
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Info Section */}
      <Alert className="bg-purple-500/10 border-purple-500/30">
        <Sparkles className="w-4 h-4 text-purple-400" />
        <AlertDescription className="text-slate-300">
          All purchases are one-time payments. Themes and beneficiary upgrades are permanent and never expire.
        </AlertDescription>
      </Alert>
    </div>
  );
}