import { useState } from 'react'
import { useCv } from '@/context/CvContext'
import { STEPS } from './steps'
import Field from './Field'

// Layout: step tabs (top) / scrolling fields / Back-Next (pinned bottom) so the preview never scrolls away.
export default function FormPanel() {
  const { cv, dispatch } = useCv()
  const [i, setI] = useState(0)
  const step = STEPS[i]
  return (
    <div className="flex min-h-0 flex-col border-r border-slate-200 bg-white">
      <nav className="flex gap-1 overflow-x-auto px-5 pt-4">
        {STEPS.map((s, n) => <button key={s.id} onClick={() => setI(n)} className={`flex-1 whitespace-nowrap border-b-4 px-2 py-2 text-xs ${n === i ? 'border-slate-900 font-bold' : n < i ? 'border-blue-600 text-slate-500' : 'border-slate-200 text-slate-500'}`}>{s.title}</button>)}
      </nav>
      <div className="flex-1 space-y-3 overflow-y-auto p-6">
        <h2 className="text-2xl font-bold">{step.title}</h2>
        {step.kind === 'profile' && step.fields.map(([k, l, t]) => <Field key={k} label={l} textarea={t === 'textarea'} value={cv.profile[k]} onChange={(value) => dispatch({ type: 'profile', field: k, value })} />)}
        {step.kind === 'fields' && step.fields.map(([k, l]) => <Field key={k} label={l} value={cv[k]} onChange={(value) => dispatch({ type: 'field', key: k, value })} />)}
        {step.kind === 'entries' && (<>
          {cv[step.section].map((e, n) => (
            <div key={e.id} className="space-y-2 rounded-xl border border-slate-200 p-4">
              <div className="flex justify-between text-sm font-semibold"><span>{step.title} {n + 1}</span>
                {cv[step.section].length > 1 && <button className="text-xs text-red-600" onClick={() => dispatch({ type: 'removeEntry', section: step.section, id: e.id })}>Remove</button>}</div>
              {['title', 'org', 'dates', 'details'].map((f, k) => <Field key={f} label={step.labels[k]} textarea={f === 'details'} value={e[f]} onChange={(value) => dispatch({ type: 'entry', section: step.section, id: e.id, field: f, value })} />)}
            </div>))}
          <button onClick={() => dispatch({ type: 'addEntry', section: step.section })} className="w-full rounded-lg border border-dashed border-slate-300 py-2 text-sm text-slate-500 hover:bg-slate-50">+ Add another</button>
        </>)}
      </div>
      <div className="flex items-center justify-between border-t border-slate-200 px-6 py-3">
        <button disabled={i === 0} onClick={() => setI(i - 1)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold disabled:invisible">Back</button>
        <span className="text-xs text-slate-500">Step {i + 1} of {STEPS.length}</span>
        <button disabled={i === STEPS.length - 1} onClick={() => setI(i + 1)} className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white disabled:opacity-40">Next</button>
      </div>
    </div>
  )
}
