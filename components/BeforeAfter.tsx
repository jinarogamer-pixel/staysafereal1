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

  const annotations = [
    { x: 70, y: 65, label: "Smooth Floors", detail: "No trip hazards." },
    { x: 85, y: 40, label: "Hidden Support", detail: "Walls hold 500lbs." },
    { x: 60, y: 85, label: "Non-Slip Tile", detail: "Safe even when wet." }
  ];

  const showSpecs = sliderPosition < 30;

  return (
    <div className="flex flex-col gap-8">
        <div 
        className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-sm select-none cursor-ew-resize group shadow-2xl border border-white/5"
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
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop&fm=webp')` }}
        >
            <div className="absolute top-6 right-6 bg-gold text-black px-5 py-2 font-bold tracking-widest text-xs uppercase flex items-center gap-2 shadow-lg">
            <IconEye size={16}/> The Stay Safe Standard
            </div>

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
                        <div className="w-4 h-4 bg-gold rounded-full animate-pulse shadow-[0_0_15px_#D4AF37]"></div>
                        <div className="bg-black/90 backdrop-blur px-3 py-2 rounded-sm border-l-2 border-gold whitespace-nowrap">
                            <div className="text-gold text-xs font-bold uppercase">{note.label}</div>
                            <div className="text-white text-[10px]">{note.detail}</div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* "Before" Image (Foreground, clipped) */}
        <div 
            className="absolute inset-0 bg-cover bg-center border-r border-white/50 shadow-[0_0_50px_rgba(0,0,0,0.5)] grayscale"
            style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1600&auto=format&fit=crop&fm=webp')`,
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
            }}
        >
            <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md text-white px-5 py-2 font-bold tracking-widest text-xs uppercase">
            Typical Contractor
            </div>
        </div>

        {/* Slider Handle */}
        <div 
            className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            style={{ left: `${sliderPosition}%` }}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl transform transition-transform hover:scale-110 active:scale-95">
            <IconArrowsHorizontal className="w-6 h-6 text-black" />
            </div>
        </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 border-t border-white/10 pt-8">
            <div className="text-center">
                <p className="text-4xl md:text-5xl font-serif text-gold mb-1">0</p>
                <p className="text-neutral-500 text-xs uppercase tracking-widest">Hospital Aesthetic</p>
            </div>
            <div className="text-center border-l border-white/10">
                <p className="text-4xl md:text-5xl font-serif text-white mb-1">Med</p>
                <p className="text-neutral-500 text-xs uppercase tracking-widest">Medical Precision</p>
            </div>
            <div className="text-center border-l border-white/10">
                <p className="text-4xl md:text-5xl font-serif text-white mb-1">Design</p>
                <p className="text-neutral-500 text-xs uppercase tracking-widest">Custom Solutions</p>
            </div>
        </div>
    </div>
  );
};