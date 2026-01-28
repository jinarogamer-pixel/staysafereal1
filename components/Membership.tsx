import React from 'react';
import { motion } from 'framer-motion';
import { IconScan, IconDiamond, IconBuildingEstate, IconCheck } from '@tabler/icons-react';

const offerings = [
    {
        icon: <IconScan size={28} />,
        name: "Complete Assessment",
        subtitle: "One-Time Project",
        price: "$2,500",
        priceSub: "Credit applied to installation",
        description: "Everything you need to get started. We assess your home, design a plan, and give you a quote for the work.",
        features: [
            "In-Home Safety Evaluation",
            "Custom Design Plan",
            "Full Installation Quote",
            "5-Year Warranty on Work",
        ],
        cta: "Book Assessment",
        highlight: false,
        popular: false,
    },
    {
        icon: <IconDiamond size={28} />,
        name: "Guardian Membership",
        subtitle: "Annual Protection",
        price: "$5,500",
        priceSub: "Per Year",
        description: "Best for peace of mind. Includes the assessment plus annual check-ups to make sure your home stays safe as your needs change.",
        features: [
            "Includes Initial Assessment",
            "Annual Safety Check-up",
            "Priority Service for Repairs",
            "Storm Prep Checks",
            "Dedicated Support Line"
        ],
        cta: "Join Guardian",
        highlight: true,
        popular: true,
    },
    {
        icon: <IconBuildingEstate size={28} />,
        name: "Platinum Concierge",
        subtitle: "White-Glove Estate Care",
        price: "$18,000",
        priceSub: "Per Year",
        description: "Total care for larger estates. We coordinate everything with your staff and handle all maintenance proactively.",
        features: [
            "Includes Assessment & Design",
            "Quarterly Site Visits",
            "24/7 Emergency Response",
            "Coordination with Your Staff",
            "Full Maintenance Management"
        ],
        cta: "Contact Us",
        highlight: false,
        popular: false,
    }
];

export const Membership = () => {
  return (
    <section id="membership" className="w-full py-24 bg-neutral-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Simple Pricing</h2>
                <p className="text-neutral-400 max-w-2xl mx-auto text-lg font-light">
                    Clear costs. No hidden fees. Choose the level of support that's right for you.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {offerings.map((tier, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className={`relative p-8 rounded-sm border transition-all duration-500 flex flex-col group ${
                          tier.highlight 
                            ? 'bg-neutral-900 border-gold shadow-[0_0_40px_rgba(212,175,55,0.1)] scale-105 z-10' 
                            : 'bg-black border-white/10 hover:border-gold/30'
                        }`}
                    >
                        {tier.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black text-xs font-bold px-4 py-1.5 uppercase tracking-widest rounded-full shadow-lg">
                                Most Popular
                            </div>
                        )}
                        
                        <div className="mb-6 border-b border-white/10 pb-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                                tier.highlight ? 'bg-gold text-black' : 'bg-white/5 text-gold'
                                }`}>
                                {tier.icon}
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-serif text-white">{tier.price}</div>
                                    <div className="text-neutral-500 text-xs uppercase tracking-wide">{tier.priceSub}</div>
                                </div>
                            </div>
                            <h3 className="text-xl font-serif text-white">{tier.name}</h3>
                            <div className="text-neutral-500 text-xs uppercase tracking-widest mt-1">{tier.subtitle}</div>
                        </div>

                        <p className="text-neutral-400 text-sm leading-relaxed mb-8 flex-grow">
                            {tier.description}
                        </p>

                        <ul className="space-y-4 mb-8">
                            {tier.features.map((feat, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <IconCheck className={`w-5 h-5 flex-shrink-0 ${
                                  tier.highlight ? 'text-gold' : 'text-neutral-600'
                                }`} />
                                <span className="text-neutral-300 text-sm">{feat}</span>
                              </li>
                            ))}
                        </ul>

                        <a href="#booking" className={`block w-full py-4 text-center uppercase tracking-widest text-sm font-bold transition-all duration-300 rounded-sm ${
                          tier.highlight 
                            ? 'bg-gold text-black hover:bg-white' 
                            : 'bg-white/5 text-white hover:bg-white hover:text-black'
                        }`}>
                            {tier.cta}
                        </a>
                    </motion.div>
                ))}
            </div>

            <div className="text-center space-y-2">
                 <p className="text-neutral-400 text-sm">
                    <strong>Founding Offer:</strong> First 10 clients receive $1,000 credit towards installation.
                 </p>
                 <p className="text-neutral-600 text-xs">
                    *Installation costs quoted separately after assessment.
                 </p>
            </div>
        </div>
    </section>
  );
};