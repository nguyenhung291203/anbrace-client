import { Box, Card, Grid, Paper, Space, useMantineTheme } from '@mantine/core'
import { Outlet } from 'react-router-dom'

import type { FC } from 'react'

const AuthLayout: FC = () => {
	const theme = useMantineTheme()
	return (
		<Box
			style={{
				height: '100dvh',
				overflow: 'hidden',
			}}
		>
			<Paper
				bg={`linear-gradient(180deg, ${theme.colors.darkBlue[8]} 0%, ${theme.colors.primary[8]} 100%)`}
			>
				<Grid h="100%" m={0} p={0} gutter={0} grow justify="space-between">
					<Grid.Col span={{ base: 12, md: 10, lg: 5 }}>
						<Card padding="xl" radius="md" h="100vh">
							<Space h={100} />
							<Outlet />
						</Card>
					</Grid.Col>
					<Grid.Col span={{ base: 0, md: 0, lg: 7 }} visibleFrom="md"></Grid.Col>
				</Grid>
			</Paper>
		</Box>
	)
}

export default AuthLayout
