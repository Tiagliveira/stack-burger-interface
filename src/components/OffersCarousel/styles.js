import styled from 'styled-components';
import { device } from '../../styles/breakpoits';

export const Container = styled.div`
    .carosel-item{
        padding-right:40px;
        max-width: 500px;

        @media ${device.laptop} {
           padding-right: 20px;
  }
    }

    overflow-x: hidden;

    .react-multi-carousel-list{
        overflow: visible;
    }

    .react-multiple-carousel__arrow--right {
        top:10px;

            @media ${device.mobile} {
            right: 30px;
     }
    }
    .react-multiple-carousel__arrow--left {
        top:10px;

    }

  padding-left:50px;

  @media ${device.laptop} {
    padding-left: 20px;
  }
`;
export const Title = styled.h2`
    font-size:32px;
    font-weight: 800;
    color: ${(props) => props.theme.orange};
    padding-bottom:12px;
    position:relative;
    text-align:center;
    margin: 70px 0;

    &::after{
        content: '';
        position:absolute;
        bottom: 0;
        width: 48px;
        height:4px;
        background-color: ${(props) => props.theme.orange};
        left: calc(50% - 28px);
        @media ${device.tablet} {
            left: calc(50% - 24px);
     }
      @media ${device.mobile} {
        left: calc(50% - 20px);

     }

    }

    @media ${device.laptop} {
    margin: 40px 0;
  }
    @media ${device.tablet} {
        font-size: 26px;
        margin: 30px 0;

     }
    @media ${device.mobile} {
        font-size: 26px;
        margin-bottom: 60px;

     }
`;
