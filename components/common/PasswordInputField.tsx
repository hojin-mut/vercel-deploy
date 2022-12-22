import { useState } from 'react'

import InputField from './InputField'

import InvisiblePasswordIcon from '@gloom/mobile-web/public/InvisiblePasswordIcon.svg'
import VisiblePasswordIcon from '@gloom/mobile-web/public/VisiblePasswordIcon.svg'
import styles from '@gloom/mobile-web/styles/InputField.module.css'
import { UseFormRegisterReturn } from 'react-hook-form'

export const PASSWORD_INPUT_FEILD_LABEL = 'Password'

interface PasswordInputFieldProps {
  formRegister: UseFormRegisterReturn
}

export default function PasswordInputField({ formRegister }: PasswordInputFieldProps) {
  const [showPassword, setShowPassword] = useState(false)

  const onClick = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <InputField label={PASSWORD_INPUT_FEILD_LABEL} type={showPassword ? 'text' : 'password'} id="password" formRegister={formRegister}>
      <span onClick={onClick} className={styles['show-password']}>
        {showPassword ? <VisiblePasswordIcon width="24px" height="24px" /> : <InvisiblePasswordIcon width="24px" height="24px" />}
      </span>
    </InputField>
  )
}
