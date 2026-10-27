import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import { computeLayout } from './pagination';
import { renderCvHtml, applyCvStyles, chips } from './cvRenderer';

//Converts the finalized layout stream into a physical file layout, prompting the browser to download the file directly to the user's computer.
export function saveBlob(filename, blob) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 4000)
}

export function canvasToBlob(canvas, type = 'image/png', quality = 1) {
    return new Promise((resolve) => {
        canvas.toBlob(resolve, type, quality)
    })
}

export async function renderCvPagesCanvas(t, profile, sections, settings) {
    const layout = computeLayout(t, profile, sections, settings)
    const SC = 2

    const host = document.createElement('div')
    host.style.position = 'position:fixed;left:-99999px;top:0;z-index:-9999;pointer-events:none'
    host.innerHTML = layout.html
    document.body.appendChild(host)

  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready
    }

    const cvNode = host.firstChild
    const full = await html2canvas(cvNode, {
      scale: SC,
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
      scrollX: 0,
      scrollY: 0
    })

    const pages = []
    for (let i = 0; i < layout.pages; i++) {
      const c = document.createElement('canvas')
      c.width = layout.W * SC
      c.height = layout.H * SC
      const ctx = c.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, c.width, c.height)
      ctx.drawImage(
        full,
        0,
        i * layout.H * SC,
        layout.W * SC,
        layout.H * SC,
        0,
        0,
        layout.W * SC,
        layout.H * SC
      )
      pages.push(c)
    }
    return { pages, W: layout.W, H: layout.H, pageCount: layout.pages }
    } finally {
        host.remove()
    }
}

export function generatePlainText(profile, sections) {
  const ct = [profile.email, profile.phone, profile.location, profile.link].filter(Boolean).join(' | ')

  const block = (heading, list = []) => {
    const valid = list.filter((x) => x.t || x.o)
    if (!valid.length) return ''
    const body = valid
      .map((item) => {
        const header = `${item.t}${item.o ? ` – ${item.o}` : ''}${item.d ? ` (${item.d})` : ''}`
        const bullets = String(item.x || '')
          .split('\n')
          .filter(Boolean)
          .map((line) => `  - ${line}`)
          .join('\n')
        return bullets ? `${header}\n${bullets}` : header
      })
      .join('\n\n')
    return `\n${heading.toUpperCase()}\n${body}\n`
  }

  return `${profile.name || 'Your Name'}
${profile.title || ''}
${ct}

SUMMARY
${profile.summary || ''}
${block('Experience', sections.exp)}${block('Education', sections.edu)}${block('Projects', sections.proj)}
SKILLS
${chips(profile.skills).join(', ')}

LANGUAGES
${chips(profile.langs).join(', ')}

INTERESTS
${chips(profile.interests).join(', ')}
`
}

export function generateHtmlDocument(t, profile, sections, settings) {
  const cssRules = [...document.styleSheets]
    .flatMap((sh) => {
      try {
        return [...sh.cssRules]
      } catch (_) {
        return []
      }
    })
    .filter((r) => r.selectorText && /\.cv\b/.test(r.selectorText))
    .map((r) => r.cssText)
    .join('\n')

  const container = document.createElement('div')
  container.innerHTML = renderCvHtml(t, profile, sections)
  applyCvStyles(container.firstChild, settings)

  const fontLink = document.querySelector('link[href*="fonts.googleapis"]')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${profile.name || 'CV'} – CV</title>
  ${fontLink ? `<link rel="stylesheet" href="${fontLink.href}">` : ''}
  <style>
    body {
      margin: 0;
      background: #e9ecf3;
      display: flex;
      justify-content: center;
      padding: 24px;
    }
    ${cssRules}
  </style>
</head>
<body>
  ${container.innerHTML}
</body>
</html>`
}

export function generateDocxBlob(profile, sections) {
  const escXml = (s) =>
    String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

  const contact = [profile.email, profile.phone, profile.location, profile.link]
    .filter(Boolean)
    .join('  |  ')

  const renderSection = (title, items = []) => {
    const valid = items.filter((x) => x.t || x.o)
    if (!valid.length) return ''
    const entries = valid
      .map(
        (e) => `
      <div style="margin-bottom: 12px;">
        <table style="width:100%; border:none;">
          <tr>
            <td style="text-align:left; font-weight:bold;">${escXml(e.t)}</td>
            <td style="text-align:right; font-style:italic; color:#555;">${escXml(e.d)}</td>
          </tr>
        </table>
        ${e.o ? `<div style="color:#4a5368; font-weight:600; font-size:10pt;">${escXml(e.o)}</div>` : ''}
        ${String(e.x || '')
          .split('\n')
          .filter(Boolean)
          .map((b) => `<div style="margin-left:14px; font-size:9.5pt;">• ${escXml(b)}</div>`)
          .join('')}
      </div>`
      )
      .join('')

    return `
      <h3 style="border-bottom:1.5px solid #2f4bff; padding-bottom:3px; color:#1c2333; margin-top:16px; margin-bottom:8px; font-size:12pt; text-transform:uppercase;">${title}</h3>
      ${entries}
    `
  }

  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>${escXml(profile.name)} CV</title>
      <style>
        body { font-family: 'Calibri', 'Segoe UI', sans-serif; font-size: 10.5pt; line-height: 1.35; color: #1c2333; margin: 40px; }
        h1 { font-size: 20pt; margin: 0; color: #101a30; font-weight: bold; }
        .sub { font-size: 11pt; color: #2f4bff; font-weight: bold; margin-top: 3px; }
        .contact { font-size: 9.5pt; color: #5d6783; margin-top: 6px; margin-bottom: 14px; }
        p { margin: 4px 0; }
      </style>
    </head>
    <body>
      <h1>${escXml(profile.name || 'Your Name')}</h1>
      <div class="sub">${escXml(profile.title || '')}</div>
      <div class="contact">${escXml(contact)}</div>

      ${
        profile.summary
          ? `<h3 style="border-bottom:1.5px solid #2f4bff; padding-bottom:3px; color:#1c2333; margin-top:16px; margin-bottom:8px; font-size:12pt; text-transform:uppercase;">Professional Summary</h3>
             <p style="font-size:10pt;">${escXml(profile.summary)}</p>`
          : ''
      }

      ${renderSection('Work Experience', sections.exp)}
      ${renderSection('Education', sections.edu)}
      ${renderSection('Projects', sections.proj)}

      ${
        chips(profile.skills).length
          ? `<h3 style="border-bottom:1.5px solid #2f4bff; padding-bottom:3px; color:#1c2333; margin-top:16px; margin-bottom:8px; font-size:12pt; text-transform:uppercase;">Skills</h3>
             <p style="font-size:10pt;">${escXml(chips(profile.skills).join('  •  '))}</p>`
          : ''
      }
      ${
        chips(profile.langs).length
          ? `<h3 style="border-bottom:1.5px solid #2f4bff; padding-bottom:3px; color:#1c2333; margin-top:16px; margin-bottom:8px; font-size:12pt; text-transform:uppercase;">Languages</h3>
             <p style="font-size:10pt;">${escXml(chips(profile.langs).join(', '))}</p>`
          : ''
      }
      ${
        chips(profile.interests).length
          ? `<h3 style="border-bottom:1.5px solid #2f4bff; padding-bottom:3px; color:#1c2333; margin-top:16px; margin-bottom:8px; font-size:12pt; text-transform:uppercase;">Interests</h3>
             <p style="font-size:10pt;">${escXml(chips(profile.interests).join(', '))}</p>`
          : ''
      }
    </body>
    </html>
  `

  return new Blob(['\ufeff', htmlContent], {
    type: 'application/msword'
  })
}

