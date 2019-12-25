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
