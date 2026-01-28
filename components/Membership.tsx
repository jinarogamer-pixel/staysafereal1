import React from 'react';
import { motion } from 'framer-motion';
import { IconScan, IconDiamond, IconBuildingEstate, IconCheck, IconArrowRight } from '@tabler/icons-react';

const offerings = [
    {
        icon: <IconScan size={32} />,
        name: "The Forensic Audit",
        subtitle: "Diagnostic Entry Point",
        description: "A comprehensive digital and biomechanical review of your estate. We identify hidden risk vectors before they become liabilities.",
        features: [
            "AI-Assisted Spatial Scanning",
            "OT-Certified Gait Analysis",
            "Digital Twin Risk Mapping",
            "Prioritized Retrofit Roadmap"
        ],
        cta: "Request Private Audit",
        highlight: false
    },
    {
        icon: <IconDiamond size={32} />,
        name: "Guardian Membership",
        subtitle: "The Stewardship Protocol",
        description: "Ongoing proactive protection. Like a security detail for your health, we monitor, maintain, and adapt your home as needs evolve.",
        features: [
            "Continuous Sensor Monitoring",
            "Quarterly Video Re-Certifications",
            "Priority Deployment of Aids",
            "24/7 Concierge Support"
        ],
        cta: "Inquire for Access",
        highlight: true
    },
    {
        icon: <IconBuildingEstate size={32} />,
        name: "Estate Transformation",
        subtitle: "Turnkey Architecture",
        description: "Complete structural reimagining of interiors and exteriors. We execute hospital-grade safety with Architectural Digest aesthetics.",
        features: [
            "Zero-Threshold Landscape Regrading",
            "Invisible Lift Integration",
            "Custom Fabrication (Brass/Stone)",
            "Hurricane-Rated Safety Glass"
        ],
        cta: "View Design Parcels",
        highlight: false
    }
];

export const Membership = () => {
  return (
    <section id="membership" className="w-full py-32 bg-neutral-950 relative overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-900/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Service Ecosystem</h2>
                <p className="text-neutral-400 max-w-2xl mx-auto text-lg font-light">
                    We do not sell products. We provide a comprehensive infrastructure for longevity. 
                    Select your level of engagement.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {offerings.map((tier, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className={`relative p-8 rounded-sm border transition-all duration-500 flex flex-col group ${tier.highlight ? 'bg-white/5 border-gold shadow-[0_0_50px_rgba(212,175,55,0.1)]' : 'bg-black border-white/10 hover:border-gold/30'}`}
                    >
                        {tier.highlight && (
                            <div className="absolute top-0 right-0 bg-gold text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                                Signature Service
                            </div>
                        )}
                        
                        <div className="mb-8">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 ${tier.highlight ? 'bg-gold text-black' : 'bg-white/5 text-gold group-hover:bg-gold group-hover:text-black'}`}>
                                {tier.icon}
                            </div>
                            <h3 className="text-2xl font-serif text-white">{tier.name}</h3>
                            <div className="text-neutral-500 text-xs uppercase tracking-widest mt-2">{tier.subtitle}</div>
                        </div>

                        <p className="text-neutral-400 font-light leading-relaxed mb-8 border-b border-white/10 pb-8 min-h-[100px]">
                            {tier.description}
                        </p>

                        <ul className="space-y-4 mb-12 flex-1">
                            {tier.features.map((feat, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <IconCheck className={`w-4 h-4 flex-shrink-0 mt-1 ${tier.highlight ? 'text-gold' : 'text-neutral-600 group-hover:text-gold'}`} />
                                    <span className="text-neutral-300 text-sm">{feat}</span>
                                </li>
                            ))}
                        </ul>

                        <a href="#booking" className={`block w-full py-4 text-center uppercase tracking-widest text-xs font-bold transition-all duration-300 border ${tier.highlight ? 'bg-gold border-gold text-black hover:bg-white hover:border-white' : 'bg-transparent border-white/20 text-white hover:bg-white hover:text-black hover:border-white'}`}>
                            {tier.cta}
                        </a>
                    </motion.div>
                ))}
            </div>

            {/* Trust / Process Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
                 <div className="flex items-center gap-4">
                    <div className="text-4xl font-serif text-white/20">01</div>
                    <div>
                        <div className="text-white text-sm font-bold uppercase tracking-wider">Evaluation</div>
                        <div className="text-neutral-500 text-xs mt-1">Video or On-Site Assessment</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="text-4xl font-serif text-white/20">02</div>
                    <div>
                        <div className="text-white text-sm font-bold uppercase tracking-wider">Proposal</div>
                        <div className="text-neutral-500 text-xs mt-1">Bespoke Strategy & Pricing</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="text-4xl font-serif text-white/20">03</div>
                    <div>
                        <div className="text-white text-sm font-bold uppercase tracking-wider">Execution</div>
                        <div className="text-neutral-500 text-xs mt-1">White-Glove Installation</div>
                    </div>
                 </div>
            </div>

            <div className="mt-16 text-center">
                 <p className="text-neutral-500 text-sm font-light">
                    <span className="text-gold">*</span> All engagements begin with a discovery consultation. Pricing is bespoke. 
                    <a href="#booking" className="underline hover:text-white ml-1 transition-colors">Request proposal.</a>
                 </p>
            </div>
        </div>
    </section>
  );
};