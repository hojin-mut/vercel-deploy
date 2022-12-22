import { NextPage } from 'next'
import { useState } from 'react'

import MyPosts from '../components/mypage/MyPosts'
import UserInfo from '../components/mypage/UserInfo'

const INVALID_ITEM = -1

const MyPage: NextPage = () => {
  const [currentVisibleItem, setCurrentVisibleItem] = useState(INVALID_ITEM)
  console.log('currentVisibleItem', currentVisibleItem)
  const items = [
    {
      id: 1,
      title: '회원정보',
      node: (key: number) => {
        return <UserInfo key={key} />
      },
    },
    {
      id: 2,
      title: '내가 쓴 글',
      node: (key: number) => {
        return <MyPosts key={key} />
      },
    },
  ]
  // TODO seo : 내가 쓴 댓글 컴포넌트 만들면 추가

  return (
    <>
      <h2>MyPage</h2>

      {items.map(({ id, title, node }) => (
        <button key={id} onClick={() => setCurrentVisibleItem(id)}>
          {title}
        </button>
      ))}
      <button onClick={() => setCurrentVisibleItem(INVALID_ITEM)}>초기화</button>
      <div>결과</div>
      <div>{items.filter(item => item.id === currentVisibleItem).map(item => item.node(item.id))}</div>
    </>
  )
}

export default MyPage
