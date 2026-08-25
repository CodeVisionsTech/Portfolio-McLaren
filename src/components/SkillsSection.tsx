import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gauge, Cpu, Code2, Compass, Layers, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playTick, playHoverWhoosh } from '../utils/soundEffects';

export const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const [activeTab, setActiveTab] = useState('ALL');

  const categories = [
    'ALL',
    'Frontend & Motion',
    'Graphics & WebGL',
    'Fullstack & Systems',
    'Leadership & UX'
  ];

  const filteredSkills = activeTab === 'ALL'
    ? data.skills
    : data.skills.filter((s) => s.category === activeTab);

  return (
    <section id="skills" className="py-20 sm:py-32 bg-white relative border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-black/10">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-black/50 uppercase tracking-widest mb-3">
              <span className="w-8 h-[1px] bg-black/40" />
              <span>04 // TECHNICAL TELEMETRY & COMPETENCIES</span>
            </div>
            <h2 className="font-syne font-black text-4xl sm:text-6xl uppercase tracking-tight text-black leading-none">
              SKILLS & STACK<span className="text-[#9FB800]">.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-black/70 bg-black/5 px-4 py-2 rounded-xl border border-black/10">
            <Gauge className="w-4 h-4 text-black" />
            <span>CALIBRATED FOR PEAK 120 FPS EXECUTION</span>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  playTick();
                  setActiveTab(cat);
                }}
                onMouseEnter={playHoverWhoosh}
                className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-black text-[#E2FD52] shadow-sm'
                    : 'bg-[#F8F9FA] text-black/70 hover:text-black hover:bg-black/5 border border-black/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              onMouseEnter={playHoverWhoosh}
              className="p-6 rounded-2xl bg-[#F8F9FA] border border-black/10 hover:border-black hover:bg-white hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-black/50 uppercase font-semibold">
                    {skill.category}
                  </span>
                  <h3 className="font-syne font-extrabold text-xl text-black uppercase tracking-tight mt-0.5">
                    {skill.name}
                  </h3>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-syne font-black text-2xl text-black group-hover:text-[#658800] transition-colors">
                    {skill.proficiency}%
                  </span>
                  <div className="font-mono text-[10px] text-black/40 font-bold uppercase">
                    {skill.experienceYears}
                  </div>
                </div>
              </div>

              {/* Progress Telemetry Bar */}
              <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-black group-hover:bg-[#A3D900] transition-colors rounded-full"
                />
              </div>

              {/* Strengths Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {skill.keyStrengths.map((str, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-white border border-black/10 text-black/80 font-mono text-[11px] font-medium"
                  >
                    {str}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
