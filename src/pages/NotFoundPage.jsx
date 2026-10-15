import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
export default function NotFoundPage() {
  return <main className="grid min-h-dvh place-content-center gap-3 text-center"><h1 className="text-4xl font-bold">404</h1><Link to={ROUTES.home} className="text-blue-600">Back home</Link></main>
}
