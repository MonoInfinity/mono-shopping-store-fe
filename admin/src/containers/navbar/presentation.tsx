import * as React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Dropdown, Menu, Select, Avatar } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { GlobalOutlined } from '@ant-design/icons';

import LogoIcon from '../../components/icons/logo';
import LogoSmIcon from '../../components/icons/logo-sm';
import { routers } from '../../common/constants/router';
import { AuthState } from '../../common/interface/user.interface';
import { LocaleKey } from '../../common/interface/locale.interface';

export interface NavbarPresentationProps {
        authState: AuthState;
        handleOnLogout(): void;
        translate(key: LocaleKey, context?: any): string;
        handleOnChangeLanguage(value: 'en' | 'vi'): void;
        currentLanguage: 'en' | 'vi';
}

const NavbarPresentation: React.FC<NavbarPresentationProps> = ({
        authState,
        handleOnLogout,
        translate,
        handleOnChangeLanguage,
        currentLanguage,
}) => {
        const menu = (
                <Menu>
                        <Menu.Item>
                                <Link to={routers.viewMyProfile.link}>
                                        <h1 className="capitalize">{authState.name}</h1>
                                </Link>
                        </Menu.Item>
                        <Menu.Item>
                                <button onClick={handleOnLogout}>{translate('button-logout')}</button>
                        </Menu.Item>
                </Menu>
        );

        return (
                <Header className="z-30 flex justify-between px-4 bg-white shadow-sm ">
                        <Link to={routers.home.link} className="block">
                                <div className="hidden md:block">
                                        <LogoIcon />
                                </div>
                                <div className="grid h-full p-2 md:hidden place-items-center">
                                        <LogoSmIcon />
                                </div>
                        </Link>
                        <Menu theme="light" mode="horizontal" className="flex justify-end flex-1 font-semibold">
                                <Menu.Item key="0">
                                        <Select
                                                value={currentLanguage}
                                                onChange={handleOnChangeLanguage}
                                                className="w-32"
                                                suffixIcon={<GlobalOutlined className="text-gray-500" />}
                                        >
                                                <Select.Option value="en">English</Select.Option>
                                                <Select.Option value="vi">Vietnamese</Select.Option>
                                        </Select>
                                </Menu.Item>
                                {authState.isLogin ? (
                                        <>
                                                <Menu.Item key="1">
                                                        <Dropdown overlay={menu} placement="bottomLeft">
                                                                <Badge count={10}>
                                                                        <Avatar
                                                                                src={
                                                                                        process.env
                                                                                                .REACT_APP_STORAGE_SERVER_URL +
                                                                                        '/' +
                                                                                        authState.avatarUrl
                                                                                }
                                                                        />
                                                                </Badge>
                                                        </Dropdown>
                                                </Menu.Item>
                                        </>
                                ) : (
                                        <>
                                                <Menu.Item key="1">
                                                        <Link to={routers.register.link}>
                                                                {translate('link-register')}
                                                        </Link>
                                                </Menu.Item>
                                                <Menu.Item key="2">
                                                        <Link to={routers.login.link}>{translate('link-login')}</Link>
                                                </Menu.Item>
                                        </>
                                )}
                        </Menu>
                </Header>
        );
};

export default NavbarPresentation;
