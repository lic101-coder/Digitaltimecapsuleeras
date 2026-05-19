/**
 * Graduation (Achievement) Theme - Page 3: Delivery Settings
 * Visual: Graduation announcement card with cap and gown decorations
 * Colors: School blue/gold with formal achievement styling
 */

import { parseDateInputAsLocal } from "../../utils/time-validation";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Calendar, Clock, Target, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { MultiRecipientSelector } from '../MultiRecipientSelector';

interface Recipient {
  id: string;
  type: 'email' | 'phone';
  value: string;
  name?: string;
}

interface GraduationStep3DeliveryProps {
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

export function GraduationStep3Delivery({
  deliveryDate,
  deliveryTime,
  onDateChange,
  onTimeChange,
  minDate,
  recipientType,
  onRecipientTypeChange,
  recipients,
  onRecipientsChange,
}: GraduationStep3DeliveryProps) {
  // Calculate years from now
  const yearsFromNow = deliveryDate 
    ? Math.floor((deliveryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    : 0;

  return (
    <>
      {/* Graduation Announcement Card - Date & Time */}
      <Card className="border-2 border-blue-400 dark:border-blue-700 bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 dark:from-blue-950 dark:via-slate-950 dark:to-blue-900 shadow-2xl relative overflow-hidden">
        {/* Diploma Border Pattern */}
        <div className="absolute inset-0 pointer-events-none border-4 border-double border-amber-300 dark:border-amber-700 opacity-20" />
        
        {/* Floating Caps */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            >
              🎓
            </motion.div>
          ))}
        </div>

        {/* Trophy Shine Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            >
              ⭐
            </motion.div>
          ))}
        </div>

        <CardHeader className="relative">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Target className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold text-blue-900 dark:text-blue-100">
                🎯 Reunion Date
              </CardTitle>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                When should this achievement unlock?
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative">
          {/* Delivery Date with Years Display */}
          <div className="space-y-2">
            <Label htmlFor="deliveryDate" className="text-blue-900 dark:text-blue-100 font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Milestone Date
              {yearsFromNow > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-2 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full shadow-lg"
                >
                  {yearsFromNow} {yearsFromNow === 1 ? 'year' : 'years'} reunion 🎓
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
              className="border-2 border-blue-300 dark:border-blue-700 focus:border-blue-500 dark:focus:border-blue-500 bg-white/80 dark:bg-blue-950/50 text-blue-900 dark:text-blue-100 shadow-inner font-serif"
            />
          </div>

          {/* Delivery Time */}
          <div className="space-y-2">
            <Label htmlFor="deliveryTime" className="text-blue-900 dark:text-blue-100 font-bold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              ⏰ Milestone Time
            </Label>
            <Input
              id="deliveryTime"
              type="time"
              value={deliveryTime}
              onChange={(e) => onTimeChange(e.target.value)}
              className="border-2 border-blue-300 dark:border-blue-700 focus:border-blue-500 dark:focus:border-blue-500 bg-white/80 dark:bg-blue-950/50 text-blue-900 dark:text-blue-100 shadow-inner font-serif"
            />
            <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
              🎊 The perfect moment to celebrate your achievement
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recipient Selection - Graduation Style */}
      <Card className="border-2 border-blue-400 dark:border-blue-700 bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 dark:from-blue-950 dark:via-slate-950 dark:to-blue-900 shadow-2xl relative overflow-hidden">
        {/* Confetti Background */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-5%',
              }}
              animate={{
                y: ['0vh', '105vh'],
                x: [0, (Math.random() - 0.5) * 50],
                rotate: [0, Math.random() * 720],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'linear',
              }}
            >
              {['🎊', '🎉', '⭐', '🏆', '🎓'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>

        <CardHeader className="relative">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Users className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold text-blue-900 dark:text-blue-100">
                Who celebrates with you?
              </CardTitle>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Share your success or keep it personal
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative">
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
                  ? 'border-blue-500 bg-gradient-to-br from-blue-200 to-sky-200 dark:from-blue-800 dark:to-sky-800 shadow-xl ring-4 ring-blue-300 dark:ring-blue-700'
                  : 'border-blue-300 dark:border-blue-700 bg-white/50 dark:bg-blue-950/30 hover:border-blue-400 hover:shadow-lg'
                }
              `}
            >
              {/* Mortar Board */}
              <div className="text-center mb-3">
                <motion.div
                  className="text-5xl"
                  animate={recipientType === 'self' ? { rotate: [0, -15, 15, 0] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🎓
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100 mb-2">
                  Just Me
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Personal reflection on my journey
                </p>
              </div>
              {recipientType === 'self' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold">✓</span>
                </motion.div>
              )}
            </motion.button>

            {/* Share Achievement */}
            <motion.button
              type="button"
              onClick={() => onRecipientTypeChange('others')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-6 rounded-xl border-3 transition-all duration-300
                ${recipientType === 'others'
                  ? 'border-blue-500 bg-gradient-to-br from-amber-200 to-yellow-200 dark:from-amber-800 dark:to-yellow-800 shadow-xl ring-4 ring-amber-300 dark:ring-amber-700'
                  : 'border-blue-300 dark:border-blue-700 bg-white/50 dark:bg-blue-950/30 hover:border-blue-400 hover:shadow-lg'
                }
              `}
            >
              {/* Trophy */}
              <div className="text-center mb-3">
                <motion.div
                  className="text-5xl"
                  animate={recipientType === 'others' ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🏆
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100 mb-2">
                  Share Achievement
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Celebrate success together
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
