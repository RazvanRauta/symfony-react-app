/**
 * @author Razvan Rauta
 * 28.12.2019
 * 12:40q
 */

import { createSelector } from 'reselect';

const selectDirectory = state => state.directory;
export const selectDirectorySections = createSelector(
	[selectDirectory],
	directory => directory.sections
);
