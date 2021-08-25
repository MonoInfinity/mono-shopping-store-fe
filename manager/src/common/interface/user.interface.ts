export enum UserRole {
        CUSTOMER = 1,
        SHIPPER = 2,
        CASHIER = 3,
        MANAGER = 4,
        OWNER = 5,
}
export enum UserStatus {
        DISABLE = 0,
        ENABLE = 1,
}

export interface User {
        userId: string;
        username: string;
        name: string;
        email: string;
        phone: string;
        address: string;
        avatarUrl: string;
        createDate: string;
        salary: number;
        role: UserRole;
        status: UserStatus;
}

export interface AuthState extends User {
        isLogin: boolean;
}
