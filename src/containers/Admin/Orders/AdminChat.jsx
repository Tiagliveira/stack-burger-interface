import { PaperPlaneRightIcon, XIcon } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import { useSocket } from '../../../context/SocketContext';
import { api } from '../../../services/api';
import { ChatBox, ChatOverlay, Header, InputContainer, MessagesArea } from './styles';

export function AdminChat({ orderId, onClose, clientName }) {
    const { socket } = useSocket();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const bottomRef = useRef(null);

    useEffect(() => {
        async function loadMessages() {
            try {
                const { data } = await api.get('/orders');
                const order = data.find(o => o._id === orderId);
                if (order?.messages) {
                    setMessages(order.messages);
                }
            } catch (err) {
                console.error("Erro ao carregar mensagens", err);
            }
        }
        loadMessages();
    }, [orderId]);


    useEffect(() => {
        if (socket && orderId) {
            socket.emit('join_order_room', orderId);

            const handleNewMessage = (data) => {
                if (data.orderId === orderId && data.message.userName !== 'Restaurante') {
                    setMessages(prev => [...prev, data.message]);
                }
            };

            socket.on('new_order_message', handleNewMessage);

            return () => {
                socket.off('new_order_message', handleNewMessage);
            };
        }
    }, [socket, orderId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function handleSendMessage() {
        if (!newMessage.trim()) return;

        const tempMessage = {
            userName: 'Restaurante',
            text: newMessage,
            createdAt: new Date().toISOString()
        };

        setMessages(prev => [...prev, tempMessage]);
        setNewMessage('');

        try {
            await api.post(`/orders/${orderId}/messages`, {
                text: tempMessage.text,
            });
        } catch (_err) {
            toast.error("Erro ao enviar");
        }
    }

    return createPortal(
        <ChatOverlay onClick={onClose}>
            <ChatBox onClick={e => e.stopPropagation()}>
                <Header>
                    <h3>Chat com {clientName}</h3>
                    <button onClick={onClose}><XIcon size={24} /></button>
                </Header>

                <MessagesArea>
                    {messages.map((msg, index) => {
                        const isAdmin = msg.userName === 'Restaurante' || msg.userName === 'Admin';
                        return (
                            <div key={index} className={isAdmin ? 'msg-admin' : 'msg-client'}>
                                {!isAdmin && <small>{msg.userName}</small>}
                                <p>{msg.text}</p>
                            </div>
                        )
                    })}
                    <div ref={bottomRef} />
                </MessagesArea>

                <InputContainer>
                    <input
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Digite uma resposta..."
                    />
                    <button onClick={handleSendMessage}>
                        <PaperPlaneRightIcon size={24} />
                    </button>
                </InputContainer>
            </ChatBox>
        </ChatOverlay>,
        document.body
    );
}
