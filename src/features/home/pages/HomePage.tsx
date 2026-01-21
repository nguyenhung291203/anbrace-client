import {
	Box,
	Divider,
	Grid,
	Paper,
	SimpleGrid,
	Skeleton,
	Space,
	Stack,
	Tabs,
	Text,
	Title,
} from '@mantine/core'
import { useEffect, useState, type FC } from 'react'

import { PRODUCT_OVERVIEW_TABS } from '../home.constant'

import { useGetListCategory } from '@/features/category/category.api'
import { CategoryItem } from '@/features/category/category.types'
import ProductCard from '@/features/product/components/ProductCard'
import { MOCK_PRODUCTS } from '@/features/product/mock'
import { PRODUCT_CARD_VARIANT } from '@/features/product/product.types'
import ContentPage from '@/shared/components/ContentPage'
import { API_CODE, ITab } from '@/shared/types'

const HomePage: FC = () => {
	const { data, isLoading } = useGetListCategory({
		pageNo: 1,
		pageSize: 12,
	})
	const success = data?.code === API_CODE.SUCCESS
	const categories = data?.result.items ?? []
	const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null)
	useEffect(() => {
		if (categories.length > 0) {
			setSelectedCategory(categories[0])
		}
	}, [categories])
	return (
		<ContentPage>
			<Stack gap="xl" mb="lg">
				<Tabs defaultValue="gallery">
					<Tabs.List>
						{PRODUCT_OVERVIEW_TABS.map((tab: ITab) => (
							<Tabs.Tab px="md" py="sm" key={tab.value} value={tab.value}>
								{tab.label}
							</Tabs.Tab>
						))}
					</Tabs.List>
					<Space h="md" />
					<SimpleGrid
						cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }}
						spacing={{ base: 'sm', md: 'sm' }}
					>
						{MOCK_PRODUCTS.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</SimpleGrid>
				</Tabs>
				<Grid>
					<Grid.Col span={3}>
						<Paper withBorder radius={0} shadow="sm">
							<Box bg="primary" px="md" py="sm">
								<Title order={5} c="white" fw={700}>
									{selectedCategory?.name ?? 'Danh mục'}
								</Title>
							</Box>

							<Stack gap={0}>
								{isLoading
									? Array.from({ length: 6 }).map((_, index) => (
											<Box key={index} px="md" py="sm">
												<Skeleton height={14} radius="sm" />
												{index < 5 && <Divider mt="sm" />}
											</Box>
										))
									: categories.slice(1).map((category, index) => {
											const active = selectedCategory?.id === category.id

											return (
												<Box key={category.id}>
													<Box
														px="md"
														py="sm"
														style={{ cursor: 'pointer' }}
														onClick={() => setSelectedCategory(category)}
													>
														<Text size="sm" fw={active ? 600 : 400} c={active ? 'primary' : 'dark'}>
															{category.name}
														</Text>
													</Box>

													{index < categories.length - 1 && <Divider />}
												</Box>
											)
										})}
							</Stack>
						</Paper>
					</Grid.Col>
					<Grid.Col span={9}>
						<SimpleGrid
							cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }}
							spacing={{ base: 'sm', md: 'sm' }}
						>
							{MOCK_PRODUCTS.map((product) => (
								<ProductCard key={product.id} product={product} variant={PRODUCT_CARD_VARIANT.V2} />
							))}
						</SimpleGrid>
					</Grid.Col>
				</Grid>
			</Stack>
		</ContentPage>
	)
}

export default HomePage
