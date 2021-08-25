import * as React from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

import { useTranslate } from '../../common/hooks/useTranslate';
import { AuthState } from '../../common/interface/user.interface';
import { RootState, store } from '../../store';
import authThunk from '../../store/auth/thunk';
import locales from './locales.json';
import NavbarPresentation from './presentation';

export type LocaleKey = keyof typeof locales.en;

const NavbarContainer: React.FC = () => {
        const authState = useSelector<RootState, AuthState>((state) => state.auth);
        const translate = useTranslate<LocaleKey>({ dictionary: locales, name: 'navbar' });
        const [currentLanguage, setCurrentLanguage] = React.useState<'en' | 'vi'>('en');

        const onLogout = () => {
                store.dispatch(authThunk.logoutUser());
        };

        React.useEffect(() => {
                const lang = new Cookies().get('lang') || 'en';
                setCurrentLanguage(lang);
        }, []);

        const handleOnChangeLanguage = (value: 'en' | 'vi') => {
                const cookie = new Cookies();
                cookie.set('lang', value);
                window.location.reload();
        };

        return (
                <NavbarPresentation
                        currentLanguage={currentLanguage}
                        handleOnLogout={onLogout}
                        authState={authState}
                        translate={translate}
                        handleOnChangeLanguage={handleOnChangeLanguage}
                />
        );
};

export default NavbarContainer;
