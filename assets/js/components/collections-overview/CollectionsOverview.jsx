/*
 * @author: Razvan Rauta
 * Date: 28.12.2019
 * Time: 14:43
 */

import React from 'react';
import styles from './CollectionsOverview.scss';
import CollectionPreview from '../collection-preview/CollectionPreview';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

class CollectionsOverview extends React.Component {
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			collections: null
		};
	}

	componentDidMount() {
		const { cookies } = this.props;
		const token = cookies.get('token');
		if (typeof token !== 'undefined' && token.length) {
			axios
				.get('/api/products', {
					headers: {
						Authorization: 'bearer ' + token
					}
				})
				.then(response => {
					this.setState({ collections: response.data });
				})
				.catch(error => {
					if (error.response.status === 404) {
						alert('No products were found');
					}
					this.props.history.push('/');
				});
		} else {
			this.props.history.push('/signIn');
		}
	}
	render() {
		const { collections } = this.state;
		return collections && collections.length > 0 ? (
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

export default withCookies(withRouter(CollectionsOverview));
