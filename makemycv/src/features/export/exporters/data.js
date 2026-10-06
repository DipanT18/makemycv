import { lines, tags, contact } from '@/lib/text'
export const json = { id: 'json', label: 'Export as JSON', hint: 'Raw data for integrations', ext: 'json',
  run: async ({ cv }) => new Blob([JSON.stringify(cv, null, 2)], { type: 'application/json' }) }
const block = (h, l) => l.length ? `\n${h.toUpperCase()}\n` + l.map((e) => `${e.title}${e.org ? ' – ' + e.org : ''}${e.dates ? ' (' + e.dates + ')' : ''}\n` + lines(e.details).map((x) => '  - ' + x).join('\n')).join('\n\n') + '\n' : ''
export const txt = { id: 'txt', label: 'Export as TXT', hint: 'Plain text', ext: 'txt',
  run: async ({ cv: c }) => new Blob([`${c.profile.name}\n${c.profile.title}\n${contact(c.profile).join(' | ')}\n\n${c.profile.summary}\n` + block('Experience', c.experience) + block('Education', c.education) + block('Projects', c.projects) + `\nSKILLS\n${tags(c.skills).join(', ')}\n`], { type: 'text/plain' }) }
