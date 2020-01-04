/*
 * @author: Razvan Rauta
 * Date: 28.12.2019
 * Time: 15:01
 */

import React, { Component } from 'react';
import styles from './CollectionPage.scss';
import { connect } from 'react-redux';
import { fetchCollectionByIdStartAsync } from '../../redux/shop/shop.actions';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import CollectionItem from '../../components/collection-item/CollectionItem';
import {
	selectCollectionByIdForPreview,
	selectIsCollectionFetching,
	selectIsCollectionLoaded
} from '../../redux/shop/shop.selector';
import { createStructuredSelector } from 'reselect';

class CollectionPage extends Component {
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};

	componentDidMount() {
		const {
			cookies,
			match: {
				params: { collectionId }
			},
			fetchCollectionByIdStartAsync
		} = this.props;

		const token = cookies.get('token');

		if (typeof token !== 'undefined' && token.length) {
			fetchCollectionByIdStartAsync(token, collectionId);
		} else {
			this.props.history.push('/signIn');
		}
	}

	render() {
		const { isCollectionFetching, isCollectionLoaded, collection } = this.props;
		let collectionObj;
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
	collection: selectCollectionByIdForPreview
});

const mapDispatchToProps = dispatch => ({
	fetchCollectionByIdStartAsync: (token, collectionId) =>
		dispatch(fetchCollectionByIdStartAsync(token, collectionId))
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withCookies(withRouter(CollectionPage)));
