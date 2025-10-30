import Logo from '../../assets/LogodevBurg.png'
import { Banner, Container, Content, Title } from "./styles.js";


export function Cart() {
    return (
        <Container>
            <Banner>
                <img src={Logo} alt='logo-dev-burger' />
            </Banner>
            <Title>Checkout de Pedidos</Title>
            <Content>
                {/*   <CartItems/>
                <CartResume/>*/}
            </Content>
        </Container>
    );
}