/**
 * Category interface representing a product category from the API
 */
export interface Category {
  id: number
  documentId: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

/**
 * Array of categories
 */
export type Categories = Category[]
