/*
 * @author: Razvan Rauta
 * Date: 28.12.2019
 * Time: 14:43
 */

import React from 'react';
import styles from './CollectionsOverview.scss';
import CollectionPreview from '../collection-preview/CollectionPreview';
import { instanceOf } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import {
	selectCollectionsForPreview,
	selectIsCollectionFetching,
	selectIsCollectionsLoaded
} from '../../redux/shop/shop.selector';
import { Cookies, withCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

class CollectionsOverview extends React.Component {
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};

	componentDidMount() {
		const { cookies, fetchCollectionsStartAsync } = this.props;
		const token = cookies.get('token');
		if (typeof token !== 'undefined' && token.length) {
			fetchCollectionsStartAsync(token);
		} else {
			this.props.history.push('/signIn');
		}
	}
	render() {
		const {
			isCollectionFetching,
			isCollectionsLoaded,
			collections
		} = this.props;
		return !isCollectionFetching && isCollectionsLoaded ? (
			<div className={styles.collectionsOverview}>
				{collections.map(({ id, ...otherCollectionProps }) => (
					<CollectionPreview key={id} {...otherCollectionProps} />
				))}
			</div>
		) : (
			<Spinner />
		);
	}
}

const mapStateToProps = createStructuredSelector({
	isCollectionFetching: selectIsCollectionFetching,
	isCollectionsLoaded: selectIsCollectionsLoaded,
	collections: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
	fetchCollectionsStartAsync: token =>
		dispatch(fetchCollectionsStartAsync(token))
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withCookies(withRouter(CollectionsOverview)));
