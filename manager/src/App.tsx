import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import { routers } from "./common/constants/router";
import LoginContainer from "./containers/login";
import Navbar from "./containers/navbar";
import RegisterContainer from "./containers/register";

function App() {
        return (
                <div className="App min-h-screen flex flex-col">
                        <Navbar />
                        <Switch>
                                <Route path={routers.login.link} component={LoginContainer} />
                                <Route path={routers.register.link} component={RegisterContainer} />
                        </Switch>
                </div>
        );
}

export default App;
