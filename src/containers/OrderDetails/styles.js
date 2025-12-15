import styled from 'styled-components';
import Background from './../../assets/background2.png';

export const Container = styled.div`
    
    min-height: 100vh;
    padding: 20px;
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap; 
   
    background: linear-gradient(rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.0)) no-repeat,
                url('${Background}');
                 background-color: ${(props) => props.theme.mainBlack};
                height:100%;
                background-position:center;
`;

export const Content = styled.div`
    flex: 1;
    max-width: 600px;
    background: ${(props) => props.theme.mainBlack};
    padding: 20px;
    border-radius: 10px;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    h1 { color: ${(props) => props.theme.white}; font-size: 24px; }
    p { color: ${(props) => props.theme.darkGray}; font-size: 14px; }
`;

export const CancelButton = styled.button`
    background: ${(props) => props.theme.red};
    color: ${(props) => props.theme.white};
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    &:hover { opacity: 0.8; }
`;

export const StatusContainer = styled.div`
    background: ${(props) => props.theme.mainBlack};
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    text-align: center;
    border: 1px solid ${(props) => props.theme.black};

    p { color: ${(props) => props.theme.secondBlack}; margin-bottom: 5px; }
    h2 { 
        color: ${(props) => {
					if (props.status === 'DELIVERED') return props.theme.gren;
					if (props.status === 'CANCELED') return props.theme.red;
					return props.theme.blue;
				}}; 
    }
`;

export const ProductsTable = styled.div`
    border-top: 1px solid ${(props) => props.theme.secondBlack};
    padding-top: 10px;

   .product-img {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;

         img {
        width: 50px;
        height: 50px;
    }
    }

    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: ${(props) => props.theme.lightGray};
        padding: 8px 0;
        border-bottom: 1px solid ${(props) => props.theme.black};
    }

    .total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: ${(props) => props.theme.darkGray};
        padding: 5px 0;
        margin-top: 10px;
        
        &.main {
            color: ${(props) => props.theme.white};
            font-size: 18px;
            font-weight: bold;
            margin-top: 10px;
        }
    }
`;

export const RatingContainer = styled.div`
    margin-top: 20px;
    background: ${(props) => props.theme.mainBlack};
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    
    h3 { color: ${(props) => props.theme.white}; margin-bottom: 10px; }
    
    .stars button {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        transition: transform 0.2s;
        &:hover { transform: scale(1.2); }
    }
`;

export const ChatContainer = styled.div`
    flex: 1;
    max-width: 400px; 
    min-width: 300px;
    background: ${(props) => props.theme.black};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    height: 500px; 
    border: 1px solid ${(props) => props.theme.secondBlack};

    h3 {
        padding: 15px;
        border-bottom: 1px solid ${(props) => props.theme.secondBlack};
        color: ${(props) => props.theme.white};
        background: ${(props) => props.theme.mainBlack};
        border-radius: 10px 10px 0 0;
        text-align: center;
    }
`;

export const MessageArea = styled.div`
    flex: 1;
    padding: 15px;
    overflow-y: auto; 
    display: flex;
    flex-direction: column;
    gap: 10px;

    .message {
        padding: 10px;
        border-radius: 8px;
        max-width: 80%;
        
        small { display: block; font-size: 10px; margin-bottom: 3px; opacity: 0.7; }
        p { margin: 0; word-wrap: break-word; }
    }

    .me {
        align-self: flex-end;
        background: ${(props) => props.theme.purple};
        color: ${(props) => props.theme.mainBlack};
        font-weight:700;
        border-bottom-right-radius: 0;
    }

    .other {
        align-self: flex-start;
        background: ${(props) => props.theme.orange};
        color: ${(props) => props.theme.mainBlack};
        font-weight:700;
        border-bottom-left-radius: 0;
    }
`;

export const InputArea = styled.div`
    display: flex;
    padding: 10px;
    background: ${(props) => props.theme.black};
    border-top: 2px solid ${(props) => props.theme.secondBlack};
    border-radius: 0 0 10px 10px;

    input {
        flex: 1;
        padding: 10px;
        border-radius: 5px;
        border: none;
        margin-right: 10px;
        background: ${(props) => props.theme.mainBlack};
        color: ${(props) => props.theme.darkGray};

    }

    button {
        background: ${(props) => props.theme.purple}; 
        border: none;
        border-radius: 5px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover { opacity: 0.8; }
    }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.8); 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(5px); 
`;

export const ModalContent = styled.div`
    background: ${(props) => props.theme.black};
    padding: 30px;
    border-radius: 15px;
    border: 1px solid ${(props) => props.theme.secondBlack};
    width: 90%;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);

    h3 {
        color: ${(props) => props.theme.white};
        margin-bottom: 10px;
        font-size: 22px;
    }

    p {
        color: ${(props) => props.theme.lightGray};
        margin-bottom: 25px;
        font-size: 14px;
    }

    .buttons {
        display: flex;
        gap: 15px;
        justify-content: center;
    }

    button {
        padding: 12px 20px;
        border-radius: 8px;
        border: none;
        font-weight: bold;
        cursor: pointer;
        transition: 0.2s;
        font-size: 16px;
        flex: 1;

        &.confirm {
            background: ${(props) => props.theme.red};
            color: ${(props) => props.theme.white};
            &:hover { background: ${(props) => props.theme.darkRed}; }
        }

        &.cancel {
            background: ${(props) => props.theme.secondBlack};
            color: ${(props) => props.theme.white};
            &:hover { background: ${(props) => props.theme.darkGray}; }
        }
    }
`;
