/**
 * @author Razvan Rauta
 * 04.01.2020
 * 14:32
 */
import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
	collections: null,
	collection: null,
	isFetching: false,
	errorMessage: undefined
};

const shopReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ShopActionTypes.FETCH_COLLECTIONS_START:
			return {
				...state,
				isFetching: true
			};
		case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
			return {
				...state,
				isFetching: false,
				collections: action.payload
			};
		case ShopActionTypes.FETCH_COLLECTION_BY_ID_SUCCESS:
			return {
				...state,
				isFetching: false,
				collection: action.payload
			};
		case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload
			};
		default:
			return state;
	}
};

export default shopReducer;
