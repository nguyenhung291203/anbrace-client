import { Button, Group, Modal, ModalProps, Stack, Text } from '@mantine/core'

import type { FC } from 'react'

export type ConfirmMode = 'CREATE' | 'UPDATE' | 'DELETE'
export type Mode = 'DETAIL' | ConfirmMode | null

interface ConfirmModalProps extends ModalProps {
	mode: Mode
	onConfirm: () => void
}

const CONFIG: Record<
	ConfirmMode,
	{
		title: string
		message: string
		confirmText: string
		color: string
	}
> = {
	CREATE: {
		title: 'Xác nhận tạo mới',
		message: 'Bạn có chắc chắn muốn tạo không?',
		confirmText: 'Tạo',
		color: 'green',
	},
	UPDATE: {
		title: 'Xác nhận cập nhật',
		message: 'Bạn có chắc chắn muốn cập nhật không?',
		confirmText: 'Cập nhật',
		color: 'blue',
	},
	DELETE: {
		title: 'Xác nhận xoá',
		message: 'Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xoá?',
		confirmText: 'Xoá',
		color: 'red',
	},
}

const ConfirmModal: FC<ConfirmModalProps> = ({ mode, onConfirm, ...modalProps }) => {
	if (mode !== 'CREATE' && mode !== 'UPDATE' && mode !== 'DELETE') {
		return null
	}

	const { title, message, confirmText, color } = CONFIG[mode]

	return (
		<Modal {...modalProps} title={title} centered>
			<Stack>
				<Text size="sm">{message}</Text>

				<Group justify="flex-end" gap="xs">
					<Button variant="default" onClick={modalProps.onClose}>
						Huỷ
					</Button>

					<Button color={color} onClick={onConfirm}>
						{confirmText}
					</Button>
				</Group>
			</Stack>
		</Modal>
	)
}

export default ConfirmModal
