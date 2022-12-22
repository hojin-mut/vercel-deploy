import styles from '@gloom/mobile-web/styles/Body.module.css'

const Body: React.FC<any> = ({ children }: { children: any }) => (
  <div className={styles['html-container']}>
    <div className={styles['body-container']}>{children}</div>
  </div>
)

export default Body
