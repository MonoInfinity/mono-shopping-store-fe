import { Badge, Button, List, Pagination, Skeleton, Avatar, Form, Row, Col } from 'antd';

import * as React from 'react';
import { Control } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { SearchUserDto } from '.';
import { routers } from '../../../common/constants/router';
import { convertRoleToString, convertStatusToString } from '../../../common/helper/userHelper';
import RoleProtected from '../../../common/HOC/roleProtected';
import { ApiState } from '../../../common/interface/api.interface';
import { LocaleKey } from '../../../common/interface/locale.interface';
import { User, UserRole } from '../../../common/interface/user.interface';
import { FormBtn, TextField } from '../../../components/form';
import FormSelect, { OptionItem } from '../../../components/form/formSelect';

export interface ViewAllUserPresentationProps {
        apiState: ApiState;
        users: User[];
        totalUser: number;
        currentPage: number;
        pageSize: number;
        handleOnChangeSize(page: number, pageSize?: number | undefined): void;
        handleOnSearch(input?: React.BaseSyntheticEvent<object, any, any> | undefined): Promise<void>;
        translate(key: LocaleKey, context?: any): string;
        control: Control<SearchUserDto>;
        roleOptions: OptionItem[];
}

const ViewAllUserPresentation: React.FC<ViewAllUserPresentationProps> = ({
        apiState,
        users,
        currentPage,
        pageSize,
        totalUser,
        handleOnChangeSize,
        translate,
        control,
        handleOnSearch,
        roleOptions,
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

        const SearchForm = (
                <>
                        <Form onFinish={handleOnSearch} layout="vertical">
                                <Row>
                                        <Col span="11">
                                                <TextField control={control} error="" field="name" label="Name" />
                                        </Col>
                                        <Col span="11" offset="2">
                                                <Form.Item className="flex-1 " label="Role">
                                                        <FormSelect
                                                                control={control}
                                                                field="role"
                                                                optionItem={roleOptions}
                                                        />
                                                </Form.Item>
                                        </Col>
                                </Row>
                                <Row>
                                        <Form.Item className="w-32">
                                                <FormBtn isLoading={apiState.isLoading} label="Search" />
                                        </Form.Item>
                                </Row>
                        </Form>
                </>
        );

        const UserInformationRow = (user: User) => (
                <List.Item key={user.userId}>
                        <List.Item.Meta
                                avatar={<Avatar src={process.env.REACT_APP_STORAGE_SERVER_URL + user.avatarUrl} />}
                                title={user.name}
                                description={
                                        <div>
                                                <p>
                                                        {translate('field-address')}: {user.address}
                                                </p>
                                                <p>
                                                        {translate('field-phone')}: {user.phone}
                                                </p>
                                                <p>
                                                        {translate('field-joinDate')}: {user.createDate}
                                                </p>
                                        </div>
                                }
                        />

                        <div className="flex flex-col justify-between space-y-2 capitalize">
                                {user.status ? (
                                        <Badge
                                                status="processing"
                                                text={translate(convertStatusToString(user.status))}
                                        />
                                ) : (
                                        <Badge status="error" text={translate(convertStatusToString(user.status))} />
                                )}
                                <div>
                                        {translate('field-role')}: {translate(convertRoleToString(user.role))}
                                </div>
                                <Button type="ghost" className="w-32">
                                        <Link to={routers.viewUserProfile.link + '/' + user.userId}>
                                                {translate('link-viewMore')}
                                        </Link>
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
                                <h1 className="text-2xl font-semibold">{translate('title-managerAccount')}</h1>
                                {SearchForm}
                                {apiState.isLoading && LoadingSkeleton}
                                {!Boolean(users.length) && !apiState.isLoading && (
                                        <h1 className="text-xl font-semibold">{translate('extra-listEmpty')}</h1>
                                )}
                                {Boolean(users.length) && !apiState.isLoading && PageFooter}
                        </div>
                </RoleProtected>
        );
};

export default ViewAllUserPresentation;
