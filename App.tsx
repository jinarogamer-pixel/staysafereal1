import React, { useRef, useState } from "react";
import { FloatingNav } from "./components/ui/floating-navbar";
import { ThreeExperience } from "./components/ThreeExperience";
import { VisionPreview } from "./components/VisionPreview";
import { BeforeAfter } from "./components/BeforeAfter";
import { AnimatedTestimonials } from "./components/ui/AnimatedTestimonials";
import { Resources } from "./components/Resources";
import { ConsultationWizard } from "./components/ConsultationWizard";
import { OptimizedImage } from "./components/ui/OptimizedImage";
import { SafetyHotspotImage } from "./components/ui/SafetyHotspotImage";
import { NoiseOverlay } from "./components/ui/NoiseOverlay";
import { CustomCursor } from "./components/ui/CustomCursor";
import { Philosophy } from "./components/Philosophy";
import { Exteriors } from "./components/Exteriors";
import { Membership } from "./components/Membership";
import { 
  IconHome, 
  IconInfoCircle, 
  IconShieldCheck, 
  IconStar, 
  IconActivity, 
  IconBrush, 
  IconTools, 
  IconAward,
  IconBook,
  IconStethoscope,
  IconRulerMeasure,
  IconTrees
} from "@tabler/icons-react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const navItems = [
  { name: "Home", link: "#hero", icon: <IconHome className="h-4 w-4 text-neutral-500" /> },
  { name: "Process", link: "#process", icon: <IconActivity className="h-4 w-4 text-neutral-500" /> },
  { name: "Interiors", link: "#services", icon: <IconShieldCheck className="h-4 w-4 text-neutral-500" /> },
  { name: "Exteriors", link: "#exteriors", icon: <IconTrees className="h-4 w-4 text-neutral-500" /> },
  { name: "Membership", link: "#membership", icon: <IconStar className="h-4 w-4 text-neutral-500" /> },
  { name: "Portfolio", link: "#portfolio", icon: <IconInfoCircle className="h-4 w-4 text-neutral-500" /> },
];

const methodology = [
  {
    icon: <IconActivity className="w-8 h-8 text-gold" />,
    title: "Clinical Calibration",
    description: "We don't guess. Our process begins with a biomechanical assessment by licensed Occupational Therapists to identify specific risk vectors unique to your physiology."
  },
  {
    icon: <IconBrush className="w-8 h-8 text-gold" />,
    title: "Aesthetic Integration",
    description: "Safety shouldn't look sterile. Our ASID-certified interior designers select materials (brass, marble, walnut) that complement, not compromise, your home's character."
  },
  {
    icon: <IconTools className="w-8 h-8 text-gold" />,
    title: "Master Craftsmanship",
    description: "Installations are executed by artisan builders accustomed to high-end finishes. We use dust barriers, floor protection, and white-glove cleanup protocols."
  },
  {
    icon: <IconAward className="w-8 h-8 text-gold" />,
    title: "The Forever Promise",
    description: "We stand behind our work with a lifetime warranty on structural reinforcements and annual complimentary safety re-evaluations as your needs evolve."
  }
];

const features = [
  {
    title: "Bespoke Fall Prevention",
    text: "Forget institutional plastic. We integrate hospital-grade support into designer fixtures. Think polished brass grip rails that double as towel warmers, and reinforced walls hidden behind Italian marble.",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14", // Updated robust URL
    hotspots: [
        { x: 30, y: 40, label: "Reinforced Blocking", detail: "Structural 2x6 backing installed behind marble to support >500lb loads." },
        { x: 55, y: 35, label: "Grip Integration", detail: "Knurled brass finish provides 3x friction coefficient of standard chrome." },
        { x: 60, y: 75, label: "Impact Absorption", detail: "Sub-flooring layer designed to reduce peak impact force by 40%." }
    ],
    details: [
        "Custom-finished grab bars (Brass, Matte Black, Nickel)",
        "Reinforced structural blocking for future adaptability",
        "Anti-slip nano-coatings for existing tile"
    ]
  },
  {
    title: "Intelligent Illumination",
    text: "Falls often happen at night. We install motion-activated, amber-spectrum toe-kick lighting that guides the way to the restroom without disrupting circadian rhythms or waking a partner.",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89",
    hotspots: [
        { x: 50, y: 85, label: "Toe-Kick Sensors", detail: "Passive IR sensors activate floor-level lighting upon motion." },
        { x: 15, y: 55, label: "Circadian Amber", detail: "2700K color temp prevents blue-light wakefulness triggers." },
        { x: 80, y: 35, label: "Shadow Reduction", detail: "Multi-point recessed lights eliminate depth-perception distorting shadows." }
    ],
    details: [
        "Motion-sensing baseboard LEDs",
        "Under-bed glow systems",
        "Voice-activated scenes"
    ]
  },
  {
    title: "Architectural Mobility",
    text: "Seamless movement requires zero thresholds. We regrade floors for flush transitions and widen doorways, ensuring that wheelchairs or walkers glide effortlessly from room to room.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    hotspots: [
        { x: 30, y: 80, label: "Zero-Threshold", detail: "Flush transition regraded to within 1/8 inch tolerance." },
        { x: 80, y: 45, label: "Widened Aperture", detail: "Door frame expanded to 36 inches for clear wheelchair clearance." },
        { x: 60, y: 20, label: "Offset Hinges", detail: "Specialized hardware adds 2 inches of clear passage width." }
    ],
    details: [
        "Zero-entry showers",
        "Flush door thresholds",
        "Hidden landscaping ramps"
    ]
  }
];

