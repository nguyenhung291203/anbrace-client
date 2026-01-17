import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'

import { authRouter } from '@/features/auth/auth.router'
import { homeRouter } from '@/features/home/home.router'
import { PATH_ITEM } from '@/shared/path'

const routes: RouteObject[] = [
	{
		path: '/',
		element: <MainLayout />,
		children: [...homeRouter],
	},
	{
		path: PATH_ITEM.ADMIN.ROOT,
		children: [],
	},
	authRouter,
]

const router = createBrowserRouter(routes)
export default router
