import {
	ActionIcon,
	Divider,
	Group,
	Indicator,
	Stack,
	TextInput,
	useMantineTheme,
} from '@mantine/core'
import {
	IconBell,
	IconLayoutSidebarLeftCollapse,
	IconLayoutSidebarRightCollapse,
	IconSearch,
} from '@tabler/icons-react'

import { useLayoutStore } from '../../shared/stores/main-layout.store'

const Header = () => {
	const theme = useMantineTheme()
	const { opened, toggleNavbar } = useLayoutStore()

	return (
		<Group px="md" justify="space-between" w="100%" h={80}>
			<ActionIcon
				variant="transparent"
				color="gray"
				onClick={toggleNavbar}
				aria-label="Toggle sidebar"
			>
				{opened ? (
					<IconLayoutSidebarLeftCollapse size={30} stroke={1.5} />
				) : (
					<IconLayoutSidebarRightCollapse size={30} stroke={1.5} />
				)}
			</ActionIcon>
			<Group gap="sm">
				<TextInput
					leftSection={<IconSearch stroke={1.2} size={theme.fontSizes.lg} />}
					radius="lg"
					w={340}
					styles={{
						input: {
							height: 36,
							border: `1px solid ${theme.colors.gray[2]}`,
						},
					}}
				/>
				<Group gap="sm" align="center">
					<Stack justify="center">
						<Divider h={theme.fontSizes.xl} size="sm" orientation="vertical" />
					</Stack>

					<ActionIcon variant="transparent" c="dark.2">
						<Indicator size={12} offset={4} color="red.5" withBorder processing>
							<IconBell size={22} />
						</Indicator>
					</ActionIcon>
				</Group>
			</Group>
		</Group>
	)
}

export default Header
