import { Badge, Card, Group, Stack, Text, Tooltip } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'

import type { CategoryItem } from '../category.types'
import type { FC } from 'react'

const NAME_LINE_CLAMP = 1
const DESC_LINE_CLAMP = 2

const NAME_TOOLTIP_MIN_LENGTH = 25
const DESC_TOOLTIP_MIN_LENGTH = 60
const DESC_TOOLTIP_WIDTH = 260

interface CategoryCardProps {
	category: CategoryItem
	onClick?: (category: CategoryItem) => void
}

const CategoryCard: FC<CategoryCardProps> = ({ category, onClick }) => {
	return (
		<Card
			withBorder
			radius="lg"
			p="md"
			shadow="sm"
			onClick={() => onClick?.(category)}
			className="cursor-pointer transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:shadow-md"
		>
			<Stack gap="xs">
				<Group justify="space-between" wrap="nowrap">
					<Tooltip
						label={category.name}
						withArrow
						position="top-start"
						disabled={category.name.length < NAME_TOOLTIP_MIN_LENGTH}
					>
						<Text fw={600} fz="lg" lineClamp={NAME_LINE_CLAMP}>
							{category.name}
						</Text>
					</Tooltip>

					<IconChevronRight size={18} className="shrink-0" />
				</Group>

				<Tooltip
					label={category.description}
					withArrow
					position="top-start"
					multiline
					w={DESC_TOOLTIP_WIDTH}
					disabled={category.description.length < DESC_TOOLTIP_MIN_LENGTH}
				>
					<Text c="dimmed" fz="sm" lineClamp={DESC_LINE_CLAMP}>
						{category.description}
					</Text>
				</Tooltip>

				<Group justify="space-between" mt="sm">
					<Badge variant="light" color="pink">
						{category.quantity} sản phẩm
					</Badge>
				</Group>
			</Stack>
		</Card>
	)
}

export default CategoryCard
