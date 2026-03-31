/**
 * Birthday (Party) Theme - Page 3: Delivery Settings
 * Visual: Party invitation theme with confetti rain and balloon decorations
 * Colors: Colorful party aesthetic with festive elements
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Calendar, Clock, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { MultiRecipientSelector } from '../MultiRecipientSelector';

interface Recipient {
  id: string;
  type: 'email' | 'phone';
  value: string;
  name?: string;
}

interface BirthdayStep3DeliveryProps {
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

export function BirthdayStep3Delivery({
  deliveryDate,
  deliveryTime,
  onDateChange,
  onTimeChange,
  minDate,
  recipientType,
  onRecipientTypeChange,
  recipients,
  onRecipientsChange,
}: BirthdayStep3DeliveryProps) {
  // Calculate years from now
  const yearsFromNow = deliveryDate 
    ? Math.floor((deliveryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    : 0;

  return (
    <>
      {/* Party Invitation Card - Date & Time */}
      <Card className="border-4 border-red-400 dark:border-red-700 bg-gradient-to-br from-red-50 via-yellow-50 to-blue-50 dark:from-red-950 dark:via-yellow-950 dark:to-blue-900 shadow-2xl relative overflow-hidden">
        {/* Gift Wrapping Pattern Background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #fbbf24 20%, transparent 20%), radial-gradient(circle, #ef4444 20%, transparent 20%)',
            backgroundPosition: '0 0, 20px 20px',
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Confetti Rain Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-5%',
              }}
              animate={{
                y: ['0vh', '105vh'],
                x: [0, (Math.random() - 0.5) * 100],
                rotate: [0, Math.random() * 720],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'linear',
              }}
            >
              {['🎊', '🎉', '🎈', '✨', '⭐'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>

        {/* Floating Balloons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`balloon-${i}`}
              className="absolute text-4xl"
              style={{
                left: `${10 + i * 12}%`,
                bottom: '-10%',
              }}
              animate={{
                y: [0, -window.innerHeight * 0.3, -window.innerHeight * 0.5],
                x: [0, Math.sin(i * 2) * 30],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            >
              🎈
            </motion.div>
          ))}
        </div>

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-yellow-400 flex items-center justify-center shadow-lg"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Calendar className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-red-600 via-yellow-600 to-blue-600 bg-clip-text text-transparent">
                🎈 Party Date
              </CardTitle>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                When should the celebration begin?
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          {/* Delivery Date with Balloon Bouquet */}
          <div className="space-y-2">
            <Label htmlFor="deliveryDate" className="text-gray-900 dark:text-gray-100 font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Birthday Date
              {yearsFromNow > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-2 px-3 py-1 bg-gradient-to-r from-red-500 to-yellow-500 text-white text-xs font-bold rounded-full shadow-lg"
                >
                  {yearsFromNow} {yearsFromNow === 1 ? 'year' : 'years'} party! 🎂
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
              className="border-2 border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500 bg-white/80 dark:bg-red-950/50 text-gray-900 dark:text-gray-100 shadow-inner"
            />
          </div>

          {/* Delivery Time */}
          <div className="space-y-2">
            <Label htmlFor="deliveryTime" className="text-gray-900 dark:text-gray-100 font-bold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              ⏰ Celebration Time
            </Label>
            <Input
              id="deliveryTime"
              type="time"
              value={deliveryTime}
              onChange={(e) => onTimeChange(e.target.value)}
              className="border-2 border-yellow-300 dark:border-yellow-700 focus:border-yellow-500 dark:focus:border-yellow-500 bg-white/80 dark:bg-yellow-950/50 text-gray-900 dark:text-gray-100 shadow-inner"
            />
            <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
              🎊 The perfect moment to surprise!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recipient Selection - Party Invitation Style */}
      <Card className="border-4 border-blue-400 dark:border-blue-700 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-900 shadow-2xl relative overflow-hidden">
        {/* Party Streamers Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-full w-8"
              style={{
                left: `${i * 17}%`,
                background: `linear-gradient(135deg, ${['#ef4444', '#fbbf24', '#3b82f6', '#8b5cf6', '#ec4899'][i % 5]} 0%, transparent 100%)`,
                transform: 'skewX(-20deg)',
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Spinning Confetti */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              {['🎊', '🎉', '✨'][Math.floor(Math.random() * 3)]}
            </motion.div>
          ))}
        </div>

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Users className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                Who's invited to the party?
              </CardTitle>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Celebrate alone or with friends
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
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
                  ? 'border-red-500 bg-gradient-to-br from-red-200 to-yellow-200 dark:from-red-800 dark:to-yellow-800 shadow-xl ring-4 ring-red-300 dark:ring-red-700'
                  : 'border-red-300 dark:border-red-700 bg-white/50 dark:bg-red-950/30 hover:border-red-400 hover:shadow-lg'
                }
              `}
            >
              {/* Birthday Cake */}
              <div className="text-center mb-3">
                <motion.div
                  className="text-5xl"
                  animate={recipientType === 'self' ? { rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🎂
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  Just for Me
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Personal birthday surprise
                </p>
              </div>
              {recipientType === 'self' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold">✓</span>
                </motion.div>
              )}
            </motion.button>

            {/* Invite Friends */}
            <motion.button
              type="button"
              onClick={() => onRecipientTypeChange('others')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-6 rounded-xl border-3 transition-all duration-300
                ${recipientType === 'others'
                  ? 'border-blue-500 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 shadow-xl ring-4 ring-blue-300 dark:ring-blue-700'
                  : 'border-blue-300 dark:border-blue-700 bg-white/50 dark:bg-blue-950/30 hover:border-blue-400 hover:shadow-lg'
                }
              `}
            >
              {/* Party Hat */}
              <div className="text-center mb-3">
                <motion.div
                  className="text-5xl"
                  animate={recipientType === 'others' ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🎉
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  Invite Friends
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Share the celebration
                </p>
              </div>
              {recipientType === 'others' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
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
