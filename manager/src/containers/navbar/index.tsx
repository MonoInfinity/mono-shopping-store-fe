import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { useTranslate } from "../../common/hooks/useTranslate";
import { AuthState } from "../../common/interface/user.interface";
import { RootState, store } from "../../store";
import authThunk from "../../store/auth/thunk";
import NavbarPresentation from "./presentation";

export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
        const authState = useSelector<RootState, AuthState>((state) => state.auth);
        const translate = useTranslate();
        const { i18n } = useTranslation();
        const [currentLanguage, setCurrentLanguage] = React.useState("en");

        React.useEffect(() => {
                const lang = new Cookies().get("lang") || "en";
                setCurrentLanguage(lang);
                i18n.changeLanguage(lang);
        }, [i18n]);

        const handleOnChangeLanguage = ({ currentTarget }: React.ChangeEvent<HTMLSelectElement>) => {
                const cookie = new Cookies();
                cookie.set("lang", currentTarget.value);
                window.location.reload();
        };

        const handleOnLogout = () => {
                store.dispatch(authThunk.logoutUser());
        };

        return (
                <NavbarPresentation
                        handleOnChangeLanguage={handleOnChangeLanguage}
                        handleOnLogout={handleOnLogout}
                        currentLanguage={currentLanguage}
                        translate={translate}
                />
        );
};

export default Navbar;
