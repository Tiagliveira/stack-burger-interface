import styled from 'styled-components';

export const Container = styled.div`
   .MuiTable-root {
        background-color: ${(props) => props.theme.black};
    }

    .MuiTableCell-root {
        color: ${(props) => props.theme.white};
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
    background-color: ${(props) => props.theme.gren};
    height: 32px;
    width: 32px;
    border-radius: 8px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;

    svg{
        fill:  ${(props) => props.theme.black};
        height: 18px;
        width: 18px;
    }

    &:hover {
        background-color: ${(props) => props.theme.white};

        svg{
            fill: ${(props) => props.theme.gren};
        }
    }

`;

export const ActionIcon = styled.button`
     border: none;
    background-color: ${(props) => props.theme.red};
    height: 32px;
    width: 32px;
    border-radius: 8px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;

    svg{
        fill:  ${(props) => props.theme.black};
        height: 18px;
        width: 18px;

    }

    &:hover {
        background-color: ${(props) => props.theme.white};

        svg{
            fill: ${(props) => props.theme.red};
        }
    }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    backdrop-filter: blur(3px);
`;

export const ModalContent = styled.div`
    background:  ${(props) => props.theme.black};
    padding: 30px;
    border-radius: 10px;
    border: 1px solid  ${(props) => props.theme.secondBlack};
    width: 400px;
    text-align: center;
    color: ${(props) => props.theme.black};
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);

    h3 { margin-bottom: 15px; color: ${(props) => props.theme.secondWhite}; font-size: 22px; }
    p { color: ${(props) => props.theme.lightGray}; margin-bottom: 25px; }

    .buttons {
        display: flex;
        gap: 15px;
        justify-content: center;
    }

    button {
        padding: 10px 20px;
        border-radius: 5px;
        border: none;
        font-weight: bold;
        cursor: pointer;
        font-size: 16px;
        flex: 1;

        &.cancel {
            background: ${(props) => props.theme.secondBlack};
            color: ${(props) => props.theme.lightGray};


            &:hover { 
                background: ${(props) => props.theme.darkGray};
                color: ${(props) => props.theme.mainBlack};
         }
        }

        &.confirm {
            background: ${(props) => props.theme.red};
            color: ${(props) => props.theme.mainBlack};

            &:hover {
                 background: ${(props) => props.theme.darkRed};
                 color: ${(props) => props.theme.white};
                }
        }
    }
`;
