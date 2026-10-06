// css = preview font, pdf = built-in PDF font. Use Font.register from @react-pdf/renderer to add real custom PDF fonts.
export const FONTS = [
  { id: 'inter', label: 'Inter', css: "'Inter',sans-serif", pdf: 'Helvetica' },
  { id: 'poppins', label: 'Poppins', css: "'Poppins',sans-serif", pdf: 'Helvetica' },
  { id: 'lora', label: 'Lora', css: "'Lora',serif", pdf: 'Times-Roman' },
  { id: 'merriweather', label: 'Merriweather', css: "'Merriweather',serif", pdf: 'Times-Roman' },
  { id: 'playfair', label: 'Playfair Display', css: "'Playfair Display',serif", pdf: 'Times-Roman' },
]
const find = (id) => FONTS.find((f) => f.id === id) ?? FONTS[0]
export const fontCss = (id) => find(id).css
export const pdfFont = (id) => find(id).pdf
