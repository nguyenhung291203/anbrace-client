export interface CategoryItem {
	id: number
	name: string
	description: string
	quantity: number
}

export type CategoryEdit = Omit<CategoryItem, 'id' | 'quantity'> & {
	quantity?: number
}
