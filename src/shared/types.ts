export type Mode = 'DETAIL' | 'UPDATE' | 'CREATE' | 'DELETE' | null
import { AxiosRequestConfig } from 'axios'
export type FailedQueueItem = {
	resolve: (value: string) => void
	reject: (error: unknown) => void
}
export interface BaseQueryArgs {
	url: string
	method: AxiosRequestConfig['method']
	data?: AxiosRequestConfig['data']
	params?: AxiosRequestConfig['params']
	headers?: AxiosRequestConfig['headers']
}

export interface ApiResponse<T> {
	code: string
	message: string
	result: T
}

export class ApiError extends Error {
	code?: string
	status?: number

	constructor(message: string, code?: string, status?: number) {
		super(message)
		this.name = 'ApiError'
		this.code = code
		this.status = status
	}
}
