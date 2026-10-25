export const FONTS = [
  'Inter',
  'Poppins',
  'Source Sans 3',
  'Space Grotesk',
  'Lora',
  'Merriweather',
  'Playfair Display'
]
//Accent colors
export const ACC = [
  '#2f4bff',
  '#0f8b6d',
  '#c2410c',
  '#7c3aed',
  '#be123c',
  '#101a30',
  '#c8a46e',
  '#f58a3c'
]
//Main colors
export const MC = [
  '#2563eb',
  '#10a37f',
  '#8b7cf6',
  '#c0392b',
  '#e86fb4',
  '#f08a8a',
  '#c8a46e',
  '#f58a3c'
]
//Page Sizes in pixels at 96dpi. Used for on-screen preview and PDF generation.
export const PS = {
    a4: [794, 1123], //Standard A4 size in pixels at 96dpi, (210mmm x 297mm)
    letter: [816, 1056], //Standard US Letter size in pixels at 96dpi, (8.5in x 11in)
    legal: [816, 1344] //Standard US Legal size in pixels at 96dpi, (8.5in x 14in)
}

//Template definitions. Each template has a unique ID, a name, a description, and a set of accent colors.
export const TEMPLATES = [
  {
    id: 'm',
    name: 'Modern Tech',
    desc: 'Dark header band with a bold accent rule.',
    accents: [
      ['#2f4bff', 'Blue'],
      ['#0f8b6d', 'Green'],
      ['#c2410c', 'Rust']
    ]
  },
  {
    id: 'c',
    name: 'Classic',
    desc: 'Centered header and small-caps section titles.',
    accents: [
      ['#2f4bff', 'Blue'],
      ['#be123c', 'Crimson'],
      ['#101a30', 'Ink']
    ]
  },
  {
    id: 'n',
    name: 'Minimal',
    desc: 'Quiet, airy layout with side-set headings.',
    accents: [
      ['#7c3aed', 'Violet'],
      ['#0f8b6d', 'Green'],
      ['#101a30', 'Ink']
    ]
  },
  {
    id: 's',
    name: 'Castor',
    desc: 'Beige sidebar with a timeline-style main column.',
    accents: [
      ['#c8a46e', 'Sand'],
      ['#2f4bff', 'Blue'],
      ['#be123c', 'Crimson']
    ]
  },
  {
    id: 'o',
    name: 'Solstice',
    desc: 'Editorial layout with a large serif name.',
    accents: [
      ['#f58a3c', 'Orange'],
      ['#0f8b6d', 'Green'],
      ['#7c3aed', 'Violet']
    ]
  }
]

//Different export formats supported by the application. Each format has a unique ID, a title, a hint, and an icon.
export const EXPORT_FORMATS = [
  { id: 'pdf', title: 'Export as PDF', hint: 'Recommended for printing and sharing', icon: 'file' },
  { id: 'png', title: 'Export as PNG', hint: 'Sharp image, one file per page', icon: 'img' },
  { id: 'jpg', title: 'Export as JPG', hint: 'Smaller image, great for chat or email', icon: 'img' },
  { id: 'docx', title: 'Export as DOCX', hint: 'Good for editing and formatting', icon: 'ft' },
  { id: 'html', title: 'Export as HTML', hint: 'Good for web publishing', icon: 'fc' },
  { id: 'json', title: 'Export as JSON', hint: 'Good for data exchange and integration', icon: 'fc' },
  { id: 'txt', title: 'Export as TXT', hint: 'Good for plain text and simple formatting', icon: 'file' }
]

//Specifications for light and dark themes used in the application. Each theme has a set of colors for background, panel, ink, muted text, and lines.
export const LIGHT = {
  bg: '#eef1f7',
  panel: '#fff',
  ink: '#101a30',
  mut: '#5d6783',
  line: '#d9deea'
}

export const DARK = {
  bg: '#0d1324',
  panel: '#161d33',
  ink: '#eef1fb',
  mut: '#9aa5c4',
  line: '#283250',
  dark: 1
}

//Palette definitions for different templates. Each palette has a set of colors for background, panel, ink, muted text, lines, and a header font.
export const PAL = {
  m: { bg: '#0b1226', panel: '#131c36', ink: '#e8edfb', mut: '#96a2c4', line: '#26325a', dark: 1, hf: "'Bricolage Grotesque'" },
  c: { bg: '#f1f1ee', panel: '#ffffff', ink: '#1c2333', mut: '#5d6470', line: '#d3d3cc', hf: "'Playfair Display'" },
  n: { bg: '#f6f6fb', panel: '#ffffff', ink: '#1b1b2f', mut: '#6b6b85', line: '#e3e3ee', hf: "'DM Sans'" },
  s: { bg: '#ece5db', panel: '#f8f4ee', ink: '#2b2620', mut: '#7a6f62', line: '#d9cebf', hf: "'Bricolage Grotesque'" },
  o: { bg: '#f5eedd', panel: '#fffdf6', ink: '#1a1612', mut: '#7a6e60', line: '#e6d9bf', hf: "'Playfair Display'" }
}

