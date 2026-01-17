import { ActionIcon, Group, Select, TextInput } from '@mantine/core'
import { IconRefresh, IconSearch } from '@tabler/icons-react'
import { FC } from 'react'

const CategoryFilter: FC = () => {
	return (
		<Group>
			<TextInput
				placeholder="Tìm theo tên danh mục"
				radius="sm"
				leftSection={<IconSearch size={16} />}
			/>

			<Select
				placeholder="Trạng thái"
				clearable
				radius="sm"
				data={[
					{ value: 'ACTIVE', label: 'Hoạt động' },
					{ value: 'INACTIVE', label: 'Ngừng hoạt động' },
				]}
			/>
			<ActionIcon variant="filled" radius="sm" size="lg">
				<IconRefresh stroke={1.2} />
			</ActionIcon>
		</Group>
	)
}

export default CategoryFilter
