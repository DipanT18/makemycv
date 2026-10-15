import { Link } from 'react-router-dom'
import { FileText, Pencil } from 'lucide-react'
import { ROUTES } from '@/config/routes'
import { useCv } from '@/context/CvContext'
import { getTemplate } from '@/templates'
import ExportMenu from '@/features/export/ExportMenu'
export default function EditorHeader() {
  const { settings } = useCv()
  return (
    <header className="z-30 flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6">
      <Link to={ROUTES.home} className="flex items-center gap-2 text-lg font-semibold">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white"><FileText size={16} /></span>MakeCV
      </Link>
      <Link to={ROUTES.templates} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50">
        <Pencil size={14} className="text-slate-400" /><b className="font-medium">Template</b><span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-blue-700">{getTemplate(settings.template).name}</span>
      </Link>
      <ExportMenu />
    </header>
  )
}
