import { toCanvas } from 'html-to-image'
const make = (id, mime, label, hint) => ({
  id, label, hint, ext: id,
  async run() {
    const node = document.getElementById('cv-sheet')
    const canvas = await toCanvas(node, { pixelRatio: 2, backgroundColor: '#ffffff' })
    return new Promise((ok) => canvas.toBlob(ok, mime, 0.93))
  },
})
export const png = make('png', 'image/png', 'Export as PNG', 'Sharp image of the full sheet')
export const jpg = make('jpg', 'image/jpeg', 'Export as JPG', 'Smaller image for chat or email')
