import { RouteObject } from 'react-router-dom'

import { ManagerProductPage, ProductDetailPage } from './pages'
import CreateProductPage from './pages/CreateProductPage'

import ProtectedRoute from '@/app/routers/ProtectedRoute'
import { PATH_ITEM, ROUTE_PATH } from '@/shared/constants/path.constant'

const productRouter: RouteObject = {
	children: [
		{
			element: <ProtectedRoute allowedRoles={['ADMIN', 'EMPLOYEE']} />,
			children: [
				{
					path: ROUTE_PATH.ADMIN.MANAGER_PRODUCT,
					element: <ManagerProductPage />,
				},
				{
					path: ROUTE_PATH.ADMIN.CREATE_PRODUCT,
					element: <CreateProductPage />,
				},
			],
		},
		{
			path: PATH_ITEM.PRODUCT.ROOT,
			children: [
				{
					path: PATH_ITEM.PRODUCT.LIST_PRODUCT,
				},
				{
					path: PATH_ITEM.PRODUCT.DETAIL,
					element: <ProductDetailPage />,
				},
			],
		},
	],
}

export default productRouter
