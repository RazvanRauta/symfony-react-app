/*
 * @author: Razvan Rauta
 * Date: 14.12.2019
 * Time: 19:00
 */

import React from 'react';
import styles from './Spinner.scss';

const Spinner = () => (
	<div className={styles.spinnerContainer}>
		<div className={styles.loader} />
		<em>Loading...</em>
	</div>
);

export default Spinner;
