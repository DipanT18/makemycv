import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import { pdfFont } from '@/config/fonts'
import { PAPER } from '@/config/paper'
import { contact, tags } from '@/lib/text'
import { PdfSection, PdfLines } from '../shared/pdfParts'
export default function Pdf({ cv, settings: st }) {
  const p = cv.profile
  const s = StyleSheet.create({
    page: { fontFamily: pdfFont(st.font), fontSize: st.fontSize * 0.75, lineHeight: st.lineHeight, paddingVertical: 36, color: '#1c2333' },
    head: { backgroundColor: '#101a30', color: '#fff', padding: '28 36', marginTop: -36, marginBottom: 20 },
    name: { fontSize: 24, fontWeight: 700 }, sub: { fontSize: 12, color: '#fff', opacity: 0.85, marginTop: 3 }, small: { fontSize: 8.5, opacity: 0.7, marginTop: 6 },
    body: { paddingHorizontal: 36 }, sec: { marginBottom: 12 },
    h2: { fontSize: 11, fontWeight: 700, color: st.accent, borderLeftWidth: 3, borderLeftColor: st.accent, paddingLeft: 6, marginBottom: 5 },
    ent: { marginBottom: 7 }, row: { flexDirection: 'row', justifyContent: 'space-between' }, bold: { fontWeight: 700 }, muted: { color: '#6b7488', fontSize: 8.5 }, org: { color: '#4a5368' }, li: {},
  })
  return (
    <Document title={p.name + ' CV'}>
      <Page size={PAPER[st.paper].pdf} style={s.page} wrap>
        <View style={s.head}><Text style={s.name}>{p.name}</Text><Text style={s.sub}>{p.title}</Text><Text style={s.small}>{contact(p).join('   |   ')}</Text></View>
        <View style={s.body}>
          <View style={s.sec}><Text style={s.h2}>Summary</Text><Text>{p.summary}</Text></View>
          <PdfSection title="Experience" list={cv.experience} s={s} /><PdfSection title="Education" list={cv.education} s={s} /><PdfSection title="Projects" list={cv.projects} s={s} />
          <PdfLines title="Skills" items={[tags(cv.skills).join(' · ')]} s={s} /><PdfLines title="Languages" items={[tags(cv.languages).join(', ')]} s={s} />
        </View>
      </Page>
    </Document>
  )
}
