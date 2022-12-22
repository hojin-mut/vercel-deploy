export const LOCAL_STORAGE_TOKEN = 'token'
export type CategoryList = 'IDOL' | 'MEDIA' | 'KOREA' | 'SQUARE'
export type ActiveCategoryType = CategoryList | null
export const subCategories = {
  IDOL: ['ALL', 'BTS', 'TWICE', 'AESPA', 'BLACK PINK'],
  MEDIA: ['ALL', '영화', '드라마', '예능', '배우'],
  KOREA: ['ALL', '문화', '패션', '음식', '여행'],
  SQUARE: [],
}
