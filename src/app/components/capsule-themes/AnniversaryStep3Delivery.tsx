/**
 * Anniversary (Love) Theme - Page 3: Delivery Settings
 * Visual: Anniversary card with diamond sparkles and champagne glasses
 * Colors: Rose/burgundy with golden accents
 */

import { parseDateInputAsLocal } from "../../utils/time-validation";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Calendar, Clock, Heart, Users, Mail, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { MultiRecipientSelector } from '../MultiRecipientSelector';

interface Recipient {
  id: string;
  type: 'email' | 'phone';
  value: string;
  name?: string;
}

interface AnniversaryStep3DeliveryProps {
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

export function AnniversaryStep3Delivery({
  deliveryDate,
  deliveryTime,
  onDateChange,
  onTimeChange,
  minDate,
  recipientType,
  onRecipientTypeChange,
  recipients,
  onRecipientsChange,
}: AnniversaryStep3DeliveryProps) {
  // Calculate years from now for countdown display
  const yearsFromNow = deliveryDate 
    ? Math.floor((deliveryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    : 0;

  return (
    <>
      {/* Anniversary Card - Date & Time */}
      <Card className="border-2 border-rose-400 dark:border-rose-700 bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 dark:from-rose-950 dark:via-pink-950 dark:to-rose-900 shadow-2xl relative overflow-hidden">
        {/* Diamond Sparkle Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              💎
            </motion.div>
          ))}
        </div>

        {/* Floating Rose Petals */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${10 + i * 12}%`,
                top: '-10%',
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [0, Math.sin(i) * 30],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'linear',
              }}
            >
              🌹
            </motion.div>
          ))}
        </div>

        <CardHeader className="relative">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center shadow-lg"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Calendar className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold text-rose-900 dark:text-rose-100">
                💖 Years from Now
              </CardTitle>
              <p className="text-sm text-rose-700 dark:text-rose-300">
                When should this love letter arrive?
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative">
          {/* Delivery Date with Countdown */}
          <div className="space-y-2">
            <Label htmlFor="deliveryDate" className="text-rose-900 dark:text-rose-100 font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Anniversary Date
              {yearsFromNow > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-2 px-3 py-1 bg-rose-500 text-white text-xs font-bold rounded-full shadow-lg"
                >
                  {yearsFromNow} {yearsFromNow === 1 ? 'year' : 'years'} from now 💕
                </motion.span>
              )}
            </Label>
            <Input
              id="deliveryDate"
              type="date"
              value={deliveryDate ? deliveryDate.toISOString().split('T')[0] : ''}
              onChange={(e) => {
                const date = e.target.value ? parseDateInputAsLocal(e.target.value) : undefined;
                onDateChange(date);
              }}
              min={minDate.toISOString().split('T')[0]}
              className="border-2 border-rose-300 dark:border-rose-700 focus:border-rose-500 dark:focus:border-rose-500 bg-white/80 dark:bg-rose-950/50 text-rose-900 dark:text-rose-100 shadow-inner"
            />
          </div>

          {/* Delivery Time */}
          <div className="space-y-2">
            <Label htmlFor="deliveryTime" className="text-rose-900 dark:text-rose-100 font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              🥂 Toast Time
            </Label>
            <Input
              id="deliveryTime"
              type="time"
              value={deliveryTime}
              onChange={(e) => onTimeChange(e.target.value)}
              className="border-2 border-rose-300 dark:border-rose-700 focus:border-rose-500 dark:focus:border-rose-500 bg-white/80 dark:bg-rose-950/50 text-rose-900 dark:text-rose-100 shadow-inner"
            />
            <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
              🍾 The perfect moment to pop the champagne and open your love letter
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recipient Selection - Anniversary Style */}
      <Card className="border-2 border-rose-400 dark:border-rose-700 bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 dark:from-rose-950 dark:via-pink-950 dark:to-rose-900 shadow-2xl relative overflow-hidden">
        {/* Champagne Bubbles Background */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-lg"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-5%',
              }}
              animate={{
                y: [0, -window.innerHeight * 1.2],
                x: [0, Math.sin(i) * 20],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeOut',
              }}
            >
              🫧
            </motion.div>
          ))}
        </div>

        <CardHeader className="relative">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-6 h-6 text-white" fill="white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold text-rose-900 dark:text-rose-100">
                Who will receive this?
              </CardTitle>
              <p className="text-sm text-rose-700 dark:text-rose-300">
                Keep it personal or share with others
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative">
          {/* Recipient Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Just for Me */}
            <motion.button
              type="button"
              onClick={() => onRecipientTypeChange('self')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-6 rounded-xl border-3 transition-all duration-300
                ${recipientType === 'self'
                  ? 'border-rose-500 bg-gradient-to-br from-rose-200 to-pink-200 dark:from-rose-800 dark:to-pink-800 shadow-xl ring-4 ring-rose-300 dark:ring-rose-700'
                  : 'border-rose-300 dark:border-rose-700 bg-white/50 dark:bg-rose-950/30 hover:border-rose-400 hover:shadow-lg'
                }
              `}
            >
              {/* Champagne Glasses */}
              <div className="text-center mb-3">
                <motion.div
                  className="text-5xl"
                  animate={recipientType === 'self' ? { rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🥂
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-rose-900 dark:text-rose-100 mb-2">
                  Just for Me
                </h3>
                <p className="text-sm text-rose-700 dark:text-rose-300">
                  A private love letter to myself
                </p>
              </div>
              {recipientType === 'self' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold">✓</span>
                </motion.div>
              )}
            </motion.button>

            {/* Share with Others */}
            <motion.button
              type="button"
              onClick={() => onRecipientTypeChange('others')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-6 rounded-xl border-3 transition-all duration-300
                ${recipientType === 'others'
                  ? 'border-rose-500 bg-gradient-to-br from-rose-200 to-pink-200 dark:from-rose-800 dark:to-pink-800 shadow-xl ring-4 ring-rose-300 dark:ring-rose-700'
                  : 'border-rose-300 dark:border-rose-700 bg-white/50 dark:bg-rose-950/30 hover:border-rose-400 hover:shadow-lg'
                }
              `}
            >
              {/* Group Celebration */}
              <div className="text-center mb-3">
                <motion.div
                  className="text-5xl"
                  animate={recipientType === 'others' ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  💞
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-rose-900 dark:text-rose-100 mb-2">
                  Share with Others
                </h3>
                <p className="text-sm text-rose-700 dark:text-rose-300">
                  Send to loved ones
                </p>
              </div>
              {recipientType === 'others' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center shadow-lg"
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
