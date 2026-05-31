import { useState, useEffect, useRef } from 'react';
import { Tv, Film, MonitorPlay, Globe, Shield, X, Download, Users, CheckCircle, Smartphone, Apple, Zap, ChevronDown, PlayCircle, Trophy, Heart, Copy, Check } from 'lucide-react';
import { translations, Language } from './i18n';
import { useTVNav } from './hooks/useTVNav';
import { AudioExperience } from './components/AudioExperience';

const TypewriterText = ({ text, speed = 40, delay = 0, start = false }: { text: string, speed?: number, delay?: number, start?: boolean }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isWaiting, setIsWaiting] = useState(true);

  // Reset when text changes (e.g., language switch)
  useEffect(() => {
    setDisplayedText('');
    setIsWaiting(true);
  }, [text]);

  useEffect(() => {
    if (!start) return;
    
    if (isWaiting) {
      const t = setTimeout(() => setIsWaiting(false), delay);
      return () => clearTimeout(t);
    }

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, start, isWaiting, text, speed, delay]);

  return <>{displayedText}</>;
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [showSignIn, setShowSignIn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [experienceStarted, setExperienceStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video playback settings (start at 10s, speed 1.2x)
  useEffect(() => {
    if (experienceStarted && videoRef.current) {
      videoRef.current.currentTime = 10;
      videoRef.current.playbackRate = 1.2;
    }
  }, [experienceStarted]);

  // TV Remote spatial navigation
  useEffect(() => {
    const cleanup = useTVNav();
    return cleanup;
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '/app/Nero_TV_V1.4.4.apk');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden flex flex-col p-4 md:p-6 lg:p-8 gap-6 max-w-[1280px] mx-auto scroll-smooth">
      <AudioExperience lang={lang} onStart={() => setExperienceStarted(true)} />
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40" style={{
        background: 'radial-gradient(120% 100% at 50% 0%, rgba(138, 10, 15, 0.45) 0%, rgba(5, 5, 5, 1) 100%)'
      }} />

      {/* Header Navigation */}
      <nav className="relative z-50 shrink-0">
        {/* Main nav row */}
        <div className="flex justify-between items-center px-2 sm:px-4">
          {/* Left: Logo + desktop nav links */}
          <div className="flex items-center gap-6">
            <a href="#" tabIndex={0} className="text-3xl sm:text-4xl font-black tracking-tighter text-red-600 outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded">NERO</a>
            <div className="hidden lg:flex gap-6 text-sm font-medium opacity-60">
              <a href="#pricing" tabIndex={0} className="hover:opacity-100 outline-none focus:opacity-100 py-1 px-2 rounded">{t.nav.pricing}</a>
              <a href="#features" tabIndex={0} className="hover:opacity-100 outline-none focus:opacity-100 py-1 px-2 rounded">{t.nav.features}</a>
              <a href="#download" tabIndex={0} className="hover:opacity-100 outline-none focus:opacity-100 py-1 px-2 rounded">{t.nav.download}</a>
            </div>
          </div>

          {/* Right: all buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Web App button — icon only on mobile, label on sm+ */}
            <a
              href="https://live.neroapp.net"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-red-600/10 text-red-500 px-2.5 sm:px-4 py-2 text-xs sm:text-sm rounded-lg font-bold border border-red-500/20 hover:bg-red-600 hover:text-white transition-all whitespace-nowrap cursor-pointer"
            >
              <MonitorPlay size={15} />
              <span>{t.nav.webVersion}</span>
            </a>

            {/* Language toggle — always visible */}
            <div className="flex bg-[#1a1a1a] p-0.5 sm:p-1 rounded-full border border-white/10">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-black rounded-full transition-all ${lang === 'en' ? 'bg-white text-black shadow-lg' : 'text-white/50 hover:text-white'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('sq')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-black rounded-full transition-all ${lang === 'sq' ? 'bg-white text-black shadow-lg' : 'text-white/50 hover:text-white'}`}
              >
                AL
              </button>
            </div>

            {/* Get Started */}
            <a
              href="#pricing"
              className="hidden sm:inline-flex px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-red-600 text-white text-xs sm:text-sm font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20 whitespace-nowrap"
            >
              {t.nav.getStarted ?? 'Get Started'}
            </a>
          </div>
        </div>


      </nav>


      {/* Bento Grid Main Layout */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 flex-1 gap-4">

        {/* Main Hero Feature */}
        <div className="md:col-span-12 lg:col-span-12 rounded-[2.5rem] sm:rounded-[3rem] bg-black relative overflow-hidden group border border-white/5 min-h-[460px] sm:min-h-[initial] sm:aspect-video flex items-end shadow-2xl transition-all duration-1000 z-0">
          {experienceStarted ? (
            <video 
              ref={videoRef}
              autoPlay 
              muted 
              playsInline
              onEnded={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 10;
                  videoRef.current.play();
                }
              }}
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
            >
              <source src="/hero-bg.mp4" type="video/mp4" />
            </video>
          ) : (
            <div className="absolute inset-0 bg-[url('/final-movies.png')] bg-cover bg-center z-0 opacity-50 grayscale transition-all duration-1000"></div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10 pointer-events-none"></div>
          <div className="relative p-6 sm:p-8 md:p-10 w-full z-20">
            <span className="px-3 py-1 bg-red-600/20 text-red-500 text-[10px] sm:text-xs font-bold rounded-md uppercase tracking-widest mb-3 sm:mb-4 inline-block border border-red-500/30 backdrop-blur-md">
              {t.hero.badge}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-3 sm:mb-4 leading-[1.0] sm:leading-[0.9] min-h-[2em]">
              <TypewriterText text={t.hero.title1} start={experienceStarted} speed={50} delay={500} /><br />
              <span className="text-red-600">
                <TypewriterText text={t.hero.title2} start={experienceStarted} speed={60} delay={1500} />
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-lg mb-6 sm:mb-8 leading-relaxed min-h-[4em]">
              <TypewriterText text={t.hero.subtitle} start={experienceStarted} speed={40} delay={2500} />
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#download"
                className="bg-white text-black px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-bold flex items-center justify-center gap-2.5 sm:gap-3 hover:bg-white/90 text-sm sm:text-base transition-colors"
              >
                <Download className="w-5 h-5 stroke-[2.5]" /> {t.hero.downloadApp}
              </a>
              <a
                href="https://live.neroapp.net"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#111]/80 backdrop-blur-md border border-white/10 text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-bold flex items-center justify-center gap-2.5 sm:gap-3 hover:bg-white/10 text-sm sm:text-base transition-colors cursor-pointer"
              >
                <MonitorPlay className="w-5 h-5 stroke-[2.5]" /> {t.hero.webApp}
              </a>
            </div>
          </div>
        </div>

        {/* Technology Info Section */}
        <div className="md:col-span-12 lg:col-span-12 mt-15">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">{t.appInfo.title}</h2>
            <p className="text-white/50 font-medium max-w-2xl mx-auto">{t.appInfo.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.appInfo.features.map((feature, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-red-600/20 rounded-2xl flex items-center justify-center text-red-500 mb-6 border border-red-500/20">
                  {i === 0 ? <Globe size={24} /> : i === 1 ? <Shield size={24} /> : <MonitorPlay size={24} />}
                </div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nero Player Features */}
        <div className="hidden sm:block md:col-span-12 lg:col-span-12 md:row-span-2 mt-15 bg-gradient-to-r from-red-600 to-red-900 rounded-[3rem] p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <span className="bg-white/20 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-6 inline-block backdrop-blur-md">Next-Gen Streaming</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-none">{t.player.title}</h2>
              <p className="text-white/80 font-medium mb-10 max-w-md">{t.player.subtitle}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {t.player.features.map((feat: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold">
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-red-600">
                      <CheckCircle size={12} strokeWidth={3} />
                    </div>
                    {feat}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-[400px] aspect-video bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/20 flex items-center justify-center relative group-hover:scale-[1.02] transition-transform duration-500 shadow-2xl">
              <div className="absolute inset-0 bg-[url('/nero-favs-page.png')] bg-cover bg-center opacity-40 rounded-3xl"></div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-red-600 shadow-xl relative z-10 cursor-pointer hover:scale-110 transition-transform">
                <PlayCircle size={32} fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section Title */}
        <div id="pricing" className="md:col-span-12 lg:col-span-12 mt-12 md:row-span-1 flex items-end pb-2 pt-6 scroll-mt-12" >
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest">{t.planSectionTitle}</h2>
        </div>

        {/* Monthly Pricing Card */}
        <div className="md:col-span-4 lg:col-span-4 md:row-span-2 rounded-3xl bg-gradient-to-br from-zinc-900 to-black p-6 border border-white/10 flex flex-col justify-between relative overflow-hidden group min-h-[220px]">
          <div className="absolute top-0 right-[-10px] p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Shield size={100} />
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-red-500 block">{t.pricing.title}</span>
            </div>
            <div className="flex flex-col mb-4">
              <span className="text-sm text-transparent font-bold select-none">&nbsp;</span>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-black">{t.pricing.price}</span>
                <span className="text-sm text-white/40 mb-1 font-bold">{t.pricing.period}</span>
              </div>
            </div>
            <div className="space-y-2 mb-6">
              {t.pricing.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-medium text-white/70">
                  <CheckCircle size={14} className="text-red-500 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full bg-white text-black py-3.5 rounded-xl font-bold text-sm hover:bg-white/90 transition-colors relative z-10">
            {t.pricing.subscribe}
          </button>
        </div>

        {/* 6 Months Pricing Card */}
        <div className="md:col-span-4 lg:col-span-4 md:row-span-2 rounded-3xl bg-gradient-to-br from-red-900/40 to-black p-6 border border-red-500/30 flex flex-col justify-between relative overflow-hidden group min-h-[220px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/20 transition-colors"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-red-500 block">{t.pricing6.title}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-red-600 text-white px-2 py-0.5 rounded-full">{t.pricing6.badge}</span>
            </div>
            <div className="flex flex-col mb-4">
              <span className="text-sm text-white/40 line-through font-bold">€29.94</span>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-black">{t.pricing6.price}</span>
                <span className="text-sm text-white/40 mb-1 font-bold">{t.pricing6.period}</span>
              </div>
            </div>
            <div className="space-y-2 mb-6">
              {t.pricing.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-medium text-white/70">
                  <CheckCircle size={14} className="text-red-500 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-red-500 transition-colors relative z-10 shadow-lg shadow-red-900/20">
            {t.pricing6.subscribe}
          </button>
        </div>

        {/* Annual Pricing Card */}
        <div className="md:col-span-4 lg:col-span-4 md:row-span-2 rounded-3xl bg-gradient-to-br from-zinc-900 to-black p-6 border border-white/10 flex flex-col justify-between relative overflow-hidden group min-h-[220px]">
          <div className="absolute top-0 right-[-10px] p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Shield size={100} />
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-red-500 block">{t.pricing12.title}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-white/10 text-white px-2 py-0.5 rounded-full">{t.pricing12.badge}</span>
            </div>
            <div className="flex flex-col mb-4">
              <span className="text-sm text-white/40 line-through font-bold">€59.88</span>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-black">{t.pricing12.price}</span>
                <span className="text-sm text-white/40 mb-1 font-bold">{t.pricing12.period}</span>
              </div>
            </div>
            <div className="space-y-2 mb-6">
              {t.pricing.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-medium text-white/70">
                  <CheckCircle size={14} className="text-red-500 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full bg-white text-black py-3.5 rounded-xl font-bold text-sm hover:bg-white/90 transition-colors relative z-10">
            {t.pricing12.subscribe}
          </button>

        </div>

        <div></div>



        {/* Device Compatibility */}
        <div className="md:col-span-12 lg:col-span-12 md:row-span-1 mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">{t.devices.title}</h2>
          <p className="text-white/50 font-medium mb-10">{t.devices.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-40 hover:opacity-100 transition-opacity duration-500">
            {t.devices.list.map((device: string, i: number) => (
              <div key={i} className="flex flex-col items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-default">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group">
                  {device === 'Firestick' ? <Zap size={28} /> :
                    device === 'Apple TV' ? <Apple size={28} /> :
                      device === 'Smart TV' ? <Tv size={28} /> :
                        device === 'PC/Mac' ? <MonitorPlay size={28} /> : <Globe size={28} />}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{device}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription / Download CTA */}
        <div id="download" className="md:col-span-12 lg:col-span-12 md:row-span-3 rounded-[3rem] bg-gradient-to-b from-zinc-900 to-black border border-white/10 overflow-hidden relative min-h-[500px] flex flex-col items-center justify-center p-8 md:p-16 text-center mt-12 mb-6 scroll-mt-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(220,38,38,0.15),transparent_70%)] pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto mb-12">
            <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1]">{t.cta.title}</h3>
            <p className="text-white/60 text-lg md:text-xl font-medium mb-10">{t.cta.subtitle}</p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
            {/* Windows Download */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center group hover:border-red-500/30 transition-all duration-500">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <MonitorPlay size={40} className="text-white group-hover:text-red-500 transition-colors" />
              </div>
              <h4 className="text-2xl font-bold mb-2">{t.cta.windows.title}</h4>
              <p className="text-white/50 text-sm mb-6 leading-relaxed px-4">{t.cta.windows.desc}</p>
              <div className="mt-auto w-full">
                <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">{t.cta.windows.version}</div>
                <a
                  href="/app/Nero_TV_Installer_v1.4.4.exe"
                  download
                  className="w-full bg-white text-black py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-red-600 hover:text-white transition-all shadow-xl shadow-black/20 cursor-pointer"
                >
                  <Download size={18} /> {t.cta.download}
                </a>
              </div>
            </div>

            {/* Android Download */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center group hover:border-red-500/30 transition-all duration-500">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Smartphone size={40} className="text-white group-hover:text-red-500 transition-colors" />
              </div>
              <h4 className="text-2xl font-bold mb-2">{t.cta.android.title}</h4>
              <p className="text-white/50 text-sm mb-6 leading-relaxed px-4">{t.cta.android.desc}</p>
              <div className="mt-auto w-full">
                <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">{t.cta.android.version}</div>
                <a
                  href="/app/Nero_TV_V1.4.4.apk"
                  download
                  className="w-full bg-red-600 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-red-500 transition-all shadow-xl shadow-red-900/20 cursor-pointer"
                >
                  <Download size={18} /> {t.cta.download}
                </a>
              </div>
            </div>

            {/* iOS Download */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center group hover:border-red-500/30 transition-all duration-500 opacity-60">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Apple size={40} className="text-white group-hover:text-red-500 transition-colors" />
              </div>
              <h4 className="text-2xl font-bold mb-2">{t.cta.ios.title}</h4>
              <p className="text-white/50 text-sm mb-6 leading-relaxed px-4">{t.cta.ios.desc}</p>
              <div className="mt-auto w-full">
                <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">{t.cta.ios.version}</div>
                <button
                  disabled
                  className="w-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-500 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 cursor-not-allowed transition-all"
                >
                  <X size={18} /> {t.cta.comingSoon}
                </button>
              </div>
            </div>
          </div>

          {/* TV Installation Guide */}
          <div className="relative z-10 w-full max-w-6xl mx-auto mt-12">
            <div className="border border-white/10 rounded-[2.5rem] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-900/40 to-black p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-white/10">
                <div className="w-14 h-14 bg-red-600/20 rounded-2xl flex items-center justify-center shrink-0 border border-red-500/30">
                  <Tv size={28} className="text-red-500" />
                </div>
                <div className="text-left">
                  <h4 className="text-xl font-black mb-1">Install on Android TV / Firestick</h4>
                  <p className="text-white/50 text-sm font-medium">Follow these simple steps to sideload NERO on your TV device using the free <span className="text-white/80 font-bold">Downloader</span> app.</p>
                </div>
              </div>

              {/* Steps */}
              <div className="bg-black/40 backdrop-blur-xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Step 1 */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0 mt-0.5">1</div>
                    <div className="text-left">
                      <h5 className="font-bold text-sm mb-1">Install Downloader App</h5>
                      <p className="text-white/50 text-xs leading-relaxed">On your TV, open the App Store / Amazon App Store and search for <span className="text-white/80 font-bold">"Downloader by AFTVnews"</span>. Install it for free.</p>
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0 mt-0.5">2</div>
                    <div className="text-left">
                      <h5 className="font-bold text-sm mb-1">Enable Unknown Sources</h5>
                      <p className="text-white/50 text-xs leading-relaxed">Go to your TV <span className="text-white/80 font-bold">Settings → Security</span> and enable <span className="text-white/80 font-bold">"Install from Unknown Sources"</span> for the Downloader app.</p>
                    </div>
                  </div>
                  {/* Step 3 */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0 mt-0.5">3</div>
                    <div className="text-left">
                      <h5 className="font-bold text-sm mb-1">Enter the Download Link</h5>
                      <p className="text-white/50 text-xs leading-relaxed">Open Downloader, tap the URL bar and type the link below. It will download and install NERO TV automatically.</p>
                    </div>
                  </div>
                </div>

                {/* Link Box */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left flex-1 min-w-0">
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Direct Download Link for Downloader App</div>
                    <code className="text-red-400 font-bold text-sm break-all">{window.location.host}/app/Nero_TV_V1.4.4.apk</code>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <button
                      onClick={handleCopyLink}
                      className={`px-5 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all whitespace-nowrap border ${
                        copied
                          ? 'bg-green-600/20 border-green-500/40 text-green-400'
                          : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                      }`}
                    >
                      {copied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy Link</>}
                    </button>
                    <a
                      href="/app/Nero_TV_V1.4.4.apk"
                      download
                      className="bg-red-600 text-white px-5 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-red-500 transition-all whitespace-nowrap"
                    >
                      <Download size={16} /> Get APK
                    </a>
                  </div>
                </div>

                <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest text-center mt-6">
                  ⚠ Compatible with Android TV, Google TV, Amazon Firestick & Fire TV · Samsung/LG Smart TVs are not supported
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Experience Nero - App Walkthrough */}
        <div id="features" className="md:col-span-12 lg:col-span-12 md:row-span-4 mt-15 scroll-mt-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">{t.walkthrough.title.split(' ')[0]} <span className="text-red-600">{t.walkthrough.title.split(' ').slice(1).join(' ')}</span></h2>
            <p className="text-white/50 font-medium max-w-2xl mx-auto text-lg">{t.walkthrough.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Live TV Feature */}
            <div className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/10 p-2 transition-all hover:border-red-600/50">
              <div className="aspect-[16/10] overflow-hidden rounded-[2rem] bg-black mb-6 relative">
                <img src="/final-live.png" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt="Live TV" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500">{t.walkthrough.live.tag}</span>
                </div>
              </div>
              <div className="px-6 pb-8">
                <h4 className="text-2xl font-bold mb-3">{t.walkthrough.live.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{t.walkthrough.live.desc}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[9px] font-bold px-2 py-1 bg-white/5 rounded-md text-white/40 uppercase">Low Latency</span>
                  <span className="text-[9px] font-bold px-2 py-1 bg-white/5 rounded-md text-white/40 uppercase">EPG Support</span>
                </div>
              </div>
            </div>

            {/* Sports Feature */}
            <div className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/10 p-2 transition-all hover:border-red-600/50">
              <div className="aspect-[16/10] overflow-hidden rounded-[2rem] bg-black mb-6 relative">
                <img src="/final-sports.png" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt="Sports" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6 flex items-center gap-2">
                  <Trophy size={14} className="text-red-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500">{t.walkthrough.sports.tag}</span>
                </div>
              </div>
              <div className="px-6 pb-8">
                <h4 className="text-2xl font-bold mb-3">{t.walkthrough.sports.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{t.walkthrough.sports.desc}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[9px] font-bold px-2 py-1 bg-white/5 rounded-md text-white/40 uppercase">Real-time Scores</span>
                  <span className="text-[9px] font-bold px-2 py-1 bg-white/5 rounded-md text-white/40 uppercase">4K Quality</span>
                </div>
              </div>
            </div>

            {/* VOD Library */}
            <div className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/10 p-2 transition-all hover:border-red-600/50">
              <div className="aspect-[16/10] overflow-hidden rounded-[2rem] bg-black mb-6 relative">
                <img src="/final-movies.png" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt="Movies" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6 flex items-center gap-2">
                  <Film size={14} className="text-red-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500">{t.walkthrough.vod.tag}</span>
                </div>
              </div>
              <div className="px-6 pb-8">
                <h4 className="text-2xl font-bold mb-3">{t.walkthrough.vod.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{t.walkthrough.vod.desc}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[9px] font-bold px-2 py-1 bg-white/5 rounded-md text-white/40 uppercase">IMDb Integrated</span>
                  <span className="text-[9px] font-bold px-2 py-1 bg-white/5 rounded-md text-white/40 uppercase">Smart Filters</span>
                </div>
              </div>
            </div>

            {/* Immersive Details */}
            <div className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/10 p-2 transition-all hover:border-red-600/50">
              <div className="aspect-[16/10] overflow-hidden rounded-[2rem] bg-black mb-6 relative">
                <img src="/final-details.png" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt="Metadata" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6 flex items-center gap-2">
                  <Users size={14} className="text-red-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500">{t.walkthrough.details.tag}</span>
                </div>
              </div>
              <div className="px-6 pb-8">
                <h4 className="text-2xl font-bold mb-3">{t.walkthrough.details.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{t.walkthrough.details.desc}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[9px] font-bold px-2 py-1 bg-white/5 rounded-md text-white/40 uppercase">4K / 1080p / 720p</span>
                  <span className="text-[9px] font-bold px-2 py-1 bg-white/5 rounded-md text-white/40 uppercase">Cast & Crew</span>
                </div>
              </div>
            </div>

            {/* Personalized Library */}
            <div className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/10 p-2 transition-all hover:border-red-600/50">
              <div className="aspect-[16/10] overflow-hidden rounded-[2rem] bg-black mb-6 relative">
                <img src="/final-favs.png" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt="Favourites" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6 flex items-center gap-2">
                  <Heart size={14} className="text-red-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500">{t.walkthrough.personal.tag}</span>
                </div>
              </div>
              <div className="px-6 pb-8">
                <h4 className="text-2xl font-bold mb-3">{t.walkthrough.personal.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{t.walkthrough.personal.desc}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[9px] font-bold px-2 py-1 bg-white/5 rounded-md text-white/40 uppercase">Cross-Device Sync</span>
                  <span className="text-[9px] font-bold px-2 py-1 bg-white/5 rounded-md text-white/40 uppercase">Unlimited Favourites</span>
                </div>
              </div>
            </div>

            {/* Exclusive Series */}
            <div className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/10 p-2 transition-all hover:border-red-600/50">
              <div className="aspect-[16/10] overflow-hidden rounded-[2rem] bg-black mb-6 relative">
                <img src="/final-series.png" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt="Series" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6 flex items-center gap-2">
                  <Tv size={14} className="text-red-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500">{t.walkthrough.series.tag}</span>
                </div>
              </div>
              <div className="px-6 pb-8">
                <h4 className="text-2xl font-bold mb-3">{t.walkthrough.series.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{t.walkthrough.series.desc}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[9px] font-bold px-2 py-1 bg-white/5 rounded-md text-white/40 uppercase">Regular Updates</span>
                  <span className="text-[9px] font-bold px-2 py-1 bg-white/5 rounded-md text-white/40 uppercase">All Seasons</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interface Showcase */}
        <div className="md:col-span-12 lg:col-span-12 md:row-span-3 mt-16 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-transparent opacity-20 blur-3xl rounded-full"></div>
              <div className="relative bg-zinc-900 border border-white/10 rounded-[3rem] p-4 shadow-2xl">
                <img
                  src="/final-signin.png"
                  alt="App Interface"
                  className="rounded-[2.5rem] w-full"
                />
              </div>
            </div>
            <div>
              <span className="text-red-500 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Security & Simplicity</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-[1.1]">Interface that <span className="text-red-600">feels alive.</span></h2>
              <p className="text-white/60 text-lg font-medium leading-relaxed mb-8">
                Our secure login system ensures your account is always protected. Quick sign-in options including QR and Phone auth make it easier than ever to start watching.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
                    <Shield className="text-red-500" size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg">Secure Auth System</h5>
                    <p className="text-sm text-white/40 font-medium">Multi-profile support with individual parental locks.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
                    <Zap className="text-red-500" size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg">Zero-Lag Navigation</h5>
                    <p className="text-sm text-white/40 font-medium">Proprietary caching engine for instant content discovery.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="md:col-span-12 lg:col-span-12 md:row-span-3 mt-15 mb-12 max-w-4xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">{t.faq.title}</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </div>
          <div className="space-y-4">
            {t.faq.list.map((item: any, i: number) => (
              <details key={i} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 open:bg-white/10 open:border-white/20">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h4 className="text-lg font-bold pr-8">{item.q}</h4>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-open:rotate-180 transition-transform">
                    <ChevronDown size={20} />
                  </div>
                </summary>
                <div className="px-6 pb-6 text-white/60 font-medium leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>

      </div>

      {/* Footer / Legal */}
      <footer className="relative z-10 flex flex-col sm:flex-row justify-between items-center py-2 mt-4 text-[10px] uppercase tracking-widest text-white/30 gap-4 text-center sm:text-left border-t border-white/5 pt-4 shrink-0 font-bold">
        <p>{t.footer.rights}</p>
        <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
          <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
          <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
          <a href="#" className="hover:text-white transition-colors">{t.footer.help}</a>
        </div>
      </footer>

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#111] border border-white/10 p-8 rounded-2xl w-full max-w-md relative shadow-2xl shadow-black">
            <button
              onClick={() => setShowSignIn(false)}
              className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 shadow-lg shadow-black/50">
                <span className="text-red-600 font-bold text-3xl tracking-tighter">N</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2 uppercase text-center tracking-wide">WELCOME BACK</h2>
            <p className="text-white/50 text-sm mb-6 text-center font-medium">Enter your details to sign in</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/50 mb-1 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/30">
                    <Globe size={16} />
                  </div>
                  <input type="email" placeholder="example@email.com" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-red-600 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-white/50 mb-1 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/30">
                    <Shield size={16} />
                  </div>
                  <input type="password" placeholder="••••••••" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-red-600 transition-colors" />
                </div>
              </div>
              <button
                onClick={() => setShowSignIn(false)}
                className="w-full py-3 mt-4 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all shadow-lg shadow-red-900/20"
              >
                {t.nav.signIn.toUpperCase()}
              </button>
              <div className="text-center mt-4">
                <button className="text-xs text-white/50 hover:text-white uppercase tracking-wider font-bold transition-colors">
                  Create New Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
