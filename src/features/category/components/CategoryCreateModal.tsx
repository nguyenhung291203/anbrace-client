import { Button, Group, Modal, ModalProps, Stack } from '@mantine/core'

import CategoryForm from '../components/CategoryForm'

import type { CategoryEdit } from '../category.types'
import type { UseFormReturnType } from '@mantine/form'
import type { FC } from 'react'

interface CategoryCreateModalProps extends ModalProps {
	form: UseFormReturnType<CategoryEdit>
	onCreate?: (values: CategoryEdit) => void
}

const CategoryCreateModal: FC<CategoryCreateModalProps> = ({ form, onCreate, ...modalProps }) => {
	return (
		<Modal {...modalProps} title="Tạo danh mục mới" centered>
			<form onSubmit={form.onSubmit((values) => onCreate?.(values))}>
				<Stack>
					<CategoryForm form={form} />

					<Group justify="flex-end" gap="xs">
						<Button variant="default" onClick={modalProps.onClose}>
							Huỷ
						</Button>

						<Button type="submit">Tạo</Button>
					</Group>
				</Stack>
			</form>
		</Modal>
	)
}

export default CategoryCreateModal
