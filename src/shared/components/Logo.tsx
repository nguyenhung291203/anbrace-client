import { Group, Text, ThemeIcon } from '@mantine/core'
import { IconCircleDot } from '@tabler/icons-react'

const Logo = ({ isToggle = true }) => (
	<Group gap="xs">
		<ThemeIcon size={36} radius="xl" variant="outline" color="gray">
			<IconCircleDot size={18} />
		</ThemeIcon>

		{isToggle && (
			<Text fw={700} fz="h3">
				THESIS
			</Text>
		)}
	</Group>
)

export default Logo
