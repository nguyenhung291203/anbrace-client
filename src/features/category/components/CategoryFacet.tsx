import { Checkbox, Input, Stack } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'
import { FC, useState } from 'react'

import { ListCategoryRequest, useGetListCategory } from '../category.api'

import FilterSectionHeader from '@/features/product/components/FilterSectionHeader'
import DataWrapper from '@/shared/components/DataWrapper'
import { API_CODE } from '@/shared/types'

type CategoryFacetProps = {
	selectedCategoryIds: number[]
	onChange: (ids: number[]) => void
}

const CategoryFacet: FC<CategoryFacetProps> = ({ selectedCategoryIds, onChange }) => {
	const [pagination, setPagination] = useState<ListCategoryRequest>({
		pageSize: 10,
		pageNo: 1,
		keyword: '',
	})
	const [debouncedPagination] = useDebouncedValue(pagination, 300)
	const { data, isFetching } = useGetListCategory(debouncedPagination)

	const success = data?.code === API_CODE.SUCCESS
	const categories = success ? data.result.items : []

	const toggleCategory = (id: number) => {
		if (selectedCategoryIds.includes(id)) {
			onChange(selectedCategoryIds.filter((c) => c !== id))
		} else {
			onChange([...selectedCategoryIds, id])
		}
	}

	return (
		<Stack gap={0}>
			<FilterSectionHeader title="Loại" />
			<Stack py="sm" gap="xs">
				<Input
					rightSection={<IconSearch size={14} />}
					radius="sm"
					placeholder="Tìm kiếm theo danh mục"
					value={pagination.keyword}
					onChange={(e) =>
						setPagination((prev) => ({
							...prev,
							pageNo: 1,
							keyword: e.target.value,
						}))
					}
				/>

				<DataWrapper loading={isFetching} success={success}>
					<Stack px="xs" gap="sm">
						{categories.map((category) => (
							<Checkbox
								key={category.id}
								label={category.name}
								checked={selectedCategoryIds.includes(category.id)}
								onChange={() => toggleCategory(category.id)}
							/>
						))}
					</Stack>
				</DataWrapper>
			</Stack>
		</Stack>
	)
}

export default CategoryFacet
