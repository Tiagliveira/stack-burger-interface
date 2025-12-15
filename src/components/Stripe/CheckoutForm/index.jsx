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

    const { state } = useLocation();
    const {
        orderAddress,
        orderType,
        deliveryFee
    } = state || {};

    const user = {
        name: 'Cliente',
        email: 'cliente@email.com',
    };

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.error('Stripe ou Elements com falha.');
            return;
        }

        setIsLoading(true);

        const confirmParams = {
            return_url: 'http://localhost:5173/complete',
            payment_method_data: {
                billing_details: {
                    name: user.name,
                    email: user.email,
                },
            },
        };

        if (orderType === 'delivery' && orderAddress) {
            confirmParams.shipping = {
                name: user.name,
                address: {
                    line1: `${orderAddress.street}, ${orderAddress.number}`,
                    city: orderAddress.city,
                    postal_code: orderAddress.cep,
                    country: 'BR',
                },
            };
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams,
            redirect: 'if_required',
        });

        if (error) {
            console.error("Erro Stripe:", error);
            setMessage(error.message);
            toast.error(error.message);
            setIsLoading(false);
            return;
        }

        if (paymentIntent && paymentIntent.status === 'succeeded') {
            try {
                const products = cartProducts.map((product) => ({
                    id: product.id,
                    quantity: product.quantity,
                    observation: product.observation,
                    price: product.price,
                }));

                const addressForBackend = orderType === 'takeout' ? {
                    street: 'Retirada na Loja',
                    number: '0',
                    neighborhood: 'Loja',
                    city: 'Local',
                    cep: '00000-000',
                    complement: 'Cliente retira no balcão'
                } : orderAddress;

                const { status } = await api.post(
                    '/orders',
                    {
                        products,
                        paymentMethod: paymentIntent.payment_method_types[0],
                        paymentId: paymentIntent.id,
                        orderType: orderType || 'takeout',
                        deliveryFee: orderType === 'takeout' ? 0 : (deliveryFee || 0),
                        address: addressForBackend,
                    },
                    { validateStatus: () => true }
                );

                if (status === 200 || status === 201) {
                    toast.success('🎉 Pedido Realizado com Sucesso!');
                    clearCart();
                    setTimeout(() => {
                        navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
                    }, 2000);
                } else if (status === 409) {
                    toast.error('Erro ao processar pedido: Conflito de dados.');
                } else if (status === 400) {
                    toast.error('Erro de validação: Verifique os dados do pedido.');
                } else {
                    throw new Error('Erro desconhecido ao salvar pedido');
                }

            } catch (error) {
                console.error(error);
                toast.error('Pagamento aprovado, mas falha ao salvar pedido. Entre em contato.');
            }
        } else {
            navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
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
