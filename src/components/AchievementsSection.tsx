import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Award, Medal, Crown, Star } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playSuccessChime, playHoverWhoosh } from '../utils/soundEffects';

export const AchievementsSection: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="achievements" className="py-20 sm:py-32 bg-white relative border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-black/10">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-black/50 uppercase tracking-widest mb-3">
              <span className="w-8 h-[1px] bg-black/40" />
              <span>06 // PODIUM & TROPHY ROOM</span>
            </div>
            <h2 className="font-syne font-black text-4xl sm:text-6xl uppercase tracking-tight text-black leading-none">
              HONORS & AWARDS<span className="text-[#9FB800]">.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-black/60 bg-[#E2FD52]/30 px-4 py-2 rounded-xl border border-black/15">
            <Trophy className="w-4 h-4 text-black" />
            <span className="font-bold text-black">18+ GLOBAL INDUSTRY PODIUMS</span>
          </div>
        </div>

        {/* Trophies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {data.achievements.map((ach, idx) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              onMouseEnter={() => {
                playHoverWhoosh();
                playSuccessChime();
              }}
              className="p-8 rounded-3xl bg-[#F8F9FA] border border-black/10 hover:border-black hover:bg-black hover:text-white transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-black text-[#E2FD52] group-hover:bg-[#E2FD52] group-hover:text-black flex items-center justify-center transition-colors">
                    <Trophy className="w-6 h-6" />
                  </div>

                  <span className="px-3 py-1 rounded-full bg-white group-hover:bg-white/10 text-black group-hover:text-[#E2FD52] border border-black/10 group-hover:border-white/20 font-mono text-xs font-bold uppercase tracking-wider">
                    {ach.rankOrPlace}
                  </span>
                </div>

                <div className="font-mono text-xs text-black/50 group-hover:text-white/60 uppercase tracking-wider">
                  {ach.issuer} // {ach.year}
                </div>

                <h3 className="font-syne font-black text-2xl text-black group-hover:text-white uppercase tracking-tight mt-2 leading-tight">
                  {ach.title}
                </h3>

                <p className="mt-3 text-sm text-black/70 group-hover:text-white/80 font-sans leading-relaxed">
                  {ach.highlight}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-black/10 group-hover:border-white/15 flex items-center justify-between font-mono text-[11px] text-black/60 group-hover:text-white/60 uppercase">
                <span>{ach.category}</span>
                <span className="font-bold text-black group-hover:text-[#E2FD52]">VERIFIED</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
