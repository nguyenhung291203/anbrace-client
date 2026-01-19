type StorageValue = string | number | boolean | object | null

export const set = (key: string, value: StorageValue) => {
	try {
		const storedValue = typeof value === 'object' && value !== null ? JSON.stringify(value) : value
		localStorage.setItem(key, storedValue as string)
	} catch (error) {
		console.error(`Lỗi khi lưu "${key}" vào localStorage:`, error)
	}
}

export const get = <T extends StorageValue>(key: string): T | null => {
	try {
		const item = localStorage.getItem(key)
		if (!item) return null
		try {
			return JSON.parse(item) as T
		} catch {
			return item as unknown as T
		}
	} catch (error) {
		console.error(`Lỗi khi đọc "${key}" từ localStorage:`, error)
		return null
	}
}

export const remove = (key: string) => {
	try {
		localStorage.removeItem(key)
	} catch (error) {
		console.error(`Lỗi khi xóa "${key}" từ localStorage:`, error)
	}
}

export const clear = () => {
	try {
		localStorage.clear()
	} catch (error) {
		console.error('Lỗi khi clear localStorage:', error)
	}
}
