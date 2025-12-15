import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: minmax(220px, 280px) 1fr;
    
    height: 100vh; 
    overflow: hidden; 

    main {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
        height: 100%; 
        background-color: ${(props) => props.theme.mainBlack};
        overflow-y: auto; 

        &::-webkit-scrollbar {
            width: 10px;
        }

        &::-webkit-scrollbar-track {
            background: ${(props) => props.theme.black}; 
        }

        &::-webkit-scrollbar-thumb {
            background-color: ${(props) => props.theme.mainBlack}; 
            border-radius: 20px;
        }

        /* Cor quando passa o mouse */
        &::-webkit-scrollbar-thumb:hover {
            background-color: ${(props) => props.theme.mainBlack};
        }
    }

    section {
        margin: 0 auto;
        padding: 40px 20px;
        max-width: 1200px;
        width: 100%;
    }
`;
