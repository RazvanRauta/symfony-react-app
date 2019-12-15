/*
 * @author: Razvan Rauta
 * Date: 15.12.2019
 * Time: 15:19
 */

import React from 'react';
import styles from './CustomButton.scss';

const CustomButton = ({children, ...otherProps}) => (
    <button className={styles.customButton} {...otherProps}>
        {children}
    </button>
);

export default CustomButton;
