import { Elements } from '@stripe/react-stripe-js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import stripePromisse from './config/stripeConfig';
import AppProvider from './hooks';
import { router } from './routes';
import GlobalStyles from './styles/globalStyles';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AppProvider>
			<Elements stripe={stripePromisse}>
				<RouterProvider router={router} />
			</Elements>
			<GlobalStyles />
			<ToastContainer autoClose={2000} theme="dark" />
		</AppProvider>
	</StrictMode>,
);
