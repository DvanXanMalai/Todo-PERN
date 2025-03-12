import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
    baseURL: 'https://todo-backend-ydvo.onrender.com',
});
//attach jwt token to requests
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
export default api