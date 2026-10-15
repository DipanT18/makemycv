// Add a step here and it appears in the form automatically.
const E = ['Job title', 'Organization', 'Dates', 'What you did (one point per line)']
export const STEPS = [
  { id: 'personal', title: 'Personal', kind: 'profile', fields: [['name', 'Full name'], ['title', 'Headline'], ['email', 'Email'], ['phone', 'Phone'], ['location', 'Location'], ['link', 'Portfolio / LinkedIn'], ['summary', 'Summary', 'textarea']] },
  { id: 'experience', title: 'Experience', kind: 'entries', section: 'experience', labels: E },
  { id: 'education', title: 'Education', kind: 'entries', section: 'education', labels: ['Degree', 'Institution', 'Dates', 'Details (one point per line)'] },
  { id: 'projects', title: 'Projects', kind: 'entries', section: 'projects', labels: ['Project', 'Tech / link', 'Dates', 'What it does (one point per line)'] },
  { id: 'skills', title: 'Skills', kind: 'fields', fields: [['skills', 'Skills (comma separated)'], ['languages', 'Languages'], ['interests', 'Interests']] },
]
