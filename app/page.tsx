'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  Menu, X, TrendingUp, Shield, Zap, Globe, Cpu, BarChart3, Lock,
  ArrowRight, Star, ChevronDown, CheckCircle2, Activity, Wallet,
  Bell, Play, ArrowUpRight, DollarSign, Bitcoin, PieChart
} from 'lucide-react';

// --- UTILITY COMPONENTS ---

const GlassCard = ({ children, className = "", ...props }: any) => (
  <div
    className={`bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-2xl md:rounded-[28px] ${className}`}
    {...props}
  >
    {children}
  </div>
);

const AnimatedCounter = ({ value, suffix = "", prefix = "" }: { value: number, suffix?: string, prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();
      
      const animate = (time: number) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
        setCount(Math.floor(easeProgress * value));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, value]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

// --- MAIN SECTIONS ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ["Home", "Markets", "AI Trading", "Features", "Pricing", "Contact"];

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'h-20 bg-[#050505]/80 backdrop-blur-md border-b border-white/[0.08]' : 'h-20 bg-transparent border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00FF88] to-[#19B5FE] flex items-center justify-center shadow-[0_0_15px_rgba(0,255,136,0.5)]">
                <Bitcoin className="text-[#050505] w-5 h-5" />
             </div>
          <span className="text-xl font-bold tracking-tight">AverNox<span className="text-[#00FF88]">Trader</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-8 text-sm font-medium text-gray-400">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button className="px-6 py-2 text-sm font-semibold hover:text-gray-300 transition-colors">
            Login
          </button>
          <button className="px-6 py-2 bg-[#00FF88] text-black rounded-full text-sm font-bold shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:scale-105 transition-transform">
            Register
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-[#0E1117] border-b border-white/10 shadow-2xl"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-lg font-medium text-gray-300 hover:text-[#00FF88]">
                  {link}
                </a>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <button className="w-full py-3 text-center text-white font-medium border border-white/20 rounded-xl">Login</button>
              <button className="w-full py-3 text-center text-black font-medium bg-[#00FF88] rounded-xl">Register</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
      {/* Cinematic Background Image */}
      <Image src="/images/hero_bg.jpg" alt="Hero Background" fill className="object-cover opacity-15 pointer-events-none" priority />
      
      {/* Background Ornaments */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#00FF88] opacity-10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#19B5FE] opacity-10 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-8 items-center z-10 relative h-[688px]">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-6 space-y-8"
        >
          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#00FF88] to-[#19B5FE] flex items-center justify-center shadow-[0_0_40px_rgba(0,255,136,0.8)] mb-6 animate-pulse">
               <Bitcoin className="text-[#050505] w-10 h-10" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-[#00FF88]">
              <span className="flex h-2 w-2 rounded-full bg-[#00FF88] animate-pulse" />
              New: AI Prediction Engine v4.0
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter">
              Your Digital Wallet.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-600">Financial Future.</span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
              Trade cryptocurrencies with AI-powered automation, real-time analytics, and institutional-grade security on the world's most advanced terminal.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-white hover:bg-gray-200 text-black rounded-2xl font-bold flex items-center justify-center gap-2 group transition-colors">
              Start Trading
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold backdrop-blur-xl transition-colors">
              Explore Platform
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-8 pt-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="text-[#00FF88]">✔</span> Institutional Security
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="text-[#00FF88]">✔</span> AI-Powered Signals
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="text-[#00FF88]">✔</span> Fast Withdrawals
            </div>
          </div>
        </motion.div>

        {/* Right Content - Mockups */}
        <div className="lg:col-span-6 relative h-[500px] flex items-center justify-center hidden lg:flex">
          {/* Phone 1 - Portfolio */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-10 w-[280px] h-[360px] bg-[#0E1117]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 shadow-2xl z-20"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs text-gray-400">Portfolio Value</span>
              <span className="text-[10px] text-[#00FF88] px-2 py-0.5 bg-[#00FF88]/10 rounded-full">+12.4%</span>
            </div>
            <div className="text-3xl font-bold mb-8">$124,500.00</div>
            
            <div className="space-y-4">
              {[
                { name: "BTC", fullName: "Bitcoin", price: "$64,230.00", change: "+1.2%", color: "#F7931A", initial: "B" },
                { name: "ETH", fullName: "Ethereum", price: "$3,420.00", change: "+4.5%", color: "#627EEA", initial: "E" },
              ].map((coin, i) => (
                <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm italic" style={{ backgroundColor: coin.color }}>
                      {coin.initial}
                    </div>
                    <div className="text-xs">{coin.fullName}</div>
                  </div>
                  <div className="text-right text-xs">{coin.price}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Phone 2 - Chart */}
          <motion.div 
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 left-4 w-[260px] h-[300px] bg-[#0E1117]/60 backdrop-blur-xl border border-[#00FF88]/20 rounded-[32px] p-6 shadow-2xl z-30"
          >
             <div className="flex items-center gap-2 mb-4">
               <div className="w-2 h-2 rounded-full bg-[#00FF88]"></div>
               <span className="text-[10px] text-gray-300 font-semibold uppercase tracking-wider">AI Signal Engine</span>
             </div>
             
             <div className="mb-4">
                <div className="text-xs text-[#00FF88] mb-1">Strong Buy Detected</div>
                <div className="text-xl font-bold">SOL / USDT</div>
             </div>
             
             <div className="h-24 flex items-end gap-1">
                <div className="w-full bg-white/5 h-12 rounded-t-sm" />
                <div className="w-full bg-white/5 h-16 rounded-t-sm" />
                <div className="w-full bg-white/5 h-20 rounded-t-sm" />
                <div className="w-full bg-[#00FF88] h-24 rounded-t-sm shadow-[0_0_15px_rgba(0,255,136,0.4)]" />
                <div className="w-full bg-[#00FF88] h-14 rounded-t-sm" />
             </div>
             
             <div className="mt-4 flex justify-between">
                <div className="text-[10px] text-gray-500">Confidence</div>
                <div className="text-[10px] text-white">94.8%</div>
             </div>
          </motion.div>
          
          {/* Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#00FF88] opacity-10 rounded-full blur-[80px]" />
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  return (
    <section className="w-full h-auto md:h-32 bg-gradient-to-t from-black to-transparent border-t border-white/[0.05] flex items-center py-8 md:py-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-8">
          {[
            { label: "Trading Volume", value: 8, prefix: "$", suffix: "B+" },
            { label: "Active Traders", value: 500, suffix: "K+" },
            { label: "Platform Uptime", value: 99, suffix: ".99%", highlight: true },
            { label: "Supported Countries", value: 150, suffix: "+" },
          ].map((stat, i) => (
            <div key={i} className={`space-y-1 ${i === 3 ? 'md:text-right' : ''}`}>
              <div className={`text-2xl font-bold ${stat.highlight ? 'text-[#00FF88]' : ''}`}>
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: BarChart3, title: "Advanced Trading Tools", desc: "Professional charting, deep liquidity, and execution speed built for pro traders." },
    { icon: Cpu, title: "AI Market Predictions", desc: "Our proprietary neural network analyzes millions of data points to spot trends." },
    { icon: Lock, title: "Secure Wallet", desc: "Institutional-grade cold storage and multi-sig technology protecting your assets." },
    { icon: Zap, title: "Instant Deposits", desc: "Fund your account in seconds with zero fees via bank transfer or credit card." },
    { icon: ArrowRight, title: "Lightning Withdrawals", desc: "Access your funds whenever you need them with automated withdrawal processing." },
    { icon: Globe, title: "24/7 Support", desc: "Round-the-clock priority assistance in 15+ languages from real crypto experts." }
  ];

  return (
    <section id="features" className="py-32 relative overflow-hidden">
      {/* Cinematic Background Image */}
      <Image src="/images/features_bg.jpg" alt="Features Background" fill className="object-cover opacity-[0.08] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Designed for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] to-[#19B5FE]">Next Era</span> of Trading</h2>
          <p className="text-gray-400 text-lg">Everything you need to manage your digital wealth, built into one seamless platform.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-8 h-full group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,255,136,0.1)] hover:border-[#00FF88]/30">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#00FF88]/10 group-hover:scale-110 transition-all duration-300">
                  <f.icon className="w-6 h-6 text-[#00FF88]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AITradingSection = () => {
  return (
    <section id="ai-trading" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E1117]/80 to-[#050505] -z-10" />
      <Image src="/images/ai_bg.jpg" alt="AI Neural Network Background" fill className="object-cover opacity-[0.12] pointer-events-none mix-blend-screen" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <GlassCard className="p-8 lg:p-16 relative overflow-hidden border-[#00FF88]/20 shadow-[0_0_80px_rgba(0,255,136,0.05)]">
          {/* Inner Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00FF88]/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19B5FE]/10 border border-[#19B5FE]/20 text-[#19B5FE] text-sm font-semibold mb-6">
                <Cpu className="w-4 h-4" /> AverNoxTrader AI
              </div>
              <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
                Trade Smarter.<br />Not Harder.
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                Our proprietary AI engine scans thousands of markets 24/7, identifying profitable patterns and generating high-confidence signals before breakouts happen.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Real-time sentiment analysis on social media.",
                  "Automated risk management protocols.",
                  "Instant execution on high-confidence signals."
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="w-6 h-6 rounded-full bg-[#00FF88]/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-[#00FF88]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="px-8 py-4 bg-white text-[#050505] font-bold rounded-full hover:bg-gray-200 transition-colors">
                Activate AI Trading
              </button>
            </div>

            {/* Mock Dashboard */}
            <div className="relative">
              <div className="bg-[#050505] rounded-[2rem] border border-white/10 p-6 shadow-2xl shadow-[#00FF88]/10">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h4 className="text-gray-400 text-sm font-medium">Neural Net Status</h4>
                    <p className="text-xl font-bold text-[#00FF88] flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FF88]"></span>
                      </span>
                      Active & Scanning
                    </p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-gray-400 text-sm font-medium">System Confidence</h4>
                    <p className="text-xl font-bold text-white">94.8%</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                    <p className="text-sm text-gray-400 mb-2">Signal: ETH/USD</p>
                    <div className="inline-block px-3 py-1 bg-[#00FF88]/20 text-[#00FF88] rounded-md font-bold text-lg mb-2">
                      STRONG BUY
                    </div>
                    <p className="text-xs text-gray-500">Target: $3,650.00</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                     <p className="text-sm text-gray-400 mb-2">Risk Assessment</p>
                     <div className="w-full bg-white/10 rounded-full h-2 mt-4 mb-2">
                        <div className="bg-[#19B5FE] h-2 rounded-full" style={{ width: '35%' }}></div>
                     </div>
                     <p className="text-xs text-[#19B5FE] font-medium">Low Risk (35%)</p>
                  </div>
                </div>
                
                {/* Animated Chart Area */}
                <div className="h-40 w-full bg-gradient-to-t from-white/5 to-transparent rounded-xl border border-white/5 relative flex items-end justify-between px-2 pb-2">
                   {/* Grid lines */}
                   <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
                      <div className="w-full border-b border-dashed border-gray-500" />
                      <div className="w-full border-b border-dashed border-gray-500" />
                      <div className="w-full border-b border-dashed border-gray-500" />
                   </div>
                   
                   {/* Fake bars */}
                   {[...Array(12)].map((_, i) => {
                      const h = 20 + Math.random() * 60;
                      const isUp = i > 6;
                      return (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className={`w-[6%] rounded-t-sm z-10 ${isUp ? 'bg-[#00FF88]' : 'bg-red-500'}`} 
                        />
                      );
                   })}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};



const PlatformShowcase = () => {
  const topics = [
    {
      title: "Smart Portfolio Management",
      desc: "Track your assets across multiple chains in one unified, beautiful interface. See your true ROI with accurate tax-lot accounting.",
      imgIcon: PieChart
    },
    {
      title: "One-Click Copy Trading",
      desc: "Mirror the exact moves of top-performing traders on our platform. Automatically allocate funds and sit back while the pros do the work.",
      imgIcon: Wallet
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-32">
        {topics.map((topic, index) => (
          <div key={index} className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            {/* Content */}
            <div className={index % 2 !== 0 ? 'lg:order-2' : ''}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">{topic.title}</h2>
              <p className="text-lg text-gray-400 mb-8">{topic.desc}</p>
              <button className="text-[#00FF88] font-bold flex items-center gap-2 hover:gap-4 transition-all">
                Learn more <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Visuals */}
            <div className={`relative ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
               <div className="aspect-square max-w-md mx-auto relative">
                  {/* Decorative backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00FF88]/20 to-[#19B5FE]/20 rounded-full blur-[80px]" />
                  <GlassCard className="absolute inset-4 p-8 flex flex-col justify-center border-white/20">
                     <div className="bg-[#050505] w-full h-full rounded-2xl border border-white/10 flex flex-col items-center justify-center p-8 gap-6 shadow-xl">
                        <topic.imgIcon className="w-20 h-20 text-[#19B5FE] opacity-80" />
                        <div className="w-full space-y-4">
                           <div className="h-3 w-3/4 bg-white/10 rounded-full mx-auto" />
                           <div className="h-3 w-1/2 bg-white/10 rounded-full mx-auto" />
                        </div>
                        {/* Mock UI elements */}
                        <div className="w-full flex gap-4 mt-4">
                           <div className="flex-1 h-12 bg-white/5 rounded-xl border border-white/5" />
                           <div className="flex-1 h-12 bg-[#00FF88]/10 border border-[#00FF88]/20 rounded-xl" />
                        </div>
                     </div>
                  </GlassCard>
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Sarah Jenkins", country: "United Kingdom", text: "The AI predictions have completely transformed my trading strategy. I'm seeing consistent returns for the first time." },
    { name: "Michael Chen", country: "Singapore", text: "Best UI in the crypto space, hands down. It feels incredibly premium, fast, and the copy trading feature is flawless." },
    { name: "David Rossi", country: "Italy", text: "Institutional grade security combined with lightning fast execution. AverNoxTrader is miles ahead of the competition." }
  ];

  return (
    <section className="py-24 bg-[#0E1117]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Trusted by Professionals</h2>
          <p className="text-gray-400">Join elite traders who have already made the switch.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <GlassCard key={i} className="p-8">
              <div className="flex text-[#00FF88] mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">"{rev.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00FF88] to-[#19B5FE] flex items-center justify-center font-bold text-[#050505]">
                  {rev.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-white">{rev.name}</h4>
                  <p className="text-xs text-gray-500">{rev.country}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "Is AverNoxTrader secure?", a: "Yes. We use institutional-grade cold storage for 98% of user funds, AES-256 encryption, and require multi-factor authentication for all accounts." },
    { q: "How does the AI Trading bot work?", a: "Our AI scans market data, news sentiment, and volume patterns across multiple exchanges. It generates signals that you can either act on manually or set to auto-execute based on your risk profile." },
    { q: "What are the trading fees?", a: "We offer some of the most competitive rates in the industry, starting at 0.1% for makers and takers, with discounts for high-volume traders." },
    { q: "Can I withdraw my funds anytime?", a: "Absolutely. We support instant withdrawals for major cryptocurrencies and same-day processing for fiat bank transfers." }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/[0.08] rounded-2xl overflow-hidden transition-colors hover:bg-white/[0.04]">
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-bold text-lg">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00FF88]/10 -z-10" />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
          Trade Smarter<br />With AI
        </h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Join half a million traders who are already leveraging the power of advanced algorithms and deep liquidity.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-4 bg-[#00FF88] text-[#050505] font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,255,136,0.4)] text-lg">
            Create Free Account
          </button>
          <button className="px-8 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-colors text-lg">
            View Market Pricing
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#050505] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#00FF88] to-[#19B5FE] flex items-center justify-center shadow-[0_0_10px_rgba(0,255,136,0.5)]">
                <Bitcoin className="text-[#050505] w-3 h-3" />
              </div>
              <span className="text-xl font-bold">AverNoxTrader</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-sm">
              The premium cryptocurrency exchange providing AI-powered insights and institutional-grade security for the modern trader.
            </p>
            <div className="flex gap-4">
               {/* Social Icons Placeholders */}
               <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00FF88]/20 hover:text-[#00FF88] transition-colors cursor-pointer"><ArrowUpRight className="w-5 h-5" /></div>
               <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00FF88]/20 hover:text-[#00FF88] transition-colors cursor-pointer"><ArrowUpRight className="w-5 h-5" /></div>
               <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00FF88]/20 hover:text-[#00FF88] transition-colors cursor-pointer"><ArrowUpRight className="w-5 h-5" /></div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white">Company</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-[#00FF88] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#00FF88] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#00FF88] transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-[#00FF88] transition-colors">Security</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white">Products</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-[#00FF88] transition-colors">Spot Trading</a></li>
              <li><a href="#" className="hover:text-[#00FF88] transition-colors">AI Margin</a></li>
              <li><a href="#" className="hover:text-[#00FF88] transition-colors">Copy Trader</a></li>
              <li><a href="#" className="hover:text-[#00FF88] transition-colors">Institutional</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white">Legal</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-[#00FF88] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#00FF88] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#00FF88] transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-[#00FF88] transition-colors">Fees Schedule</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} AverNoxTrader Inc. All rights reserved.</p>
          <div className="flex gap-6">
             <span>System Status: <span className="text-[#00FF88]">Operational</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <AITradingSection />
        <PlatformShowcase />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
