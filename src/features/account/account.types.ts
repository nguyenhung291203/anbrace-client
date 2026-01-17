export type Gender = 'MALE' | 'FEMALE' | 'OTHER'

export interface AccountItem {
	id: number
	email: string
	phoneNumber: string
	fullName: string
	gender: Gender
	imageUrl: string
}
