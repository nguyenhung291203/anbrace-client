import { Breadcrumbs, Text } from '@mantine/core'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'

import { PATH_ITEM } from '@/shared/constants/path.constant'

const BreadcrumbHeader: FC = () => {
	const location = useLocation()
	const pathnames = location.pathname.split('/').filter(Boolean)

	const displayNameBreadcrumb = (path: string) => {
		switch (path) {
			case PATH_ITEM.HOME.ROOT:
				return 'Trang chủ'
			case PATH_ITEM.ADMIN.MANAGER_CATEGORY:
				return 'Quản lý danh mục'
			case PATH_ITEM.ADMIN.MANAGER_PRODUCT:
				return 'Quản lý sản phẩm'
			case PATH_ITEM.ADMIN.CREATE_PRODUCT:
				return 'Thêm mới sản phẩm'
			case PATH_ITEM.ADMIN.UPDATE_PRODUCT:
				return 'Cập nhật sản phẩm'
			case PATH_ITEM.PRODUCT.ROOT:
				return 'Sản phẩm'
			case PATH_ITEM.PRODUCT.LIST_PRODUCT:
				return 'Danh sách sản phẩm'
			default:
				return undefined
		}
	}

	const items = pathnames.map((segment, index) => {
		const to = `/${pathnames.slice(0, index + 1).join('/')}`
		const label = displayNameBreadcrumb(segment)

		if (!label) return null

		return (
			<Text c="gray" key={to} style={{ textTransform: 'capitalize' }}>
				{label}
			</Text>
		)
	})

	return (
		<Breadcrumbs separator="›" mt={4}>
			<Text c="gray" fw={500}>
				Tổng quan
			</Text>
			{items}
		</Breadcrumbs>
	)
}

export default BreadcrumbHeader
