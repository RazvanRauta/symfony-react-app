/*
 * @author: Razvan Rauta
 * Date: 28.12.2019
 * Time: 15:01
 */

import React, { Component } from 'react';
import styles from './CollectionPage.scss';
import { connect } from 'react-redux';
import { fetchCollectionByIdStart } from '../../redux/shop/shop.actions';
import { withRouter } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import CollectionItem from '../../components/collection-item/CollectionItem';
import {
	selectCollectionByIdForPreview,
	selectIsCollectionFetching,
	selectIsCollectionLoaded,
	selectShopErrorMessage
} from '../../redux/shop/shop.selector';
import { createStructuredSelector } from 'reselect';
import {
	selectCurrentToken,
	selectIsTokenLoaded
} from '../../redux/user/user.selector';

class CollectionPage extends Component {
	componentDidMount() {
		const {
			match: {
				params: { collectionId }
			},
			fetchCollectionByIdStart,
			token,
			isTokenLoaded
		} = this.props;

		if (isTokenLoaded && token) {
			fetchCollectionByIdStart(token, collectionId);
		} else {
			this.props.history.push('/signIn');
		}
	}

	render() {
		const {
			isCollectionFetching,
			isCollectionLoaded,
			collection,
			errorMessage,
			history
		} = this.props;
		let collectionObj;
		if (errorMessage) {
			alert(errorMessage);
			history.push('/');
		}
		if (isCollectionLoaded) {
			collectionObj = collection[0];
		}
		return !isCollectionFetching && isCollectionLoaded ? (
			<div className={styles.collectionPage}>
				<h2 className={styles.title}>{collectionObj.title}</h2>
				<div className={styles.items}>
					{collectionObj.products.map(item => (
						<CollectionItem key={item.id} item={item} />
					))}
				</div>
			</div>
		) : (
			<Spinner />
		);
	}
}
const mapStateToProps = createStructuredSelector({
	isCollectionFetching: selectIsCollectionFetching,
	isCollectionLoaded: selectIsCollectionLoaded,
	collection: selectCollectionByIdForPreview,
	token: selectCurrentToken,
	isTokenLoaded: selectIsTokenLoaded,
	errorMessage: selectShopErrorMessage
});

const mapDispatchToProps = dispatch => ({
	fetchCollectionByIdStart: (token, collectionId) =>
		dispatch(fetchCollectionByIdStart(token, collectionId))
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(CollectionPage));
