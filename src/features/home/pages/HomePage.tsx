import { SimpleGrid, Stack, Title } from '@mantine/core'
import { type FC } from 'react'

import { useGetListCategory } from '@/features/category/category.api'
import CategoryCard from '@/features/category/components/CategoryCard'
import ContentPage from '@/shared/components/ContentPage'
import DataWrapper from '@/shared/components/DataWrapper'
import { API_CODE } from '@/shared/types'

const HomePage: FC = () => {
	const { data, isLoading } = useGetListCategory({
		pageNo: 1,
		pageSize: 6,
	})
	const success = data?.code === API_CODE.SUCCESS
	const categories = data?.result.items ?? []
	return (
		<ContentPage>
			<Stack>
				<Stack gap="xs">
					<Title order={3}>Danh mục vòng tay</Title>
					<DataWrapper success={success} loading={isLoading}>
						<SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }} spacing="lg">
							{categories.map((item) => (
								<CategoryCard key={item.id} category={item} />
							))}
						</SimpleGrid>
					</DataWrapper>
				</Stack>
				<Stack gap="xs">
					<Title order={3}>Top sản phẩm bán chạy</Title>
					<DataWrapper success={success} loading={isLoading}>
						<SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }} spacing="lg">
							{categories.map((item) => (
								<CategoryCard key={item.id} category={item} />
							))}
						</SimpleGrid>
					</DataWrapper>
				</Stack>
			</Stack>
		</ContentPage>
	)
}

export default HomePage
