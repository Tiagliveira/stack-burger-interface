import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';

import { api } from '../../services/api';
import { CategoryButton, Container, ContainerItems, Title } from './styles';

export function CategoriesCarousel() {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		async function loadCategories() {
			const { data } = await api.get('/categories');
			setCategories(data);
		}
		loadCategories();
	}, []);

	const responsive = {
		superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 4 },
		desktop: { breakpoint: { max: 3000, min: 1280 }, items: 4 },
		laptop: { breakpoint: { max: 1280, min: 800 }, items: 3 },
		tablet: { breakpoint: { max: 800, min: 690 }, items: 2 },
		mobile: { breakpoint: { max: 690, min: 0 }, items: 1 },
	};

	return (
		<Container>
			<Title>Categorias</Title>
			<Carousel
				responsive={responsive}
				infinite={true}
				partialVisible={false}
				itemClass="carousel-item"
			>
				{categories.map((category) => (
					<ContainerItems key={category.id} imagemurl={category.url}>
						<CategoryButton
							as={Link}
							to={`/cardapio?categoria=${category.id}`}
						>
							{category.name}
						</CategoryButton>
					</ContainerItems>
				))}
			</Carousel>
		</Container>
	);
}
