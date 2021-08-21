import { Badge, Button, Descriptions, Image, InputNumber, Radio, Select } from "antd";
import * as React from "react";
import { Link, useParams } from "react-router-dom";
import adminAPI from "../api/adminApi";
import { RouteProtectedWrapper } from "../common/HOC/routerProtectedWrapper";
import { User, UserRole } from "../common/interface/user.interface";
import routers from "../common/constants/router";
import { convertRoleToString, convertStatusToString } from "../common/helper/userHelper";
import FormMsg from "../components/form/formMsg";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ApiState } from "../common/interface/api.interface";
import { Option } from "antd/lib/mentions";

export interface ViewUserProfileProps {}

const ViewUserProfile: React.FC<ViewUserProfileProps> = () => {
        const params = useParams<{ id: string }>();
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const [user, setUser] = React.useState<User>();

        React.useEffect(() => {
                const userId = params.id;
                if (userId) {
                        adminAPI.getUserById(userId).then((res) => {
                                setUser(res.data.data);
                        });
                }
        }, [params.id]);

        return (
                <RouteProtectedWrapper isNeedLogin>
                        <div>
                                <button className="font-semibold ">
                                        <Link to={routers.viewAllUser.link}>Go Back</Link>
                                </button>

                                <FormMsg
                                        isError={apiState.isError}
                                        isLoading={apiState.isLoading}
                                        errorMessage={apiState.errorMessage}
                                        message={apiState.message}
                                />
                        </div>

                        {user && (
                                <div className="py-4 space-y-2 fade-in">
                                        <div>
                                                <h1 className="text-4xl font-bold">User Information</h1>
                                        </div>
                                        <div>
                                                <Image
                                                        width={200}
                                                        src={process.env.REACT_APP_SERVER_URL + user?.avatarUrl}
                                                        preview={false}
                                                        className="border"
                                                />
                                        </div>
                                        <div className="space-x-2">
                                                <Button>
                                                        <Link to={routers.updateUserProfile.link}>Edit Profile</Link>
                                                </Button>
                                                <Button>
                                                        <Link to={routers.changePassword.link}>Change Password</Link>
                                                </Button>
                                        </div>
                                        <Descriptions title={`User Info: ${user.userId}`} bordered>
                                                <Descriptions.Item label="UserName" className="capitalize">
                                                        {user.username}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Name" className="capitalize">
                                                        {user.name}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Telephone">{user.phone}</Descriptions.Item>
                                                <Descriptions.Item label="Salary">
                                                        <InputNumber
                                                                defaultValue={user.salary}
                                                                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                                onChange={() => {}}
                                                        />
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Role" className="capitalize">
                                                        <Select defaultValue={convertRoleToString(user.role)} className="w-full" onChange={() => {}}>
                                                                {Object.keys(UserRole)
                                                                        .splice(Object.keys(UserRole).length / 2)
                                                                        .map((item) => {
                                                                                return (
                                                                                        <Option
                                                                                                key={item.toString()}
                                                                                                value={item.toString()}
                                                                                                className="capitalize"
                                                                                        >
                                                                                                {item.toLocaleLowerCase()}
                                                                                        </Option>
                                                                                );
                                                                        })}
                                                        </Select>
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Join Date">{user.createDate}</Descriptions.Item>
                                                <Descriptions.Item label="status" className="capitalize">
                                                        <Radio>{convertStatusToString(user.status)}</Radio>
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Address" span={2}>
                                                        {user.address}
                                                </Descriptions.Item>
                                        </Descriptions>
                                </div>
                        )}
                </RouteProtectedWrapper>
        );
};

export default ViewUserProfile;
