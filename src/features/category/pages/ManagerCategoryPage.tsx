import { Button, Group, Pagination, Stack, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons-react'
import { FC, useState } from 'react'

import { CategoryEdit, CategoryItem } from '../category.types'
import CategoryCreateModal from '../components/CategoryCreateModal'
import CategoryDetailModal from '../components/CategoryDetailModal'
import CategoryFilter from '../components/CategoryFilter'
import CategoryUpdateModal from '../components/CategoryUpdateModal'
import ListCategory from '../components/ListCategory'
import { CATEGORY_MOCK } from '../mock'

import ConfirmModal from '@/shared/components/ConfirmModal'
import ContentPage from '@/shared/components/ContentPage'
import TitlePage from '@/shared/components/TitlePage'
import { Mode } from '@/shared/types'

const ManagerCategoryPage: FC = () => {
	const theme = useMantineTheme()
	const [mode, setMode] = useState<Mode>(null)
	const [confirmOpened, { open, close }] = useDisclosure(false)

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
					<CategoryFilter />
					<ListCategory
						categories={CATEGORY_MOCK}
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
					<Pagination total={10} ml="auto" />
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
			<ConfirmModal opened={confirmOpened} mode={mode} onClose={close} onConfirm={() => {}} />
		</>
	)
}

export default ManagerCategoryPage
