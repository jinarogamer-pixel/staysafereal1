import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconQuote } from '@tabler/icons-react';

// Transformed from fake testimonials to "Client Archetypes" / Philosophy
const pillars = [
  {
    quote: "Safety measures should never announce themselves. Our philosophy is invisible integration—where a grab bar looks like a towel warmer and a ramp looks like landscape architecture.",
    title: "The Design Ethos",
    subtitle: "Aesthetic Integration",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    features: [
        { label: "Focus", value: "Invisible" },
        { label: "Material", value: "Premium" },
        { label: "Result", value: "Beauty" }
    ]
  },
  {
    quote: "We apply clinical rigor to residential settings. Every modification is calculated based on biomechanics, not just building codes. This is healthcare infrastructure disguised as luxury.",
    title: "The Medical Standard",
    subtitle: "Clinical Rigor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    features: [
        { label: "Standard", value: "ISO 9001" },
        { label: "Input", value: "Clinical" },
        { label: "Goal", value: "Prevention" }
    ]
  },
  {
    quote: "A home should adapt to its owner, not the other way around. Our 'Forever Promise' ensures that as your needs evolve, your environment evolves with you—seamlessly and rapidly.",
    title: "The Service Promise",
    subtitle: "Concierge Care",
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=400&auto=format&fit=crop",
    features: [
        { label: "Response", value: "24/7" },
        { label: "Updates", value: "Annual" },
        { label: "Scope", value: "Total" }
    ]
  }
];

export const AnimatedTestimonials = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Image Side */}
            <div className="relative aspect-square lg:aspect-[4/3] rounded-sm overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={active}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${pillars[active].image})` }}
                    >
                         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    </motion.div>
                </AnimatePresence>
                
                <div className="absolute bottom-8 left-8 right-8">
                     <h3 className="text-3xl font-serif text-white italic mb-1">{pillars[active].title}</h3>
                     <p className="text-gold text-sm uppercase tracking-widest font-bold">{pillars[active].subtitle}</p>
                </div>
            </div>

            {/* Content Side */}
            <div className="space-y-8">
                <IconQuote className="text-gold w-12 h-12 opacity-50" />
                
                <div className="h-[180px] overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        <motion.p 
                            key={active}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="text-2xl md:text-3xl font-light text-neutral-200 leading-relaxed"
                        >
                            "{pillars[active].quote}"
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Features Grid (Replaced specific stats with service attributes) */}
                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                    {pillars[active].features.map((stat, i) => (
                        <div key={i}>
                            <p className="text-xl font-serif text-white">{stat.value}</p>
                            <p className="text-neutral-500 text-xs uppercase tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <div className="flex gap-4 pt-4">
                    <button 
                        onClick={() => setActive((prev) => (prev - 1 + pillars.length) % pillars.length)}
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:text-black hover:border-gold transition-all"
                    >
                        ←
                    </button>
                    <button 
                        onClick={() => setActive((prev) => (prev + 1) % pillars.length)}
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:text-black hover:border-gold transition-all"
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};