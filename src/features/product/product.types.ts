import { CategoryItem } from '../category/category.types'
export interface ProductSizePrice {
	size: number
	price: number
	stock: number
}

export interface ProductItem {
	id: number
	name: string
	description: string
	category: Omit<CategoryItem, 'quantity'>
	sizes: ProductSizePrice[]
	rating: number
	images: string[]
	thumbnail: string
}

export type ProductEdit = Omit<ProductItem, 'category' | 'rating' | 'id'> & {
	categoryId: number | null
}

export enum PRODUCT_CARD_VARIANT {
	V1 = 'v1',
	V2 = 'v2',
}
