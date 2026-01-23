import { Grid, Stack, Title } from '@mantine/core'
import { memo, useMemo } from 'react'

import ProductCard from '../components/ProductCard'
import { useGetListProduct } from '../product.api'
import { PRODUCT_CARD_VARIANT } from '../product.types'

import DataWrapper from '@/shared/components/DataWrapper'
import { API_CODE } from '@/shared/types'

interface RelatedProductsProps {
	categoryId: number
	productId: number
}

const RelatedProducts = ({ categoryId, productId }: RelatedProductsProps) => {
	const { data, isFetching } = useGetListProduct({
		pageNo: 1,
		pageSize: 6,
		categoryIds: [categoryId],
	})
	const success = data?.code === API_CODE.SUCCESS
	const products = useMemo(() => {
		const items = data?.result.items || []
		if (items.length === 0) {
			return []
		}
		return items.filter((product) => product.id !== productId) || []
	}, [data, productId])
	return (
		<Stack gap="sm">
			<Title order={3} fw={600} fz="lg">
				Sản phẩm liên quan
			</Title>

			<DataWrapper success={success} loading={isFetching}>
				<Grid gutter="md">
					{products.map((product) => (
						<Grid.Col key={product.id} span={{ base: 12, xs: 6, sm: 6, md: 4, lg: 3, xl: 2 }}>
							<ProductCard product={product} variant={PRODUCT_CARD_VARIANT.V2} />
						</Grid.Col>
					))}
				</Grid>
			</DataWrapper>
		</Stack>
	)
}

export default memo(RelatedProducts)
