import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Power } from 'lucide-react';
import { translations, Language } from '../i18n';

// Audio URLs
const BG_MUSIC_URL = '/blur-menu.webm';
const EN_VOICEOVER_URL = '/voice.mp3';

export function AudioExperience({ lang, onStart }: { lang: Language, onStart?: () => void }) {
  const [muted, setMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Notify App to start typewriter immediately since there is no overlay
    if (onStart) onStart();

    bgAudioRef.current = new Audio(BG_MUSIC_URL);
    bgAudioRef.current.loop = false;
    bgAudioRef.current.volume = 0.6; 

    voiceAudioRef.current = new Audio(EN_VOICEOVER_URL);
    voiceAudioRef.current.volume = 1.0;

    const handleVoiceEnded = () => {
      setTimeout(() => {
        const fadeInterval = setInterval(() => {
          if (bgAudioRef.current && bgAudioRef.current.volume > 0.05) {
            bgAudioRef.current.volume -= 0.05;
          } else {
            clearInterval(fadeInterval);
            bgAudioRef.current?.pause();
          }
        }, 200);
      }, 3000);
    };

    const currentVoiceRef = voiceAudioRef.current;
    if (currentVoiceRef) {
      currentVoiceRef.addEventListener('ended', handleVoiceEnded);
    }

    return () => {
      bgAudioRef.current?.pause();
      currentVoiceRef?.pause();
      if (currentVoiceRef) {
        currentVoiceRef.removeEventListener('ended', handleVoiceEnded);
      }
    };
  }, []);

  useEffect(() => {
    if (bgAudioRef.current) bgAudioRef.current.muted = muted;
    if (voiceAudioRef.current) voiceAudioRef.current.muted = muted;
  }, [muted]);

  const toggleAudio = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    
    if (!hasStarted && !newMuted) {
      setHasStarted(true);
      bgAudioRef.current?.play().catch(e => console.log('Audio error:', e));
      voiceAudioRef.current?.play().catch(e => console.log('Audio error:', e));
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      aria-label={muted ? "Unmute sound" : "Mute sound"}
    >
      {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </button>
  );
}
