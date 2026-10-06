import { useState } from 'react'
import { ZoomIn, ZoomOut } from 'lucide-react'
import { useCv } from '@/context/CvContext'
import { getTemplate } from '@/templates'
import { PAPER } from '@/config/paper'
import PaperSheet from './PaperSheet'
export default function PreviewPane() {
  const { cv, settings } = useCv()
  const [zoom, setZoom] = useState(0.85)
  const [w, h] = PAPER[settings.paper].px
  return (
    <div className="relative min-h-0 overflow-auto bg-slate-100 p-6">
      <div className="sticky top-0 z-10 mb-3 flex w-fit items-center gap-1 rounded-lg border border-slate-200 bg-white p-0.5 text-xs">
        <button onClick={() => setZoom((z) => Math.max(0.4, z - 0.1))}><ZoomOut size={15} /></button><span className="w-10 text-center font-mono">{Math.round(zoom * 100)}%</span><button onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}><ZoomIn size={15} /></button>
      </div>
      <div style={{ width: w * zoom, margin: '0 auto' }}>
        <div className="relative shadow-xl" style={{ width: w, transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
          <PaperSheet id="cv-sheet" cv={cv} settings={settings} template={getTemplate(settings.template)} />
          {/* page-break guides: a line every paper height (overlay, not part of the exported sheet) */}
          <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent ${h - 1}px, #f87171 ${h - 1}px, #f87171 ${h}px)` }} />
        </div>
      </div>
    </div>
  )
}
