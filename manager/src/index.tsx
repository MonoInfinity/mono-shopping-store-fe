import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./i18n";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import AutoLoginWrapper from "./common/HOC/autoLoginWrapper";

ReactDOM.render(
        <Provider store={store}>
                <BrowserRouter>
                        <AutoLoginWrapper>
                                <React.Suspense fallback={<div>Loading</div>}>
                                        <App />
                                </React.Suspense>
                        </AutoLoginWrapper>
                </BrowserRouter>
        </Provider>,

        document.getElementById("root")
);
