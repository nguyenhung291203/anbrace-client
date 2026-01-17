import { Stack, TextInput, Textarea } from '@mantine/core'

import type { CategoryEdit } from '../category.types'
import type { UseFormReturnType } from '@mantine/form'
import type { FC } from 'react'

interface CategoryFormProps {
	form: UseFormReturnType<CategoryEdit>
	readonly?: boolean
}

const CategoryForm: FC<CategoryFormProps> = ({ form, readonly = false }) => {
	return (
		<Stack>
			<TextInput
				label="Tên danh mục"
				placeholder="Nhập tên danh mục"
				required
				readOnly={readonly}
				{...form.getInputProps('name')}
			/>

			<Textarea
				label="Mô tả"
				placeholder="Nhập mô tả danh mục"
				minRows={3}
				autosize
				readOnly={readonly}
				{...form.getInputProps('description')}
			/>
		</Stack>
	)
}

export default CategoryForm
