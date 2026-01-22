import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import '@mantine/core/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/notifications/styles.css'

import router from './routers/router'
import theme from './theme'

import './index.css'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
})

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider theme={theme}>
				<RouterProvider router={router} />
				<Notifications />
			</MantineProvider>
		</QueryClientProvider>
	)
}
