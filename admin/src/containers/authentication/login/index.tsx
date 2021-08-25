import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import useFormError from '../../../common/hooks/useFormError';
import { useTranslate } from '../../../common/hooks/useTranslate';
import { ApiState } from '../../../common/interface/api.interface';
import { UserLoginDto } from '../../../common/interface/dto/auth.dto';
import { RootState, store } from '../../../store';
import authThunk from '../../../store/auth/thunk';
import locales from './locales.json';
import LoginForm from './presentation';

export type LocaleKey = keyof typeof locales.en;

const defaultValues: UserLoginDto = {
        password: '',
        username: '',
};

const LoginContainer: React.FC = () => {
        const { handleSubmit, control } = useForm<UserLoginDto>({ defaultValues });
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const errors = useFormError<UserLoginDto>(defaultValues);
        const translate = useTranslate<LocaleKey>({ dictionary: locales, name: 'loginForm' });

        const onSubmit = (data: UserLoginDto) => {
                store.dispatch(authThunk.loginUser(data));
        };

        return <LoginForm apiState={apiState} control={control} errors={errors} handleOnSubmit={handleSubmit(onSubmit)} translate={translate} />;
};

export default LoginContainer;
