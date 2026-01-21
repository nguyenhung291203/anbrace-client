import { Center, Loader, Text } from '@mantine/core'
import { ReactNode } from 'react'

interface DataWrapperProps {
	loading: boolean
	success: boolean
	children: ReactNode
	fallback?: ReactNode
}

const DataWrapper = ({ loading, success, children, fallback }: DataWrapperProps) => {
	if (loading) {
		return (
			<Center h={200}>
				<Loader />
			</Center>
		)
	}

	if (!success) {
		return <Center h={200}>{fallback ?? <Text c="dimmed">Không có dữ liệu</Text>}</Center>
	}

	return <>{children}</>
}

export default DataWrapper
