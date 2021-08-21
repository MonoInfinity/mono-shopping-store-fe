import { createAsyncThunk } from "@reduxjs/toolkit";

import { UserLoginDto, UserRegisterDto } from "../../common/interface/dto/auth.dto";
import { AuthAPI, authApi } from "../../api/authApi";

class AuthThunk {
        constructor(private readonly apiCall: AuthAPI) {}

        loginUser = createAsyncThunk<null, UserLoginDto>("UserLoginDto", async (input) => {
                await this.apiCall.loginUser(input);
                return null;
        });

        logoutUser = createAsyncThunk<null, void>("LogoutUser", async () => {
                await this.apiCall.logoutUser();
                return null;
        });

        registerUser = createAsyncThunk<null, UserRegisterDto>("UserRegisterDto", async (input) => {
                await this.apiCall.registerUser(input);
                return null;
        });
}
export const authThunk = new AuthThunk(authApi);
export default authThunk;