export default function App() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [currentSection, setCurrentSection] = useState("hero");
  
  // Parallax effects
  const heroTextY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Track section for 3D experience
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 800) setCurrentSection("hero");
    else if (latest < 2500) setCurrentSection("philosophy");
    else if (latest < 3500) setCurrentSection("process");
    else if (latest < 5000) setCurrentSection("services");
    else if (latest < 6000) setCurrentSection("portfolio");
    else setCurrentSection("booking");
  });

  return (
    <div ref={containerRef} className="relative w-full bg-[#050505] min-h-screen selection:bg-gold selection:text-black scroll-smooth cursor-none">
      <CustomCursor />
      <NoiseOverlay />
      
      {/* Background 3D Layer - Subtle ambient movement */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none mix-blend-screen">
         <ThreeExperience currentSection={currentSection} />
      </div>

      <FloatingNav navItems={navItems} />

      <main className="relative z-10 w-full overflow-hidden">
        
        {/* HERO SECTION - Editorial Layout */}
        <section id="hero" className="relative w-full min-h-screen flex flex-col justify-center px-6 lg:px-20 pt-20 perspective-1000">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#111] to-transparent pointer-events-none" />
          
          <motion.div 
            style={{ y: heroTextY, opacity: heroOpacity }}
            className="max-w-4xl z-10"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
            >
               <span className="h-[1px] w-20 bg-gradient-to-r from-transparent to-gold"></span>
               <span className="text-gold/80 uppercase tracking-[0.3em] text-xs font-medium">West Palm Beach • Aspen • New York</span>
            </motion.div>
            
            <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="text-6xl md:text-9xl font-serif font-medium tracking-tighter text-white leading-[0.9] mb-8"
            >
              Estate <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-neutral-200 to-neutral-600 italic pr-4">
                Future-Proofing.
              </span>
            </motion.h1>
            
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 0.8 }}
               className="flex flex-col md:flex-row gap-8 md:items-end"
            >
              <p className="text-lg text-neutral-400 max-w-xl font-light leading-relaxed border-l border-white/10 pl-6">
                From zero-threshold gardens to clinical-grade interior architecture. We provide comprehensive safety intelligence for the entire estate—inside and out.
              </p>
              
              <a href="#membership" className="group flex items-center gap-4 px-8 py-4 bg-white text-black hover:bg-gold transition-colors duration-500">
                <span className="uppercase tracking-widest text-sm font-bold">Explore Membership</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* PHILOSOPHY / STORYTELLING SECTION */}
        <div id="philosophy">
          <Philosophy />
        </div>

        {/* METHODOLOGY / DIFFERENTIATION */}
        <section id="process" className="w-full py-32 bg-[#080808] relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8"
                >
                    <div className="max-w-3xl">
                      <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">The Stay Safe Standard</h2>
                      <p className="text-neutral-400 text-lg font-light leading-relaxed">
                          Most contractors see a patient. We see a patron. Our proprietary methodology bridges the gap between medical necessity and architectural beauty.
                      </p>
                    </div>
                    {/* DIFFERENTIATION TAG */}
                    <div className="flex flex-col items-start md:items-end gap-2 text-right">
                       <div className="flex items-center gap-2 text-gold">
                          <IconStethoscope size={20} />
                          <span className="uppercase tracking-widest text-xs font-bold">Clinical Rigor</span>
                       </div>
                       <div className="h-[1px] w-full bg-white/20"></div>
                       <div className="flex items-center gap-2 text-neutral-400">
                          <IconRulerMeasure size={20} />
                          <span className="uppercase tracking-widest text-xs">Architectural Precision</span>
                       </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {methodology.map((step, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group p-8 border border-white/5 hover:border-gold/30 bg-[#0c0c0c] transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-serif font-bold text-white group-hover:text-gold transition-colors">
                                0{i+1}
                            </div>
                            <div className="mb-8 bg-white/5 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-serif text-white mb-4">{step.title}</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* SERVICES / FEATURES - Magazine Style with HOTSPOTS */}
        <section id="services" className="w-full py-20 px-6 bg-[#0a0a0a]">
           <div className="max-w-7xl mx-auto space-y-32">
              <div className="border-b border-white/10 pb-8 mb-12">
                 <h2 className="text-3xl font-serif text-white">Interior Architecture</h2>
              </div>
              {features.map((feature, i) => (
                <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8 }}
                    className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}
                >
                   <div className="w-full md:w-1/2 aspect-[4/5] relative overflow-hidden group rounded-sm shadow-2xl">
                      {/* Using SafetyHotspotImage to visualize hidden tech */}
                      <SafetyHotspotImage 
                        src={feature.image} 
                        alt={feature.title}
                        hotspots={feature.hotspots}
                        className="w-full h-full"
                      />
                   </div>
                   <div className="w-full md:w-1/2 space-y-8">
                      <div className="flex items-center gap-4">
                          <div className="text-gold text-lg font-serif italic">0{i + 1}</div>
                          <div className="h-[1px] w-12 bg-white/10"></div>
                      </div>
                      
                      <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight">{feature.title}</h3>
                      
                      <p className="text-neutral-400 text-lg font-light leading-relaxed max-w-md border-l-2 border-white/5 pl-6">
                        {feature.text}
                      </p>

                      <div className="grid gap-4">
                          <h4 className="text-white text-sm uppercase tracking-widest font-bold">Specific Interventions</h4>
                          <ul className="space-y-3">
                            {feature.details.map((detail, idx) => (
                                <li key={idx} className="text-neutral-400 text-sm flex items-start gap-3 group/item">
                                    <span className="w-1.5 h-1.5 mt-1.5 bg-gold rounded-full group-hover/item:scale-150 transition-transform"></span>
                                    <span className="group-hover/item:text-white transition-colors">{detail}</span>
                                </li>
                            ))}
                          </ul>
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </section>

        {/* EXTERIORS SECTION */}
        <Exteriors />

        {/* BEFORE / AFTER SLIDER */}
        <section id="portfolio" className="w-full py-32 bg-neutral-950">
           <div className="max-w-[1800px] mx-auto px-6">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="flex flex-col md:flex-row justify-between items-end mb-12"
              >
                 <h2 className="text-4xl md:text-6xl font-serif text-white">The Invisible Update</h2>
                 <p className="text-neutral-500 max-w-md text-right mt-4 md:mt-0">
                    Drag the slider completely to the left to reveal the hidden engineering specifications that make our designs medical-grade.
                 </p>
              </motion.div>
              <BeforeAfter />
           </div>
        </section>

        {/* MEMBERSHIP / SERVICE MODEL */}
        <Membership />

        {/* VEO VISION PREVIEW */}
        <section id="vision" className="w-full py-32 bg-[#080808] border-y border-white/5">
           <div className="max-w-6xl mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">Digital Twin Audit</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto mb-12">
                 Part of our initial assessment includes a comprehensive AI visualization of your specific floorplan. Upload a video walkthrough to receive a preliminary risk vector analysis.
              </p>
              
              <VisionPreview />
           </div>
        </section>

        {/* JOURNAL / RESOURCES */}
        <Resources />

        {/* TESTIMONIALS */}
        <section className="w-full py-20 bg-black">
            <h2 className="text-center text-4xl font-serif text-white mb-12">Client Stories</h2>
            <AnimatedTestimonials />
        </section>

        {/* BOOKING SECTION (CONSULTATION WIZARD) */}
        <section id="booking" className="w-full py-32 px-6 flex justify-center bg-gradient-to-b from-black to-[#080808]">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="w-full max-w-5xl"
           >
              <ConsultationWizard />
           </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="w-full border-t border-white/5 py-12 bg-black px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="space-y-4">
                    <div className="text-3xl font-serif text-white italic">Stay Safe</div>
                    <p className="text-neutral-600 text-sm max-w-xs">
                       Concierge home safety transformations for the discerning homeowner.
                    </p>
                </div>
                <div className="flex gap-12 text-sm text-neutral-500">
                    <div className="flex flex-col gap-2">
                        <span className="text-white font-medium mb-2">Company</span>
                        <a href="#" className="hover:text-gold transition-colors">About</a>
                        <a href="#" className="hover:text-gold transition-colors">Careers</a>
                        <a href="#" className="hover:text-gold transition-colors">Press</a>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-white font-medium mb-2">Legal</span>
                        <a href="#" className="hover:text-gold transition-colors">Privacy</a>
                        <a href="#" className="hover:text-gold transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>

      </main>
    </div>
  );
}