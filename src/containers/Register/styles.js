import styled from 'styled-components';
import Background from './../../assets/background.jpg';
import BackgroundLogin from './../../assets/backgroundLogin.png';

export const Container = styled.div`
 display: flex;
 height: 100vh;
 width:100vw;
`;
export const LeftContainer = styled.div`
 background: url('${Background}');
 background-size:cover;
 background-position: center;

 height:100%;
 width:100%;
 max-width:50%;

 display:flex;
 align-items:center;
 justify-content:center;

 img{
    width:70%;
 }
`;
export const RightContainer = styled.div`
display:flex;
justify-content: center ;
align-items:center;
flex-direction: column;

 height:100%;
 width:100%;
 max-width:50%;

 background: url('${BackgroundLogin}');
 background-color:#1e1e1e;

 p{
   color:#fff;
   font-size:18px;
   font-weight:500;

   a{
      text-decoration:underline;
   }
 }
`;
export const Title = styled.h2`

font-family: "BBH Sans Hegarty", sans-serif;
font-size: 25px;
color: #9758a6;


span{
   color: #9758a6;
   font-family: "BBH Sans Hegarty", sans-serif;
}
`;
export const Form = styled.form`
display:flex;
flex-direction:column;
gap: 20px;
padding:20px;
width:100%;
max-width:400px;

`;
export const InpuntContainer = styled.div`
display:flex;
flex-direction:column;
gap: 5px;
width: 100%;

input {
   width :100%;
   border: none;
   height: 42px;
   border-radius: 5px;
   padding: 0 10px;
}
label{
   color: #fff;
   font-size: 18px;
   font-weight: 600;
}

p{
   font-size:14px;
   line-height:80%;
   color:#cf3057;
   font-weight:400;
   height:10px;
}
`;

export const Link = styled.a`
  font-size:18px;
  font-weight:600;
  color: #fff;
  outline:#fff;
  
`;
