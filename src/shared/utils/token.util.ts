import { get, remove, set } from './storage.util'

const ACCESS_TOKEN_KEY = 'access-token'
const REFRESH_TOKEN_KEY = 'refresh-token'

export const setAccessToken = (token: string | null) => {
	if (!token) return
	set(ACCESS_TOKEN_KEY, token)
}

export const getAccessToken = (): string | null => get<string>(ACCESS_TOKEN_KEY)

export const removeAccessToken = () => remove(ACCESS_TOKEN_KEY)

export const setRefreshToken = (token: string | null) => {
	if (!token) return
	set(REFRESH_TOKEN_KEY, token)
}

export const getRefreshToken = (): string | null => get<string>(REFRESH_TOKEN_KEY)

export const removeRefreshToken = () => remove(REFRESH_TOKEN_KEY)

export const setTokens = (accessToken?: string | null, refreshToken?: string | null) => {
	if (accessToken) setAccessToken(accessToken)
	if (refreshToken) setRefreshToken(refreshToken)
}

export const clearTokens = () => {
	removeAccessToken()
	removeRefreshToken()
}
