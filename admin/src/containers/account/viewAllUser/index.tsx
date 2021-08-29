import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import adminAPI from '../../../api/adminApi';
import { routers } from '../../../common/constants/router';
import { ApiState } from '../../../common/interface/api.interface';
import { User } from '../../../common/interface/user.interface';
import { RootState } from '../../../store';
import ViewAllUserPresentation from './presentation';

import { useTranslate } from '../../../common/hooks/useTranslate';
import { useForm } from 'react-hook-form';
import { roleOptions } from '../../../common/constants/user';

export interface SearchUserDto {
        name: string;
        role: string;
}
const defaultValues: SearchUserDto = {
        name: '',
        role: '',
};

export interface ViewAllUserContainerProps {}

const ViewAllUserContainer: React.FC<ViewAllUserContainerProps> = () => {
        const { control, handleSubmit } = useForm<SearchUserDto>({ defaultValues });
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const history = useHistory();
        const [currentPage, setCurrentPage] = React.useState<number>(0);
        const [pageSize, setPageSize] = React.useState<number>(10);
        const [name, setName] = React.useState<string>('');
        const [role, setRole] = React.useState<string>('');
        const [users, setUsers] = React.useState<User[]>([]);
        const [totalUsers, setTotalUsers] = React.useState<number>(0);
        const translate = useTranslate();

        React.useEffect(() => {
                const params = new URLSearchParams(history.location.search);
                const pageParams = params.get('page') || currentPage;
                const pageSizeParams = params.get('pageSize') || pageSize;
                const nameParams = params.get('name') || name;
                const roleParams = params.get('role') || role;
                setCurrentPage(Number(pageParams));
                setPageSize(Number(pageSizeParams));
                setName(nameParams);
                setRole(roleParams);
                adminAPI.getAllUser(pageSize, currentPage, name, role).then((item) => {
                        setUsers(item.data.data.users);
                        setTotalUsers(item.data.data.count);
                });
        }, [history, currentPage, name, pageSize, role]);

        const handleChangePaseSize = (currentPage: number, pageSize: number | undefined) => {
                setCurrentPage(currentPage - 1);
                if (pageSize) setPageSize(pageSize);

                history.push(
                        routers.viewAllUser.link +
                                `?page=${currentPage - 1}&pageSize=${pageSize}&name=${name}&role=${role}`
                );
        };

        const onSubmit = (data: SearchUserDto) => {
                setRole(data.role);
                setName(data.name);
                history.push(
                        routers.viewAllUser.link +
                                `?page=${currentPage}&pageSize=${pageSize}&name=${data.name}&role=${data.role}`
                );
        };

        return (
                <ViewAllUserPresentation
                        apiState={apiState}
                        currentPage={currentPage}
                        handleOnChangeSize={handleChangePaseSize}
                        handleOnSearch={handleSubmit(onSubmit)}
                        pageSize={pageSize}
                        totalUser={totalUsers}
                        users={users}
                        control={control}
                        translate={translate}
                        roleOptions={roleOptions}
                />
        );
};

export default ViewAllUserContainer;
