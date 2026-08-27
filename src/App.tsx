import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginModal } from './components/LoginModal';

const PortfolioApp: React.FC = () => {
  const {
    loading,
    isAdmin,
    isAdminModalOpen,
    setIsAdminModalOpen
  } = usePortfolio();

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#F8F9FA] flex flex-col items-center justify-center font-mono text-black">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-[#E2FD52] border border-black animate-ping" />
          <span className="font-syne font-black text-xl uppercase tracking-widest">
            INITIALIZING TELEMETRY...
          </span>
        </div>
        <span className="text-xs text-black/50 mt-2">CALIBRATING 120 FPS ENGINE</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0D0E12] selection:bg-[#E2FD52] selection:text-black font-sans relative">
      {/* Magnetic Trailing Cursor (Desktop) */}
      <CustomCursor />

      {/* Persistent Navigation */}
      <Navbar />

      {/* Main Page Flow (Lando Norris Editorial Aesthetic) */}
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <AchievementsSection />
        <ServicesSection />
        <ContactSection />
      </main>

      {/* Case Study Deep Reader Modal */}
      <CaseStudyModal />

      {/* Admin Login Modal (if unauthenticated) */}
      <LoginModal
        isOpen={isAdminModalOpen && !isAdmin}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={() => {
          // Admin modal remains open but now renders AdminDashboard because isAdmin is true!
        }}
      />

      {/* Authenticated Admin Studio Dashboard */}
      {isAdmin && (
        <AdminDashboard
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}
