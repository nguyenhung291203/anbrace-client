export type Gender = 'MALE' | 'FEMALE' | 'OTHER'

export type Role = 'CLIENT' | 'ADMIN' | 'EMPLOYEE'

export interface AccountItem {
	id: number
	email: string
	phoneNumber: string
	fullName: string
	gender: Gender
	imageUrl: string
	role: Role
}
