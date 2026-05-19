/**
 * MIGHTY SMITHING HAMMER - Strikes hearts DEAD-ON
 */

import React from 'react';
import { motion } from 'motion/react';

interface ForgeHammerProps {
  strikeCount: number;
}

export function ForgeHammer({ strikeCount }: ForgeHammerProps) {
  return (
    <>
      {/* MIGHTY BLACKSMITH HAMMER - REALISTIC SWINGING ARC MOTION */}
      <motion.div
        key={`hammer-${strikeCount}`}
        className="absolute z-30"
        style={{
          left: '50%',
          bottom: '25%', // SAME LEVEL AS HEARTS!
          transformOrigin: 'center bottom', // Pivot from BOTTOM (where head is!)
        }}
        initial={{ 
          x: 150,       // Start to the RIGHT
          y: -600,      // Start WAY UP (hammer is 480px tall, needs to be offscreen)
          rotate: -50   // Angled back
        }}
        animate={{
          x: [150, -20, 140],           // Swings from right, through center, recoil
          y: [-600, -40, -580],         // Swings DOWN! At y:-40, the hammer HEAD is at heart level!
          rotate: [-50, 20, -45]        // Head rotates FORWARD on strike!
        }}
        transition={{
          duration: 0.9,
          times: [0, 0.55, 1],
          ease: [0.68, 0, 0.32, 1]
        }}
      >
        <div className="relative flex flex-col items-center" style={{ width: '200px' }}>
          
          {/* WOODEN HANDLE - TOP */}
          <div
            style={{
              width: '50px',
              height: '300px',
              background: 'linear-gradient(to bottom, #78350f, #92400e, #a24e0e, #92400e, #78350f, #5c2b0f)',
              borderRadius: '25px',
              boxShadow: 'inset 4px 0 12px rgba(0,0,0,0.6), inset -4px 0 12px rgba(120,53,15,0.5), 0 0 30px rgba(0,0,0,0.9)',
              border: '3px solid rgba(68, 26, 3, 0.8)',
              position: 'relative'
            }}
          >
            {/* Pommel at top */}
            <div
              style={{
                position: 'absolute',
                top: '-18px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '65px',
                height: '36px',
                background: 'linear-gradient(to bottom, #e5e7eb, #9ca3af, #71717a, #52525b)',
                borderRadius: '50% 50% 0 0',
                boxShadow: 'inset 0 6px 12px rgba(0,0,0,0.8), 0 8px 20px rgba(0,0,0,0.8)',
                border: '4px solid rgba(0,0,0,0.7)'
              }}
            />

            {/* Leather wraps */}
            {[...Array(13)].map((_, i) => (
              <div
                key={`wrap-${i}`}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: `${30 + i * 20}px`,
                  width: '50px',
                  height: '6px',
                  background: 'linear-gradient(to right, rgba(68, 26, 3, 1), rgba(41, 15, 2, 0.9), rgba(68, 26, 3, 1))',
                  borderRadius: '3px'
                }}
              />
            ))}

            {/* Wood grain */}
            {[50, 120, 190, 260].map((pos, i) => (
              <div
                key={`grain-${i}`}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: `${pos}px`,
                  width: '30px',
                  height: '3px',
                  background: 'linear-gradient(to right, transparent, rgba(146, 64, 14, 0.8), transparent)',
                  borderRadius: '1.5px',
                  opacity: 0.7
                }}
              />
            ))}
          </div>

          {/* HAMMER HEAD - BOTTOM - THIS STRIKES THE HEARTS */}
          <div
            style={{
              width: '200px',
              height: '180px',
              position: 'relative',
              marginTop: '-15px'
            }}
          >
            {/* Main head body - MASSIVE RECTANGULAR BLOCK */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '0',
                transform: 'translateX(-50%)',
                width: '140px',
                height: '100px',
                background: 'linear-gradient(to bottom, #ffffff 0%, #f3f4f6 8%, #e5e7eb 15%, #d1d5db 25%, #9ca3af 50%, #71717a 75%, #52525b 92%, #3f3f46 100%)',
                borderRadius: '20px 20px 12px 12px',
                boxShadow: `
                  inset 0 20px 40px rgba(255,255,255,0.7),
                  inset 0 -20px 50px rgba(0,0,0,1),
                  0 30px 80px rgba(0,0,0,1),
                  0 0 60px rgba(255,255,255,0.3)
                `,
                border: '6px solid rgba(255,255,255,0.3)'
              }}
            >
              {/* Top highlight */}
              <div
                style={{
                  position: 'absolute',
                  top: '18px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100px',
                  height: '18px',
                  background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.9), transparent)',
                  borderRadius: '9px',
                  filter: 'blur(3px)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '55px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '85px',
                  height: '14px',
                  background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.75), transparent)',
                  borderRadius: '7px',
                  filter: 'blur(3px)'
                }}
              />

              {/* 3D side edges */}
              <div
                style={{
                  position: 'absolute',
                  left: '-6px',
                  top: '15px',
                  width: '12px',
                  height: '70px',
                  background: 'linear-gradient(to right, #1a1a1a, #3f3f46, #52525b)',
                  borderRadius: '6px 0 0 6px',
                  boxShadow: 'inset 3px 0 8px rgba(0,0,0,0.9)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: '-6px',
                  top: '15px',
                  width: '12px',
                  height: '70px',
                  background: 'linear-gradient(to left, #1a1a1a, #3f3f46, #52525b)',
                  borderRadius: '0 6px 6px 0',
                  boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.9)'
                }}
              />
            </div>

            {/* STRIKING FACE - FLAT BOTTOM - THIS HITS THE HEARTS! */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                bottom: '0',
                transform: 'translateX(-50%)',
                width: '160px',
                height: '95px',
                background: 'linear-gradient(to bottom, #52525b 0%, #71717a 12%, #9ca3af 25%, #d1d5db 42%, #e5e7eb 60%, #f3f4f6 78%, #ffffff 100%)',
                borderRadius: '14px 14px 6px 6px',
                boxShadow: `
                  inset 0 15px 30px rgba(255,255,255,0.9),
                  inset 0 -6px 15px rgba(0,0,0,0.6),
                  0 15px 50px rgba(0,0,0,1)
                `,
                border: '5px solid rgba(255,255,255,0.5)',
                borderTop: 'none'
              }}
            >
              {/* FLAT BOTTOM EDGE - THE ACTUAL STRIKING SURFACE */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '150px',
                  height: '22px',
                  background: 'linear-gradient(to bottom, #e5e7eb, #f3f4f6, #ffffff, #ffffff)',
                  borderRadius: '0 0 4px 4px',
                  boxShadow: `
                    inset 0 4px 12px rgba(255,255,255,1),
                    0 6px 20px rgba(0,0,0,0.9),
                    0 0 40px rgba(255,255,255,0.8)
                  `,
                  border: '4px solid rgba(255,255,255,0.8)',
                  borderTop: 'none'
                }}
              />

              {/* Impact marks */}
              {[20, 40, 60, 80].map((pos, i) => (
                <div
                  key={`mark-${i}`}
                  style={{
                    position: 'absolute',
                    left: `${pos}%`,
                    bottom: '12px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0,0,0,0.3), transparent)',
                    boxShadow: 'inset 2px 2px 3px rgba(0,0,0,0.5)'
                  }}
                />
              ))}
            </div>

            {/* Socket connecting head to handle */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '-12px',
                transform: 'translateX(-50%)',
                width: '58px',
                height: '24px',
                background: 'linear-gradient(to bottom, #0a0a0a, #000000)',
                borderRadius: '29px 29px 0 0',
                boxShadow: 'inset 0 6px 15px rgba(0,0,0,1), 0 4px 12px rgba(0,0,0,1)',
                border: '4px solid rgba(0,0,0,1)'
              }}
            />
          </div>

          {/* Motion blur trail */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: '150px',
              transform: 'translateX(-50%)',
              width: '180px',
              height: '500px',
              zIndex: -1
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [1, 3.5, 1]
            }}
            transition={{
              duration: 0.4,
              times: [0, 0.4, 1]
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, transparent, rgba(200, 200, 210, 0.6) 28%, transparent)',
                filter: 'blur(45px)'
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* IMPACT FLASH - WHITE EXPLOSION AT CONTACT */}
      <motion.div
        key={`impact-${strikeCount}`}
        className="absolute z-29"
        style={{
          left: '50%',
          bottom: 'calc(25% + 55px)', // EXACT heart position
          transform: 'translate(-50%, -50%)'
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 0, 1, 1, 0.8, 0],
          scale: [0, 0, 3, 3.5, 4, 0]
        }}
        transition={{
          duration: 0.8,
          times: [0, 0.49, 0.5, 0.55, 0.7, 1],
          ease: 'easeOut'
        }}
      >
        <div
          style={{
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 15%, rgba(254, 243, 199, 0.9) 30%, rgba(251, 191, 36, 0.8) 50%, rgba(249, 115, 22, 0.5) 70%, transparent 100%)',
            boxShadow: '0 0 120px rgba(255, 255, 255, 1), 0 0 200px rgba(251, 191, 36, 1), 0 0 300px rgba(249, 115, 22, 0.8)',
            filter: 'blur(6px)'
          }}
        />
      </motion.div>

      {/* SHOCKWAVE RINGS */}
      {[0, 0.06, 0.12].map((delay, i) => (
        <motion.div
          key={`wave-${strikeCount}-${i}`}
          className="absolute z-28"
          style={{
            left: '50%',
            bottom: 'calc(25% + 55px)',
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0, 1, 0.8, 0],
            scale: [0, 0, 1.2, 4, 6]
          }}
          transition={{
            duration: 0.85,
            times: [0, 0.49, 0.5, 0.75, 1],
            delay: delay,
            ease: 'easeOut'
          }}
        >
          <div
            style={{
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              border: `${8 - i * 2}px solid rgba(251, 191, 36, ${1 - i * 0.2})`,
              boxShadow: `0 0 ${50 - i * 12}px rgba(251, 191, 36, ${1 - i * 0.2}), inset 0 0 ${30 - i * 8}px rgba(251, 191, 36, ${0.6 - i * 0.15})`
            }}
          />
        </motion.div>
      ))}

      {/* CONTACT SPARKS - Burst from impact point */}
      {[...Array(30)].map((_, i) => {
        const angle = (i / 30) * 360;
        const rad = (angle * Math.PI) / 180;
        const distance = 80 + Math.random() * 120;
        
        return (
          <motion.div
            key={`contact-spark-${strikeCount}-${i}`}
            className="absolute z-28"
            style={{
              left: '50%',
              bottom: 'calc(25% + 55px)',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#ffffff',
              boxShadow: '0 0 12px #fef3c7, 0 0 20px #fbbf24'
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{
              x: Math.cos(rad) * distance,
              y: Math.sin(rad) * distance,
              opacity: [0, 0, 1, 0.9, 0],
              scale: [0, 0, 2, 1.5, 0]
            }}
            transition={{
              duration: 0.65,
              times: [0, 0.49, 0.5, 0.8, 1],
              ease: 'easeOut'
            }}
          />
        );
      })}
    </>
  );
}