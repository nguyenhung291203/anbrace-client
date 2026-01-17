import { FC } from 'react'

import { useAuthStore } from '@/features/auth/auth.store'

const DashboardPage: FC = () => {
	const { user } = useAuthStore()
	console.log({ user })
	return <h1>this is DashboardPage</h1>
}

export default DashboardPage
