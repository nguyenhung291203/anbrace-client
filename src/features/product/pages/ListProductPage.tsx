import { Grid, Pagination, Stack } from '@mantine/core'
import { FC } from 'react'

import ProductCard from '../components/ProductCard'
import { MOCK_PRODUCTS } from '../mock'

import ContentPage from '@/shared/components/ContentPage'
import TitlePage from '@/shared/components/TitlePage'

const ListProductPage: FC = () => {
	return (
		<Stack>
			<TitlePage title="Danh sách sản phẩm" />
			<ContentPage>
				<Stack>
					<Grid gutter="md">
						{MOCK_PRODUCTS.splice(0, 8).map((product) => (
							<Grid.Col key={product.id} span={{ base: 12, xs: 6, sm: 6, md: 4, lg: 3 }}>
								<ProductCard product={product} />
							</Grid.Col>
						))}
					</Grid>
					<Pagination total={10} ml="auto" />
				</Stack>
			</ContentPage>
		</Stack>
	)
}

export default ListProductPage
