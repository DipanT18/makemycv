import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import { pdfFont } from '@/config/fonts'
import { PAPER } from '@/config/paper'
import { contact, tags } from '@/lib/text'
import { PdfSection, PdfLines } from '../shared/pdfParts'
export default function Pdf({ cv, settings: st }) {
  const p = cv.profile
  const s = StyleSheet.create({
    page: { fontFamily: pdfFont(st.font), fontSize: st.fontSize * 0.75, lineHeight: st.lineHeight, color: '#1c2333', paddingVertical: 34, paddingLeft: '33%', paddingRight: 30 },
    bar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%', backgroundColor: '#efe9e1' },
    side: { position: 'absolute', left: 0, top: 0, width: '30%', padding: '34 16', fontSize: 8.5 },
    name: { fontSize: 22, fontWeight: 700 }, sub: { fontSize: 12, color: st.accent, marginVertical: 4 },
    sec: { marginBottom: 12 }, h2: { fontSize: 12.5, marginBottom: 5 }, ent: { marginBottom: 7 }, row: { flexDirection: 'row', justifyContent: 'space-between' },
    bold: { fontWeight: 700 }, muted: { color: '#6b7488', fontSize: 8.5 }, org: { color: st.accent }, li: { marginBottom: 2 },
  })
  return (
    <Document title={p.name + ' CV'}>
      <Page size={PAPER[st.paper].pdf} style={s.page} wrap>
        <View fixed style={s.bar} />
        {/* sidebar content sits on page 1; the beige bar repeats on every page */}
        <View style={s.side}>
          {contact(p).map((c) => <Text key={c}>{c}</Text>)}
          <View style={{ height: 12 }} />
          <PdfLines title="Languages" items={tags(cv.languages)} s={s} /><PdfLines title="Interests" items={tags(cv.interests)} s={s} /><PdfLines title="IT skills" items={tags(cv.skills)} s={s} />
        </View>
        <Text style={s.name}>{p.name}</Text><Text style={s.sub}>{p.title}</Text><Text style={{ marginBottom: 12 }}>{p.summary}</Text>
        <PdfSection title="Work experience" list={cv.experience} s={s} /><PdfSection title="Education" list={cv.education} s={s} /><PdfSection title="Projects" list={cv.projects} s={s} />
      </Page>
    </Document>
  )
}
