import styled from 'styled-components';

export const Root = styled.table`
    width:100%;
    background-color: ${(props) => props.theme.mainBlack};
    border-radius: 20px;
    border-collapse: collapse;
    

`;
export const Header = styled.thead`
    gap: 10px;
    border-color:1px solid  ${(props) => props.theme.mainBlack};
`;

export const Tr = styled.tr`


`;

export const Th = styled.th`
    padding:16px;
    text-align: left;
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.black};
    border:none;
    border-bottom: 3px solid ${(props) => props.theme.lightGray};
    

    &:first-child{
     border-top-left-radius: 20px;
    }

    &:last-child{
     border-top-right-radius: 20px;
    }
`;
export const Td = styled.td`
    padding:16px;
    background-color: ${(props) => props.theme.secondBlack};
    color : ${(props) => props.theme.white};
    font-weight: 500;
    line-height: 115%;
    border:none;
`;

export const Body = styled.tbody`
    
`;
