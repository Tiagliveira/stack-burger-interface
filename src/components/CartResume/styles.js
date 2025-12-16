import styled from 'styled-components';
import { device } from '../../styles/breakpoits';

export const Container = styled.div`

    background-color:${(props) => props.theme.secondBlack};
    border-radius: 20px;
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    margin-bottom: 20px;

    *{
        color: ${(props) => props.theme.white};
        font-weight:500;
    }

    .container-top{
        display:grid;
        grid-gap:10px 25%;
        grid-template-areas: 
        'title title'
        'items items-price'
        'delivery-tax delivery-tax-price'

    }

    .title{
        grid-area:title;
        font-size:20px;
        font-weight: 700;
        background-color:${(props) => props.theme.black};
        color: ${(props) => props.theme.white};
        width:100%;
        padding:15px;
        text-align:center;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }
    .items{
        grid-area:items;
        padding-left:20px;
    }
    .items-price{
        grid-area:items-price;
        padding-right:20px;
    }
   
    .delivery-tax{
        grid-area:delivery-tax;
        padding-left:20px;
    }
    .delivery-tax-price{
        grid-area:delivery-tax-price;
        padding-right:20px;
    }

    .container-delivery{
        gap: 20px;
        padding: 20px
    }

     .container-center{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        font-size:17px;
        padding-bottom: 10px;
    }

    .container-bottom{
        display:flex;
        justify-content: space-between;
        margin-top:24px;
        padding:20px;

        p{
            font-size:20px;
          font-weight: bolder;
        }

    }

    .inputAddress {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center; 
        position: relative;
        gap: 10px; 
        padding: 0 20px; 

        @media ${device.mobile} {

           justify-content: space-between;
        }

        .address-wrapper {
            display: flex;
            flex-direction: column; 
            align-items: center; 
            position: relative;
            border-radius: 10px;
            
            
            width: 70%; 

            @media ${device.mobile} {
                width: 65%; 
            }

            input {
                width: 100%; 
                text-align: center;
                height: 30px;
                padding-right: 30px; 
                border-radius: 10px;
                border: 2px solid ${(props) => props.theme.secondBlack};
                background-color: ${(props) => props.theme.darkGray};
                
                &::placeholder {
                    color: ${(props) => props.theme.lightGray};
                }
            }

            button {
                 position: absolute;
                 top: 5px; 
                 right: 5px; 
                 background: transparent;
                 border: none;
                 cursor: pointer;

                 svg {
                    fill: ${(props) => props.theme.mainBlack};
                    height: 18px; 
                    width: 18px;
                 }

                 &:hover svg {
                    fill: ${(props) => props.theme.purple};
                 }
            }
        }

        .result {
            position: absolute;
            padding-top:10px;
            bottom: -60px;
            left: 0;
            width: 100%; 
            z-index: 10; 
        }

        .number {
            text-align: center;
            
            width: 25%; 
            
            height: 30px;
            border-radius: 10px;
            border: 2px solid ${(props) => props.theme.secondBlack};
            background-color: ${(props) => props.theme.darkGray};

            &::placeholder {
                color: ${(props) => props.theme.lightGray};
            }

            @media ${device.mobile} {
                width: 30%;
            }
        }

        p {
            color: ${(props) => props.theme.gren};
            font-size: 15px;
            margin: 10px auto;
        }
    }
`;

export const ContainerBig = styled.div`

    
      @media ${device.tablet} {
                        max-width:65%;
                        margin: 30px auto;

                }
      @media ${device.mobile} {
                        max-width:90%;
                     

                }
      @media ${device.mobile} {
                        max-width:90%;
                     

                }

                @media ${device.mobileMini} {
    max-width: 100%;
    margin: auto;
  }
`;
