import { Box, Group, Stack, UnstyledButton, useMantineTheme } from '@mantine/core'

import FilterSectionHeader from './FilterSectionHeader'
import { BRACELET_SIZES } from '../product.constant'

interface BraceletSizeFilterProps {
	value?: number[]
	onChange: (sizes: number[]) => void
}

const BraceletSizeFilter = ({ value = [], onChange }: BraceletSizeFilterProps) => {
	const theme = useMantineTheme()

	const toggleSize = (size: number) => {
		const next = value.includes(size) ? value.filter((s) => s !== size) : [...value, size]

		onChange(next)
	}

	return (
		<Stack gap={0}>
			<FilterSectionHeader title="Size vòng tay" />

			<Box px="xs" py="sm">
				<Group gap="xs">
					{BRACELET_SIZES.map((size) => {
						const active = value.includes(size)

						return (
							<UnstyledButton
								key={size}
								onClick={() => toggleSize(size)}
								style={{
									width: 40,
									height: 40,
									borderRadius: '50%',
									border: active
										? `2px solid ${theme.colors[theme.primaryColor][6]}`
										: `1px solid ${theme.colors.gray[4]}`,
									background: active ? theme.colors[theme.primaryColor][0] : theme.white,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontWeight: 600,
									fontSize: 14,
									color: active ? theme.colors[theme.primaryColor][7] : theme.colors.dark[6],
									transition: 'all 0.2s ease',
								}}
							>
								{size}
							</UnstyledButton>
						)
					})}
				</Group>
			</Box>
		</Stack>
	)
}

export default BraceletSizeFilter
