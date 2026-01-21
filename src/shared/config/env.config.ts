import { get } from 'lodash'

const env = {
	BASE_URL: get(import.meta, 'env.VITE_BASE_URL', 'http://localhost:3000/api/v1'),
	TIMEOUT: get(import.meta, 'env.VITE_TIMEOUT', 60000),
} as const

export default env
