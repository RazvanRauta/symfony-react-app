/**
 * @author Razvan Rauta
 * 05.01.2020
 * 15:36
 */
import { all, call } from 'redux-saga/effects';
import {
	fetchCollectionsStart,
	fetchCollectionByIdStart
} from './shop/shop.sagas';
import {
	onEmailSignInStart,
	onFetchingUser,
	onGoogleSignInStart,
	onUserRegistration
} from './user/user.sagas';

export default function* rootSaga() {
	yield all([
		call(fetchCollectionsStart),
		call(fetchCollectionByIdStart),
		call(onGoogleSignInStart),
		call(onFetchingUser),
		call(onEmailSignInStart),
		call(onUserRegistration)
	]);
}
