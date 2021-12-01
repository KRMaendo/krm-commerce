import StripeCheckout from 'react-stripe-checkout';

import { ReactComponent as Logo } from '../../assets/krm_commerce.svg';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51K0sHaKnar9ukI0W4z8vbws8lJLC6NvdALvs441RiiykKi7ZXffhUmkJr7JnTAS9uDl7iqlHGx79rh5B30TGsu9n00mRpSB3Lv';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='KRM Commerce'
            billingAddress
            shippingAddress
            image={Logo}
            description={`Your total is $${price}`}
            amount={ priceForStripe }
            panelLabel='Pay Now'
            token={ onToken }
            stripeKey={ publishableKey }
        />
    );
};

export default StripeCheckoutButton;