import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Sparkles, Clock, DollarSign } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playTick, playHoverWhoosh } from '../utils/soundEffects';

export const ServicesSection: React.FC = () => {
  const { data, setIsContactModalOpen, setPreselectedService } = usePortfolio();

  const handleBookService = (title: string) => {
    playTick();
    setPreselectedService(title);
    setIsContactModalOpen(true);
  };

  return (
    <section id="services" className="py-20 sm:py-32 bg-[#F8F9FA] relative border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-black/10">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-black/50 uppercase tracking-widest mb-3">
              <span className="w-8 h-[1px] bg-black/40" />
              <span>07 // SERVICES & COLLABORATION TIERS</span>
            </div>
            <h2 className="font-syne font-black text-4xl sm:text-6xl uppercase tracking-tight text-black leading-none">
              COMMISSIONS<span className="text-[#9FB800]">.</span>
            </h2>
          </div>

          <div className="font-mono text-xs text-black/60 max-w-sm">
            BESPOKE ARCHITECTURE & INTERACTIVE DESIGN CONTRACTS TAILORED FOR SELECT BRANDS & PADDOCKS
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {data.services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              onMouseEnter={playHoverWhoosh}
              className={`p-8 sm:p-10 rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${
                service.popular
                  ? 'bg-black text-white shadow-2xl border-2 border-[#E2FD52]'
                  : 'bg-white text-black border border-black/10 hover:border-black hover:shadow-xl'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 right-8 px-4 py-1 rounded-full bg-[#E2FD52] text-black font-syne font-black text-xs uppercase tracking-widest flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>MOST REQUESTED</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 font-mono text-xs mb-4">
                  {service.timeline && (
                    <span className={`flex items-center gap-1.5 ${service.popular ? 'text-white/60' : 'text-black/60'}`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{service.timeline}</span>
                    </span>
                  )}
                  {service.priceStartingAt && (
                    <span className={`font-bold ${service.popular ? 'text-[#E2FD52]' : 'text-black'}`}>
                      STARTING {service.priceStartingAt}
                    </span>
                  )}
                </div>

                <h3 className="font-syne font-black text-2xl sm:text-3xl uppercase tracking-tight leading-tight">
                  {service.title}
                </h3>

                <p className={`mt-4 text-sm sm:text-base font-sans leading-relaxed ${service.popular ? 'text-white/80' : 'text-black/70'}`}>
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="mt-8 pt-6 border-t border-black/10 space-y-3">
                  <div className={`font-mono text-xs uppercase tracking-widest font-bold ${service.popular ? 'text-[#E2FD52]' : 'text-black/50'}`}>
                    WHAT'S DELIVERED
                  </div>
                  {service.deliverables.map((del, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm font-sans">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${service.popular ? 'text-[#E2FD52]' : 'text-[#7FA600]'}`} />
                      <span className={service.popular ? 'text-white/90' : 'text-black/80'}>
                        {del}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-8 mt-8 border-t border-black/10">
                <button
                  onClick={() => handleBookService(service.title)}
                  className={`w-full py-4 rounded-xl font-syne font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    service.popular
                      ? 'bg-[#E2FD52] text-black hover:bg-white'
                      : 'bg-black text-white hover:bg-[#E2FD52] hover:text-black shadow-sm'
                  }`}
                >
                  <span>BOOK THIS COMMISSION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
