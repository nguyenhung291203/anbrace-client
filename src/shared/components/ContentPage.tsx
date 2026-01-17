import { Stack, type StackProps } from '@mantine/core'
import { type FC, type ReactNode } from 'react'

interface ContentPageProps extends StackProps {
	children: ReactNode
}

const ContentPage: FC<ContentPageProps> = ({ children }) => {
	return (
		<Stack bg="white" p="md" style={(theme) => ({ borderRadius: theme.radius.sm })}>
			{children}
		</Stack>
	)
}

export default ContentPage
