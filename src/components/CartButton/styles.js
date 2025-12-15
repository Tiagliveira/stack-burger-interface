import styled from 'styled-components';

export const ContainerButton = styled.button`
    background-color: ${(props) => props.theme.purple};
    width:100%;
    height:42px;
    border: 0;
    border-radius: 5px;
    font-size:30px;
    color: ${(props) => props.theme.black};
    display: flex;
    align-items: center;
    justify-content: center;

    svg{
      fill: ${(props) => props.theme.black};
     
    }

&:hover{
    background-color:${(props) => props.theme.secondDarkPurple};
    
    svg {
      fill: ${(props) => props.theme.white};
    }
}

`;
