import { Link as ReactLink } from 'react-router-dom';
import styled from 'styled-components';
import Background from './../../assets/background.jpg';
import BackgroundLogin from './../../assets/backgroundLogin.png';

import { device } from './../../styles/breakpoits';

export const Container = styled.div`
 display: flex;
 height: 100vh;
 width:100vw;

 @media ${device.tablet} {
   display: flex;
   flex-direction: column;
   height: 100dvh;
   width:100vw;

 }
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
    width:60%;
 }


 @media ${device.tablet} {
   height: 40%;
   max-width: 100%;
 }

 @media ${device.mobile} {
   height: 30%;
   max-width: 100%;
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
 background-size:cover;
 background-color:#1e1e1e;

 p{
   color:${(props) => props.theme.white};
   font-size:18px;
   font-weight:500;

   a{
      text-decoration:underline;
   }
 }

 @media ${device.tablet} {
   height: 60%;
   max-width: 100%;
 }

  @media ${device.tablet} {
   height: 70%;
   max-width: 100%;
 }
`;
export const Title = styled.h2`

font-family: "BBH Sans Hegarty", sans-serif;
font-size: 25px;
color: ${(props) => props.theme.purple};


 @media ${device.mobile} {
  font-size: 22px;
  margin-top:10px;
 }
 


span{
   color: ${(props) => props.theme.purple};
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

 @media ${device.mobile} {
  gap: 10px;
 }
 

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
   color: ${(props) => props.theme.white};
   font-size: 18px;
   font-weight: 600;
}

p{
   font-size:14px;
   line-height:80%;
   color:${(props) => props.theme.darkRed};
   font-weight:400;
   height:10px;
}
`;

export const Link = styled(ReactLink)`
  font-size:18px;
  font-weight:600;
  color:${(props) => props.theme.purple};
  outline:${(props) => props.theme.purple};
  text-decoration: none;

   &:hover {
   color: ${(props) => props.theme.darkRed};
  }
  
`;
