import { SimpleGrid, Stack, Title } from '@mantine/core'

import ContentPage from '../../../shared/components/ContentPage'
import CategoryCard from '../../category/components/CategoryCard'
import { CATEGORY_MOCK } from '../../category/mock'

import type { FC } from 'react'

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
