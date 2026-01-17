import { create } from 'zustand'

import type { AccountItem } from '../account/account.types'

interface AuthState {
	user: AccountItem | null
	isAuthenticated: boolean
	isLoading: boolean

	login: (user: AccountItem) => void
	logout: () => void
	setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	isAuthenticated: false,
	isLoading: false,

	login: (user) =>
		set({
			user,
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
}))
