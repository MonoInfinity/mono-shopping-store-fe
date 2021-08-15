import * as React from "react";
import { Layout, Menu } from "antd";

import LogoIcon from "../components/icons/logo";
import LogoSmIcon from "../components/icons/logo-sm";
import { Link } from "react-router-dom";
const { Header } = Layout;

export interface NavbarContainerProps {}

const NavbarContainer: React.FunctionComponent<NavbarContainerProps> = () => {
        return (
                <Header className=" flex  bg-white z-30 shadow-sm justify-between px-4">
                        <Link to="/" className="block">
                                <div className="hidden md:block">
                                        <LogoIcon />
                                </div>
                                <div className=" md:hidden h-full  p-2 grid place-items-center">
                                        <LogoSmIcon />
                                </div>
                        </Link>
                        <Menu theme="light" mode="horizontal" className="flex-1 flex justify-end font-semibold">
                                <Menu.Item key="1">
                                        <Link to="/register">Register</Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                        <Link to="/login">Login</Link>
                                </Menu.Item>
                        </Menu>
                </Header>
        );
};

export default NavbarContainer;
