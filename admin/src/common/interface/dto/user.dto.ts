import { UserRole, UserStatus } from '../user.interface';

export interface ChangePasswordDto {
        password: string;
        newPassword: string;
        confirmPassword: string;
}

export interface UpdateUserDto {
        name: string;
        email: string;
        phone: string;
        address: string;
        avatarUrl: string;
}

export interface UpdateEmployeeDto {
        userId: string;
        role: UserRole;
        salary: string;
        status: UserStatus;
}
