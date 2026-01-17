import { CategoryItem } from '../category/category.types'

export interface ProductItem {
	id: number
	name: string
	description: string
	category: Omit<CategoryItem, 'quantity'>
	price: number
	rating: number
	stock: number
	images: string[]
	thumbnail: string
}

export type ProductEdit = Omit<ProductItem, 'category' | 'rating' | 'id'> & {
	categoryId: number | null
}
