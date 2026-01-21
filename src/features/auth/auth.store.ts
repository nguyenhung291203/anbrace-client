import { create } from 'zustand'

import type { AccountItem, Role } from '../account/account.types'

import { getAccessToken } from '@/shared/utils/token.util'

interface AuthState {
	user: AccountItem | null
	isAuthenticated: boolean
	isLoading: boolean
	role: Role | null

	setUser: (user: AccountItem) => void
	logout: () => void
	setLoading: (loading: boolean) => void
	setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	isAuthenticated: !!getAccessToken(),
	isLoading: false,
	role: null,

	setUser: (user) =>
		set({
			user,
			role: user.role,
			isAuthenticated: true,
		}),

	logout: () =>
		set({
			user: null,
			isAuthenticated: false,
		}),

	setLoading: (loading) =>
		set({
			isLoading: loading,
		}),
	setIsAuthenticated: (isAuthenticated) =>
		set({
			isAuthenticated,
		}),
}))
