import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { translations } from './i18n';

export default function Privacy() {
  const t = translations['en'];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden flex flex-col scroll-smooth">
      <div className="relative w-full min-h-[100svh] flex flex-col">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute top-[-50%] left-[-10%] w-[70%] h-[100%] rounded-full bg-[#e00000]/10 blur-[120px] pointer-events-none" />
        
        {/* Navigation */}
        <nav className="relative z-50 px-6 py-6 lg:px-12 lg:py-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-[#e00000]" />
            <span className="text-xl font-bold tracking-wider text-white">NERO</span>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </nav>

        {/* Content */}
        <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 w-full flex-1">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-md">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-[#e00000] font-semibold tracking-wide text-sm mb-12">LAST UPDATED: JUNE 5, 2026</p>

            <div className="space-y-8 text-white/70 leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-white mb-4 tracking-wide">1. INTRODUCTION</h2>
                <p>Welcome to NERO PLAYER ("we," "our," or "us"). We are committed to protecting your personal data and your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our application and services.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4 tracking-wide">2. DATA WE COLLECT</h2>
                <p className="mb-4">We collect information to provide a better experience to all our users. This includes:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-white/90">Account Information:</strong> Email address, display name, and profile photo.</li>
                  <li><strong className="text-white/90">Subscription Data:</strong> Payment history, plan details, and transaction status (processed securely via Stripe).</li>
                  <li><strong className="text-white/90">Usage Data:</strong> Information about how you interact with our streaming content, favorites, and watch history to improve recommendations.</li>
                  <li><strong className="text-white/90">Device Info & Location:</strong> IP address, device type, geographic location (country/city), and operating system for security, abuse prevention, and service optimization.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4 tracking-wide">3. HOW WE USE YOUR DATA</h2>
                <p className="mb-4">Your data is used solely for:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Providing and maintaining the NERO PLAYER service.</li>
                  <li>Managing your subscription and processing payments.</li>
                  <li>Sending essential service notifications.</li>
                  <li>Preventing fraudulent activity and ensuring platform security.</li>
                  <li>Analyzing usage patterns to enhance our streaming infrastructure.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4 tracking-wide">4. DATA SHARING & THIRD PARTIES</h2>
                <p className="mb-4">We do NOT sell your personal data. We only share information with trusted third-party services essential for our operations:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-white/90">Stripe:</strong> For secure payment processing and subscription management.</li>
                  <li><strong className="text-white/90">SMTP Providers:</strong> To deliver verification and notification emails.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4 tracking-wide">5. SECURITY</h2>
                <p>We implement industry-standard security measures, including end-to-end encryption for authentication and secure socket layers (SSL) for all API communications. Your password is never stored in plain text.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4 tracking-wide">6. YOUR RIGHTS</h2>
                <p>You have the right to access, update, or request the deletion of your personal data at any time through your profile settings or by contacting our support team via the WhatsApp link in the Help center.</p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
