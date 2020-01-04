/*
 * @author: Razvan Rauta
 * Date: 14.12.2019
 * Time: 15:22
 */

import React from 'react';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../../components/collections-overview/CollectionsOverview';
import CollectionPage from '../collectionPage/CollectionPage';

const ShopPage = ({ match }) => (
	<div>
		<Route
			exact
			path={`${match.path}`}
			render={() => <CollectionsOverview />}
		/>
		<Route path={`${match.path}/:collectionId`} component={CollectionPage} />
	</div>
);

export default ShopPage;
