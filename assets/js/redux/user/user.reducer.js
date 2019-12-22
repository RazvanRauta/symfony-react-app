/**
 * @author Razvan Rauta
 * 22.12.2019
 * 17:54
 */

import { UserActionType } from './user.types';

const INITiAL_STATE = {
	currentUser: null
};
const userReducer = (state = INITiAL_STATE, action) => {
	switch (action.type) {
		case UserActionType.SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload
			};
		default:
			return state;
	}
};

export default userReducer;
