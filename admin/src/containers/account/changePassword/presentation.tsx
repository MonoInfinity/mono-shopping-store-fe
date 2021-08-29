import Form from 'antd/lib/form/Form';
import * as React from 'react';
import { Control } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { routers } from '../../../common/constants/router';
import { RouteProtectedWrapper } from '../../../common/HOC/routerProtectedWrapper';
import { ApiState } from '../../../common/interface/api.interface';
import { ChangePasswordDto } from '../../../common/interface/dto/user.dto';
import { LocaleKey } from '../../../common/interface/locale.interface';
import { FormBtn, FormMsg, TextFieldPassword } from '../../../components/form';

export interface ChangePasswordPresentationProps {
        apiState: ApiState;
        errors: ChangePasswordDto;
        handleOnSubmit(input?: React.BaseSyntheticEvent<object, any, any> | undefined): Promise<void>;
        control: Control<ChangePasswordDto>;
        translate(key: LocaleKey, context?: any): string;
}

const ChangePasswordPresentation: React.FC<ChangePasswordPresentationProps> = ({
        apiState,
        control,
        errors,
        handleOnSubmit,
        translate,
}) => {
        const FormHeader = (
                <>
                        <h1 className="text-4xl font-semibold text-center">{translate('title-changePassword')}</h1>{' '}
                        <FormMsg
                                isError={apiState.isError}
                                errorMessage={apiState.errorMessage}
                                isLoading={apiState.isLoading}
                                message={apiState.message}
                        />
                </>
        );

        const FormBody = (
                <Form className="" name="basic" layout="vertical" onFinish={handleOnSubmit}>
                        <TextFieldPassword
                                control={control}
                                error={errors.password}
                                field="password"
                                label={translate('field-password')}
                        />
                        <TextFieldPassword
                                control={control}
                                error={errors.newPassword}
                                field="newPassword"
                                label={translate('field-newPassword')}
                        />
                        <TextFieldPassword
                                control={control}
                                error={errors.confirmPassword}
                                field="confirmPassword"
                                label={translate('field-confirmPassword')}
                        />
                        <FormBtn isLoading={apiState.isLoading} label={translate('button-changePassword')} />
                </Form>
        );

        return (
                <RouteProtectedWrapper isNeedLogin>
                        <div className="space-y-4">
                                <button className="font-semibold ">
                                        <Link to={routers.viewMyProfile.link}>{translate('link-goBack')}</Link>
                                </button>

                                <div className="">
                                        <div className="px-2 py-4 space-y-8 border w-96 fade-in">
                                                {FormHeader}
                                                {FormBody}
                                        </div>
                                </div>
                        </div>
                </RouteProtectedWrapper>
        );
};

export default ChangePasswordPresentation;
