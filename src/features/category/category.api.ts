import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { CategoryItem } from './category.types'

import api from '@/shared/api'
import { ApiResponse, PaginationRequest, PaginationResponse } from '@/shared/types'

export interface ListCategoryRequest extends PaginationRequest {
	keyword?: string
}

export type ListCategoryResponse = PaginationResponse<CategoryItem>

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
