/*
 * @author: Razvan Rauta
 * Date: 25.12.2019
 * Time: 11:43
 */

import React from 'react';
import styles from './CheckoutItem.scss';

const CheckoutItem = ({ cartItem: { name, imageUrl, price, quantity } }) => (
	<div className={styles.checkoutItem}>
		<div className={styles.imageContainer}>
			<img src={imageUrl} alt="item" />
		</div>
		<span className={styles.name}>{name}</span>
		<span className={styles.quantity}>{quantity}</span>
		<span className={styles.price}>${price}</span>
		<div className={styles.removeButton}>&#10005;</div>
	</div>
);

export default CheckoutItem;
