import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AppProvider from './hooks';
import { router } from './routes';
import GlobalStyles from './styles/globalStyles';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AppProvider>
			<RouterProvider router={router} />
			<GlobalStyles />
			<ToastContainer autoClose={2000} theme="dark" />
		</AppProvider>
	</StrictMode>,
);
