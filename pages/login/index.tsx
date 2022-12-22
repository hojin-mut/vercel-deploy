import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { authToken, isLoggedInVar } from '@gloom/mobile-web/src/apollo'
import { LOCAL_STORAGE_TOKEN } from '@gloom/mobile-web/src/constants'
import styles from '@gloom/mobile-web/styles/login.module.css'
import { LoginMutation, useLoginMutation } from '@gloom/mobile-web/__generated__/graphql-types'

import Button from '../../components/common/Button'
import InputField from '../../components/common/InputField'
import PasswordInputField from '../../components/common/PasswordInputField'

interface ILogInForm {
  email: string
  password: string
}

const Login: NextPage = () => {
  const router = useRouter()

  // graphql
  const onCompleted = (data: LoginMutation) => {
    const { ok, errorMessage, token } = data.login
    if (ok && token) {
      console.log(`login completed. token:${token}`)
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token)
      authToken(token)
      isLoggedInVar(true)
      alert(`Login Success. token:${token}`)
      router.replace('/')
    } else {
      console.log(errorMessage)
    }
  }
  const [loginMutation, { loading }] = useLoginMutation({ onCompleted })

  // form
  const { register, handleSubmit, getValues } = useForm<ILogInForm>()

  const onSubmitValid = () => {
    if (loading) return
    const { email, password } = getValues()
    loginMutation({
      variables: {
        input: {
          email,
          password,
        },
      },
    })
  }

  const onSubmitInvalid = () => {
    console.log('Cannot create account')
  }

  // IMPL_NOTE : abc@example.com 을 위한 regex, 참고 : https://emailregex.com/
  const emailMatchingRegexPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return (
    <div className={styles['login-container']}>
      <div className={styles['desc-containder']}>
        <div className={styles.title}>KLOOM</div>
      </div>
      <div className={styles['option-container']}>
        <span className={styles['option-activate']}>Log in</span>
        <Link href="/signup">
          <span>Sign up</span>
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)} className={styles.form}>
        <InputField
          label="Email"
          type="email"
          id="email"
          formRegister={{
            ...register('email', {
              required: 'Email is required',
              pattern: emailMatchingRegexPattern,
            }),
          }}
        />
        <PasswordInputField formRegister={{ ...register('password', { required: true }) }} />
        <Button label="Log in" />
      </form>
    </div>
  )
}

export default Login
