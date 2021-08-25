import * as React from "react";
import { Link } from "react-router-dom";
import { routers } from "../../common/constants/router";
import LogoIcon from "../../components/icons/logo";
import GlobalIcon from "../../components/icons/global";
import { SelectLanguage } from "../../components/form";
import { LocaleKey } from "../../common/interface/locale.interface";

export interface NavbarPresentationProps {
        handleOnChangeLanguage(input: React.ChangeEvent<HTMLSelectElement>): void;
        handleOnLogout(): void;
        currentLanguage: string;
        translate(key: LocaleKey, context?: any): string;
}

const NavbarPresentation: React.FC<NavbarPresentationProps> = ({ handleOnChangeLanguage, handleOnLogout, currentLanguage, translate }) => {
        return (
                <div className="w-full bg-white shadow-lg px-4 flex justify-between  items-center">
                        <Link to={routers.home.link}>
                                <LogoIcon />
                        </Link>

                        <div className="flex items-center space-x-4">
                                <SelectLanguage handleOnChange={handleOnChangeLanguage} defaultValue={currentLanguage} />
                                <div className="font-semibold hover:text-blue-gem-500 duration-300 p-2 ">
                                        <Link to={routers.login.link}>{translate("button-login")}</Link>
                                </div>
                                <div className="font-semibold hover:text-blue-gem-500 duration-300 p-2">
                                        <Link to={routers.register.link}>{translate("button-register")}</Link>
                                </div>
                        </div>
                </div>
        );
};

export default NavbarPresentation;
