import * as React from 'react';
import ViewUserProfilePresentation from './presentation';
import locales from './locales.json';
import { useTranslate } from '../../../common/hooks/useTranslate';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { ApiState } from '../../../common/interface/api.interface';
import { useForm } from 'react-hook-form';
import { UpdateEmployeeDto } from '../../../common/interface/dto/user.dto';
import { User, UserRole, UserStatus } from '../../../common/interface/user.interface';
import { useParams } from 'react-router-dom';
import adminAPI from '../../../api/adminApi';
import useFormError from '../../../common/hooks/useFormError';

export type LocaleKey = keyof typeof locales.en;

const defaultValues: UpdateEmployeeDto = {
        role: UserRole.CUSTOMER,
        salary: '0',
        status: UserStatus.ENABLE,
        userId: '',
};
const ViewUserProfile: React.FC = () => {
        const { handleSubmit, control } = useForm<UpdateEmployeeDto>({ defaultValues });
        const translate = useTranslate<LocaleKey>({ dictionary: locales, name: 'viewUserProfilePage' });
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const params = useParams<{ id: string }>();
        const [user, setUser] = React.useState<User>();
        const errors = useFormError<UpdateEmployeeDto>(defaultValues);

        const onSubmit = (data: UpdateEmployeeDto) => {
                console.log(data);
        };

        React.useEffect(() => {
                const userId = params.id;
                if (userId) {
                        adminAPI.getUserById(userId).then((res) => {
                                setUser(res.data.data);
                        });
                }
        }, [params.id]);

        return (
                <ViewUserProfilePresentation
                        user={user}
                        translate={translate}
                        apiState={apiState}
                        control={control}
                        errors={errors}
                        handleOnSubmit={handleSubmit(onSubmit)}
                />
        );
};

export default ViewUserProfile;
