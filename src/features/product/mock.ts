import type { ProductItem } from './product.types'

export const MOCK_PRODUCTS: ProductItem[] = [
	{
		id: 1,
		name: 'Vòng tay thạch anh trắng',
		description: 'Mang lại sự bình an và năng lượng tích cực.',
		category: {
			id: 1,
			name: 'Vòng tay phong thủy',
			description: 'Các loại vòng tay mang ý nghĩa phong thủy và may mắn.',
		},
		rating: 4.8,
		thumbnail:
			'https://tse1.explicit.bing.net/th/id/OIP.-7pqmcLqoemujrL8w8ROrAHaJ3?rs=1&pid=ImgDetMain&o=7&rm=3',
		images: [
			'https://kimtuthap.vn/wp-content/uploads/2019/12/vong-thach-anh-trang-duc-560x560.jpg',
			'https://trangsuc88.vn/wp-content/uploads/2019/11/12sad-3.jpg',
		],
		sizes: [
			{ size: 16, price: 350000, stock: 10 },
			{ size: 17, price: 370000, stock: 6 },
			{ size: 18, price: 390000, stock: 4 },
		],
	},

	{
		id: 2,
		name: 'Vòng tay mắt hổ nâu',
		description: 'Tăng sự tự tin và thu hút tài lộc.',
		category: {
			id: 1,
			name: 'Vòng tay phong thủy',
			description: 'Các loại vòng tay mang ý nghĩa phong thủy và may mắn.',
		},
		rating: 4.6,
		thumbnail: 'https://kaia.vn/wp-content/uploads/2018/12/untitled-46.jpg',
		images: [
			'https://product.hstatic.net/200000920459/product/vong_tay_mat_ho_nau_2a_8_mix_lu_thong_nephrite_ma_vang_d5891a16ba634335a0584f69b4789776.jpg',
		],
		sizes: [
			{ size: 16, price: 420000, stock: 7 },
			{ size: 17, price: 440000, stock: 5 },
			{ size: 18, price: 460000, stock: 3 },
		],
	},

	{
		id: 3,
		name: 'Vòng tay obsidian đen',
		description: 'Hỗ trợ xua đuổi năng lượng tiêu cực.',
		category: {
			id: 2,
			name: 'Vòng tay đá tự nhiên',
			description: 'Vòng tay làm từ đá tự nhiên cao cấp.',
		},
		rating: 4.7,
		thumbnail:
			'https://tse1.mm.bing.net/th/id/OIP.z78S1DlFGZJ5bsiuaPikDAHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3',
		images: ['https://www.tuviphongthuy.vn/wp-content/uploads/2023/06/hac-dieu-thach.jpg'],
		sizes: [
			{ size: 15, price: 360000, stock: 8 },
			{ size: 16, price: 390000, stock: 6 },
			{ size: 17, price: 410000, stock: 4 },
		],
	},

	{
		id: 4,
		name: 'Vòng tay thạch anh tím',
		description: 'Giúp cải thiện giấc ngủ và tăng sự tập trung.',
		category: {
			id: 2,
			name: 'Vòng tay đá tự nhiên',
			description: 'Vòng tay làm từ đá tự nhiên cao cấp.',
		},
		rating: 4.9,
		thumbnail: 'https://kaia.vn/wp-content/uploads/2018/11/v34.jpg',
		images: [
			'https://kimtuthap.vn/wp-content/uploads/2023/05/vong-tay-phong-thuy-thach-anh-tim.jpg',
		],
		sizes: [
			{ size: 16, price: 450000, stock: 5 },
			{ size: 17, price: 480000, stock: 3 },
		],
	},

	{
		id: 5,
		name: 'Vòng tay mã não đỏ',
		description: 'Mang lại năng lượng tích cực và sự nhiệt huyết.',
		category: {
			id: 3,
			name: 'Vòng tay thời trang',
			description: 'Vòng tay thiết kế hiện đại, phù hợp nhiều phong cách.',
		},
		rating: 4.5,
		thumbnail: '/images/products/product-5.jpg',
		images: ['/images/products/product-5-1.jpg'],
		sizes: [
			{ size: 15, price: 300000, stock: 10 },
			{ size: 16, price: 320000, stock: 8 },
			{ size: 17, price: 340000, stock: 7 },
		],
	},
]
