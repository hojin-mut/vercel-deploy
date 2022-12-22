import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { usePostQuery } from '@gloom/mobile-web/__generated__/graphql-types'

const Post: NextPage = () => {
  const router = useRouter()
  const { postId } = router.query

  const { data, loading } = usePostQuery({ variables: { postId: Number(postId) } })
  const { post } = data || {}

  return (
    <>
      <Head>
        <title>Gloom - Post</title>
      </Head>
      {!loading && post && (
        <>
          <div>{`Category: ${post.category}`}</div>
          <div>{`CreatedAt: ${post.createdAt}`}</div>
          <div>{`Contents: ${post.contents}`}</div>
        </>
      )}
    </>
  )
}

export default Post
