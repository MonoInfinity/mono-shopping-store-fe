import { AxiosInstance } from "axios";

import http from "./axiosCommon";
import { UserLoginDto, UserRegisterDto } from "../common/interface/dto/auth.dto";
import { ServerResponse } from "../common/interface/api.interface";

export class AuthAPI {
        constructor(private readonly apiCall: AxiosInstance, readonly prefix: string) {}

        async loginUser(input: UserLoginDto) {
                const url = `${this.prefix}"/login"`;
                const res = await this.apiCall.post<ServerResponse<null>>(url, input);
                return res;
        }

        async logoutUser() {
                const url = `${this.prefix}"/logout"`;
                const res = await this.apiCall.post<ServerResponse<null>>(url);
                return res;
        }

        async registerUser(input: UserRegisterDto) {
                const url = `${this.prefix}"/register"`;
                const res = await this.apiCall.post<ServerResponse<null>>(url, input);
                return res;
        }
}
export const authApi = new AuthAPI(http, "/auth");
export default authApi;
