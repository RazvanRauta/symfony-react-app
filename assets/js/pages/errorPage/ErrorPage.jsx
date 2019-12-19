/*
 * @author: Razvan Rauta
 * Date: 08.12.2019
 * Time: 21:07
 */

import React from 'react';
import styles from './ErrorPage.styles.scss';
import { Link, withRouter } from 'react-router-dom';
import errorImage from '../../../images/x.png';

const ErrorPage = ({ location }) => (
	<div className={styles.errorContainer}>
		<img className={styles.errorImage} src={errorImage} alt="404" />
		<h1 className={styles.errorMsg}>
			The page <code>{location.pathname}</code> was not found!
		</h1>
		<h2 className={styles.link}>
			Let&apos;s take you <Link to="/">Home</Link>
		</h2>
	</div>
);

export default withRouter(ErrorPage);
