/*
 * @author: Razvan Rauta
 * Date: 08.12.2019
 * Time: 12:57
*/

import React, { Component } from 'react';
import styles from './Directory.scss?module';
import MenuItem from "../menuItem/MenuItem";


class Directory extends Component {

  constructor() {
    super();
    this.state = {
      section: [
        {
          title: 'hats',
          imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
          id: 1,
          linkUrl: 'shop/hats'
        },
        {
          title: 'jackets',
          imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
          id: 2,
          linkUrl: 'shop/jackets'
        },
        {
          title: 'sneakers',
          imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
          id: 3,
          linkUrl: 'shop/sneakers'
        },
        {
          title: 'women',
          imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
          size: 'large',
          id: 4,
          linkUrl: 'shop/women'
        },
        {
          title: 'men',
          imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
          size: 'large',
          id: 5,
          linkUrl: 'shop/men'
        }
      ]
    }
  }

  render() {
    return (
      <div className={styles.directoryMenu}>
        { this.state.section.map(  ({title, imageUrl, size, id}) =>  (
          <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} />
        ))
        }
      </div>
    );
  }
}

export default Directory;