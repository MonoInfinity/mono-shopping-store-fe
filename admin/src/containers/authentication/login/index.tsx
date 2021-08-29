import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import useFormError from '../../../common/hooks/useFormError';
import { useTranslate } from '../../../common/hooks/useTranslate';
import { ApiState } from '../../../common/interface/api.interface';
import { UserLoginDto } from '../../../common/interface/dto/auth.dto';
import { RootState, store } from '../../../store';
import authThunk from '../../../store/auth/thunk';

import LoginForm from './presentation';

const defaultValues: UserLoginDto = {
        password: '',
        username: '',
};

const LoginContainer: React.FC = () => {
        const { handleSubmit, control } = useForm<UserLoginDto>({ defaultValues });
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const errors = useFormError<UserLoginDto>(defaultValues);
        const translate = useTranslate();

        const onSubmit = (data: UserLoginDto) => {
                store.dispatch(authThunk.loginUser(data));
        };

        return (
                <LoginForm
                        apiState={apiState}
                        control={control}
                        errors={errors}
                        handleOnSubmit={handleSubmit(onSubmit)}
                        translate={translate}
                />
        );
};

export default LoginContainer;
