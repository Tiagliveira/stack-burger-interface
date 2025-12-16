import styled from 'styled-components';

export const Container = styled.div`
    max-width: 800px;
    display: flex;
    justify-content: center;
    align-items: center;

    .MuiTable-root {
        background-color: ${(props) => props.theme.black};
    }

    .MuiTableCell-root {
        color: ${(props) => props.theme.white};
        border-bottom: 1px solid ${(props) => props.theme.mainBlack}; 
    }
`;

export const CategoryImage = styled.img`
    width: 100px;
    height: 80px;
    padding: 12px;
    border-radius: 16px;
`;

export const EditButton = styled.button`
    border: none;
    background-color: ${(props) => props.theme.gren};
    height: 32px;
    width: 32px;
    border-radius: 8px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;

    svg{
        height: 20px;
        width: 20px;
        fill: ${(props) => props.theme.mainBlack};
    }

    &:hover {
        background-color: ${(props) => props.theme.white};

        svg{
            fill: ${(props) => props.theme.mainBlack};
        }
    }

`;
