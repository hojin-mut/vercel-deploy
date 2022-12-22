import { PropsWithChildren } from 'react'

import styles from '@gloom/mobile-web/styles/InputField.module.css'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputFieldProps {
  label: string
  id: string
  type: string
  formRegister: UseFormRegisterReturn
}

export default function InputField({ label, id, type, children, formRegister }: PropsWithChildren<InputFieldProps>) {
  return (
    <div className={styles.container}>
      <div className={styles['input-div']}>
        <input className={styles['input-field']} id={id} type={type} placeholder=" " {...formRegister} />
        <label className={styles['label']} htmlFor={id}>
          {label}
        </label>
      </div>
      {children}
    </div>
  )
}
