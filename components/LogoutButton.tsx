import { authToken, isLoggedInVar } from '../src/apollo'
import { LOCAL_STORAGE_TOKEN } from '../src/constants'

export const LogoutButton = () => {
  const onClick = () => {
    isLoggedInVar(false)
    authToken(null)
    localStorage.removeItem(LOCAL_STORAGE_TOKEN)
  }
  return (
    <div>
      <button onClick={onClick}>로그아웃</button>
    </div>
  )
}
