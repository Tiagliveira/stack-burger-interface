import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
    background: ${(props) => props.theme.mainBlack};
    min-height: 100vh;
    color: ${(props) => props.theme.secondWhite};
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;


  button {
    background-color: ${(props) => props.theme.secondBlack};
    color: ${(props) => props.theme.secondWhite};
    border-radius: 8px;

    &:hover {
        border:1px solid ${(props) => props.theme.red};
    }

    
 }

 .react-datepicker {
        background-color: ${(props) => props.theme.mainBlack};
        border: 1px solid #444;
        font-family: 'Roboto', sans-serif;
        border-radius: 8px;
        color: ${(props) => props.theme.white};
        box-shadow: 0 5px 15px rgba(0,0,0,0.5);
    }

    .react-datepicker__header {
        background-color: ${(props) => props.theme.mainBlack};
        border-bottom: 1px solid ${(props) => props.theme.secondBlack};
        
        border-radius: 8px 8px 0 0;
        padding-top: 10px;

        h2 {
            color: ${(props) => props.theme.white};
        }
    }

    .react-datepicker__current-month, 
    .react-datepicker__day-name {
        color: ${(props) => props.theme.black};
    }

    .react-datepicker__day {
        color: ${(props) => props.theme.lightGray};
        width: 2rem;
        line-height: 2rem;
        margin: 0.2rem;
        
        &:hover {
            background-color: ${(props) => props.theme.secondBlack};
            border-radius: 50%;
            color: ${(props) => props.theme.white};
        }
    }

    
    .react-datepicker__day--selected, 
    .react-datepicker__day--keyboard-selected {
        background-color: ${(props) => props.theme.purple} !important;
        color: ${(props) => props.theme.white};
        border-radius: 50%;
        font-weight: bold;
    }

    
    .react-datepicker__day--outside-month {
        color: ${(props) => props.theme.darkGray};
    }

    /
    .react-datepicker__triangle {
        display: none; 
    }

    /
    .react-datepicker__navigation-icon::before {
        border-color: ${(props) => props.theme.lightGray};
    }
`;

export const Tabs = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${(props) => props.theme.secondBlack};
    padding-bottom: 10px;

`;

export const TabButton = styled.button`
    background: ${(props) => (props.$active ? props.theme.purple : 'transparent')};
    color: ${(props) => (props.$active ? props.theme.mainBlack : props.theme.lightGray)};
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background: ${(props) => props.theme.secondDarkPurple};
        color: ${(props) => props.theme.mainBlack};
    }

    
`;
export const TabButtonCancel = styled.button`
    background: ${(props) => (props.$active ? props.theme.white : 'transparent')};
    color: ${(props) => (props.$active ? props.theme.mainBlack : props.theme.red)};
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background: ${(props) => props.theme.darkRed};
        color: ${(props) => props.theme.lightGray};
    }

    
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: ${(props) => props.theme.black};
    border-radius: 8px;
    overflow: hidden;

    th, td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid ${(props) => props.theme.secondBlack};
    }

    th {
        background: ${(props) => props.theme.secondBlack};
        color: ${(props) => props.theme.purple};
        text-transform: uppercase;
        font-size: 12px;
    }

    tr:hover {
        background: ${(props) => props.theme.black};
    }
`;
