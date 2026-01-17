import { Title } from '@mantine/core'
import { memo, type FC } from 'react'

interface TitlePageProps {
	title: string
}

const TitlePage: FC<TitlePageProps> = ({ title }) => {
	return (
		<Title order={2} fw={600} fz="lg">
			{title}
		</Title>
	)
}

export default memo(TitlePage)
