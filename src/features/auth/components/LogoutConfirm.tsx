import { Button, Group, Modal, ModalProps, Stack, Text } from '@mantine/core'
import { FC } from 'react'

import { useLogout } from '../auth.api'

type LogoutConfirmProps = ModalProps

const LogoutConfirm: FC<LogoutConfirmProps> = ({ ...modalProps }) => {
	const { mutateAsync, isPending } = useLogout()

	const handleLogout = async () => {
		try {
			const res = await mutateAsync()
			console.log('res: ', res)
		} catch (error) {
			// optional: show notification
			console.error('Logout failed', error)
		}
	}
	return (
		<Modal {...modalProps} title="Đăng xuất" centered withCloseButton={false} size="sm">
			<Stack>
				<Text size="sm">Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này không?</Text>

				<Group justify="flex-end" gap="xs">
					<Button variant="default" onClick={modalProps.onClose}>
						Huỷ
					</Button>

					<Button
						color="primary"
						onClick={() => {
							void handleLogout()
						}}
						loading={isPending}
					>
						Đăng xuất
					</Button>
				</Group>
			</Stack>
		</Modal>
	)
}

export default LogoutConfirm
