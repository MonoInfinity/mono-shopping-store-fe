import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import useFormError from '../../../common/hooks/useFormError';
import { useTranslate } from '../../../common/hooks/useTranslate';
import { ApiState } from '../../../common/interface/api.interface';
import { UserRegisterDto } from '../../../common/interface/dto/auth.dto';
import { RootState, store } from '../../../store';
import authThunk from '../../../store/auth/thunk';

import RegisterForm from './presentation';

const defaultValues: UserRegisterDto = {
        name: '',
        password: '',
        username: '',
        confirmPassword: '',
        address: '',
        email: '',
        phone: '',
};

const RegisterContainer: React.FC = () => {
        const { handleSubmit, control } = useForm<UserRegisterDto>({ defaultValues });
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const errors = useFormError<UserRegisterDto>(defaultValues);
        const translate = useTranslate();

        const onSubmit = (data: UserRegisterDto) => {
                store.dispatch(authThunk.registerUser(data));
        };

        return (
                <RegisterForm
                        apiState={apiState}
                        control={control}
                        errors={errors}
                        handleOnSubmit={handleSubmit(onSubmit)}
                        translate={translate}
                />
        );
};

export default RegisterContainer;
