/**
 * @author Razvan Rauta
 * 07.01.2020
 * 15:33
 */

import { all, call, takeLatest, put } from 'redux-saga/effects';
import UserActionType from '../user/user.types';
import { clearCart } from './cart.actions';

export function* clearCartOnLogOut() {
	yield put(clearCart());
}

export function* onUserLogOut() {
	yield takeLatest(UserActionType.LOG_OUT_CURRENT_USER, clearCartOnLogOut);
}

export function* cartSagas() {
	yield all([call(onUserLogOut)]);
}
