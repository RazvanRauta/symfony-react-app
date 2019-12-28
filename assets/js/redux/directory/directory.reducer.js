/**
 * @author Razvan Rauta
 * 28.12.2019
 * 12:30
 */
const INITiAL_STATE = {
	sections: [
		{
			title: 'hats',
			imageUrl: '/images/hats.png',
			id: 1,
			linkUrl: 'shop/hats'
		},
		{
			title: 'jackets',
			imageUrl: '/images/jackets.png',
			id: 2,
			linkUrl: 'shop/jackets'
		},
		{
			title: 'sneakers',
			imageUrl: '/images/sneakers.png',
			id: 3,
			linkUrl: 'shop/sneakers'
		},
		{
			title: 'women',
			imageUrl: '/images/womens.png',
			size: 'large',
			id: 4,
			linkUrl: 'shop/women'
		},
		{
			title: 'men',
			imageUrl: '/images/men.png',
			size: 'large',
			id: 5,
			linkUrl: 'shop/men'
		}
	]
};

const directoryReducer = (state = INITiAL_STATE, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default directoryReducer;
