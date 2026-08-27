export interface TelemetryStat {
  id?: string;
  label: string;
  value: string;
  unit?: string;
  description?: string;
}

export interface Philosophy {
  id?: string;
  title: string;
  desc: string;
  iconName: string;
}

export interface HeroConfig {
  name: string;
  tagline: string;
  rotatingRoles: string[];
  racingNumber: string;
  statusBadge: string;
  location: string;
  shortBio: string;
  heroImage: string;
  heroSecondaryImage: string;
  marqueeItems: string[];
  telemetryStats: TelemetryStat[];
}

export interface AboutConfig {
  headline: string;
  bioParagraphs: string[];
  signatureQuote: string;
  quoteAuthor: string;
  portraitImage: string;
  actionImage: string;
  philosophies: Philosophy[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Interactive Web' | 'Digital Product' | 'Creative Tech' | 'Motorsport & Velocity' | 'AI & WebGL';
  client: string;
  year: string;
  image: string;
  galleryImages?: string[];
  demoUrl?: string;
  githubUrl?: string;
  tags: string[];
  featured: boolean;
  metrics: ProjectMetric[];
  description: string;
  challenge?: string;
  solution?: string;
  outcomes?: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string; // 'Full-Time' | 'Lead Contractor' | 'Advisory'
  description: string;
  achievements: string[];
  skillsUsed: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Frontend & Motion' | 'Fullstack & Systems' | 'Graphics & WebGL' | 'Leadership & UX';
  proficiency: number; // 0 - 100
  experienceYears: string;
  keyStrengths: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  rankOrPlace: string; // e.g. 'P1 / 1st Place', 'Site of the Day', 'Gold Trophy'
  issuer: string;
  year: string;
  highlight: string;
  category: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  priceStartingAt?: string;
  timeline?: string;
  description: string;
  deliverables: string[];
  popular?: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  handle: string;
  icon: string;
}

export interface ContactConfig {
  email: string;
  directPhone: string;
  location: string;
  availability: string;
  socials: SocialLink[];
  resumeUrl: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface PortfolioData {
  hero: HeroConfig;
  about: AboutConfig;
  projects: Project[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  achievements: AchievementItem[];
  services: ServiceItem[];
  contact: ContactConfig;
}
