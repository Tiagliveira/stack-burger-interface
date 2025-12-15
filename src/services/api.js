import axios from 'axios';

const apiUrl = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
	baseURL: apiUrl,
});

api.interceptors.request.use((config) => {
	const userData = localStorage.getItem('devburg:userData');

	const token = userData && JSON.parse(userData).token;

	if (token) {
		config.headers.authorization = `Bearer ${token}`;
	}

	return config;
});
