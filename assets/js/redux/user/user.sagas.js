/**
 * @author Razvan Rauta
 * 05.01.2020
 * 17:40
 */

import { all, takeLatest, call, put } from 'redux-saga/effects';
import UserActionType from './user.types';
import {
	emailSignInFailure,
	emailSignInSuccess,
	fetchCurrentUserFailure,
	fetchCurrentUserSuccess,
	googleSignInFailure,
	googleSignInSuccess,
	registerUserFailure,
	registerUserSuccess
} from './user.actions';
import {
	emailLogin_API,
	fetchCurrentUser_API,
	googleLogin_API,
	registerUser_API
} from '../../services/api';

export function* signInWithGoogle(action) {
	try {
		const tokenResponse = yield call(googleLogin_API, action.userInfo);
		yield put(googleSignInSuccess(tokenResponse.data));

		const userResponse = yield call(
			fetchCurrentUser_API,
			tokenResponse.data.token
		);
		yield put(fetchCurrentUserSuccess(userResponse.data));
	} catch (error) {
		yield put(googleSignInFailure(error));
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(UserActionType.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail(action) {
	try {
		const tokenResponse = yield call(emailLogin_API, action.userInfo);
		yield put(emailSignInSuccess(tokenResponse.data));

		const userResponse = yield call(
			fetchCurrentUser_API,
			tokenResponse.data.token
		);
		yield put(fetchCurrentUserSuccess(userResponse.data));
	} catch (error) {
		yield put(emailSignInFailure(error));
	}
}

export function* onEmailSignInStart() {
	yield takeLatest(UserActionType.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* fetchCurrentUser(action) {
	try {
		const userResponse = yield call(fetchCurrentUser_API, action.token);
		yield put(fetchCurrentUserSuccess(userResponse.data));
	} catch (error) {
		yield put(fetchCurrentUserFailure(error));
	}
}

export function* onFetchingUser() {
	yield takeLatest(UserActionType.FETCH_CURRENT_USER_START, fetchCurrentUser);
}

export function* registerUser(action) {
	try {
		const tokenResponse = yield call(registerUser_API, action.userData);
		yield put(registerUserSuccess(tokenResponse.data));

		const userResponse = yield call(
			fetchCurrentUser_API,
			tokenResponse.data.token
		);
		yield put(fetchCurrentUserSuccess(userResponse.data));
	} catch (error) {
		yield put(registerUserFailure(error));
	}
}

export function* onUserRegistration() {
	yield takeLatest(UserActionType.REGISTER_USER_START, registerUser);
}

export function* userSagas() {
	yield all([
		call(onGoogleSignInStart),
		call(onFetchingUser),
		call(onEmailSignInStart),
		call(onUserRegistration)
	]);
}
