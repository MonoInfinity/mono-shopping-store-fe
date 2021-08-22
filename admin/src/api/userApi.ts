import { AxiosInstance } from "axios";

import http from "./axiosCommon";
import { ServerResponse } from "../common/interface/api.interface";
import { User } from "../common/interface/user.interface";
import { ChangePasswordDto, UpdateUserDto } from "../common/interface/dto/user.dto";
import axios from "axios";

export class UserAPI {
        constructor(private readonly apiCall: AxiosInstance, private readonly prefix: string) {}

        async getCurrentUser() {
                const url = `${this.prefix}`;
                const res = await this.apiCall.get<ServerResponse<User>>(url);
                return res;
        }
        async updateUser(input: UpdateUserDto, file: File) {
                const url = `${process.env.REACT_APP_SERVER_URL}/api${this.prefix}`;
                const formData = new FormData();
                formData.append("file", file);
                formData.append("name", input.name);
                formData.append("phone", input.phone);
                formData.append("address", input.address);
                formData.append("email", input.email);

                const res = await axios.put<ServerResponse<void>>(url, input, {
                        headers: {
                                "Content-Type": "multipart/form-data; boundary=--------------------------286886491953162965705677",
                        },
                        withCredentials: true,
                });
                return res;
        }
        async updatePassword(input: ChangePasswordDto) {
                const url = `${this.prefix}/password`;
                const res = await this.apiCall.put<ServerResponse<null>>(url, input);
                return res;
        }
}

export const userAPI = new UserAPI(http, "/user");
export default userAPI;
