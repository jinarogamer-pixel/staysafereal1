import React, { useRef, Suspense, lazy } from "react";
import { FloatingNav } from "./components/ui/floating-navbar";
import { SafetyHotspotImage } from "./components/ui/SafetyHotspotImage";
import { Header } from "./components/Header";
import { About } from "./components/About";
import { 
  IconHome, 
  IconInfoCircle, 
  IconShieldCheck, 
  IconStar, 
  IconActivity, 
  IconBrush, 
  IconTools, 
  IconAward,
  IconAlertCircle
} from "@tabler/icons-react";
import { motion } from "framer-motion";

// Lazy Loaded Components
const BeforeAfter = lazy(() => import('./components/BeforeAfter').then(module => ({ default: module.BeforeAfter })));
const Membership = lazy(() => import('./components/Membership').then(module => ({ default: module.Membership })));
const ConsultationWizard = lazy(() => import('./components/ConsultationWizard').then(module => ({ default: module.ConsultationWizard })));

const navItems = [
  { name: "Home", link: "#hero", icon: <IconHome className="h-5 w-5" /> },
  { name: "Process", link: "#process", icon: <IconActivity className="h-5 w-5" /> },
  { name: "Services", link: "#services", icon: <IconShieldCheck className="h-5 w-5" /> },
  { name: "About", link: "#about", icon: <IconInfoCircle className="h-5 w-5" /> },
  { name: "Pricing", link: "#membership", icon: <IconStar className="h-5 w-5" /> },
  { name: "Contact", link: "#booking", icon: <IconInfoCircle className="h-5 w-5" /> },
];

const methodology = [
  {
    icon: <IconActivity className="w-8 h-8 text-gold" />,
    title: "Expert Assessment",
    description: "We identify risks you might not see and opportunities for elegant solutions. You’ll receive a detailed report with photos, specific recommendations, and transparent pricing for each modification."
  },
  {
    icon: <IconBrush className="w-8 h-8 text-gold" />,
    title: "Invisible Design",
    description: "We select materials that match your home's existing aesthetic. From solid brass grab bars to hidden wall reinforcement, safety never looks like an afterthought."
  },
  {
    icon: <IconTools className="w-8 h-8 text-gold" />,
    title: "White-Glove Install",
    description: "Our artisan builders specialize in high-end homes, using dust barriers and floor protection. We work efficiently to minimize disruption to your daily life."
  },
  {
    icon: <IconAward className="w-8 h-8 text-gold" />,
    title: "Lifetime Support",
    description: "Your needs change over time, and so should your home. We provide annual safety audits and priority service to ensure your environment remains secure."
  }
];

