import { type RouteObject } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

import { PATH_ITEM } from '@/shared/constants/path.constant'

export const authRouter: RouteObject = {
	path: PATH_ITEM.AUTH.ROOT,
	element: <AuthLayout />,
	children: [
		{
			path: PATH_ITEM.AUTH.LOGIN,
			element: <LoginPage />,
		},

		{
			path: PATH_ITEM.AUTH.REGISTER,
			element: <RegisterPage />,
		},
	],
}
