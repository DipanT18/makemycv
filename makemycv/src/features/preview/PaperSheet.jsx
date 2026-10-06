import { PAPER } from '@/config/paper'
import { fontCss } from '@/config/fonts'
// The sheet grows with content (never squeezed). Pass id="cv-sheet" for the live preview so image export can find it.
export default function PaperSheet({ cv, settings: s, template: T, id }) {
  const [w, h] = PAPER[s.paper].px
  return (
    <div id={id} className="paper" style={{ width: w, minHeight: h, fontFamily: fontCss(s.font), '--ac': s.accent, '--fs': s.fontSize + 'px', '--lh': s.lineHeight }}>
      <T.Preview cv={cv} settings={s} />
    </div>
  )
}
