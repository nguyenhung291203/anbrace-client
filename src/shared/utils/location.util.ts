/**
 * Lấy path hiện tại từ trình duyệt.
 */
export const getCurrentPath = (): string => {
	return window.location.pathname
}

/**
 * Kiểm tra path hiện tại có trùng hoặc bắt đầu với path chỉ định không.
 */
export const isCurrentPathActive = (pathToCheck: string | undefined): boolean => {
	if (!pathToCheck) return false

	const currentPath = getCurrentPath()

	if (pathToCheck === '/') {
		return currentPath === '/'
	}

	return currentPath === pathToCheck || currentPath.startsWith(`${pathToCheck}/`)
}

/**
 * Kiểm tra path hiện tại có nằm trong danh sách paths không.
 */
export const isCurrentPathOneOf = (paths: string[]): boolean => {
	const currentPath = getCurrentPath()
	return paths.some((path) => currentPath === path || currentPath.startsWith(`${path}/`))
}

/**
 * Lấy tất cả các segment của path hiện tại (loại bỏ dấu `/`).
 * Ví dụ: "/products/123/edit" => ["products", "123", "edit"]
 */
export const getPathSegments = (): string[] => {
	return getCurrentPath().split('/').filter(Boolean)
}

/**
 * Lấy segment đầu tiên trong path hiện tại.
 * Ví dụ: "/products/123" => "products"
 */
export const getFirstPathSegment = (): string => {
	return getPathSegments()[0] || ''
}

/**
 * Lấy segment tại vị trí index (nếu có).
 * Ví dụ: index = 1, "/products/123" => "123"
 */
export const getPathSegmentAt = (index: number): string | null => {
	const segments = getPathSegments()
	return segments[index] || null
}
