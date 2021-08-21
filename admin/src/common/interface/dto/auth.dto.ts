export interface UserLoginDto {
        username: string;
        password: string;
}

export interface UserRegisterDto {
        username: string;
        password: string;
        confirmPassword: string;
        name: string;
        email: string;
        phone: string;
        address: string;
}
