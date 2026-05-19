import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, Lock, ChevronRight, Crown, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useIsMobile } from '../ui/use-mobile';

interface BundleTheme {
  id: string;
  name: string;
  emoji: string;
  description: string;
  price: number;
  color: string;
  ceremonyCount: number;
}

interface BundleDetailModalProps {
  bundleId: string;
  bundleName: string;
  bundleDescription: string;
  bundlePrice: number;
  bundleSavings: number;
  themes: BundleTheme[];
  totalCeremonies: number;
  badge?: string;
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (bundleId: string) => void;
  onViewTheme: (themeId: string) => void;
  purchasedThemeIds: string[];
  isProcessing?: boolean;
}

export function BundleDetailModal({
  bundleId,
  bundleName,
  bundleDescription,
  bundlePrice,
  bundleSavings,
  themes,
  totalCeremonies,
  badge,
  isOpen,
  onClose,
  onPurchase,
  onViewTheme,
  purchasedThemeIds,
  isProcessing = false,
}: BundleDetailModalProps) {
  const isMobile = useIsMobile();
  const [expandedThemeId, setExpandedThemeId] = useState<string | null>(null);

  const totalIndividualPrice = themes.reduce((sum, theme) => sum + theme.price, 0);
  const allThemesPurchased = themes.every(t => purchasedThemeIds.includes(t.id));
  const someThemesPurchased = themes.some(t => purchasedThemeIds.includes(t.id));
  const purchasedCount = themes.filter(t => purchasedThemeIds.includes(t.id)).length;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              className={`relative w-full bg-gradient-to-b from-slate-900 via-purple-900/20 to-black rounded-2xl shadow-2xl overflow-hidden ${
                isMobile ? 'max-w-lg max-h-[85vh]' : 'max-w-2xl max-h-[90vh]'
              }`}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 30
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                className="absolute top-4 right-4 z-50 bg-black/60 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/80 transition-colors"
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto max-h-[85vh] md:max-h-[90vh] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                
                {/* Hero Section with Animated Background */}
                <div className="relative px-6 pt-8 pb-6 overflow-hidden">
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-amber-600/10 to-purple-600/20"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    style={{ backgroundSize: '200% 200%' }}
                  />

                  {/* Floating particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
                      style={{
                        left: `${10 + i * 12}%`,
                        top: `${20 + (i % 3) * 30}%`,
                      }}
                      animate={{
                        y: [-20, 20, -20],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}

                  <div className="relative z-10">
                    {/* Badge */}
                    {badge && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 mb-3"
                      >
                        <Badge className="bg-amber-500 text-black font-bold border-0 text-sm">
                          {badge}
                        </Badge>
                      </motion.div>
                    )}

                    {/* Title */}
                    <motion.h1
                      className={`font-bold text-white mb-3 ${
                        isMobile ? 'text-3xl' : 'text-4xl'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      {bundleName}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                      className={`text-white/80 mb-6 ${
                        isMobile ? 'text-base' : 'text-lg'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {bundleDescription}
                    </motion.p>

                    {/* Stats Grid */}
                    <motion.div
                      className="grid grid-cols-3 gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center">
                        <div className="text-2xl font-bold text-white">{themes.length}</div>
                        <div className="text-xs text-white/60">Themes</div>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center">
                        <div className="text-2xl font-bold text-white">{totalCeremonies}</div>
                        <div className="text-xs text-white/60">Ceremonies</div>
                      </div>
                      <div className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-3 text-center">
                        <div className="text-2xl font-bold text-emerald-400">${bundleSavings.toFixed(0)}</div>
                        <div className="text-xs text-emerald-300">Saved</div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Themes Showcase Section */}
                <div className={`${isMobile ? 'px-4 py-6' : 'px-6 py-8'}`}>
                  
                  {/* Ownership Status */}
                  {someThemesPurchased && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Check className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-medium">
                          {allThemesPurchased 
                            ? 'You own all themes in this bundle!' 
                            : `You own ${purchasedCount} of ${themes.length} themes`}
                        </span>
                      </div>
                      {!allThemesPurchased && (
                        <p className="text-sm text-white/60">
                          Complete your collection with this bundle for the remaining themes
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* Themes List */}
                  <div className="mb-6">
                    <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      Included Themes
                    </h2>
                    
                    <div className="space-y-3">
                      {themes.map((theme, index) => {
                        const isPurchased = purchasedThemeIds.includes(theme.id);
                        const isExpanded = expandedThemeId === theme.id;

                        return (
                          <motion.div
                            key={theme.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                          >
                            {/* Theme Header */}
                            <button
                              onClick={() => setExpandedThemeId(isExpanded ? null : theme.id)}
                              className="w-full p-4 flex items-center gap-3 hover:bg-white/5 transition-colors"
                            >
                              <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 shadow-lg"
                                style={{ backgroundColor: theme.color }}
                              >
                                {theme.emoji}
                              </div>
                              
                              <div className="flex-1 text-left min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-bold text-white">{theme.name}</h3>
                                  {isPurchased && (
                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/40 text-xs">
                                      <Check className="w-3 h-3 mr-1" />
                                      Owned
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-white/60">{theme.ceremonyCount} ceremonies</p>
                              </div>

                              <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronRight className="w-5 h-5 text-white/40 transform rotate-90" />
                              </motion.div>
                            </button>

                            {/* Expanded Content */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 space-y-3 border-t border-white/10 pt-3">
                                    <p className="text-sm text-white/70">{theme.description}</p>
                                    
                                    <div className="flex items-center justify-between">
                                      <span className="text-xl font-bold text-white">
                                        ${theme.price.toFixed(2)}
                                      </span>
                                      
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onViewTheme(theme.id);
                                        }}
                                        className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                                      >
                                        View Details →
                                      </Button>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Value Breakdown */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/30 rounded-xl p-5 mb-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Crown className="w-5 h-5 text-amber-400" />
                      <h3 className="text-white font-bold text-lg">Bundle Value</h3>
                    </div>

                    <div className="space-y-3">
                      {/* Individual prices */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Individual theme prices:</span>
                        <span className="text-white/50 line-through">${totalIndividualPrice.toFixed(2)}</span>
                      </div>

                      {/* Bundle price */}
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">Bundle price:</span>
                        <span className="text-3xl font-bold text-white">${bundlePrice.toFixed(2)}</span>
                      </div>

                      {/* Savings highlight */}
                      <motion.div
                        animate={{
                          boxShadow: [
                            '0 0 0 0 rgba(16, 185, 129, 0.4)',
                            '0 0 0 8px rgba(16, 185, 129, 0)',
                            '0 0 0 0 rgba(16, 185, 129, 0)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex items-center justify-center gap-2 bg-emerald-500/20 border border-emerald-500/40 rounded-lg py-3"
                      >
                        <Sparkles className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold text-lg">
                          You save ${bundleSavings.toFixed(2)} ({Math.round((bundleSavings / totalIndividualPrice) * 100)}%)
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* What's Included Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      <h3 className="text-white font-bold text-lg">What's Included</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        `${themes.length} premium themes`,
                        `${totalCeremonies} unique opening ceremonies`,
                        'Cinema-quality VFX and animations',
                        'Custom color palettes for each theme',
                        'Lifetime access to all content',
                        'Free updates and new ceremonies',
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.05 }}
                        >
                          <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                          <span className="text-white/70 text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    {!allThemesPurchased ? (
                      <>
                        <Button
                          className="w-full h-14 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold text-lg rounded-xl shadow-lg shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => onPurchase(bundleId)}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <span className="flex items-center gap-2">
                              <motion.div
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              />
                              Processing...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              <ShoppingCart className="w-5 h-5" />
                              Purchase Bundle
                            </span>
                          )}
                        </Button>

                        <div className="text-center text-xs text-white/50">
                          One-time purchase • Lifetime access • No subscriptions
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 rounded-full px-6 py-3">
                          <Check className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 font-bold">You own this bundle!</span>
                        </div>
                      </div>
                    )}

                    <Button
                      variant="ghost"
                      className="w-full h-12 text-white hover:bg-white/5 font-medium rounded-xl"
                      onClick={onClose}
                    >
                      Close
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
