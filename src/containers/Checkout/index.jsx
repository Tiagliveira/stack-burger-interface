import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import CheckoutForm from '../../components/Stripe/CheckoutForm';
import stripePromise from '../../config/stripeConfig';

export function Checkout() {
    const location = useLocation();

    const clientSecret = location.state?.paymentIntentClientSecret;

    if (!clientSecret) {
        return (
            <div style={{ width: "100%", height: "85vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <h3>Erro ao iniciar pagamento</h3>
                <p>Volte para o carrinho e tente novamente.</p>
            </div>
        )

    }

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
        </Elements>
    );
}
