import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import LandingPage from '@/pages/LandingPage'
import TemplatesPage from '@/pages/TemplatesPage'
import EditorPage from '@/pages/EditorPage'
import NotFoundPage from '@/pages/NotFoundPage'
export default createBrowserRouter([
  { path: ROUTES.home, element: <LandingPage /> },
  { path: ROUTES.templates, element: <TemplatesPage /> },
  { path: ROUTES.editor, element: <EditorPage /> },
  { path: '*', element: <NotFoundPage /> },
])
