import styles from '@gloom/mobile-web/styles/PostListItem.module.css'
import Comments from '@gloom/mobile-web/public/Comments.svg'
import ViewCounts from '@gloom/mobile-web/public/ViewCounts.svg'
import Likes from '@gloom/mobile-web/public/Likes.svg'
import Dislikes from '@gloom/mobile-web/public/Dislikes.svg'

interface PostListItemProps {
  id: number
  username: string
  title: string
  createdAt: string
  category: string
  views: number
  comments: number
  likes: number
  dislikes: number
  isSmallView: boolean
  //TODO : ImageThumbNail
}
export default function PostListItem({ id, username, title = 'Title', createdAt, category, views, comments, likes, dislikes, isSmallView }: PostListItemProps) {
  return (
    <>
      {isSmallView ? (
        <div className={styles['post-container']}>
          <div className={styles['post-image']}></div>
          <div className={styles['post-info-container']}>
            <div>
              <span>[{category}]</span>
              <span> {title}</span>
            </div>
            <div className={styles['post-flex']}>
              <span className={`${styles.userId} ${styles['margin-right1']}`}>{username}</span>
              <span className={styles['margin-right1']}>|</span>
              <span className={styles['margin-right3']}>{createdAt.substring(0, 10)}</span>
            </div>

            <div className={`${styles['post-other-info']} ${styles['post-flex']}`}>
              <span className={styles['margin-right1']}>
                <Comments />
                <span className={styles['margin-left']}>{comments}</span>
              </span>

              <span className={styles['margin-right1']}>
                <ViewCounts />
                <span className={styles['margin-left']}>{views}</span>
              </span>
              <span className={styles['margin-right1']}>
                <Likes />
                <span className={styles['margin-left']}>{likes}</span>
              </span>
              <span className={styles['margin-right1']}>
                <Dislikes />
                <span className={styles['margin-left']}>{dislikes}</span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles['big-post-container']}>
          <div className={styles['big-post-image']}></div>
          <div className={styles['big-post-info-container']}>
            <div className={styles['big-post-title']}>{title}</div>
            <div className={styles['big-post-info']}>
              <span className={styles['margin-right1']}>[{category}]</span>
              <span className={styles['margin-right1']}>{username}</span>
              <span>{createdAt.substring(0, 10)}</span>
            </div>
            <div className={`${styles['big-post-other-info']} ${styles['big-post-flex']}`}>
              <span className={styles['margin-right1']}>
                <ViewCounts width={'20'} height={'16'} />
                <span className={styles['margin-left']}>{views}</span>
              </span>
              <span className={styles['margin-right1']}>
                <Comments width={'16'} height={'16'} />
                <span className={styles['margin-left']}>{comments}</span>
              </span>

              <span className={styles['margin-right1']}>
                <Likes width={'16'} height={'15'} />
                <span className={styles['margin-left']}>{likes}</span>
              </span>
              <span className={styles['margin-right1']}>
                <Dislikes width={'19'} height={'16'} />
                <span className={styles['margin-left']}>{dislikes}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
