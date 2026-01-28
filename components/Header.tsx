import React from 'react';
import { IconMail, IconPhone } from '@tabler/icons-react';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/90 border-b border-white/10 backdrop-blur-sm h-20 flex items-center transition-all">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-2xl font-serif text-gold italic leading-none">Stay Safe</div>
          <div className="text-[10px] text-neutral-400 uppercase tracking-widest hidden md:block mt-1">Estate Age-Proofing</div>
        </div>
        
        <div className="flex items-center gap-6">
            <a 
              href="tel:+15615551234" 
              className="flex items-center gap-3 text-white hover:text-gold transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-gold/20 flex items-center justify-center transition-colors">
                  <IconPhone className="w-5 h-5" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Call for Assessment</div>
                <div className="text-lg font-medium leading-none">(561) 555-1234</div>
              </div>
            </a>

            <a 
              href="#booking" 
              className="hidden sm:flex items-center gap-2 bg-gold text-black px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
            >
              <span>Inquire</span>
              <IconMail size={16} />
            </a>
        </div>
      </div>
    </header>
  );
};