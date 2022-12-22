import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Post, useCategoryQuery } from '@gloom/mobile-web/__generated__/graphql-types'
import PostListItem from '@gloom/mobile-web/components/PostListItem'
import CategoryToolbar from '@gloom/mobile-web/components/CategoryToolBar'
import styles from '@gloom/mobile-web/styles/index.module.css'
import BigView from '@gloom/mobile-web/public/BigView.svg'
import SmallView from '@gloom/mobile-web/public/SmallView.svg'
import Hot from '@gloom/mobile-web/public/Hot.svg'

const Home: NextPage = () => {
  const [isSmallView, setIsSmallView] = useState<boolean>(true)
  const router = useRouter()

  const { categoryName } = router.query
  const { data, loading } = useCategoryQuery()

  return (
    <>
      <Head>
        <title>Kloom - Home</title>
      </Head>

      {/* <CategoryToolbar activeCategory={categoryName} /> */}
      <div className={styles['view-container']}>
        <span className={styles['trending-sort']}>
          <span>
            <Hot />
            <span>HOT</span>
          </span>
        </span>
        <span className={styles['view']}>
          <span
            onClick={() => {
              setIsSmallView(true)
            }}
            className={isSmallView ? `${styles['view-button']} ${styles['view-selected']}` : styles['view-button']}
          >
            <SmallView />
          </span>
          <span
            onClick={() => {
              setIsSmallView(false)
            }}
            className={isSmallView ? styles['view-button'] : `${styles['view-button']} ${styles['view-selected']}`}
          >
            <BigView />
          </span>
        </span>
      </div>
      {/* <div className={styles['post-list']}>
        {!loading &&
          postCat &&
          postCat.map((post: Post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <PostListItem
                id={post.id}
                username={'sj123'}
                category={post.category}
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
      </div> */}
      {/* TODO: floating Button */}
      {/* <span className={styles.floating}>
        <PlusIcon />
      </span> */}
    </>
  )
}

export default Home
