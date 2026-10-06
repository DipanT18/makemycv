// Every folder in /templates with an index.js is registered automatically.
const mods = import.meta.glob('./*/index.js', { eager: true })
export const templates = Object.values(mods).map((m) => m.default).sort((a, b) => a.order - b.order)
export const getTemplate = (id) => templates.find((t) => t.id === id) ?? templates[0]
