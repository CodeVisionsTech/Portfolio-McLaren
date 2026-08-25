import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Key, ShieldCheck, X, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playTick, playSuccessChime } from '../utils/soundEffects';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginAdmin } = usePortfolio();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playTick();
    if (!password.trim()) {
      setError('Please enter the studio password.');
      return;
    }

    setLoading(true);
    setError('');

    const res = await loginAdmin(password);
    setLoading(false);

    if (res.success) {
      playSuccessChime();
      onSuccess();
    } else {
      setError(res.error || 'Invalid credentials.');
    }
  };

  const handleUseDemoCredentials = () => {
    playTick();
    setPassword('apex2026!');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        className="relative w-full max-w-md bg-[#0D0E12] text-white border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E2FD52] text-black flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-[10px] text-[#E2FD52] tracking-widest uppercase">
                ADMIN ACCESS CONTROL
              </div>
              <h3 className="font-syne font-black text-xl uppercase tracking-tight text-white">
                STUDIO AUTHENTICATION
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              playTick();
              onClose();
            }}
            className="p-2 rounded-lg bg-white/10 hover:bg-[#E2FD52] hover:text-black text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Credentials Quick Pill */}
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 mb-5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-white/80">
            <Sparkles className="w-4 h-4 text-[#E2FD52]" />
            <span>Default Pass: <strong className="text-white">apex2026!</strong></span>
          </div>
          <button
            type="button"
            onClick={handleUseDemoCredentials}
            className="px-2.5 py-1 rounded bg-[#E2FD52]/20 hover:bg-[#E2FD52] text-[#E2FD52] hover:text-black font-bold uppercase transition-colors"
          >
            Auto-Fill
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-mono mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1.5">
              STUDIO PASSPHRASE
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full pl-4 pr-11 py-3 rounded-xl bg-white/10 border border-white/15 focus:border-[#E2FD52] focus:outline-none text-white text-sm font-mono placeholder:text-white/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#E2FD52] hover:bg-white text-black font-syne font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span>VERIFYING CREDENTIALS...</span>
            ) : (
              <>
                <span>ENTER STUDIO WORKBENCH</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
