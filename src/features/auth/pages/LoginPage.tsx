import { Button, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconLock, IconUserSquareRounded } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

import { useLogin } from '../auth.api'
import { useAuthStore } from '../auth.store'

import { ROUTE_PATH } from '@/shared/constants/path.constant'
import { API_CODE } from '@/shared/types'
import { setTokens } from '@/shared/utils/token.util'

const LoginPage = () => {
	const { setIsAuthenticated } = useAuthStore()
	const { mutateAsync, isPending } = useLogin()
	const form = useForm({
		initialValues: {
			email: 'hung.nguyen@test.com',
			password: '123456',
		},
		validateInputOnBlur: true,
		validateInputOnChange: true,
	})

	const handleSubmit = async () => {
		const { email, password } = form.values
		const res = await mutateAsync({ email, password })
		console.log('res', res)
		const code = res?.code || null
		if (code === API_CODE.INVALID) {
			const errors = res?.errors || {}
			form.setErrors(errors)
			return
		}
		if (code === API_CODE.SUCCESS) {
			const { accessToken, refereshToken } = res.result
			setTokens(accessToken, refereshToken)
			setIsAuthenticated(true)
		}
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

					<Button mt="md" h={54} radius="md" type="submit" fullWidth loading={isPending}>
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
