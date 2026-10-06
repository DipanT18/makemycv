import { contact, tags } from '@/lib/text'
import { Block, Entries, Lines } from '../shared/parts'
export default function Preview({ cv }) {
  const p = cv.profile
  return (
    <div className="tpl-castor">
      <aside>
        <div>{contact(p).map((c) => <p key={c} style={{ wordBreak: 'break-all' }}>{c}</p>)}</div>
        <Lines title="Languages" items={tags(cv.languages)} /><Lines title="Interests" items={tags(cv.interests)} /><Lines title="IT skills" items={tags(cv.skills)} />
      </aside>
      <main>
        <h1>{p.name}</h1><p className="t">{p.title}</p><p>{p.summary}</p>
        <Entries title="Work experience" list={cv.experience} /><Entries title="Education" list={cv.education} /><Entries title="Projects" list={cv.projects} />
      </main>
    </div>
  )
}
