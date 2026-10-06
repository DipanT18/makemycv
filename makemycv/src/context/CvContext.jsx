import { createContext, useContext, useEffect, useReducer } from 'react'
import { defaultCv, defaultSettings } from '@/data/defaultCv'

const KEY = 'makecv:v1'
const fresh = () => ({ cv: defaultCv, settings: defaultSettings })
const init = () => { try { return { ...fresh(), ...JSON.parse(localStorage.getItem(KEY)) } } catch { return fresh() } }
const upd = (s, k, fn) => ({ ...s, cv: { ...s.cv, [k]: fn(s.cv[k]) } })

function reducer(s, a) {
  switch (a.type) {
    case 'profile': return upd(s, 'profile', (p) => ({ ...p, [a.field]: a.value }))
    case 'field': return upd(s, a.key, () => a.value) // skills / languages / interests
    case 'entry': return upd(s, a.section, (l) => l.map((e) => (e.id === a.id ? { ...e, [a.field]: a.value } : e)))
    case 'addEntry': return upd(s, a.section, (l) => [...l, { id: crypto.randomUUID(), title: '', org: '', dates: '', details: '' }])
    case 'removeEntry': return upd(s, a.section, (l) => l.filter((e) => e.id !== a.id))
    case 'settings': return { ...s, settings: { ...s.settings, ...a.patch } }
    case 'reset': return fresh()
    default: return s
  }
}

const Ctx = createContext(null)
export function CvProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, init)
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(state)), [state])
  return <Ctx.Provider value={{ ...state, dispatch }}>{children}</Ctx.Provider>
}
export const useCv = () => useContext(Ctx)
