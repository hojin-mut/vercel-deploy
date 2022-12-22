import type { NextPage } from 'next'
import Header from '../components/common/Header'

import PostPage from './post'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <PostPage />
    </>
  )
}

export default Home
