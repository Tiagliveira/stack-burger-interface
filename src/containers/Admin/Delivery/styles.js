import styled from 'styled-components';

export const Container = styled.div`
    max-width: 60%;
    margin: auto;
    border-radius: 12px;

    .MuiTableContainer-root, .MuiPaper-root {
        background-color: ${(props) => props.theme.black};
        box-shadow: none; 
    } 

    .MuiTableCell-root {
        color: ${(props) => props.theme.white};
        background-color: ${(props) => props.theme.black}; 
        border-bottom: 1px solid ${(props) => props.theme.secondBlack}; 
    }
`;

export const ProductImage = styled.img`
    height: 80px;
    padding: 12px;
    border-radius: 16px;
`;

export const EditButton = styled.button`
    border: none;
    background-color: ${(props) => props.theme.darkWhite};
    height: 32px;
    width: 32px;
    border-radius: 8px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer; 
    transition: 0.2s; /

    svg{
        height: 18px;
        width: 18px;
    }

    &:hover {
        background-color: ${(props) => props.theme.purple};

        svg{
            fill: ${(props) => props.theme.white};
        }
    }
`;
