export const lines = (s = '') => s.split('\n').map((l) => l.trim()).filter(Boolean)
export const tags = (s = '') => s.split(',').map((x) => x.trim()).filter(Boolean)
export const contact = (p) => [p.email, p.phone, p.location, p.link].filter(Boolean)
export const slug = (s = '') => (s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'cv') + '-cv'
