import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import 'react-quill/dist/quill.snow.css'

import Body from '../components/common/Body'
import '@gloom/mobile-web/styles/globals.css'

import apolloClient from '../src/apollo'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Body>
        <Component {...pageProps} />
      </Body>
    </ApolloProvider>
  )
}

export default MyApp
