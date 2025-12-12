'use client';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const comparisonRef = useRef(null);
  const benefitsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Hero animations
    const ctx = gsap.context(() => {
      // Animate hero content
      gsap.from('.hero-badge', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.hero-title', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
      });

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out',
      });

      gsap.from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out',
      });

      gsap.from('.hero-features', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out',
      });

      // Floating orbs
      gsap.to('.orb-1', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      gsap.to('.orb-2', {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 0.5,
      });

      // Animated floaters - immediate start with stronger movement
      gsap.to('.floater-1', {
        y: -150,
        x: 80,
        rotation: 360,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.floater-2', {
        y: 120,
        x: -90,
        rotation: -360,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.floater-3', {
        y: -100,
        x: -70,
        rotation: 180,
        duration: 14,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.floater-4', {
        y: 130,
        x: 100,
        rotation: -180,
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.floater-5', {
        y: -110,
        x: 60,
        rotation: 270,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.floater-6', {
        y: 90,
        x: -110,
        rotation: -270,
        duration: 17,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Small particles - continuous upward float
      gsap.to('.particle', {
        y: -300,
        x: 'random(-80, 80)',
        opacity: 0,
        duration: 'random(6, 12)',
        repeat: -1,
        ease: 'none',
        stagger: {
          each: 0.4,
          repeat: -1,
        },
      });

      // Features section - set initial state and animate
      gsap.set('.feature-card', { opacity: 0, y: 50 });
      gsap.to('.feature-card', {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Comparison table - set initial state and animate
      gsap.set('.comparison-row', { opacity: 0, x: -30 });
      gsap.to('.comparison-row', {
        scrollTrigger: {
          trigger: comparisonRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      });

      // Benefits section
      gsap.set('.benefit-item', { opacity: 0, x: -30 });
      gsap.to('.benefit-item', {
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        x: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.set('.code-block', { opacity: 0, x: 30 });
      gsap.to('.code-block', {
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // CTA section
      gsap.set('.cta-content', { opacity: 0, scale: 0.9 });
      gsap.to('.cta-content', {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-dark-50 to-black text-white" ref={heroRef}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-primary-900/20 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/50"></div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Dialogly
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-primary-400 transition-all duration-300">Features</a>
              <a href="#comparison" className="text-gray-300 hover:text-primary-400 transition-all duration-300">Compare</a>
              <a href="#pricing" className="text-gray-300 hover:text-primary-400 transition-all duration-300">Pricing</a>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="rounded-lg bg-primary-600 px-6 py-2 font-semibold text-white hover:bg-primary-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/50">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="text-gray-300 hover:text-primary-400 transition-all duration-300">
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Animated Background Floaters */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Large floaters */}
        <div className="floater-1 absolute top-20 left-[10%] w-32 h-32 bg-primary-500/40 rounded-full blur-2xl animate-pulse"></div>
        <div className="floater-2 absolute top-40 right-[15%] w-40 h-40 bg-primary-400/35 rounded-full blur-3xl animate-pulse"></div>
        <div className="floater-3 absolute bottom-40 left-[20%] w-36 h-36 bg-primary-600/40 rounded-full blur-2xl animate-pulse"></div>
        <div className="floater-4 absolute bottom-20 right-[25%] w-44 h-44 bg-primary-500/35 rounded-full blur-3xl animate-pulse"></div>
        <div className="floater-5 absolute top-[50%] left-[5%] w-28 h-28 bg-primary-400/40 rounded-full blur-2xl animate-pulse"></div>
        <div className="floater-6 absolute top-[60%] right-[10%] w-38 h-38 bg-primary-600/35 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Small particles */}
        <div className="particle absolute bottom-10 left-[15%] w-4 h-4 bg-primary-400/60 rounded-full blur-sm"></div>
        <div className="particle absolute bottom-20 left-[25%] w-3 h-3 bg-primary-500/70 rounded-full blur-sm"></div>
        <div className="particle absolute bottom-5 left-[35%] w-5 h-5 bg-primary-300/50 rounded-full blur-sm"></div>
        <div className="particle absolute bottom-32 left-[45%] w-3 h-3 bg-primary-400/60 rounded-full blur-sm"></div>
        <div className="particle absolute bottom-8 left-[55%] w-4 h-4 bg-primary-500/70 rounded-full blur-sm"></div>
        <div className="particle absolute bottom-16 left-[65%] w-3 h-3 bg-primary-300/60 rounded-full blur-sm"></div>
        <div className="particle absolute bottom-12 left-[75%] w-5 h-5 bg-primary-400/50 rounded-full blur-sm"></div>
        <div className="particle absolute bottom-24 left-[85%] w-4 h-4 bg-primary-500/60 rounded-full blur-sm"></div>
        <div className="particle absolute bottom-6 right-[15%] w-3 h-3 bg-primary-400/70 rounded-full blur-sm"></div>
        <div className="particle absolute bottom-18 right-[25%] w-4 h-4 bg-primary-300/60 rounded-full blur-sm"></div>
        <div className="particle absolute bottom-14 right-[35%] w-3 h-3 bg-primary-500/50 rounded-full blur-sm"></div>
        <div className="particle absolute bottom-28 right-[45%] w-5 h-5 bg-primary-400/60 rounded-full blur-sm"></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        {/* Floating Orbs */}
        <div className="orb-1 absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="orb-2 absolute bottom-20 right-10 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <div className="hero-badge inline-block mb-6 px-4 py-2 rounded-full bg-primary-600/10 border border-primary-500/20 backdrop-blur-sm">
              <span className="text-sm text-primary-400">🚀 The Future of Customer Support</span>
            </div>
            <h1 className="hero-title text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block text-white">AI-Powered Chatbots</span>
              <span className="block bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                That Actually Work
              </span>
            </h1>
            <p className="hero-subtitle mx-auto mt-6 max-w-2xl text-xl text-gray-400">
              Transform your customer support with intelligent chatbots that understand context, 
              match FAQs instantly, and provide AI-powered responses when needed.
            </p>
            <div className="hero-cta mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-primary-900/50 transition-all duration-300 hover:scale-105 hover:shadow-primary-500/50">
                    <span className="relative z-10">Get Started Free</span>
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <button className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-primary-900/50 transition-all duration-300 hover:scale-105 hover:shadow-primary-500/50">
                    <span className="relative z-10">Go to Dashboard</span>
                  </button>
                </Link>
              </SignedIn>
              <a href="#features" className="rounded-lg border-2 border-primary-600 px-8 py-4 text-lg font-semibold text-primary-400 hover:bg-primary-600/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                Learn More
              </a>
            </div>
            <div className="hero-features mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>5-minute setup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-20 sm:px-6 lg:px-8" ref={featuresRef}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Why Choose Dialogly?
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Built for developers, loved by customers
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: '🤖',
                title: 'AI-Powered Intelligence',
                description: 'Advanced AI that understands context and provides accurate responses based on your knowledge base.'
              },
              {
                icon: '⚡',
                title: 'Lightning Fast Setup',
                description: 'Get your chatbot running in under 5 minutes with our simple npm package integration.'
              },
              {
                icon: '🎯',
                title: 'Smart FAQ Matching',
                description: 'Intelligent algorithm matches user questions to your FAQs with high accuracy using Levenshtein distance.'
              },
              {
                icon: '🎨',
                title: 'Fully Customizable',
                description: 'Match your brand with custom colors, positioning, greetings, and themes.'
              },
              {
                icon: '📊',
                title: 'Analytics Dashboard',
                description: 'Track conversations, monitor performance, and gain insights into customer interactions.'
              },
              {
                icon: '🔒',
                title: 'Secure & Private',
                description: 'Enterprise-grade security with API key authentication and encrypted data transmission.'
              },
            ].map((feature, i) => (
              <div 
                key={i} 
                className="feature-card group relative overflow-hidden rounded-2xl border border-primary-900/20 bg-gradient-to-b from-dark-50 to-black p-8 transition-all duration-500 hover:border-primary-600/50 hover:scale-105 backdrop-blur-sm"
              >
                {/* Glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                
                {/* Neomorphism shadow */}
                <div className="absolute inset-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  <div className="text-5xl mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3 transition-colors duration-300 group-hover:text-primary-400">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="px-4 py-20 sm:px-6 lg:px-8 bg-dark-50/50 backdrop-blur-sm" ref={comparisonRef}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              How We Compare
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              See why developers choose Dialogly over alternatives
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-primary-900/20 bg-black/50 backdrop-blur-xl p-6 shadow-2xl">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-primary-900/20">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-primary-400">Dialogly</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Intercom</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Zendesk</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Drift</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Crisp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-900/20">
                {[
                  { 
                    feature: 'Setup Time', 
                    dialogly: '< 5 min', 
                    others: ['30-60 min', '45-90 min', '30-45 min', '15-30 min'] 
                  },
                  { 
                    feature: 'AI-Powered Responses', 
                    dialogly: '✓ Built-in', 
                    others: ['✓ Add-on', '✓ Add-on', '✓ Premium', '✓ Limited'] 
                  },
                  { 
                    feature: 'Smart FAQ Matching', 
                    dialogly: '✓ Advanced', 
                    others: ['Basic', 'Basic', '✗', 'Basic'] 
                  },
                  { 
                    feature: 'Custom Branding', 
                    dialogly: '✓ Free', 
                    others: ['Paid Only', 'Paid Only', 'Paid Only', 'Free'] 
                  },
                  { 
                    feature: 'NPM Package', 
                    dialogly: '✓ Yes', 
                    others: ['✗', '✗', '✗', '✗'] 
                  },
                  { 
                    feature: 'TypeScript Support', 
                    dialogly: '✓ Full', 
                    others: ['Partial', 'Partial', '✗', '✗'] 
                  },
                  { 
                    feature: 'Test Mode', 
                    dialogly: '✓ Built-in', 
                    others: ['✗', '✗', '✗', '✗'] 
                  },
                  { 
                    feature: 'Starting Price', 
                    dialogly: 'Free', 
                    others: ['$39/mo', '$49/mo', '$2,500/mo', '$25/mo'] 
                  },
                  { 
                    feature: 'Free Plan', 
                    dialogly: '✓ Forever', 
                    others: ['14-day trial', '14-day trial', '✗', '14-day trial'] 
                  },
                ].map((row, i) => (
                  <tr key={i} className="comparison-row hover:bg-primary-900/5 transition-all duration-300">
                    <td className="px-6 py-4 text-sm text-white font-medium">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-sm text-primary-400 font-bold bg-primary-900/10">{row.dialogly}</td>
                    {row.others.map((val, j) => (
                      <td key={j} className="px-6 py-4 text-center text-sm text-gray-500">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            * Pricing and features as of December 2024. Subject to change by respective providers.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8" ref={benefitsRef}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
                Built for Modern Developers
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Simple Integration', desc: 'One npm install and you\'re ready. No complex SDKs or configurations.' },
                  { title: 'TypeScript Support', desc: 'Full type safety with TypeScript definitions included out of the box.' },
                  { title: 'Test Mode', desc: 'Develop and test without API keys using our built-in test mode.' },
                  { title: 'Lightweight', desc: 'Minimal bundle size with tree-shaking support for optimal performance.' },
                ].map((benefit, i) => (
                  <div key={i} className="benefit-item flex gap-4 group">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600/20 text-primary-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-600/30 group-hover:shadow-lg group-hover:shadow-primary-500/50">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors duration-300">{benefit.title}</h3>
                      <p className="text-gray-400">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative code-block">
              <div className="rounded-2xl border border-primary-900/20 bg-gradient-to-br from-dark-50 to-black p-8 backdrop-blur-xl shadow-2xl hover:shadow-primary-500/20 transition-all duration-500">
                <pre className="text-sm text-primary-400 overflow-x-auto">
                  <code>{`import { Chatbot } from 'dialogly';

function App() {
  return (
    <Chatbot apiKey="your_api_key" />
  );
}

// Chatbot automatically fetches your
// customization from the dashboard!`}</code>
                </pre>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-600/20 to-primary-700/20 blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-50/50 to-black" ref={ctaRef}>
        <div className="cta-content mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
            Ready to Transform Your Customer Support?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join hundreds of developers building better customer experiences
          </p>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-10 py-5 text-xl font-semibold text-white shadow-2xl shadow-primary-900/50 transition-all duration-300 hover:scale-105 hover:shadow-primary-500/50">
                <span className="relative z-10">Start Building Now</span>
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <button className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-10 py-5 text-xl font-semibold text-white shadow-2xl shadow-primary-900/50 transition-all duration-300 hover:scale-105 hover:shadow-primary-500/50">
                <span className="relative z-10">Go to Dashboard</span>
              </button>
            </Link>
          </SignedIn>
          <p className="mt-6 text-sm text-gray-500">
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mt-20 border-t border-primary-900/20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]"></div>
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-white to-primary-100 shadow-lg"></div>
                <span className="text-3xl font-black text-white">
                  Dialogly
                </span>
              </div>
              <p className="text-lg text-primary-100 max-w-md leading-relaxed">
                AI-powered chatbot platform for modern developers. Build intelligent customer support in minutes.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xl text-white mb-6">Product</h3>
              <ul className="space-y-3 text-lg text-primary-100">
                <li><a href="#features" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block font-medium">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block font-medium">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block font-medium">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl text-white mb-6">Company</h3>
              <ul className="space-y-3 text-lg text-primary-100">
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block font-medium">About</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block font-medium">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block font-medium">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 border-t border-primary-700/50 pt-10 text-center">
            <p className="text-lg text-primary-100 font-medium">© 2025 Dialogly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
