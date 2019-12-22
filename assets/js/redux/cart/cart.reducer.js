/**
 * @author Razvan Rauta
 * 22.12.2019
 * 20:34
 */

import CartActionTypes from './cart.types';
import { addItemCart } from './cart.utils';

const INITIAL_STATE = {
	hidden: true,
	cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CartActionTypes.TOGGLE_CART_HIDDEN:
			return {
				...state,
				hidden: !state.hidden
			};

		case CartActionTypes.ADD_ITEM:
			return {
				...state,
				cartItems: addItemCart(state.cartItems, action.payload)
			};

		default:
			return state;
	}
};

export default cartReducer;
