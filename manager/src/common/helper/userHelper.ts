import { UserRole, UserStatus } from '../interface/user.interface';

export const convertRoleToString = (role: UserRole) => {
        switch (role) {
                case UserRole.CASHIER:
                        return 'user-role-cashier';
                case UserRole.MANAGER:
                        return 'user-role-manager';
                case UserRole.OWNER:
                        return 'user-role-owner';
                case UserRole.SHIPPER:
                        return 'user-role-shipper';
                case UserRole.CUSTOMER:
                        return 'user-role-customer';
                default:
                        return 'user-role-customer';
        }
};
export const convertStatusToString = (status: UserStatus) => {
        switch (status) {
                case UserStatus.ENABLE:
                        return 'user-status-active';
                case UserStatus.DISABLE:
                        return 'user-status-inactive';
                default:
                        return 'user-status-active';
        }
};
