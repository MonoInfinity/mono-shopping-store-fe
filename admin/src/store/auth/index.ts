import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

import { AuthState, UserRole, UserStatus } from "../../common/interface/user.interface";
import { authThunk } from "./thunk";
import { userThunk } from "./userThunk";

const initialState: AuthState = {
        email: "",
        username: "",
        name: "",
        userId: "",
        phone: "",
        address: "",
        createDate: "",
        avatarUrl: "",
        isLogin: false,
        role: UserRole.CUSTOMER,
        salary: 0,
        status: UserStatus.ENABLE,
};

const reducer = createSlice({
        name: "auth",
        initialState,
        reducers: {
                resetState: () => ({ ...initialState }),
                updateLogin: (state) => ({ ...state, isLogin: true }),
        },
        extraReducers: (builder) => {
                builder.addCase(userThunk.getCurrentUser.fulfilled, (state, { payload }) => {
                        const newState = { ...state };
                        newState.userId = payload.userId;
                        newState.name = payload.name;
                        newState.username = payload.username;
                        newState.phone = payload.phone;
                        newState.email = payload.email;
                        newState.address = payload.address;
                        newState.createDate = payload.createDate;
                        newState.avatarUrl = payload.avatarUrl;
                        newState.salary = payload.salary;
                        newState.role = payload.role;
                        newState.status = payload.status;
                        newState.isLogin = true;
                        return newState;
                });
                builder.addCase(authThunk.loginUser.fulfilled, (state) => ({ ...state, isLogin: true }));
                builder.addCase(authThunk.registerUser.fulfilled, (state) => ({ ...state, isLogin: true }));
                builder.addCase(authThunk.logoutUser.fulfilled, () => ({ ...initialState }));

                builder.addCase(userThunk.getCurrentUser.rejected, (state) => {
                        const cookies = new Cookies();
                        cookies.set("re-token", "", { maxAge: -999 });
                        cookies.set("auth-token", "", { maxAge: -999 });
                        cookies.set("io-token", "", { maxAge: -999 });

                        return {
                                ...state,
                                isLogin: false,
                                isSocketLogin: false,
                        };
                });
        },
});
export const authActions = {
        ...reducer.actions,
};
export const authReducer = reducer.reducer;
