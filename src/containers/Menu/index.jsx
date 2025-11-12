import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardProuct } from '../../components/index';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import {
	Banner,
	CategoryButton,
	CategoryMenu,
	Container,
	ProductsConatiner,
} from './styles';

export function Menu() {
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	const navigate = useNavigate();

	const location = useLocation();


	const [activeCategory, setActiveCategory] = useState(0);

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const categoriaId = +queryParams.get('categoria') || 0;
		setActiveCategory(categoriaId);
	}, [location.search]);

	useEffect(() => {
		async function loadCategories() {
			const { data } = await api.get('/categories');

			const newCategories = [{ id: 0, name: 'Todos' }, ...data];

			setCategories(newCategories);
		}

		async function loadProducts() {
			const { data } = await api.get('/products');

			const newProducts = data.map((product) => ({
				currencyValue: formatPrice(product.price),
				...product,
			}));

			setProducts(newProducts);
		}

		loadCategories();
		loadProducts();
	}, []);

	useEffect(() => {
		if (activeCategory === 0) {
			setFilteredProducts(products);
		} else {
			const newFilteredProducts = products.filter(
				(product) => product.category_id === activeCategory,
			);
			setFilteredProducts(newFilteredProducts);
		}
	}, [products, activeCategory]);
	return (
		<Container>
			<Banner>
				<h1>
					O MELHOR <br /> HAMBURGEUR <br /> ESTÁ AQUI!
					<span> Esse cardápio está irresistível</span>
				</h1>
			</Banner>

			<CategoryMenu>
				{categories.map((category) => (
					<CategoryButton
						key={category.id}
						$isActiveCategory={category.id === activeCategory}
						onClick={() => {
							navigate(
								`?categoria=${category.id}`,

								{
									replace: true,
								},
							);
							setActiveCategory(category.id);
						}}
					>
						{category.name}
					</CategoryButton>
				))}
			</CategoryMenu>
			<ProductsConatiner>
				{filteredProducts.map((product) => (
					<CardProuct key={product.id} product={product} />
				))}
			</ProductsConatiner>
		</Container>
	);
}
