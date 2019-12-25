/*
 * @author: Razvan Rauta
 * Date: 22.12.2019
 * Time: 21:55
 */

import React from 'react';
import styles from './CartItem.scss';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
	<div className={styles.cartItem}>
		<img src={imageUrl} alt="item" />
		<div className={styles.itemDetails}>
			<span className={styles.name}>{name}</span>
			<span className={styles.price}>
				{quantity} x ${price}
			</span>
		</div>
	</div>
);

export default CartItem;