const features = [
  {
    title: "Beautiful Grab Bars",
    text: "Safety doesn't have to look medical. We install solid brass rails that look like high-end towel warmers. They support your weight completely but blend right into your bathroom design.",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14",
    hotspots: [
        { x: 30, y: 40, label: "Hidden Strength", detail: "Reinforced wall backing supports full body weight." },
        { x: 55, y: 35, label: "Secure Grip", detail: "Knurled finish ensures your hand won't slip." },
        { x: 60, y: 75, label: "Softer Floors", detail: "Sub-flooring designed to reduce impact if you fall." }
    ],
    details: [
        "Finishes match your existing hardware",
        "Supports over 500 lbs",
        "Installed into structural studs"
    ]
  },
  {
    title: "Night-Time Safety",
    text: "Most falls happen at night. We install soft, motion-activated lighting along the floor. It guides you to the bathroom without waking you up or needing a switch.",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89",
    hotspots: [
        { x: 50, y: 85, label: "Auto-Sensors", detail: "Lights turn on automatically when your feet hit the floor." },
        { x: 15, y: 55, label: "Soft Glow", detail: "Warm amber light that doesn't hurt your eyes." },
        { x: 80, y: 35, label: "No Shadows", detail: "Even lighting helps you see steps clearly." }
    ],
    details: [
        "Hands-free operation",
        "Battery backup for power outages",
        "Hidden wiring"
    ]
  },
  {
    title: "Easy Movement",
    text: "Trip hazards are everywhere. We smooth out floor transitions and widen doorways so you can walk, use a walker, or use a wheelchair without any obstacles.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    hotspots: [
        { x: 30, y: 80, label: "Smooth Floors", detail: "No bumps or raised thresholds between rooms." },
        { x: 80, y: 45, label: "Wider Doors", detail: "Expanded frames for easy walker or wheelchair access." },
        { x: 60, y: 20, label: "Easy Handles", detail: "Lever handles that are easy to open with one hand." }
    ],
    details: [
        "Flush door thresholds",
        "Slip-resistant tile options",
        "Ramps hidden in landscaping"
    ]
  },
  {
    title: "Pool & Garden Safety",
    text: "Enjoy your Florida outdoor living safely. We treat pool decks to be non-slip and install lifts that disappear into the ground when you aren't using them.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7",
    hotspots: [
        { x: 20, y: 80, label: "Non-Slip Stone", detail: "Invisible coating prevents slipping even when wet." },
        { x: 50, y: 50, label: "Hidden Lift", detail: "Pool lift retracts flush into the deck." },
        { x: 80, y: 30, label: "Smart Alerts", detail: "System alerts you if anyone falls in the pool." }
    ],
    details: [
        "Invisible pool lifts",
        "Level garden paths",
        "Bright pathway lighting"
    ]
  }
];

// Helper to prevent layout shift during lazy loading
const SuspenseSection = ({ children, className }: { children?: React.ReactNode, className: string }) => (
  <Suspense fallback={<div className={className} />}>
    {children}
  </Suspense>
);

