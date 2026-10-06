import { lines } from '@/lib/text'
export const Block = ({ title, children }) => <section className="blk"><h2>{title}</h2>{children}</section>
export const Entry = ({ e }) => (
  <div className="ent">
    <div className="row"><b>{e.title}</b><i>{e.dates}</i></div>
    {e.org && <div className="org">{e.org}</div>}
    {lines(e.details).map((l, i) => <p key={i} className="bl">{l}</p>)}
  </div>
)
export const Entries = ({ title, list }) => (list.length ? <Block title={title}>{list.map((e) => <Entry key={e.id} e={e} />)}</Block> : null)
export const Lines = ({ title, items }) => (items.length ? <Block title={title}>{items.map((x) => <p key={x} className="li">{x}</p>)}</Block> : null)
