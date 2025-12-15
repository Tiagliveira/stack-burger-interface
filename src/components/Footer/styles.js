import styled from 'styled-components';
import { device } from '../../styles/breakpoits';
export const Container = styled.div`
    height: 50px;
    width: 100%;
    background-color: ${(props) => props.theme.darkPurple};
    display: flex;
    align-items: center;
    justify-content: center;

    p{
        color: ${(props) => props.theme.mainBlack};
        font-size: 14px;
        font-weight:400;
        
        @media ${device.mobile} {
        margin-left: 10px;
    }

    }

    

`;
