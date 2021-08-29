import * as React from 'react';
import ViewUserProfilePresentation from './presentation';

import { useTranslate } from '../../../common/hooks/useTranslate';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { ApiState } from '../../../common/interface/api.interface';
import { useForm } from 'react-hook-form';

import { User, UserRole } from '../../../common/interface/user.interface';
import adminAPI from '../../../api/adminApi';
import useFormError from '../../../common/hooks/useFormError';
import { UpdateEmployeeDto } from '../../../common/interface/dto/admin.dto';
import { roleOptions } from '../../../common/constants/user';
import { Form } from 'antd';
import { convertRoleToString } from '../../../common/helper/userHelper';

const defaultValues: UpdateEmployeeDto = {
        role: '',
        salary: '0',
        status: '0',
        userId: '',
};

export interface ViewUserProfileProps {
        match: {
                params: {
                        id: string | undefined;
                };
        };
}

const ViewUserProfile: React.FC<ViewUserProfileProps> = ({ match }) => {
        const { handleSubmit, control, setValue } = useForm<UpdateEmployeeDto>({ defaultValues });
        const translate = useTranslate();
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const [user, setUser] = React.useState<User>();
        const [form] = Form.useForm<UpdateEmployeeDto>();
        const errors = useFormError<UpdateEmployeeDto>({
                role: '',
                salary: '',
                status: '',
                userId: '',
        });

        React.useEffect(() => {
                form.setFieldsValue({ role: String(UserRole.CUSTOMER) });
        }, [form]);

        const onSubmit = (data: UpdateEmployeeDto) => {
                if (user)
                        adminAPI.updateEmployee({
                                role: data.role,
                                salary: data.salary,
                                status: data.status,
                                userId: user?.userId,
                        });
        };

        React.useEffect(() => {
                if (match.params.id) {
                        adminAPI.getUserById(match.params.id).then((res) => {
                                setUser(res.data.data);
                                setValue('salary', String(res.data.data.salary));
                                setValue('role', translate(convertRoleToString(res.data.data.role)));
                                setValue('status', String(res.data.data.status));
                        });
                }
        }, [match.params.id]);
        return (
                <ViewUserProfilePresentation
                        user={user}
                        translate={translate}
                        apiState={apiState}
                        control={control}
                        errors={errors}
                        handleOnSubmit={handleSubmit(onSubmit)}
                        roleOptions={roleOptions}
                />
        );
};

export default ViewUserProfile;
