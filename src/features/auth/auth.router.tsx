import { type RouteObject } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import LoginPage from './pages/LoginPage'
import { PATH_ITEM } from '../../shared/path'

export const authRouter: RouteObject = {
	path: PATH_ITEM.AUTH.ROOT,
	element: <AuthLayout />,
	children: [
		{
			path: PATH_ITEM.AUTH.LOGIN,
			element: <LoginPage />,
		},
	],
}
