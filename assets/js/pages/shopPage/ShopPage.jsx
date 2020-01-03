/*
 * @author: Razvan Rauta
 * Date: 14.12.2019
 * Time: 15:22
 */

import React from 'react';
import { Route } from 'react-router-dom';
import styles from './ShopPage.styles.scss';
import CollectionsOverview from '../../components/collections-overview/CollectionsOverview';
import CategoryPage from '../collectionPage/CollectionPage';

const ShopPage = ({ match }) => (
	<div className={styles.shopPage}>
		<Route
			exact
			path={`${match.path}`}
			render={() => <CollectionsOverview />}
		/>
		<Route path={`${match.path}/:collectionId`} component={CategoryPage} />
	</div>
);

export default ShopPage;
