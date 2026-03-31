/**
 * Travel (Adventure) Theme - Page 3: Delivery Settings
 * Visual: Travel itinerary with boarding pass, flight path animation
 * Colors: Brown/orange/amber travel theme
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Calendar, Clock, Users, Plane } from 'lucide-react';
import { motion } from 'motion/react';
import { MultiRecipientSelector } from '../MultiRecipientSelector';

interface Recipient {
  id: string;
  type: 'email' | 'phone';
  value: string;
  name?: string;
}

interface TravelStep3DeliveryProps {
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

export function TravelStep3Delivery({
  deliveryDate,
  deliveryTime,
  onDateChange,
  onTimeChange,
  minDate,
  recipientType,
  onRecipientTypeChange,
  recipients,
  onRecipientsChange,
}: TravelStep3DeliveryProps) {
  const yearsFromNow = deliveryDate 
    ? Math.floor((deliveryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    : 0;

  return (
    <>
      {/* Travel Itinerary Card - Date & Time */}
      <Card className="border-4 border-amber-700 dark:border-amber-900 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-900 shadow-2xl relative overflow-hidden">
        {/* Leather Texture */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ 
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 69, 19, 0.1) 2px, rgba(139, 69, 19, 0.1) 4px)',
          }}
        />

        {/* Flight Path Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`path-${i}`}
              className="absolute"
              style={{
                left: '0%',
                top: `${25 + i * 25}%`,
                width: '100%',
                height: '2px',
              }}
            >
              {/* Dotted flight path */}
              <div className="w-full h-full border-t-2 border-dashed border-orange-400/30" />
              {/* Moving plane */}
              <motion.div
                className="absolute top-0 text-2xl"
                animate={{
                  x: ['0%', '100%'],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 2,
                }}
              >
                ✈️
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Suitcase Corners */}
        <div className="absolute top-4 left-4 w-6 h-6 bg-gradient-to-br from-yellow-600 to-yellow-800 border border-amber-900 z-20 rounded" />
        <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-yellow-600 to-yellow-800 border border-amber-900 z-20 rounded" />

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-700 flex items-center justify-center shadow-lg"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Plane className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-yellow-700 bg-clip-text text-transparent">
                🎫 Destination Date
              </CardTitle>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                When does your journey arrive?
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          <div className="space-y-2">
            <Label htmlFor="deliveryDate" className="text-amber-900 dark:text-amber-100 font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Arrival Date
              {yearsFromNow > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-2 px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-600 text-white text-xs font-bold rounded-full shadow-lg"
                >
                  {yearsFromNow} {yearsFromNow === 1 ? 'year' : 'years'} journey ✈️
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
              className="border-2 border-amber-400 dark:border-amber-700 focus:border-amber-600 dark:focus:border-amber-600 bg-white/80 dark:bg-amber-950/50 text-amber-900 dark:text-amber-100 shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryTime" className="text-amber-900 dark:text-amber-100 font-bold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              🕐 Departure Time
            </Label>
            <Input
              id="deliveryTime"
              type="time"
              value={deliveryTime}
              onChange={(e) => onTimeChange(e.target.value)}
              className="border-2 border-orange-400 dark:border-orange-700 focus:border-orange-600 dark:focus:border-orange-600 bg-white/80 dark:bg-orange-950/50 text-amber-900 dark:text-amber-100 shadow-inner"
            />
            <p className="text-xs text-amber-700 dark:text-amber-400 flex items-center gap-1">
              ✈️ Boarding time for your memory flight
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recipient Selection - Travel Buddies */}
      <Card className="border-4 border-amber-700 dark:border-amber-900 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-900 shadow-2xl relative overflow-hidden">
        {/* Leather Texture */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ 
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 69, 19, 0.1) 2px, rgba(139, 69, 19, 0.1) 4px)',
          }}
        />

        {/* Map Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(139, 69, 19, 0.3) 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        </div>

        {/* Floating Luggage */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`luggage-${i}`}
              className="absolute text-4xl"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              🧳
            </motion.div>
          ))}
        </div>

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Users className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-yellow-700 bg-clip-text text-transparent">
                Who's traveling with you?
              </CardTitle>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                Solo adventure or group journey
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Solo Journey */}
            <motion.button
              type="button"
              onClick={() => onRecipientTypeChange('self')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-6 rounded-xl border-3 transition-all duration-300
                ${recipientType === 'self'
                  ? 'border-amber-600 bg-gradient-to-br from-amber-300 to-orange-300 dark:from-amber-800 dark:to-orange-800 shadow-xl ring-4 ring-amber-400 dark:ring-amber-700'
                  : 'border-amber-400 dark:border-amber-700 bg-white/50 dark:bg-amber-950/30 hover:border-amber-500 hover:shadow-lg'
                }
              `}
            >
              {/* Passport stamp */}
              <div className="absolute -top-2 -right-2 text-3xl transform rotate-12">🛂</div>
              
              <div className="text-center mb-3">
                <motion.div
                  className="text-5xl"
                  animate={recipientType === 'self' ? { 
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎒
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-amber-900 dark:text-amber-100 mb-2">
                  Solo Journey
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  Personal adventure
                </p>
              </div>
              {recipientType === 'self' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold">✓</span>
                </motion.div>
              )}
            </motion.button>

            {/* Travel Buddies */}
            <motion.button
              type="button"
              onClick={() => onRecipientTypeChange('others')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-6 rounded-xl border-3 transition-all duration-300
                ${recipientType === 'others'
                  ? 'border-orange-600 bg-gradient-to-br from-orange-300 to-yellow-300 dark:from-orange-800 dark:to-yellow-800 shadow-xl ring-4 ring-orange-400 dark:ring-orange-700'
                  : 'border-amber-400 dark:border-amber-700 bg-white/50 dark:bg-amber-950/30 hover:border-amber-500 hover:shadow-lg'
                }
              `}
            >
              {/* Passport stamp */}
              <div className="absolute -top-2 -right-2 text-3xl transform rotate-12">🛂</div>
              
              <div className="text-center mb-3">
                <motion.div
                  className="text-5xl"
                  animate={recipientType === 'others' ? { 
                    scale: [1, 1.15, 1],
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🧳
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-amber-900 dark:text-amber-100 mb-2">
                  Travel Buddies
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  Share the journey
                </p>
              </div>
              {recipientType === 'others' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center shadow-lg"
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
