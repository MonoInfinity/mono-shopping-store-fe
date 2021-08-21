export interface ChangePasswordDto {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
}

export interface UpdateUserDto {
        name: string;
        email: string;
        phone: string;
        address: string;
}
