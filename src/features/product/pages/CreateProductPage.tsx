import { Button, Group, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

import ProductForm from '../components/ProductForm'
import { ProductEdit } from '../product.types'

import { CATEGORY_MOCK } from '@/features/category/mock'
import ContentPage from '@/shared/components/ContentPage'
import TitlePage from '@/shared/components/TitlePage'

const CreateProductPage = () => {
	const navigate = useNavigate()

	const form = useForm<ProductEdit>({
		initialValues: {
			name: '',
			description: '',
			categoryId: null,
			price: 0,
			stock: 0,
			images: [],
			thumbnail: '',
		},

		validate: {
			name: (value) => (!value ? 'Tên sản phẩm không được để trống' : null),
			price: (value) => (value <= 0 ? 'Giá phải lớn hơn 0' : null),
			stock: (value) => (value < 0 ? 'Tồn kho không hợp lệ' : null),
		},
	})

	const handleSubmit = (values: typeof form.values) => {
		console.log('CREATE PRODUCT:', values)
		// TODO: call API create product
		navigate('/admin/products')
	}

	return (
		<Stack>
			<TitlePage title="Thêm mới sản phẩm" />

			<ContentPage>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<ProductForm form={form} categories={CATEGORY_MOCK} />

					<Group justify="flex-end" mt="md">
						<Button type="submit" leftSection={<IconDeviceFloppy size={16} />}>
							Lưu sản phẩm
						</Button>
					</Group>
				</form>
			</ContentPage>
		</Stack>
	)
}

export default CreateProductPage
