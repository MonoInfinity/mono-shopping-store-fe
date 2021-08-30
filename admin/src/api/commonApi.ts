import { ServerResponse } from '../common/interface/api.interface';
import axios, { AxiosInstance } from 'axios';
import { requestInterceptor, responseErrorInterceptor, responseSuccessInterceptor } from './axiosHelper';

export class CommonAPI {
        constructor(private readonly http: AxiosInstance) {}

        async uploadFile(input: File) {
                const data = new FormData();
                data.append('file', input);
                const url = `/file/upload`;
                const res = await this.http.post<ServerResponse<string>>(url, data);
                return res;
        }
}
const axiosClient = axios.create({
        baseURL: process.env.REACT_APP_STORAGE_SERVER_URL + '/api',
});

axiosClient.interceptors.request.use(requestInterceptor);
axiosClient.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);

export const commonAPI = new CommonAPI(axiosClient);
export default commonAPI;
