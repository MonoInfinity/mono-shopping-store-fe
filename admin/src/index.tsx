import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store';
import AutoLoginWrapper from './common/HOC/autoLoginWrapper';
import LoadingScreen from './components/loading/loadingScreen';
import './i18n';

ReactDOM.render(
        <React.StrictMode>
                <Provider store={store}>
                        <BrowserRouter>
                                <AutoLoginWrapper>
                                        <div className="flex flex-col min-h-screen">
                                                <Suspense fallback={<LoadingScreen />}>
                                                        <App />
                                                </Suspense>
                                        </div>
                                </AutoLoginWrapper>
                        </BrowserRouter>
                </Provider>
        </React.StrictMode>,
        document.getElementById('root')
);
