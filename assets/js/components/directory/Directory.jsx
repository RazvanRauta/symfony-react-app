/*
 * @author: Razvan Rauta
 * Date: 08.12.2019
 * Time: 12:57
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';
import styles from './Directory.scss';
import MenuItem from '../menuItem/MenuItem';

const Directory = ({ sections }) => {
	return (
		<div className={styles.directoryMenu}>
			{sections.map(({ id, ...sectionProps }) => (
				<MenuItem key={id} {...sectionProps} />
			))}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
