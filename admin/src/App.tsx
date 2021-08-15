import React from "react";
import "./App.css";

import { Layout } from "antd";

import { Route, Switch } from "react-router-dom";

import NavbarContainer from "./containers/navbar";
import LoginContainer from "./containers/login";
import RegisterContainer from "./containers/register";
import MainContainer from "./containers/main";

function App() {
        return (
                <Layout className="flex-1">
                        <NavbarContainer />
                        <Switch>
                                <Route path="/login" component={LoginContainer} />
                                <Route path="/register" component={RegisterContainer} />
                                <Route path="/" component={MainContainer} />
                        </Switch>
                </Layout>
        );
}

export default App;
