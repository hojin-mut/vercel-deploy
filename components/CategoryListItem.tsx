import styles from '@gloom/mobile-web/styles/CategoryButton.module.css'
import IDOL from '@gloom/mobile-web/public/IDOL.svg'
import DMA from '@gloom/mobile-web/public/DMA.svg'
import Korea from '@gloom/mobile-web/public/Korea.svg'
import Square from '@gloom/mobile-web/public/Square.svg'

interface CategoryListItemProps {
  svg: string
  active: boolean
}

export default function CategoryListItem({ svg, active }: CategoryListItemProps) {
  let elem
  if (svg == 'Idol') elem = <IDOL />
  else if (svg === 'Media') elem = <DMA />
  else if (svg === 'Korea') elem = <Korea />
  else if (svg === 'Free') elem = <Square />

  return (
    <div className={styles['toolbar-item']}>
      <span className={active ? `${styles.svg} ${styles['category-selected']}` : styles.svg}>{elem}</span>

      <span className={active ? styles['category-selected'] : ''}>{svg}</span>
    </div>
  )
}
