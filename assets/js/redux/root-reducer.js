/**
 * @author Razvan Rauta
 * 22.12.2019
 * 17:52
 */
import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';

export default combineReducers({
	user: userReducer
});
