/*
 * @author: Razvan Rauta
 * Date: 25.12.2019
 * Time: 11:03
 */

import React from 'react';
import styles from './CheckoutPage.styles.scss';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCartItems, selectCartTotal} from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/chckout-item/CheckoutItem';

const CheckoutPage = ({ cartItems, total }) => (
	<div className={styles.checkoutPage}>
		<div className={styles.checkoutHeader}>
			<div className={styles.headerBlock}>
				<span>Product</span>
			</div>
			<div className={styles.headerBlock}>
				<span>Description</span>
			</div>
			<div className={styles.headerBlock}>
				<span>Quantity</span>
			</div>
			<div className={styles.headerBlock}>
				<span>Price</span>
			</div>
			<div className={styles.headerBlock}>
				<span>Remove</span>
			</div>
		</div>
		{cartItems.map(cartItem => (
			<CheckoutItem key={cartItem.id} cartItem={cartItem} />
		))}
		<div className={styles.total}>
			<span>TOTAL: ${total}</span>
		</div>
	</div>
);

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
	total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);
