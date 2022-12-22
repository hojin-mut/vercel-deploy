import { ApolloError } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useEffect } from 'react'
import { useVerifyEmailMutation, VerifyEmailMutation } from '../../__generated__/graphql-types'

const Confirm: NextPage = () => {
  const router = useRouter()

  // graphql
  const onCompleted = (data: VerifyEmailMutation) => {
    const { ok, errorMessage } = data.verifyEmail
    if (ok) {
      console.log(`Verify mail completed.`)
      alert(`Email verify completed`)
      router.replace('/')
    } else {
      console.log(errorMessage)
    }
  }

  const onError = (error: ApolloError) => {
    console.log(error)
  }

  useEffect(() => {
    const [, code] = window.location.href.split('code=')
    console.log(`code:${code}`)
    if (!code) return

    verifyEmailMutation({
      variables: {
        input: {
          code,
        },
      },
    })
  }, [])

  const [verifyEmailMutation, { loading }] = useVerifyEmailMutation({ onCompleted, onError })

  // TODO : error 시 confirm 이라 뜨고있음
  return <>{loading ? <p>Verifying Email</p> : <p>Confirmed!</p>}</>
}

export default Confirm
