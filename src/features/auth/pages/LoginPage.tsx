import { Button, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconLock, IconUserSquareRounded } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

import { useAuthStore } from '../auth.store'

import { MOCK_ACCOUNTS } from '@/features/account/mock'
import { ROUTE_PATH } from '@/shared/path'

const LoginPage = () => {
	const { login } = useAuthStore()
	const form = useForm({
		initialValues: {
			email: 'nguyenvana@gmail.com',
			password: 'nguyenvana@gmail.com',
		},
		validateInputOnBlur: true,
		validateInputOnChange: true,
	})

	const handleSubmit = () => {
		const { email } = form.values
		const accounts = MOCK_ACCOUNTS
		const account = accounts.find((item) => item.email === email)
		if (!account) {
			form.setErrors({
				email: 'Email hoặc mật khẩu không đúng',
				password: 'Email hoặc mật khẩu không đúng',
			})
			return
		}

		login(account)
	}

	return (
		<Stack>
			<Stack gap="xs">
				<Title order={3}>Đăng nhập</Title>
				<Text fw={400} fz="md" c="dimmed">
					Truy cập nền tảng quản lý và theo dõi dữ liệu của bạn một cách an toàn và nhanh chóng
				</Text>
			</Stack>

			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Stack>
					<TextInput
						autoFocus
						size="lg"
						radius="md"
						leftSection={<IconUserSquareRounded stroke={1.5} />}
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

					<Button mt="md" h={54} radius="md" type="submit" fullWidth>
						Đăng nhập
					</Button>

					<Text fz="sm" c="dimmed" ta="center">
						Chưa có tài khoản?{' '}
						<Text
							component={Link}
							to={ROUTE_PATH.AUTH.REGISTER}
							fw={500}
							c="blue"
							style={{ textDecoration: 'none' }}
						>
							Đăng ký
						</Text>
					</Text>
				</Stack>
			</form>
		</Stack>
	)
}

export default LoginPage
