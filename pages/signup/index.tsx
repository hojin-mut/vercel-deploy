import { ApolloError } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { CreateAccountInput, CreateAccountMutation, useCreateAccountMutation, UserType } from '@gloom/mobile-web/__generated__/graphql-types'

import EmailVerifyPopup from '../../components/signup/EmailVerifyPopup'

import Signup from '../../components/signup/Signup'

const SignupPage: NextPage = () => {
  const router = useRouter()
  const [showEmailVerifyPopup, setShowEmailVerifyPopup] = useState(false)

  // graphql
  const onCompleted = (data: CreateAccountMutation) => {
    if (data.createAccount.ok) {
      alert('Account Created! Verify Email please.')
      setShowEmailVerifyPopup(true)
    } else {
      alert(`[CreateAccount] error: ${data.createAccount.errorMessage}`)
    }
  }

  const onError = (error: ApolloError) => {
    console.log(`[useCreateAccountMutation] error: ${error}`)
    alert(`[useCreateAccountMutation] error: ${error}`)
  }
  const [createAccountMutation, { loading }] = useCreateAccountMutation({ onCompleted, onError })

  // form
  const { register, handleSubmit, getValues } = useForm<CreateAccountInput>({ defaultValues: { type: UserType.User } })
  const onSubmitValid = () => {
    if (loading) return
    const { email, password, nickname, type } = getValues()
    createAccountMutation({
      variables: {
        input: {
          email,
          password,
          nickname,
          type,
        },
      },
    })
  }

  return showEmailVerifyPopup ? (
    <EmailVerifyPopup
      onVerified={() => {
        // TODO 굳이 Popup 내려줘야 할까?
        setShowEmailVerifyPopup(false)

        // TODO seo login success description 과 함께 login 화면으로 분기시키기.
        router.replace('/login')
      }}
    />
  ) : (
    <Signup register={register} handleSubmit={handleSubmit} onSubmitValid={onSubmitValid} />
  )
}

export default SignupPage
