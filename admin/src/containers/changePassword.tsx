import { ApiState } from "../common/interface/api.interface";
import { ChangePasswordDto } from "../common/interface/dto/user.dto";
import { Form } from "antd";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { RouteProtectedWrapper } from "../common/HOC/routerProtectedWrapper";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as React from "react";
import FormBtn from "../components/form/formBtn";
import routers from "../common/constants/router";
import TextFieldPassword from "../components/form/textFieldPassword";
import useFormError from "../common/hooks/userFormError";
import userAPI from "../api/userApi";
import FormMsg from "../components/form/formMsg";

export interface ChangePasswordProps {}

const defaultValues: ChangePasswordDto = {
        confirmPassword: "",
        password: "",
        newPassword: "",
};

const ChangePassword: React.FC<ChangePasswordProps> = () => {
        const { handleSubmit, control, setValue } = useForm<ChangePasswordDto>({ defaultValues });
        const apiState = useSelector<RootState, ApiState>((state) => state.api);
        const errors = useFormError<ChangePasswordDto>(defaultValues);

        const onSubmit = (data: ChangePasswordDto) => {
                userAPI.updatePassword(data).then(() => {
                        setValue("password", "");
                        setValue("newPassword", "");
                        setValue("confirmPassword", "");
                });
        };

        return (
                <RouteProtectedWrapper isNeedLogin>
                        <div className="space-y-4">
                                <button className="font-semibold ">
                                        <Link to={routers.viewMyProfile.link}>Go Back</Link>
                                </button>

                                <div className="">
                                        <div className="px-2 py-4 space-y-8 border w-96 fade-in">
                                                <h1 className="text-4xl font-semibold text-center">Update Password</h1>{" "}
                                                <FormMsg
                                                        isError={apiState.isError}
                                                        errorMessage={apiState.errorMessage}
                                                        isLoading={apiState.isLoading}
                                                        message={apiState.message}
                                                />
                                                <Form className="" name="basic" layout="vertical" onFinish={handleSubmit(onSubmit)}>
                                                        <TextFieldPassword
                                                                control={control}
                                                                error={errors.password}
                                                                field="password"
                                                                label="Current Password"
                                                        />
                                                        <TextFieldPassword
                                                                control={control}
                                                                error={errors.newPassword}
                                                                field="newPassword"
                                                                label="New Password"
                                                        />
                                                        <TextFieldPassword
                                                                control={control}
                                                                error={errors.confirmPassword}
                                                                field="confirmPassword"
                                                                label="Confirm Password"
                                                        />
                                                        <FormBtn isLoading={apiState.isLoading} label="Update Password" />
                                                </Form>
                                        </div>
                                </div>
                        </div>
                </RouteProtectedWrapper>
        );
};

export default ChangePassword;
