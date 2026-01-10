import { Category } from "./category"

/**
 * Image format interface for different image sizes
 */
export interface ImageFormat {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}

/**
 * Image formats object containing different sizes
 */
export interface ImageFormats {
  thumbnail?: ImageFormat
  small?: ImageFormat
  medium?: ImageFormat
  large?: ImageFormat
}

/**
 * Image interface representing a product image from the API
 */
export interface ProductImage {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats: ImageFormats | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: any | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

/**
 * Product interface representing a product from the API
 */
export interface Product {
  id: number
  documentId: string
  name: string
  description: string
  price: number
  slug: string
  stock: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: ProductImage
  category: Category
}

/**
 * Array of products
 */
export type Products = Product[]

/**
 * Pagination metadata
 */
export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

/**
 * Meta information for API responses
 */
export interface Meta {
  pagination: Pagination
}

/**
 * Products API response structure
 */
export interface ProductsResponse {
  data: Product[]
  meta: Meta
}
