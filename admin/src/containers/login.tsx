import * as React from "react";
import { Form, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { RootState, store } from "../store";
import authThunk from "../store/auth/thunk";
import { UserLoginDto } from "../common/interface/dto/auth.dto";
import { ApiState } from "../common/interface/api.interface";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useFormError from "../common/hooks/userFormError";
import TextField from "../components/form/textField";
import TextFieldPassword from "../components/form/textFieldPassword";
import FormBtn from "../components/form/formBtn";
import { RouteProtectedWrapper } from "../common/HOC/routerProtectedWrapper";
import FormMsg from "../components/form/formMsg";

export interface LoginContainerProps {}

const defaultValues: UserLoginDto = {
        password: "",
        username: "",
};

const LoginContainer: React.FunctionComponent<LoginContainerProps> = () => {
        const { handleSubmit, control } = useForm<UserLoginDto>({ defaultValues });
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const errors = useFormError<UserLoginDto>(defaultValues);

        const onSubmit = (data: UserLoginDto) => {
                store.dispatch(authThunk.loginUser(data));
        };

        return (
                <RouteProtectedWrapper>
                        <div className="flex items-center justify-center flex-1 bg-gradient-to-r from-red-violet-500 via-red-500 to-blue-gem-500 ">
                                <div className="w-full px-2 py-8 mx-1 space-y-8 bg-white rounded-sm shadow-xl md:px-4 md:w-96 bg-opacity-90 fade-in">
                                        <h1 className="text-4xl font-semibold text-center">Login Account</h1>
                                        <Form className="" name="basic" layout="vertical" onFinish={handleSubmit(onSubmit)}>
                                                <FormMsg
                                                        isError={apiState.isError}
                                                        errorMessage={apiState.errorMessage}
                                                        isLoading={apiState.isLoading}
                                                        message={apiState.message}
                                                />
                                                <TextField control={control} error={errors.username} field="username" label="Username" />
                                                <TextFieldPassword control={control} error={errors.password} field="password" label="Password" />
                                                <Form.Item>
                                                        <div className="flex items-center justify-between">
                                                                <Checkbox>Remember me</Checkbox>
                                                                <div className="flex-1 text-right">
                                                                        <Link to="/" className="">
                                                                                Forgot Password?
                                                                        </Link>
                                                                </div>
                                                        </div>
                                                </Form.Item>
                                                <FormBtn isLoading={apiState.isLoading} label="Sign In" />
                                        </Form>
                                        <div className="flex items-center space-x-4">
                                                <div className="flex-1 bg-gray-300 h-0.5"></div>
                                                <p className="text-center">Or</p>
                                                <div className="flex-1 bg-gray-300 h-0.5"></div>
                                        </div>
                                        <Button type="default" htmlType="button" className="w-full">
                                                <Link to="/register">Create New Account</Link>
                                        </Button>
                                </div>
                        </div>
                </RouteProtectedWrapper>
        );
};

export default LoginContainer;
