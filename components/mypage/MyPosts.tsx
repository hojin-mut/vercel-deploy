import Link from 'next/link'
import { useEffect } from 'react'

import { Post, usePostsByUserIdLazyQuery } from '../../__generated__/graphql-types'

function MyPosts() {
  const [loadPosts, { called, data, loading }] = usePostsByUserIdLazyQuery()

  console.log(`called:${called}, loading:${loading}`)
  console.log(data)

  useEffect(() => {
    if (!called) loadPosts()
  }, [])

  return (
    <>
      <div>
        {loading ? (
          <></>
        ) : (
          <div>
            <h3>내가 쓴 글 리스트</h3>
            {data &&
              data.postsByUserId.map((post: Post) => (
                // TODO 공통 component 화
                <div style={{ width: '80%', margin: '10px', display: 'flex', flexDirection: 'row' }} key={post.id}>
                  <Link href={`/post/${post.id}`}>
                    <h2>{post.id}</h2>
                    <h3>{post.contents}</h3>
                  </Link>
                  <Link href={`/post/edit/${post.id}`}>
                    <div>edit</div>
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  )
}

export default MyPosts
