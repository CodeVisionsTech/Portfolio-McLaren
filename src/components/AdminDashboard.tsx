import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  LogOut,
  X,
  Plus,
  Trash2,
  Edit3,
  Save,
  RotateCcw,
  Eye,
  Inbox,
  Briefcase,
  Layers,
  Award,
  Sparkles,
  Key,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  ExternalLink,
  Mail,
  ChevronRight,
  Settings
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioData, Project, ExperienceItem, SkillItem, AchievementItem, ServiceItem } from '../types';
import { playTick, playSuccessChime } from '../utils/soundEffects';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const {
    data,
    updatePortfolio,
    resetPortfolio,
    logoutAdmin,
    messages,
    markMessageRead,
    deleteMessage,
    changeAdminPassword
  } = usePortfolio();

  const [localData, setLocalData] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<'hero' | 'projects' | 'experience' | 'skills' | 'achievements' | 'services' | 'messages' | 'security'>('hero');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isEditingHero, setIsEditingHero] = useState(false);
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Security password state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  // Sync localData when external data changes
  React.useEffect(() => {
    setLocalData(data);
  }, [data]);

  if (!isOpen) return null;

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSaveAll = async () => {
    playTick();
    const res = await updatePortfolio(localData);
    if (res.success) {
      showNotification('All portfolio modifications persisted to server!');
    } else {
      showNotification(res.error || 'Failed to save updates', 'error');
    }
  };

  const handleResetFactory = async () => {
    if (window.confirm('Reset all portfolio content back to the default factory template?')) {
      playTick();
      const res = await resetPortfolio();
      if (res.success) {
        showNotification('Portfolio reset to default template.');
      }
    }
  };

  // Projects CRUD
  const handleSaveProject = (proj: Project) => {
    playTick();
    let updatedProjects = [...localData.projects];
    const exists = updatedProjects.some((p) => p.id === proj.id);

    if (exists) {
      updatedProjects = updatedProjects.map((p) => (p.id === proj.id ? proj : p));
    } else {
      updatedProjects.unshift(proj);
    }

    const updated = { ...localData, projects: updatedProjects };
    setLocalData(updated);
    updatePortfolio(updated);
    setEditingProject(null);
    setIsAddingProject(false);
    showNotification('Project record saved.');
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Delete this project permanently?')) {
      playTick();
      const updatedProjects = localData.projects.filter((p) => p.id !== id);
      const updated = { ...localData, projects: updatedProjects };
      setLocalData(updated);
      updatePortfolio(updated);
      showNotification('Project deleted.');
    }
  };

  // Password Change
  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playTick();
    setPassError('');
    setPassSuccess('');

    const res = await changeAdminPassword(currentPass, newPass);
    if (res.success) {
      setPassSuccess('Admin password changed successfully!');
      setCurrentPass('');
      setNewPass('');
      playSuccessChime();
    } else {
      setPassError(res.error || 'Failed to change password');
    }
  };

  const curatedPresets = [
    { label: 'F1 Race Cockpit', url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Supercar Apex', url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop' },
    { label: 'High-Tech Studio', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Audio Synthesizer', url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Monaco Harbor', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Cyberpunk Shader', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Driver Portrait', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Main Admin Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-6xl h-[94vh] bg-[#F8F9FA] rounded-3xl shadow-2xl border border-black/20 overflow-hidden flex flex-col z-10"
      >
        {/* Top Workbench Header */}
        <div className="bg-[#0D0E12] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E2FD52] text-black flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-syne font-extrabold text-base tracking-tight text-white flex items-center gap-2">
                <span>APEX ADMIN WORKBENCH</span>
                <span className="px-2 py-0.5 rounded bg-white/10 font-mono text-[10px] text-[#E2FD52]">
                  SESSION AUTHENTICATED
                </span>
              </div>
              <div className="font-mono text-[10px] text-white/50">
                LIVE CONTENT & CONFIGURATION STUDIO
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSaveAll}
              className="px-4 py-2 rounded-xl bg-[#E2FD52] hover:bg-white text-black font-syne font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">SAVE CHANGES</span>
            </button>

            <button
              onClick={() => {
                playTick();
                logoutAdmin();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-red-500/80 text-white transition-colors"
              title="Logout Studio Session"
            >
              <LogOut className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                playTick();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Close Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {notification && (
          <div
            className={`px-6 py-2.5 text-xs font-mono flex items-center justify-between shrink-0 ${
              notification.type === 'success'
                ? 'bg-emerald-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{notification.text}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-white hover:opacity-80">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Body: Tabs Sidebar + Content Panel */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Navigation Tabs */}
          <div className="w-full md:w-60 bg-white border-r border-black/10 p-3 shrink-0 flex md:flex-col gap-1 overflow-x-auto no-scrollbar">
            {[
              { id: 'hero', label: 'Hero & Identity', icon: Sparkles },
              { id: 'projects', label: 'Work & Projects', icon: Layers },
              { id: 'experience', label: 'Career Timeline', icon: Briefcase },
              { id: 'skills', label: 'Skills & Stack', icon: Layers },
              { id: 'achievements', label: 'Podium Honors', icon: Award },
              { id: 'services', label: 'Commissions', icon: Briefcase },
              { id: 'messages', label: `Inquiries (${messages.filter((m) => !m.read).length})`, icon: Inbox },
              { id: 'security', label: 'Settings & Security', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    playTick();
                    setActiveTab(tab.id as any);
                  }}
                  className={`px-3.5 py-2.5 rounded-xl font-syne font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all text-left whitespace-nowrap ${
                    isActive
                      ? 'bg-black text-[#E2FD52] shadow-sm'
                      : 'text-black/70 hover:bg-black/5 hover:text-black'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto bg-[#F8F9FA]">
            {/* HERO & IDENTITY TAB */}
            {activeTab === 'hero' && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center justify-between pb-4 border-b border-black/10">
                  <div>
                    <h3 className="font-syne font-black text-2xl uppercase tracking-tight text-black">
                      HERO SECTION & IDENTITY
                    </h3>
                    <p className="font-mono text-xs text-black/50">Configure branding, titles, and telemetry.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-black/60 uppercase mb-1">Display Name</label>
                    <input
                      type="text"
                      value={localData.hero.name}
                      onChange={(e) =>
                        setLocalData({ ...localData, hero: { ...localData.hero, name: e.target.value } })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 text-black font-syne font-bold text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-black/60 uppercase mb-1">Racing Chassis Number</label>
                    <input
                      type="text"
                      value={localData.hero.racingNumber}
                      onChange={(e) =>
                        setLocalData({ ...localData, hero: { ...localData.hero, racingNumber: e.target.value } })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 text-black font-mono font-bold text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-mono text-xs text-black/60 uppercase mb-1">Status Badge Text</label>
                    <input
                      type="text"
                      value={localData.hero.statusBadge}
                      onChange={(e) =>
                        setLocalData({ ...localData, hero: { ...localData.hero, statusBadge: e.target.value } })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 text-black font-sans text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-mono text-xs text-black/60 uppercase mb-1">Location Coordinates</label>
                    <input
                      type="text"
                      value={localData.hero.location}
                      onChange={(e) =>
                        setLocalData({ ...localData, hero: { ...localData.hero, location: e.target.value } })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 text-black font-mono text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-mono text-xs text-black/60 uppercase mb-1">Hero Short Bio</label>
                    <textarea
                      rows={3}
                      value={localData.hero.shortBio}
                      onChange={(e) =>
                        setLocalData({ ...localData, hero: { ...localData.hero, shortBio: e.target.value } })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 text-black font-sans text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-mono text-xs text-black/60 uppercase mb-1">Primary Hero Portrait Image URL</label>
                    <input
                      type="text"
                      value={localData.hero.heroImage}
                      onChange={(e) =>
                        setLocalData({ ...localData, hero: { ...localData.hero, heroImage: e.target.value } })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 text-black font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Preset image picker helper */}
                <div className="p-4 rounded-2xl bg-white border border-black/10 space-y-2">
                  <div className="font-mono text-xs text-black/60 uppercase font-bold flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    <span>QUICK PRESET IMAGE GALLERY (CLICK TO APPLY TO HERO)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {curatedPresets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          playTick();
                          setLocalData({
                            ...localData,
                            hero: { ...localData.hero, heroImage: preset.url }
                          });
                          showNotification(`Applied ${preset.label} to Hero Image`);
                        }}
                        className="p-2 rounded-lg bg-black/5 hover:bg-black hover:text-[#E2FD52] text-left text-xs font-mono transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-black/10">
                  <div>
                    <h3 className="font-syne font-black text-2xl uppercase tracking-tight text-black">
                      PROJECTS & WORK MANAGER
                    </h3>
                    <p className="font-mono text-xs text-black/50">
                      Manage portfolio items, case studies, galleries, and telemetry metrics.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      playTick();
                      setEditingProject({
                        id: 'proj-' + Date.now(),
                        title: 'NEW PROJECT TITLE',
                        subtitle: 'Short project summary',
                        category: 'Motorsport & Velocity',
                        client: 'Client Name',
                        year: '2026',
                        image: curatedPresets[0].url,
                        galleryImages: [curatedPresets[0].url],
                        demoUrl: 'https://example.com',
                        tags: ['React', 'WebGL', 'TypeScript'],
                        featured: false,
                        metrics: [{ label: 'Performance', value: '100%' }],
                        description: 'Detailed project description...'
                      });
                      setIsAddingProject(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-black text-[#E2FD52] font-syne font-bold text-xs uppercase flex items-center gap-1.5 hover:bg-[#E2FD52] hover:text-black transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD PROJECT</span>
                  </button>
                </div>

                {/* Edit Form if open */}
                {editingProject && (
                  <div className="p-6 rounded-2xl bg-white border-2 border-black/20 shadow-lg space-y-4">
                    <div className="flex items-center justify-between border-b border-black/10 pb-3">
                      <span className="font-syne font-bold text-lg uppercase text-black">
                        {isAddingProject ? 'ADD NEW PROJECT' : 'EDIT PROJECT'}
                      </span>
                      <button
                        onClick={() => setEditingProject(null)}
                        className="p-1 rounded bg-black/5 hover:bg-black hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-xs text-black/60 uppercase mb-1">Title</label>
                        <input
                          type="text"
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#F8F9FA] border border-black/15 font-syne font-bold text-sm"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs text-black/60 uppercase mb-1">Category</label>
                        <select
                          value={editingProject.category}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-lg bg-[#F8F9FA] border border-black/15 font-sans text-sm"
                        >
                          <option value="Motorsport & Velocity">Motorsport & Velocity</option>
                          <option value="Interactive Web">Interactive Web</option>
                          <option value="Digital Product">Digital Product</option>
                          <option value="Creative Tech">Creative Tech</option>
                          <option value="AI & WebGL">AI & WebGL</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-mono text-xs text-black/60 uppercase mb-1">Client</label>
                        <input
                          type="text"
                          value={editingProject.client}
                          onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#F8F9FA] border border-black/15 font-sans text-sm"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs text-black/60 uppercase mb-1">Year</label>
                        <input
                          type="text"
                          value={editingProject.year}
                          onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#F8F9FA] border border-black/15 font-mono text-sm"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-mono text-xs text-black/60 uppercase mb-1">Main Cover Image URL</label>
                        <input
                          type="text"
                          value={editingProject.image}
                          onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#F8F9FA] border border-black/15 font-mono text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-mono text-xs text-black/60 uppercase mb-1">Subtitle</label>
                        <input
                          type="text"
                          value={editingProject.subtitle}
                          onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#F8F9FA] border border-black/15 font-sans text-sm"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-mono text-xs text-black/60 uppercase mb-1">Full Description</label>
                        <textarea
                          rows={3}
                          value={editingProject.description}
                          onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#F8F9FA] border border-black/15 font-sans text-sm"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs text-black/60 uppercase mb-1">Demo URL</label>
                        <input
                          type="text"
                          value={editingProject.demoUrl || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#F8F9FA] border border-black/15 font-mono text-xs"
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingProject.featured}
                            onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                            className="w-4 h-4 accent-black"
                          />
                          <span className="font-syne font-bold text-xs uppercase text-black">
                            Mark as Flagship Featured Project
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-black/10">
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="px-4 py-2 rounded-lg bg-black/5 hover:bg-black/10 font-syne font-bold text-xs uppercase"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveProject(editingProject)}
                        className="px-5 py-2 rounded-lg bg-black text-[#E2FD52] font-syne font-bold text-xs uppercase hover:bg-[#E2FD52] hover:text-black transition-colors"
                      >
                        Save Project
                      </button>
                    </div>
                  </div>
                )}

                {/* List of Projects */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {localData.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-2xl bg-white border border-black/10 flex items-start justify-between gap-3 group"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-16 h-16 rounded-lg object-cover bg-black shrink-0"
                        />
                        <div>
                          <div className="font-mono text-[10px] text-black/50 uppercase">
                            {proj.category} {proj.featured && '• (FEATURED)'}
                          </div>
                          <h4 className="font-syne font-bold text-base text-black uppercase mt-0.5 leading-snug">
                            {proj.title}
                          </h4>
                          <div className="font-mono text-xs text-black/60">{proj.client}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            playTick();
                            setEditingProject(proj);
                            setIsAddingProject(false);
                          }}
                          className="p-2 rounded-lg bg-black/5 hover:bg-black hover:text-[#E2FD52] text-black transition-colors"
                          title="Edit Project"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white text-red-600 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MESSAGES INBOX TAB */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-black/10">
                  <div>
                    <h3 className="font-syne font-black text-2xl uppercase tracking-tight text-black">
                      TRANSMISSION INBOX
                    </h3>
                    <p className="font-mono text-xs text-black/50">
                      Inbound inquiries submitted through the contact brief form.
                    </p>
                  </div>
                  <span className="font-mono text-xs bg-black text-[#E2FD52] px-3 py-1 rounded-full font-bold">
                    {messages.length} TOTAL MESSAGES
                  </span>
                </div>

                {messages.length === 0 ? (
                  <div className="py-16 text-center text-black/50 font-mono text-sm">
                    NO INQUIRIES LOGGED YET.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-6 rounded-2xl border transition-all ${
                          msg.read
                            ? 'bg-white border-black/10 text-black/70'
                            : 'bg-white border-2 border-black shadow-md text-black'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              {!msg.read && (
                                <span className="w-2.5 h-2.5 rounded-full bg-[#A3D900]" />
                              )}
                              <span className="font-syne font-extrabold text-lg text-black uppercase">
                                {msg.name}
                              </span>
                              <span className="font-mono text-xs text-black/50">({msg.email})</span>
                            </div>
                            <div className="font-mono text-xs text-black/60 mt-1">
                              SERVICE: <strong className="text-black">{msg.projectType}</strong> | BUDGET: <strong className="text-black">{msg.budget}</strong>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={`mailto:${msg.email}?subject=RE: Commission Inquiry (${msg.projectType})`}
                              className="px-3 py-1.5 rounded-lg bg-black text-[#E2FD52] font-mono text-xs font-bold uppercase hover:bg-[#E2FD52] hover:text-black transition-colors flex items-center gap-1"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>Reply</span>
                            </a>
                            {!msg.read && (
                              <button
                                onClick={() => markMessageRead(msg.id)}
                                className="p-2 rounded-lg bg-black/5 hover:bg-black hover:text-white text-xs font-mono"
                                title="Mark Read"
                              >
                                Mark Read
                              </button>
                            )}
                            <button
                              onClick={() => deleteMessage(msg.id)}
                              className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <p className="mt-4 text-sm font-sans text-black/80 bg-[#F8F9FA] p-4 rounded-xl border border-black/5 leading-relaxed">
                          {msg.message}
                        </p>

                        <div className="mt-3 font-mono text-[10px] text-black/40">
                          RECEIVED: {new Date(msg.timestamp).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SECURITY & SETTINGS TAB */}
            {activeTab === 'security' && (
              <div className="space-y-8 max-w-xl">
                <div className="pb-4 border-b border-black/10">
                  <h3 className="font-syne font-black text-2xl uppercase tracking-tight text-black">
                    SECURITY & SYSTEM CONTROLS
                  </h3>
                  <p className="font-mono text-xs text-black/50">Manage admin credentials and factory defaults.</p>
                </div>

                {/* Password Change Box */}
                <form onSubmit={handleChangePasswordSubmit} className="p-6 rounded-2xl bg-white border border-black/10 space-y-4">
                  <div className="font-syne font-bold text-base uppercase text-black flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    <span>CHANGE ADMIN PASSPHRASE</span>
                  </div>

                  {passError && (
                    <div className="p-3 rounded-lg bg-red-500/20 text-red-700 text-xs font-mono">
                      {passError}
                    </div>
                  )}

                  {passSuccess && (
                    <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-800 text-xs font-mono">
                      {passSuccess}
                    </div>
                  )}

                  <div>
                    <label className="block font-mono text-xs text-black/60 uppercase mb-1">Current Password</label>
                    <input
                      type="password"
                      required
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      placeholder="Current password..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FA] border border-black/15 font-mono text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-black/60 uppercase mb-1">New Password (min 6 chars)</label>
                    <input
                      type="password"
                      required
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="New password..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FA] border border-black/15 font-mono text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-black text-[#E2FD52] font-syne font-bold text-xs uppercase hover:bg-[#E2FD52] hover:text-black transition-colors"
                  >
                    UPDATE PASSPHRASE
                  </button>
                </form>

                {/* Factory Reset Box */}
                <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-3">
                  <div className="font-syne font-bold text-base uppercase text-red-600 flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    <span>RESET TO FACTORY TEMPLATE</span>
                  </div>
                  <p className="text-xs text-black/70 font-sans">
                    Restores all projects, experience items, skills, and portfolio copy back to the initial high-velocity Leo Vance template.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFactory}
                    className="px-4 py-2.5 rounded-xl bg-red-600 text-white font-syne font-bold text-xs uppercase hover:bg-red-700 transition-colors"
                  >
                    RESET ALL CONTENT
                  </button>
                </div>
              </div>
            )}

            {/* EXPERIENCE TAB */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-black/10">
                  <div>
                    <h3 className="font-syne font-black text-2xl uppercase tracking-tight text-black">
                      CAREER TIMELINE
                    </h3>
                    <p className="font-mono text-xs text-black/50">Manage work history, company milestones, and roles.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {localData.experience.map((exp, idx) => (
                    <div key={exp.id} className="p-6 rounded-2xl bg-white border border-black/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-black/50 font-bold uppercase">STINT 0{idx + 1}</span>
                        <button
                          onClick={() => {
                            const filtered = localData.experience.filter((e) => e.id !== exp.id);
                            const updated = { ...localData, experience: filtered };
                            setLocalData(updated);
                            updatePortfolio(updated);
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const updatedExp = localData.experience.map((x) =>
                              x.id === exp.id ? { ...x, role: e.target.value } : x
                            );
                            setLocalData({ ...localData, experience: updatedExp });
                          }}
                          placeholder="Role title"
                          className="px-3 py-2 rounded-lg bg-[#F8F9FA] border border-black/10 font-syne font-bold text-sm"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const updatedExp = localData.experience.map((x) =>
                              x.id === exp.id ? { ...x, company: e.target.value } : x
                            );
                            setLocalData({ ...localData, experience: updatedExp });
                          }}
                          placeholder="Company name"
                          className="px-3 py-2 rounded-lg bg-[#F8F9FA] border border-black/10 font-sans text-sm font-semibold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SKILLS TAB */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-black/10">
                  <div>
                    <h3 className="font-syne font-black text-2xl uppercase tracking-tight text-black">
                      TECHNICAL TELEMETRY & SKILLS
                    </h3>
                    <p className="font-mono text-xs text-black/50">Adjust competency ratings and technology stacks.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {localData.skills.map((skill) => (
                    <div key={skill.id} className="p-5 rounded-2xl bg-white border border-black/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-syne font-bold text-base text-black uppercase">{skill.name}</span>
                        <span className="font-mono text-xs font-bold text-black">{skill.proficiency}%</span>
                      </div>

                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={skill.proficiency}
                        onChange={(e) => {
                          const updated = localData.skills.map((s) =>
                            s.id === skill.id ? { ...s, proficiency: Number(e.target.value) } : s
                          );
                          setLocalData({ ...localData, skills: updated });
                        }}
                        className="w-full accent-black"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACHIEVEMENTS TAB */}
            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-black/10">
                  <div>
                    <h3 className="font-syne font-black text-2xl uppercase tracking-tight text-black">
                      PODIUM HONORS & TROPHY ROOM
                    </h3>
                    <p className="font-mono text-xs text-black/50">Manage international design awards and recognitions.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {localData.achievements.map((ach) => (
                    <div key={ach.id} className="p-5 rounded-2xl bg-white border border-black/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-[#658800] font-bold uppercase">{ach.rankOrPlace}</span>
                        <span className="font-mono text-xs text-black/40">{ach.year}</span>
                      </div>
                      <h4 className="font-syne font-bold text-lg text-black uppercase">{ach.title}</h4>
                      <p className="text-xs text-black/70 font-sans">{ach.highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-black/10">
                  <div>
                    <h3 className="font-syne font-black text-2xl uppercase tracking-tight text-black">
                      COMMISSION PACKAGES
                    </h3>
                    <p className="font-mono text-xs text-black/50">Manage collaboration offerings, pricing, and scopes.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {localData.services.map((srv) => (
                    <div key={srv.id} className="p-5 rounded-2xl bg-white border border-black/10 space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="font-mono text-xs text-black/60 font-bold">{srv.priceStartingAt}</div>
                        <h4 className="font-syne font-bold text-lg text-black uppercase mt-1">{srv.title}</h4>
                        <p className="text-xs text-black/70 font-sans mt-2">{srv.description}</p>
                      </div>
                      <div className="font-mono text-[10px] text-black/40 pt-3 border-t border-black/10">
                        {srv.deliverables.length} DELIVERABLES LISTED
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
