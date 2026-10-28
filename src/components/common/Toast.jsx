import React from 'react'
import { useCv } from '@/context/CvContext'

export default function Toast() {
  const { toast } = useCv()

  return (
    <div
      className={`toast ${toast.show ? 'on' : ''} ${toast.error ? 'err' : ''}`}
      role="status"
      aria-live="polite"
    >
      {toast.message}
    </div>
  )
}