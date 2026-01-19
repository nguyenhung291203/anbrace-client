import { ActionIcon, Badge, Card, Group, Image, Rating, Stack, Text } from '@mantine/core'
import { IconHeart, IconShoppingCart, IconHeartFilled } from '@tabler/icons-react'
import { FC, memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ProductItem } from '../product.types'

import { useAuthStore } from '@/features/auth/auth.store'
import { PATH_ITEM, ROUTE_PATH } from '@/shared/constants/path.constant'

interface ProductCardProps {
	product: ProductItem
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
	const navigate = useNavigate()
	const { isAuthenticated } = useAuthStore()
	const [isHovered, setIsHovered] = useState(false)
	const [isFavorite, setIsFavorite] = useState(false)

	return (
		<Card
			padding="sm"
			radius="md"
			withBorder
			w={240}
			style={{
				cursor: 'pointer',
				transition: 'all 0.3s ease',
				transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
				boxShadow: isHovered ? '0 8px 16px rgba(0, 0, 0, 0.12)' : '0 2px 6px rgba(0, 0, 0, 0.08)',
				borderColor: isHovered ? '#228be6' : '#e9ecef',
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={() => {
				navigate(`/${PATH_ITEM.PRODUCT.ROOT}/${product.id}`)
			}}
		>
			<Card.Section pos="relative" style={{ overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
				<Image
					src={product.thumbnail}
					h={160}
					fit="contain"
					style={{
						transition: 'transform 0.3s ease',
						transform: isHovered ? 'scale(1.05)' : 'scale(1)',
					}}
				/>

				<ActionIcon
					variant={isFavorite ? 'filled' : 'white'}
					color={isFavorite ? 'red' : 'gray'}
					radius="xl"
					pos="absolute"
					top={8}
					right={8}
					size="md"
					onClick={(e) => {
						e.stopPropagation()
						if (!isAuthenticated) {
							navigate(`${ROUTE_PATH.AUTH.LOGIN}`)
							return
						}
						setIsFavorite(!isFavorite)
					}}
					style={{
						transition: 'all 0.2s ease',
						transform: isFavorite ? 'scale(1.1)' : 'scale(1)',
						boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
					}}
				>
					{isFavorite ? <IconHeartFilled size={14} /> : <IconHeart size={14} />}
				</ActionIcon>
			</Card.Section>

			<Stack gap={6} mt="sm">
				<Text
					fw={600}
					lineClamp={2}
					size="sm"
					style={{
						minHeight: '2.6em',
						lineHeight: '1.3em',
					}}
				>
					{product.name}
				</Text>

				<Group gap={6} align="center" wrap="nowrap">
					<Badge
						variant="light"
						color="green"
						size="xs"
						tt="uppercase"
						style={{
							fontWeight: 600,
							fontSize: '9px',
						}}
					>
						{product.category.name}
					</Badge>

					<Group gap={2} style={{ flex: 1, justifyContent: 'flex-end' }} wrap="nowrap">
						<Rating value={product.rating} fractions={10} readOnly size="xs" color="yellow.4" />
						<Text size="10px" c="dimmed" fw={500}>
							{product.rating}
						</Text>
					</Group>
				</Group>

				<Group justify="space-between" align="flex-end" mt="xs">
					<Text
						fw={700}
						c="primary"
						size="lg"
						style={{
							lineHeight: 1.2,
						}}
					>
						{product.sizes[0].price.toLocaleString()}₫
					</Text>

					<ActionIcon
						radius="xl"
						size="lg"
						variant="filled"
						onClick={(e) => {
							e.stopPropagation()
						}}
						style={{
							transition: 'all 0.2s ease',
							transform: isHovered ? 'scale(1.1)' : 'scale(1)',
							boxShadow: isHovered
								? '0 4px 10px rgba(34, 139, 230, 0.4)'
								: '0 2px 6px rgba(34, 139, 230, 0.3)',
						}}
					>
						<IconShoppingCart size={18} stroke={2} />
					</ActionIcon>
				</Group>
			</Stack>
		</Card>
	)
}

export default memo(ProductCard)
