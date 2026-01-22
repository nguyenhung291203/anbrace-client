import { notifications } from '@mantine/notifications'
import { IconCheck, IconX, IconAlertTriangle, IconInfoCircle } from '@tabler/icons-react'

type NotifyOptions = {
	title?: string
	message: string
	autoClose?: number
}

export const notifySuccess = ({
	title = 'Thành công',
	message,
	autoClose = 3000,
}: NotifyOptions) => {
	notifications.show({
		title,
		message,
		color: 'green.5',
		icon: <IconCheck size={18} />,
		autoClose,
	})
}

export const notifyError = ({ title = 'Lỗi', message, autoClose = 4000 }: NotifyOptions) => {
	notifications.show({
		title,
		message,
		color: 'red.4',
		icon: <IconX size={18} />,
		autoClose,
	})
}

export const notifyWarning = ({ title = 'Cảnh báo', message, autoClose = 4000 }: NotifyOptions) => {
	notifications.show({
		title,
		message,
		color: 'yellow.4',
		icon: <IconAlertTriangle size={18} />,
		autoClose,
	})
}

export const notifyInfo = ({ title = 'Thông tin', message, autoClose = 3000 }: NotifyOptions) => {
	notifications.show({
		title,
		message,
		color: 'blue.4',
		icon: <IconInfoCircle size={18} />,
		autoClose,
	})
}
