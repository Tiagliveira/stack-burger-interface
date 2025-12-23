import styled from 'styled-components';
import Background from '../../assets/background2.webp';
import BannerHome from '../../assets/banner-home.webp';
import { device } from '../../styles/breakpoits';

export const Banner = styled.div`
    background: url('${BannerHome}');
    background-color: ${(props) => props.theme.mainBlack};
    background-size:cover;
    background-position:center;
    height: 400px;

h1{
    font-family: "BBH Sans Hegarty", sans-serif; 
    font-size:80px;
    color:${(props) => props.theme.darkWhite};
    position: absolute;
    right: 20%;
    top:10%;

}

  @media ${device.laptop} {
        height: 350px;
        
    h1 {
        font-size: 60px;
        position: absolute;
        right: 5%;
    }
  }

  
     @media ${device.tablet} {
     height: 200px;

     h1{
        font-size: 40px;
        position: absolute;
        right: 5%;
     }
  }
  
     @media ${device.mobile} {
     height: 150px;

     h1{
        font-size: 25px;
        position: absolute;
        right: 3%;
     }

    }
     @media ${device.mobileMini} {
     height: 130px;

     h1{
        font-size: 20px;
        position: absolute;
        right: 3%;
     }

    }

`;

export const Container = styled.section`
    background: linear-gradient(rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.0)) no-repeat,
    url('${Background}');
    background-color: ${(props) => props.theme.mainBlack};
    height:100%;
    background-size:cover;
    background-position:center;
`;
export const Content = styled.div`
padding-bottom: 50px;

 @media ${device.laptop} {
        min-height: 100%;
 }

@media ${device.mobile} {
     padding-bottom: 30px;

}

@media ${device.mobileMini} {
     padding-bottom: 20px;

}
`;

export const Main = styled.main`
background-color: ${(props) => props.theme.mainBlack};

 @media ${device.laptop} {
      gap: 50px;
      min-height: 91dvh;
 }
`;
