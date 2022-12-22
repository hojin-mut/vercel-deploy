import { useForm } from 'react-hook-form'

import styles from '@gloom/mobile-web/styles/EmailVerifyPopup.module.css'
import { useVerifyEmailMutation, VerifyEmailMutation } from '@gloom/mobile-web/__generated__/graphql-types'

import Button from '../common/Button'
import InputField from '../common/InputField'

const CODE_LENGTH = 6
const CODE_LENGTH_WARNING_MSG = 'Please check your verification code.'
const CODE_LENGTH_RULE = {
  value: CODE_LENGTH,
  message: CODE_LENGTH_WARNING_MSG,
}

interface EmailVerifyPopupProps {
  onVerified: () => void
}

export default function EmailVerifyPopup({ onVerified }: EmailVerifyPopupProps) {
  // graphql
  const onCompleted = (data: VerifyEmailMutation) => {
    const { ok, errorMessage } = data.verifyEmail
    if (ok) {
      console.log(`Verify mail completed.`)
      alert(`Email verify completed`)
      onVerified()
    } else {
      console.log(errorMessage)
    }
  }
  const [verifyEmailMutation, { loading }] = useVerifyEmailMutation({ onCompleted })

  // form
  const { register, handleSubmit, getValues } = useForm()

  const onSubmitValid = () => {
    if (loading) return
    const { code } = getValues()
    verifyEmailMutation({
      variables: {
        input: {
          code,
        },
      },
    })
  }

  const onResend = () => {
    // TODO : Resend email
    alert('Resend')
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>An email has been</div>
      <div className={styles.title}>sent to you</div>
      <p className={styles.description}>Check the email that’s associated with your account for the verification code.</p>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <InputField
          label="Email Verification Code"
          type="number"
          id="code"
          formRegister={{
            ...register('code', {
              required: true,
              minLength: CODE_LENGTH_RULE,
              maxLength: CODE_LENGTH_RULE,
            }),
          }}
        />

        <span className={styles.resend} onClick={onResend}>
          Resend email
        </span>

        <div className={styles.button}>
          <Button label="Verify" />
        </div>
      </form>
    </div>
  )
}
