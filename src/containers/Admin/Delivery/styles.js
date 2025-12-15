import styled from 'styled-components';

export const Container = styled.div`
    max-width: 60%;
    margin: auto;
    border-radius: 12px;
    
   .css-y2ff7i-MuiPaper-root-MuiTableContainer-root  {
        background-color: ${(props) => props.theme.black};
    } 

    .css-1orzuox-MuiTableCell-root {
        color: ${(props) => props.theme.white};
    }

    .css-1dc80h3-MuiTableCell-root {
        color: ${(props) => props.theme.white};
    }

    .css-14y13q2-MuiTableCell-root {
        color: ${(props) => props.theme.white};
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
