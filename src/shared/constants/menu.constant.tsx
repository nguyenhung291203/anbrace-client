import {
	IconHome,
	IconDiamond,
	IconPalette,
	IconAdjustments,
	IconInfoCircle,
	IconPhone,
	IconUsers,
	IconSettings,
	IconBriefcase,
	ReactNode,
	IconLogin,
	IconUserPlus,
	IconCategory,
} from '@tabler/icons-react'

import { ROUTE_PATH } from '../path'

import { Role } from '@/features/account/account.types'

interface MenuItem {
	label: string
	to: string
	icon: ReactNode
}

export const PUBLIC_MENU: MenuItem[] = [
	{
		label: 'Trang chủ',
		to: '/',
		icon: <IconHome />,
	},
	{
		label: 'Vòng tay',
		to: '/bracelets',
		icon: <IconDiamond />,
	},
	{
		label: 'Bộ sưu tập',
		to: '/collections',
		icon: <IconPalette />,
	},
	{
		label: 'Về AnBrace',
		to: '/about',
		icon: <IconInfoCircle />,
	},
	{
		label: 'Liên hệ',
		to: '/contact',
		icon: <IconPhone />,
	},
	{
		label: 'Đăng nhập',
		to: ROUTE_PATH.AUTH.LOGIN,
		icon: <IconLogin />,
	},
	{
		label: 'Đăng ký',
		to: ROUTE_PATH.AUTH.REGISTER,
		icon: <IconUserPlus />,
	},
]
export const MENU_BY_ROLE: Record<Role, MenuItem[]> = {
	CLIENT: [
		{
			label: 'Trang chủ',
			to: '/',
			icon: <IconHome />,
		},
		{
			label: 'Vòng tay',
			to: '/bracelets',
			icon: <IconDiamond />,
		},
		{
			label: 'Bộ sưu tập',
			to: '/collections',
			icon: <IconPalette />,
		},
		{
			label: 'Cá nhân hoá',
			to: '/customize',
			icon: <IconAdjustments />,
		},
		{
			label: 'Về AnBrace',
			to: '/about',
			icon: <IconInfoCircle />,
		},
		{
			label: 'Liên hệ',
			to: '/contact',
			icon: <IconPhone />,
		},
	],

	EMPLOYEE: [
		{
			label: 'Trang chủ',
			to: '/',
			icon: <IconHome />,
		},
		{
			label: 'Đơn hàng',
			to: '/orders',
			icon: <IconBriefcase />,
		},
		{
			label: 'Khách hàng',
			to: '/customers',
			icon: <IconUsers />,
		},
	],

	ADMIN: [
		{
			label: 'Dashboard',
			to: ROUTE_PATH.ADMIN.DASHBOARD,
			icon: <IconHome />,
		},
		{
			label: 'Quản lý người dùng',
			to: '/admin/users',
			icon: <IconUsers />,
		},
		{
			label: 'Quản lý danh mục',
			to: ROUTE_PATH.ADMIN.MANAGER_CATEGORY,
			icon: <IconCategory />,
		},
		{
			label: 'Cấu hình hệ thống',
			to: '/admin/settings',
			icon: <IconSettings />,
		},
	],
}
