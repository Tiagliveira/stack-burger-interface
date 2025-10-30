import { createBrowserRouter } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Home } from '../containers/Home';
import { Login } from '../containers/Login/index';
import { Menu } from '../containers/Menu';
import Register from '../containers/Register';

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
	}
]);
