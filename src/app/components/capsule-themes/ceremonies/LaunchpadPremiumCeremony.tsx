/**
 * Launchpad - Storm's Fury Ceremony (Premium)
 * Performance-optimised: CSS bolt flashes (no React state re-renders), CSS orbit rings,
 * memoised random data, reduced SVG blur layers on mobile, simplified explosion fragments.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface LaunchpadPremiumCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function LaunchpadPremiumCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: LaunchpadPremiumCeremonyProps) {
  const [stage, setStage] = useState<'intro'|'gathering'|'lightning'|'sphere'|'explosion'|'radiance'|'outro'>('intro');
  const [completed, setCompleted] = useState(false);
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const timeline = [
      { time: 0,     action: () => setStage('intro') },
      { time: 1000,  action: () => setStage('gathering') },
      { time: 4000,  action: () => setStage('lightning') },
      { time: 7000,  action: () => setStage('sphere') },
      { time: 9000,  action: () => setStage('explosion') },
      { time: 11000, action: () => setStage('radiance') },
      { time: 13500, action: () => setStage('outro') },
      { time: 14000, action: () => { setCompleted(true); onComplete?.(); } },
    ];
    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    const failsafe = setTimeout(() => {
      setStage('outro'); setCompleted(true); onComplete?.();
    }, 15000);
    return () => { timeouts.forEach(clearTimeout); clearTimeout(failsafe); };
  }, []);

  // ── Palette ────────────────────────────────────────────────────────────────
  const lpColors = useMemo(() => ['#88ccff','#aaddff','#ffffff','#c8e6ff','#6699ff','#4488ff','#00aaff'], []);

  // ── Firework data ──────────────────────────────────────────────────────────
  const lpFwPositions = useMemo(() => [
    {x:10,y:18},{x:25,y:10},{x:42,y:20},{x:58,y:8},{x:72,y:18},{x:88,y:12},{x:18,y:32},{x:82,y:28},
  ].slice(0, isMobile ? 5 : 8), [isMobile]);
  const lpFwSparks = useMemo(() => lpFwPositions.map(() =>
    Array.from({length: isMobile ? 14 : 20}, (_, i) => {
      const a = (i / (isMobile ? 14 : 20)) * Math.PI * 2;
      const d = 50 + (i % 5) * 20;
      return { x: Math.cos(a)*d, y: Math.sin(a)*d, color: lpColors[i%lpColors.length], delay: i*0.04 };
    })
  ), [lpFwPositions, lpColors, isMobile]);
  const lpFwRings = useMemo(() => lpFwPositions.map(() =>
    Array.from({length: 3}, (_, i) => ({ delay: i*0.15, color: ['#88ccff','#ffffff','#aaddff'][i] }))
  ), [lpFwPositions]);
  const lpOrbs = useMemo(() => Array.from({length: isMobile ? 10 : 18}, (_, i) => ({
    x: 5+(i*5.5)%90, dx: (i%7-3)*18, dur: 2.5+(i%4)*0.5,
    delay: i*0.18, color: lpColors[i%lpColors.length]
  })), [lpColors, isMobile]);

  // ── Bolt path data — memoised so Math.random() doesn't run in render ───────
  const boltDefs = useMemo(() => [
    { startX:12, startY:8,  endX:50, endY:50, delay:0    },
    { startX:88, startY:12, endX:50, endY:50, delay:0.18 },
    { startX:28, startY:3,  endX:48, endY:52, delay:0.42 },
    { startX:72, startY:6,  endX:52, endY:48, delay:0.68 },
    { startX:18, startY:18, endX:49, endY:51, delay:0.95 },
    { startX:82, startY:15, endX:51, endY:49, delay:1.18 },
    { startX:50, startY:0,  endX:50, endY:50, delay:1.42 },
    { startX:8,  startY:22, endX:50, endY:50, delay:1.68 },
    { startX:92, startY:20, endX:50, endY:50, delay:1.94 },
    { startX:38, startY:10, endX:50, endY:50, delay:2.18 },
    { startX:62, startY:9,  endX:50, endY:50, delay:2.42 },
  ].map((bolt, _i) => {
    const deltaX = bolt.endX - bolt.startX;
    const deltaY = bolt.endY - bolt.startY;
    const distance = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    const segments = isMobile ? 5 : 8;
    // Deterministic jitter (seeded by index) — no Math.random() in render
    const pathPoints = Array.from({length: segments+1}, (_, j) => {
      const progress = j / segments;
      const baseX = progress * distance * 12;
      const jitter = (j===0||j===segments) ? 0 : ((j*7.3%10)-5)*3.5;
      return { x: baseX, y: jitter };
    });
    const pathD = pathPoints.map((p,idx)=>`${idx===0?'M':'L'} ${p.x} ${p.y}`).join(' ');
    // Branches (fewer on mobile)
    const branchDefs = isMobile ? [] : [
      { atSegment:2, angle:-55, length:distance*2.8 },
      { atSegment:4, angle:42,  length:distance*3.2 },
      { atSegment:6, angle:-38, length:distance*2.4 },
    ].map(br => {
      const bStart = pathPoints[Math.min(br.atSegment, pathPoints.length-1)];
      const branchSegs = 3;
      const bPoints = Array.from({length:branchSegs+1}, (_, k) => {
        const prog = k/branchSegs;
        const bx = bStart.x + prog*br.length*Math.cos(br.angle*Math.PI/180);
        const by = bStart.y + prog*br.length*Math.sin(br.angle*Math.PI/180);
        const bj = (k===0||k===branchSegs) ? 0 : ((k*5.9%8)-4)*2.5;
        return { x:bx, y:by+bj };
      });
      return bPoints.map((p,idx)=>`${idx===0?'M':'L'} ${p.x} ${p.y}`).join(' ');
    });
    return { ...bolt, deltaX, deltaY, distance, angle, pathD, branchDefs };
  }), [isMobile]);

  // ── Absorption particle data ───────────────────────────────────────────────
  const absorbCount = isMobile ? 20 : 40;
  const absorbData = useMemo(() => Array.from({length: absorbCount}, (_, i) => {
    const startAngle = (i / absorbCount) * 360;
    const startDist  = 180 + (i % 5) * 16;
    return {
      startX: Math.cos(startAngle*Math.PI/180)*startDist,
      startY: Math.sin(startAngle*Math.PI/180)*startDist,
      dur: 1.2 + (i%5)*0.12,
    };
  }), [absorbCount]);

  // ── Explosion blast data ───────────────────────────────────────────────────
  const blastCount = isMobile ? 35 : 70;
  const blastData = useMemo(() => Array.from({length: blastCount}, (_, i) => {
    const angle = (i/blastCount)*Math.PI*2;
    const dist  = 110 + (i%9)*20;
    return { x: Math.cos(angle)*dist, y: Math.sin(angle)*dist };
  }), [blastCount]);

  // ── Explosion fragment data — simple rotated divs, no SVG pathLength ────────
  const fragCount = isMobile ? 12 : 24;
  const fragData = useMemo(() => Array.from({length: fragCount}, (_, i) => ({
    angle: (i/fragCount)*360,
    length: 100 + (i%6)*20,
  })), [fragCount]);

  // ── Orbit rings ────────────────────────────────────────────────────────────
  const orbitRings = useMemo(() => [0,1,2].map(ring => {
    const radius = 190 + ring*115;
    const count  = isMobile ? (12+ring*7) : (42+ring*20);
    const dur    = 6.8 + ring*1.9;
    const colors = ['#88ccff','#aaddff','#c8e6ff','#ffffff'];
    return {
      dur,
      particles: Array.from({length:count}, (_,i) => {
        const a = (i/count)*2*Math.PI;
        return { x: Math.cos(a)*radius, y: Math.sin(a)*radius, color: colors[i%4] };
      }),
    };
  }), [isMobile]);

  // ── Burst data ─────────────────────────────────────────────────────────────
  const burstCount = isMobile ? 42 : 85;
  const burstData = useMemo(() => {
    const colors = ['#88ccff','#aaddff','#c8e6ff'];
    return Array.from({length:burstCount}, (_,i) => {
      const angle = (i/burstCount)*Math.PI*2;
      const dist  = 145 + (i%10)*31;
      return { x: Math.cos(angle)*dist, y: Math.sin(angle)*dist, yExtra: 100+(i%6)*7, color: colors[i%3] };
    });
  }, [burstCount]);

  // ── Confetti ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (stage !== 'radiance') return;
    const colors = ['#88ccff','#aaddff','#ffffff','#c8e6ff','#6699ff'];
    const base = { spread:80, ticks:200, gravity:0.9, decay:0.93, startVelocity:38, colors };
    confetti({ ...base, particleCount: isMobile?70:120, angle:60,  origin:{ x:isMobile?0.12:0, y:0.7 } });
    confetti({ ...base, particleCount: isMobile?70:120, angle:120, origin:{ x:isMobile?0.88:1, y:0.7 } });
    if (!isMobile) {
      const t1 = setTimeout(()=>confetti({...base,particleCount:80, angle:90, origin:{x:0.5,y:0.6}}), 380);
      const t2 = setTimeout(()=>{
        confetti({...base,particleCount:100,angle:60, origin:{x:0,y:0.65}});
        confetti({...base,particleCount:100,angle:120,origin:{x:1,y:0.65}});
      }, 950);
      return ()=>{ clearTimeout(t1); clearTimeout(t2); };
    }
  }, [stage]);

  // Lightning stage duration for CSS animations
  const inLightning = stage === 'lightning' || stage === 'sphere';

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#141428] to-[#1a1a35]">
      <style>{`
        @keyframes lp-pop-ring {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(4.4); opacity: 0; }
        }
        @keyframes lp-flash {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(3); opacity: 0; }
        }
        @keyframes lp-orb-float {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateY(-180px) translateX(var(--dx)); opacity: 0; }
        }
        @keyframes lp-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        /* Each bolt flashes once at its delay — replaces setLightningFlashes React state */
        @keyframes lp-bolt-flash {
          0%   { opacity: 0; }
          8%   { opacity: 1; }
          60%  { opacity: 0.85; }
          100% { opacity: 0; }
        }
        /* Whole-screen flash overlay */
        @keyframes lp-screen-flash {
          0%,100% { opacity: 0; }
          50%     { opacity: 0.6; }
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0" style={{
        background: stage === 'explosion'
          ? 'radial-gradient(ellipse at 50% 50%, #6a6ab0 0%, #3a3a70 30%, #1a1a35 60%, #0a0a1a 95%)'
          : stage === 'sphere' || stage === 'lightning'
          ? 'radial-gradient(ellipse at 50% 45%, #1a1a35 0%, #0f0f20 70%, #0a0a1a 95%)'
          : stage === 'gathering'
          ? 'radial-gradient(ellipse at 50% 40%, #141428 0%, #0f0f20 70%, #0a0a1a 100%)'
          : 'radial-gradient(ellipse at 50% 50%, #141428 0%, #0a0a1a 80%)'
      }} />
      <AnimatePresence>
        {stage === 'radiance' && !completed && (
          <motion.div className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.85, 1, 0.85] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, repeat: 1 }}
            style={{ background: 'radial-gradient(ellipse at 50% 50%, #3a3a70 0%, #1a1a35 50%, #0a0a1a 90%)' }}
          />
        )}
      </AnimatePresence>

      {/* Screen flash overlay — CSS animation, no React state */}
      {inLightning && (
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(200,220,255,0.4) 0%, transparent 60%)',
          animationName: 'lp-screen-flash',
          animationDuration: '0.42s',
          animationIterationCount: '6',
          animationTimingFunction: 'ease-in-out',
          opacity: 0,
        }} />
      )}

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity:0, y:-50 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            transition={{ duration:0.6 }}
            className="absolute top-16 left-0 right-0 text-center z-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-blue-100 drop-shadow-2xl">Storm&apos;s Fury</h1>
            <p className="text-blue-200/80 mt-3 text-base">Unleash your power</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0">

        {/* STORM CLOUDS — halved count on mobile, lower blur */}
        <AnimatePresence>
          {(stage==='gathering'||stage==='lightning'||stage==='sphere') && (
            <>
              {[...Array(isMobile ? 6 : 12)].map((_,i) => (
                <motion.div key={`cloud-dark-${i}`} className="absolute" style={{
                  left:`${-25+i*(isMobile?22:11)}%`, top:`${8+(i%4)*9}%`,
                  width:`${200+(i%4)*50}px`, height:`${90+(i%3)*30}px`,
                  background:`radial-gradient(ellipse, rgba(35,35,60,1) 0%, rgba(22,22,42,0.85) 60%, transparent 95%)`,
                  borderRadius:'50%', border:'2px solid rgba(50,50,80,0.5)',
                  filter: isMobile ? 'blur(6px)' : 'blur(12px)',
                  willChange: 'transform',
                }}
                  initial={{ opacity:0, x:-100, scale:0.1 }}
                  animate={{ opacity:stage==='sphere'?[1,0.85]:[0,1], x:[0,0], scale:[0.1,1.4,1.2], y:[0,15,0] }}
                  exit={{ opacity:0 }}
                  transition={{ opacity:{duration:stage==='sphere'?0.8:4}, x:{duration:14+i*2,repeat:Infinity,repeatType:'reverse'}, scale:{duration:4}, y:{duration:10+i,repeat:Infinity,repeatType:'reverse'} }}
                />
              ))}
              {[...Array(isMobile ? 5 : 10)].map((_,i) => (
                <motion.div key={`cloud-light-${i}`} className="absolute" style={{
                  left:`${2+i*(isMobile?24:12)}%`, top:`${28+(i%3)*14}%`,
                  width:`${180+(i%4)*40}px`, height:`${80+(i%3)*25}px`,
                  background:`radial-gradient(ellipse, rgba(65,65,105,1) 0%, rgba(45,45,80,0.85) 65%, transparent 98%)`,
                  borderRadius:'50%', filter: isMobile ? 'blur(5px)' : 'blur(10px)',
                  zIndex:5, willChange:'transform',
                }}
                  initial={{ opacity:0, x:80, scale:0.2 }}
                  animate={{ opacity:stage==='sphere'?[1,0.8]:[0,1], x:[0,0], scale:[0.2,1.3,1.15], y:[0,12,0] }}
                  exit={{ opacity:0 }}
                  transition={{ opacity:{duration:stage==='sphere'?0.8:4}, x:{duration:12+i*2,repeat:Infinity,repeatType:'reverse'}, scale:{duration:4}, y:{duration:9+i,repeat:Infinity,repeatType:'reverse'} }}
                />
              ))}
              {[...Array(isMobile ? 3 : 6)].map((_,i) => (
                <motion.div key={`mist-${i}`} className="absolute" style={{
                  left:`${-10+i*(isMobile?44:22)}%`, top:`${55+(i%2)*15}%`,
                  width:`${240+(i%3)*50}px`, height:`${100+(i%3)*30}px`,
                  background:`radial-gradient(ellipse, rgba(75,75,115,0.85) 0%, transparent 95%)`,
                  borderRadius:'50%', filter: isMobile ? 'blur(7px)' : 'blur(14px)',
                  zIndex:8, willChange:'transform',
                }}
                  initial={{ opacity:0, scale:0.3 }}
                  animate={{ opacity:stage==='sphere'?[0.9,0.7]:[0,0.9], x:[0,0], scale:[0.3,1.25,1.1], y:[0,8,0] }}
                  exit={{ opacity:0 }}
                  transition={{ opacity:{duration:stage==='sphere'?0.8:4}, x:{duration:15+i*3,repeat:Infinity,repeatType:'reverse'}, scale:{duration:4}, y:{duration:11+i,repeat:Infinity,repeatType:'reverse'} }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* LIGHTNING BOLTS — CSS animation, no React state re-renders */}
        <AnimatePresence>
          {inLightning && boltDefs.map((bolt, i) => (
            <div
              key={`lightning-bolt-${i}`}
              className="absolute z-30"
              style={{
                left:`${bolt.startX}%`, top:`${bolt.startY}%`,
                pointerEvents:'none',
                animationName:'lp-bolt-flash',
                animationDuration:'0.22s',
                animationDelay:`${bolt.delay}s`,
                animationFillMode:'both',
                animationTimingFunction:'ease-out',
                opacity:0,
              }}
            >
              <svg
                width={bolt.distance*12+100} height={bolt.distance*12+100}
                style={{ position:'absolute', left:'-50px', top:'-50px', overflow:'visible',
                  transform:`rotate(${bolt.angle}deg)`, transformOrigin:'50px 50px' }}
              >
                {/* Mobile: 2 layers only (no heavy outer blur). Desktop: full 4 layers. */}
                {!isMobile && (
                  <path d={bolt.pathD} stroke="rgba(100,150,255,0.5)" strokeWidth="32" fill="none"
                    strokeLinecap="round" filter="url(#blur16)" transform="translate(50,50)" />
                )}
                {!isMobile && (
                  <path d={bolt.pathD} stroke="rgba(136,180,255,0.8)" strokeWidth="18" fill="none"
                    strokeLinecap="round" filter="url(#blur8)" transform="translate(50,50)" />
                )}
                <path d={bolt.pathD} stroke="rgba(170,210,255,0.95)" strokeWidth="10" fill="none"
                  strokeLinecap="round" filter="url(#blur3)" transform="translate(50,50)" />
                <path d={bolt.pathD} stroke="#ffffff" strokeWidth="5" fill="none"
                  strokeLinecap="round" transform="translate(50,50)" />
                {/* Branch bolts — desktop only */}
                {bolt.branchDefs.map((bd, bi) => (
                  <g key={`branch-${bi}`}>
                    <path d={bd} stroke="rgba(136,180,255,0.7)" strokeWidth="8" fill="none"
                      strokeLinecap="round" filter="url(#blur4)" transform="translate(50,50)" />
                    <path d={bd} stroke="#ffffff" strokeWidth="2.5" fill="none"
                      strokeLinecap="round" transform="translate(50,50)" />
                  </g>
                ))}
                {/* Shared SVG filters */}
                <defs>
                  <filter id="blur3"><feGaussianBlur stdDeviation="3"/></filter>
                  {!isMobile && <filter id="blur4"><feGaussianBlur stdDeviation="4"/></filter>}
                  {!isMobile && <filter id="blur8"><feGaussianBlur stdDeviation="8"/></filter>}
                  {!isMobile && <filter id="blur16"><feGaussianBlur stdDeviation="16"/></filter>}
                </defs>
              </svg>
            </div>
          ))}
        </AnimatePresence>

        {/* ENERGY SPHERE */}
        <AnimatePresence>
          {(stage==='sphere'||stage==='explosion') && (
            <motion.div
              className="absolute left-1/2 top-1/2 z-35"
              style={{ transform:'translate(-50%,-50%)' }}
              initial={{ scale:0, opacity:0 }}
              animate={{ scale: stage==='explosion'?[1,0.6,0.4,8]:[0,0.4,0.7,1,1.15,1], opacity: stage==='explosion'?[1,1,1,0]:[0,0.6,0.85,1] }}
              exit={{ opacity:0 }}
              transition={{ scale:{ duration:stage==='explosion'?0.9:2, ease:stage==='explosion'?[0.6,0,0.2,1]:[0.4,0,0.2,1], times:stage==='explosion'?[0,0.15,0.3,1]:undefined }, opacity:{ duration:stage==='explosion'?0.9:2 } }}
            >
              {stage==='sphere' && (
                <>
                  {/* Absorption particles — memoised, reduced on mobile */}
                  {absorbData.map((p, i) => (
                    <motion.div key={`absorb-${i}`} className="absolute left-1/2 top-1/2"
                      style={{ width:6, height:6, marginLeft:'-3px', marginTop:'-3px',
                        borderRadius:'50%', background:i%2===0?'#ffffff':'#aaddff',
                        boxShadow:`0 0 12px ${i%2===0?'#ffffff':'#aaddff'}`, willChange:'transform,opacity' }}
                      animate={{ x:[p.startX,p.startX*0.6,0], y:[p.startY,p.startY*0.6,0], scale:[0,1.2,1.5,0.8], opacity:[0,1,1,0] }}
                      transition={{ duration:p.dur, delay:i*0.04, repeat:Infinity, ease:[0.4,0,0.2,1] }}
                    />
                  ))}
                  {/* Sparkles around sphere (8 — lightweight) */}
                  {[...Array(8)].map((_,i) => {
                    const a = (i/8)*360;
                    return (
                      <motion.div key={`sparkle-${i}`} className="absolute left-1/2 top-1/2"
                        style={{ width:8,height:8,marginLeft:'-4px',marginTop:'-4px',borderRadius:'50%',
                          background:'#ffffff',boxShadow:'0 0 20px rgba(136,204,255,1)',willChange:'transform,opacity' }}
                        animate={{ x:[Math.cos(a*Math.PI/180)*95,Math.cos(a*Math.PI/180)*105,Math.cos(a*Math.PI/180)*95],
                          y:[Math.sin(a*Math.PI/180)*95,Math.sin(a*Math.PI/180)*105,Math.sin(a*Math.PI/180)*95],
                          scale:[1,1.5,1], opacity:[0.6,1,0.6] }}
                        transition={{ duration:1.2,repeat:Infinity,delay:i*0.15,ease:'easeInOut' }}
                      />
                    );
                  })}
                </>
              )}

              {/* Outer glow ring */}
              <motion.div className="absolute left-1/2 top-1/2" style={{
                width:240,height:240,marginLeft:'-120px',marginTop:'-120px',borderRadius:'50%',
                background:'radial-gradient(circle, transparent 35%, rgba(136,204,255,0.3) 45%, rgba(136,204,255,0.6) 48%, rgba(136,204,255,0.3) 52%, transparent 60%)',
                boxShadow:'0 0 80px rgba(136,204,255,0.8)', willChange:'transform' }}
                animate={{ rotate:[0,360], scale:stage==='sphere'?[1,1.05,1]:1 }}
                transition={{ rotate:{duration:4,repeat:Infinity,ease:'linear'}, scale:{duration:1,repeat:stage==='sphere'?Infinity:0} }}
              />
              {/* Main sphere body */}
              <motion.div className="absolute left-1/2 top-1/2" style={{
                width:180,height:180,marginLeft:'-90px',marginTop:'-90px',borderRadius:'50%',
                background:'radial-gradient(circle, rgba(200,230,255,0.95) 0%, rgba(136,204,255,0.7) 60%, transparent 100%)',
                boxShadow:'0 0 100px rgba(136,204,255,1)',
                filter: isMobile ? 'blur(4px)' : 'blur(8px)' }}
                animate={{ scale:stage==='sphere'?[1,1.12,1]:1, opacity:stage==='sphere'?[0.9,1,0.9]:0.95 }}
                transition={{ duration:0.9,repeat:stage==='sphere'?Infinity:0 }}
              />
              {/* Bright core */}
              <motion.div className="absolute left-1/2 top-1/2" style={{
                width:100,height:100,marginLeft:'-50px',marginTop:'-50px',borderRadius:'50%',
                background:'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(200,230,255,0.9) 70%, transparent 100%)',
                boxShadow:'0 0 120px rgba(255,255,255,1), 0 0 180px rgba(136,204,255,1)' }}
                animate={{ scale:stage==='sphere'?[1,1.25,1]:1 }}
                transition={{ duration:0.7,repeat:stage==='sphere'?Infinity:0 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* EXPLOSION */}
        <AnimatePresence>
          {stage==='explosion' && (
            <>
              {/* White flash */}
              <motion.div className="absolute left-1/2 top-1/2 z-34" style={{ transform:'translate(-50%,-50%)' }}
                initial={{ scale:0.4, opacity:1 }}
                animate={{ scale:[0.4,2,15], opacity:[1,1,0.7,0] }}
                transition={{ duration:0.8, ease:'easeOut', times:[0,0.12,0.5,1] }}
              >
                <div style={{ width:300,height:300,marginLeft:'-150px',marginTop:'-150px',borderRadius:'50%',
                  background:'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(200,230,255,0.95) 50%, rgba(136,204,255,0.85) 75%, transparent 100%)',
                  boxShadow:'0 0 250px rgba(255,255,255,1)',
                  filter: isMobile ? 'blur(18px)' : 'blur(35px)' }} />
              </motion.div>

              {/* Shockwave rings */}
              {[0,0.1,0.2,0.3,0.4].map((delay,i) => (
                <motion.div key={`shockwave-${i}`} className="absolute left-1/2 top-1/2 z-33"
                  style={{ width:150,height:150,marginLeft:'-75px',marginTop:'-75px',borderRadius:'50%',
                    border:`${10-i*1.8}px solid rgba(136,204,255,${0.95-i*0.15})`,
                    boxShadow:`0 0 ${80-i*12}px rgba(136,204,255,${0.95-i*0.15})`, willChange:'transform' }}
                  initial={{ scale:0, opacity:1 }}
                  animate={{ scale:[0,20], opacity:[1,0.75,0.5,0] }}
                  transition={{ duration:1.4, delay, ease:[0.2,0,0.2,1] }}
                />
              ))}

              {/* Blast particles — memoised */}
              {blastData.map((b, i) => (
                <motion.div key={`blast-${i}`} className="absolute left-1/2 top-1/2 z-32"
                  initial={{ x:0, y:0, opacity:0, scale:0 }}
                  animate={{ x:b.x, y:b.y, opacity:[0,1,0.9,0.6,0], scale:[0,2.8,2.2,1.5,0], rotate:[0,(i*47)%360] }}
                  transition={{ duration:1.3, delay:i*0.01, ease:'easeOut' }}
                >
                  <div style={{ width:14,height:14,marginLeft:'-7px',marginTop:'-7px',borderRadius:'50%',
                    background:i%3===0?'#ffffff':i%3===1?'#c8e6ff':'#88ccff',
                    boxShadow:`0 0 ${i%3===0?25:18}px ${i%3===0?'#ffffff':i%3===1?'#c8e6ff':'#88ccff'}` }} />
                </motion.div>
              ))}

              {/* Lightning fragment lines — simple rotated divs (no pathLength SVG) */}
              {fragData.map((f, i) => (
                <motion.div key={`frag-${i}`} className="absolute left-1/2 top-1/2 z-31"
                  style={{ width:f.length, height:3, marginLeft:0, marginTop:'-1.5px',
                    transformOrigin:'left center', transform:`rotate(${f.angle}deg)`,
                    background:'linear-gradient(to right, rgba(136,204,255,0.9), rgba(255,255,255,0.8), transparent)',
                    borderRadius:'2px', filter:'blur(1px)', willChange:'transform,opacity' }}
                  initial={{ scaleX:0, opacity:0 }}
                  animate={{ scaleX:[0,1,0.9], opacity:[0,1,0.85,0] }}
                  transition={{ duration:0.6, delay:i*0.02, ease:'easeOut' }}
                />
              ))}

              {/* Electric haze */}
              <motion.div className="absolute left-1/2 top-1/2 z-30"
                style={{ width:200,height:200,marginLeft:'-100px',marginTop:'-100px',borderRadius:'50%',
                  background:'radial-gradient(circle, rgba(136,204,255,0.6) 0%, transparent 80%)',
                  filter: isMobile ? 'blur(25px)' : 'blur(50px)' }}
                initial={{ scale:0, opacity:0.8 }}
                animate={{ scale:[0,12], opacity:[0.8,0.5,0] }}
                transition={{ duration:1.2, ease:'easeOut' }}
              />
            </>
          )}
        </AnimatePresence>
      </div>

      {/* RADIANCE */}
      <AnimatePresence>
        {stage==='radiance' && (
          <>
            {[...Array(isMobile ? 28 : 48)].map((_,i) => {
              const total = isMobile ? 28 : 48;
              const angle = (i/total)*360;
              const colors = ['rgba(136,204,255,1)','rgba(170,221,255,1)','rgba(200,230,255,1)','rgba(255,255,255,1)'];
              return (
                <motion.div key={`ray-${i}`} className="absolute" style={{
                  left:'50%', top:'50%', width:'200vw',
                  height:i%3===0?'11px':i%3===1?'8px':'9px',
                  marginLeft:'-100vw',
                  marginTop:i%3===0?'-5.5px':i%3===1?'-4px':'-4.5px',
                  background:`linear-gradient(to right, transparent, ${colors[i%4].replace('1)','0.94)')} 50%, transparent)`,
                  transformOrigin:'center center', transform:`rotate(${angle}deg)`, filter:'blur(2px)', willChange:'transform'
                }}
                  initial={{ scaleX:0, opacity:0 }}
                  animate={{ scaleX:[0,2.7,2.5], opacity:[0,1,0.96] }}
                  transition={{ duration:1.4, ease:'easeOut' }}
                />
              );
            })}

            {/* Central glow — viewport-fill fade, no blur animation */}
            <motion.div className="absolute inset-0 pointer-events-none"
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8 }}
              style={{
                background:'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.65) 0%, rgba(200,230,255,0.5) 18%, rgba(136,204,255,0.32) 38%, transparent 68%)',
                filter: isMobile ? 'blur(28px)' : 'blur(55px)',
              }}
            />

            {/* Orbiting particles — CSS rings */}
            {orbitRings.map((ring,ri) => (
              <div key={`orbit-ring-${ri}`} style={{
                position:'absolute', inset:0,
                animation:`lp-orbit ${ring.dur}s linear infinite`,
                transformOrigin:'center center', willChange:'transform'
              }}>
                {ring.particles.map((p,i) => (
                  <div key={i} style={{
                    position:'absolute',
                    left:`calc(50% + ${p.x}px)`, top:`calc(50% + ${p.y}px)`,
                    width:isMobile?5:8, height:isMobile?5:8,
                    borderRadius:'50%', background:p.color,
                    boxShadow:`0 0 ${isMobile?8:15}px ${p.color}`,
                    transform:'translate(-50%,-50%)'
                  }} />
                ))}
              </div>
            ))}

            {/* Burst particles */}
            {burstData.map((b,i) => (
              <motion.div key={`burst-${i}`} className="absolute"
                initial={{ x:0, y:0, scale:0, opacity:0 }}
                animate={{ x:b.x, y:[b.y,b.y+b.yExtra], scale:[0,2.1,1.8], opacity:[0,1,0.9,0], rotate:[0,(i*47)%720] }}
                transition={{ duration:2.7, delay:i*0.006, ease:'easeOut' }}
              >
                <div style={{ width:12,height:8,borderRadius:'50%',background:b.color,boxShadow:`0 0 12px ${b.color}` }} />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Fireworks */}
      <AnimatePresence>
        {stage==='radiance' && (
          <>
            {lpFwPositions.map((pos,pi) => (
              <React.Fragment key={`lp-fw-${pi}`}>
                {lpFwSparks[pi].map((s,si) => (
                  <motion.div key={`lp-spark-${pi}-${si}`} className="absolute z-51 rounded-full"
                    style={{ left:`${pos.x}%`, top:`${pos.y}%`, width:6, height:6, background:s.color }}
                    initial={{ x:0, y:0, scale:0, opacity:0 }}
                    animate={{ x:s.x, y:s.y, scale:[0,1.4,0], opacity:[0,1,0] }}
                    transition={{ duration:1.2, delay:s.delay, ease:'easeOut' }}
                  />
                ))}
                {lpFwRings[pi].map((r,ri) => (
                  <div key={`lp-ring-${pi}-${ri}`} className="absolute rounded-full border-2"
                    style={{ left:`${pos.x}%`, top:`${pos.y}%`, width:20, height:20, borderColor:r.color,
                      animation:`lp-pop-ring 0.9s ease-out ${r.delay}s both` }}
                  />
                ))}
                <div key={`lp-flash-${pi}`} className="absolute rounded-full"
                  style={{ left:`${pos.x}%`, top:`${pos.y}%`, width:40, height:40,
                    background:`radial-gradient(circle, ${lpColors[pi%lpColors.length]}cc, transparent)`,
                    filter:'blur(8px)', animation:'lp-flash 0.5s ease-out both' }}
                />
              </React.Fragment>
            ))}
            {lpOrbs.map((orb,i) => (
              <div key={`lp-orb-${i}`} className="absolute rounded-full z-49"
                style={{ left:`${orb.x}%`, bottom:'20%', width:10, height:10,
                  background:orb.color, boxShadow:`0 0 14px ${orb.color}`,
                  '--dx':`${orb.dx}px`, animation:`lp-orb-float ${orb.dur}s ease-out ${orb.delay}s both`
                } as React.CSSProperties}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Success message */}
      <AnimatePresence>
        {stage==='radiance' && (
          <motion.div
            initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
            transition={{ delay:0.5, duration:0.8 }}
            className="absolute bottom-20 left-0 right-0 text-center z-40"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-blue-100 drop-shadow-2xl mb-3">
              Unstoppable Force
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
