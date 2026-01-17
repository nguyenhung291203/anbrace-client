import { Button, Group, Pagination, Stack, useMantineTheme } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

import ListProduct from '../components/ListProduct'
import { MOCK_PRODUCTS } from '../mock'

import ContentPage from '@/shared/components/ContentPage'
import TitlePage from '@/shared/components/TitlePage'
import { PATH_ITEM, ROUTE_PATH } from '@/shared/constants/path.constant'

const ManagerProductPage = () => {
	const theme = useMantineTheme()
	const navigate = useNavigate()
	return (
		<>
			<Stack>
				<Group w="100%" justify="space-between">
					<TitlePage title="Danh sách sản phẩm" />
					<Button
						radius="sm"
						leftSection={<IconPlus size={theme.fontSizes.lg} />}
						onClick={() => {
							navigate(ROUTE_PATH.ADMIN.CREATE_PRODUCT)
						}}
					>
						Thêm mới sản phẩm
					</Button>
				</Group>
				<ContentPage>
					<ListProduct
						products={MOCK_PRODUCTS}
						onDetail={(p) => {
							navigate(`${`/${PATH_ITEM.PRODUCT.ROOT}/${p.id}`}`)
						}}
					/>
					<Pagination total={10} ml="auto" />
				</ContentPage>
			</Stack>
		</>
	)
}

export default ManagerProductPage
