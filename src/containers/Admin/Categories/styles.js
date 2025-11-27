import styled from 'styled-components';

export const Container = styled.div`
    max-width: 800px;
    display:flex;
    justify-content: center;
    align-items: center;
`;

export const CategoryImage = styled.img`
    width: 100px;
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
