/*
 * @author: Razvan Rauta
 * Date: 08.12.2019
 * Time: 12:45
*/

import React from 'react';
import styles from "./MenuItem.scss?module";

const MenuItem = ({title, imageUrl, size}) => (
  <div className={`${size ? styles[size] : ''} ${styles.menuItem}`}>
    <div className={styles.backgroundImage}
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
    <div className={styles.content}>
      <h1 className={styles.title}>{title.toUpperCase()}</h1>
      <span className={styles.subtitle}>SHOP NOW</span>
    </div>
  </div>
);

export default MenuItem;