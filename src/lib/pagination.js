//This file is the visual layout and dynamic pagination engine for our resume builder
import { PS } from '@/config/constants'
import { renderCvHtml, applyCvStyles } from './cvRenderer'

const SEL = 'section>h2, section>p, section>div>.e, section>div>p, section>div>.tags, .cn p'

//This function measures that how much space text take up on a physical screen or papersheet
//Handles fitting everything on one page, or splitting into multiple pages with proper page breaks
export function computeLayout(t, profile, sections, settings) {
    if (typeof document === 'undefined') {
        const [W, H] = PS[setttings.size || 'a4'] || PS.a4
        return { html: '', W, H, pages: 1, note: '', warn: false}
    }

    const [W, H] = PS[settings.size || 'a4'] || PS.a4
    const BOT = 40
    const TOP = 44

    const m = document.createElement('div')
    m.style.cssText = `position:fixed;left:-99999px;top:0;width:${W}px;pointer-events:none;z-index:-9999`
    document.body.appendChild(m)

    m.innerHTML = renderCvHtml(t, profile, sections)
    const c = m.firstChild
    let pages = 1
    let note = ''
    let warn = false

    applyCvStyles(c, settings)
    c.style.minHeight = '0'

    if(settings.fit) {
    if (c.offsetHeight > H) {
      let lo = 5
      let hi = settings.fs
      for (let i = 0; i < 9; i++) {
        const mid = (lo + hi) / 2
        applyCvStyles(c, { ...settings, fs: mid })
        c.style.minHeight = '0'
        if (c.offsetHeight <= H) {
          lo = mid
        } else {
          hi = mid
        }
      }
      applyCvStyles(c, { ...settings, fs: lo })
      note = `Scaled to ${lo.toFixed(1)}pt to fit one page`
    }
    c.style.minHeight = H + 'px'
} else {
    const top0 = c.getBoundingClientRect().top
    const B = [...c.querySelectorAll(SEL)].map((el) => {
      const r = el.getBoundingClientRect()
      let b = r.bottom - top0
      if (el.tagName === 'H2') {
        const f = el.parentElement.querySelector(':scope>div>*,:scope>p')
        if (f) {
          b = Math.max(b, f.getBoundingClientRect().bottom - top0)
        }
      }
      return { el, t: r.top - top0, b }
    })

    const ys = [0]
    let y = 0
    let k = 0
    let trim = false
    let lastL = 0

    while (true) {
      const cap = k ? H - TOP - BOT : H - BOT
      let L = y + cap
      let ch = true
      while (ch) {
        ch = false
        for (const x of B) {
          if (x.t < L && x.b > L && x.t > y + 1) {
            L = x.t
            ch = true
          }
        }
      }
      const nx = B.filter((x) => x.t >= L - 0.5)
      lastL = L
      if (!nx.length) break
      if (k >= 3) {
        trim = true
        break
      }
      y = Math.min(...nx.map((x) => x.t))
      ys.push(y)
      k++
    }

    pages = ys.length
    for (const x of B) {
      let q = 0
      ys.forEach((v, i) => {
        if (v <= x.t + 0.5) q = i
      })
      if (trim && q === pages - 1 && x.t >= lastL - 0.5) {
        x.el.style.visibility = 'hidden'
        continue
      }
      if (q > 0) {
        x.el.style.transform = `translateY(${q * H + TOP - ys[q]}px)`
      }
    }
    c.style.minHeight = pages * H + 'px'
    if (trim) {
      note = 'Content is over 4 pages – the rest is hidden'
      warn = true
    }
}

const html = m.innerHTML
m.remove()
return { html, W, H, pages, note, warn }
}