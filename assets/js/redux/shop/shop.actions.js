/**
 * @author Razvan Rauta
 * 04.01.2020
 * 14:40
 */
import ShopActionTypes from './shop.types';
import axios from 'axios';

export const fetchCollectionsStart = () => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_START
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

export const fetchCollectionsStartAsync = token => {
	return dispatch => {
		dispatch(fetchCollectionsStart());
		axios
			.get('/api/products', {
				headers: {
					Authorization: 'bearer ' + token
				}
			})
			.then(response => {
				const collectionsMap = response.data;
				dispatch(fetchCollectionsSuccess(collectionsMap));
			})
			.catch(error => {
				dispatch(fetchCollectionsFailure(error.response.statusText));
			});
	};
};

export const fetchCollectionByIdStartAsync = (token, collectionId) => {
	return dispatch => {
		dispatch(fetchCollectionsStart());
		axios
			.get(`/api/products/${collectionId}`, {
				headers: {
					Authorization: 'bearer ' + token
				}
			})
			.then(response => {
				const collectionMap = response.data;
				dispatch(fetchCollectionsByIdSuccess(collectionMap));
			})
			.catch(error => {
				dispatch(fetchCollectionsFailure(error.response.statusText));
			});
	};
};
