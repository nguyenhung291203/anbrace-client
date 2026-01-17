import { Button, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconLock, IconUserSquareRounded } from '@tabler/icons-react'

const LoginPage = () => {
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},
		validateInputOnBlur: true,
		validateInputOnChange: true,
	})

	return (
		<Stack>
			<Stack gap="xs">
				<Title order={3}>Đăng nhập</Title>
				<Text fw={400} fz="md">
					Truy cập nền tảng quản lý và theo dõi dữ liệu của bạn một cách an toàn và nhanh chóng
				</Text>
			</Stack>

			<form>
				<Stack>
					<TextInput
						autoFocus
						size="lg"
						radius="md"
						leftSection={<IconUserSquareRounded stroke={1.5} />}
						placeholder="Email"
						{...form.getInputProps('email')}
						required
					/>

					<PasswordInput
						size="lg"
						radius="md"
						leftSection={<IconLock stroke={1.5} />}
						placeholder="Mật khẩu"
						{...form.getInputProps('password')}
						required
					/>

					<Button mt="md" h={54} radius="md" type="submit">
						Đăng nhập
					</Button>
				</Stack>
			</form>
		</Stack>
	)
}

export default LoginPage
