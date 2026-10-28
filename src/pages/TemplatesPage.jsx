import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCv } from '@/context/CvContext'
import { ThemeDropdown } from '@/context/ThemeContext'
import { TEMPLATES } from '@/config/constants'
import { renderCvHtml } from '@/lib/cvRenderer'

export default function TemplatesPage() {
  const navigate = useNavigate()
  const { profile, sections, updateSettings } = useCv()

  useEffect(() => {
    document.body.classList.remove('ed')
    window.scrollTo(0, 0)
  }, [])

  const handleSelectTemplate = (templateId, accentColor) => {
    updateSettings({ t: templateId, ac: accentColor })
    navigate('/editor')
  }

  return (
    <div id="v2" className="view on">
      {/* Top Navigation */}
      <nav className="top">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="MakeMyCV logo" className="logo-img" />
          MakeMyCV
        </Link>
        <div>
          <span className="thslot">
            <ThemeDropdown />
          </span>
          <button
            type="button"
            className="btn g"
            onClick={() => navigate('/')}
          >
            Back
          </button>
        </div>
      </nav>

      {/* Templates Content */}
      <div className="wrap">
        <h1>Pick a starting point</h1>
        <p>You can switch layout and colors later from the editor.</p>

        <div id="rows">
          {TEMPLATES.map((tpl) => (
            <div key={tpl.id} className="row">
              <header>
                <h2>{tpl.name}</h2>
                <span>{tpl.desc}</span>
              </header>
              <div className="cards">
                {tpl.accents.map(([accentCode, accentName]) => {
                  const previewHtml = renderCvHtml(tpl.id, profile, sections)
                  return (
                    <button
                      key={accentCode}
                      type="button"
                      className="card"
                      onClick={() => handleSelectTemplate(tpl.id, accentCode)}
                    >
                      <div
                        className="thumb"
                        style={{ '--cac': accentCode }}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: previewHtml }}
                        />
                      </div>
                      <b>
                        {tpl.name} {accentName}
                      </b>
                      <small>Use this template</small>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
