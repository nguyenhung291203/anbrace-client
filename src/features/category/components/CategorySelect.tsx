import { Loader, Select, SelectProps } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { FC } from 'react'

import { useGetListCategory } from '../category.api'

import { API_CODE } from '@/shared/types'

type CategorySelectProps = SelectProps

const CategorySelect: FC<CategorySelectProps> = ({ ...selectProps }) => {
	const { data, isLoading } = useGetListCategory({ pageSize: 10, pageNo: 1 })

	const success = data?.code === API_CODE.SUCCESS
	const categories = success ? data.result.items : []
	const placeholder = isLoading
		? 'Đang tải danh mục...'
		: !success
			? 'Không thể tải danh mục'
			: 'Chọn danh mục'
	const error = !isLoading && !success ? 'Không thể tải danh mục' : undefined
	const options = categories.map((c) => ({
		value: String(c.id),
		label: c.name,
	}))
	return (
		<Select
			label="Danh mục"
			placeholder={placeholder}
			data={options}
			disabled={isLoading || !success}
			error={error}
			rightSection={isLoading ? <Loader size="xs" /> : <IconChevronDown stroke={1.2} />}
			rightSectionWidth={36}
			nothingFoundMessage="Không có danh mục"
			clearable
			withCheckIcon={false}
			{...selectProps}
		/>
	)
}

export default CategorySelect
