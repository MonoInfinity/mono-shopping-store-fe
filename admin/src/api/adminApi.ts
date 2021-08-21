import { AxiosInstance } from "axios";

import http from "./axiosCommon";
import { ServerResponse } from "../common/interface/api.interface";
import { User } from "../common/interface/user.interface";

export class AdminAPI {
        constructor(private readonly apiCall: AxiosInstance, private readonly prefix: string) {}

        async getAllUser(pageSize: number, page: number, name: string) {
                const url = `${this.prefix}/user/all?page=${page}&pageSize=${pageSize}&name=${name}`;
                const res = await this.apiCall.get<ServerResponse<{ users: User[]; count: number }>>(url);
                return res;
        }
}

export const adminAPI = new AdminAPI(http, "/admin");
export default adminAPI;
