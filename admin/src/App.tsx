import { useEffect } from 'react';
import './App.css';
import * as React from 'react';

import { Layout } from 'antd';

import { Route, Switch } from 'react-router-dom';

import NavbarContainer from './containers/navbar';
import Cookies from 'universal-cookie';
import { store } from './store';
import { authActions } from './store/auth';
import { routers } from './common/constants/router';
import { useTranslation } from 'react-i18next';
import LoadingScreen from './components/loading/loadingScreen';

const LoginContainer = React.lazy(() => import('./containers/authentication/login'));
const RegisterContainer = React.lazy(() => import('./containers/authentication/register'));
const MainDashboardContainer = React.lazy(() => import('./containers/mainDashboard'));

function App() {
        const { i18n } = useTranslation();

        useEffect(() => {
                const lang = new Cookies().get('lang') || 'en';
                i18n.changeLanguage(lang);
        }, [i18n]);

        useEffect(() => {
                const cookies = new Cookies();
                const reToken = cookies.get('auth-token');
                if (reToken) store.dispatch(authActions.updateLogin());
        }, []);

        return (
                <Layout className="flex-1 fade-in">
                        <NavbarContainer />
                        <React.Suspense fallback={<LoadingScreen />}>
                                <Switch>
                                        <Route path={routers.register.link} component={RegisterContainer} />
                                        <Route path={routers.login.link} component={LoginContainer} />
                                        <Route path={routers.home.link} component={MainDashboardContainer} />
                                </Switch>
                        </React.Suspense>
                </Layout>
        );
}

export default App;
