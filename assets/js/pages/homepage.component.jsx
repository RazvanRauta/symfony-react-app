/*
 * @author: Razvan Rauta
 * Date: 08.12.2019
 * Time: 00:45
*/

import React from 'react';
import styles from './homepage.styles.scss?module';
import Directory from "../components/directory/Directory";

const HomPage = () =>  (
  <div className={styles.homepage}>
    <Directory/>
  </div>
);

export default HomPage;