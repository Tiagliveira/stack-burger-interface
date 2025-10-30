import { CartProvaider } from './CartContext';
import { UseProvider } from './UserContext';

const AppProvider = ({ children }) => {
	return (
		<UseProvider>
			<CartProvaider>{children}</CartProvaider>
		</UseProvider>
	);
};

export default AppProvider;
