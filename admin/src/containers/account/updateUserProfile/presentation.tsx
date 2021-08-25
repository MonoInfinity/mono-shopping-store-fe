import { Image, Form } from 'antd';

import * as React from 'react';
import { Control } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { routers } from '../../../common/constants/router';
import { RouteProtectedWrapper } from '../../../common/HOC/routerProtectedWrapper';
import { ApiState } from '../../../common/interface/api.interface';
import { UpdateUserDto } from '../../../common/interface/dto/user.dto';
import { AuthState } from '../../../common/interface/user.interface';
import { FormBtn, FormMsg, TextField } from '../../../components/form';
import { LocaleKey } from './index';

export interface UpdateUserProfilePresentationProps {
        apiState: ApiState;
        authState: AuthState;
        errors: UpdateUserDto;
        handleOnSubmit(input?: React.BaseSyntheticEvent<object, any, any> | undefined): Promise<void>;
        control: Control<UpdateUserDto>;
        handOnChangeFile(file: React.ChangeEvent<HTMLInputElement>): void;
        translate(key: LocaleKey, context?: any): string;
        file: File | undefined;
}

const UpdateUserProfilePresentation: React.FC<UpdateUserProfilePresentationProps> = ({
        apiState,
        control,
        errors,
        handleOnSubmit,
        translate,
        authState,
        file,
}) => {
        const FormBody = (
                <Form className="" name="basic" layout="vertical" onFinish={handleOnSubmit}>
                        <Image
                                width={200}
                                preview={false}
                                src={file ? URL.createObjectURL(file) : process.env.REACT_APP_STORAGE_SERVER_URL + authState.avatarUrl}
                                className="border"
                        ></Image>

                        <input type="file" onChange={handleOnSubmit} name="avatar" />
                        <FormMsg
                                isError={apiState.isError}
                                errorMessage={apiState.errorMessage}
                                message={apiState.message}
                                isLoading={apiState.isLoading}
                        />
                        <TextField control={control} error={errors.name} field="name" label={translate('name')} />
                        <TextField control={control} error={errors.email} field="email" label={translate('email')} />
                        <TextField control={control} error={errors.address} field="address" label={translate('address')} />
                        <TextField control={control} error={errors.phone} field="phone" label={translate('phone')} />
                        <FormBtn isLoading={apiState.isLoading} label={translate('updateMyInformationButton')} />
                </Form>
        );

        return (
                <RouteProtectedWrapper isNeedLogin>
                        <div className="space-y-4">
                                <button className="font-semibold ">
                                        <Link to={routers.viewMyProfile.link}>{translate('goBack')}</Link>
                                </button>

                                <div className="">
                                        <div className="px-2 py-4 space-y-8 border w-96 fade-in">
                                                <h1 className="text-4xl font-semibold text-center">{translate('title')}</h1>
                                                {FormBody}
                                        </div>
                                </div>
                        </div>
                </RouteProtectedWrapper>
        );
};

export default UpdateUserProfilePresentation;
