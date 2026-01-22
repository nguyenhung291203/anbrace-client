import { Button, Group, Pagination, Stack, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure, useDebouncedValue } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons-react'
import { FC, useState } from 'react'

import {
	CreateCategoryRequest,
	ListCategoryRequest,
	UpdateCategoryRequest,
	useCreateCategory,
	useDeleteCategory,
	useGetListCategory,
	useUpdateCategory,
} from '../category.api'
import { CategoryEdit, CategoryItem } from '../category.types'
import CategoryCreateModal from '../components/CategoryCreateModal'
import CategoryDetailModal from '../components/CategoryDetailModal'
import CategoryFilter from '../components/CategoryFilter'
import CategoryUpdateModal from '../components/CategoryUpdateModal'
import ListCategory from '../components/ListCategory'

import ConfirmModal from '@/shared/components/ConfirmModal'
import ContentPage from '@/shared/components/ContentPage'
import DataWrapper from '@/shared/components/DataWrapper'
import TitlePage from '@/shared/components/TitlePage'
import { API_CODE, Mode } from '@/shared/types'
import { notifyError, notifySuccess, notifyWarning } from '@/shared/utils/notification.util'

const ManagerCategoryPage: FC = () => {
	const theme = useMantineTheme()
	const [mode, setMode] = useState<Mode>(null)
	const [confirmOpened, { open, close }] = useDisclosure(false)
	const [pagination, setPagination] = useState<ListCategoryRequest>({
		pageSize: 10,
		pageNo: 1,
		keyword: '',
	})
	const [debouncedPagination] = useDebouncedValue(pagination, 300)
	const { data, isLoading } = useGetListCategory(debouncedPagination)
	const { mutateAsync: createCategory } = useCreateCategory()
	const { mutateAsync: updateCategory } = useUpdateCategory()
	const { mutateAsync: deleteCategory } = useDeleteCategory()
	const success = data?.code === API_CODE.SUCCESS
	const categories = data?.result?.items || []
	const totalPages = data?.result?.totalPages || 0
	const form = useForm<CategoryEdit>({
		initialValues: {
			name: '',
			description: '',
		},
	})
	const handleCloseModal = () => {
		form.reset()
		setMode(null)
	}
	const handleChangePage = (pageNo: number) => {
		setPagination((prev) => ({
			...prev,
			pageNo,
		}))
	}

	const handleFilterChange = (values: { keyword?: string; status?: string }) => {
		setPagination((prev) => ({
			...prev,
			pageNo: 1,
			keyword: values.keyword,
			status: values.status as any,
		}))
	}

	const handleResetFilter = () => {
		setPagination((prev) => ({
			...prev,
			pageNo: 1,
			keyword: '',
			status: undefined,
		}))
	}

	const handleCreate = async () => {
		const req = form.values as CreateCategoryRequest
		const res = await createCategory(req)

		const code = res?.code

		if (code === API_CODE.INVALID) {
			const errors = res?.errors || {}
			form.setErrors(errors)

			notifyWarning({
				message: 'Dữ liệu không hợp lệ, vui lòng kiểm tra lại',
			})

			close()
			return
		}

		if (code === API_CODE.SUCCESS) {
			notifySuccess({
				message: 'Tạo danh mục thành công',
			})

			setMode(null)
			return
		}

		notifyError({
			message: 'Có lỗi xảy ra, vui lòng thử lại',
		})
	}

	const handleUpdate = async () => {
		const req = form.values as UpdateCategoryRequest
		console.log('Update req', req)
		const res = await updateCategory(req)
		const code = res?.code
		if (code === API_CODE.INVALID) {
			const errors = res?.errors || {}
			form.setErrors(errors)

			notifyWarning({
				message: 'Dữ liệu không hợp lệ, vui lòng kiểm tra lại',
			})

			close()
			return
		}
		if (code === API_CODE.SUCCESS) {
			notifySuccess({
				message: 'Cập nhật danh mục thành công',
			})

			setMode(null)
			return
		}
		notifyError({
			message: 'Có lỗi xảy ra, vui lòng thử lại',
		})
	}

	const handleDelete = async () => {
		const req = form.values.id as number
		console.log('Delete req', req)
		const res = await deleteCategory(req)
		const code = res?.code
		if (code === API_CODE.SUCCESS) {
			notifySuccess({
				message: 'Xoá danh mục thành công',
			})

			setMode(null)
			return
		}
		notifyError({
			message: 'Có lỗi xảy ra, vui lòng thử lại',
		})
	}

	const handleConfirm = () => {
		if (mode === 'CREATE') {
			handleCreate()
			return
		}
		if (mode === 'UPDATE') {
			handleUpdate()
			return
		}
		if (mode === 'DELETE') {
			handleDelete()
			return
		}
	}

	return (
		<>
			<Stack>
				<Group w="100%" justify="space-between">
					<TitlePage title="Danh sách danh mục" />
					<Button
						radius="sm"
						leftSection={<IconPlus size={theme.fontSizes.lg} />}
						onClick={() => {
							setMode('CREATE')
						}}
					>
						Thêm mới danh mục
					</Button>
				</Group>
				<ContentPage>
					<CategoryFilter
						keyword={pagination.keyword}
						onChange={handleFilterChange}
						onReset={handleResetFilter}
					/>
					<DataWrapper success={success} loading={isLoading}>
						<ListCategory
							categories={categories}
							onDetail={(category: CategoryItem) => {
								setMode('DETAIL')
								form.setValues(category)
							}}
							onEdit={(category: CategoryItem) => {
								setMode('UPDATE')
								form.setValues(category)
							}}
							onDelete={(category: CategoryItem) => {
								setMode('DELETE')
								open()
								form.setValues(category)
							}}
						/>
						<Pagination
							total={totalPages}
							ml="auto"
							value={pagination.pageNo}
							onChange={handleChangePage}
						/>
					</DataWrapper>
				</ContentPage>
			</Stack>
			<CategoryDetailModal
				opened={mode === 'DETAIL'}
				onClose={handleCloseModal}
				onEdit={() => {
					setMode('UPDATE')
				}}
				form={form}
			/>
			<CategoryUpdateModal
				opened={mode === 'UPDATE'}
				form={form}
				onClose={handleCloseModal}
				onSave={() => {
					open()
				}}
			/>
			<CategoryCreateModal
				opened={mode === 'CREATE'}
				form={form}
				onClose={handleCloseModal}
				onCreate={() => {
					open()
				}}
			/>
			<ConfirmModal opened={confirmOpened} mode={mode} onClose={close} onConfirm={handleConfirm} />
		</>
	)
}

export default ManagerCategoryPage
