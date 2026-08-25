import { PortfolioData } from '../types';

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  hero: {
    name: 'LEO VANCE',
    tagline: 'HIGH-VELOCITY CREATIVE TECHNOLOGIST & INTERACTION ARCHITECT',
    rotatingRoles: [
      'INTERACTION ARCHITECT',
      'HIGH-VELOCITY ENGINEER',
      'MOTORSPORT TECH DESIGNER',
      'WEBGL & 3D CRAFTSMAN'
    ],
    racingNumber: '04',
    statusBadge: 'AVAILABLE FOR Q3 / Q4 COMMISSIONS',
    location: 'SILICON VALLEY // LONDON // MONACO',
    shortBio: 'Engineering high-octane digital experiences at the intersection of motorsport speed, bespoke typography, and millimeter-precise interaction design.',
    heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    heroSecondaryImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1000&auto=format&fit=crop',
    marqueeItems: [
      'FAST BY DEFAULT',
      'ZERO COMPROMISE',
      'PIXEL PRECISION',
      'FORMULA INTERACTION',
      'POLE POSITION CODE',
      'KINETIC MOTION',
      'DESIGN ARCHITECTURE',
      'TELEMETRY DRIVEN'
    ],
    telemetryStats: [
      {
        label: 'GLOBAL DEPLOYMENTS',
        value: '140+',
        unit: 'PROJECTS',
        description: 'Delivered for Tier-1 technology brands & racing teams'
      },
      {
        label: 'AVERAGE FPS',
        value: '120',
        unit: 'FPS',
        description: 'Optimized silky smooth rendering benchmarks'
      },
      {
        label: 'PODIUM HONORS',
        value: '18',
        unit: 'AWARDS',
        description: 'AOTD, FWA of the Day, Apple Design Nominations'
      },
      {
        label: 'INTERACTION LATENCY',
        value: '0.04',
        unit: 'MS',
        description: 'Instantaneous optical & tactile response time'
      }
    ]
  },
  about: {
    headline: 'DRIVEN BY PURE VELOCITY, CRAFT, AND OBSESSIVE ATTENTION TO DETAIL.',
    bioParagraphs: [
      'Like a precision race car on the apex of a corner, digital products should be relentless, aerodynamic, and utterly uncompromising. I build digital interfaces that don’t just look extraordinary—they feel visceral, responsive, and exhilarating.',
      'Over the past 8+ years, I’ve collaborated with world-class racing outfits, high-growth AI companies, and avant-garde luxury houses to craft interactive systems that set new industry benchmarks.',
      'From custom WebGL renderers to mission-critical real-time telemetry dashboards, my work bridges raw engineering muscle with haute-couture visual style.'
    ],
    signatureQuote: 'SPEED IS NOT MERELY A METRIC. SPEED IS A DESIGN LANGUAGE.',
    quoteAuthor: 'LEO VANCE // NO. 04',
    portraitImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    actionImage: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1000&auto=format&fit=crop',
    philosophies: [
      {
        title: 'Tactile Responsiveness',
        desc: 'Every click, scroll, and drag is tuned with spring physics and subtle micro-haptics to create physical weight in digital space.',
        iconName: 'Zap'
      },
      {
        title: 'Millimeter Typographic Discipline',
        desc: 'Editorial layouts calibrated with mathematical ratios, bespoke glyph alignments, and purposeful negative space.',
        iconName: 'Layout'
      },
      {
        title: 'Zero-Lag Architecture',
        desc: 'Sub-second paint cycles, hardware-accelerated transforms, and aggressive tree-shaking for frictionless user flow.',
        iconName: 'Gauge'
      },
      {
        title: 'Emotional Velocity',
        desc: 'Moving past utilitarian wireframes into immersive, adrenaline-charged brand worlds that leave a permanent mark.',
        iconName: 'Flame'
      }
    ]
  },
  projects: [
    {
      id: 'proj-01',
      title: 'APEX TELEMETRY PRO',
      subtitle: 'Real-time F1 race-grade telemetry and tactical visualization cockpit',
      category: 'Motorsport & Velocity',
      client: 'Veloce Grand Prix & McLaren Partner Studio',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop'
      ],
      demoUrl: 'https://apex-telemetry.example.com',
      githubUrl: 'https://github.com/leovance/apex-telemetry',
      tags: ['WebGL', 'WebSockets', 'React 19', 'Tailwind', 'Real-Time Telemetry'],
      featured: true,
      metrics: [
        { label: 'Data Throughput', value: '45,000 pts/s' },
        { label: 'Latency', value: '<12ms' },
        { label: 'Live Concurrent Pit Crews', value: '1,200+' }
      ],
      description: 'A revolutionary live telemetry visualization tool developed for race engineers and VIP simulator paddocks, decoding 120+ sensor channels at 60fps with zero frame drops.',
      challenge: 'Handling dense arrays of tire thermals, differential slip, and delta lap times without causing DOM bottlenecks or UI freezing during high-stress qualifying rounds.',
      solution: 'Constructed an offscreen canvas WebGL rendering engine fed via binary WebSocket streams, paired with a customized dark/light high-contrast HUD design system.',
      outcomes: [
        'Reduced strategy decision latency by 34%',
        'Awarded Site of the Day on Awwwards and FWA of the Day',
        'Adopted by 3 European esports championships'
      ]
    },
    {
      id: 'proj-02',
      title: 'KINETIC SOUND LAB',
      subtitle: 'Generative audio synthesizer and spatial frequency visualizer',
      category: 'Interactive Web',
      client: 'EchoSonic Zurich',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop'
      ],
      demoUrl: 'https://kinetic-audio.example.com',
      tags: ['Web Audio API', 'Three.js', 'Shader Graph', 'TypeScript'],
      featured: true,
      metrics: [
        { label: 'Spatial Channels', value: '7.1 Binaural' },
        { label: 'Soundscapes Created', value: '250,000+' }
      ],
      description: 'An interactive browser audio workbench allowing producers to shape sound fields with cursor gestures, physics gravity nodes, and generative harmonic algorithms.',
      challenge: 'Ensuring glitch-free audio synthesis during intense shader computations and fluid particle simulations.',
      solution: 'Utilized dedicated Web Audio AudioWorklet threads for synthesis and WebGPU compute shaders for visual waveform dispersion.',
      outcomes: [
        'Over 350,000 unique audio sessions created in the first month',
        'Featured on Fast Company Innovation by Design'
      ]
    },
    {
      id: 'proj-03',
      title: 'MONACO PADDOCK VIP CLUB',
      subtitle: 'Exclusive 3D digital hospitality hub for Grand Prix weekend',
      category: 'Creative Tech',
      client: 'Monaco Heritage Grand Prix',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop'
      ],
      demoUrl: 'https://monaco-vip.example.com',
      tags: ['WebGL', 'Luxury Editorial', '3D Walkthrough', 'Animation'],
      featured: true,
      metrics: [
        { label: 'VIP Pass Conversions', value: '98.4%' },
        { label: 'Avg Dwell Time', value: '6m 40s' }
      ],
      description: 'An ultra-luxe editorial web experience featuring interactive 3D yacht harbor panoramas, private chef reservations, and live circuit helicopter tracking.',
      challenge: 'Merging classical high-fashion editorial typography with complex 3D asset streaming on mobile devices.',
      solution: 'Engineered progressive LOD mesh compression and custom CSS typography shaders that react to device gyroscope motion.',
      outcomes: [
        'Sold out VIP paddock suites in record 48 hours',
        'Winner: Webby Award for Best Visual Design (Automotive & Lifestyle)'
      ]
    },
    {
      id: 'proj-04',
      title: 'SYNAPSE HYPER-DESIGN SYSTEM',
      subtitle: 'Enterprise design tokens, zero-runtime motion engine & icon forge',
      category: 'Digital Product',
      client: 'Synapse Core Inc.',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'
      ],
      demoUrl: 'https://synapse-system.example.com',
      tags: ['Design Systems', 'TypeScript', 'Tokens Studio', 'Accessible UI'],
      featured: false,
      metrics: [
        { label: 'Engineers Using', value: '4,500+' },
        { label: 'Sprint Velocity', value: '+42%' }
      ],
      description: 'A unified cross-platform design token architecture powering 20+ web, mobile, and embedded cockpit interfaces with unified brand physics.',
      challenge: 'Maintaining absolute visual coherence across React, Flutter, and embedded Qt automotive instrument clusters.',
      solution: 'Automated token compilation pipeline generating typed theme definitions and motion spring constants across all target runtimes.',
      outcomes: [
        'Adopted company-wide across 18 teams',
        'Cut front-end design QA turnaround time by 60%'
      ]
    },
    {
      id: 'proj-05',
      title: 'NEO-DRIFT SIMULATOR ENGINE',
      subtitle: 'Physics-based browser karting and time-trial leaderboard',
      category: 'Motorsport & Velocity',
      client: 'Apex E-Sports Global',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop'
      ],
      demoUrl: 'https://neodrift.example.com',
      tags: ['Cannon.js', 'Three.js', 'Physics', 'Gamepad API'],
      featured: false,
      metrics: [
        { label: 'Laps Completed', value: '1.4M+' },
        { label: 'Frame Consistency', value: '60 FPS on Mobile' }
      ],
      description: 'A high-octane casual browser racing game featuring accurate tire friction physics, slipstream aero simulation, and global real-time leaderboards.',
      challenge: 'Simulating complex tire slip curves in JavaScript while keeping garbage collection under 2ms per frame.',
      solution: 'Utilized memory-pooled typed arrays and deterministic physics sub-stepping with WebAssembly acceleration.',
      outcomes: [
        '1.4 million laps driven within 2 weeks of launch',
        'Top 10 on Product Hunt with 2,400+ upvotes'
      ]
    },
    {
      id: 'proj-06',
      title: 'VECTOR PULSE: AI CREATIVE COPILOT',
      subtitle: 'Context-aware canvas tool for rapid 3D art direction',
      category: 'AI & WebGL',
      client: 'Pulse AI Labs',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'
      ],
      demoUrl: 'https://vectorpulse.ai',
      tags: ['Gemini AI', 'Canvas API', 'WebGL', 'Fast Diffusion'],
      featured: true,
      metrics: [
        { label: 'Render Latency', value: '180ms' },
        { label: 'Active Creators', value: '85,000+' }
      ],
      description: 'An AI-augmented creative whiteboard that converts sketch gestures and lighting controls into photorealistic 3D camera projections in real time.',
      challenge: 'Providing instantaneous visual feedback while streaming multimodal AI responses.',
      solution: 'Created an optimistic client-side rasterizer that progressively blends diffusion latent frames over interactive 3D bounding geometry.',
      outcomes: [
        'Raised $4.2M seed round following viral prototype release',
        'Featured by Google AI Studio showcase'
      ]
    }
  ],
  experience: [
    {
      id: 'exp-01',
      role: 'Principal Creative Technologist & Interaction Director',
      company: 'Apex Kinetic Studio',
      period: '2023 — PRESENT',
      location: 'London / Remote',
      type: 'Studio Lead',
      description: 'Leading the technical design and creative engineering of award-winning digital experiences, interactive brand campaigns, and real-time visualization tools.',
      achievements: [
        'Spearheaded 14 global web launches garnering over 18 international industry awards',
        'Architected proprietary motion physics and WebGL starter kit reducing delivery cycles by 35%',
        'Mentored an international crew of 8 creative developers and UI designers'
      ],
      skillsUsed: ['Creative Direction', 'WebGL / Three.js', 'React Architecture', 'Motion Systems']
    },
    {
      id: 'exp-02',
      role: 'Senior UI/UX & Telemetry Engineer',
      company: 'Veloce Motorsport Systems',
      period: '2021 — 2023',
      location: 'Silverstone / Monaco',
      type: 'Full-Time',
      description: 'Designed and built race strategy cockpits, driver analysis portals, and spectator interactive companion apps for European GT and formula championships.',
      achievements: [
        'Engineered 60fps telemetry graph visualizer capable of plotting 50k datapoints per second',
        'Standardized component token library across pit wall and hospitality touchscreens'
      ],
      skillsUsed: ['WebSockets', 'Data Visualization', 'High-Frequency UI', 'TypeScript']
    },
    {
      id: 'exp-03',
      role: 'Lead Interaction Developer',
      company: 'HyperCraft Digital',
      period: '2019 — 2021',
      location: 'San Francisco, CA',
      type: 'Full-Time',
      description: 'Crafted bespoke digital products, interactive annual reports, and luxury 3D product configurators for Silicon Valley pioneers.',
      achievements: [
        'Delivered flagship launches for Apple, Nike Digital, and Stripe Ecosystem partners',
        'Published open-source spring animation micro-library with 4,000+ GitHub stars'
      ],
      skillsUsed: ['Custom Shaders', 'GSAP / Framer Motion', 'Performance Profiling', 'CSS Architecture']
    }
  ],
  skills: [
    {
      id: 'skill-01',
      name: 'Creative Motion & Physics Animation',
      category: 'Frontend & Motion',
      proficiency: 98,
      experienceYears: '8+ Years',
      keyStrengths: ['Spring Physics', 'Scroll-driven Choreography', 'Page Transitions', 'Micro-interactions']
    },
    {
      id: 'skill-02',
      name: 'Modern React & TypeScript Architecture',
      category: 'Frontend & Motion',
      proficiency: 96,
      experienceYears: '7+ Years',
      keyStrengths: ['React 19 Hooks', 'State Engines', 'Strict Types', 'Component Systems']
    },
    {
      id: 'skill-03',
      name: 'WebGL, Three.js & Shader Craft',
      category: 'Graphics & WebGL',
      proficiency: 92,
      experienceYears: '5+ Years',
      keyStrengths: ['GLSL Shaders', 'Post-processing Pipeline', 'Mesh Optimization', 'Particles']
    },
    {
      id: 'skill-04',
      name: 'Real-Time Telemetry & High-Perf Systems',
      category: 'Fullstack & Systems',
      proficiency: 94,
      experienceYears: '6+ Years',
      keyStrengths: ['Binary WebSockets', 'Canvas Offscreen Rendering', 'Memory Pooling', 'Low Latency']
    },
    {
      id: 'skill-05',
      name: 'Editorial Typography & Design Systems',
      category: 'Leadership & UX',
      proficiency: 97,
      experienceYears: '8+ Years',
      keyStrengths: ['Design Tokens', 'Bespoke Typographic Scales', 'WCAG AA Accessibility', 'Figma to Code']
    },
    {
      id: 'skill-06',
      name: 'Fullstack Node, Express & Cloud APIs',
      category: 'Fullstack & Systems',
      proficiency: 90,
      experienceYears: '6+ Years',
      keyStrengths: ['REST & GraphQL', 'JWT Auth Systems', 'Secure Storage', 'Cloud Run / Edge']
    }
  ],
  achievements: [
    {
      id: 'ach-01',
      title: 'Site of the Year Nominee',
      rankOrPlace: 'P1 / TOP 3',
      issuer: 'Awwwards Global',
      year: '2025',
      highlight: 'Recognized for groundbreaking interactive kinetic typography and 120fps motion design in Apex Telemetry Pro.',
      category: 'International Design Award'
    },
    {
      id: 'ach-02',
      title: 'FWA of the Day x 4',
      rankOrPlace: 'PODIUM WINNER',
      issuer: 'Favorite Website Awards (FWA)',
      year: '2024 — 2025',
      highlight: 'Honored four times for experimental browser capabilities and WebGL audio synthesis engineering.',
      category: 'Interactive Excellence'
    },
    {
      id: 'ach-03',
      title: 'Webby Award Winner',
      rankOrPlace: 'BEST VISUAL DESIGN',
      issuer: 'The Webby Awards NY',
      year: '2024',
      highlight: 'Selected by the International Academy of Digital Arts and Sciences for Monaco Paddock VIP Club.',
      category: 'Industry Gold Standard'
    },
    {
      id: 'ach-04',
      title: 'Red Dot Best of the Best',
      rankOrPlace: 'GRAND PRIX TROPHY',
      issuer: 'Red Dot Design Awards Berlin',
      year: '2023',
      highlight: 'Awarded for cutting-edge automotive telemetry UI ergonomics and readability under high vibration.',
      category: 'Interface Ergonomics'
    }
  ],
  services: [
    {
      id: 'srv-01',
      title: 'Flagship Interactive Web Experiences',
      priceStartingAt: '$12,000',
      timeline: '3 — 6 Weeks',
      description: 'End-to-end concept, 3D art direction, editorial typography, and butter-smooth motion engineering for brands wanting to make an unforgettable statement.',
      deliverables: [
        'Complete bespoke React + Motion application',
        'Custom WebGL / Shader visualizers',
        'Dynamic scroll animations & sound design',
        '100/100 Lighthouse Performance rating'
      ],
      popular: true
    },
    {
      id: 'srv-02',
      title: 'High-Frequency Dashboards & Telemetry',
      priceStartingAt: '$15,000',
      timeline: '4 — 8 Weeks',
      description: 'Mission-critical real-time interfaces, trading cockpits, and motorsport data visualizers tuned for instant comprehension and sub-millisecond responsiveness.',
      deliverables: [
        'Ultra-low-latency data rendering pipelines',
        'WebSocket / streaming data integrations',
        'Hardware-accelerated charts & canvas layers',
        'Dark/Light high-contrast tactical HUD'
      ],
      popular: false
    },
    {
      id: 'srv-03',
      title: 'Design Systems & Motion Tooling',
      priceStartingAt: '$8,500',
      timeline: '2 — 4 Weeks',
      description: 'Production-ready component libraries, motion token standards, and typography guidelines that empower development teams to ship with speed and elegance.',
      deliverables: [
        'Custom Tailwind / CSS token architecture',
        'Spring physics & animation primitives',
        'Storybook documentation & live testbed',
        'Figma to code automated sync'
      ],
      popular: false
    }
  ],
  contact: {
    email: 'contact@leovance.design',
    directPhone: '+44 20 7946 0912',
    location: 'London / Silicon Valley / Monaco',
    availability: 'ACCEPTING SELECT COMMISSIONS FOR Q3/Q4 2026',
    resumeUrl: '#',
    socials: [
      {
        id: 'soc-01',
        platform: 'X / Twitter',
        url: 'https://twitter.com/leovance_dev',
        handle: '@leovance_dev',
        icon: 'Twitter'
      },
      {
        id: 'soc-02',
        platform: 'GitHub',
        url: 'https://github.com/leovance',
        handle: 'github.com/leovance',
        icon: 'Github'
      },
      {
        id: 'soc-03',
        platform: 'Instagram',
        url: 'https://instagram.com/leovance.craft',
        handle: '@leovance.craft',
        icon: 'Instagram'
      },
      {
        id: 'soc-04',
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/leovance',
        handle: 'in/leovance',
        icon: 'Linkedin'
      },
      {
        id: 'soc-05',
        platform: 'YouTube',
        url: 'https://youtube.com/@leovancedesign',
        handle: '@leovancedesign',
        icon: 'Youtube'
      }
    ]
  }
};
