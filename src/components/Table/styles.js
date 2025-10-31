import styled from 'styled-components';

export const Root = styled.table`
    width:100%;
    background-color: #fff;
    border-radius: 20px;
    border-collapse: collapse;
    

`;
export const Header = styled.thead`
    gap: 10px;
    border-color:1px solid  #484848;
`;

export const Tr = styled.tr`


`;

export const Th = styled.th`
    padding:16px;
    text-align: left;
    color: #fff;
    background-color: #484848;
    border:none;
    border-bottom: 3px solid #cdcdcd;
    

    &:first-child{
     border-top-left-radius: 20px;
    }

    &:last-child{
     border-top-right-radius: 20px;
    }
`;
export const Td = styled.td`
    padding:16px;
    background-color: #fff;
    color : #484848;
    font-weight: 500;
    line-height: 115%;
    border:none;
`;

export const Body = styled.tbody`
    
`;
