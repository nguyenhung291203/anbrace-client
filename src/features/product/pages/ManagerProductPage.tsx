import { Button, Group, Pagination, Stack, useMantineTheme } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

import ListProduct from '../components/ListProduct'
import { useGetListProduct } from '../product.api'

import ContentPage from '@/shared/components/ContentPage'
import DataWrapper from '@/shared/components/DataWrapper'
import TitlePage from '@/shared/components/TitlePage'
import { PATH_ITEM, ROUTE_PATH } from '@/shared/constants/path.constant'
import { API_CODE } from '@/shared/types'

const ManagerProductPage = () => {
	const theme = useMantineTheme()
	const navigate = useNavigate()
	const { data, isFetching } = useGetListProduct({ pageNo: 1, pageSize: 10 })
	const success = data?.code === API_CODE.SUCCESS
	const products = data?.result.items || []
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
					<DataWrapper success={success} loading={isFetching}>
						<ListProduct
							products={products}
							onDetail={(p) => {
								navigate(`${`/${PATH_ITEM.PRODUCT.ROOT}/${p.id}`}`)
							}}
							onEdit={(p) => {
								navigate(`${`/${PATH_ITEM.ADMIN.ROOT}//${PATH_ITEM.ADMIN.UPDATE_PRODUCT}/${p.id}`}`)
							}}
						/>
					</DataWrapper>

					<Pagination total={10} ml="auto" />
				</ContentPage>
			</Stack>
		</>
	)
}

export default ManagerProductPage
