import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes'

export default function NotFoundPage() {
  return (
    <main style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>404</h1>
      <p style={{ color: 'var(--mut)' }}>The page you are looking for does not exist.</p>
      <Link to={ROUTES.home} className="btn p">Back to home</Link>
    </main>
  )
}
