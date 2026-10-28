import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { LIGHT, DARK, PAL, TEMPLATES } from '@/config/constants'
import Icon from '@/components/common/Icon'

const ThemeContext = createContext(null)

const lumOn = (h) => {
  if (!h || typeof h !== 'string' || !h.startsWith('#')) return '#fff'
  const hex = h.length === 4 ? `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}` : h
  const n = parseInt(hex.slice(1), 16)
  if (isNaN(n)) return '#fff'
  return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) > 150
    ? '#101a30'
    : '#fff'
}

export function ThemeProvider({ children, currentTemplate = 'm', currentAccent = '#2f4bff' }) {
  const [theme, setThemeState] = useState(() => {
    try {
      const v = localStorage.getItem('mkcv-theme')
      if (['light', 'dark', 'tpl'].includes(v)) return v
    } catch (_) {}
    return 'light'  
  })

  const setTheme = (t) => {
    setThemeState(t)
    try {
      localStorage.setItem('mkcv-theme', t)
    } catch (_) {}
  }

  useEffect(() => {
    const pal = theme === 'dark' ? DARK : theme === 'tpl' ? (PAL[currentTemplate] || PAL.m) : LIGHT
    let ac, on
    if (theme === 'tpl') {
      ac = pal.dark ? `color-mix(in srgb, ${currentAccent} 62%, #fff)` : currentAccent
      on = pal.dark ? pal.bg : lumOn(currentAccent)
    } else if (theme === 'dark') {
      ac = '#8aa0ff'
      on = DARK.bg
    } else {
      ac = '#2f4bff'
      on = '#fff'
    }

    const st = document.documentElement.style
    const vars = {
      bg: pal.bg,
      panel: pal.panel,
      ink: pal.ink,
      mut: pal.mut,
      line: pal.line,
      ac,
      onac: on,
      hi: theme === 'light' ? '#f5e663' : `color-mix(in srgb, ${ac} 32%, ${pal.bg})`,
      act: `color-mix(in srgb, ${ac} 45%, ${pal.ink})`,
      hf: theme === 'tpl' ? pal.hf : "'Bricolage Grotesque'"
    }

    Object.entries(vars).forEach(([k, v]) => {
      st.setProperty('--' + k, v)
    })
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : pal.dark ? 'dark' : 'light')
    st.colorScheme = pal.dark ? 'dark' : 'light'
  }, [theme, currentTemplate, currentAccent])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTemplate, currentAccent }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

export function ThemeDropdown() {
  const { theme, setTheme, currentTemplate } = useTheme()
  const [open, setOpen] = useState(false)
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

  const currentTplName = TEMPLATES.find((x) => x.id === currentTemplate)?.name || 'Modern Tech'
  const items = [
    { key: 'light', name: 'Light', desc: 'Clean and bright', icon: 'sun' },
    { key: 'dark', name: 'Dark', desc: 'Easy on the eyes', icon: 'moon' },
    { key: 'tpl', name: 'Template theme', desc: 'Matches ' + currentTplName, icon: 'pal' }
  ]

  const activeIcon = theme === 'dark' ? 'moon' : theme === 'light' ? 'sun' : 'pal'
  const activeLabel = theme === 'tpl' ? 'Template' : theme === 'dark' ? 'Dark' : 'Light'

  return (
    <div className="ddw thm" ref={menuRef}>
      <button
        type="button"
        className="ddt"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Web theme"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="thi">
          <Icon name={activeIcon} size={15} />
        </span>
        <span className="sm thl">{activeLabel}</span>
      </button>

      {open && (
        <div className="menu open" role="menu" style={{ width: '236px', right: 0 }}>
          {items.map((it) => (
            <button
              key={it.key}
              type="button"
              role="menuitemradio"
              aria-checked={theme === it.key}
              onClick={() => {
                setTheme(it.key)
                setOpen(false)
              }}
            >
              <Icon name={it.icon} size={16} />
              <span style={{ flex: 1 }}>
                <b style={{ fontWeight: 500 }}>{it.name}</b>
                <small>{it.desc}</small>
              </span>
              {theme === it.key && <Icon name="ok" size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
