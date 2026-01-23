import { Button, Group, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ProductForm from '../components/ProductForm'
import { useGetProductById } from '../product.api'
import { ProductEdit } from '../product.types'

import ContentPage from '@/shared/components/ContentPage'
import TitlePage from '@/shared/components/TitlePage'
import { API_CODE } from '@/shared/types'

const UpdateProductPage = () => {
	const { id } = useParams<{ id: string }>()
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
	console.log('UPDATE PRODUCT ID:', id)
	const { data, isFetching } = useGetProductById(Number(id))
	const product = data?.result || null
	const success = data?.code === API_CODE.SUCCESS
	console.log('FETCH PRODUCT FOR UPDATE:', { isFetching, product, success })
	useEffect(() => {
		if (!product) {
			return
		}
		form.setValues({
			name: product.name,
			description: product.description,
			categoryId: product.category.id,
			images: product.images,
			sizes: product.sizes,
		})
	}, [product])
	return (
		<Stack>
			<TitlePage title="Cập nhật sản phẩm" />

			<ContentPage>
				<form onSubmit={form.onSubmit(() => {})}>
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
export default UpdateProductPage
