import styled from 'styled-components';
import { device } from '../../styles/breakpoits';

export const ProductImage = styled.img`
    height: 80px;
    width:80px;
    border-radius: 16px;

    @media ${device.mobile} {
        height: 50px;
        width: 50px;
    }

`;
export const ButtonGroup = styled.div`
    display:flex;
    align-items:center;
    gap: 12px;

    button {
        display:flex;
        align-items:center;
        justify-content:center;
        height:30px;
        width:30px;
        color:${(props) => props.theme.white};
        border-radius: 4px;
        background-color: ${(props) => props.theme.purple};
        transition: all 0.4s;
        border: none;

        &:hover{
            background-color: ${(props) => props.theme.secondDarkPurple};
        }

         @media ${device.laptop} {
        gap: 8px;
    }
         @media ${device.mobile} {
        gap: 4px;
    }

    }
`;
export const EmptyCart = styled.p`
    font-size:12px;
    text-align:center;
    justify-content:center;
    font-weight: bold;


`;

export const TotalPrice = styled.p`
    font-weight:bold;
`;

export const ButtonObsevation = styled.div`
     display: flex;
     align-items: center;
     gap: 5px;
     cursor: pointer;
     margin-top: 5px;
     color: ${(props) => (props.isActive ? theme.purple : props.theme.darkGray)}; 
     font-size: 13px;

`;

export const DesktopView = styled.div`
  display: block;
  @media (max-width: 699px) {
    display: none; 
  }
`;

export const MobileView = styled.div`
  display: none;
  @media (max-width: 699px) {
    display: flex; 
    flex-direction: column;
    gap: 15px;
    width: 100%;

  }

  @media ${device.tablet} {
    max-width: 65%;
    margin: auto;
  }

  @media ${device.mobile} {
    max-width: 90%;
    margin: auto;
  }
  @media ${device.mobileMini} {
    max-width: 100%;
    margin: auto;
  }
`;

export const MobileCard = styled.div`
  background: ${(props) => props.theme.black};
  border-radius: 10px;
  padding: 15px;
  display: flex;
  gap: 15px;
  border: 1px solid ${(props) => props.theme.darkGray};
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  position: relative; 
  color:${(props) => props.theme.white};

  .img-container {
    width: 80px;
    height: 80px;

    @media ${device.mobile} {
    width: 60px;
    height: 60px;
  }
    @media ${device.mobileMini} {
    width: 50px;
    height: 50px;
  }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h4 {
      font-size: 16px;
      margin-bottom: 5px;
      color: ${(props) => props.theme.lightGray};
    }

    .price {
      font-weight: bold;
      color: ${(props) => props.theme.lightGray};
    }
    
    .total-price {
        font-weight: bold;
        color: ${(props) => props.theme.white};
        font-size: 15px;
    }

    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }
  }

  .trash-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    cursor: pointer;
  }
`;
