import { useMutation, useQuery } from '@tanstack/react-query'

import { AccountItem } from '../account/account.types'

import api from '@/shared/api'
import { ApiResponse } from '@/shared/types'

export interface LoginRequest {
	email: string
	password: string
}

export interface LoginResponse {
	accessToken: string
	refereshToken: string
}

export const useLogin = () =>
	useMutation<ApiResponse<LoginResponse>, Error, LoginRequest>({
		mutationFn: (data) =>
			api({
				url: '/auth/login',
				method: 'POST',
				data,
			}),
	})

export const useGetMe = (enabled = true) => {
	return useQuery<ApiResponse<AccountItem>>({
		queryKey: ['/auth/me'],
		queryFn: () =>
			api({
				url: '/auth/me',
				method: 'GET',
			}),
		staleTime: 5 * 60 * 1000,
		enabled,
	})
}

export const useLogout = () =>
	useMutation<ApiResponse<null>, Error, void>({
		mutationFn: () =>
			api({
				url: '/auth/logout',
				method: 'POST',
			}),
	})
