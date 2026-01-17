import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'

import { authRouter } from '@/features/auth/auth.router'
import { homeRouter } from '@/features/home/home.router'

const routes: RouteObject[] = [
	{
		path: '/',
		element: <MainLayout />,
		children: [...homeRouter],
	},
	authRouter,
]

const router = createBrowserRouter(routes)
export default router
