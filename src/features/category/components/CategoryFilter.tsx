import { ActionIcon, Group, Select, TextInput } from '@mantine/core'
import { IconRefresh, IconSearch } from '@tabler/icons-react'
import { FC } from 'react'

interface CategoryFilterProps {
	keyword?: string
	status?: string
	onChange: (values: { keyword?: string; status?: string }) => void
	onReset: () => void
}

const CategoryFilter: FC<CategoryFilterProps> = ({ keyword, status, onChange, onReset }) => {
	return (
		<Group>
			<TextInput
				placeholder="Tìm theo tên danh mục"
				radius="sm"
				leftSection={<IconSearch size={16} />}
				value={keyword}
				onChange={(e) => onChange({ keyword: e.currentTarget.value, status })}
			/>

			<Select
				placeholder="Trạng thái"
				clearable
				radius="sm"
				value={status}
				data={[
					{ value: 'ACTIVE', label: 'Hoạt động' },
					{ value: 'INACTIVE', label: 'Ngừng hoạt động' },
				]}
				onChange={(value) => onChange({ keyword, status: value ?? undefined })}
			/>

			<ActionIcon variant="filled" radius="sm" size="lg" onClick={onReset}>
				<IconRefresh stroke={1.2} />
			</ActionIcon>
		</Group>
	)
}

export default CategoryFilter
