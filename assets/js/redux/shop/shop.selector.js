/**
 * @author Razvan Rauta
 * 04.01.2020
 * 14:57
 */
import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
	[selectShop],
	shop => shop.collections
);

export const selectCollection = createSelector(
	[selectShop],
	shop => shop.collection
);

export const selectCollectionsForPreview = createSelector(
	[selectCollections],
	collections =>
		collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollectionByIdForPreview = createSelector(
	[selectCollection],
	collection =>
		collection ? Object.keys(collection).map(key => collection[key]) : []
);

export const selectIsCollectionFetching = createSelector(
	[selectShop],
	shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
	[selectShop],
	shop => !!shop.collections
);

export const selectIsCollectionLoaded = createSelector(
	[selectShop],
	shop => !!shop.collection
);
