import PropTypes from 'prop-types';
import { UseCart } from '../../hooks/CartContext';
import { CartButton } from '../CartButton';
import { CardImage, Container } from './styles';


export function CardProuct({ product }) {
	const { putProductInCart } = UseCart();

	return (
		<Container>
			<CardImage src={product.url} alt={product.name} />
			<div>
				<p>{product.name}</p>
				<strong> {product.currencyValue}</strong>
				<CartButton onClick={() => putProductInCart(product)}></CartButton>
			</div>
		</Container>
	);
}

CardProuct.propTypes = {
	product: PropTypes.object,
};
