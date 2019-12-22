/**
 * @author Razvan Rauta
 * 22.12.2019
 * 20:34
 */

import CartActionTypes from './cart.types';

const INITIAL_STATE = {
	hidden: true
};

const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CartActionTypes.TOGGLE_CART_HIDDEN:
			return {
				...state,
				hidden: !state.hidden
			};

		default:
			return state;
	}
};

export default cartReducer;
