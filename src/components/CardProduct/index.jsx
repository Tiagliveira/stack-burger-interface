import { MinusIcon, PencilSimpleLineIcon, PlusIcon, StarIcon, XIcon } from '@phosphor-icons/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { UseCart } from '../../hooks/CartContext';
import { CartButton } from '../CartButton';
import { ObservationModal } from '../ObservationModal';
import {
	CardImage, Container, ContainerButton, ContainerStrong,
	Content, EditButton, ModalContent, ModalOverlay, ProductDescription, QuantityContainer, RatingContainer,
	SeeMoreButton
} from './styles';

export function CardProduct({ product }) {
	const { cartProducts, putProductInCart, increaseProduct, decreaseProduct, updateProductObservation } = UseCart();
	const [showModal, setShowModal] = useState(false);
	const [showDescModal, setShowDescModal] = useState(false);

	const rating = Number(product.rating_average) || 0;
	const count = Number(product.rating_count) || 0;

	const productInCart = cartProducts.find(item => item.id === product.id);
	const quantity = productInCart ? productInCart.quantity : 0;
	const observation = productInCart ? productInCart.observation : '';

	const handleSaveObservation = (newText) => {
		if (productInCart) {
			updateProductObservation(product.id, newText);
		} else {

			putProductInCart({ ...product, observation: newText });
		}
		setShowModal(false);
	};

	return (
		<Container>
			<CardImage src={product.url} alt={product.name} />
			<Content>
				<h3>{product.name}</h3>
				<div className='description'>
					<div className='text'>
						<ProductDescription>{product.description}</ProductDescription>
						{product.description.length > 50 && (
							<SeeMoreButton onClick={() => setShowDescModal(true)}>Ver mais...</SeeMoreButton>
						)}
						{observation && (
							<span>
								<b>Obs: </b>
								{observation.length > 20 ? `${observation.slice(0, 20)}  ` : observation}
								{observation.length > 20 && (
									<SeeMoreButton className='buttonObservation' onClick={() => setShowModal(true)}>...</SeeMoreButton>
								)}
							</span>
						)}
					</div>
					<EditButton onClick={() => setShowModal(true)}>
						<PencilSimpleLineIcon size={25} />
					</EditButton>
				</div>


				<ContainerButton>

					<ContainerStrong>
						<RatingContainer>
							<div className="stars">
								{[...Array(5)].map((_, index) => (
									<StarIcon
										key={index} size={16}
										weight={index < Math.round(rating) ? "fill" : "regular"}
										color={index < Math.round(rating) ? "#FFD700" : "#999"}
									/>
								))}
							</div>
							{count > 0 && <span className="count">({count})</span>}
						</RatingContainer>

						<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
							<strong>{product.currencyValue}</strong>

						</div>

					</ContainerStrong>

					{quantity > 0 ? (
						<QuantityContainer>
							<button onClick={() => decreaseProduct(product.id)}><MinusIcon size={14} weight="bold" /></button>
							<span>{quantity}</span>
							<button onClick={() => increaseProduct(product.id)}><PlusIcon size={14} weight="bold" /></button>
						</QuantityContainer>
					) : (
						<CartButton onClick={() => putProductInCart(product)}></CartButton>
					)}
				</ContainerButton>
			</Content>

			{showModal && (
				<ObservationModal
					initialValue={observation}
					onClose={() => setShowModal(false)}
					onSave={handleSaveObservation}
				/>
			)}

			{showDescModal && (
				<ModalOverlay onClick={() => setShowDescModal(false)}>
					<ModalContent onClick={e => e.stopPropagation()}>
						<button className="close-btn" onClick={() => setShowDescModal(false)}>
							<XIcon size={20} />
						</button>

						<h3>{product.name}</h3>
						<p>{product.description}</p>
					</ModalContent>
				</ModalOverlay>
			)}
		</Container >
	);
}

CardProduct.propTypes = { product: PropTypes.object };
