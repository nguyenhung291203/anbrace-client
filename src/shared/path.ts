export const PATH_ITEM = {
	AUTH: {
		ROOT: 'auth',
		LOGIN: 'login',
		REGISTER: 'register',
	},
}

export const ROUTE_PATH = {
	HOME: '/',
	AUTH: {
		LOGIN: `${PATH_ITEM.AUTH.ROOT}/${PATH_ITEM.AUTH.LOGIN}`,
		REGISTER: `${PATH_ITEM.AUTH.ROOT}/${PATH_ITEM.AUTH.REGISTER}`,
	},
}
