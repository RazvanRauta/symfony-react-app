/**
 * @author Razvan Rauta
 * 22.12.2019
 * 17:54
 */

const INITiAL_STATE = {
	currentUser: null
};
const userReducer = (state = INITiAL_STATE, action) => {
	switch (action.type) {
		case 'SET_CURRENT_USER':
			return {
				...state,
				currentUser: action.payload
			};
		default:
			return state;
	}
};

export default userReducer;
