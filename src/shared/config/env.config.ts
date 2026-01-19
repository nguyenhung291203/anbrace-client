import get from 'lodash/get'
import isNil from 'lodash/isNil'

const apiBaseUrl = get(import.meta, 'env.VITE_API_BASE_URL')

if (isNil(apiBaseUrl) || apiBaseUrl === '') {
	throw new Error('Missing env: VITE_API_BASE_URL')
}

export const env = {
	BASE_URL: apiBaseUrl,
	TIMEOUT: 10000,
} as const

export default env
