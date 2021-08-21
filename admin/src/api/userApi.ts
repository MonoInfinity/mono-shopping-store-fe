import { AxiosInstance } from "axios";

import http from "./axiosCommon";
import { ServerResponse } from "../common/interface/api.interface";
import { User } from "../common/interface/user.interface";
import { UpdateUserDto } from "../common/interface/dto/user.dto";

export class UserAPI {
        constructor(private readonly apiCall: AxiosInstance, private readonly prefix: string) {}

        async getCurrentUser() {
                const url = `${this.prefix}`;
                const res = await this.apiCall.get<ServerResponse<User>>(url);
                return res;
        }
        async updateUser(input: UpdateUserDto) {
                const url = `${this.prefix}/update`;
                const res = await this.apiCall.put<ServerResponse<null>>(url, input);
                return res;
        }
}

export const userAPI = new UserAPI(http, "/user");
export default userAPI;