//Default profile data used in the application. This includes name, title, email, phone, location, link, summary, skills, languages, and interests.
export const DEFAULT_PROFILE = {
    name: 'Bruce Wayne',
  title: 'Electronics & Software Engineering Student | Embedded Systems | Web',
  email: 'bruce@email.com',
  phone: '+977 98XXXXXXXX',
  location: 'Kathmandu',
  link: 'batman.dev',
  summary: 'Second-year engineering student with hands-on experience in embedded systems, robotics and web APIs. Interested in combining electronics with computer science, AI/ML and practical automation.',
  skills: 'C, C++, Python, JavaScript, Next.js, TypeScript, Supabase, Arduino, ESP32, FastAPI, REST APIs, Git',
  langs: 'Nepali — Native, English — Professional working proficiency',
  interests: 'embedded systems, robotics, electronics, AI/ML, cybersecurity'
}

//Default sections
export const DEFAULT_SECTIONS = {
  exp: [
    {
      id: 'exp-1',
      t: 'Freelance Web Developer',
      o: 'Self-employed',
      d: '2025 – Present',
      x: 'Built landing pages and booking tools for local businesses.\nDeployed projects on Vercel with Supabase backends.'
    },
    {
      id: 'exp-2',
      t: 'Robotics Club Lead',
      o: 'University',
      d: '2024 – 2025',
      x: 'Organized robotics competitions and workshops.'
    }
  ],
  edu: [
    {
      id: 'edu-1',
      t: 'B.E. Electronics Engineering',
      o: 'Your University',
      d: '2023 – Current',
      x: 'Current: 2nd year'
    },
    {
      id: 'edu-2',
      t: '+2 Science',
      o: 'Your College',
      d: '2021 – 2023',
      x: 'GPA: 3.7 / 4.0'
    }
  ],
  proj: [
    {
      id: 'proj-1',
      t: 'Line Following Robot',
      o: '',
      d: '',
      x: 'Arduino-based robot using IR sensors and an L298N motor driver.\nTuned PID control for smoother tracking.'
    },
    {
      id: 'proj-2',
      t: 'BLE Attendance System',
      o: '',
      d: '',
      x: 'FastAPI prototype using Bluetooth Low Energy with database-backed records.'
    }
  ]
}

//Default settings for the application. This includes template ID, font family, font size, line height, accent color, zoom level, page size, fit to page option, and current page number.
export const DEFAULT_SETTINGS = {
  t: 'm', // template id: 'm', 'n', 'c', 's', 'o'
  ff: "'Inter'",
  fs: 13,
  lh: 1.5,
  ac: '#2f4bff',
  z: 1,
  size: 'a4',
  fit: false,
  page: 0
}

export const STEP_DEFINITIONS = [
  {
    id: 'personal',
    label: 'Personal',
    title: 'Let’s start with you',
    subtitle: 'Your name and how people reach you.',
    type: 'profile',
    fields: [
      ['name', 'Full name'],
      ['title', 'Headline / job title', 'full'],
      ['email', 'Email'],
      ['phone', 'Phone'],
      ['location', 'Location'],
      ['link', 'Portfolio or LinkedIn']
    ]
  },
  {
    id: 'summary',
    label: 'Summary',
    title: 'A short introduction',
    subtitle: 'Two or three sentences about what you do best.',
    type: 'profile',
    fields: [
      ['summary', 'Professional summary', 'ta']
    ]
  },
  {
    id: 'experience',
    label: 'Experience',
    title: 'Where you’ve worked',
    subtitle: 'Most recent first. Each line under “What you did” becomes a bullet.',
    type: 'entries',
    sectionKey: 'exp',
    itemSingular: 'experience',
    labels: ['Job title', 'Organization', 'Dates', 'What you did (one point per line)']
  },
  {
    id: 'education',
    label: 'Education',
    title: 'Where you studied',
    subtitle: 'Degrees, diplomas and courses.',
    type: 'entries',
    sectionKey: 'edu',
    itemSingular: 'education',
    labels: ['Degree', 'Institution', 'Dates', 'Details (one point per line)']
  },
  {
    id: 'projects',
    label: 'Projects',
    title: 'Things you’ve built',
    subtitle: 'Pick the work you’re proudest of.',
    type: 'entries',
    sectionKey: 'proj',
    itemSingular: 'project',
    labels: ['Project name', 'Link or tech used', 'Dates', 'What it does (one point per line)']
  },
  {
    id: 'skills',
    label: 'Skills',
    title: 'Skills, languages, interests',
    subtitle: 'Separate items with commas. Sidebar templates show each on its own line.',
    type: 'profile',
    fields: [
      ['skills', 'Skills / IT skills', 'full'],
      ['langs', 'Languages', 'full'],
      ['interests', 'Interests', 'full']
    ]
  }
]