import axios from 'axios';
import { requestInterceptor, responseErrorInterceptor, responseSuccessInterceptor } from './axiosHelper';

const axiosClient = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL + '/api',
        withCredentials: true,
});

axiosClient.interceptors.request.use(requestInterceptor);
axiosClient.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);

export default axiosClient;
