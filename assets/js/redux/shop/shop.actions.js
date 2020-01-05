/**
 * @author Razvan Rauta
 * 04.01.2020
 * 14:40
 */
import ShopActionTypes from './shop.types';

export const fetchCollectionsStart = token => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_START,
	token
});

export const fetchCollectionByIdStart = (token, collectionId) => ({
	type: ShopActionTypes.FETCH_COLLECTION_BY_ID_START,
	token,
	collectionId
});

export const fetchCollectionsSuccess = collectionsMap => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
	payload: collectionsMap
});

export const fetchCollectionsByIdSuccess = collectionMap => ({
	type: ShopActionTypes.FETCH_COLLECTION_BY_ID_SUCCESS,
	payload: collectionMap
});

export const fetchCollectionsFailure = error => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
	payload: error
});
