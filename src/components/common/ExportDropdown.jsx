import React, { useState, useRef, useEffect } from 'react'
import { useCv } from '@/context/CvContext'
import { EXPORT_FORMATS } from '@/config/constants'
import Icon from '@/components/common/Icon'
import { executeExport } from '@/lib/exportUtils'

export default function ExportDropdown() {
  const { profile, sections, settings, showToast } = useCv()
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  const handleExport = async (format) => {
    if (busy) return
    setBusy(true)
    setOpen(false)
    try {
      await executeExport(format, { profile, sections, settings, showToast })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="ddw" ref={menuRef}>
      <div className="xb">
        <button
          type="button"
          disabled={busy}
          onClick={() => handleExport('pdf')}
        >
          <Icon name="dl" size={15} />
          <span className="sm">{busy ? 'Exporting…' : 'Export CV'}</span>
        </button>
        <button
          type="button"
          disabled={busy}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="More export formats"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Icon name="dn" size={15} />
        </button>
      </div>

      {open && (
        <div
          className="menu open"
          role="menu"
          style={{ width: '224px', right: 0 }}
        >
          {EXPORT_FORMATS.map((fmt) => (
            <button
              key={fmt.id}
              type="button"
              role="menuitem"
              onClick={() => handleExport(fmt.id)}
            >
              <Icon name={fmt.icon} size={16} />
              <span style={{ flex: 1 }}>
                <b style={{ fontWeight: 500 }}>{fmt.title}</b>
                <small>{fmt.hint}</small>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
