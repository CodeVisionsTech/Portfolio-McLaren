import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, MapPin, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playHoverWhoosh, playTick } from '../utils/soundEffects';

export const ExperienceSection: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="experience" className="py-20 sm:py-32 bg-[#F8F9FA] relative border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-black/10">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-black/50 uppercase tracking-widest mb-3">
              <span className="w-8 h-[1px] bg-black/40" />
              <span>05 // CAREER TIMELINE & TRACK RECORD</span>
            </div>
            <h2 className="font-syne font-black text-4xl sm:text-6xl uppercase tracking-tight text-black leading-none">
              EXPERIENCE<span className="text-[#9FB800]">.</span>
            </h2>
          </div>

          <div className="font-mono text-xs text-black/60 max-w-sm">
            PROVEN TRACK RECORD AT THE HELM OF WORLD-CLASS CREATIVE HUBS & MOTORSPORT PADDOCKS
          </div>
        </div>

        {/* Timeline List */}
        <div className="mt-12 space-y-8">
          {data.experience.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              onMouseEnter={playHoverWhoosh}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-black/10 hover:border-black hover:shadow-xl transition-all duration-300 relative group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Left: Role & Company */}
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-black text-[#E2FD52] font-mono text-xs font-bold uppercase tracking-wider">
                      {item.type}
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-black/60">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <h3 className="font-syne font-black text-2xl sm:text-3xl text-black uppercase tracking-tight mt-2">
                    {item.role}
                  </h3>

                  <div className="font-mono text-base font-bold text-black/70 mt-1">
                    {item.company}
                  </div>

                  <p className="mt-4 text-base text-black/75 font-sans leading-relaxed">
                    {item.description}
                  </p>

                  {/* Achievements */}
                  {item.achievements && item.achievements.length > 0 && (
                    <div className="mt-6 space-y-2.5">
                      <div className="font-mono text-xs tracking-widest text-black/50 uppercase font-bold">
                        KEY STINT MILESTONES
                      </div>
                      {item.achievements.map((ach, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-black/80 font-sans">
                          <CheckCircle2 className="w-4 h-4 text-[#7FA600] shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Period & Skills */}
                <div className="lg:text-right shrink-0 flex flex-col lg:items-end justify-between">
                  <div className="font-mono text-sm sm:text-base font-bold text-black bg-black/5 px-4 py-2 rounded-xl border border-black/10 w-fit">
                    {item.period}
                  </div>

                  <div className="mt-6 lg:mt-8 flex flex-wrap lg:justify-end gap-1.5 max-w-xs">
                    {item.skillsUsed.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-[#F8F9FA] border border-black/10 text-black/80 font-mono text-[11px] font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
