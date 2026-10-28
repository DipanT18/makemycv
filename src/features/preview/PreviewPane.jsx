import React, { useEffect, useRef, useLayoutEffect } from 'react'
import { useCv } from '@/context/CvContext'
import Icon from '@/components/common/Icon'
import { PS } from '@/config/constants'

export default function PreviewPane() {
  const {
    layout,
    settings,
    setZoom,
    currentPage,
    totalPages,
    prevPage,
    nextPage
  } = useCv()

  const rightPaneRef = useRef(null)
  const paperContainerRef = useRef(null)

  // Auto-fit function
  const autoFit = () => {
    if (!rightPaneRef.current) return
    const w = rightPaneRef.current.clientWidth - 52
    const paperWidth = PS[settings.size || 'a4']?.[0] || 794
    if (w > 0) {
      const fittedZoom = Math.min(1, Math.max(0.4, +(w / paperWidth).toFixed(2)))
      setZoom(fittedZoom)
    }
  }

  useLayoutEffect(() => {
    autoFit()
    const timer = setTimeout(autoFit, 100)
    window.addEventListener('resize', autoFit)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', autoFit)
    }
  }, [settings.size])

  // Apply layout html and page scroll offset
  useEffect(() => {
    if (!paperContainerRef.current) return
    const sheetEl = paperContainerRef.current.querySelector('.sheet2')
    if (sheetEl) {
      const cvEl = sheetEl.querySelector('.cv')
      if (cvEl) {
        cvEl.style.position = 'absolute'
        cvEl.style.left = '0'
        cvEl.style.top = `-${currentPage * layout.H}px`
      }
    }
  }, [layout.html, layout.H, currentPage])

  const handlePrevPage = () => {
    if (rightPaneRef.current) rightPaneRef.current.scrollTop = 0
    prevPage()
  }

  const handleNextPage = () => {
    if (rightPaneRef.current) rightPaneRef.current.scrollTop = 0
    nextPage()
  }

  return (
    <div className="rw">
      <div className="right" id="right" ref={rightPaneRef}>
        <div
          id="paper"
          ref={paperContainerRef}
          style={{ zoom: settings.z || 1 }}
        >
          <div
            className="sheet2"
            style={{ width: `${layout.W}px`, height: `${layout.H}px` }}
            dangerouslySetInnerHTML={{ __html: layout.html }}
          />
        </div>
      </div>

      {/* Floating page controls */}
      <div className="pg">
        <button
          type="button"
          id="pp"
          aria-label="Previous page"
          disabled={currentPage <= 0}
          onClick={handlePrevPage}
        >
          <Icon name="cl" size={20} />
        </button>
        <b id="pn">
          {currentPage + 1}/{totalPages}
        </b>
        <button
          type="button"
          id="pnx"
          aria-label="Next page"
          disabled={currentPage >= totalPages - 1}
          onClick={handleNextPage}
        >
          <Icon name="cr" size={20} />
        </button>
      </div>
    </div>
  )
}
