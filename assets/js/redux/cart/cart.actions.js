/**
 * @author Razvan Rauta
 * 22.12.2019
 * 20:34
 */
import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
	type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
	type: CartActionTypes.ADD_ITEM,
	payload: item
});
