/*
 * @author: Razvan Rauta
 * Date: 14.12.2019
 * Time: 18:49
 */

import React from 'react';
import styles from './CollectionItem.scss';
import CustomButton from '../custom-button/CustomButton';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';

const CollectionItem = ({ item, addItem }) => {
	const { name, price, imageUrl } = item;
	return (
		<div className={styles.collectionItem}>
			<div
				className={styles.image}
				style={{
					backgroundImage: `url(${imageUrl})`
				}}
			/>
			<div className={styles.collectionFooter}>
				<span className={styles.name}>{name}</span>
				<span className={styles.price}>${price}</span>
			</div>
			<CustomButton onClick={() => addItem(item)} inverted>
				ADD TO CART
			</CustomButton>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);
