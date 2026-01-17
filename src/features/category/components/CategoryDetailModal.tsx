import { Button, Group, Modal, ModalProps, Stack } from '@mantine/core'

import CategoryForm from '../components/CategoryForm'

import type { CategoryEdit } from '../category.types'
import type { UseFormReturnType } from '@mantine/form'
import type { FC } from 'react'

interface CategoryDetailModalProps extends ModalProps {
	form: UseFormReturnType<CategoryEdit>
	onEdit?: () => void
}

const CategoryDetailModal: FC<CategoryDetailModalProps> = ({ form, onEdit, ...modalProps }) => {
	return (
		<Modal {...modalProps} title="Chi tiết danh mục" centered>
			<Stack>
				<CategoryForm form={form} readonly />

				<Group justify="flex-end">
					<Button variant="light" onClick={onEdit}>
						Chỉnh sửa
					</Button>
				</Group>
			</Stack>
		</Modal>
	)
}

export default CategoryDetailModal
