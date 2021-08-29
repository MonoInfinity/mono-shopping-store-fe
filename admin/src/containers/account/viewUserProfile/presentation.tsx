import { Descriptions, Image, Radio, Form } from 'antd';
import * as React from 'react';
import { Control } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { routers } from '../../../common/constants/router';

import { RouteProtectedWrapper } from '../../../common/HOC/routerProtectedWrapper';
import { ApiState } from '../../../common/interface/api.interface';
import { UpdateEmployeeDto } from '../../../common/interface/dto/admin.dto';

import { LocaleKey } from '../../../common/interface/locale.interface';
import { User, UserRole } from '../../../common/interface/user.interface';
import { FormBtn, FormMsg, TextNumber } from '../../../components/form';
import FormSelect, { OptionItem } from '../../../components/form/formSelect';
import FormRadioStatus from '../../../components/form/formRadioStatus';
import RoleProtected from '../../../common/HOC/roleProtected';
import { convertRoleToString } from '../../../common/helper/userHelper';

export interface ViewUserProfilePresentationProps {
        apiState: ApiState;
        control: Control<UpdateEmployeeDto>;
        translate(key: LocaleKey, context?: any): string;
        user: User | undefined;
        errors: UpdateEmployeeDto;
        handleOnSubmit(input?: React.BaseSyntheticEvent<object, any, any> | undefined): Promise<void>;
        roleOptions: OptionItem[];
}

const ViewUserProfilePresentation: React.FC<ViewUserProfilePresentationProps> = ({
        apiState,
        translate,
        control,
        user,
        handleOnSubmit,
        errors,
        roleOptions,
}) => {
        return (
                <>
                        <RoleProtected acceptRole={[UserRole.MANAGER, UserRole.OWNER]}>
                                <div>
                                        <button className="font-semibold ">
                                                <Link to={routers.viewAllUser.link}>{translate('link-goBack')}</Link>
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
                                                        <h1 className="text-4xl font-bold">
                                                                {translate('title-updateUserInformation')}
                                                        </h1>
                                                </div>
                                                <div>
                                                        <Image
                                                                width={200}
                                                                src={
                                                                        process.env.REACT_APP_STORAGE_SERVER_URL +
                                                                        user.avatarUrl
                                                                }
                                                                preview={false}
                                                                className="border"
                                                        />
                                                </div>
                                                <Form
                                                        className=""
                                                        name="basic"
                                                        layout="vertical"
                                                        onFinish={handleOnSubmit}
                                                >
                                                        <Descriptions
                                                                title={`${translate('title-userInformation')}: ${
                                                                        user.userId
                                                                }`}
                                                                bordered
                                                        >
                                                                <Descriptions.Item
                                                                        label={translate('field-username')}
                                                                        className="capitalize"
                                                                >
                                                                        {user.username}
                                                                </Descriptions.Item>
                                                                <Descriptions.Item
                                                                        label={translate('field-name')}
                                                                        className="capitalize"
                                                                >
                                                                        {user.name}
                                                                </Descriptions.Item>
                                                                <Descriptions.Item label={translate('field-phone')}>
                                                                        {user.phone}
                                                                </Descriptions.Item>
                                                                <Descriptions.Item label={translate('field-salary')}>
                                                                        <TextNumber
                                                                                control={control}
                                                                                error={String(errors.salary)}
                                                                                field="salary"
                                                                                label=""
                                                                                unit="$ "
                                                                                className="my-auto"
                                                                        />
                                                                </Descriptions.Item>
                                                                <Descriptions.Item
                                                                        label={translate('field-role')}
                                                                        className="capitalize"
                                                                >
                                                                        <FormSelect
                                                                                control={control}
                                                                                field="role"
                                                                                className="my-auto"
                                                                                optionItem={roleOptions}
                                                                        />
                                                                </Descriptions.Item>
                                                                <Descriptions.Item label={translate('field-joinDate')}>
                                                                        {user.createDate}
                                                                </Descriptions.Item>
                                                                <Descriptions.Item
                                                                        label={translate('field-status')}
                                                                        className="capitalize"
                                                                >
                                                                        <FormRadioStatus
                                                                                control={control}
                                                                                field="status"
                                                                        />
                                                                </Descriptions.Item>
                                                                <Descriptions.Item
                                                                        label={translate('field-address')}
                                                                        span={2}
                                                                >
                                                                        {user.address}
                                                                </Descriptions.Item>
                                                        </Descriptions>
                                                        <div className="w-64 mt-4">
                                                                <FormBtn
                                                                        isLoading={apiState.isLoading}
                                                                        label={translate('button-update')}
                                                                />
                                                        </div>
                                                </Form>
                                        </div>
                                )}
                        </RoleProtected>
                </>
        );
};

export default ViewUserProfilePresentation;
