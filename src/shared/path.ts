export const PATH_ITEM = {
	AUTH: {
		ROOT: 'auth',
		LOGIN: 'login',
		REGISTER: 'register',
	},
	ADMIN: {
		ROOT: 'admin',
		MANAGER_CATEGORY: 'manager-category',
	},
}

export const ROUTE_PATH = {
	HOME: '/',
	AUTH: {
		LOGIN: `/${PATH_ITEM.AUTH.ROOT}/${PATH_ITEM.AUTH.LOGIN}`,
		REGISTER: `/${PATH_ITEM.AUTH.ROOT}/${PATH_ITEM.AUTH.REGISTER}`,
	},
	ADMIN: {
		MANAGER_CATEGORY: `/${PATH_ITEM.ADMIN.ROOT}/${PATH_ITEM.ADMIN.MANAGER_CATEGORY}`,
	},
}
