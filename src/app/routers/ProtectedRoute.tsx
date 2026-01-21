import { Navigate, Outlet } from 'react-router-dom'

import { Role } from '@/features/account/account.types'
import { useAuthStore } from '@/features/auth/auth.store'
import { ROUTE_PATH } from '@/shared/constants/path.constant'

interface ProtectedRouteProps {
	allowedRoles?: Role[]
	redirectTo?: string
}

const ProtectedRoute = ({
	allowedRoles,
	redirectTo = ROUTE_PATH.AUTH.LOGIN,
}: ProtectedRouteProps) => {
	const { role, isAuthenticated, isLoading } = useAuthStore()
	if (isLoading) {
		return <p>Loading...</p>
	}

	if (!isAuthenticated) {
		return <Navigate to={redirectTo} replace />
	}

	if (role && allowedRoles && !allowedRoles.includes(role)) {
		return <Navigate to="/403" replace />
	}

	return <Outlet />
}

export default ProtectedRoute
