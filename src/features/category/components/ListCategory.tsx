import { ActionIcon, Group, Table, Text, Tooltip } from '@mantine/core'
import { IconEye, IconEdit, IconTrash } from '@tabler/icons-react'
import { FC } from 'react'

import type { CategoryItem } from '../category.types'

interface ListCategoryProps {
	categories: CategoryItem[]
	onDetail?: (item: CategoryItem) => void
	onEdit?: (item: CategoryItem) => void
	onDelete?: (item: CategoryItem) => void
}

const ListCategory: FC<ListCategoryProps> = ({ categories, onDetail, onEdit, onDelete }) => {
	return (
		<Table>
			<Table.Thead>
				<Table.Tr>
					<Table.Th ta="center" w={60}>
						STT
					</Table.Th>
					<Table.Th w={220}>Tên danh mục</Table.Th>
					<Table.Th>Mô tả</Table.Th>
					<Table.Th ta="center" w={120}>
						Thao tác
					</Table.Th>
				</Table.Tr>
			</Table.Thead>

			<Table.Tbody>
				{categories.length === 0 && (
					<Table.Tr mt="sm">
						<Table.Td colSpan={4}>
							<Text c="dimmed" ta="center">
								Không có danh mục nào
							</Text>
						</Table.Td>
					</Table.Tr>
				)}

				{categories.map((item, index) => (
					<Table.Tr key={item.id}>
						<Table.Td ta="center">{index + 1}</Table.Td>

						<Table.Td>
							<Tooltip label={item.name} withArrow disabled={item.name.length <= 30}>
								<Text lineClamp={1} size="sm" fw={500}>
									{item.name}
								</Text>
							</Tooltip>
						</Table.Td>

						<Table.Td>
							<Tooltip
								label={item.description}
								multiline
								withArrow
								w={300}
								disabled={item.description.length <= 60}
							>
								<Text lineClamp={2} size="sm" c="dimmed">
									{item.description}
								</Text>
							</Tooltip>
						</Table.Td>

						<Table.Td ta="center">
							<Group gap="xs" justify="center" wrap="nowrap">
								<Tooltip label="Chi tiết">
									<ActionIcon variant="subtle" onClick={() => onDetail?.(item)}>
										<IconEye size={16} />
									</ActionIcon>
								</Tooltip>

								<Tooltip label="Chỉnh sửa">
									<ActionIcon variant="subtle" color="blue" onClick={() => onEdit?.(item)}>
										<IconEdit size={16} />
									</ActionIcon>
								</Tooltip>

								<Tooltip label="Xoá">
									<ActionIcon variant="subtle" color="red" onClick={() => onDelete?.(item)}>
										<IconTrash size={16} />
									</ActionIcon>
								</Tooltip>
							</Group>
						</Table.Td>
					</Table.Tr>
				))}
			</Table.Tbody>
		</Table>
	)
}

export default ListCategory
