import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useCallback } from 'react'

import TextEditor from '@gloom/mobile-web/components/TextEditor'
import { PostCategory, useCreatePostMutation } from '@gloom/mobile-web/__generated__/graphql-types'
import styles from '@gloom/mobile-web/styles/createPost.module.css'

const CreatePost: NextPage = () => {
  const router = useRouter()

  const [title, setTitle] = useState<string>('')
  const [contents, setContents] = useState<string>('')

  const [createPost, { loading, error }] = useCreatePostMutation()
  const onClickCreate = useCallback(() => {
    createPost({ variables: { input: { category: PostCategory.Celebrity, contents: contents } } })

    if (!loading && !error) router.push('/post/list', undefined, { shallow: true })
  }, [contents, createPost, error, loading, router])

  return (
    <>
      <Head>
        <title>Gloom - Create</title>
      </Head>
      <div className={styles['body-container']}>
        <div className={styles['title-container']}>
          <span className={styles['title-label']}>title</span>
          <input className={styles['title-input']} value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <select>
          {Object.keys(PostCategory).map(postCategory => (
            <option key={postCategory} value={postCategory}>
              {postCategory}
            </option>
          ))}
        </select>
        <div className={styles['editor-container']}>
          <TextEditor contents={contents} setContents={setContents} />
        </div>
        <button className={styles['create-button']} onClick={onClickCreate}>
          Create
        </button>
      </div>
    </>
  )
}

export default CreatePost
