import * as React from 'react';
import { Form, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { Control } from 'react-hook-form';

import { UserLoginDto } from '../../../common/interface/dto/auth.dto';
import { ApiState } from '../../../common/interface/api.interface';
import { RouteProtectedWrapper } from '../../../common/HOC/routerProtectedWrapper';
import { routers } from '../../../common/constants/router';
import { FormBtn, FormMsg, TextField, TextFieldPassword } from '../../../components/form';
import { LocaleKey } from '../../../common/interface/locale.interface';

export interface LoginContainerProps {
        apiState: ApiState;
        errors: UserLoginDto;
        control: Control<UserLoginDto>;
        handleOnSubmit(input?: React.BaseSyntheticEvent<object, any, any> | undefined): Promise<void>;
        translate(key: LocaleKey, context?: {}): string;
}

const LoginForm: React.FunctionComponent<LoginContainerProps> = ({
        apiState,
        errors,
        handleOnSubmit,
        control,
        translate,
}) => {
        const FormHeader = (
                <>
                        <h1 className="text-4xl font-semibold text-center">{translate('title-login')}</h1>
                </>
        );

        const FormBody = (
                <Form className="" name="basic" layout="vertical" onFinish={handleOnSubmit}>
                        <FormMsg
                                isError={apiState.isError}
                                errorMessage={apiState.errorMessage}
                                isLoading={apiState.isLoading}
                                message={apiState.message}
                        />
                        <TextField
                                control={control}
                                error={errors.username}
                                field="username"
                                label={translate('field-username')}
                        />
                        <TextFieldPassword
                                control={control}
                                error={errors.password}
                                field="password"
                                label={translate('field-password')}
                        />
                        <Form.Item>
                                <div className="flex items-center justify-between">
                                        <Checkbox>{translate('extra-remember')}</Checkbox>
                                        <div className="flex-1 text-right">
                                                <Link to="/" className="">
                                                        {translate('extra-forgotPassword')}
                                                </Link>
                                        </div>
                                </div>
                        </Form.Item>
                        <FormBtn isLoading={apiState.isLoading} label={translate('button-login')} />
                </Form>
        );

        const FormFooter = (
                <>
                        <div className="flex items-center space-x-4">
                                <div className="flex-1 bg-gray-300 h-0.5"></div>
                                <p className="text-center">{translate('extra-or')}</p>
                                <div className="flex-1 bg-gray-300 h-0.5"></div>
                        </div>
                        <Button type="default" htmlType="button" className="w-full">
                                <Link to={routers.register.link}>{translate('link-registerInstead')}</Link>
                        </Button>
                </>
        );

        return (
                <RouteProtectedWrapper>
                        <div className="flex items-center justify-center flex-1 bg-gradient-to-r from-red-violet-500 via-red-500 to-blue-gem-500 ">
                                <div className="w-full px-2 py-8 mx-1 space-y-8 bg-white rounded-sm shadow-xl md:px-4 md:w-96 bg-opacity-90 fade-in">
                                        {FormHeader}
                                        {FormBody}
                                        {FormFooter}
                                </div>
                        </div>
                </RouteProtectedWrapper>
        );
};

export default LoginForm;
