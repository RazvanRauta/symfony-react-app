/**
 * @author Razvan Rauta
 * 25.12.2019
 * 10:18
 */

import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
	[selectUser],
	user => user.currentUser
);

export const selectIsUserLoading = createSelector(
	[selectUser],
	user => user.isLoading
);

export const selectIsTokenLoading = createSelector(
	[selectUser],
	user => user.isLoading
);

export const selectIsUserLoaded = createSelector(
	[selectUser],
	user => !!user.currentUser
);

export const selectCurrentToken = createSelector(
	[selectUser],
	user => user.token
);

export const selectIsTokenLoaded = createSelector(
	[selectUser],
	user => !!user.token
);

export const selectUserErrorMessage = createSelector(
	[selectUser],
	user => user.errorMessage
);
