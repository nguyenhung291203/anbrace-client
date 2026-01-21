export interface CategoryResponse {
	id: number
	name: string
	description: string
	productcQuantity: number
}
export interface CategoryItem {
	id: number
	name: string
	description: string
	productcQuantity?: number
}

export type CategoryEdit = Omit<CategoryItem, 'id' | 'quantity'> & {
	quantity?: number
}
