import { UseProvider } from './UserContext';

const AppProvider = ({ children }) => {
	return <UseProvider>{children}</UseProvider>;
};

export default AppProvider;
