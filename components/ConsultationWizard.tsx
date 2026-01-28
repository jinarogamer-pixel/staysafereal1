import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconArrowRight, IconCheck, IconPhone, IconMail } from '@tabler/icons-react';

export const ConsultationWizard = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: '',
    primaryConcern: '',
    timeline: ''
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStep1Valid = formData.name && formData.phone;
  const isStep2Valid = formData.propertyType && formData.primaryConcern && formData.timeline;

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#0c0c0c] border border-white/10 overflow-hidden shadow-2xl rounded-sm">
      
      {/* Progress Bar */}
      <div className="h-2 bg-neutral-900">
        <div 
          className="h-full bg-gold transition-all duration-500"
          style={{ width: step === 0 ? '33%' : step === 1 ? '66%' : '100%' }}
        />
      </div>

      <div className="p-8 md:p-12">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: CONTACT INFO */}
          {step === 0 && (
            <motion.div 
              key="contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                  Let's Start Your Assessment
                </h2>
                <p className="text-neutral-300 text-lg">
                  We'll contact you within 24 hours to schedule your property evaluation.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                <div className="md:col-span-2">
                  <label className="block text-white text-lg mb-3 font-medium">
                    Your Name *
                  </label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full bg-neutral-900/70 border-2 border-white/20 px-6 py-5 text-white text-xl focus:border-gold outline-none transition-colors rounded-sm" 
                    placeholder="John Smith"
                    autoFocus
                    required
                  />
                </div>

                <div>
                  <label className="block text-white text-lg mb-3 font-medium">
                    <IconPhone className="inline w-5 h-5 mr-2" />
                    Phone Number *
                  </label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full bg-neutral-900/70 border-2 border-white/20 px-6 py-5 text-white text-xl focus:border-gold outline-none transition-colors rounded-sm" 
                    placeholder="(555) 555-5555"
                    required
                  />
                  <p className="text-neutral-500 text-sm mt-2">Required for scheduling.</p>
                </div>

                <div>
                  <label className="block text-white text-lg mb-3 font-medium">
                    <IconMail className="inline w-5 h-5 mr-2" />
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full bg-neutral-900/70 border-2 border-white/20 px-6 py-5 text-white text-xl focus:border-gold outline-none transition-colors rounded-sm" 
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <button 
                  onClick={() => setStep(1)} 
                  disabled={!isStep1Valid}
                  className="flex items-center gap-3 bg-gold text-black px-12 py-5 text-lg font-bold tracking-wide hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg rounded-sm"
                >
                  CONTINUE
                  <IconArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PROPERTY DETAILS */}
          {step === 1 && (
            <motion.div 
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                  Tell Us About Your Property
                </h2>
                <p className="text-neutral-300 text-lg">
                  This helps us prepare for your assessment.
                </p>
              </div>

              <div className="max-w-3xl mx-auto space-y-8">
                
                {/* Property Type */}
                <div>
                  <label className="block text-white text-xl mb-4 font-medium">
                    Property Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Estate', 'Condo', 'Villa', 'Historic'].map((type) => (
                      <button
                        key={type}
                        onClick={() => updateField('propertyType', type)}
                        className={`p-6 border-2 text-center text-lg transition-all duration-300 rounded-sm ${
                          formData.propertyType === type 
                            ? 'border-gold bg-gold/20 text-white scale-105' 
                            : 'border-white/20 text-neutral-400 hover:border-gold/50 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Concern */}
                <div>
                  <label className="block text-white text-xl mb-4 font-medium">
                    Primary Concern
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Fall Prevention', 
                      'Bathroom Safety', 
                      'Future-Proofing',
                      'Post-Surgery Recovery'
                    ].map((concern) => (
                      <button
                        key={concern}
                        onClick={() => updateField('primaryConcern', concern)}
                        className={`p-5 border-2 text-left text-base transition-all duration-300 rounded-sm ${
                          formData.primaryConcern === concern 
                            ? 'border-gold bg-gold/20 text-white' 
                            : 'border-white/20 text-neutral-400 hover:border-gold/50 hover:text-white'
                        }`}
                      >
                        {concern}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-white text-xl mb-4 font-medium">
                    When Do You Need This?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      'Urgent (ASAP)', 
                      'Within 3 Months', 
                      'Planning Ahead'
                    ].map((time) => (
                      <button
                        key={time}
                        onClick={() => updateField('timeline', time)}
                        className={`p-5 border-2 text-center text-base transition-all duration-300 rounded-sm ${
                          formData.timeline === time 
                            ? 'border-gold bg-gold/20 text-white' 
                            : 'border-white/20 text-neutral-400 hover:border-gold/50 hover:text-white'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-6 justify-center pt-8">
                <button 
                  onClick={() => setStep(0)} 
                  className="px-8 py-4 text-neutral-400 hover:text-white text-lg transition-colors"
                >
                  ← Back
                </button>
                <button 
                  onClick={() => setStep(2)} 
                  disabled={!isStep2Valid}
                  className="flex items-center gap-3 bg-gold text-black px-12 py-5 text-lg font-bold tracking-wide hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg rounded-sm"
                >
                  SUBMIT REQUEST
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: CONFIRMATION */}
          {step === 2 && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-8"
            >
              <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center border-4 border-green-500 mx-auto">
                <IconCheck className="w-12 h-12 text-green-500" />
              </div>
              
              <div>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                  Thank You, {formData.name}
                </h2>
                <p className="text-neutral-300 text-xl max-w-2xl mx-auto leading-relaxed">
                  We've received your request and will contact you at 
                  <span className="text-gold font-medium"> {formData.phone} </span>
                  within 24 hours to schedule your comprehensive property assessment.
                </p>
              </div>

              <div className="max-w-md mx-auto bg-white/5 border border-white/10 p-8 rounded-sm">
                <div className="text-gold uppercase tracking-widest text-xs mb-3">
                  While You Wait
                </div>
                <div className="text-white text-lg mb-4">
                  Download Our Age-Proofing Guide
                </div>
                <button className="w-full bg-gold text-black py-4 px-6 font-bold hover:bg-white transition-colors rounded-sm">
                  GET FREE PDF GUIDE →
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};