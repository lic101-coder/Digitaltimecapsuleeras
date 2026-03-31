import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '../ui/button';
import { useIsMobile } from '../ui/use-mobile';
import { getThemeConfig } from '../capsule-themes/ThemeRegistry';

interface ThemeDetailModalProps {
  themeId: string;
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (themeId: string) => void;
  onViewAllCeremonies: (themeId: string) => void;
  isPurchased?: boolean;
  isProcessing?: boolean;
}

export function ThemeDetailModal({
  themeId,
  isOpen,
  onClose,
  onPurchase,
  onViewAllCeremonies,
  isPurchased = false,
  isProcessing = false,
}: ThemeDetailModalProps) {
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const theme = getThemeConfig(themeId);
  const Icon = theme.icon;

  // Video URL - using a sample ceremony from this theme
  // In production, this would come from theme metadata with a preview video
  const previewVideoUrl = `/ceremony-previews/${themeId}-preview.mp4`;

  // Reset video state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsVideoLoaded(false);
      setIsVideoPlaying(true);
    }
  }, [isOpen]);

  // Auto-play video when loaded
  useEffect(() => {
    if (isOpen && videoRef.current && isVideoLoaded) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay prevented:', err);
        setIsVideoPlaying(false);
      });
    }
  }, [isOpen, isVideoLoaded]);

  // Handle video play/pause
  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;

    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

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
              className={`relative w-full bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden ${
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
                {/* Video Preview Section */}
                <div className="relative w-full aspect-[16/10] bg-black overflow-hidden">
                  {/* Shimmer Loading State */}
                  {!isVideoLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-shimmer bg-[length:200%_100%]" />
                  )}

                  {/* Video Player */}
                  <video
                    ref={videoRef}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      isVideoLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    loop
                    muted
                    playsInline
                    onLoadedData={() => setIsVideoLoaded(true)}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                  >
                    <source src={previewVideoUrl} type="video/mp4" />
                  </video>

                  {/* Play/Pause Overlay */}
                  {isVideoLoaded && (
                    <motion.button
                      className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      onClick={toggleVideoPlayback}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="bg-white/90 backdrop-blur-sm rounded-full p-4"
                        whileHover={{ scale: 1.1 }}
                      >
                        {isVideoPlaying ? (
                          <Pause className="w-8 h-8 text-black" />
                        ) : (
                          <Play className="w-8 h-8 text-black ml-1" />
                        )}
                      </motion.div>
                    </motion.button>
                  )}

                  {/* Preview Label */}
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <p className="text-white text-xs font-medium">Theme Preview</p>
                  </div>

                  {/* Theme Color Gradient Overlay at bottom */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                    style={{
                      background: `linear-gradient(to top, ${theme.primaryColor}40, transparent)`
                    }}
                  />
                </div>

                {/* Content Section */}
                <div className={`${isMobile ? 'p-6' : 'p-8'}`}>
                  {/* Header with Icon and Name */}
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                      <Icon 
                        className="flex-shrink-0"
                        style={{ 
                          fontSize: isMobile ? '3rem' : '4rem',
                          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))'
                        }}
                      />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <motion.h2
                        className={`font-bold text-white mb-2 ${
                          isMobile ? 'text-2xl' : 'text-3xl'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        {theme.name}
                      </motion.h2>
                      {isPurchased && (
                        <motion.div
                          className="inline-flex items-center gap-1.5 bg-green-500/20 border border-green-500/40 rounded-full px-3 py-1"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Check className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm font-medium">Owned</span>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <motion.p
                    className={`text-white/80 leading-relaxed mb-6 ${
                      isMobile ? 'text-sm' : 'text-base'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    {theme.description}
                  </motion.p>

                  {/* Features List */}
                  <motion.div
                    className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      <h3 className="text-white font-bold text-lg">What's Included</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        '5 unique opening ceremonies',
                        'Cinema-quality visual effects',
                        'Custom color palettes & gradients',
                        'Immersive soundscapes',
                        'Lifetime access'
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.45 + index * 0.05 }}
                        >
                          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span className="text-white/70 text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Pricing Section */}
                  {!isPurchased && (
                    <motion.div
                      className="flex items-center justify-between mb-6 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-5"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <div>
                        <p className="text-white/60 text-sm mb-1">One-time purchase</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-white font-bold text-3xl">$4.99</span>
                          <span className="text-white/50 text-sm">USD</span>
                        </div>
                      </div>
                      <Sparkles className="w-8 h-8 text-amber-400" />
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75 }}
                  >
                    {!isPurchased ? (
                      <Button
                        className="w-full h-14 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-amber-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => onPurchase(themeId)}
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
                            <Sparkles className="w-5 h-5" />
                            Purchase Theme
                          </span>
                        )}
                      </Button>
                    ) : (
                      <Button
                        className="w-full h-14 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl border-2 border-white/20 transition-all"
                        onClick={onClose}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <Check className="w-5 h-5" />
                          Start Creating
                        </span>
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      className="w-full h-12 text-white hover:bg-white/5 font-medium rounded-xl group"
                      onClick={() => onViewAllCeremonies(themeId)}
                    >
                      <span className="flex items-center justify-center gap-2">
                        View All Ceremonies
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
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
