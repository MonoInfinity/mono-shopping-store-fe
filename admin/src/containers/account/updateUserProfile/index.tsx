import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import userAPI from '../../../api/userApi';
import useFormError from '../../../common/hooks/useFormError';
import { useTranslate } from '../../../common/hooks/useTranslate';
import { useUploadFile } from '../../../common/hooks/useUploadFile';
import { ApiState } from '../../../common/interface/api.interface';
import { UpdateUserDto } from '../../../common/interface/dto/user.dto';
import { AuthState } from '../../../common/interface/user.interface';
import { RootState } from '../../../store';

import UpdateUserProfilePresentation from './presentation';
export interface UpdateUserProfileContainerProps {}

const defaultValues: UpdateUserDto = {
        address: '',
        email: '',
        name: '',
        phone: '',
        avatarUrl: '',
};

const UpdateUserProfileContainer: React.FC<UpdateUserProfileContainerProps> = () => {
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const authState = useSelector<RootState, AuthState>((state) => state.auth);
        const { handleSubmit, control, setValue } = useForm<UpdateUserDto>({ defaultValues });
        const [file, handleOnChangeFile] = useUploadFile();
        const errors = useFormError<UpdateUserDto>(defaultValues);
        const translate = useTranslate();

        const onSubmit = (data: UpdateUserDto) => {
                if (file) {
                        userAPI.uploadFile(file).then((res) => {
                                const avatarUrl = res.data.data;
                                userAPI.updateUser({ ...data, avatarUrl });
                        });
                }
        };

        React.useEffect(() => {
                setValue('address', authState.address);
                setValue('email', authState.email);
                setValue('name', authState.name);
                setValue('phone', authState.phone);
        }, [authState, setValue]);

        return (
                <UpdateUserProfilePresentation
                        apiState={apiState}
                        authState={authState}
                        control={control}
                        errors={errors}
                        file={file}
                        handleOnSubmit={handleSubmit(onSubmit)}
                        handOnChangeFile={handleOnChangeFile}
                        translate={translate}
                />
        );
};

export default UpdateUserProfileContainer;
