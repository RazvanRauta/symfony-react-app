/*
 * @author: Razvan Rauta
 * Date: 14.12.2019
 * Time: 17:31
 */

import React from 'react';
import styles from './CollectionPreview.scss?module';
import CollectionItem from '../collection-item/CollectionItem';

const CollectionPreview = ({ title, products }) => (
	<div className={styles.collectionPreview}>
		<h1 className={styles.title}>{title.toUpperCase()}</h1>
		<div className={styles.preview}>
			{products
				.filter((item, idx) => idx < 4)
				.map(({ id, ...itemProps }) => (
					<CollectionItem key={id} {...itemProps} />
				))}
		</div>
	</div>
);

export default CollectionPreview;