import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { ProductItem } from './product.types'

import api from '@/shared/api'
import { ApiResponse, PaginationRequest, PaginationResponse } from '@/shared/types'

export interface ListProductRequest extends PaginationRequest {
	keyword?: string
	categoryIds: number[]
	minPrice?: number
	maxPrice?: number
	sizes?: number[]
}
export type ListProductResponse = PaginationResponse<ProductItem>

export const useGetListProduct = (request: ListProductRequest) => {
	return useQuery<ApiResponse<ListProductResponse>>({
		queryKey: ['products', request],
		queryFn: () =>
			api({
				url: '/products/filter',
				method: 'POST',
				data: request,
			}),
		staleTime: 5 * 60 * 1000,
		placeholderData: keepPreviousData,
	})
}

export const useGetProductById = (id: number) => {
	return useQuery<ApiResponse<ProductItem>>({
		queryKey: ['product', id],
		queryFn: () =>
			api({
				url: `/products/${id}`,
				method: 'GET',
			}),
		staleTime: 5 * 60 * 1000,
	})
}
