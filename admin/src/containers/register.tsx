import * as React from "react";
import { Form, Button } from "antd";
import { Link } from "react-router-dom";
import TextField from "../components/form/textField";
import { useForm } from "react-hook-form";
import { UserRegisterDto } from "../common/interface/dto/auth.dto";
import { useSelector } from "react-redux";
import { RootState, store } from "../store";
import { ApiState } from "../common/interface/api.interface";
import useFormError from "../common/hooks/userFormError";
import authThunk from "../store/auth/thunk";
import TextFieldPassword from "../components/form/textFieldPassword";
import FormBtn from "../components/form/formBtn";
import { RouteProtectedWrapper } from "../common/HOC/routerProtectedWrapper";
import FormMsg from "../components/form/formMsg";
export interface RegisterContainerProps {}

const defaultValues: UserRegisterDto = {
        name: "",
        password: "",
        username: "",
        confirmPassword: "",
        address: "",
        email: "",
        phone: "",
};

const RegisterContainer: React.FunctionComponent<RegisterContainerProps> = () => {
        const { handleSubmit, control } = useForm<UserRegisterDto>({ defaultValues });
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const errors = useFormError<UserRegisterDto>(defaultValues);

        const onSubmit = (data: UserRegisterDto) => {
                store.dispatch(authThunk.registerUser(data));
        };
        return (
                <RouteProtectedWrapper>
                        <div className="flex items-center justify-center flex-1 bg-gradient-to-r from-red-violet-500 via-red-500 to-blue-gem-500 ">
                                <div className="w-full px-2 py-8 mx-1 space-y-8 bg-white rounded-sm shadow-xl md:px-4 md:w-125 bg-opacity-90 fade-in">
                                        <h1 className="text-4xl font-semibold text-center">Register Account</h1>
                                        <Form className="" name="basic" layout="vertical" onFinish={handleSubmit(onSubmit)}>
                                                <FormMsg
                                                        isError={apiState.isError}
                                                        errorMessage={apiState.errorMessage}
                                                        isLoading={apiState.isLoading}
                                                        message={apiState.message}
                                                />
                                                <div>
                                                        <div className="justify-between md:space-x-4 md:flex">
                                                                <TextField
                                                                        control={control}
                                                                        error={errors.username}
                                                                        field="username"
                                                                        label="Username"
                                                                />
                                                                <TextField control={control} error={errors.name} field="name" label="Name" />
                                                        </div>
                                                        <div className="justify-between md:space-x-4 md:flex">
                                                                <TextFieldPassword
                                                                        control={control}
                                                                        error={errors.password}
                                                                        field="password"
                                                                        label="Password"
                                                                />
                                                                <TextFieldPassword
                                                                        control={control}
                                                                        error={errors.confirmPassword}
                                                                        field="confirmPassword"
                                                                        label="Confirm Password"
                                                                />
                                                        </div>
                                                        <div className="justify-between md:space-x-4 md:flex">
                                                                <TextField control={control} error={errors.email} field="email" label="Email" />
                                                                <TextField control={control} error={errors.phone} field="phone" label="Phone" />
                                                        </div>
                                                        <div className="justify-between md:space-x-4 md:flex">
                                                                <TextField control={control} error={errors.address} field="address" label="Address" />
                                                                <div className="w-full"></div>
                                                        </div>
                                                </div>
                                                <FormBtn label="Sign Up" isLoading={apiState.isLoading} />
                                        </Form>
                                        <div className="flex items-center space-x-4">
                                                <div className="flex-1 bg-gray-300 h-0.5"></div>
                                                <p className="text-center">Or</p>
                                                <div className="flex-1 bg-gray-300 h-0.5"></div>
                                        </div>
                                        <Button type="default" htmlType="button" className="w-full">
                                                <Link to="/login">Login Instead</Link>
                                        </Button>
                                </div>
                        </div>
                </RouteProtectedWrapper>
        );
};

export default RegisterContainer;
