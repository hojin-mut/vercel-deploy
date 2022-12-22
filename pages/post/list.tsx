import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { Post, usePostsQuery, useRemovePostMutation } from '@gloom/mobile-web/__generated__/graphql-types'

const PostList: NextPage = () => {
  const router = useRouter()

  const { data, loading } = usePostsQuery()
  const { posts } = data || {}

  const [removePost] = useRemovePostMutation()
  const onClickRemove = useCallback(
    (postId: number) => {
      removePost({ variables: { postId } })
    },
    [removePost],
  )

  return (
    <>
      <Head>
        <title>Gloom - Posts</title>
      </Head>
      <button onClick={() => router.push('/post/create')}>create</button>
      {!loading &&
        posts &&
        posts.map((post: Post) => (
          <div style={{ width: '80%', margin: '10px', display: 'flex', flexDirection: 'row' }} key={post.id}>
            <div onClick={() => router.push(`/post/${post.id}`)}>
              <h2>{post.id}</h2>
              <h3>{post.contents}</h3>
            </div>
            <button onClick={() => router.push(`/post/edit/${post.id}`)}>edit</button>
            <button onClick={() => onClickRemove(post.id)}>delete</button>
          </div>
        ))}
    </>
  )
}

export default PostList
