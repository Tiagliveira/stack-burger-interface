import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { UseCart } from '../../hooks/CartContext';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { Button } from '../Button';
import { Container, ContainerBig } from './styles';

export function CartResume() {
    const [finalPrice, setFinalPrice] = useState(0);
    const [deliveryTax, setDeliveryTax] = useState(0);

    const [orderType, setOrderType] = useState('delivery');
    const [cep, setCep] = useState('');
    const [addressData, setAddressData] = useState({});
    const [addressNumber, setAddressNumber] = useState('');

    const navigate = useNavigate();
    const { cartProducts } = UseCart();

    useEffect(() => {
        const sumAllItems = cartProducts.reduce((acc, current) => {
            return current.price * current.quantity + acc;
        }, 0);
        setFinalPrice(sumAllItems);
    }, [cartProducts]);


    const handleSearchCep = async () => {
        const cleanCep = cep.replace(/\D/g, '');

        if (cleanCep.length !== 8) {
            toast.error('Digite um CEP válido com 8 números.');
            return;
        }

        const loadingToast = toast.loading('Buscando CEP...');

        try {
            const viaCepResponse = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
            const viaCepData = await viaCepResponse.json();

            if (viaCepData.erro) {
                toast.update(loadingToast, {
                    render: "CEP não encontrado!",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000
                });
                setAddressData({});
                return;
            }
            setAddressData(viaCepData);

            const { data } = await api.post('/delivery-calculate', {
                cep: cleanCep,
            });

            setDeliveryTax(data.price);

            toast.update(loadingToast, {
                render: `Taxa de entrega: ${formatPrice(data.price)}`,
                type: "success",
                isLoading: false,
                autoClose: 3000
            });

        } catch (err) {
            toast.update(loadingToast, {
                render: err.response?.data?.error || 'Erro ao calcular taxa',
                type: "error",
                isLoading: false,
                autoClose: 3000
            });
            setDeliveryTax(0);
            setAddressData({});
        }
    };

    const submitOrder = async () => {
        if (orderType === 'delivery') {
            if (!cep || !addressNumber) {
                toast.warning('Por favor, busque o CEP e preencha o Número.');
                return;
            }
        }

        const products = cartProducts.map((product) => {
            return { id: product.id, quantity: product.quantity, price: product.price };
        });

        try {
            const { data } = await api.post('/create_payment_intent', {
                products,
                deliveryFee: deliveryTax,
            });

            navigate('/checkout', {
                state: {
                    paymentIntentClientSecret: data.clientSecret,
                    paymentIntentId: data.id,
                    orderAddress: orderType === 'delivery' ? {
                        cep,
                        street: addressData.logradouro || 'Rua não encontrada',
                        neighborhood: addressData.bairro,
                        city: addressData.localidade,
                        number: addressNumber,
                        complement: addressData.complemento,
                    } : null,
                    orderType,
                    deliveryFee: deliveryTax,
                    products,
                },
            });
        } catch (_error) {
            toast.error('Erro ao conectar com pagamento, Tente novamente!');
        }
    };

    return (
        <ContainerBig>
            <Container>
                <div className="container-top">
                    <h2 className="title">Resumo do Pedido</h2>
                    <p className="items">Itens</p>
                    <p className="items-price">{formatPrice(finalPrice)}</p>
                    <p className="delivery-tax">Taxa De Entrega</p>
                    <p className="delivery-tax-price">
                        {orderType === 'takeout' ? 'Grátis' : formatPrice(deliveryTax)}
                    </p>
                </div>

                <div className="container-delivery">
                    <div className="container-center">
                        <label>
                            <input
                                type="radio"
                                name="type"
                                checked={orderType === 'takeout'}
                                onChange={() => {
                                    setOrderType('takeout');
                                    setDeliveryTax(0);
                                }}
                            /> Retirada
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="type"
                                checked={orderType === 'delivery'}
                                onChange={() => setOrderType('delivery')}
                            /> Entrega
                        </label>
                    </div>

                    {orderType === 'delivery' && (
                        <div className='inputAddress'>


                            <div>
                                <input
                                    placeholder="CEP (00000-000)"
                                    value={cep}
                                    onChange={(e) => setCep(e.target.value)}
                                />
                                <button
                                    onClick={handleSearchCep}
                                    title="Buscar CEP"
                                >
                                    <MagnifyingGlassIcon size={24} />
                                </button>
                            </div>
                            <input className='number'
                                placeholder="N&ordm; da Casa"
                                value={addressNumber}
                                onChange={(e) => setAddressNumber(e.target.value)}
                            />
                            <div className='result'>

                                {addressData.logradouro && (
                                    <p>
                                        {addressData.logradouro}, {addressData.bairro}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="container-bottom">
                    <p>Total</p>
                    <p>{formatPrice(finalPrice + deliveryTax)}</p>
                </div>
            </Container>

            <Button onClick={submitOrder}>Finalizar Pedido</Button>
        </ContainerBig>
    );
}

