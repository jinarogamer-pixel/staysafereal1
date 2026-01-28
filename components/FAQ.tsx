import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronDown } from '@tabler/icons-react';

const faqs = [
  {
    question: "How long does installation take?",
    answer: "Most interior modifications take 3-7 days for completion. Exterior work like ramps or landscaping typically requires 2-3 weeks. We'll provide an exact timeline during your initial assessment and stick to it."
  },
  {
    question: "Will modifications affect my home's resale value?",
    answer: "Our luxury approach actually increases property value. We use premium materials and design that appeals to all buyers, not just those with accessibility needs. Features like wider doorways, better lighting, and zero-threshold entries are universal selling points that enhance any home."
  },
  {
    question: "Do you work with my existing contractors?",
    answer: "Absolutely. Our Platinum Concierge service includes full coordination with your architect, landscape designer, or general contractor to ensure modifications integrate seamlessly with any ongoing projects or future plans."
  },
  {
    question: "What happens if my needs change over time?",
    answer: "That's exactly why we offer annual reassessments. As your needs evolve, we modify your home progressively. Guardian and Platinum members receive priority scheduling and discounted rates for any updates or additions."
  },
  {
    question: "How is Stay Safe different from just hiring a contractor?",
    answer: "We specialize exclusively in age-proofing with medical expertise (licensed OTs), luxury design standards, and ongoing support. General contractors may not understand biomechanics, ADA compliance, or how to integrate safety features without compromising aesthetics."
  },
  {
    question: "Do I need to be present during installation?",
    answer: "Not necessarily. Many of our clients travel seasonally. We can coordinate with property managers or trusted staff. All Guardian and Platinum members receive photo/video updates throughout the installation process."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
            Common Questions
          </h2>
          <p className="text-neutral-400 text-lg font-light">
            Everything you need to know about our process
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-white/10 hover:border-gold/30 transition-colors bg-black/40 rounded-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
                aria-expanded={openIndex === index}
              >
                <span className="text-white text-lg font-medium group-hover:text-gold transition-colors pr-8">
                  {faq.question}
                </span>
                <IconChevronDown 
                  className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-neutral-400 text-base leading-relaxed border-t border-white/5 pt-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="#booking"
            className="text-neutral-500 hover:text-white transition-colors text-sm border-b border-transparent hover:border-white pb-1"
          >
            Have more questions? Contact us directly.
          </a>
        </div>
      </div>
    </section>
  );
};