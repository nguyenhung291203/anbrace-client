import {
	AspectRatio,
	Grid,
	Image,
	NumberInput,
	Paper,
	Select,
	Stack,
	Text,
	TextInput,
	Textarea,
	Group,
	Badge,
} from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { UseFormReturnType } from '@mantine/form'
import { IconPlus, IconPhoto } from '@tabler/icons-react'
import { FC } from 'react'

import { ProductEdit } from '../product.types'

import { CategoryItem } from '@/features/category/category.types'
interface ProductFormProps {
	form: UseFormReturnType<ProductEdit>
	categories: CategoryItem[]
	readonly?: boolean
}
const ProductForm: FC<ProductFormProps> = ({ form, categories, readonly = true }) => {
	return (
		<Stack gap="md" p="md">
			<TextInput label="Tên sản phẩm" readOnly={readonly} {...form.getInputProps('name')} />

			<Textarea
				label="Mô tả"
				minRows={3}
				autosize
				readOnly={readonly}
				{...form.getInputProps('description')}
			/>

			<Select
				label="Danh mục"
				readOnly={readonly}
				data={categories.map((item) => ({
					value: String(item.id),
					label: item.name,
				}))}
				{...form.getInputProps('category.id')}
			/>

			<Grid>
				<Grid.Col span={4}>
					<NumberInput
						label="Giá"
						thousandSeparator=","
						readOnly={readonly}
						{...form.getInputProps('price')}
					/>
				</Grid.Col>
				<Grid.Col span={4}>
					<NumberInput label="Tồn kho" readOnly={readonly} {...form.getInputProps('stock')} />
				</Grid.Col>
				<Grid.Col span={4}>
					<NumberInput
						label="Đánh giá"
						min={0}
						max={5}
						step={0.1}
						readOnly={readonly}
						{...form.getInputProps('rating')}
					/>
				</Grid.Col>
			</Grid>

			<Stack gap="md" mt="lg">
				<Group justify="space-between" align="center">
					<Text fw={600} size="lg">
						Hình ảnh sản phẩm
					</Text>
					<Badge color="blue" variant="light">
						{(form.values.images?.length || 0) + (form.values.thumbnail ? 1 : 0)}/9 ảnh
					</Badge>
				</Group>

				<Grid gutter="md">
					<Grid.Col span={{ base: 12, md: 5 }}>
						<Stack gap="xs">
							<Text size="sm" fw={500} c="dimmed">
								Ảnh đại diện
							</Text>
							<Paper
								radius="md"
								p="xs"
								style={{
									overflow: 'hidden',
									transition: 'all 0.2s ease',
									cursor: readonly ? 'default' : 'pointer',
									borderColor: '#e9ecef',
								}}
								onMouseEnter={(e) => {
									if (!readonly) e.currentTarget.style.borderColor = '#228be6'
								}}
								onMouseLeave={(e) => {
									if (!readonly) e.currentTarget.style.borderColor = '#e9ecef'
								}}
							>
								<AspectRatio ratio={1 / 1}>
									{form.values.thumbnail ? (
										<Image
											src={form.values.thumbnail}
											fit="contain"
											style={{
												transition: 'transform 0.2s ease',
											}}
											onMouseEnter={(e) => {
												if (!readonly) e.currentTarget.style.transform = 'scale(1.05)'
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.transform = 'scale(1)'
											}}
										/>
									) : (
										<Dropzone
											onDrop={() => {}}
											disabled={readonly}
											styles={{
												root: {
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													border: '2px dashed #dee2e6',
													borderRadius: '8px',
													backgroundColor: '#f8f9fa',
													transition: 'all 0.2s ease',
													'&:hover': !readonly
														? {
																borderColor: '#228be6',
																backgroundColor: '#f1f3f5',
															}
														: {},
												},
											}}
										>
											<IconPhoto size={48} stroke={1.5} color="#adb5bd" />
										</Dropzone>
									)}
								</AspectRatio>
							</Paper>
						</Stack>
					</Grid.Col>

					<Grid.Col span={{ base: 12, md: 7 }}>
						<Stack gap="xs">
							<Text size="sm" fw={500} c="dimmed">
								Ảnh bổ sung
							</Text>
							<Grid gutter="xs">
								{Array.from({ length: 8 }).map((_, index) => {
									const image = form.values.images?.[index]

									return (
										<Grid.Col span={3} key={index}>
											<Paper
												withBorder
												radius="md"
												p={4}
												style={{
													overflow: 'hidden',
													transition: 'all 0.2s ease',
													cursor: readonly ? 'default' : 'pointer',
													borderColor: image ? '#e9ecef' : 'transparent',
												}}
												onMouseEnter={(e) => {
													if (!readonly && image) {
														e.currentTarget.style.borderColor = '#228be6'
														e.currentTarget.style.transform = 'translateY(-2px)'
														e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
													}
												}}
												onMouseLeave={(e) => {
													if (!readonly && image) {
														e.currentTarget.style.borderColor = '#e9ecef'
														e.currentTarget.style.transform = 'translateY(0)'
														e.currentTarget.style.boxShadow = 'none'
													}
												}}
											>
												<AspectRatio ratio={1}>
													{image ? (
														<Image
															src={image}
															fit="contain"
															style={{
																transition: 'transform 0.2s ease',
															}}
														/>
													) : (
														<Dropzone
															onDrop={() => {}}
															disabled={readonly}
															styles={{
																root: {
																	border: '2px dashed #dee2e6',
																	borderRadius: '6px',
																	backgroundColor: '#fafafa',
																	minHeight: 'unset',
																	padding: 0,
																	transition: 'all 0.2s ease',
																	'&:hover': !readonly
																		? {
																				borderColor: '#228be6',
																				backgroundColor: '#f8f9fa',
																			}
																		: {},
																	display: 'flex',
																	justifyContent: 'center',
																	alignItems: 'center',
																},
															}}
														>
															<IconPlus size={20} stroke={1.5} color="#adb5bd" />
														</Dropzone>
													)}
												</AspectRatio>
											</Paper>
										</Grid.Col>
									)
								})}
							</Grid>
						</Stack>
					</Grid.Col>
				</Grid>

				{!readonly && (
					<Text size="xs" c="dimmed" ta="center" mt="xs">
						Kéo thả hoặc click để tải ảnh lên
					</Text>
				)}
			</Stack>
		</Stack>
	)
}

export default ProductForm
