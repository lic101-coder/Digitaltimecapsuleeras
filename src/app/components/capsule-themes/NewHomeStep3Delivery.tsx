/**
 * New Home (Moving In) Theme - Page 3: Delivery Settings
 * Visual: Housewarming invitation with keys jingling and welcome mat
 * Colors: Blue/slate/amber with home elements
 */

import { parseDateInputAsLocal } from "../../utils/time-validation";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Calendar, Clock, Users, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { MultiRecipientSelector } from '../MultiRecipientSelector';

interface Recipient {
  id: string;
  type: 'email' | 'phone';
  value: string;
  name?: string;
}

interface NewHomeStep3DeliveryProps {
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

export function NewHomeStep3Delivery({
  deliveryDate,
  deliveryTime,
  onDateChange,
  onTimeChange,
  minDate,
  recipientType,
  onRecipientTypeChange,
  recipients,
  onRecipientsChange,
}: NewHomeStep3DeliveryProps) {
  const yearsFromNow = deliveryDate 
    ? Math.floor((deliveryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    : 0;

  return (
    <>
      {/* Housewarming Invitation Card - Date & Time */}
      <Card className="border-4 border-blue-400 dark:border-blue-700 bg-gradient-to-br from-blue-50 via-slate-50 to-amber-50 dark:from-blue-950 dark:via-slate-950 dark:to-amber-900 shadow-2xl relative overflow-hidden">
        {/* Blueprint Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, .1) 25%, rgba(59, 130, 246, .1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .1) 75%, rgba(59, 130, 246, .1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, .1) 25%, rgba(59, 130, 246, .1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .1) 75%, rgba(59, 130, 246, .1) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }} />

        {/* Keys Jingling Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div key={`key-${i}`} className="absolute text-3xl" style={{ left: `${10 + i * 12}%`, top: `${15 + (i % 3) * 25}%` }} animate={{ rotate: [0, 15, -15, 0], y: [0, -5, 0], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}>
              🗝️
            </motion.div>
          ))}
        </div>

        {/* Welcome Mat Unfurling */}
        <motion.div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-20 bg-gradient-to-br from-red-800 to-red-900 border-2 border-amber-600 rounded flex items-center justify-center shadow-lg" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}>
          <div className="text-sm text-amber-200 font-bold">WELCOME</div>
        </motion.div>

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <motion.div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-slate-400 flex items-center justify-center shadow-lg" animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
              <Home className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 via-slate-600 to-amber-600 bg-clip-text text-transparent">
                🏠 Home Anniversary Date
              </CardTitle>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                When should memories arrive?
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          <div className="space-y-2">
            <Label htmlFor="deliveryDate" className="text-blue-900 dark:text-blue-100 font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Home Anniversary Date
              {yearsFromNow > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-amber-500 text-white text-xs font-bold rounded-full shadow-lg">
                  {yearsFromNow} {yearsFromNow === 1 ? 'year' : 'years'} in your home! 🏡
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
              className="border-2 border-blue-300 dark:border-blue-700 focus:border-blue-500 dark:focus:border-blue-500 bg-white/80 dark:bg-blue-950/50 text-blue-900 dark:text-blue-100 shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryTime" className="text-blue-900 dark:text-blue-100 font-bold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              🔑 Welcome Time
            </Label>
            <Input
              id="deliveryTime"
              type="time"
              value={deliveryTime}
              onChange={(e) => onTimeChange(e.target.value)}
              className="border-2 border-slate-300 dark:border-slate-700 focus:border-slate-500 dark:focus:border-slate-500 bg-white/80 dark:bg-slate-950/50 text-blue-900 dark:text-blue-100 shadow-inner"
            />
            <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
              🏠 The perfect moment to celebrate home
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recipient Selection - Housewarming Invitation */}
      <Card className="border-4 border-blue-400 dark:border-blue-700 bg-gradient-to-br from-blue-50 via-slate-50 to-amber-50 dark:from-blue-950 dark:via-slate-950 dark:to-amber-900 shadow-2xl relative overflow-hidden">
        {/* Blueprint Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, .1) 25%, rgba(59, 130, 246, .1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .1) 75%, rgba(59, 130, 246, .1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, .1) 25%, rgba(59, 130, 246, .1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .1) 75%, rgba(59, 130, 246, .1) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }} />

        {/* Floating Houses */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div key={`house-${i}`} className="absolute text-4xl" style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 2) * 40}%` }} animate={{ y: [0, -10, 0], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}>
              🏡
            </motion.div>
          ))}
        </div>

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <motion.div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-400 to-blue-400 flex items-center justify-center shadow-lg" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Users className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 via-slate-600 to-amber-600 bg-clip-text text-transparent">
                Who's invited to the celebration?
              </CardTitle>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Private memory or shared housewarming
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Just Me */}
            <motion.button type="button" onClick={() => onRecipientTypeChange('self')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`relative p-6 rounded-xl border-3 transition-all duration-300 ${recipientType === 'self' ? 'border-blue-500 bg-gradient-to-br from-blue-200 to-slate-200 dark:from-blue-800 dark:to-slate-800 shadow-xl ring-4 ring-blue-300 dark:ring-blue-700' : 'border-blue-300 dark:border-blue-700 bg-white/50 dark:bg-blue-950/30 hover:border-blue-400 hover:shadow-lg'}`}>
              <div className="text-center mb-3">
                <motion.div className="text-5xl" animate={recipientType === 'self' ? { rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] } : {}} transition={{ duration: 2, repeat: Infinity }}>
                  🔑
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100 mb-2">Just Me</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">Private memory</p>
              </div>
              {recipientType === 'self' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">✓</span>
                </motion.div>
              )}
            </motion.button>

            {/* Share the Joy */}
            <motion.button type="button" onClick={() => onRecipientTypeChange('others')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`relative p-6 rounded-xl border-3 transition-all duration-300 ${recipientType === 'others' ? 'border-amber-500 bg-gradient-to-br from-amber-200 to-yellow-200 dark:from-amber-800 dark:to-yellow-800 shadow-xl ring-4 ring-amber-300 dark:ring-amber-700' : 'border-blue-300 dark:border-blue-700 bg-white/50 dark:bg-blue-950/30 hover:border-blue-400 hover:shadow-lg'}`}>
              <div className="text-center mb-3">
                <motion.div className="text-5xl" animate={recipientType === 'others' ? { scale: [1, 1.15, 1] } : {}} transition={{ duration: 1.5, repeat: Infinity }}>
                  🏠
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100 mb-2">Share the Joy</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">Housewarming party</p>
              </div>
              {recipientType === 'others' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">✓</span>
                </motion.div>
              )}
            </motion.button>
          </div>

          {/* Multi-Recipient Selector - CRITICAL: Must render with exact props */}
          {recipientType === 'others' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
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
