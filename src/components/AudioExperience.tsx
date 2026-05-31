import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Power } from 'lucide-react';
import { translations, Language } from '../i18n';

// Placeholder URLs - the user will need to replace these with actual files in the public folder
const BG_MUSIC_URL = 'https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3?filename=ambient-space-127532.mp3';
const EN_VOICEOVER_URL = 'https://cdn.pixabay.com/download/audio/2023/04/10/audio_b282eb1034.mp3?filename=artificial-intelligence-142851.mp3'; // Placeholder
const AL_VOICEOVER_URL = EN_VOICEOVER_URL; // Placeholder

export function AudioExperience({ lang }: { lang: Language }) {
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    bgAudioRef.current = new Audio(BG_MUSIC_URL);
    bgAudioRef.current.loop = true;
    bgAudioRef.current.volume = 0.3; // Low ambient volume

    voiceAudioRef.current = new Audio(lang === 'en' ? EN_VOICEOVER_URL : AL_VOICEOVER_URL);
    voiceAudioRef.current.volume = 0.9;

    return () => {
      bgAudioRef.current?.pause();
      voiceAudioRef.current?.pause();
    };
  }, []); // Only run once to initialize

  // Handle language switch: play new language voiceover if already started
  useEffect(() => {
    if (started && voiceAudioRef.current) {
      voiceAudioRef.current.pause();
      voiceAudioRef.current = new Audio(lang === 'en' ? EN_VOICEOVER_URL : AL_VOICEOVER_URL);
      voiceAudioRef.current.volume = 0.9;
      voiceAudioRef.current.muted = muted;
      voiceAudioRef.current.play().catch(console.error);
    }
  }, [lang]);

  useEffect(() => {
    if (bgAudioRef.current) bgAudioRef.current.muted = muted;
    if (voiceAudioRef.current) voiceAudioRef.current.muted = muted;
  }, [muted]);

  const handleStart = () => {
    setStarted(true);
    bgAudioRef.current?.play().catch(console.error);
    voiceAudioRef.current?.play().catch(console.error);
  };

  // The overlay before starting
  if (!started) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,0,0,0.15)_0%,rgba(0,0,0,1)_100%)]"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-8 animate-fade-in text-center px-4">
          <span className="text-5xl sm:text-7xl font-black tracking-tighter text-red-600 animate-pulse">NERO</span>
          <p className="text-white/60 font-mono text-sm tracking-widest uppercase">System Initialization</p>
          
          <button 
            onClick={handleStart}
            autoFocus
            className="group relative px-8 py-4 bg-red-600/10 border border-red-500/30 rounded-full hover:bg-red-600 transition-all flex items-center gap-3 overflow-hidden outline-none focus:ring-2 focus:ring-red-500"
          >
            <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <Power className="relative z-10 w-5 h-5 text-red-500 group-hover:text-white transition-colors" />
            <span className="relative z-10 font-bold tracking-widest text-red-500 group-hover:text-white transition-colors uppercase text-sm">
              Enter Experience
            </span>
          </button>
        </div>
      </div>
    );
  }

  // The floating mute button once started
  return (
    <button
      onClick={() => setMuted(!muted)}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      aria-label={muted ? "Unmute sound" : "Mute sound"}
    >
      {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </button>
  );
}
