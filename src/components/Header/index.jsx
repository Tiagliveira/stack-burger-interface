import { ShoppingCartIcon, UserCircleIcon } from "@phosphor-icons/react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { useTheme } from "styled-components";
import { UseUser } from '../../hooks/UserContext'
import {
    Container,
    Content,
    HeaderLink,
    LinkContainer,
    Logout,
    Navigation,
    Options,
    Profile
} from './styles';
export function Header() {
    const theme = useTheme()

    const navigate = useNavigate();
    const { logout, userInfo } = UseUser()

    const { pathname } = useResolvedPath();

    function logoutUser() {
        logout()
        navigate('/login')
    }
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
                        <ShoppingCartIcon style={{ color: theme.white }} size={24} />
                        <HeaderLink to='/carrinho'>Carrinho</HeaderLink>
                    </LinkContainer>
                </Options>
            </Content>
        </Container>
    );
}
