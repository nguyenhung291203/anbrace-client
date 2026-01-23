import env from '../config/env.config'

export const getPreviewUrl = (file?: File) => {
	if (!file) return null
	return URL.createObjectURL(file)
}

export const getImageFromServer = (imagePath: string | null) => {
	if (!imagePath) return null
	return `${env.BASE_URL}${imagePath}`
}
