/**
 * @author Razvan Rauta
 * 22.12.2019
 * 21:40
 */

export const addItemCart = (cartItems, cartItemToAdd) => {
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === cartItemToAdd.id
	);
	if (existingCartItem) {
		return cartItems.map(cartItem =>
			cartItem.id === cartItemToAdd.id
				? {...cartItem, quantity: cartItem.quantity + 1}
				: cartItem
		);
	}

	return [...cartItems, {...cartItemToAdd, quantity: 1}];
};
