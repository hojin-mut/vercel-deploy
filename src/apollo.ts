import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { LOCAL_STORAGE_TOKEN } from './constants'

const BASE_URL = 'http://kloom.net/graphql'

export const isLoggedInVar = makeVar(false)
export const authToken = makeVar<string | null>(null)

// CSR 시점에서 수행하도록 함
if (typeof window !== 'undefined') {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN)
  isLoggedInVar(Boolean(token))
  authToken(token)
  console.log(`default value of isLoggedInVar is :${isLoggedInVar()}`)
  console.log(`default value of authToken is :${authToken()}`)
}

const httpLink = createHttpLink({
  uri: BASE_URL,
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-jwt': authToken(),
    },
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  ssrMode: true,
  cache: new InMemoryCache(),
  connectToDevTools: true, // TODO seo prod 환경에서 노출되지 않도록 배포 전에 제거
})

export default apolloClient
