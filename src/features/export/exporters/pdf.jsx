import { pdf } from '@react-pdf/renderer'
// Uses the template's own <Pdf/> renderer, so the PDF is laid out independently of the screen preview.
export default {
  id: 'pdf', label: 'Export as PDF', hint: 'Best for printing and sharing', ext: 'pdf',
  run: ({ cv, settings, template }) => pdf(<template.Pdf cv={cv} settings={settings} />).toBlob(),
}
