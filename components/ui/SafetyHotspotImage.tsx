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
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  return (
    <div className={`flex flex-col h-full ${className}`}>
        <div className="relative overflow-hidden group flex-grow h-full min-h-[300px]">
            <OptimizedImage 
                src={src} 
                alt={alt} 
                className="w-full h-full object-cover transition-all duration-700"
            />

            {/* Hotspots */}
            {hotspots.map((spot, idx) => (
                <button
                    key={idx}
                    onClick={() => setActiveHotspot(activeHotspot === idx ? null : idx)}
                    className={`absolute z-20 w-8 h-8 -ml-4 -mt-4 flex items-center justify-center rounded-full border-2 transition-all duration-300 font-bold text-sm shadow-lg ${
                        activeHotspot === idx 
                        ? 'bg-gold border-white text-black scale-110' 
                        : 'bg-black/50 border-white text-white hover:bg-gold hover:text-black hover:scale-110'
                    }`}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    aria-label={`View detail ${idx + 1}`}
                >
                    {idx + 1}
                </button>
            ))}
        </div>

        {/* Mobile-Friendly Detail Panel */}
        <div className="bg-[#111] p-6 border-t border-white/10 min-h-[140px]">
             <div className="flex flex-col h-full justify-center">
                 {activeHotspot !== null ? (
                    <motion.div
                        key={activeHotspot}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                    >
                        <div className="flex items-center gap-3">
                            <span className="bg-gold text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                                {activeHotspot + 1}
                            </span>
                            <h4 className="text-white font-serif text-lg">{hotspots[activeHotspot].label}</h4>
                        </div>
                        <p className="text-neutral-400 text-sm leading-relaxed pl-9">
                            {hotspots[activeHotspot].detail}
                        </p>
                    </motion.div>
                 ) : (
                    <div className="text-neutral-500 text-sm italic flex items-center gap-2">
                        <IconScan size={18} />
                        Tap the numbered markers above to reveal technical specifications.
                    </div>
                 )}
             </div>
        </div>
    </div>
  );
};