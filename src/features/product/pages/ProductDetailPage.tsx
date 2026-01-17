import {
	Button,
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
	IconInfoCircle,
	IconShoppingCart,
	IconStar,
} from '@tabler/icons-react'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { MOCK_PRODUCTS } from '../mock'

import { useAuthStore } from '@/features/auth/auth.store'
import ContentPage from '@/shared/components/ContentPage'
import TitlePage from '@/shared/components/TitlePage'
import { ROUTE_PATH } from '@/shared/constants/path.constant'

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

								<Group gap="lg">
									<Stack gap={0}>
										<Text fz="sm" fw={500}>
											Giá
										</Text>
										<Text fw={700} size="xl">
											{product.price.toLocaleString()} ₫
										</Text>
									</Stack>

									<NumberInput
										label="Số lượng"
										value={quantity}
										onChange={(val) => setQuantity(Number(val) || 1)}
										min={1}
										max={product.stock}
										w={120}
									/>
								</Group>
							</Stack>
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
								<Text>{product.price.toLocaleString()} ₫</Text>
							</Group>

							<Group justify="space-between">
								<Text fw={500}>Tồn kho</Text>
								<Text>{product.stock}</Text>
							</Group>

							<Group justify="space-between">
								<Text fw={500}>Đánh giá</Text>
								<Rating value={product.rating} readOnly fractions={10} size="sm" />
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
			</ContentPage>
		</Stack>
	)
}

export default ProductDetailPage
