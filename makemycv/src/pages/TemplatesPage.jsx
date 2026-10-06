import { useNavigate } from 'react-router-dom'
import { templates } from '@/templates'
import { useCv } from '@/context/CvContext'
import { ROUTES } from '@/config/routes'
import TemplateThumb from '@/features/preview/TemplateThumb'
export default function TemplatesPage() {
  const { cv, settings, dispatch } = useCv()
  const nav = useNavigate()
  const pick = (t, accent) => { dispatch({ type: 'settings', patch: { template: t.id, accent } }); nav(ROUTES.editor) }
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-4xl font-extrabold">Pick a starting point</h1>
      {templates.map((t) => (
        <section key={t.id} className="mt-8 border-t border-slate-200 pt-6">
          <h2 className="mb-4 text-xl font-bold">{t.name}</h2>
          <div className="flex flex-wrap gap-6">
            {t.accents.map((a) => (
              <button key={a} onClick={() => pick(t, a)} className="text-left transition hover:-translate-y-1">
                <TemplateThumb cv={cv} template={t} settings={{ ...settings, template: t.id, accent: a }} /><span className="mt-2 block text-sm font-medium">Use this</span>
              </button>))}
          </div>
        </section>))}
    </main>
  )
}
