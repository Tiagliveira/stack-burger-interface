import PropTypes from 'prop-types';
import { CartButton } from '../CartButton';
import { CardImage, Container } from './styles';

export function CardProuct({ product }) {
	return (
		<Container>
			<CardImage src={product.url} alt={product.name} />
			<div>
				<p>{product.name}</p>
				<strong> {product.currencyValue}</strong>
				<CartButton />
			</div>
		</Container>
	);
}

CardProuct.propTypes = {
	product: PropTypes.object,
};
