import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import { pdfFont } from '@/config/fonts'
import { PAPER } from '@/config/paper'
import { contact, tags } from '@/lib/text'
import { PdfSection, PdfLines } from '../shared/pdfParts'
export default function Pdf({ cv, settings: st }) {
  const p = cv.profile
  const s = StyleSheet.create({
    page: { fontFamily: pdfFont(st.font), fontSize: st.fontSize * 0.75, lineHeight: st.lineHeight, padding: 40, color: '#1c2333' },
    head: { alignItems: 'center', borderBottomWidth: 1.5, borderBottomColor: '#1c2333', paddingBottom: 8, marginBottom: 12 },
    name: { fontSize: 24, fontWeight: 700 }, sub: { color: st.accent, marginTop: 2 }, small: { fontSize: 8.5, color: '#4a5368', marginTop: 4 },
    sec: { marginBottom: 11 }, h2: { fontSize: 11.5, fontWeight: 700, borderBottomWidth: 0.7, borderBottomColor: '#c8cedc', marginBottom: 5 },
    ent: { marginBottom: 7 }, row: { flexDirection: 'row', justifyContent: 'space-between' }, bold: { fontWeight: 700 }, muted: { color: '#6b7488', fontSize: 8.5 }, org: { color: '#4a5368' }, li: {},
  })
  return (
    <Document title={p.name + ' CV'}>
      <Page size={PAPER[st.paper].pdf} style={s.page} wrap>
        <View style={s.head}><Text style={s.name}>{p.name}</Text><Text style={s.sub}>{p.title}</Text><Text style={s.small}>{contact(p).join('  |  ')}</Text></View>
        <View style={s.sec}><Text style={s.h2}>Summary</Text><Text>{p.summary}</Text></View>
        <PdfSection title="Experience" list={cv.experience} s={s} /><PdfSection title="Education" list={cv.education} s={s} /><PdfSection title="Projects" list={cv.projects} s={s} />
        <PdfLines title="Skills" items={[tags(cv.skills).join(', ')]} s={s} /><PdfLines title="Languages" items={[tags(cv.languages).join(', ')]} s={s} />
      </Page>
    </Document>
  )
}
