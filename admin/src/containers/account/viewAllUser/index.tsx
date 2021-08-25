import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import adminAPI from '../../../api/adminApi';
import { routers } from '../../../common/constants/router';
import { ApiState } from '../../../common/interface/api.interface';
import { User } from '../../../common/interface/user.interface';
import { RootState } from '../../../store';
import ViewAllUserPresentation from './presentation';
import locales from './locales.json';
import { useTranslate } from '../../../common/hooks/useTranslate';

export type LocaleKey = keyof typeof locales.en;
export interface ViewAllUserContainerProps {}

const ViewAllUserContainer: React.FC<ViewAllUserContainerProps> = () => {
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const history = useHistory();
        const [currentPage, setCurrentPage] = React.useState<number>(0);
        const [pageSize, setPageSize] = React.useState<number>(10);
        const [name, setName] = React.useState<string>('');
        const [users, setUsers] = React.useState<User[]>([]);
        const [totalUsers, setTotalUsers] = React.useState<number>(0);
        const translate = useTranslate<LocaleKey>({ dictionary: locales, name: 'ViewAllUser' });

        React.useEffect(() => {
                const params = new URLSearchParams(history.location.search);
                const pageParams = params.get('page') || currentPage;
                const pageSizeParams = params.get('pageSize') || pageSize;
                const nameParams = params.get('name') || name;
                setCurrentPage(Number(pageParams));
                setPageSize(Number(pageSizeParams));
                setName(nameParams);
        }, [history, currentPage, name, pageSize]);

        React.useEffect(() => {
                history.push(routers.viewAllUser.link + `?page=${currentPage}&pageSize=${pageSize}&name=${name}`);
        }, [currentPage, pageSize, history, name]);

        React.useEffect(() => {
                adminAPI.getAllUser(pageSize, currentPage, name).then((item) => {
                        setUsers(item.data.data.users);
                        setTotalUsers(item.data.data.count);
                });
        }, [currentPage, pageSize, name]);

        const handleChangePaseSize = (currentPage: number, pageSize: number | undefined) => {
                setCurrentPage(currentPage - 1);
                if (pageSize) setPageSize(pageSize);
        };

        const handleOnSearch = (value: string) => {
                setName(value);
        };

        return (
                <ViewAllUserPresentation
                        apiState={apiState}
                        currentPage={currentPage}
                        handleOnChangeSize={handleChangePaseSize}
                        handleOnSearch={handleOnSearch}
                        pageSize={pageSize}
                        totalUser={totalUsers}
                        users={users}
                        translate={translate}
                />
        );
};

export default ViewAllUserContainer;
