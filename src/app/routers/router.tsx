import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'

import { authRouter } from '@/features/auth/auth.router'
import categoryRouter from '@/features/category/category.router'
import dashboardRouter from '@/features/dashboard/dashboard.router'
import { homeRouter } from '@/features/home/home.router'

const routes: RouteObject[] = [
	{
		path: '/',
		element: <MainLayout />,
		children: [
			...homeRouter,
			{
				children: [dashboardRouter, categoryRouter],
			},
		],
	},

	authRouter,
]

const router = createBrowserRouter(routes)
export default router
