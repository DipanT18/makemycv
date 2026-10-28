import React from 'react'
import { useCv } from '@/context/CvContext'
import { FONTS, ACC } from '@/config/constants'

export default function Toolbar() {
  const {
    settings,
    updateSettings,
    layout,
    mobileTab,
    setMobileTab
  } = useCv()

  const handleFontChange = (e) => {
    const fontName = e.target.value
    updateSettings({ ff: `'${fontName}'` })
    if (document.fonts && document.fonts.load) {
      document.fonts.load(`13px '${fontName}'`)
    }
  }

  const handleSizeDec = () => {
    updateSettings({ fs: Math.max (10, (settings.fs || 13) - 1) })
  }

  const handleSizeInc = () => {
    updateSettings({ fs: Math.min(17, (settings.fs || 13) + 1) })
  }

  const handleLineHeightChange = (e) => {
    updateSettings({ lh: parseFloat(e.target.value) })
  }

  const handlePaperChange = (e) => {
    updateSettings({ size: e.target.value, page: 0 })
  }

  const handleAccentClick = (color) => {
    updateSettings({ ac: color })
  }

  const handleFitToggle = (e) => {
    updateSettings({ fit: e.target.checked, page: 0 })
  }

  // Strip quotes for option value
  const cleanCurrentFont = (settings.ff || 'Inter').replace(/['"]/g, '')

  return (
    <>
      <div className="tools">
        {/* Font */}
        <div className="tg">
          <label htmlFor="ff">Font</label>
          <select id="ff" value={cleanCurrentFont} onChange={handleFontChange}>
            {FONTS.map((f) => (
              <option key={f} value={f} style={{ fontFamily: `'${f}'` }}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size */}
        <div className="tg">
          <label>Size</label>
          <div className="sz">
            <button
              type="button"
              id="fsm"
              aria-label="Smaller"
              onClick={handleSizeDec}
            >
              −
            </button>
            <output id="fso">{settings.fs}pt</output>
            <button
              type="button"
              id="fsp"
              aria-label="Larger"
              onClick={handleSizeInc}
            >
              +
            </button>
          </div>
        </div>

        {/* Spacing (Line Height) */}
        <div className="tg">
          <label htmlFor="lh">Spacing</label>
          <select id="lh" value={settings.lh} onChange={handleLineHeightChange}>
            <option value="1.35">Tight</option>
            <option value="1.5">Normal</option>
            <option value="1.7">Relaxed</option>
          </select>
        </div>

        {/* Paper Size */}
        <div className="tg">
          <label htmlFor="psz">Paper</label>
          <select id="psz" value={settings.size} onChange={handlePaperChange}>
            <option value="a4">A4</option>
            <option value="letter">US Letter</option>
            <option value="legal">US Legal</option>
          </select>
        </div>

        {/* Accent Color Swatches */}
        <div className="tg">
          <label>Accent</label>
          <div className="sw" id="sw">
            {ACC.map((c) => {
              const isSelected = c.toLowerCase() === settings.ac.toLowerCase()
              return (
                <button
                  key={c}
                  type="button"
                  data-c={c}
                  className={isSelected ? 'on' : ''}
                  style={{ background: c }}
                  aria-label={`Accent ${c}`}
                  onClick={() => handleAccentClick(c)}
                />
              )
            })}
          </div>
        </div>

        {/* Fit to one page Checkbox */}
        <label className="tg ck">
          <input
            type="checkbox"
            id="fit"
            checked={!!settings.fit}
            onChange={handleFitToggle}
          />
          Fit to one page
        </label>

        {/* Dynamic Note / Warning */}
        {layout.note && (
          <span
            className={`note ${layout.warn ? 'w' : ''}`}
            id="note"
            aria-live="polite"
          >
            {layout.note}
          </span>
        )}
      </div>

      {/* Mobile Tab Toggle */}
      <div className="mtab tools">
        <div className="seg">
          <button
            type="button"
            id="tE"
            className={mobileTab === 'edit' ? 'on' : ''}
            onClick={() => setMobileTab('edit')}
          >
            Edit
          </button>
          <button
            type="button"
            id="tP"
            className={mobileTab === 'preview' ? 'on' : ''}
            onClick={() => setMobileTab('preview')}
          >
            Preview
          </button>
        </div>
      </div>
    </>
  )
}
