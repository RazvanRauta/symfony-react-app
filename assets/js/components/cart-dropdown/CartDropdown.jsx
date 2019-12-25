/*
 * @author: Razvan Rauta
 * Date: 22.12.2019
 * Time: 19:43
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import styles from './CartDropdown.scss';
import CustomButton from '../custom-button/CustomButton';
import CartItem from '../cart-item/CartItem';

const CartDropdown = ({ cartItems }) => (
	<div className={styles.cartDropdown}>
		<div className={styles.cartItems}>
			{cartItems.map(cartItem => (
				<CartItem key={cartItem.id} item={cartItem} />
			))}
		</div>
		<CustomButton>GOT TO CHECKOUT</CustomButton>
	</div>
);

const mapStateToProps = state => ({ cartItems: selectCartItems(state) });

export default connect(mapStateToProps)(CartDropdown);
