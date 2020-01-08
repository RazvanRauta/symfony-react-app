/*
 * @author: Razvan Rauta
 * Date: 28.12.2019
 * Time: 14:43
 */

import React, { useEffect } from 'react';
import styles from './CollectionsOverview.scss';
import CollectionPreview from '../collection-preview/CollectionPreview';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
	selectCollectionsForPreview,
	selectIsCollectionFetching,
	selectIsCollectionsLoaded,
	selectShopErrorMessage
} from '../../redux/shop/shop.selector';
import { withRouter } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import {
	selectCurrentToken,
	selectIsTokenLoaded
} from '../../redux/user/user.selector';

const CollectionsOverview = ({
	fetchCollectionsStart,
	token,
	isTokenLoaded,
	history,
	isCollectionFetching,
	isCollectionsLoaded,
	collections,
	errorMessage
}) => {
	useEffect(() => {
		if (isTokenLoaded && token) {
			fetchCollectionsStart(token);
		} else {
			if (history.action !== 'POP') {
				history.push('/signIn');
			} else {
				history.push('/');
			}
		}
	}, [fetchCollectionsStart]);

	if (errorMessage) {
		alert(errorMessage);
		history.push('/');
	}

	return !isCollectionFetching && isCollectionsLoaded ? (
		<div className={styles.collectionsOverview}>
			{collections.map(({ id, ...otherCollectionProps }) => (
				<CollectionPreview key={id} {...otherCollectionProps} />
			))}
		</div>
	) : (
		<Spinner />
	);
};

const mapStateToProps = createStructuredSelector({
	isCollectionFetching: selectIsCollectionFetching,
	isCollectionsLoaded: selectIsCollectionsLoaded,
	collections: selectCollectionsForPreview,
	token: selectCurrentToken,
	isTokenLoaded: selectIsTokenLoaded,
	errorMessage: selectShopErrorMessage
});

const mapDispatchToProps = dispatch => ({
	fetchCollectionsStart: token => dispatch(fetchCollectionsStart(token))
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(CollectionsOverview));
