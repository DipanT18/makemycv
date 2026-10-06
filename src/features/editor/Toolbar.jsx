import { useCv } from '@/context/CvContext'
import { FONTS } from '@/config/fonts'
import { PAPER } from '@/config/paper'
import { getTemplate } from '@/templates'
const sel = 'rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-sm'
export default function Toolbar() {
  const { settings: s, dispatch } = useCv()
  const set = (patch) => dispatch({ type: 'settings', patch })
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-slate-200 bg-white px-5 py-2 text-sm">
      <label>Font <select className={sel} value={s.font} onChange={(e) => set({ font: e.target.value })}>{FONTS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}</select></label>
      <label>Size <input type="number" min="10" max="17" className={sel + ' w-16'} value={s.fontSize} onChange={(e) => set({ fontSize: +e.target.value })} /></label>
      <label>Spacing <select className={sel} value={s.lineHeight} onChange={(e) => set({ lineHeight: +e.target.value })}><option value="1.35">Tight</option><option value="1.5">Normal</option><option value="1.7">Relaxed</option></select></label>
      <label>Paper <select className={sel} value={s.paper} onChange={(e) => set({ paper: e.target.value })}>{Object.entries(PAPER).map(([k, p]) => <option key={k} value={k}>{p.label}</option>)}</select></label>
      <div className="flex items-center gap-1.5">Accent {[...getTemplate(s.template).accents, '#101a30', '#7c3aed'].map((c) => <button key={c} aria-label={c} onClick={() => set({ accent: c })} style={{ background: c }} className={`h-5 w-5 rounded-full ring-offset-1 ${s.accent === c ? 'ring-2 ring-slate-900' : ''}`} />)}<input type="color" value={s.accent} onChange={(e) => set({ accent: e.target.value })} className="h-6 w-7" /></div>
    </div>
  )
}
