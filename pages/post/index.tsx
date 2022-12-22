import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cx from 'classnames'

import PostListItem from '@gloom/mobile-web/components/PostListItem'
import CategoryToolbar from '@gloom/mobile-web/components/CategoryToolBar'
import styles from '@gloom/mobile-web/styles/index.module.css'
import BigView from '@gloom/mobile-web/public/BigView.svg'
import SmallView from '@gloom/mobile-web/public/SmallView.svg'
import Hot from '@gloom/mobile-web/public/Hot.svg'
import { Post, usePostsQuery } from '@gloom/mobile-web/__generated__/graphql-types'

const PostPage: NextPage = () => {
  const router = useRouter()
  const categoryId = Number(router.query.categoryId)

  const [isSmallView, setIsSmallView] = useState<boolean>(true)
  const { data, loading } = usePostsQuery({ variables: { categoryId } })
  const { posts } = data || {}
  return (
    <>
      <Head>
        <title>Gloom - Home</title>
      </Head>
      <CategoryToolbar />
      <div className={styles['view-container']}>
        <span className={styles['trending-sort']}>
          <span>
            <Hot />
            <span>HOT</span>
          </span>
        </span>
        <span className={styles['view']}>
          <span onClick={() => setIsSmallView(true)} className={cx(styles['view-button'], isSmallView && styles['view-selected'])}>
            <SmallView />
          </span>
          <span onClick={() => setIsSmallView(false)} className={cx(styles['view-button'], !isSmallView && styles['view-selected'])}>
            <BigView />
          </span>
        </span>
      </div>
      <div className={styles['post-list']}>
        {!loading &&
          posts?.map((post: Post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <PostListItem
                id={post.id}
                username={'sj123'}
                category={`category:${post.categoryId}`}
                title={post.contents}
                createdAt={post.createdAt}
                views={209}
                comments={14}
                likes={22}
                dislikes={0}
                isSmallView={isSmallView}
              />
            </Link>
          ))}
      </div>
      {/* TODO: floating Button */}
      {/* <span className={styles.floating}>
        <PlusIcon />
      </span> */}
    </>
  )
}

export default PostPage
