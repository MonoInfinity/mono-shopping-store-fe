import { Badge, Button, List, Pagination, Skeleton, Avatar } from 'antd';
import Search from 'antd/lib/input/Search';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { routers } from '../../../common/constants/router';
import { convertRoleToString, convertStatusToString } from '../../../common/helper/userHelper';
import RoleProtected from '../../../common/HOC/roleProtected';
import { ApiState } from '../../../common/interface/api.interface';
import { User, UserRole } from '../../../common/interface/user.interface';
import { LocaleKey } from './index';

export interface ViewAllUserPresentationProps {
        apiState: ApiState;
        users: User[];
        totalUser: number;
        currentPage: number;
        pageSize: number;
        handleOnChangeSize(page: number, pageSize?: number | undefined): void;
        handleOnSearch(value: string): void;
        translate(key: LocaleKey, context?: any): string;
}

const ViewAllUserPresentation: React.FC<ViewAllUserPresentationProps> = ({
        apiState,
        users,
        currentPage,
        pageSize,
        totalUser,
        handleOnChangeSize,
        handleOnSearch,
        translate,
}) => {
        const LoadingSkeleton = (
                <List>
                        {Array.from(Array(pageSize / 2).keys()).map((_, index) => {
                                return (
                                        <List.Item key={index}>
                                                <Skeleton loading={true} active avatar></Skeleton>
                                        </List.Item>
                                );
                        })}
                </List>
        );

        const SearchForm = <Search placeholder={translate('accountName')} onSearch={handleOnSearch} enterButton />;

        const UserInformationRow = (user: User) => (
                <List.Item key={user.userId}>
                        <List.Item.Meta
                                avatar={<Avatar src={process.env.REACT_APP_STORAGE_SERVER_URL + user.avatarUrl} />}
                                title={user.name}
                                description={
                                        <div>
                                                <p>
                                                        {translate('address')}: {user.address}
                                                </p>
                                                <p>
                                                        {translate('phone')}: {user.phone}
                                                </p>
                                                <p>
                                                        {translate('joinDate')}: {user.createDate}
                                                </p>
                                        </div>
                                }
                        />

                        <div className="flex flex-col justify-between space-y-2 capitalize">
                                {user.status ? (
                                        <Badge status="processing" text={translate(convertStatusToString(user.status))} />
                                ) : (
                                        <Badge status="error" text={translate(convertStatusToString(user.status))} />
                                )}
                                <div>
                                        {translate('role')}: {convertRoleToString(user.role)}
                                </div>
                                <Button type="ghost">
                                        <Link to={routers.viewUserProfile.link + '/' + user.userId}>{translate('viewMore')}</Link>
                                </Button>
                        </div>
                </List.Item>
        );

        const PageFooter = (
                <>
                        <List className="fade-in">{users.map((item) => UserInformationRow(item))}</List>
                        <Pagination defaultCurrent={currentPage + 1} total={totalUser} onChange={handleOnChangeSize} />
                </>
        );

        return (
                <RoleProtected acceptRole={[UserRole.MANAGER, UserRole.OWNER]} isRedirect>
                        <div className="space-y-2">
                                <h1 className="text-2xl font-semibold">{translate('title')}</h1>
                                {SearchForm}
                                {apiState.isLoading && LoadingSkeleton}
                                {!Boolean(users.length) && !apiState.isLoading && <h1 className="text-xl font-semibold">{translate('listEmpty')}</h1>}
                                {Boolean(users.length) && !apiState.isLoading && PageFooter}
                        </div>
                </RoleProtected>
        );
};

export default ViewAllUserPresentation;
