import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Clock, User, Calendar, Volume2, VolumeX, Radio, Send, Edit, Wand2 } from 'lucide-react';
import { MediaThumbnail } from '../MediaThumbnail';
import { EchoPanel } from '../EchoPanel';
import { format } from 'date-fns';

interface TimeTravelerCapsuleModalProps {
  capsule: any;
  isOpen: boolean;
  onClose: () => void;
  onEditDetails?: (capsule: any) => void;
  onEditCapsule?: (capsule: any) => void;
  onMediaClick?: (media: any) => void;
  canEdit?: boolean;
  onEchoSent?: () => void;
  enrichedMedia: any[];
}

export function TimeTravelerCapsuleModal({
  capsule,
  isOpen,
  onClose,
  onEditDetails,
  onEditCapsule,
  onMediaClick,
  canEdit = false,
  onEchoSent,
  enrichedMedia = []
}: TimeTravelerCapsuleModalProps) {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showEcho, setShowEcho] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [contentVisible, setContentVisible] = useState(false);
  
  // Entry animation - materialize content
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setContentVisible(true), 300);
      return () => clearTimeout(timer);
    } else {
      setContentVisible(false);
    }
  }, [isOpen]);

  // Audio management
  useEffect(() => {
    if (!isOpen) {
      setAudioEnabled(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    }
  }, [isOpen]);

  const toggleAudio = () => {
    if (!audioEnabled && !audioRef.current) {
      // Create ambient drone audio using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator1.type = 'sine';
      oscillator1.frequency.setValueAtTime(110, audioContext.currentTime); // Low A
      oscillator2.type = 'sine';
      oscillator2.frequency.setValueAtTime(165, audioContext.currentTime); // Low E
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator1.start();
      oscillator2.start();
      
      audioRef.current = { context: audioContext, oscillators: [oscillator1, oscillator2] } as any;
      setAudioEnabled(true);
    } else if (audioRef.current) {
      const audio = audioRef.current as any;
      audio.oscillators?.forEach((osc: any) => osc.stop());
      audio.context?.close();
      audioRef.current = null;
      setAudioEnabled(false);
    }
  };

  if (!capsule) return null;

  const formatDeliveryTime = () => {
    if (!capsule.delivery_date) return 'Not scheduled';
    try {
      const deliveryDate = new Date(capsule.delivery_date);
      return format(deliveryDate, 'PPP p');
    } catch {
      return 'Invalid date';
    }
  };

  const getStatusLabel = () => {
    if (capsule.isReceived || capsule.is_received || capsule.status === 'received') {
      return 'TRANSMISSION RECEIVED';
    }
    if (capsule.status === 'delivered') {
      return 'SIGNAL TRANSMITTED';
    }
    if (capsule.status === 'scheduled') {
      return 'JUMP SCHEDULED';
    }
    return 'DRAFT PROTOCOL';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] p-0 bg-black border-0 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(6, 78, 59, 0.2), black 50%)',
        }}
      >
        {/* Animated Starfield Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Moving stars */}
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%']
            }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            style={{
              backgroundImage: `
                radial-gradient(2px 2px at 20% 30%, white, transparent),
                radial-gradient(2px 2px at 60% 70%, white, transparent),
                radial-gradient(1px 1px at 50% 50%, white, transparent),
                radial-gradient(1px 1px at 80% 10%, white, transparent),
                radial-gradient(2px 2px at 90% 60%, white, transparent),
                radial-gradient(1px 1px at 15% 85%, rgba(255,255,255,0.8), transparent),
                radial-gradient(2px 2px at 40% 40%, rgba(255,255,255,0.6), transparent)
              `,
              backgroundSize: '200% 200%',
              opacity: 0.6
            }}
          />
          
          {/* Grid overlay */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%']
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />

          {/* Scan lines */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.1) 2px, rgba(34, 211, 238, 0.1) 4px)'
            }}
          />

          {/* Vignette effect */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%)'
            }}
          />
        </div>

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-cyan-950/50 hover:bg-cyan-900/70 text-cyan-300 border border-cyan-500/30 shadow-lg transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Button>

        {/* Audio toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleAudio}
          className="absolute top-4 right-16 z-50 h-10 w-10 rounded-full bg-cyan-950/50 hover:bg-cyan-900/70 text-cyan-300 border border-cyan-500/30 shadow-lg transition-all"
          title={audioEnabled ? 'Mute ambient audio' : 'Enable ambient audio'}
        >
          {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>

        {/* Content */}
        <AnimatePresence>
          {contentVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 h-full overflow-y-auto"
              style={{
                maxHeight: '90vh',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(34, 211, 238, 0.3) transparent'
              }}
            >
              <div className="p-8 space-y-6">
                {/* Mission Brief Header */}
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      className="p-3 bg-cyan-500/20 border border-cyan-400/50 rounded"
                      animate={{ 
                        boxShadow: [
                          '0 0 10px rgba(34, 211, 238, 0.3)',
                          '0 0 20px rgba(34, 211, 238, 0.6)',
                          '0 0 10px rgba(34, 211, 238, 0.3)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Radio className="h-6 w-6 text-cyan-400" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="font-mono text-cyan-400 text-sm tracking-widest">
                        {getStatusLabel()}
                      </div>
                      <h2 className="text-2xl font-mono text-white tracking-wider mt-1">
                        {capsule.title || 'UNTITLED TRANSMISSION'}
                      </h2>
                    </div>
                  </motion.div>

                  {/* System Readouts */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-3"
                  >
                    {/* Temporal Coordinates */}
                    <Card className="bg-cyan-950/20 border-cyan-500/30">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
                          <Clock className="h-3 w-3" />
                          COORDINATES
                        </div>
                        <div className="text-cyan-300 text-sm font-mono">
                          {formatDeliveryTime()}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Sender ID */}
                    {capsule.sender_name && (
                      <Card className="bg-cyan-950/20 border-cyan-500/30">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
                            <User className="h-3 w-3" />
                            SENDER_ID
                          </div>
                          <div className="text-cyan-300 text-sm font-mono">
                            {capsule.sender_name}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Status */}
                    <Card className="bg-cyan-950/20 border-cyan-500/30">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
                          <Radio className="h-3 w-3" />
                          STATUS
                        </div>
                        <div className="text-cyan-300 text-sm font-mono uppercase">
                          {capsule.status || 'ACTIVE'}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Decrypted Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="bg-cyan-950/10 border-cyan-500/30 relative overflow-hidden">
                    {/* Animated border effect */}
                    <motion.div
                      className="absolute inset-0 opacity-30 pointer-events-none"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%']
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      style={{
                        backgroundImage: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.3), transparent)',
                        backgroundSize: '200% 100%'
                      }}
                    />
                    
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-3 tracking-widest">
                        &gt; TRANSMISSION_DATA
                      </div>
                      <p className="text-white/90 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                        {capsule.message || capsule.text_message || '[NO MESSAGE DATA]'}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Media Attachments */}
                {enrichedMedia.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Card className="bg-cyan-950/10 border-cyan-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-4 tracking-widest">
                          &gt; ATTACHED_FILES [{enrichedMedia.length}]
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {enrichedMedia.map((media, index) => (
                            <motion.div
                              key={media.id || index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                              className="relative group cursor-pointer"
                              onClick={() => onMediaClick?.(media)}
                            >
                              <div className="border border-cyan-500/30 rounded overflow-hidden hover:border-cyan-400/60 transition-all">
                                <MediaThumbnail media={media} />
                              </div>
                              {/* Scan line effect on hover */}
                              <motion.div
                                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                                style={{
                                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.2) 2px, rgba(34, 211, 238, 0.2) 4px)'
                                }}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-3"
                >
                  {/* Transmit Response (Echo) */}
                  {(capsule.isReceived || capsule.is_received) && (
                    <Button
                      onClick={() => setShowEcho(!showEcho)}
                      className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 font-mono tracking-wider"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      TRANSMIT RESPONSE
                    </Button>
                  )}

                  {/* Edit buttons */}
                  {canEdit && onEditCapsule && (
                    <Button
                      onClick={() => onEditCapsule(capsule)}
                      className="bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/50 font-mono"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      EDIT
                    </Button>
                  )}

                  {canEdit && onEditDetails && (
                    <Button
                      onClick={() => onEditDetails(capsule)}
                      variant="outline"
                      className="bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 border-cyan-500/30 font-mono"
                    >
                      <Wand2 className="mr-2 h-4 w-4" />
                      MODIFY
                    </Button>
                  )}
                </motion.div>

                {/* Echo Panel */}
                <AnimatePresence>
                  {showEcho && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="bg-cyan-950/10 border-cyan-500/30">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-4 tracking-widest">
                            &gt; COMPOSE_RESPONSE
                          </div>
                          <EchoPanel
                            capsuleId={capsule.id}
                            recipientName={capsule.sender_name || 'Unknown'}
                            onEchoSent={() => {
                              setShowEcho(false);
                              onEchoSent?.();
                            }}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Access Log Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center text-cyan-500/50 text-xs font-mono pt-4 border-t border-cyan-500/20"
                >
                  <div>ACCESS_LOG: {new Date().toISOString()}</div>
                  <div className="mt-1">ENCRYPTION: QUANTUM-256 • PROTOCOL: TEMPORAL_V2</div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
