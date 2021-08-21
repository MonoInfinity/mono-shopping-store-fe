import React, { useEffect } from "react";
import "./App.css";

import { Layout } from "antd";

import { Route, Switch } from "react-router-dom";

import NavbarContainer from "./containers/navbar";
import LoginContainer from "./containers/login";
import RegisterContainer from "./containers/register";
import MainContainer from "./containers/main";
import Cookies from "universal-cookie";
import { store } from "./store";
import { authActions } from "./store/auth";
import routers from "./common/constants/router";

function App() {
        useEffect(() => {
                const cookies = new Cookies();
                const reToken = cookies.get("auth-token");
                if (reToken) store.dispatch(authActions.updateLogin());
        }, []);

        return (
                <Layout className="flex-1">
                        <NavbarContainer />
                        <Switch>
                                <Route path={routers.login.link} component={LoginContainer} />
                                <Route path={routers.register.link} component={RegisterContainer} />
                                <Route path={routers.home.link} component={MainContainer} />
                        </Switch>
                </Layout>
        );
}

export default App;
