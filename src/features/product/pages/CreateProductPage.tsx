import { Button, Group, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

import ProductForm from '../components/ProductForm'
import { useCreateProduct } from '../product.api'
import { ProductEdit } from '../product.types'

import ContentPage from '@/shared/components/ContentPage'
import TitlePage from '@/shared/components/TitlePage'
import { ROUTE_PATH } from '@/shared/constants/path.constant'
import { API_CODE } from '@/shared/types'
import { notifyError, notifySuccess, notifyWarning } from '@/shared/utils/notification.util'

const CreateProductPage = () => {
	const navigate = useNavigate()
	const { mutateAsync: createProduct } = useCreateProduct()
	const form = useForm<ProductEdit>({
		initialValues: {
			name: '',
			description: '',
			categoryId: null,
			images: [],
			sizes: [],
		},

		validate: {
			name: (value) => (!value?.trim() ? 'Tên sản phẩm không được để trống' : null),

			categoryId: (value) => (!value ? 'Vui lòng chọn danh mục sản phẩm' : null),
		},
		validateInputOnBlur: true,
		validateInputOnChange: true,
	})

	const handleSubmit = async (values: typeof form.values) => {
		console.log('CREATE PRODUCT:', values)
		const res = await createProduct(values)
		const code = res?.code
		if (code === API_CODE.INVALID) {
			const errors = res?.errors || {}
			form.setErrors(errors)
			notifyWarning({
				message: 'Dữ liệu không hợp lệ, vui lòng kiểm tra lại',
			})
			return
		}
		if (code === API_CODE.SUCCESS) {
			notifySuccess({
				message: 'Tạo sản phẩm thành công',
			})
			navigate(ROUTE_PATH.ADMIN.MANAGER_PRODUCT)
			return
		}
		notifyError({
			message: 'Có lỗi xảy ra, vui lòng thử lại',
		})
	}

	return (
		<Stack>
			<TitlePage title="Thêm mới sản phẩm" />

			<ContentPage>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<ProductForm form={form} readonly={false} />

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
