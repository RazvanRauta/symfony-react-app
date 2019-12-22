/**
 * @author Razvan Rauta
 * 22.12.2019
 * 18:18
 */

import {UserActionType} from './user.types';

export const setCurrentUser = user => ({
	type: UserActionType.SET_CURRENT_USER,
	payload: user
});
