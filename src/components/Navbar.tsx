import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, ShieldCheck, Lock, Menu, X, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playTick, playHoverWhoosh } from '../utils/soundEffects';

export const Navbar: React.FC = () => {
  const { data, soundOn, toggleSound, isAdmin, setIsAdminModalOpen, setIsContactModalOpen } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple active section spy
      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'achievements', 'services', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', href: '#projects' },
    { label: 'ABOUT', href: '#about' },
    { label: 'TELEMETRY', href: '#skills' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'HONORS', href: '#achievements' },
    { label: 'SERVICES', href: '#services' },
  ];

  const handleLinkClick = (href: string) => {
    playTick();
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-white/90 backdrop-blur-md border-b border-black/8 shadow-[0_4px_24px_rgba(0,0,0,0.03)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Monogram */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#hero');
            }}
            onMouseEnter={playHoverWhoosh}
            className="group flex items-center gap-3 cursor-pointer"
            id="nav-brand"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-black text-white font-syne font-extrabold text-sm tracking-wider group-hover:bg-[#E2FD52] group-hover:text-black transition-colors duration-300">
              <span>{data.hero.racingNumber || '04'}</span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E2FD52] group-hover:bg-black transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="font-syne font-extrabold text-base tracking-tight leading-none">
                {data.hero.name}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-black/50 mt-0.5">
                EDITION // 2026
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-black/4 p-1.5 rounded-full border border-black/8 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  onMouseEnter={playHoverWhoosh}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-black text-white shadow-sm'
                      : 'text-black/70 hover:text-black hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                toggleSound();
                playTick();
              }}
              onMouseEnter={playHoverWhoosh}
              className={`p-2.5 rounded-full border transition-all duration-200 ${
                soundOn
                  ? 'bg-[#E2FD52]/40 border-black/20 text-black shadow-sm'
                  : 'bg-black/5 border-black/10 text-black/40 hover:text-black'
              }`}
              title={soundOn ? 'Sound Effects Active' : 'Sound Effects Muted'}
              id="nav-sound-toggle"
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Admin Portal Toggle */}
            <button
              onClick={() => {
                playTick();
                setIsAdminModalOpen(true);
              }}
              onMouseEnter={playHoverWhoosh}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-mono tracking-wider border transition-all duration-200 ${
                isAdmin
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                  : 'bg-black/5 border-black/10 text-black/80 hover:bg-black hover:text-white'
              }`}
              title={isAdmin ? 'Admin Studio Active' : 'Open Admin Studio'}
              id="nav-admin-btn"
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline font-bold">STUDIO ACTIVE</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline font-medium">ADMIN</span>
                </>
              )}
            </button>

            {/* Contact Action Button */}
            <button
              onClick={() => {
                playTick();
                setIsContactModalOpen(true);
              }}
              onMouseEnter={playHoverWhoosh}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white hover:bg-[#E2FD52] hover:text-black font-syne font-bold text-xs tracking-wider transition-all duration-300 shadow-sm"
              id="nav-contact-cta"
            >
              <span>COMMISSION</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => {
                playTick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2.5 rounded-lg bg-black/5 text-black hover:bg-black/10 transition-colors"
              id="nav-mobile-toggle"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-30 bg-[#F8F9FA]/98 backdrop-blur-xl pt-24 px-6 pb-8 md:hidden flex flex-col justify-between"
          >
            <div className="flex flex-col gap-3">
              <div className="text-[11px] font-mono tracking-widest text-black/40 uppercase mb-2">
                INDEX NAVIGATION
              </div>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="py-3 text-2xl font-syne font-extrabold tracking-tight border-b border-black/5 flex items-center justify-between text-black active:text-[#9FB800]"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-black/30 font-normal">0{idx + 1}</span>
                </motion.a>
              ))}
            </div>

            <div className="pt-6 flex flex-col gap-3 border-t border-black/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsContactModalOpen(true);
                }}
                className="w-full py-4 rounded-xl bg-black text-white font-syne font-bold text-sm tracking-wider flex items-center justify-center gap-2"
              >
                <span>START COMMISSION</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between font-mono text-xs text-black/60 pt-2">
                <span>LOC: {data.hero.location}</span>
                <span>STATUS: ACTIVE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
