import styled from 'styled-components';
import Background from '../../assets/background2.png';
import Texture from '../../assets/textureCart.png';
import { device } from './../../styles/breakpoits';

export const Container = styled.div`
		background: linear-gradient(rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.0)) no-repeat,
		url('${Background}');
		background-color: ${(props) => props.theme.mainBlack};
		height:100%;
		background-size:cover;
		background-position:center;
		width:100%;
		min-height: 100vh;

`;
export const Banner = styled.div`
	background: url('${Texture}');
	background-color:${(props) => props.theme.mainBlack};

	display: flex;
	justify-content: center;
	align-items: center;
	position:relative;
	height:180px;
	width: 100%;

	@media ${device.mobile} {
		height:150px;
	}

	img{
		height:130px;
		
		@media ${device.mobile} {
		height:100px;
	}
	}

	


	

`;
export const Title = styled.div`
	font-size:32px;
	font-weight:800;
	padding-bottom: 12px;
	color: ${(props) => props.theme.red};
	text-align:center;
	position: relative;

	@media ${device.mobile} {
		font-size: 20px;
	}
	
	&::after{
		position: absolute;
		content: '';
		bottom: 0;
		left: calc(50% + -28px);
		width: 56px;
		height:4px;
		background-color: ${(props) => props.theme.red};
		
	
	}
`;
export const Content = styled.div`
	display:grid;
	grid-template-columns: 1fr 30%;
	gap:40px;
	width:100%;
	max-width:1280px;
	padding:40px;
	margin: 0  auto;

	@media ${device.laptop} {
		display: flex;
		flex-direction: column;
		padding: 20px;
	}
	@media ${device.mobile} {
		padding: 10px;
	}

`;
