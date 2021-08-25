import * as React from 'react';
import { Control } from 'react-hook-form';
import { Form, Button } from 'antd';
import { Link } from 'react-router-dom';

import { RouteProtectedWrapper } from '../../../common/HOC/routerProtectedWrapper';
import { UserRegisterDto } from '../../../common/interface/dto/auth.dto';
import { ApiState } from '../../../common/interface/api.interface';
import { LocaleKey } from '.';
import { routers } from '../../../common/constants/router';

import { FormBtn, FormMsg, TextField, TextFieldPassword } from '../../../components/form';

export interface RegisterFormProps {
        apiState: ApiState;
        errors: UserRegisterDto;
        handleOnSubmit(input?: React.BaseSyntheticEvent<object, any, any> | undefined): Promise<void>;
        control: Control<UserRegisterDto>;
        translate(key: LocaleKey, context?: any): string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ apiState, control, errors, handleOnSubmit, translate }) => {
        const FormHeader = <h1 className="text-4xl font-semibold text-center">{translate('title')}</h1>;

        const FormBody = (
                <Form className="" name="basic" layout="vertical" onFinish={handleOnSubmit}>
                        <FormMsg
                                isError={apiState.isError}
                                errorMessage={apiState.errorMessage}
                                isLoading={apiState.isLoading}
                                message={apiState.message}
                        />
                        <div>
                                <div className="justify-between md:space-x-4 md:flex">
                                        <TextField control={control} error={errors.username} field="username" label={translate('username')} />
                                        <TextField control={control} error={errors.name} field="name" label={translate('name')} />
                                </div>
                                <div className="justify-between md:space-x-4 md:flex">
                                        <TextFieldPassword control={control} error={errors.password} field="password" label={translate('password')} />
                                        <TextFieldPassword
                                                control={control}
                                                error={errors.confirmPassword}
                                                field="confirmPassword"
                                                label={translate('confirmPassword')}
                                        />
                                </div>
                                <div className="justify-between md:space-x-4 md:flex">
                                        <TextField control={control} error={errors.email} field="email" label="Email" />
                                        <TextField control={control} error={errors.phone} field="phone" label={translate('phone')} />
                                </div>
                                <div className="justify-between md:space-x-4 md:flex">
                                        <TextField control={control} error={errors.address} field="address" label={translate('address')} />
                                        <div className="w-full"></div>
                                </div>
                        </div>
                        <FormBtn label={translate('button')} isLoading={apiState.isLoading} />
                </Form>
        );

        const FormFooter = (
                <>
                        <div className="flex items-center space-x-4">
                                <div className="flex-1 bg-gray-300 h-0.5"></div>
                                <p className="text-center">{translate('or')}</p>
                                <div className="flex-1 bg-gray-300 h-0.5"></div>
                        </div>
                        <Button type="default" htmlType="button" className="w-full">
                                <Link to={routers.login.link}>{translate('loginInstead')}</Link>
                        </Button>
                </>
        );

        return (
                <RouteProtectedWrapper>
                        <div className="flex items-center justify-center flex-1 bg-gradient-to-r from-red-violet-500 via-red-500 to-blue-gem-500 ">
                                <div className="w-full px-2 py-8 mx-1 space-y-8 bg-white rounded-sm shadow-xl md:px-4 md:w-125 bg-opacity-90 fade-in">
                                        {FormHeader}
                                        {FormBody}
                                        {FormFooter}
                                </div>
                        </div>
                </RouteProtectedWrapper>
        );
};

export default RegisterForm;
