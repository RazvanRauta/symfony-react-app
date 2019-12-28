/*
 * @author: Razvan Rauta
 * Date: 28.12.2019
 * Time: 15:01
 */

import React, { Component } from 'react';
import styles from './CollectionPage.scss';
import axios from 'axios';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import CollectionItem from '../../components/collection-item/CollectionItem';

class CollectionPage extends Component {
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			collection: null
		};
	}

	componentDidMount() {
		const {
			cookies,
			match: {
				params: { collectionId }
			}
		} = this.props;

		const token = cookies.get('token');

		if (typeof token !== 'undefined' && token.length) {
			axios
				.get(`/api/products/${collectionId}`, {
					headers: {
						Authorization: 'bearer ' + token
					}
				})
				.then(response => {
					this.setState({ collection: response.data });
				})
				.catch(error => {
					if (error.response.status === 404) {
						alert(`Collection "${collectionId}" was not found.`);
					}
					this.props.history.push('/');
				});
		} else {
			this.props.history.push('/signIn');
		}
	}

	render() {
		const { collection } = this.state;
		return collection ? (
			<div className={styles.collectionPage}>
				<h2 className={styles.title}>{collection.title}</h2>
				<div className={styles.items}>
					{collection.products.map(item => (
						<CollectionItem key={item.id} item={item} />
					))}
				</div>
			</div>
		) : (
			<Spinner />
		);
	}
}

export default withCookies(withRouter(CollectionPage));
