import {
	Grid,
	Group,
	Pagination,
	RangeSlider,
	Select,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { IconChevronDown } from '@tabler/icons-react'
import { FC, useState } from 'react'

import BraceletSizeFilter from '../components/BraceletSizeFilter'
import FilterSectionHeader from '../components/FilterSectionHeader'
import ProductCard from '../components/ProductCard'
import { ListProductRequest, useGetListProduct } from '../product.api'

import CategoryFacet from '@/features/category/components/CategoryFacet'
import ContentPage from '@/shared/components/ContentPage'
import DataWrapper from '@/shared/components/DataWrapper'
import TitlePage from '@/shared/components/TitlePage'
import { API_CODE } from '@/shared/types'

const PRICE_MIN = 0
const PRICE_MAX = 5_000_000
const ListProductPage: FC = () => {
	const [pagination, setPagination] = useState<ListProductRequest>({
		pageNo: 1,
		pageSize: 10,
		categoryIds: [],
		minPrice: PRICE_MIN,
		maxPrice: PRICE_MAX,
		sizes: [],
		orders: {},
	})
	const [debouncedPagination] = useDebouncedValue(pagination, 300)
	const { data, isFetching } = useGetListProduct(debouncedPagination)
	const success = data?.code === API_CODE.SUCCESS
	const totalPages = data?.result?.totalPages || 0
	const products = data?.result?.items || []

	const handleChangePage = (pageNo: number) => {
		setPagination((prev) => ({
			...prev,
			pageNo,
		}))
	}

	const handleSortChange = (value: string | null) => {
		let orders: ListProductRequest['orders'] = {}

		switch (value) {
			case 'price_asc':
				orders = { price: 'asc' }
				break
			case 'price_desc':
				orders = { price: 'desc' }
				break
			case 'name_asc':
				orders = { name: 'asc' }
				break
			case 'name_desc':
				orders = { name: 'desc' }
				break
			case 'newest':
				orders = { createdAt: 'desc' }
				break
			case 'best_seller':
				orders = { sold: 'desc' }
				break
			default:
				orders = {}
		}

		setPagination((prev) => ({
			...prev,
			pageNo: 1,
			orders,
		}))
	}

	return (
		<Stack>
			<TitlePage title="Danh sách sản phẩm" />
			<ContentPage>
				<Grid>
					<Grid.Col span={3}>
						<Stack>
							<Stack gap={0}>
								<FilterSectionHeader title="Giá sản phẩm" />
								<Stack px="md" py="sm" gap="xs">
									<RangeSlider
										min={PRICE_MIN}
										max={PRICE_MAX}
										step={50_000}
										value={[pagination.minPrice!, pagination.maxPrice!]}
										onChange={([min, max]) =>
											setPagination((prev) => ({
												...prev,
												pageNo: 1,
												minPrice: min,
												maxPrice: max,
											}))
										}
									/>

									<Group justify="space-between">
										<Text size="sm">{pagination.minPrice!.toLocaleString()} ₫</Text>
										<Text size="sm">{pagination.maxPrice!.toLocaleString()} ₫</Text>
									</Group>
								</Stack>
							</Stack>
							<CategoryFacet
								selectedCategoryIds={pagination.categoryIds}
								onChange={(ids) =>
									setPagination((prev) => ({
										...prev,
										pageNo: 1,
										categoryIds: ids,
									}))
								}
							/>
							<BraceletSizeFilter
								value={pagination.sizes}
								onChange={(sizes) =>
									setPagination((prev) => ({
										...prev,
										pageNo: 1,
										sizes,
									}))
								}
							/>
						</Stack>
					</Grid.Col>
					<Grid.Col span={9}>
						<Stack>
							<Group>
								<Title order={3} fw={600} fz="lg">
									Tất cả sản phẩm
								</Title>
								<Select
									ml={'auto'}
									w={250}
									label="Sắp xếp:"
									placeholder="Chọn cách sắp xếp"
									withCheckIcon={false}
									data={[
										{ value: 'default', label: 'Mặc định' },
										{ value: 'price_asc', label: 'Giá: Thấp → Cao' },
										{ value: 'price_desc', label: 'Giá: Cao → Thấp' },
										{ value: 'name_asc', label: 'Tên: A → Z' },
										{ value: 'name_desc', label: 'Tên: Z → A' },
										{ value: 'newest', label: 'Mới nhất' },
										{ value: 'best_seller', label: 'Bán chạy nhất' },
									]}
									onChange={handleSortChange}
									rightSection={<IconChevronDown size={14} />}
								/>
							</Group>

							<DataWrapper success={success} loading={isFetching}>
								{products.length === 0 && (
									<Text c="dimmed" ta="center" mt="md">
										Không có sản phẩm nào
									</Text>
								)}
								<SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 4, xl: 6 }} spacing="md">
									{products.map((product) => (
										<ProductCard key={product.id} product={product} />
									))}
								</SimpleGrid>
							</DataWrapper>

							{totalPages > 1 && (
								<Pagination
									size="lg"
									value={pagination.pageNo}
									total={totalPages}
									mx="auto"
									mt="lg"
									onChange={handleChangePage}
								/>
							)}
						</Stack>
					</Grid.Col>
				</Grid>
			</ContentPage>
		</Stack>
	)
}

export default ListProductPage
