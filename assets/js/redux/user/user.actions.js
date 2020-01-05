/**
 * @author Razvan Rauta
 * 22.12.2019
 * 18:18
 */

import UserActionType from './user.types';

export const logOutCurrentUser = () => ({
	type: UserActionType.LOG_OUT_CURRENT_USER
});

export const googleSignInStart = userInfo => ({
	type: UserActionType.GOOGLE_SIGN_IN_START,
	userInfo
});

export const googleSignInSuccess = token => ({
	type: UserActionType.GOOGLE_SIGN_IN_SUCCESS,
	payload: token.token
});

export const googleSignInFailure = error => ({
	type: UserActionType.GOOGLE_SIGN_IN_FAILURE,
	payload: error
});

export const emailSignInStart = userInfo => ({
	type: UserActionType.EMAIL_SIGN_IN_START,
	userInfo
});

export const emailSignInSuccess = token => ({
	type: UserActionType.EMAIL_SIGN_IN_SUCCESS,
	payload: token.token
});

export const emailSignInFailure = error => ({
	type: UserActionType.EMAIL_SIGN_IN_FAILURE,
	payload: error
});

export const fetchCurrentUserStart = token => ({
	type: UserActionType.FETCH_CURRENT_USER_START,
	token
});

export const fetchCurrentUserSuccess = user => ({
	type: UserActionType.FETCH_CURRENT_USER_SUCCESS,
	payload: user
});

export const fetchCurrentUserFailure = error => ({
	type: UserActionType.FETCH_CURRENT_USER_FAILURE,
	payload: error
});

export const registerUserStart = userData => ({
	type: UserActionType.REGISTER_USER_START,
	userData
});

export const registerUserSuccess = token => ({
	type: UserActionType.REGISTER_USER_SUCCESS,
	payload: token.token
});

export const registerUserFailure = error => ({
	type: UserActionType.REGISTER_USER_FAILURE,
	payload: error
});
