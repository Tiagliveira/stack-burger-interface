import styled from 'styled-components';

export const Container = styled.div`
    background: ${(props) => props.theme.mainBlack};
    min-height: 100vh;
    padding: 20px;
    color: ${(props) => props.theme.darkWhite} ;

    .header-dash {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .btn-sangria {
            background: ${(props) => props.theme.red};
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;

            &:hover { 
                background-color: ${(props) => props.theme.darkRed};
                
                
            }
        }
    }

    .bottom-area {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
    }
`;

export const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
`;

export const Box = styled.div`
    background: ${(props) => props.theme.black};
    padding: 20px;
    border-radius: 10px;
    border-left: 5px solid ${(props) => props.color}; 
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);

    .header-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        color: ${(props) => props.theme.lightGray};
        
        svg { color: ${(props) => props.color}; }
    }

    h2 {
        font-size: 28px;
        font-weight: bold;
        color: ${(props) => (props.isProfit ? props.theme.yellon : props.theme.white)};
    }

    span {
        font-size: 12px;
        color: ${(props) => props.theme.darkGray}
    }
`;

export const FilterContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 30px;

    .input-group {
        display: flex;
        align-items: center;
        gap: 10px;
        background: ${(props) => props.theme.black};
        padding: 10px 15px;
        border-radius: 8px;
        border: 1px solid ${(props) => props.theme.secondBlackblack};
        transition: border-color 0.2s;

        &:hover {
            border-color: ${(props) => props.theme.purple}
        }

        span {
            color: ${(props) => props.theme.lightGray};
            font-weight: 500;
        }

        input {
            background: transparent;
            border: none;
            color: ${(props) => props.theme.white};
            font-size: 16px;
            width: 100px;
            text-align: center;
            cursor: pointer;
            outline: none;
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

export const RankingContainer = styled.div`
    flex: 1;
    min-width: 300px;
    background: ${(props) => props.theme.black};
    padding: 20px;
    border-radius: 10px;

    h3 {
        margin-bottom: 15px;
        border-bottom: 1px solid ${(props) => props.theme.secondBlack};
        padding-bottom: 10px;
        color: ${(props) => props.theme.secondWhite};
    }

    .list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .item {
        display: flex;
        align-items: center;
        background: ${(props) => props.theme.secondBlack};
        padding: 10px;
        border-radius: 5px;

        .pos { 
            font-weight: bold; 
            margin-right: 10px; 
            color: ${(props) => props.theme.purple}; 
            width: 30px;
        }
        .name { flex: 1; }
        .qtd { font-size: 12px; color: ${(props) => props.theme.lightGray}; }
    }
`;

export const ModalOverlay = styled.div`
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; z-index: 999;
`;
export const ModalContent = styled.div`
    background: ${(props) => props.theme.black}; padding: 30px; border-radius: 10px; width: 400px; border: 1px solid ${(props) => props.theme.secondBlack}; color: ${(props) => props.theme.white};
    h2 { margin-bottom: 20px; color: ${(props) => props.theme.purple}; }
    input { width: 100%; padding: 10px; margin-bottom: 15px; border-radius: 5px; border: 1px solid ${(props) => props.theme.darkGray}; background: ${(props) => props.theme.black}; color: ${(props) => props.theme.white}; }
    .react-datepicker-wrapper { width: 100%; }
`;
