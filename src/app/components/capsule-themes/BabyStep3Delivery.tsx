import { parseDateInputAsLocal } from "../../utils/time-validation";
import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Users, Mail, Calendar as CalendarIcon } from 'lucide-react';
import { MultiRecipientSelector } from '../MultiRecipientSelector';

interface BabyStep3DeliveryProps {
  deliveryDate?: Date;
  deliveryTime: string;
  minDate: Date;
  recipientType: 'self' | 'others' | null;
  recipients: any[];
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
  onRecipientTypeChange: (type: 'self' | 'others' | null) => void;
  onRecipientsChange: (recipients: any[]) => void;
}

export function BabyStep3Delivery({
  deliveryDate,
  deliveryTime,
  minDate,
  recipientType,
  recipients,
  onDateChange,
  onTimeChange,
  onRecipientTypeChange,
  onRecipientsChange,
}: BabyStep3DeliveryProps) {
  return (
    <div className="space-y-6">
      {/* Delivery Card - Baby Announcement Theme */}
      <Card className="border-2 border-purple-300/40 bg-gradient-to-br from-purple-50/10 via-pink-50/10 to-blue-50/10 shadow-xl relative overflow-hidden">
        {/* Floating Stars Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-300/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 8 + 6}px`,
              }}
              animate={{
                opacity: [0.1, 0.4, 0.1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              ⭐
            </motion.div>
          ))}
        </div>

        {/* Soft Glow Effect */}
        <motion.div
          className="absolute inset-0 opacity-20 pointer-events-none"
          animate={{
            background: [
              'radial-gradient(circle at 30% 20%, rgba(219, 39, 119, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 20%, rgba(219, 39, 119, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <CardHeader className="border-b border-purple-300/20 bg-gradient-to-r from-purple-100/20 to-pink-100/20 relative z-10">
          <CardTitle className="flex items-center gap-3 text-white">
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl"
            >
              👶
            </motion.div>
            <div className="flex-1">
              <div className="font-handwriting text-purple-300 text-2xl">
                When Should This Arrive?
              </div>
              <div className="text-xs text-purple-300/60 font-handwriting mt-1">
                Pick a special date in the future
              </div>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6 space-y-5 relative z-10">
          {/* Date & Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-purple-300 font-handwriting text-base flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Delivery Date
              </Label>
              <Input
                type="date"
                value={deliveryDate ? deliveryDate.toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  const newDate = e.target.value ? parseDateInputAsLocal(e.target.value) : undefined;
                  onDateChange(newDate);
                }}
                min={minDate.toISOString().split('T')[0]}
                className="h-12 bg-purple-900/20 border-2 border-purple-300/40 text-purple-200 font-handwriting text-base focus:ring-purple-400 focus:border-purple-400"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-purple-300 font-handwriting text-base flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🕐
                </motion.div>
                Delivery Time
              </Label>
              <div className="relative">
                <Input
                  type="time"
                  value={deliveryTime}
                  onChange={(e) => onTimeChange(e.target.value)}
                  className="h-12 bg-purple-900/20 border-2 border-purple-300/40 text-purple-200 font-handwriting text-base text-center focus:ring-purple-400 focus:border-purple-400"
                />
                <motion.div
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-pink-400 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </div>
          </div>

          {/* Helper Text with Stork */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-purple-500/10 border border-purple-300/30 relative overflow-hidden"
          >
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl opacity-30">
              🦢
            </div>
            <p className="text-xs text-purple-200/80 font-handwriting">
              💝 <strong>Special Delivery:</strong> Schedule this precious memory capsule to arrive at a future milestone
            </p>
          </motion.div>
        </CardContent>
      </Card>

      {/* Recipients Card - Baby Announcement Theme */}
      <Card className="border-2 border-purple-300/40 bg-gradient-to-br from-purple-50/10 via-pink-50/10 to-blue-50/10 shadow-xl relative overflow-hidden">
        {/* Floating Hearts Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 12 + 10}px`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              💕
            </motion.div>
          ))}
        </div>

        <CardHeader className="border-b border-purple-300/20 bg-gradient-to-r from-purple-100/20 to-pink-100/20 relative z-10">
          <CardTitle className="flex items-center gap-3 text-white">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl"
            >
              💌
            </motion.div>
            <div className="flex-1">
              <div className="font-handwriting text-purple-300 text-2xl">
                Who Should Receive This?
              </div>
              <div className="text-xs text-purple-300/60 font-handwriting mt-1">
                Share the love with family or keep it personal
              </div>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6 space-y-4 relative z-10">
          {/* Recipient Type Selection - Both Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {/* Button 1: JUST ME (self) */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all ${
                  recipientType === 'self'
                    ? 'ring-4 ring-purple-400/60 shadow-2xl shadow-purple-500/30 bg-purple-500/20 border-purple-400/70'
                    : 'hover:shadow-lg bg-purple-500/5 border-purple-300/20 hover:border-purple-300/40'
                }`}
                onClick={() => onRecipientTypeChange(recipientType === 'self' ? null : 'self')}
              >
                <CardContent className="p-6 text-center relative overflow-hidden">
                  {/* Decorative elements */}
                  {recipientType === 'self' && (
                    <>
                      <motion.div
                        className="absolute top-2 right-2 text-2xl"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        ⭐
                      </motion.div>
                      <motion.div
                        className="absolute bottom-2 left-2 text-xl"
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      >
                        💫
                      </motion.div>
                    </>
                  )}

                  <motion.div
                    animate={recipientType === 'self' ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1, repeat: recipientType === 'self' ? Infinity : 0 }}
                  >
                    <Users className="h-12 w-12 mx-auto mb-3 text-purple-300" />
                  </motion.div>
                  <p className="font-handwriting text-xl mb-1 text-purple-200">
                    Just Me
                  </p>
                  <p className="text-sm text-purple-300/60 font-handwriting">
                    Personal treasure 💝
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Button 2: SHARE IT (others) */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all ${
                  recipientType === 'others'
                    ? 'ring-4 ring-pink-400/60 shadow-2xl shadow-pink-500/30 bg-pink-500/20 border-pink-400/70'
                    : 'hover:shadow-lg bg-pink-500/5 border-pink-300/20 hover:border-pink-300/40'
                }`}
                onClick={() => onRecipientTypeChange(recipientType === 'others' ? null : 'others')}
              >
                <CardContent className="p-6 text-center relative overflow-hidden">
                  {/* Decorative elements */}
                  {recipientType === 'others' && (
                    <>
                      <motion.div
                        className="absolute top-2 left-2 text-2xl"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        💕
                      </motion.div>
                      <motion.div
                        className="absolute bottom-2 right-2 text-xl"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
                      >
                        💖
                      </motion.div>
                    </>
                  )}

                  <motion.div
                    animate={recipientType === 'others' ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1, repeat: recipientType === 'others' ? Infinity : 0 }}
                  >
                    <Mail className="h-12 w-12 mx-auto mb-3 text-pink-300" />
                  </motion.div>
                  <p className="font-handwriting text-xl mb-1 text-pink-200">
                    Share It
                  </p>
                  <p className="text-sm text-pink-300/60 font-handwriting">
                    Spread the love 💌
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recipients List - Shows when 'others' selected */}
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
    </div>
  );
}