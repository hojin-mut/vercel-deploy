import Link from 'next/link'
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

import styles from '@gloom/mobile-web/styles/login.module.css'

import { CreateAccountInput } from '../../__generated__/graphql-types'
import Button from '../common/Button'
import InputField from '../common/InputField'
import PasswordInputField from '../common/PasswordInputField'
import SignupEmailInput from './SignupEmailInput'

const MIN_PW_LENGTH = 6 // TODO 8 로 변경하기. 개발때는 걍 편해서 6으로 설정
const MAX_PW_LENGTH = 12
const PW_LENGTH_WARNING_MSG = `Between ${MIN_PW_LENGTH}-${MAX_PW_LENGTH} characters long`

interface SignupProps {
  register: UseFormRegister<CreateAccountInput>
  handleSubmit: UseFormHandleSubmit<CreateAccountInput>
  onSubmitValid: () => void
}

export default function Signup({ register, handleSubmit, onSubmitValid }: SignupProps) {
  return (
    <div className={styles['login-container']}>
      <div className={styles['desc-containder']}>
        <div className={styles.title}>KLOOM</div>
      </div>
      <div className={styles['option-container']}>
        <Link href="/login">
          <span>Log in</span>
        </Link>
        <span className={styles['option-activate']}>Sign up</span>
      </div>
      <form onSubmit={handleSubmit(onSubmitValid)} className={styles.form}>
        <SignupEmailInput register={register} />
        <InputField
          label="Nickname"
          type="nickname"
          id="nickname"
          formRegister={{
            ...register('nickname', {
              required: 'Nickname is required',
            }),
          }}
        />
        <PasswordInputField
          formRegister={{
            ...register('password', {
              required: 'Password is required',
              minLength: {
                value: MIN_PW_LENGTH,
                message: PW_LENGTH_WARNING_MSG,
              },
              maxLength: {
                value: MAX_PW_LENGTH,
                message: PW_LENGTH_WARNING_MSG,
              },
            }),
          }}
        />

        <div className={styles.desc}>
          <div>Your Password must include following: </div>
          <div>&bull;&#160;Between 8-12 characters long </div>
          <div>&bull;&#160;Contains alphabets and numbers</div>
        </div>

        <Button label="Send Verification Code" />
      </form>
    </div>
  )
}
