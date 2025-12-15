import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../styles/breakpoits';

export const Container = styled.div`
    background-color: ${(props) => props.theme.mainBlack};
    width:100%;
    height:72px;
    padding: 0 56px;

    @media ${device.tablet} {
        padding: 0 30px;

    }

    @media ${device.mobile} {
        padding: 0 10px;
        height: 60px;
    }

`;

export const Content = styled.div`
    display:flex;
    align-items:center;
    justify-content: space-between;
    width:100%;
    max-width: 1280px;
    margin: 0 auto;

    @media ${device.mobile} {
        display: flex;
        justify-content: space-between;
        gap:10px;
    }
    `;
export const Navigation = styled.nav`
    display:flex;
    align-items: center;
    justify-content:center;
    height:72px;

    div{
        display:flex;
        align-items:center;
        gap: 20px;
    }

    hr{
        height:24px;
        border: 1px solid ${(props) => props.theme.edarkGray}
    }

    @media ${device.mobile} {
        div {
            gap: 10px;
        }
    }
    @media ${device.mobileMini} {
        div {
            gap: 10px;
        }
        
    }
`;
export const HeaderLink = styled(Link)`
    color: ${(props) => (props.$isActive ? (props) => props.theme.purple : (props) => props.theme.white)};
    border-bottom: ${(props) => (props.$isActive ? `2px solid ${(props) => props.theme.purple}` : 'none')};
    text-decoration:none;
    font-size: 14px;
    transition: color 300ms;
    position: relative;

    &:hover{
        color: ${(props) => props.theme.purple};
    }
`;
export const Options = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    gap:48px;

    @media ${device.mobile} {
        display: flex;
        justify-content: center;
        gap:10px;
    }

`;
export const Profile = styled.div`
    display:flex;
    align-items:center;
    gap: 12px;
    font-size:14px;

    p{
        color: ${(props) => props.theme.white};
        line-height:90%;
        font-weight: 300;

        span{
            font-weight:600;
            color: ${(props) => props.theme.gren};
        }
    }

    @media ${device.mobileMini} {
        svg {
            display: none;
        }
        
    }

`;
export const Logout = styled.button`
    color: ${(props) => props.theme.red};
    text-decoration: none;
    background: transparent;
    font-weight: 700;
    border: none;

`;
export const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const Badge = styled.span`
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: ${(props) => props.theme.gren};
    color: ${(props) => props.theme.mainBlack};
    font-size: 10px;
    font-weight: bold;
    width: 18px;
    height:18px;
    border-radius: 50%;
    display: flex;
    align-items:center;
    justify-content: center;
`;

export const MessageIndicator = styled.span`
    position: absolute;
    top: -2px;
    right: -2px;
    background-color: ${(props) => props.theme.gren};
    width: 10px;
    height:10px;
    border-radius: 50%;
    border: 2px solid ${(props) => props.theme.mainBlack};

`;
