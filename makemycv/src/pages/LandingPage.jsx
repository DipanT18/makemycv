import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6">
      <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl">Write it once. Watch it become a CV.</h1>
      <p className="mt-5 max-w-xl text-lg text-slate-600">Pick a template, fill in your details and export a clean PDF, PNG or JPG.</p>
      <Link to={ROUTES.templates} className="mt-8 w-fit rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white hover:bg-blue-700">Get started building your CV</Link>
    </main>
  )
}
