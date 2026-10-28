import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCv } from '@/context/CvContext'
import { ThemeDropdown } from '@/context/ThemeContext'
import { renderCvHtml, applyCvStyles } from '@/lib/cvRenderer'

export default function LandingPage() {
  const navigate = useNavigate()
  const { profile, sections } = useCv()
  const heroSheetRef = useRef(null)
  const featRef = useRef(null)

  useEffect(() => {
    document.body.classList.remove('ed')
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (heroSheetRef.current) {
      const cvNode = heroSheetRef.current.firstChild
      if (cvNode) {
        applyCvStyles(cvNode, {
          size: 'a4',
          ff: "'Poppins'",
          fs: 13,
          lh: 1.5,
          ac: '#2f4bff'
        })
      }
    }
  }, [profile, sections])

  const scrollToHowItWorks = () => {
    featRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const heroCvHtml = renderCvHtml('m', profile, sections)

  return (
    <div id="v1" className="view on">
      {/* Top Navigation Bar */}
      <nav className="top">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="MakeCV logo" />
          MakeMyCV
        </Link>
        <div>
          <Link to="/templates">Templates</Link>
          <a onClick={scrollToHowItWorks}>How it works</a>
          <span className="thslot">
            <ThemeDropdown />
          </span>
          <button
            type="button"
            className="btn g"
            onClick={() => navigate('/templates')}
          >
            Sign in
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div>
          <h1>Write it once. Watch it become a CV.</h1>
          <p>
            Fill in your details, pick a layout, tweak fonts and colors, and see
            every change on the page as you type. Export to PDF or Word when it looks
            right.
          </p>
          <div className="acts">
            <button
              type="button"
              className="btn p"
              onClick={() => navigate('/templates')}
            >
              Get started building your CV
            </button>
            <button
              type="button"
              className="btn g"
              onClick={() => navigate('/templates')}
            >
              Browse templates
            </button>
          </div>
        </div>

        {/* Hero Interactive Stage */}
        <div className="stage">
          <div
            className="sheet"
            id="heroCv"
            ref={heroSheetRef}
            dangerouslySetInnerHTML={{ __html: heroCvHtml }}
          />
          <span className="chip b">Font: Poppins · 13pt</span>
          <span className="chip a">PDF + Word export</span>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="feat" ref={featRef}>
        <div>
          <h3>Live preview</h3>
          <span>
            The right half of the screen always shows your CV, updated on every keystroke.
          </span>
        </div>
        <div>
          <h3>Five layouts</h3>
          <span>
            Modern, Classic, Minimal, Castor and Solstice, each in several accent colors,
            switchable at any time without retyping.
          </span>
        </div>
        <div>
          <h3>Your type, your rules</h3>
          <span>
            Choose a typeface, size, line spacing and accent color from the toolbar above
            the preview.
          </span>
        </div>
      </section>
    </div>
  )
}
