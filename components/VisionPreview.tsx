import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { IconSparkles, IconLoader, IconPlayerPlay } from "@tabler/icons-react";

export const VisionPreview = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    // Check for API key availability via AI Studio helper
    const checkKey = async () => {
      if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        const has = await window.aistudio.hasSelectedApiKey();
        setHasKey(has);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
      await window.aistudio.openSelectKey();
      const has = await window.aistudio.hasSelectedApiKey();
      setHasKey(has);
    }
  };

  const generatePreview = async () => {
    if (!process.env.API_KEY && !hasKey) {
      await handleSelectKey();
      return;
    }

    setLoading(true);
    setStatus("Initiating architectural rendering engine...");

    try {
      // Re-instantiate to ensure fresh key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      setStatus("Analyzing spatial safety parameters...");
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-generate-preview',
        prompt: 'Cinematic tracking shot of a ultra-luxury modern living room transformation, before and after style, showing integrated safety rails and automated lighting systems in a high-end Florida home, architectural digest style, 4k, minimalist design, warm ambient lighting, photorealistic.',
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      setStatus("Rendering light and physics...");
      
      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({operation: operation});
        setStatus("Polishing final case study textures...");
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
         // Fetch the actual video blob
         const vidResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
         const blob = await vidResponse.blob();
         const url = URL.createObjectURL(blob);
         setVideoUrl(url);
      }

    } catch (e) {
      console.error(e);
      setStatus("Render failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full aspect-video bg-neutral-900 rounded-lg overflow-hidden border border-white/10 shadow-2xl group">
      {/* Default State / Background */}
      {!videoUrl && (
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105">
           <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
        </div>
      )}

      {/* Video Player */}
      {videoUrl && (
        <video 
          src={videoUrl} 
          className="w-full h-full object-cover" 
          controls 
          autoPlay 
          loop
          playsInline
        />
      )}

      {/* Controls Overlay */}
      {!videoUrl && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
          {loading ? (
             <div className="flex flex-col items-center gap-4">
               <div className="relative">
                 <div className="absolute inset-0 bg-gold blur-lg opacity-20 animate-pulse"></div>
                 <IconLoader className="w-12 h-12 text-gold animate-spin relative z-10" />
               </div>
               <p className="text-white/80 font-light tracking-widest text-sm uppercase">{status}</p>
             </div>
          ) : (
             <div className="space-y-6 max-w-lg">
                <h3 className="text-3xl font-serif text-white italic">"See the Possibilities"</h3>
                <p className="text-neutral-300 font-light">
                  Generate a cinematic case study of a renovated living space. See how we blend medical-grade safety with high-end interior design.
                </p>
                <button 
                  onClick={generatePreview}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-gold/50 transition-all duration-300 rounded-full overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  <IconSparkles className="w-5 h-5 text-gold" />
                  <span className="text-white font-medium tracking-wide">
                    {hasKey ? "Generate Case Study Video" : "Connect & Generate"}
                  </span>
                </button>
             </div>
          )}
        </div>
      )}
    </div>
  );
};