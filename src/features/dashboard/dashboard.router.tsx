import { type RouteObject } from 'react-router-dom'

import DashboardPage from './pages/DashboardPags'

import ProtectedRoute from '@/app/routers/ProtectedRoute'
import { ROUTE_PATH } from '@/shared/path'

const dashboardRouter: RouteObject = {
	element: <ProtectedRoute allowedRoles={['ADMIN', 'EMPLOYEE']} />,
	children: [
		{
			path: ROUTE_PATH.ADMIN.DASHBOARD,
			element: <DashboardPage />,
		},
	],
}

export default dashboardRouter
