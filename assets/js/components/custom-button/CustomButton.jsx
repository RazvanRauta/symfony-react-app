/*
 * @author: Razvan Rauta
 * Date: 15.12.2019
 * Time: 15:19
 */

import React from 'react';
import { CustomButtonContainer } from './CustomButton.styles';

const CustomButton = ({ children, ...otherProps }) => (
	<CustomButtonContainer {...otherProps}>{children}</CustomButtonContainer>
);

export default CustomButton;
