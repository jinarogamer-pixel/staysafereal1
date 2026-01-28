import React from 'react';
import { IconCertificate, IconTools, IconHeartHandshake } from '@tabler/icons-react';

export const About = () => {
  return (
    <section id="about" className="w-full py-32 bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">
              Why We Are Different
            </h2>
            <div className="space-y-8 text-neutral-400 text-lg leading-relaxed">
              <p className="max-w-prose">
                <strong>Stay Safe</strong> was founded on a simple frustration: why does making a home safe mean making it ugly?
              </p>
              <p className="max-w-prose">
                Traditional contractors know how to install a ramp, but they don't understand biomechanics. Healthcare providers understand falls, but they don't understand architecture.
              </p>
              <p className="max-w-prose">
                We bridge that gap. Our team consists of <strong>Licensed Occupational Therapists</strong> who assess your physical needs and <strong>Interior Architects</strong> who ensure the solutions match your estate's design.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                    <div className="bg-white/5 p-3 rounded-sm text-gold">
                        <IconCertificate size={24} />
                    </div>
                    <div>
                        <h4 className="text-white font-serif text-lg">Licensed Experts</h4>
                        <p className="text-neutral-500 text-sm mt-1">Assessments performed by certified Occupational Therapists.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-white/5 p-3 rounded-sm text-gold">
                        <IconTools size={24} />
                    </div>
                    <div>
                        <h4 className="text-white font-serif text-lg">Master Builders</h4>
                        <p className="text-neutral-500 text-sm mt-1">Installers trained in dust containment and finish protection.</p>
                    </div>
                </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
             <div className="aspect-[4/5] bg-neutral-900 rounded-sm overflow-hidden relative shadow-2xl">
                <img 
                    src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1200&auto=format&fit=crop" 
                    alt="Design meeting with blueprints"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8">
                    <div className="flex items-center gap-3 text-gold mb-2">
                        <IconHeartHandshake size={20} />
                        <span className="uppercase tracking-widest text-xs font-bold">Our Promise</span>
                    </div>
                    <p className="text-white text-xl font-serif italic">
                        "We treat your home with the same level of care you treat your health."
                    </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};