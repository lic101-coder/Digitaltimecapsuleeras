/**
 * Pet (Beloved Companion) Theme - Page 3: Delivery Settings
 * Visual: Pet memorial card with rainbow bridge and paw prints
 * Colors: Warm amber/orange with gentle rainbow accents
 */

import { parseDateInputAsLocal } from "../../utils/time-validation";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Calendar, Clock, Heart, Users, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { MultiRecipientSelector } from '../MultiRecipientSelector';

interface Recipient {
  id: string;
  type: 'email' | 'phone';
  value: string;
  name?: string;
}

interface PetStep3DeliveryProps {
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

export function PetStep3Delivery({
  deliveryDate,
  deliveryTime,
  onDateChange,
  onTimeChange,
  minDate,
  recipientType,
  onRecipientTypeChange,
  recipients,
  onRecipientsChange,
}: PetStep3DeliveryProps) {
  return (
    <>
      {/* Pet Memorial Card - Date & Time */}
      <Card className="border-2 border-amber-300 dark:border-amber-700 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-amber-950 dark:via-orange-950 dark:to-amber-900 shadow-xl relative overflow-hidden">
        {/* Decorative Background - Paw prints walking */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <motion.div
            className="absolute text-4xl"
            style={{ top: '10%', left: '5%' }}
            animate={{ 
              x: [0, 10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🐾
          </motion.div>
          <motion.div
            className="absolute text-4xl"
            style={{ top: '30%', left: '15%' }}
            animate={{ 
              x: [0, 10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
          >
            🐾
          </motion.div>
          <motion.div
            className="absolute text-4xl"
            style={{ top: '50%', left: '25%' }}
            animate={{ 
              x: [0, 10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
          >
            🐾
          </motion.div>
          <motion.div
            className="absolute text-4xl"
            style={{ top: '70%', left: '35%' }}
            animate={{ 
              x: [0, 10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.9 }}
          >
            🐾
          </motion.div>
        </div>

        {/* Rainbow Bridge Header */}
        <CardHeader className="border-b border-amber-200 dark:border-amber-800 relative">
          <div className="flex items-center gap-3">
            {/* Animated Heart */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-10 h-10 flex items-center justify-center"
            >
              <Heart className="w-8 h-8 text-rose-500 dark:text-rose-400" fill="currentColor" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold text-amber-900 dark:text-amber-100">
                🌈 Rainbow Bridge Moment
              </CardTitle>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                Choose when to remember your beloved companion
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Date Picker */}
            <div className="space-y-2">
              <Label htmlFor="pet-delivery-date" className="text-amber-900 dark:text-amber-100 font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                🌈 Remember On
              </Label>
              <div className="relative">
                <Input
                  id="pet-delivery-date"
                  type="date"
                  value={deliveryDate ? deliveryDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => onDateChange(e.target.value ? parseDateInputAsLocal(e.target.value) : undefined)}
                  min={minDate.toISOString().split('T')[0]}
                  className="bg-white dark:bg-amber-950 border-2 border-amber-300 dark:border-amber-700 focus:border-amber-500 focus:ring-amber-500 text-amber-900 dark:text-amber-100"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xl">
                  💝
                </div>
              </div>
            </div>

            {/* Time Picker */}
            <div className="space-y-2">
              <Label htmlFor="pet-delivery-time" className="text-amber-900 dark:text-amber-100 font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                ⏰ Special Time
              </Label>
              <div className="relative">
                <Input
                  id="pet-delivery-time"
                  type="time"
                  value={deliveryTime}
                  onChange={(e) => onTimeChange(e.target.value)}
                  className="bg-white dark:bg-amber-950 border-2 border-amber-300 dark:border-amber-700 focus:border-amber-500 focus:ring-amber-500 text-amber-900 dark:text-amber-100"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xl">
                  🕰️
                </div>
              </div>
            </div>
          </div>

          {/* Decorative rainbow bridge */}
          <div className="flex justify-center py-2">
            <motion.div
              animate={{ 
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-4xl"
            >
              🌈
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Recipient Selection Card - Pet Theme */}
      <Card className="border-2 border-amber-300 dark:border-amber-700 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-amber-950 dark:via-orange-950 dark:to-amber-900 shadow-xl relative overflow-hidden">
        {/* Collar bell decoration */}
        <div className="absolute top-4 right-4 opacity-10 text-6xl pointer-events-none">
          🔔
        </div>

        <CardHeader className="border-b border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-rose-500 dark:text-rose-400" fill="currentColor" />
            <div>
              <CardTitle className="text-xl font-bold text-amber-900 dark:text-amber-100">
                💕 Share the Love
              </CardTitle>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                Who will receive this precious memory?
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6 relative z-10">
          {/* Recipient Type Selection */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Just Me Option */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                onClick={() => onRecipientTypeChange(recipientType === 'self' ? null : 'self')}
                className={`cursor-pointer transition-all border-2 hover:shadow-lg ${
                  recipientType === 'self'
                    ? 'border-amber-500 bg-amber-100 dark:bg-amber-900 ring-2 ring-amber-500'
                    : 'border-amber-200 dark:border-amber-800 bg-white dark:bg-amber-950/50 hover:border-amber-400'
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center gap-3">
                    {/* Collar bell icon */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      recipientType === 'self'
                        ? 'bg-amber-500 dark:bg-amber-600'
                        : 'bg-amber-300 dark:bg-amber-800'
                    }`}>
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-amber-900 dark:text-amber-100">
                        Just Me 🐾
                      </p>
                      <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                        Keep this memory private
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Share Love Option */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                onClick={() => onRecipientTypeChange(recipientType === 'others' ? null : 'others')}
                className={`cursor-pointer transition-all border-2 hover:shadow-lg ${
                  recipientType === 'others'
                    ? 'border-rose-500 bg-rose-50 dark:bg-rose-950 ring-2 ring-rose-500'
                    : 'border-amber-200 dark:border-amber-800 bg-white dark:bg-amber-950/50 hover:border-amber-400'
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center gap-3">
                    {/* Collar bell with heart */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      recipientType === 'others'
                        ? 'bg-rose-500 dark:bg-rose-600'
                        : 'bg-amber-300 dark:bg-amber-800'
                    }`}>
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-amber-900 dark:text-amber-100">
                        Share Love 💝
                      </p>
                      <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                        Send to friends & family
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Multi-Recipient Selector - CRITICAL: Must render when recipientType === 'others' */}
          {recipientType === 'others' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t-2 border-amber-200 dark:border-amber-800 pt-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="text-2xl">💌</div>
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100">
                  Add Recipients
                </h3>
              </div>
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
