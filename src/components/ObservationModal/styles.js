import styled from 'styled-components';

export const Overlay = styled.div`
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.6);
    display: flex; justify-content: center; align-items: center; z-index: 999;
    backdrop-filter: blur(2px);
`;

export const Content = styled.div`
    background: ${(props) => props.theme.mainBlack}; 
    padding: 20px; 
    border-radius: 10px; 
    width: 90%; 
    max-width: 400px;
    h3 { 
        margin-bottom: 10px; 
        color: ${(props) => props.theme.darkGray}; 
    }
    
    textarea { 
        background: ${(props) => props.theme.black}; 
        color: ${(props) => props.theme.lightGray};
        width: 100%; 
        height: 100px; 
        padding: 10px; 
        border: 1px solid ${(props) => props.theme.black}; 
        border-radius: 5px; 
        resize: none; 
        font-size:17px;
        font-family: sans-serif;
    }
    .buttons { 
        display: flex; 
        gap: 10px; 
        margin-top: 15px; 
       
        button {
            background-color: ${(props) => props.theme.gren};
        }
        
        }
`;
