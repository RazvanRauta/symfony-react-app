/*
 * @author: Razvan Rauta
 * Date: 22.12.2019
 * Time: 19:43
 */

import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { withRouter } from 'react-router-dom';
import styles from './CartDropdown.scss';
import CustomButton from '../custom-button/CustomButton';
import CartItem from '../cart-item/CartItem';

const useOutsideAlerter = (ref, dispatch) => {
	const handleClickOutside = event => {
		if (ref.current && !ref.current.contains(event.target)) {
			dispatch(toggleCartHidden());
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});
};

const CartDropdown = ({ cartItems, history, dispatch }) => {
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef, dispatch);
	return (
		<div className={styles.cartDropdown} ref={wrapperRef}>
			<div className={styles.cartItems}>
				{cartItems.length ? (
					cartItems.map(cartItem => (
						<CartItem key={cartItem.id} item={cartItem} />
					))
				) : (
					<span className={styles.emptyMessage}>Your cart is empty</span>
				)}
			</div>
			<CustomButton
				onClick={() => {
					history.push('/checkout');
					dispatch(toggleCartHidden());
				}}
			>
				GO TO CHECKOUT
			</CustomButton>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
