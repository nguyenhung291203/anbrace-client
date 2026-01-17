import { create } from 'zustand'

export const NAVBAR_WIDTH = 300
export const NAVBAR_COLLAPSED_WIDTH = 100
export const HEADER_HEIGHT = 90

interface LayoutState {
	opened: boolean
	navbarWidth: number
	headerHeight: number

	openNavbar: () => void
	closeNavbar: () => void
	toggleNavbar: () => void
}

export const useLayoutStore = create<LayoutState>((set, get) => ({
	opened: false,
	navbarWidth: NAVBAR_COLLAPSED_WIDTH,
	headerHeight: HEADER_HEIGHT,

	openNavbar: () =>
		set({
			opened: true,
			navbarWidth: NAVBAR_WIDTH,
		}),

	closeNavbar: () =>
		set({
			opened: false,
			navbarWidth: NAVBAR_COLLAPSED_WIDTH,
		}),

	toggleNavbar: () => {
		const { opened } = get()
		set({
			opened: !opened,
			navbarWidth: opened ? NAVBAR_COLLAPSED_WIDTH : NAVBAR_WIDTH,
		})
	},
}))
