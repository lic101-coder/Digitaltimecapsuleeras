/**
 * New Year (Fresh Start) Theme - Page 3: Delivery Settings
 * Visual: New Year's Eve invitation with firework bursts and champagne
 * Colors: Purple/gold with NYE celebration elements
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

interface NewYearStep3DeliveryProps {
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

export function NewYearStep3Delivery({
  deliveryDate,
  deliveryTime,
  onDateChange,
  onTimeChange,
  minDate,
  recipientType,
  onRecipientTypeChange,
  recipients,
  onRecipientsChange,
}: NewYearStep3DeliveryProps) {
  // Calculate years from now
  const yearsFromNow = deliveryDate 
    ? Math.floor((deliveryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    : 0;

  return (
    <>
      {/* New Year's Eve Invitation Card - Date & Time */}
      <Card className="border-4 border-purple-400 dark:border-purple-700 bg-gradient-to-br from-purple-50 via-violet-50 to-amber-50 dark:from-purple-950 dark:via-violet-950 dark:to-amber-900 shadow-2xl relative overflow-hidden">
        {/* Firework Bursts Decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => {
            const colors = ['#9333EA', '#F59E0B', '#EC4899', '#3B82F6'];
            const color = colors[i % colors.length];
            
            return (
              <motion.div
                key={`burst-${i}`}
                className="absolute"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${10 + (i % 3) * 30}%`,
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: 'easeOut',
                }}
              >
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ 
                    backgroundColor: color,
                    boxShadow: `0 0 30px ${color}` 
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Champagne Bubbles Rising */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`bubble-${i}`}
              className="absolute rounded-full bg-amber-300 dark:bg-amber-600"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-5%',
                width: '10px',
                height: '10px',
              }}
              animate={{
                y: [0, -window.innerHeight * 0.8],
                opacity: [0.6, 0.8, 0],
              }}
              transition={{
                duration: 4 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        {/* Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3 + Math.random(),
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-amber-400 flex items-center justify-center shadow-lg"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2, repeat: Infinity }
              }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-amber-600 bg-clip-text text-transparent">
                🎆 Future Year Delivery
              </CardTitle>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                When should your resolution arrive?
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          {/* Delivery Date with Countdown */}
          <div className="space-y-2">
            <Label htmlFor="deliveryDate" className="text-purple-900 dark:text-purple-100 font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Resolution Date
              {yearsFromNow > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-amber-500 text-white text-xs font-bold rounded-full shadow-lg"
                >
                  {yearsFromNow} {yearsFromNow === 1 ? 'year' : 'years'} ahead! 🎆
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
              className="border-2 border-purple-300 dark:border-purple-700 focus:border-purple-500 dark:focus:border-purple-500 bg-white/80 dark:bg-purple-950/50 text-purple-900 dark:text-purple-100 shadow-inner"
            />
          </div>

          {/* Delivery Time - Midnight Toast */}
          <div className="space-y-2">
            <Label htmlFor="deliveryTime" className="text-purple-900 dark:text-purple-100 font-bold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              🕛 Midnight Toast
            </Label>
            <Input
              id="deliveryTime"
              type="time"
              value={deliveryTime}
              onChange={(e) => onTimeChange(e.target.value)}
              className="border-2 border-amber-300 dark:border-amber-700 focus:border-amber-500 dark:focus:border-amber-500 bg-white/80 dark:bg-amber-950/50 text-purple-900 dark:text-purple-100 shadow-inner"
            />
            <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1">
              🥂 The perfect moment to celebrate!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recipient Selection - Party Invitation Style */}
      <Card className="border-4 border-purple-400 dark:border-purple-700 bg-gradient-to-br from-purple-50 via-violet-50 to-pink-50 dark:from-purple-950 dark:via-violet-950 dark:to-pink-900 shadow-2xl relative overflow-hidden">
        {/* Confetti Rain */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => {
            const colors = ['#9333EA', '#F59E0B', '#EC4899', '#3B82F6', '#10B981'];
            const color = colors[i % colors.length];
            
            return (
              <motion.div
                key={i}
                className="absolute text-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-5%',
                  color: color,
                }}
                animate={{
                  y: ['0vh', '105vh'],
                  x: [0, (Math.random() - 0.5) * 50],
                  rotate: [0, Math.random() * 720],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'linear',
                }}
              >
                {['🎊', '🎉', '✨', '⭐'][Math.floor(Math.random() * 4)]}
              </motion.div>
            );
          })}
        </div>

        {/* Firework Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              🎆
            </motion.div>
          ))}
        </div>

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Users className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
                Who's celebrating with you?
              </CardTitle>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Solo toast or party together
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          {/* Recipient Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Just Me */}
            <motion.button
              type="button"
              onClick={() => onRecipientTypeChange('self')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-6 rounded-xl border-3 transition-all duration-300
                ${recipientType === 'self'
                  ? 'border-purple-500 bg-gradient-to-br from-purple-200 to-violet-200 dark:from-purple-800 dark:to-violet-800 shadow-xl ring-4 ring-purple-300 dark:ring-purple-700'
                  : 'border-purple-300 dark:border-purple-700 bg-white/50 dark:bg-purple-950/30 hover:border-purple-400 hover:shadow-lg'
                }
              `}
            >
              {/* Champagne Glass */}
              <div className="text-center mb-3">
                <motion.div
                  className="text-5xl"
                  animate={recipientType === 'self' ? { 
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🥂
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-purple-900 dark:text-purple-100 mb-2">
                  Just Me
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Personal resolution
                </p>
              </div>
              {recipientType === 'self' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold">✓</span>
                </motion.div>
              )}
            </motion.button>

            {/* Party With Others */}
            <motion.button
              type="button"
              onClick={() => onRecipientTypeChange('others')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-6 rounded-xl border-3 transition-all duration-300
                ${recipientType === 'others'
                  ? 'border-amber-500 bg-gradient-to-br from-amber-200 to-yellow-200 dark:from-amber-800 dark:to-yellow-800 shadow-xl ring-4 ring-amber-300 dark:ring-amber-700'
                  : 'border-purple-300 dark:border-purple-700 bg-white/50 dark:bg-purple-950/30 hover:border-purple-400 hover:shadow-lg'
                }
              `}
            >
              {/* Clinking Champagne */}
              <div className="text-center mb-3">
                <motion.div
                  className="text-5xl"
                  animate={recipientType === 'others' ? { 
                    scale: [1, 1.15, 1],
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🍾
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-purple-900 dark:text-purple-100 mb-2">
                  Party With Others
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Celebrate together
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
