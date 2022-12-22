import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useMemo, useRef } from 'react'

type Props = {
  contents: string
  setContents: (contents: string) => void
}

const TextEditor: NextPage<Props> = ({ contents, setContents }) => {
  const ReactQuill = dynamic(
    async () => {
      const { default: RQ } = await import('react-quill')
      return function comp({ forwardedRef, ...props }: any) {
        return <RQ ref={forwardedRef} {...props} />
      }
    },
    { ssr: false },
  )
  const quillRef = useRef()

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          ['clean'],
        ],
      },
    }),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  )

  const formats = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video']

  return useMemo(
    () => (
      <ReactQuill
        styles={{ height: '500px' }}
        forwardedRef={quillRef}
        value={contents}
        onChange={setContents}
        modules={modules}
        formats={formats}
        theme="snow"
      />
    ),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  )
}

export default TextEditor
