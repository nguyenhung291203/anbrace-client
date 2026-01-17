import { SimpleGrid, Stack, Title } from '@mantine/core'

import type { FC } from 'react'

import CategoryCard from '@/features/category/components/CategoryCard'
import { CATEGORY_MOCK } from '@/features/category/mock'
import ContentPage from '@/shared/components/ContentPage'

const HomePage: FC = () => {
	return (
		<ContentPage>
			<Stack gap="xs">
				<Title order={3} mb="md">
					Danh mục vòng tay
				</Title>

				<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
					{CATEGORY_MOCK.map((item) => (
						<CategoryCard key={item.id} category={item} />
					))}
				</SimpleGrid>
			</Stack>
		</ContentPage>
	)
}

export default HomePage
