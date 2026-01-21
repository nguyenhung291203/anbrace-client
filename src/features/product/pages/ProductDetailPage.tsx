import {
	Button,
	Divider,
	Grid,
	Group,
	Image,
	NumberInput,
	Paper,
	Rating,
	Space,
	Stack,
	Tabs,
	Text,
	Title,
} from '@mantine/core'
import {
	IconBolt,
	IconFileText,
	IconHeadset,
	IconInfoCircle,
	IconRefresh,
	IconShoppingCart,
	IconStar,
	IconTruckDelivery,
} from '@tabler/icons-react'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ProductCard from '../components/ProductCard'
import { MOCK_PRODUCTS } from '../mock'
import { PRODUCT_CARD_VARIANT } from '../product.types'

import { useAuthStore } from '@/features/auth/auth.store'
import { useGetListCategory } from '@/features/category/category.api'
import ContentPage from '@/shared/components/ContentPage'
import TitlePage from '@/shared/components/TitlePage'
import { ROUTE_PATH } from '@/shared/constants/path.constant'
import { API_CODE } from '@/shared/types'

const ProductDetailPage = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const product = useMemo(() => MOCK_PRODUCTS.find((p) => p.id.toString() === id), [id])
	if (!product) {
		return <Text>Không tìm thấy sản phẩm</Text>
	}
	const { isAuthenticated } = useAuthStore()
	const [quantity, setQuantity] = useState(1)
	const [activeImage, setActiveImage] = useState(product.thumbnail)
	const [selectedSize, setSelectedSize] = useState(product.sizes[0])
	const { data, isLoading } = useGetListCategory({
		pageNo: 1,
		pageSize: 12,
	})
	const success = data?.code === API_CODE.SUCCESS
	const categories = data?.result.items ?? []
	return (
		<Stack>
			<TitlePage title="Chi tiết sản phẩm" />

			<ContentPage>
				<Grid>
					<Grid.Col span={5}>
						<Stack gap="sm">
							<Image src={activeImage} h={360} fit="contain" />

							<Group gap="sm">
								{[product.thumbnail, ...product.images].slice(0, 8).map((img, index) => (
									<Paper
										key={index}
										withBorder
										radius="md"
										p={4}
										w={72}
										h={72}
										style={{
											cursor: 'pointer',
											borderColor: activeImage === img ? 'var(--mantine-color-blue-5)' : undefined,
										}}
										onClick={() => setActiveImage(img)}
									>
										<Image src={img} h="100%" fit="contain" />
									</Paper>
								))}
							</Group>
						</Stack>
					</Grid.Col>

					<Grid.Col span={7}>
						<Stack>
							<Stack gap="sm">
								<Text c="dimmed">{product.category.name}</Text>
								<Title order={3}>{product.name}</Title>
								<Text c="gray">{product.description}</Text>
								<Rating color="yellow.4" value={product.rating} readOnly fractions={10} size="sm" />
								<Stack gap={4}>
									<Text fw={500} size="sm">
										Kích thước
									</Text>

									<Group gap="xs">
										{product.sizes.map((item) => {
											const isSelected = selectedSize.size === item.size
											const isOutOfStock = item.stock === 0

											return (
												<div
													key={item.size}
													className={clsx(
														'w-12 h-12 flex items-center justify-center rounded-md border transition',
														{
															'cursor-not-allowed opacity-50': isOutOfStock,
															'cursor-pointer hover:bg-blue-50': !isOutOfStock,
															'border-blue-500 bg-blue-100': isSelected,
															'border-gray-300': !isSelected,
														},
													)}
													onClick={() => {
														if (!isOutOfStock) {
															setSelectedSize(item)
														}
													}}
												>
													<span className="font-medium text-sm">{item.size}</span>
												</div>
											)
										})}
									</Group>
								</Stack>

								<Group gap="lg">
									<Stack gap={0}>
										<Text fz="sm" fw={500}>
											Giá
										</Text>
										<Text fw={700} size="xl">
											{selectedSize.price.toLocaleString()} ₫
										</Text>
									</Stack>

									<NumberInput
										label="Số lượng"
										value={quantity}
										onChange={(val) => setQuantity(Number(val) || 1)}
										min={1}
										max={product.sizes[0].stock}
										w={120}
									/>
								</Group>
							</Stack>

							<Group gap="sm" wrap="nowrap">
								<div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2">
									<div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
										<IconTruckDelivery size={16} className="text-blue-600" />
									</div>
									<span className="text-sm font-medium text-blue-700">Miễn phí giao hàng</span>
								</div>

								<div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2">
									<div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
										<IconHeadset size={16} className="text-blue-600" />
									</div>
									<span className="text-sm font-medium text-blue-700">Phục vụ 24/7</span>
								</div>

								<div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2">
									<div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
										<IconRefresh size={16} className="text-blue-600" />
									</div>
									<span className="text-sm font-medium text-blue-700">Thu đổi 48h</span>
								</div>
							</Group>

							<Group gap="sm" mt="md">
								<Button
									size="lg"
									variant="filled"
									leftSection={<IconShoppingCart size={18} />}
									onClick={() => {
										if (!isAuthenticated) {
											navigate(ROUTE_PATH.AUTH.LOGIN)
											return
										}
									}}
								>
									Thêm vào giỏ hàng
								</Button>

								<Button
									size="lg"
									color="yellow.4"
									variant="outline"
									leftSection={<IconBolt size={18} />}
									onClick={() => {
										if (!isAuthenticated) {
											navigate(ROUTE_PATH.AUTH.LOGIN)
											return
										}
									}}
								>
									Mua ngay
								</Button>
							</Group>
						</Stack>
					</Grid.Col>
				</Grid>
				<Space h={1} />
				<Tabs defaultValue="description">
					<Tabs.List>
						<Tabs.Tab
							value="description"
							fz="md"
							py="sm"
							px="md"
							leftSection={<IconFileText size={18} />}
						>
							Mô tả
						</Tabs.Tab>

						<Tabs.Tab
							value="additional"
							fz="md"
							py="sm"
							px="md"
							leftSection={<IconInfoCircle size={18} />}
						>
							Thông tin thêm
						</Tabs.Tab>

						<Tabs.Tab value="reviews" fz="md" py="sm" px="md" leftSection={<IconStar size={18} />}>
							Đánh giá
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="description" pt="md">
						<Text>{product.description}</Text>
					</Tabs.Panel>

					<Tabs.Panel value="additional" pt="md">
						<Stack gap="xs">
							<Group justify="space-between">
								<Text fw={500}>Danh mục</Text>
								<Text>{product.category.name}</Text>
							</Group>

							<Group justify="space-between">
								<Text fw={500}>Giá</Text>
								<Text>{selectedSize.price.toLocaleString()} ₫</Text>
							</Group>

							<Group justify="space-between">
								<Text fw={500}>Tồn kho</Text>
								<Text>{selectedSize.stock}</Text>
							</Group>

							<Group justify="space-between">
								<Text fw={500}>Đánh giá</Text>
								<Rating
									value={product.rating}
									readOnly
									fractions={10}
									size="sm"
									color="yellow.4
								"
								/>
							</Group>
						</Stack>
					</Tabs.Panel>

					<Tabs.Panel value="reviews" pt="md">
						<Stack align="center" c="dimmed">
							<Text>Chưa có đánh giá nào</Text>
						</Stack>
					</Tabs.Panel>
				</Tabs>
				<Space h={10} />
				<Divider />
				<Stack gap="sm">
					<Title order={3} fw={600} fz="lg">
						Sản phẩm liên quan
					</Title>
					<Grid gutter="md">
						{MOCK_PRODUCTS.filter((p) => p.id !== product.id)
							.slice(0, 6)
							.map((relatedProduct) => (
								<Grid.Col
									key={relatedProduct.id}
									span={{ base: 12, xs: 6, sm: 6, md: 4, lg: 3, xl: 2 }}
								>
									<ProductCard product={relatedProduct} variant={PRODUCT_CARD_VARIANT.V2} />
								</Grid.Col>
							))}
					</Grid>
				</Stack>
			</ContentPage>
		</Stack>
	)
}

export default ProductDetailPage
