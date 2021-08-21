import * as React from "react";
import { Badge, Dropdown, Layout, Menu } from "antd";
import { Avatar, Image } from "antd";
import LogoIcon from "../components/icons/logo";
import LogoSmIcon from "../components/icons/logo-sm";
import { Link } from "react-router-dom";
import routers from "../common/constants/router";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState, store } from "../store";
import { AuthState } from "../common/interface/user.interface";
import authThunk from "../store/auth/thunk";
const { Header } = Layout;

export interface NavbarContainerProps {}

const NavbarContainer: React.FunctionComponent<NavbarContainerProps> = () => {
        const authState = useSelector<RootState, AuthState>((state) => state.auth);
        const onLogout = () => {
                store.dispatch(authThunk.logoutUser());
        };

        const menu = (
                <Menu>
                        <Menu.Item>
                                <h1 className="capitalize">{authState.name}</h1>
                        </Menu.Item>
                        <Menu.Item>
                                <button onClick={onLogout}>Logout</button>
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
                                {authState.isLogin ? (
                                        <>
                                                <Menu.Item key="1">
                                                        <Dropdown overlay={menu} placement="bottomLeft">
                                                                <Badge count={10}>
                                                                        <Avatar src={process.env.REACT_APP_SERVER_URL + authState.avatarUrl} />
                                                                </Badge>
                                                        </Dropdown>
                                                </Menu.Item>
                                        </>
                                ) : (
                                        <>
                                                <Menu.Item key="1">
                                                        <Link to={routers.register.link}>Register</Link>
                                                </Menu.Item>
                                                <Menu.Item key="2">
                                                        <Link to={routers.login.link}>Login</Link>
                                                </Menu.Item>
                                        </>
                                )}
                        </Menu>
                </Header>
        );
};

export default NavbarContainer;
