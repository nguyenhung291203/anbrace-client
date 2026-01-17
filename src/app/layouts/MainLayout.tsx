import { AppShell, Stack } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import AccountInfo from './AccountInfo'
import Header from './Header'
import HeaderNavbar from './HeaderNavbar'
import MenuNavbar from './MenuNavbar'
import { useLayoutStore } from '../../shared/stores/main-layout.store'

const MainLayout = () => {
	const { opened, navbarWidth, headerHeight, openNavbar, closeNavbar } = useLayoutStore()

	const isSmall = useMediaQuery('(max-width: 992px)')
	const isMobile = useMediaQuery('(max-width: 767px)')

	useEffect(() => {
		if (isSmall) {
			closeNavbar()
		} else {
			openNavbar()
		}
	}, [isSmall, openNavbar, closeNavbar])

	return (
		<AppShell
			navbar={{
				width: navbarWidth,
				breakpoint: 'sm',
				collapsed: { mobile: !opened },
			}}
			padding="md"
		>
			{!isMobile && (
				<AppShell.Navbar
					style={{
						transition: 'width 300ms ease',
						height: '100vh',
					}}
				>
					<Stack h="100vh" justify="space-between">
						<Stack gap={0}>
							<HeaderNavbar />
							<MenuNavbar />
						</Stack>
						<AccountInfo />
					</Stack>
				</AppShell.Navbar>
			)}

			<AppShell.Main style={{ background: '#F3F4F6' }}>
				<Stack
					h={headerHeight}
					justify="space-between"
					style={(theme) => ({
						borderBottom: `1px solid ${theme.colors.gray[3]}`,
						marginTop: -24,
						marginLeft: -24,
						marginRight: -24,
						background: 'white',
						position: 'sticky',
						top: 0,
						zIndex: 2,
					})}
				>
					<Header />
				</Stack>

				<Stack pt={24}>
					<Outlet />
				</Stack>
			</AppShell.Main>
		</AppShell>
	)
}

export default MainLayout
