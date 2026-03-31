import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Clock, Users, Mail, CalendarIcon } from 'lucide-react';
import { format, isBefore, startOfDay } from 'date-fns';
import { TIME_ZONES, getTimeZoneDisplay } from '../../utils/timezone';
import { getMaximumScheduleDate } from '../../utils/time-validation';
import { MultiRecipientSelector } from '../MultiRecipientSelector';

interface TimeTravelerStep3Props {
  deliveryDate?: Date;
  deliveryTime: string;
  timeZone: string;
  recipientType: 'self' | 'others' | null;
  recipients: any[];
  timeValidationError: string | null;
  calendarOpen: boolean;
  onDeliveryDateChange: (date: Date | undefined) => void;
  onDeliveryTimeChange: (time: string) => void;
  onTimeZoneChange: (tz: string) => void;
  onRecipientTypeChange: (type: 'self' | 'others' | null) => void;
  onRecipientsChange: (recipients: any[]) => void;
  onCalendarOpenChange: (open: boolean) => void;
  isMobile?: boolean;
}

export function TimeTravelerStep3({
  deliveryDate,
  deliveryTime,
  timeZone,
  recipientType,
  recipients,
  timeValidationError,
  calendarOpen,
  onDeliveryDateChange,
  onDeliveryTimeChange,
  onTimeZoneChange,
  onRecipientTypeChange,
  onRecipientsChange,
  onCalendarOpenChange,
  isMobile = false
}: TimeTravelerStep3Props) {
  return (
    <div className="space-y-6">
      {/* Delivery Card - Chrono-Terminal Styling */}
      <Card className="border-2 shadow-2xl border-cyan-500/50 bg-black/90 backdrop-blur-md relative overflow-hidden">
        {/* Animated Background Grid */}
        <motion.div
          className="absolute inset-0 opacity-20 pointer-events-none"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Scan Lines */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.1) 2px, rgba(34, 211, 238, 0.1) 4px)'
          }}
        />

        <CardHeader className="border-b relative z-10 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-cyan-500/30">
          <CardTitle className="flex items-center gap-3 text-white">
            <motion.div 
              className="p-2 bg-cyan-500/20 border border-cyan-400/50 rounded"
              animate={{ 
                boxShadow: [
                  '0 0 10px rgba(34, 211, 238, 0.3)',
                  '0 0 20px rgba(34, 211, 238, 0.6)',
                  '0 0 10px rgba(34, 211, 238, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Clock className="h-5 w-5 text-cyan-400" />
            </motion.div>
            <div className="flex-1">
              <div className="font-mono text-cyan-400 tracking-wider">TEMPORAL COORDINATES</div>
              <div className="text-xs text-cyan-500/60 font-mono mt-0.5">mission.config.deployment</div>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6 space-y-4 relative z-10">
          {/* Date & Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
                &gt; TARGET_DATE
              </Label>
              <Popover open={calendarOpen} onOpenChange={onCalendarOpenChange}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-12 justify-start text-left bg-cyan-950/30 text-cyan-300 hover:bg-cyan-950/50 border-cyan-500/30 font-mono"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deliveryDate ? format(deliveryDate, 'yyyy.MM.dd') : 'YYYY.MM.DD'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-950 border-cyan-500/50" align="start">
                  <Calendar
                    mode="single"
                    selected={deliveryDate}
                    onSelect={(date) => {
                      onDeliveryDateChange(date);
                      onCalendarOpenChange(false);
                    }}
                    disabled={(date) => {
                      if (isBefore(startOfDay(date), startOfDay(new Date()))) {
                        return true;
                      }
                      const maxDate = getMaximumScheduleDate();
                      if (date > maxDate) {
                        return true;
                      }
                      return false;
                    }}
                    initialFocus
                    className="text-cyan-300"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
                &gt; MISSION_CLOCK
              </Label>
              <div className="relative">
                <Input
                  id="time"
                  type="time"
                  value={deliveryTime}
                  onChange={(e) => onDeliveryTimeChange(e.target.value)}
                  className="h-12 text-center bg-cyan-950/30 text-cyan-300 border-cyan-500/30 font-mono tracking-wider"
                />
                <motion.div
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </div>
          </div>

          {/* Validation Error Message */}
          {timeValidationError && (
            <div className="p-3 rounded-lg bg-red-950/30 border border-red-500/50">
              <p className="text-sm whitespace-pre-line text-red-400 font-mono">
                ⚠ ERROR: {timeValidationError}
              </p>
            </div>
          )}

          {/* Helper Text */}
          {!timeValidationError && (
            <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/30">
              <p className="text-xs text-cyan-300/80 font-mono">
                <span className="text-cyan-400">ℹ</span> <strong>JUMP_PARAMETERS:</strong> Temporal coordinates must be set between 1 hour and 5 years from current timeline
              </p>
            </div>
          )}

          {/* Timezone */}
          <div className="space-y-2">
            <Label className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
              &gt; TEMPORAL_ZONE
            </Label>
            <Select value={timeZone} onValueChange={onTimeZoneChange}>
              <SelectTrigger className="h-12 bg-cyan-950/30 border-cyan-500/30 text-cyan-300 font-mono">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-950 border-cyan-500/50">
                {TIME_ZONES.map((tz) => (
                  <SelectItem 
                    key={tz.value} 
                    value={tz.value} 
                    className="text-cyan-300 focus:bg-cyan-950/50 focus:text-cyan-200 font-mono"
                  >
                    {getTimeZoneDisplay(tz)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Recipients Card - Chrono-Terminal Styling */}
      <Card className="border-2 shadow-2xl border-cyan-500/50 bg-black/90 backdrop-blur-md relative overflow-hidden">
        {/* Animated Background Grid */}
        <motion.div
          className="absolute inset-0 opacity-20 pointer-events-none"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Scan Lines */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.1) 2px, rgba(34, 211, 238, 0.1) 4px)'
          }}
        />

        <CardHeader className="border-b relative z-10 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-cyan-500/30">
          <CardTitle className="flex items-center gap-3 text-white">
            <motion.div 
              className="p-2 bg-cyan-500/20 border border-cyan-400/50 rounded"
              animate={{ 
                boxShadow: [
                  '0 0 10px rgba(34, 211, 238, 0.3)',
                  '0 0 20px rgba(34, 211, 238, 0.6)',
                  '0 0 10px rgba(34, 211, 238, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Users className="h-5 w-5 text-cyan-400" />
            </motion.div>
            <div className="flex-1">
              <div className="font-mono text-cyan-400 tracking-wider">AUTHORIZED RECIPIENTS</div>
              <div className="text-xs text-cyan-500/60 font-mono mt-0.5">identity.database.access</div>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6 space-y-4 relative z-10">
          {/* Recipient Type Selection */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all ${
                  recipientType === 'self' 
                    ? 'ring-2 ring-cyan-500 shadow-lg shadow-cyan-500/20 bg-cyan-500/10 border-cyan-500/50'
                    : 'hover:shadow-md bg-cyan-950/20 border-cyan-500/20'
                }`}
                onClick={() => onRecipientTypeChange(recipientType === 'self' ? null : 'self')}
              >
                <CardContent className="p-6 text-center">
                  <Users className="h-10 w-10 mx-auto mb-3 text-cyan-400" />
                  <p className="font-semibold text-base mb-1 text-white font-mono">
                    SELF
                  </p>
                  <p className="text-sm text-white/60 font-mono text-xs">
                    Personal transmission
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all ${
                  recipientType === 'others' 
                    ? 'ring-2 ring-cyan-500 shadow-lg shadow-cyan-500/20 bg-cyan-500/10 border-cyan-500/50'
                    : 'hover:shadow-md bg-cyan-950/20 border-cyan-500/20'
                }`}
                onClick={() => onRecipientTypeChange(recipientType === 'others' ? null : 'others')}
              >
                <CardContent className="p-6 text-center">
                  <Mail className="h-10 w-10 mx-auto mb-3 text-cyan-400" />
                  <p className="font-semibold text-base mb-1 text-white font-mono">
                    OTHERS
                  </p>
                  <p className="text-sm text-white/60 font-mono text-xs">
                    Broadcast signal
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recipients List */}
          {recipientType === 'others' && (
            <MultiRecipientSelector 
              recipients={recipients} 
              onRecipientsChange={onRecipientsChange} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
