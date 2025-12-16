import { createGlobalStyle } from 'styled-components';
import 'react-toastify';

const GlobalStyles = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    font-family: "POPPINS", sans-serif;
    font-weight:400;
    font-style:normal;

    
    html, body {
        
        background-color: ${(props) => props.theme.black};
        
        
        width: 100%;
        height: 100%;
        overflow-x: hidden; 
    }

    body {
        -webkit-font-smoothing: antialiased;
    }

}

    button, a {
    cursor: pointer;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

`;

export default GlobalStyles;
