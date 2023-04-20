import axios, { AxiosInstance } from 'axios';

const url = import.meta.env.MODE === "development" ? import.meta.env.VITE_URL_DEV : import.meta.env.VITE_URL_PROD;
const api = axios.create({
    baseURL:url
}) as AxiosInstance;

export default api