const e = (id, title, org, dates, details) => ({ id, title, org, dates, details })
export const defaultCv = {
  profile: { name: 'Your Name', title: 'Full-Stack Developer', email: 'you@email.com', phone: '+977 98XXXXXXXX', location: 'Kathmandu', link: 'yoursite.dev',
    summary: 'Developer building production-style web apps with Next.js, TypeScript and Supabase.' },
  experience: [e('x1', 'Freelance Web Developer', 'Self-employed', '2025 – Present', 'Built landing pages and booking tools.\nDeployed on Vercel with Supabase.')],
  education: [e('d1', 'B.Sc. Computer Science', 'Your University', '2023 – 2027', 'Current: 2nd year')],
  projects: [e('p1', 'Taskflow', '', '', 'Task management app with auth and realtime updates.')],
  skills: 'Next.js, TypeScript, Supabase, Vercel, Tailwind, Git',
  languages: 'English, Nepali',
  interests: 'web, electronics, robotics',
}
export const defaultSettings = { template: 'modern', accent: '#2f4bff', font: 'inter', fontSize: 13, lineHeight: 1.5, paper: 'a4' }
