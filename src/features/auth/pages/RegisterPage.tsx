import { Button, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconLock, IconMail, IconUser } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

import { ROUTE_PATH } from '../../../shared/path'

const RegisterPage = () => {
	const form = useForm({
		initialValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validateInputOnBlur: true,
		validateInputOnChange: true,
	})

	return (
		<Stack>
			<Stack gap="xs">
				<Title order={3}>Đăng ký</Title>
				<Text fw={400} fz="md" c="dimmed">
					Tạo tài khoản mới để bắt đầu sử dụng nền tảng quản lý của bạn
				</Text>
			</Stack>

			<form>
				<Stack>
					<TextInput
						autoFocus
						size="lg"
						radius="md"
						leftSection={<IconUser stroke={1.5} />}
						placeholder="Họ và tên"
						required
						{...form.getInputProps('name')}
					/>

					<TextInput
						size="lg"
						radius="md"
						leftSection={<IconMail stroke={1.5} />}
						placeholder="Email"
						required
						{...form.getInputProps('email')}
					/>

					<PasswordInput
						size="lg"
						radius="md"
						leftSection={<IconLock stroke={1.5} />}
						placeholder="Mật khẩu"
						required
						{...form.getInputProps('password')}
					/>

					<PasswordInput
						size="lg"
						radius="md"
						leftSection={<IconLock stroke={1.5} />}
						placeholder="Xác nhận mật khẩu"
						required
						{...form.getInputProps('confirmPassword')}
					/>

					<Button mt="md" h={54} radius="md" type="submit" fullWidth>
						Đăng ký
					</Button>

					<Text fz="sm" c="dimmed" ta="center">
						Đã có tài khoản?{' '}
						<Text
							component={Link}
							to={ROUTE_PATH.AUTH.LOGIN}
							fw={500}
							c="blue"
							style={{ textDecoration: 'none' }}
						>
							Đăng nhập
						</Text>
					</Text>
				</Stack>
			</form>
		</Stack>
	)
}

export default RegisterPage
