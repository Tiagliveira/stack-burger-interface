import { ScrollIcon, ShoppingCartIcon, UserCircleIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { useTheme } from "styled-components";
import { UseCart } from './../../hooks/CartContext.jsx'
import { UseUser } from '../../hooks/UserContext'
import { api } from './../../services/api.js'
import {
    Badge,
    Container,
    Content,
    HeaderLink,
    LinkContainer,
    Logout,
    MessageIndicator,
    Navigation,
    Options,
    Profile
} from './styles';
export function Header() {
    const theme = useTheme()
    const { cartProducts } = UseCart();

    const navigate = useNavigate();
    const { logout, userInfo } = UseUser()

    const { pathname } = useResolvedPath();

    const [hasRecentOrders, setHasRecentOrders] = useState(false)

    function logoutUser() {
        logout()
        navigate('/login')
    }

    const cartQuantity = cartProducts.reduce((acc, current) => {
        return acc + current.quantity
    }, 0)

    useEffect(() => {
        async function checkRecentOrders() {
            try {
                if (!userInfo) return

                const { data } = await api.get('/orders/history')

                const now = new Date()

                const hasRecent = data.some(order => {
                    const orderDate = new Date(order.createdAt);
                    const diffInHours = (now - orderDate) / 1000 / 60 / 60;
                    return diffInHours < 2;
                })

                setHasRecentOrders(hasRecent)
            } catch (_err) {
                console.error('Erro ao verificar pedidos recentes')
            }
        }
        checkRecentOrders();
    }, [userInfo])
    return (
        <Container>
            <Content>
                <Navigation>
                    <div>
                        <HeaderLink to='/' $isActive={pathname === '/'}>Home</HeaderLink>
                        <hr></hr>
                        <HeaderLink to='/cardapio' $isActive={pathname === '/cardapio'}>Cardápio</HeaderLink>
                    </div>
                </Navigation>
                <Options>
                    <Profile>
                        <UserCircleIcon style={{ color: theme.white }} size={24} />
                        <div>
                            <p>
                                Olá, <span>{userInfo.name}</span>
                            </p>
                            <Logout onClick={logoutUser}>Sair</Logout>
                        </div>
                    </Profile>

                    <LinkContainer>
                        <HeaderLink to='/carrinho' $isActive={pathname === '/carrinho'}>
                            {cartQuantity > 0 && (<Badge>{cartQuantity}</Badge>)}
                            <ShoppingCartIcon size={24} />
                        </HeaderLink>
                    </LinkContainer>

                    <LinkContainer>
                        <HeaderLink to='/orders' $isActive={pathname === '/orders'}>
                            <ScrollIcon size={24} />
                            {hasRecentOrders && <MessageIndicator />}
                        </HeaderLink>
                    </LinkContainer>
                </Options>
            </Content>
        </Container>
    );
}
