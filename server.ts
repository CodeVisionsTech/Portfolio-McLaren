import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { INITIAL_PORTFOLIO_DATA } from './src/data/initialData';
import { PortfolioData, ContactMessage } from './src/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const AUTH_FILE = path.join(DATA_DIR, 'auth.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Admin Credentials (Default: password "apex2026!")
const DEFAULT_PASSWORD_HASH = crypto.createHash('sha256').update('apex2026!').digest('hex');
const JWT_SECRET = crypto.randomBytes(32).toString('hex');

interface AuthState {
  passwordHash: string;
  activeTokens: string[];
}

function getAuthState(): AuthState {
  if (fs.existsSync(AUTH_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
    } catch (e) {
      console.error('Failed to read auth file:', e);
    }
  }
  const initialAuth: AuthState = {
    passwordHash: DEFAULT_PASSWORD_HASH,
    activeTokens: []
  };
  fs.writeFileSync(AUTH_FILE, JSON.stringify(initialAuth, null, 2));
  return initialAuth;
}

function saveAuthState(state: AuthState) {
  fs.writeFileSync(AUTH_FILE, JSON.stringify(state, null, 2));
}

function getPortfolioData(): PortfolioData {
  if (fs.existsSync(PORTFOLIO_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(PORTFOLIO_FILE, 'utf-8'));
    } catch (e) {
      console.error('Failed to read portfolio file, using default data:', e);
    }
  }
  // Initialize portfolio
  fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(INITIAL_PORTFOLIO_DATA, null, 2));
  return INITIAL_PORTFOLIO_DATA;
}

function savePortfolioData(data: PortfolioData) {
  fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(data, null, 2));
}

function getMessages(): ContactMessage[] {
  if (fs.existsSync(MESSAGES_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));
    } catch (e) {
      console.error('Failed to read messages file:', e);
    }
  }
  return [];
}

function saveMessages(messages: ContactMessage[]) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '20mb' }));

  // Helper auth middleware
  const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }
    const token = authHeader.split(' ')[1];
    const authState = getAuthState();
    if (!authState.activeTokens.includes(token)) {
      return res.status(401).json({ error: 'Unauthorized: Token expired or invalid' });
    }
    next();
  };

  // Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Auth: Login
  app.post('/api/auth/login', (req, res) => {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
    const authState = getAuthState();
    const hash = crypto.createHash('sha256').update(password).digest('hex');

    if (hash === authState.passwordHash) {
      const token = crypto.randomBytes(32).toString('hex');
      authState.activeTokens.push(token);
      // Keep only last 10 tokens
      if (authState.activeTokens.length > 10) {
        authState.activeTokens.shift();
      }
      saveAuthState(authState);
      return res.json({ success: true, token });
    }

    return res.status(401).json({ error: 'Invalid admin credentials' });
  });

  // Auth: Verify Token
  app.get('/api/auth/verify', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ valid: false });
    }
    const token = authHeader.split(' ')[1];
    const authState = getAuthState();
    const valid = authState.activeTokens.includes(token);
    res.json({ valid });
  });

  // Auth: Logout
  app.post('/api/auth/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const authState = getAuthState();
      authState.activeTokens = authState.activeTokens.filter(t => t !== token);
      saveAuthState(authState);
    }
    res.json({ success: true });
  });

  // Auth: Change Password
  app.post('/api/auth/change-password', requireAuth, (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password required' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }

    const authState = getAuthState();
    const currentHash = crypto.createHash('sha256').update(currentPassword).digest('hex');

    if (currentHash !== authState.passwordHash) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    authState.passwordHash = crypto.createHash('sha256').update(newPassword).digest('hex');
    saveAuthState(authState);
    res.json({ success: true, message: 'Password updated successfully' });
  });

  // Portfolio: Get Public Data
  app.get('/api/portfolio', (req, res) => {
    const data = getPortfolioData();
    res.json(data);
  });

  // Portfolio: Update Data (Admin only)
  app.put('/api/portfolio', requireAuth, (req, res) => {
    const updatedData = req.body as PortfolioData;
    if (!updatedData || !updatedData.hero) {
      return res.status(400).json({ error: 'Invalid portfolio data payload' });
    }
    savePortfolioData(updatedData);
    res.json({ success: true, data: updatedData });
  });

  // Portfolio: Reset to Initial Template (Admin only)
  app.post('/api/portfolio/reset', requireAuth, (req, res) => {
    savePortfolioData(INITIAL_PORTFOLIO_DATA);
    res.json({ success: true, data: INITIAL_PORTFOLIO_DATA });
  });

  // Contact: Submit Message (Public)
  app.post('/api/contact', (req, res) => {
    const { name, email, projectType, budget, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const newMessage: ContactMessage = {
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      name,
      email,
      projectType: projectType || 'General Collaboration',
      budget: budget || 'Undisclosed',
      message,
      timestamp: new Date().toISOString(),
      read: false
    };

    const messages = getMessages();
    messages.unshift(newMessage);
    saveMessages(messages);

    res.json({ success: true, message: 'Message sent successfully!' });
  });

  // Contact: Get Messages (Admin only)
  app.get('/api/contact/messages', requireAuth, (req, res) => {
    const messages = getMessages();
    res.json(messages);
  });

  // Contact: Mark as Read (Admin only)
  app.patch('/api/contact/messages/:id/read', requireAuth, (req, res) => {
    const { id } = req.params;
    const messages = getMessages();
    const target = messages.find(m => m.id === id);
    if (target) {
      target.read = true;
      saveMessages(messages);
      return res.json({ success: true, message: target });
    }
    res.status(404).json({ error: 'Message not found' });
  });

  // Contact: Delete Message (Admin only)
  app.delete('/api/contact/messages/:id', requireAuth, (req, res) => {
    const { id } = req.params;
    let messages = getMessages();
    messages = messages.filter(m => m.id !== id);
    saveMessages(messages);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
