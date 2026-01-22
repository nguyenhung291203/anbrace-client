import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'

import { CategoryItem } from './category.types'

import { queryClient } from '@/app/App'
import api from '@/shared/api'
import { API_CODE, ApiResponse, PaginationRequest, PaginationResponse } from '@/shared/types'

export interface ListCategoryRequest extends PaginationRequest {
	keyword?: string
}

export type ListCategoryResponse = PaginationResponse<CategoryItem>
export type CreateCategoryRequest = Omit<CategoryItem, 'id'>
export type UpdateCategoryRequest = Partial<Omit<CategoryItem, 'id'>> & {
	id: number
}

export const useGetListCategory = (request: ListCategoryRequest) => {
	return useQuery<ApiResponse<ListCategoryResponse>>({
		queryKey: ['categories', request],
		queryFn: () =>
			api({
				url: '/categories/filter',
				method: 'POST',
				data: request,
			}),
		staleTime: 5 * 60 * 1000,
		placeholderData: keepPreviousData,
	})
}

export const useCreateCategory = () => {
	return useMutation<ApiResponse<null>, Error, CreateCategoryRequest>({
		mutationFn: (data) =>
			api({
				url: '/categories',
				method: 'POST',
				data,
			}),
		onSuccess: (res) => {
			if (res.code === API_CODE.SUCCESS) {
				queryClient.invalidateQueries({ queryKey: ['categories'] })
			}
		},
	})
}

export const useUpdateCategory = () => {
	return useMutation<ApiResponse<null>, Error, UpdateCategoryRequest>({
		mutationFn: ({ id, ...data }) =>
			api({
				url: `/categories/${id}`,
				method: 'PATCH',
				data,
			}),
		onSuccess: (res) => {
			if (res.code === API_CODE.SUCCESS) {
				queryClient.invalidateQueries({ queryKey: ['categories'] })
			}
		},
	})
}

export const useDeleteCategory = () => {
	return useMutation<ApiResponse<null>, Error, number>({
		mutationFn: (id) =>
			api({
				url: `/categories/${id}`,
				method: 'DELETE',
			}),
		onSuccess: (res) => {
			if (res.code === API_CODE.SUCCESS) {
				queryClient.invalidateQueries({ queryKey: ['categories'] })
			}
		},
	})
}
