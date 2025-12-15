import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../styles/breakpoits';

export const Container = styled.div`
    .carosel-item{
        padding-right:40px;

        @media ${device.tablet} {
            padding-right: 20px;
        }

          @media ${device.mobile} {
            padding-right: 10px;
        }
    }

  padding-left:50px;

    @media ${device.tablet} {
            padding-left: 25px;
        }
    @media ${device.mobile} {
            padding-left: 25px;
        }

  .react-multiple-carousel__arrow--right {
        top:10px;

         @media ${device.tablet} {
            right: 40px;
        }
         @media ${device.mobile} {
            right: 45px;
        }
    }
    .react-multiple-carousel__arrow--left {
        top:10px;

          @media ${device.tablet} {
            left: 5px;
        }
    }
`;
export const Title = styled.h2`
    font-size:32px;
    font-weight: 800;
    color: ${(props) => props.theme.purple};
    padding-bottom:12px;
    position:relative;
    text-align:center;
    margin-bottom:40px;
    margin-top:10px;

    &::after{
        content: '';
        position:absolute;
        bottom: 0;
        width: 56px;
        height:4px;
        background-color: ${(props) => props.theme.purple};
        left: calc(50% - 28px);

         @media ${device.tablet} {
            width: 40px;
             left: calc(50% - 20px);
        }
        
         @media ${device.mobileMini} {
            width: 30px;
             left: calc(50% - 15px);
        }
    }

     @media ${device.tablet} {
           font-size: 28px;
           margin-bottom: 30px;
        }

     @media ${device.mobile} {
            text-align: center;
            margin-left: -20px;
        }
     @media ${device.mobileMini} {
           font-size: 23px;
           margin-bottom: 20px;
        }
`;

export const ContainerItems = styled.div`
    background: url('${(props) => props.imagemurl}');
    background-position:center;
    background-size:cover;

    display: flex;
    align-items:center;
    justify-content: center;
    padding: 20px 10px;
    width:90%;
    height:220px;
    border-radius:25px;
    cursor: grab;

`;

export const CategoryButton = styled(Link)`
    font-size:22.5px;
    font-weight: 500;
    color: ${(props) => props.theme.white};
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 30px;
    border-radius: 30px;
    margin-top: 50px;
    text-decoration: none;
   

    &:hover{
        background-color: ${(props) => props.theme.purple};
    }
`;
