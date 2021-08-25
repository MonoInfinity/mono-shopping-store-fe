import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { routers } from "../constants/router";
import { RootState, store } from "../../store";
import { AuthState } from "../../common/interface/user.interface";
import { ApiState } from "../../common/interface/api.interface";

import { apiActions } from "../../store/api";

export interface RouteProtectedProps {
        isNeedLogin?: boolean;
}

export const RouteProtectedWrapper: React.FunctionComponent<RouteProtectedProps> = ({ isNeedLogin = false, children }) => {
        const authState = useSelector<RootState, AuthState>((state) => state.auth);
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const router = useHistory();
        const [isGetUser, setIsGetUser] = useState(false);

        useEffect(() => {
                store.dispatch(apiActions.setLoading(true));
                setIsGetUser(true);
        }, []);

        useEffect(() => {
                if (!apiState.isLoading && isGetUser) {
                        if (!authState.isLogin && isNeedLogin) router.push(routers.login.link);
                        else if (!isNeedLogin && authState.isLogin) router.push(routers.home.link);
                }
        }, [authState.isLogin, authState.isLogin]);

        return apiState.isLoading && !isGetUser ? <div className="flex items-center justify-center flex-1 w-full ">31</div> : <>{children}</>;
};
