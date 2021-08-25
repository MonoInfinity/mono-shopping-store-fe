import { Descriptions, Image, Radio, Select, Form, InputNumber } from 'antd';
import { Option } from 'antd/lib/mentions';
import * as React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { routers } from '../../../common/constants/router';
import { convertRoleToString, convertStatusToString } from '../../../common/helper/userHelper';
import { RouteProtectedWrapper } from '../../../common/HOC/routerProtectedWrapper';
import { ApiState } from '../../../common/interface/api.interface';
import { UpdateEmployeeDto } from '../../../common/interface/dto/user.dto';
import { User, UserRole } from '../../../common/interface/user.interface';
import { FormBtn, FormMsg, TextNumber } from '../../../components/form';
import { LocaleKey } from './index';

export interface ViewUserProfilePresentationProps {
        apiState: ApiState;
        control: Control<UpdateEmployeeDto>;
        translate(key: LocaleKey, context?: any): string;
        user: User | undefined;
        errors: UpdateEmployeeDto;
        handleOnSubmit(input?: React.BaseSyntheticEvent<object, any, any> | undefined): Promise<void>;
}

const ViewUserProfilePresentation: React.FC<ViewUserProfilePresentationProps> = ({
        apiState,
        translate,
        control,
        user,
        handleOnSubmit,
        errors,
}) => {
        return (
                <RouteProtectedWrapper isNeedLogin>
                        <div>
                                <button className="font-semibold ">
                                        <Link to={routers.viewAllUser.link}>{translate('goBack')}</Link>
                                </button>

                                <FormMsg
                                        isError={apiState.isError}
                                        isLoading={apiState.isLoading}
                                        errorMessage={apiState.errorMessage}
                                        message={apiState.message}
                                />
                        </div>

                        {user && (
                                <div className="py-4 space-y-2 fade-in">
                                        <div>
                                                <h1 className="text-4xl font-bold">{translate('title')}</h1>
                                        </div>
                                        <div>
                                                <Image
                                                        width={200}
                                                        src={process.env.REACT_APP_STORAGE_SERVER_URL + user.avatarUrl}
                                                        preview={false}
                                                        className="border"
                                                />
                                        </div>
                                        <Form className="" name="basic" layout="vertical" onFinish={handleOnSubmit}>
                                                <Descriptions
                                                        title={`${translate('subtitle')}: ${user.userId}`}
                                                        bordered
                                                >
                                                        <Descriptions.Item
                                                                label={translate('username')}
                                                                className="capitalize"
                                                        >
                                                                {user.username}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item
                                                                label={translate('name')}
                                                                className="capitalize"
                                                        >
                                                                {user.name}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label={translate('phone')}>
                                                                {user.phone}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label={translate('salary')}>
                                                                <TextNumber
                                                                        control={control}
                                                                        error={errors.salary}
                                                                        field="salary"
                                                                        label="Salary"
                                                                        unit="$ "
                                                                />
                                                        </Descriptions.Item>
                                                        <Descriptions.Item
                                                                label={translate('role')}
                                                                className="capitalize"
                                                        >
                                                                <Select
                                                                        defaultValue={convertRoleToString(user.role)}
                                                                        className="w-full"
                                                                        onChange={() => {}}
                                                                >
                                                                        {Object.keys(UserRole)
                                                                                .splice(
                                                                                        Object.keys(UserRole).length / 2
                                                                                )
                                                                                .map((item) => {
                                                                                        return (
                                                                                                <Option
                                                                                                        key={item.toString()}
                                                                                                        value={item.toString()}
                                                                                                        className="capitalize"
                                                                                                >
                                                                                                        {item.toLocaleLowerCase()}
                                                                                                </Option>
                                                                                        );
                                                                                })}
                                                                </Select>
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label={translate('joinDate')}>
                                                                {user.createDate}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item
                                                                label={translate('status')}
                                                                className="capitalize"
                                                        >
                                                                <Radio>
                                                                        {translate(
                                                                                `${convertStatusToString(user.status)}`
                                                                        )}
                                                                </Radio>
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label={translate('address')} span={2}>
                                                                {user.address}
                                                        </Descriptions.Item>
                                                </Descriptions>
                                                <div className="w-64 mt-4">
                                                        <FormBtn
                                                                isLoading={apiState.isLoading}
                                                                label={translate('updateButton')}
                                                        />
                                                </div>
                                        </Form>
                                </div>
                        )}
                </RouteProtectedWrapper>
        );
};

export default ViewUserProfilePresentation;
