/**
 * Wedding (Romance) Theme - Page 3: Delivery Settings
 * Visual: Wedding invitation card with floating rose petals and golden rings
 * Colors: Golden/rose with romantic elements
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Calendar, Clock, Users, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { MultiRecipientSelector } from '../MultiRecipientSelector';

interface Recipient {
  id: string;
  type: 'email' | 'phone';
  value: string;
  name?: string;
}

interface WeddingStep3DeliveryProps {
  deliveryDate: Date | undefined;
  deliveryTime: string;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
  minDate: Date;
  recipientType: 'self' | 'others' | null;
  onRecipientTypeChange: (type: 'self' | 'others' | null) => void;
  recipients: Recipient[];
  onRecipientsChange: (recipients: Recipient[]) => void;
}

export function WeddingStep3Delivery({
  deliveryDate,
  deliveryTime,
  onDateChange,
  onTimeChange,
  minDate,
  recipientType,
  onRecipientTypeChange,
  recipients,
  onRecipientsChange,
}: WeddingStep3DeliveryProps) {
  // Calculate years from now
  const yearsFromNow = deliveryDate 
    ? Math.floor((deliveryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    : 0;

  return (
    <>
      {/* Wedding Invitation Card - Date & Time */}
      <Card className="border-4 border-amber-400 dark:border-amber-700 bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50 dark:from-amber-950 dark:via-rose-950 dark:to-pink-900 shadow-2xl relative overflow-hidden">
        {/* Parchment Texture */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ 
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")'
          }}
        />

        {/* Floating Rose Petals Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`rose-${i}`}
              className="absolute text-3xl"
              style={{
                left: `${10 + i * 8}%`,
                top: '-5%',
              }}
              animate={{
                y: [0, window.innerHeight * 0.5],
                x: [0, Math.sin(i * 2) * 30],
                rotate: [0, 360 * (i % 2 ? 1 : -1)],
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: 8 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            >
              🌹
            </motion.div>
          ))}
        </div>

        {/* Candlelight Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, rgba(217, 119, 6, 0.1) 50%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center shadow-lg"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Heart className="w-6 h-6 text-white" fill="white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-serif bg-gradient-to-r from-amber-800 via-rose-700 to-amber-800 bg-clip-text text-transparent">
                💒 Anniversary Date
              </CardTitle>
              <p className="text-sm text-rose-700 dark:text-rose-300 font-serif italic">
                When should love be delivered?
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          {/* Delivery Date with Years Display */}
          <div className="space-y-2">
            <Label htmlFor="deliveryDate" className="text-rose-900 dark:text-rose-100 font-serif font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Anniversary Celebration Date
              {yearsFromNow > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-2 px-3 py-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-bold rounded-full shadow-lg"
                >
                  {yearsFromNow} {yearsFromNow === 1 ? 'year' : 'years'} of love 💕
                </motion.span>
              )}
            </Label>
            <Input
              id="deliveryDate"
              type="date"
              value={deliveryDate ? deliveryDate.toISOString().split('T')[0] : ''}
              onChange={(e) => {
                const date = e.target.value ? new Date(e.target.value) : undefined;
                onDateChange(date);
              }}
              min={minDate.toISOString().split('T')[0]}
              className="border-2 border-amber-300 dark:border-amber-700 focus:border-amber-500 dark:focus:border-amber-500 bg-white/80 dark:bg-amber-950/50 text-rose-900 dark:text-rose-100 shadow-inner font-serif"
            />
          </div>

          {/* Delivery Time - Golden Hour */}
          <div className="space-y-2">
            <Label htmlFor="deliveryTime" className="text-rose-900 dark:text-rose-100 font-serif font-bold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              🕰️ Golden Hour
            </Label>
            <Input
              id="deliveryTime"
              type="time"
              value={deliveryTime}
              onChange={(e) => onTimeChange(e.target.value)}
              className="border-2 border-rose-300 dark:border-rose-700 focus:border-rose-500 dark:focus:border-rose-500 bg-white/80 dark:bg-rose-950/50 text-rose-900 dark:text-rose-100 shadow-inner font-serif"
            />
            <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1 font-serif italic">
              💍 The perfect moment to celebrate your love
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recipient Selection - Wedding Invitation Style */}
      <Card className="border-4 border-amber-400 dark:border-amber-700 bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50 dark:from-amber-950 dark:via-rose-950 dark:to-pink-900 shadow-2xl relative overflow-hidden">
        {/* Parchment Texture */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ 
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")'
          }}
        />

        {/* Rose Petal Corners */}
        <div className="absolute top-4 left-4 text-4xl opacity-30">🌹</div>
        <div className="absolute top-4 right-4 text-4xl opacity-30">🌹</div>
        <div className="absolute bottom-4 left-4 text-4xl opacity-30">🌹</div>
        <div className="absolute bottom-4 right-4 text-4xl opacity-30">🌹</div>

        {/* Floating Hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="absolute text-2xl"
              style={{
                left: `${15 + i * 12}%`,
                bottom: '-5%',
              }}
              animate={{
                y: [0, -window.innerHeight * 0.4],
                opacity: [0, 0.6, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            >
              💕
            </motion.div>
          ))}
        </div>

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Users className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-serif bg-gradient-to-r from-amber-800 via-rose-700 to-amber-800 bg-clip-text text-transparent">
                Who receives this love letter?
              </CardTitle>
              <p className="text-sm text-rose-700 dark:text-rose-300 font-serif italic">
                Private vows or shared celebration
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          {/* Recipient Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Just Us */}
            <motion.button
              type="button"
              onClick={() => onRecipientTypeChange('self')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-6 rounded-xl border-3 transition-all duration-300
                ${recipientType === 'self'
                  ? 'border-amber-500 bg-gradient-to-br from-amber-200 to-rose-200 dark:from-amber-800 dark:to-rose-800 shadow-xl ring-4 ring-amber-300 dark:ring-amber-700'
                  : 'border-amber-300 dark:border-amber-700 bg-white/50 dark:bg-amber-950/30 hover:border-amber-400 hover:shadow-lg'
                }
              `}
            >
              {/* Rose Decorations */}
              <div className="absolute -top-2 -left-2 text-2xl">🌹</div>
              <div className="absolute -top-2 -right-2 text-2xl">🌹</div>
              
              {/* Wedding Rings */}
              <div className="text-center mb-3">
                <motion.div
                  className="text-5xl"
                  animate={recipientType === 'self' ? { 
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💍
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-serif font-bold text-lg text-rose-900 dark:text-rose-100 mb-2">
                  Just Us
                </h3>
                <p className="text-sm text-rose-700 dark:text-rose-300 font-serif italic">
                  Private love letter
                </p>
              </div>
              {recipientType === 'self' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold">✓</span>
                </motion.div>
              )}
            </motion.button>

            {/* Share Our Joy */}
            <motion.button
              type="button"
              onClick={() => onRecipientTypeChange('others')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-6 rounded-xl border-3 transition-all duration-300
                ${recipientType === 'others'
                  ? 'border-rose-500 bg-gradient-to-br from-rose-200 to-pink-200 dark:from-rose-800 dark:to-pink-800 shadow-xl ring-4 ring-rose-300 dark:ring-rose-700'
                  : 'border-amber-300 dark:border-amber-700 bg-white/50 dark:bg-amber-950/30 hover:border-amber-400 hover:shadow-lg'
                }
              `}
            >
              {/* Rose Decorations */}
              <div className="absolute -top-2 -left-2 text-2xl">💐</div>
              <div className="absolute -top-2 -right-2 text-2xl">💐</div>
              
              {/* Hearts */}
              <div className="text-center mb-3">
                <motion.div
                  className="text-5xl"
                  animate={recipientType === 'others' ? { 
                    scale: [1, 1.15, 1],
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  💕
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-serif font-bold text-lg text-rose-900 dark:text-rose-100 mb-2">
                  Share Our Joy
                </h3>
                <p className="text-sm text-rose-700 dark:text-rose-300 font-serif italic">
                  Celebrate together
                </p>
              </div>
              {recipientType === 'others' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold">✓</span>
                </motion.div>
              )}
            </motion.button>
          </div>

          {/* Multi-Recipient Selector - CRITICAL: Must render with exact props */}
          {recipientType === 'others' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MultiRecipientSelector
                recipients={recipients}
                onRecipientsChange={onRecipientsChange}
              />
            </motion.div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
