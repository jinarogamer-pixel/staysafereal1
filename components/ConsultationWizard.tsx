import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconArrowRight, IconCheck, IconHome, IconCalendar, IconUser, IconClipboardList } from '@tabler/icons-react';

export const ConsultationWizard = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    propertyType: '',
    concerns: [] as string[],
    timeline: ''
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleConcern = (concern: string) => {
    setFormData(prev => {
      const newConcerns = prev.concerns.includes(concern)
        ? prev.concerns.filter(c => c !== concern)
        : [...prev.concerns, concern];
      return { ...prev, concerns: newConcerns };
    });
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const steps = [
    {
      id: 'intro',
      title: "Private Assessment",
      subtitle: "Let's determine the safety profile of your residence.",
      icon: <IconUser className="w-6 h-6" />
    },
    {
      id: 'property',
      title: "Property Profile",
      subtitle: "What type of architecture are we working with?",
      icon: <IconHome className="w-6 h-6" />
    },
    {
      id: 'concerns',
      title: "Primary Objectives",
      subtitle: "Select all areas requiring biomechanical optimization.",
      icon: <IconClipboardList className="w-6 h-6" />
    },
    {
      id: 'timeline',
      title: "Timeline & Contact",
      subtitle: "When should we schedule the on-site audit?",
      icon: <IconCalendar className="w-6 h-6" />
    },
    {
      id: 'success',
      title: "Request Received",
      subtitle: "Your safety profile has been initiated.",
      icon: <IconCheck className="w-6 h-6" />
    }
  ];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#111] border border-white/5 relative overflow-hidden flex flex-col md:flex-row min-h-[500px] shadow-2xl rounded-sm">
      
      {/* Sidebar / Progress */}
      <div className="w-full md:w-1/3 bg-neutral-900/50 p-8 border-r border-white/5 flex flex-col justify-between relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
         <div>
            <div className="text-gold font-serif italic text-2xl mb-8">Stay Safe</div>
            <div className="space-y-6">
                {steps.map((s, idx) => (
                    <div key={s.id} className={`flex items-center gap-3 transition-colors duration-300 ${idx <= step ? 'text-white' : 'text-neutral-600'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs font-medium transition-all duration-300 
                            ${idx < step ? 'bg-gold border-gold text-black' : 
                              idx === step ? 'bg-white/10 border-gold text-gold' : 'border-white/10'}`}>
                            {idx < step ? <IconCheck size={14} /> : idx + 1}
                        </div>
                        <span className="text-sm tracking-wide">{s.title}</span>
                    </div>
                ))}
            </div>
         </div>
         <div className="mt-8 text-xs text-neutral-500 font-mono">
            SECURE_CONNECTION_ESTABLISHED<br/>
            AES_256_ENCRYPTED
         </div>
      </div>

      {/* Main Form Area */}
      <div className="w-full md:w-2/3 p-8 md:p-12 relative">
        <AnimatePresence mode="wait" custom={step}>
          
          {/* STEP 1: INTRO */}
          {step === 0 && (
            <motion.div key="intro" variants={variants} initial="enter" animate="center" exit="exit" className="h-full flex flex-col justify-center space-y-8">
               <div>
                 <h2 className="text-3xl font-serif text-white mb-2">{steps[0].title}</h2>
                 <p className="text-neutral-400">{steps[0].subtitle}</p>
               </div>
               <div className="space-y-4">
                  <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Full Name</label>
                    <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="w-full bg-neutral-900/50 border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors" 
                        placeholder="e.g. Jonathan Smith"
                        autoFocus
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Email Address</label>
                    <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full bg-neutral-900/50 border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors" 
                        placeholder="name@example.com"
                    />
                  </div>
               </div>
               <div className="pt-4">
                  <button onClick={nextStep} className="flex items-center gap-2 bg-gold text-black px-8 py-3 font-bold text-sm tracking-widest hover:bg-white transition-colors">
                     START ASSESSMENT <IconArrowRight size={16} />
                  </button>
               </div>
            </motion.div>
          )}

          {/* STEP 2: PROPERTY */}
          {step === 1 && (
            <motion.div key="property" variants={variants} initial="enter" animate="center" exit="exit" className="h-full flex flex-col justify-center space-y-8">
               <div>
                 <h2 className="text-3xl font-serif text-white mb-2">{steps[1].title}</h2>
                 <p className="text-neutral-400">{steps[1].subtitle}</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Single Family Estate', 'Luxury Condo', 'Townhouse/Villa', 'Historic Property'].map((type) => (
                      <button
                        key={type}
                        onClick={() => updateField('propertyType', type)}
                        className={`p-4 border text-left transition-all duration-300 hover:border-gold/50 ${formData.propertyType === type ? 'border-gold bg-gold/10 text-white' : 'border-white/10 text-neutral-400'}`}
                      >
                         <div className="text-sm font-medium">{type}</div>
                      </button>
                  ))}
               </div>
               <div className="flex gap-4 pt-4">
                  <button onClick={prevStep} className="text-neutral-500 text-sm hover:text-white transition-colors">Back</button>
                  <button onClick={nextStep} disabled={!formData.propertyType} className="flex items-center gap-2 bg-white text-black px-8 py-3 font-bold text-sm tracking-widest hover:bg-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                     NEXT <IconArrowRight size={16} />
                  </button>
               </div>
            </motion.div>
          )}

          {/* STEP 3: CONCERNS */}
          {step === 2 && (
             <motion.div key="concerns" variants={variants} initial="enter" animate="center" exit="exit" className="h-full flex flex-col justify-center space-y-8">
               <div>
                 <h2 className="text-3xl font-serif text-white mb-2">{steps[2].title}</h2>
                 <p className="text-neutral-400">{steps[2].subtitle}</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Fall Prevention', 'Bathroom Safety', 'Lighting/Visibility', 'Wheelchair Access', 'Post-Surgery Recovery', 'General Future Proofing'].map((concern) => (
                      <div 
                        key={concern}
                        onClick={() => toggleConcern(concern)}
                        className={`flex items-center gap-3 p-3 cursor-pointer border transition-all duration-300 ${formData.concerns.includes(concern) ? 'border-gold bg-gold/10 text-white' : 'border-white/10 text-neutral-400 hover:border-white/30'}`}
                      >
                         <div className={`w-4 h-4 border flex items-center justify-center ${formData.concerns.includes(concern) ? 'border-gold bg-gold' : 'border-neutral-600'}`}>
                             {formData.concerns.includes(concern) && <IconCheck size={10} className="text-black" />}
                         </div>
                         <span className="text-sm">{concern}</span>
                      </div>
                  ))}
               </div>
               <div className="flex gap-4 pt-4">
                  <button onClick={prevStep} className="text-neutral-500 text-sm hover:text-white transition-colors">Back</button>
                  <button onClick={nextStep} className="flex items-center gap-2 bg-white text-black px-8 py-3 font-bold text-sm tracking-widest hover:bg-gold transition-colors">
                     NEXT <IconArrowRight size={16} />
                  </button>
               </div>
             </motion.div>
          )}

          {/* STEP 4: TIMELINE */}
          {step === 3 && (
             <motion.div key="timeline" variants={variants} initial="enter" animate="center" exit="exit" className="h-full flex flex-col justify-center space-y-8">
                <div>
                 <h2 className="text-3xl font-serif text-white mb-2">{steps[3].title}</h2>
                 <p className="text-neutral-400">{steps[3].subtitle}</p>
               </div>
               
               <div className="space-y-6">
                 <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Preferred Timeline</label>
                    <select 
                        value={formData.timeline}
                        onChange={(e) => updateField('timeline', e.target.value)}
                        className="w-full bg-neutral-900/50 border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors appearance-none" 
                    >
                        <option value="">Select Option...</option>
                        <option value="Immediate">Immediate (Urgent)</option>
                        <option value="1-3 Months">1-3 Months</option>
                        <option value="6+ Months">6+ Months (Planning Phase)</option>
                    </select>
                 </div>
                 
                 <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Phone Number (For Scheduling)</label>
                    <input 
                        type="tel" 
                        className="w-full bg-neutral-900/50 border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors" 
                        placeholder="(555) 000-0000"
                    />
                 </div>
               </div>

               <div className="flex gap-4 pt-4">
                  <button onClick={prevStep} className="text-neutral-500 text-sm hover:text-white transition-colors">Back</button>
                  <button onClick={nextStep} className="flex items-center gap-2 bg-gold text-black px-8 py-3 font-bold text-sm tracking-widest hover:bg-white transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                     SUBMIT REQUEST
                  </button>
               </div>
             </motion.div>
          )}

           {/* STEP 5: SUCCESS */}
           {step === 4 && (
             <motion.div key="success" variants={variants} initial="enter" animate="center" exit="exit" className="h-full flex flex-col justify-center items-center text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500">
                    <IconCheck className="w-10 h-10 text-green-500" />
                </div>
                <div>
                    <h2 className="text-3xl font-serif text-white mb-2">Request Confirmed</h2>
                    <p className="text-neutral-400 max-w-sm mx-auto">
                        Thank you, {formData.name}. We have received your assessment profile. A senior architect will contact you within 24 hours.
                    </p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-sm w-full max-w-sm">
                    <div className="text-xs text-gold uppercase tracking-widest mb-2">Bonus Material</div>
                    <div className="text-white font-medium mb-2">Elegant Aging-in-Place Guide</div>
                    <button className="text-xs text-neutral-400 hover:text-white underline">Download PDF (4.2 MB)</button>
                </div>
             </motion.div>
           )}

        </AnimatePresence>
      </div>
    </div>
  );
};