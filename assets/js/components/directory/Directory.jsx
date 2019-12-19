/*
 * @author: Razvan Rauta
 * Date: 08.12.2019
 * Time: 12:57
 */

import React, { Component } from 'react';
import styles from './Directory.scss';
import MenuItem from '../menuItem/MenuItem';

class Directory extends Component {
	constructor() {
		super();
		this.state = {
			section: [
				{
					title: 'hats',
					imageUrl: '/images/hats.png',
					id: 1,
					linkUrl: 'shop/hats'
				},
				{
					title: 'jackets',
					imageUrl: '/images/jackets.png',
					id: 2,
					linkUrl: 'shop/jackets'
				},
				{
					title: 'sneakers',
					imageUrl: '/images/sneakers.png',
					id: 3,
					linkUrl: 'shop/sneakers'
				},
				{
					title: 'women',
					imageUrl: '/images/womens.png',
					size: 'large',
					id: 4,
					linkUrl: 'shop/women'
				},
				{
					title: 'men',
					imageUrl: '/images/men.png',
					size: 'large',
					id: 5,
					linkUrl: 'shop/men'
				}
			]
		};
	}

	render() {
		return (
			<div className={styles.directoryMenu}>
				{this.state.section.map(({ id, ...sectionProps }) => (
					<MenuItem key={id} {...sectionProps} />
				))}
			</div>
		);
	}
}

export default Directory;
