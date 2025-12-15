import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Background from './../../assets/background2.png';

export const Container = styled.div`
    min-height: 100vh;
    width: 100%;
     

     background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.0)) no-repeat,
            url('${Background}');
            background-color: ${(props) => props.theme.black};
            height:100%;
            background-position:center;
           
`;
export const Menu = styled.div`
    padding: 20px;
    background: ${(props) => props.theme.mainBlack};
`;
export const LinkMenu = styled(Link)`
    color: ${(props) => props.theme.white};
    text-decoration: none;
    font-weight: bold;
    
    &:hover{
        color: ${(props) => props.theme.purple};
    }

`;
export const Content = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;

    h1 {
        color: ${(props) => props.theme.white};
        margin-bottom: 30px;
        text-align: center;
    }
    
    p{
        color: ${(props) => props.theme.white};
        text-align: center;
    }


`;
export const OrderCard = styled.div`
    background-color: ${(props) => props.theme.black};
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid ${(props) => props.theme.secondBlack};
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.01);
        border-color: ${(props) => props.theme.purple};
    }

    .product-preview {
        color: ${(props) => props.theme.lightGray};
        margin: 15px 0;
        font-size: 14px;
        border-bottom: 1px solid ${(props) => props.theme.secondBlack};
        padding-bottom: 10px;
    }

`;
export const OrderHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
        color: ${(props) => props.theme.purple};
    }

    span {
        color: ${(props) => props.theme.darkGray};
        font-size: 14px;
    }
`;
export const OrderStatus = styled.div`
    color: ${(props) => props.theme.white};
    margin-bottom: 15px;

    b {
        color: ${(props) => {
					if (props.status === 'CREATED') return props.theme.darkGray;
					if (props.status === 'READY') return props.theme.darkPurple;
					if (props.status === 'PREPARING') return props.theme.orange;
					if (props.status === 'DELIVERING') return props.theme.blue;
					if (props.status === 'DELIVERED') return props.theme.gren;
					return props.theme.red;
				}}
    }

`;
export const OrderFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .price {
        p {
            color: ${(props) => props.theme.darkGray};

            h3 {
                color: ${(props) => props.theme.white};
            }
        }
    }

    button {
        background-color: ${(props) => props.theme.purple};
        color: ${(props) => props.theme.white};
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;

        &:hover {
            background-color: ${(props) => props.theme.darkPurple};
        }
    }


`;