export default function App() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="relative w-full bg-[#050505] min-h-screen selection:bg-gold selection:text-black scroll-smooth cursor-auto text-lg text-neutral-300">
      
      {/* Static Elegant Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#121212] via-[#0a0a0a] to-[#050505] z-0 pointer-events-none" />

      <Header />
      <FloatingNav navItems={navItems} />

      <main className="relative z-10 w-full overflow-hidden" id="main-content">
        
        {/* HERO SECTION */}
        <section id="hero" className="relative w-full min-h-[95vh] flex flex-col justify-center px-6 lg:px-20 pt-20">
           {/* Subtle Background Image */}
           <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-20 mask-image-gradient" />
           <div className="absolute inset-0 z-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl z-10"
          >
            <div className="flex items-center gap-4 mb-8">
               <span className="h-[1px] w-20 bg-gradient-to-r from-transparent to-gold"></span>
               <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold">West Palm Beach • Aspen • New York</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight text-white leading-[1.1] mb-8">
              Stay In The Home You Love. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white italic pr-4">
                Safely & Beautifully.
              </span>
            </h1>
            
            <div className="flex flex-col md:flex-row gap-8 md:items-end">
              <p className="text-xl text-neutral-300 max-w-xl font-normal leading-relaxed border-l-2 border-gold/50 pl-6">
                 We transform luxury homes into safe havens without compromising the beauty you love. Invisible safety, installed by experts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#booking" className="group flex items-center justify-center gap-4 px-8 py-5 bg-gold text-black hover:bg-white transition-colors duration-300 min-w-[220px] rounded-sm shadow-lg">
                  <span className="uppercase tracking-widest text-sm font-bold">Book Assessment</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
                <a href="tel:+15615551234" className="group flex items-center justify-center gap-4 px-8 py-5 border border-white/20 text-white hover:bg-white/10 transition-colors duration-300 min-w-[220px] rounded-sm">
                  <span className="uppercase tracking-widest text-sm font-bold">Call (561) 555-1234</span>
                </a>
              </div>
            </div>

            <div className="mt-12 flex gap-8 opacity-70">
                <div className="flex flex-col">
                    <span className="text-2xl font-serif text-white">Licensed</span>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400">Therapists</span>
                </div>
                <div className="w-[1px] h-10 bg-white/20"></div>
                <div className="flex flex-col">
                    <span className="text-2xl font-serif text-white">Expert</span>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400">Installers</span>
                </div>
                <div className="w-[1px] h-10 bg-white/20"></div>
                <div className="flex flex-col">
                    <span className="text-2xl font-serif text-white">Lifetime</span>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400">Warranty</span>
                </div>
            </div>
          </motion.div>
        </section>

        {/* METHODOLOGY */}
        <section id="process" className="w-full py-32 bg-[#080808] relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                      <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Our Process</h2>
                      <p className="text-neutral-400 text-lg font-light leading-relaxed max-w-3xl">
                          We handle everything from the initial safety check to the final cleanup. You get a safer home without the stress.
                      </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {methodology.map((step, i) => (
                        <div 
                            key={i} 
                            className="group p-8 border border-white/5 hover:border-gold/30 bg-[#0c0c0c] transition-all duration-300 relative overflow-hidden rounded-sm flex flex-col h-full"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-serif font-bold text-white group-hover:text-gold transition-colors">
                                0{i+1}
                            </div>
                            <div className="mb-6 bg-white/5 w-14 h-14 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-colors flex-shrink-0">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-serif text-white mb-4">{step.title}</h3>
                            <p className="text-neutral-400 text-base leading-relaxed flex-grow">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ABOUT SECTION - ADDED */}
        <About />

        {/* SERVICES */}
        <section id="services" className="w-full py-32 px-6 bg-[#0a0a0a]">
           <div className="max-w-7xl mx-auto space-y-40">
              <div className="border-b border-white/10 pb-6 mb-12 flex justify-between items-end">
                 <h2 className="text-3xl font-serif text-white">Key Upgrades</h2>
                 <p className="hidden md:block text-neutral-500 text-sm uppercase tracking-widest">Medical Grade • Invisible Design</p>
              </div>
              {features.map((feature, i) => (
                <div 
                    key={i} 
                    className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}
                >
                   <div className="w-full md:w-1/2 aspect-[4/3] relative rounded-sm shadow-2xl bg-neutral-900">
                      <SafetyHotspotImage 
                        src={feature.image} 
                        alt={feature.title}
                        hotspots={feature.hotspots}
                        className="w-full h-full"
                      />
                   </div>
                   <div className="w-full md:w-1/2 space-y-6">
                      <div className="flex items-center gap-4">
                          <div className="text-gold text-lg font-serif italic">0{i + 1}</div>
                          <div className="h-[1px] w-12 bg-white/10"></div>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-serif text-white leading-tight">{feature.title}</h3>
                      
                      <p className="text-neutral-300 text-lg font-light leading-relaxed max-w-prose border-l-2 border-white/5 pl-6">
                        {feature.text}
                      </p>

                      <div className="grid gap-4 mt-8">
                          <h4 className="text-white text-xs uppercase tracking-widest font-bold">Included Features</h4>
                          <ul className="space-y-3">
                            {feature.details.map((detail, idx) => (
                                <li key={idx} className="text-neutral-400 text-base flex items-start gap-3 group/item">
                                    <span className="w-1.5 h-1.5 mt-2.5 bg-gold rounded-full flex-shrink-0"></span>
                                    <span className="group-hover/item:text-white transition-colors">{detail}</span>
                                </li>
                            ))}
                          </ul>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* PORTFOLIO SLIDER (Before/After) */}
        <section id="portfolio" className="w-full py-32 bg-neutral-950 border-t border-white/5">
           <div className="max-w-[1400px] mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                 <div>
                    <h2 className="text-3xl md:text-5xl font-serif text-white">The Visible Difference</h2>
                    <p className="text-neutral-400 mt-4 text-lg max-w-lg">
                        See how we add safety features without ruining the look of your room.
                    </p>
                 </div>
                 <div className="hidden md:block text-right">
                    <p className="text-gold text-sm font-bold uppercase tracking-widest">Interactive Demo</p>
                    <p className="text-neutral-500 text-xs">Drag slider to compare</p>
                 </div>
              </div>
              <SuspenseSection className="h-[600px] w-full bg-neutral-900 rounded-sm">
                <BeforeAfter />
              </SuspenseSection>
           </div>
        </section>

        {/* MEMBERSHIP & PRICING */}
        <SuspenseSection className="py-32 bg-neutral-950">
          <Membership />
        </SuspenseSection>

        {/* FOUNDING OFFER BANNER - REVISED COPY */}
        <section className="w-full py-12 px-6">
            <div className="max-w-4xl mx-auto relative overflow-hidden rounded-sm border border-gold/30 bg-gradient-to-br from-neutral-900 to-black p-8 md:p-12 shadow-[0_0_40px_rgba(212,175,55,0.1)] text-center">
                {/* Decorative Shine */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gold/10 blur-[50px] rounded-full pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="inline-flex items-center justify-center gap-2 text-gold border border-gold/30 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-2">
                        <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                        Limited Availability
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-serif text-white">
                        West Palm Beach Launch Offer
                    </h3>
                    
                    <p className="text-neutral-300 text-lg leading-relaxed max-w-2xl mx-auto">
                        We are accepting our first <span className="text-white font-semibold">10 founding clients</span>. 
                        Receive <span className="text-gold font-bold">$1,000 in installation credits</span> and priority scheduling.
                        In exchange, we ask for detailed testimonials, photography permission, and a reference call with future clients.
                    </p>

                    <div className="pt-4">
                        <a href="#booking" className="inline-flex items-center gap-2 bg-gold text-black px-10 py-4 font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 rounded-sm shadow-lg hover:scale-105">
                            Claim Founding Status
                        </a>
                        <p className="text-neutral-500 text-xs mt-4">
                            Offer ends soon • 3 spots remaining
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* BOOKING */}
        <section id="booking" className="w-full py-32 px-6 flex justify-center bg-gradient-to-b from-black to-[#080808]">
           <div className="w-full max-w-4xl">
              <SuspenseSection className="min-h-[600px]">
                <ConsultationWizard />
              </SuspenseSection>
           </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full border-t border-white/5 py-16 bg-black px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="space-y-4">
                    <div className="text-3xl font-serif text-white italic">Stay Safe</div>
                    <p className="text-neutral-500 text-sm max-w-xs leading-relaxed">
                       Concierge home safety transformations for the discerning homeowner.
                       <br/>
                       West Palm Beach • Aspen • New York
                    </p>
                    <div className="pt-4">
                         <a href="tel:+15615551234" className="text-white text-lg font-medium hover:text-gold transition-colors block mb-1">
                            (561) 555-1234
                        </a>
                        <a href="mailto:info@staysafe.com" className="text-neutral-400 text-sm hover:text-white transition-colors">
                            info@staysafe.com
                        </a>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-12 sm:gap-24">
                    <div className="flex flex-col gap-4">
                        <span className="text-white font-medium mb-2 uppercase tracking-widest text-xs">Company</span>
                        <a href="#about" className="text-neutral-500 text-sm hover:text-gold transition-colors">About Us</a>
                        <a href="#services" className="text-neutral-500 text-sm hover:text-gold transition-colors">Services</a>
                        <a href="#booking" className="text-neutral-500 text-sm hover:text-gold transition-colors">Contact</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-white font-medium mb-2 uppercase tracking-widest text-xs">Legal</span>
                        <a href="#" className="text-neutral-500 text-sm hover:text-gold transition-colors">Privacy Policy</a>
                        <a href="#" className="text-neutral-500 text-sm hover:text-gold transition-colors">Terms of Service</a>
                        <a href="#" className="text-neutral-500 text-sm hover:text-gold transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-8 text-center md:text-left text-neutral-600 text-xs">
                © {new Date().getFullYear()} Stay Safe Design. All rights reserved.
            </div>
        </footer>

      </main>
    </div>
  );
}