import { parseDateInputAsLocal } from "../../utils/time-validation";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Calendar, Clock, Music, Radio, Users, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { MultiRecipientSelector } from '../MultiRecipientSelector';

interface Recipient {
  id: string;
  type: 'email' | 'phone';
  value: string;
  name?: string;
}

interface MixtapeStep3DeliveryProps {
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

export function MixtapeStep3Delivery({
  deliveryDate,
  deliveryTime,
  onDateChange,
  onTimeChange,
  minDate,
  recipientType,
  onRecipientTypeChange,
  recipients,
  onRecipientsChange,
}: MixtapeStep3DeliveryProps) {
  return (
    <>
      {/* Broadcast Time Card */}
      <Card className="border-2 border-teal-500/30 bg-gradient-to-br from-slate-900 via-teal-950/20 to-slate-900 shadow-xl relative overflow-hidden">
        {/* Retro scan lines effect */}
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #2dd4bf 2px, #2dd4bf 3px)',
        }} />

        <CardHeader className="border-b border-teal-500/20 bg-teal-950/20">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Radio className="w-6 h-6 text-teal-400" />
            </motion.div>
            <div>
              <CardTitle className="text-teal-400 font-mono text-xl">BROADCAST TIME</CardTitle>
              <p className="text-xs text-teal-300/60 font-mono mt-0.5">When should this mix drop?</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Radio Station Card */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg p-6 border-2 border-amber-300/50 shadow-lg"
          >
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Music className="w-5 h-5 text-slate-800" />
                <p className="text-lg font-bold text-slate-800 font-handwriting">FM 📻 MEMORIES</p>
              </div>
              <p className="text-xs text-slate-600 font-handwriting">
                Your friendship mixtape station
              </p>
            </div>

            {/* Radio Dial Visualization */}
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32 rounded-full bg-slate-800 border-4 border-slate-700 shadow-inner flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-1 h-12 bg-teal-500 rounded-full"
                  style={{ transformOrigin: '50% 50%' }}
                />
                <div className="w-6 h-6 rounded-full bg-teal-500 z-10 shadow-lg" />
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-slate-600 font-mono">
                🎵 NOW TUNING: {deliveryDate ? deliveryDate.toISOString().split('T')[0].replace(/-/g, '/') : '[ SELECT DATE ]'}
              </p>
            </div>
          </motion.div>

          {/* Date Input */}
          <div className="space-y-2">
            <Label htmlFor="delivery-date" className="text-base font-handwriting text-teal-300 text-lg flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              📅 Air Date:
            </Label>
            <Input
              id="delivery-date"
              type="date"
              value={deliveryDate ? deliveryDate.toISOString().split('T')[0] : ''}
              onChange={(e) => onDateChange(e.target.value ? parseDateInputAsLocal(e.target.value) : undefined)}
              min={minDate.toISOString().split('T')[0]}
              className="h-12 text-base text-white placeholder:text-white/40 bg-gradient-to-r from-amber-900/40 to-amber-800/40 border-teal-500/50 font-handwriting focus:ring-teal-500 focus:border-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]"
            />
          </div>

          {/* Time Input */}
          <div className="space-y-2">
            <Label htmlFor="delivery-time" className="text-base font-handwriting text-teal-300 text-lg flex items-center gap-2">
              <Clock className="w-4 h-4" />
              ⏰ Broadcast Time:
            </Label>
            <Input
              id="delivery-time"
              type="time"
              value={deliveryTime}
              onChange={(e) => onTimeChange(e.target.value)}
              className="h-12 text-base text-white placeholder:text-white/40 bg-gradient-to-r from-amber-900/40 to-amber-800/40 border-teal-500/50 font-handwriting focus:ring-teal-500 focus:border-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]"
            />
          </div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-teal-950/30 border border-teal-500/30 rounded-lg p-4"
          >
            <p className="text-sm text-teal-300 font-mono text-center">
              🎧 Your mixtape will be delivered on the selected date and time
            </p>
          </motion.div>
        </CardContent>
      </Card>

      {/* Recipients Card */}
      <Card className="border-2 border-amber-500/30 bg-gradient-to-br from-slate-900 via-amber-950/10 to-slate-900 shadow-xl relative overflow-hidden mt-6">
        {/* Cassette tape texture */}
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, #f59e0b 4px, #f59e0b 5px)',
        }} />

        <CardHeader className="border-b border-amber-500/20 bg-amber-950/20">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Users className="w-6 h-6 text-amber-400" />
            </motion.div>
            <div>
              <CardTitle className="text-amber-400 font-handwriting text-2xl">🎵 Share the Mix</CardTitle>
              <p className="text-xs text-amber-300/60 font-handwriting mt-0.5">Who gets to hear this tape?</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Recipient Type Selection */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all border-2 ${
                  recipientType === 'self' 
                    ? 'ring-2 ring-teal-500 shadow-lg bg-teal-500/10 border-teal-500/50' 
                    : 'hover:shadow-md bg-white/5 border-amber-500/20'
                }`}
                onClick={() => onRecipientTypeChange(recipientType === 'self' ? null : 'self')}
              >
                <CardContent className="p-6 text-center">
                  <Users className="h-10 w-10 mx-auto mb-3 text-teal-400" />
                  <p className="font-handwriting text-lg mb-1 text-white">Just Me</p>
                  <p className="text-sm text-white/60 font-handwriting">Solo listening session</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all border-2 ${
                  recipientType === 'others' 
                    ? 'ring-2 ring-teal-500 shadow-lg bg-teal-500/10 border-teal-500/50' 
                    : 'hover:shadow-md bg-white/5 border-amber-500/20'
                }`}
                onClick={() => onRecipientTypeChange(recipientType === 'others' ? null : 'others')}
              >
                <CardContent className="p-6 text-center">
                  <Mail className="h-10 w-10 mx-auto mb-3 text-amber-400" />
                  <p className="font-handwriting text-lg mb-1 text-white">Share It</p>
                  <p className="text-sm text-white/60 font-handwriting">Send to friends</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recipients List */}
          {recipientType === 'others' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
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