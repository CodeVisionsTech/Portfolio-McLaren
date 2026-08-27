import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, Activity, CheckCircle, Layers, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playTick, playHoverWhoosh } from '../utils/soundEffects';

export const CaseStudyModal: React.FC = () => {
  const { selectedProject, setSelectedProject, data } = usePortfolio();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  if (!selectedProject) return null;

  const gallery = selectedProject.galleryImages && selectedProject.galleryImages.length > 0
    ? selectedProject.galleryImages
    : [selectedProject.image];

  const currentIdx = data.projects.findIndex((p) => p.id === selectedProject.id);

  const handleNextProject = () => {
    playTick();
    const nextIdx = (currentIdx + 1) % data.projects.length;
    setSelectedProject(data.projects[nextIdx]);
  };

  const handlePrevProject = () => {
    playTick();
    const prevIdx = (currentIdx - 1 + data.projects.length) % data.projects.length;
    setSelectedProject(data.projects[prevIdx]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playTick();
            setSelectedProject(null);
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-black/15 overflow-hidden flex flex-col z-10 my-auto"
        >
          {/* Top Bar */}
          <div className="p-4 sm:p-6 bg-[#0D0E12] text-white flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-[#E2FD52] text-black font-mono text-xs font-bold uppercase">
                {selectedProject.category}
              </span>
              <span className="font-mono text-xs text-white/60 hidden sm:inline">
                {selectedProject.client} // {selectedProject.year}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevProject}
                onMouseEnter={playHoverWhoosh}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Previous Case Study"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextProject}
                onMouseEnter={playHoverWhoosh}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Next Case Study"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  playTick();
                  setSelectedProject(null);
                }}
                className="p-2 rounded-lg bg-white/10 hover:bg-[#E2FD52] hover:text-black text-white transition-colors ml-2"
                title="Close Window (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-6 sm:p-8 md:p-10 overflow-y-auto space-y-8">
            {/* Title & Subtitle */}
            <div>
              <h2 className="font-syne font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-black">
                {selectedProject.title}
              </h2>
              <p className="mt-2 text-base sm:text-xl text-black/70 font-sans">
                {selectedProject.subtitle}
              </p>
            </div>

            {/* Gallery Image Display */}
            <div className="rounded-xl overflow-hidden bg-black border border-black/10 relative group aspect-[16/9] sm:aspect-[21/9]">
              <img
                src={gallery[activeImageIndex]}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500"
              />

              {gallery.length > 1 && (
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                  <div className="flex gap-2">
                    {gallery.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          playTick();
                          setActiveImageIndex(i);
                        }}
                        className={`w-3 h-3 rounded-full transition-all ${
                          activeImageIndex === i ? 'bg-[#E2FD52] scale-125' : 'bg-white/50 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[11px] text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    SHOT {activeImageIndex + 1} / {gallery.length}
                  </span>
                </div>
              )}
            </div>

            {/* Metrics HUD Row */}
            {selectedProject.metrics && selectedProject.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-[#F8F9FA] border border-black/10">
                {selectedProject.metrics.map((metric, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="font-mono text-[10px] tracking-widest text-black/50 uppercase">
                      {metric.label}
                    </span>
                    <span className="font-syne font-extrabold text-2xl text-black mt-1">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Detailed Narrative Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
              <div className="md:col-span-8 space-y-6">
                <div>
                  <h3 className="font-mono text-xs tracking-widest text-black/40 uppercase font-bold mb-2">
                    EXECUTIVE OVERVIEW
                  </h3>
                  <p className="text-base sm:text-lg text-black/80 font-sans leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {selectedProject.challenge && (
                  <div className="p-6 rounded-xl bg-black/5 border border-black/8">
                    <h3 className="font-syne font-bold text-base text-black uppercase mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      THE ENGINEERING CHALLENGE
                    </h3>
                    <p className="text-sm sm:text-base text-black/75 font-sans leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>
                )}

                {selectedProject.solution && (
                  <div className="p-6 rounded-xl bg-[#E2FD52]/20 border border-black/15">
                    <h3 className="font-syne font-bold text-base text-black uppercase mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-black" />
                      THE HIGH-VELOCITY SOLUTION
                    </h3>
                    <p className="text-sm sm:text-base text-black/85 font-sans leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                )}

                {selectedProject.outcomes && selectedProject.outcomes.length > 0 && (
                  <div>
                    <h3 className="font-mono text-xs tracking-widest text-black/40 uppercase font-bold mb-3">
                      VERIFIED OUTCOMES & INDUSTRY IMPACT
                    </h3>
                    <div className="space-y-2">
                      {selectedProject.outcomes.map((outcome, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-black/80 font-sans">
                          <CheckCircle className="w-4 h-4 text-[#7FA600] shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Info & Action Links */}
              <div className="md:col-span-4 space-y-6">
                <div className="p-5 rounded-xl bg-[#F8F9FA] border border-black/10 space-y-4">
                  <div>
                    <div className="font-mono text-[10px] text-black/50 uppercase">CLIENT & AFFILIATION</div>
                    <div className="font-syne font-bold text-sm text-black mt-0.5">{selectedProject.client}</div>
                  </div>

                  <div>
                    <div className="font-mono text-[10px] text-black/50 uppercase">RELEASE YEAR</div>
                    <div className="font-mono text-sm text-black font-semibold mt-0.5">{selectedProject.year}</div>
                  </div>

                  <div>
                    <div className="font-mono text-[10px] text-black/50 uppercase">TECH STACK / ARTIFACTS</div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {selectedProject.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-black text-white font-mono text-[11px] font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Action Links */}
                <div className="space-y-3">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 rounded-xl bg-black text-[#E2FD52] hover:bg-[#E2FD52] hover:text-black font-syne font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <span>LAUNCH LIVE DEMO</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}

                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-white hover:bg-black/5 border border-black/20 text-black font-syne font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span>SOURCE REPOSITORY</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
