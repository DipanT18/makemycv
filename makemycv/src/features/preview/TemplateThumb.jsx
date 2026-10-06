import { PAPER } from '@/config/paper'
import PaperSheet from './PaperSheet'
export default function TemplateThumb({ cv, settings, template, scale = 0.3 }) {
  const [w, h] = PAPER[settings.paper].px
  return (
    <div className="overflow-hidden rounded border border-slate-200 bg-white" style={{ width: w * scale, height: h * scale }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: w }}><PaperSheet cv={cv} settings={settings} template={template} /></div>
    </div>
  )
}
