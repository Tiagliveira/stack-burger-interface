import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { formatDate } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";
import { Container, Content, LinkMenu, Menu, OrderCard, OrderFooter, OrderHeader, OrderStatus } from "./styles";


export function UserOrders() {
    const [orders, setOrdes] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const statusTranslations = {
        CREATED: 'Pedido Realizado',
        PREPARING: 'Em Preparação',
        READY: 'Pronto para Retirada',
        DELIVERING: 'Saiu para Entrega',
        DELIVERED: 'Entregue',
        CANCELED: 'Cancelado'
    };

    useEffect(() => {
        async function loadOrders() {
            try {
                setIsLoading(true)
                const { data } = await api.get('/orders/history')
                const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

                setOrdes(sortedOrders)
            } catch (err) {
                console.error(err)
                toast.error('Erro ao carregar pedidos')
            } finally {
                setIsLoading(false)
            }
        }
        loadOrders()
    }, [])

    return (
        <Container>
            <Menu>
                <LinkMenu to='/'>Voltar ao menu</LinkMenu>
            </Menu>

            <Content>
                <h1>Meus Pedidos</h1>
                {isLoading && <p>Carregando...</p>}
                {!isLoading && orders.length === 0 && <p>Você ainda não fez o seu primeiro pedido.</p>}

                {orders.map((order) => (
                    <OrderCard key={order._id}>
                        <OrderHeader>
                            <h3>Pedido #{order._id.substring(0, 6)}</h3>
                            <span>{formatDate(order.createdAt)}</span>
                        </OrderHeader>
                        <div className="product-preview">
                            <p>
                                {order.products[0].name}
                                {order.products.length > 1 ? `... e mais ${order.products.length - 1} itens` : ''}
                            </p>
                        </div>

                        <OrderStatus status={order.status}>
                            Status: <b>{statusTranslations[order.status] || order.status}</b>
                        </OrderStatus>

                        <OrderFooter>
                            <div className="price">
                                <p>Total: </p>
                                <h3>{formatPrice(order.products.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0) + (order.deliveryFee || 0))}</h3>
                            </div>
                            <button onClick={() => navigate(`/order/${order._id}`)}>
                                Ver detalhes
                            </button>
                        </OrderFooter>
                    </OrderCard>
                ))}
            </Content>
        </Container>
    )

}