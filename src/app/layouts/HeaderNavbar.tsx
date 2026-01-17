import { Group } from '@mantine/core'
import { memo } from 'react'

import Logo from '@/shared/components/Logo'
import { useLayoutStore } from '@/shared/stores/main-layout.store'

const HeaderNavbar = () => {
	const { opened, headerHeight } = useLayoutStore()

	return (
		<Group
			gap="sm"
			py="sm"
			px="md"
			justify={opened ? 'space-between' : 'center'}
			style={(theme) => ({
				height: headerHeight,
				borderBottom: `1px solid ${theme.colors.gray[2]}`,
			})}
		>
			{opened ? <Logo /> : <Logo isToggle={false} />}
		</Group>
	)
}

export default memo(HeaderNavbar)
