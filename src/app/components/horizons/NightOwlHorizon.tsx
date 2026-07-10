import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface NightOwlHorizonProps {
  height: string;
  positioning: string;
  variants: { initial: any; animate: any; exit: any };
  performanceStyle: React.CSSProperties;
  effects: Record<string, React.ReactNode>;
  cosmicEvents: React.ReactNode;
}

export function NightOwlHorizon({ height, positioning, variants, performanceStyle, effects, cosmicEvents }: NightOwlHorizonProps) {
  const owlMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  const stars = useMemo(() => Array.from({ length: 55 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 65,
    size: i < 8 ? 2.5 + Math.random() * 1.5 : 1 + Math.random() * 1.8,
    delay: i * 0.13,
    dur: 1.8 + Math.random() * 2.4
  })), []);

  const shootingStars = useMemo(() => Array.from({ length: 4 }, (_, i) => ({
    id: i,
    startLeft: 10 + i * 22,
    startTop: 5 + i * 7,
    delay: 2 + i * 3.5
  })), []);

  const treeSizes = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    id: i,
    height: 55 + Math.sin(i * 1.3) * 30 + (i % 3) * 12,
    width: 7 + (i % 4) * 3,
    left: i * 5.7
  })), []);

  const css = `
    @keyframes no-twinkle{0%,100%{opacity:0.25;transform:scale(0.8)}50%{opacity:1;transform:scale(1.25)}}
    @keyframes no-shoot{0%{opacity:0;transform:translateX(0) translateY(0)}10%{opacity:1}80%{opacity:0.6}100%{opacity:0;transform:translateX(160px) translateY(80px)}}
    @keyframes no-moonpulse{0%,100%{opacity:0.18}50%{opacity:0.32}}
    @keyframes no-beam{0%,100%{opacity:0.04;transform:scaleX(1)}50%{opacity:0.11;transform:scaleX(1.06)}}
    @keyframes no-owlbob{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-5px) rotate(2deg)}}
    @keyframes no-wingfan{0%,100%{transform:rotate(0deg)}30%{transform:rotate(-18deg)}60%{transform:rotate(8deg)}}
    @keyframes no-aurora{0%,100%{opacity:0.06;transform:skewX(-3deg) scaleY(1)}50%{opacity:0.14;transform:skewX(3deg) scaleY(1.04)}}
    @keyframes no-glint{0%,100%{opacity:0;transform:scale(0.5)}50%{opacity:1;transform:scale(1)}}
    @media(max-width:639px){
      .no-star-dim{display:none}
      .no-beam-hide{display:none}
      .no-shoot-hide{display:none}
      .no-branch-hide{display:none}
      .no-moon-wrap{right:60% !important;top:4% !important;width:72px !important;height:72px !important}
      .no-moon-halo{right:58% !important;top:2% !important;width:100px !important;height:100px !important}
    }
  `;

  return (
    <motion.div
      className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      style={performanceStyle}
    >
      <style>{css}</style>

      {/* Deep night sky */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#020818 0%,#050d28 30%,#0a1535 60%,#0d1f2d 100%)' }} />

      {/* Aurora wash */}
      <div className="absolute" style={{ left:'20%', top:0, width:'70%', height:'45%', background:'linear-gradient(135deg,rgba(99,102,241,0.06) 0%,rgba(139,92,246,0.1) 40%,rgba(56,189,248,0.05) 100%)', animation:'no-aurora 7s ease-in-out infinite' }} />

      {/* Moonbeams — hide beams 2-4 on mobile */}
      {[0,1,2,3,4].map(i => (
        <div key={i} className={i >= 2 ? 'no-beam-hide' : ''} style={{ position:'absolute', left:`${52+i*4}%`, top:0, width:'3px', height:'55%', background:`linear-gradient(180deg,rgba(${i%2?'180,220,255':'210,200,255'},0.18) 0%,transparent 100%)`, transformOrigin:'top center', animation:`no-beam ${4+i*0.7}s ease-in-out infinite`, animationDelay:`${i*0.5}s` }} />
      ))}

      {/* Stars — every other star after index 20 is hidden on mobile */}
      {stars.map(star => (
        <div key={star.id} className={star.id > 20 && star.id % 2 === 0 ? 'no-star-dim' : ''} style={{ position:'absolute', width:`${star.size}px`, height:`${star.size}px`, left:`${star.left}%`, top:`${star.top}%`, borderRadius:'50%', background: star.size>3?'rgba(240,248,255,0.95)':'rgba(203,220,240,0.85)', boxShadow: star.size>3?`0 0 ${star.size*3}px rgba(180,210,255,0.7)`:`0 0 ${star.size}px rgba(200,220,255,0.4)`, animation:`no-twinkle ${star.dur}s ease-in-out infinite`, animationDelay:`${star.delay}s` }} />
      ))}

      {/* Shooting stars — hide 2 of 4 on mobile */}
      {shootingStars.map(s => (
        <div key={s.id} className={s.id >= 2 ? 'no-shoot-hide' : ''} style={{ position:'absolute', left:`${s.startLeft}%`, top:`${s.startTop}%`, width:'80px', height:'1.5px', background:'linear-gradient(90deg,transparent,rgba(200,230,255,0.9),transparent)', borderRadius:'2px', animation:`no-shoot 1.2s ease-out infinite`, animationDelay:`${s.delay}s` }} />
      ))}

      {/* Moon glow halo */}
      <div className="no-moon-halo" style={{ position:'absolute', right:'18%', top:'8%', width:'140px', height:'140px', borderRadius:'50%', background:'radial-gradient(circle,rgba(240,245,200,0.18) 0%,rgba(200,220,255,0.08) 50%,transparent 75%)', animation:'no-moonpulse 5s ease-in-out infinite' }} />

      {/* Crescent moon SVG */}
      <svg className="no-moon-wrap" style={{ position:'absolute', right:'18%', top:'7%', width:100, height:100, filter:'drop-shadow(0 0 18px rgba(255,250,180,0.55)) drop-shadow(0 0 40px rgba(220,210,140,0.3))' }} viewBox="0 0 100 100">
        <defs>
          <radialGradient id="noMoonGrad" cx="35%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#fffff0" />
            <stop offset="60%" stopColor="#fef9c3" />
            <stop offset="100%" stopColor="#fde68a" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="38" fill="url(#noMoonGrad)" />
        <circle cx="68" cy="42" r="33" fill="#020818" />
        <circle cx="26" cy="48" r="3.5" fill="rgba(200,190,120,0.25)" />
        <circle cx="32" cy="62" r="2.2" fill="rgba(200,190,120,0.2)" />
        <circle cx="20" cy="38" r="2" fill="rgba(200,190,120,0.18)" />
      </svg>

      {/* Owl — JS-driven position so CSS specificity never interferes */}
      <div style={{
        position: 'absolute',
        ...(owlMobile
          ? { left: '50%', top: '10%', transform: 'translateX(-50%)' }
          : { right: '22%', top: '28%' }
        )
      }}>
        <div style={{ animation: 'no-owlbob 4s ease-in-out infinite' }}>
          <svg
            width={owlMobile ? 72 : 80}
            height={owlMobile ? 86 : 96}
            viewBox="0 0 80 96"
            style={{ filter: owlMobile
              ? 'drop-shadow(0 0 10px rgba(167,139,250,0.9)) drop-shadow(0 0 20px rgba(139,92,246,0.7))'
              : 'drop-shadow(0 4px 24px rgba(99,102,241,0.5)) drop-shadow(0 0 8px rgba(160,140,255,0.3))'
            }}
          >
            {/* Wings — brighter indigo so they read against the dark sky */}
            <ellipse cx="18" cy="64" rx="18" ry="10" fill="#4338ca" style={{ animation:'no-wingfan 5s ease-in-out infinite', transformOrigin:'32px 60px' }} />
            <ellipse cx="62" cy="64" rx="18" ry="10" fill="#4338ca" style={{ animation:'no-wingfan 5s ease-in-out infinite', animationDelay:'0.3s', transform:'scaleX(-1)', transformOrigin:'48px 60px' }} />
            {/* Wing highlight */}
            <ellipse cx="18" cy="60" rx="10" ry="4" fill="rgba(165,180,252,0.25)" />
            <ellipse cx="62" cy="60" rx="10" ry="4" fill="rgba(165,180,252,0.25)" />
            {/* Body */}
            <ellipse cx="40" cy="66" rx="22" ry="28" fill="#3730a3" />
            <ellipse cx="40" cy="72" rx="14" ry="18" fill="#4f46e5" />
            {[0,1,2,3,4].map(row => [-6,-2,2,6].map(col => (
              <ellipse key={`${row}-${col}`} cx={40+col} cy={58+row*8} rx="3.5" ry="4.5" fill="rgba(165,180,252,0.45)" />
            )))}
            {/* Head */}
            <ellipse cx="40" cy="38" rx="20" ry="20" fill="#3730a3" />
            {/* Ear tufts */}
            <polygon points="26,22 23,10 31,20" fill="#3730a3" />
            <polygon points="54,22 57,10 49,20" fill="#3730a3" />
            <polygon points="26,21 24,13 30,20" fill="#4f46e5" />
            <polygon points="54,21 56,13 50,20" fill="#4f46e5" />
            {/* Facial disk */}
            <ellipse cx="40" cy="38" rx="16" ry="15" fill="#6d28d9" />
            {/* Eyes */}
            <circle cx="31" cy="36" r="8" fill="#312e81" />
            <circle cx="49" cy="36" r="8" fill="#312e81" />
            <circle cx="31" cy="36" r="6.5" fill="#fbbf24" />
            <circle cx="49" cy="36" r="6.5" fill="#fbbf24" />
            <circle cx="31" cy="36" r="4" fill="#0a0612" />
            <circle cx="49" cy="36" r="4" fill="#0a0612" />
            <circle cx="33" cy="34" r="1.4" fill="white" style={{ animation:'no-glint 3s ease-in-out infinite' }} />
            <circle cx="51" cy="34" r="1.4" fill="white" style={{ animation:'no-glint 3s ease-in-out infinite', animationDelay:'0.2s' }} />
            {/* Beak */}
            <polygon points="40,41 36,46 44,46" fill="#f59e0b" />
            {/* Talons */}
            <line x1="30" y1="93" x2="22" y2="96" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="30" y1="93" x2="28" y2="97" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="30" y1="93" x2="34" y2="97" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="50" y1="93" x2="46" y2="97" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="50" y1="93" x2="50" y2="97" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="50" y1="93" x2="58" y2="96" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Branch */}
      <svg className="no-branch-hide" style={{ position:'absolute', right:'8%', top:'46%', width:200, height:30 }} viewBox="0 0 200 30">
        <path d="M0 20 Q60 14 120 18 Q160 20 200 16" stroke="#0f172a" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M0 20 Q60 14 120 18 Q160 20 200 16" stroke="#1e1b4b" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M70 18 Q75 8 80 4" stroke="#1e1b4b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M110 17 Q115 5 118 0" stroke="#1e1b4b" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>

      {/* Pine forest silhouette */}
      <div style={{ position:'absolute', bottom:56, left:0, right:0 }}>
        {treeSizes.map(tree => (
          <div key={tree.id} style={{ position:'absolute', bottom:0, left:`${tree.left}%`, width:`${tree.width}%` }}>
            <div style={{ width:0, height:0, borderLeft:`${tree.width*4}px solid transparent`, borderRight:`${tree.width*4}px solid transparent`, borderBottom:`${tree.height*0.55}px solid #060d1a`, marginLeft:`-${tree.width*4 - tree.width/2}px` }} />
            <div style={{ width:`${tree.width*0.6}%`, height:`${tree.height*0.3}px`, background:'#060d1a', margin:'0 auto' }} />
          </div>
        ))}
      </div>

      {Object.values(effects).map(effect => effect)}
      {cosmicEvents}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
    </motion.div>
  );
}
