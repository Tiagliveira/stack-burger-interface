import styled from 'styled-components';
import Background from '../../assets/backgroundLogin.png';
import BannerHome from '../../assets/banner-home.png';

export const Banner = styled.div`
    background: url('${BannerHome}');
    background-size:cover;
    background-position:center;
    height: 380px;

h1{
  font-family: "BBH Sans Hegarty", sans-serif; 
  font-size:80px;
  color:#f4f4f4;
  position: absolute;
  right: 20%;
  top:10%;

}

`;

export const Container = styled.section`
    background: linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)),
    url('${Background}');
    background-size:cover;
    background-position:center;
    height:500px;
`;
export const Content = styled.div`


`;
