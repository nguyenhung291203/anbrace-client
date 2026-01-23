import {
	AspectRatio,
	Grid,
	Image,
	NumberInput,
	Paper,
	Stack,
	Text,
	TextInput,
	Textarea,
	Group,
	Badge,
	Button,
} from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { UseFormReturnType } from '@mantine/form'
import { IconPlus, IconPhoto } from '@tabler/icons-react'
import { FC } from 'react'

import { ProductEdit } from '../product.types'

import CategorySelect from '@/features/category/components/CategorySelect'
import { getPreviewUrl } from '@/shared/utils/image.util'
interface ProductFormProps {
	form: UseFormReturnType<ProductEdit>
	readonly?: boolean
}
const ProductForm: FC<ProductFormProps> = ({ form, readonly = true }) => {
	return (
		<Stack gap="md">
			<TextInput
				label="Tên sản phẩm"
				placeholder="Nhập tên sản phẩm (ví dụ: Vòng tay đá thạch anh)"
				readOnly={readonly}
				{...form.getInputProps('name')}
			/>

			<Textarea
				label="Mô tả"
				placeholder="Mô tả chi tiết sản phẩm, chất liệu, ý nghĩa phong thuỷ..."
				minRows={3}
				autosize
				readOnly={readonly}
				{...form.getInputProps('description')}
			/>

			<CategorySelect />

			<Stack gap="xs">
				<Text fw={500}>Size & Giá</Text>

				{form.values.sizes?.map((_, index) => (
					<Grid key={index}>
						<Grid.Col span={3}>
							<NumberInput
								label="Size"
								readOnly={readonly}
								min={1}
								rightSection={undefined}
								{...form.getInputProps(`sizes.${index}.size`)}
							/>
						</Grid.Col>

						<Grid.Col span={4}>
							<NumberInput
								label="Giá"
								thousandSeparator=","
								rightSection={<Text c="dimmed">₫</Text>}
								readOnly={readonly}
								min={0}
								{...form.getInputProps(`sizes.${index}.price`)}
							/>
						</Grid.Col>

						<Grid.Col span={3}>
							<NumberInput
								label="Tồn kho"
								readOnly={readonly}
								min={0}
								{...form.getInputProps(`sizes.${index}.stock`)}
							/>
						</Grid.Col>

						{!readonly && (
							<Grid.Col span={2} style={{ display: 'flex', alignItems: 'end' }}>
								<Button
									color="red"
									variant="filled"
									onClick={() => form.removeListItem('sizes', index)}
								>
									Xoá
								</Button>
							</Grid.Col>
						)}
					</Grid>
				))}

				{!readonly && (
					<Button
						variant="outline"
						onClick={() =>
							form.insertListItem('sizes', {
								size: 8,
								price: 0,
								stock: 0,
							})
						}
					>
						+ Thêm size
					</Button>
				)}
			</Stack>

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
											src={getPreviewUrl(form.values.thumbnail)}
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
											accept={['image/png', 'image/jpeg', 'image/webp']}
											maxFiles={1}
											disabled={readonly}
											onDrop={(files) => {
												if (files.length > 0) {
													form.setFieldValue('thumbnail', files[0])
												}
											}}
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
															src={getPreviewUrl(image)}
															fit="contain"
															style={{
																transition: 'transform 0.2s ease',
															}}
														/>
													) : (
														<Dropzone
															accept={['image/png', 'image/jpeg', 'image/webp']}
															disabled={readonly}
															maxFiles={1}
															onDrop={(files) => {
																if (!files.length) return

																const newImages = [...(form.values.images || [])]
																newImages[index] = files[0]

																form.setFieldValue('images', newImages)
															}}
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
