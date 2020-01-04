/*
 * @author: Razvan Rauta
 * Date: 14.12.2019
 * Time: 17:31
 */

import React from 'react';
import styles from './CollectionPreview.scss';
import CollectionItem from '../collection-item/CollectionItem';
import { Link } from 'react-router-dom';

const CollectionPreview = ({ title, products, routeName }) => (
	<div className={styles.collectionPreview}>
		<Link className={styles.title} to={`/shop/${routeName}`}>
			{title.toUpperCase()}
		</Link>
		<div className={styles.preview}>
			{products
				.filter((item, idx) => idx < 4)
				.map(item => (
					<CollectionItem key={item.id} item={item} />
				))}
		</div>
	</div>
);

export default CollectionPreview;
