import { useEffect, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

import { CreateAccountInput, useCheckEmailLazyQuery } from '../../__generated__/graphql-types'
import InputField from '../common/InputField'

import styles from '@gloom/mobile-web/styles/InputField.module.css'
import GreenCheck from '@gloom/mobile-web/public/GreenCheck.svg'

const EMAIL_WARNING_MSG_FORMAT = 'Please check if the email is in correct format.'
const EMAIL_WARNING_MSG_EXIST = 'Your email is already taken. Please use another email.'
const emailMatchingRegexPattern: RegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

interface SignupEmailInputProps {
  register: UseFormRegister<CreateAccountInput>
}

export default function SignupEmailInput({ register }: SignupEmailInputProps) {
  const [checkEmailApi, { called, loading, data }] = useCheckEmailLazyQuery() // TODO 캐싱 처리 해야함
  const [description, setDescription] = useState<string | null>(null)
  const [valid, setValid] = useState(false)

  useEffect(() => {
    if (called && data) {
      const isNotExist = data.isNotExistEmail
      if (isNotExist) {
        setDescription(null)
        setValid(true)
      } else {
        console.log(EMAIL_WARNING_MSG_EXIST)
        setDescription(EMAIL_WARNING_MSG_EXIST)
        setValid(false)
      }
    } else {
      console.log(`not called(${called}) or no data: `, data)
    }
  }, [called, data])

  const onBlur = (e: any) => {
    const email = e.target.value
    if (email && emailMatchingRegexPattern.test(email)) {
      if (description == EMAIL_WARNING_MSG_FORMAT) {
        setDescription(null)
        setValid(true)
      }
      try {
        // TODO seo : loading 중에 새 값을 입력후 onBlur 가 불렸을때 API 를 호출하지 않는 이슈가 있음
        if (loading == false) checkEmailApi({ variables: { input: email } })
      } catch (error) {
        console.log('checkEmailApi error: ', error)
      }
    } else {
      // UI Update
      setDescription(EMAIL_WARNING_MSG_FORMAT)
      setValid(false)
    }
  }

  return (
    <InputField
      label="Email"
      type="email"
      id="email"
      formRegister={{
        ...register('email', {
          required: 'Email is required',
          onBlur: onBlur,
          pattern: {
            value: emailMatchingRegexPattern,
            message: EMAIL_WARNING_MSG_FORMAT,
          },
        }),
      }}
    >
      {/* TODO seo & hojin : GUI 적용 및 label 과 CSS 동작 충돌 해결해야함 */}
      {description && <p className={styles['description']}>{description}</p>}
      <span className={styles['input-valid-icon']}>{valid && <GreenCheck width="24px" height="24px" />}</span>
    </InputField>
  )
}
