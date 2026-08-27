import React from 'react';
import { motion } from 'motion/react';
import { Zap, Layout, Gauge, Flame, Sparkles, CheckCircle2, Award, Quote } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playHoverWhoosh, playTick } from '../utils/soundEffects';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Zap,
  Layout,
  Gauge,
  Flame,
  Sparkles,
  Award
};

export const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const { about } = data;

  return (
    <section id="about" className="py-20 sm:py-32 bg-white relative overflow-hidden border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 font-mono text-xs text-black/50 mb-6 uppercase tracking-widest">
          <span className="w-8 h-[1px] bg-black/40" />
          <span>02 // PHILOSOPHY & BACKGROUND</span>
        </div>

        {/* Big Editorial Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase leading-[1.05] text-black max-w-4xl"
        >
          {about.headline}
        </motion.h2>

        {/* Narrative & Dual Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mt-12 sm:mt-16 items-start">
          {/* Left Column: Biography & Signature Quote */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {about.bioParagraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-base sm:text-lg text-black/75 font-sans leading-relaxed"
              >
                {para}
              </p>
            ))}

            {/* Signature Quote Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onMouseEnter={playHoverWhoosh}
              className="mt-6 p-7 sm:p-8 rounded-2xl bg-[#0D0E12] text-white relative overflow-hidden group shadow-lg"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#E2FD52]/15 rounded-full blur-2xl" />
              <Quote className="w-10 h-10 text-[#E2FD52]/40 mb-4" />
              <blockquote className="font-syne font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                "{about.signatureQuote}"
              </blockquote>
              <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between font-mono text-xs text-[#E2FD52] tracking-widest uppercase font-bold">
                <span>{about.quoteAuthor}</span>
                <span>AUTHENTIC STATEMENT</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Frames & Detail */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Action Image 1 */}
            <div className="relative group rounded-2xl overflow-hidden bg-black aspect-[3/4] border border-black/15 shadow-md">
              <img
                src={about.portraitImage}
                alt="Portrait View"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-md rounded text-[10px] font-mono tracking-widest text-[#E2FD52] uppercase">
                STUDIO // FIELD
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white font-syne font-bold text-xs bg-black/60 backdrop-blur-sm p-2 rounded">
                OBSESSIVE PRECISION
              </div>
            </div>

            {/* Action Image 2 */}
            <div className="relative group rounded-2xl overflow-hidden bg-black aspect-[3/4] border border-black/15 shadow-md sm:translate-y-8">
              <img
                src={about.actionImage}
                alt="Motorsport & Kinetic Detail"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-md rounded text-[10px] font-mono tracking-widest text-[#E2FD52] uppercase">
                VELOCITY // DYNAMICS
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white font-syne font-bold text-xs bg-black/60 backdrop-blur-sm p-2 rounded">
                CIRCUIT RIGOR
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars / Principles Grid */}
        <div className="mt-24 pt-12 border-t border-black/10">
          <div className="font-mono text-xs text-black/50 uppercase tracking-widest mb-8">
            CORE PRINCIPLES & INTERACTION STANDARDS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.philosophies.map((item, idx) => {
              const IconComp = ICON_MAP[item.iconName] || Zap;
              return (
                <motion.div
                  key={item.title + idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  onMouseEnter={() => {
                    playTick();
                    playHoverWhoosh();
                  }}
                  className="p-6 rounded-2xl bg-[#F8F9FA] border border-black/10 hover:border-black hover:bg-white hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-black text-[#E2FD52] group-hover:bg-[#E2FD52] group-hover:text-black flex items-center justify-center transition-colors duration-300 mb-5 shadow-sm">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-syne font-extrabold text-lg text-black tracking-tight uppercase">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-black/70 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