export async function executeExport(format, { profile, sections, settings, showToast }) {
  const base =
    ((profile.name || 'cv')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'cv') + '-cv'

  try {
    if (format === 'json') {
      const data = {
        profile,
        experience: sections.exp,
        education: sections.edu,
        projects: sections.proj,
        skills: chips(profile.skills),
        languages: chips(profile.langs),
        interests: chips(profile.interests)
      }
      saveBlob(`${base}.json`, new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
      showToast('Export ready: JSON')
      return
    }

    if (format === 'txt') {
      const text = generatePlainText(profile, sections)
      saveBlob(`${base}.txt`, new Blob([text], { type: 'text/plain;charset=utf-8' }))
      showToast('Export ready: Plain Text')
      return
    }

    if (format === 'html') {
      const html = generateHtmlDocument(settings.t, profile, sections, settings)
      saveBlob(`${base}.html`, new Blob([html], { type: 'text/html;charset=utf-8' }))
      showToast('Export ready: Standalone HTML')
      return
    }

    if (format === 'docx') {
      const blob = generateDocxBlob(profile, sections)
      saveBlob(`${base}.doc`, blob)
      showToast('Export ready: Word Document')
      return
    }

    if (format === 'pdf') {
      showToast('Preparing your PDF…')
      const { pages, W, H } = await renderCvPagesCanvas(settings.t, profile, sections, settings)
      const pagePtSize = {
        a4: [595.28, 841.89],
        letter: [612, 792],
        legal: [612, 1008]
      }[settings.size || 'a4'] || [595.28, 841.89]

      const doc = new jsPDF({
        unit: 'pt',
        format: pagePtSize,
        orientation: 'portrait',
        compress: true
      })

      pages.forEach((canvas, idx) => {
        if (idx > 0) doc.addPage(pagePtSize, 'p')
        doc.addImage(
          canvas.toDataURL('image/jpeg', 0.95),
          'JPEG',
          0,
          0,
          pagePtSize[0],
          pagePtSize[1],
          undefined,
          'FAST'
        )
      })

      saveBlob(`${base}.pdf`, doc.output('blob'))
      showToast('Export ready: PDF')
      return
    }

    if (format === 'png' || format === 'jpg') {
      const isPng = format === 'png'
      const mime = isPng ? 'image/png' : 'image/jpeg'
      const ext = isPng ? 'png' : 'jpg'
      showToast(`Preparing your ${ext.toUpperCase()}…`)

      const { pages } = await renderCvPagesCanvas(settings.t, profile, sections, settings)
      if (pages.length === 1) {
        const blob = await canvasToBlob(pages[0], mime, 0.95)
        saveBlob(`${base}.${ext}`, blob)
      } else {
        const zip = new JSZip()
        for (let i = 0; i < pages.length; i++) {
          const blob = await canvasToBlob(pages[i], mime, 0.95)
          zip.file(`${base}-page-${i + 1}.${ext}`, blob)
        }
        const zipBlob = await zip.generateAsync({ type: 'blob' })
        saveBlob(`${base}-${ext}.zip`, zipBlob)
      }
      showToast(`Export ready: ${ext.toUpperCase()}`)
      return
    }

    showToast(`Unknown export format: ${format}`, true)
  } catch (err) {
    console.error('Export error:', err)
    showToast(`Export failed: ${err.message || 'unknown error'}`, true)
  }
}
