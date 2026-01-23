import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'

import { ProductEdit, ProductItem } from './product.types'

import { queryClient } from '@/app/App'
import api from '@/shared/api'
import { API_CODE, ApiResponse, PaginationRequest, PaginationResponse } from '@/shared/types'

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

export const useCreateProduct = () =>
	useMutation<ApiResponse<ProductItem>, Error, ProductEdit>({
		mutationFn: (data) =>
			api({
				url: '/products',
				method: 'POST',
				data,
				isFormData: true,
			}),
		onSuccess: (res) => {
			if (res.code === API_CODE.SUCCESS) {
				queryClient.invalidateQueries({ queryKey: ['products'] })
			}
		},
	})
