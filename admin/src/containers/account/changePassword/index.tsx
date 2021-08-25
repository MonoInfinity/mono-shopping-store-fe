import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import userAPI from '../../../api/userApi';
import useFormError from '../../../common/hooks/useFormError';
import { useTranslate } from '../../../common/hooks/useTranslate';
import { ApiState } from '../../../common/interface/api.interface';
import { ChangePasswordDto } from '../../../common/interface/dto/user.dto';
import { RootState } from '../../../store';

import locales from './locales.json';
import ChangePasswordPresentation from './presentation';
export type LocaleKey = keyof typeof locales.en;

const defaultValues: ChangePasswordDto = {
        confirmPassword: '',
        password: '',
        newPassword: '',
};

const ChangePasswordContainer: React.FC = () => {
        const { handleSubmit, control, reset } = useForm<ChangePasswordDto>({ defaultValues });
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const errors = useFormError<ChangePasswordDto>(defaultValues);
        const translate = useTranslate<LocaleKey>({ dictionary: locales, name: 'changePasswordForm' });

        const onSubmit = (data: ChangePasswordDto) => {
                userAPI.updatePassword(data).then(() => {
                        reset();
                });
        };

        return (
                <ChangePasswordPresentation
                        apiState={apiState}
                        control={control}
                        errors={errors}
                        handleOnSubmit={handleSubmit(onSubmit)}
                        translate={translate}
                />
        );
};

export default ChangePasswordContainer;
