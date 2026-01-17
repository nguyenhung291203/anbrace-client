import { ActionIcon, Center, NavLink, rem, Stack, useMantineTheme } from '@mantine/core'
import { useMemo, type FC, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuthStore } from '@/features/auth/auth.store'
import { MENU_BY_ROLE, PUBLIC_MENU } from '@/shared/constants/menu.constant'
import { useLayoutStore } from '@/shared/stores/main-layout.store'
import { isCurrentPathActive } from '@/shared/utils/location.util'

export interface MenuItem {
	label: string
	to?: string
	icon?: ReactNode
	children?: MenuItem[]
}

const MenuNavbar: FC = () => {
	const theme = useMantineTheme()

	const navigate = useNavigate()
	const { user } = useAuthStore()

	const { opened, toggleNavbar } = useLayoutStore()

	const menuList = useMemo(() => {
		const menu = user ? MENU_BY_ROLE[user.role] : PUBLIC_MENU

		return menu.map((item) => ({
			...item,
			icon: item.icon ? <span style={{ fontSize: theme.fontSizes.xl }}>{item.icon}</span> : null,
		}))
	}, [user, theme.fontSizes])

	const renderMenu = (menu: MenuItem[]) =>
		menu.map((item) => {
			const leftIcon = item.icon ? (
				<ActionIcon
					variant={isCurrentPathActive(item.to) ? 'transparent' : 'light'}
					size={36}
					radius="sm"
				>
					{item.icon}
				</ActionIcon>
			) : undefined

			const commonProps = {
				leftSection: leftIcon,
				variant: 'light' as const,
				color: 'primary.8' as const,
				c: 'neutral' as const,
				fz: 'lg' as const,
				fw: 600,
				style: {
					borderRadius: theme.radius.sm,
					justifyContent: opened ? 'flex-start' : 'center',
					paddingLeft: opened ? undefined : rem(4),
					paddingRight: opened ? undefined : rem(4),
				},
			}

			if (item.to) {
				return (
					<NavLink
						key={item.label}
						label={opened ? item.label : undefined}
						component={Link}
						to={item.to}
						active={isCurrentPathActive(item.to)}
						{...commonProps}
					/>
				)
			}

			return (
				<NavLink
					key={item.label}
					label={opened ? item.label : undefined}
					active={item.children?.some((c) => isCurrentPathActive(c.to))}
					{...commonProps}
				/>
			)
		})

	const renderMenuLite = (menu: MenuItem[]) =>
		menu.map((item) => {
			const isActive =
				isCurrentPathActive(item.to) || item.children?.some((i) => isCurrentPathActive(i.to))

			const handleClick = () => {
				if (item.children) {
					toggleNavbar()
					return
				}
				if (item.to) navigate(item.to)
			}

			return (
				<Center key={item.label}>
					<ActionIcon
						variant={isActive ? 'light' : 'transparent'}
						w={60}
						h={60}
						radius="md"
						onClick={handleClick}
					>
						{item.icon}
					</ActionIcon>
				</Center>
			)
		})

	return (
		<Stack p="sm" gap="xs">
			{opened ? renderMenu(menuList) : renderMenuLite(menuList)}
		</Stack>
	)
}

export default MenuNavbar
