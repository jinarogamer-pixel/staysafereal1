import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Philosophy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Tighter ranges to remove dead space
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.4, 0.5], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.65, 0.8], [0, 1, 0]);
  
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.1]);

  return (
    // Reduced height from 300vh to 180vh for faster pacing
    <section ref={containerRef} className="h-[180vh] relative bg-neutral-950">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Abstract Background Element */}
        <motion.div 
            style={{ scale }}
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-gold/5 to-transparent blur-[100px] pointer-events-none" 
        />

        <div className="max-w-4xl px-6 text-center relative z-10">
          
          <motion.div style={{ opacity: opacity1 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
              Safety is usually <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-700">invisible</span>.
            </h2>
          </motion.div>

          <motion.div style={{ opacity: opacity2 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
              It lives in the details.<br/>
              <span className="text-2xl md:text-4xl text-neutral-400 mt-4 block font-light">A handle that feels like a handshake.</span>
            </h2>
          </motion.div>

          <motion.div style={{ opacity: opacity3 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="space-y-6">
                <h2 className="text-4xl md:text-7xl font-serif text-white leading-tight">
                  We don't build facilities.<br/>
                  <span className="italic text-gold">We curate sanctuaries.</span>
                </h2>
                <p className="text-sm text-neutral-500 uppercase tracking-widest">Medical Grade • ASID Certified</p>
            </div>
          </motion.div>

        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs text-neutral-600 uppercase tracking-widest animate-pulse">
           Scroll to Read
        </div>
      </div>
    </section>
  );
};