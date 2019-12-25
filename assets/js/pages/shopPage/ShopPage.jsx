/*
 * @author: Razvan Rauta
 * Date: 14.12.2019
 * Time: 15:22
 */

import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import styles from './ShopPage.styles.scss';
import CollectionPreview from '../../components/collection-preview/CollectionPreview';
import Spinner from '../../components/spinner/Spinner';
import {instanceOf} from 'prop-types';
import {Cookies, withCookies} from 'react-cookie';

class ShopPage extends Component {
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
					this.props.history.push('/signIn');
					console.log(error);
				});
		} else {
			this.props.history.push('/signIn');
		}
	}

	render() {
		const { collections } = this.state;
		return collections && collections.length > 0 ? (
			<div className={styles.shopPage}>
				{collections.map(({ id, ...otherCollectionProps }) => (
					<CollectionPreview key={id} {...otherCollectionProps} />
				))}
			</div>
		) : (
			<Spinner />
		);
	}
}

export default withCookies(withRouter(ShopPage));
