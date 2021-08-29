import * as React from 'react';
import { Layout, Menu, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { Link, Route, Switch } from 'react-router-dom';

import { RouteProtectedWrapper } from '../../common/HOC/routerProtectedWrapper';
import RoleProtected from '../../common/HOC/roleProtected';
import { routers } from '../../common/constants/router';

import { UserRole } from '../../common/interface/user.interface';
import { LocaleKey } from '../../common/interface/locale.interface';
import AddNewProductContainer from '../product/addNewProduct';

const ViewMyProfileContainer = React.lazy(() => import('../account/viewMyProfile'));
const ChangePasswordContainer = React.lazy(() => import('../account/changePassword'));
const ViewAllUserContainer = React.lazy(() => import('../account/viewAllUser'));
const UpdateUserProfileContainer = React.lazy(() => import('../account/updateUserProfile'));
const ViewUserProfileContainer = React.lazy(() => import('../account/viewUserProfile'));

const { SubMenu } = Menu;
const { Sider } = Layout;

export interface MainDashboardPresentationProps {
        translate(key: LocaleKey, context?: {}): string;
}

const MainDashboardPresentation: React.FC<MainDashboardPresentationProps> = ({ translate }) => {
        const SideMenu = (
                <Sider width={200}>
                        <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                theme="dark"
                                style={{ height: '100%', borderRight: 0 }}
                        >
                                <SubMenu key="sub1" icon={<UserOutlined />} title={translate('title-account')}>
                                        <Menu.Item key="1">
                                                <Link to={routers.viewMyProfile.link}>
                                                        {translate('link-viewMyProfile')}
                                                </Link>
                                        </Menu.Item>
                                        <Menu.Item key="2">
                                                <RoleProtected acceptRole={[UserRole.MANAGER, UserRole.OWNER]}>
                                                        <Link to={routers.viewAllUser.link}>
                                                                {translate('link-viewAllUser')}
                                                        </Link>
                                                </RoleProtected>
                                        </Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<UserOutlined />} title={translate('title-product')}>
                                        <Menu.Item key="3">
                                                <Link to={routers.addNewProduct.link}>
                                                        {translate('link-addNewProduct')}
                                                </Link>
                                        </Menu.Item>
                                </SubMenu>
                        </Menu>
                </Sider>
        );

        const DashboardScreen = (
                <Layout className="p-6 bg-white">
                        <React.Suspense fallback={<Spin size="large" />}>
                                <Switch>
                                        <Route path={routers.viewMyProfile.link} component={ViewMyProfileContainer} />
                                        <Route path={routers.changePassword.link} component={ChangePasswordContainer} />
                                        <Route path={routers.viewAllUser.link} component={ViewAllUserContainer} />
                                        <Route
                                                path={routers.updateUserProfile.link}
                                                component={UpdateUserProfileContainer}
                                        />
                                        <Route path={routers.addNewProduct.link} component={AddNewProductContainer} />
                                        <Route
                                                path={routers.viewUserProfile.link + '/:id'}
                                                component={ViewUserProfileContainer}
                                        />
                                </Switch>
                        </React.Suspense>
                </Layout>
        );

        return (
                <RouteProtectedWrapper isNeedLogin>
                        <Layout className="fade-in">
                                {SideMenu}
                                {DashboardScreen}
                        </Layout>
                </RouteProtectedWrapper>
        );
};

export default MainDashboardPresentation;
