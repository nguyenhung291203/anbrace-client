import { notifications } from '@mantine/notifications'
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import env from './config/env.config'
import { ApiError, ApiResponse, BaseQueryArgs } from './types'
import { getAccessToken } from './utils/token.util'

const axiosInstance: AxiosInstance = axios.create({
	baseURL: env.BASE_URL,
	timeout: env.TIMEOUT,
	withCredentials: true,
})

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = getAccessToken()
	if (token) config.headers.Authorization = `Bearer ${token}`
	return config
})

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: AxiosError) => {
		if (error.code === 'ECONNABORTED') {
			notifications.show({
				title: 'Lỗi kết nối',
				message: 'Yêu cầu mất quá nhiều thời gian. Vui lòng thử lại sau.',
				color: 'red',
				autoClose: 4000,
			})

			return Promise.reject(
				new ApiError('Yêu cầu mất quá nhiều thời gian. Vui lòng thử lại sau.', 'TIMEOUT_ERROR'),
			)
		}

		if (error.message === 'Network Error') {
			notifications.show({
				title: 'Lỗi mạng',
				message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng của bạn.',
				color: 'red.5',
				autoClose: 4000,
			})

			return Promise.reject(
				new ApiError(
					'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng của bạn.',
					'NETWORK_ERROR',
				),
			)
		}

		if (error.response?.status && error.response.status >= 500) {
			notifications.show({
				title: 'Lỗi máy chủ',
				message: 'Đã xảy ra sự cố trên máy chủ. Vui lòng thử lại sau.',
				color: 'red.5',
				autoClose: 4000,
			})

			return Promise.reject(new ApiError('Lỗi máy chủ', 'SERVER_ERROR', error.response.status))
		}
	},
)

const api = async <T>({
	url,
	method,
	data,
	params,
	headers,
}: BaseQueryArgs): Promise<ApiResponse<T>> => {
	const response = await axiosInstance({
		url,
		method,
		data,
		params,
		headers,
	})
	return response.data as ApiResponse<T>
}

export default api
