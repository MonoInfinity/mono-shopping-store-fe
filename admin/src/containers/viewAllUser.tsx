import { Badge, Button, Pagination, Skeleton } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { List } from "antd";
import * as React from "react";
import adminAPI from "../api/adminApi";
import { User, UserRole } from "../common/interface/user.interface";
import { convertRoleToString, convertStatusToString } from "../common/helper/userHelper";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ApiState } from "../common/interface/api.interface";
import { Link, useHistory } from "react-router-dom";
import routers from "../common/constants/router";
import Search from "antd/lib/input/Search";
import { Form } from "antd";
import RoleProtected from "../common/HOC/roleProtected";

export interface ViewAllUserProps {}

export interface ViewAllUserQuery {
        page: string | undefined;
        currentPage: string | undefined;
}

const ViewAllUser: React.FC<ViewAllUserProps> = () => {
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const history = useHistory();
        const [currentPage, setCurrentPage] = React.useState<number>(0);
        const [pageSize, setPageSize] = React.useState<number>(10);
        const [name, setName] = React.useState<string>("");
        const [users, setUsers] = React.useState<User[]>([]);
        const [totalUsers, setTotalUsers] = React.useState<number>(0);

        React.useEffect(() => {
                const params = new URLSearchParams(history.location.search);
                const pageParams = params.get("page") || 0;
                const pageSizeParams = params.get("pageSize") || 10;
                const nameParams = params.get("name") || "";
                setCurrentPage(Number(pageParams));
                setPageSize(Number(pageSizeParams));
                setName(nameParams);
        }, [history]);

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
                <RoleProtected acceptRole={[UserRole.MANAGER, UserRole.OWNER]} isRedirect>
                        <div className="space-y-2">
                                <h1 className="text-2xl font-semibold">Account Manager</h1>

                                <Form>
                                        <Search placeholder="Account Name" onSearch={handleOnSearch} enterButton />
                                </Form>
                                {apiState.isLoading && (
                                        <List>
                                                {Array.from(Array(pageSize / 2).keys()).map((_, index) => {
                                                        return (
                                                                <List.Item key={index}>
                                                                        <Skeleton loading={true} active avatar></Skeleton>
                                                                </List.Item>
                                                        );
                                                })}
                                        </List>
                                )}
                                {!Boolean(users.length) && !apiState.isLoading && <h1 className="text-xl font-semibold">This list is empty</h1>}
                                {Boolean(users.length) && !apiState.isLoading && (
                                        <>
                                                <List className="fade-in">
                                                        {users.map((item) => {
                                                                return (
                                                                        <List.Item key={item.userId}>
                                                                                <List.Item.Meta
                                                                                        avatar={
                                                                                                <Avatar
                                                                                                        src={
                                                                                                                process.env.REACT_APP_SERVER_URL +
                                                                                                                item.avatarUrl
                                                                                                        }
                                                                                                />
                                                                                        }
                                                                                        title={item.name}
                                                                                        description={
                                                                                                <div>
                                                                                                        <p>Address: {item.address}</p>
                                                                                                        <p>Phone: {item.phone}</p>
                                                                                                        <p>Join Date: {item.createDate}</p>
                                                                                                </div>
                                                                                        }
                                                                                />

                                                                                <div className="flex flex-col justify-between space-y-2 capitalize">
                                                                                        {item.status ? (
                                                                                                <Badge
                                                                                                        status="processing"
                                                                                                        text={convertStatusToString(item.status)}
                                                                                                />
                                                                                        ) : (
                                                                                                <Badge
                                                                                                        status="error"
                                                                                                        text={convertStatusToString(item.status)}
                                                                                                />
                                                                                        )}
                                                                                        <div>Role: {convertRoleToString(item.role)}</div>
                                                                                        <Button type="ghost">
                                                                                                <Link
                                                                                                        to={
                                                                                                                routers.viewUserProfile.link +
                                                                                                                "/" +
                                                                                                                item.userId
                                                                                                        }
                                                                                                >
                                                                                                        View More
                                                                                                </Link>
                                                                                        </Button>
                                                                                </div>
                                                                        </List.Item>
                                                                );
                                                        })}
                                                </List>
                                                <Pagination defaultCurrent={currentPage + 1} total={totalUsers} onChange={handleChangePaseSize} />
                                        </>
                                )}
                        </div>
                </RoleProtected>
        );
};

export default ViewAllUser;
