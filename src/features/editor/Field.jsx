export default function Field({ label, value, onChange, textarea }) {
  const cls = 'w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white'
  return (
    <label className="block"><span className="mb-1 block text-xs font-semibold text-slate-700">{label}</span>
      {textarea ? <textarea rows={4} className={cls} value={value} onChange={(e) => onChange(e.target.value)} /> : <input className={cls} value={value} onChange={(e) => onChange(e.target.value)} />}
    </label>
  )
}
