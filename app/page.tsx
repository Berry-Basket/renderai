'use client';

import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function WaitlistPage() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '' });
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-500/5 via-slate-950 to-slate-950 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-slate-800 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              RenderAI
            </div>
            <div className="text-sm text-slate-400">For Architects</div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                AI-Powered Rendering for Architects
              </h1>
              <p className="text-xl text-slate-300">
                Transform your architectural images into stunning, photorealistic renders in seconds. Powered by advanced AI.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Professional Presets</p>
                  <p className="text-sm text-slate-400">Architect-designed prompts for consistent results</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Lightning Fast</p>
                  <p className="text-sm text-slate-400">Get renders in seconds, not hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Save Time & Cost</p>
                  <p className="text-sm text-slate-400">Eliminate expensive rendering workflows</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            {!submitted && (
              <div>
                <p className="text-sm text-slate-400 mb-4">
                  Join early architects getting access first
                </p>
                <button 
                  onClick={() => {
                    const element = document.getElementById('form-section');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Join Waitlist <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Right Visual - Architectural Rendering */}
          <div className="relative h-96 md:h-full min-h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-2xl border border-orange-500/20 overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" stopOpacity="1" />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ea580c" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                
                {/* Background */}
                <rect width="400" height="500" fill="url(#bgGradient)" />
                
                {/* Sky gradient */}
                <rect width="400" height="250" fill="#1e1b4b" />
                
                {/* Main building structure */}
                <rect x="80" y="180" width="240" height="270" fill="url(#buildingGradient)" rx="8" />
                
                {/* Building left accent */}
                <rect x="60" y="200" width="20" height="240" fill="#f97316" opacity="0.4" />
                
                {/* Building right accent */}
                <rect x="320" y="200" width="20" height="240" fill="#f97316" opacity="0.4" />
                
                {/* Windows - organized grid */}
                {Array.from({ length: 6 }).map((_, row) =>
                  Array.from({ length: 5 }).map((_, col) => (
                    <g key={`window-${row}-${col}`}>
                      <rect
                        x={100 + col * 42}
                        y={200 + row * 38}
                        width="32"
                        height="28"
                        fill="#fbbf24"
                        opacity="0.6"
                      />
                      <rect
                        x={100 + col * 42}
                        y={200 + row * 38}
                        width="32"
                        height="28"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="1"
                        opacity="0.4"
                      />
                    </g>
                  ))
                )}
                
                {/* Glass reflection highlight */}
                <rect x="80" y="180" width="240" height="70" fill="#ffffff" opacity="0.08" />
                
                {/* Ground/Base */}
                <rect y="450" width="400" height="50" fill="#0f172a" />
                
                {/* Ground platform */}
                <rect x="30" y="445" width="340" height="8" fill="#f97316" opacity="0.3" />
                
                {/* Accent lines */}
                <line x1="50" y1="160" x2="350" y2="160" stroke="#f97316" strokeWidth="2" opacity="0.2" />
                
                {/* Decorative architectural elements */}
                <circle cx="80" cy="100" r="35" fill="#f97316" opacity="0.08" />
                <circle cx="320" cy="130" r="45" fill="#f97316" opacity="0.06" />
                
                {/* Building top detail */}
                <polygon points="80,180 200,140 320,180" fill="#f97316" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div id="form-section" className="bg-gradient-to-b from-transparent via-orange-500/5 to-transparent py-20">
          <div className="max-w-md mx-auto px-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
              {submitted ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-orange-500/20 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-bold">You're on the list!</h3>
                  <p className="text-slate-400">
                    We'll reach out soon with early access details.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-orange-500 hover:text-orange-400 text-sm font-semibold mt-6"
                  >
                    Add another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-2xl font-bold mb-6">Join the Waitlist</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? 'Joining...' : 'Join Waitlist'}
                    {!loading && <ArrowRight className="w-5 h-5" />}
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 py-8">
          <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
            <p>© 2025 RenderAI. Transforming architectural visualization.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
