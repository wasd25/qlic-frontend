import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

export const getStripe = () => {
    if (!stripePromise) {
        const publicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

        if (!publicKey) {
            console.error('VITE_STRIPE_PUBLIC_KEY no está definida en .env');
            throw new Error('Stripe public key is not configured');
        }

        stripePromise = loadStripe(publicKey);
    }
    return stripePromise;
};
