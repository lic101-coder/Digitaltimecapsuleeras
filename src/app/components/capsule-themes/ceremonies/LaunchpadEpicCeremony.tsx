/**
 * Launchpad - To the Stars Ceremony (Epic)
 * Performance-optimised: memoised star/smoke/spark data, slower flame durations on mobile,
 * simplified vapor trail, non-rotating nebula blur layers, CSS orbit rings.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface LaunchpadEpicCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function LaunchpadEpicCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: LaunchpadEpicCeremonyProps) {
  const [stage, setStage] = useState<'intro'|'countdown'|'liftoff'|'ascent'|'space'|'destination'|'radiance'|'outro'>('intro');
  const [completed, setCompleted] = useState(false);
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const timeline = [
      { time: 0,     action: () => setStage('intro') },
      { time: 1000,  action: () => setStage('countdown') },
      { time: 3200,  action: () => setStage('liftoff') },
      { time: 6400,  action: () => setStage('ascent') },
      { time: 9600,  action: () => setStage('space') },
      { time: 12400, action: () => setStage('destination') },
      { time: 14400, action: () => setStage('radiance') },
      { time: 16700, action: () => setStage('outro') },
      { time: 17000, action: () => { setCompleted(true); onComplete?.(); } },
    ];
    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    const failsafe = setTimeout(() => {
      setStage('outro'); setCompleted(true); onComplete?.();
    }, 18000);
    return () => { timeouts.forEach(clearTimeout); clearTimeout(failsafe); };
  }, []);

  // ── Palette ────────────────────────────────────────────────────────────────
  const leColors = useMemo(() => ['#8a2be2','#ff1493','#6495ed','#ffffff','#c084fc','#f472b6','#a78bfa'], []);

  // ── Firework data ──────────────────────────────────────────────────────────
  const leFwPositions = useMemo(() => [
    {x:10,y:18},{x:25,y:10},{x:42,y:20},{x:58,y:8},{x:72,y:18},{x:88,y:12},{x:18,y:32},{x:82,y:28},
  ].slice(0, isMobile ? 5 : 8), [isMobile]);
  const leFwSparks = useMemo(() => leFwPositions.map(() =>
    Array.from({length: isMobile ? 14 : 20}, (_, i) => {
      const a = (i/(isMobile?14:20))*Math.PI*2;
      const d = 50+(i%5)*20;
      return { x:Math.cos(a)*d, y:Math.sin(a)*d, color:leColors[i%leColors.length], delay:i*0.04 };
    })
  ), [leFwPositions, leColors, isMobile]);
  const leFwRings = useMemo(() => leFwPositions.map(() =>
    Array.from({length:3}, (_,i) => ({ delay:i*0.15, color:['#8a2be2','#ff1493','#6495ed'][i] }))
  ), [leFwPositions]);
  const leOrbs = useMemo(() => Array.from({length: isMobile?10:18}, (_,i) => ({
    x:5+(i*5.5)%90, dx:(i%7-3)*18, dur:2.5+(i%4)*0.5,
    delay:i*0.18, color:leColors[i%leColors.length]
  })), [leColors, isMobile]);

  // ── Star data — memoised positions, no Math.random in render ──────────────
  const starCount = isMobile ? 50 : 100;
  const starData = useMemo(() => Array.from({length: starCount}, (_,i) => ({
    left:   (i * 7.3) % 100,
    top:    (i * 11.7) % 100,
    size:   1 + (i % 3),
    glow:   2 + (i % 4),
    glowA:  0.6 + (i % 4) * 0.1,
    delay:  i * 0.01,
  })), [starCount]);

  // ── Smoke data — memoised, reduced on mobile ───────────────────────────────
  const smokeCount = isMobile ? 10 : 25;
  const smokeData = useMemo(() => Array.from({length: smokeCount}, (_,i) => ({
    w:   35 + (i % 6) * 8,
    h:   35 + (i % 6) * 8,
    op:  0.5 + (i % 4) * 0.075,
    xEnd: ((i % 9) - 4) * 20,
    yEnd: 90 + (i % 5) * 14,
    dur:  2.2 + (i % 5) * 0.16,
    delay: i * 0.09,
  })), [smokeCount]);

  // ── Spark/ember data — memoised ────────────────────────────────────────────
  const sparkData = useMemo(() => Array.from({length: 20}, (_,i) => ({
    xEnd: ((i % 11) - 5) * 10,
    yEnd: 60 + (i % 5) * 18,
    dur:  0.9 + (i % 4) * 0.175,
    delay: i * 0.06,
    color: (['#ffaa44','#ff8833','#ffcc66'] as const)[i%3],
  })), []);

  // ── Vapor trail — static positions, no per-element animation ──────────────
  const trailCount = isMobile ? 15 : 30;

  // ── Orbit rings ────────────────────────────────────────────────────────────
  const orbitRings = useMemo(() => [0,1,2].map(ring => {
    const radius = 195 + ring*120;
    const count  = isMobile ? (14+ring*7) : (44+ring*22);
    const dur    = 7 + ring*2;
    const colors = ['#8a2be2','#ff1493','#6495ed','#ffffff'];
    return {
      dur,
      particles: Array.from({length:count}, (_,i) => {
        const a = (i/count)*2*Math.PI;
        return { x:Math.cos(a)*radius, y:Math.sin(a)*radius, color:colors[i%4] };
      }),
    };
  }), [isMobile]);

  // ── Burst data ─────────────────────────────────────────────────────────────
  const burstCount = isMobile ? 45 : 90;
  const burstData = useMemo(() => {
    const colors = ['#8a2be2','#ff1493','#6495ed'];
    return Array.from({length:burstCount}, (_,i) => {
      const angle = (i/burstCount)*Math.PI*2;
      const dist  = 150 + (i%10)*32;
      return { x:Math.cos(angle)*dist, y:Math.sin(angle)*dist, yExtra:100+(i%6)*8, color:colors[i%3] };
    });
  }, [burstCount]);

  // ── Confetti ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (stage !== 'radiance') return;
    const colors = ['#8a2be2','#ff1493','#6495ed','#ffffff','#c084fc','#f472b6','#a78bfa'];
    const base = { spread:80, ticks:200, gravity:0.9, decay:0.93, startVelocity:38, colors };
    confetti({ ...base, particleCount:isMobile?70:120, angle:60,  origin:{x:isMobile?0.12:0, y:0.7} });
    confetti({ ...base, particleCount:isMobile?70:120, angle:120, origin:{x:isMobile?0.88:1, y:0.7} });
    if (!isMobile) {
      const t1 = setTimeout(()=>confetti({...base,particleCount:80, angle:90, origin:{x:0.5,y:0.6}}), 380);
      const t2 = setTimeout(()=>{
        confetti({...base,particleCount:100,angle:60, origin:{x:0,y:0.65}});
        confetti({...base,particleCount:100,angle:120,origin:{x:1,y:0.65}});
      }, 950);
      return ()=>{ clearTimeout(t1); clearTimeout(t2); };
    }
  }, [stage]);

  // Flame animation duration — slower on mobile to reduce compositing cost
  const flameDurFast = isMobile ? 0.32 : 0.18;
  const flameDurMid  = isMobile ? 0.28 : 0.15;
  const flameDurCore = isMobile ? 0.26 : 0.13;
  const flameDurHot  = isMobile ? 0.24 : 0.11;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <style>{`
        @keyframes le-pop-ring {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(4.4); opacity: 0; }
        }
        @keyframes le-flash {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(3); opacity: 0; }
        }
        @keyframes le-orb-float {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateY(-180px) translateX(var(--dx)); opacity: 0; }
        }
        @keyframes le-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {/* Dynamic background — opacity overlay for radiance */}
      <div className="absolute inset-0" style={{
        background: stage==='destination'||stage==='space'
          ? 'radial-gradient(ellipse at 50% 40%, #0a0a28 0%, #050515 60%, #000510 95%)'
          : stage==='ascent'
          ? 'linear-gradient(to bottom, #000510 0%, #0a1428 30%, #1a3450 60%, #4a7db4 90%, #87CEEB 100%)'
          : stage==='liftoff'
          ? 'linear-gradient(to bottom, #4a7db4 0%, #87CEEB 40%, #b0d4e8 70%, #d4e8f0 100%)'
          : 'linear-gradient(to bottom, #87CEEB 0%, #b0d4e8 50%, #d4e8f0 100%)'
      }} />
      <AnimatePresence>
        {(stage==='radiance') && !completed && (
          <motion.div className="absolute inset-0"
            initial={{ opacity:0 }}
            animate={{ opacity:[0,1,0.85,1,0.85] }}
            exit={{ opacity:0 }}
            transition={{ duration:1.6, repeat:1 }}
            style={{ background:'radial-gradient(ellipse at 50% 50%, #2a2570 0%, #0a0a28 50%, #000510 90%)' }}
          />
        )}
      </AnimatePresence>

      {/* Stars — memoised positions, reduced count on mobile */}
      <AnimatePresence>
        {(stage==='space'||stage==='destination'||stage==='radiance') && (
          <>
            {starData.map((s,i) => (
              <motion.div key={`star-${i}`} className="absolute" style={{
                left:`${s.left}%`, top:`${s.top}%`,
                width:`${s.size}px`, height:`${s.size}px`, borderRadius:'50%', background:'#ffffff',
                boxShadow:`0 0 ${s.glow}px rgba(255,255,255,${s.glowA})`, willChange:'opacity'
              }}
                initial={{ opacity:0, scale:0 }}
                animate={{ opacity:completed?0:[0,1,0.8,1], scale:completed?1:[0,1,0.9,1] }}
                transition={{ duration:1.5, delay:s.delay, repeat:(stage==='destination'||stage==='radiance')&&!completed?3:0 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Title */}
      <AnimatePresence>
        {stage==='intro' && (
          <motion.div initial={{ opacity:0, y:-50 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            transition={{ duration:0.6 }}
            className="absolute top-16 left-0 right-0 text-center z-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-2xl">To the Stars</h1>
            <p className="text-white/80 mt-3 text-base">Your journey begins</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0">

        {/* LAUNCHPAD */}
        <AnimatePresence>
          {(stage==='countdown'||stage==='liftoff') && (
            <motion.div className="absolute z-20"
              style={{ left:'50%', bottom:'5%', transform:'translateX(-50%)' }}
              exit={{ opacity:0, y:50 }} transition={{ exit:{ duration:0.8 } }}
            >
              <div style={{ position:'absolute', bottom:'0', left:'50%', transform:'translateX(-50%)',
                width:'250px', height:'20px', background:'linear-gradient(to bottom, #666, #444)',
                borderRadius:'4px', boxShadow:'0 5px 20px rgba(0,0,0,0.4)' }} />
              {[-1,1].map((side,i) => (
                <div key={`leg-${i}`} style={{ position:'absolute', bottom:'0', left:`calc(50% + ${side*80}px)`,
                  width:'8px', height:'60px', background:'linear-gradient(to bottom, #888, #555)',
                  transform:`translateX(-50%) skewX(${side*15}deg)` }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ROCKET */}
        <AnimatePresence>
          {(stage==='countdown'||stage==='liftoff'||stage==='ascent'||stage==='space'||stage==='destination') && (
            <motion.div className="absolute z-25"
              initial={{ left:'50%', bottom:'8%', scale:1 }}
              animate={{ left:'50%',
                bottom: stage==='destination'?'110%':stage==='space'?'95%':stage==='ascent'?'65%':stage==='liftoff'?'25%':'8%',
                scale:  stage==='destination'?0.4:stage==='space'?0.6:stage==='ascent'?0.8:1,
                rotate: stage==='destination'?[0,-5,5,0]:0 }}
              exit={{ opacity:0, scale:0.3 }}
              transition={{ bottom:{ duration:stage==='destination'?2:stage==='space'?3:stage==='ascent'?3:stage==='liftoff'?3:0, ease:stage==='destination'?[0.6,0,0.4,1]:[0.4,0,0.2,1] }, scale:{ duration:stage==='destination'?2:stage==='space'?3:stage==='ascent'?3:stage==='liftoff'?3:0, ease:'easeOut' }, rotate:{ duration:2 }, exit:{ duration:0.6 } }}
              style={{ width:'60px', marginLeft:'-30px', transformOrigin:'bottom center' }}
            >
              {/* Nose cone */}
              <div style={{ position:'absolute', left:'50%', bottom:'180px', transform:'translateX(-50%)',
                width:0, height:0, borderLeft:'30px solid transparent', borderRight:'30px solid transparent',
                borderBottom:'60px solid #e8e8e8', filter:'drop-shadow(0 -2px 8px rgba(0,0,0,0.3))' }} />
              {/* Upper stage */}
              <div style={{ position:'absolute', left:0, bottom:'120px', width:'60px', height:'60px',
                background:'linear-gradient(to right, #b0b0b0 0%, #ffffff 30%, #e8e8e8 50%, #c0c0c0 70%, #909090 100%)',
                borderRadius:'4px', boxShadow:'inset -5px 0 15px rgba(0,0,0,0.3)' }}>
                <div style={{ position:'absolute', top:'20px', left:'50%', transform:'translateX(-50%)',
                  width:'20px', height:'20px', borderRadius:'50%',
                  background:'radial-gradient(circle, #4a9fd8 0%, #2a5f88 70%, #1a3f58 100%)',
                  border:'2px solid #888' }} />
              </div>
              {/* Lower stage */}
              <div style={{ position:'absolute', left:0, bottom:0, width:'60px', height:'120px',
                background:'linear-gradient(to right, #d8d8d8 0%, #ffffff 20%, #f0f0f0 40%, #e0e0e0 60%, #c8c8c8 80%, #a8a8a8 100%)',
                borderRadius:'4px', boxShadow:'inset -8px 0 20px rgba(0,0,0,0.25), 0 5px 15px rgba(0,0,0,0.3)' }}>
                <div style={{ position:'absolute', top:'30px', left:0, right:0, height:'15px',
                  background:'linear-gradient(to right, #b83030 0%, #e84040 50%, #b83030 100%)' }} />
                <div style={{ position:'absolute', top:'50px', left:0, right:0, height:'15px',
                  background:'linear-gradient(to right, #3060b8 0%, #4080e8 50%, #3060b8 100%)' }} />
              </div>

              {/* Flames */}
              <div style={{ position:'absolute', left:'-6px', bottom:'-5px', width:'60px', zIndex:-1 }}>
                {/* Main plume */}
                <motion.div style={{ position:'absolute', left:'50%', top:0,
                  width: (stage==='liftoff'||stage==='ascent'||stage==='space'||stage==='destination')?'90px':'70px',
                  height:(stage==='liftoff'||stage==='ascent'||stage==='space'||stage==='destination')?'280px':'140px',
                  background:'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,220,120,0.98) 12%, rgba(255,130,50,0.9) 48%, rgba(220,60,20,0.6) 85%, transparent 100%)',
                  borderRadius:'50% 50% 50% 50% / 15% 15% 85% 85%',
                  filter: isMobile ? 'blur(6px)' : 'blur(10px)',
                  boxShadow:'0 0 100px rgba(255,150,50,0.9)' }}
                  animate={{ x:'-50%', scaleY:stage==='countdown'?[0.8,1.15,0.85,1.05]:[1,1.2,0.95,1.15], scaleX:stage==='countdown'?[1,0.92,1.08,0.98]:[1,1.12,0.92,1.08] }}
                  transition={{ duration:stage==='countdown'?0.4:flameDurFast, repeat:Infinity }}
                />
                {/* Mid flame */}
                <motion.div style={{ position:'absolute', left:'50%', top:0, width:'65px',
                  height:(stage==='liftoff'||stage==='ascent'||stage==='space'||stage==='destination')?'220px':'110px',
                  background:'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,200,120,0.94) 45%, rgba(255,100,40,0.7) 88%, transparent 100%)',
                  borderRadius:'50% 50% 50% 50% / 18% 18% 82% 82%',
                  filter: isMobile ? 'blur(3px)' : 'blur(6px)' }}
                  animate={{ x:'-50%', scaleY:[1,1.25,1,1.18], opacity:[1,0.96,1,0.98] }}
                  transition={{ duration:flameDurMid, repeat:Infinity }}
                />
                {/* Bright core */}
                <motion.div style={{ position:'absolute', left:'50%', top:0, width:'42px', height:'95px',
                  background:'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,210,140,0.96) 70%, transparent 100%)',
                  borderRadius:'50% 50% 50% 50% / 20% 20% 80% 80%',
                  filter: isMobile ? 'blur(2px)' : 'blur(3px)' }}
                  animate={{ x:'-50%', scaleY:[1,1.3,1,1.22], opacity:[1,0.97,1,0.98] }}
                  transition={{ duration:flameDurCore, repeat:Infinity }}
                />
                {/* White-hot core */}
                <motion.div style={{ position:'absolute', left:'50%', top:0, width:'28px', height:'50px',
                  background:'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(255,240,200,0.95) 85%, transparent 100%)',
                  borderRadius:'50% 50% 50% 50% / 25% 25% 75% 75%',
                  boxShadow:'0 0 40px rgba(255,255,255,1)' }}
                  animate={{ x:'-50%', scaleY:[1,1.25,1.05,1.2], opacity:[1,0.98,1,0.99] }}
                  transition={{ duration:flameDurHot, repeat:Infinity }}
                />

                {/* Smoke — memoised positions */}
                {(stage==='liftoff'||stage==='ascent') && smokeData.map((s,i) => (
                  <motion.div key={`smoke-${i}`} style={{ position:'absolute', left:'50%',
                    top:(stage==='liftoff'||stage==='ascent')?'240px':'120px',
                    transform:'translateX(-50%)', width:`${s.w}px`, height:`${s.h}px`,
                    borderRadius:'50%',
                    background:`radial-gradient(circle, rgba(200,200,200,${s.op}), transparent 70%)`,
                    filter: isMobile ? 'blur(10px)' : 'blur(18px)', willChange:'transform,opacity' }}
                    initial={{ x:0, y:0, opacity:0, scale:0.4 }}
                    animate={{ x:s.xEnd, y:[0,s.yEnd], opacity:[0,0.75,0.55,0], scale:[0.4,1.6,2.2,2.8] }}
                    transition={{ duration:s.dur, delay:s.delay, repeat:Infinity, ease:'easeOut' }}
                  />
                ))}

                {/* Sparks — memoised positions */}
                {sparkData.map((sp,i) => (
                  <motion.div key={`spark-${i}`} style={{ position:'absolute', left:'50%',
                    top:(stage==='liftoff'||stage==='ascent'||stage==='space'||stage==='destination')?'250px':'125px',
                    transform:'translateX(-50%)', width:'5px', height:'5px', borderRadius:'50%',
                    background:sp.color, boxShadow:`0 0 12px ${sp.color}`, willChange:'transform,opacity' }}
                    animate={{ x:sp.xEnd, y:[0,sp.yEnd], opacity:[1,0.85,0], scale:[1,0.6,0] }}
                    transition={{ duration:sp.dur, delay:sp.delay, repeat:Infinity, ease:'easeOut' }}
                  />
                ))}
              </div>

              {/* Fins */}
              {[-1,1].map((side,i) => (
                <div key={`fin-${i}`} style={{ position:'absolute', bottom:'20px',
                  [side===-1?'left':'right']:'-30px', width:0, height:0,
                  borderTop:'40px solid transparent', borderBottom:'40px solid transparent',
                  [side===-1?'borderRight':'borderLeft']:'30px solid #a8a8a8',
                  filter:'drop-shadow(0 5px 10px rgba(0,0,0,0.4))' }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* COUNTDOWN */}
        <AnimatePresence>
          {stage==='countdown' && [3,2,1].map((num,i) => (
            <motion.div key={`countdown-${num}`} className="absolute z-30"
              style={{ left:'50%', top:'30%', transform:'translate(-50%,-50%)' }}
              initial={{ opacity:0, scale:0 }}
              animate={{ opacity:[0,1,1,0], scale:[0,1.2,1,0.8] }}
              transition={{ duration:0.6, delay:i*0.65 }}
            >
              <div style={{ fontSize:'120px', fontWeight:'bold', color:'#ffffff',
                textShadow:'0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(255,200,100,0.6)',
                filter:'drop-shadow(0 5px 20px rgba(0,0,0,0.5))' }}>{num}</div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* VAPOR TRAIL — static divs with wrapper opacity only (no per-element scaleX Infinity) */}
        <AnimatePresence>
          {(stage==='ascent'||stage==='space'||stage==='destination') && (
            <motion.div className="absolute z-22"
              style={{ left:'50%', bottom:0, transform:'translateX(-50%)', width:'8px', height:'100%' }}
              initial={{ opacity:0 }} animate={{ opacity:[0,0.6,0.4] }} exit={{ opacity:0 }}
              transition={{ duration:1.5 }}
            >
              {Array.from({length: trailCount}, (_,i) => (
                <div key={`trail-${i}`} style={{ position:'absolute', left:'50%',
                  bottom:`${i*(100/trailCount)}%`, transform:'translateX(-50%)',
                  width:`${10+i*0.5}px`, height:`${20+i}px`, borderRadius:'50%',
                  background: stage==='destination'
                    ? `radial-gradient(ellipse, rgba(170,140,255,${0.3-i*0.01}), transparent 70%)`
                    : stage==='space'
                    ? `radial-gradient(ellipse, rgba(255,255,255,${0.4-i*0.013}), transparent 70%)`
                    : `radial-gradient(ellipse, rgba(200,200,200,${0.5-i*0.015}), transparent 70%)`,
                  filter: isMobile ? 'blur(4px)' : 'blur(8px)',
                }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* NEBULA — blurred layers are static (no parent rotation), only core pulses */}
        <AnimatePresence>
          {stage==='destination' && (
            <motion.div className="absolute z-21"
              style={{ left:'50%', top:'30%', transform:'translate(-50%,-50%)' }}
              initial={{ opacity:0, scale:0 }}
              animate={{ opacity:[0,0.8,1], scale:[0,1.2,1] }}
              exit={{ opacity:0 }}
              transition={{ duration:2 }}
            >
              {/* Static blurred nebula layers — no rotation on blur-filter elements */}
              <div style={{ width:isMobile?260:400, height:isMobile?260:400, borderRadius:'50%',
                background:'radial-gradient(ellipse, rgba(138,43,226,0.6) 0%, rgba(75,0,130,0.4) 30%, rgba(138,43,226,0.3) 50%, transparent 75%)',
                filter: isMobile ? 'blur(22px)' : 'blur(40px)' }} />
              <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
                width:isMobile?220:350, height:isMobile?220:350, borderRadius:'50%',
                background:'radial-gradient(ellipse, rgba(255,20,147,0.5) 0%, rgba(138,43,226,0.3) 40%, transparent 70%)',
                filter: isMobile ? 'blur(18px)' : 'blur(35px)' }} />
              <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
                width:isMobile?175:280, height:isMobile?175:280, borderRadius:'50%',
                background:'radial-gradient(ellipse, rgba(100,149,237,0.6) 0%, rgba(138,43,226,0.4) 50%, transparent 75%)',
                filter: isMobile ? 'blur(15px)' : 'blur(30px)' }} />
              {/* Rotating ring overlay — thin, no blur, so rotation is cheap */}
              <motion.div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
                width:isMobile?200:320, height:isMobile?200:320, borderRadius:'50%',
                border:'1px solid rgba(200,150,255,0.3)', willChange:'transform' }}
                animate={{ rotate:[0,360] }}
                transition={{ duration:20, repeat:Infinity, ease:'linear' }}
              />
              {/* Bright core pulses */}
              <motion.div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
                width:'100px', height:'100px', borderRadius:'50%',
                background:'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(200,150,255,0.7) 50%, transparent 80%)',
                boxShadow:'0 0 100px rgba(138,43,226,0.8)',
                filter: isMobile ? 'blur(8px)' : 'blur(15px)' }}
                animate={{ scale:[1,1.2,1], opacity:[0.9,1,0.9] }}
                transition={{ duration:2, repeat:Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RADIANCE */}
      <AnimatePresence>
        {stage==='radiance' && (
          <>
            {[...Array(isMobile?28:48)].map((_,i) => {
              const total = isMobile?28:48;
              const angle = (i/total)*360;
              const colors = ['rgba(138,43,226,1)','rgba(255,20,147,1)','rgba(100,149,237,1)','rgba(255,255,255,1)'];
              return (
                <motion.div key={`ray-${i}`} className="absolute" style={{
                  left:'50%', top:'50%', width:'200vw',
                  height:i%3===0?'12px':i%3===1?'8px':'10px',
                  marginLeft:'-100vw',
                  marginTop:i%3===0?'-6px':i%3===1?'-4px':'-5px',
                  background:`linear-gradient(to right, transparent, ${colors[i%4].replace('1)','0.93)')} 50%, transparent)`,
                  transformOrigin:'center center', transform:`rotate(${angle}deg)`, filter:'blur(2px)', willChange:'transform'
                }}
                  initial={{ scaleX:0, opacity:0 }}
                  animate={{ scaleX:[0,2.8,2.6], opacity:[0,1,0.95] }}
                  transition={{ duration:1.5, ease:'easeOut' }}
                />
              );
            })}

            {/* Central glow — viewport-fill, simple opacity fade */}
            <motion.div className="absolute inset-0 pointer-events-none"
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8 }}
              style={{
                background:'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.65) 0%, rgba(200,150,255,0.5) 18%, rgba(138,43,226,0.32) 38%, transparent 68%)',
                filter: isMobile ? 'blur(28px)' : 'blur(55px)',
              }}
            />

            {/* Orbiting particles — CSS rings */}
            {orbitRings.map((ring,ri) => (
              <div key={`orbit-ring-${ri}`} style={{
                position:'absolute', inset:0,
                animation:`le-orbit ${ring.dur}s linear infinite`,
                transformOrigin:'center center', willChange:'transform'
              }}>
                {ring.particles.map((p,i) => (
                  <div key={i} style={{
                    position:'absolute',
                    left:`calc(50% + ${p.x}px)`, top:`calc(50% + ${p.y}px)`,
                    width:isMobile?5:8, height:isMobile?5:8,
                    borderRadius:'50%', background:p.color,
                    boxShadow:`0 0 ${isMobile?8:16}px ${p.color}`,
                    transform:'translate(-50%,-50%)'
                  }} />
                ))}
              </div>
            ))}

            {/* Burst particles */}
            {burstData.map((b,i) => (
              <motion.div key={`burst-${i}`} className="absolute"
                initial={{ x:0, y:0, scale:0, opacity:0 }}
                animate={{ x:b.x, y:[b.y,b.y+b.yExtra], scale:[0,2.2,1.9], opacity:[0,1,0.9,0], rotate:[0,(i*47)%720] }}
                transition={{ duration:2.8, delay:i*0.006, ease:'easeOut' }}
              >
                <div style={{ width:12,height:9,borderRadius:'50%',background:b.color,boxShadow:`0 0 13px ${b.color}` }} />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Fireworks */}
      <AnimatePresence>
        {stage==='radiance' && (
          <>
            {leFwPositions.map((pos,pi) => (
              <React.Fragment key={`le-fw-${pi}`}>
                {leFwSparks[pi].map((s,si) => (
                  <motion.div key={`le-spark-${pi}-${si}`} className="absolute z-51 rounded-full"
                    style={{ left:`${pos.x}%`, top:`${pos.y}%`, width:6, height:6, background:s.color }}
                    initial={{ x:0, y:0, scale:0, opacity:0 }}
                    animate={{ x:s.x, y:s.y, scale:[0,1.4,0], opacity:[0,1,0] }}
                    transition={{ duration:1.2, delay:s.delay, ease:'easeOut' }}
                  />
                ))}
                {leFwRings[pi].map((r,ri) => (
                  <div key={`le-ring-${pi}-${ri}`} className="absolute rounded-full border-2"
                    style={{ left:`${pos.x}%`, top:`${pos.y}%`, width:20, height:20, borderColor:r.color,
                      animation:`le-pop-ring 0.9s ease-out ${r.delay}s both` }}
                  />
                ))}
                <div key={`le-flash-${pi}`} className="absolute rounded-full"
                  style={{ left:`${pos.x}%`, top:`${pos.y}%`, width:40, height:40,
                    background:`radial-gradient(circle, ${leColors[pi%leColors.length]}cc, transparent)`,
                    filter:'blur(8px)', animation:'le-flash 0.5s ease-out both' }}
                />
              </React.Fragment>
            ))}
            {leOrbs.map((orb,i) => (
              <div key={`le-orb-${i}`} className="absolute rounded-full z-49"
                style={{ left:`${orb.x}%`, bottom:'20%', width:10, height:10,
                  background:orb.color, boxShadow:`0 0 14px ${orb.color}`,
                  '--dx':`${orb.dx}px`, animation:`le-orb-float ${orb.dur}s ease-out ${orb.delay}s both`
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
            <h2 className="text-4xl md:text-5xl font-bold text-purple-100 drop-shadow-2xl mb-3">
              Reach for the Stars
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
