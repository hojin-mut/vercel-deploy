import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import TextEditor from '@gloom/mobile-web/components/TextEditor'
import { PostCategory, usePostQuery, useUpdatePostMutation } from '@gloom/mobile-web/__generated__/graphql-types'
import styles from '@gloom/mobile-web/styles/createPost.module.css'

const Post: NextPage = () => {
  const router = useRouter()
  const { postId } = router.query

  const { data, loading } = usePostQuery({ variables: { postId: Number(postId) } })
  const { post } = data || {}

  const [title, setTitle] = useState<string>('')
  const [contents, setContents] = useState<string>('')

  useEffect(() => {
    post && setContents(String(post?.contents))
  }, [post])

  const [updatePost, { loading: updateLoading, error }] = useUpdatePostMutation()
  const onClickCreate = useCallback(() => {
    updatePost({ variables: { input: { id: Number(post?.id), category: PostCategory.Celebrity, contents: contents } } })

    if (!updateLoading && !error) router.push('/post/list')
  }, [updatePost, post, contents, updateLoading, error, router])

  return (
    <>
      <Head>
        <title>Gloom - Create</title>
      </Head>
      {!loading && contents && (
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
            Update
          </button>
        </div>
      )}
    </>
  )
}

export default Post
