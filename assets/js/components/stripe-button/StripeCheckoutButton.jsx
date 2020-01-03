/*
 * @author: Razvan Rauta
 * Date: 03.01.2020
 * Time: 17:48
 */

import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_fjaN0Slm5T3R6WvkV0SrP3Ct00iBVzmnHo';

	const onToken = token => {
		console.log(token);
		alert('Payment Successful');
	};

	return (
		<StripeCheckout
			label="Pay Now"
			name="RR Clothing Ltd."
			billingAdress
			shippingAddress
			image="/images/Logo.svg"
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel="Pay Now"
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;
