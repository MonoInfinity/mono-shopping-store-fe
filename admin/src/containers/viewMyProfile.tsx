import * as React from "react";
import { Badge, Button, Descriptions } from "antd";
import { AuthState } from "../common/interface/user.interface";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { Image } from "antd";
import { convertRoleToString, convertStatusToString } from "../common/helper/userHelper";
import { Link } from "react-router-dom";
import routers from "../common/constants/router";
import { RouteProtectedWrapper } from "../common/HOC/routerProtectedWrapper";

export interface UserProfileProps {}

const ViewMyProfile: React.FC<UserProfileProps> = () => {
        const authState = useSelector<RootState, AuthState>((state) => state.auth);

        return (
                <RouteProtectedWrapper isNeedLogin>
                        <div className="py-4 space-y-2 fade-in">
                                <div>
                                        <h1 className="text-4xl font-bold">User Information</h1>
                                </div>
                                <div>
                                        <Image
                                                width={200}
                                                src={process.env.REACT_APP_SERVER_URL + authState.avatarUrl}
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
                                <Descriptions title={`User Info: ${authState.userId}`} bordered>
                                        <Descriptions.Item label="UserName" className="capitalize">
                                                {authState.username}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Name" className="capitalize">
                                                {authState.name}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Telephone">{authState.phone}</Descriptions.Item>
                                        <Descriptions.Item label="Salary">${authState.salary}</Descriptions.Item>
                                        <Descriptions.Item label="Role" className="capitalize">
                                                {convertRoleToString(authState.role)}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Join Date">{authState.createDate}</Descriptions.Item>
                                        <Descriptions.Item label="status" className="capitalize">
                                                {authState.status ? (
                                                        <Badge status="processing" text={convertStatusToString(authState.status)} />
                                                ) : (
                                                        <Badge status="error" text={convertStatusToString(authState.status)} />
                                                )}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Address" span={2}>
                                                {authState.address}
                                        </Descriptions.Item>
                                </Descriptions>
                        </div>
                </RouteProtectedWrapper>
        );
};

export default ViewMyProfile;
