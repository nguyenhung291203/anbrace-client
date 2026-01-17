import { Button, Group, Modal, ModalProps, Stack } from '@mantine/core'

import CategoryForm from '../components/CategoryForm'

import type { CategoryEdit } from '../category.types'
import type { UseFormReturnType } from '@mantine/form'
import type { FC } from 'react'

interface CategoryUpdateModalProps extends ModalProps {
	form: UseFormReturnType<CategoryEdit>
	onSave?: (values: CategoryEdit) => void
}

const CategoryUpdateModal: FC<CategoryUpdateModalProps> = ({ form, onSave, ...modalProps }) => {
	return (
		<Modal {...modalProps} title="Chỉnh sửa danh mục" centered>
			<form onSubmit={form.onSubmit((values) => onSave?.(values))}>
				<Stack>
					<CategoryForm form={form} />

					<Group justify="flex-end" gap="xs">
						<Button variant="default" onClick={modalProps.onClose}>
							Huỷ
						</Button>

						<Button type="submit">Lưu</Button>
					</Group>
				</Stack>
			</form>
		</Modal>
	)
}

export default CategoryUpdateModal
