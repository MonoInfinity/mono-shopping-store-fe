import { Descriptions, Image, Button, Badge } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { routers } from '../../../common/constants/router';
import { RouteProtectedWrapper } from '../../../common/HOC/routerProtectedWrapper';
import { AuthState } from '../../../common/interface/user.interface';
import { convertRoleToString } from '../../../common/helper/userHelper';
import { LocaleKey } from '../../../common/interface/locale.interface';

export interface ViewMyProfilePresentationProps {
        authState: AuthState;
        translate(key: LocaleKey, context?: any): string;
}

const ViewMyProfilePresentation: React.FC<ViewMyProfilePresentationProps> = ({ translate, authState }) => {
        const ButtonGroup = (
                <div className="space-x-2">
                        <Button>
                                <Link to={routers.updateUserProfile.link}>{translate('button-editProfile')}</Link>
                        </Button>
                        <Button>
                                <Link to={routers.changePassword.link}>{translate('button-changePassword')}</Link>
                        </Button>
                </div>
        );
        const DescriptionHeader = (
                <>
                        <div>
                                <h1 className="text-4xl font-bold">{translate('title-userInformation')}</h1>
                        </div>
                        <div>
                                <Image
                                        width={200}
                                        src={process.env.REACT_APP_STORAGE_SERVER_URL + authState.avatarUrl}
                                        preview={false}
                                        className="border"
                                />
                        </div>
                </>
        );

        const DescriptionBody = (
                <Descriptions title={`${translate('title-userInformation')}: ${authState.userId}`} bordered>
                        <Descriptions.Item label={translate('field-username')} className="capitalize">
                                {authState.username}
                        </Descriptions.Item>
                        <Descriptions.Item label={translate('field-name')} className="capitalize">
                                {authState.name}
                        </Descriptions.Item>
                        <Descriptions.Item label={translate('field-phone')}>{authState.phone}</Descriptions.Item>
                        <Descriptions.Item label={translate('field-salary')}>${authState.salary}</Descriptions.Item>
                        <Descriptions.Item label={translate('field-role')} className="capitalize">
                                {translate(convertRoleToString(authState.role))}
                        </Descriptions.Item>
                        <Descriptions.Item label={translate('field-joinDate')}>
                                {authState.createDate}
                        </Descriptions.Item>
                        <Descriptions.Item label={translate('field-status')} className="capitalize">
                                {authState.status ? (
                                        <Badge status="processing" text={translate('user-status-active')} />
                                ) : (
                                        <Badge status="error" text={translate('user-status-inactive')} />
                                )}
                        </Descriptions.Item>
                        <Descriptions.Item label={translate('field-address')} span={2}>
                                {authState.address}
                        </Descriptions.Item>
                </Descriptions>
        );

        return (
                <RouteProtectedWrapper isNeedLogin>
                        <div className="py-4 space-y-2 fade-in">
                                {DescriptionHeader}
                                {ButtonGroup}
                                {DescriptionBody}
                        </div>
                </RouteProtectedWrapper>
        );
};

export default ViewMyProfilePresentation;
