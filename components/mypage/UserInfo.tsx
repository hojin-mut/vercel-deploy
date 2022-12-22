import { useMeQuery } from '../../__generated__/graphql-types'

function UserInfo() {
  const { data } = useMeQuery()

  return (
    <>
      <h2>회원 정보</h2>
      {data && (
        <>
          <div>{data.me.email}</div>
          <div>{data.me.nickname}</div>
        </>
      )}
    </>
  )
}

export default UserInfo
