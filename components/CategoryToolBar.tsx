import Link from 'next/link'
import { useRouter } from 'next/router'
import cx from 'classnames'

import styles from '@gloom/mobile-web/styles/CategoryToolbar.module.css'
import CategoryButton from '@gloom/mobile-web/components/CategoryListItem'
import { CategoryType, useCategoriesQuery } from '@gloom/mobile-web/__generated__/graphql-types'

export default function CategoryToolbar() {
  const router = useRouter()
  const { data } = useCategoriesQuery()

  const { categories } = data || {}
  const mainCategories = categories?.filter(c => c.type === CategoryType.MainCategory)
  const selectedCategoryId = Number(router.query.categoryId)
  const selectedMainCategoryId = Math.floor(selectedCategoryId / 100) * 100

  const subCategories = categories?.filter(c => c.parentId === selectedMainCategoryId) || []
  const isSubCategoriesVisible = selectedCategoryId && subCategories?.length > 1

  // Mainpage에서는 Hot 게시물만 띄움
  return (
    <>
      <div className={styles.toolbar}>
        {mainCategories?.map(category => (
          <Link key={category.id} href={{ query: { categoryId: category.id } }} as="post">
            <CategoryButton svg={category.name} active={selectedMainCategoryId === category.id} />
          </Link>
        ))}
      </div>
      <div className={styles[isSubCategoriesVisible ? 'sub-category-container' : 'none']}>
        {selectedCategoryId
          ? subCategories?.map(category => (
              <Link
                key={category.id}
                href={{ pathname: '', query: { categoryId: category.id } }}
                as="post"
                className={cx(styles['sub-category'], selectedCategoryId === category.id && styles['sub-selected'])}
              >
                {category.name}
              </Link>
            ))
          : null}
      </div>
    </>
  )
}
