import { ActionIcon, Group, Image, Table, Text, Tooltip } from '@mantine/core'
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react'
import { FC } from 'react'

import type { ProductItem } from '../product.types'

interface ListProductProps {
	products: ProductItem[]
	onDetail?: (item: ProductItem) => void
	onEdit?: (item: ProductItem) => void
	onDelete?: (item: ProductItem) => void
}

const ListProduct: FC<ListProductProps> = ({ products, onDetail, onEdit, onDelete }) => {
	return (
		<Table>
			<Table.Thead>
				<Table.Tr>
					<Table.Th ta="center" w={60}>
						STT
					</Table.Th>
					<Table.Th w={80}>Ảnh</Table.Th>
					<Table.Th w={220}>Tên sản phẩm</Table.Th>
					<Table.Th>Danh mục</Table.Th>
					<Table.Th ta="right" w={120}>
						Giá
					</Table.Th>
					<Table.Th ta="center" w={100}>
						Tồn kho
					</Table.Th>
					<Table.Th ta="center" w={120}>
						Thao tác
					</Table.Th>
				</Table.Tr>
			</Table.Thead>

			<Table.Tbody>
				{products.length === 0 && (
					<Table.Tr>
						<Table.Td colSpan={7}>
							<Text c="dimmed" ta="center">
								Không có sản phẩm nào
							</Text>
						</Table.Td>
					</Table.Tr>
				)}

				{products.map((item, index) => (
					<Table.Tr key={item.id}>
						<Table.Td ta="center">{index + 1}</Table.Td>

						<Table.Td>
							<Image
								src={item.thumbnail}
								w={48}
								h={48}
								radius="sm"
								fallbackSrc="https://placehold.co/48x48?text=No+Image"
							/>
						</Table.Td>

						<Table.Td>
							<Tooltip label={item.name} withArrow disabled={item.name.length <= 30}>
								<Text lineClamp={1} size="sm" fw={500}>
									{item.name}
								</Text>
							</Tooltip>
						</Table.Td>

						<Table.Td>
							<Text size="sm">{item.category.name}</Text>
						</Table.Td>

						<Table.Td ta="right">
							<Text size="sm" fw={500}>
								{item.price.toLocaleString()} ₫
							</Text>
						</Table.Td>

						<Table.Td ta="center">
							<Text size="sm" c={item.stock > 0 ? 'green' : 'red'}>
								{item.stock}
							</Text>
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

export default ListProduct
