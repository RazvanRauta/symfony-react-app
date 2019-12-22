/*
 * @author: Razvan Rauta
 * Date: 15.12.2019
 * Time: 14:15
 */

import React from 'react';
import styles from './FormInput.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => (
	<div className={styles.group}>
		<input
			key={label}
			className={styles.formInput}
			onChange={handleChange}
			{...otherProps}
		/>
		{label ? (
			<label
				className={`${
					otherProps.value && otherProps.value.length ? styles.shrink : ''
				} ${styles.formInputLabel}`}
			>
				{label}
			</label>
		) : null}
	</div>
);

export default FormInput;
