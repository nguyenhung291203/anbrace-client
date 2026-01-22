import { Avatar, Group, Menu, Stack, Text, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react'

import { useAuthStore } from '@/features/auth/auth.store'
import LogoutConfirm from '@/features/auth/components/LogoutConfirm'
import { useLayoutStore } from '@/shared/stores/main-layout.store'

const AccountInfo = () => {
	const { user } = useAuthStore()
	const { opened } = useLayoutStore()
	const [isOpenConfirmModal, { close, open }] = useDisclosure(false)
	if (!user) return null

	return (
		<>
			<Menu position="right-start" width={200} shadow="md">
				<Menu.Target>
					<UnstyledButton style={{ width: '100%' }}>
						<Group p={opened ? 'sm' : 'md'} gap="sm" justify={opened ? 'flex-start' : 'center'}>
							<Avatar src={user.imageUrl} radius="xl" />

							{opened && (
								<Stack gap={2}>
									<Text fw={500}>{user.fullName}</Text>
									<Text fz="sm" c="dimmed">
										{user.email}
									</Text>
								</Stack>
							)}
						</Group>
					</UnstyledButton>
				</Menu.Target>

				<Menu.Dropdown>
					<Menu.Item leftSection={<IconUser size={16} />}>Thông tin cá nhân</Menu.Item>

					<Menu.Item leftSection={<IconSettings size={16} />}>Cài đặt</Menu.Item>

					<Menu.Divider />

					<Menu.Item color="red" leftSection={<IconLogout size={16} />} onClick={open}>
						Đăng xuất
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
			<LogoutConfirm opened={isOpenConfirmModal} onClose={close} />
		</>
	)
}

export default AccountInfo
