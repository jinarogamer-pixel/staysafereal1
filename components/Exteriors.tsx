import React from 'react';
import { motion } from 'framer-motion';
import { SafetyHotspotImage } from './ui/SafetyHotspotImage';

const exteriorFeatures = [
  {
    title: "Aquatic Safety Integration",
    description: "The pool is the centerpiece of Florida living, yet the highest risk zone. We install submersible hydraulic lifts that vanish into the pool deck when not in use, alongside invisible non-slip nano-coatings on travertine.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7",
    hotspots: [
        { x: 20, y: 80, label: "Invisible Traction", detail: "R12-rated clear coat increases wet friction by 400% without altering stone aesthetics." },
        { x: 50, y: 50, label: "Submersible Lift", detail: "Hydraulic platform retracts flush into the pool floor; zero visual footprint when idle." },
        { x: 80, y: 30, label: "Smart Perimeter", detail: "AI-camera detection alerts homeowners if pool perimeter is breached after hours." }
    ]
  },
  {
    title: "Landscape Navigation",
    description: "Uneven pavers and dark pathways are primary fall hazards. Our landscape architects regrade terrain for zero-threshold garden access and embed amber-spectrum guidance lighting into hardscaping.",
    image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1",
    hotspots: [
        { x: 30, y: 90, label: "Regraded Path", detail: "Composite foundation ensures pavers remain level within 1mm tolerance over 20 years." },
        { x: 60, y: 60, label: "Guidance Lumens", detail: "Recessed low-voltage LEDs cast grazing light to define edges without causing glare." },
        { x: 85, y: 40, label: "Ergonomic Resting", detail: "Strategically placed seating nodes integrated into retaining walls at optimal 19-inch heights." }
    ]
  }
];

export const Exteriors = () => {
  return (
    <section id="exteriors" className="w-full py-32 bg-[#080808] relative border-t border-white/5">
       <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
             <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Estate Exteriors</h2>
             <p className="text-neutral-400 max-w-2xl text-lg font-light">
                Safety doesn't stop at the front door. We extend our biomechanical rigor to your grounds, ensuring your gardens, pools, and motor courts are as secure as your master suite.
             </p>
          </div>

          <div className="space-y-32">
             {exteriorFeatures.map((feat, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8 }}
                    className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
                >
                    <div className="w-full lg:w-3/5 aspect-video relative rounded-sm overflow-hidden shadow-2xl">
                        <SafetyHotspotImage 
                            src={feat.image} 
                            alt={feat.title} 
                            hotspots={feat.hotspots}
                            className="w-full h-full"
                        />
                    </div>
                    <div className="w-full lg:w-2/5 space-y-6">
                        <div className="text-gold text-sm uppercase tracking-widest font-bold">Outdoor Intelligence</div>
                        <h3 className="text-3xl md:text-4xl font-serif text-white">{feat.title}</h3>
                        <p className="text-neutral-400 leading-relaxed font-light">
                            {feat.description}
                        </p>
                        <ul className="space-y-4 pt-4 border-t border-white/10">
                            {feat.hotspots.map((h, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                                    <span className="w-1.5 h-1.5 mt-1.5 bg-gold rounded-full flex-shrink-0"></span>
                                    <span><strong className="text-white">{h.label}:</strong> {h.detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
};