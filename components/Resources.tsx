import React from 'react';
import { motion } from 'framer-motion';
import { IconArrowUpRight } from '@tabler/icons-react';
import { OptimizedImage } from './ui/OptimizedImage';

const articles = [
  {
    category: "Financial Intelligence",
    title: "The Hidden ROI of Aging in Place vs. Assisted Living",
    excerpt: "A comprehensive financial analysis showing how preventative home architecture costs 70% less than luxury care facilities over a 5-year horizon.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
    readTime: "5 min read",
    link: "#"
  },
  {
    category: "Design Aesthetics",
    title: "Form Meets Function: The End of Institutional Hardware",
    excerpt: "We review the top European manufacturers reimagining grab bars as architectural jewelry—featuring polished brass, matte black, and knurled steel textures.",
    image: "https://images.unsplash.com/photo-1620626012053-1c1ad712952b?q=80&w=800&auto=format&fit=crop",
    readTime: "4 min read",
    link: "#"
  },
  {
    category: "Expert Insights",
    title: "5 Invisible Hazards in the Modern Florida Home",
    excerpt: "Why open-plan layouts and terrazzo floors, while beautiful, present unique biomechanical challenges for seniors—and how to mitigate them subtly.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
    readTime: "6 min read",
    link: "#"
  }
];

export const Resources = () => {
  return (
    <section id="journal" className="w-full py-32 bg-[#050505] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="space-y-4">
             <h2 className="text-4xl md:text-6xl font-serif text-white">The Journal</h2>
             <p className="text-neutral-400 max-w-xl text-lg font-light">
               Expert perspectives on architectural safety, longevity design, and the economics of comfortable aging.
             </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-gold uppercase tracking-widest text-sm hover:text-white transition-colors mt-8 md:mt-0">
            <span>View Archive</span>
            <IconArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <motion.article 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="relative overflow-hidden aspect-[4/3] mb-6 rounded-sm">
                <OptimizedImage 
                  src={article.image} 
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 text-xs text-white uppercase tracking-widest border border-white/10 z-10">
                  {article.category}
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center text-xs text-neutral-500 mb-3 uppercase tracking-wider">
                  <span>{article.readTime}</span>
                  <span className="group-hover:text-gold transition-colors">Read Article</span>
                </div>
                <h3 className="text-2xl font-serif text-white mb-3 leading-tight group-hover:text-gold transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-neutral-400 font-light leading-relaxed text-sm mb-6 flex-1">
                  {article.excerpt}
                </p>
                <div className="h-[1px] w-full bg-white/10 group-hover:bg-gold/50 transition-colors"></div>
              </div>
            </motion.article>
          ))}
        </div>

        <button className="md:hidden w-full flex justify-center items-center gap-2 text-gold uppercase tracking-widest text-sm hover:text-white transition-colors mt-12 border border-white/10 py-4">
            <span>View Archive</span>
            <IconArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};