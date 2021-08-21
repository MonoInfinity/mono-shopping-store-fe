import { UserRole, UserStatus } from "../interface/user.interface";

export const convertRoleToString = (role: UserRole) => {
        switch (role) {
                case UserRole.CASHIER:
                        return "cashier";
                case UserRole.MANAGER:
                        return "manager";
                case UserRole.OWNER:
                        return "owner";
                case UserRole.SHIPPER:
                        return "shipper";
                case UserRole.CUSTOMER:
                        return "customer";
                default:
                        return "customer";
        }
};
export const convertStatusToString = (status: UserStatus) => {
        switch (status) {
                case UserStatus.ENABLE:
                        return "active";
                case UserStatus.DISABLE:
                        return "inactive";
                default:
                        return "active";
        }
};
