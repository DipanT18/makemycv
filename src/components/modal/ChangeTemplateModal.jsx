import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { useCv } from '@/context/CvContext'
import { TEMPLATES, MC, PS } from '@/config/constants'
import Icon from '@/components/common/Icon'
import { renderCvHtml, applyCvStyles } from '@/lib/cvRenderer'

export default function ChangeTemplateModal() {
  const {
    isTemplateModalOpen,
    setIsTemplateModalOpen,
    settings,
    updateSettings,
    profile,
    sections
  } = useCv()

  const scrollRef = useRef(null)
  const previewContainerRef = useRef(null)
  const [modalPage, setModalPage] = useState('1/2')
  const [modalZoom, setModalZoom] = useState(0.4)

  const close = () => setIsTemplateModalOpen(false)

  // Handle ESC key
  useEffect(() => {
    if (!isTemplateModalOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isTemplateModalOpen])

  // Handle backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      close()
    }
  }

  // Calculate modal zoom based on scroll pane width
  const updateModalZoom = () => {
    if (!scrollRef.current) return
    const clientW = scrollRef.current.clientWidth - 80
    const paperW = PS[settings.size || 'a4']?.[0] || 794
    const calcZ = Math.max(0.3, Math.min(1, clientW / paperW))
    setModalZoom(calcZ)
  }

  useLayoutEffect(() => {
    if (isTemplateModalOpen) {
      updateModalZoom()
      const timer = setTimeout(updateModalZoom, 50)
      window.addEventListener('resize', updateModalZoom)
      return () => {
        clearTimeout(timer)
        window.removeEventListener('resize', updateModalZoom)
      }
    }
  }, [isTemplateModalOpen, settings.size])

  const handleScroll = () => {
    if (!scrollRef.current) return
    const isPage2 = scrollRef.current.scrollTop > 30
    setModalPage(isPage2 ? '2/2' : '1/2')
  }

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  if (!isTemplateModalOpen) return null

  const renderedPreviewHtml = renderCvHtml(settings.t, profile, sections)

  return (
    <div
      className="ov on"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mt"
      onMouseDown={handleBackdrop}
    >
      <div className="mod">
        <div className="mh">
          <h2 id="mt">Change template</h2>
          <button type="button" aria-label="Close" onClick={close}>
            <Icon name="x" size={24} />
          </button>
        </div>

        <div className="mb">
          {/* Left: Templates thumbnails list */}
          <div className="tl">
            {TEMPLATES.map((tpl) => {
              const isSelected = tpl.id === settings.t
              return (
                <button
                  key={tpl.id}
                  type="button"
                  className={`tpi ${isSelected ? 'on' : ''}`}
                  onClick={() => updateSettings({ t: tpl.id })}
                >
                  <div className="thumb" style={{ '--cac': settings.ac }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: renderCvHtml(tpl.id, profile, sections)
                      }}
                    />
                  </div>
                  <b>{tpl.name}</b>
                </button>
              )
            })}
          </div>

          {/* Right: Live preview and accent pickers */}
          <div className="rc">
            <div className="pw">
              <div className="ps" ref={scrollRef} onScroll={handleScroll}>
                <div
                  id="mp"
                  ref={(el) => {
                    previewContainerRef.current = el
                    if (el) {
                      applyCvStyles(el.firstChild, settings)
                      el.style.zoom = modalZoom
                    }
                  }}
                  dangerouslySetInnerHTML={{ __html: renderedPreviewHtml }}
                />
              </div>

              {/* Page indicator pill */}
              <div className="pg">
                <button
                  type="button"
                  aria-label="Page 1"
                  onClick={scrollToTop}
                >
                  <Icon name="cl" size={20} />
                </button>
                <b>{modalPage}</b>
                <button
                  type="button"
                  aria-label="Page 2"
                  onClick={scrollToBottom}
                >
                  <Icon name="cr" size={20} />
                </button>
              </div>
            </div>

            {/* Accent color palette */}
            <div className="cs">
              {MC.map((col) => {
                const isSelected = col.toLowerCase() === settings.ac.toLowerCase()
                return (
                  <button
                    key={col}
                    type="button"
                    className={`sq ${isSelected ? 'on' : ''}`}
                    style={{ background: col }}
                    aria-label={`Color ${col}`}
                    onClick={() => updateSettings({ ac: col })}
                  >
                    {isSelected && <Icon name="ok" size={18} />}
                  </button>
                )
              })}

              {/* Custom Color Input */}
              <label className="sq cu" title="Custom color">
                <Icon name="bk" size={20} />
                <input
                  type="color"
                  value={settings.ac.length === 7 ? settings.ac : '#2563eb'}
                  aria-label="Custom color"
                  onChange={(e) => updateSettings({ ac: e.target.value })}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
