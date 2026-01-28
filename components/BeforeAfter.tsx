import React, { useState, useRef } from 'react';
import { IconArrowsHorizontal, IconEye } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const startDrag = () => isDragging.current = true;
  const stopDrag = () => isDragging.current = false;

  // Define annotations for the "After" image
  const annotations = [
    { x: 70, y: 65, label: "Zero-Threshold Entry", detail: "Flush flooring transition prevents trip hazards." },
    { x: 85, y: 40, label: "Structural Blocking", detail: "Wall reinforced to support 500lbs dynamic load." },
    { x: 60, y: 85, label: "R11 Anti-Slip", detail: "Nano-textured tile surface increases friction coefficient." }
  ];

  const showSpecs = sliderPosition < 30; // Show specs when revealed mostly (slider to left reveals right side)

  return (
    <div 
      className="relative w-full h-[600px] overflow-hidden rounded-sm select-none cursor-ew-resize group shadow-2xl border border-white/5"
      ref={containerRef}
      onMouseDown={startDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onMouseMove={onMouseMove}
      onTouchStart={startDrag}
      onTouchEnd={stopDrag}
      onTouchMove={onTouchMove}
    >
      {/* "After" Image (Background) - The Safe Home */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop')` }}
      >
        <div className="absolute top-8 right-8 bg-gold/90 text-black px-4 py-2 font-bold tracking-widest text-xs uppercase flex items-center gap-2">
          <IconEye size={14}/> Integrated Safety
        </div>

        {/* Technical Overlay - Appears when slider reveals this side */}
        <AnimatePresence>
            {showSpecs && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-teal-900/20 mix-blend-multiply pointer-events-none"
                />
            )}
        </AnimatePresence>

        {/* Annotations */}
        {annotations.map((note, i) => (
             <motion.div 
                key={i}
                className="absolute"
                style={{ left: `${note.x}%`, top: `${note.y}%` }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                    opacity: showSpecs ? 1 : 0, 
                    scale: showSpecs ? 1 : 0.8,
                    y: showSpecs ? 0 : 10
                }}
                transition={{ delay: i * 0.1 }}
             >
                 <div className="flex items-center gap-2">
                     <div className="w-3 h-3 bg-gold rounded-full animate-pulse shadow-[0_0_10px_#D4AF37]"></div>
                     <div className="bg-black/80 backdrop-blur border-l-2 border-gold p-3 max-w-[200px]">
                         <div className="text-gold text-[10px] font-bold uppercase">{note.label}</div>
                         <div className="text-white text-[10px] leading-tight opacity-80">{note.detail}</div>
                     </div>
                 </div>
             </motion.div>
        ))}
      </div>

      {/* "Before" Image (Foreground, clipped) - The Standard Home */}
      <div 
        className="absolute inset-0 bg-cover bg-center border-r border-white/50 shadow-[0_0_50px_rgba(0,0,0,0.5)] grayscale-[30%]"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1600&auto=format&fit=crop')`,
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
        }}
      >
        <div className="absolute top-8 left-8 bg-black/60 backdrop-blur-md text-white px-4 py-2 font-medium tracking-widest text-xs uppercase">
          Standard Construction
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-[1px] bg-white cursor-ew-resize z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] transform transition-transform hover:scale-110 active:scale-90">
          <IconArrowsHorizontal className="w-5 h-5 text-black" />
        </div>
      </div>
      
      {/* Helper Text */}
      <div className={`absolute bottom-6 left-0 right-0 text-center pointer-events-none transition-opacity duration-500 ${showSpecs ? 'opacity-0' : 'opacity-100'}`}>
         <p className="text-white/90 text-xs tracking-[0.2em] uppercase drop-shadow-md">Drag left to reveal hidden engineering</p>
      </div>
    </div>
  );
};
