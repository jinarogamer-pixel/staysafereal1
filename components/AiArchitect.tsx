import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  IconSparkles, IconLoader, IconMovie, IconWand, 
  IconPhoto, IconMessageCircle, IconSearch, IconBrain, IconUpload
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { signInWithGoogle, logout, auth } from "./auth/firebase";

const TABS = [
  { id: 'animate', label: 'Motion', icon: <IconMovie size={18} /> },
  { id: 'generate', label: 'Visualize', icon: <IconPhoto size={18} /> },
  { id: 'edit', label: 'Renovate', icon: <IconWand size={18} /> },
  { id: 'consult', label: 'Consultant', icon: <IconMessageCircle size={18} /> },
];

export const AiArchitect = () => {
  const [activeTab, setActiveTab] = useState('animate');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState<any>(null);
  
  // Inputs
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  // selectedAsset holds image or video data
  const [selectedAsset, setSelectedAsset] = useState<{url: string, base64: string, type: string} | null>(null);
  
  // Chat specifics
  const [chatHistory, setChatHistory] = useState<{role: string, text: string, chunks?: any[]}[]>([]);
  const [useSearch, setUseSearch] = useState(false);
  const [useThinking, setUseThinking] = useState(false);

  // Auth Listener
  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
      return () => unsubscribe();
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        setSelectedAsset({ url: result, base64, type: file.type });
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to ensure paid key is selected for Veo and Gemini 3 Pro Image
  const ensurePaidKey = async () => {
    if (window.aistudio) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
      }
    }
  };

  const getClient = () => {
    // process.env.API_KEY is injected automatically.
    // When window.aistudio.openSelectKey() is used, the environment variable is updated for the context.
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  };

  // --- FEATURE 1: VEO VIDEO GENERATION ---
  const handleVeo = async () => {
    setLoading(true);
    setStatus("Checking license...");
    try {
      await ensurePaidKey(); // Mandatory for Veo
      
      setStatus("Initializing Veo physics engine...");
      const ai = getClient();
      let operation;

      // Image to Video or Text to Video
      if (selectedAsset && selectedAsset.type.startsWith('image/')) {
         setStatus("Processing reference frame...");
         operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt || "Animate this scene naturally",
            image: { imageBytes: selectedAsset.base64, mimeType: selectedAsset.type },
            config: { numberOfVideos: 1, aspectRatio: aspectRatio as any }
         });
      } else {
         operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            config: { numberOfVideos: 1, aspectRatio: aspectRatio as any }
         });
      }

      setStatus("Rendering light and physics...");
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({operation});
      }

      const uri = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (uri) {
        const resp = await fetch(`${uri}&key=${process.env.API_KEY}`);
        const blob = await resp.blob();
        setResult(URL.createObjectURL(blob));
      }
    } catch (e) {
      console.error(e);
      setStatus("Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- FEATURE 2: IMAGE GENERATION (GEMINI 3 PRO IMAGE) ---
  const handleImageGen = async () => {
    setLoading(true);
    setStatus("Dreaming up architecture...");
    try {
      await ensurePaidKey(); // Mandatory for Gemini 3 Pro Image Preview

      const ai = getClient();
      // Use generateContent for Gemini 3 Pro Image Preview as per guidelines (not generateImages)
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any,
            imageSize: "1K"
          }
        }
      });
      
      // Extract image from parts
      const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (part && part.inlineData) {
        setResult(`data:image/png;base64,${part.inlineData.data}`);
      } else {
        throw new Error("No image generated");
      }
    } catch (e) {
      console.error(e);
      setStatus("Failed to visualize.");
    } finally {
      setLoading(false);
    }
  };

  // --- FEATURE 3: IMAGE EDITING (NANO BANANA) ---
  const handleEdit = async () => {
    if (!selectedAsset || !selectedAsset.type.startsWith('image/') || !prompt) return;
    setLoading(true);
    setStatus("Renovating pixel by pixel...");
    try {
      const ai = getClient();
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image', // Nano Banana
        contents: {
          parts: [
            { inlineData: { mimeType: selectedAsset.type, data: selectedAsset.base64 } },
            { text: prompt }
          ]
        },
        // DO NOT set responseMimeType or responseSchema for nano banana models
      });

      const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (part && part.inlineData) {
        setResult(`data:image/png;base64,${part.inlineData.data}`);
      }
    } catch (e) {
        console.error(e);
        setStatus("Renovation failed.");
    } finally {
        setLoading(false);
    }
  };

  // --- FEATURE 4: CHAT CONSULTANT ---
  const handleChat = async () => {
    if (!prompt) return;
    const newMsg = { role: 'user', text: prompt };
    setChatHistory(prev => [...prev, newMsg]);
    setPrompt("");
    setLoading(true);

    try {
      const ai = getClient();
      let model = 'gemini-3-pro-preview'; // Default for complex tasks
      let config: any = {
        systemInstruction: "You are a luxury home safety architect. Analyze requests with a focus on biomechanics, high-end aesthetics (brass, walnut, marble), and invisible safety. Be concise but expert."
      };

      if (useThinking) {
        // Thinking models (Gemini 3/2.5) support thinkingConfig
        model = 'gemini-3-pro-preview';
        config.thinkingConfig = { thinkingBudget: 16000 };
      } else if (useSearch) {
        // Search tool is available on Pro models
        model = 'gemini-3-pro-preview'; 
        config.tools = [{googleSearch: {}}];
      }

      let contents: any = prompt;
      
      // Multimodal Input
      if (selectedAsset) {
         contents = {
           parts: [
             { inlineData: { mimeType: selectedAsset.type, data: selectedAsset.base64 } },
             { text: prompt }
           ]
         };
      }

      const response = await ai.models.generateContent({
        model,
        contents,
        config
      });

      const text = response.text || "I couldn't generate a response.";
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      
      setChatHistory(prev => [...prev, { role: 'model', text, chunks }]);
    } catch (e) {
      console.error(e);
      setChatHistory(prev => [...prev, { role: 'model', text: "Consultation error. Please try again." }]);
    } finally {
      setLoading(false);
      setSelectedAsset(null);
    }
  };

  return (
    <div className="w-full bg-[#080808] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col min-h-[700px]">
      {/* Header / Auth */}
      <div className="border-b border-white/10 p-4 flex justify-between items-center bg-black/50 backdrop-blur-md">
         <div className="flex items-center gap-3">
            <IconSparkles className="text-gold w-5 h-5" />
            <h3 className="text-white font-serif italic">Digital Design Studio</h3>
         </div>
         
         {!user ? (
            <button onClick={signInWithGoogle} className="text-xs uppercase tracking-widest text-gold hover:text-white transition-colors border border-gold/30 px-4 py-2 rounded-full">
               Sign In to Save
            </button>
         ) : (
             <div className="flex items-center gap-4">
                <span className="text-xs text-neutral-400">Welcome, {user.displayName?.split(' ')[0]}</span>
                <button onClick={() => logout()} className="text-xs text-neutral-500 hover:text-white">Logout</button>
             </div>
         )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {TABS.map(tab => (
            <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setResult(null); setPrompt(""); setSelectedAsset(null); }}
                className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm uppercase tracking-widest transition-colors ${activeTab === tab.id ? 'bg-white/5 text-gold border-b-2 border-gold' : 'text-neutral-500 hover:text-white'}`}
            >
                {tab.icon}
                <span className="hidden md:block">{tab.label}</span>
            </button>
        ))}
      </div>

      {/* Workspace */}
      <div className="flex-1 p-6 lg:p-10 flex flex-col lg:flex-row gap-8">
        
        {/* Controls Side */}
        <div className="w-full lg:w-1/3 space-y-6">
            <AnimatePresence mode="wait">
                <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                >
                    {/* Prompt Input */}
                    <div>
                        <label className="block text-xs text-gold uppercase tracking-widest mb-2 font-bold">
                            {activeTab === 'consult' ? 'Your Query' : 'Design Prompt'}
                        </label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder={
                                activeTab === 'animate' ? "Cinematic shot of a modern barrier-free bathroom..." :
                                activeTab === 'generate' ? "Luxury brass grab bar detailed shot..." :
                                activeTab === 'edit' ? "Add a ramp to the entrance..." :
                                "Upload a photo or video to analyze safety..."
                            }
                            className="w-full bg-neutral-900 border border-white/10 rounded-sm p-4 text-white placeholder-neutral-600 focus:border-gold outline-none min-h-[120px]"
                        />
                    </div>

                    {/* File Upload */}
                    {(activeTab !== 'generate') && (
                        <div>
                            <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">
                                Reference {activeTab === 'consult' ? "File (Image/Video)" : "Image"}
                            </label>
                            <div className="relative group">
                                <input 
                                  type="file" 
                                  accept={activeTab === 'consult' ? "image/*,video/*" : "image/*"}
                                  onChange={handleFileUpload} 
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                />
                                <div className="border border-dashed border-white/20 p-4 rounded-sm flex items-center gap-3 text-neutral-400 group-hover:border-gold transition-colors">
                                    <IconUpload size={18} />
                                    <span className="text-xs truncate">{selectedAsset ? "File Selected" : (activeTab === 'consult' ? "Upload Image or Video" : "Upload JPEG/PNG")}</span>
                                </div>
                            </div>
                            {selectedAsset && (
                                <div className="mt-2">
                                    {selectedAsset.type.startsWith('video/') ? (
                                        <video src={selectedAsset.url} className="h-20 w-auto rounded-sm border border-white/10" autoPlay muted loop />
                                    ) : (
                                        <img src={selectedAsset.url} alt="Preview" className="h-20 w-auto rounded-sm border border-white/10" />
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Aspect Ratio Selector */}
                    {(activeTab === 'animate' || activeTab === 'generate') && (
                        <div>
                            <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">Dimensions</label>
                            <div className="grid grid-cols-4 gap-2">
                                {['1:1', '16:9', '9:16', '4:3'].map(r => (
                                    <button
                                        key={r}
                                        onClick={() => setAspectRatio(r)}
                                        className={`py-2 text-xs border rounded-sm ${aspectRatio === r ? 'border-gold text-gold' : 'border-white/10 text-neutral-500 hover:border-white/30'}`}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Chat Toggles */}
                    {activeTab === 'consult' && (
                        <div className="flex gap-4">
                            <button onClick={() => { setUseThinking(!useThinking); setUseSearch(false); }} className={`flex items-center gap-2 text-xs border px-3 py-2 rounded-full ${useThinking ? 'border-gold text-gold' : 'border-white/10 text-neutral-500'}`}>
                                <IconBrain size={14} /> Deep Think
                            </button>
                            <button onClick={() => { setUseSearch(!useSearch); setUseThinking(false); }} className={`flex items-center gap-2 text-xs border px-3 py-2 rounded-full ${useSearch ? 'border-gold text-gold' : 'border-white/10 text-neutral-500'}`}>
                                <IconSearch size={14} /> Live Data
                            </button>
                        </div>
                    )}

                    {/* Action Button */}
                    <button
                        onClick={() => {
                            if (activeTab === 'animate') handleVeo();
                            if (activeTab === 'generate') handleImageGen();
                            if (activeTab === 'edit') handleEdit();
                            if (activeTab === 'consult') handleChat();
                        }}
                        disabled={loading}
                        className="w-full bg-gold text-black py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                        {loading ? <IconLoader className="animate-spin" /> : (
                            <>
                                {activeTab === 'animate' && <IconMovie size={18} />}
                                {activeTab === 'generate' && <IconSparkles size={18} />}
                                {activeTab === 'edit' && <IconWand size={18} />}
                                {activeTab === 'consult' && <IconMessageCircle size={18} />}
                                <span>Execute</span>
                            </>
                        )}
                    </button>
                    {status && <p className="text-xs text-center text-neutral-400 animate-pulse">{status}</p>}
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Output Side */}
        <div className="w-full lg:w-2/3 bg-black/30 border border-white/5 rounded-sm min-h-[400px] flex flex-col relative overflow-hidden">
            
            {/* Chat View */}
            {activeTab === 'consult' ? (
                <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[500px]">
                    {chatHistory.length === 0 && (
                         <div className="h-full flex items-center justify-center text-neutral-600 text-sm">
                            Ask about safety regulations, upload a room photo for analysis, or request material comparisons.
                         </div>
                    )}
                    {chatHistory.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-4 rounded-sm ${msg.role === 'user' ? 'bg-white/10 text-white' : 'bg-gold/10 text-neutral-200 border-l-2 border-gold'}`}>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                {msg.chunks && (
                                    <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                                        {msg.chunks.map((chunk: any, ci: number) => (
                                            <a key={ci} href={chunk.web?.uri} target="_blank" rel="noreferrer" className="text-[10px] bg-black px-2 py-1 rounded text-gold hover:text-white truncate max-w-[150px]">
                                                {chunk.web?.title || "Source"}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Visual View (Image/Video)
                <div className="flex-1 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                    {result ? (
                         activeTab === 'animate' ? (
                             <video src={result} controls autoPlay loop className="max-h-full max-w-full shadow-2xl" />
                         ) : (
                             <img src={result} alt="Generated" className="max-h-full max-w-full shadow-2xl object-contain" />
                         )
                    ) : (
                        <div className="text-neutral-600 flex flex-col items-center">
                            <IconSparkles size={48} stroke={1} className="mb-4 opacity-20" />
                            <p className="text-sm uppercase tracking-widest opacity-50">Output Canvas</p>
                        </div>
                    )}
                </div>
            )}
        </div>

      </div>
    </div>
  );
};