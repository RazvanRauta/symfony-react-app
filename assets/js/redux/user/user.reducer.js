/**
 * @author Razvan Rauta
 * 22.12.2019
 * 17:54
 */

import UserActionType from './user.types';

const INITiAL_STATE = {
	currentUser: null,
	isLoading: false,
	errorMessage: undefined,
	token: null
};
const userReducer = (state = INITiAL_STATE, action) => {
	switch (action.type) {
		case UserActionType.LOG_OUT_CURRENT_USER:
			return {
				...state,
				currentUser: null,
				token: null,
				errorMessage: undefined
			};
		case UserActionType.GOOGLE_SIGN_IN_START:
		case UserActionType.EMAIL_SIGN_IN_START:
		case UserActionType.FETCH_CURRENT_USER_START:
		case UserActionType.REGISTER_USER_START:
			return {
				...state,
				isLoading: true,
				errorMessage: undefined
			};
		case UserActionType.GOOGLE_SIGN_IN_SUCCESS:
		case UserActionType.EMAIL_SIGN_IN_SUCCESS:
		case UserActionType.REGISTER_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				token: action.payload,
				errorMessage: undefined
			};
		case UserActionType.FETCH_CURRENT_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				currentUser: action.payload,
				errorMessage: undefined
			};
		case UserActionType.GOOGLE_SIGN_IN_FAILURE:
		case UserActionType.EMAIL_SIGN_IN_FAILURE:
		case UserActionType.FETCH_CURRENT_USER_FAILURE:
		case UserActionType.REGISTER_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				errorMessage: action.payload
			};
		default:
			return state;
	}
};

export default userReducer;
