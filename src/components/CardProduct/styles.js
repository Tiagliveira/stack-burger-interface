import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    padding: 40px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.secondBlack};
    cursor: grab;
    box-shadow: rgba(0,0,0, 0.35) 0px 5px 15px;
    position: relative;

`;

export const ContainerButton = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center; 
    gap: 10px; 
    margin-top: 10px;

   
    & > button {
        width: 100%;
        max-width: 120px; 
    }
`;

export const Content = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    h3 {
        font-size: 23px;
        color: ${(props) => props.theme.white};
        line-height: 20px;
        font-weight: bold;
        margin-top: 40px;
    }

    p {
        color: ${(props) => props.theme.lightGray};
        font-size: 16px;
        line-height: 20px;
        font-weight: 600;
    }

    strong {
        font-size: 22px;
        color: ${(props) => props.theme.white};
        font-weight: 800;
        line-height: 20px;
    }

    .description {
        display: flex;
        justify-content: space-between;
    }

     .text {
        span {
            font-size: 12px;
            font-weight: 400;
            color: ${(props) => props.theme.gren};
            line-height: 16px;
           display: -webkit-box;
           -webkit-line-clamp: 1; 
          -webkit-box-orient: vertical;
           overflow: hidden;

          .buttonObservation {
                color: ${(props) => props.theme.gren};
                font-size: 15px;
                text-decoration: none;
            }
        }
    }
`;

export const CardImage = styled.img`
    height: 120px;
    position: absolute;
    top: -50px;
    border-radius: 50%;
`;
export const ProductDescription = styled.p`
    line-height: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 1; 
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;
export const RatingContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 5px;

    .stars {
        font-size: 15px;
        display: flex;
        flex-direction: row;
        gap: 2px;
    }

    .count {
        font-size: 13px;
        color: ${(props) => props.theme.lightGray};
        opacity: 0.7;
    }
`;

export const ContainerStrong = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const QuantityContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    background-color: ${(props) => props.theme.purple};
    border-radius: 5px;
    padding: 10px;
    min-width: 110px; 
    height: 40px; 

    span {
        font-weight: bold;
        color: ${(props) => props.theme.mainBlack};
        font-size: 18px;
    }

    button {
        background: transparent;
        border: none;
        width: auto; 
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: ${(props) => props.theme.mainBlack};
        transition: transform 0.2s;

        &:hover {
            transform: scale(1.2);
            background-color: transparent; 

            svg{
                fill: ${(props) => props.theme.white};
            }
        }
        
        &:active {
            opacity: 0.7;
        }
    }
`;

export const EditButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: ${(props) => props.theme.white};
    transition: color 0.2s;
    padding: 0;
    
    &:hover {
        color: ${(props) => props.theme.purple};
    }
`;

export const SeeMoreButton = styled.button`
    background: transparent;
    border: none;
    color: ${(props) => props.theme.purple};
    font-size: 11px;
    font-weight: bold;
    cursor: pointer;
    padding: 0;
    margin-top: 2px;
    text-decoration: underline;

    &:hover { color: ${(props) => props.theme.white}; }
`;

export const ModalOverlay = styled.div`
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5); 
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    backdrop-filter: blur(2px);
`;

export const ModalContent = styled.div`
    background: ${(props) => props.theme.mainBlack};
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    position: relative;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);

    h3 {
        color: ${(props) => props.theme.purple};
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: 700;
    }

    p {
        font-size: 16px;
        font-weight:400;
        line-height: 20px;
        color: ${(props) => props.theme.lightGray};
        text-align: justify;
    }

    .close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: transparent;
        border: none;
        cursor: pointer;
        color: ${(props) => props.theme.white};
    }
`;
