/*
 * @author: Razvan Rauta
 * Date: 14.12.2019
 * Time: 15:22
 */

import React, { Component } from 'react';
import axios from 'axios';
import styles from './ShopPage.scss?module';
import CollectionPreview from '../../components/collection-preview/CollectionPreview';
import Spinner from '../../components/Spinner/Spinner';

class ShopPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			collections: null
		};
	}

	componentDidMount() {
		axios
			.get('/api/products')
			.then(response => this.setState({ collections: response.data }))
			.catch(error => console.log(error));
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

export default ShopPage;
