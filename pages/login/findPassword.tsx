import { NextPage } from 'next'
import { useState } from 'react'

import styles from '@gloom/mobile-web/styles/findPassword.module.css'
import CodeRefreshIcon from '@gloom/mobile-web/public/CodeRefreshIcon.svg'

const FindPassword: NextPage = () => {
  const [codeLangTh, setcodeLangTh] = useState(true)
  const onClick = () => {
    setcodeLangTh(prev => !prev)
  }
  return (
    <div className={styles['login-container']}>
      <div className={styles['desc-containder']}>
        <div className={styles.title}>Find Password</div>
        <div className={styles.description}>Enter your email and a password reset link will be sent to your email</div>
      </div>
      <form>
        <input className={styles['account-input']} placeholder="Your email" type="email" id="email" />
        <div className={styles['code-desc-container']}>
          <span className={styles['code-desc-black-font']}>Type the text you see in the box below.</span>
          <span onClick={onClick} className={styles['code-desc-changeLang']}>
            {codeLangTh ? 'TH -> EN' : 'EN -> TH'}
          </span>
        </div>
        <div className={styles['code-container']}>
          <div className={styles.code} />
        </div>

        <input className={styles['account-input']} placeholder="Text" type="text" id="code" />
      </form>

      <div className={styles['refresh-container']}>
        {/* TODO RECAPTCHA ? */}
        <CodeRefreshIcon />
        <span className={styles['refresh-text']}>Can't read text</span>
      </div>
      <button className={styles.button}>send request</button>
    </div>
  )
}

export default FindPassword
