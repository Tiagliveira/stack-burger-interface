import { createBrowserRouter } from 'react-router-dom';
import { Footer, Header } from '../components';
import { Cart, Checkout, CompletePayment, Home, Login, Menu, Register } from '../containers';




export const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/',
		element: (
			<>
				<Header />
				<Home />
				<Footer />
			</>
		),
	},
	{
		path: '/users',
		element: <Register />,
	},
	{
		path: '/cardapio',
		element: (
			<>
				<Header />
				<Menu />
				<Footer />
			</>
		),
	},
	{
		path: '/carrinho',
		element: (
			<>
				<Cart />
			</>
		)
	},
	{
		path: '/checkout',
		element: (
			<>
				<Checkout />
			</>
		)
	},
	{
		path: '/complete',
		element: (
			<>
				<CompletePayment />
			</>
		)
	}
]);
