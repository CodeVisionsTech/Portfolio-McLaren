import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Sparkles, Activity, ShieldAlert, Play, ArrowRight, CornerRightDown } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playTick, playHoverWhoosh, playEngineRev } from '../utils/soundEffects';

export const HeroSection: React.FC = () => {
  const { data, setIsContactModalOpen } = usePortfolio();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (!data.hero.rotatingRoles || data.hero.rotatingRoles.length === 0) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % data.hero.rotatingRoles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [data.hero.rotatingRoles]);

  return (
    <section
      id="hero"
      className="relative pt-28 sm:pt-36 pb-16 md:pb-24 overflow-hidden bg-[#F8F9FA] bg-grid-pattern"
    >
      {/* Background Ambience / Subtle Accent Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E2FD52]/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-black/3 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Telemetry Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-black/8 font-mono text-xs text-black/60">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3D900] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4F7A00]" />
            </span>
            <span className="font-semibold text-black tracking-wider">
              {data.hero.statusBadge}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-black" />
              <span>FPS: 120.0 LOCKED</span>
            </div>
            <div className="flex items-center gap-2">
              <span>LOC:</span>
              <span className="text-black font-semibold">{data.hero.location}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-black text-[#E2FD52] font-bold rounded">
              <span>CHASSIS #{data.hero.racingNumber}</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Editorial Typography & Dynamic Visual Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 md:pt-12">
          {/* Left Column: Bold Typography & Manifesto */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Animated Role Ticker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/5 border border-black/10 w-fit mb-6">
              <span className="w-2 h-2 rounded-sm bg-[#E2FD52] border border-black/40" />
              <span className="font-mono text-xs uppercase tracking-widest text-black/70 font-semibold">
                DISCIPLINE //
              </span>
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-xs uppercase tracking-wider font-bold text-black"
              >
                {data.hero.rotatingRoles[roleIndex] || data.hero.tagline}
              </motion.span>
            </div>

            {/* Giant Display Name & Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-syne font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.92] text-black"
            >
              {data.hero.name.split(' ')[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-black/80 to-black/60">
                {data.hero.name.split(' ')[1] || 'VANCE'}
              </span>
              <span className="text-[#A3D900] ml-1">.</span>
            </motion.h1>

            {/* Editorial Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 sm:mt-8 text-lg sm:text-xl text-black/80 font-normal leading-relaxed max-w-2xl font-sans"
            >
              {data.hero.shortBio}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => {
                  playTick();
                  setIsContactModalOpen(true);
                }}
                onMouseEnter={playHoverWhoosh}
                className="group px-7 py-4 rounded-xl bg-black text-white hover:bg-[#E2FD52] hover:text-black font-syne font-extrabold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.12)] flex items-center gap-3 cursor-pointer"
                id="hero-commission-btn"
              >
                <span>INITIATE PROJECT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#projects"
                onClick={() => playTick()}
                onMouseEnter={playHoverWhoosh}
                className="px-6 py-4 rounded-xl bg-white hover:bg-black/5 border border-black/15 text-black font-syne font-bold text-sm tracking-wider uppercase transition-all duration-200 flex items-center gap-2 shadow-sm"
                id="hero-work-btn"
              >
                <span>EXPLORE WORK</span>
                <CornerRightDown className="w-4 h-4 text-black/60" />
              </a>

              <button
                onClick={() => playEngineRev()}
                onMouseEnter={playHoverWhoosh}
                className="p-4 rounded-xl bg-black/5 hover:bg-black hover:text-[#E2FD52] border border-black/10 text-black font-mono text-xs transition-colors"
                title="Ignite Sound Rev Engine"
                id="hero-rev-btn"
              >
                <Play className="w-4 h-4 fill-current" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: High-Impact Visual Composition */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative group rounded-2xl overflow-hidden bg-black border-2 border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
            >
              {/* Primary High-Res Photo */}
              <div className="aspect-[4/5] sm:aspect-[3/4] relative overflow-hidden bg-black">
                <img
                  src={data.hero.heroImage}
                  alt={data.hero.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Tactical HUD Overlay Over Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Viewfinder Crosshairs in corners */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#E2FD52]" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#E2FD52]" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#E2FD52]" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#E2FD52]" />

                {/* Top Badge */}
                <div className="absolute top-4 left-8 font-mono text-[10px] tracking-widest text-[#E2FD52] uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
                  OFFICIAL PADDOCK // NO. {data.hero.racingNumber}
                </div>

                {/* Bottom Card Detail */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                  <div>
                    <div className="font-mono text-[10px] tracking-widest text-[#E2FD52]">
                      SPECIFICATION
                    </div>
                    <div className="font-syne font-bold text-lg tracking-tight">
                      HIGH-VELOCITY STACK
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-syne font-extrabold text-2xl text-[#E2FD52] leading-none">
                      {data.hero.racingNumber}
                    </div>
                    <div className="font-mono text-[9px] tracking-widest text-white/70">
                      LEO VANCE
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Secondary Telemetry Pill */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 bg-white p-4 rounded-xl border border-black/15 shadow-[0_12px_36px_rgba(0,0,0,0.1)] max-w-[220px] hidden sm:block"
            >
              <div className="flex items-center gap-2 font-mono text-[10px] text-black/50 font-bold uppercase">
                <Sparkles className="w-3 h-3 text-[#7FA600]" />
                <span>BENCHMARK //</span>
              </div>
              <div className="font-syne font-extrabold text-2xl text-black mt-1">
                99.98%
              </div>
              <div className="font-sans text-xs text-black/70 leading-snug mt-0.5">
                Rendering Frame Stability & Interaction Fidelity
              </div>
            </motion.div>
          </div>
        </div>

        {/* Telemetry Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 sm:mt-24 pt-8 border-t border-black/10">
          {data.hero.telemetryStats.map((stat, idx) => (
            <motion.div
              key={stat.label + idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              onMouseEnter={playHoverWhoosh}
              className="p-5 rounded-xl bg-white border border-black/10 hover:border-black hover:shadow-md transition-all duration-200 group"
            >
              <div className="font-mono text-[10px] tracking-widest text-black/50 uppercase font-semibold">
                {stat.label}
              </div>
              <div className="flex items-baseline gap-1.5 mt-2">
                <span className="font-syne font-extrabold text-3xl sm:text-4xl text-black group-hover:text-[#658800] transition-colors">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="font-mono text-xs font-bold text-black/40">
                    {stat.unit}
                  </span>
                )}
              </div>
              {stat.description && (
                <p className="mt-2 text-xs text-black/60 font-sans leading-relaxed">
                  {stat.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Infinite High-Speed Marquee Ticker */}
      <div className="mt-16 sm:mt-20 border-y border-black bg-black text-[#E2FD52] py-4 overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-syne font-black text-xl sm:text-2xl tracking-widest uppercase">
          {data.hero.marqueeItems.concat(data.hero.marqueeItems).map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>{item}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#E2FD52]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
