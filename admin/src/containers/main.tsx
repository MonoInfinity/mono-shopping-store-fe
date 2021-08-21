import * as React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons";
import { RouteProtectedWrapper } from "../common/HOC/routerProtectedWrapper";
import { Link, Route, Switch } from "react-router-dom";
import ViewMyProfile from "./viewMyProfile";
import routers from "../common/constants/router";
import ChangePassword from "./changePassword";
import ViewAllUser from "./viewAllUser";
import UpdateUserProfile from "./updateUserProfile";
import ViewUserProfile from "./viewUserProfile";
import RoleProtected from "../common/HOC/roleProtected";
import { UserRole } from "../common/interface/user.interface";
const { SubMenu } = Menu;

const { Sider } = Layout;

export interface MainContainerProps {}

const MainContainer: React.FunctionComponent<MainContainerProps> = () => {
        return (
                <RouteProtectedWrapper isNeedLogin>
                        <Layout className="fade-in">
                                <Sider width={200}>
                                        <Menu
                                                mode="inline"
                                                defaultSelectedKeys={["1"]}
                                                defaultOpenKeys={["sub1"]}
                                                theme="dark"
                                                style={{ height: "100%", borderRight: 0 }}
                                        >
                                                <SubMenu key="sub1" icon={<UserOutlined />} title="Account">
                                                        <Menu.Item key="1">
                                                                <Link to={routers.viewProfile.link}>View My Profile</Link>
                                                        </Menu.Item>
                                                        <RoleProtected acceptRole={[UserRole.MANAGER, UserRole.OWNER]}>
                                                                <Menu.Item key="2">
                                                                        <Link to={routers.viewAllUser.link}>View All User</Link>
                                                                </Menu.Item>
                                                        </RoleProtected>
                                                </SubMenu>
                                                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Order">
                                                        <Menu.Item key="5">option5</Menu.Item>
                                                        <Menu.Item key="6">option6</Menu.Item>
                                                        <Menu.Item key="7">option7</Menu.Item>
                                                        <Menu.Item key="8">option8</Menu.Item>
                                                </SubMenu>
                                                <SubMenu key="sub3" icon={<NotificationOutlined />} title="Notification">
                                                        <Menu.Item key="9">option9</Menu.Item>
                                                        <Menu.Item key="10">option10</Menu.Item>
                                                        <Menu.Item key="11">option11</Menu.Item>
                                                        <Menu.Item key="12">option12</Menu.Item>
                                                </SubMenu>
                                        </Menu>
                                </Sider>
                                <Layout className="p-6 bg-white">
                                        <Switch>
                                                <Route path={routers.viewProfile.link} component={ViewMyProfile} />
                                                <Route path={routers.changePassword.link} component={ChangePassword} />
                                                <Route path={routers.viewAllUser.link} component={ViewAllUser} />
                                                <Route path={routers.updateUserProfile.link} component={UpdateUserProfile} />
                                                <Route path={routers.viewUserProfile.link + "/:id"} component={ViewUserProfile} />
                                        </Switch>
                                </Layout>
                        </Layout>
                </RouteProtectedWrapper>
        );
};

export default MainContainer;
