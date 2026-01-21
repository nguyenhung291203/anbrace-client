import { Box, Title, useMantineTheme } from '@mantine/core'
import { FC, ReactNode } from 'react'

interface FilterSectionHeaderProps {
	title: string
	rightSection?: ReactNode
}

const FilterSectionHeader: FC<FilterSectionHeaderProps> = ({ title, rightSection }) => {
	const theme = useMantineTheme()
	return (
		<Box
			bg="primary"
			px="md"
			py="sm"
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				borderRadius: theme.radius.sm,
			}}
		>
			<Title order={5} c="white" fw={700} tt="uppercase">
				{title}
			</Title>

			{rightSection}
		</Box>
	)
}

export default FilterSectionHeader
