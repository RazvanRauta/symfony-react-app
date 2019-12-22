/*
 * @author: Razvan Rauta
 * Date: 22.12.2019
 * Time: 19:26
 */

import React from 'react';
import { ReactComponent as ShoppingIcon } from '../../../images/shopping-bag.svg';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import styles from './CartIcon.scss';

const CartIcon = ({ toggleCartHidden }) => (
	<div className={styles.cartIcon} onClick={toggleCartHidden}>
		<ShoppingIcon className={styles.shoppingIcon} />
		<span className={styles.itemCount}>0</span>
	</div>
);

const mapDispatchToProps = dispatch => ({
	toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(null, mapDispatchToProps)(CartIcon);
