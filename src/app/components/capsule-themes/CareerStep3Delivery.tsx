/**
 * Career (Professional Milestone) Theme - Page 3: Delivery Settings
 * Visual: Corporate meeting invitation with success meter
 * Colors: Blue/gray professional theme
 */

import { parseDateInputAsLocal } from "../../utils/time-validation";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Calendar, Clock, Users, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';
import { MultiRecipientSelector } from '../MultiRecipientSelector';

interface Recipient {
  id: string;
  type: 'email' | 'phone';
  value: string;
  name?: string;
}

interface CareerStep3DeliveryProps {
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

export function CareerStep3Delivery({
  deliveryDate,
  deliveryTime,
  onDateChange,
  onTimeChange,
  minDate,
  recipientType,
  onRecipientTypeChange,
  recipients,
  onRecipientsChange,
}: CareerStep3DeliveryProps) {
  const yearsFromNow = deliveryDate 
    ? Math.floor((deliveryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    : 0;

  return (
    <>
      {/* Corporate Meeting Invitation - Date & Time */}
      <Card className="border-2 border-blue-400/50 dark:border-blue-700/50 bg-gradient-to-br from-slate-100 via-blue-50 to-gray-100 dark:from-slate-950 dark:via-blue-950 dark:to-gray-950 shadow-2xl relative overflow-hidden">
        {/* HUD Grid Background */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ 
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, .15) 25%, rgba(59, 130, 246, .15) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .15) 75%, rgba(59, 130, 246, .15) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, .15) 25%, rgba(59, 130, 246, .15) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .15) 75%, rgba(59, 130, 246, .15) 76%, transparent 77%, transparent)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Success Meter Visualization */}
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-slate-900/80 dark:bg-slate-800/80 rounded-lg p-2 backdrop-blur-sm">
            <div className="text-xs font-mono text-blue-400 mb-1">SUCCESS METER</div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-8 bg-gradient-to-t from-blue-600 to-blue-400 rounded"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{ transformOrigin: 'bottom' }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Corporate Skyline */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none opacity-10">
          <div className="flex items-end justify-around h-full">
            {[40, 60, 50, 70, 45, 65, 55].map((height, i) => (
              <motion.div
                key={i}
                className="bg-blue-600 dark:bg-blue-700"
                style={{ width: '12%', height: `${height}%` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              />
            ))}
          </div>
        </div>

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-slate-600 flex items-center justify-center shadow-lg"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.3)',
                  '0 0 30px rgba(59, 130, 246, 0.5)',
                  '0 0 20px rgba(59, 130, 246, 0.3)',
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Briefcase className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 via-slate-600 to-gray-700 bg-clip-text text-transparent">
                🎯 Career Anniversary Date
              </CardTitle>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Schedule professional milestone
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          <div className="space-y-2">
            <Label htmlFor="deliveryDate" className="text-blue-900 dark:text-blue-100 font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Anniversary Date
              {yearsFromNow > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-slate-600 text-white text-xs font-bold rounded shadow-lg"
                >
                  {yearsFromNow} {yearsFromNow === 1 ? 'year' : 'years'} of success 🏆
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
              className="border-2 border-blue-300 dark:border-blue-700 focus:border-blue-500 dark:focus:border-blue-500 bg-white/80 dark:bg-blue-950/50 text-blue-900 dark:text-blue-100 shadow-inner font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryTime" className="text-blue-900 dark:text-blue-100 font-bold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              🕐 Business Hour
            </Label>
            <Input
              id="deliveryTime"
              type="time"
              value={deliveryTime}
              onChange={(e) => onTimeChange(e.target.value)}
              className="border-2 border-slate-300 dark:border-slate-700 focus:border-slate-500 dark:focus:border-slate-500 bg-white/80 dark:bg-slate-950/50 text-blue-900 dark:text-blue-100 shadow-inner font-mono"
            />
            <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
              💼 Professional milestone delivery time
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recipient Selection - Corporate Meeting */}
      <Card className="border-2 border-blue-400/50 dark:border-blue-700/50 bg-gradient-to-br from-slate-100 via-blue-50 to-gray-100 dark:from-slate-950 dark:via-blue-950 dark:to-gray-950 shadow-2xl relative overflow-hidden">
        {/* HUD Grid Background */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ 
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, .15) 25%, rgba(59, 130, 246, .15) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .15) 75%, rgba(59, 130, 246, .15) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, .15) 25%, rgba(59, 130, 246, .15) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .15) 75%, rgba(59, 130, 246, .15) 76%, transparent 77%, transparent)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Floating Business Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`icon-${i}`}
              className="absolute text-4xl opacity-20"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {['💼', '📊', '🎯', '📈', '🏆', '⭐'][i]}
            </motion.div>
          ))}
        </div>

        {/* City Skyline Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none opacity-10">
          <div className="flex items-end justify-around h-full">
            {[45, 65, 55, 75, 50, 70, 60].map((height, i) => (
              <div
                key={i}
                className="bg-slate-600 dark:bg-slate-700"
                style={{ width: '12%', height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-500 to-gray-600 flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Users className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 via-slate-600 to-gray-700 bg-clip-text text-transparent">
                Who should celebrate this milestone?
              </CardTitle>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Private archive or shared success
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Personal Archive */}
            <motion.button
              type="button"
              onClick={() => onRecipientTypeChange('self')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-6 rounded-xl border-2 transition-all duration-300
                ${recipientType === 'self'
                  ? 'border-blue-500 bg-gradient-to-br from-blue-200 to-slate-200 dark:from-blue-800 dark:to-slate-800 shadow-xl ring-4 ring-blue-300 dark:ring-blue-700'
                  : 'border-blue-300 dark:border-blue-700 bg-white/50 dark:bg-blue-950/30 hover:border-blue-400 hover:shadow-lg'
                }
              `}
              style={{ backdropFilter: 'blur(10px)' }}
            >
              <div className="text-center mb-3">
                <motion.div
                  className="text-5xl"
                  animate={recipientType === 'self' ? { 
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  📁
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100 mb-2">
                  Personal Archive
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Private milestone
                </p>
              </div>
              {recipientType === 'self' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold">✓</span>
                </motion.div>
              )}
            </motion.button>

            {/* Share Success */}
            <motion.button
              type="button"
              onClick={() => onRecipientTypeChange('others')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-6 rounded-xl border-2 transition-all duration-300
                ${recipientType === 'others'
                  ? 'border-slate-500 bg-gradient-to-br from-slate-200 to-gray-200 dark:from-slate-800 dark:to-gray-800 shadow-xl ring-4 ring-slate-300 dark:ring-slate-700'
                  : 'border-blue-300 dark:border-blue-700 bg-white/50 dark:bg-blue-950/30 hover:border-blue-400 hover:shadow-lg'
                }
              `}
              style={{ backdropFilter: 'blur(10px)' }}
            >
              <div className="text-center mb-3">
                <motion.div
                  className="text-5xl"
                  animate={recipientType === 'others' ? { 
                    scale: [1, 1.15, 1],
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🏆
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100 mb-2">
                  Share Success
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Celebrate together
                </p>
              </div>
              {recipientType === 'others' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-slate-500 rounded-lg flex items-center justify-center shadow-lg"
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
