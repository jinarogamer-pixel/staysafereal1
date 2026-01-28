import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: "Stay Safe transformed my parents' home. The grab bars look like part of the design, not hospital equipment. It feels more like a spa renovation than a safety retrofit.",
    name: "Sarah Jenkins",
    role: "Daughter, West Palm Beach",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    rating: 5
  },
  {
    quote: "Professional, quick, and incredibly knowledgeable about what I needed after my surgery. They anticipated needs I hadn't even thought of.",
    name: "Michael Rodriguez",
    role: "Senior Resident, Aspen",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    rating: 5
  },
  {
    quote: "The lighting upgrades made a huge difference. I feel so much safer walking at night now, and the aesthetic is absolutely stunning.",
    name: "Eleanor Vance",
    role: "Resident, Lake Worth",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&auto=format&fit=crop",
    rating: 5
  }
];

export const AnimatedTestimonials = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image/Avatar Area */}
        <div className="relative aspect-[3/4] md:aspect-square w-full rounded-sm overflow-hidden shadow-2xl group">
             {/* Main Image */}
             <div 
               key={active}
               className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out scale-110 group-hover:scale-100"
               style={{ backgroundImage: `url(${testimonials[active].image})` }}
             >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
             </div>
             
             {/* Quote Icon Overlay */}
             <div className="absolute top-8 left-8 text-8xl font-serif text-white/10 leading-none">
                "
             </div>
             
             {/* Info Overlay */}
             <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-4">
                    <div>
                        <div className="text-2xl font-serif text-white italic">{testimonials[active].name}</div>
                        <div className="text-sm text-gold uppercase tracking-widest mt-1">{testimonials[active].role}</div>
                    </div>
                </div>
             </div>
        </div>

        {/* Text Content */}
        <div className="space-y-8 relative">
             <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-gold text-xl">★</span>
                ))}
             </div>
             
             <div className="relative overflow-hidden min-h-[120px]">
                <p key={active} className="text-2xl md:text-3xl font-light text-neutral-200 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500">
                    "{testimonials[active].quote}"
                </p>
             </div>

             <div className="flex gap-3 pt-4">
                {testimonials.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setActive(idx)}
                        className={`h-1 transition-all duration-500 rounded-full ${active === idx ? 'bg-gold w-12' : 'bg-white/20 w-4 hover:bg-white/40'}`}
                        aria-label={`View testimonial ${idx + 1}`}
                    />
                ))}
             </div>
        </div>
      </div>
    </div>
  );
};