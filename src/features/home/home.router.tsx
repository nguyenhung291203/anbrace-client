import { type RouteObject } from 'react-router-dom'

import HomePage from './pages/HomePage'
import { ROUTE_PATH } from '../../shared/constants/path.constant'

export const homeRouter: RouteObject[] = [
	{
		path: ROUTE_PATH.HOME,
		element: <HomePage />,
	},
]
