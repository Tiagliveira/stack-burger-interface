import { PaperPlaneRightIcon } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSocket } from './../../context/SocketContext';
import { api } from './../../services/api';
import { formatDate } from './../../utils/formatDate.js';
import { formatPrice } from './../../utils/formatPrice.js';
import {
    CancelButton, ChatContainer,
    Container, Content, Header, InputArea, MessageArea, ModalContent,
    ModalOverlay,
    ProductsTable, RatingContainer, StatusContainer
} from './styles';

export function OrderDetails() {
    const { id } = useParams();
    const { socket } = useSocket();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const [showCancelModal, setShowCancelModal] = useState(false);

    const bottomRef = useRef(null);

    const statusTranslations = {
        CREATED: 'Pedido Realizado',
        PREPARING: 'Em Preparação',
        READY: 'Pronto para Retirada',
        DELIVERING: 'Saiu para Entrega',
        DELIVERED: 'Entregue',
        CANCELED: 'Cancelado'
    };

    useEffect(() => {
        async function loadOrder() {
            try {
                const { data } = await api.get('/orders/history');
                const findOrder = data.find(o => o._id === id);

                if (!findOrder) {
                    toast.error('Pedido não encontrado');
                    navigate('/orders');
                    return;
                }

                setOrder(findOrder);
                setMessages(findOrder.messages || []);
            } catch (_err) {
                toast.error('Erro ao carregar pedido');
            }
        }
        loadOrder();
    }, [id, navigate]);

    useEffect(() => {
        if (socket && id) {
            socket.emit('join_order_room', id);

            const handleNewMessage = (data) => {
                if (data.orderId === id && data.message.userName !== order?.user?.name) {
                    setMessages((prev) => [...prev, data.message]);
                }
            };
            socket.on('new_order_message', handleNewMessage);

            socket.on('status_update', (data) => {
                if (data.orderId === id) {
                    setOrder((prev) => ({ ...prev, status: data.newStatus }));
                    const statusTraduzido = statusTranslations[data.newStatus] || data.newStatus;
                    toast.info(`Status atualizado para: ${statusTraduzido}`);
                }
            });

            return () => {
                socket.off('new_order_message', handleNewMessage);
                socket.off('status_update');
            };
        }
    }, [socket, id, order]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function handleSendMessage() {
        if (!newMessage.trim()) return;

        const userName = order.user.name;
        const tempMessage = {
            userName: userName,
            text: newMessage,
            createdAt: new Date().toISOString()
        };

        setMessages(prev => [...prev, tempMessage]);
        setNewMessage('');

        try {
            await api.post(`/orders/${id}/messages`, { text: tempMessage.text });
        } catch (_err) {
            toast.error('Erro ao enviar mensagem');
        }
    }

    async function handleRate(stars) {
        try {
            await api.post(`/orders/${id}/rate`, { stars });
            toast.success('Avaliação enviada! Obrigado.');
            setOrder(prev => ({ ...prev, isRated: true }));
        } catch (err) {
            toast.error(err.response?.data?.error || 'Erro ao avaliar');
        }
    }

    const canCancel = () => {
        if (!order) return false;
        const statusPermitidos = ['CREATED', 'PREPARING'];
        const timeNow = new Date();
        const timeOrder = new Date(order.createdAt);
        const diffMinutes = (timeNow - timeOrder) / 1000 / 60;

        return statusPermitidos.includes(order.status) && diffMinutes < 30;
    };

    async function confirmCancel() {
        try {
            await api.put(`/orders/${id}/cancel`);
            toast.success("Pedido cancelado com sucesso.");
            setOrder(prev => ({ ...prev, status: 'CANCELED' }));
            setShowCancelModal(false); // Fecha o modal
        } catch (err) {
            toast.error(err.response?.data?.error || "Erro ao cancelar");
        }
    }

    if (!order) return <p style={{ color: '#fff', padding: 20 }}>Carregando detalhes...</p>;

    return (
        <Container>
            <Content>
                <Header>
                    <div>
                        <h1>Pedido #{order._id.substring(0, 6)}</h1>
                        <p>{formatDate(order.createdAt)}</p>
                    </div>

                    {canCancel() && (
                        <CancelButton onClick={() => setShowCancelModal(true)}>
                            Cancelar Pedido
                        </CancelButton>
                    )}
                </Header>

                <StatusContainer status={order.status}>
                    <p>Status Atual:</p>
                    <h2>{statusTranslations[order.status] || order.status}</h2>
                </StatusContainer>

                <ProductsTable>
                    {order.products.map(product => (
                        <div key={product.id} className="item">
                            <div className='product-img'>
                                <img src={product.url} alt={product.name} />
                                <span>{product.quantity}x {product.name}</span>
                            </div>
                            <span>{formatPrice(product.price)}</span>
                        </div>
                    ))}
                    <div className="total">
                        <span>Taxa de Entrega:</span>
                        <span>{formatPrice(order.deliveryFee || 0)}</span>
                    </div>
                    <div className="total main">
                        <span>Total:</span>
                        <span>{formatPrice(
                            order.products.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0) + (order.deliveryFee || 0)
                        )}</span>
                    </div>
                </ProductsTable>

                {order.status === 'DELIVERED' && !order.isRated && (
                    <RatingContainer>
                        <h3>O que achou do pedido?</h3>
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button key={star} onClick={() => handleRate(star)}>⭐</button>
                            ))}
                        </div>
                    </RatingContainer>
                )}
            </Content>

            <ChatContainer>
                <h3>Chat com Restaurante</h3>
                <MessageArea>
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.userName === order.user.name ? 'message me' : 'message other'}>
                            <small>{msg.userName}</small>
                            <p>{msg.text}</p>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </MessageArea>
                <InputArea>
                    <input
                        placeholder="Escreva uma mensagem..."
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button onClick={handleSendMessage}><PaperPlaneRightIcon size={24} /></button>
                </InputArea>
            </ChatContainer>
            {showCancelModal && (
                <ModalOverlay>
                    <ModalContent>
                        <h3>Cancelar Pedido?</h3>
                        <p>Tem certeza que deseja cancelar? Essa ação não pode ser desfeita.</p>
                        <div className="buttons">
                            <button
                                className="cancel"
                                onClick={() => setShowCancelModal(false)}
                            >
                                Voltar
                            </button>


                            <button
                                className="confirm"
                                onClick={confirmCancel}
                            >
                                Sim, Cancelar
                            </button>
                        </div>
                    </ModalContent>
                </ModalOverlay>
            )}

        </Container>
    );
}
