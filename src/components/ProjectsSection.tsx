import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles, Eye, Layers, Compass, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';
import { playTick, playHoverWhoosh } from '../utils/soundEffects';

export const ProjectsSection: React.FC = () => {
  const { data, setSelectedProject } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'Motorsport & Velocity',
    'Interactive Web',
    'Digital Product',
    'Creative Tech',
    'AI & WebGL'
  ];

  const filteredProjects = activeCategory === 'ALL'
    ? data.projects
    : data.projects.filter((p) => p.category === activeCategory);

  const featuredProject = data.projects.find((p) => p.featured) || data.projects[0];

  const handleOpenProject = (project: Project) => {
    playTick();
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-20 sm:py-32 bg-[#F8F9FA] relative border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-black/10">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-black/50 uppercase tracking-widest mb-3">
              <span className="w-8 h-[1px] bg-black/40" />
              <span>03 // FEATURED WORK & LAB RELEASES</span>
            </div>
            <h2 className="font-syne font-black text-4xl sm:text-6xl uppercase tracking-tight text-black leading-none">
              SELECTED WORKS<span className="text-[#9FB800]">.</span>
            </h2>
          </div>

          <div className="font-mono text-xs text-black/60 max-w-sm">
            PROPRIETARY DIGITAL SYSTEMS, HIGH-VELOCITY SHADERS & EXPERIMENTAL WEB ARCHITECTURE // 2024 — 2026
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  playTick();
                  setActiveCategory(cat);
                }}
                onMouseEnter={playHoverWhoosh}
                className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-black text-[#E2FD52] shadow-sm'
                    : 'bg-white text-black/70 hover:text-black hover:bg-black/5 border border-black/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Featured Showcase Banner (Shown if "ALL" or if activeCategory matches featuredProject) */}
        {activeCategory === 'ALL' && featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 mb-16 rounded-3xl overflow-hidden bg-black text-white border border-black/20 shadow-2xl relative group cursor-pointer"
            onClick={() => handleOpenProject(featuredProject)}
            onMouseEnter={playHoverWhoosh}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
              {/* Left Details */}
              <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between z-10">
                <div>
                  <div className="flex items-center gap-3 font-mono text-xs text-[#E2FD52] tracking-widest uppercase">
                    <span className="w-2 h-2 rounded-full bg-[#E2FD52] animate-pulse" />
                    <span>FEATURED FLAGSHIP SHOWCASE</span>
                  </div>

                  <h3 className="font-syne font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-4 leading-tight group-hover:text-[#E2FD52] transition-colors duration-300">
                    {featuredProject.title}
                  </h3>

                  <p className="mt-4 text-base sm:text-lg text-white/80 font-sans line-clamp-3">
                    {featuredProject.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {featuredProject.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-white/10 text-white/90 font-mono text-[11px] uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-8 flex items-center justify-between border-t border-white/15 mt-8">
                  <div className="font-mono text-xs text-white/60">
                    {featuredProject.client} // {featuredProject.year}
                  </div>

                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E2FD52] text-black font-syne font-extrabold text-xs uppercase tracking-wider group-hover:bg-white transition-colors">
                    <span>EXPLORE CASE STUDY</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Right Visual Frame */}
              <div className="lg:col-span-6 relative overflow-hidden bg-zinc-900 min-h-[300px]">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent lg:block hidden" />
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded font-mono text-xs text-[#E2FD52]">
                  {featuredProject.category}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => handleOpenProject(project)}
                onMouseEnter={() => {
                  playTick();
                  playHoverWhoosh();
                }}
                className="group flex flex-col rounded-2xl bg-white border border-black/10 overflow-hidden hover:border-black hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-black/80 backdrop-blur-md rounded font-mono text-[10px] text-[#E2FD52] tracking-wider uppercase">
                    {project.category}
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#E2FD52] group-hover:text-black transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-[10px] tracking-widest text-black/50 uppercase">
                      {project.client} // {project.year}
                    </div>

                    <h3 className="font-syne font-black text-xl sm:text-2xl text-black uppercase tracking-tight mt-1.5 group-hover:text-[#658800] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-sm text-black/70 font-sans line-clamp-2 leading-relaxed">
                      {project.subtitle}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-black/8 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-black/5 text-black/80 font-mono text-[10px] font-semibold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <span className="font-syne font-bold text-xs text-black group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>READ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
