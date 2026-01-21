import {
	Box,
	Checkbox,
	Grid,
	Group,
	Input,
	Pagination,
	RangeSlider,
	Select,
	SimpleGrid,
	Stack,
	Text,
	Title,
	UnstyledButton,
	useMantineTheme,
} from '@mantine/core'
import { IconChevronDown, IconSearch } from '@tabler/icons-react'
import { FC, useState } from 'react'

import FilterSectionHeader from '../components/FilterSectionHeader'
import ProductCard from '../components/ProductCard'
import { MOCK_PRODUCTS } from '../mock'
import { BRACELET_SIZES } from '../product.constant'

import { useGetListCategory } from '@/features/category/category.api'
import ContentPage from '@/shared/components/ContentPage'
import TitlePage from '@/shared/components/TitlePage'
import { API_CODE } from '@/shared/types'

const PRICE_MIN = 0
const PRICE_MAX = 5_000_000
const ListProductPage: FC = () => {
	const theme = useMantineTheme()
	const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX])
	const [selectedSizes, setSelectedSizes] = useState<string[]>([])

	const toggleSize = (size: string) => {
		setSelectedSizes((prev) =>
			prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
		)
	}
	const { data, isLoading } = useGetListCategory({
		pageNo: 1,
		pageSize: 5,
	})
	const success = data?.code === API_CODE.SUCCESS
	const categories = data?.result.items ?? []
	return (
		<Stack>
			<TitlePage title="Danh sách sản phẩm" />
			<ContentPage>
				<Grid>
					<Grid.Col span={2}>
						<Stack>
							<Stack gap={0}>
								<FilterSectionHeader title="Giá sản phẩm" />
								<Stack px="md" py="sm" gap="xs">
									<RangeSlider
										min={PRICE_MIN}
										max={PRICE_MAX}
										step={50_000}
										value={priceRange}
										onChange={setPriceRange}
									/>

									<Group justify="space-between">
										<Text size="sm">{priceRange[0].toLocaleString()} ₫</Text>
										<Text size="sm">{priceRange[1].toLocaleString()} ₫</Text>
									</Group>
								</Stack>
							</Stack>
							<Stack gap={0}>
								<FilterSectionHeader title="Loại" />
								<Stack py="sm" gap="xs">
									<Input
										rightSection={<IconSearch size={14} />}
										radius="sm"
										placeholder="Tìm kiếm theo danh mục"
									/>
									<Stack px="xs" gap="sm">
										{categories.map((category) => (
											<Checkbox key={category.id} label={category.name} />
										))}
									</Stack>
								</Stack>
							</Stack>
							<Stack gap={0}>
								<FilterSectionHeader title="Size vòng tay" />

								<Box px="xs" py="sm">
									<Group gap="xs">
										{BRACELET_SIZES.map((size) => {
											const active = selectedSizes.includes(size)

											return (
												<UnstyledButton
													key={size}
													onClick={() => toggleSize(size)}
													style={{
														width: 40,
														height: 40,
														borderRadius: '50%',
														border: active
															? `2px solid ${theme.colors[theme.primaryColor][6]}`
															: `1px solid ${theme.colors.gray[4]}`,
														background: active ? theme.colors[theme.primaryColor][0] : theme.white,
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'center',
														fontWeight: 600,
														fontSize: 14,
														color: active
															? theme.colors[theme.primaryColor][7]
															: theme.colors.dark[6],
														transition: 'all 0.2s ease',
													}}
												>
													{size}
												</UnstyledButton>
											)
										})}
									</Group>
								</Box>
							</Stack>
						</Stack>
					</Grid.Col>
					<Grid.Col span={10}>
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
									rightSection={<IconChevronDown size={14} />}
								/>
							</Group>

							<SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} spacing="md">
								{MOCK_PRODUCTS.slice(0, 8).map((product) => (
									<ProductCard key={product.id} product={product} />
								))}
							</SimpleGrid>

							<Pagination size="lg" total={10} mx="auto" mt="lg" />
						</Stack>
					</Grid.Col>
				</Grid>
			</ContentPage>
		</Stack>
	)
}

export default ListProductPage
