/*
 * @author: Razvan Rauta
 * Date: 14.12.2019
 * Time: 18:49
 */
import styles from './CollectionItem.scss';

import React from 'react';

const CollectionItem = ({ name, price, imageUrl }) => (
	<div className={styles.collectionItem}>
		<div
			className={styles.image}
			style={{
				backgroundImage: `url(${imageUrl})`
			}}
		/>
		<div className={styles.collectionFooter}>
			<span className={styles.name}>{name}</span>
			<span className={styles.price}>{price} $</span>
		</div>
	</div>
);

export default CollectionItem;
