import * as React from 'react';
import { Control } from 'react-hook-form';
import { Form, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import { RouteProtectedWrapper } from '../../../common/HOC/routerProtectedWrapper';
import { UserRegisterDto } from '../../../common/interface/dto/auth.dto';
import { ApiState } from '../../../common/interface/api.interface';

import { routers } from '../../../common/constants/router';

import { FormBtn, FormMsg, TextField, TextFieldPassword } from '../../../components/form';
import { LocaleKey } from '../../../common/interface/locale.interface';

export interface RegisterFormProps {
        apiState: ApiState;
        errors: UserRegisterDto;
        handleOnSubmit(input?: React.BaseSyntheticEvent<object, any, any> | undefined): Promise<void>;
        control: Control<UserRegisterDto>;
        translate(key: LocaleKey, context?: {}): string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ apiState, control, errors, handleOnSubmit, translate }) => {
        const FormHeader = <h1 className="text-4xl font-semibold text-center">{translate('title-register')}</h1>;

        const FormBody = (
                <Form className="" name="basic" layout="vertical" onFinish={handleOnSubmit}>
                        <FormMsg
                                isError={apiState.isError}
                                errorMessage={apiState.errorMessage}
                                isLoading={apiState.isLoading}
                                message={apiState.message}
                        />

                        <Row>
                                <Col span={11}>
                                        <TextField
                                                control={control}
                                                error={errors.username}
                                                field="username"
                                                label={translate('field-username')}
                                        />
                                </Col>
                                <Col span={11} offset={2}>
                                        <TextField
                                                control={control}
                                                error={errors.name}
                                                field="name"
                                                label={translate('field-name')}
                                        />
                                </Col>
                        </Row>
                        <Row>
                                <Col span={11}>
                                        <TextFieldPassword
                                                control={control}
                                                error={errors.password}
                                                field="password"
                                                label={translate('field-password')}
                                        />
                                </Col>
                                <Col span={11} offset={2}>
                                        <TextFieldPassword
                                                control={control}
                                                error={errors.confirmPassword}
                                                field="confirmPassword"
                                                label={translate('field-confirmPassword')}
                                        />
                                </Col>
                        </Row>
                        <Row>
                                <Col span={11}>
                                        <TextField control={control} error={errors.email} field="email" label="Email" />
                                </Col>
                                <Col span={11} offset={2}>
                                        <TextField
                                                control={control}
                                                error={errors.phone}
                                                field="phone"
                                                label={translate('field-phone')}
                                        />
                                </Col>
                        </Row>
                        <Row>
                                <Col span={24}>
                                        <TextField
                                                control={control}
                                                error={errors.address}
                                                field="address"
                                                label={translate('field-address')}
                                        />
                                </Col>
                        </Row>

                        <FormBtn label={translate('button-register')} isLoading={apiState.isLoading} />
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
                                <Link to={routers.login.link}>{translate('link-loginInstead')}</Link>
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
