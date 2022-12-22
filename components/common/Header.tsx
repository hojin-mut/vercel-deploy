import Link from 'next/link'
import { useReactiveVar } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { isLoggedInVar } from '@gloom/mobile-web/src/apollo'
import styles from '@gloom/mobile-web/styles/Header.module.css'
import SearchBar from '@gloom/mobile-web/public/SearchBar.svg'
import MyPage from '@gloom/mobile-web/public/MyPage.svg'
import Back from '@gloom/mobile-web/public/Back.svg'
import { useMeQuery } from '@gloom/mobile-web/__generated__/graphql-types'

import { LogoutButton } from '../LogoutButton'

const Header: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const { data } = useMeQuery()
  useEffect(() => setLoggedIn(isLoggedIn), [isLoggedIn])

  const router = useRouter()
  const onClick = () => {
    router.back()
  }
  return (
    <header>
      <div className={styles['header-container']}>
        <span className={styles['svg-container']} onClick={onClick}>
          <Back />
        </span>

        <span className={styles.home}>
          <Link href="/">KLOOM</Link>
        </span>

        <span className={styles['tool-container']}>
          <span className={styles['svg-container']}>
            <Link href={'/post/search'}>
              <SearchBar />
            </Link>
          </span>

          <span className={styles['svg-container']}>
            <Link href={loggedIn ? '/mypage' : '/login'}>
              <MyPage />
            </Link>
          </span>
        </span>

        {loggedIn ? <LogoutButton /> : <></>}
      </div>
      <div className={styles['email-verified-info']}>{data && data?.me.verified === false && <div>Email is not verified</div>}</div>
    </header>
  )
}

export default Header
