/**
 * Gratitude (Thankfulness) Theme - Page 3: Delivery Settings
 * Visual: Thank you note card theme with golden glow effects
 * Colors: Warm orange/amber with grateful hearts
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Calendar, Clock, Users, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { MultiRecipientSelector } from '../MultiRecipientSelector';

interface Recipient {
  id: string;
  type: 'email' | 'phone';
  value: string;
  name?: string;
}

interface GratitudeStep3DeliveryProps {
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

export function GratitudeStep3Delivery({
  deliveryDate,
  deliveryTime,
  onDateChange,
  onTimeChange,
  minDate,
  recipientType,
  onRecipientTypeChange,
  recipients,
  onRecipientsChange,
}: GratitudeStep3DeliveryProps) {
  // Calculate years from now
  const yearsFromNow = deliveryDate 
    ? Math.floor((deliveryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    : 0;

  return (
    <>
      {/* Thank You Note Card - Date & Time */}
      <Card className="border-4 border-orange-400 dark:border-orange-700 bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 dark:from-orange-950 dark:via-amber-950 dark:to-red-900 shadow-2xl relative overflow-hidden">
        {/* Golden Glow Background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.3) 0%, rgba(249, 115, 22, 0.1) 40%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
        
        {/* Floating Golden Sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>

        {/* Grateful Hearts Floating */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="absolute text-3xl"
              style={{
                left: `${10 + i * 12}%`,
                bottom: '-10%',
              }}
              animate={{
                y: [0, -window.innerHeight * 0.4],
                opacity: [0, 0.6, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            >
              💛
            </motion.div>
          ))}
        </div>

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-lg"
              animate={{ 
                rotate: [0, 360],
                boxShadow: [
                  '0 0 20px rgba(251, 191, 36, 0.6)',
                  '0 0 30px rgba(251, 191, 36, 0.9)',
                  '0 0 20px rgba(251, 191, 36, 0.6)',
                ]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-serif bg-gradient-to-r from-orange-800 via-amber-700 to-orange-800 bg-clip-text text-transparent">
                💫 Appreciation Date
              </CardTitle>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                When should gratitude be delivered?
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          {/* Delivery Date with Years Display */}
          <div className="space-y-2">
            <Label htmlFor="deliveryDate" className="text-orange-900 dark:text-orange-100 font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Grateful Reflection Date
              {yearsFromNow > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-2 px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-full shadow-lg"
                >
                  {yearsFromNow} {yearsFromNow === 1 ? 'year' : 'years'} of thanks 🙏
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
              className="border-2 border-orange-300 dark:border-orange-700 focus:border-orange-500 dark:focus:border-orange-500 bg-white/80 dark:bg-orange-950/50 text-orange-900 dark:text-orange-100 shadow-inner font-serif"
            />
          </div>

          {/* Delivery Time */}
          <div className="space-y-2">
            <Label htmlFor="deliveryTime" className="text-orange-900 dark:text-orange-100 font-bold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              🕐 Grateful Moment
            </Label>
            <Input
              id="deliveryTime"
              type="time"
              value={deliveryTime}
              onChange={(e) => onTimeChange(e.target.value)}
              className="border-2 border-amber-300 dark:border-amber-700 focus:border-amber-500 dark:focus:border-amber-500 bg-white/80 dark:bg-amber-950/50 text-orange-900 dark:text-orange-100 shadow-inner font-serif"
            />
            <p className="text-xs text-orange-600 dark:text-orange-400 flex items-center gap-1">
              💛 The perfect time to reflect on blessings
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recipient Selection - Thank You Note Style */}
      <Card className="border-4 border-orange-400 dark:border-orange-700 bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 dark:from-orange-950 dark:via-amber-950 dark:to-red-900 shadow-2xl relative overflow-hidden">
        {/* Warm Golden Radiance */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(251, 191, 36, 0.2) 30%, transparent 60%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Autumn Leaves Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              {['🍂', '🍁'][i % 2]}
            </motion.div>
          ))}
        </div>

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Users className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-serif bg-gradient-to-r from-orange-800 via-amber-700 to-orange-800 bg-clip-text text-transparent">
                Who receives your thanks?
              </CardTitle>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Keep it personal or share gratitude
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          {/* Recipient Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Personal Thanks */}
            <motion.button
              type="button"
              onClick={() => onRecipientTypeChange('self')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-6 rounded-xl border-3 transition-all duration-300
                ${recipientType === 'self'
                  ? 'border-orange-500 bg-gradient-to-br from-orange-200 to-amber-200 dark:from-orange-800 dark:to-amber-800 shadow-xl ring-4 ring-orange-300 dark:ring-orange-700'
                  : 'border-orange-300 dark:border-orange-700 bg-white/50 dark:bg-orange-950/30 hover:border-orange-400 hover:shadow-lg'
                }
              `}
            >
              {/* Praying Hands */}
              <div className="text-center mb-3">
                <motion.div
                  className="text-5xl"
                  animate={recipientType === 'self' ? { 
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🙏
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-orange-900 dark:text-orange-100 mb-2">
                  Personal Thanks
                </h3>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Private reflection
                </p>
              </div>
              {recipientType === 'self' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold">✓</span>
                </motion.div>
              )}
            </motion.button>

            {/* Share Gratitude */}
            <motion.button
              type="button"
              onClick={() => onRecipientTypeChange('others')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-6 rounded-xl border-3 transition-all duration-300
                ${recipientType === 'others'
                  ? 'border-amber-500 bg-gradient-to-br from-amber-200 to-yellow-200 dark:from-amber-800 dark:to-yellow-800 shadow-xl ring-4 ring-amber-300 dark:ring-amber-700'
                  : 'border-orange-300 dark:border-orange-700 bg-white/50 dark:bg-orange-950/30 hover:border-orange-400 hover:shadow-lg'
                }
              `}
            >
              {/* Grateful Hearts */}
              <div className="text-center mb-3">
                <motion.div
                  className="text-5xl"
                  animate={recipientType === 'others' ? { 
                    scale: [1, 1.15, 1],
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  💛
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-orange-900 dark:text-orange-100 mb-2">
                  Share Gratitude
                </h3>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Express thankfulness together
                </p>
              </div>
              {recipientType === 'others' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg"
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
