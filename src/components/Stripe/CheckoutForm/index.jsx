import {
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles.css';
import { toast } from 'react-toastify';
import { UseCart } from '../../../hooks/CartContext';
import { api } from '../../../services/api';

export default function CheckoutForm() {
    const { cartProducts, clearCart } = UseCart();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();
    const {
        state: { _dpmChekerLink },
    } = useLocation();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.error('Stripe ou Elements com falha, tente novamente');
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });

        if (error) {
            setMessage(error.message);
            toast.error(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            try {

                const products = cartProducts.map((product) => {
                    return {
                        id: product.id,
                        quantity: product.quantity,
                        observation: product.observation
                    };
                });

                const { status } = await api.post(
                    '/orders',
                    {
                        products,
                        paymentMethod: paymentIntent.payment_method_types[0],
                        paymentId: paymentIntent.id,
                    },
                    {
                        validateStatus: () => true,
                    },
                );

                if (status === 200 || status === 201) {
                    toast.success('🎉 Pedido Realizado com Sucesso!');

                    clearCart();

                    setTimeout(() => {
                        navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
                    }, 3000);

                } else if (status === 409) {
                    toast.error('Falha ao realizar o pedido');
                } else {
                    throw new Error();
                }
            } catch (_error) {
                toast.error('😵 Falha no Sistema! Tente Novamente em breve');
            }
        } else {
            setTimeout(() => {
                navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
            }, 3000);
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: 'accordion',
    };

    return (
        <div className='container'>
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : 'Pagar agora'}
                    </span>
                </button >
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
}
