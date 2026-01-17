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
	const { user, isAuthenticated } = useAuthStore()

	if (!isAuthenticated || !user) {
		return <Navigate to={redirectTo} replace />
	}

	if (allowedRoles && !allowedRoles.includes(user.role)) {
		return <Navigate to="/403" replace />
	}

	return <Outlet />
}

export default ProtectedRoute
