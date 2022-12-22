import cx from 'classnames'

import styles from '@gloom/mobile-web/styles/Button.module.css'

interface ButtonProps {
  label: string
  isSmall?: boolean
  isWhite?: boolean
}

export default function Button({ label, isSmall, isWhite }: ButtonProps) {
  return <button className={cx(isSmall ? styles['small'] : styles['big'], isWhite ? styles['white'] : styles['prime'])}>{label}</button>
}
