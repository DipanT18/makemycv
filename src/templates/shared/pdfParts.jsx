import { View, Text } from '@react-pdf/renderer'
import { lines } from '@/lib/text'
// wrap={false}: an entry is never split across pages; minPresenceAhead keeps headings with their first item.
export const PdfEntry = ({ e, s }) => (
  <View wrap={false} style={s.ent}>
    <View style={s.row}><Text style={s.bold}>{e.title}</Text><Text style={s.muted}>{e.dates}</Text></View>
    {e.org ? <Text style={s.org}>{e.org}</Text> : null}
    {lines(e.details).map((l, i) => <Text key={i}>{'\u2022 ' + l}</Text>)}
  </View>
)
export const PdfSection = ({ title, list, s }) => (list.length ? (
  <View style={s.sec}><Text style={s.h2} minPresenceAhead={50}>{title}</Text>{list.map((e) => <PdfEntry key={e.id} e={e} s={s} />)}</View>) : null)
export const PdfLines = ({ title, items, s }) => (items.length ? (
  <View style={s.sec}><Text style={s.h2} minPresenceAhead={40}>{title}</Text>{items.map((x) => <Text key={x} style={s.li}>{x}</Text>)}</View>) : null)
