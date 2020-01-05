/**
 * @author Razvan Rauta
 * 05.01.2020
 * 13:57
 */
import { takeLatest, call, put } from 'redux-saga/effects';

import ShopActionTypes from './shop.types';
import {
	fetchCollectionById_API,
	fetchCollections_API
} from '../../services/api';
import {
	fetchCollectionsByIdSuccess,
	fetchCollectionsFailure,
	fetchCollectionsSuccess
} from './shop.actions';

/**
 * Fetch all collections
 */
export function* fetchCollectionsAsync(action) {
	try {
		const collectionsMap = yield call(fetchCollections_API, action.token);

		yield put(fetchCollectionsSuccess(collectionsMap.data));
	} catch (error) {
		fetchCollectionsFailure(error.message);
	}
}

export function* fetchCollectionsStart() {
	yield takeLatest(
		ShopActionTypes.FETCH_COLLECTIONS_START,
		fetchCollectionsAsync
	);
}

/**
 * Fetch one collection by id
 */
export function* fetchCollectionByIdAsync(action) {
	try {
		const collectionMap = yield call(fetchCollectionById_API, action);

		yield put(fetchCollectionsByIdSuccess(collectionMap.data));
	} catch (error) {
		fetchCollectionsFailure(error.message);
	}
}

export function* fetchCollectionByIdStart() {
	yield takeLatest(
		ShopActionTypes.FETCH_COLLECTION_BY_ID_START,
		fetchCollectionByIdAsync
	);
}
