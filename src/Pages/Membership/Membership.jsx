import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../../PaymentForm';

const stripePromise=loadStripe(import.meta.env.VITE_SERVICE_KEY)
const Membership = () => {
    return (
        // <div className='max-h-10vh'>
            <div className="min-h-screen text-black bg-gray-50 py-10 px-4">
             <Elements stripe={stripePromise}>
      <PaymentForm></PaymentForm>
    </Elements>
        </div>
    );
};

export default  Membership;