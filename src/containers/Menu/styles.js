import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Background from './../../assets/background2.png';
import BannerHamburguer from './../../assets/banner-hamburguer.png';
import { device } from '../../styles/breakpoits';

export const Container = styled.div`
     width:100%;
     min-height: 100vh;

      background: linear-gradient(rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.0)) no-repeat,
        url('${Background}');
        background-color: ${(props) => props.theme.mainBlack};
        height:100%;
        background-position:center;
`;

export const Banner = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height:470px;
    width:100%;
    position:relative;

    background: url('${BannerHamburguer}') no-repeat;
    background-color: ${(props) => props.theme.mainBlack};
    background-position: center;
    background-size: cover;

    @media ${device.laptop} {
        height: 370px;
    }
    @media ${device.tablet} {
        height: 330px;
    }
    @media ${device.mobile} {
        height: 230px;
    }
    @media ${device.mobileMini} {
        height: 200px;
    }

    h1{
        font-family: "BBH Sans Hegarty", sans-serif;
        font-size:70px;
        color: ${(props) => props.theme.white};
        line-height:60px;
        position: absolute;

        right:10%;
        top:30%;

          @media ${device.laptop} {
                font-size: 45px;

                right: 5%;
                top: 15%;
             }

             
            @media ${device.tablet} {
                     font-size: 35px;

                     right: 5%;
                     top: 10%;
                }
            @media ${device.mobile} {
                     font-size: 25px;
                     line-height:30px;

                     right: 5%;
                     top: 15%;
                }
            @media ${device.mobileMini} {
                     font-size: 20px;
                     line-height:25px;

                     right: 5%;
                     top: 30%;
                }


        span{
            display:block;
            color:${(props) => props.theme.white};
            font-size:20px;


            @media ${device.mobile} {
                font-size: 16px
            }
            @media ${device.mobile} {
                font-size: 14px
            }
        }
    }
    
`;

export const CategoryMenu = styled.div`
    display: flex;
    justify-content:center;
    gap:20px;
    margin-top:30px;

        @media ${device.tablet} {
             overflow-Y:  scroll;
             justify-content:flex-start;
             margin-left: 20px;
             scrollbar-width: none;
             -ms-overflow-style: none;
             &::-webkit-scrollbar {
                display: none;
        }

         @media ${device.mobile} {
                gap:10px;
            }
    }
`;
export const CategoryButton = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    background-color: none;
    color: ${(props) => (props.$isActiveCategory ? `${props.theme.purple}` : props.theme.white)};
    font-size: 24px;
    font-weight:700;
    padding-bottom: 5px;
    line-height:20px;
    border:none;
    border-bottom: ${(props) => props.$isActiveCategory && `3px solid ${props.theme.purple}`};

   @media ${device.mobile} {
                line-height: 18px;
                cursor: grab;
            }
`;

export const ProductsConatiner = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
padding:40px;
gap:60px;
justify-content:center;
max-width:1280px;
margin: 50px auto 0;

 @media ${device.laptop} {
        grid-template-columns: repeat(2, 1fr);
        max-width:80%;
    }

    
 @media ${device.tablet} {
        
        max-width:90%;
    }

    @media (max-width: 650px) {
        grid-template-columns: repeat(1, 1fr);
        max-width:80%;
    }
 @media ${device.mobile} {
        grid-template-columns: repeat(1, 1fr);
        max-width:90%;
        margin-top: 30px;
    }
`;
