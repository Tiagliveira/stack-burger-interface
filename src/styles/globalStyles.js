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


}

    button, a {
    cursor: pointer;
}
`;

export default GlobalStyles;
