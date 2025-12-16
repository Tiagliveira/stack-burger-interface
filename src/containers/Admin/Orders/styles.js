import Select from 'react-select';
import styled from 'styled-components';

export const ProductImage = styled.img`
    height: 80px;
    padding:12px;
    border-radius: 16px;
    border-radius: 50%;

`;

export const SelectStatus = styled(Select)`
    width: 240px;
    
    .react-select__control {
        background-color: ${(props) => props.theme.black};
        border-color: ${(props) => props.theme.darkGray};
    }
    .react-select__single-value {
        color: ${(props) => props.theme.white};
    }
    .react-select__menu {
        background-color: ${(props) => props.theme.black};
        color: ${(props) => props.theme.white};
    }
`;
export const Filter = styled.div`
    display:flex;
    justify-content: center;
    margin: 28px 0;
    gap: 50px;
`;
export const FilterOptions = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    color: ${(props) => (props.$isActiveStatus ? props.theme.purple : props.theme.lightGray)};
    border-bottom: ${(props) => (props.$isActiveStatus ? `3px solid ${props.theme.purple}` : 'none')} ;
    font-size: 18px;
    line-height: 20px;
    padding-bottom: 5px;
    font-weight: 700;
`;

export const ChatOverlay = styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ChatBox = styled.div`
    width: 400px;
    height: 550px;
    background: ${(props) => props.theme.black};
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.darkGray};
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
`;

export const Header = styled.div`
    padding: 15px;
    background: ${(props) => props.theme.mainBlack};
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid ${(props) => props.theme.darkGray};
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => props.theme.lightGray};

    button {
        background: transparent;
        border: none;
        color: ${(props) => props.theme.red};
        cursor: pointer;
        &:hover { color: ${(props) => props.theme.secondDarkPurple}; }
    }
`;

export const MessagesArea = styled.div`
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .msg-client {
        align-self: flex-start;
        background: ${(props) => props.theme.darkRed};
        color: ${(props) => props.theme.mainBlack};
        padding: 10px;
        border-radius: 0 10px 10px 10px;
        max-width: 80%;
    }

    .msg-admin {
        align-self: flex-end;
        background:${(props) => props.theme.purple};
        color: ${(props) => props.theme.mainBlack};
        padding: 10px;
        border-radius: 10px 0 10px 10px;
        max-width: 80%;
    }

    small {
        display: block;
        font-size: 10px;
        margin-bottom: 3px;
        opacity: 0.7;
    }
`;

export const InputContainer = styled.div`
    padding: 15px;
    background: #292929;
    border-radius: 0 0 10px 10px;
    display: flex;
    gap: 10px;

    input {
        flex: 1;
        padding: 10px;
        border-radius: 5px;
        border: none;
        background: #111;
        color: #fffbfbff;
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

export const ChatButtonContainer = styled.div`
    position: relative;
    width: fit-content;
    margin: 0 auto;

    svg{
        fill : ${(props) => props.theme.gren};
    }


    &:hover {
        svg {
            fill: ${(props) => props.theme.blue};
        }
    }
`;

export const NotificationBadge = styled.span`
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: ${(props) => props.theme.red}; 
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid ${(props) => props.theme.white}; 
`;

export const Container = styled.div`
    background-color: ${(props) => props.theme.black};
    min-height: 100vh;
`;

export const TableContainer = styled.div`
    background-color: ${(props) => props.theme.secondBlack};
    padding: 20px;
    border-radius: 20px;

    span {
        color:  ${(props) => props.theme.gren};
    }

   
    
    .MuiTable-root {
         background-color: ${(props) => props.theme.secondBlack};
    }

    .MuiTableCell-root {
        color:  ${(props) => props.theme.white};
        border-bottom: 1px solid ${(props) => props.theme.darkGray};
    }
    
    .MuiPaper-root {
         background-color: ${(props) => props.theme.secondBlack};
         color: ${(props) => props.theme.white};
    }
`;
