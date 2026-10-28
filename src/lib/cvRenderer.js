import { PS } from '@/config/constants'

export const chips = (s) =>
  String(s || '')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)

export const esc = (s) =>
  String(s ?? '').replace(/[&<>"]/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  }[c]))

export const lines = (x, b) =>
  String(x || '')
    .split('\n')
    .filter(Boolean)
    .map((l) => `<p${b ? ' class="bl"' : ''}>${esc(l)}</p>`)
    .join('')

export const ents = (a = [], b) =>
  a
    .filter((x) => x.t || x.o)
    .map(
      (x) =>
        `<div class="e"><div class="r"><b>${esc(x.t)}</b><i>${esc(x.d)}</i></div>${
          x.o ? `<div class="o">${esc(x.o)}</div>` : ''
        }${lines(x.x, b)}</div>`
    )
    .join('')

export function renderCvHtml(t, d, l) {
  const bl = t === 's' || t === 'o'
  const cs = [d.email, d.phone, d.location, d.link].filter(Boolean).map(esc)

  const sec = (h, x) => (x ? `<section><h2>${h}</h2><div>${x}</div></section>` : '')
  const lst = (h, v) =>
    chips(v).length
      ? `<section><h2>${h}</h2>${chips(v)
          .map((x) => `<p>${esc(x)}</p>`)
          .join('')}</section>`
      : ''

  const expList = l?.exp || []
  const eduList = l?.edu || []
  const projList = l?.proj || []

  const work = sec(bl ? 'Work experience' : 'Experience', ents(expList, bl))
  const edu = sec('Education', ents(eduList, bl))
  const pr = sec('Projects', ents(projList, bl))
  const nm = esc(d.name) || 'Your Name'

  if (t === 's') {
    return `<div class="cv s"><aside><div class="cn">${cs
      .map((x) => `<p>${x}</p>`)
      .join('')}</div>${lst('Languages', d.langs)}${lst(
      'Interests',
      d.interests
    )}${lst('Skills', d.skills)}</aside><main><h1>${nm}</h1><p class="ti">${esc(
      d.title
    )}</p><p class="sm">${esc(d.summary)}</p>${work}${edu}${pr}</main></div>`
  }

  if (t === 'o') {
    return `<div class="cv o"><i class="arc"></i><p class="sm">${esc(
      d.summary
    )}</p><header><h1>${nm}</h1><p class="ti">${esc(
      d.title
    )}</p><div class="ct">${cs
      .map((x) => `<span>${x}</span>`)
      .join('')}</div></header><div class="cols"><aside>${lst(
      'Languages',
      d.langs
    )}${lst('Interests', d.interests)}${lst(
      'Skills',
      d.skills
    )}</aside><main>${work}${edu}${pr}</main></div></div>`
  }

  const body =
    sec('Summary', d.summary ? `<p>${esc(d.summary)}</p>` : '') +
    work +
    edu +
    pr +
    sec(
      'Skills',
      `<div class="tags">${chips(d.skills)
        .map((x) => `<span>${esc(x)}</span>`)
        .join('')}</div>`
    ) +
    sec('Languages', `<p>${chips(d.langs).map(esc).join(', ')}</p>`) +
    sec('Interests', `<p>${chips(d.interests).map(esc).join(', ')}</p>`)

  return `<div class="cv ${t}"><header><h1>${nm}</h1><p>${esc(
    d.title
  )}</p><div class="ct">${cs.join('   |   ')}</div></header><main>${body}</main></div>`
}

export function applyCvStyles(el, s) {
  if (!el) return
  const z = PS[s.size || 'a4'] || PS.a4
  el.style.setProperty('--pw', z[0] + 'px')
  el.style.setProperty('--ph', z[1] + 'px')
  const fontFam = s.ff.startsWith("'") ? s.ff : `'${s.ff}'`
  el.style.setProperty('--ff', fontFam + ',sans-serif')
  el.style.setProperty('--fs', String(s.fs))
  el.style.setProperty('--lh', String(s.lh))
  el.style.setProperty('--cac', s.ac)
}

export function getCvStyleVars(s) {
  const z = PS[s?.size || 'a4'] || PS.a4
  const fontFam = s?.ff ? (s.ff.startsWith("'") ? s.ff : `'${s.ff}'`) : "'Inter'"
  return {
    '--pw': z[0] + 'px',
    '--ph': z[1] + 'px',
    '--ff': fontFam + ', sans-serif',
    '--fs': s?.fs ?? 13,
    '--lh': s?.lh ?? 1.5,
    '--cac': s?.ac || '#2f4bff'
  }
}
