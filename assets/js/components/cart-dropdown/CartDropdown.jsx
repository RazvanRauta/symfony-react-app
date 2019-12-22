/*
 * @author: Razvan Rauta
 * Date: 22.12.2019
 * Time: 19:43
 */

import React from 'react';
import styles from './CartDropdown.scss';
import CustomButton from '../custom-button/CustomButton';

const CartDropdown = () => (
	<div className={styles.cartDropdown}>
		<div className={styles.cartItems}></div>
		<CustomButton>GOT TO CHECKOUT</CustomButton>
	</div>
);

export default CartDropdown;
