import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Download } from 'lucide-react'
import { useCv } from '@/context/CvContext'
import { getTemplate } from '@/templates'
import { exporters } from './exporters'
import { download } from '@/lib/download'
import { slug } from '@/lib/text'

export default function ExportMenu() {
  const { cv, settings } = useCv()
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const ref = useRef(null)
  useEffect(() => {
    const off = (e) => { if (!ref.current?.contains(e.target) || e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', off); document.addEventListener('keydown', off)
    return () => { document.removeEventListener('mousedown', off); document.removeEventListener('keydown', off) }
  }, [])

  async function run(x) {
    setOpen(false); setBusy(true); setError('')
    try { download(await x.run({ cv, settings, template: getTemplate(settings.template) }), `${slug(cv.profile.name)}.${x.ext}`) }
    catch (e) { console.error(e); setError('Export failed') }
    finally { setBusy(false) }
  }
  return (
    <div ref={ref} className="relative inline-flex">
      <div className="inline-flex rounded-lg shadow-sm">
        <button disabled={busy} onClick={() => run(exporters[0])} className="flex items-center gap-1.5 rounded-l-lg bg-blue-600 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60">
          <Download size={15} />{busy ? 'Exporting…' : 'Export CV'}
        </button>
        <button disabled={busy} onClick={() => setOpen(!open)} aria-haspopup="menu" aria-expanded={open} className="rounded-r-lg border-l border-white/20 bg-blue-600 px-2 text-white hover:bg-blue-700"><ChevronDown size={15} /></button>
      </div>
      {error && <span className="absolute right-0 top-full mt-1 text-xs text-red-600">{error}</span>}
      {open && (
        <div role="menu" className="absolute right-0 top-full z-40 mt-1.5 w-60 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
          {exporters.map((x) => (
            <button key={x.id} role="menuitem" onClick={() => run(x)} className="block w-full px-3 py-2.5 text-left hover:bg-slate-50">
              <span className="block text-sm font-medium">{x.label}</span><span className="block text-xs text-slate-400">{x.hint}</span>
            </button>))}
        </div>)}
    </div>
  )
}
