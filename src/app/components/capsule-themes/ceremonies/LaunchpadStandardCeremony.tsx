/**
 * Launchpad - Metamorphosis Ceremony (Standard)
 * Performance-optimised: CSS orbit rings, memoised random data, viewport-fill glow.
 */

import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';

interface LaunchpadStandardCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function LaunchpadStandardCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: LaunchpadStandardCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'chrysalis' | 'cracking' | 'emergence' | 'drying' | 'flight' | 'radiance' | 'outro'>('intro');
  const [completed, setCompleted] = useState(false);
  // Computed once on mount — never recalculate per render
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const timeline = [
      { time: 0,     action: () => setStage('intro') },
      { time: 1000,  action: () => setStage('chrysalis') },
      { time: 4200,  action: () => setStage('cracking') },
      { time: 7200,  action: () => setStage('emergence') },
      { time: 9800,  action: () => setStage('drying') },
      { time: 11500, action: () => setStage('flight') },
      { time: 12500, action: () => setStage('radiance') },
      { time: 15800, action: () => setStage('outro') },
      { time: 16000, action: () => { setCompleted(true); onComplete?.(); } },
    ];
    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    const failsafe = setTimeout(() => {
      setStage('outro'); setCompleted(true); onComplete?.();
    }, 17000);
    return () => { timeouts.forEach(clearTimeout); clearTimeout(failsafe); };
  }, []);

  // ── Palette ───────────────────────────────────────────────────────────────
  const lsColors = useMemo(() => ['#ff6b35','#ffaa44','#ffd700','#8bc34a','#ffffff','#ffcc88','#a5d6a7'], []);

  // ── Firework data (static angles, no Math.random in render) ───────────────
  const lsFwPositions = useMemo(() => [
    {x:10,y:18},{x:25,y:10},{x:42,y:20},{x:58,y:8},{x:72,y:18},{x:88,y:12},{x:18,y:32},{x:82,y:28},
  ].slice(0, isMobile ? 5 : 8), [isMobile]);

  const lsFwSparks = useMemo(() => lsFwPositions.map(() =>
    Array.from({length: isMobile ? 14 : 20}, (_, i) => {
      const a = (i / (isMobile ? 14 : 20)) * Math.PI * 2;
      const d = 50 + (i % 5) * 20;
      return { x: Math.cos(a)*d, y: Math.sin(a)*d, color: lsColors[i % lsColors.length], delay: i*0.04 };
    })
  ), [lsFwPositions, lsColors, isMobile]);

  const lsFwRings = useMemo(() => lsFwPositions.map(() =>
    Array.from({length: 3}, (_, i) => ({ delay: i*0.15, color: ['#ff6b35','#ffd700','#8bc34a'][i] }))
  ), [lsFwPositions]);

  const lsOrbs = useMemo(() => Array.from({length: isMobile ? 10 : 18}, (_, i) => ({
    x: 5 + (i * 5.5) % 90, dx: (i % 7 - 3) * 18, dur: 2.5 + (i % 4) * 0.5,
    delay: i * 0.18, color: lsColors[i % lsColors.length]
  })), [lsColors, isMobile]);

  // ── Leaf data — positions computed once, never on render ─────────────────
  const leafData = useMemo(() => Array.from({length: 12}, (_, i) => ({
    left:  10 + ((i * 8.3) % 80),
    top:   -5 + ((i * 3.7) % 15),
    yEnd:  300 + ((i * 23) % 200),
    x:     ((i % 7) - 3) * 50,
    rot:   (i * 47) % 360,
    dur:   8 + (i % 4),
  })), []);

  // ── Sparkle trail data ────────────────────────────────────────────────────
  const sparkleCount = isMobile ? 8 : 15;
  const sparkleData = useMemo(() => Array.from({length: sparkleCount}, (_, i) => ({
    x: ((i % 7) - 3) * 8,
    y: 30 + (i % 5) * 6,
  })), [sparkleCount]);

  // ── Mini-butterfly data ───────────────────────────────────────────────────
  const bfCount = isMobile ? 10 : 25;
  const butterflyData = useMemo(() => Array.from({length: bfCount}, (_, i) => {
    const angle = (i / bfCount) * Math.PI * 2;
    const distance = 80 + (i % 5) * 20;
    return {
      endX: Math.cos(angle) * distance,
      endY: Math.sin(angle) * distance - 50,
      rot:  (i * 29) % 360,
      color: (['#ff6b35','#ffaa44','#ffd700'] as const)[i % 3],
    };
  }), [bfCount]);

  // ── Burst particle data ────────────────────────────────────────────────────
  const burstCount = isMobile ? 40 : 80;
  const burstData = useMemo(() => {
    const colors = ['#ff6b35','#ffaa44','#ffd700','#8bc34a'];
    return Array.from({length: burstCount}, (_, i) => {
      const angle = (i / burstCount) * Math.PI * 2;
      const dist  = 140 + (i % 10) * 30;
      return { x: Math.cos(angle)*dist, y: Math.sin(angle)*dist, yExtra: 100+(i%5)*8, color: colors[i%4] };
    });
  }, [burstCount]);

  // ── Orbit rings — CSS rotation, not per-particle Framer motion ────────────
  const orbitRings = useMemo(() => [0, 1, 2].map(ring => {
    const radius = 180 + ring * 110;
    const count  = isMobile ? (12 + ring * 6) : (40 + ring * 18);
    const dur    = 6.5 + ring * 1.8;
    const colors = ['#ff6b35','#ffaa44','#ffd700','#8bc34a'];
    return {
      dur,
      particles: Array.from({length: count}, (_, i) => {
        const a = (i / count) * 2 * Math.PI;
        return { x: Math.cos(a)*radius, y: Math.sin(a)*radius, color: colors[i%4] };
      }),
    };
  }), [isMobile]);

  // ── Confetti ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (stage !== 'radiance') return;
    const colors = ['#ff6b35','#ffaa44','#ffd700','#8bc34a','#ffffff','#ffcc88','#a5d6a7'];
    const base = { spread: 80, ticks: 200, gravity: 0.9, decay: 0.93, startVelocity: 38, colors };
    confetti({ ...base, particleCount: isMobile ? 70 : 120, angle: 60,  origin: { x: isMobile ? 0.12 : 0, y: 0.7 } });
    confetti({ ...base, particleCount: isMobile ? 70 : 120, angle: 120, origin: { x: isMobile ? 0.88 : 1, y: 0.7 } });
    if (!isMobile) {
      const t1 = setTimeout(() => confetti({ ...base, particleCount: 80, angle: 90, origin: { x: 0.5, y: 0.6 } }), 380);
      const t2 = setTimeout(() => {
        confetti({ ...base, particleCount: 100, angle: 60,  origin: { x: 0, y: 0.65 } });
        confetti({ ...base, particleCount: 100, angle: 120, origin: { x: 1, y: 0.65 } });
      }, 950);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [stage]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#0a1f1a] via-[#0d2820] to-[#0f3328]">
      <style>{`
        @keyframes ls-pop-ring {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(4.4); opacity: 0; }
        }
        @keyframes ls-flash {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(3); opacity: 0; }
        }
        @keyframes ls-orb-float {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateY(-180px) translateX(var(--dx)); opacity: 0; }
        }
        @keyframes ls-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {/* Background — static base + opacity overlay for radiance (avoids gradient repaint) */}
      <div className="absolute inset-0" style={{
        background: stage === 'flight' || stage === 'drying'
          ? 'radial-gradient(ellipse at 50% 35%, #2d5f4a 0%, #1a3d2f 50%, #0a1f1a 85%)'
          : stage === 'emergence' || stage === 'cracking'
          ? 'radial-gradient(ellipse at 50% 50%, #254636 0%, #1a3d2f 60%, #0a1f1a 90%)'
          : 'radial-gradient(ellipse at 50% 50%, #1a3d2f 0%, #0d2820 70%, #0a1f1a 100%)'
      }} />
      <AnimatePresence>
        {stage === 'radiance' && !completed && (
          <motion.div className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.85, 1, 0.85] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, repeat: 1 }}
            style={{ background: 'radial-gradient(ellipse at 50% 40%, #3d7f6a 0%, #1a3d2f 40%, #0a1f1a 80%)' }}
          />
        )}
      </AnimatePresence>

      {/* Soft light rays through trees */}
      <AnimatePresence>
        {(stage === 'drying' || stage === 'flight' || stage === 'radiance') && (
          <>
            {[...Array(isMobile ? 8 : 16)].map((_, i) => (
              <motion.div
                key={`light-ray-${i}`}
                className="absolute"
                style={{
                  left: `${10 + i * (isMobile ? 12 : 6)}%`,
                  top: '-10%',
                  width: i % 2 === 0 ? '6px' : '4px',
                  height: '70%',
                  background: `linear-gradient(to bottom, rgba(255,248,220,${0.25+(i%3)*0.03}), rgba(255,240,200,${0.15+(i%3)*0.02}), transparent)`,
                  transform: `rotate(${-10+i*2.8}deg)`,
                  filter: 'blur(2px)',
                  willChange: 'transform, opacity',
                }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: [0, 0.5, 0.45, 0.48], scaleY: [0, 1.3, 1.1] }}
                exit={{ opacity: 0, transition: { duration: 0.6 } }}
                transition={{ duration: 2.4, delay: i * 0.1, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Floating leaves — positions from useMemo, never recomputed */}
      <AnimatePresence>
        {(stage === 'flight' || stage === 'radiance') && (
          <>
            {leafData.map((leaf, i) => (
              <motion.div
                key={`leaf-${i}`}
                className="absolute"
                style={{ left: `${leaf.left}%`, top: `${leaf.top}%`, fontSize: '24px',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))', willChange: 'transform, opacity' }}
                initial={{ opacity: 0, y: 0, rotate: 0 }}
                animate={{ opacity: [0, 0.7, 0.6], y: leaf.yEnd, x: leaf.x, rotate: leaf.rot }}
                exit={{ opacity: 0 }}
                transition={{ duration: leaf.dur, delay: i * 0.3, ease: 'easeInOut' }}
              >
                {i % 4 === 0 ? '🍃' : i % 4 === 1 ? '🍂' : i % 4 === 2 ? '🌿' : '🍁'}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-16 left-0 right-0 text-center z-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-emerald-100 drop-shadow-2xl">Metamorphosis</h1>
            <p className="text-emerald-200/80 mt-3 text-base">Your transformation is complete</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center">

        {/* CHRYSALIS STAGE */}
        <AnimatePresence>
          {(stage === 'chrysalis' || stage === 'cracking' || stage === 'emergence') && (
            <motion.div
              className="absolute z-30"
              style={{ left: '50%', top: '45%', transform: 'translate(-50%, -50%)' }}
              initial={{ opacity: 0, y: -30 }}
              animate={{
                opacity: stage === 'emergence' ? [1, 0.8, 0] : 1,
                y: 0,
                scale: stage === 'emergence' ? [1, 1.05, 0.95] : 1
              }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
              transition={{ duration: stage === 'emergence' ? 1 : 1.2, ease: 'easeOut' }}
            >
              {/* Branch */}
              <div style={{ position:'absolute', top:'-40px', left:'50%', width:'200px', height:'8px',
                marginLeft:'-100px', background:'linear-gradient(to right, transparent, #3d2817, #3d2817, transparent)', borderRadius:'4px' }} />
              <div style={{ position:'absolute', top:'-40px', left:'50%', width:'2px', height:'50px',
                marginLeft:'-1px', background:'linear-gradient(to bottom, #3d2817, #4a3520)', transformOrigin:'top center' }} />

              {/* Chrysalis body */}
              <motion.div
                style={{ width:'85px', height:'120px',
                  background:'linear-gradient(135deg, #7fb069 0%, #5a9d4a 40%, #4a7d3a 80%, #3a6d2a 100%)',
                  borderRadius:'45% 45% 50% 50%', position:'relative',
                  boxShadow:'inset -8px -8px 20px rgba(0,0,0,0.3), inset 8px 8px 20px rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.4)',
                  border:'1px solid rgba(255,255,255,0.1)' }}
                animate={{ rotate: stage === 'emergence' ? [-2,4,-4,2,-2] : stage === 'cracking' ? [-2,2,-2] : [-1,1,-1] }}
                transition={{ duration: stage === 'emergence' ? 0.4 : stage === 'cracking' ? 0.3 : 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {[25,45,65,85].map((top, i) => (
                  <div key={`seg-${i}`} style={{ position:'absolute', top:`${top}%`, left:'5%', right:'5%', height:'1px', background:'rgba(0,0,0,0.2)', borderRadius:'50%' }} />
                ))}
                <motion.div
                  style={{ position:'absolute', inset:'15%', background:'radial-gradient(circle, rgba(255,215,100,0.6) 0%, transparent 70%)', borderRadius:'50%', filter:'blur(15px)' }}
                  animate={{
                    opacity: stage === 'emergence' ? [0.8,1,0.8] : stage === 'cracking' ? [0.3,0.8,0.3] : [0,0.3,0],
                    scale:   stage === 'emergence' ? [1.3,1.5,1.3] : stage === 'cracking' ? [1,1.3,1] : [0.8,1,0.8]
                  }}
                  transition={{ duration: stage === 'emergence' ? 0.6 : stage === 'cracking' ? 1 : 3, repeat: Infinity }}
                />

                {stage === 'emergence' && (
                  <>
                    <motion.div style={{ position:'absolute', top:0, left:0, width:'50%', height:'100%',
                      background:'linear-gradient(135deg, #7fb069 0%, #5a9d4a 40%, #4a7d3a 100%)',
                      borderRadius:'45% 20% 20% 50%', transformOrigin:'center left',
                      boxShadow:'inset -8px -8px 20px rgba(0,0,0,0.4)', zIndex:5 }}
                      animate={{ rotateY: [-5,-45,-60], x: [-2,-15,-25] }}
                      transition={{ duration: 2, ease: 'easeOut' }}
                    />
                    <motion.div style={{ position:'absolute', top:0, right:0, width:'50%', height:'100%',
                      background:'linear-gradient(-135deg, #7fb069 0%, #5a9d4a 40%, #4a7d3a 100%)',
                      borderRadius:'20% 45% 50% 20%', transformOrigin:'center right',
                      boxShadow:'inset 8px -8px 20px rgba(0,0,0,0.4)', zIndex:5 }}
                      animate={{ rotateY: [5,45,60], x: [2,15,25] }}
                      transition={{ duration: 2, ease: 'easeOut' }}
                    />
                  </>
                )}

                {stage === 'cracking' && (
                  <>
                    {[
                      {x1:'50%',y1:'20%',angle:25,delay:0},{x1:'50%',y1:'30%',angle:-35,delay:0.2},
                      {x1:'50%',y1:'40%',angle:15,delay:0.4},{x1:'50%',y1:'50%',angle:-20,delay:0.6},
                      {x1:'50%',y1:'60%',angle:25,delay:0.8},{x1:'50%',y1:'70%',angle:-30,delay:1.0}
                    ].map((crack, i) => (
                      <motion.div key={`crack-${i}`} style={{ position:'absolute', left:crack.x1, top:crack.y1,
                        width:'3px', height:'35px',
                        background:'linear-gradient(to bottom, rgba(255,215,100,0.95), rgba(255,215,100,0.7), transparent)',
                        transformOrigin:'top center', transform:`rotate(${crack.angle}deg)`,
                        filter:'blur(0.5px)', boxShadow:'0 0 10px rgba(255,215,100,0.7)' }}
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: [0,1,1.1], opacity: [0,1,0.9] }}
                        transition={{ duration: 0.5, delay: crack.delay }}
                      />
                    ))}
                    {[15,35,55,75].map((top, i) => (
                      <motion.div key={`light-${i}`} style={{ position:'absolute',
                        left: i%2===0 ? '75%' : '25%', top:`${top}%`, width:'25px', height:'4px',
                        background:`linear-gradient(to ${i%2===0?'right':'left'}, rgba(255,215,100,0.95), transparent)`,
                        filter:'blur(2px)', boxShadow:'0 0 15px rgba(255,215,100,0.9)' }}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: [0,1,0.85,1], scaleX: [0,2,1.8] }}
                        transition={{ duration: 0.7, delay: 0.2+i*0.2 }}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BUTTERFLY EMERGENCE & FLIGHT */}
        <AnimatePresence>
          {(stage === 'emergence' || stage === 'drying' || stage === 'flight') && (
            <motion.div
              className="absolute z-35"
              initial={{ left:'50%', top:'47%', scale:0.5, opacity:0 }}
              animate={{
                left:    stage==='flight' ? ['50%','52%','48%','50%','50%'] : '50%',
                top:     stage==='flight' ? ['47%','42%','35%','25%','10%'] : stage==='drying' ? '44%' : '47%',
                scale:   stage==='flight' ? [1,1.1,1.25,1.4,1.5] : stage==='drying' ? [0.8,1] : [0.5,0.8],
                opacity: stage==='flight' ? [1,1,0.9,0.7,0] : [0,1],
                rotate:  stage==='flight' ? [0,-8,8,-5,0] : stage==='drying' ? [0,-3,3,0] : [-10,0]
              }}
              exit={{ opacity: 0, scale: 1.6 }}
              transition={{
                scale:   { duration: stage==='flight'?1:stage==='drying'?1.5:2.5, ease:'easeOut' },
                opacity: { duration: stage==='flight'?1:stage==='drying'?1.5:2.5, ease:'easeOut' },
                left:    { duration: 1, ease:'easeInOut' },
                top:     { duration: 1, ease:[0.4,0,0.2,1] },
                rotate:  { duration: 1, ease:'easeInOut' }
              }}
              style={{ transform:'translate(-50%,-50%)' }}
            >
              {/* Body */}
              <div style={{ position:'absolute', left:'50%', top:'50%', width:'12px', height:'70px',
                marginLeft:'-6px', marginTop:'-35px',
                background:'linear-gradient(to bottom, #2c1810 0%, #1a0f08 100%)',
                borderRadius:'6px', zIndex:10, boxShadow:'0 2px 8px rgba(0,0,0,0.4)' }} />
              {/* Head */}
              <div style={{ position:'absolute', left:'50%', top:'50%', width:'16px', height:'16px',
                marginLeft:'-8px', marginTop:'-43px',
                background:'radial-gradient(circle, #3d2817, #2c1810)', borderRadius:'50%', zIndex:11 }} />
              {/* Antennae */}
              {[-1,1].map((side,i) => (
                <motion.div key={`ant-${i}`} style={{ position:'absolute', left:'50%', top:'50%',
                  width:'2px', height:'25px', marginLeft:`${side*4}px`, marginTop:'-50px',
                  background:'linear-gradient(to bottom, #2c1810, transparent)',
                  transformOrigin:'bottom center', transform:`rotate(${side*35}deg)`, zIndex:11 }}
                  animate={{ rotate: stage==='flight' ? [side*35,side*30,side*35] : [side*35,side*32,side*35] }}
                  transition={{ duration: stage==='flight'?0.6:1.5, repeat:Infinity, ease:'easeInOut', delay:i*0.2 }}
                />
              ))}

              {/* Left wings */}
              <motion.div style={{ position:'absolute', left:'50%', top:'50%', transformOrigin:'right center', zIndex:5 }}
                animate={{ rotateY: stage==='flight'?[10,-20,20,-20,10]:stage==='drying'?[60,30,10]:[90,80,70,60], x: stage==='flight'?[0,-6,6,-6,0]:0 }}
                transition={{ rotateY:{ duration:stage==='flight'?0.4:stage==='drying'?2:2.5, ease:stage==='flight'?'easeInOut':[0.4,0,0.2,1], repeat:stage==='flight'?Infinity:0 }, x:{ duration:0.4, repeat:stage==='flight'?Infinity:0 } }}
              >
                <div style={{ position:'absolute', right:'0px', top:'-25px', width:'80px', height:'70px',
                  background:'linear-gradient(135deg, #ff6b35 0%, #ff8555 20%, #ffa575 40%, #ff7f50 60%, #ff6b35 80%)',
                  borderRadius:'80% 20% 50% 80%', border:'2px solid #d85a2a',
                  boxShadow:'inset -10px -10px 30px rgba(0,0,0,0.3), 0 5px 20px rgba(255,107,53,0.4)' }}>
                  <div style={{ position:'absolute', top:'20%', right:'25%', width:'20px', height:'20px', background:'radial-gradient(circle, rgba(255,255,255,0.6), transparent)', borderRadius:'50%' }} />
                  {[20,40,60].map((t,i)=>(<div key={i} style={{ position:'absolute', top:`${t}%`, right:'10%', width:'70%', height:'1px', background:'rgba(0,0,0,0.15)', transformOrigin:'right center', transform:`rotate(${-20+i*10}deg)` }} />))}
                </div>
                <div style={{ position:'absolute', right:'0px', top:'15px', width:'70px', height:'60px',
                  background:'linear-gradient(135deg, #ffaa44 0%, #ffbb66 30%, #ffcc88 60%, #ffaa44 90%)',
                  borderRadius:'50% 20% 80% 50%', border:'2px solid #dd9933',
                  boxShadow:'inset -8px -8px 25px rgba(0,0,0,0.3), 0 5px 20px rgba(255,170,68,0.4)' }}>
                  <div style={{ position:'absolute', top:'30%', right:'30%', width:'18px', height:'18px', background:'radial-gradient(circle, rgba(255,255,255,0.5), transparent)', borderRadius:'50%' }} />
                </div>
              </motion.div>

              {/* Right wings */}
              <motion.div style={{ position:'absolute', left:'50%', top:'50%', transformOrigin:'left center', zIndex:5 }}
                animate={{ rotateY: stage==='flight'?[-10,20,-20,20,-10]:stage==='drying'?[-60,-30,-10]:[-90,-80,-70,-60], x: stage==='flight'?[0,6,-6,6,0]:0 }}
                transition={{ rotateY:{ duration:stage==='flight'?0.4:stage==='drying'?2:2.5, ease:stage==='flight'?'easeInOut':[0.4,0,0.2,1], repeat:stage==='flight'?Infinity:0 }, x:{ duration:0.4, repeat:stage==='flight'?Infinity:0 } }}
              >
                <div style={{ position:'absolute', left:'0px', top:'-25px', width:'80px', height:'70px',
                  background:'linear-gradient(-135deg, #ff6b35 0%, #ff8555 20%, #ffa575 40%, #ff7f50 60%, #ff6b35 80%)',
                  borderRadius:'20% 80% 80% 50%', border:'2px solid #d85a2a',
                  boxShadow:'inset 10px -10px 30px rgba(0,0,0,0.3), 0 5px 20px rgba(255,107,53,0.4)' }}>
                  <div style={{ position:'absolute', top:'20%', left:'25%', width:'20px', height:'20px', background:'radial-gradient(circle, rgba(255,255,255,0.6), transparent)', borderRadius:'50%' }} />
                </div>
                <div style={{ position:'absolute', left:'0px', top:'15px', width:'70px', height:'60px',
                  background:'linear-gradient(-135deg, #ffaa44 0%, #ffbb66 30%, #ffcc88 60%, #ffaa44 90%)',
                  borderRadius:'20% 50% 50% 80%', border:'2px solid #dd9933',
                  boxShadow:'inset 8px -8px 25px rgba(0,0,0,0.3), 0 5px 20px rgba(255,170,68,0.4)' }}>
                  <div style={{ position:'absolute', top:'30%', left:'30%', width:'18px', height:'18px', background:'radial-gradient(circle, rgba(255,255,255,0.5), transparent)', borderRadius:'50%' }} />
                </div>
              </motion.div>

              {/* Sparkle trail — memoised positions, reduced count on mobile */}
              {stage === 'flight' && sparkleData.map((s, i) => (
                <motion.div key={`sparkle-${i}`} style={{ position:'absolute', left:'50%', top:'80%',
                  width:'6px', height:'6px',
                  background: i%3===0?'#ff6b35':i%3===1?'#ffaa44':'#ffd700',
                  borderRadius:'50%',
                  boxShadow:`0 0 10px ${i%3===0?'#ff6b35':i%3===1?'#ffaa44':'#ffd700'}`,
                  willChange: 'transform, opacity' }}
                  initial={{ opacity:0, scale:0, x:0, y:0 }}
                  animate={{ opacity:[0,1,0], scale:[0,1.5,0], x:s.x, y:s.y }}
                  transition={{ duration:1.2, delay:i*0.08, repeat:Infinity, ease:'easeOut' }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mini-butterflies — memoised, simpler shape on mobile */}
        <AnimatePresence>
          {stage === 'flight' && butterflyData.map((b, i) => (
            <motion.div key={`mini-butterfly-${i}`} className="absolute"
              style={{ left:'50%', top:'35%', width:'22px', height:'22px', willChange:'transform, opacity' }}
              initial={{ x:0, y:0, opacity:0, scale:0 }}
              animate={{ x:[0,b.endX*0.5,b.endX], y:[0,b.endY*0.5,b.endY], opacity:[0,1,0.8,0], scale:[0,1,0.8,0], rotate:[0,b.rot,b.rot*2] }}
              transition={{ duration:1.5, delay:0.2+i*0.025, ease:[0.4,0,0.2,1] }}
            >
              <div style={{ position:'absolute', width:'100%', height:'100%', background:b.color,
                borderRadius: isMobile ? '50%' : undefined,
                clipPath: isMobile ? undefined : 'polygon(50% 20%, 20% 40%, 10% 70%, 30% 90%, 50% 85%, 70% 90%, 90% 70%, 80% 40%)',
                boxShadow: isMobile ? `0 0 6px ${b.color}` : `0 0 8px ${b.color}` }} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* RADIANCE */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Rays */}
            {[...Array(isMobile ? 24 : 42)].map((_, i) => {
              const total = isMobile ? 24 : 42;
              const angle = (i / total) * 360;
              const colors = ['rgba(255,107,53,1)','rgba(255,170,68,1)','rgba(255,215,100,1)','rgba(139,195,74,1)'];
              return (
                <motion.div key={`ray-${i}`} className="absolute" style={{
                  left:'50%', top:'50%', width:'200vw', height:i%3===0?'10px':i%3===1?'7px':'8px',
                  marginLeft:'-100vw', marginTop:i%3===0?'-5px':i%3===1?'-3.5px':'-4px',
                  background:`linear-gradient(to right, transparent, ${colors[i%4].replace('1)','0.92)')} 50%, transparent)`,
                  transformOrigin:'center center', transform:`rotate(${angle}deg)`, filter:'blur(2px)',
                  willChange:'transform, opacity'
                }}
                  initial={{ scaleX:0, opacity:0 }}
                  animate={{ scaleX:[0,2.6,2.4], opacity:[0,1,0.94] }}
                  transition={{ duration:1.4, ease:'easeOut' }}
                />
              );
            })}

            {/* Central glow — viewport-fill, simple opacity fade, no scale/rotate on blurred div */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.7) 0%, rgba(255,220,140,0.55) 18%, rgba(255,107,53,0.35) 36%, rgba(139,195,74,0.2) 58%, transparent 80%)',
                filter: isMobile ? 'blur(28px)' : 'blur(55px)',
              }}
            />

            {/* Orbiting particles — 3 CSS-rotating ring wrappers (from 174 animated elements to 3) */}
            {orbitRings.map((ring, ri) => (
              <div key={`orbit-ring-${ri}`} style={{
                position:'absolute', inset:0,
                animation:`ls-orbit ${ring.dur}s linear infinite`,
                transformOrigin:'center center',
                willChange:'transform',
              }}>
                {ring.particles.map((p, i) => (
                  <div key={i} style={{
                    position:'absolute',
                    left:`calc(50% + ${p.x}px)`, top:`calc(50% + ${p.y}px)`,
                    width: isMobile ? 5 : 7, height: isMobile ? 5 : 7,
                    borderRadius:'50%', background:p.color,
                    boxShadow:`0 0 ${isMobile?8:14}px ${p.color}`,
                    transform:'translate(-50%,-50%)',
                  }} />
                ))}
              </div>
            ))}

            {/* Burst particles — memoised positions */}
            {burstData.map((b, i) => (
              <motion.div key={`burst-${i}`} className="absolute"
                initial={{ x:0, y:0, scale:0, opacity:0 }}
                animate={{ x:b.x, y:[b.y, b.y+b.yExtra], scale:[0,2,1.7], opacity:[0,1,0.88,0], rotate:[0,(i*47)%720] }}
                transition={{ duration:2.6, delay:i*0.006, ease:'easeOut' }}
              >
                <div style={{ width:'11px', height:'7px', borderRadius:'50%', background:b.color, boxShadow:`0 0 11px ${b.color}` }} />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Fireworks */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {lsFwPositions.map((pos, pi) => (
              <React.Fragment key={`ls-fw-${pi}`}>
                {lsFwSparks[pi].map((s, si) => (
                  <motion.div key={`ls-spark-${pi}-${si}`} className="absolute z-51 rounded-full"
                    style={{ left:`${pos.x}%`, top:`${pos.y}%`, width:6, height:6, background:s.color }}
                    initial={{ x:0, y:0, scale:0, opacity:0 }}
                    animate={{ x:s.x, y:s.y, scale:[0,1.4,0], opacity:[0,1,0] }}
                    transition={{ duration:1.2, delay:s.delay, ease:'easeOut' }}
                  />
                ))}
                {lsFwRings[pi].map((r, ri) => (
                  <div key={`ls-ring-${pi}-${ri}`} className="absolute rounded-full border-2"
                    style={{ left:`${pos.x}%`, top:`${pos.y}%`, width:20, height:20, borderColor:r.color,
                      animation:`ls-pop-ring 0.9s ease-out ${r.delay}s both` }}
                  />
                ))}
                <div key={`ls-flash-${pi}`} className="absolute rounded-full"
                  style={{ left:`${pos.x}%`, top:`${pos.y}%`, width:40, height:40,
                    background:`radial-gradient(circle, ${lsColors[pi%lsColors.length]}cc, transparent)`,
                    filter:'blur(8px)', animation:'ls-flash 0.5s ease-out both' }}
                />
              </React.Fragment>
            ))}
            {lsOrbs.map((orb, i) => (
              <div key={`ls-orb-${i}`} className="absolute rounded-full z-49"
                style={{ left:`${orb.x}%`, bottom:'20%', width:10, height:10,
                  background:orb.color, boxShadow:`0 0 14px ${orb.color}`,
                  '--dx':`${orb.dx}px`, animation:`ls-orb-float ${orb.dur}s ease-out ${orb.delay}s both`
                } as React.CSSProperties}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Success message */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div
            initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
            transition={{ delay:0.5, duration:0.8 }}
            className="absolute bottom-20 left-0 right-0 text-center z-40"
          >
            <h2 className="text-4xl md:text-5xl font-bold drop-shadow-2xl mb-2"
              style={{ background:'linear-gradient(135deg, #ff6b35, #ffd700, #8bc34a, #ff6b35)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                filter:'drop-shadow(0 0 20px rgba(255,107,53,0.8))' }}>
              You&apos;ve Transformed
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
