import { contact, tags } from '@/lib/text'
import { Block, Entries } from '../shared/parts'
export default function Preview({ cv }) {
  const p = cv.profile
  return (
    <div className="tpl-modern">
      <header><h1>{p.name}</h1><p>{p.title}</p><small>{contact(p).join('   |   ')}</small></header>
      <main>
        <Block title="Summary"><p>{p.summary}</p></Block>
        <Entries title="Experience" list={cv.experience} /><Entries title="Education" list={cv.education} /><Entries title="Projects" list={cv.projects} />
        <Block title="Skills"><p>{tags(cv.skills).join(' · ')}</p></Block>
        <Block title="Languages"><p>{tags(cv.languages).join(', ')}</p></Block>
      </main>
    </div>
  )
}
