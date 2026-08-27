import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, ContactMessage, Project } from '../types';
import { INITIAL_PORTFOLIO_DATA } from '../data/initialData';
import { isSoundEnabled, setSoundEnabled, playTick, playSuccessChime } from '../utils/soundEffects';

interface PortfolioContextType {
  data: PortfolioData;
  loading: boolean;
  isAdmin: boolean;
  adminToken: string | null;
  messages: ContactMessage[];
  selectedProject: Project | null;
  isContactModalOpen: boolean;
  isAdminModalOpen: boolean;
  soundOn: boolean;
  preselectedService: string;
  setSelectedProject: (project: Project | null) => void;
  setIsContactModalOpen: (open: boolean) => void;
  setIsAdminModalOpen: (open: boolean) => void;
  setPreselectedService: (service: string) => void;
  toggleSound: () => void;
  loginAdmin: (password: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;
  updatePortfolio: (newData: PortfolioData) => Promise<{ success: boolean; error?: string }>;
  resetPortfolio: () => Promise<{ success: boolean; error?: string }>;
  submitContactMessage: (msg: { name: string; email: string; projectType: string; budget: string; message: string }) => Promise<{ success: boolean; error?: string }>;
  fetchMessages: () => Promise<void>;
  markMessageRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  changeAdminPassword: (currentPass: string, newPass: string) => Promise<{ success: boolean; error?: string }>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(INITIAL_PORTFOLIO_DATA);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [preselectedService, setPreselectedService] = useState('');

  // Initial load
  useEffect(() => {
    setSoundOn(isSoundEnabled());
    
    // Check for saved token
    const token = localStorage.getItem('apex_admin_token');
    if (token) {
      setAdminToken(token);
      verifyToken(token);
    }

    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.warn('Backend unavailable, using initial data:', e);
      setData(INITIAL_PORTFOLIO_DATA);
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async (token: string) => {
    try {
      const res = await fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.valid) {
          setIsAdmin(true);
          fetchMessagesInternal(token);
        } else {
          localStorage.removeItem('apex_admin_token');
          setAdminToken(null);
          setIsAdmin(false);
        }
      }
    } catch (e) {
      console.warn('Token verify failed:', e);
    }
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playTick();
  };

  const loginAdmin = async (password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const json = await res.json();
      if (res.ok && json.success) {
        localStorage.setItem('apex_admin_token', json.token);
        setAdminToken(json.token);
        setIsAdmin(true);
        playSuccessChime();
        fetchMessagesInternal(json.token);
        return { success: true };
      }
      return { success: false, error: json.error || 'Authentication failed' };
    } catch (err: unknown) {
      return { success: false, error: (err as Error).message || 'Network error' };
    }
  };

  const logoutAdmin = async () => {
    if (adminToken) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${adminToken}` }
        });
      } catch (e) {
        // Ignore logout error
      }
    }
    localStorage.removeItem('apex_admin_token');
    setAdminToken(null);
    setIsAdmin(false);
    setMessages([]);
  };

  const updatePortfolio = async (newData: PortfolioData) => {
    try {
      setData(newData);
      if (!adminToken) return { success: true };

      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(newData)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        playSuccessChime();
        return { success: true };
      }
      return { success: false, error: json.error || 'Failed to persist update' };
    } catch (err: unknown) {
      return { success: false, error: (err as Error).message };
    }
  };

  const resetPortfolio = async () => {
    try {
      setData(INITIAL_PORTFOLIO_DATA);
      if (!adminToken) return { success: true };

      const res = await fetch('/api/portfolio/reset', {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      const json = await res.json();
      if (res.ok && json.success) {
        playSuccessChime();
        return { success: true };
      }
      return { success: false, error: json.error || 'Reset failed' };
    } catch (err: unknown) {
      return { success: false, error: (err as Error).message };
    }
  };

  const submitContactMessage = async (msg: { name: string; email: string; projectType: string; budget: string; message: string }) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        playSuccessChime();
        return { success: true };
      }
      return { success: false, error: json.error || 'Failed to submit' };
    } catch (err: unknown) {
      return { success: false, error: (err as Error).message };
    }
  };

  const fetchMessagesInternal = async (token: string) => {
    try {
      const res = await fetch('/api/contact/messages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        setMessages(json);
      }
    } catch (e) {
      console.warn('Failed to fetch messages:', e);
    }
  };

  const fetchMessages = async () => {
    if (adminToken) {
      await fetchMessagesInternal(adminToken);
    }
  };

  const markMessageRead = async (id: string) => {
    if (!adminToken) return;
    try {
      const res = await fetch(`/api/contact/messages/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
      }
    } catch (e) {
      console.warn('Failed to mark read:', e);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!adminToken) return;
    try {
      const res = await fetch(`/api/contact/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        setMessages(prev => prev.filter(m => m.id !== id));
      }
    } catch (e) {
      console.warn('Failed to delete message:', e);
    }
  };

  const changeAdminPassword = async (currentPassword: string, newPassword: string) => {
    if (!adminToken) return { success: false, error: 'Not authenticated' };
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const json = await res.json();
      if (res.ok && json.success) {
        return { success: true };
      }
      return { success: false, error: json.error || 'Failed to change password' };
    } catch (err: unknown) {
      return { success: false, error: (err as Error).message };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        loading,
        isAdmin,
        adminToken,
        messages,
        selectedProject,
        isContactModalOpen,
        isAdminModalOpen,
        soundOn,
        preselectedService,
        setSelectedProject,
        setIsContactModalOpen,
        setIsAdminModalOpen,
        setPreselectedService,
        toggleSound,
        loginAdmin,
        logoutAdmin,
        updatePortfolio,
        resetPortfolio,
        submitContactMessage,
        fetchMessages,
        markMessageRead,
        deleteMessage,
        changeAdminPassword
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
