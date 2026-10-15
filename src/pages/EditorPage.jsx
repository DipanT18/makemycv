import EditorHeader from '@/components/layout/EditorHeader'
import Toolbar from '@/features/editor/Toolbar'
import FormPanel from '@/features/editor/FormPanel'
import PreviewPane from '@/features/preview/PreviewPane'
export default function EditorPage() {
  return (
    <div className="flex h-dvh flex-col">
      <EditorHeader /><Toolbar />
      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(380px,44%)_1fr]"><FormPanel /><PreviewPane /></div>
    </div>
  )
}
