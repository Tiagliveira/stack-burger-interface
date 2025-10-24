import { createBrowserRouter } from 'react-router-dom';

import { Login } from '../containers/Login/index';
import Register from '../containers/Register';

export const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/users',
		element: <Register />,
	},
]);
