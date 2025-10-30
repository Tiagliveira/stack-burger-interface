import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext({});

export const UseProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState({});

	const putUserData = (userInfo) => {
		setUserInfo(userInfo);

		localStorage.setItem('devburg:userData', JSON.stringify(userInfo));
	};

	const logout = () => {
		setUserInfo({});
		localStorage.removeItem('devburg:userData');
	};

	useEffect(() => {
		const userInfoLocalStorage = localStorage.getItem('devburg:userData');

		if (userInfoLocalStorage) {
			setUserInfo(JSON.parse(userInfoLocalStorage));
		}
	}, []);

	return (
		<UserContext.Provider value={{ userInfo, putUserData, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export const UseUser = () => {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error('useUser must be a valid context');
	}

	return context;
};
