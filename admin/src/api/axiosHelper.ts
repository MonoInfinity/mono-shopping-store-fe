import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';
import { ServerResponse } from '../common/interface/api.interface';
import { store } from '../store';
import { apiActions } from '../store/api';

export function requestInterceptor(req: AxiosRequestConfig) {
        store.dispatch(apiActions.initReq());

        return req;
}

export function responseSuccessInterceptor(response: AxiosResponse<any>) {
        store.dispatch(apiActions.resetState());
        if (response?.data?.details?.message) store.dispatch(apiActions.updateSuccessMessage(response.data));

        return response;
}

export function responseErrorInterceptor(error: AxiosError<ServerResponse<null>>) {
        store.dispatch(apiActions.resetState());
        if (error.response?.status === 401) {
                const cookies = new Cookies();
                cookies.set('auth-token', '', { maxAge: -999 });
        }

        if (error.response?.status) store.dispatch(apiActions.updateErrorDetails(error.response.data.details));

        return Promise.reject(error.response);
}
