/**
 * First Day (School/Job) Theme - Page 3: Delivery Settings
 * Visual: First day announcement card with school bell ringing
 * Colors: Orange/yellow school theme
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Calendar, Clock, Users, Bell } from 'lucide-react';
import { motion } from 'motion/react';
import { MultiRecipientSelector } from '../MultiRecipientSelector';

interface Recipient {
  id: string;
  type: 'email' | 'phone';
  value: string;
  name?: string;
}

interface FirstDayStep3DeliveryProps {
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

export function FirstDayStep3Delivery({
  deliveryDate,
  deliveryTime,
  onDateChange,
  onTimeChange,
  minDate,
  recipientType,
  onRecipientTypeChange,
  recipients,
  onRecipientsChange,
}: FirstDayStep3DeliveryProps) {
  const yearsFromNow = deliveryDate 
    ? Math.floor((deliveryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    : 0;

  return (
    <>
      {/* First Day Announcement Card - Date & Time */}
      <Card className="border-4 border-orange-400 dark:border-orange-700 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 dark:from-yellow-950 dark:via-orange-950 dark:to-amber-950 shadow-2xl relative overflow-hidden">
        {/* Notebook Paper Lines */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ 
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(249, 115, 22, 0.3) 31px, rgba(249, 115, 22, 0.3) 32px)',
          }}
        />
        
        {/* Red margin line */}
        <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-red-400 opacity-40 pointer-events-none" />

        {/* School Bell Ringing Visual */}
        <div className="absolute top-4 right-4 z-20">
          <motion.div
            className="text-5xl"
            animate={{
              rotate: [-15, 15, -15, 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: 'easeInOut'
            }}
          >
            🔔
          </motion.div>
          {/* Sound waves */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-orange-400 rounded-full"
              animate={{
                scale: [0, 2],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeOut'
              }}
              style={{ width: '60px', height: '60px' }}
            />
          ))}
        </div>

        {/* Gold Stars */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-3xl pointer-events-none opacity-40"
            style={{
              left: `${20 + i * 20}%`,
              bottom: '10%',
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ⭐
          </motion.div>
        ))}

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg"
              animate={{ 
                rotate: [-5, 5, -5, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Bell className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                📅 Future Anniversary Date
              </CardTitle>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Remember this special day
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          <div className="space-y-2">
            <Label htmlFor="deliveryDate" className="text-orange-900 dark:text-orange-100 font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Anniversary Date
              {yearsFromNow > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-2 px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-600 text-white text-xs font-bold rounded-full shadow-lg"
                >
                  {yearsFromNow} {yearsFromNow === 1 ? 'year' : 'years'} anniversary 🎉
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
              className="border-2 border-orange-300 dark:border-orange-700 focus:border-orange-500 dark:focus:border-orange-500 bg-white/80 dark:bg-orange-950/50 text-orange-900 dark:text-orange-100 shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryTime" className="text-orange-900 dark:text-orange-100 font-bold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              🔔 Bell Time
            </Label>
            <Input
              id="deliveryTime"
              type="time"
              value={deliveryTime}
              onChange={(e) => onTimeChange(e.target.value)}
              className="border-2 border-yellow-300 dark:border-yellow-700 focus:border-yellow-500 dark:focus:border-yellow-500 bg-white/80 dark:bg-yellow-950/50 text-orange-900 dark:text-orange-100 shadow-inner"
            />
            <p className="text-xs text-orange-600 dark:text-orange-400 flex items-center gap-1">
              📓 When to revisit this memory
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recipient Selection - Share Memory */}
      <Card className="border-4 border-orange-400 dark:border-orange-700 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 dark:from-yellow-950 dark:via-orange-950 dark:to-amber-950 shadow-2xl relative overflow-hidden">
        {/* Notebook Paper Lines */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ 
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(249, 115, 22, 0.3) 31px, rgba(249, 115, 22, 0.3) 32px)',
          }}
        />
        
        {/* Red margin line */}
        <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-red-400 opacity-40 pointer-events-none" />

        {/* Floating School Items */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`item-${i}`}
              className="absolute text-4xl opacity-20"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {['📚', '✏️', '📐', '🎨', '📝', '🔔', '⭐', '🎒'][i]}
            </motion.div>
          ))}
        </div>

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Users className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                Who should receive this?
              </CardTitle>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Personal keepsake or shared memory
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
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
                  ? 'border-orange-500 bg-gradient-to-br from-orange-200 to-yellow-300 dark:from-orange-800 dark:to-yellow-700 shadow-xl ring-4 ring-orange-300 dark:ring-orange-700'
                  : 'border-orange-300 dark:border-orange-700 bg-white/50 dark:bg-orange-950/30 hover:border-orange-400 hover:shadow-lg'
                }
              `}
            >
              {/* Gold star decoration */}
              <div className="absolute -top-2 -right-2 text-3xl">⭐</div>
              
              <div className="text-center mb-3">
                <motion.div
                  className="text-5xl"
                  animate={recipientType === 'self' ? { 
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  📓
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-orange-900 dark:text-orange-100 mb-2">
                  Just Me
                </h3>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Personal journal
                </p>
              </div>
              {recipientType === 'self' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold">✓</span>
                </motion.div>
              )}
            </motion.button>

            {/* Share Memory */}
            <motion.button
              type="button"
              onClick={() => onRecipientTypeChange('others')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-6 rounded-xl border-3 transition-all duration-300
                ${recipientType === 'others'
                  ? 'border-yellow-500 bg-gradient-to-br from-yellow-200 to-amber-300 dark:from-yellow-800 dark:to-amber-700 shadow-xl ring-4 ring-yellow-300 dark:ring-yellow-700'
                  : 'border-orange-300 dark:border-orange-700 bg-white/50 dark:bg-orange-950/30 hover:border-orange-400 hover:shadow-lg'
                }
              `}
            >
              {/* Gold star decoration */}
              <div className="absolute -top-2 -right-2 text-3xl">⭐</div>
              
              <div className="text-center mb-3">
                <motion.div
                  className="text-5xl"
                  animate={recipientType === 'others' ? { 
                    scale: [1, 1.15, 1],
                    rotate: [0, 5, -5, 0],
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🎒
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-orange-900 dark:text-orange-100 mb-2">
                  Share Memory
                </h3>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Friends & family
                </p>
              </div>
              {recipientType === 'others' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg"
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
