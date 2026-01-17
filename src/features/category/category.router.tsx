import { RouteObject } from 'react-router-dom'

import ManagerCategoryPage from './pages/ManagerCategoryPage'

import ProtectedRoute from '@/app/routers/ProtectedRoute'
import { ROUTE_PATH } from '@/shared/path'

const categoryRouter: RouteObject = {
	element: <ProtectedRoute allowedRoles={['ADMIN', 'EMPLOYEE']} />,
	children: [
		{
			path: ROUTE_PATH.ADMIN.MANAGER_CATEGORY,
			element: <ManagerCategoryPage />,
		},
	],
}

export default categoryRouter
