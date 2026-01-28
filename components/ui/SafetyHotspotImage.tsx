import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OptimizedImage } from './OptimizedImage';
import { IconPlus, IconScan } from '@tabler/icons-react';

interface Hotspot {
  x: number; // Percentage from left (0-100)
  y: number; // Percentage from top (0-100)
  label: string;
  detail: string;
}

interface SafetyHotspotImageProps {
  src: string;
  alt: string;
  hotspots: Hotspot[];
  className?: string;
}

export const SafetyHotspotImage: React.FC<SafetyHotspotImageProps> = ({ 
  src, 
  alt, 
  hotspots,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  return (
    <div 
      className={`relative overflow-hidden rounded-sm group cursor-crosshair ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveHotspot(null);
      }}
    >
      <OptimizedImage 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:grayscale-[50%] group-hover:brightness-50"
      />

      {/* Overlay indicating interactivity */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          <div className="bg-black/60 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 flex items-center gap-2 shadow-2xl">
             <IconScan size={16} className="text-gold animate-pulse" />
             <span className="text-[10px] text-white uppercase tracking-[0.2em] font-medium">Scan Safety Tech</span>
          </div>
      </div>

      {/* Grid Overlay on Hover (Tech/Blueprint Feel) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
        }}
      />

      {/* Hotspots */}
      <AnimatePresence>
        {isHovered && hotspots.map((spot, idx) => {
          const isRightSide = spot.x > 50;
          const isBottomHalf = spot.y > 60;
          
          return (
            <div
              key={idx}
              className="absolute z-20"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              onMouseEnter={() => setActiveHotspot(idx)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              {/* The Pulse Marker */}
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: idx * 0.1, type: "spring" }}
                className={`relative w-6 h-6 -ml-3 -mt-3 flex items-center justify-center rounded-full border transition-colors duration-300 ${activeHotspot === idx ? 'bg-gold border-gold text-black' : 'bg-black/50 border-white text-white hover:bg-white hover:text-black'}`}
              >
                 <IconPlus size={12} />
                 <div className={`absolute inset-0 rounded-full border border-gold/50 animate-ping ${activeHotspot === idx ? 'opacity-100' : 'opacity-0'}`}></div>
              </motion.button>

              {/* The Connecting Line & Card */}
              <AnimatePresence>
                {activeHotspot === idx && (
                  <motion.div
                    initial={{ opacity: 0, x: isRightSide ? 10 : -10 }}
                    animate={{ opacity: 1, x: isRightSide ? -10 : 10 }}
                    exit={{ opacity: 0, x: isRightSide ? 10 : -10 }}
                    // Reduced width to w-52 and adjusted margins
                    className={`absolute w-52 pointer-events-none z-30 ${isRightSide ? 'right-full mr-3' : 'left-full ml-3'} ${isBottomHalf ? 'bottom-0' : 'top-1/2 -translate-y-1/2'}`}
                  >
                    {/* Connecting Line - Flips based on side */}
                    <div className={`absolute top-1/2 w-6 h-[1px] bg-gold ${isRightSide ? '-right-6' : '-left-6'}`}></div>
                    
                    {/* Info Card - Compact Design */}
                    <div className={`bg-black/95 backdrop-blur-xl p-3 shadow-[0_0_20px_rgba(0,0,0,0.6)] border-t border-b border-gold/50 ${isRightSide ? 'border-r-2 border-r-gold' : 'border-l-2 border-l-gold'}`}>
                      <h4 className="text-gold text-[10px] uppercase tracking-widest font-bold mb-1 flex items-center gap-2">
                        {spot.label}
                      </h4>
                      <p className="text-neutral-300 text-[10px] font-normal leading-relaxed border-t border-white/10 pt-1">{spot.detail}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};