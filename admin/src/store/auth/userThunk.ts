import { createAsyncThunk } from "@reduxjs/toolkit";

import { User } from "../../common/interface/user.interface";
import { UserAPI, userAPI } from "../../api/userApi";
import authApi from "../../api/authApi";
import authThunk from "./thunk";

class UserThunk {
        constructor(private readonly apiCall: UserAPI) {}

        getCurrentUser = createAsyncThunk<User, void>("getCurrentUser", async (_, { dispatch }) => {
                const res = await this.apiCall.getCurrentUser();
                return res.data.data;
        });
}

export const userThunk = new UserThunk(userAPI);
export default userThunk;
