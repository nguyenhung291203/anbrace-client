export const getPreviewUrl = (file?: File) => {
	if (!file) return null
	return URL.createObjectURL(file)
}
